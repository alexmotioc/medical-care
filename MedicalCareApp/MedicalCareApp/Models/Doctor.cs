using System;
using System.Collections.Generic;

#nullable disable

namespace MedicalCareApp.Models
{
    public partial class Doctor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}
