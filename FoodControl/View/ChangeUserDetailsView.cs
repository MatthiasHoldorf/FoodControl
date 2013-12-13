namespace FoodControl.View
{
    using System;
    using System.Windows.Forms;
    using FoodControl.BusinessLogicLayer;
    using FoodControl.Model;
    using FoodControl.Utility;

    public partial class ChangeUserDetailsView : Form
    {
        private IBLLContext _context = new BLLContext();
        private User _currentUser;

        public ChangeUserDetailsView()
        {
            InitializeComponent();
            _currentUser = _context.User.GetUserById(Program.CURRENT_USER.UserID);
        }

        #region Events
        private void ChangeUserDetailsView_Load(object sender, EventArgs e)
        {
            DisplayData();
        }

        private void bt_apply_Click(object sender, EventArgs e)
        {
            if (ValidateFields())
                UpdateUserData();
        }

        private void bt_save_Click(object sender, EventArgs e)
        {
            if (ValidateFields())
            {
                UpdateUserData();
                this.Close();
            }
            
        }
        #endregion

        #region Methods
        private bool ValidateFields()
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

            return true;
        }

        private void DisplayData()
        {
            tb_insert_Firstname.Text = _currentUser.FirstName;
            tb_insert_Lastname.Text = _currentUser.LastName;
            dtp_insert_date_of_birth.Value = _currentUser.Birthday;
            rb_female.Checked = true;
            if (_currentUser.Sex == 1)
                rb_male.Checked = true;
            cb_choose_activity_level.SelectedItem = cb_choose_activity_level.Items[_currentUser.ActivityLevel - 1];
            if (_currentUser.IsVegetarian)
                cb_vegetarian.Checked = true;
            if (!_currentUser.IsPorkEater)
                cb_no_pork.Checked = true;
            if (!_currentUser.IsFishEater)
                cb_no_fish.Checked = true;
        }

        private void UpdateUserData()
        {
            short activityLevel = (short)cb_choose_activity_level.SelectedIndex;
            activityLevel++;
            
            _currentUser.FirstName = tb_insert_Firstname.Text;
            _currentUser.LastName = tb_insert_Lastname.Text;
            _currentUser.Birthday = dtp_insert_date_of_birth.Value;
            _currentUser.Sex = rb_female.Checked ? (short)2 : (short)1;
            _currentUser.ActivityLevel = activityLevel;
            _currentUser.IsVegetarian = cb_vegetarian.Checked ? true : false;
            _currentUser.IsPorkEater = cb_no_pork.Checked ? false : true;
            _currentUser.IsFishEater = cb_no_fish.Checked ? false : true;
            
            _context.User.Update(_currentUser);

            // Update static user property
            Program.CURRENT_USER = _currentUser;
        }
        #endregion
    }
}
