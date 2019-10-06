using AngularUI.Models;
using AutoMapper;
using DomainClasses;

namespace AngularUI.Config
{
    public static class AutoMapperWebConfiguration
    {
        public static void Configure()
        {
            ConfigureUserMapping();
        }

        private static void ConfigureUserMapping()
        {
            Mapper.Initialize(cfg => {
                cfg.CreateMap<User, UserViewModel>();

                cfg.CreateMap<Operator, OperatorViewModel>();

                cfg.CreateMap<Technology, TechnologyViewModel>();

                cfg.CreateMap<RegistrationViewModel, User>() .ForMember(
                    destination => destination.UserName, opts =>  opts.MapFrom(source => source.eMail)) .ForMember(
                    destination => destination.Id, opts => opts.Ignore()).ForMember(
                    destination => destination.NormalizedUserName, opts => opts.Ignore()).ForMember(
                    destination => destination.NormalizedEmail, opts => opts.Ignore()).ForMember(
                    destination => destination.EmailConfirmed, opts => opts.Ignore()).ForMember(
                    destination => destination.PasswordHash, opts => opts.Ignore()).ForMember(
                    destination => destination.SecurityStamp, opts => opts.Ignore()).ForMember(
                    destination => destination.ConcurrencyStamp, opts => opts.Ignore()).ForMember(
                    destination => destination.PhoneNumber, opts => opts.Ignore()).ForMember(
                    destination => destination.PhoneNumberConfirmed, opts => opts.Ignore()).ForMember(
                    destination => destination.TwoFactorEnabled, opts => opts.Ignore()).ForMember(
                    destination => destination.LockoutEnd, opts => opts.Ignore()).ForMember(
                    destination => destination.LockoutEnabled, opts => opts.Ignore()).ForMember(
                    destination => destination.AccessFailedCount, opts => opts.Ignore());
            });
        }
    }
}
