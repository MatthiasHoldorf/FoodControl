var RuntimeBrowserDetect = {

	init: function(iWarning, iTitle,iBtnText)
	{
		//Initialize Browser
		if (!this['BrowserEnum'])
		{
			this.BrowserEnum = new Object();
			this.BrowserEnum.UNKNOWN = 0;
			this.BrowserEnum.MSIE = 1;
			this.BrowserEnum.FIREFOX = 2;
			this.BrowserEnum.CHROME = 3;
			this.BrowserEnum.SAFARI = 4;
			this.BrowserEnum.NETSCAPE = 5;
			this.BrowserEnum.OPERA = 6;
			this.BrowserEnum.CAMINO = 7;
			this.BrowserEnum.FIREBIRD = 8;
			
			this.BrowserEnum.MSIE_MIN_SUPPORTED_VERSION = 9;
			this.BrowserEnum.CHROME_MIN_SUPPORTED_VERSION = 17;
			this.BrowserEnum.SAFARI_MIN_SUPPORTED_VERSION = 5.1;
			
		}
		if (!this['DeviceEnum'])
		{
			this.DeviceEnum = new Object();
			this.DeviceEnum.DESKTOP = 0;
			this.DeviceEnum.IDEVICE = 1;
			this.DeviceEnum.ANDROID = 2;
		}
			
		this.browser = this.BrowserEnum.UNKNOWN;
		this.browserVersion = this.BrowserEnum.UNKNOWN;
		this.device = this.DeviceEnum.DESKTOP;
		
		if(navigator.userAgent.match(/(iPhone|iPad|iPod)/i))
		{
			this.device = this.DeviceEnum.IDEVICE;
		}
		else if(navigator.userAgent.match(/android/i))
		{
			this.device = this.DeviceEnum.ANDROID;			
		}
	
		if(navigator.userAgent.match(/MSIE/i))
		{
			this.browser = this.BrowserEnum.MSIE;
			this.browserVersion =  this.getCurrentBrowserVersion(navigator.userAgent,"MSIE") || this.getCurrentBrowserVersion(navigator.appVersion,"MSIE")|| this.BrowserEnum.UNKNOWN;
		}
		else if(navigator.userAgent.match(/Firefox/i))
		{
			this.browser = this.BrowserEnum.FIREFOX;
			this.browserVersion =  this.getCurrentBrowserVersion(navigator.userAgent,"Firefox") || this.getCurrentBrowserVersion(navigator.appVersion,"Firefox")|| this.BrowserEnum.UNKNOWN;
		}
		else if(navigator.userAgent.match(/Chrome/i))
		{
			this.browser = this.BrowserEnum.CHROME;		
			this.browserVersion =  this.getCurrentBrowserVersion(navigator.userAgent,"Chrome") || this.getCurrentBrowserVersion(navigator.appVersion,"Chrome")|| this.BrowserEnum.UNKNOWN;
		}
		else if(navigator.userAgent.match(/Safari/i))
		{
			this.browser = this.BrowserEnum.SAFARI;		
			this.browserVersion =  this.getCurrentBrowserVersion(navigator.userAgent,"Version") || this.getCurrentBrowserVersion(navigator.appVersion,"Version")|| this.BrowserEnum.UNKNOWN;
		}
		else if(navigator.userAgent.match(/Netscape/i))
		{
			this.browser = this.BrowserEnum.NETSCAPE;
			this.browserVersion =  this.getCurrentBrowserVersion(navigator.userAgent,"Netscape") || this.getCurrentBrowserVersion(navigator.appVersion,"Netscape")|| this.BrowserEnum.UNKNOWN;
		}
		else if(navigator.userAgent.match(/Opera/i))
		{
			this.browser = this.BrowserEnum.OPERA;
			this.browserVersion =  this.getCurrentBrowserVersion(navigator.userAgent,"Version") || this.getCurrentBrowserVersion(navigator.appVersion,"Version")|| this.BrowserEnum.UNKNOWN;
		}
		else if(navigator.userAgent.match(/Camino/i))
		{
			this.browser = this.BrowserEnum.CAMINO;
			this.browserVersion =  this.getCurrentBrowserVersion(navigator.userAgent,"Camino") || this.getCurrentBrowserVersion(navigator.appVersion,"Camino")|| this.BrowserEnum.UNKNOWN;
		}
		else if(navigator.userAgent.match(/Firebird/i))
		{
			this.browser = this.BrowserEnum.FIREBIRD;
		}
		
		//Check for browser Compatibility
		if(!this.getIsBrowserSupported())
		{
			this.showRuntimeWarning(iWarning,iTitle,iBtnText);
		}
	},
	
	getCurrentBrowserVersion: function(iVersionString, iVersionSearchString) 
	{
		var index = iVersionString.indexOf(iVersionSearchString);
		if (index == -1) 
			return this.BrowserEnum.UNKNOWN;
		return parseFloat(iVersionString.substring(index+iVersionSearchString.length+1));
	},
	
	getIsBrowserSupported: function()
	{
		var lSupported = false;
		
		if((this.browser == this.BrowserEnum.MSIE) && (this.browserVersion >= this.BrowserEnum.MSIE_MIN_SUPPORTED_VERSION ))
			lSupported = true;					
		else if((this.browser == this.BrowserEnum.CHROME) && (this.browserVersion >= this.BrowserEnum.CHROME_MIN_SUPPORTED_VERSION ))
			lSupported = true;	
		else if((this.browser == this.BrowserEnum.SAFARI) && (this.browserVersion >= this.BrowserEnum.SAFARI_MIN_SUPPORTED_VERSION ))
			lSupported = true;	
			
		return lSupported;
	},
	
	getPanelElement: function(aLeft,aTop,aWidth,aHeight,aColor)
	{
		var lPanelElement = document.createElement("div");		
		lPanelElement.style.left = aLeft;
		lPanelElement.style.top = aTop;
		lPanelElement.style.width =  aWidth;
		lPanelElement.style.height = aHeight;
		lPanelElement.style.backgroundColor = aColor;
		lPanelElement.style.border = "1px solid #666666";
		lPanelElement.style.borderRadius = "14px";				
		return lPanelElement;		
	},
	
	getTextElement: function(aLeft,aTop,aColor,aFontName,aText)
	{
		var lTextElement = document.createElement("div");
		lTextElement.style.color = aColor;
		lTextElement.style.fontFamily = aFontName;
		lTextElement.style.fontSize = '14px';
		lTextElement.style.textAlign = "left";
		lTextElement.style.left = aLeft;
		lTextElement.style.top = aTop;
		lTextElement.style.position = "relative";	
		lTextElement.style.opacity = 1;
		lTextElement.innerHTML = aText;
		return lTextElement;
	},
	
	showRuntimeWarning: function(lMessageStr, lTitleStr, lButtonStr)
	{
		if(!document.body)
			return;			
			
		var lWarningBoxElement = document.createElement("div");
		lWarningBoxElement.id = "CPUnSupportedBrowserWarning_ID";	
		//Background		
		var lBackgroundPanelDivElem = this.getPanelElement("0px","0px","455px","220px","#CCCCCC");
		lBackgroundPanelDivElem.style.margin = "100px auto";		
		 if("boxShadow" in lBackgroundPanelDivElem.style)
			lBackgroundPanelDivElem.style.boxShadow =  "1px 1px 1px #000000";				
		lWarningBoxElement.appendChild(lBackgroundPanelDivElem);
		//Foreground
		var lForegroundPanelDivElem = this.getPanelElement("2px","2px","450px","215px","#FEFEFE");	
		lForegroundPanelDivElem.style.position = "relative";				
		lBackgroundPanelDivElem.appendChild(lForegroundPanelDivElem);
		//Title
		var lTitleDivElem = this.getTextElement("10px","10px","#000000","Tahoma",lTitleStr);
		lForegroundPanelDivElem.appendChild(lTitleDivElem);	
		//Separator
		var lSeparatorDivElem = document.createElement("div");
		lSeparatorDivElem.style.height = "2px";
		lSeparatorDivElem.style.backgroundColor = "#000000";
		lSeparatorDivElem.style.opacity = 0.5;
		lSeparatorDivElem.style.position = "relative";
		lSeparatorDivElem.style.marginLeft = "10px";
		lSeparatorDivElem.style.marginRight = "10px";
		lSeparatorDivElem.style.top = "20px";	
		lForegroundPanelDivElem.appendChild(lSeparatorDivElem);
		//Message
		var lMessageDivElem = this.getTextElement("10px","30px","#000000","Tahoma",lMessageStr);
		lMessageDivElem.style.marginRight = "10px";
		lForegroundPanelDivElem.appendChild(lMessageDivElem);	
		
		//Button		
		var lButtonDivElement = this.getPanelElement("0px","auto","100px","33px","#CCCCCC");	
		lButtonDivElement.style.bottom = "10px";
		lButtonDivElement.style.opacity = 0.7;
		lButtonDivElement.style.position = "absolute";		
		lButtonDivElement.style.cursor = "pointer";
		lButtonDivElement.onclick = function(){ var lWarningBoxElement = document.getElementById("CPUnSupportedBrowserWarning_ID"); if(lWarningBoxElement!=undefined){document.body.removeChild(lWarningBoxElement);}};				
		if("boxShadow" in lButtonDivElement.style)
			lButtonDivElement.style.boxShadow =  "1px 1px 1px #000000";				
		//AddButtonLabel
		var lButtonLabelDivElem = this.getTextElement("0px","5px","#000000","Tahoma",lButtonStr);
		lButtonLabelDivElem.style.textAlign = "center";		
		lButtonDivElement.appendChild(lButtonLabelDivElem);	
		
		lForegroundPanelDivElem.appendChild(lButtonDivElement);	
		
		//Place MessageBox
		document.body.appendChild(lWarningBoxElement);
		lWarningBoxElement.style.visibility =  "visible";
		lWarningBoxElement.style.position = "absolute";
		lWarningBoxElement.style.left = "0px";
		lWarningBoxElement.style.top = "0px";
		lWarningBoxElement.style.width = "100%";
		lWarningBoxElement.style.height = "100%";
		lWarningBoxElement.style.textAlign = "center";
		lWarningBoxElement.style.zIndex = "1000";
		lWarningBoxElement.style.backgroundColor = "CCCCCC";		
		
		//Update Positions		
		lButtonDivElement.style.left =  (lForegroundPanelDivElem.clientWidth - lButtonDivElement.clientWidth)/2+"px";
	}
};