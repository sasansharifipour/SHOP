using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClasses
{
    public class Address
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int CityId { get; set; }

        public City City { get; set; }

        public string Neighbourhood { get; set; }

        public string MainStreet { get; set; }

        public string ByStreet { get; set; }

        public string Alley { get; set; }

        public string Number { get; set; }

        public int PositionId { get; set; }

        public Position Position { get; set; }


    }
}
