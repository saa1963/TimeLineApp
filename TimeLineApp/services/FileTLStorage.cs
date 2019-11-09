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
using Newtonsoft.Json;

namespace TimeLineApp.services
{
    public class FileTLStorage : ITLStorage
    {
        IWebHostEnvironment env;
        public FileTLStorage(IWebHostEnvironment hostingEnvironment)
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
            var userName = new CommonServices().getUserName(httpCtx);
            var path = Path.Combine(env.ContentRootPath, "data"); //, userName + "." + name + ".tl");
            var files = Directory.GetFiles(path, userName + ".*.tl");
            foreach (var f in files)
            {
                var tl = LoadFile(f);
                rt.Add(tl.Name);
            }
            return rt;
        }

        public TimeLine Load(HttpContext httpCtx, string name)
        {
            try
            {
                var fname = getFileName(httpCtx, name);
                return LoadFile(fname);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private TimeLine LoadFile(string name)
        {
            JsonSerializer serializer = new JsonSerializer();
            using (var sr = new StreamReader(name))
            {
                using (var jr = new JsonTextReader(sr))
                {
                    return serializer.Deserialize<TimeLine>(jr);
                }
            }
        }

        public bool Save(HttpContext httpCtx, TimeLine tl)
        {
            try
            {
                var fname = getFileName(httpCtx, tl.Name);
                File.WriteAllText(fname, tl.ToJSON());
                return true;
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        

        private string getFileName(HttpContext httpCtx, string name)
        {
            var userName = new CommonServices().getUserName(httpCtx);
            foreach (var ch in Path.GetInvalidFileNameChars())
            {
                if (name.Contains(ch))
                {
                    name = name.Replace(ch, '_');
                }
            }
            var fname = Path.Combine(env.ContentRootPath, "data", userName + "." + name + ".tl");
            return fname;
        }
    }
}
