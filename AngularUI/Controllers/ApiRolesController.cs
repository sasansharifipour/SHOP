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
        public IEnumerable<RoleUpdateModel> Get()
        {
            var data = _Roleservice.GetAllRolesAsync().Result;
            return Mapper.Map<IEnumerable<Role>, IEnumerable<RoleUpdateModel>>(data);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RoleUpdateModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = Mapper.Map<Role>(model);

            var result = await _Roleservice.CreateRoleAsync(entity);

            string Data_Created = "Role created successfully.";
            return Ok(Json(Data_Created));
        }
        
        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<Role> GetAsync(int id)
        {
            return (await _Roleservice.GetRoleAsync(id));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]RoleUpdateModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _Roleservice.UpdateAsync(id, model.name);

            string Data_Created = "Role updated successfully.";
            return Ok(Json(Data_Created));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Role role = _Roleservice.GetRoleAsync(id).Result;

            var result = _Roleservice.DeleteAsync(role).Result;


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
