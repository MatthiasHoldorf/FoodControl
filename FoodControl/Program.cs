namespace FoodControl
{
    using System;
    using System.Windows.Forms;
    using FoodControl.Model;
    using FoodControl.View;
    using System.Configuration;
    using System.Threading;
    using FoodControl.Utility;

    /// <summary>
    /// Determine Lines of Code 
    /// reg-ex: ^(?([^\r\n])\s)*[^\s+?/]+[^\n]*$
    /// </summary>
    static class Program
    {
        /// <summary>
        /// The currently logged in user.
        /// </summary>
        public static User CURRENT_USER;

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main()
        {
            try
            {
                // initialize localdb
                string connectionString = Utility.LocalDB.GetLocalDB("FoodControl");
                // set current connection string to localdb
                var config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
                var connectionStringsSection = (ConnectionStringsSection)config.GetSection("connectionStrings");
                connectionStringsSection.ConnectionStrings["DatabaseContext"].ConnectionString = connectionString;
                config.Save();
                ConfigurationManager.RefreshSection("connectionStrings");                
            }
            catch(Exception e)
            {
                string message = "Programm konnte nicht gestartet werden!" + "\n\n" + e;

                MessageBox.Show(message, "Fehler", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Application.Exit();
            }
           
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainView());
        }
    }
}