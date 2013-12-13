namespace FoodControl.Model
{
    public partial class ActivityLog
    {
        public int ALID { get; set; }
        public int ActID { get; set; }
        public int UserID { get; set; }
        public System.DateTime Date { get; set; }
        public short Duration { get; set; }
        public virtual Activity Activity { get; set; }
        public virtual User User { get; set; }
    }
}
