namespace FoodControl.View
{
    partial class ChangeProfileDetailsView
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ChangeProfileDetailsView));
            this.lb_profile_view = new System.Windows.Forms.ListBox();
            this.bt_save = new System.Windows.Forms.Button();
            this.bt_apply = new System.Windows.Forms.Button();
            this.bt_abort = new System.Windows.Forms.Button();
            this.gb_Profile = new System.Windows.Forms.GroupBox();
            this.lb_error = new System.Windows.Forms.Label();
            this.bt_suggest_profile = new System.Windows.Forms.Button();
            this.tb_insert_profile_name = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.lb_description = new System.Windows.Forms.TextBox();
            this.gb_goal_values = new System.Windows.Forms.GroupBox();
            this.label26 = new System.Windows.Forms.Label();
            this.label25 = new System.Windows.Forms.Label();
            this.label24 = new System.Windows.Forms.Label();
            this.label23 = new System.Windows.Forms.Label();
            this.label22 = new System.Windows.Forms.Label();
            this.label17 = new System.Windows.Forms.Label();
            this.label16 = new System.Windows.Forms.Label();
            this.label15 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.label12 = new System.Windows.Forms.Label();
            this.btn_salt_down = new System.Windows.Forms.Button();
            this.btn_salt_up = new System.Windows.Forms.Button();
            this.tb_salt = new System.Windows.Forms.TextBox();
            this.btn_sugar_down = new System.Windows.Forms.Button();
            this.btn_sugar_up = new System.Windows.Forms.Button();
            this.tb_sugar = new System.Windows.Forms.TextBox();
            this.btn_fat_down = new System.Windows.Forms.Button();
            this.btn_fat_up = new System.Windows.Forms.Button();
            this.tb_fat = new System.Windows.Forms.TextBox();
            this.btn_protein_down = new System.Windows.Forms.Button();
            this.btn_protein_up = new System.Windows.Forms.Button();
            this.tb_protein = new System.Windows.Forms.TextBox();
            this.btn_carb_down = new System.Windows.Forms.Button();
            this.btn_carb_up = new System.Windows.Forms.Button();
            this.tb_carb = new System.Windows.Forms.TextBox();
            this.btn_kcal_down = new System.Windows.Forms.Button();
            this.btn_kcal_up = new System.Windows.Forms.Button();
            this.tb_kcal = new System.Windows.Forms.TextBox();
            this.gb_goal = new System.Windows.Forms.GroupBox();
            this.rb_keep_weight = new System.Windows.Forms.RadioButton();
            this.rb_reduce_weight = new System.Windows.Forms.RadioButton();
            this.rb_gain_weight = new System.Windows.Forms.RadioButton();
            this.bt_delete_profile = new System.Windows.Forms.Button();
            this.gb_select_profil = new System.Windows.Forms.GroupBox();
            this.gb_Profile.SuspendLayout();
            this.gb_goal_values.SuspendLayout();
            this.gb_goal.SuspendLayout();
            this.gb_select_profil.SuspendLayout();
            this.SuspendLayout();
            // 
            // lb_profile_view
            // 
            this.lb_profile_view.FormattingEnabled = true;
            this.lb_profile_view.Location = new System.Drawing.Point(6, 19);
            this.lb_profile_view.Name = "lb_profile_view";
            this.lb_profile_view.Size = new System.Drawing.Size(150, 342);
            this.lb_profile_view.TabIndex = 0;
            this.lb_profile_view.SelectedIndexChanged += new System.EventHandler(this.lb_profile_view_SelectedIndexChanged);
            // 
            // bt_save
            // 
            this.bt_save.Location = new System.Drawing.Point(434, 403);
            this.bt_save.Name = "bt_save";
            this.bt_save.Size = new System.Drawing.Size(80, 23);
            this.bt_save.TabIndex = 15;
            this.bt_save.Text = "Speichern";
            this.bt_save.UseVisualStyleBackColor = true;
            this.bt_save.Click += new System.EventHandler(this.bt_save_Click);
            // 
            // bt_apply
            // 
            this.bt_apply.Location = new System.Drawing.Point(346, 403);
            this.bt_apply.Name = "bt_apply";
            this.bt_apply.Size = new System.Drawing.Size(82, 23);
            this.bt_apply.TabIndex = 14;
            this.bt_apply.Text = "Übernehmen";
            this.bt_apply.UseVisualStyleBackColor = true;
            this.bt_apply.Click += new System.EventHandler(this.bt_apply_Click);
            // 
            // bt_abort
            // 
            this.bt_abort.DialogResult = System.Windows.Forms.DialogResult.Abort;
            this.bt_abort.Location = new System.Drawing.Point(185, 403);
            this.bt_abort.Name = "bt_abort";
            this.bt_abort.Size = new System.Drawing.Size(81, 23);
            this.bt_abort.TabIndex = 13;
            this.bt_abort.Text = "Abbrechen";
            this.bt_abort.UseVisualStyleBackColor = true;
            // 
            // gb_Profile
            // 
            this.gb_Profile.Controls.Add(this.lb_error);
            this.gb_Profile.Controls.Add(this.bt_suggest_profile);
            this.gb_Profile.Controls.Add(this.tb_insert_profile_name);
            this.gb_Profile.Controls.Add(this.label5);
            this.gb_Profile.Controls.Add(this.lb_description);
            this.gb_Profile.Controls.Add(this.gb_goal_values);
            this.gb_Profile.Controls.Add(this.gb_goal);
            this.gb_Profile.Location = new System.Drawing.Point(185, 12);
            this.gb_Profile.Name = "gb_Profile";
            this.gb_Profile.Size = new System.Drawing.Size(329, 372);
            this.gb_Profile.TabIndex = 1;
            this.gb_Profile.TabStop = false;
            this.gb_Profile.Text = "Profil";
            // 
            // lb_error
            // 
            this.lb_error.AutoSize = true;
            this.lb_error.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lb_error.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.lb_error.Location = new System.Drawing.Point(14, 28);
            this.lb_error.Name = "lb_error";
            this.lb_error.Size = new System.Drawing.Size(251, 13);
            this.lb_error.TabIndex = 54;
            this.lb_error.Text = "Sie können ihr aktives Profil nicht löschen!";
            this.lb_error.Visible = false;
            // 
            // bt_suggest_profile
            // 
            this.bt_suggest_profile.Location = new System.Drawing.Point(162, 339);
            this.bt_suggest_profile.Name = "bt_suggest_profile";
            this.bt_suggest_profile.Size = new System.Drawing.Size(156, 23);
            this.bt_suggest_profile.TabIndex = 11;
            this.bt_suggest_profile.Text = "Zielwerte vorschlagen";
            this.bt_suggest_profile.UseVisualStyleBackColor = true;
            this.bt_suggest_profile.Click += new System.EventHandler(this.bt_suggest_profile_Click);
            // 
            // tb_insert_profile_name
            // 
            this.tb_insert_profile_name.Location = new System.Drawing.Point(142, 80);
            this.tb_insert_profile_name.Name = "tb_insert_profile_name";
            this.tb_insert_profile_name.Size = new System.Drawing.Size(173, 20);
            this.tb_insert_profile_name.TabIndex = 1;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(14, 83);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(94, 13);
            this.label5.TabIndex = 4;
            this.label5.Text = "Profilbezeichnung:";
            // 
            // lb_description
            // 
            this.lb_description.BackColor = System.Drawing.SystemColors.Control;
            this.lb_description.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.lb_description.Location = new System.Drawing.Point(17, 28);
            this.lb_description.Multiline = true;
            this.lb_description.Name = "lb_description";
            this.lb_description.ReadOnly = true;
            this.lb_description.Size = new System.Drawing.Size(301, 45);
            this.lb_description.TabIndex = 52;
            this.lb_description.TabStop = false;
            this.lb_description.Text = "Wenn Sie einen neuen Namen eintragen und auf Speichern oder Übernehmen drücken, w" +
    "ird ein neues Profil erstellt.";
            // 
            // gb_goal_values
            // 
            this.gb_goal_values.Controls.Add(this.label26);
            this.gb_goal_values.Controls.Add(this.label25);
            this.gb_goal_values.Controls.Add(this.label24);
            this.gb_goal_values.Controls.Add(this.label23);
            this.gb_goal_values.Controls.Add(this.label22);
            this.gb_goal_values.Controls.Add(this.label17);
            this.gb_goal_values.Controls.Add(this.label16);
            this.gb_goal_values.Controls.Add(this.label15);
            this.gb_goal_values.Controls.Add(this.label14);
            this.gb_goal_values.Controls.Add(this.label13);
            this.gb_goal_values.Controls.Add(this.label12);
            this.gb_goal_values.Controls.Add(this.btn_salt_down);
            this.gb_goal_values.Controls.Add(this.btn_salt_up);
            this.gb_goal_values.Controls.Add(this.tb_salt);
            this.gb_goal_values.Controls.Add(this.btn_sugar_down);
            this.gb_goal_values.Controls.Add(this.btn_sugar_up);
            this.gb_goal_values.Controls.Add(this.tb_sugar);
            this.gb_goal_values.Controls.Add(this.btn_fat_down);
            this.gb_goal_values.Controls.Add(this.btn_fat_up);
            this.gb_goal_values.Controls.Add(this.tb_fat);
            this.gb_goal_values.Controls.Add(this.btn_protein_down);
            this.gb_goal_values.Controls.Add(this.btn_protein_up);
            this.gb_goal_values.Controls.Add(this.tb_protein);
            this.gb_goal_values.Controls.Add(this.btn_carb_down);
            this.gb_goal_values.Controls.Add(this.btn_carb_up);
            this.gb_goal_values.Controls.Add(this.tb_carb);
            this.gb_goal_values.Controls.Add(this.btn_kcal_down);
            this.gb_goal_values.Controls.Add(this.btn_kcal_up);
            this.gb_goal_values.Controls.Add(this.tb_kcal);
            this.gb_goal_values.Location = new System.Drawing.Point(14, 116);
            this.gb_goal_values.Name = "gb_goal_values";
            this.gb_goal_values.Size = new System.Drawing.Size(301, 161);
            this.gb_goal_values.TabIndex = 2;
            this.gb_goal_values.TabStop = false;
            this.gb_goal_values.Text = "Zielwerte";
            // 
            // label26
            // 
            this.label26.AutoSize = true;
            this.label26.Location = new System.Drawing.Point(271, 130);
            this.label26.Name = "label26";
            this.label26.Size = new System.Drawing.Size(13, 13);
            this.label26.TabIndex = 34;
            this.label26.Text = "g";
            // 
            // label25
            // 
            this.label25.AutoSize = true;
            this.label25.Location = new System.Drawing.Point(121, 130);
            this.label25.Name = "label25";
            this.label25.Size = new System.Drawing.Size(13, 13);
            this.label25.TabIndex = 33;
            this.label25.Text = "g";
            // 
            // label24
            // 
            this.label24.AutoSize = true;
            this.label24.Location = new System.Drawing.Point(271, 89);
            this.label24.Name = "label24";
            this.label24.Size = new System.Drawing.Size(13, 13);
            this.label24.TabIndex = 32;
            this.label24.Text = "g";
            // 
            // label23
            // 
            this.label23.AutoSize = true;
            this.label23.Location = new System.Drawing.Point(121, 89);
            this.label23.Name = "label23";
            this.label23.Size = new System.Drawing.Size(13, 13);
            this.label23.TabIndex = 31;
            this.label23.Text = "g";
            // 
            // label22
            // 
            this.label22.AutoSize = true;
            this.label22.Location = new System.Drawing.Point(271, 43);
            this.label22.Name = "label22";
            this.label22.Size = new System.Drawing.Size(13, 13);
            this.label22.TabIndex = 30;
            this.label22.Text = "g";
            // 
            // label17
            // 
            this.label17.AutoSize = true;
            this.label17.Location = new System.Drawing.Point(170, 108);
            this.label17.Name = "label17";
            this.label17.Size = new System.Drawing.Size(27, 13);
            this.label17.TabIndex = 29;
            this.label17.Text = "Salz";
            // 
            // label16
            // 
            this.label16.AutoSize = true;
            this.label16.Location = new System.Drawing.Point(17, 108);
            this.label16.Name = "label16";
            this.label16.Size = new System.Drawing.Size(41, 13);
            this.label16.TabIndex = 28;
            this.label16.Text = "Zucker";
            // 
            // label15
            // 
            this.label15.AutoSize = true;
            this.label15.Location = new System.Drawing.Point(171, 64);
            this.label15.Name = "label15";
            this.label15.Size = new System.Drawing.Size(25, 13);
            this.label15.TabIndex = 27;
            this.label15.Text = "Fett";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Location = new System.Drawing.Point(17, 66);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(38, 13);
            this.label14.TabIndex = 26;
            this.label14.Text = "Eiweiß";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(171, 18);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(75, 13);
            this.label13.TabIndex = 25;
            this.label13.Text = "Kohlenhydrate";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Location = new System.Drawing.Point(17, 20);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(61, 13);
            this.label12.TabIndex = 24;
            this.label12.Text = "Kilokalorien";
            // 
            // btn_salt_down
            // 
            this.btn_salt_down.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_salt_down.Location = new System.Drawing.Point(155, 135);
            this.btn_salt_down.Name = "btn_salt_down";
            this.btn_salt_down.Size = new System.Drawing.Size(15, 15);
            this.btn_salt_down.TabIndex = 17;
            this.btn_salt_down.TabStop = false;
            this.btn_salt_down.Text = "-";
            this.btn_salt_down.UseVisualStyleBackColor = true;
            this.btn_salt_down.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // btn_salt_up
            // 
            this.btn_salt_up.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_salt_up.Location = new System.Drawing.Point(155, 120);
            this.btn_salt_up.Name = "btn_salt_up";
            this.btn_salt_up.Size = new System.Drawing.Size(15, 15);
            this.btn_salt_up.TabIndex = 16;
            this.btn_salt_up.TabStop = false;
            this.btn_salt_up.Text = "+";
            this.btn_salt_up.UseVisualStyleBackColor = true;
            this.btn_salt_up.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // tb_salt
            // 
            this.tb_salt.Location = new System.Drawing.Point(170, 124);
            this.tb_salt.Name = "tb_salt";
            this.tb_salt.Size = new System.Drawing.Size(100, 20);
            this.tb_salt.TabIndex = 7;
            // 
            // btn_sugar_down
            // 
            this.btn_sugar_down.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_sugar_down.Location = new System.Drawing.Point(5, 135);
            this.btn_sugar_down.Name = "btn_sugar_down";
            this.btn_sugar_down.Size = new System.Drawing.Size(15, 15);
            this.btn_sugar_down.TabIndex = 14;
            this.btn_sugar_down.TabStop = false;
            this.btn_sugar_down.Text = "-";
            this.btn_sugar_down.UseVisualStyleBackColor = true;
            this.btn_sugar_down.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // btn_sugar_up
            // 
            this.btn_sugar_up.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_sugar_up.Location = new System.Drawing.Point(5, 120);
            this.btn_sugar_up.Name = "btn_sugar_up";
            this.btn_sugar_up.Size = new System.Drawing.Size(15, 15);
            this.btn_sugar_up.TabIndex = 13;
            this.btn_sugar_up.TabStop = false;
            this.btn_sugar_up.Text = "+";
            this.btn_sugar_up.UseVisualStyleBackColor = true;
            this.btn_sugar_up.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // tb_sugar
            // 
            this.tb_sugar.Location = new System.Drawing.Point(20, 124);
            this.tb_sugar.Name = "tb_sugar";
            this.tb_sugar.Size = new System.Drawing.Size(100, 20);
            this.tb_sugar.TabIndex = 6;
            // 
            // btn_fat_down
            // 
            this.btn_fat_down.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_fat_down.Location = new System.Drawing.Point(155, 93);
            this.btn_fat_down.Name = "btn_fat_down";
            this.btn_fat_down.Size = new System.Drawing.Size(15, 15);
            this.btn_fat_down.TabIndex = 11;
            this.btn_fat_down.TabStop = false;
            this.btn_fat_down.Text = "-";
            this.btn_fat_down.UseVisualStyleBackColor = true;
            this.btn_fat_down.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // btn_fat_up
            // 
            this.btn_fat_up.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_fat_up.Location = new System.Drawing.Point(155, 78);
            this.btn_fat_up.Name = "btn_fat_up";
            this.btn_fat_up.Size = new System.Drawing.Size(15, 15);
            this.btn_fat_up.TabIndex = 10;
            this.btn_fat_up.TabStop = false;
            this.btn_fat_up.Text = "+";
            this.btn_fat_up.UseVisualStyleBackColor = true;
            this.btn_fat_up.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // tb_fat
            // 
            this.tb_fat.Location = new System.Drawing.Point(170, 82);
            this.tb_fat.Name = "tb_fat";
            this.tb_fat.Size = new System.Drawing.Size(100, 20);
            this.tb_fat.TabIndex = 5;
            // 
            // btn_protein_down
            // 
            this.btn_protein_down.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_protein_down.Location = new System.Drawing.Point(5, 93);
            this.btn_protein_down.Name = "btn_protein_down";
            this.btn_protein_down.Size = new System.Drawing.Size(15, 15);
            this.btn_protein_down.TabIndex = 8;
            this.btn_protein_down.TabStop = false;
            this.btn_protein_down.Text = "-";
            this.btn_protein_down.UseVisualStyleBackColor = true;
            this.btn_protein_down.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // btn_protein_up
            // 
            this.btn_protein_up.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_protein_up.Location = new System.Drawing.Point(5, 78);
            this.btn_protein_up.Name = "btn_protein_up";
            this.btn_protein_up.Size = new System.Drawing.Size(15, 15);
            this.btn_protein_up.TabIndex = 7;
            this.btn_protein_up.TabStop = false;
            this.btn_protein_up.Text = "+";
            this.btn_protein_up.UseVisualStyleBackColor = true;
            this.btn_protein_up.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // tb_protein
            // 
            this.tb_protein.Location = new System.Drawing.Point(20, 82);
            this.tb_protein.Name = "tb_protein";
            this.tb_protein.Size = new System.Drawing.Size(100, 20);
            this.tb_protein.TabIndex = 4;
            // 
            // btn_carb_down
            // 
            this.btn_carb_down.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_carb_down.Location = new System.Drawing.Point(155, 47);
            this.btn_carb_down.Name = "btn_carb_down";
            this.btn_carb_down.Size = new System.Drawing.Size(15, 15);
            this.btn_carb_down.TabIndex = 5;
            this.btn_carb_down.TabStop = false;
            this.btn_carb_down.Text = "-";
            this.btn_carb_down.UseVisualStyleBackColor = true;
            this.btn_carb_down.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // btn_carb_up
            // 
            this.btn_carb_up.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_carb_up.Location = new System.Drawing.Point(155, 32);
            this.btn_carb_up.Name = "btn_carb_up";
            this.btn_carb_up.Size = new System.Drawing.Size(15, 15);
            this.btn_carb_up.TabIndex = 4;
            this.btn_carb_up.TabStop = false;
            this.btn_carb_up.Text = "+";
            this.btn_carb_up.UseVisualStyleBackColor = true;
            this.btn_carb_up.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // tb_carb
            // 
            this.tb_carb.Location = new System.Drawing.Point(170, 36);
            this.tb_carb.Name = "tb_carb";
            this.tb_carb.Size = new System.Drawing.Size(100, 20);
            this.tb_carb.TabIndex = 3;
            // 
            // btn_kcal_down
            // 
            this.btn_kcal_down.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_kcal_down.Location = new System.Drawing.Point(5, 47);
            this.btn_kcal_down.Name = "btn_kcal_down";
            this.btn_kcal_down.Size = new System.Drawing.Size(15, 15);
            this.btn_kcal_down.TabIndex = 2;
            this.btn_kcal_down.TabStop = false;
            this.btn_kcal_down.Text = "-";
            this.btn_kcal_down.UseVisualStyleBackColor = true;
            this.btn_kcal_down.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // btn_kcal_up
            // 
            this.btn_kcal_up.Font = new System.Drawing.Font("Microsoft Sans Serif", 6F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_kcal_up.Location = new System.Drawing.Point(5, 32);
            this.btn_kcal_up.Name = "btn_kcal_up";
            this.btn_kcal_up.Size = new System.Drawing.Size(15, 15);
            this.btn_kcal_up.TabIndex = 1;
            this.btn_kcal_up.TabStop = false;
            this.btn_kcal_up.Text = "+";
            this.btn_kcal_up.UseVisualStyleBackColor = true;
            this.btn_kcal_up.Click += new System.EventHandler(this.btn_adjustValue_Click);
            // 
            // tb_kcal
            // 
            this.tb_kcal.Location = new System.Drawing.Point(20, 36);
            this.tb_kcal.Name = "tb_kcal";
            this.tb_kcal.Size = new System.Drawing.Size(100, 20);
            this.tb_kcal.TabIndex = 2;
            // 
            // gb_goal
            // 
            this.gb_goal.Controls.Add(this.rb_keep_weight);
            this.gb_goal.Controls.Add(this.rb_reduce_weight);
            this.gb_goal.Controls.Add(this.rb_gain_weight);
            this.gb_goal.Location = new System.Drawing.Point(14, 283);
            this.gb_goal.Name = "gb_goal";
            this.gb_goal.Size = new System.Drawing.Size(301, 50);
            this.gb_goal.TabIndex = 3;
            this.gb_goal.TabStop = false;
            this.gb_goal.Text = "Ziel";
            // 
            // rb_keep_weight
            // 
            this.rb_keep_weight.AutoSize = true;
            this.rb_keep_weight.Checked = true;
            this.rb_keep_weight.Location = new System.Drawing.Point(142, 19);
            this.rb_keep_weight.Name = "rb_keep_weight";
            this.rb_keep_weight.Size = new System.Drawing.Size(54, 17);
            this.rb_keep_weight.TabIndex = 9;
            this.rb_keep_weight.TabStop = true;
            this.rb_keep_weight.Text = "halten";
            this.rb_keep_weight.UseVisualStyleBackColor = true;
            // 
            // rb_reduce_weight
            // 
            this.rb_reduce_weight.AutoSize = true;
            this.rb_reduce_weight.Location = new System.Drawing.Point(17, 19);
            this.rb_reduce_weight.Name = "rb_reduce_weight";
            this.rb_reduce_weight.Size = new System.Drawing.Size(117, 17);
            this.rb_reduce_weight.TabIndex = 8;
            this.rb_reduce_weight.TabStop = true;
            this.rb_reduce_weight.Text = "Gewicht abnehmen";
            this.rb_reduce_weight.UseVisualStyleBackColor = true;
            // 
            // rb_gain_weight
            // 
            this.rb_gain_weight.AutoSize = true;
            this.rb_gain_weight.Location = new System.Drawing.Point(210, 19);
            this.rb_gain_weight.Name = "rb_gain_weight";
            this.rb_gain_weight.Size = new System.Drawing.Size(74, 17);
            this.rb_gain_weight.TabIndex = 10;
            this.rb_gain_weight.TabStop = true;
            this.rb_gain_weight.Text = "zunehmen";
            this.rb_gain_weight.UseVisualStyleBackColor = true;
            // 
            // bt_delete_profile
            // 
            this.bt_delete_profile.Location = new System.Drawing.Point(12, 403);
            this.bt_delete_profile.Name = "bt_delete_profile";
            this.bt_delete_profile.Size = new System.Drawing.Size(162, 23);
            this.bt_delete_profile.TabIndex = 12;
            this.bt_delete_profile.Text = "Ausgewähltes Profil löschen";
            this.bt_delete_profile.UseVisualStyleBackColor = true;
            this.bt_delete_profile.Click += new System.EventHandler(this.bt_delete_profile_Click);
            // 
            // gb_select_profil
            // 
            this.gb_select_profil.Controls.Add(this.lb_profile_view);
            this.gb_select_profil.Location = new System.Drawing.Point(12, 13);
            this.gb_select_profil.Name = "gb_select_profil";
            this.gb_select_profil.Size = new System.Drawing.Size(162, 371);
            this.gb_select_profil.TabIndex = 0;
            this.gb_select_profil.TabStop = false;
            this.gb_select_profil.Text = "Profilauswahl";
            // 
            // ChangeProfileDetailsView
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(524, 438);
            this.Controls.Add(this.gb_select_profil);
            this.Controls.Add(this.bt_delete_profile);
            this.Controls.Add(this.gb_Profile);
            this.Controls.Add(this.bt_save);
            this.Controls.Add(this.bt_abort);
            this.Controls.Add(this.bt_apply);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "ChangeProfileDetailsView";
            this.Text = "Profilverwaltung";
            this.Load += new System.EventHandler(this.ChangeProfileDetailsView_Load);
            this.gb_Profile.ResumeLayout(false);
            this.gb_Profile.PerformLayout();
            this.gb_goal_values.ResumeLayout(false);
            this.gb_goal_values.PerformLayout();
            this.gb_goal.ResumeLayout(false);
            this.gb_goal.PerformLayout();
            this.gb_select_profil.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.ListBox lb_profile_view;
        private System.Windows.Forms.Button bt_save;
        private System.Windows.Forms.Button bt_apply;
        private System.Windows.Forms.Button bt_abort;
        private System.Windows.Forms.GroupBox gb_Profile;
        private System.Windows.Forms.Button bt_suggest_profile;
        private System.Windows.Forms.TextBox tb_insert_profile_name;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.TextBox lb_description;
        private System.Windows.Forms.GroupBox gb_goal_values;
        private System.Windows.Forms.Label label26;
        private System.Windows.Forms.Label label25;
        private System.Windows.Forms.Label label24;
        private System.Windows.Forms.Label label23;
        private System.Windows.Forms.Label label22;
        private System.Windows.Forms.Label label17;
        private System.Windows.Forms.Label label16;
        private System.Windows.Forms.Label label15;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.Button btn_salt_down;
        private System.Windows.Forms.Button btn_salt_up;
        private System.Windows.Forms.TextBox tb_salt;
        private System.Windows.Forms.Button btn_sugar_down;
        private System.Windows.Forms.Button btn_sugar_up;
        private System.Windows.Forms.TextBox tb_sugar;
        private System.Windows.Forms.Button btn_fat_down;
        private System.Windows.Forms.Button btn_fat_up;
        private System.Windows.Forms.TextBox tb_fat;
        private System.Windows.Forms.Button btn_protein_down;
        private System.Windows.Forms.Button btn_protein_up;
        private System.Windows.Forms.TextBox tb_protein;
        private System.Windows.Forms.Button btn_carb_down;
        private System.Windows.Forms.Button btn_carb_up;
        private System.Windows.Forms.TextBox tb_carb;
        private System.Windows.Forms.Button btn_kcal_down;
        private System.Windows.Forms.Button btn_kcal_up;
        private System.Windows.Forms.TextBox tb_kcal;
        private System.Windows.Forms.GroupBox gb_goal;
        private System.Windows.Forms.RadioButton rb_keep_weight;
        private System.Windows.Forms.RadioButton rb_reduce_weight;
        private System.Windows.Forms.RadioButton rb_gain_weight;
        private System.Windows.Forms.Button bt_delete_profile;
        private System.Windows.Forms.Label lb_error;
        private System.Windows.Forms.GroupBox gb_select_profil;
    }
}