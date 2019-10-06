using Common;
using DataLayer.Context;
using DomainClasses;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{

    public interface IRolesService
    {
        Task<IList<string>> FindUserRolesAsync(User user);

        Task<bool> IsUserInRoleAsync(User user, string roleName);

        Task<IList<User>> FindUsersInRoleAsync(string roleName);
    }

    public class RolesService : IRolesService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<User> _users;
        private readonly UserManager<User> _userManager;

        public RolesService(IUnitOfWork uow,
            UserManager<User> userManager)
        {
            _uow = uow;
            _uow.CheckArgumentIsNull(nameof(_uow));

            _userManager = userManager;
            _userManager.CheckArgumentIsNull(nameof(_userManager));

            _users = _uow.Set<User>();
        }

        public Task<IList<string>> FindUserRolesAsync(User user)
        {
            return _userManager.GetRolesAsync(user);
        }

        public async Task<bool> IsUserInRoleAsync(User user, string roleName)
        {
            return await _userManager.IsInRoleAsync(user, roleName);
        }

        public Task<IList<User>> FindUsersInRoleAsync(string roleName)
        {
            return _userManager.GetUsersInRoleAsync(roleName);
        }
    }
}
