namespace FoodControl.Model.ViewModel
{
    using System.ComponentModel;

    public class ShowNutritionLog
    {
        [Browsable(false)]
        public short Daytime { get; set; }
        [DisplayName("Menge")]
        public string Quantity { get; set; }
        public string Name { get; set; }
        [DisplayName("Kilokalorien")]
        public decimal KiloCalories { get; set; }
        [DisplayName("Kohlenhydrate")]
        public decimal Carbohydrate { get; set; }
        [DisplayName("Eiweiß")]
        public decimal Protein { get; set; }
        [DisplayName("Fett")]
        public decimal Fat { get; set; }
        [DisplayName("Zucker")]
        public decimal Sugar { get; set; }
    }
}
