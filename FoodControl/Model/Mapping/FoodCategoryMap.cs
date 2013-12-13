namespace FoodControl.Model
{
    using System.Data.Entity.ModelConfiguration;

    public class FoodCategoryMap : EntityTypeConfiguration<FoodCategory>
    {
        public FoodCategoryMap()
        {
            // Primary Key
            this.HasKey(t => t.CatID);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("FoodCategory");
            this.Property(t => t.CatID).HasColumnName("CatID");
            this.Property(t => t.Name).HasColumnName("Name");
        }
    }
}
