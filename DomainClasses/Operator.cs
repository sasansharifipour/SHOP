using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DomainClasses
{
    public class Operator
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string IP_Address { get; set; }

        public string Database_Name { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

    }
}
