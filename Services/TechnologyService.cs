using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Common;
using DataLayer.Context;
using DomainClasses;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public interface ITechnologyService
    {
        Task<Technology> FindTechnologyAsync(int id);

        Task<Technology> FindTechnologyAsync(string title);

        Task<List<Technology>> GetAllTechnologiesAsync();
    }

    public class TechnologyService : ITechnologyService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<Technology> _technologies;
        
        public TechnologyService(IUnitOfWork uow)
        {
            _uow = uow;
            _uow.CheckArgumentIsNull(nameof(_uow));

            _technologies = _uow.Set<Technology>();
        }

        public Task<Technology> FindTechnologyAsync(int id)
        {
            return Task.Run(() => _technologies
                .FirstOrDefaultAsync(s => s.Id == id));
        }

        public Task<Technology> FindTechnologyAsync(string title)
        {
            return Task.Run(() => _technologies
                .FirstOrDefaultAsync(s => s.Title == title));
        }

        public Task<List<Technology>> GetAllTechnologiesAsync()
        {
            return Task.Run(() => _technologies.ToListAsync());
        }
    }
}
