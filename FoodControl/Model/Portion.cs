namespace FoodControl.Model
{
    using System.Collections.Generic;

    public partial class Portion
    {
        public Portion()
        {
            this.Foods = new List<Food>();
        }

        public int PortionID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Food> Foods { get; set; }
    }
}
