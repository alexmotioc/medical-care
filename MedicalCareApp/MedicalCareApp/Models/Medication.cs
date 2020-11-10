using System;
using System.Collections.Generic;

#nullable disable

namespace MedicalCareApp.Models
{
    public partial class Medication
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SideEffects { get; set; }
        public string Dosage { get; set; }
    }
}
