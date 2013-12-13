namespace FoodControl.View
{
    partial class ChangeUserDetailsView
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ChangeUserDetailsView));
            this.bt_abort = new System.Windows.Forms.Button();
            this.bt_apply = new System.Windows.Forms.Button();
            this.bt_save = new System.Windows.Forms.Button();
            this.gb_User = new System.Windows.Forms.GroupBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label18 = new System.Windows.Forms.Label();
            this.tb_insert_Lastname = new System.Windows.Forms.TextBox();
            this.cb_choose_activity_level = new System.Windows.Forms.ComboBox();
            this.label11 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.cb_no_fish = new System.Windows.Forms.CheckBox();
            this.cb_no_pork = new System.Windows.Forms.CheckBox();
            this.cb_vegetarian = new System.Windows.Forms.CheckBox();
            this.rb_male = new System.Windows.Forms.RadioButton();
            this.rb_female = new System.Windows.Forms.RadioButton();
            this.label3 = new System.Windows.Forms.Label();
            this.dtp_insert_date_of_birth = new System.Windows.Forms.DateTimePicker();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.tb_insert_Firstname = new System.Windows.Forms.TextBox();
            this.gb_User.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // bt_abort
            // 
            this.bt_abort.DialogResult = System.Windows.Forms.DialogResult.Abort;
            this.bt_abort.Location = new System.Drawing.Point(16, 462);
            this.bt_abort.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.bt_abort.Name = "bt_abort";
            this.bt_abort.Size = new System.Drawing.Size(108, 28);
            this.bt_abort.TabIndex = 15;
            this.bt_abort.Text = "Abbrechen";
            this.bt_abort.UseVisualStyleBackColor = true;
            // 
            // bt_apply
            // 
            this.bt_apply.Location = new System.Drawing.Point(231, 462);
            this.bt_apply.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.bt_apply.Name = "bt_apply";
            this.bt_apply.Size = new System.Drawing.Size(109, 28);
            this.bt_apply.TabIndex = 16;
            this.bt_apply.Text = "Übernehmen";
            this.bt_apply.UseVisualStyleBackColor = true;
            this.bt_apply.Click += new System.EventHandler(this.bt_apply_Click);
            // 
            // bt_save
            // 
            this.bt_save.Location = new System.Drawing.Point(348, 462);
            this.bt_save.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.bt_save.Name = "bt_save";
            this.bt_save.Size = new System.Drawing.Size(107, 28);
            this.bt_save.TabIndex = 17;
            this.bt_save.Text = "Speichern";
            this.bt_save.UseVisualStyleBackColor = true;
            this.bt_save.Click += new System.EventHandler(this.bt_save_Click);
            // 
            // gb_User
            // 
            this.gb_User.Controls.Add(this.label4);
            this.gb_User.Controls.Add(this.label18);
            this.gb_User.Controls.Add(this.tb_insert_Lastname);
            this.gb_User.Controls.Add(this.cb_choose_activity_level);
            this.gb_User.Controls.Add(this.label11);
            this.gb_User.Controls.Add(this.groupBox2);
            this.gb_User.Controls.Add(this.rb_male);
            this.gb_User.Controls.Add(this.rb_female);
            this.gb_User.Controls.Add(this.label3);
            this.gb_User.Controls.Add(this.dtp_insert_date_of_birth);
            this.gb_User.Controls.Add(this.label2);
            this.gb_User.Controls.Add(this.label1);
            this.gb_User.Controls.Add(this.tb_insert_Firstname);
            this.gb_User.Location = new System.Drawing.Point(15, 15);
            this.gb_User.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_User.Name = "gb_User";
            this.gb_User.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_User.Size = new System.Drawing.Size(439, 421);
            this.gb_User.TabIndex = 18;
            this.gb_User.TabStop = false;
            this.gb_User.Text = "Benutzer";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(11, 31);
            this.label4.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(295, 17);
            this.label4.TabIndex = 13;
            this.label4.Text = "Hier können Sie Ihre Nutzerdaten bearbeiten.";
            // 
            // label18
            // 
            this.label18.AutoSize = true;
            this.label18.Location = new System.Drawing.Point(11, 112);
            this.label18.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label18.Name = "label18";
            this.label18.Size = new System.Drawing.Size(80, 17);
            this.label18.TabIndex = 12;
            this.label18.Text = "Nachname:";
            // 
            // tb_insert_Lastname
            // 
            this.tb_insert_Lastname.Location = new System.Drawing.Point(145, 108);
            this.tb_insert_Lastname.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_insert_Lastname.Name = "tb_insert_Lastname";
            this.tb_insert_Lastname.Size = new System.Drawing.Size(252, 22);
            this.tb_insert_Lastname.TabIndex = 2;
            // 
            // cb_choose_activity_level
            // 
            this.cb_choose_activity_level.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cb_choose_activity_level.FormattingEnabled = true;
            this.cb_choose_activity_level.Items.AddRange(new object[] {
            "Vorwiegend sitzend",
            "Leichte Bewegung",
            "Häufige Bewegung",
            "Schwere körperliche Arbeit"});
            this.cb_choose_activity_level.Location = new System.Drawing.Point(145, 190);
            this.cb_choose_activity_level.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.cb_choose_activity_level.Name = "cb_choose_activity_level";
            this.cb_choose_activity_level.Size = new System.Drawing.Size(252, 24);
            this.cb_choose_activity_level.TabIndex = 4;
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Location = new System.Drawing.Point(11, 193);
            this.label11.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(128, 17);
            this.label11.TabIndex = 6;
            this.label11.Text = "Berufliche Aktivität:";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.cb_no_fish);
            this.groupBox2.Controls.Add(this.cb_no_pork);
            this.groupBox2.Controls.Add(this.cb_vegetarian);
            this.groupBox2.Location = new System.Drawing.Point(15, 315);
            this.groupBox2.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.groupBox2.Size = new System.Drawing.Size(384, 76);
            this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Essgewohnheiten";
            // 
            // cb_no_fish
            // 
            this.cb_no_fish.AutoSize = true;
            this.cb_no_fish.Location = new System.Drawing.Point(259, 36);
            this.cb_no_fish.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.cb_no_fish.Name = "cb_no_fish";
            this.cb_no_fish.Size = new System.Drawing.Size(93, 21);
            this.cb_no_fish.TabIndex = 9;
            this.cb_no_fish.Text = "kein Fisch";
            this.cb_no_fish.UseVisualStyleBackColor = true;
            // 
            // cb_no_pork
            // 
            this.cb_no_pork.AutoSize = true;
            this.cb_no_pork.Location = new System.Drawing.Point(131, 36);
            this.cb_no_pork.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.cb_no_pork.Name = "cb_no_pork";
            this.cb_no_pork.Size = new System.Drawing.Size(112, 21);
            this.cb_no_pork.TabIndex = 8;
            this.cb_no_pork.Text = "kein Schwein";
            this.cb_no_pork.UseVisualStyleBackColor = true;
            // 
            // cb_vegetarian
            // 
            this.cb_vegetarian.AutoSize = true;
            this.cb_vegetarian.Location = new System.Drawing.Point(24, 36);
            this.cb_vegetarian.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.cb_vegetarian.Name = "cb_vegetarian";
            this.cb_vegetarian.Size = new System.Drawing.Size(96, 21);
            this.cb_vegetarian.TabIndex = 7;
            this.cb_vegetarian.Text = "Vegetarier";
            this.cb_vegetarian.UseVisualStyleBackColor = true;
            // 
            // rb_male
            // 
            this.rb_male.AutoSize = true;
            this.rb_male.Location = new System.Drawing.Point(251, 258);
            this.rb_male.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.rb_male.Name = "rb_male";
            this.rb_male.Size = new System.Drawing.Size(85, 21);
            this.rb_male.TabIndex = 6;
            this.rb_male.TabStop = true;
            this.rb_male.Text = "männlich";
            this.rb_male.UseVisualStyleBackColor = true;
            // 
            // rb_female
            // 
            this.rb_female.AutoSize = true;
            this.rb_female.Location = new System.Drawing.Point(145, 258);
            this.rb_female.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.rb_female.Name = "rb_female";
            this.rb_female.Size = new System.Drawing.Size(78, 21);
            this.rb_female.TabIndex = 5;
            this.rb_female.TabStop = true;
            this.rb_female.Text = "weiblich";
            this.rb_female.UseVisualStyleBackColor = true;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(11, 261);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(83, 17);
            this.label3.TabIndex = 8;
            this.label3.Text = "Geschlecht:";
            // 
            // dtp_insert_date_of_birth
            // 
            this.dtp_insert_date_of_birth.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.dtp_insert_date_of_birth.Location = new System.Drawing.Point(145, 150);
            this.dtp_insert_date_of_birth.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.dtp_insert_date_of_birth.Name = "dtp_insert_date_of_birth";
            this.dtp_insert_date_of_birth.Size = new System.Drawing.Size(252, 22);
            this.dtp_insert_date_of_birth.TabIndex = 3;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(11, 154);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(102, 17);
            this.label2.TabIndex = 5;
            this.label2.Text = "Geburtsdatum:";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(11, 74);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(69, 17);
            this.label1.TabIndex = 3;
            this.label1.Text = "Vorname:";
            // 
            // tb_insert_Firstname
            // 
            this.tb_insert_Firstname.Location = new System.Drawing.Point(145, 70);
            this.tb_insert_Firstname.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_insert_Firstname.Name = "tb_insert_Firstname";
            this.tb_insert_Firstname.Size = new System.Drawing.Size(252, 22);
            this.tb_insert_Firstname.TabIndex = 1;
            // 
            // ChangeUserDetailsView
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(469, 505);
            this.Controls.Add(this.gb_User);
            this.Controls.Add(this.bt_save);
            this.Controls.Add(this.bt_apply);
            this.Controls.Add(this.bt_abort);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "ChangeUserDetailsView";
            this.Text = "Benutzerverwaltung";
            this.Load += new System.EventHandler(this.ChangeUserDetailsView_Load);
            this.gb_User.ResumeLayout(false);
            this.gb_User.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button bt_abort;
        private System.Windows.Forms.Button bt_apply;
        private System.Windows.Forms.Button bt_save;
        private System.Windows.Forms.GroupBox gb_User;
        private System.Windows.Forms.Label label18;
        private System.Windows.Forms.TextBox tb_insert_Lastname;
        private System.Windows.Forms.ComboBox cb_choose_activity_level;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.CheckBox cb_no_fish;
        private System.Windows.Forms.CheckBox cb_no_pork;
        private System.Windows.Forms.CheckBox cb_vegetarian;
        private System.Windows.Forms.RadioButton rb_male;
        private System.Windows.Forms.RadioButton rb_female;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.DateTimePicker dtp_insert_date_of_birth;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox tb_insert_Firstname;
        private System.Windows.Forms.Label label4;

    }
}