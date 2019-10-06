using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClasses
{
    public class Province
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<City> Cities { get; set; }
    }
}
