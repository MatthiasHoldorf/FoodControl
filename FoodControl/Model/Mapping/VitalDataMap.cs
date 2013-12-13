namespace FoodControl.Model
{
    using System.Data.Entity.ModelConfiguration;

    public class VitalDataMap : EntityTypeConfiguration<VitalData>
    {
        public VitalDataMap()
        {
            // Primary Key
            this.HasKey(t => t.VitalID);

            // Properties
            // Table & Column Mappings
            this.ToTable("VitalData");
            this.Property(t => t.VitalID).HasColumnName("VitalID");
            this.Property(t => t.UserID).HasColumnName("UserID");
            this.Property(t => t.Date).HasColumnName("Date");
            this.Property(t => t.BodyHeight).HasColumnName("BodyHeight");
            this.Property(t => t.BodyWeight).HasColumnName("BodyWeight");
            this.Property(t => t.Adipose).HasColumnName("Adipose");

            // Relationships
            this.HasRequired(t => t.User)
                .WithMany(t => t.VitalDatas)
                .HasForeignKey(d => d.UserID);

        }
    }
}
