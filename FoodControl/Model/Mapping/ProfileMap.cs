namespace FoodControl.Model
{
    using System.Data.Entity.ModelConfiguration;

    public class ProfileMap : EntityTypeConfiguration<Profile>
    {
        public ProfileMap()
        {
            // Primary Key
            this.HasKey(t => t.ProfileID);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("Profile");
            this.Property(t => t.ProfileID).HasColumnName("ProfileID");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.TV_Calories).HasColumnName("TV_KiloCalories");
            this.Property(t => t.TV_Fat).HasColumnName("TV_Fat");
            this.Property(t => t.TV_Saturates).HasColumnName("TV_Saturates");
            this.Property(t => t.TV_Protein).HasColumnName("TV_Protein");
            this.Property(t => t.TV_Carbohydrate).HasColumnName("TV_Carbohydrate");
            this.Property(t => t.TV_Sugar).HasColumnName("TV_Sugar");
            this.Property(t => t.TV_Salt).HasColumnName("TV_Salt");
            this.Property(t => t.IsDeleted).HasColumnName("IsDeleted");
        }
    }
}
