namespace FoodControl.View
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Windows.Forms;
    using FoodControl.BusinessLogicLayer;
    using FoodControl.Model;
    using FoodControl.Utility;

    public partial class ChangeProfileDetailsView : Form
    {
        private IBLLContext _context = new BLLContext();
        private Profile _currentProfile;
        private User _currentUser;

        public ChangeProfileDetailsView()
        {
            InitializeComponent();
        }

        #region Events
        private void ChangeProfileDetailsView_Load(object sender, EventArgs e)
        {           
            DataBindListBox();
        }

        private void lb_profile_view_SelectedIndexChanged(object sender, EventArgs e)
        {
            if((Profile)lb_profile_view.SelectedItem != null)
                DisplayData((Profile)lb_profile_view.SelectedItem);
        }

        private void bt_delete_profile_Click(object sender, EventArgs e)
        {
            if (_context.Profile.GetProfileByUserId(Program.CURRENT_USER.UserID) != (Profile)lb_profile_view.SelectedItem)
            {
                Profile profileToDelete = (Profile)lb_profile_view.SelectedItem;
                _context.Profile.MarkAsDelete(profileToDelete);

                DataBindListBox();
            }
            else
            {
                lb_description.Visible = false;
                lb_error.Visible = true;
            }
        }

        private void bt_apply_Click(object sender, EventArgs e)
        {
            if (ValidateFields())
            {
                UpdateProfileData();
                DataBindListBox();
            }

            lb_error.Visible = false;
            lb_description.Visible = true;
        }

        private void bt_save_Click(object sender, EventArgs e)
        {
            if (ValidateFields())
            {
                UpdateProfileData();
                this.Close();
            }
        }

        private void bt_suggest_profile_Click(object sender, EventArgs e)
        {
            UpdateProfileSampleData();
        }

        private void btn_adjustValue_Click(object sender, EventArgs e)
        {
            Button btn = (Button)sender;

            switch (btn.Name)
            {
                case "btn_kcal_up": up(tb_kcal); break;
                case "btn_carb_up": up(tb_carb); break;
                case "btn_protein_up": up(tb_protein); break;
                case "btn_fat_up": up(tb_fat); break;
                case "btn_sugar_up": up(tb_sugar); break;
                case "btn_salt_up": up(tb_salt); break;

                case "btn_kcal_down": down(tb_kcal); break;
                case "btn_carb_down": down(tb_carb); break;
                case "btn_protein_down": down(tb_protein); break;
                case "btn_fat_down": down(tb_fat); break;
                case "btn_sugar_down": down(tb_sugar); break;
                case "btn_salt_down": down(tb_salt); break;
            }
        }
        #endregion

        #region Methods
        private void DataBindListBox()
        {
            lb_profile_view.DataSource = null;
            lb_profile_view.DataSource = _context.Profile.GetCurrentProfileEntries().ToList();
            lb_profile_view.DisplayMember = "Name";

            // Select user's current active profile
            _currentProfile = _context.Profile.GetProfileByUserId(Program.CURRENT_USER.UserID);
            lb_profile_view.SelectedItem = _currentProfile;
            DisplayData(_currentProfile);
        }

        private bool ValidateFields()
        {
            // validate profile name
            if (!Validation.ValidateTextBoxString(tb_insert_profile_name, "Bitte geben Sie einen Profilnamen ein!"))
                return false;

            // validate kcal
            if (!Validation.ValidateTextBoxDecimalFractions(tb_kcal, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate carb
            if (!Validation.ValidateTextBoxDecimalFractions(tb_carb, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate protein
            if (!Validation.ValidateTextBoxDecimalFractions(tb_protein, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate fat
            if (!Validation.ValidateTextBoxDecimalFractions(tb_fat, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate sugar
            if (!Validation.ValidateTextBoxDecimalFractions(tb_sugar, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            // validate salt
            if (!Validation.ValidateTextBoxDecimalFractions(tb_salt, "Bitte überprüfen Sie Ihre Eingabe!", 5, 2))
                return false;

            return true;
        }

        private void DisplayData(Profile profile)
        {
            tb_insert_profile_name.Text = profile.Name;
            tb_kcal.Text = profile.TV_Calories.ToString();
            tb_carb.Text = profile.TV_Carbohydrate.ToString();
            tb_protein.Text = profile.TV_Protein.ToString();
            tb_fat.Text = profile.TV_Fat.ToString();
            tb_sugar.Text = profile.TV_Sugar.ToString();
            tb_salt.Text = profile.TV_Salt.ToString();
        }

        private void UpdateProfileData()
        {
            Profile newProfile = new Profile
            {
                    Name = tb_insert_profile_name.Text,
                    TV_Calories = Decimal.Parse(tb_kcal.Text),
                    TV_Carbohydrate = Decimal.Parse(tb_carb.Text),
                    TV_Protein = Decimal.Parse(tb_protein.Text),
                    TV_Fat = Decimal.Parse(tb_fat.Text),
                    TV_Sugar = Decimal.Parse(tb_sugar.Text),
                    TV_Salt = Decimal.Parse(tb_salt.Text)
             };

            _context.Profile.Add(newProfile);

            // Update user's active profile
            _currentUser = _context.User.GetUserById(Program.CURRENT_USER.UserID);
            _currentUser.Profile = newProfile;
            _context.User.Update(_currentUser);

            // Update NutritionLog ProfileId for todays and future entries.
            List<NutritionLog> nutritionLog = _context.NutritionLog.GetNutritionLogByUserId(Program.CURRENT_USER.UserID).Where(n => n.Date.Date >= DateTime.Now.Date).ToList();
            if (nutritionLog != null)
            {
                foreach (var item in nutritionLog)
                {
                    item.Profile = _currentUser.Profile;
                    _context.NutritionLog.Update(item);
                }
            }
            
        }

        private void UpdateProfileSampleData()
        {
            User user = _context.User.GetUserById(Program.CURRENT_USER.UserID);
            VitalData vitalData = _context.VitalData.GetVitalDataByUserId(user.UserID).LastOrDefault();
            int objective = 1;

            if (rb_reduce_weight.Checked)
                objective = 1;

            if (rb_keep_weight.Checked)
                objective = 2;

            if (rb_gain_weight.Checked)
                objective = 3;

            Profile suggestProfile = _context.Profile.GetSuggestedProfile(user, vitalData, objective);

            tb_kcal.Text = Math.Round((Double)suggestProfile.TV_Calories).ToString();
            tb_carb.Text = Math.Round((Double)suggestProfile.TV_Carbohydrate).ToString();
            tb_protein.Text = Math.Round((Double)suggestProfile.TV_Protein).ToString();
            tb_fat.Text = Math.Round((Double)suggestProfile.TV_Fat).ToString();
            tb_sugar.Text = Math.Round((Double)suggestProfile.TV_Sugar).ToString();
            tb_salt.Text = Math.Round((Double)suggestProfile.TV_Salt).ToString();
        }

        private void up(TextBox tb)
        {
            double value = 0;
            if (Double.TryParse(tb.Text, out value))
            {
                value++;
                tb.Text = value.ToString();
            }
        }

        private void down(TextBox tb)
        {
            double value = 0;
            if (Double.TryParse(tb.Text, out value) && value > 0)
            {
                value--;
                tb.Text = value.ToString();
            }
        }
        #endregion        
    }
}
