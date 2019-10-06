using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClasses
{
    public class Role : IdentityRole<int>
    {
        public Role()
        {
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
