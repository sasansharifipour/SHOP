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
    public interface IOperatorService
    {
        Task<Operator> FindOperatorAsync(int id);

        Task<Operator> FindOperatorAsync(string title);

        Task<List<Operator>> GetAllOperatorsAsync();
    }

    public class OperatorService : IOperatorService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<Operator> _operators;

        public OperatorService(IUnitOfWork uow)
        {
            _uow = uow;
            _uow.CheckArgumentIsNull(nameof(_uow));

            _operators = _uow.Set<Operator>();
        }

        public Task<Operator> FindOperatorAsync(int id)
        {
            return Task.Run(() => _operators
                .FirstOrDefaultAsync(s => s.Id == id));
        }

        public Task<Operator> FindOperatorAsync(string title)
        {
            return Task.Run(() => _operators
                .FirstOrDefaultAsync(s => s.Title == title));
        }

        public Task<List<Operator>> GetAllOperatorsAsync()
        {
            return Task.Run(() => _operators.ToListAsync());
        }
    }
}
