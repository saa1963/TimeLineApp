using LiteDB;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using TimeLineApp.Models;

namespace TimeLineApp.services
{
    public class LiteDBUserStorage : IUserStorage
    {
        IWebHostEnvironment env;
        private string dbName;
        public LiteDBUserStorage(IWebHostEnvironment hostingEnvironment)
        {
            env = hostingEnvironment;
            dbName = Path.Combine(env.ContentRootPath, "data", "db.dat");
        }
        public bool Contains(string login)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var col = db.GetCollection<User>("users");
                    return col.Exists(s => s.Login == login.ToLower());
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        public bool Logon(string login, string password)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var col = db.GetCollection<User>("users");
                    return col.Exists(s => s.Login == login.ToLower() && s.Password == password);
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        public bool Remove(string login)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var col = db.GetCollection<User>("users");
                    return col.DeleteMany(s => s.Login == login.ToLower()) == 1;
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        public bool Save(string login, string email, string password)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var col = db.GetCollection<User>("users");
                    if (!col.Exists(s => s.Login == login.ToLower()))
                    {
                        col.Insert(new User() { Login = login.ToLower(), Email = email, Password = password });
                    }
                    return true;
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }
    }
}
