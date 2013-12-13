namespace FoodControl.View
{
    using System;
    using System.Windows.Forms;
    using FoodControl.BusinessLogicLayer;
    using FoodControl.Model;

    public partial class AddFoodView : Form
    {
        private IBLLContext _context = new BLLContext();
        private Food _foodToAdd;

        public AddFoodView(Food foodToAdd, DateTime selectedDate)
        {
            InitializeComponent();

            // Get information from MainView
            this._foodToAdd = foodToAdd;
            gb_foodToAdd.Text = _foodToAdd.Name;
            dtp_date.Value = selectedDate;

            // Set name of Labels
            lb_measuringunit.Text = _foodToAdd.MeasuringUnit == 1 ? "g" : "ml";
            lb_portion_and_baseunit.Text = _foodToAdd.BaseUnit + " " + lb_measuringunit.Text + " (= 1 " + _foodToAdd.Portion.Name +")";
        }

        private void tb_insert_quantity_TextChanged(object sender, EventArgs e)
        {
            decimal quantity;

            try
            {
                lb_error.Visible = false;
                quantity = Decimal.Parse(tb_insert_quantity.Text);
                tb_show_kcal.Text = Math.Round(quantity * (_foodToAdd.KiloCalories / 100), 2).ToString();
                tb_show_carb.Text = Math.Round(quantity * (_foodToAdd.Carbohydrate / 100), 2).ToString();
                tb_show_protein.Text = Math.Round(quantity * (_foodToAdd.Protein / 100), 2).ToString();
                tb_show_fat.Text = Math.Round(quantity * (_foodToAdd.Fat / 100), 2).ToString();
                tb_show_sugar.Text = Math.Round(quantity * (_foodToAdd.Sugar / 100), 2).ToString();
                tb_show_salt.Text = Math.Round((Decimal)(quantity * (_foodToAdd.Salt / 100)), 2).ToString();
            }
            catch
            {
                lb_error.Visible = true;
            }
        }

        private void tb_insert_quantity_portion_TextChanged(object sender, EventArgs e)
        {
            decimal calculatedQuantity;

            try
            {
                lb_error.Visible = false;
                calculatedQuantity = Convert.ToInt32(tb_insert_quantity_portion.Text) * _foodToAdd.BaseUnit;
                tb_insert_quantity.Text = calculatedQuantity.ToString();
            }
            catch 
            {
                tb_insert_quantity.Text = "";
                lb_error.Visible = true;
            }
        }

        private void bt_save_Click(object sender, EventArgs e)
        {
            try
            {
                _context.NutritionLog.Add(
                    new NutritionLog
                    {
                        UserID = Program.CURRENT_USER.UserID,
                        FoodID = _foodToAdd.FoodID,
                        ProfileID = Program.CURRENT_USER.ProfileID,
                        Date = dtp_date.Value,
                        Daytime = getSelectedDaytime(),
                        Quantity = Decimal.Parse(tb_insert_quantity.Text)
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

        private short getSelectedDaytime()
        {
            if (rb_breakfast.Checked)
                return 1;
            if (rb_lunch.Checked)
                return 2;
            if (rb_dinner.Checked)
                return 3;

            // Snack selected
            return 4;
        }
    }
}
