namespace FoodControl.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreatingDatabase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Activity",
                c => new
                    {
                        ActID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        MET = c.Short(nullable: false),
                    })
                .PrimaryKey(t => t.ActID);
            
            CreateTable(
                "dbo.ActivityLog",
                c => new
                    {
                        ALID = c.Int(nullable: false, identity: true),
                        ActID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Duration = c.Short(nullable: false),
                    })
                .PrimaryKey(t => t.ALID)
                .ForeignKey("dbo.Activity", t => t.ActID, cascadeDelete: true)
                .ForeignKey("dbo.User", t => t.UserID, cascadeDelete: true)
                .Index(t => t.ActID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        ProfileID = c.Int(nullable: false),
                        LastName = c.String(nullable: false, maxLength: 256),
                        FirstName = c.String(nullable: false, maxLength: 256),
                        Birthday = c.DateTime(nullable: false),
                        Sex = c.Short(nullable: false),
                    })
                .PrimaryKey(t => t.UserID)
                .ForeignKey("dbo.Profile", t => t.ProfileID, cascadeDelete: true)
                .Index(t => t.ProfileID);
            
            CreateTable(
                "dbo.NutritionLog",
                c => new
                    {
                        NLID = c.Int(nullable: false, identity: true),
                        UserID = c.Int(nullable: false),
                        FoodID = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Daytime = c.Short(nullable: false),
                        Quantity = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.NLID)
                .ForeignKey("dbo.Food", t => t.FoodID, cascadeDelete: true)
                .ForeignKey("dbo.User", t => t.UserID, cascadeDelete: true)
                .Index(t => t.FoodID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.Food",
                c => new
                    {
                        FoodID = c.Int(nullable: false, identity: true),
                        PortionID = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 256),
                        KiloJoule = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Fat = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Saturates = c.Decimal(precision: 18, scale: 2),
                        Protein = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Carbohydrate = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Sugar = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Salt = c.Decimal(precision: 18, scale: 2),
                        IsMeat = c.Boolean(nullable: false),
                        IsPork = c.Boolean(nullable: false),
                        IsFish = c.Boolean(nullable: false),
                        BaseUnit = c.Decimal(nullable: false, precision: 18, scale: 2),
                        MeasuringUnit = c.Short(nullable: false),
                    })
                .PrimaryKey(t => t.FoodID)
                .ForeignKey("dbo.Portion", t => t.PortionID, cascadeDelete: true)
                .Index(t => t.PortionID);
            
            CreateTable(
                "dbo.Portion",
                c => new
                    {
                        PortionID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.PortionID);
            
            CreateTable(
                "dbo.FoodCategory",
                c => new
                    {
                        CatID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.CatID);
            
            CreateTable(
                "dbo.Profile",
                c => new
                    {
                        ProfileID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        TV_KiloJoule = c.Decimal(precision: 18, scale: 2),
                        TV_Fat = c.Decimal(precision: 18, scale: 2),
                        TV_Saturates = c.Decimal(precision: 18, scale: 2),
                        TV_Protein = c.Decimal(precision: 18, scale: 2),
                        TV_Carbohydrate = c.Decimal(precision: 18, scale: 2),
                        TV_Sugar = c.Decimal(precision: 18, scale: 2),
                        TV_Salt = c.Decimal(precision: 18, scale: 2),
                        TV_IsVegetarian = c.Boolean(nullable: false),
                        TV_IsPorkEater = c.Boolean(nullable: false),
                        TV_IsFishEater = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ProfileID);
            
            CreateTable(
                "dbo.VitalData",
                c => new
                    {
                        VitalID = c.Int(nullable: false, identity: true),
                        UserID = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        BodyHeight = c.Short(nullable: false),
                        BodyWeight = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Adipose = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.VitalID)
                .ForeignKey("dbo.User", t => t.UserID, cascadeDelete: true)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.FoodCategoryAllocation",
                c => new
                    {
                        FoodID = c.Int(nullable: false),
                        CatID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.FoodID, t.CatID })
                .ForeignKey("dbo.Food", t => t.FoodID, cascadeDelete: true)
                .ForeignKey("dbo.FoodCategory", t => t.CatID, cascadeDelete: true)
                .Index(t => t.FoodID)
                .Index(t => t.CatID);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.FoodCategoryAllocation", new[] { "CatID" });
            DropIndex("dbo.FoodCategoryAllocation", new[] { "FoodID" });
            DropIndex("dbo.VitalData", new[] { "UserID" });
            DropIndex("dbo.Food", new[] { "PortionID" });
            DropIndex("dbo.NutritionLog", new[] { "UserID" });
            DropIndex("dbo.NutritionLog", new[] { "FoodID" });
            DropIndex("dbo.User", new[] { "ProfileID" });
            DropIndex("dbo.ActivityLog", new[] { "UserID" });
            DropIndex("dbo.ActivityLog", new[] { "ActID" });
            DropForeignKey("dbo.FoodCategoryAllocation", "CatID", "dbo.FoodCategory");
            DropForeignKey("dbo.FoodCategoryAllocation", "FoodID", "dbo.Food");
            DropForeignKey("dbo.VitalData", "UserID", "dbo.User");
            DropForeignKey("dbo.Food", "PortionID", "dbo.Portion");
            DropForeignKey("dbo.NutritionLog", "UserID", "dbo.User");
            DropForeignKey("dbo.NutritionLog", "FoodID", "dbo.Food");
            DropForeignKey("dbo.User", "ProfileID", "dbo.Profile");
            DropForeignKey("dbo.ActivityLog", "UserID", "dbo.User");
            DropForeignKey("dbo.ActivityLog", "ActID", "dbo.Activity");
            DropTable("dbo.FoodCategoryAllocation");
            DropTable("dbo.VitalData");
            DropTable("dbo.Profile");
            DropTable("dbo.FoodCategory");
            DropTable("dbo.Portion");
            DropTable("dbo.Food");
            DropTable("dbo.NutritionLog");
            DropTable("dbo.User");
            DropTable("dbo.ActivityLog");
            DropTable("dbo.Activity");
        }
    }
}
