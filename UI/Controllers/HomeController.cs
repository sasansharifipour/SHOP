using System.Diagnostics;
using System.Security.Claims;

using DomainClasses;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace UI.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        // You can inject anything you want here
        public HomeController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public IActionResult Index()
        {
            ClaimsPrincipal currentUser = this.User;
            
            if (currentUser.Identity != null && currentUser.Identity.Name != null)
            {
                var appUser = _userManager.FindByNameAsync(
                currentUser.Identity.Name).Result;

            }

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        /*
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            //return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }*/
    }
}
