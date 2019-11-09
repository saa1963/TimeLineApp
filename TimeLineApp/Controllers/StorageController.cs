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
        private readonly ITLStorage2 storage2;

        public StorageController(ITLStorage _storage, ITLStorage2 _storage2)
        {
            storage = _storage;
            storage2 = _storage2;
        }

        [HttpPost]
        [Route("api/storage/save")]
        public IActionResult Save([FromForm]DblString model)
        {
            try
            {
                //var tl = TimeLine.FromJSON(model.s2);
                //storage.Save(HttpContext, tl);
                storage2.Save2(HttpContext, model.s1, model.s2);
                return Ok();
            }
            catch(Exception e)
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

        [HttpGet]
        [Route("api/storage/load")]
        public ActionResult<string> Load(string fname)
        {
            try
            {
                return storage2.Load2(HttpContext, fname);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}