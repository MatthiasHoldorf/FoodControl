namespace FoodControl.Model
{
    using System;
    using System.Collections.Generic;

    public partial class Profile
    {
        public Profile()
        {
            this.NutritionLogs = new List<NutritionLog>();
            this.Users = new List<User>();
        }

        public int ProfileID { get; set; }
        public string Name { get; set; }
        public Nullable<decimal> TV_Calories { get; set; }
        public Nullable<decimal> TV_Fat { get; set; }
        public Nullable<decimal> TV_Saturates { get; set; }
        public Nullable<decimal> TV_Protein { get; set; }
        public Nullable<decimal> TV_Carbohydrate { get; set; }
        public Nullable<decimal> TV_Sugar { get; set; }
        public Nullable<decimal> TV_Salt { get; set; }
        public virtual ICollection<NutritionLog> NutritionLogs { get; set; }
        public virtual ICollection<User> Users { get; set; }
        public bool IsDeleted { get; set; }
    }
}
