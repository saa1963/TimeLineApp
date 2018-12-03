using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeLineApp.Models;

namespace TimeLineApp.services
{
    public interface ITLStorage
    {
        bool Save(TimeLine tl);
        TimeLine Load(string name);
        bool IsExist(string name);
    }
}
