namespace FoodControl.Model
{
    using System;

    public partial class VitalData
    {
        public int VitalID { get; set; }
        public int UserID { get; set; }
        public System.DateTime Date { get; set; }
        public short BodyHeight { get; set; }
        public decimal BodyWeight { get; set; }
        public Nullable<decimal> Adipose { get; set; }
        public virtual User User { get; set; }
    }
}
