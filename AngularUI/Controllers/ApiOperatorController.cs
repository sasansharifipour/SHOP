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
    public class ApiOperatorController : Controller
    {
        private readonly IOperatorService _operatorService;

        public ApiOperatorController(IOperatorService operatorService)
        {
            _operatorService = operatorService;
            _operatorService.CheckArgumentIsNull(nameof(_operatorService));
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<OperatorViewModel>> Get()
        {
            var operators = await _operatorService.GetAllOperatorsAsync();

            var model = Mapper.Map<IEnumerable<Operator>
                    , IEnumerable<OperatorViewModel>>(operators);

            return model;
        }
    }
}