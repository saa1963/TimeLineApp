using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace TimeLineApp.services
{
    public class FileUserStorage : IUserStorage
    {
        private readonly string path;
        public FileUserStorage(IHostingEnvironment hostingEnvironment)
        {
            path = Path.Combine(hostingEnvironment.ContentRootPath, "data", "users.dat");
        }

        public bool Contains(string login, string password)
        {
            bool rt = false;
            if (File.Exists(path))
            {
                var lines = File.ReadLines(path);
                foreach (var line in lines)
                {
                    var a = line.Split('^');
                    if (a[0].ToUpper() == login.ToUpper())
                    {
                        rt = true;
                        break;
                    }
                }
            }
            return rt;
        }

        public bool Remove(string login)
        {
            throw new NotImplementedException();
        }

        public bool Save(string login, string email, string password)
        {
            bool rt = false;
            string user = $"{login}^{email}^{password}";
            if (!Contains(login, password))
            {
                if (!File.Exists(path))
                {
                    File.WriteAllLines(path, new string[] { user });
                }
                else
                {
                    var lines = File.ReadLines(path);
                    lines.Append(user);
                    File.WriteAllLines(path, lines);
                }
                rt = true;
            }
            return rt;
        }
    }
}
