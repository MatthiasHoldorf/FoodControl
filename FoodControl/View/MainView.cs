namespace FoodControl.View
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Drawing;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using System.Threading;
    using System.Windows.Forms;
    using FoodControl.BusinessLogicLayer;
    using FoodControl.Model;
    using FoodControl.Model.ViewModel;
    using FoodControl.Utility;

    public partial class MainView : Form
    {
        private IBLLContext _context = new BLLContext();
        private IList<Food> _foodList;
        private IList<Activity> _activityList;

        private SplashScreen _splashScreen = new SplashScreen();

        public MainView()
        {
            // If no user exist; show initialRegistrationView
            if (_context.User.Count() == 0)
            {
                InitialRegistrationView registrationView = new InitialRegistrationView();
                registrationView.ShowDialog();

                // When the user closes the registrationView, stop the program sequence. The disposing of the mainView happens in program.cs
                if (registrationView.DialogResult != DialogResult.OK)
                    return;
            }

            // Show waiting SplashScreen
            _splashScreen.Show();

            if (_context.User.Count() > 0)
                Program.CURRENT_USER = _context.User.GetUserById(_context.User.GetLastId());

            InitializeComponent();
        }

        #region Initalize
        /// <summary>
        /// Dgv is not initialized in the constructor.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MainView_Load(object sender, EventArgs e)
        {
            // Get all Food/Activity from database
            _foodList = _context.Food.GetCurrentFoodEntries().OrderBy(f => f.Name).ToList();
            _activityList = _context.Activity.GetCurrentActivityEntries().OrderBy(a => a.Name).ToList();
            InitalizeMainView();
            InitalizeDatabaseView();

            // Close waiting SplashScreen after initalize (at least show it 3 seconds!)
            Thread.Sleep(3000);
            _splashScreen.Close();
        }

        private void InitalizeMainView()
        {
            // Perform DataBinding to ListBoxes in MainView
            DataBindFood_ListBoxMainView(_foodList);
            DataBindActivity_ListBoxMainView(_activityList);

            // Set Controls
            lb_datum.Text = DateTime.Now.ToShortDateString();

            // Initalize MainView
            UpdateMainView(DateTime.Now);
        }

        private void InitalizeDatabaseView()
        {
            // Perform DataBinding to Dgv in DatabaseView
            DataBindFood_DgvDatabaseView(_foodList);
            DataBindActivity_DgvDatabaseView(_activityList);

            // Get and DataBind the List of Portions and Food Categories
            List<Portion> portionList = _context.Portion.GetAll().OrderBy(p => p.Name).ToList();
            List<FoodCategory> foodCategoryList = _context.FoodCategory.GetAll().OrderBy(fc => fc.Name).ToList();

            cmb_portionName.DataSource = portionList;
            cmb_portionName.DisplayMember = "Name";

            cmb_choose_category.DataSource = foodCategoryList;
            cmb_choose_category.DisplayMember = "Name";
        }
        #endregion

        #region DataBinding
        private void DataBindFood_DgvDatabaseView(IList<Food> foodList)
        {
            dgv_food.DataSource = null;
            dgv_food.DataSource = foodList;
        }

        private void DataBindActivity_DgvDatabaseView(IList<Activity> activityList)
        {
            dgv_activity.DataSource = null;
            dgv_activity.DataSource = activityList;
        }

        private void DataBindFood_ListBoxMainView(IList<Food> foodList)
        {
            lb_show_food.DataSource = null;
            lb_show_food.DataSource = foodList;
            lb_show_food.DisplayMember = "Name";
        }

        private void DataBindActivity_ListBoxMainView(IList<Activity> activityList)
        {
            lb_show_activity.DataSource = null;
            lb_show_activity.DataSource = activityList;
            lb_show_activity.DisplayMember = "Name";
        }
        #endregion

        #region Updating MainView
        private void mc_select_nutritionLog_DateChanged(object sender, DateRangeEventArgs e)
        {
            UpdateMainView(mc_select_log.SelectionStart);
            lb_datum.Text = mc_select_log.SelectionStart.ToShortDateString();
        }

        private void cb_daytime_CheckedChanged(object sender, EventArgs e)
        {
            UpdateMainView(mc_select_log.SelectionStart);
        }

        private IList<NutritionLog> _nutritionLog;
        private IList<ActivityLog> _activityLog;
        /// <summary>
        /// This method updates the Main View.
        /// </summary>
        /// <param name="date">The Date for which the MainView should be displayed.</param>
        private void UpdateMainView(DateTime date)
        {
            // Changes within DialogViews won't be accepted unless the BLLContext gets initiated new.
            _context = new BLLContext();
            _nutritionLog = _context.NutritionLog.GetNutritionLogByUserIdAndDate(Program.CURRENT_USER.UserID, date).ToList();
            _nutritionLog = FilterDisplayedDaytimes(_nutritionLog).ToList();
            _activityLog = _context.ActivityLog.GetActivityLogByUserIdAndDate(Program.CURRENT_USER.UserID, date).ToList();

            IList<ShowNutritionLog> foodToBeShown = Tools.ConvertToShowNutritionLog(_nutritionLog);
            IList<ShowActivityLog> activitiesToBeShown = Tools.ConvertToShowActivityLog(_activityLog);
            
            // DataBind/Update DataGridView
            dgv_nutritionLog.DataSource = null;
            dgv_nutritionLog.DataSource = foodToBeShown;
            dgv_activityLog.DataSource = null;
            dgv_activityLog.DataSource = activitiesToBeShown;
            
            // Set Width
            dgv_nutritionLog.RowHeadersWidth = 102;
            dgv_nutritionLog.Columns[0].Width = 50;
            dgv_nutritionLog.Columns[1].Width = 150;
            dgv_nutritionLog.Columns[2].Width = 90;
            dgv_nutritionLog.Columns[3].Width = 90;
            dgv_nutritionLog.Columns[4].Width = 50;
            dgv_nutritionLog.Columns[5].Width = 50;
            dgv_nutritionLog.Columns[6].Width = 50;

            dgv_activityLog.RowHeadersWidth = 50;
            dgv_activityLog.Columns[0].Width = 180;
            dgv_activityLog.Columns[1].Width = 100;
            dgv_activityLog.Columns[2].Width = 100;
            dgv_activityLog.Columns[3].Width = 200;

            // Set HeaderCells in Dgv (Breakfest, Lunch, Dinner and Snack) 
            SetDaytimeHeaderCells(foodToBeShown);

            // Update Nutrient TextBoxes below the Dgv with nutrient day values and target values from the user's profile.
            try
            {
                NutrientAggregation targetValues = _context.Profile.GetTargetValuesById(_nutritionLog.Select(n => n.ProfileID).LastOrDefault());

                // Reset TextBoxes
                tb_kcal_show.Text = ""; tb_kcal_show.BackColor = Color.White;
                tb_carb_show.Text = ""; tb_carb_show.BackColor = Color.White;
                tb_protein_show.Text = ""; tb_protein_show.BackColor = Color.White;
                tb_fat_show.Text = ""; tb_fat_show.BackColor = Color.White;
                tb_sugar_show.Text = ""; tb_sugar_show.BackColor = Color.White;
                tb_salt_show.Text = ""; tb_salt_show.BackColor = Color.White;

                // Update Nutrient TextBoxes
                tb_kcal_show.Text = Math.Round(_nutritionLog.Select(f => (f.Food.KiloCalories) / 100 * f.Quantity).Sum()).ToString() + " / " + Math.Round(targetValues.KiloCalories);
                tb_carb_show.Text = Math.Round(_nutritionLog.Select(f => (f.Food.Carbohydrate) / 100 * f.Quantity).Sum()).ToString() + " / " + Math.Round(targetValues.Carbohydrate);
                tb_protein_show.Text = Math.Round(_nutritionLog.Select(f => (f.Food.Protein) / 100 * f.Quantity).Sum()).ToString() + " / " + Math.Round(targetValues.Protein);
                tb_fat_show.Text = Math.Round(_nutritionLog.Select(f => (f.Food.Fat) / 100 * f.Quantity).Sum()).ToString() + " / " + Math.Round(targetValues.Fat);
                tb_sugar_show.Text = Math.Round(_nutritionLog.Select(f => (f.Food.Sugar) / 100 * f.Quantity).Sum()).ToString() + " / " + Math.Round(targetValues.Sugar);
                tb_salt_show.Text = Math.Round((Decimal)_nutritionLog.Select(f => (f.Food.Salt) / 100 * f.Quantity).Sum()).ToString() + " / " + Math.Round((Decimal)targetValues.Salt);

                // Mark as red, if value extends target value in profile
                if (_nutritionLog.Select(f => (f.Food.KiloCalories) / 100 * f.Quantity).Sum() > targetValues.KiloCalories)
                    tb_kcal_show.BackColor = Color.LightCoral;
                if (_nutritionLog.Select(f => (f.Food.Carbohydrate) / 100 * f.Quantity).Sum() > targetValues.Carbohydrate)
                    tb_carb_show.BackColor = Color.LightCoral;
                if (_nutritionLog.Select(f => (f.Food.Protein) / 100 * f.Quantity).Sum() > targetValues.Protein)
                    tb_protein_show.BackColor = Color.LightCoral;
                if (_nutritionLog.Select(f => (f.Food.Fat) / 100 * f.Quantity).Sum() > targetValues.Fat)
                    tb_fat_show.BackColor = Color.LightCoral;
                if (_nutritionLog.Select(f => (f.Food.Sugar) / 100 * f.Quantity).Sum() > targetValues.Sugar)
                    tb_sugar_show.BackColor = Color.LightCoral;
                if (_nutritionLog.Select(f => (f.Food.Salt) / 100 * f.Quantity).Sum() > targetValues.Salt)
                    tb_salt_show.BackColor = Color.LightCoral;
            }
            catch
            {
                // No NutritionLog for that date
                // Reset TextBoxes
                tb_kcal_show.Text = ""; tb_kcal_show.BackColor = Color.White;
                tb_carb_show.Text = ""; tb_carb_show.BackColor = Color.White;
                tb_protein_show.Text = ""; tb_protein_show.BackColor = Color.White;
                tb_fat_show.Text = ""; tb_fat_show.BackColor = Color.White;
                tb_sugar_show.Text = ""; tb_sugar_show.BackColor = Color.White;
                tb_salt_show.Text = ""; tb_salt_show.BackColor = Color.White;
            }

            //// Update SideStatistics
            // Reset TextBoxes
            tb_show_basic.Text = "";
            tb_show_activity.Text = "";
            tb_show_baseNew.Text = "";

            // Even basic requirements may change due to different vital data entries over the time
            VitalData vitalData = _context.VitalData.GetVitalDataByUserIdAndDate(Program.CURRENT_USER.UserID, date);
            decimal basiRequirements = Tools.GetBasicRequirements(Program.CURRENT_USER, vitalData);
            decimal kiloCaloriesActivity = _context.ActivityLog.GetKiloCaloriesForSpecificDate(Program.CURRENT_USER.UserID, date).KiloCalories;

            tb_show_basic.Text = Math.Round(basiRequirements, 2).ToString();
            tb_show_activity.Text = Math.Round(kiloCaloriesActivity, 2).ToString();
            tb_show_baseNew.Text = Math.Round((basiRequirements + kiloCaloriesActivity), 2).ToString();
        }

        private void SetDaytimeHeaderCells(IList<ShowNutritionLog> nutritionLog)
        {
            IList<ShowNutritionLog> nl = nutritionLog.OrderBy(n => n.Daytime).ToList();

            var breakfestIndex = nl.IndexOf(nutritionLog.Where(n => n.Daytime == 1).FirstOrDefault());
            var lunchIndex = nl.IndexOf(nutritionLog.Where(n => n.Daytime == 2).FirstOrDefault());
            var dinnerIndex = nl.IndexOf(nutritionLog.Where(n => n.Daytime == 3).FirstOrDefault());
            var snackIndex = nl.IndexOf(nutritionLog.Where(n => n.Daytime == 4).FirstOrDefault());

            if (breakfestIndex != -1)
                dgv_nutritionLog.Rows[breakfestIndex].HeaderCell.Value = "Frühstück";

            if (lunchIndex != -1)
                dgv_nutritionLog.Rows[lunchIndex].HeaderCell.Value = "Mittagessen";

            if (dinnerIndex != -1)
                dgv_nutritionLog.Rows[dinnerIndex].HeaderCell.Value = "Abendessen";

            if (snackIndex != -1)
                dgv_nutritionLog.Rows[snackIndex].HeaderCell.Value = "Snack";
        }

        private IEnumerable<NutritionLog> FilterDisplayedDaytimes(IEnumerable<NutritionLog> nutritionLog)
        {
            List<NutritionLog> filteredNutritionLog = new List<NutritionLog>();

            if (cb_show_breakfast.Checked)
                filteredNutritionLog.AddRange(nutritionLog.Where(f => f.Daytime == 1));

            if (cb_show_lunch.Checked)
                filteredNutritionLog.AddRange(nutritionLog.Where(f => f.Daytime == 2));

            if (cb_show_dinner.Checked)
                filteredNutritionLog.AddRange(nutritionLog.Where(f => f.Daytime == 3));

            if (cb_show_snacks.Checked)
                filteredNutritionLog.AddRange(nutritionLog.Where(f => f.Daytime == 4));

            return filteredNutritionLog != null? filteredNutritionLog : null;
        }
        #endregion

        #region Cell Edit MainView
        /// <summary>
        /// Determine on which row the cursor is.
        /// </summary>
        private int _currentMouseOverRow;
        private void dgv_CellMouseEnter(object sender, DataGridViewCellEventArgs e)
        {
            _currentMouseOverRow = e.RowIndex;
        }

        private void dgv_CellMouseLeave(object sender, DataGridViewCellEventArgs e)
        {
            _currentMouseOverRow = -1;
        }

        private void Enable_Cell_Edit_Event(int row, DataGridView dgv)
        {
            dgv.BeginEdit(true);
        }

        /// <summary>
        /// CellEditEventHandling NutritionLog.
        /// </summary>
        private void dgv_nutritionLog_MouseClick(object sender, MouseEventArgs e)
        {
            DisplayNutritionLog_ContextMenu(e);
        }

        private void DisplayNutritionLog_ContextMenu(MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Right)
            {
                _currentMouseOverRow = dgv_nutritionLog.HitTest(e.X, e.Y).RowIndex;

                if (_currentMouseOverRow >= 0)
                {
                    int selectedRowAtStart = _currentMouseOverRow;

                    foreach (DataGridViewRow dr in dgv_nutritionLog.Rows)
                    {
                        dr.Selected = false;
                    }

                    dgv_nutritionLog.Rows[_currentMouseOverRow].Selected = true;
                    dgv_nutritionLog.CurrentCell = dgv_nutritionLog.Rows[_currentMouseOverRow].Cells[0];

                    ContextMenu m = new ContextMenu();
                    m.MenuItems.Add(new MenuItem("Bearbeite " + dgv_nutritionLog.Rows[_currentMouseOverRow].Cells[1].Value.ToString()));
                    m.MenuItems.Add(new MenuItem("Lösche " + dgv_nutritionLog.Rows[_currentMouseOverRow].Cells[1].Value.ToString()));

                    m.MenuItems[0].Click += (s, eArgs) => Enable_Cell_Edit_Event(selectedRowAtStart, dgv_nutritionLog);
                    m.MenuItems[1].Click += (s, eArgs) => Delete_Databinded_Cell_Event_NutritionLog(selectedRowAtStart);

                    m.Show(dgv_nutritionLog, new Point(e.X + 10, e.Y + 10));
                }
            }
        }

        private void dgv_nutritionLog_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            UpdateNutritionLog(e);
        }

        private void Delete_Databinded_Cell_Event_NutritionLog(int row)
        {
            _context.NutritionLog.Delete(_nutritionLog[row]);
            UpdateMainView(mc_select_log.SelectionStart);

            // Select next row
            if (row > 0)
            {
                row--;
                dgv_nutritionLog.Rows[row].Selected = true;
                dgv_nutritionLog.CurrentCell = dgv_nutritionLog.Rows[row].Cells[0];
            }
        }

        private void UpdateNutritionLog(DataGridViewCellEventArgs e)
        {
            NutritionLog nutritionLogToUpdate = _nutritionLog[e.RowIndex];
            try
            {
                nutritionLogToUpdate.Quantity = Decimal.Parse(dgv_nutritionLog.Rows[e.RowIndex].Cells[e.ColumnIndex].Value.ToString());
            }
            catch
            {
                // Wrong format, no update in Database. No validation necessary for user necessary.
            }

            _context.NutritionLog.Update(nutritionLogToUpdate);

            // SetCurrentcellAddresscore error
            SetColumnIndex method = new SetColumnIndex(invokeMainViewUpdateNutritionLog);
            dgv_nutritionLog.BeginInvoke(method, 1);
        }

        delegate void SetColumnIndex(int i);
        private void invokeMainViewUpdateNutritionLog(int columnIndex)
        {
            dgv_nutritionLog.CurrentCell = dgv_nutritionLog.CurrentRow.Cells[columnIndex];
            UpdateMainView(mc_select_log.SelectionStart);
        }

        /// <summary>
        /// CellEditEventHandling ActivityLog.
        /// </summary>
        private void dgv_activityLog_MouseClick(object sender, MouseEventArgs e)
        {
            DisplayActivityLog_ContextMenu(e);
        }

        private void DisplayActivityLog_ContextMenu(MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Right)
            {
                _currentMouseOverRow = dgv_activityLog.HitTest(e.X, e.Y).RowIndex;

                if (_currentMouseOverRow >= 0)
                {
                    int selectedRowAtStart = _currentMouseOverRow;

                    foreach (DataGridViewRow dr in dgv_activityLog.Rows)
                    {
                        dr.Selected = false;
                    }

                    dgv_activityLog.Rows[_currentMouseOverRow].Selected = true;
                    dgv_activityLog.CurrentCell = dgv_activityLog.Rows[_currentMouseOverRow].Cells[1];

                    ContextMenu m = new ContextMenu();
                    m.MenuItems.Add(new MenuItem("Bearbeite " + dgv_activityLog.Rows[_currentMouseOverRow].Cells[0].Value.ToString()));
                    m.MenuItems.Add(new MenuItem("Lösche " + dgv_activityLog.Rows[_currentMouseOverRow].Cells[0].Value.ToString()));

                    m.MenuItems[0].Click += (s, eArgs) => Enable_Cell_Edit_Event(selectedRowAtStart, dgv_activityLog);
                    m.MenuItems[1].Click += (s, eArgs) => Delete_Databinded_Cell_Event_ActivityLog(selectedRowAtStart);

                    m.Show(dgv_activityLog, new Point(e.X + 10, e.Y + 10));
                }
            }
        }

        private void dgv_activityLog_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            UpdateActivityLogEntry(e);
        }

        private void Delete_Databinded_Cell_Event_ActivityLog(int row)
        {
            _context.ActivityLog.Delete(_activityLog[row]);
            UpdateMainView(mc_select_log.SelectionStart);

            // Select next row
            if (row > 0)
            {
                row--;
                dgv_activityLog.Rows[row].Selected = true;
                dgv_activityLog.CurrentCell = dgv_activityLog.Rows[row].Cells[0];
            }
        }

        private void UpdateActivityLogEntry(DataGridViewCellEventArgs e)
        {
            ActivityLog activityLogToUpdate = _activityLog[e.RowIndex];
            try
            {
                activityLogToUpdate.Duration = Int16.Parse(dgv_activityLog.Rows[e.RowIndex].Cells[e.ColumnIndex].Value.ToString());
            }
            catch
            {
                // Wrong format, no update in Database. No validation necessary for user necessary.
            }
            _context.ActivityLog.Update(activityLogToUpdate);
            // SetCurrentcellAddresscore error
            SetColumnIndex method = new SetColumnIndex(invokeMainViewUpdateActivityLog);
            dgv_nutritionLog.BeginInvoke(method, 1);
        }

        private void invokeMainViewUpdateActivityLog(int columnIndex)
        {
            dgv_activityLog.CurrentCell = dgv_activityLog.CurrentRow.Cells[columnIndex];
            UpdateMainView(mc_select_log.SelectionStart);
        }
        #endregion

        #region Search MainView
        private void FilterItems_ListBoxMainView()
        {
            string searchResult = tb_search.Text;

            if (gb_food.Visible == true)
            {
                // Textbox
                List<Food> magicSearch = _foodList.Where(f => f.Name.ToUpper().Contains(searchResult.ToUpper())).ToList();

                // Checkboxes
                bool noMeat = cb_no_meat.Checked;
                bool noPork = cb_no_pork.Checked;
                bool noFish = cb_no_fish.Checked;

                if(noMeat)
                    magicSearch = magicSearch.Where(f => f.IsMeat == false).ToList();

                if (noPork)
                    magicSearch = magicSearch.Where(f => f.IsPork == false).ToList();

                if (noFish)
                    magicSearch = magicSearch.Where(f => f.IsFish == false).ToList();

                DataBindFood_ListBoxMainView(magicSearch);

            }
            if (gb_activity.Visible == true)
            {
                List<Activity> magicSearch = _activityList.Where(f => f.Name.ToUpper().Contains(searchResult.ToUpper())).ToList();
                DataBindActivity_ListBoxMainView(magicSearch);
            }
        }

        private void cb_Search_CheckedChanged(object sender, EventArgs e)
        {
            FilterItems_ListBoxMainView();
        }

        private void tb_search_TextChanged(object sender, EventArgs e)
        {
            FilterItems_ListBoxMainView();
        }
        #endregion

        #region Navigation
        private void btn_show_databaseform_Click(object sender, EventArgs e)
        {
            ChangeView();
        }

        private void btn_show_statistic_Click(object sender, EventArgs e)
        {
            ts_status.Text = "Lade Daten ...";
            StatisticsView statisticsView = new StatisticsView(ts_status);
            statisticsView.StartPosition = FormStartPosition.Manual;
            statisticsView.Location = new Point(10, 10);
            statisticsView.ShowDialog();
        }

        private void btn_show_profileform_Click(object sender, EventArgs e)
        {
            ChangeProfileDetailsView profileView = new ChangeProfileDetailsView();
            profileView.ShowDialog();
            UpdateMainView(DateTime.Now);
        }

        private void btn_show_vitaldata_Click(object sender, EventArgs e)
        {
            ChangeVitalDataDetailsView vitaldataView = new ChangeVitalDataDetailsView();
            vitaldataView.ShowDialog();
            UpdateMainView(DateTime.Now);
        }

        private void btn_show_userform_Click(object sender, EventArgs e)
        {
            ChangeUserDetailsView userView = new ChangeUserDetailsView();
            userView.ShowDialog();
            UpdateMainView(DateTime.Now);
        }

        private void btn_helpView_Click(object sender, EventArgs e)
        {
            string appDirectory = Path.GetDirectoryName(Path.GetDirectoryName(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)));
            string filePath = Directory.GetCurrentDirectory() + "\\Utility\\UserManual\\index.html";
            string path = appDirectory + filePath;

            Process.Start(filePath);
        }

        private void lb_show_food_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            ShowAddFoodView(lb_show_food.IndexFromPoint(e.Location));
        }

        private void lb_show_activity_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            ShowAddActivityView(lb_show_activity.IndexFromPoint(e.Location));
        }
        
        private void tabC_food_activity_SelectedIndexChanged(object sender, EventArgs e)
        {
            TabChangeOnMainView();
        }

        private void tabC_food_activity_databaseView_SelectedIndexChanged(object sender, EventArgs e)
        {
            TabChangeOnDatabaseView();
        }

        /// <summary>
        /// This method change from MainView to DatabaseView or the other way around.
        /// </summary>
        private void ChangeView()
        {
            string databaseViewActiv = "Zurück zum Hauptmenü";
            string mainViewActiv = "Datenbank- verwaltung";

            // Show DatabaseView
            if (btn_switch_mainView.Text == mainViewActiv)
            {
                // Show/Hide Buttons
                btn_show_statisticView.Visible = false;
                btn_show_profileView.Visible = false;
                btn_show_vitalDataView.Visible = false;
                btn_show_userView.Visible = false;
                btn_helpView.Visible = false;

                // Show/Hide Views
                panel_mainView.Visible = false;
                panel_databaseView.Visible = true;

                // Select CB DatabaseView
                cmb_measuring.SelectedIndex = 0;

                // Change Button Text
                btn_switch_mainView.Text = databaseViewActiv;
            }
            else // Show MainView
            {
                // Show/Hide Buttons
                btn_show_statisticView.Visible = true;
                btn_show_profileView.Visible = true;
                btn_show_vitalDataView.Visible = true;
                btn_show_userView.Visible = true;
                btn_helpView.Visible = true;

                // Show/Hide Views
                panel_mainView.Visible = true;
                panel_databaseView.Visible = false;

                // Change Button Text
                btn_switch_mainView.Text = mainViewActiv;
            }
        }

        /// <summary>
        /// This method shows the AddFoodView Form.
        /// </summary>
        /// <param name="index">The index of the selected Food in the ListBox.</param>
        private void ShowAddFoodView(int index)
        {
            if (index != ListBox.NoMatches)
            {
                using (var addFoodView = new AddFoodView((Food)lb_show_food.SelectedItem, mc_select_log.SelectionStart))
                {
                    var result = addFoodView.ShowDialog();
                    if (result == DialogResult.OK)
                    {
                        UpdateMainView(mc_select_log.SelectionStart);
                    }
                }
            }
        }
        
        /// <summary>
        /// This method shows the AddActivityView Form.
        /// </summary>
        /// <param name="index">The index of the selected Activity in the ListBox.</param>
        private void ShowAddActivityView(int index)
        {
            if (index != ListBox.NoMatches)
            {
                using (var addActivityView = new AddActivityView((Activity)lb_show_activity.SelectedItem, mc_select_log.SelectionStart))
                {
                    var result = addActivityView.ShowDialog();
                    if (result == DialogResult.OK)
                    {
                        UpdateMainView(mc_select_log.SelectionStart);
                    }
                }
            }
        }

        private void TabChangeOnMainView()
        {
            // Food Tab
            if (tabC_food_activity.SelectedTab == tabC_food_activity.TabPages[0])
            {
                gb_daytime.Enabled = true;

                gb_food.Visible = true;
                gb_activity.Visible = false;

                // Enable CheckBoxes
                cb_no_meat.Enabled = true;
                cb_no_pork.Enabled = true;
                cb_no_fish.Enabled = true;

                // Clear Search
                DataBindFood_ListBoxMainView(_foodList);
                tb_search.Clear();
            }

            // Activity Tab
            if (tabC_food_activity.SelectedTab == tabC_food_activity.TabPages[1])
            {
                gb_daytime.Enabled = false;

                gb_activity.Visible = true;
                gb_food.Visible = false;

                // Disable CheckBoxes
                cb_no_meat.Enabled = false;
                cb_no_pork.Enabled = false;
                cb_no_fish.Enabled = false;

                // Clear Search
                DataBindActivity_ListBoxMainView(_activityList);
                tb_search.Clear();
            }
        }

        private void TabChangeOnDatabaseView()
        {
            // Activity Tab to Food Tab
            if (tabC_food_activity_databaseView.SelectedTab == tabC_food_activity_databaseView.TabPages[0])
            {
                gb_new_food.Visible = true;
                gb_new_activity.Visible = false;
            }

            // Food Tab to Activity Tab
            if (tabC_food_activity_databaseView.SelectedTab == tabC_food_activity_databaseView.TabPages[1])
            {
                gb_new_activity.Visible = true;
                gb_new_food.Visible = false;
            }
        }
        #endregion

        #region DatabaseView
        private void bt_newEntry_Click(object sender, EventArgs e)
        {
            if (gb_new_food.Visible)
            {
                AddNewFoodToDatabase();
            }

            if (gb_new_activity.Visible)
            {
                AddNewActivityToDatabase();
            }
        }

        private void bt_delete_Click(object sender, EventArgs e)
        {
            DeleteDatabaseEntry();
        }

        private void bt_cleanFields_Click(object sender, EventArgs e)
        {
            CleanFields();
        }

        private void AddNewFoodToDatabase()
        {
            if (ValidateFieldsFood())
            {
                Portion portion;

                portion = _context.Portion.GetPortionByName(cmb_portionName.Text);
                if (portion == null)
                {
                    portion = new Portion { Name = cmb_portionName.Text };
                    _context.Portion.Add(portion);
                }

                Food newEntry = new Food
                {
                    PortionID = portion.PortionID,
                    Name = tb_insert_food_name.Text,
                    KiloCalories = Decimal.Parse(tb_insert_kcal.Text),
                    Carbohydrate = Decimal.Parse(tb_insert_carb.Text),
                    Protein = Decimal.Parse(tb_insert_protein.Text),
                    Fat = Decimal.Parse(tb_insert_fat.Text),
                    Sugar = Decimal.Parse(tb_insert_salt.Text),
                    Salt = Decimal.Parse(tb_insert_sugar.Text),
                    Saturates = Decimal.Parse(tb_insert_saturates.Text),
                    BaseUnit = Decimal.Parse(tb_insert_baseUnit.Text),
                    MeasuringUnit = cmb_measuring.Text == "g" ? (short)1 : (short)2,
                    FoodCategories = new List<FoodCategory> 
                    {
                        new FoodCategory{ Name = cmb_choose_category.SelectedText}
                    },
                    IsMeat = cb_meat.Checked ? true : false,
                    IsPork = cb_pork.Checked ? true : false,
                    IsFish = cb_fish.Checked ? true : false
                };

                // Add to database
                _context.Food.Add(newEntry);
                // Add to list
                _foodList.Add(newEntry);
                // Renew databinding
                DataBindFood_DgvDatabaseView(_foodList);
                DataBindFood_ListBoxMainView(_foodList);

                // Select new entry
                int length = dgv_food.RowCount - 1;
                dgv_food.Rows[length].Selected = true;
                dgv_food.CurrentCell = dgv_food.Rows[length].Cells[0];
                dgv_food.FirstDisplayedScrollingRowIndex = length;
            }
        }

        private void AddNewActivityToDatabase()
        {
            if (ValidateFieldsActivity())
            {
                Activity newEntry = new Activity
                {
                    Name = tb_insert_activityName.Text,
                    MET = Decimal.Parse(tb_insert_met.Text)
                };

                // Add to database
                _context.Activity.Add(newEntry);
                // Add to list
                _activityList.Add(newEntry);
                // Renew databinding
                DataBindActivity_DgvDatabaseView(_activityList);
                DataBindActivity_ListBoxMainView(_activityList);

                // Select new entry
                int length = dgv_activity.RowCount - 1;
                dgv_activity.Rows[length].Selected = true;
                dgv_activity.CurrentCell = dgv_activity.Rows[length].Cells[0];
                dgv_activity.FirstDisplayedScrollingRowIndex = length;
            }
        }

        private bool ValidateFieldsFood()
        {
            // validate food name
            if (!Validation.ValidateTextBoxString(tb_insert_food_name, "Bitte überprüfen Sie Ihre Eingabe!"))
                return false;

            // validate kcal
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_kcal, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate carb
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_carb, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate protein
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_protein, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate fat
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_fat, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate salt
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_sugar, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate sugar
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_salt, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate saturates
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_saturates, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate portion name
            if (!Validation.ValidateComboBoxString(cmb_portionName, "Bitte überprüfen Sie Ihre Eingabe!"))
                return false;

            // validate base unit
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_baseUnit, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            return true;
        }

        private bool ValidateFieldsActivity()
        {
            // validate food name
            if (!Validation.ValidateTextBoxString(tb_insert_activityName, "Bitte überprüfen Sie Ihre Eingabe!"))
                return false;

            // validate kcal
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_met, "Bitte überprüfen Sie Ihre Eingabe!", 2, 2))
                return false;

            return true;
        }

        private void CleanFields()
        {
            if (gb_new_food.Visible)
            {
                tb_insert_food_name.Clear();
                tb_insert_kcal.Clear();
                tb_insert_carb.Clear();
                tb_insert_protein.Clear();
                tb_insert_fat.Clear();
                tb_insert_sugar.Clear();
                tb_insert_salt.Clear();
                tb_insert_saturates.Clear();
                tb_insert_baseUnit.Clear();
                cmb_measuring.SelectedIndex = 0;
                cb_meat.Checked = false;
                cb_pork.Checked = false;
                cb_fish.Checked = false;
                cmb_portionName.SelectedIndex = -1;
                cmb_choose_category.SelectedIndex = -1;
            }

            if (gb_new_activity.Visible)
            {
                tb_insert_activityName.Clear();
                tb_insert_met.Clear();
            }
        }

        private void DeleteDatabaseEntry()
        {
            // Food Tab
            if (tabC_food_activity_databaseView.SelectedTab == tabC_food_activity_databaseView.TabPages[0])
            {
                foreach (DataGridViewRow row in dgv_food.SelectedRows)
                {
                    Food food = (Food)row.DataBoundItem;
                    if (food != null)
                    {
                        _context.Food.MarkAsDelete(food);
                    }
                }

                // Get food list where entries are deleted
                _foodList = _context.Food.GetCurrentFoodEntries().ToList();

                // Renew DataBinding
                DataBindFood_ListBoxMainView(_foodList);
                DataBindFood_DgvDatabaseView(_foodList);

                // select previous row
                var rowIndex = dgv_food.RowCount;
                if (rowIndex > 0)
                {
                    rowIndex--;
                    dgv_food.Rows[rowIndex].Selected = true;
                    dgv_food.CurrentCell = dgv_food.Rows[rowIndex].Cells[0];
                }
            }

            // Activity Tab
            if (tabC_food_activity_databaseView.SelectedTab == tabC_food_activity_databaseView.TabPages[1])
            {
                foreach (DataGridViewRow row in dgv_activity.SelectedRows)
                {
                    Activity activity = (Activity)row.DataBoundItem;
                    if (activity != null)
                    {
                        _context.Activity.MarkAsDelete(activity);
                    }
                }

                // Get activity list where entries are deleted
                _activityList = _context.Activity.GetCurrentActivityEntries().ToList();

                // Renew DataBinding
                DataBindActivity_ListBoxMainView(_activityList);
                DataBindActivity_DgvDatabaseView(_activityList);

                // select previous row
                var rowIndex = dgv_activity.RowCount;
                if (rowIndex > 0)
                {
                    rowIndex--;
                    dgv_activity.Rows[rowIndex].Selected = true;
                    dgv_activity.CurrentCell = dgv_activity.Rows[rowIndex].Cells[0];
                }
            }
        }
        #endregion
    }
}
