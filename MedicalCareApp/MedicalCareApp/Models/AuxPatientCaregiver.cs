using System;
using System.Collections.Generic;

#nullable disable

namespace MedicalCareApp.Models
{
    public partial class AuxPatientCaregiver
    {
        public int Id { get; set; }
        public int IdPatient { get; set; }
        public int IdCaregiver { get; set; }

        public virtual Caregiver IdCaregiverNavigation { get; set; }
        public virtual Patient IdPatientNavigation { get; set; }
    }
}
