using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TimeLineApp.Models;

namespace TimeLineApp.services
{
    public class FileTLStorage : ITLStorage
    {
        IHostingEnvironment env;
        public FileTLStorage(IHostingEnvironment hostingEnvironment)
        {
            env = hostingEnvironment;
        }
        public bool IsExist(HttpContext httpCtx, string name)
        {
            var err = getFileName(httpCtx, name);
            if (err.IsSuccess) return
        }

        public TimeLine Load(string name)
        {
            throw new NotImplementedException();
        }

        public bool Save(TimeLine tl)
        {
            throw new NotImplementedException();
        }

        private string getFileName(HttpContext httpCtx, string name)
        {
            var userName = httpCtx.User.Claims.SingleOrDefault(s => s.Type == ClaimTypes.Name).Value;
            if (userName != null)
            {
                return Path.Combine(env.ContentRootPath, "data", userName + "." + name + ".tl");
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
        }
    }
}
