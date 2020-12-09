using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalCareApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCareApp.Controllers
{
    public class AuthDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class AuthResponse
    {
        public List<string> Roles { get; set; }
        public int UserId { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
     public class AuthController : ControllerBase
    {
        private MedicalCareDBContext _context;
        public AuthController(MedicalCareDBContext context)
        {
            _context = context;
        }
        //MedicalCareDBEntities db = new MedicalCareDBEntities();
        [HttpGet]
        public string get()
        {
            return "hello";

        }


        [HttpPost]
        // POST api/values
        public AuthResponse Post([FromBody] AuthDTO value)

        {
            User user = _context.Users.Where(u => u.Username == value.Username && u.Password == value.Password).FirstOrDefault();
            if (user != null)
            {
                var roles = new List<string>();
                if (_context.Caregivers.Where(u => u.UserId == user.Id).Any()) 
                {
                    roles.Add("caregiver");
                }
                if (_context.Doctors.Where(u => u.UserId == user.Id).Any())
                {
                    roles.Add("doctor");
                }
                if (_context.Patients.Where(u => u.UserId == user.Id).Any())
                {
                    roles.Add("patient");
                }

                return new AuthResponse
                {
                    Roles = roles,
                    UserId = user.Id
                };
            }
            else
                return null;
        }

      
    }
}
