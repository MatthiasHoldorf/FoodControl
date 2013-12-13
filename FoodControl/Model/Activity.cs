namespace FoodControl.Model
{
    using System.Collections.Generic;
    using System.ComponentModel;

    public partial class Activity
    {
        public Activity()
        {
            this.ActivityLogs = new List<ActivityLog>();
        }

        [Browsable(false)]
        public int ActID { get; set; }
        public string Name { get; set; }
        public decimal MET { get; set; }
        [Browsable(false)]
        public virtual ICollection<ActivityLog> ActivityLogs { get; set; }
        [Browsable(false)]
        public bool IsDeleted { get; set; }
    }
}
