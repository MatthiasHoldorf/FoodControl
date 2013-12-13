namespace FoodControl.Model
{
    using System.Data.Entity.ModelConfiguration;

    public class ActivityMap : EntityTypeConfiguration<Activity>
    {
        public ActivityMap()
        {
            // Primary Key
            this.HasKey(t => t.ActID);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("Activity");
            this.Property(t => t.ActID).HasColumnName("ActID");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.MET).HasColumnName("MET");
            this.Property(t => t.IsDeleted).HasColumnName("IsDeleted");
        }
    }
}
