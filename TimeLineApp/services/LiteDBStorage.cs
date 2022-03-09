using LiteDB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using TimeLineApp.Models;

namespace TimeLineApp.services
{
    public class LiteDBStorage : ITLStorage
    {
        IWebHostEnvironment env;
        private string dbName;
        private string timelines = "timelines";
        public LiteDBStorage(IWebHostEnvironment hostingEnvironment)
        {
            env = hostingEnvironment;
            dbName = Path.Combine(env.ContentRootPath, "data", "db5.dat");
            using (var db = new LiteDatabase(dbName))
            {
                if (!db.GetCollectionNames().Contains(timelines))
                {
                    var col = db.GetCollection<TString>(timelines);
                    col.EnsureIndex(s => s.Header);
                    col.EnsureIndex(s => s.User);
                }
            }
        }
        public bool IsExist(HttpContext httpCtx, string name)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<string> List(HttpContext httpCtx)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var user = new CommonServices().getUserName(httpCtx);
                    var col = db.GetCollection<TString>(timelines);
                    return col.Find(s => s.User == user.ToLower()).Select(s => s.Header).ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        private string LoadFromBase(string user, string name)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var col = db.GetCollection<TString>("timelines");
                    return col.FindOne(s => s.Header == name && s.User == user).Body;
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        private bool SaveToBase(string user, string header, string body)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var col = db.GetCollection<TString>("timelines");
                    if (col.Exists(s => s.Header == header && s.User == user.ToLower()))
                    {
                        var doc = col.FindOne(s => s.Header == header && s.User == user.ToLower());
                        doc.Body = body;
                        col.Update(doc);
                    }
                    else
                    {
                        col.Insert(new TString() { User = user.ToLower(), Header = header, Body = body, Version = "1" });
                    }
                    return true;
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        public bool Save(HttpContext httpCtx, string header, string body)
        {
            try
            {
                var user = new CommonServices().getUserName(httpCtx);
                return SaveToBase(user, header, body);
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        public string Load(HttpContext httpCtx, string name)
        {
            try
            {
                var user = new CommonServices().getUserName(httpCtx);
                return LoadFromBase(user, name);
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }
    }
}
