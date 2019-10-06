using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public class BearerTokensOptions
    {
        public string secretKey { set; get; }

        public string encryptionkey { set; get; }

        public string Issuer { set; get; }

        public string Audience { set; get; }

        public int AccessTokenExpirationMinutes { set; get; }

        public int RefreshTokenExpirationMinutes { set; get; }

        public bool AllowMultipleLoginsFromTheSameUser { set; get; }

        public bool AllowSignoutAllUserActiveClients { set; get; }
    }
}
