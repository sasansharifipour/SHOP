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

        Task<List<Role>> GetAllRolesAsync();

        Task<Role> GetRoleAsync(int id);

        void DeleteRoleAsync(Role role);

        Task<bool> IsUserInRoleAsync(User user, string roleName);

        Task<IList<User>> FindUsersInRoleAsync(string roleName);
    }

    public class RolesService : IRolesService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<User> _users;
        private readonly DbSet<Role> _roles;
        private readonly UserManager<User> _userManager;

        public RolesService(IUnitOfWork uow,
            UserManager<User> userManager)
        {
            _uow = uow;
            _uow.CheckArgumentIsNull(nameof(_uow));

            _userManager = userManager;
            _userManager.CheckArgumentIsNull(nameof(_userManager));

            _users = _uow.Set<User>();
            _roles = _uow.Set<Role>()
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

        public Task<List<Role>> GetAllRolesAsync()
        {
            return Task.Run(() => _roles.ToListAsync());
        }

        public Task<Role> GetRoleAsync(int id)
        {
            return Task.Run(() => _roles.FirstOrDefaultAsync(role => role.Id == id));
        }

        public void DeleteRoleAsync(Role role)
        {
            role.CheckArgumentIsNull(nameof(role));

            _roles.Remove(role);
            _uow.SaveChangesAsync();
        }
    }
}
