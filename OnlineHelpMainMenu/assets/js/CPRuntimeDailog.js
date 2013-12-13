rtInherits = function(aSubClass, aBaseClass)
{
	function rtInheritance() { }
	rtInheritance.prototype = aBaseClass.prototype;

	aSubClass.prototype = new rtInheritance();
	aSubClass.prototype.constructor = aSubClass;

	aSubClass.baseConstructor = aBaseClass;
	aSubClass.superClass = aBaseClass.prototype;
}

HexToRGBA = function(aHexColor,aAlpha)
{
	//HexColor =  #rrggbb
	if(aHexColor==undefined)
		return aHexColor;
	
	var lHexStr = aHexColor;
	if(lHexStr.charAt(0)=="#")
		lHexStr = lHexStr.substring(1);
	if(lHexStr.length<6)
		return aHexColor;
	var lR = parseInt(lHexStr.substring(0,2),16);
	var lG = parseInt(lHexStr.substring(2,4),16);
	var lB = parseInt(lHexStr.substring(4,6),16);
	
	var lRGBA = "rgba("+lR+","+lG+","+lB+","+aAlpha+")";
	return lRGBA;
}

RuntimeDialogSeparator = function(aParent, aXPos, aYPos)
{
	this.m_parent = aParent;	
	this.m_XPos = aXPos;
	this.m_YPos = aYPos;
	this.m_color = "#000000";
	this.m_alpha = 0.5;
	this.m_size = 10;
	this.m_strokeWidth = 2;
		
	//Shadow
	this.m_shadowColor = "#FFFFFF";
	this.m_shadowAlpha = 0.65;
	this.m_shadowAngle = 270;
	this.m_shadowBlur = 2;
	this.m_shadowDistance = 1;  
}

RuntimeDialogSeparator.prototype =
{
	setColor:function(aVal)
	{
		this.m_color = aVal;
	},
	setAlpha:function(aVal)
	{
		this.m_alpha = aVal;
	},
	setSize:function(aVal)
	{
		this.m_size = aVal;
	},
	setShadowColor:function(aColor)
	{
		this.m_shadowColor = aColor;
	},
	getComponentDiv:function()
	{
		var lSepElement = document.createElement("div");
		lSepElement.style.height = this.m_strokeWidth+"px";
		lSepElement.style.backgroundColor = this.m_color;
		lSepElement.style.opacity = this.m_alpha;
		lSepElement.style.position = "relative";
		lSepElement.style.marginLeft = this.m_XPos+"px";
		lSepElement.style.marginRight = this.m_XPos+"px";
		lSepElement.style.top = this.m_YPos+"px";		
		
		//Shadow
		if("webkitBoxShadow" in lSepElement.style)
			lSepElement.style.webkitBoxShadow = this.m_shadowDistance + "px " + this.m_shadowDistance + "px " + this.m_shadowBlur + "px " + this.m_shadowColor ;
		else if("MozBoxShadow" in lSepElement.style)
			lSepElement.style.MozBoxShadow =  this.m_shadowDistance + "px " + this.m_shadowDistance + "px " + this.m_shadowBlur + "px " + this.m_shadowColor;
		else
			lSepElement.style.boxShadow =  this.m_shadowDistance + "px " + this.m_shadowDistance + "px " + this.m_shadowBlur + "px " + this.m_shadowColor;
			
		return lSepElement;
	}
}
	
 RuntimeDialogText = function(aParent,aXPos,aYPos)
 {
	this.m_parent = aParent;
	this.m_fontName = "Myriad Pro";
	this.m_XPos = aXPos;
	this.m_YPos = aYPos;
	this.m_fontSize = 14;
	this.m_fontColor = "#ff0000";
	this.m_text = "Sample Text";
	this.m_multiline = false;
	this.m_maxWidth = 400;
	this.m_maxHeight = 80;
		
	//Shadow
	this.m_shadowColor = "#FFFFFF";
	this.m_shadowAlpha = 0.35;
	this.m_shadowAngle = 270;
	this.m_shadowBlur = 2;
	this.m_shadowDistance = 1;  
}
 
 RuntimeDialogText.prototype =
{
	setFontName:function(aVal)
	{
		this.m_fontName = aVal;
	},
	setFontSize:function(aVal)
	{
		this.m_fontSize = aVal;
	},
	setFontColor:function(aVal)
	{
		this.m_fontColor = aVal;
	},
	setText:function(aVal)
	{
		this.m_text = aVal;
	},
	setMultiline:function(aVal)
	{
		this.m_multiline = aVal;
	},
	setMaxWidth:function(aVal)
	{
		this.m_maxWidth = aVal;
	},
	setShadowColor:function(aColor)
	{
		this.m_shadowColor = aColor;
	},	
	getTruncatedText:function(aMaxWidth) 
	{		
		if(aMaxWidth == undefined)
			return this.m_text;	
				
		var lWidth = this.getMaxPossibleWidth(this.m_text);
		if(lWidth <= aMaxWidth)
			return this.m_text;
		
		var lEllipses = "...";
		var lTruncatedText = this.m_text;
		
		var lText = lTruncatedText+lEllipses;
		lWidth = this.getMaxPossibleWidth(lText);	
		
		while((lText.length > 0) && (lWidth > aMaxWidth))
		{
			lTruncatedText = lTruncatedText.substring(0,lTruncatedText.length-1);
			lText = lTruncatedText+lEllipses;
			lWidth = this.getMaxPossibleWidth(lText);
		}
		return lText;
	},
	getMaxPossibleWidth:function(aText)
	{
		var lTextElement = document.createElement("div");
		lTextElement.style.color = this.m_fontColor;
		lTextElement.style.fontFamily = this.m_fontName;
		lTextElement.style.fontSize = this.m_fontSize + 'px';		
		lTextElement.style.width = "auto";
		lTextElement.style.height= "auto";
		lTextElement.style.position = "absolute";	
		lTextElement.style.visibilty= "hidden";		
		lTextElement.innerHTML = aText;
		document.body.appendChild(lTextElement);
		var lMaxWidth = lTextElement.clientWidth + 4; //4 is extra padding 
		document.body.removeChild(lTextElement);
		return lMaxWidth;
	},
	getComponentDiv:function()
	{
		var lTextElement = document.createElement("div");
		lTextElement.style.color = this.m_fontColor;
		lTextElement.style.fontFamily = this.m_fontName;
		lTextElement.style.fontSize = this.m_fontSize + 'px';
		lTextElement.style.textAlign = "left";
		lTextElement.style.left = this.m_XPos+"px";
		lTextElement.style.top = this.m_YPos+"px";
		lTextElement.style.position = "relative";	
		lTextElement.style.opacity = 1;
		//Note: TextShadow will work in all major browsers except for IE(we find out alternate solution for that)
		var lColor = HexToRGBA(this.m_shadowColor,this.m_shadowAlpha);
		lTextElement.style.textShadow =this.m_shadowDistance + "px " + this.m_shadowDistance + "px " + this.m_shadowBlur + "px " + lColor;		
		lTextElement.innerHTML = this.m_text;
		
		return lTextElement;
	}
} 
 
 RuntimeDialogPanel = function(aParent,aXPos,aYPos,aWidth, aHeight)
 {
	this.m_parent = aParent;
	this.m_fillColor = "#CCCCCC";
	this.m_alpha = 0.5;
	this.m_strokeColor = "#666666";
	this.m_XPos = aXPos;
	this.m_YPos = aYPos;
	this.m_strokeWidth = 1;
	this.m_width = aWidth;
	this.m_height = aHeight;
	this.m_roundness = 20;
	this.m_minWidth = 100;
	this.m_minHeight = 100;
	this.m_maxWidth = 493;
	this.m_maxHeight = 219;
		
	//Shadow
	this.m_showShadow = false;
	this.m_shadowColor = "#000000";
	this.m_shadowAlpha = 0.65;
	this.m_shadowAngle = 270;
	this.m_shadowBlur = 2;
	this.m_shadowDistance = 2;  
 }
 
 RuntimeDialogPanel.prototype =
{
	setFillColor:function(aVal)
	{
		this.m_fillColor = aVal;
	},
	setAlpha:function(aVal)
	{
		this.m_alpha = aVal;
	},
	setStrokeColor:function(aVal)
	{
		this.m_strokeColor = aVal;
	},
	setStrokeWidth:function(aVal)
	{
		this.m_strokeWidth = aVal;
	},
	setWidth:function(aVal)
	{
		this.m_width = aVal;
	},
	getWidth:function()
	{
		var lWidth = this.m_width;
		if(lWidth < this.m_minWidth)
			lWidth = this.m_minWidth;
		if(lWidth > this.m_maxWidth)
			lWidth = this.m_maxWidth;			
		return lWidth;
	},
	setHeight:function(aVal)
	{
		this.m_height = aVal;
	},
	setMinWidth:function(aVal)
	{
		if(aVal < this.m_maxWidth)
			this.m_minWidth = aVal;
	},
	setMinHeight:function(aVal)
	{
		if(aVal < this.m_maxHeight)
			this.m_minHeight = aVal;
	},
	setMaxWidth:function(aVal)
	{
		if(aVal > this.m_minWidth)
			this.m_maxWidth = aVal;
	},
	setMaxHeight:function(aVal)
	{
		if(aVal > this.m_minHeight)
			this.m_maxHeight = aVal;
	},
	setRoundness:function(aVal)
	{
		this.m_roundness = aVal;
	},
	showShadow:function(aVal)
	{
		this.m_showShadow = aVal;
	},
	setShadowColor:function(aColor)
	{
		this.m_shadowColor = aColor;
	},	
	getComponentDiv:function()
	{
		var lWidth = this.m_width;
		var lHeight = this.m_height;
		if(lWidth < this.m_minWidth)
			lWidth = this.m_minWidth;
		if(lWidth > this.m_maxWidth)
			lWidth = this.m_maxWidth;
		if(lHeight < this.m_minHeight)
			lHeight = this.m_minHeight;
		if(lHeight > this.m_maxHeight)
			lHeight = this.m_maxHeight;
			
		var lPanelElement = document.createElement("div");
		
		lPanelElement.style.width =  lWidth + "px"
		lPanelElement.style.height = lHeight  + "px";
		//lPanelElement.style.margin = "100px auto";
		lPanelElement.style.background = HexToRGBA(this.m_fillColor,this.m_alpha);
		lPanelElement.style.border = this.m_strokeWidth + "px solid "+this.m_strokeColor;
		lPanelElement.style.borderRadius = this.m_roundness + "px";		
		lPanelElement.style.left = this.m_XPos+"px";
		lPanelElement.style.top = this.m_YPos+"px";
		
		if(this.m_showShadow)
		{
			if("webkitBoxShadow" in lPanelElement.style)
				lPanelElement.style.webkitBoxShadow = this.m_shadowDistance + "px " + this.m_shadowDistance + "px " + this.m_shadowBlur + "px " + this.m_shadowColor ;
			else if("MozBoxShadow" in lPanelElement.style)
				lPanelElement.style.MozBoxShadow =  this.m_shadowDistance + "px " + this.m_shadowDistance + "px " + this.m_shadowBlur + "px " + this.m_shadowColor;
			else
				lPanelElement.style.boxShadow =  this.m_shadowDistance + "px " + this.m_shadowDistance + "px " + this.m_shadowBlur + "px " + this.m_shadowColor;
		}
		
		return lPanelElement;
	}
}
 
RuntimeDialogButton = function(aParent,aXPos,aYPos,aWidth,aHeight)
{
	RuntimeDialogButton.baseConstructor.call(this,aParent,aXPos,aYPos,aWidth,aHeight);
	this.m_label = undefined;
	this.m_labelText = "OK";
	this.m_labelFontName = "Myriad Pro";
	this.m_labelFontSize = 16;
	this.m_labelFontColor = "#000000";
	this.m_labelShadowColor = "#FFFFFF";	
	this.BUTTON_LABEL_LEFT_PADDING  = 5;
	this.BUTTON_LABEL_TOP_PADDING 	= 5;

	this.m_fillColor = "#CDCDCD";
	this.m_alpha = 0.3;
	this.m_strokeColor = "#000000";
	this.m_strokeWidth = 1;
	this.m_maxWidth = 230;
	this.m_minWidth = 40;
	this.m_minHeight = m_maxHeight = 25;
	this.m_roundness = 10;	
}
 
 rtInherits(RuntimeDialogButton, RuntimeDialogPanel);
 
 {    //RuntimeDialogButton Functions
 	 RuntimeDialogButton.prototype.setButtonLabel = function(aVal)
	{
		this.m_labelText = aVal;
	}
	RuntimeDialogButton.prototype.setButtonLabelFontName = function(aVal)
	{
		this.m_labelFontName = aVal;
	}

	RuntimeDialogButton.prototype.setButtonLabelFontSize = function(aVal)
	{
		this.m_labelFontSize = aVal;
	}

	RuntimeDialogButton.prototype.setButtonLabelFontColor = function(aVal)
	{
		this.m_labelFontColor = aVal;
	}

	RuntimeDialogButton.prototype.setButtonLabelShadowColor = function(aVal)
	{
		this.m_labelShadowColor = aVal;
	}

	RuntimeDialogButton.prototype.setHandler = function(aHandler)
	{
		this.m_handler = aHandler;
	}

	RuntimeDialogButton.prototype.getComponentDiv = function()
	{
		var lButtonElement = RuntimeDialogButton.superClass.getComponentDiv.call(this);
		
		lButtonElement.style.position = "absolute";		
		lButtonElement.style.cursor = "pointer";
		
		var lFillColor = this.m_fillColor;
		var lAlpha = this.m_alpha;
		lButtonElement.onmouseover = function(e){ lButtonElement.style.background = HexToRGBA(lFillColor,0.1);}	
		lButtonElement.onmouseout = function(e) {	lButtonElement.style.background = HexToRGBA(lFillColor,lAlpha);}	
		lButtonElement.onclick = this.m_handler;
		
		//AddButtonLabel
		var lText = new RuntimeDialogText(lButtonElement,0,5);
		lText.setText(this.m_labelText);
		lText.setFontName(this.m_labelFontName);
		lText.setFontColor(this.m_labelFontColor);
		lText.setFontSize(this.m_labelFontSize);
		lText.setShadowColor(this.m_labelShadowColor);
		lText.setMaxWidth(this.m_maxWidth - this.BUTTON_LABEL_LEFT_PADDING*2);
		var lTextElement = lText.getComponentDiv();
		lTextElement.style.textAlign = "center";

		var lTextWidth = lText.getMaxPossibleWidth(this.m_labelText);
		if(lTextWidth > this.m_width)
		{
			if(lTextWidth > this.m_maxWidth) 
			{
				lTextWidth = this.m_maxWidth;
				lTextElement.innerHTML = lText.getTruncatedText(this.m_maxWidth);
			}
			lButtonElement.style.width = lTextWidth +"px";
		}
			
		lButtonElement.appendChild(lTextElement);
		
		return lButtonElement;
	}
}
 
  RuntimeMessageBox = function(aParent,aNumberOfButtons,aFGFillColor,aFGStrokeColor,
							aBtnFillColor,aBtnStrokeColor,aSeparatorColor,
							aTextColor,aTextShadowColor,aTextFontName)
  {	
	this.m_parent = aParent;
	this.m_MessageBoxElement = undefined;
	this.m_id = "CPRuntimeMsgBox_ID";	
	
	this.m_titleText = "Adobe Captivate";
	this.m_messageText = "This is Adobe Captivate Run Time Message Dialog";
	this.m_firstButtonText = "OK";
	this.m_secondButtonText = "CANCEL";
	
	this.m_ChkBoxText = "Don't ask me again";
	
	this.m_numberOfButtons = aNumberOfButtons;
	this.m_firstButtonHandler = undefined;
	this.m_secondButtonHandler = undefined;
	
	this.m_DontAskMe = false;
	this.m_foregroundFillColor = aFGFillColor;
	this.m_foregroundStrokeColor = aFGStrokeColor;
	this.m_buttonFillColor = aBtnFillColor;
	this.m_buttonStrokeColor = aBtnStrokeColor;
	this.m_separatorColor = aSeparatorColor;
	this.m_textColor = aTextColor;
	this.m_textShadowColor = aTextShadowColor;
	this.m_textFontName = aTextFontName;

	this.TITLE_DEFAULT_LEFT_OFFSET 		= 10;
	this.SEPARATOR_DEFAULT_LEFT_OFFSET	= 10;
	this.MESSAGE_DEFAULT_LEFT_OFFSET 	= 10;
	
	this.TITLE_DEFAULT_TOP_OFFSET   	= 10;
	this.SEPARATOR_DEFAULT_TOP_OFFSET	= 20;
	this.MESSAGE_DEFAULT_TOP_OFFSET 	= 30;
	this.BUTTON_BOTTOM_OFFSET 			= 10;
	
	this.BG_DEFAULT_WIDTH 				= 493;
	this.BG_DEFAULT_HEIGHT				= 219;
	
	this.FG_DEFAULT_WIDTH 				= 478;
	this.FG_DEFAULT_HEIGHT 				= 198;
	this.BUTTON_DEFAULT_WIDTH 			= 100;
	this.BUTTON_DEFAULT_HEIGHT 			= 33;
	this.INTER_BUTTON_OFFSET 			= 15;	
  }
  
  RuntimeMessageBox.prototype =
  {
	getDontAskMeInput : function(val)
	{
		if(this.m_DontAskMe)
		{
			 var inputElement = document.getElementById("dont_ask_me_chk");
			 if(inputElement)
				return inputElement.checked;
		}
		return false;
	},
	setDontAskMe : function(val)
	{
		this.m_DontAskMe = val;
	},
	setDontAskMeText : function(val)
	{
		this.m_ChkBoxText = val;
	},
	setTitleText:function(aVal)
	{
		this.m_titleText = aVal;
	},
	setCheckBoxText:function(aVal)
	{
		this.m_ChkBoxText = aVal;
	},
	setMessageText:function(aVal)
	{
		this.m_messageText = aVal;
	},
	setFirstButtonText:function(aVal)
	{
		this.m_firstButtonText = aVal;
	},
	setSecondButtonText:function(aVal)
	{
		this.m_secondButtonText = aVal;
	},		
	registerFirstButtonHandler:function(aHandler)
	{
		if(aHandler!=undefined)
			this.m_firstButtonHandler = aHandler;		
	},
	registerSecondButtonHandler:function(aHandler)
	{
		if(aHandler!=undefined)
			this.m_secondButtonHandler = aHandler;
	},
	isVisible:function()
	{
		var lVisible = false;
		if((this.m_MessageBoxElement != undefined) && (this.m_MessageBoxElement.style.visibility ==  "visible"))
			lVisible = true;		
		return  lVisible;	
	},	
	hide:function()
	{
		var cpDocumentElement = document.getElementById("cpDocument");
		var cpMsgBoxElement = document.getElementById("CPRuntimeMsgBox_ID");
		if(cpMsgBoxElement!=undefined)
			cpDocumentElement.removeChild(cpMsgBoxElement);			
	},	
	show:function()
	{
		//remove dialog if already there
		this.hide();
		
		this.m_MessageBoxElement = document.createElement("div");
		this.m_MessageBoxElement.id = this.m_id;				
		
		//Background
		var lBackgroundPanel = new RuntimeDialogPanel(this.m_parent,0,0,this.BG_DEFAULT_WIDTH,this.BG_DEFAULT_HEIGHT);
		lBackgroundPanel.showShadow(true);		
		var lBackgroundPanelDivElem = lBackgroundPanel.getComponentDiv();	
		lBackgroundPanelDivElem.style.margin = "100px auto";		
		this.m_MessageBoxElement.appendChild(lBackgroundPanelDivElem);
			
		//Foreground
		var lForegroundPanelXPos = (this.BG_DEFAULT_WIDTH - this.FG_DEFAULT_WIDTH)/2;
		var lForegroundPanelYPos = (this.BG_DEFAULT_HEIGHT - this.FG_DEFAULT_HEIGHT)/2;
		var lForegroundPanel = new RuntimeDialogPanel(lBackgroundPanelDivElem,lForegroundPanelXPos,lForegroundPanelYPos,this.FG_DEFAULT_WIDTH,this.FG_DEFAULT_HEIGHT);
		lForegroundPanel.setFillColor(this.m_foregroundFillColor);
		lForegroundPanel.setAlpha(1);
		lForegroundPanel.setStrokeColor(this.m_foregroundStrokeColor);
		var lForegroundPanelDivElem = lForegroundPanel.getComponentDiv();
		lForegroundPanelDivElem.style.position = "relative";		
		lBackgroundPanelDivElem.appendChild(lForegroundPanelDivElem);
		
		//Title
		var lTitle = new RuntimeDialogText(lForegroundPanelDivElem,this.TITLE_DEFAULT_LEFT_OFFSET,this.TITLE_DEFAULT_TOP_OFFSET);
		lTitle.setText(this.m_titleText);
		lTitle.setFontSize(18);
		lTitle.setFontColor(this.m_textColor);
		lTitle.setFontName(this.m_textFontName);
		lTitle.setShadowColor(this.m_textShadowColor);
		var lTitleDivElem = lTitle.getComponentDiv();		
		lForegroundPanelDivElem.appendChild(lTitleDivElem);	
		
		//Separator
		var lSeparator  = new RuntimeDialogSeparator(lForegroundPanelDivElem,this.SEPARATOR_DEFAULT_LEFT_OFFSET,this.SEPARATOR_DEFAULT_TOP_OFFSET);
		//lSeparator.setSize(this.FG_DEFAULT_WIDTH - 2*this.SEPARATOR_DEFAULT_LEFT_OFFSET);
		lSeparator.setColor(this.m_separatorColor);
		var lSeparatorDivElem = lSeparator.getComponentDiv();
		lForegroundPanelDivElem.appendChild(lSeparatorDivElem);			
		
		//Message
		var lMessage = new RuntimeDialogText(lForegroundPanelDivElem,this.MESSAGE_DEFAULT_LEFT_OFFSET,this.MESSAGE_DEFAULT_TOP_OFFSET);
		lMessage.setText(this.m_messageText);
		lMessage.setFontColor(this.m_textColor);
		lMessage.setFontName(this.m_textFontName);
		lMessage.setShadowColor(this.m_textShadowColor);
		lMessage.setFontSize(14);
		lMessage.setMultiline(true);			
		var lMessageDivElem = lMessage.getComponentDiv();		
		lForegroundPanelDivElem.appendChild(lMessageDivElem);			
		
		if(this.m_DontAskMe)
		{
			var lCheckBoxText = new RuntimeDialogText(lForegroundPanelDivElem,this.MESSAGE_DEFAULT_LEFT_OFFSET,this.MESSAGE_DEFAULT_TOP_OFFSET);
			lCheckBoxText.setText(this.m_ChkBoxText);
			lCheckBoxText.setFontColor(this.m_textColor);
			lCheckBoxText.setFontName(this.m_textFontName);
			lCheckBoxText.setShadowColor(this.m_textShadowColor);
			lCheckBoxText.setFontSize(14);
			lCheckBoxText.setMultiline(false);			
			var lCheckBoxTextDivElem = lCheckBoxText.getComponentDiv();		
			lForegroundPanelDivElem.innerHTML += '<input type="checkbox" id="dont_ask_me_chk" style="left:10px; bottom: 70px;width:20px; height:20px;position:absolute">';
			lForegroundPanelDivElem.appendChild(lCheckBoxTextDivElem);
			lCheckBoxTextDivElem.style.position = 'absolute';
			lCheckBoxTextDivElem.style.top = '';
			lCheckBoxTextDivElem.style.bottom = '75px';
			lCheckBoxTextDivElem.style.left = '40px';
		}
		
		//FirstButton
		var lFirstButton = new RuntimeDialogButton(lForegroundPanelDivElem,0,0,this.BUTTON_DEFAULT_WIDTH,this.BUTTON_DEFAULT_HEIGHT);
		lFirstButton.setFillColor(this.m_buttonFillColor);
		lFirstButton.setStrokeColor(this.m_buttonStrokeColor);
		lFirstButton.setButtonLabel(this.m_firstButtonText);
		lFirstButton.setButtonLabelFontSize(16);
		lFirstButton.setButtonLabelFontColor(this.m_textColor);
		lFirstButton.setButtonLabelFontName(this.m_textFontName);
		lFirstButton.setButtonLabelShadowColor(this.m_textShadowColor);	
		lFirstButton.setHandler(this.m_firstButtonHandler);
		var lFirstButtonDivElem = lFirstButton.getComponentDiv();		
		lFirstButtonDivElem.style.top = "auto";
		lFirstButtonDivElem.style.bottom = this.BUTTON_BOTTOM_OFFSET+"px";		
		lForegroundPanelDivElem.appendChild(lFirstButtonDivElem);			
		
		//Second Button
		var lSecondButtonDivElem = undefined;
		if(this.m_numberOfButtons == 2)
		{
			lSecondButton = new RuntimeDialogButton(lForegroundPanelDivElem,0,0,this.BUTTON_DEFAULT_WIDTH,this.BUTTON_DEFAULT_HEIGHT);	
			lSecondButton.setFillColor(this.m_buttonFillColor);
			lSecondButton.setStrokeColor(this.m_buttonStrokeColor);
			lSecondButton.setButtonLabel(this.m_secondButtonText);
			lSecondButton.setButtonLabelFontSize(16);
			lSecondButton.setButtonLabelFontColor(this.m_textColor);
			lSecondButton.setButtonLabelFontName(this.m_textFontName);
			lSecondButton.setButtonLabelShadowColor(this.m_textShadowColor);
			lSecondButton.setHandler(this.m_secondButtonHandler);
			lSecondButtonDivElem = lSecondButton.getComponentDiv();
			lSecondButtonDivElem.style.top = "auto";
			lSecondButtonDivElem.style.bottom = this.BUTTON_BOTTOM_OFFSET+"px";
			lForegroundPanelDivElem.appendChild(lSecondButtonDivElem);			
		}
		
		//Place MessageBox
		this.m_parent.appendChild(this.m_MessageBoxElement);
		this.m_MessageBoxElement.style.visibility =  "visible";
		this.m_MessageBoxElement.style.position = "absolute";
		this.m_MessageBoxElement.style.left = "0px";
		this.m_MessageBoxElement.style.top = "0px";
		this.m_MessageBoxElement.style.width = "100%";
		this.m_MessageBoxElement.style.height = "100%";
		this.m_MessageBoxElement.style.textAlign = "center";
		this.m_MessageBoxElement.style.zIndex = "1000";
		this.m_MessageBoxElement.style.background = "rgba(240,240,240,0.2)";		
		
		//Update Button Positions
		var lXPos =  lForegroundPanelDivElem.clientWidth - lFirstButtonDivElem.clientWidth; 
		if(lSecondButtonDivElem)
			lXPos =  lXPos -this.INTER_BUTTON_OFFSET - lSecondButtonDivElem.clientWidth;
		lXPos = lXPos/2;
		lFirstButtonDivElem.style.left = lXPos+"px";
		if(lSecondButtonDivElem)
			lSecondButtonDivElem.style.left = lXPos + lFirstButtonDivElem.clientWidth + this.INTER_BUTTON_OFFSET+"px";				
	},
	close:function()
	{
		var cpDocumentElement = document.getElementById("cpDocument");
		var cpMsgBoxElement = document.getElementById("CPRuntimeMsgBox_ID");
		cpDocumentElement.removeChild(cpMsgBoxElement);
		cpMsgBoxElement = undefined;
	}
  }
   