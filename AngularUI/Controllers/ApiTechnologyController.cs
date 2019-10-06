using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularUI.Models;
using AutoMapper;
using Common;
using DomainClasses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace AngularUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ApiTechnologyController : Controller
    {
        private readonly ITechnologyService _technologyService;

        public ApiTechnologyController(ITechnologyService technologyService)
        {
            _technologyService = technologyService;
            _technologyService.CheckArgumentIsNull(nameof(_technologyService));
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<TechnologyViewModel>> Get()
        {
            var operators = await _technologyService.GetAllTechnologiesAsync();

            var model = Mapper.Map<IEnumerable<Technology>
                , IEnumerable<TechnologyViewModel>>(operators);

            return model;
        }
    }

}