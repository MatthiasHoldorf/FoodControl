namespace FoodControl.Utility
{
    using System;
    using System.Data.SqlClient;
    using System.IO;
    using System.Reflection;

    public class LocalDB
    {        
        // defining the databse directory
        public const string DB_DIRECTORY = "data";

        public static string GetLocalDB(string dbName)
        {
            try
            {
                //string outputFolder = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), DB_DIRECTORY);
                string outputFolder = Directory.GetCurrentDirectory() + "\\" + DB_DIRECTORY;
                string mdfFilename = dbName + ".mdf";
                string dbFileName = Path.Combine(outputFolder, mdfFilename);
                string logFileName = Path.Combine(outputFolder, String.Format("{0}_log.ldf", dbName));

                // create directory if doesn't already exist
                if (!Directory.Exists(outputFolder))
                {
                    Directory.CreateDirectory(outputFolder);
                }

                // create database file, if doesn't exist
                if (!File.Exists(dbFileName))
                {
                    CreateDatabase(dbName, dbFileName);
                }

                // return connection string
                return String.Format(@"Data Source=(LocalDB)\v11.0;AttachDBFileName={1};Initial Catalog={0};Integrated Security=True;MultipleActiveResultSets=true;", dbName, dbFileName);
            }
            catch
            {
                throw new Exception();
            }
        }

        public static bool CreateDatabase(string dbName, string dbFileName)
        {
            try
            {
                string connectionString = String.Format(@"Data Source=(LocalDB)\v11.0;Initial Catalog=master;Integrated Security=True;MultipleActiveResultSets=true");
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand cmd = connection.CreateCommand();
                    
                    DetachDatabase(dbName);

                    // sql query: create new database
                    cmd.CommandText = String.Format("CREATE DATABASE {0} ON (NAME = N'{0}', FILENAME = '{1}')", dbName, dbFileName);
                    cmd.ExecuteNonQuery();

                    // sql query: create database tables
                    SqlCommand cmdCreateTables = connection.CreateCommand();
                    FileInfo sqlFileTables = new FileInfo(Directory.GetCurrentDirectory() + "\\Utility\\SQL\\CreateTables_exec.sql");
                    cmdCreateTables.CommandText = String.Format(sqlFileTables.OpenText().ReadToEnd());
                    cmdCreateTables.ExecuteNonQuery();

                    // sql query: create sample data
                    SqlCommand cmdCreateSample = connection.CreateCommand();
                    FileInfo sqlFileSample = new FileInfo(Directory.GetCurrentDirectory() + "\\Utility\\SQL\\CreateSampleData_exec.sql");
                    cmdCreateSample.CommandText = String.Format(sqlFileSample.OpenText().ReadToEnd());
                    cmdCreateSample.ExecuteNonQuery();

                }

                if (File.Exists(dbFileName)) return true;
                else return false;
            }
            catch
            {
                return false;
            }
        }

        public static bool DetachDatabase(string dbName)
        {
            try
            {
                string connectionString = String.Format(@"Data Source=(LocalDB)\v11.0;Initial Catalog=master;Integrated Security=True;MultipleActiveResultSets=true");
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand cmd = connection.CreateCommand();
                    cmd.CommandText = String.Format("exec sp_detach_db '{0}'", dbName);
                    cmd.ExecuteNonQuery();

                    return true;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}
