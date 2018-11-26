using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeLineApp.Models;

namespace TimeLineApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        // POST: api/Register
        [HttpPost]
        public ActionResult Post([FromForm] Register model)
        {
            if (RegisterUser(model))
            {
                return Redirect("/index.html");
            }
            return BadRequest();
        }

        private bool RegisterUser(Register model)
        {
            return true;
        }
    }
}
