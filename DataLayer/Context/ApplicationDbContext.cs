using System.Security.Cryptography.X509Certificates;
using DomainClasses;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Context
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, int>,
        IUnitOfWork
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Stuff> Stuffs { get; set; }

        //public DbSet<Operator> Operators { get; set; }

        //public DbSet<Technology> Technologies { get; set; }

        //DbSet<Province> Provinces { get; set; }

        //DbSet<City> Cities { get; set; }

        //public virtual DbSet<tblKPIUMT> tblKPIUMTS { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().Property(u => u.Id)
                .ValueGeneratedOnAdd();

            base.OnModelCreating(builder);

            builder.Entity<Province>().Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Entity<Province>().HasAlternateKey(s => s.Name);

            builder.Entity<Stuff>().Property(s => s.Id).ValueGeneratedOnAdd();

            builder.Entity<City>().Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Entity<City>().HasAlternateKey(s => new { s.Name, s.ProvinceId });

        }
    }
}
