using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeLineApp.Models;

namespace TimeLineApp.Controllers
{
    [ApiController]
    public class StorageController : ControllerBase
    {
        [HttpPost]
        [Route("api/storage/save")]
        public bool Save([FromForm]DblString model)
        {
            bool rt = false;
            var tl = new TimeLine(model.s1, model.s2);
            return rt;
        }
    }
}