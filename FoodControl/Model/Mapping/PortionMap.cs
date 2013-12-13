namespace FoodControl.Model
{
    using System.Data.Entity.ModelConfiguration;

    public class PortionMap : EntityTypeConfiguration<Portion>
    {
        public PortionMap()
        {
            // Primary Key
            this.HasKey(t => t.PortionID);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("Portion");
            this.Property(t => t.PortionID).HasColumnName("PortionID");
            this.Property(t => t.Name).HasColumnName("Name");
        }
    }
}
