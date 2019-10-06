using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using AngularUI.Controllers;
using DomainClasses;
using Services;
using AngularUI.Config;
using AngularUI.Models;

namespace TestProject
{
    public class Test_User_API
    {
        [Fact]
        public async Task Check_Get_All_User_API()
        {
            List<User> allUsers = CreateTempDataList.GetTestAllUser();

            // Arrange
            var mockRepo = new Mock<IUsersService>();
            mockRepo.Setup(repo => repo.GetAllUsersAsync())
                .ReturnsAsync(allUsers);

            AutoMapperWebConfiguration.Configure();

            var list = Mapper.Map<IList<User>, IList<UserViewModel>>
                (allUsers);

            var controller = new ApiUsersController(mockRepo.Object);

            // Act
            var result = controller.Get();

            // Assert
            
            var viewResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<UserViewModel>>(
                viewResult.Value);
            Assert.Equal(list.ToString(),result.ToString());
        }
    }
}
