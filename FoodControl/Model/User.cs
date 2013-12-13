namespace FoodControl.Model
{
    using System.Collections.Generic;

    public partial class User
    {
        public User()
        {
            this.ActivityLogs = new List<ActivityLog>();
            this.NutritionLogs = new List<NutritionLog>();
            this.VitalDatas = new List<VitalData>();
        }

        public int UserID { get; set; }
        public int ProfileID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public System.DateTime Birthday { get; set; }
        public short Sex { get; set; }
        public short ActivityLevel { get; set; }
        public bool IsVegetarian { get; set; }
        public bool IsPorkEater { get; set; }
        public bool IsFishEater { get; set; }
        public virtual ICollection<ActivityLog> ActivityLogs { get; set; }
        public virtual ICollection<NutritionLog> NutritionLogs { get; set; }
        public virtual Profile Profile { get; set; }
        public virtual ICollection<VitalData> VitalDatas { get; set; }
    }
}
