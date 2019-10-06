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
    public interface ICitiesService
    {
        Task<City> FindCityAsync(int id);

        Task<City> FindCityAsync(string name);

        Task<List<City>> GetAllCitiesAsync();
    }

    public class CitiesService : ICitiesService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<City> _cities;

        public CitiesService(IUnitOfWork uow)
        {
            _uow = uow;
            _uow.CheckArgumentIsNull(nameof(_uow));

            _cities = _uow.Set<City>();
        }

        public Task<City> FindCityAsync(int id)
        {
            return Task.Run(() => _cities.FirstOrDefaultAsync(s => s.Id == id));
        }

        public Task<City> FindCityAsync(string name)
        {
            return Task.Run(() => _cities.FirstOrDefaultAsync(s => s.Name == name));
        }

        public Task<List<City>> GetAllCitiesAsync()
        {
            return Task.Run(() => _cities.ToListAsync());
        }
    }
}
