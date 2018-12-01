using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public string Post([FromForm]Register model)
        {
            if (storage.Save(model.Login, model.Email, model.Password1))
            {
                return "";
            }
            return "Данный пользователь уже зарегистрирован";
        }

        [Route("api/register/log")]
        [HttpPost]
        public string Logon([FromForm]Logon model)
        {
            if (storage.Logon(model.Login, model.Password))
            {
                return "";
            }
            return "Ошибка входа";
        }
    }
}
