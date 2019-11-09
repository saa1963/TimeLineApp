using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeLineApp.Models;

namespace TimeLineApp.services
{
    public interface ITLStorage
    {
        bool Save(HttpContext httpCtx, TimeLine tl);
        TimeLine Load(HttpContext httpCtx, string name);
        bool IsExist(HttpContext httpCtx, string name);
        IEnumerable<string> List(HttpContext httpCtx);
    }

    public interface ITLStorage2
    {
        bool Save2(HttpContext httpCtx, string header, string body);
        string Load2(HttpContext httpCtx, string name);
    }
}
