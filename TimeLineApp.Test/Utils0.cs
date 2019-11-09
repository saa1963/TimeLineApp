using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;

namespace TimeLineApp.Test
{
    public static class Utils0
    {
        public static string filesFolder()
        {
            return Path.Combine(new FileInfo(typeof(TimeLineTest).GetTypeInfo().Assembly.Location)
                .DirectoryName, "files");
        }

        public static string getFile(string name)
        {
            return Path.Combine(filesFolder(), name);
        }

        public static string usersFolder()
        {
            return @"C:\Users\Сошины\source\repos\TimeLineApp2\TimeLineApp";
        }
    }
}
