using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MedicalCareApp.Models;
using Microsoft.EntityFrameworkCore;

namespace MedicalCareApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoctorController : ControllerBase
    {
        private MedicalCareDBContext _context;

        public DoctorController(MedicalCareDBContext context)
        {
            _context = context;
        }


       [HttpGet]
        public IEnumerable<Doctor> Get()
        {
            return _context.Doctors.ToList();
        }

        [HttpGet("{id}")]
        public Doctor Get([FromRoute]int id)
        {
            Doctor doctor = _context.Doctors.Find(id);
            return doctor;
        }

        [HttpGet("{id}/Patients")]
        public List<Patient> GetPatients([FromRoute] int id)
        {
            var patients = _context.Patients.ToList();
            return patients;
        }

        [HttpPost]
        public void POST(Doctor doctor)
        {
            _context.Doctors.Add(doctor);
            _context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void PUT([FromBody] Doctor doctor, [FromRoute] int id)
        {
            var doctor1 = _context.Doctors.Find(id);
            doctor1.Name = doctor.Name;
            doctor1.Surname = doctor.Surname;
            _context.Entry(doctor1).State = EntityState.Modified;
            _context.SaveChanges();
        }

        [HttpDelete]
        //This method will delete a doctor
        public string Delete(int id)
        {
            Doctor doctor = _context.Doctors.Find(id);
            _context.Doctors.Remove(doctor);
            _context.SaveChanges();
            return "Doctor deleted!";
        }
    }
}
