using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
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

        /// <summary>
        /// UnauthorizedAccessException
        /// </summary>
        /// <param name="httpCtx"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool IsExist(HttpContext httpCtx, string name)
        {
            var fname = getFileName(httpCtx, name);
            return File.Exists(fname);
        }

        public TimeLine Load(string name)
        {
            throw new NotImplementedException();
        }

        public bool Save(HttpContext httpCtx, TimeLine tl)
        {
            try
            {
                var fname = getFileName(httpCtx, tl.Name);
                IFormatter formatter = new BinaryFormatter();
                Stream stream = new FileStream(fname, FileMode.Create, FileAccess.Write, FileShare.None);
                formatter.Serialize(stream, tl);
                stream.Close();
                return true;
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        private string getFileName(HttpContext httpCtx, string name)
        {
            if (httpCtx.User.HasClaim(s => s.Type == ClaimTypes.Name))
            {
                var userName = httpCtx.User.Claims.SingleOrDefault(s => s.Type == ClaimTypes.Name).Value;
                if (userName != null)
                {
                    return Path.Combine(env.ContentRootPath, "data", userName + "." + name + ".tl");
                }
                else
                {
                    throw new UnauthorizedAccessException("Неавторизованный доступ.");
                }
            }
            else
            {
                throw new UnauthorizedAccessException("Неавторизованный доступ.");
            }
        }
    }
}
