using System;
using System.Collections.Generic;
using System.Text;
using TimeLineApp.services;
using Xunit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Hosting;

namespace TimeLineApp.Test
{
    public class FileUserStorageTest
    {
        IWebHostEnvironment env = new MyInv();
        IWebHostEnvironment env1 = new MyInv1();
        string login = "zakryvashkrf";
        string email = "zakryvashkrf@mail.ru";
        string password = "1";
        [Fact]
        public void CommonTest()
        {
            var fname = Path.Combine(Utils0.filesFolder(), "data", "users.dat");
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
            var fname = Path.Combine(Utils0.filesFolder(), "data", "users.dat");
            var o = new FileUserStorage(env1);
            Assert.NotNull(o);
            Assert.True(o.Contains("soshin"));
        }
    }

    class MyInv : IWebHostEnvironment
    {
        public IFileProvider WebRootFileProvider { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string WebRootPath { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string ApplicationName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public IFileProvider ContentRootFileProvider { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string EnvironmentName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        string IHostEnvironment.ContentRootPath { get => Utils0.filesFolder(); set => throw new NotImplementedException(); }
    }

    class MyInv1 : IWebHostEnvironment
    {
        public IFileProvider WebRootFileProvider { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string WebRootPath { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string ApplicationName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public IFileProvider ContentRootFileProvider { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string ContentRootPath { get => Utils0.usersFolder(); set => throw new NotImplementedException(); }
        public string EnvironmentName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
