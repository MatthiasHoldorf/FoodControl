namespace FoodControl.View
{
    using System;
    using System.Linq;
    using System.Windows.Forms;
    using FoodControl.BusinessLogicLayer;
    using FoodControl.Model;
    using FoodControl.Utility;

    public partial class AddActivityView : Form
    {
        private IBLLContext _context = new BLLContext();
        private Activity _activityToAdd;

        public AddActivityView(Activity activityToAdd, DateTime selectedDate)
        {
            InitializeComponent();

            // Get information from MainView
            this._activityToAdd = activityToAdd;
            gb_activityToAdd.Text = _activityToAdd.Name;
            dtp_date.Value = selectedDate;
        }
        
        private void tb_insert_duration_TextChanged(object sender, EventArgs e)
        {
            try
            {
                lb_error.Visible = false;
                decimal weight = _context.VitalData.GetVitalDataByUserId(Program.CURRENT_USER.UserID).Select(v => v.BodyWeight).FirstOrDefault();
                tb_show_used_kcal.Text = Math.Round((Decimal.Parse(tb_insert_duration.Text)/60 * _activityToAdd.MET * weight),2).ToString();
            }
            catch
            {
                lb_error.Visible = true;
            }
        }

        private void bt_save_Click(object sender, EventArgs e)
        {
            try
            {
                _context.ActivityLog.Add(
                    new ActivityLog
                    {
                        UserID = Program.CURRENT_USER.UserID,
                        ActID = _activityToAdd.ActID,
                        Date = dtp_date.Value,
                        Duration = Int16.Parse(tb_insert_duration.Text)
                    });
                this.DialogResult = DialogResult.OK;
                this.Close();
            }
            catch
            {
                lb_error.Visible = true;
            }
        }

        private void bt_abort_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
