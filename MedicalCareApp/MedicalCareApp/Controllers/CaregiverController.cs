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
    public class CaregiverController : ControllerBase
    {
        private MedicalCareDBContext _context;

        public CaregiverController(MedicalCareDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IEnumerable<Caregiver> Get()
        {
            return _context.Caregivers.ToList();
        }

        [HttpGet("{id}")]
        public Caregiver Get([FromRoute] int id)
        {
            Caregiver caregiver = _context.Caregivers.Find(id);
            return caregiver;
        }

        [HttpGet("{id}/Patients")]
        public List<Patient> GetP([FromRoute] int id)
        {
            var userId = _context.Caregivers.Where(c => c.UserId == id).FirstOrDefault().Id;
            var caregiver = _context.Patients.Where(p => p.AuxPatientCaregivers.Where(pc => pc.IdCaregiver == userId).Any()).ToList();
            return caregiver;
        }


        [HttpPost]
        public void POST(Caregiver caregiver)
        {
            _context.Caregivers.Add(caregiver);
            _context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void PUT([FromBody]Caregiver caregiver,[FromRoute]int id)
        {
            var caregiver1 = _context.Caregivers.Find(id);
            caregiver1.Name = caregiver.Name;
            caregiver1.BirthDate = caregiver.BirthDate;
            caregiver1.Gender = caregiver.Gender;
            caregiver1.Address = caregiver.Address;
            _context.Entry(caregiver1).State = EntityState.Modified;
            _context.SaveChanges();
        }

        [HttpDelete]
        //This method will delete a caregiver
        public string Delete(int id)
        {
            Caregiver caregiver = _context.Caregivers.Find(id);
            _context.Caregivers.Remove(caregiver);
            _context.SaveChanges();
            return "Caregiver deleted!";
        }
    }
}
