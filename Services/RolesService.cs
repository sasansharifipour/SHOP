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

        Task<IdentityResult> CreateRoleAsync(Role entity);

        Task<IdentityResult> DeleteAsync(Role role);

        Task<IdentityResult> UpdateAsync(int id,string name);

        Task<bool> IsUserInRoleAsync(User user, string roleName);

        Task<IList<User>> FindUsersInRoleAsync(string roleName);
    }

    public class RolesService : IRolesService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<User> _users;
        private readonly DbSet<Role> _roles;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public RolesService(IUnitOfWork uow,
            UserManager<User> userManager,
            RoleManager<Role> roleManager)
        {
            _uow = uow;
            _uow.CheckArgumentIsNull(nameof(_uow));

            _userManager = userManager;
            _userManager.CheckArgumentIsNull(nameof(_userManager));

            _roleManager = roleManager;
            _roleManager.CheckArgumentIsNull(nameof(_roleManager));

            _users = _uow.Set<User>();
            _roles = _uow.Set<Role>();
        }

        public Task<IList<string>> FindUserRolesAsync(User user)
        {
            return _userManager.GetRolesAsync(user);
        }

        public Task<IdentityResult> CreateRoleAsync(Role entity)
        {
            entity.CheckArgumentIsNull(nameof(entity));

            return _roleManager.CreateAsync(entity);
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

        public Task<IdentityResult> DeleteAsync(Role role)
        {
            role.CheckArgumentIsNull(nameof(role));

            return _roleManager.DeleteAsync(role);
        }

        public Task<IdentityResult> UpdateAsync(int id, string name)
        {
            Role item = _roleManager.FindByIdAsync(id.ToString()).Result;

            if (item == null)
                return null;

            item.Name = name;
            return _roleManager.UpdateAsync(item);
        }
    }
}
