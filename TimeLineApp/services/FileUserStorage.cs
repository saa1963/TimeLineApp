using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;

namespace TimeLineApp.services
{
    public class FileUserStorage : IUserStorage
    {
        private readonly string path;
        public FileUserStorage(IWebHostEnvironment hostingEnvironment)
        {
             path = Path.Combine(hostingEnvironment.ContentRootPath, "data", "users.dat");
        }

        public bool Contains(string login)
        {
            bool rt = false;
            string upperLogin = login.ToUpper();
            var rgx = new Regex(@"^" + upperLogin + @"\^", RegexOptions.Multiline);
            if (File.Exists(path))
            {
                var users = File.ReadAllText(path).ToUpper();
                rt = rgx.IsMatch(users);
            }
            return rt;
        }

        public bool Logon(string login, string password)
        {
            bool rt = false;
            if (File.Exists(path))
            {
                var users = File.ReadLines(path).ToList();
                foreach (var s in users)
                {
                    var a = s.Split('^');
                    if (a[0].ToUpper() == login.ToUpper() && a[2] == password)
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
            bool rt = false;
            string upperLogin = login.ToUpper();
            var rgx = new Regex(@"^" + upperLogin + @"\^");
            if (File.Exists(path))
            {
                var users = File.ReadLines(path).ToList();
                var user = users.SingleOrDefault(s => rgx.IsMatch(s.ToUpper()));
                if (user != null)
                {
                    users.Remove(user);
                    File.WriteAllLines(path, users);
                    rt = true;
                }
                else
                {
                    rt = false;
                }
            }
            return rt;
        }

        public bool Save(string login, string email, string password)
        {
            bool rt = false;
            string user = $"{login}^{email}^{password}";
            if (!Contains(login))
            {
                if (!File.Exists(path))
                {
                    File.WriteAllLines(path, new string[] { user });
                }
                else
                {
                    var lines = File.ReadAllLines(path).ToList();
                    lines.Add(user);
                    File.WriteAllLines(path, lines);
                }
                rt = true;
            }
            return rt;
        }
    }
}
