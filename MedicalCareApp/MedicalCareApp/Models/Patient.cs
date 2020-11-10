using System;
using System.Collections.Generic;

#nullable disable

namespace MedicalCareApp.Models
{
    public partial class Patient
    {
        public Patient()
        {
            AuxPatientCaregivers = new HashSet<AuxPatientCaregiver>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string BirthDate { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string MedicalRecord { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<AuxPatientCaregiver> AuxPatientCaregivers { get; set; }
    }
}
