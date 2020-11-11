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
    public class PatientController : ControllerBase
    {
        private MedicalCareDBContext _context;

        public PatientController(MedicalCareDBContext context)
        {
            _context = context;
        }


       [HttpGet]
        public IEnumerable<Patient> Get()
        {
            return _context.Patients.ToList();
        }

        [HttpGet("{id}")]
        public Patient Get([FromRoute]int id)
        {
            Patient patient = _context.Patients.Find(id);
            return patient;
        }

        [HttpPost]
        public void POST(Patient patient)
        {
            _context.Patients.Add(patient);
            _context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void PUT([FromBody] Patient patient, [FromRoute] int id)
        {
            var patient1 = _context.Patients.Find(id);
            patient1.Name = patient.Name;
            patient1.BirthDate = patient.BirthDate;
            patient1.Gender = patient.Gender;
            patient1.Address = patient.Address;
            _context.Entry(patient1).State = EntityState.Modified;
            _context.SaveChanges();
        }

        [HttpDelete]
        //This method will delete a patient
        public string Delete(int id)
        {
            Patient patient = _context.Patients.Find(id);
            _context.Patients.Remove(patient);
            _context.SaveChanges();
            return "Patient deleted!";
        }
    }
}
