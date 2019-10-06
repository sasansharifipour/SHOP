using DomainClasses;
using System;
using System.Collections.Generic;
using System.Text;

namespace TestProject
{
    public static class CreateTempDataList
    {
        public static List<User> GetTestAllUser()
        {
            var sessions = new List<User>();
            sessions.Add(new User()
            {
                Id = 1,
                UserName = "SasanSharifipour@spi.local",
                NormalizedUserName = "SASANSHARIFIPOUR@SPI.LOCAL",
                Email = "SasanSharifipour@spi.local",
                NormalizedEmail = "SASANSHARIFIPOUR@SPI.LOCAL",
                EmailConfirmed = false,
                PasswordHash =
                "AQAAAAEAACcQAAAAEOR1/cM405QsOIXun91XTcIrfptmopr4VbsWCQIlUYmeOJwGjJUK6KWghS+W2LzuHw==",
                SecurityStamp = "UDR2MGJECPKACVB74AXTMXRPIRYAZYGQ",
                ConcurrencyStamp = "ea3737f5-551c-4d13-aa75-13467ec5f5cc",
                PhoneNumber = null,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnd = null,
                LockoutEnabled = false,
                AccessFailedCount = 0,
                Name = "Sasan",
                Family = null,
                Mobile = "09120245247"
            });
            sessions.Add(new User()
            {
                Id = 2,
                UserName = "SasanSharifi@spi.local",
                NormalizedUserName = "SASANSHARIFI@SPI.LOCAL",
                Email = "SasanSharifi@spi.local",
                NormalizedEmail = "SASANSHARIFI@SPI.LOCAL",
                EmailConfirmed = false,
                PasswordHash =
                "AQAAAAEAACcQAAAAEOR1/cM405QsOIXun91XTcIrfptmopr4VbsWCQIlUYmeOJwGjJUK6KWghS+W2LzuHw==",
                SecurityStamp = "UDR2MGJECPKACVB74AXTMXRPIRYAZYGQ",
                ConcurrencyStamp = "ea3737f5-551c-4d13-aa75-13467ec5f5cc",
                PhoneNumber = null,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnd = null,
                LockoutEnabled = false,
                AccessFailedCount = 0,
                Name = "Sasan",
                Family = null,
                Mobile = "09369367043"
            });
            return sessions;
        }

    }
}
