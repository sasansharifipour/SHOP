using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularUI.Models
{
    public class UserChangePasswordModel
    {
        public string email { get; set; }

        public string password { get; set; }

        public string newpassword { get; set; }
    }
}
