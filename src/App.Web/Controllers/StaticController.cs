using Microsoft.AspNet.Mvc;

namespace App.Web.Controllers
{
	public class StaticController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult Chat()
		{
			return View();
		}
	}
}