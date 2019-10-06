using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClasses
{
    public class City
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int ProvinceId { get; set; }

        public Province Province { get; set; }
    }
}
