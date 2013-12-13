namespace FoodControl.View
{
    partial class AddActivityView
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(AddActivityView));
            this.gb_activityToAdd = new System.Windows.Forms.GroupBox();
            this.gb_duration_calories = new System.Windows.Forms.GroupBox();
            this.lb_error = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.tb_insert_duration = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.tb_show_used_kcal = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.gb_datum = new System.Windows.Forms.GroupBox();
            this.dtp_date = new System.Windows.Forms.DateTimePicker();
            this.button1 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.gb_activityToAdd.SuspendLayout();
            this.gb_duration_calories.SuspendLayout();
            this.gb_datum.SuspendLayout();
            this.SuspendLayout();
            // 
            // gb_activityToAdd
            // 
            this.gb_activityToAdd.Controls.Add(this.gb_duration_calories);
            this.gb_activityToAdd.Controls.Add(this.gb_datum);
            this.gb_activityToAdd.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.gb_activityToAdd.Location = new System.Drawing.Point(16, 15);
            this.gb_activityToAdd.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_activityToAdd.Name = "gb_activityToAdd";
            this.gb_activityToAdd.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_activityToAdd.Size = new System.Drawing.Size(344, 250);
            this.gb_activityToAdd.TabIndex = 4;
            this.gb_activityToAdd.TabStop = false;
            this.gb_activityToAdd.Text = "activityToAdd";
            // 
            // gb_duration_calories
            // 
            this.gb_duration_calories.Controls.Add(this.lb_error);
            this.gb_duration_calories.Controls.Add(this.label1);
            this.gb_duration_calories.Controls.Add(this.tb_insert_duration);
            this.gb_duration_calories.Controls.Add(this.label3);
            this.gb_duration_calories.Controls.Add(this.label4);
            this.gb_duration_calories.Controls.Add(this.tb_show_used_kcal);
            this.gb_duration_calories.Controls.Add(this.label2);
            this.gb_duration_calories.Location = new System.Drawing.Point(8, 26);
            this.gb_duration_calories.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_duration_calories.Name = "gb_duration_calories";
            this.gb_duration_calories.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_duration_calories.Size = new System.Drawing.Size(328, 150);
            this.gb_duration_calories.TabIndex = 0;
            this.gb_duration_calories.TabStop = false;
            this.gb_duration_calories.Text = "Dauer und Kalorienverbrauch";
            // 
            // lb_error
            // 
            this.lb_error.AutoSize = true;
            this.lb_error.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lb_error.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.lb_error.Location = new System.Drawing.Point(183, 50);
            this.lb_error.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lb_error.Name = "lb_error";
            this.lb_error.Size = new System.Drawing.Size(131, 17);
            this.lb_error.TabIndex = 55;
            this.lb_error.Text = "Falsches Format!";
            this.lb_error.Visible = false;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(8, 27);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(120, 17);
            this.label1.TabIndex = 2;
            this.label1.Text = "Dauer in Minuten:";
            // 
            // tb_insert_duration
            // 
            this.tb_insert_duration.CharacterCasing = System.Windows.Forms.CharacterCasing.Lower;
            this.tb_insert_duration.Location = new System.Drawing.Point(12, 47);
            this.tb_insert_duration.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_insert_duration.Name = "tb_insert_duration";
            this.tb_insert_duration.Size = new System.Drawing.Size(132, 23);
            this.tb_insert_duration.TabIndex = 0;
            this.tb_insert_duration.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            this.tb_insert_duration.TextChanged += new System.EventHandler(this.tb_insert_duration_TextChanged);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(151, 50);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(34, 17);
            this.label3.TabIndex = 4;
            this.label3.Text = "min.";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(151, 110);
            this.label4.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(33, 17);
            this.label4.TabIndex = 5;
            this.label4.Text = "kcal";
            // 
            // tb_show_used_kcal
            // 
            this.tb_show_used_kcal.BackColor = System.Drawing.Color.White;
            this.tb_show_used_kcal.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tb_show_used_kcal.Cursor = System.Windows.Forms.Cursors.No;
            this.tb_show_used_kcal.Location = new System.Drawing.Point(11, 107);
            this.tb_show_used_kcal.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_show_used_kcal.Name = "tb_show_used_kcal";
            this.tb_show_used_kcal.ReadOnly = true;
            this.tb_show_used_kcal.Size = new System.Drawing.Size(133, 23);
            this.tb_show_used_kcal.TabIndex = 900;
            this.tb_show_used_kcal.TabStop = false;
            this.tb_show_used_kcal.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(4, 87);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(167, 17);
            this.label2.TabIndex = 3;
            this.label2.Text = "Verbrauchte Kilokalorien:";
            // 
            // gb_datum
            // 
            this.gb_datum.Controls.Add(this.dtp_date);
            this.gb_datum.Location = new System.Drawing.Point(8, 183);
            this.gb_datum.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_datum.Name = "gb_datum";
            this.gb_datum.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_datum.Size = new System.Drawing.Size(328, 57);
            this.gb_datum.TabIndex = 6;
            this.gb_datum.TabStop = false;
            this.gb_datum.Text = "Datum";
            // 
            // dtp_date
            // 
            this.dtp_date.Location = new System.Drawing.Point(11, 25);
            this.dtp_date.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.dtp_date.Name = "dtp_date";
            this.dtp_date.Size = new System.Drawing.Size(299, 23);
            this.dtp_date.TabIndex = 2;
            // 
            // button1
            // 
            this.button1.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.button1.Location = new System.Drawing.Point(243, 272);
            this.button1.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(117, 28);
            this.button1.TabIndex = 9;
            this.button1.Text = "Übernehmen";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.bt_save_Click);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(24, 272);
            this.button2.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(107, 28);
            this.button2.TabIndex = 8;
            this.button2.Text = "Abbrechen";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.bt_abort_Click);
            // 
            // AddActivityView
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(375, 313);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.gb_activityToAdd);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "AddActivityView";
            this.Text = "Neuer Eintrag";
            this.gb_activityToAdd.ResumeLayout(false);
            this.gb_duration_calories.ResumeLayout(false);
            this.gb_duration_calories.PerformLayout();
            this.gb_datum.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox gb_activityToAdd;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox tb_show_used_kcal;
        private System.Windows.Forms.TextBox tb_insert_duration;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.GroupBox gb_datum;
        private System.Windows.Forms.DateTimePicker dtp_date;
        private System.Windows.Forms.GroupBox gb_duration_calories;
        private System.Windows.Forms.Label lb_error;
    }
}