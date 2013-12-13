namespace FoodControl.Model
{
    using System.Data.Entity.ModelConfiguration;

    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            // Primary Key
            this.HasKey(t => t.UserID);

            // Properties
            this.Property(t => t.LastName)
                .IsRequired()
                .HasMaxLength(256);

            this.Property(t => t.FirstName)
                .IsRequired()
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("User");
            this.Property(t => t.UserID).HasColumnName("UserID");
            this.Property(t => t.ProfileID).HasColumnName("ProfileID");
            this.Property(t => t.LastName).HasColumnName("LastName");
            this.Property(t => t.FirstName).HasColumnName("FirstName");
            this.Property(t => t.Birthday).HasColumnName("Birthday");
            this.Property(t => t.Sex).HasColumnName("Sex");
            this.Property(t => t.ActivityLevel).HasColumnName("ActivityLevel");
            this.Property(t => t.IsVegetarian).HasColumnName("IsVegetarian");
            this.Property(t => t.IsPorkEater).HasColumnName("IsPorkEater");
            this.Property(t => t.IsFishEater).HasColumnName("IsFishEater");

            // Relationships
            this.HasRequired(t => t.Profile)
                .WithMany(t => t.Users)
                .HasForeignKey(d => d.ProfileID);

        }
    }
}
