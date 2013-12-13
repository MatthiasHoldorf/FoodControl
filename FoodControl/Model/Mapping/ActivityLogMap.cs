namespace FoodControl.Model
{
    using System.Data.Entity.ModelConfiguration;

    public class ActivityLogMap : EntityTypeConfiguration<ActivityLog>
    {
        public ActivityLogMap()
        {
            // Primary Key
            this.HasKey(t => t.ALID);

            // Properties
            // Table & Column Mappings
            this.ToTable("ActivityLog");
            this.Property(t => t.ALID).HasColumnName("ALID");
            this.Property(t => t.ActID).HasColumnName("ActID");
            this.Property(t => t.UserID).HasColumnName("UserID");
            this.Property(t => t.Date).HasColumnName("Date");
            this.Property(t => t.Duration).HasColumnName("Duration");

            // Relationships
            this.HasRequired(t => t.Activity)
                .WithMany(t => t.ActivityLogs)
                .HasForeignKey(d => d.ActID);
            this.HasRequired(t => t.User)
                .WithMany(t => t.ActivityLogs)
                .HasForeignKey(d => d.UserID);

        }
    }
}
