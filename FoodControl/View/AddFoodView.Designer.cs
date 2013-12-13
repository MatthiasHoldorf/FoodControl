namespace FoodControl.View
{
    partial class AddFoodView
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(AddFoodView));
            this.gb_foodToAdd = new System.Windows.Forms.GroupBox();
            this.gb_date = new System.Windows.Forms.GroupBox();
            this.dtp_date = new System.Windows.Forms.DateTimePicker();
            this.bt_save = new System.Windows.Forms.Button();
            this.bt_abort = new System.Windows.Forms.Button();
            this.gb_nutrients = new System.Windows.Forms.GroupBox();
            this.label14 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.label12 = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.tb_show_salt = new System.Windows.Forms.TextBox();
            this.tb_show_sugar = new System.Windows.Forms.TextBox();
            this.tb_show_fat = new System.Windows.Forms.TextBox();
            this.tb_show_protein = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.tb_show_kcal = new System.Windows.Forms.TextBox();
            this.tb_show_carb = new System.Windows.Forms.TextBox();
            this.gb_daytime = new System.Windows.Forms.GroupBox();
            this.rb_lunch = new System.Windows.Forms.RadioButton();
            this.rb_snack = new System.Windows.Forms.RadioButton();
            this.rb_dinner = new System.Windows.Forms.RadioButton();
            this.rb_breakfast = new System.Windows.Forms.RadioButton();
            this.gb_quantity = new System.Windows.Forms.GroupBox();
            this.lb_error = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.lb_measuringunit = new System.Windows.Forms.Label();
            this.lb_portion_and_baseunit = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.tb_insert_quantity = new System.Windows.Forms.TextBox();
            this.tb_insert_quantity_portion = new System.Windows.Forms.TextBox();
            this.gb_foodToAdd.SuspendLayout();
            this.gb_date.SuspendLayout();
            this.gb_nutrients.SuspendLayout();
            this.gb_daytime.SuspendLayout();
            this.gb_quantity.SuspendLayout();
            this.SuspendLayout();
            // 
            // gb_foodToAdd
            // 
            this.gb_foodToAdd.Controls.Add(this.gb_date);
            this.gb_foodToAdd.Controls.Add(this.bt_save);
            this.gb_foodToAdd.Controls.Add(this.bt_abort);
            this.gb_foodToAdd.Controls.Add(this.gb_nutrients);
            this.gb_foodToAdd.Controls.Add(this.gb_daytime);
            this.gb_foodToAdd.Controls.Add(this.gb_quantity);
            this.gb_foodToAdd.Location = new System.Drawing.Point(17, 15);
            this.gb_foodToAdd.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_foodToAdd.Name = "gb_foodToAdd";
            this.gb_foodToAdd.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_foodToAdd.Size = new System.Drawing.Size(381, 511);
            this.gb_foodToAdd.TabIndex = 4;
            this.gb_foodToAdd.TabStop = false;
            this.gb_foodToAdd.Text = "foodToAdd";
            // 
            // gb_date
            // 
            this.gb_date.Controls.Add(this.dtp_date);
            this.gb_date.Location = new System.Drawing.Point(9, 260);
            this.gb_date.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_date.Name = "gb_date";
            this.gb_date.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_date.Size = new System.Drawing.Size(360, 57);
            this.gb_date.TabIndex = 2;
            this.gb_date.TabStop = false;
            this.gb_date.Text = "Datum";
            // 
            // dtp_date
            // 
            this.dtp_date.Location = new System.Drawing.Point(11, 25);
            this.dtp_date.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.dtp_date.Name = "dtp_date";
            this.dtp_date.Size = new System.Drawing.Size(327, 22);
            this.dtp_date.TabIndex = 0;
            // 
            // bt_save
            // 
            this.bt_save.Location = new System.Drawing.Point(256, 470);
            this.bt_save.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.bt_save.Name = "bt_save";
            this.bt_save.Size = new System.Drawing.Size(117, 28);
            this.bt_save.TabIndex = 3;
            this.bt_save.Text = "Übernehmen";
            this.bt_save.UseVisualStyleBackColor = true;
            this.bt_save.Click += new System.EventHandler(this.bt_save_Click);
            // 
            // bt_abort
            // 
            this.bt_abort.Location = new System.Drawing.Point(8, 470);
            this.bt_abort.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.bt_abort.Name = "bt_abort";
            this.bt_abort.Size = new System.Drawing.Size(107, 28);
            this.bt_abort.TabIndex = 2;
            this.bt_abort.Text = "Abbrechen";
            this.bt_abort.UseVisualStyleBackColor = true;
            this.bt_abort.Click += new System.EventHandler(this.bt_abort_Click);
            // 
            // gb_nutrients
            // 
            this.gb_nutrients.Controls.Add(this.label14);
            this.gb_nutrients.Controls.Add(this.label13);
            this.gb_nutrients.Controls.Add(this.label12);
            this.gb_nutrients.Controls.Add(this.label11);
            this.gb_nutrients.Controls.Add(this.label10);
            this.gb_nutrients.Controls.Add(this.label8);
            this.gb_nutrients.Controls.Add(this.label7);
            this.gb_nutrients.Controls.Add(this.label6);
            this.gb_nutrients.Controls.Add(this.label5);
            this.gb_nutrients.Controls.Add(this.label4);
            this.gb_nutrients.Controls.Add(this.tb_show_salt);
            this.gb_nutrients.Controls.Add(this.tb_show_sugar);
            this.gb_nutrients.Controls.Add(this.tb_show_fat);
            this.gb_nutrients.Controls.Add(this.tb_show_protein);
            this.gb_nutrients.Controls.Add(this.label3);
            this.gb_nutrients.Controls.Add(this.tb_show_kcal);
            this.gb_nutrients.Controls.Add(this.tb_show_carb);
            this.gb_nutrients.Location = new System.Drawing.Point(8, 324);
            this.gb_nutrients.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_nutrients.Name = "gb_nutrients";
            this.gb_nutrients.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_nutrients.Size = new System.Drawing.Size(361, 137);
            this.gb_nutrients.TabIndex = 3;
            this.gb_nutrients.TabStop = false;
            this.gb_nutrients.Text = "Nährwerte";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Location = new System.Drawing.Point(139, 75);
            this.label14.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(16, 17);
            this.label14.TabIndex = 20;
            this.label14.Text = "g";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(139, 107);
            this.label13.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(16, 17);
            this.label13.TabIndex = 19;
            this.label13.Text = "g";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Location = new System.Drawing.Point(323, 107);
            this.label12.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(16, 17);
            this.label12.TabIndex = 18;
            this.label12.Text = "g";
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Location = new System.Drawing.Point(323, 75);
            this.label11.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(16, 17);
            this.label11.TabIndex = 17;
            this.label11.Text = "g";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(323, 43);
            this.label10.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(16, 17);
            this.label10.TabIndex = 16;
            this.label10.Text = "g";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(172, 101);
            this.label8.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(35, 17);
            this.label8.TabIndex = 15;
            this.label8.Text = "Salz";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(7, 101);
            this.label7.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(52, 17);
            this.label7.TabIndex = 14;
            this.label7.Text = "Zucker";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(172, 69);
            this.label6.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(32, 17);
            this.label6.TabIndex = 13;
            this.label6.Text = "Fett";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(7, 69);
            this.label5.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(49, 17);
            this.label5.TabIndex = 12;
            this.label5.Text = "Eiweiß";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(172, 37);
            this.label4.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(64, 17);
            this.label4.TabIndex = 11;
            this.label4.Text = "Kohlenh.";
            // 
            // tb_show_salt
            // 
            this.tb_show_salt.BackColor = System.Drawing.Color.White;
            this.tb_show_salt.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tb_show_salt.Cursor = System.Windows.Forms.Cursors.No;
            this.tb_show_salt.Location = new System.Drawing.Point(256, 98);
            this.tb_show_salt.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_show_salt.Name = "tb_show_salt";
            this.tb_show_salt.ReadOnly = true;
            this.tb_show_salt.Size = new System.Drawing.Size(58, 22);
            this.tb_show_salt.TabIndex = 5;
            this.tb_show_salt.TabStop = false;
            // 
            // tb_show_sugar
            // 
            this.tb_show_sugar.BackColor = System.Drawing.Color.White;
            this.tb_show_sugar.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tb_show_sugar.Cursor = System.Windows.Forms.Cursors.No;
            this.tb_show_sugar.Location = new System.Drawing.Point(72, 98);
            this.tb_show_sugar.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_show_sugar.Name = "tb_show_sugar";
            this.tb_show_sugar.ReadOnly = true;
            this.tb_show_sugar.Size = new System.Drawing.Size(58, 22);
            this.tb_show_sugar.TabIndex = 6;
            this.tb_show_sugar.TabStop = false;
            // 
            // tb_show_fat
            // 
            this.tb_show_fat.BackColor = System.Drawing.Color.White;
            this.tb_show_fat.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tb_show_fat.Cursor = System.Windows.Forms.Cursors.No;
            this.tb_show_fat.Location = new System.Drawing.Point(256, 66);
            this.tb_show_fat.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_show_fat.Name = "tb_show_fat";
            this.tb_show_fat.ReadOnly = true;
            this.tb_show_fat.Size = new System.Drawing.Size(58, 22);
            this.tb_show_fat.TabIndex = 8;
            this.tb_show_fat.TabStop = false;
            // 
            // tb_show_protein
            // 
            this.tb_show_protein.BackColor = System.Drawing.Color.White;
            this.tb_show_protein.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tb_show_protein.Cursor = System.Windows.Forms.Cursors.No;
            this.tb_show_protein.Location = new System.Drawing.Point(72, 66);
            this.tb_show_protein.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_show_protein.Name = "tb_show_protein";
            this.tb_show_protein.ReadOnly = true;
            this.tb_show_protein.Size = new System.Drawing.Size(58, 22);
            this.tb_show_protein.TabIndex = 9;
            this.tb_show_protein.TabStop = false;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(7, 37);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(35, 17);
            this.label3.TabIndex = 10;
            this.label3.Text = "Kcal";
            // 
            // tb_show_kcal
            // 
            this.tb_show_kcal.BackColor = System.Drawing.Color.White;
            this.tb_show_kcal.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tb_show_kcal.Cursor = System.Windows.Forms.Cursors.No;
            this.tb_show_kcal.Location = new System.Drawing.Point(72, 34);
            this.tb_show_kcal.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_show_kcal.Name = "tb_show_kcal";
            this.tb_show_kcal.ReadOnly = true;
            this.tb_show_kcal.Size = new System.Drawing.Size(58, 22);
            this.tb_show_kcal.TabIndex = 4;
            this.tb_show_kcal.TabStop = false;
            // 
            // tb_show_carb
            // 
            this.tb_show_carb.BackColor = System.Drawing.Color.White;
            this.tb_show_carb.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.tb_show_carb.Cursor = System.Windows.Forms.Cursors.No;
            this.tb_show_carb.Location = new System.Drawing.Point(256, 34);
            this.tb_show_carb.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_show_carb.Name = "tb_show_carb";
            this.tb_show_carb.ReadOnly = true;
            this.tb_show_carb.Size = new System.Drawing.Size(58, 22);
            this.tb_show_carb.TabIndex = 7;
            this.tb_show_carb.TabStop = false;
            // 
            // gb_daytime
            // 
            this.gb_daytime.Controls.Add(this.rb_lunch);
            this.gb_daytime.Controls.Add(this.rb_snack);
            this.gb_daytime.Controls.Add(this.rb_dinner);
            this.gb_daytime.Controls.Add(this.rb_breakfast);
            this.gb_daytime.Location = new System.Drawing.Point(8, 161);
            this.gb_daytime.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_daytime.Name = "gb_daytime";
            this.gb_daytime.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_daytime.Size = new System.Drawing.Size(360, 91);
            this.gb_daytime.TabIndex = 1;
            this.gb_daytime.TabStop = false;
            this.gb_daytime.Text = "Tageszeit";
            // 
            // rb_lunch
            // 
            this.rb_lunch.AutoSize = true;
            this.rb_lunch.Location = new System.Drawing.Point(11, 54);
            this.rb_lunch.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.rb_lunch.Name = "rb_lunch";
            this.rb_lunch.Size = new System.Drawing.Size(105, 21);
            this.rb_lunch.TabIndex = 1;
            this.rb_lunch.TabStop = true;
            this.rb_lunch.Text = "Mittagessen";
            this.rb_lunch.UseVisualStyleBackColor = true;
            // 
            // rb_snack
            // 
            this.rb_snack.AutoSize = true;
            this.rb_snack.Location = new System.Drawing.Point(176, 54);
            this.rb_snack.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.rb_snack.Name = "rb_snack";
            this.rb_snack.Size = new System.Drawing.Size(68, 21);
            this.rb_snack.TabIndex = 3;
            this.rb_snack.TabStop = true;
            this.rb_snack.Text = "Snack";
            this.rb_snack.UseVisualStyleBackColor = true;
            // 
            // rb_dinner
            // 
            this.rb_dinner.AutoSize = true;
            this.rb_dinner.Location = new System.Drawing.Point(176, 26);
            this.rb_dinner.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.rb_dinner.Name = "rb_dinner";
            this.rb_dinner.Size = new System.Drawing.Size(108, 21);
            this.rb_dinner.TabIndex = 2;
            this.rb_dinner.TabStop = true;
            this.rb_dinner.Text = "Abendessen";
            this.rb_dinner.UseVisualStyleBackColor = true;
            // 
            // rb_breakfast
            // 
            this.rb_breakfast.AutoSize = true;
            this.rb_breakfast.Checked = true;
            this.rb_breakfast.Location = new System.Drawing.Point(11, 26);
            this.rb_breakfast.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.rb_breakfast.Name = "rb_breakfast";
            this.rb_breakfast.Size = new System.Drawing.Size(91, 21);
            this.rb_breakfast.TabIndex = 0;
            this.rb_breakfast.TabStop = true;
            this.rb_breakfast.Text = "Frühstück";
            this.rb_breakfast.UseVisualStyleBackColor = true;
            // 
            // gb_quantity
            // 
            this.gb_quantity.Controls.Add(this.lb_error);
            this.gb_quantity.Controls.Add(this.label9);
            this.gb_quantity.Controls.Add(this.lb_measuringunit);
            this.gb_quantity.Controls.Add(this.lb_portion_and_baseunit);
            this.gb_quantity.Controls.Add(this.label2);
            this.gb_quantity.Controls.Add(this.label1);
            this.gb_quantity.Controls.Add(this.tb_insert_quantity);
            this.gb_quantity.Controls.Add(this.tb_insert_quantity_portion);
            this.gb_quantity.Location = new System.Drawing.Point(8, 28);
            this.gb_quantity.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_quantity.Name = "gb_quantity";
            this.gb_quantity.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gb_quantity.Size = new System.Drawing.Size(361, 126);
            this.gb_quantity.TabIndex = 0;
            this.gb_quantity.TabStop = false;
            this.gb_quantity.Text = "Mengenangabe";
            // 
            // lb_error
            // 
            this.lb_error.AutoSize = true;
            this.lb_error.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lb_error.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.lb_error.Location = new System.Drawing.Point(216, 31);
            this.lb_error.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lb_error.Name = "lb_error";
            this.lb_error.Size = new System.Drawing.Size(131, 17);
            this.lb_error.TabIndex = 56;
            this.lb_error.Text = "Falsches Format!";
            this.lb_error.Visible = false;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(28, 60);
            this.label9.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(37, 17);
            this.label9.TabIndex = 8;
            this.label9.Text = "oder";
            // 
            // lb_measuringunit
            // 
            this.lb_measuringunit.AutoSize = true;
            this.lb_measuringunit.Location = new System.Drawing.Point(193, 30);
            this.lb_measuringunit.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lb_measuringunit.Name = "lb_measuringunit";
            this.lb_measuringunit.Size = new System.Drawing.Size(116, 17);
            this.lb_measuringunit.TabIndex = 7;
            this.lb_measuringunit.Text = "lb_measuringunit";
            // 
            // lb_portion_and_baseunit
            // 
            this.lb_portion_and_baseunit.AutoSize = true;
            this.lb_portion_and_baseunit.Location = new System.Drawing.Point(193, 90);
            this.lb_portion_and_baseunit.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lb_portion_and_baseunit.Name = "lb_portion_and_baseunit";
            this.lb_portion_and_baseunit.Size = new System.Drawing.Size(165, 17);
            this.lb_portion_and_baseunit.TabIndex = 6;
            this.lb_portion_and_baseunit.Text = "lb_portion_and_baseunit";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(8, 31);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(55, 17);
            this.label2.TabIndex = 5;
            this.label2.Text = "Menge:";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(8, 90);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(62, 17);
            this.label1.TabIndex = 4;
            this.label1.Text = "Portion:*";
            // 
            // tb_insert_quantity
            // 
            this.tb_insert_quantity.Location = new System.Drawing.Point(124, 26);
            this.tb_insert_quantity.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_insert_quantity.Name = "tb_insert_quantity";
            this.tb_insert_quantity.Size = new System.Drawing.Size(57, 22);
            this.tb_insert_quantity.TabIndex = 0;
            this.tb_insert_quantity.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            this.tb_insert_quantity.TextChanged += new System.EventHandler(this.tb_insert_quantity_TextChanged);
            // 
            // tb_insert_quantity_portion
            // 
            this.tb_insert_quantity_portion.Location = new System.Drawing.Point(124, 86);
            this.tb_insert_quantity_portion.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tb_insert_quantity_portion.Name = "tb_insert_quantity_portion";
            this.tb_insert_quantity_portion.Size = new System.Drawing.Size(57, 22);
            this.tb_insert_quantity_portion.TabIndex = 1;
            this.tb_insert_quantity_portion.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            this.tb_insert_quantity_portion.TextChanged += new System.EventHandler(this.tb_insert_quantity_portion_TextChanged);
            // 
            // AddFoodView
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(413, 534);
            this.Controls.Add(this.gb_foodToAdd);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "AddFoodView";
            this.Text = "Neuer Eintrag";
            this.gb_foodToAdd.ResumeLayout(false);
            this.gb_date.ResumeLayout(false);
            this.gb_nutrients.ResumeLayout(false);
            this.gb_nutrients.PerformLayout();
            this.gb_daytime.ResumeLayout(false);
            this.gb_daytime.PerformLayout();
            this.gb_quantity.ResumeLayout(false);
            this.gb_quantity.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox gb_foodToAdd;
        private System.Windows.Forms.Button bt_save;
        private System.Windows.Forms.Button bt_abort;
        private System.Windows.Forms.GroupBox gb_nutrients;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox tb_show_salt;
        private System.Windows.Forms.TextBox tb_show_fat;
        private System.Windows.Forms.TextBox tb_show_sugar;
        private System.Windows.Forms.TextBox tb_show_protein;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox tb_show_kcal;
        private System.Windows.Forms.TextBox tb_show_carb;
        private System.Windows.Forms.GroupBox gb_daytime;
        private System.Windows.Forms.RadioButton rb_lunch;
        private System.Windows.Forms.RadioButton rb_snack;
        private System.Windows.Forms.RadioButton rb_dinner;
        private System.Windows.Forms.RadioButton rb_breakfast;
        private System.Windows.Forms.GroupBox gb_quantity;
        private System.Windows.Forms.TextBox tb_insert_quantity_portion;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox tb_insert_quantity;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label lb_measuringunit;
        private System.Windows.Forms.Label lb_portion_and_baseunit;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.GroupBox gb_date;
        private System.Windows.Forms.DateTimePicker dtp_date;
        private System.Windows.Forms.Label lb_error;
    }
}