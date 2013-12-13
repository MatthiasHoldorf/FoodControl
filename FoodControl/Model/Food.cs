namespace FoodControl.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;

    public partial class Food
    {
        public Food()
        {
            this.NutritionLogs = new List<NutritionLog>();
            this.FoodCategories = new List<FoodCategory>();
        }

        [Browsable(false)]
        public int FoodID { get; set; }
        [Browsable(false)]
        public int PortionID { get; set; }
        public string Name { get; set; }
        [DisplayName("Kilokalorien")]
        public decimal KiloCalories { get; set; }
        [DisplayName("Kohlenhydrate")]
        public decimal Carbohydrate { get; set; }
        [DisplayName("Fett")]
        public decimal Fat { get; set; }
        [DisplayName("Zucker")]
        public decimal Sugar { get; set; }
        [DisplayName("Salz")]
        public Nullable<decimal> Salt { get; set; }
        [DisplayName("ges. Fetts‰uren")]
        public Nullable<decimal> Saturates { get; set; }
        [DisplayName("Eiweiﬂ")]
        public decimal Protein { get; set; }
        [DisplayName("Enth‰lt Fleisch")]
        public bool IsMeat { get; set; }
        [DisplayName("Enth‰lt Schwein")]
        public bool IsPork { get; set; }
        [DisplayName("Enth‰lt Fisch")]
        public bool IsFish { get; set; }
        [DisplayName("Portionsgrˆﬂe")]
        public decimal BaseUnit { get; set; }
        [DisplayName("Maﬂeinheit")]
        public short MeasuringUnit { get; set; }
        [Browsable(false)]
        public virtual Portion Portion { get; set; }
        [Browsable(false)]
        public virtual ICollection<NutritionLog> NutritionLogs { get; set; }
        [Browsable(false)]
        public virtual ICollection<FoodCategory> FoodCategories { get; set; }
        [Browsable(false)]
        public bool IsDeleted { get; set; }
    }
}
