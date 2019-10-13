using AngularUI.Models;
using AutoMapper;
using Common;
using DomainClasses;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularUI.Controllers
{
    [Route("api/[controller]")]
    public class ApiUsersController : Controller
    {
        private readonly IUsersService _userService;

        public ApiUsersController(IUsersService userService)
        {
            _userService = userService;
            _userService.CheckArgumentIsNull(nameof(_userService));
        }

        // GET: api/<controller>
        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<UserViewModel> Get()
        {
            return Mapper.Map<IEnumerable<User>, IList<UserViewModel>>(_userService.GetAllUsersAsync().Result);
        }

        [AllowAnonymous]
        [HttpPost("UserInfo")]
        public async Task<UserViewModel> GetUserInfoAsync([FromBody] FindUserModel model)
        {
            return Mapper.Map<User, UserViewModel>(await _userService.FindUserAsync(model.username));
        }

        [AllowAnonymous]
        [HttpPost("DeleteUser")]
        public async Task<IActionResult> DeleteUserAsync([FromBody] FindUserModel model)
        {
            User user = await _userService.FindUserAsync(model.username);

            var result = await _userService.DeleteUserAsync(user);


            string Data_Created = "";

            if (result.Succeeded)
            {
                Data_Created = "User deleted successfully.";
                return Ok(Json(Data_Created));
            }

            return BadRequest(result.Errors.Select(s => s.Description).ToString());
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUserProfile([FromBody]UpdateUserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _userService.FindUserAsync(model.userName).Result;

            userIdentity.Name = model.name;
            userIdentity.Family = model.family;
            userIdentity.Mobile = model.mobile;

            var result = await _userService.UpdateUserAsync(userIdentity, model.password);

            string Data_Created = "";

            if (result.Succeeded)
            {
                Data_Created = "User updated successfully.";
                return Ok(Json(Data_Created));
            }

            return BadRequest(result.Errors.Select(s => s.Description).ToString());
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = Mapper.Map<User>(model);

            var result = await _userService.CreateUserAsync(userIdentity, model.password);

            string Data_Created = "User created successfully.";
            return Ok(Json(Data_Created));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
