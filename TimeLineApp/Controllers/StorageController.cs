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
    [ApiController]
    public class StorageController : ControllerBase
    {
        private readonly ITLStorage storage;

        public StorageController(ITLStorage _storage)
        {
            storage = _storage;
        }

        [HttpPost]
        [Route("api/storage/save")]
        public IActionResult Save([FromForm]DblString model)
        {
            try
            {
                var tl = new TimeLine(model.s1, model.s2);
                storage.Save(HttpContext, tl);
                return Ok();
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("api/storage/list")]
        public ActionResult<IEnumerable<string>> List()
        {
            try
            {
                return Ok(storage.List(HttpContext));
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}