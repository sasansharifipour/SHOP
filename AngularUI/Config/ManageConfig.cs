using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using System.Text;
using StructureMap;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using DataLayer.Context;
using DomainClasses;
using Services;

namespace AngularUI.Config
{
    public static class ManageConfig
    {
        public static IServiceProvider config(IServiceCollection services,
            IConfiguration Configuration)
        {
            //CookiesConfig(services);
            DatabaseConfig(services, Configuration);
            DefaultIdentityConfig(services);
            return DependencyInjectorConfig(services);
        }

        private static void CookiesConfig(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
        }

        private static void DatabaseConfig(IServiceCollection services,
            IConfiguration Configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ConnectionString"))
                    .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
                /*
                UseMySql(
                Configuration.GetConnectionString("ConnectionString"),
                opt =>
                {
                    opt.CharSetBehavior(CharSetBehavior.AppendToAllColumns).
                    AnsiCharSet(CharSet.Utf8mb3).UnicodeCharSet(CharSet.Utf8mb3);
                }));*/
        }

        private static void DefaultIdentityConfig(IServiceCollection services)
        {
            services.AddDefaultIdentity<User>()
                .AddRoles<Role>()
                .AddDefaultUI()
                .AddEntityFrameworkStores<ApplicationDbContext>();
        }

        private static IServiceProvider DependencyInjectorConfig(IServiceCollection services)
        {
            var container = new Container();

            container.Configure(config =>
            {
                config.AddRegistry(new MyStructuremapRegistry());
                config.Populate(services);
            });

            AutoMapperWebConfiguration.Configure();

            return container.GetInstance<IServiceProvider>();
        }

    }
}
