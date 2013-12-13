using System;
namespace FoodControl.View
{
    partial class StatisticsView
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series1 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Series series2 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Title title1 = new System.Windows.Forms.DataVisualization.Charting.Title();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea2 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend2 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series3 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Series series4 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Title title2 = new System.Windows.Forms.DataVisualization.Charting.Title();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(StatisticsView));
            this.chHistorie = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.chSpecificDate = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.rbtnKcal = new System.Windows.Forms.RadioButton();
            this.rbtnCarbs = new System.Windows.Forms.RadioButton();
            this.rbtnProtein = new System.Windows.Forms.RadioButton();
            this.dtpSingle = new System.Windows.Forms.DateTimePicker();
            this.dtpTo = new System.Windows.Forms.DateTimePicker();
            this.dtpFrom = new System.Windows.Forms.DateTimePicker();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.rbtnSugar = new System.Windows.Forms.RadioButton();
            this.rbtnFat = new System.Windows.Forms.RadioButton();
            this.label5 = new System.Windows.Forms.Label();
            this.lb_error = new System.Windows.Forms.Label();
            this.lb_vitalData = new System.Windows.Forms.Label();
            this.lb_weight = new System.Windows.Forms.Label();
            this.lb_adipose = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.chHistorie)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chSpecificDate)).BeginInit();
            this.SuspendLayout();
            // 
            // chHistorie
            // 
            this.chHistorie.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(211)))), ((int)(((byte)(223)))), ((int)(((byte)(240)))));
            this.chHistorie.BackGradientStyle = System.Windows.Forms.DataVisualization.Charting.GradientStyle.TopBottom;
            this.chHistorie.BackSecondaryColor = System.Drawing.Color.White;
            this.chHistorie.BorderlineColor = System.Drawing.Color.FromArgb(((int)(((byte)(26)))), ((int)(((byte)(59)))), ((int)(((byte)(105)))));
            this.chHistorie.BorderlineDashStyle = System.Windows.Forms.DataVisualization.Charting.ChartDashStyle.Solid;
            this.chHistorie.BorderlineWidth = 2;
            this.chHistorie.BorderSkin.SkinStyle = System.Windows.Forms.DataVisualization.Charting.BorderSkinStyle.Emboss;
            chartArea1.Area3DStyle.Inclination = 15;
            chartArea1.Area3DStyle.IsClustered = true;
            chartArea1.Area3DStyle.IsRightAngleAxes = false;
            chartArea1.Area3DStyle.Perspective = 10;
            chartArea1.Area3DStyle.Rotation = 10;
            chartArea1.Area3DStyle.WallWidth = 0;
            chartArea1.AxisX.IsMarginVisible = false;
            chartArea1.AxisX.LabelStyle.Font = new System.Drawing.Font("Trebuchet MS", 8.25F, System.Drawing.FontStyle.Bold);
            chartArea1.AxisX.LabelStyle.Format = "MMM dd";
            chartArea1.AxisX.LineColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea1.AxisX.MajorGrid.LineColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea1.AxisX.ScaleView.Zoomable = false;
            chartArea1.AxisY.IsLabelAutoFit = false;
            chartArea1.AxisY.LabelStyle.Font = new System.Drawing.Font("Trebuchet MS", 8.25F, System.Drawing.FontStyle.Bold);
            chartArea1.AxisY.LineColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea1.AxisY.MajorGrid.LineColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea1.AxisY.Title = "in Kilokalorien";
            chartArea1.AxisY.TitleFont = new System.Drawing.Font("Arial", 10F);
            chartArea1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(165)))), ((int)(((byte)(191)))), ((int)(((byte)(228)))));
            chartArea1.BackGradientStyle = System.Windows.Forms.DataVisualization.Charting.GradientStyle.TopBottom;
            chartArea1.BackSecondaryColor = System.Drawing.Color.White;
            chartArea1.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea1.BorderDashStyle = System.Windows.Forms.DataVisualization.Charting.ChartDashStyle.Solid;
            chartArea1.CursorX.AutoScroll = false;
            chartArea1.CursorX.IsUserEnabled = true;
            chartArea1.CursorX.IsUserSelectionEnabled = true;
            chartArea1.CursorX.SelectionColor = System.Drawing.Color.Gray;
            chartArea1.CursorY.SelectionColor = System.Drawing.Color.Gray;
            chartArea1.Name = "Default";
            chartArea1.ShadowColor = System.Drawing.Color.Transparent;
            this.chHistorie.ChartAreas.Add(chartArea1);
            legend1.BackColor = System.Drawing.Color.Transparent;
            legend1.Enabled = false;
            legend1.Font = new System.Drawing.Font("Trebuchet MS", 8.25F, System.Drawing.FontStyle.Bold);
            legend1.IsTextAutoFit = false;
            legend1.Name = "Default";
            this.chHistorie.Legends.Add(legend1);
            this.chHistorie.Location = new System.Drawing.Point(12, 108);
            this.chHistorie.Name = "chHistorie";
            series1.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(180)))), ((int)(((byte)(26)))), ((int)(((byte)(59)))), ((int)(((byte)(105)))));
            series1.ChartArea = "Default";
            series1.CustomProperties = "PointWidth=0.5";
            series1.Legend = "Default";
            series1.Name = "Default";
            series1.XValueType = System.Windows.Forms.DataVisualization.Charting.ChartValueType.DateTime;
            series1.YValueMembers = "Protein";
            series2.BorderColor = System.Drawing.Color.Red;
            series2.BorderWidth = 3;
            series2.ChartArea = "Default";
            series2.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Line;
            series2.Legend = "Default";
            series2.Name = "Series2";
            this.chHistorie.Series.Add(series1);
            this.chHistorie.Series.Add(series2);
            this.chHistorie.Size = new System.Drawing.Size(991, 296);
            this.chHistorie.TabIndex = 0;
            title1.Font = new System.Drawing.Font("Arial", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            title1.Name = "Title1";
            this.chHistorie.Titles.Add(title1);
            this.chHistorie.MouseDown += new System.Windows.Forms.MouseEventHandler(this.chHistorie_MouseDown);
            this.chHistorie.MouseMove += new System.Windows.Forms.MouseEventHandler(this.chHistorie_MouseMove);
            // 
            // chSpecificDate
            // 
            this.chSpecificDate.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(211)))), ((int)(((byte)(223)))), ((int)(((byte)(240)))));
            this.chSpecificDate.BackGradientStyle = System.Windows.Forms.DataVisualization.Charting.GradientStyle.TopBottom;
            this.chSpecificDate.BackSecondaryColor = System.Drawing.Color.White;
            this.chSpecificDate.BorderlineColor = System.Drawing.Color.FromArgb(((int)(((byte)(26)))), ((int)(((byte)(59)))), ((int)(((byte)(105)))));
            this.chSpecificDate.BorderlineDashStyle = System.Windows.Forms.DataVisualization.Charting.ChartDashStyle.Solid;
            this.chSpecificDate.BorderlineWidth = 2;
            this.chSpecificDate.BorderSkin.SkinStyle = System.Windows.Forms.DataVisualization.Charting.BorderSkinStyle.Emboss;
            chartArea2.Area3DStyle.Inclination = 15;
            chartArea2.Area3DStyle.IsClustered = true;
            chartArea2.Area3DStyle.IsRightAngleAxes = false;
            chartArea2.Area3DStyle.Perspective = 10;
            chartArea2.Area3DStyle.Rotation = 10;
            chartArea2.Area3DStyle.WallWidth = 0;
            chartArea2.AxisX.IsMarginVisible = false;
            chartArea2.AxisX.LabelStyle.Enabled = false;
            chartArea2.AxisX.LabelStyle.Font = new System.Drawing.Font("Trebuchet MS", 8.25F, System.Drawing.FontStyle.Bold);
            chartArea2.AxisX.LabelStyle.Format = "String";
            chartArea2.AxisX.LineColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea2.AxisX.MajorGrid.LineColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea2.AxisY.IsLabelAutoFit = false;
            chartArea2.AxisY.LabelStyle.Font = new System.Drawing.Font("Trebuchet MS", 8.25F, System.Drawing.FontStyle.Bold);
            chartArea2.AxisY.LineColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea2.AxisY.MajorGrid.LineColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea2.AxisY.Maximum = 500D;
            chartArea2.AxisY.Title = "in Gramm";
            chartArea2.AxisY.TitleFont = new System.Drawing.Font("Arial", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            chartArea2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(165)))), ((int)(((byte)(191)))), ((int)(((byte)(228)))));
            chartArea2.BackGradientStyle = System.Windows.Forms.DataVisualization.Charting.GradientStyle.TopBottom;
            chartArea2.BackSecondaryColor = System.Drawing.Color.White;
            chartArea2.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            chartArea2.BorderDashStyle = System.Windows.Forms.DataVisualization.Charting.ChartDashStyle.Solid;
            chartArea2.CursorX.SelectionColor = System.Drawing.Color.Gray;
            chartArea2.CursorY.SelectionColor = System.Drawing.Color.Gray;
            chartArea2.Name = "Default";
            chartArea2.ShadowColor = System.Drawing.Color.Transparent;
            this.chSpecificDate.ChartAreas.Add(chartArea2);
            legend2.BackColor = System.Drawing.Color.Transparent;
            legend2.Font = new System.Drawing.Font("Trebuchet MS", 8.25F, System.Drawing.FontStyle.Bold);
            legend2.IsTextAutoFit = false;
            legend2.LegendStyle = System.Windows.Forms.DataVisualization.Charting.LegendStyle.Column;
            legend2.Name = "Default";
            this.chSpecificDate.Legends.Add(legend2);
            this.chSpecificDate.Location = new System.Drawing.Point(15, 481);
            this.chSpecificDate.Name = "chSpecificDate";
            series3.ChartArea = "Default";
            series3.Label = "#VAL g";
            series3.Legend = "Default";
            series3.Name = "Nährwerte";
            series3.Palette = System.Windows.Forms.DataVisualization.Charting.ChartColorPalette.BrightPastel;
            series4.ChartArea = "Default";
            series4.Color = System.Drawing.Color.ForestGreen;
            series4.Label = "#VAL g";
            series4.Legend = "Default";
            series4.Name = "Soll-Werte";
            this.chSpecificDate.Series.Add(series3);
            this.chSpecificDate.Series.Add(series4);
            this.chSpecificDate.Size = new System.Drawing.Size(988, 296);
            this.chSpecificDate.TabIndex = 1;
            title2.Font = new System.Drawing.Font("Arial", 10F, System.Drawing.FontStyle.Bold);
            title2.Name = "Title1";
            this.chSpecificDate.Titles.Add(title2);
            this.chSpecificDate.MouseMove += new System.Windows.Forms.MouseEventHandler(this.chSpecificDate_MouseMove);
            // 
            // rbtnKcal
            // 
            this.rbtnKcal.AutoSize = true;
            this.rbtnKcal.BackColor = System.Drawing.Color.White;
            this.rbtnKcal.Checked = true;
            this.rbtnKcal.ForeColor = System.Drawing.SystemColors.ControlText;
            this.rbtnKcal.Location = new System.Drawing.Point(314, 40);
            this.rbtnKcal.Name = "rbtnKcal";
            this.rbtnKcal.Size = new System.Drawing.Size(79, 17);
            this.rbtnKcal.TabIndex = 5;
            this.rbtnKcal.TabStop = true;
            this.rbtnKcal.Text = "Kilokalorien";
            this.rbtnKcal.UseVisualStyleBackColor = false;
            this.rbtnKcal.CheckedChanged += new System.EventHandler(this.radioButton_CheckedChanged);
            // 
            // rbtnCarbs
            // 
            this.rbtnCarbs.AutoSize = true;
            this.rbtnCarbs.Location = new System.Drawing.Point(414, 39);
            this.rbtnCarbs.Name = "rbtnCarbs";
            this.rbtnCarbs.Size = new System.Drawing.Size(93, 17);
            this.rbtnCarbs.TabIndex = 6;
            this.rbtnCarbs.Text = "Kohlenhydrate";
            this.rbtnCarbs.UseVisualStyleBackColor = true;
            this.rbtnCarbs.CheckedChanged += new System.EventHandler(this.radioButton_CheckedChanged);
            // 
            // rbtnProtein
            // 
            this.rbtnProtein.AutoSize = true;
            this.rbtnProtein.Location = new System.Drawing.Point(314, 66);
            this.rbtnProtein.Name = "rbtnProtein";
            this.rbtnProtein.Size = new System.Drawing.Size(56, 17);
            this.rbtnProtein.TabIndex = 7;
            this.rbtnProtein.Text = "Eiweiß";
            this.rbtnProtein.UseVisualStyleBackColor = true;
            this.rbtnProtein.CheckedChanged += new System.EventHandler(this.radioButton_CheckedChanged);
            // 
            // dtpSingle
            // 
            this.dtpSingle.Location = new System.Drawing.Point(12, 449);
            this.dtpSingle.Name = "dtpSingle";
            this.dtpSingle.Size = new System.Drawing.Size(204, 20);
            this.dtpSingle.TabIndex = 8;
            this.dtpSingle.ValueChanged += new System.EventHandler(this.dtpSingle_ValueChanged);
            // 
            // dtpTo
            // 
            this.dtpTo.Location = new System.Drawing.Point(57, 68);
            this.dtpTo.Name = "dtpTo";
            this.dtpTo.Size = new System.Drawing.Size(204, 20);
            this.dtpTo.TabIndex = 9;
            this.dtpTo.ValueChanged += new System.EventHandler(this.dtpTo_ValueChanged);
            // 
            // dtpFrom
            // 
            this.dtpFrom.Location = new System.Drawing.Point(57, 42);
            this.dtpFrom.Name = "dtpFrom";
            this.dtpFrom.Size = new System.Drawing.Size(204, 20);
            this.dtpFrom.TabIndex = 10;
            this.dtpFrom.ValueChanged += new System.EventHandler(this.dtpFrom_ValueChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Arial", 8.25F, System.Drawing.FontStyle.Bold);
            this.label1.Location = new System.Drawing.Point(12, 42);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(31, 14);
            this.label1.TabIndex = 11;
            this.label1.Text = "Von:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Arial", 8.25F, System.Drawing.FontStyle.Bold);
            this.label2.Location = new System.Drawing.Point(12, 68);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(27, 14);
            this.label2.TabIndex = 12;
            this.label2.Text = "Bis:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Arial", 8.25F, System.Drawing.FontStyle.Bold);
            this.label3.Location = new System.Drawing.Point(12, 427);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(108, 14);
            this.label3.TabIndex = 13;
            this.label3.Text = "Datum auswählen:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Arial", 8.25F, System.Drawing.FontStyle.Bold);
            this.label4.Location = new System.Drawing.Point(12, 15);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(108, 14);
            this.label4.TabIndex = 14;
            this.label4.Text = "Datum auswählen:";
            // 
            // rbtnSugar
            // 
            this.rbtnSugar.AutoSize = true;
            this.rbtnSugar.Location = new System.Drawing.Point(510, 65);
            this.rbtnSugar.Name = "rbtnSugar";
            this.rbtnSugar.Size = new System.Drawing.Size(59, 17);
            this.rbtnSugar.TabIndex = 15;
            this.rbtnSugar.Text = "Zucker";
            this.rbtnSugar.UseVisualStyleBackColor = true;
            this.rbtnSugar.CheckedChanged += new System.EventHandler(this.radioButton_CheckedChanged);
            // 
            // rbtnFat
            // 
            this.rbtnFat.AutoSize = true;
            this.rbtnFat.Location = new System.Drawing.Point(414, 66);
            this.rbtnFat.Name = "rbtnFat";
            this.rbtnFat.Size = new System.Drawing.Size(43, 17);
            this.rbtnFat.TabIndex = 16;
            this.rbtnFat.Text = "Fett";
            this.rbtnFat.UseVisualStyleBackColor = true;
            this.rbtnFat.CheckedChanged += new System.EventHandler(this.radioButton_CheckedChanged);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("Arial", 8.25F, System.Drawing.FontStyle.Bold);
            this.label5.Location = new System.Drawing.Point(285, 15);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(131, 14);
            this.label5.TabIndex = 17;
            this.label5.Text = "Nährwerte auswählen:";
            // 
            // lb_error
            // 
            this.lb_error.AutoSize = true;
            this.lb_error.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lb_error.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.lb_error.Location = new System.Drawing.Point(235, 455);
            this.lb_error.Name = "lb_error";
            this.lb_error.Size = new System.Drawing.Size(244, 13);
            this.lb_error.TabIndex = 19;
            this.lb_error.Text = "Bisher stehen keine Daten zur Verfügung.";
            // 
            // lb_vitalData
            // 
            this.lb_vitalData.AutoSize = true;
            this.lb_vitalData.Font = new System.Drawing.Font("Arial", 8.25F, System.Drawing.FontStyle.Bold);
            this.lb_vitalData.Location = new System.Drawing.Point(603, 15);
            this.lb_vitalData.Name = "lb_vitalData";
            this.lb_vitalData.Size = new System.Drawing.Size(0, 14);
            this.lb_vitalData.TabIndex = 20;
            // 
            // lb_weight
            // 
            this.lb_weight.AutoSize = true;
            this.lb_weight.Location = new System.Drawing.Point(606, 42);
            this.lb_weight.Name = "lb_weight";
            this.lb_weight.Size = new System.Drawing.Size(0, 13);
            this.lb_weight.TabIndex = 21;
            // 
            // lb_adipose
            // 
            this.lb_adipose.AutoSize = true;
            this.lb_adipose.Location = new System.Drawing.Point(606, 66);
            this.lb_adipose.Name = "lb_adipose";
            this.lb_adipose.Size = new System.Drawing.Size(0, 13);
            this.lb_adipose.TabIndex = 22;
            // 
            // StatisticsView
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(1016, 782);
            this.Controls.Add(this.lb_adipose);
            this.Controls.Add(this.lb_weight);
            this.Controls.Add(this.lb_vitalData);
            this.Controls.Add(this.lb_error);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.rbtnFat);
            this.Controls.Add(this.rbtnSugar);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.dtpFrom);
            this.Controls.Add(this.dtpTo);
            this.Controls.Add(this.dtpSingle);
            this.Controls.Add(this.rbtnProtein);
            this.Controls.Add(this.rbtnCarbs);
            this.Controls.Add(this.rbtnKcal);
            this.Controls.Add(this.chSpecificDate);
            this.Controls.Add(this.chHistorie);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "StatisticsView";
            this.Text = "Grafische Auswertungen";
            this.Load += new System.EventHandler(this.Statistics_Load);
            ((System.ComponentModel.ISupportInitialize)(this.chHistorie)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chSpecificDate)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }



        #endregion

        private System.Windows.Forms.DataVisualization.Charting.Chart chHistorie;
        private System.Windows.Forms.DataVisualization.Charting.Chart chSpecificDate;
        private System.Windows.Forms.RadioButton rbtnKcal;
        private System.Windows.Forms.RadioButton rbtnCarbs;
        private System.Windows.Forms.RadioButton rbtnProtein;
        private System.Windows.Forms.DateTimePicker dtpSingle;
        private System.Windows.Forms.DateTimePicker dtpTo;
        private System.Windows.Forms.DateTimePicker dtpFrom;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.RadioButton rbtnSugar;
        private System.Windows.Forms.RadioButton rbtnFat;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label lb_error;
        private System.Windows.Forms.Label lb_vitalData;
        private System.Windows.Forms.Label lb_weight;
        private System.Windows.Forms.Label lb_adipose;
    }
}

