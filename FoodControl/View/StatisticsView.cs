namespace FoodControl.View
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Windows.Forms;
    using System.Windows.Forms.DataVisualization.Charting;
    using FoodControl.BusinessLogicLayer;
    using FoodControl.Model;

    public partial class StatisticsView : Form
    {
        private IBLLContext _context = new BLLContext();
        private Color[] _BrightPastelColors = new Color[] { Color.FromArgb(0x41, 140, 240), Color.FromArgb(0xfc, 180, 0x41), Color.FromArgb(0xe0, 0x40, 10), Color.FromArgb(5, 100, 0x92), Color.FromArgb(0xbf, 0xbf, 0xbf), Color.FromArgb(0x1a, 0x3b, 0x69), Color.FromArgb(0xff, 0xe3, 130), Color.FromArgb(0x12, 0x9c, 0xdd), Color.FromArgb(0xca, 0x6b, 0x4b), Color.FromArgb(0, 0x5c, 0xdb), Color.FromArgb(0xf3, 210, 0x88), Color.FromArgb(80, 0x63, 0x81), Color.FromArgb(0xf1, 0xb9, 0xa8), Color.FromArgb(0xe0, 0x83, 10), Color.FromArgb(120, 0x93, 190) };
        private string[] _names = new string[] { "Kohlenhydrate", "Eiweiß", "Fett", "Zucker" };

        private IList<NutritionLog> _nutritionLogByUser;
        private IList<NutrientAggregation> _nutritionAggregationByUser;
        private IList<DateTime> _distinctDateOfEntries;
        private DateTime _dateMin;
        private DateTime _dateMax;

        private ToolStripLabel _statusLabel;

        public StatisticsView(ToolStripLabel statusLabel)
        {
            this._statusLabel = statusLabel;
            InitializeComponent();
        }

        private void Statistics_Load(object sender, EventArgs e)
        {
            Initalize();
            _statusLabel.Text = "Bereit";
        }

        private void Initalize()
        {
            // Get NutritionLog entries by user; if there are data available continue
            _nutritionLogByUser = _context.NutritionLog.GetNutritionLogByUserId(Program.CURRENT_USER.UserID).ToList();
            if (_nutritionLogByUser.Count > 0)
            {
                _nutritionAggregationByUser = _context.NutritionLog.GetNutritionAggregationList(_nutritionLogByUser).OrderBy(n => n.Date).ToList();
                _distinctDateOfEntries = _context.NutritionLog.GetDistinctDateList(_nutritionLogByUser).ToList();
                _dateMin = _nutritionAggregationByUser.Select(d => d.Date).FirstOrDefault();
                _dateMax = _nutritionAggregationByUser.Select(d => d.Date).LastOrDefault();

                // Set DateTime Pickers
                dtpFrom.Value = _dateMin;
                dtpTo.Value = _dateMax.AddDays(1);
                dtpSingle.Value = _dateMax;
                updateVitalData(_dateMin);

                // Customize Legend: chSpecificDate
                // Disable legend item for the first series and second series
                chSpecificDate.Series[0].IsVisibleInLegend = false;
                chSpecificDate.Series[1].IsVisibleInLegend = false;
                // Add custom items
                chSpecificDate.Legends[0].CustomItems.Add(new LegendItem { Name = "Soll-Werte", Color = Color.FromArgb(34, 139, 34) });
                chSpecificDate.Legends[0].CustomItems.Add(new LegendItem { Name = "Kohlenhydrate", Color = _BrightPastelColors[0] });
                chSpecificDate.Legends[0].CustomItems.Add(new LegendItem { Name = "Eiweiß", Color = _BrightPastelColors[1] });
                chSpecificDate.Legends[0].CustomItems.Add(new LegendItem { Name = "Fett", Color = _BrightPastelColors[2] });
                chSpecificDate.Legends[0].CustomItems.Add(new LegendItem { Name = "Zucker", Color = _BrightPastelColors[3] });

                #region chHistorie

                // DataBinding
                chHistorie.DataSource = _nutritionAggregationByUser;
                chHistorie.Series[0].XValueMember = "Date";

                // Displayed Values
                chHistorie.ChartAreas[0].AxisX.Minimum = _dateMin.AddDays(-1).ToOADate();
                chHistorie.ChartAreas[0].AxisX.Maximum = _dateMax.AddDays(1).ToOADate();
                determineDisplayedNutrient(getRadioButtonName());

                // Set Title
                SetTitle(_dateMin, _dateMax);

                // Draw Max Line according to Profile settings
                drawTargetValueLine(getRadioButtonName());

                #endregion

                #region chSpecificDate

                // Draw the chart
                draw_chSpecificDate(_dateMax);

                #endregion
            }
            else
            {
                // Deactivate all controls, since there are no data available
                rbtnKcal.Enabled = false;
                rbtnCarbs.Enabled = false;
                rbtnProtein.Enabled = false;
                rbtnFat.Enabled = false;
                rbtnSugar.Enabled = false;

                dtpFrom.Enabled = false;
                dtpTo.Enabled = false;
                dtpSingle.Enabled = false;
            }
        }

        #region Events
        private void chHistorie_MouseMove(object sender, MouseEventArgs e)
        {
            ChHistorie_MousHoverEffect(e);
        }

        private void chSpecificDate_MouseMove(object sender, MouseEventArgs e)
        {
            ChSpecificDate_MousHoverEffects(e);
        }

        private void chHistorie_MouseDown(object sender, MouseEventArgs e)
        {
            ChHistorie_DrawChSpecificDate(e);
        }
        
        private void radioButton_CheckedChanged(object sender, EventArgs e)
        {
            ChHistorie_DisplayAnOtherNutrient(sender);
        }

        private void dtpSingle_ValueChanged(object sender, EventArgs e)
        {
            draw_chSpecificDate(dtpSingle.Value);
        }

        private void dtpFrom_ValueChanged(object sender, EventArgs e)
        {
            if (dtpFrom.Value > dtpTo.Value)
                dtpFrom.Value = dtpTo.Value;

            chHistorie.ChartAreas[0].AxisX.Minimum = dtpFrom.Value.ToOADate();
            updateVitalData(dtpFrom.Value);
            SetTitle(dtpFrom.Value, dtpTo.Value.AddDays(-1));
        }

        private void dtpTo_ValueChanged(object sender, EventArgs e)
        {
            if (dtpFrom.Value > dtpTo.Value)
                dtpTo.Value = dtpFrom.Value;

            chHistorie.ChartAreas[0].AxisX.Maximum = dtpTo.Value.ToOADate();
            SetTitle(dtpFrom.Value, dtpTo.Value.AddDays(-1));
        }
        #endregion

        #region Methods
        /// <summary>
        /// Get the user's TargetValues for the specified date.
        /// First: Get the according profile stored in the nutritionLog entry.
        /// Second: Get the activityLog of the specified date and aggregate all activities into KiloCalories
        /// Third: Add the activityLog KiloCalories to the user's profile's target value of KiloCalories
        /// { Fourth: Adjust user's profile's TargetValues with new TargetValue of KiloCalories }
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        private int _previousId = 0;
        private NutrientAggregation getTargetValuesOfSpecificDate(DateTime date)
        {
            // TargetValues according to Profile stored in the nutrtionLog at the specified Date          
            int profileId = _nutritionLogByUser.Where(n => n.Date.Date == date.Date).Select(n => n.ProfileID).FirstOrDefault();    

            if (profileId == 0)
                profileId = _previousId;
            else
                _previousId = profileId;

            NutrientAggregation targeValues = _context.Profile.GetTargetValuesById(profileId);

            // Bonus KiloCaloriesgain gain tue do Activity at the specified Date
            decimal kiloCaloriesActivity = _context.ActivityLog.GetKiloCaloriesForSpecificDate(Program.CURRENT_USER.UserID, date).KiloCalories;

            // Adjust Target Values 
            if (kiloCaloriesActivity > 0)
            {
                targeValues.KiloCalories += Math.Round(kiloCaloriesActivity);
                targeValues.Carbohydrate +=  Math.Round(kiloCaloriesActivity * (decimal)0.09);
                targeValues.Protein += Math.Round(kiloCaloriesActivity * (decimal)0.025);
                targeValues.Fat += Math.Round(kiloCaloriesActivity * (decimal)0.025);
                targeValues.Sugar += Math.Round(kiloCaloriesActivity * (decimal)0.045);
            }

            return new NutrientAggregation 
            {
                KiloCalories = targeValues.KiloCalories,
                Carbohydrate = targeValues.Carbohydrate,
                Protein = targeValues.Protein,
                Fat = targeValues.Fat,
                Sugar = targeValues.Sugar,
                Salt = targeValues.Salt,
                Date = date 
            };
        }

        /// <summary>
        /// Draw the chart of a specific date.
        /// </summary>
        /// <param name="selectedDate">The date for which the chart should be drawn.</param>
        private void draw_chSpecificDate(DateTime selectedDate)
        {
            NutrientAggregation nutritionAggregationOfSpecificDate = (from f in _nutritionAggregationByUser
                                 where f.Date.Date == selectedDate.Date
                                 select f).FirstOrDefault();

            // Validate if entry for the selectedDate exists
            lb_error.Text = "";
            if (nutritionAggregationOfSpecificDate == null)
            {
                lb_error.Text = "Für das ausgewählte Datum existiert kein Eintrag!";
            }

            // If an entry exists continue drawing the chart
            if (nutritionAggregationOfSpecificDate != null)
            {
                NutrientAggregation targetValuesOfSpecificDate = getTargetValuesOfSpecificDate(selectedDate);

                // Convert to double Array
                double[] parse = { 
                                   Math.Round(Convert.ToDouble(nutritionAggregationOfSpecificDate.Carbohydrate)), 
                                   Math.Round(Convert.ToDouble(nutritionAggregationOfSpecificDate.Protein)),  
                                   Math.Round(Convert.ToDouble(nutritionAggregationOfSpecificDate.Fat)),  
                                   Math.Round(Convert.ToDouble(nutritionAggregationOfSpecificDate.Sugar)) 
                                 };
                double[] soll = { 
                                  Math.Round((Double)targetValuesOfSpecificDate.Carbohydrate),
                                  Math.Round((Double)targetValuesOfSpecificDate.Protein), 
                                  Math.Round((Double)targetValuesOfSpecificDate.Fat),
                                  Math.Round((Double)targetValuesOfSpecificDate.Sugar)
                                };

                // DataBinding
                chSpecificDate.Series[0].Points.DataBindY(parse);
                chSpecificDate.Series[1].Points.DataBindY(soll);

                // Set Title
                chSpecificDate.Titles[0].Text = "Kalorien an diesem Tag: " + (int)nutritionAggregationOfSpecificDate.KiloCalories + " Soll-Wert: " + (int)targetValuesOfSpecificDate.KiloCalories;
            }
        }

        /// <summary>
        /// Draw TargetValues according to Profile in chart chHistorie.
        /// </summary>
        /// <param name="displayedNutrient">Nutrient to display.</param>
        private void drawTargetValueLine(string displayedNutrient)
        {
            int j = 0;
            TimeSpan difference = _nutritionAggregationByUser.Select(n => n.Date.Date).LastOrDefault() - _nutritionAggregationByUser.Select(n => n.Date.Date).FirstOrDefault();

            // Clear previous drawing
            chHistorie.Series[1].Points.Clear();

            while (j <= difference.Days)
            {
                var setPoints = getTargetValuesOfSpecificDate(_dateMin.AddDays(j));

                // If there are valid Target Values
                if (setPoints != null)
                {
                    switch (displayedNutrient)
                    {
                        case "rbtnKcal":
                            chHistorie.Series[1].Points.AddXY(_dateMin.AddDays(j).ToOADate(), setPoints.KiloCalories);
                            chHistorie.Series[0].Label = "#VAL kcal";
                            chHistorie.Series[1].Label = "#VAL kcal";
                            chHistorie.ChartAreas[0].AxisY.Title = "in Kilokalorien"; break;
                        case "rbtnCarbs":
                            chHistorie.Series[1].Points.AddXY(_dateMin.AddDays(j).ToOADate(), setPoints.Carbohydrate);
                            chHistorie.Series[0].Label = "#VAL g";
                            chHistorie.Series[1].Label = "#VAL g";
                            chHistorie.ChartAreas[0].AxisY.Title = "in Gramm"; break;
                        case "rbtnProtein":
                            chHistorie.Series[1].Points.AddXY(_dateMin.AddDays(j).ToOADate(), setPoints.Protein);
                            chHistorie.Series[0].Label = "#VAL g";
                            chHistorie.Series[1].Label = "#VAL g";
                            chHistorie.ChartAreas[0].AxisY.Title = "in Gramm"; break;
                        case "rbtnFat":
                            chHistorie.Series[1].Points.AddXY(_dateMin.AddDays(j).ToOADate(), setPoints.Fat);
                            chHistorie.Series[0].Label = "#VAL g";
                            chHistorie.Series[1].Label = "#VAL g";
                            chHistorie.ChartAreas[0].AxisY.Title = "in Gramm"; break;
                        case "rbtnSugar":
                            chHistorie.Series[1].Points.AddXY(_dateMin.AddDays(j).ToOADate(), setPoints.Sugar);
                            chHistorie.Series[0].Label = "#VAL g";
                            chHistorie.Series[1].Label = "#VAL g";
                            chHistorie.ChartAreas[0].AxisY.Title = "in Gramm"; break;
                    }
                }

                j++;
            }
        }

        /// <summary>
        /// Get the name of the nutrient from the radioButtons.
        /// </summary>
        /// <returns>The Name of the nutrient as a string.</returns>
        private string getRadioButtonName()
        {
            return this.Controls.OfType<RadioButton>()
                                      .FirstOrDefault(r => r.Checked).Name;
        }

        /// <summary>
        /// Determine the nutrient to display.
        /// </summary>
        /// <param name="propertyToNutrient">The string that specifices the nutrient to display.</param>
        private void determineDisplayedNutrient(string propertyToNutrient)
        {
            switch (propertyToNutrient)
            {
                case "rbtnKcal": chHistorie.Series[0].YValueMembers = "KiloCalories"; break;
                case "rbtnCarbs": chHistorie.Series[0].YValueMembers = "Carbohydrate"; break;
                case "rbtnProtein": chHistorie.Series[0].YValueMembers = "Protein"; break;
                case "rbtnFat": chHistorie.Series[0].YValueMembers = "Fat"; break;
                case "rbtnSugar": chHistorie.Series[0].YValueMembers = "Sugar"; break;
            }
        }

        /// <summary>
        /// Sets the title of the chart chHistorie.
        /// </summary>
        private void SetTitle(DateTime start, DateTime end)
        {
            // Convert DateTime to string
            chHistorie.Titles[0].Text = "Start Datum: ";

            // Set view position to the title
            chHistorie.Titles[0].Text += start.ToLongDateString();

            // Set view size to the title
            chHistorie.Titles[0].Text += "\nAnzahl der Tage: ";
            chHistorie.Titles[0].Text += (end.Date - start.Date).TotalDays + 1;
        }

        private void ChHistorie_MousHoverEffect(MouseEventArgs e)
        {
            // Call Hit Test Method
            HitTestResult result = chHistorie.HitTest(e.X, e.Y);

            // Reset Data Point Attributes
            foreach (DataPoint point in chHistorie.Series[0].Points)
            {
                point.BackSecondaryColor = Color.Black;
                point.BackHatchStyle = ChartHatchStyle.None;
                point.BorderWidth = 1;
            }

            // If a Data Point is selected
            if (result.ChartElementType == ChartElementType.DataPoint)
            {
                // Set cursor type 
                this.Cursor = Cursors.Hand;

                try
                {
                    // Find selected data point
                    DataPoint point = chHistorie.Series[0].Points[result.PointIndex];

                    // Set End Gradient Color to White
                    point.BackSecondaryColor = Color.White;

                    // Set selected hatch style
                    point.BackHatchStyle = ChartHatchStyle.Percent25;

                    // Increase border width
                    point.BorderWidth = 2;
                }
                catch { }
            }
            else
            {
                // Set default cursor
                this.Cursor = Cursors.Default;
            }
        }

        private void ChHistorie_DrawChSpecificDate(MouseEventArgs e)
        {
            HitTestResult result = chHistorie.HitTest(e.X, e.Y);

            // Return
            if (result.ChartElementType != ChartElementType.DataPoint)
                return;

            // Clear other Chart first
            chSpecificDate.Series[0].Points.Clear();

            // Find selected data point
            DataPoint point = chHistorie.Series[0].Points[result.PointIndex];
            DateTime date = DateTime.FromOADate(point.XValue);

            // Redraw chSpecificDate
            draw_chSpecificDate(date);
            dtpSingle.Value = date;
        }

        private void ChHistorie_DisplayAnOtherNutrient(object sender)
        {
            RadioButton rb = sender as RadioButton;
            if (rb != null)
            {
                if (rb.Checked)
                {
                    // Change Displayed Property of NutritionLog
                    determineDisplayedNutrient(getRadioButtonName());
                    drawTargetValueLine(getRadioButtonName());

                    // Update DataBinding
                    chHistorie.DataSource = null;
                    chHistorie.DataSource = _nutritionAggregationByUser;
                }
            }

            // Update Chart/Series
            chHistorie.Series[0].Enabled = true;
        }

        private void ChSpecificDate_MousHoverEffects(MouseEventArgs e)
        {
            // Call Hit Test Method
            HitTestResult result = chSpecificDate.HitTest(e.X, e.Y);

            // If a Data Point is selected
            if (result.ChartElementType == ChartElementType.DataPoint)
            {
                // Set cursor type 
                this.Cursor = Cursors.Hand;

                // Change Tooltip
                chSpecificDate.Series[0].ToolTip = _names[result.PointIndex];
            }
            else
            {
                // Set default cursor
                this.Cursor = Cursors.Default;
            }
        }

        private void updateVitalData(DateTime date)
        {
            VitalData vitalData = _context.VitalData.GetVitalDataByUserIdAndDate(Program.CURRENT_USER.UserID, date);

            if (vitalData != null)
            {
                lb_vitalData.Text = "Vitaldaten am " + date.ToShortDateString() + ":";
                lb_weight.Text = "Gewicht: " + vitalData.BodyWeight.ToString() + " kg";
                lb_adipose.Text = "Körperfettanteil: " + vitalData.Adipose.ToString() + " %";
            }
            else
            {
                lb_vitalData.Text = "Keine Angaben zu ihren Vitaldaten vorhanden!";
                lb_weight.Text = "Gewicht:";
                lb_adipose.Text = "Körperfettanteil:";
            }
        }
        #endregion Methods
    }
}
