using AngularUI.Controllers;
using DataLayer.Context;
using DomainClasses;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Services;
using StructureMap;
using StructureMap.Pipeline;

namespace AngularUI.Config
{
    public class MyStructuremapRegistry : Registry
    {
        public MyStructuremapRegistry()
        {
            For<IUserStore<IdentityUser>>().LifecycleIs(Lifecycles.Container)
                .Use<UserStore<IdentityUser>>();

            For<IPasswordHasher<IdentityUser>>().LifecycleIs(Lifecycles.Container)
                .Use<PasswordHasher<IdentityUser>>();

            For<IUserClaimsPrincipalFactory<IdentityUser>>().LifecycleIs(Lifecycles.Container)
                .Use<UserClaimsPrincipalFactory<IdentityUser>>();

            For<UserManager<User>>().LifecycleIs(Lifecycles.Container)
                .Use<UserManager<User>>();

            For<IUsersService>()
                .Use<UsersService>();

            For<IUnitOfWork>().LifecycleIs(Lifecycles.Container)
                .Use<ApplicationDbContext>();

            For<ITokenStoreService>().LifecycleIs(Lifecycles.Container)
                .Use<TokenStoreService>();

            For<ITokenFactoryService>().LifecycleIs(Lifecycles.Container)
                .Use<TokenFactoryService>();

            For<IAntiForgeryCookieService>().LifecycleIs(Lifecycles.Container)
                .Use<AntiForgeryCookieService>();

            For<ISecurityService>().LifecycleIs(Lifecycles.Container)
                .Use<SecurityService>();

            For<IRolesService>().LifecycleIs(Lifecycles.Container)
                .Use<RolesService>();

            For<ITokenValidatorService>().LifecycleIs(Lifecycles.Container)
                .Use<TokenValidatorService>();
            
            /*For<Controller>().LifecycleIs(Lifecycles.Unique)
                .Use<ApiUsersController>().Named("User");

            For<Controller>().LifecycleIs(Lifecycles.Container)
                .Use<ApiOperatorController>().Named("Operator");

            For<Controller>().LifecycleIs(Lifecycles.Container)
                .Use<ApiTechnologyController>().Named("Technology");

            For<Controller>().LifecycleIs(Lifecycles.Container)
                .Use<ApiDataProviderController>().Named("DataProvider");*/
        }
    }
}
