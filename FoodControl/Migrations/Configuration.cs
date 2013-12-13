namespace FoodControl.Migrations
{
    using System.Data.Entity.Migrations;
    using FoodControl.DataAccessLayer;

    internal sealed class Configuration : DbMigrationsConfiguration<DatabaseContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }
    }
}
