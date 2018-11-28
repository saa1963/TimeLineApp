using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;

namespace TimeLineApp.Test
{
    public class Utils
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
    }
}
