﻿using Microsoft.AspNetCore.Http;
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
        TimeLine Load(string name);
        bool IsExist(HttpContext httpCtx, string name);
        IEnumerable<string> List(HttpContext httpCtx);
    }
}
