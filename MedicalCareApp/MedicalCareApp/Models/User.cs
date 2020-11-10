using System;
using System.Collections.Generic;

#nullable disable

namespace MedicalCareApp.Models
{
    public partial class User
    {
        public User()
        {
            Caregivers = new HashSet<Caregiver>();
            Doctors = new HashSet<Doctor>();
            Patients = new HashSet<Patient>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Caregiver> Caregivers { get; set; }
        public virtual ICollection<Doctor> Doctors { get; set; }
        public virtual ICollection<Patient> Patients { get; set; }
    }
}
