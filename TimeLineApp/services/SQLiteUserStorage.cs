using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SQLite;
using System.Diagnostics;

namespace TimeLineApp.services
{
    public class SQLiteUserStorage : IUserStorage
    {
        IWebHostEnvironment env;
        private string dbName;
        private string connString;
        public SQLiteUserStorage(IWebHostEnvironment hostingEnvironment)
        {
            env = hostingEnvironment;
            dbName = Path.Combine(env.ContentRootPath, "data", "db.sqlite");
            connString = $"Data Source={dbName};Version=3;FailIfMissing=True;";
        }
        public bool Contains(string login)
        {
            throw new NotImplementedException();
        }

        public bool Logon(string login, string password)
        {
            try
            {
                using (var cn = new SQLiteConnection(connString))
                {
                    cn.Open();
                    using (var cmd = new SQLiteCommand("select count(id) from users where Login = ? and Password = ?", cn))
                    {
                        cmd.Parameters.AddWithValue(null, login.ToUpper());
                        cmd.Parameters.AddWithValue(null, password);
                        var r = (long)cmd.ExecuteScalar();
                        return r == 1;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        public bool Remove(string login)
        {
            throw new NotImplementedException();
        }

        public bool Save(string login, string email, string password)
        {
            try
            {
                using (var cn = new SQLiteConnection(connString))
                {
                    cn.Open();
                    using (var cmd = new SQLiteCommand("insert into users (Login, Email, Password) values (?, ?, ?)", cn))
                    {
                        cmd.Parameters.AddWithValue(null, login.ToUpper());
                        cmd.Parameters.AddWithValue(null, email);
                        cmd.Parameters.AddWithValue(null, password);
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }
    }
}
