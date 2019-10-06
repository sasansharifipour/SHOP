using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClasses
{
    public class Gauge_Result_ViewModel
    {
        public int operatorId { get; set; }

        public int technologyId { get; set; }

        public DateTime accurance_date { get; set; }

        public double weight { get; set; }

        public double data { get; set; }
    }
}
