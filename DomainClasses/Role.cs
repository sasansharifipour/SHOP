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

        public override int Id { get; set; }
        public override string Name { get; set; }
    }
}
