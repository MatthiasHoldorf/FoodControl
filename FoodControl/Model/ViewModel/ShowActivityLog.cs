namespace FoodControl.Model.ViewModel
{
    using System.ComponentModel;

    public class ShowActivityLog
    {
        [DisplayName("Name der Aktivität")]
        public string Name { get; set; }
        [DisplayName("Dauer in Minuten")]
        public short Duration { get; set; }
        [DisplayName("Kilokalorien")]
        public decimal KiloCalories { get; set; }
        [DisplayName("Metabolic Equivalent Task (MET)")]
        public decimal MET { get; set; }
    }
}
