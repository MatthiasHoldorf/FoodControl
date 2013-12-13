namespace FoodControl.Model
{
    public partial class NutritionLog
    {
        public int NLID { get; set; }
        public int UserID { get; set; }
        public int FoodID { get; set; }
        public int ProfileID { get; set; }
        public System.DateTime Date { get; set; }
        public short Daytime { get; set; }
        public decimal Quantity { get; set; }
        public virtual Food Food { get; set; }
        public virtual Profile Profile { get; set; }
        public virtual User User { get; set; }
    }
}
