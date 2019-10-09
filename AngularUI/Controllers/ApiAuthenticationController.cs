﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AngularUI.Helpers;
using AngularUI.Models;
using Common;
using DataLayer.Context;
using DomainClasses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Services;

namespace AngularUI.Controllers
{
    [Route("api/[controller]")]
    public class ApiAuthenticationController : Controller
    {
        private readonly IUsersService _usersService;
        private readonly ITokenStoreService _tokenStoreService;
        private readonly IUnitOfWork _uow;
        private readonly IAntiForgeryCookieService _antiforgery;
        private readonly ITokenFactoryService _tokenFactoryService;

        public ApiAuthenticationController(
            IUsersService usersService,
            ITokenStoreService tokenStoreService,
            ITokenFactoryService tokenFactoryService,
            IUnitOfWork uow,
            IAntiForgeryCookieService antiforgery)
        {
            _usersService = usersService;
            _usersService.CheckArgumentIsNull(nameof(usersService));

            _tokenStoreService = tokenStoreService;
            _tokenStoreService.CheckArgumentIsNull(nameof(tokenStoreService));

            _uow = uow;
            _uow.CheckArgumentIsNull(nameof(_uow));

            _antiforgery = antiforgery;
            _antiforgery.CheckArgumentIsNull(nameof(antiforgery));

            _tokenFactoryService = tokenFactoryService;
            _tokenFactoryService.CheckArgumentIsNull(nameof(tokenFactoryService));
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]  LoginViewModel login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _usersService.FindUserAsync(login.username, login.password);

            if (user == null)
                return BadRequest(Errors.AddErrorToModelState("login_failure",
                    "Username or password is incorrect.", ModelState));

            var result = await _tokenFactoryService.CreateJwtTokensAsync(user);

            await _tokenStoreService.AddUserTokenAsync(user, result.RefreshTokenSerial,
                result.AccessToken, null);

            await _uow.SaveChangesAsync();

            _antiforgery.RegenerateAntiForgeryCookies(result.Claims);

            return Ok(new
            {
                access_token = result.AccessToken,
                refresh_token = result.RefreshToken
            });
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<IActionResult> allowBody()
        {
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> RefreshToken([FromBody]JToken jsonBody)
        {
            var refreshTokenValue = jsonBody.Value<string>("refreshToken");
            if (string.IsNullOrWhiteSpace(refreshTokenValue))
            {
                return BadRequest("refreshToken is not set.");
            }

            var token = await _tokenStoreService.FindTokenAsync(refreshTokenValue);
            if (token == null)
            {
                return Unauthorized();
            }

            var result = await _tokenFactoryService.CreateJwtTokensAsync(token.User);
            await _tokenStoreService.AddUserTokenAsync(token.User, result.RefreshTokenSerial, result.AccessToken, _tokenFactoryService.GetRefreshTokenSerial(refreshTokenValue));
            await _uow.SaveChangesAsync();

            _antiforgery.RegenerateAntiForgeryCookies(result.Claims);

            return Ok(new { access_token = result.AccessToken, refresh_token = result.RefreshToken });
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<bool> Logout(string refreshToken)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userIdValue = claimsIdentity.FindFirst(ClaimTypes.UserData)?.Value;

            // The Jwt implementation does not support "revoke OAuth token" (logout) by design.
            // Delete the user's tokens from the database (revoke its bearer token)
            await _tokenStoreService.RevokeUserBearerTokensAsync(userIdValue, refreshToken);
            await _uow.SaveChangesAsync();

            _antiforgery.DeleteAntiForgeryCookies();

            return true;
        }

        [HttpGet("[action]"), HttpPost("[action]")]
        public bool IsAuthenticated()
        {
            return User.Identity.IsAuthenticated;
        }

        [HttpGet("[action]"), HttpPost("[action]")]
        public IActionResult GetUserInfo()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return Json(new { Username = claimsIdentity.Name });
        }

    }
}