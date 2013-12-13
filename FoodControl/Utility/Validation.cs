namespace FoodControl.Utility
{
    using System;
    using System.Linq;
    using System.Windows.Forms;

    /// <summary>
    /// The Validation class provides validation methods that are needed throughout the application.
    /// </summary>
    public static class Validation
    {
        private static ToolTip _tt = new ToolTip { IsBalloon = true, ToolTipIcon = ToolTipIcon.Error };

        public static bool ValidateTextBoxString(TextBox textBox, string message)
        {
            if (textBox.Text.Length <= 1)
            {
                textBox.BackColor = System.Drawing.Color.Salmon;
                _tt.Show(message, textBox, 0, -70, 2000);
                return false;
            }

            textBox.BackColor = System.Drawing.Color.White;
            return true;
        }

        public static bool ValidateComboBoxString(ComboBox comboBox, string message)
        {
            if (comboBox.Text.Length <= 1)
            {
                comboBox.BackColor = System.Drawing.Color.Salmon;
                _tt.Show(message, comboBox, 0, -70, 2000);
                return false;
            }

            comboBox.BackColor = System.Drawing.Color.White;
            return true;
        }

        public static bool ValidateTextBoxShort(TextBox textBox, string message)
        {
            try
            {
                Int16.Parse(textBox.Text);
            }
            catch
            {
                textBox.BackColor = System.Drawing.Color.Salmon;
                _tt.Show(message, textBox, 0, -70, 2000);
                return false;
            }

            textBox.BackColor = System.Drawing.Color.White;
            return true;
        }

        public static bool ValidateRadioButtonSex(RadioButton male, RadioButton female, string message)
        {
            if (!male.Checked && !female.Checked)
            {
                male.BackColor = System.Drawing.Color.Salmon;
                female.BackColor = System.Drawing.Color.Salmon;
                _tt.Show(message, female, 0, -70, 2000);

                return false;
            }

            if (male.BackColor == System.Drawing.Color.Salmon || female.BackColor == System.Drawing.Color.Salmon)
            {
                male.BackColor = System.Drawing.Color.White;
                female.BackColor = System.Drawing.Color.White;
            }

            return true;
        }

        public static bool ValidateTextBoxDecimalFractions(TextBox textBox, string message, int digitsBefore, int digitsAfter)
        {
            decimal decimalValue;
            try
            {
                decimalValue = Decimal.Parse(textBox.Text.Replace(".", ","));
                if (!ValidateDecimal(decimalValue, digitsBefore, digitsAfter) || decimalValue < 0)
                {
                    throw new System.ArgumentException("decimal does not match the datatype format which is required by the database!");
                }
            }
            catch
            {
                textBox.BackColor = System.Drawing.Color.Salmon;
                _tt.Show(message, textBox, 0, -70, 2000);
                return false;
            }

            textBox.BackColor = System.Drawing.Color.White;
            return true;
        }

        private static bool ValidateDecimal(decimal decimalValue, int digitsBefore, int digitsAfter)
        {
            decimal integral = Math.Truncate(decimalValue);
            decimal fractional = decimalValue - integral;

            int fractionalLength;
            if (fractional.ToString().Contains(','))
            {
                fractionalLength = decimalValue.ToString().Substring(decimalValue.ToString().IndexOf(',') + 1).Length;
            }
            else
            {
                fractionalLength = 0;
            }

            if (integral.ToString().Length <= digitsBefore && fractionalLength <= digitsAfter)
            {
                return true;
            }

            return false;
        }
    }
}
