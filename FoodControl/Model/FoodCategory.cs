namespace FoodControl.Model
{
    using System.Collections.Generic;

    public partial class FoodCategory
    {
        public FoodCategory()
        {
            this.Foods = new List<Food>();
        }

        public int CatID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Food> Foods { get; set; }
    }
}
