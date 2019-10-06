using Common;
using DataLayer.Context;
using DomainClasses;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{

    public interface IProvincesService
    {
        Task<Province> FindProvinceAsync(int id);

        Task<Province> FindProvinceAsync(string name);

        Task<List<Province>> GetAllProvincesAsync();
    }

    public class ProvincesService : IProvincesService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<Province> _provinces;


        public ProvincesService(IUnitOfWork uow)
        {
            _uow = uow;
            _uow.CheckArgumentIsNull(nameof(_uow));

            _provinces = _uow.Set<Province>();
        }

        public Task<Province> FindProvinceAsync(int id)
        {
            return Task.Run(() => _provinces.FirstOrDefaultAsync(s => s.Id == id));
        }

        public Task<Province> FindProvinceAsync(string name)
        {
            return Task.Run( () => _provinces.FirstOrDefaultAsync( s => s.Name == name));
        }

        public Task<List<Province>> GetAllProvincesAsync()
        {
            return Task.Run( () => _provinces.ToListAsync());
        }
    }
}
