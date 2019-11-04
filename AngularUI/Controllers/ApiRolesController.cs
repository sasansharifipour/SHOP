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
    public class ApiRolesController : Controller
    {
        private readonly IRolesService _Roleservice;

        public ApiRolesController(IRolesService Roleservice)
        {
            _Roleservice = Roleservice;
            _Roleservice.CheckArgumentIsNull(nameof(_Roleservice));
        }

        // GET: api/<controller>
        [HttpGet]
        [Authorize]
        public IEnumerable<Role> Get()
        {
            return _Roleservice.GetAllRolesAsync().Result;
        }

        [AllowAnonymous]
        [HttpPost("UserInfo")]
        public async Task<UserViewModel> GetUserInfoAsync([FromBody] FindUserModel model)
        {
            return Mapper.Map<User, UserViewModel>(await _Roleservice.FindUserAsync(model.username));
        }

        [AllowAnonymous]
        [HttpPost("DeleteUser")]
        public async Task<IActionResult> DeleteUserAsync([FromBody] FindUserModel model)
        {
            User user = await _Roleservice.FindUserAsync(model.username);

            var result = await _Roleservice.DeleteUserAsync(user);


            string Data_Created = "";

            if (result.Succeeded)
            {
                Data_Created = "Role deleted successfully.";
                return Ok(Json(Data_Created));
            }

            return BadRequest(result.Errors.Select(s => s.Description).ToString());
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<Role> GetAsync(int id)
        {
            return (await _Roleservice.GetRoleAsync(id));
        }

        // POST api/<controller>
        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUserProfile([FromBody]UpdateUserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _Roleservice.FindUserAsync(model.userName).Result;

            userIdentity.Name = model.name;
            userIdentity.Family = model.family;
            userIdentity.Mobile = model.mobile;

            var result = await _Roleservice.UpdateUserAsync(userIdentity, model.password);

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

            var result = await _Roleservice.CreateUserAsync(userIdentity, model.password);

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
            Role role =  _Roleservice.GetRoleAsync(id).Result;

            _Roleservice.DeleteRoleAsync(role);


            string Data_Created = "";

            if (result.Succeeded)
            {
                Data_Created = "Role deleted successfully.";
                return Ok(Json(Data_Created));
            }

            return BadRequest(result.Errors.Select(s => s.Description).ToString());
        }
    }
}
