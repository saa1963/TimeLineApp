using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LiteDB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using TimeLineApp.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace TimeLineApp.services
{
    public class LiteDBStorage : ITLStorage
    {
        IWebHostEnvironment env;
        private string dbName;
        public LiteDBStorage(IWebHostEnvironment hostingEnvironment)
        {
            env = hostingEnvironment;
            dbName = Path.Combine(env.ContentRootPath, "data", "db.dat");
        }
        public bool IsExist(HttpContext httpCtx, string name)
        {
            try
            {
                // Open database (or create if not exits)
                using (var db = new LiteDatabase(dbName))
                {
                    var user = new CommonServices().getUserName(httpCtx);
                    // Find all files references in a "directory"
                    var files = db.FileStorage.Find(user + "/" + name).SingleOrDefault();
                    return files != null;
                }
            }
            catch(Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        public IEnumerable<string> List(HttpContext httpCtx)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var user = new CommonServices().getUserName(httpCtx);
                    var col = db.GetCollection<TString>("timelines");
                    return col.Find(s => s.Header.StartsWith(user + "@")).Select(s => s.Body).ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        private string LoadFromBase(string name)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var col = db.GetCollection<TString>("timelines");
                    return col.FindOne(s => s.Header == name).Body;
                }
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }

        private bool SaveToBase(string header, string body)
        {
            try
            {
                using (var db = new LiteDatabase(dbName))
                {
                    var col = db.GetCollection<TString>("timelines");
                    if (col.Exists(s => s.Header == header))
                    {
                        var doc = col.FindOne(s => s.Header == header);
                        doc.Body = body;
                        col.Update(doc);
                    }
                    else
                    {
                        col.Insert(new TString() { Header = header, Body = body });
                    }
                    col.EnsureIndex(x => x.Header, true);
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
                return SaveToBase(user + "@" + header, body);
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
                return LoadFromBase(user + "@" + name);
            }
            catch (Exception e)
            {
                throw new Exception($"Exception in {this.GetType().FullName} {this.GetType().Name}", e);
            }
        }
    }
}
