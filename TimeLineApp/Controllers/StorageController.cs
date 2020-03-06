using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
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
        public IActionResult Save(DblString model)
        {
            try
            {
                storage.Save(HttpContext, model.s1, model.s2);
                return Ok();
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

        [HttpGet]
        [Route("api/storage/list")]
        public ActionResult<IEnumerable<string>> List()
        {
            try
            {
                return Ok(storage.List(HttpContext));
            }
            catch (Exception e)
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
                return storage.Load(HttpContext, fname);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Route("api/storage/upload")]
        public async Task<IActionResult> Index(IFormFile formFile)
        {
            //long size = files.Sum(f => f.Length);

            //var filePaths = new List<string>();
            if (formFile.Length > 0)
            {
                // full path to file in temp location
                var filePath = Path.GetTempFileName();

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await formFile.CopyToAsync(stream);
                }
                return Ok();
            }
            else
            {
                return Problem();
            }
        }
    }
}