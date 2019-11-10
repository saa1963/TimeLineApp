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
        string Load(HttpContext httpCtx, string name);
        bool IsExist(HttpContext httpCtx, string name);
        IEnumerable<string> List(HttpContext httpCtx);
        bool Save(HttpContext httpCtx, string header, string body);
    }
}
