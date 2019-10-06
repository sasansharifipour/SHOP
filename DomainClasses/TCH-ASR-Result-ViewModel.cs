using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClasses
{
    public class TCH_ASR_Result_ViewModel
    {
        public int operatorId { get; set; }

        public int technologyId { get; set; }

        public DateTime accurance_date { get; set; }

        public double RANAP_RABAssignment_Response { get; set; }

        public double RANAP_RABAssignment_Request { get; set; }
    }
}
