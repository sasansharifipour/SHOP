using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DomainClasses
{
    public class User : IdentityUser<int>
    {
        public User()
        {
            UserTokens = new HashSet<UserToken>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public override int Id { get; set; }

        public string Name { get; set; }

        public string Family { get; set; }

        public string Mobile { get; set; }
                
        public virtual ICollection<UserToken> UserTokens { get; set; }

    }
}
