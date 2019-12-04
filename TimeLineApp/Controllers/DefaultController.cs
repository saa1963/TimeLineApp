using Microsoft.AspNetCore.Mvc;

namespace TimeLineApp.Controllers
{
    public class DefaultController : Controller
    {
        // GET: Default
        public ActionResult Index()
        {
            return View();
        }
    }
}