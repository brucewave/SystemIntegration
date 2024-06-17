using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Formatting;
using Newtonsoft.Json.Linq;

namespace HRWebApp.Services
{
    public class EmployeeService
    {
        private readonly HttpClient _httpClient;

        public EmployeeService()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("http://localhost:4000/api/");
        }

        public async Task<List<Employee>> GetEmployeesAsync()
        {

            var response = await _httpClient.GetAsync("employee");
            response.EnsureSuccessStatusCode();
            var responseJson = await response.Content.ReadAsStringAsync();
            var parsedJson = JObject.Parse(responseJson);
            var employees = parsedJson["data"].ToObject<List<Employee>>();

            return employees;
        }
    }

    public class Employee
    {
        public string _id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int vacationDays { get; set; }
        public int paidToDate { get; set; }
        public int paidLastYear { get; set; }
        public double payRate { get; set; }
        public int payRateId { get; set; }
    }
}
