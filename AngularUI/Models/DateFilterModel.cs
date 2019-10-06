using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularUI.Models
{
    public class DateFilterModel
    {
        public int[] operators { get; set; }

        public int[] technologies { get; set; }

        public DateTime fromDate { get; set; }

        public DateTime toDate { get; set; }
    }
}
