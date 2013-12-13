namespace FoodControl.View
{
    using System;
    using System.Linq;
    using System.Windows.Forms;
    using FoodControl.BusinessLogicLayer;
    using FoodControl.Model;
    using FoodControl.Utility;

    public partial class ChangeVitalDataDetailsView : Form
    {
        private IBLLContext _context = new BLLContext();
        private VitalData _vitalData;

        public ChangeVitalDataDetailsView()
        {
            InitializeComponent();
        }

        #region Events
        private void ChangeVitalDataDetailsView_Load(object sender, EventArgs e)
        {
            _vitalData = _context.VitalData.GetVitalDataByUserIdAndDate(Program.CURRENT_USER.UserID, DateTime.Now);
            DisplayData();
            CalcluateIndicators();
        }

        private void bt_calculate_Click(object sender, EventArgs e)
        {
            CalcluateIndicators();
        }

        private void bt_apply_Click(object sender, EventArgs e)
        {
            if (ValidateFields())
            {
                SaveVitalData();
                CalcluateIndicators();
            }
        }

        private void bt_save_Click(object sender, EventArgs e)
        {
            if (ValidateFields())
            {
                SaveVitalData();
                this.Close();
            }
        }
        #endregion

        #region Methods
        private bool ValidateFields()
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

            return true;
        }

        private void DisplayData()
        {
            tb_insert_height.Text = _vitalData.BodyHeight.ToString();
            tb_insert_weight.Text = _vitalData.BodyWeight.ToString();
            tb_insert_adipose.Text = _vitalData.Adipose.ToString();
        }

        private void SaveVitalData()
        {
            _vitalData = new VitalData
            {
                UserID = Program.CURRENT_USER.UserID,
                Date = DateTime.Now,
                BodyHeight = Int16.Parse(tb_insert_height.Text),
                BodyWeight = Decimal.Parse(tb_insert_weight.Text),
                Adipose = tb_insert_adipose.Text.Length >= 1 ? Decimal.Parse(tb_insert_adipose.Text.Replace(".",",")) : (decimal?)null
            };

            _context.VitalData.Add(_vitalData);
        }

        private void CalcluateIndicators()
        {
            if (!ValidateFields())
                return;

            VitalData vitalData = new VitalData
            {
                Date = DateTime.Now,
                BodyHeight = Int16.Parse(tb_insert_height.Text),
                BodyWeight = Decimal.Parse(tb_insert_weight.Text),
                Adipose = tb_insert_adipose.Text.Length >= 1 ? Decimal.Parse(tb_insert_adipose.Text) : (decimal?)null
            };

            tb_show_bmi.Text = Math.Round(Tools.GetBMI(vitalData), 2).ToString();
            tb_show_basic.Text = Math.Round(Tools.GetBasicRequirements(Program.CURRENT_USER, vitalData)).ToString();
        }
        #endregion
    }
}
