using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TimeLineApp.Models;
using TimeLineApp.services;

namespace TimeLineApp.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IUserStorage storage;
        public RegisterController(IUserStorage _storage)
        {
            storage = _storage;
        }

        [Route("api/register/reg")]
        [HttpPost]
        public string Post(Register model)
        {
            if (storage.Save(model.Login, model.Email, model.Password1))
            {
                return "";
            }
            return "Данный пользователь уже зарегистрирован";
        }

        [Route("api/register/log")]
        [HttpPost]
        public async Task<IActionResult> Logon(Logon model)
        {
            try
            {
                if (storage.Logon(model.Login, model.Password))
                {
                    await AuthenticateUser(model.Login);
                    HttpContext.Response.Cookies.Append("timelineuser", model.Login,
                        new CookieOptions() { Expires = new DateTimeOffset(DateTime.Now.AddMonths(1)), HttpOnly = false });
                    return Ok();
                }
                return StatusCode(511, "Неверный пользователь или пароль");
            }
            catch (Exception e)
            {
                var msg = "";
                while (e != null)
                {
                    msg += e.Message;
                    e = e.InnerException;
                }
                return StatusCode(500, msg);
            }
        }

        [Route("api/register/logout")]
        [HttpGet]
        public async Task<bool> Logout()
        {
            await HttpContext.SignOutAsync();
            return true;
        }

        private async Task AuthenticateUser(string login)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, login),
            };
            var claimsIdentity = new ClaimsIdentity(claims, "Cookies", ClaimTypes.Name, ClaimTypes.Role);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
        }
    }
}
