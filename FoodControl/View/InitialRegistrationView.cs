namespace FoodControl.View
{
    using System;
    using System.Windows.Forms;
    using FoodControl.BusinessLogicLayer;
    using FoodControl.Model;
    using FoodControl.Utility;

    public partial class InitialRegistrationView : Form
    {
        private IBLLContext _context = new BLLContext();
        private User _user;
        private VitalData _vitalData;
        private Profile _profile;

        private bool _regularClose = false;

        public InitialRegistrationView()
        {
            InitializeComponent();
            this.tb_insert_Firstname.Focus();
        }

        private void InitialRegistrationView_Load(object sender, EventArgs e)
        {
            dtp_insert_date_of_birth.Value = DateTime.Now.AddYears(-24);
            cb_choose_activity_level.SelectedItem = cb_choose_activity_level.Items[1];
        }

        #region Create Data
        private bool CreateUserData()
        {
            // validate fistname
            if (!Validation.ValidateTextBoxString(tb_insert_Firstname, "Bitte geben Sie Ihren Vornamen ein!"))
                return false;

            // validate lastname
            if (!Validation.ValidateTextBoxString(tb_insert_Lastname, "Bitte geben Sie Ihren Nachnamen ein!"))
                return false;

            // validate sex
            if (!Validation.ValidateRadioButtonSex(rb_male, rb_female, "Bitte geben Sie Ihr Geschlecht an!"))
                return false;

            // Adjust indices
            short activityLevel = (short)cb_choose_activity_level.SelectedIndex;
            activityLevel++;

            _user = new User
            {
                FirstName = tb_insert_Firstname.Text,
                LastName = tb_insert_Lastname.Text,
                Birthday = dtp_insert_date_of_birth.Value,
                Sex = rb_female.Checked ? (short)2 : (short)1,
                ActivityLevel = activityLevel,
                IsVegetarian = cb_vegetarian.Checked ? true : false,
                IsPorkEater = cb_no_pork.Checked ? false : true,
                IsFishEater = cb_no_fish.Checked ? false : true
            };
            return true;
        }

        private bool CreateVitalData()
        {
            // validate body weight
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_weight, "Bitte überprüfen Sie Ihre Eingabe!", 3, 1))
                return false;

            // validate body height
            if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_height, "Bitte überprüfen Sie Ihre Eingabe!", 3, 0))
                return false;

            // validate adipose (optional)
            if (tb_insert_adipose.Text.Length >= 1)
            {
                if (!Validation.ValidateTextBoxDecimalFractions(tb_insert_adipose, "Bitte überprüfen Sie Ihre Eingabe!", 2, 2))
                    return false;
            }

            _vitalData = new VitalData
            {
                Date = DateTime.Now,
                BodyHeight = Int16.Parse(tb_insert_height.Text),
                BodyWeight = Decimal.Parse(tb_insert_weight.Text),
                Adipose = tb_insert_adipose.Text.Length >= 1 ? Decimal.Parse(tb_insert_adipose.Text.Replace(".", ",")) : (decimal?)null
            };
            return true;
        }

        private bool CreateProfile()
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

            _profile = new Profile
            {
                Name = tb_insert_profile_name.Text,
                TV_Calories = Decimal.Parse(tb_kcal.Text),
                TV_Carbohydrate = Decimal.Parse(tb_carb.Text),
                TV_Protein = Decimal.Parse(tb_protein.Text),
                TV_Fat = Decimal.Parse(tb_fat.Text),
                TV_Sugar = Decimal.Parse(tb_sugar.Text),
                TV_Salt = Decimal.Parse(tb_salt.Text)
            };
            return true;
        }
        #endregion

        #region Refill Fields
        private void refillUserData()
        {
            tb_insert_Firstname.Text = _user.FirstName;
            tb_insert_Lastname.Text = _user.LastName;
            dtp_insert_date_of_birth.Value = _user.Birthday;
            rb_female.Checked = true;
            if (_user.Sex == 1)
                rb_male.Checked = true;
            cb_choose_activity_level.SelectedItem = cb_choose_activity_level.Items[_user.ActivityLevel - 1];
            if (_user.IsVegetarian)
                cb_vegetarian.Checked = true;
            if (!_user.IsPorkEater)
                cb_no_pork.Checked = true;
            if (!_user.IsFishEater)
                cb_no_fish.Checked = true;
        }

        private void refillVitalData()
        {
            tb_insert_height.Text = _vitalData.BodyHeight.ToString();
            tb_insert_weight.Text = _vitalData.BodyWeight.ToString();
            tb_insert_adipose.Text = _vitalData.Adipose.ToString();
        }
        #endregion

        #region Events
        private void bt_forward_Click(object sender, EventArgs e)
        {
            if (rb_Profile.Checked)
            {
                if (CreateProfile())
                {
                    // Save Data and get foreign key required ids
                    _context.Profile.Add(_profile);

                    _user.ProfileID = _context.Profile.GetLastId();
                    _context.User.Add(_user);

                    _vitalData.UserID = _context.User.GetLastId();
                    _context.VitalData.Add(_vitalData);

                    // Close initialRegistrationView
                    _regularClose = true;
                    this.DialogResult = DialogResult.OK;
                    this.Close();
                   
                }                
            }

            if (rb_VitalData.Checked)
            {
                if (CreateVitalData())
                {
                    gb_VitalData.Visible = false;
                    gb_Profile.Visible = true;
                    rb_Profile.Checked = true;
                    bt_forward.Text = "Speichern und Programm starten";
                    bt_forward.Size = new System.Drawing.Size(200, 23);
                    bt_forward.Location = new System.Drawing.Point(150, 413);

                    // Profile Sample Data
                    UpdateProfileSampleData();
                }
            }

            if (rb_User.Checked)
            {
                if (CreateUserData())
                {
                    gb_User.Visible = false;
                    gb_VitalData.Visible = true;
                    rb_VitalData.Checked = true;
                    bt_back.Text = "Zurück";
                    bt_back.Size = new System.Drawing.Size(75, 23);
                    bt_back.Location = new System.Drawing.Point(20, 413);
                }
            }
        }

        private void bt_back_Click(object sender, EventArgs e)
        {
            if (rb_User.Checked)
            {
                Application.Exit();
            }

            if (rb_VitalData.Checked)
            {
                refillUserData();

                gb_VitalData.Visible = false;
                gb_User.Visible = true;
                rb_User.Checked = true;
                bt_back.Text = "Programm schließen";
                bt_back.Size = new System.Drawing.Size(130, 23);
                bt_back.Location = new System.Drawing.Point(20, 413);
            }

            if (rb_Profile.Checked)
            {
                refillVitalData();

                gb_Profile.Visible = false;
                gb_VitalData.Visible = true;
                rb_VitalData.Checked = true;
                bt_forward.Text = "Weiter";
                bt_forward.Size = new System.Drawing.Size(75, 23);
                bt_forward.Location = new System.Drawing.Point(275, 413);
            }
        }

        private void rb_CheckedChanged(object sender, EventArgs e)
        {
            UpdateProfileSampleData();
        }

        private void bt_calculate_Click(object sender, EventArgs e)
        {
            CreateVitalData();
            tb_show_bmi.Text = Math.Round(Tools.GetBMI(_vitalData), 1).ToString();
            tb_show_basic.Text = Math.Round(Tools.GetBasicRequirements(_user, _vitalData)).ToString();
        }

        private void InitialRegistrationView_FormClosed(object sender, FormClosedEventArgs e)
        {
            // If it wasn't a regular close (a user has been created), end the appliaction immediatley.
            if(!_regularClose)
                Application.Exit();
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
        private void UpdateProfileSampleData()
        {
            int objective = 1;

            if (rb_reduce_weight.Checked)
                objective = 1;

            if (rb_keep_weight.Checked)
                objective = 2;

            if (rb_gain_weight.Checked)
                objective = 3;

            Profile suggestProfile = _context.Profile.GetSuggestedProfile(_user, _vitalData, objective);

            tb_kcal.Text = Math.Round((Double)suggestProfile.TV_Calories).ToString();
            tb_carb.Text =  Math.Round((Double)suggestProfile.TV_Carbohydrate).ToString();
            tb_protein.Text =  Math.Round((Double)suggestProfile.TV_Protein).ToString();
            tb_fat.Text =  Math.Round((Double)suggestProfile.TV_Fat).ToString();
            tb_sugar.Text = Math.Round((Double)suggestProfile.TV_Sugar).ToString();
            tb_salt.Text =  Math.Round((Double)suggestProfile.TV_Salt).ToString();
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
