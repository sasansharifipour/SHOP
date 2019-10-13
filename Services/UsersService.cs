using System;
using Common;
using DataLayer.Context;
using DomainClasses;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query.ExpressionVisitors.Internal;

namespace Services
{
    public interface IUsersService
    {
        Task<User> FindUserAsync(string username);

        Task<User> FindUserAsync(int id);

        Task<List<User>> GetAllUsersAsync();

        Task<IdentityResult> DeleteUserAsync(User entity);

        Task<IdentityResult> ChangeUserPasswordAsync(User entity
            , string oldPassword, string newPassword);

        Task<IdentityResult> CreateUserAsync(User entity, string password);

        Task<IdentityResult> UpdateUserAsync(User entity, string password);

        Task<User> FindUserAsync(string userName, string password);
    }

    public class UsersService : IUsersService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<User> _users;
        private readonly UserManager<User> _userManager;
        
        public UsersService(IUnitOfWork uow,
            UserManager<User> userManager)
        {
            _uow = uow;
            _uow.CheckArgumentIsNull(nameof(_uow));

            _users = _uow.Set<User>();
            _userManager = userManager;
            _userManager.CheckArgumentIsNull(nameof(_userManager));
        }
        
        public Task<IdentityResult> CreateUserAsync(User entity, string password)
        {
            entity.CheckArgumentIsNull(nameof(entity));

            return _userManager.CreateAsync(entity, password);
        }

        public async Task<IdentityResult> UpdateUserAsync(User entity, string password)
        {
            entity.CheckArgumentIsNull(nameof(entity));

            if (!String.IsNullOrEmpty(password))
            {
                await RemoveUserPasswordAsync(entity);

                await SetUserPasswordAsync(entity, password);
            }

            return await UpdateUserInfoAsync(entity);
        }

        public Task<IdentityResult> DeleteUserAsync(User entity)
        {
            entity.CheckArgumentIsNull(nameof(entity));

            return _userManager.DeleteAsync(entity);
        }

        public Task<IdentityResult> UpdateUserInfoAsync(User entity)
        {
            entity.CheckArgumentIsNull(nameof(entity));

            return _userManager.UpdateAsync(entity);
        }

        public Task<IdentityResult> SetUserPasswordAsync(User entity, string password)
        {
            entity.CheckArgumentIsNull(nameof(entity));

            return _userManager.AddPasswordAsync(entity, password);
        }

        public Task<IdentityResult> RemoveUserPasswordAsync(User entity)
        {
            entity.CheckArgumentIsNull(nameof(entity));

            return _userManager.RemovePasswordAsync(entity);
        }

        public Task<User> FindUserAsync(string username)
        {
            return Task.Run(() => _users.FirstOrDefaultAsync(
               s => s.UserName == username));
        }

        public async Task<User> FindUserAsync(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName))
                return await Task.FromResult<User>(null);

            if (string.IsNullOrEmpty(password))
                return await Task.FromResult<User>(null);

            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null)
                return await Task.FromResult<User>(null);

            if (await _userManager.CheckPasswordAsync(userToVerify, password))
                return await Task.FromResult<User>(userToVerify);

            return await Task.FromResult<User>(null);
        }

        public Task<User> FindUserAsync(int id)
        {
            return Task.Run(() => _users.FirstOrDefaultAsync(s => s.Id == id));
        }

        public Task<List<User>> GetAllUsersAsync()
        {
            return Task.Run(() => _users.ToListAsync());
        }

        public Task<IdentityResult> ChangeUserPasswordAsync(User entity, 
            string oldPassword, string newPassword)
        {
            entity.CheckArgumentIsNull(nameof(entity));

            return _userManager.ChangePasswordAsync(entity, oldPassword,newPassword);
        }
    }
}
