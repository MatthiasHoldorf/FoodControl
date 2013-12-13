namespace FoodControl.Model
{
    using System.Data.Entity.ModelConfiguration;

    public class FoodMap : EntityTypeConfiguration<Food>
    {
        public FoodMap()
        {
            // Primary Key
            this.HasKey(t => t.FoodID);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("Food");
            this.Property(t => t.FoodID).HasColumnName("FoodID");
            this.Property(t => t.PortionID).HasColumnName("PortionID");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.KiloCalories).HasColumnName("KiloCalories");
            this.Property(t => t.Fat).HasColumnName("Fat");
            this.Property(t => t.Saturates).HasColumnName("Saturates");
            this.Property(t => t.Protein).HasColumnName("Protein");
            this.Property(t => t.Carbohydrate).HasColumnName("Carbohydrate");
            this.Property(t => t.Sugar).HasColumnName("Sugar");
            this.Property(t => t.Salt).HasColumnName("Salt");
            this.Property(t => t.IsMeat).HasColumnName("IsMeat");
            this.Property(t => t.IsPork).HasColumnName("IsPork");
            this.Property(t => t.IsFish).HasColumnName("IsFish");
            this.Property(t => t.BaseUnit).HasColumnName("BaseUnit");
            this.Property(t => t.MeasuringUnit).HasColumnName("MeasuringUnit");
            this.Property(t => t.IsDeleted).HasColumnName("IsDeleted");

            // Relationships
            this.HasMany(t => t.FoodCategories)
                .WithMany(t => t.Foods)
                .Map(m =>
                    {
                        m.ToTable("FoodCategoryAllocation");
                        m.MapLeftKey("FoodID");
                        m.MapRightKey("CatID");
                    });

            this.HasRequired(t => t.Portion)
                .WithMany(t => t.Foods)
                .HasForeignKey(d => d.PortionID);

        }
    }
}
