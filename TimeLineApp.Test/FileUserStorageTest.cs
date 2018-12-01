using System;
using System.Collections.Generic;
using System.Text;
using TimeLineApp.services;
using Xunit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.Extensions.FileProviders;
using System.IO;
using System.Text.RegularExpressions;

namespace TimeLineApp.Test
{
    public class FileUserStorageTest
    {
        IHostingEnvironment env = new MyInv();
        IHostingEnvironment env1 = new MyInv1();
        string login = "zakryvashkrf";
        string email = "zakryvashkrf@mail.ru";
        string password = "1";
        [Fact]
        public void CommonTest()
        {
            var fname = Path.Combine(Utils.filesFolder(), "data", "users.dat");
            if (File.Exists(fname))
            {
                File.Delete(fname);
            }
            var o = new FileUserStorage(env);
            Assert.NotNull(o);
            var flag = o.Save(login, email, password);
            Assert.True(flag);
            flag = o.Save(login, email, password);
            Assert.False(flag);
            flag = o.Contains(login);
            Assert.True(flag);
            flag = o.Contains(login + "0");
            Assert.False(flag);
            flag = o.Remove(login);
            Assert.True(flag);
            flag = o.Remove(login + "0");
            Assert.False(flag);
            flag = o.Contains(login);
            Assert.False(flag);

        }
        [Fact]
        public void Common1Test()
        {
            var fname = Path.Combine(Utils.filesFolder(), "data", "users.dat");
            var o = new FileUserStorage(env1);
            Assert.NotNull(o);
            Assert.True(o.Contains("soshin"));
        }
    }

    class MyInv : IHostingEnvironment
    {

        string IHostingEnvironment.EnvironmentName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        string IHostingEnvironment.ApplicationName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        string IHostingEnvironment.WebRootPath { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        IFileProvider IHostingEnvironment.WebRootFileProvider { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        string IHostingEnvironment.ContentRootPath
        {
            get
            {
                return Utils.filesFolder();
            }
            set => throw new NotImplementedException();
        }
        IFileProvider IHostingEnvironment.ContentRootFileProvider { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }

    class MyInv1 : IHostingEnvironment
    {

        string IHostingEnvironment.EnvironmentName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        string IHostingEnvironment.ApplicationName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        string IHostingEnvironment.WebRootPath { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        IFileProvider IHostingEnvironment.WebRootFileProvider { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        string IHostingEnvironment.ContentRootPath
        {
            get
            {
                return Utils.usersFolder();
            }
            set => throw new NotImplementedException();
        }
        IFileProvider IHostingEnvironment.ContentRootFileProvider { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
