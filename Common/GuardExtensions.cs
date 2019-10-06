using System;
using System.Collections.Generic;
using System.Text;

namespace Common
{
    public static class GuardExtensions
    {
        public static void CheckArgumentIsNull(this object value,string name)
        {
            if (value == null)
                throw new ArgumentNullException(name);
        }
    }
}
