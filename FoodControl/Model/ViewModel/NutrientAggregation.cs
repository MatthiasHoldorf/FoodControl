namespace FoodControl.Model
{
    using System;

    public class NutrientAggregation
    {
        public decimal KiloCalories { get; set; }
        public decimal Fat { get; set; }
        public Nullable<decimal> Saturates { get; set; }
        public decimal Protein { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal Sugar { get; set; }
        public Nullable<decimal> Salt { get; set; }
        public DateTime Date { get; set; }
    }
}
