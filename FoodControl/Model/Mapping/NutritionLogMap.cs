namespace FoodControl.Model
{
    using System.Data.Entity.ModelConfiguration;

    public class NutritionLogMap : EntityTypeConfiguration<NutritionLog>
    {
        public NutritionLogMap()
        {
            // Primary Key
            this.HasKey(t => t.NLID);

            // Properties
            // Table & Column Mappings
            this.ToTable("NutritionLog");
            this.Property(t => t.NLID).HasColumnName("NLID");
            this.Property(t => t.UserID).HasColumnName("UserID");
            this.Property(t => t.FoodID).HasColumnName("FoodID");
            this.Property(t => t.ProfileID).HasColumnName("ProfileID");
            this.Property(t => t.Date).HasColumnName("Date");
            this.Property(t => t.Daytime).HasColumnName("Daytime");
            this.Property(t => t.Quantity).HasColumnName("Quantity");

            // Relationships
            this.HasRequired(t => t.Food)
                .WithMany(t => t.NutritionLogs)
                .HasForeignKey(d => d.FoodID);
            this.HasRequired(t => t.Profile)
                .WithMany(t => t.NutritionLogs)
                .HasForeignKey(d => d.ProfileID);
            this.HasRequired(t => t.User)
                .WithMany(t => t.NutritionLogs)
                .HasForeignKey(d => d.UserID);

        }
    }
}
