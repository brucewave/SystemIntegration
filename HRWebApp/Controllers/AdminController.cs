using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using HRWebApp.Services;

namespace HRWebApp.Controllers
{
    public class AdminController : Controller
    {
        private readonly EmployeeService _employeeService;

        public AdminController()
        {
            _employeeService = new EmployeeService();
        }

        // GET: Admin
        public async Task<ActionResult> Index()
        {
            var employees = await _employeeService.GetEmployeesAsync();
            int totalEmployees = employees.Count();
            ViewBag.TotalEmployees = totalEmployees;
            return View();
        }
    }
}
