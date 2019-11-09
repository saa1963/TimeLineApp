using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using TimeLineApp.services;
using Microsoft.Extensions.Hosting;

namespace TimeLineApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie();
            services.AddControllersWithViews();
            services.AddSingleton<IUserStorage, FileUserStorage>();
            services.AddSingleton<ITLStorage, FileTLStorage>();
            services.AddSingleton<ITLStorage2, LiteDBStorage>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseHttpsRedirection();
            app.UseAuthentication();

            //app.UseEndpoints(endpoints => {
            //    endpoints.MapControllers();
            //});

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllerRoute(
                //    name: "areaRoute",
                //    pattern: "{area:exists}/{controller}/{action}",
                //    defaults: new { action = "Index" });

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Default", action = "Index" });

                //endpoints.MapControllerRoute(
                //    name: "api",
                //    pattern: "{controller}/{id?}");
            });

            //app.UseMvc();
        }
    }
}
