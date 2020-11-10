using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MedicalCareApp.Models;


namespace MedicalCareApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MedicationController : ControllerBase
    {
        private MedicalCareDBContext _context;

        public MedicationController(MedicalCareDBContext context)
        {
            _context = context;
        }


       [HttpGet]
        public IEnumerable<Medication> Get()
        {
            return _context.Medications.ToList();
        }

        [HttpGet("{id}")]
        public Medication Get([FromRoute]int id)
        {
            Medication medication = _context.Medications.Find(id);
            return medication;
        }

        [HttpPost]
        public void POST(Medication medication)
        {
            _context.Medications.Add(medication);
            _context.SaveChanges();
        }

        [HttpDelete]
        //This method will delete a medication
        public string Delete(int id)
        {
            Medication medication = _context.Medications.Find(id);
            _context.Medications.Remove(medication);
            _context.SaveChanges();
            return "Medication deleted!";
        }
    }
}
