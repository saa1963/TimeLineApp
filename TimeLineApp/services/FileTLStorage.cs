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

        public bool IsExist(HttpContext httpCtx, string name)
        {
            var fname = getFileName(httpCtx, name);
            return File.Exists(fname);
        }

        public IEnumerable<string> List(HttpContext httpCtx)
        {
            var rt = new List<string>();
            var userName = getUserName(httpCtx);
            var path = Path.Combine(env.ContentRootPath, "data"); //, userName + "." + name + ".tl");
            var files = Directory.GetFiles(path, userName + ".*.tl");
            foreach (var f in files)
            {
                var fname = Path.GetFileName(f);
                var ar = fname.Split('.');
                rt.Add(ar[1]);
            }
            return rt;
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

        private string getUserName(HttpContext httpCtx)
        {
            string rt = null;
            if (httpCtx.User.HasClaim(s => s.Type == ClaimTypes.Name))
            {
                var userName = httpCtx.User.Claims.SingleOrDefault(s => s.Type == ClaimTypes.Name).Value;
                if (userName != null)
                {
                    rt =  userName;
                }
            }
            if (rt != null)
                return rt;
            else
                throw new UnauthorizedAccessException("Неавторизованный доступ");
        }

        private string getFileName(HttpContext httpCtx, string name)
        {
            var userName = getUserName(httpCtx);
            return Path.Combine(env.ContentRootPath, "data", userName + "." + name + ".tl");
        }
    }
}
