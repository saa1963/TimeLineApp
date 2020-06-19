using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineApp.services
{
    public class SQLiteStorage : ITLStorage
    {
        IWebHostEnvironment env;
        private string dbName;
        public SQLiteStorage(IWebHostEnvironment hostingEnvironment)
        {
            env = hostingEnvironment;
            dbName = Path.Combine(env.ContentRootPath, "data", "db.sqlite");
        }
        public bool IsExist(HttpContext httpCtx, string name)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<string> List(HttpContext httpCtx)
        {
            try
            {
                using (var cn = new SQLiteConnection($"Data Source={dbName};Version=3;FailIfMissing=True;"))
                {
                    var user = new CommonServices().getUserName(httpCtx);
                    cn.Open();
                    using (var cmd = new SQLiteCommand("select header from timelines where user = ?", cn))
                    {
                        cmd.Parameters.AddWithValue(null, user.ToUpper());
                        var lst = new List<string>();
                        using (var dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                lst.Add(dr.GetString(0));
                            }
                            return lst;
                        }
                    }
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
                using (var cn = new SQLiteConnection($"Data Source={dbName};Version=3;FailIfMissing=True;"))
                {
                    cn.Open();
                    using (var cmd = new SQLiteCommand("select body from timelines where user = ? and header = ?", cn))
                    {
                        cmd.Parameters.AddWithValue(null, user.ToUpper());
                        cmd.Parameters.AddWithValue(null, name);
                        return cmd.ExecuteScalar().ToString();
                    }
                }
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

        private bool SaveToBase(string user, string header, string body)
        {
            try
            {
                using (var cn = new SQLiteConnection($"Data Source={dbName};Version=3;FailIfMissing=True;"))
                {
                    cn.Open();
                    using (var cmd = new SQLiteCommand("insert into timelines (User, Header, Body) values (?, ?, ?)", cn))
                    {
                        cmd.Parameters.AddWithValue(null, user.ToUpper());
                        cmd.Parameters.AddWithValue(null, header);
                        cmd.Parameters.AddWithValue(null, body);
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
    }
}
