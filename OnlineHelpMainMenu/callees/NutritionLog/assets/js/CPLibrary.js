if (typeof console === "undefined" || typeof console.log === "undefined") 
{
	console = {};
	console.log = function() {};
}


if (!window['Node']) {
    window.Node = new Object();
    Node.ELEMENT_NODE = 1;
    Node.ATTRIBUTE_NODE = 2;
    Node.TEXT_NODE = 3;
    Node.CDATA_SECTION_NODE = 4;
    Node.ENTITY_REFERENCE_NODE = 5;
    Node.ENTITY_NODE = 6;
    Node.PROCESSING_INSTRUCTION_NODE = 7;
    Node.COMMENT_NODE = 8;
    Node.DOCUMENT_NODE = 9;
    Node.DOCUMENT_TYPE_NODE = 10;
    Node.DOCUMENT_FRAGMENT_NODE = 11;
    Node.NOTATION_NODE = 12;
}

if(!Array.indexOf){
	    Array.prototype.indexOf = function(obj){
	        for(var i=0; i<this.length; i++){
	            if(this[i]==obj){
	                return i;
	            }
	        }
	        return -1;
	    }
	}
(function () {

	var debug = false;
	
	// Base Interface
	function IObject() 
	{ 

	}
	
	window.cp = function(str)
	{
		return document.getElementById(str);
	};
	
	cp.inherits = function(subClass, baseClass)
	{
        function inheritance() { }
        inheritance.prototype = baseClass.prototype;

        subClass.prototype = new inheritance();
        subClass.prototype.constructor = subClass;

        subClass.baseConstructor = baseClass;
        subClass.superClass = baseClass.prototype;
	}
	
	cp.UNKNOWN = 0;

	//OS
	cp.WINDOWS = 1;
	cp.MACOS = 2;
	
	//devices
	cp.DESKTOP = 1;
	cp.IDEVICE = 2;
	cp.ANDROID = 3;
	
	//deviceFlavors
	cp.IPAD2 = 1;
	cp.IPAD3 = 2;
	cp.IPHONE = 3;
	
	//IOS flavors
	cp.IOS1 = 1;
	cp.IOS2 = 2;
	cp.IOS3 = 3;
	cp.IOS4 = 4;
	cp.IOS5 = 5;
	cp.IOS6 = 6;
	
	//browsers
	cp.MSIE = 1;
	cp.FIREFOX = 2;
	cp.CHROME = 3;
	cp.SAFARI = 4;
	cp.NETSCAPE = 5;
	cp.OPERA = 6;
	cp.CAMINO = 7;
	cp.FIREBIRD = 8;
	
	cp.MSIE_MIN_SUPPORTED_VERSION = 9;
	cp.CHROME_MIN_SUPPORTED_VERSION = 17;
	cp.SAFARI_MIN_SUPPORTED_VERSION = 5.1;
	
	cp.disablePaceMaker = false;
	cp.verbose = false;
	cp.exceptionalLogs = true;
	cp.consolidateLogs = false;
	cp.dynamicLogControl = false;
	cp.projectContainer = null;
	cp.project = null;
	cp.playImage = null;
	cp.autoplayImage = null;
	cp.autoplayDiv = null;
	cp.passwordDiv = null;
	cp.expiryDiv = null;
	cp.preloaderImage = null;
	cp.log = function(msg)
	{
		var timeStampNeeded = true;
		if(timeStampNeeded)
		{
			msg = "@"+(new Date()).getTime() + " " + msg;
		}
		
		if(cp.consolidateLogs && cp.logArray)
			cp.logArray.push(msg);
		else
			console.log(msg);
	}
	
	if(cp.verbose)
		cp.log('navigator.userAgent = '+ navigator.userAgent);
		
	cp.model={};
	cp.OS = cp.UNKNOWN;
	cp.device = cp.DESKTOP;
	cp.deviceFlavor = cp.UNKNOWN;
	cp.IOSFlavor = cp.UNKNOWN;
	cp.browser = cp.UNKNOWN;
	cp.browserVersion = cp.UNKNOWN;
	cp.browser_supports_svg = true;

	cp.kCPOTAnimationItem = 28;
	cp.kCPOTCaptionItem = 19;
	cp.kCPHighlight 	= 14;
	cp.kCPMouse		= 12;
	cp.kCPMouseClick 	= 15728652;
	cp.kCPOTStageAnswerItem = 80;
	cp.kCPOTIncompleteFeedbackItem = 97;
	cp.kCPZoomSource 	= 99;
	cp.kCPOTStageCorrectFeedback = 10086;
	cp.kCPOTStageIncorrectFeedback = 10087;
	cp.kCPOTStagePartialCorrectFeedback = 10139;
	cp.kCPOTTimeoutFeedbackItem = 174;
	cp.kCPOTRetryFeedbackItem = 81;
    cp.kCPOTStageSingleChoiceMultipleAnswer = 10082;
    cp.kCPOTStageMultipleChoiceMultipleAnswer = 10081;
	cp.kCPOTStageSequenceAnswer = 10096;
	cp.kCPOTItemHotSpot = 131;
	cp.kCPOTReviewArea = 94;
	cp.kCPOTProgressIndicator = 92;
	cp.kCPOTScoringResult = 111;
	cp.kCPOTClickBoxItem = 13;
	cp.kCPOTScorableButtonItem = 177;
    cp.kCPTypingText = 64;
    cp.kCPFullMotion = 270;
	cp.kCPOTFLVItem = 98;
	cp.kCPOTVideo = 365;
	cp.kCPOTVideoResource = 359;
	cp.kCPOTSuccessCaptionItem = 21;
	cp.kCPOTFailureCaptionItem = 22;
	cp.kCPOTHintCaptionItem = 23;
	cp.kCPOTTextEntryBoxItem = 24;
	cp.kCPOTTextEntryButtonItem = 75;
	cp.kCPOTRetakeButton = 175;
	cp.kCPOTLineItem = 142;
	cp.kCPOTOvalItem = 167;
	cp.kCPOTRectangleItem = 168;
	cp.kCPOTPolygon = 209;
	cp.kCPOTAnswerArea = 10142;
	cp.kCPOTStageQuestionText = 79;
	cp.kCPOTStageQuestionTitle = 86;
	cp.kCPOTTitleAutoShape = 589;
	cp.kCPOTSubTitleAutoShape = 590;
	cp.kCPOTAutoShape = 612;
	cp.kCPOTWidgetItem = 133;
	cp.kCPOTTAItem = 76;

    cp.kCPOTStageQuestionNextButton = 83;
	cp.kCPOTStageQuestionClearButton = 84;
	cp.kCPOTStageQuestionBackButton = 85;
	cp.kCPOTStageQuestionSubmitButton = 91;
	cp.kCPOTScoringResultItem = 112;
	cp.kCPOTScoringReviewButton = 103;
	cp.kCPOTScoringContinueButton = 10119;
	cp.kCPOTSubmitAllButton = 10149;


	cp.kBeginPath = 0;
	cp.kMoveTo = 1;
	cp.kLineTo = 2;
	cp.kBezierTo = 3;
	cp.kClosePath = 4;
	cp.kNotClosed = 5;
	cp.kNoStroke = 6;
	cp.accOutlineStyleStr = '';
	
	cp.getCurrentBrowserVersion = function(iVersionString, iVersionSearchString) 
	{
		var index = iVersionString.indexOf(iVersionSearchString);
		if (index == -1) 
			return cp.UNKNOWN;
		return parseFloat(iVersionString.substring(index+iVersionSearchString.length+1));
	}
	
	
	if (navigator.appVersion.indexOf("Win")!=-1)
		cp.OS = cp.WINDOWS;
	else if (navigator.appVersion.indexOf("Mac")!=-1)
		cp.OS = cp.MACOS;
	

	if(navigator.userAgent.match(/(iPhone|iPad)/i))
	{
		cp.device = cp.IDEVICE;
		cp.browser_supports_svg = false;
		cp.accOutlineStyleStr = 'outline-style:none';
		
		var pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
		
		if(navigator.userAgent.indexOf('iPhone') != -1)
			cp.deviceFlavor = cp.IPHONE;//TODO::subversions of iPhone
		else if(navigator.userAgent.indexOf('iPad') != -1)
		{
			cp.deviceFlavor = cp.IPAD2;
			if(pixelRatio >= 2)
				cp.deviceFlavor = cp.IPAD3;
		}
		
		var IOSVer = navigator.userAgent.match(/OS [1-9][0-9]*_/);
		if(IOSVer && IOSVer[0])
		{
			var firstMatch = IOSVer[0].substr(2);
			cp.IOSFlavor = parseInt(firstMatch, 10);
		}
	}
	else if(navigator.userAgent.match(/android/i))
	{
		cp.device = cp.ANDROID;
		cp.accOutlineStyleStr = 'outline-style:none';
	}
	
	
	
	if(navigator.userAgent.match(/MSIE/i))
	{
		cp.browser = cp.MSIE;
		cp.browserVersion =  cp.getCurrentBrowserVersion(navigator.userAgent,"MSIE") || cp.getCurrentBrowserVersion(navigator.appVersion,"MSIE")|| cp.UNKNOWN;
	}
	else if(navigator.userAgent.match(/Firefox/i))
	{
		cp.browser = cp.FIREFOX;
		cp.browserVersion =  cp.getCurrentBrowserVersion(navigator.userAgent,"Firefox") || cp.getCurrentBrowserVersion(navigator.appVersion,"Firefox")|| cp.UNKNOWN;
	}
	else if(navigator.userAgent.match(/Chrome/i))
	{
		cp.browser = cp.CHROME;
		cp.accOutlineStyleStr = 'outline-style:none';
		cp.browserVersion =  cp.getCurrentBrowserVersion(navigator.userAgent,"Chrome") || cp.getCurrentBrowserVersion(navigator.appVersion,"Chrome")|| cp.UNKNOWN;
	}
	else if(navigator.userAgent.match(/Safari/i))
	{
		cp.browser = cp.SAFARI;
		cp.browser_supports_svg = false;
		cp.accOutlineStyleStr = 'outline-style:none';
		cp.browserVersion =  cp.getCurrentBrowserVersion(navigator.userAgent,"Version") || cp.getCurrentBrowserVersion(navigator.appVersion,"Version")|| cp.UNKNOWN;
	}
	else if(navigator.userAgent.match(/Netscape/i))
	{
		cp.browser = cp.NETSCAPE;
		cp.browserVersion =  cp.getCurrentBrowserVersion(navigator.userAgent,"Netscape") || cp.getCurrentBrowserVersion(navigator.appVersion,"Netscape")|| cp.UNKNOWN;
	}
	else if(navigator.userAgent.match(/Opera/i))
	{
		cp.browser = cp.OPERA;
		cp.browserVersion =  cp.getCurrentBrowserVersion(navigator.userAgent,"Version") || cp.getCurrentBrowserVersion(navigator.appVersion,"Version")|| cp.UNKNOWN;
	}
	else if(navigator.userAgent.match(/Camino/i))
	{
		cp.browser = cp.CAMINO;
		cp.browserVersion =  cp.getCurrentBrowserVersion(navigator.userAgent,"Camino") || cp.getCurrentBrowserVersion(navigator.appVersion,"Camino")|| cp.UNKNOWN;
	}
	else if(navigator.userAgent.match(/Firebird/i))
	{
		cp.browser = cp.FIREBIRD;
	}
	
	if(cp.verbose)
	{
		cp.log('browser = ' + cp.browser);
		cp.log('browserVersion = '+cp.browserVersion);
		cp.log('device = ' + cp.device);
		if(cp.device == cp.IDEVICE)
		{
			cp.log('device flavor = ' + cp.deviceFlavor);
			cp.log('IOS flavor = ' + cp.IOSFlavor);
		}
		cp.log('browser_supports_svg = ' + cp.browser_supports_svg);
	}
	
	cp.canUseWebkitAnimations = function() 
	{   
		var version = 0;
	   	
		var regexp = /( AppleWebKit\/)([^ ]+)/;		
		var result = regexp.exec(navigator.userAgent);
		if (!result || result.length < 3)
			return null;
		var lVersionString = result[2];

		// Remove '+' or any other stray characters
		var invalidCharacterRegExp = /[^\\.0-9]/;
		var invalidCharacter = invalidCharacterRegExp.exec(lVersionString);
		if (invalidCharacter)
			lVersionString = lVersionString.slice(0, invalidCharacter.index);
		
		if(result) 
		{
			version = parseFloat(lVersionString);
		}

		if(cp.verbose)
			cp.log("Webkit version : " + version);
		return (version >= 534);   
	}
	
	cp.getIsBrowserSupported = function()
	{
		var lSupported = false;
		
		if((cp.browser == cp.MSIE) && (cp.browserVersion >= cp.MSIE_MIN_SUPPORTED_VERSION ))
			lSupported = true;					
		else if((cp.browser == cp.CHROME) && (cp.browserVersion >= cp.CHROME_MIN_SUPPORTED_VERSION ))
			lSupported = true;	
		else if((cp.browser == cp.SAFARI) && (cp.browserVersion >= cp.SAFARI_MIN_SUPPORTED_VERSION ))
			lSupported = true;	
			
		return lSupported;
	}

	cp.ShowWarning = function(iWarningMsg, iTitle,dontShow,cancelBtn)
	{
		//Get RuntimeDialog Attribute from publish side		
		var lRuntimeDialogData = cp.model.data['rtDialog'];
		var lBGFillColor = lRuntimeDialogData['rtbgfc'];
		var lBGStrokeColor = lRuntimeDialogData['rtbgsc'];
		var lBtnFillColor = lRuntimeDialogData['rtbtnfc'];
		var lBtnStrokeColor = lRuntimeDialogData['rtbtnsc'];
		var lSeparatorColor = lRuntimeDialogData['rtsc'];
		var lTextColor = lRuntimeDialogData['rttc'];
		var lTextShadowColor = lRuntimeDialogData['rttsc'];
		var lTextFontName = lRuntimeDialogData['rtfn'];
		var lOKButtonString = lRuntimeDialogData['rtokb'];
		var lCancelButtonString = lRuntimeDialogData['rtcb'];
			
		//Create Message Box
		var numBtns = 1;
		if(cancelBtn)
			numBtns++;
		var lRunTimeMsgBox = new RuntimeMessageBox(document.getElementById("cpDocument"),numBtns,
										lBGFillColor,lBGStrokeColor,
										lBtnFillColor,lBtnStrokeColor,
										lSeparatorColor,lTextColor,
										lTextShadowColor,lTextFontName);
		lRunTimeMsgBox.setTitleText(iTitle);			
		lRunTimeMsgBox.setMessageText(iWarningMsg);
		lRunTimeMsgBox.setFirstButtonText(lOKButtonString);	
		lRunTimeMsgBox.registerFirstButtonHandler(lRunTimeMsgBox.hide);		
		lRunTimeMsgBox.setSecondButtonText(lCancelButtonString);	
		if(!dontShow)		
		lRunTimeMsgBox.show();			
		return lRunTimeMsgBox;
	}
	
	cp.alert = function(msg, title)
	{
		if(!title)
			title = 'Adobe Captivate';
		if(!msg)
			msg = '';
		cp.ShowWarning(msg, title);
	}
	window.alert = cp.alert;
	
	cp.removeAccessibilityOutline = function( div )
	{
		if ( ! div )
			return;
			
		switch ( cp.browser ) {
		case cp.CHROME:
		case cp.SAFARI:
			div.style.outlineStyle = 'none';
			break;
		default:
			break;
		}
		
		switch ( cp.device ) {
		case cp.IDEVICE:
		case cp.ANDROID:		
			div.style.outlineStyle = 'none';
			break;
		default:
			break;
		}
	}
		
	cp.enable = function(item)
	{
		var itemData = cp.model.data[item];
		if(itemData)
		{
			itemData.enabled = 1;
			
			if ( itemData.mdi )
			{
				if(itemData.type == cp.kCPOTTextEntryBoxItem)
				{
					var canvasItem = cp( itemData.mdi );
					if ( canvasItem )
					{
						var input = canvasItem.firstChild;
						if(input && (input.tagName == 'INPUT' || input.tagName == 'TEXTAREA'))
							input.disabled = false;
					}
				}
				
				var displayObj = displayObjectMap[itemData.mdi];
				if(displayObj)
					displayObj.enabled = 1;
			}
		}
	}

	cp.markTOCEntryComplete = function(i)
	{
		var slideData = cp.model.data[cp.movie.stage.slides[i]];
		if(slideData && slideData.tocEntry)
			slideData.tocEntry.setVisited();
	}
	
	cp.animateItem = function(item,effectId,continueProj)
	{
		var itemData = cp.model.data[item];
		if(itemData)
		{
			if(itemData.runningEffects==undefined)
				itemData.runningEffects = [];
			itemData.runningEffects.push(effectId);
			if(itemData.ef)
			{
				itemData.ef['ef'+effectId].offsetFrame = cpInfoCurrentFrame - 1;
				if(!continueProj)
					itemData.ef['ef'+effectId].startFrame = 0;
			}
		}
	}
	cp.disable = function(item)
	{
		var itemData = cp.model.data[item];
		if(itemData)
		{
			itemData.enabled = 0;
			
			if ( itemData.mdi )
			{
				if(itemData.type == cp.kCPOTTextEntryBoxItem)
				{
					var canvasItem = cp( itemData.mdi );
					if ( canvasItem )
					{
						var input = canvasItem.firstChild;
						if(input && (input.tagName == 'INPUT' || input.tagName == 'TEXTAREA'))
							input.disabled = true;
					}
				}

				var displayObj = displayObjectMap[itemData.mdi];
				if(displayObj)
					displayObj.enabled = 0;
			}
		}
	}
	cp.showHint = function(item,elem)
	{
		elem.hintFeedback = new cp.Feedback(item,null,false,cp.FeedbackType.HINT);
		elem.hintFeedback.onRollover();
	}
	cp.hideHint = function(item,elem)
	{
		if(elem && elem.hintFeedback)
			elem.hintFeedback.onRollout();
	}
	cp.addRewrapObjectAsPerRestOfProjectItem = function(aItem)
	{
		if(!aItem)
			return;
			
		var lParentContainer = cp.movie.stage.getSlideDiv().firstChild;
		if(!lParentContainer)
			return;
		
		var lLowestRewrapElemRPAOT = cp.movie.stage.m_lowestRewrapElementThatIsRestOfProjectAndOnTop;
		
		if(lLowestRewrapElemRPAOT)
			lParentContainer.insertBefore(aItem,lLowestRewrapElemRPAOT);
		else
			lParentContainer.appendChild(aItem);		
	}
	cp.addDivObjectAsPerRestOfProjectItem = function(aItem)
	{
		if(!aItem)
			return;		
		
		var lParentContainer = cp.movie.stage.getSlideDiv()
		if(!lParentContainer)
			return;
		
		var lLowestElemRPAOT = cp.movie.stage.m_lowestElementThatIsRestOfProjectAndOnTop;
		
		if(lLowestElemRPAOT)
			lParentContainer.insertBefore(aItem,lLowestElemRPAOT);
		else
			lParentContainer.appendChild(aItem);
	}
	cp.moveRewrapElemToTop = function(aItem)
	{
		if(!aItem)
			return;
		aItem.parentNode.removeChild(aItem);
		cp.addRewrapObjectAsPerRestOfProjectItem(aItem);
	}
	cp.moveDivElemToTop = function(aItem)
	{
		if(!aItem)
			return;
		aItem.parentNode.removeChild(aItem);
		cp.addDivObjectAsPerRestOfProjectItem(aItem);
	}
	cp.show = function(item)
	{
		var i = 0;
		var childArr;
		// Create an arr.
		var itemArr = new Array();
		var itemData;
		var oneItem;
		var canvasDataItem = null;
		
		itemArr.push( item );
		
		cp.movie.stage.getChildrenForParent( item, itemArr );
		
		for ( i = 0; i < itemArr.length; ++i ) {
			oneItem = itemArr[ i ];
			itemData = cp.model.data[oneItem];
			if(itemData)
			{
				itemData.visible = 1;
				// Check for canvas item.
				if ( itemData.mdi ) {
					canvasDataItem = cp.model.data[ itemData.mdi ];
					if ( canvasDataItem )
						canvasDataItem.visible = 1;
						
					var displayObj = displayObjectMap[itemData.mdi];
					if(displayObj)
					{
						displayObj.visible = 1;
						
						if(displayObj.element)
						{
							var fc = displayObj.element.firstElementChild;
							if(fc && fc.tagName == 'VIDEO')
							{
								displayObj.seekTo(displayObj.from);
								displayObj.play();
							}
						}

					}
				}
				
				var htmlItem = cp(oneItem);
				if (htmlItem)
				{
					htmlItem.style.visibility = 'visible';
					htmlItem.style.display = 'block';
				}

				if(itemData.ia)
				{
					cp.movie.am.showHideObjectAudio(itemData.ia, true);
				}

				// Find out other children.
				if(itemData.iea)
				{
					cp.movie.am.playPauseEventAudio(itemData.iea, true);
				}				
			}
			else { // Temporary HTML element - example variable in text.
				var htmlItem = cp(oneItem);
				if (htmlItem)
					htmlItem.style.visibility = 'visible';				
			}
		}
	}
	
	cp.hide = function(item)
	{
		var i = 0;
		var childArr;
		// Create an arr.
		var itemArr = new Array();
		var itemData;
		var oneItem;
		
		itemArr.push( item );
		
		cp.movie.stage.getChildrenForParent( item, itemArr );
		
		for ( i = 0; i < itemArr.length; ++i ) {
			oneItem = itemArr[ i ];
			itemData = cp.model.data[oneItem];
			if(itemData)
			{
				itemData.visible = 0;
				// Check for canvas item.
				if ( itemData.mdi ) {
					canvasDataItem = cp.model.data[ itemData.mdi ];
					if ( canvasDataItem )
						canvasDataItem.visible = 0;

					var displayObj = displayObjectMap[itemData.mdi];
					if(displayObj)
					{
						displayObj.visible = 0;
						
						if(displayObj.element)
						{
							var fc = displayObj.element.firstElementChild;
							if(fc && fc.tagName == 'VIDEO')
							{
								displayObj.pause();
							}
						}
					}
				}
				
				var htmlItem = cp(oneItem);
				if (htmlItem)
				{
					htmlItem.style.visibility = 'hidden';
				}
				
				if(itemData.ia)
				{
					cp.movie.am.showHideObjectAudio(itemData.ia, false);
				}
				if(itemData.iea)
				{
					cp.movie.am.playPauseEventAudio(itemData.iea, false);
				}
			}
			else { // Temporary HTML element - example variable in text.
				var htmlItem = cp(oneItem);
				if (htmlItem)
					htmlItem.style.visibility = 'hidden';
			}
		}
	}
	
	cp.jumpToPreviousSlide = function()
	{
		var previousSlideStartingFrame = cp.movie.stage.previousSlideStartFrame;
		if(previousSlideStartingFrame <= 0)
			previousSlideStartingFrame = 1; //jump to first frame
		
		var lCanPlayMovie = cp.movie.jumpToFrame(previousSlideStartingFrame);
		if(lCanPlayMovie)
			cp.movie.play();
	}
	
	cp.jumpToNextSlide = function()
	{
		var nextSlideStartingFrame = cp.movie.stage.nextSlideStartFrame;
		if(nextSlideStartingFrame != -1)
		{
			var lCanPlayMovie = cp.movie.jumpToFrame(nextSlideStartingFrame);
			if(lCanPlayMovie)
				cp.movie.play();
		}
		else if(!cp.movie.virgin && cp.movie.stage.slides.length - 1 == cpInfoCurrentSlideIndex)
		{
			cp.movie.play();
		}
	}
	
	cp.jumpToLastVisitedSlide = function()
	{
		cp.movie.jumpToFrame("cpInfoLastVisitedSlide");
		cp.movie.play();
	}
	
	cp.openURL = function(url, context)
	{
		window.open(encodeURI(url), context);
		cp.movie.pause();
	}
	
	cp.openMovie = function(movie, context)
	{
		return cp.openURL(movie, context);
	}
	
	cp.sendEmail = function(to)
	{
		var w;
		w = window.open('mailto:'+to, '_blank');
		if(w)
		{
			w.close();    
		}
	}
	
	cp.showMessage = function(msg)
	{
		cp.alert(msg);
	}
	
	cp.runJavascript = function(script, context)
	{
		if(cp.verbose)
			cp.log('runJavascript [' + script + ']');
		try
		{
		eval(script);
	}
		catch(e)
		{
			cp.log(e);
		}
	}
	
	cp.stopMovie = function()
	{
		//cp.log('TODO::stopMovie');
	}
	
	cp.loopMovie = function()
	{
		cpCmndGotoSlideAndResume = 0;
	}
	
	cp.closeMovie = function()
	{
		window.close();
	}
	
	cp.playAudio = function(name)
	{
		var am = cp.movie.am;

		if(am.muted || 1 != cp.movie.speed)
			return;
			
		if(am.verbose)
			cp.log('cp.playAudio ' + name);
		
		if(cp.device == cp.IDEVICE)
		{
			if(am.audioPlaying || cp.movie.stage.VideoPlaying)
			{
				if(am.verbose)
					cp.log('audioPlaying ' + am.audioPlaying + ' videoPlaying ' + cp.movie.stage.VideoPlaying);
				return;
			}
		}

		var eventAudioName = "PA" + name;
		var src = cp.model.data[eventAudioName].src;

		if(cp.device == cp.IDEVICE)
			am.singletonPlayAudio.setSrc(src);
		else
		{
			if(!am.singletonPlayAudio.nativeAudio)
				am.allocSingletonAudioChannelForPlayAudioAction(src);
			else
			{
				am.singletonPlayAudio.pause();
				am.singletonPlayAudio.setSrc(src);
			}
		}
		am.singletonPlayAudio.resetAndPlay();
	}
	
	cp.stopAudio = function(name)
	{
		cp.movie.am.singletonPlayAudio.pause();
	}
	
	cp.cv = function(a,b,c,d)
	{
		return cp.vm.createVariable(a,b,((c==1)?true:false),d);
	}
	
	cp.ho = function(operand)
	{
		if(typeof operand == "string")
		{
			var retVal;
			try
			{
				retVal = eval(operand);
			}catch(e){}

			if(undefined != retVal)
			{
				if(typeof retVal == "string")
				{
					var retVal2;
					try
					{
						retVal2 = eval(retVal);
					}catch(e){}
					
					if(undefined != retVal2)
						return retVal2;
				}
				return retVal;
			}
		}
		return operand;
	}
	
	cp.g_clickTimer = 0;
	
	cp.isClickTimerRunning = function()
	{
		return 0 != cp.g_clickTimer;
	}

	cp.startClickTimer = function( t, callback )
	{
		if ( ! cp.isClickTimerRunning() ) 
			cp.g_clickTimer = setInterval( callback, t );
	}
	
	cp.stopClickTimer = function()
	{
		if ( cp.isClickTimerRunning() ) {
			clearInterval( cp.g_clickTimer );
			cp.g_clickTimer = 0;
		}
	}
	
	cp.clickSuccessHandler = function(obj) 
	{ 
		if (obj) 
		{ 
			if(obj.cpa == false)
				obj.clickedOnce = true; 
			var pauseSlideAudioOnClick = obj['ssc'];
			if(pauseSlideAudioOnClick)
				cp.movie.am.pauseCurrentSlideAudioForInteractiveClick();
			
			var clickAudio = obj['ca'];
			if(clickAudio)
				cp.movie.am.playPauseEventAudio(clickAudio, true);
			
			var successCaptionToBeShown = obj['osct']; 
			var successCaption = obj['osc']; 
			var action = obj['oca']; 
			var feedbackaction = null;
			var showfeedback = true;

            if (successCaption == undefined)
               showfeedback = false;

			if ((successCaption != undefined) && (successCaption.length < 2))
				showfeedback = false;

			if (successCaptionToBeShown && showfeedback) // Wait for feedback.
				feedbackaction = action;
			var pa = obj.pa;
			var pauseMovie = obj.pfc == 1 && successCaptionToBeShown;
			if (obj.handled)
				pauseMovie = false;
			var feedback = null;
			if (showfeedback)
				feedback = new cp.Feedback(successCaption, feedbackaction, pauseMovie, cp.FeedbackType.SUCCESS, obj);
			if ( ! successCaptionToBeShown || ! showfeedback)
				cp.movie.executeAction(action); 
			if (showfeedback)
				feedback.show();
			return true;
		}	 
		return false;
	} 

	cp.clickFailureHandler = function(obj,shouldExecuteAction) 
	{ 
        var retVal = false;
		if (obj) 
		{ 
			// In case this has been handled and success action is continue, failure should not be executed.
			if ( obj.handled ) {
				var successStr = obj[ 'oca' ];
				if ( "cpCmndResume = 1;" == successStr )
					return true;
			}
			var failureCaptionToBeShown = obj['ofct']; 
			var failureCaption = obj['ofc']; 
			var action = obj['ofa']; 
			
			var showfeedback = true;
			if(!failureCaption || failureCaption.length < 2)
				showfeedback = false;

			var feedbackaction = null;
			if (failureCaptionToBeShown && shouldExecuteAction && showfeedback) 
				feedbackaction = action;

			var feedback = null;
			if (showfeedback)
				feedback = new cp.Feedback(failureCaption, feedbackaction, false, cp.FeedbackType.FAILURE, obj); // Failure feedback should not pause movie.
            retVal = true;        
			if ( (! failureCaptionToBeShown || ! showfeedback) && shouldExecuteAction)
			{
				if(obj.cpa == false)
					obj.clickedOnce = true; 
				cp.movie.executeAction(action); 
			}	
            else
                retVal = false;
			if (showfeedback)
				feedback.show();
            else
                retVal = false;			
		}	 
		
        return retVal;
	} 
	
	cp.cbKH = function(obj, objc, isCorrectKey)
	{
		if(!obj)
			return false;
		
		// Check whether visible and enabled.
		if ( ! ((obj && obj.enabled) && (objc && objc.visible)) )
			return false;
	
		if ( obj.actionInProgress )
			return false;
			
		//Submit Interactions
		var lObjId;
		var lCurrentAttempt = 0;
		var retVal = false;
		
		var cAttempt = obj.currentAttempt;
		if (cAttempt != undefined)
			lCurrentAttempt = cAttempt;
		
		if(objc!=undefined)
			lObjId = objc.dn;
		
		if ( isCorrectKey ) {
			if(lObjId)
				SubmitInteractions(lObjId, true, lCurrentAttempt);
			retVal = cp.clickSuccessHandler(obj);
			obj.handled = true;
			return retVal;
		}
		// Failure case.
		var maxAttempts = obj['ma'];
		lCurrentAttempt = lCurrentAttempt + 1;
		obj.currentAttempt = lCurrentAttempt;
		
		var shouldExecuteAction = (maxAttempts != -1 && lCurrentAttempt >= maxAttempts);
		
		if(lObjId)
			SubmitInteractions(lObjId, false, lCurrentAttempt-1);	
		retVal = cp.clickFailureHandler(obj, shouldExecuteAction);
		if ( ! obj.handled )
			obj.handled = shouldExecuteAction;
		return retVal;
	}
	
	cp.qbKH = function(obj, objc, isCorrectKey)
	{
		if(!obj )
			return false;
		if( !objc)
			return false;		
		// Check whether visible and enabled.
		if ( ! ( obj.enabled && objc.visible) )
			return false;		
		var lQuestionButtonType = obj.qbt;
		if(!lQuestionButtonType)
			return false;
		if(!isCorrectKey)
			return false;
		var lDivName = objc.dn;
		if(!lDivName)
			return false;
		var lObjDiv =  document.getElementById(lDivName);
		if(!lObjDiv)
			return false;
		
		var retVal = false;
		switch(lQuestionButtonType)
		{
			case 'clear':
				{
					quizClearButtonClickHandler(lObjDiv);
					retVal = true;
				}
				break;			
			case 'back':
				{
					quizBackButtonClickHandler(lObjDiv);
					retVal = true;
				}
				break;			
			case 'skip':
				{
					quizSkipButtonClickHandler(lObjDiv);
					retVal = true;
				}
				break;			
			case 'submit':
				{
					quizSubmitButtonClickHandler(lObjDiv);
					retVal = true;
				}
				break;
			case 'submitAll':
				{
					quizSubmitAllButtonClickHandler(lObjDiv);
					retVal = true;
				}
				break;
			case 'continue':
				{
					quizContinueButtonClickHandler(lObjDiv);
					retVal = true;
				}
				break;
			case 'review':
				{
					quizReviewButtonClickHandler(lObjDiv);
					retVal = true;
				}
				break;
			case 'retake':
				{
					quizRetakeButtonClickHandler(lObjDiv);
					retVal = true;
				}
				break;
			default: break;
		}
		return retVal;
	}
	
	cp.isTEBValueCorrect = function( tebDivName, obj )
	{
		var isToBeValidated = obj.vuin;
		if ( ! isToBeValidated )
			return true; // always correct.
			
		var inputFieldName = tebDivName + '_inputField'; 
		var input = document.getElementById( inputFieldName );
		if ( ! input )
			return false;
			
		var currentValue = input.value;
		var expectedStrings = obj.exp || []; 
		var isCaseSensitive = obj.cs;
		var totalExpectedStrings = expectedStrings.length; 
		var isCorrect = false; 
		
		// Edge case.
		if ( 0 == totalExpectedStrings && '' == currentValue )
			return true; // Correct.
		
		for ( var i = 0; i < totalExpectedStrings && ! isCorrect; ++i ) { 
			if ( isCaseSensitive ) 
				isCorrect = ( currentValue == expectedStrings[ i ] ); 
			else 
				isCorrect = ( currentValue.toLowerCase() == expectedStrings[ i ].toLowerCase() ); 
		}		 
		
		return isCorrect;
	}
	
	cp.tebKH = function( obj, objc, isCorrectKey )
	{
		var isAnswerCorrect = false;
		var lCurrentAttempt = 0;
		var cAttempt;
		var maxAttempts = 1000;
		var shouldExecuteAction = false;
		var lObjId;
		
		if(!obj)
			return false;
		
		if ( objc && objc.keyHandledOnce ) {
			objc.keyHandledOnce = false;
			return false;
		}
		
		if ( ! isCorrectKey )
			return false;
			
		if ( obj && obj.handled )
			return false;
			
		// Check whether visible and enabled.
		if ( ! ((obj && obj.enabled) && (objc && objc.visible)) )
			return false;

		cAttempt = obj.currentAttempt;
		if (cAttempt != undefined)
			lCurrentAttempt = cAttempt;
		
		if(objc!=undefined)
			lObjId = objc.dn;
		
		// Check whether answer is correct.
		isAnswerCorrect = cp.isTEBValueCorrect( obj.id, obj );
		
		if ( isAnswerCorrect ) {
			obj.handled = true;
			if(lObjId)
				SubmitInteractions(lObjId, true, lCurrentAttempt);
			return cp.clickSuccessHandler( obj );
		}
		// Failure case.
		maxAttempts = obj[ 'ma' ];
		lCurrentAttempt = lCurrentAttempt +1;
		obj.currentAttempt = lCurrentAttempt;
		
		shouldExecuteAction = ( maxAttempts != -1 && lCurrentAttempt >= maxAttempts );
		if ( ! obj.handled )
			obj.handled = shouldExecuteAction;
		
		if(lObjId)
			SubmitInteractions(lObjId, false, lCurrentAttempt-1);
		return cp.clickFailureHandler( obj, shouldExecuteAction );		
	}
	
	cp.ClickData = function( obj, objc, htmlElem )
	{
		this.m_obj = obj;
		this.m_objc = objc;
		this.m_htmlElem = htmlElem;
		this.m_from = obj.from;
		this.m_to = obj.to;
	}
	
	cp.ClickData.prototype.isValid = function()
	{
		return undefined != this.m_obj && undefined != this.m_objc && undefined != this.m_htmlElem && (this.m_to >= this.m_from);
	}
	
	cp.ClickData.prototype.isClickable = function( currFrame )
	{
		if ( ! ( ( this.m_obj && this.m_obj.enabled ) && ( this.m_objc && this.m_objc.visible ) ) )
			return false;
		return this.m_from <= currFrame && currFrame <= this.m_to;
	}
	
	cp.preventEventDefault = function( event )
	{
		if ( event ) {
			if ( event.preventDefault )
				event.preventDefault();
			else
				event.returnValue = false;
		}
	}

	cp.IsPointWithElem = function( elem, x, y, minX, minY, maxX, maxY ) 
	{
		var rot = 0, tempX = x, tempY = y, newX = 0, newY = 0;
		if ( elem.rotateAngle )
			rot = elem.rotateAngle;
		tempX -= ( minX + maxX ) / 2;
		tempY -= ( minY + maxY ) / 2;
		newX = tempX * Math.cos( ( Math.PI * ( -rot ) ) / 180 ) - tempY * Math.sin( ( Math.PI * ( -rot ) ) / 180 );
		newY = tempX * Math.sin( ( Math.PI * ( -rot ) ) / 180 ) + tempY * Math.cos( ( Math.PI * ( -rot ) ) / 180 );
		newX += ( minX + maxX ) / 2;
		newY += ( minY + maxY ) / 2;
		if ( ( newX >= minX && newX <= maxX ) && ( newY >= minY && newY <= maxY ) )
			return true;
		return false;
	}
	
	cp.handleDblClick = function( event )
	{
		var clickManager = null;
		var clickDataArr = null;
		var clickData = null;
		var lScaledPosition = getScaledPosition(event.pageX, event.pageY);
		var x = lScaledPosition.X;// - cp.movie.offset;
		var y = lScaledPosition.Y;// - cp.movie.topOffset;
		var minX = 0, minY = 0, maxX = 0, maxY = 0;
		var divElem = null;
		var retVal = false;
		var i = 0;
				
		// Check whether there is any double click in the click region.
		clickManager = cp.movie.stage.getClickManager();
		clickDataArr = clickManager.getDoubleClickArr( cpInfoCurrentFrame );
		if ( null == clickDataArr || 0 == clickDataArr.length )
			return;

		// Remove timer for mouse down if present.
		cp.stopClickTimer();
		for ( i = 0; i < clickDataArr.length; ++i ) { 
			clickData = clickDataArr[ i ];
			if ( ! clickData )
				continue;
			divElem = clickData.m_htmlElem;
			if ( clickData.m_obj && clickData.m_obj.actionInProgress )
				continue;
			
			// Do success click check. Failure will already be handled by click code.
			minX = parseFloat( divElem.style.left );
			minY = parseFloat( divElem.style.top );
			maxX = minX + parseFloat( divElem.style.width );
			maxY = minY + parseFloat( divElem.style.height );
			
			if ( divElem.effectX ) {
				minX += divElem.effectX;
				maxX += divElem.effectX;
			}
			if ( divElem.effectY ) {
				minY += divElem.effectY;
				maxY += divElem.effectY;
			}
						
			// If handled, set handled true and remove the handler.
			if ( clickData.m_obj && cp.IsPointWithElem( divElem, x, y, minX, minY, maxX, maxY ) ) {
				var lCurrentAttempt = 0;
				var lObjId;
				var lObjC;
				var cAttempt = clickData.m_obj.currentAttempt;
				if (cAttempt != undefined)
					lCurrentAttempt = cAttempt;
				if(clickData.m_obj.mdi)
					lObjC = cp.model.data[clickData.m_obj.mdi];
				if(lObjC!=undefined)
					lObjId = lObjC.dn;
				if(lObjId)
					SubmitInteractions(lObjId, true, lCurrentAttempt);
				retVal = cp.clickSuccessHandler( clickData.m_obj );
				clickData.m_obj.handled = true;
				return;
			}
		}
		// Exhausted success, so, go for failure, with first one.
		clickData = clickDataArr[ 0 ];
		if ( clickData && clickData.m_obj && ! clickData.m_obj.actionInProgress ) 
		{
			var canvasItem = clickData.m_obj.mdi;
			var isVisible = cp.model.data[ canvasItem ].visible;	
			
			var currentAttempt = 0;
			var cAttempt = clickData.m_obj.currentAttempt;
			if (cAttempt != undefined)
				currentAttempt = cAttempt;

			currentAttempt = currentAttempt + 1;
			clickData.m_obj[ 'currentAttempt' ] = currentAttempt;
			
			var maxAttempts = clickData.m_obj[ 'ma' ];			
			var shouldExecuteAction = ( maxAttempts != -1 && currentAttempt >= maxAttempts ) && ( isVisible );		

			var lObjId;
			var lObjC;
			if(clickData.m_obj.mdi)
				lObjC = cp.model.data[clickData.m_obj.mdi];
			if(lObjC!=undefined)
				lObjId = lObjC.dn;
			if(lObjId)
				SubmitInteractions(lObjId, false, currentAttempt-1);
				
			cp.clickFailureHandler( clickData.m_obj, shouldExecuteAction );
			if ( ! clickData.m_obj.handled )
				clickData.m_obj.handled = shouldExecuteAction;
		}	
	}
	
	cp.handleRightClick = function(event)
	{
		var clickManager = null;
		var clickDataArr = null;
		var clickData = null;
		var lScaledPosition = getScaledPosition(event.pageX, event.pageY);
		var x = lScaledPosition.X;// - cp.movie.offset;
		var y = lScaledPosition.Y;// - cp.movie.topOffset;
		var minX = 0, minY = 0, maxX = 0, maxY = 0;
		var divElem = null;
		var retVal = false;
		var i = 0;
		
		// Check whether there is any double click in the click region.
		clickManager = cp.movie.stage.getClickManager();
		clickDataArr = clickManager.getRightClickArr( cpInfoCurrentFrame );
		if ( null == clickDataArr || 0 == clickDataArr.length )
			return;
		
		// Remove timer for mouse down if present.
		cp.stopClickTimer();
		
		for ( i = 0; i < clickDataArr.length; ++i ) { 
			clickData = clickDataArr[ i ];
			if ( ! clickData )
				continue;
		
			if ( clickData.m_obj && clickData.m_obj.actionInProgress )
				continue;
			divElem = clickData.m_htmlElem;
			
			// Do success click check. Failure will already be handled by click code.
			minX = parseFloat( divElem.style.left );
			minY = parseFloat( divElem.style.top );
			maxX = minX + parseFloat( divElem.style.width );
			maxY = minY + parseFloat( divElem.style.height );

			if ( divElem.effectX ) {
				minX += divElem.effectX;
				maxX += divElem.effectX;
			}
			if ( divElem.effectY ) {
				minY += divElem.effectY;
				maxY += divElem.effectY;
			}
			
			// If handled, set handled true and remove the handler.
			if ( clickData.m_obj && cp.IsPointWithElem( divElem, x, y, minX, minY, maxX, maxY ) ) {
				var lCurrentAttempt = 0;
				var lObjId;
				var lObjC;
				var cAttempt = clickData.m_obj.currentAttempt;
				if (cAttempt != undefined)
					lCurrentAttempt = cAttempt;
				if(clickData.m_obj.mdi)
					lObjC = cp.model.data[clickData.m_obj.mdi];
				if(lObjC!=undefined)
					lObjId = lObjC.dn;
				if(lObjId)
					SubmitInteractions(lObjId, true, lCurrentAttempt);
					
				retVal = cp.clickSuccessHandler( clickData.m_obj );
				clickData.m_obj.handled = true;
				if ( retVal ) 
					cp.preventEventDefault( event ); // prevent default.
				return;
			}
		}
		// Exhausted success, so, go for failure, with first one.
		clickData = clickDataArr[ 0 ];
		if ( clickData && clickData.m_obj && ! clickData.m_obj.actionInProgress ) {
			var canvasItem = clickData.m_obj.mdi;
			var isVisible = cp.model.data[ canvasItem ].visible;	
			
			var currentAttempt = 0;
			var cAttempt = clickData.m_obj.currentAttempt;
			if (cAttempt != undefined)
				currentAttempt = cAttempt;

			currentAttempt = currentAttempt + 1;
			clickData.m_obj[ 'currentAttempt' ] = currentAttempt;
			
			var maxAttempts = clickData.m_obj[ 'ma' ];			
			var shouldExecuteAction = ( maxAttempts != -1 && currentAttempt >= maxAttempts ) && ( isVisible );		
			
			var lObjId;
			var lObjC ;
			if(clickData.m_obj.mdi)
				lObjC = cp.model.data[clickData.m_obj.mdi];
			if(lObjC!=undefined)
				lObjId = lObjC.dn;
			if(lObjId)
				SubmitInteractions(lObjId, false, currentAttempt-1);					
			cp.clickFailureHandler( clickData.m_obj, shouldExecuteAction );
			if ( ! clickData.m_obj.handled )
				clickData.m_obj.handled = shouldExecuteAction;
		}	
	}
	cp.handleMouseOut = function(event)
	{
		if(cp.device != cp.IDEVICE)
		{
			//this.onmousemove = null;
			var slideDiv = cp.movie.stage.getSlideDiv();
			if (slideDiv)
			{
				slideDiv.touchstartX = null;
				slideDiv.isMoving = false;
			}
		}
		else {
			//this.ontouchmove = null;
		}
	}
	cp.handleMouseMove = function(event)
	{
		var playbar = document.getElementById('playbar');	
		if(playbar!=undefined && playbar.animator)
		{
			playbar.animator.showPlaybar(cpInfoCurrentFrame >= cp.movie.stage.lastFrame ? true : false);
		}
		if(cp.device == cp.IDEVICE)
		{
			if (event.preventDefault) {
				event.preventDefault(); 
			}

			var slideDiv = cp.movie.stage.getSlideDiv();
			if (slideDiv && slideDiv.showTOC) 
			{
				if(slideDiv.isMoving && event.touches.length) 
				{
					var x = event.touches[0].pageX;
					var dx = slideDiv.touchstartX - x;
					if(Math.abs(dx) >= 50) 
					{
						slideDiv.touchstartX = null;
						slideDiv.isMoving = false;						
						var toc = document.getElementById('toc');
						if(toc!=undefined && toc.animator)
						{
							if((dx > 0 && slideDiv.swipeDir == 0)||
								(dx < 0 && slideDiv.swipeDir == 1))								
									toc.animator.showTOC();
							else if((dx < 0 && slideDiv.swipeDir == 0)||
								(dx > 0 && slideDiv.swipeDir == 1))
								toc.animator.hideTOC();
						}
					}
				}
    		 }
		}
	}
	cp.handleMouseOver = function(event)
	{
		var playbar = document.getElementById('playbar');	
		if(playbar!=undefined && playbar.animator)
		{
			playbar.animator.showPlaybar(cpInfoCurrentFrame >= cp.movie.stage.lastFrame ? true : false);
		}
		if(cp.device != cp.IDEVICE)
		{
		if(this.onmousemove == null)
			this.onmousemove = cp.handleMouseMove;
	}
		else
		{
			if(this.ontouchmove == null)
				 this.ontouchmove = cp.handleMouseMove;
		}
		if(cp.device == cp.IDEVICE)
		{
			var slideDiv = cp.movie.stage.getSlideDiv();
			if (slideDiv && slideDiv.showTOC) 
			{
				if (event.touches.length) 
				{	
					slideDiv.touchstartX = event.touches[0].pageX;
					slideDiv.isMoving = true;
				}
			}
		 }
	}
	cp.ClickManager = function()
	{
		this.m_rightClickArr = [];
		this.m_doubleClickArr = [];
	}
	
	cp.ClickManager.prototype.addRightClick = function( obj, objc, htmlElem )
	{
		var data = new cp.ClickData( obj, objc, htmlElem );
		this.m_rightClickArr.push( data );
	}
		
	cp.ClickManager.prototype.addDoubleClick = function( obj, objc, htmlElem )
	{
		var data = new cp.ClickData( obj, objc, htmlElem );
		this.m_doubleClickArr.push( data );
	}
	
	cp.ClickManager.prototype.removeRightClick = function( obj )
	{
		var i = 0; 
		for ( i = 0; i < this.m_rightClickArr.length; ++i ) {
			if ( this.m_rightClickArr[ i ].m_obj == obj ) {
				this.m_rightClickArr.splice( i, 1 );
				return;
			}
		}
	}
	
	cp.ClickManager.prototype.removeDoubleClick = function( obj )
	{
		var i = 0; 
		for ( i = 0; i < this.m_doubleClickArr.length; ++i ) {
			if ( this.m_doubleClickArr[ i ].m_obj == obj ) {
				this.m_doubleClickArr.splice( i, 1 );
				return;
			}
		}
	}
		
	cp.ClickManager.prototype.clearClicks = function()
	{
		this.m_rightClickArr = [];
		this.m_doubleClickArr = [];
	}
	
	cp.ClickManager.prototype.getRightClickArr = function( currFrame )
	{
		var arr = new Array();
		var i = 0;
		for ( i = this.m_rightClickArr.length - 1; i >= 0; --i ) {
			if ( this.m_rightClickArr[ i ].isClickable( currFrame ) )
				arr.push( this.m_rightClickArr[ i ] );
		}
		return arr;
	}
	
	cp.ClickManager.prototype.getDoubleClickArr = function( currFrame )
	{
		var arr = new Array();
		var i = 0;
		for ( i = this.m_doubleClickArr.length - 1; i >= 0; --i ) {
			if ( this.m_doubleClickArr[ i ].isClickable( currFrame ) ) {
				arr.push( this.m_doubleClickArr[ i ] );			
			}
		}
		return arr;
	}

	cp.Shortcut = function(keyCode, isCtrl, isShift, isAlt)
	{
		this.m_keyCode = (undefined != keyCode) ? keyCode : null;
		this.m_isCtrl = (undefined != isCtrl && isCtrl) ? isCtrl : false;
		this.m_isShift = (undefined != isShift && isShift) ? isShift : false;
		this.m_isAlt = (undefined != isAlt && isAlt) ? isAlt : false;
	}
	
	cp.Shortcut.prototype.isValid = function()
	{
		return this.m_keyCode != undefined && this.m_keyCode != null;
	}
	
	cp.Shortcut.prototype.isSame = function( shortcut )
	{
		return this.m_keyCode == shortcut.m_keyCode
			&& this.m_isCtrl == shortcut.m_isCtrl
			&& this.m_isShift == shortcut.m_isShift
			&& this.m_isAlt == shortcut.m_isAlt;
	}
	
	cp.getShortCutFromKeyEvent = function( event )
	{
		// Update from event.
		var shift 	= 1 == event.shiftKey;
		var ctrl 	= 1 == event.ctrlKey;
		var alt 	= 1 == event.altKey ;
			
		return new cp.Shortcut( event.keyCode, ctrl, shift, alt );
	}
	
	cp.KeyHandler = function(handler, shortcut, startFrame, endFrame,name)
	{
		this.m_handler = handler;
		this.m_shortcut = null;
		if (shortcut instanceof cp.Shortcut)
			this.m_shortcut = shortcut;
		this.m_startFrame = startFrame;
		this.m_endFrame = endFrame;
        this.m_name = name;        
	}
	
	cp.KeyHandler.prototype.isValid = function()
	{
		return this.m_handler && this.m_shortcut;
	}
	
	cp.SHIFT = 16;
	cp.CONTROL = 17;
	cp.ALT	= 18;
	
	cp.KeyManager = function()
	{
		this.m_keys = [];
		this.m_ctrl = false;
		this.m_alt = false;
		this.m_shift = false;
		this.m_keyHandlers = [];
	}
	
	cp.KeyManager.prototype.handleKeyDown = function(event)
	{
		var self = this;
		
		function addKey(event) 
		{
			var handled = false;
			if (event.keyCode == cp.SHIFT) 
				handled = self.m_shift = true;
			else if (event.keyCode == cp.CONTROL) 
				handled = self.m_ctrl = true;
			else if (event.keyCode == cp.ALT) 
				handled = self.m_alt = true;
			
			// Update from event.
			self.m_shift = 1 == event.shiftKey;
			self.m_ctrl = 1 == event.ctrlKey;
			self.m_alt 	= 1 == event.altKey ;
			
			if (handled)
				return;
				
			for (var i = 0; i < self.m_keys.length; ++i)
			{
				if (event.keyCode == self.m_keys[ i ])
					return; // already there.
			}
			
			self.m_keys.push( event.keyCode );
		}
		
		addKey(event);
		//if (this.check(event))
			//event.preventDefault();
	}
	
	cp.KeyManager.prototype.handleKeyUp = function(event)
	{
		var self = this;
		
		function removeKey(event)
		{
			var handled = false;
			if (event.keyCode == cp.SHIFT) {
				self.m_shift = false;
				handled = true;
			}
			else if (event.keyCode == cp.CONTROL) {
				self.m_ctrl = false;
				handled = true;
			}
			else if (event.keyCode == cp.ALT) {
				self.m_alt = false;
				handled = true;
			}
			
			// Update from event.
			self.m_shift = 1 == event.shiftKey;
			self.m_ctrl = 1 == event.ctrlKey;
			self.m_alt 	= 1 == event.altKey ;
			
			if (handled)
				return;
			
			for (var i = 0; i < self.m_keys.length; ++i)
			{
				if (event.keyCode == self.m_keys[ i ]) {
					self.m_keys.splice( i, 1 );
					return; 
				}
			}		
		}	
		this.check(event);
		removeKey(event);
	}

	cp.KeyManager.prototype.handleFocusOut = function(event)
	{
		this.m_keys = [];
		this.m_ctrl = false;
		this.m_alt = false;
		this.m_shift = false;
	}
	
	cp.KeyManager.prototype.check = function(event)
	{
		var keyHandler = null;
		var currFrame = cpInfoCurrentFrame;		
		var self = this;
		var i = 0;
		var matched = false;
		var firstHandler = null;
		
		// At least one key must be pressed.
		if (this.m_keys.length == 0)
			return false;

		function keyMatch( shortcut )
		{
			var bFound	= false;
			for (var i = 0; i < self.m_keys.length && ! bFound; ++i) {
				if (shortcut.m_keyCode == self.m_keys[ i ])
					bFound = true;
			}
			
			if (! bFound)
				return false;
			return self.m_ctrl == shortcut.m_isCtrl
				&& self.m_shift ==  shortcut.m_isShift
				&& self.m_alt == shortcut.m_isAlt;
		}
		
		// First give to folks who were able to handle.
		for (i = 0; i < this.m_keyHandlers.length; ++i) {
			keyHandler	= this.m_keyHandlers[ i ];
			if (keyHandler.m_startFrame <= currFrame && keyHandler.m_endFrame >= currFrame) {
				matched =  keyMatch( keyHandler.m_shortcut );
				if ( matched ) {
					firstHandler = keyHandler;
					if ( keyHandler.m_handler( matched ) ) 
						return true; // handled.
					break;
				}
			}
		}
		
		// Now for false/unhandled case.
		for (i = 0; i < this.m_keyHandlers.length; ++i) {
			keyHandler	= this.m_keyHandlers[ i ];
			if ( firstHandler == keyHandler )
				continue; // This had already got it's chance.
            if ( keyHandler.m_shortcut.isValid() == false)
                continue;
			if (keyHandler.m_startFrame <= currFrame && keyHandler.m_endFrame >= currFrame) {
				if ( keyHandler.m_handler( false ) ) 
					return true; // handled.
			}
		}
		
           //check the element which is focussed
       
        var code;
        
        //find the keycode
        if (event.keyCode) 
            code = event.keyCode;
	    else if (event.which) 
            code = event.which;	   

        //now handle the object keys
        if ((code == 13) || (code == 32))
        {
            var targ;
            var elementname = '';

            //find the element
            if (event.target) 
                targ = event.target;
	        else if (event.srcElement) 
                targ = event.srcElement;
	
            if (targ.nodeType == 3)
		        targ = targ.parentNode;
        
            if (targ)
                elementname = targ.id;

            if (elementname != '')
            {
                //find the event handler for this object
                for (i = 0; i < this.m_keyHandlers.length; ++i) {
			        keyHandler	= this.m_keyHandlers[ i ];
			        if ( keyHandler.m_name != elementname )
				        continue; // This had already got it's chance.
			    
                    if (keyHandler.m_startFrame <= currFrame && keyHandler.m_endFrame >= currFrame) {
                        if ( keyHandler.m_handler( true ) ) 
					        return true; // handled.
                        }
			    
		        }
            }
        }

       
		
		return false;
	}
	
	cp.KeyManager.prototype.addHandler = function(keyHandler)
	{
		if (! keyHandler)
			return;
			
		if (keyHandler.isValid())
			this.m_keyHandlers.push( keyHandler );
	}
	
	cp.KeyManager.prototype.clearHandlers = function()
	{
		this.m_keyHandlers = [];
	}
	
	cp.getGradientSvgStr = function(gObj, width, height)
	{
		var gradStr = '';
		var gradientTag = '';
		if (!gObj.cs || gObj.cs.length < 2)
			return '';
		if (0 == gObj.t) {
			gradientTag = 'linearGradient';
			if (undefined == gObj.x1 || undefined == gObj.x2 || undefined == gObj.y1 || undefined == gObj.y2)
				return ''; // Invalid.
		}
		else if (1 == gObj.t) {
			gradientTag = 'radialGradient';
			if (undefined == gObj.cx || undefined == gObj.cy || undefined == gObj.r)
				return ''; // Invalid.			
		}
		else
			return '';
		var svgStart = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">';
		var svgEnd	= '</svg>';
		var topTag = '<' + gradientTag + ' id="grad1" gradientUnits="userSpaceOnUse"';
		if (0 == gObj.t) 
			topTag += (' x1="' + gObj.x1 + '" y1="' + gObj.y1 + '" x2="' + gObj.x2 + '" y2="' + gObj.y2 + '"');
		else {
			topTag += (' cx="' + gObj.cx + '" cy="' + gObj.cy + '" r="' + gObj.r + '"');
			if (undefined != gObj.tf && undefined != gObj.tf.x && undefined != gObj.tf.y) {
				topTag += (' gradientTransform="translate(' + gObj.tf.x + ' ' + gObj.tf.y + ')"');
			}
		}
		var smStr = 'pad';
		if (undefined != gObj.s) {
			if (1 == gObj.s)
				smStr = 'reflect';
			else if (2 == gObj.s)
				smStr = 'repeat';			
		}
		topTag += (' spreadMethod="' + smStr + '">');
		var stopStr = '';
		// Now for the color stops.
		for (var i = 0; i < gObj.cs.length; ++i) {
			var cs = gObj.cs[i];
			stopStr += ('<stop offset="' + cs.p + '%" style="stop-color:' + cs.c + ';stop-opacity:' + cs.o + '" />');
		}
		var rectStr = ('<rect x="0" y="0" width="' + width + '" height="' + height + '" fill="url(#grad1)"/>');
		gradStr = svgStart + '<defs>' + topTag + stopStr + '</' + gradientTag + '></defs>' + rectStr + svgEnd;
		return gradStr;
	}
	
	cp.getGradientFill = function(gObj, ctx)
	{
		if (!ctx || !gObj.cs || gObj.cs.length < 2)
			return null;
		var grad = null;
		if (0 == gObj.t) {
			if (undefined == gObj.x1 || undefined == gObj.x2 || undefined == gObj.y1 || undefined == gObj.y2)
				return null; // Invalid.
			grad = ctx.createLinearGradient( gObj.x1, gObj.y1, gObj.x2, gObj.y2 );
		}
		else if (1 == gObj.t) {
			if (undefined == gObj.cx || undefined == gObj.cy || undefined == gObj.r)
				return null; // Invalid.	
			var x = gObj.cx;
			var	y = gObj.cy;
			if (undefined != gObj.tf && undefined != gObj.tf.x && undefined != gObj.tf.y) {
				x += gObj.tf.x;
				y += gObj.tf.y;
			}
			grad = ctx.createRadialGradient( x, y, 0, x, y, gObj.r);
		}
		else
			return null;
		// Spread method is ignored.
		// Now for the color stops.
		for (var i = 0; i < gObj.cs.length; ++i) {
			var cs = gObj.cs[i];
			var colorStr = getRGBA( cs.c, cs.o );
			grad.addColorStop( cs.p / 100, colorStr );
		}
		return grad;
	}
	
	cp.drawLineCapStyle = function( gc, x1, y1, x2, y2, lineColor, lineWidth, capStyle, endLocation )
	{
		var R = Math.sqrt( ( x2 - x1 ) * ( x2 - x1 ) + ( y2 - y1 ) * ( y2- y1 ) );
		if ( R == 0)
			return;

		switch ( capStyle ) {
			case 1: // Arrow
				cp.drawSquareCap( gc, x1, y1, x2, y2, lineColor, lineWidth, endLocation );
				break;
			case 2: // Round
				cp.drawRoundCap( gc, x1, y1, x2, y2, lineColor, lineWidth, endLocation );
				break;
			case 3: // Diamond
				cp.drawDiamondCap( gc, x1, y1, x2, y2, lineColor, lineWidth, endLocation );
				break;
			case 4: // Square
				cp.drawArrowCap( gc, x1, y1, x2, y2, lineColor, lineWidth, endLocation );
				break;
			default: // None or other
			{
				break;
			}
		}
	}
	
	cp.drawRoundCap = function( gc, x1, y1, x2, y2, lineColor, lineWidth, endLocation )
	{
		var centerX = 0, centerY = 0;
		var strokeRadius = 0;
		var arrowHeadLength = 0, strokeCorrection = 0, sinHeadAngle = 0;
		
		sinHeadAngle = Math.sin( 0.349 ); 
		arrowHeadLength = 4;	//Note: HardCoded Number are in sync with Stage (CPDrawingPainter)
		strokeCorrection = lineWidth / ( 2.0 * sinHeadAngle );
		// Adjust arrowhead  length to correct for stroke width
		arrowHeadLength += strokeCorrection ;	
		strokeRadius = arrowHeadLength / 2;
		
		if ( 0 == endLocation ) {
			centerX = x1;
			centerY = y1;
		}
		else {
			centerX = x2;
			centerY = y2;				
		}
		gc.save();
		gc.beginPath();
		gc.arc( centerX, centerY, strokeRadius, 0, 2 * Math.PI, false );
		gc.closePath();
		gc.fillStyle = lineColor;
		gc.fill();
		
		gc.restore();
	}
	
	cp.drawSquareCap = function( gc, x1, y1, x2, y2, lineColor, lineWidth, endLocation )
	{
		var strokeRadius = 0;
		var centerX = 0, centerY = 0;
		var xDelta = 0, xDist = 0, yDist = 0, xPerpDist = 0, yPerpDist = 0; 
		var slope = 0;
		
		var arrowHeadLength = 0, strokeCorrection = 0, sinHeadAngle = 0;
		
		sinHeadAngle = Math.sin( 0.349 ); 
		arrowHeadLength = 4;	//Note: HardCoded Number are in sync with Stage (CPDrawingPainter)
		strokeCorrection = lineWidth / ( 2.0 * sinHeadAngle );
		// Adjust arrowhead  length to correct for stroke width
		arrowHeadLength += strokeCorrection;	
		strokeRadius = arrowHeadLength / 2;
		
		if ( 0 == endLocation ) {//cap at Start Point
			centerX = x1; 
			centerY = y1;
		}
		else {
			centerX = x2; 
			centerY = y2;
		}

		xDelta = x2 - x1;
		if ( xDelta == 0 ) {
			xDist = 0;
			yDist = strokeRadius;
	
			xPerpDist = strokeRadius;
			yPerpDist = 0;
		}
		else {
			// First need to find the slope of the current line
			slope = (y2 - y1) / xDelta;		
			if ( slope != 0 ) {
				xDist = Math.sqrt( ( strokeRadius * strokeRadius ) / ( slope * slope + 1 ) );
				yDist = slope * xDist;		
				slope = -1.0 / slope;
	
				// Plug into formula derived from Pythags and equation for a line:
				//        ________________
				//		  |      d^2         d = barLength
				// x =	  |    ------
				//      \/     m^2 + 1       m = slope
	
				xPerpDist = Math.sqrt( ( strokeRadius * strokeRadius ) / ( slope * slope + 1 ) );
				yPerpDist = slope * xPerpDist;
			}
			else
			{
				xDist = strokeRadius;
				yDist = 0;		
				xPerpDist = 0;
				yPerpDist = strokeRadius;
			}
		}

		gc.save();
		gc.beginPath();
		gc.moveTo( centerX - xDist - xPerpDist, centerY - yDist - yPerpDist );
		gc.lineTo( centerX + xDist - xPerpDist, //point2
				centerY + yDist - yPerpDist );
		gc.lineTo( centerX + xDist + xPerpDist, //point3
				centerY + yDist + yPerpDist );
		gc.lineTo( centerX - xDist + xPerpDist, //point4
			   centerY - yDist + yPerpDist ); 
		gc.lineTo( centerX - xDist - xPerpDist, //point1
				centerY - yDist - yPerpDist );
		gc.closePath();
		gc.fillStyle = lineColor;
		gc.fill();
		gc.restore();
	}
	
	cp.drawDiamondCap = function( gc, x1, y1, x2, y2, lineColor, lineWidth, endLocation )
	{
		var strokeRadius = 0;
		var centerX = 0, centerY = 0;
		var xDelta = 0, xDist = 0, yDist = 0, xPerpDist = 0, yPerpDist = 0; 
		var slope = 0;
		
		var arrowHeadLength = 0, strokeCorrection = 0, sinHeadAngle = 0;
		
		sinHeadAngle = Math.sin( 0.349 ); 
		arrowHeadLength = 4;	//Note: HardCoded Number are in sync with Stage (CPDrawingPainter)
		strokeCorrection = lineWidth / ( 2.0 * sinHeadAngle );
		// Adjust arrowhead  length to correct for stroke width
		arrowHeadLength += strokeCorrection ;	
		strokeRadius = arrowHeadLength / 2;
		
		if ( 0 == endLocation ) { //cap at Start Point
			centerX = x1; 
			centerY = y1;
		}
		else {
			centerX = x2; 
			centerY = y2;
		}

		xDelta = x2 - x1;
		if ( xDelta == 0 ) {
			xDist = 0;
			yDist = strokeRadius;
	
			xPerpDist = strokeRadius;
			yPerpDist = 0;
		}
		else {
			// First need to find the slope of the current line
			slope = (y2 - y1) / xDelta;		
			if ( slope != 0 )
			{
				xDist = Math.sqrt( ( strokeRadius * strokeRadius ) / ( slope * slope + 1 ) );
				yDist = slope * xDist;		
				slope = -1.0 / slope;
	
				// Plug into formula derived from Pythags and equation for a line:
				//        ________________
				//		  |      d^2         d = barLength
				// x =	  |    ------
				//      \/     m^2 + 1       m = slope
	
				xPerpDist = Math.sqrt( ( strokeRadius * strokeRadius ) / ( slope * slope + 1 ) );
				yPerpDist = slope * xPerpDist;
			}
			else {
				xDist = strokeRadius;
				yDist = 0;		
				xPerpDist = 0;
				yPerpDist = strokeRadius;
			}
		}

		gc.save();
		gc.beginPath();

		gc.moveTo( centerX - xDist , //point1
				centerY - yDist );
		gc.lineTo( centerX - xPerpDist, //point2
			centerY - yPerpDist );
		gc.lineTo( centerX + xDist, //point3
				centerY + yDist );
		gc.lineTo( centerX + xPerpDist, //point4
				centerY + yPerpDist ); 
		gc.lineTo( centerX - xDist, //point1
				centerY - yDist );

		gc.closePath();
		gc.fillStyle = lineColor;
		gc.fill();
		gc.restore();
	}

	cp.drawArrowCap = function( gc, x1, y1, x2, y2, lineColor, lineWidth, endLocation )
	{
		//Note: Hardcoded constant are in sync with cpDrawingpainter
		var lenFactor = 0, arrowLength = 0, insideArrowLength = 0, strokeCorrection = 0;
		var aLcLcHmsLsH = 0, aLsLcHpcLsH = 0, aLcLcHpsLsH = 0, aLsLcHmcLsH = 0;
		var adjustx = 0, adjusty = 0;
		var cosLineAngle = 0, sinLineAngle = 0, cosHeadAngle = 0, sinHeadAngle = 0;
		var R = 0;
		
		R = Math.sqrt( ( x2 - x1 ) * ( x2 - x1 ) + ( y2 - y1 ) * ( y2 - y1 ) );
		if ( R == 0 )
			return;
			
		cosLineAngle = ( x2 - x1 ) / R; 
		sinLineAngle = ( y2 - y1 ) / R;
		cosHeadAngle = Math.cos( 0.349 );
		sinHeadAngle = Math.sin( 0.349 );
		
		lenFactor = 1;
		if ( lineWidth > 1 )
			lenFactor = Math.sqrt( lineWidth ); 
		
		arrowLength = 6 * lenFactor;
		insideArrowLength = 4; 
		
		strokeCorrection = lineWidth / ( 2 * sinHeadAngle );
			
		arrowLength += strokeCorrection;
		insideArrowLength += strokeCorrection;
		
		aLcLcHmsLsH = arrowLength * ( cosLineAngle * cosHeadAngle - sinLineAngle * sinHeadAngle );
		aLsLcHpcLsH = arrowLength * ( sinLineAngle * cosHeadAngle + cosLineAngle * sinHeadAngle );
		aLcLcHpsLsH = arrowLength * ( cosLineAngle * cosHeadAngle + sinLineAngle * sinHeadAngle );
		aLsLcHmcLsH = arrowLength * ( sinLineAngle * cosHeadAngle - cosLineAngle * sinHeadAngle );
		
		adjustx = insideArrowLength * cosLineAngle; 
		adjusty = insideArrowLength * sinLineAngle;
		
		var px = 0, py = 0, p1x = 0, p1y = 0, p2x = 0, p2y = 0;
		if ( 0 == endLocation ) {//startCap
			px = x1 - adjustx;
			py = y1 - adjusty;
			p1x = x1 + aLcLcHmsLsH - adjustx; 
			p1y = y1 + aLsLcHpcLsH - adjusty;
			p2x = x1 + aLcLcHpsLsH - adjustx; 
			p2y = y1 + aLsLcHmcLsH - adjusty;
		}
		else {
			px = x2 + adjustx;
			py = y2 + adjusty;
			p1x = x2 - aLcLcHmsLsH + adjustx; 
			p1y = y2 - aLsLcHpcLsH + adjusty;;
			p2x = x2 - aLcLcHpsLsH + adjustx; 
			p2y = y2 - aLsLcHmcLsH + adjusty;
		}

		// now we need  a triangle from  (x1,y1) , (p1x,p1y) , (p2x,p2y)
		gc.save();
		gc.beginPath();

		gc.moveTo( px, py );
		gc.lineTo( p1x, p1y );
		gc.lineTo( p2x, p2y );
		gc.lineTo( px, py );

		gc.closePath();
		gc.fillStyle = lineColor;
		gc.fill();
		gc.restore();		
	}
		
	cp.getPattern = function( ss, dotLength, dashDotFactor )
	{
		var pattern = new Array();
		switch( ss ) {
			case 1: 		
				pattern[ 0 ] = dashDotFactor * dotLength;
				pattern[ 1 ] = dotLength;
				break;
			case 2: 		
				pattern[ 0 ] = dotLength;
				pattern[ 1 ] = dotLength;
				break;
			case 3: 		
				pattern[ 0 ] = dashDotFactor * dotLength;
				pattern[ 1 ] = dotLength;
				pattern[ 2 ] = dotLength;
				pattern[ 3 ] = dotLength;
				break;			
			case 4: 		
				pattern[ 0 ] = dashDotFactor * dotLength;
				pattern[ 1 ] = dotLength;
				pattern[ 2 ] = dotLength;
				pattern[ 3 ] = dotLength;
				pattern[ 4 ] = dotLength;
				pattern[ 5 ] = dotLength;
				break;			
			default:
				pattern[ 0 ] = 10000 * dotLength;
				pattern[ 1 ] = 0;
				break;			
		}
		return pattern;
	}
	
	cp.dashStruct = function()
	{
		this.m_drawingDash = true;
		this.m_patternIndex = 0;
		this.m_offset = 0;
	}
	
	cp.drawDashedLineImpl = function( gc, pattern, drawingState, x0, y0, x1, y1 )
	{
		var cos = x1 - x0;
		var sin = y1 - y0;
		var len = Math.sqrt( cos * cos + sin * sin );
		var cosp = 0, sinp = 0, R = 0, offset = 0;
		var drawingDash;
		var patternIndex = 0;
		var prevx = x0, prevy = y0, x2 = 0, y2 = 0;
	
		// if both the points coincide.
		if ( 0 == len ) 
			return;
		
		cos /= len;
		sin /= len;
		cosp = -sin;
		sinp = cos;
		
		R = len;
		
		offset 			= -drawingState.m_offset;
		drawingDash 	= drawingState.m_drawingDash;
		patternIndex 	= drawingState.m_patternIndex;
		
		while( offset < R ) {
			offset += pattern[ patternIndex ];
			if ( offset >= R ) {
				drawingState.m_offset = pattern[ patternIndex ] - ( offset - R );
				drawingState.m_patternIndex = patternIndex;
				drawingState.m_drawingDash = drawingDash;
				offset = R;
			}
			x2 = x0 + offset * cos;
			y2 = y0 + offset * sin;			

			if ( drawingDash ) 
				gc.lineTo( x2, y2 );
			else 
			{
				gc.moveTo( x2, y2 );
				prevx = x2;
				prevy = y2;
			}
			
			drawingDash = ! drawingDash;
			patternIndex = ( patternIndex + 1 ) % pattern.length;
		}
	}	
	
	cp.drawDashedLine = function( gc, x0, y0, x1, y1, ss )
	{
		var pattern = cp.getPattern( ss, 7, 3 );
		var drawingState = new cp.dashStruct();
		cp.drawDashedLineImpl( gc, pattern, drawingState, x0, y0, x1, y1 );
		drawingState = null;
		pattern = null;
	}

	cp.drawDashedCurve = function( gc, pattern, drawingState, x0, y0, x1, y1, x2, y2, radiusX, radiusY, R )
	{
		if (radiusY < 0 )
			radiusY = radiusX;
			
		/*  Bezier Curve representation
			1) point on curve is 
					P(t) = (1-t)*(1-t)*P0 + 2t(1-t)P1 + t*t *P2;  0=<t<=1
			2) point on line from P0(xo,yo) --> P1(x1,y1)
					A(t) = (1-t)*P0 + t*P1
			3) point on line from P1(x1,y1) --> P2(x2,y2)
					B(t) = (1-t)*P1 + t*P2
		*/
		
		// find the length of the curve
		// cx, cy are control points 
		// px, py are the points on the curve
		// t is the parameter of the above curve
		var cx = 0, cy = 0, px = 0, py = 0, t = 0, _t = 0, x = 0;
		var i = 0;
		var offset 			= -drawingState.m_offset;
		var drawingDash 	= drawingState.m_drawingDash;
		var patternIndex 	= drawingState.m_patternIndex;
		var D = 0;
		// following will be coefficients of the 2 tangents.
		var A1 = 0, B1 = 0, C1 = 0, A2 = 0, B2 = 0, C2 = 0;
		var prevx = 0, prevy = 0;
				
		// length of the curve
		if ( R < 0 ) {
			R = 0;
			
			// Initially the first point is used as the control point, since we
			// want to find the length of the curve with straight line approximation
			//len = (Math.PI * Math.sqrt((radiusX*radiusX + radiusY*radiusY)/2));

			cx = x0; 
			cy = y0;
			for ( i = 1; i < 100; i++ ) {
				t = i / 100; 
				_t = 1 - t;
			
				px = _t * _t * cx + 2 * t * _t * x1 + t * t * x2;
				py = _t * _t * cy + 2 * t * _t * y1 + t * t * y2;
			
				R += Math.sqrt( ( px - cx ) * ( px - cx ) + ( py - cy ) *( py - cy ) )
				cx = px;
				cy = py;
			}
			// some error or if the points coincide.
			if ( R < 0 || R == 0 ) 
			  return;
		}

		// restore the previous offset, drawingMode, patternIndex		
		// this is the length of the line from 
		//Anchor Point1 ---> Control Point
		D = Math.sqrt( ( x1 - x0 ) * ( x1 - x0 ) + ( y1 - y0 ) * ( y1 - y0 ) );
		
		// initialize first point, control points and the eq parameter t
		px = x0; py = y0;
		cx = x1; cy = y1;
		t = 0; 	_t = 1;

		// offset ==> length of the curve from P0 so maximum value of offset = R
		while ( offset < R ) {
			offset += pattern[ patternIndex ];

			// if somehow its -ve => error just reset to 5
			if ( offset < 0 ) 
				x = 5;
			
			// this means that the current pattern will cover the entire remaining curve
			if ( offset >= R ) {
				// store the values of offset, drawingMode, patternIndex for using next time.
				drawingState.m_offset = pattern[ patternIndex ] - ( offset - R );
				drawingState.m_patternIndex = patternIndex;
				drawingState.m_drawingDash = drawingDash;
				
				// set offset to length of the curve
				offset = R;
			}
			
			// this is the start point for curve segment
			prevx = px;
			prevy = py;
			
			// tangent equation  at the start point
			A1 = py - cy;  B1 = cx - px;  C1 = px * cy - py * cx;
		
			// find the Bezier Curve parameter based on the new offset
			t = ( offset / R ); 
			if ( t > 1 ) 
				t = 1;
			_t = 1 - t;
			
			// find the control point on line A(t) = line from P0(xo,yo) --> P1(x1,y1)
			cx = _t * x0 + t * x1;
			cy = _t * y0 + t * y1;
			
			// find the point on curve at a distance = Offset from P0
			// this is the end point for the current curve segment
			px = _t * _t * x0 + 2 * t * _t * x1 + t * t * x2;
			py = _t * _t * y0 + 2 * t * _t * y1 + t * t * y2;
		
			// tangent equation at the end point
			A2 = py - cy;  B2 = cx - px;  C2 = px * cy - py * cx;
			
			// Now find the control point. intersection of the above 2 line
			if ( ( B2 * A1 - B1 * A2 ) != 0 ) {
				cx  = ( B1 * C2 - B2 * C1 ) / ( B2 * A1 - B1 * A2 );	
				cy  = ( A1 * C2 - A2 * C1 ) / ( B1 * A2 - B2 * A1 );
			} 
			else {
				cx = prevx;
				cy = prevy;
			}
			if ( drawingDash ) 
				gc.quadraticCurveTo( cx, cy, px, py );
			else 
				gc.moveTo( px, py );
			
			drawingDash = ! drawingDash;
			patternIndex = ( patternIndex + 1 ) % pattern.length;
		}
	}
	
	cp.drawDashedOval = function( gc, xCenter, yCenter, xRadius, yRadius, ss )
	{
		var radians = 0, xr = 0, yr = 0, angle = 0, angleMid = 0, anchorX = 0, anchorY = 0;
		var controlX = 0, controlY = 0, prevX = 0, prevY = 0, i = 0;
		var struct = new cp.dashStruct();
		var pattern = cp.getPattern( ss, 7, 3 );
		
		if ( yRadius < 0 ) 
			yRadius = xRadius;

		// get 45 degrees to radians
		radians = Math.PI / 4;
		
		// distance for the control point
		xr = xRadius / Math.cos( radians / 2 );
		yr = yRadius / Math.cos( radians / 2 );
		
		gc.beginPath();	
		angle = 0;
		gc.moveTo( xCenter + xRadius, yCenter );
		
		prevX = xCenter + xRadius;
		prevY = yCenter;

		for ( i = 0; i < 8; i++ ) {
			// increment our angles
			angle += radians;
			angleMid = angle - ( radians / 2 );
				
			controlX = xCenter + Math.cos( angleMid ) * xr;
			controlY = yCenter + Math.sin( angleMid ) * yr;
			
			anchorX = xCenter + Math.cos( angle ) * xRadius;
			anchorY = yCenter + Math.sin( angle ) * yRadius;
			
			cp.drawDashedCurve( gc, pattern, struct, prevX, prevY, controlX, 
							controlY, anchorX, anchorY, xRadius, yRadius, -1 );
			prevX = anchorX;
			prevY = anchorY;		
		}
		
		gc.closePath();	
		
		pattern = null;
		struct = null;
	}	

	cp.drawDashedArc = function( gc, pattern, struct, xCenter, yCenter, xRadius, yRadius, startAngle, endAngle )
	{
		var radians = 0, xr = 0, yr = 0;
		var angle = 0, angleMid = 0;
		var anchorX = 0, anchorY = 0;
		var controlX = 0, controlY = 0;
		var prevX = xCenter - xRadius;
		var prevY = yCenter, i = 0;

		if ( yRadius < 0 ) 
			yRadius = xRadius;
		
		// get 45 degrees to radians
		radians = Math.PI/4;
		
		// distance for the control point
		xr = xRadius / Math.cos(radians / 2);
		yr = yRadius / Math.cos(radians / 2);
		
		angle = 0;
		gc.moveTo( xCenter - xRadius, yCenter );
		
		for ( i = 0; i < 16; i++ ) {
			// increment our angles
			angle += radians;

			angleMid = angle - ( radians / 2 );
				
			controlX = xCenter + Math.cos( angleMid ) * xr;
			controlY = yCenter + Math.sin( angleMid ) * yr;
			
			anchorX = xCenter + Math.cos( angle ) * xRadius;
			anchorY = yCenter + Math.sin( angle ) * yRadius;
			
			if ( ( angle > startAngle ) && ( angle <= endAngle ) ) {
				cp.drawDashedCurve( gc, pattern, struct, 
					prevX, prevY, controlX, controlY, anchorX, anchorY, 
					xRadius, yRadius, Math.PI * xRadius / 4 );
				prevX = anchorX;
				prevY = anchorY;		
			}			
			else if ( angle <= startAngle ) {
				prevX = anchorX;
				prevY = anchorY;		
				gc.moveTo( prevX, prevY );
				continue;
			}
			else if ( angle > endAngle )
				break;
		}
	}
	
	cp.drawDashedRectangle = function( gc, left, top, width, height, radius, ss )
	{
		var struct = new cp.dashStruct();		
		var pattern = cp.getPattern( ss, 7, 3 );
		
		if ( radius <= 0 )
			radius = 0;
			
		gc.beginPath();
		gc.moveTo( left, top + height - radius );

		cp.drawDashedLineImpl( gc, pattern, struct, left, top + height - radius, left, top + radius );
		if ( radius > 0 )
			cp.drawDashedArc( gc, pattern, struct, left + radius, top + radius, radius, radius, Math.PI, 3 * Math.PI / 2 );
		cp.drawDashedLineImpl( gc, pattern, struct, left + radius, top, left + width - radius, top );
		if ( radius > 0 )
			cp.drawDashedArc( gc, pattern, struct, left + width - radius, top + radius, radius, radius, 3 * Math.PI / 2, 2 * Math.PI );
		cp.drawDashedLineImpl( gc, pattern, struct, left + width, top + radius, left + width, top + height - radius );
		if ( radius > 0 )
			cp.drawDashedArc( gc, pattern, struct, left + width - radius, top + height - radius, radius, radius, 2 * Math.PI, 5 * Math.PI / 2 );
		cp.drawDashedLineImpl( gc, pattern, struct, left + width - radius, top + height, left + radius, top + height );
		if ( radius > 0 )
			cp.drawDashedArc( gc, pattern, struct, left + radius, top + height - radius, radius, radius, Math.PI / 2, Math.PI );
		gc.closePath();
		
		pattern = null;
		struct = null;
	}
	
	cp.drawDashedPolyLine = function( gc, ptArr, ss )
	{
		var struct = new cp.dashStruct();		
		var pattern = cp.getPattern( ss, 7, 3 );
		
		var prevX = 0, prevY = 0, currentX = 0, currentY = 0, i = 0;
		if ( 0 == ptArr.length )
			return;
		
		prevX = ptArr[ 0 ].x;
		prevY = ptArr[ 0 ].y;
		
		gc.beginPath();
		gc.moveTo( prevX, prevY );
		
		for ( i = 1; i < ptArr.length; i++ ) {
			currentX = ptArr[ i ].x;
			currentY = ptArr[ i ].y;			
			cp.drawDashedLineImpl( gc, pattern, struct, prevX, prevY, currentX, currentY );
			prevX = currentX;
			prevY = currentY;			
		}
		
		currentX = ptArr[ 0 ].x;
		currentY = ptArr[ 0 ].y;	
		
		cp.drawDashedLineImpl( gc, pattern, struct, prevX, prevY, currentX, currentY );
		
		gc.closePath();
	}
		
	cp.moveTo = function( gc, x, y, ss )
	{
		gc.moveTo( x, y );
	}
	
	cp.lineTo = function( gc, x, y, ss )
	{
		gc.lineTo( x, y );
	}

	cp.bezierCurveTo = function( gc, x1, y1, x2, y2, x3, y3, ss )
	{
		// TODO. Handle ss (stroke type)
		gc.bezierCurveTo( x1, y1, x2, y2, x3, y3 );
	}
			
	cp.getBezierLength = function( x0, y0, cx1, cy1, cx2, cy2, x3, y3, nIter )
	{
		/*  Bezier Curve representation
			1) point on curve is 
					P(t) = (1-t)^3*P0 + 3t(1-t)^2*P1 + 3t^2(1-t)*P2 + t^3*P3;  0=<t<=1
		*/
		// Find out the length.
		var i = 0, t = 0, _t = 0, R = 0, px = 0, py = 0, prevX = x0, prevY = y0;
		
		for ( i = 1; i < nIter; i++ ) {
			t = i / nIter; 
			_t = 1 - t;
		
			px = (_t * _t * _t * x0) + (3 * t * _t * _t * cx1) + (3 * t * t * _t * cx2) + ( t * t * t * x3);
			py = (_t * _t * _t * y0) + (3 * t * _t * _t * cy1) + (3 * t * t * _t * cy2) + ( t * t * t * y3);
		
			R += Math.sqrt( ( px - prevX ) * ( px - prevX ) + ( py - prevY ) *( py - prevY ) )
			prevX = px;
			prevY = py;
		}
		
		return R;
	}

    cp.getCPSlideData = function()
    {
        var slideArray = new Array();
        //what is the number of slides
        var slideCount = cp.movie.stage.slides.length;

        for (i = 0; i < slideCount; i++)
        {
            var slideName = cp.movie.stage.slides[i];
		    var slideData = cp.model.data[slideName];

            var slideObject = new Object();
            slideObject.slideNumber = i + 1;
            slideObject.title = slideData.lb;
			slideObject.idealTime = (slideData.to - slideData.from + 1)/ cpInfoFPS;			
            
            slideObject.isQuestionSlide = false;
            if(cp.movie.playbackController)
			{
		        var lQuizController = cp.movie.playbackController.GetQuizController();	
		        if(lQuizController)
                {
                    var lSlideType = lQuizController.GetSlideType(i);			
			        slideObject.isQuestionSlide = lSlideType == "Question"? true : false;
                }
            }
			
			slideObject.isEndSlide = false;
            slideArray[i] = slideObject;
        }
        slideObject.isEndSlide = true;

        return slideArray;
    }

    cp.doesCourseHasQuiz = function()
    {
        if(!cp.movie.playbackController)
			return false;
        
        return cp.movie.playbackController.HasQuiz();
    }

	cp.drawDashedBezierCurve = function( gc, pattern, drawingState, x0, y0, cx1, cy1, cx2, cy2, x3, y3 )
	{
		/*  Bezier Curve representation
			1) point on curve is 
					P(t) = (1-t)^3*P0 + 3t(1-t)^2*P1 + 3t^2(1-t)*P2 + P3;  0=<t<=1
		*/
		// Find out the length.
		var i = 0, t = 0, _t = 0, R = 0, px = 0, py = 0;
		var kMagic = 3;
		var t = 0;
		var offset = 0;
		var delta = kMagic;
		var offset 			= -drawingState.m_offset;
		//offset = 0;
		var drawingDash 	= drawingState.m_drawingDash;
		var patternIndex 	= drawingState.m_patternIndex;
		var patternDistance	= 0, remaining = 0, currOffset = 0, temp = 0;
		var getOut = false;

		R = cp.getBezierLength( x0, y0, cx1, cy1, cx2, cy2, x3, y3, 100 );
		if ( R <= 0 )
			return;

		//gc.beginPath();
		//gc.moveTo( x0, y0 );
		
		while ( offset < R ) {

			currOffset = offset;
			patternDistance = pattern[ patternIndex ];

			// this means that the current pattern will cover the entire remaining curve
			if ( offset + patternDistance >= R ) {
				// store the values of offset, drawingMode, patternIndex for using next time.
				drawingState.m_offset = pattern[ patternIndex ] - ( offset + patternDistance - R );
				drawingState.m_patternIndex = patternIndex;
				drawingState.m_drawingDash = drawingDash;
				
				// set offset to length of the curve
				patternDistance = ( R - offset );
				if ( patternDistance > R ) 
					patternDistance = R; // negative offset.
				getOut = true;	
				if ( ! drawingDash ) {
					gc.moveTo( x3, y3 ); // While not drawing dash, just end.
					break;
				}
			}
			else {
				// Need to check that we just draw until the remaining distance of pattern.
				if ( offset < 0 ) {
					temp = offset;
					while ( temp < 0 )
						temp += patternDistance;
					patternDistance = temp;
					offset = 0;
				}
				// Restore.
				drawingState.m_offset = 0;
				drawingState.m_patternIndex = 0;
				drawingState.m_drawingDash = true;
			}
			if ( currOffset < 0 )
				currOffset = 0;
			if ( drawingDash && patternDistance > 0 ) {
				// Since we are drawing using fixed distances, so we may need to draw a number of lines.
				if ( patternDistance > R )
					patternDistance = R;
				if ( patternDistance > kMagic )
					delta = kMagic;
				else
					delta = patternDistance;
				remaining = patternDistance;
				do {
					if ( remaining > delta )
						currOffset += delta;
					else
						currOffset += remaining;
					t = currOffset / R;
					_t = 1 - t;
					if ( t >= 1 ) { // Edge case
						px = x3; 
						py = y3;
					}
					else {
						px = (_t * _t * _t * x0) + (3 * t * _t * _t * cx1) + (3 * t * t * _t * cx2) + (t * t * t * x3);
						py = (_t * _t * _t * y0) + (3 * t * _t * _t * cy1) + (3 * t * t * _t * cy2) + (t * t * t * y3);								
					}					
					gc.lineTo( px, py );
					remaining -= delta;
				} while ( remaining > 0 )
				if ( getOut )
					return;
			}
			else {
				t = ( offset + patternDistance ) / R;
				_t = 1 - t;
				if ( t >= 1 ) { // Edge case
					px = x3; 
					py = y3;
				}
				else {
					px = (_t * _t * _t * x0) + (3 * t * _t * _t * cx1) + (3 * t * t * _t * cx2) + (t * t * t * x3);
					py = (_t * _t * _t * y0) + (3 * t * _t * _t * cy1) + (3 * t * t * _t * cy2) + (t * t * t * y3);								
				}
				gc.moveTo( px, py );
			}

			drawingDash = ! drawingDash;
			patternIndex = ( patternIndex + 1 ) % pattern.length;			
			if ( offset < 0 )
				offset = 0;
			offset += patternDistance;
		}
	}	
	
	cp.Canvas = function(element)
	{
		this.element = element;
		this.gc = element.getContext("2d");
	};		
	cp.createCanvas = function(left, top, width, height, el)
	{
		if (!el)
		{
			el = document.createElement("canvas");
		}
		
		el.width = width;
		el.height = height;
		el.style.width = width + "px";
		el.style.height = height + "px";

		el.left = left;
		el.top = top;
		el.style.left = left + "px";
		el.style.top = top + "px";
		
		return new cp.Canvas(el);
	}

	cp.Question = function(questionObjName,associatedObjName)
	{
		if(!cp.movie.playbackController)
			return;
		this.m_quizController = cp.movie.playbackController.GetQuizController();
		if(!this.m_quizController)
			return;
			
		this.m_questionScore;
		this.wasJudged = false;
				
		this.m_isTracked = true;
		this.m_isSurvey = true;
		
		this.associatedObjName = associatedObjName;
		this.m_slideIndex = -1;
		if( cp.movie.stage)
			this.m_slideIndex = cp.movie.stage.getSlideIndexForName(associatedObjName);
		this.questionObjName = questionObjName;
		this.progressString = "";
		this.questionData = cp.model.data[this.questionObjName];
		
		this.latencyTimer;
		this.latency = 0;
		this.timer;
		this.startTime = 0;
		this.endTime = 0;
		this.pausedMsecs = 0;
		this.timeBeforePause = 0;
		
		this.score = 0;
		this.m_selectedAnswersArr = [];
		this.isPartialScore = this.questionData['ips'];				
		this.timeLimit = this.questionData['tl'];
		this.questionTextCanvasName = this.questionData['qtc'];
		this.feedbackCaptionToBeShown = "";
		this.currentAttempt = 0;
		this.numberOfAttempts = this.questionData['noa'];	
		this.incorrectFeedbackCaptions = this.questionData['ifc'];
		
		this.submitButtonDivElement;
		this.submitAllButtonDivElement;
		this.clearButtonDivElement;
		this.skipButtonDivElement;
		this.backButtonDivElement;
		
        this.shouldReportAnswers = this.questionData['sra'];

		this.lastFeedbackShown;
		
		//Question Status Enum
		if (!this['QuestionStatusEnum'])
		{
			this.QuestionStatusEnum = new Object();
			this.QuestionStatusEnum.INCOMPLETE = 0;
			this.QuestionStatusEnum.INCORRECT = 1;
			this.QuestionStatusEnum.CORRECT = 2;
			this.QuestionStatusEnum.PARTIAL_CORRECT = 3;
		}
		
		this.m_QuestionStatus =this.QuestionStatusEnum.INCOMPLETE;
		
		//State Enum
		if (!this['StateEnum'])
		{
			this.StateEnum = new Object();
			this.StateEnum.INIT = 0;
			this.StateEnum.PLAYING = 1;
			this.StateEnum.PAUSED = 2;
			this.StateEnum.ENDED = 3;
		}
		
		this.state = this.StateEnum.INIT;// enumeration of "init", "playing", "paused", "ended"

        //scoring type enum
        if (!this['QuestionScoringTypeEnum'])
		{
			this.QuestionScoringTypeEnum = new Object();
			this.QuestionScoringTypeEnum.SURVEY = 0;
			this.QuestionScoringTypeEnum.PRETEST = 1;
			this.QuestionScoringTypeEnum.GRADED = 2;			    
		}
		    
        this.m_scoringType = this.QuestionScoringTypeEnum.SURVEY;
        if (this.getIsPretest() == true)
            this.m_scoringType = this.QuestionScoringTypeEnum.PRETEST;
        else
            this.getIsSurvey() == true ? this.m_scoringType = this.QuestionScoringTypeEnum.SURVEY : this.m_scoringType = this.QuestionScoringTypeEnum.GRADED;

		
		this.verbose = false;
		this.shouldAddToTotal = true;
		this.m_isShuffled = false;	
		
		this.m_answersDisabled = false;
		
		//this should be updated while updating the selected answers. 
		//to be used by setQuestionSpecificScore() function
		this.m_answerOrderArray = [];
		
		this.m_areButtonsDisabled = false;
		
		this.m_isStarted = false;
	}
	cp.Question.prototype = 
	{
		shouldDisableOptions: function()
		{
			var lCanDisable = false;
			
			var isInReviewMode = this.m_quizController.GetIsInReviewMode();
			
			//var lGoToQuizScopeSlideExecuted = (this.m_quizController.GetGoToQuizScopeActionExecuted() && !isInReviewMode);
			
			var lSubmitAll = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
			lCanDisable = (!this.m_quizController.GetIsAttemptFinished() && this.getWasJudged() && !lSubmitAll);
						
			var lShouldDisablePretestQuestion = this.getIsPretest() && this.m_quizController.GetIsPretestQuestionsDisabled();
			if(lShouldDisablePretestQuestion)
				lCanDisable = true;
			
			//this.m_answersDisabled = !lGoToQuizScopeSlideExecuted && (lCanDisable || isInReviewMode);
			this.m_answersDisabled = (lCanDisable || isInReviewMode);
			
			return this.m_answersDisabled;
		},
		
		getIsLastPretestQuestion: function()
		{
			if(!this.getIsPretest())
				return false;				
			var lNextSlideIndex = this.m_slideIndex + 1;
			if(lNextSlideIndex >=  cp.movie.stage.slides.length)
				return true;				
			if( this.m_quizController)
			{
				var lQuestionsOnSlide = this.m_quizController.GetQuestionsOnSlide(lNextSlideIndex);
				if(lQuestionsOnSlide && lQuestionsOnSlide.length > 0)
				{
					var lQuestion = lQuestionsOnSlide[0];
					return (!lQuestion.getIsPretest());
				}
				else
				{
					return true; // Normal slide
				}
			}
			return false;			
		},
		
		getAnswerOptions: function()
		{
			var lAnswerOptions = [];
			var lOptions = this.questionData['ao'];
			if(!lOptions || (lOptions.length <=0))
				return "";
			for(var i =0; i< lOptions.length; ++i)
			{
				var lOpt = lOptions[i].split(":"); // Syntax option = "itemCanvasName:AnswerIndex"
				lAnswerOptions.push(lOpt[0]);
			}
			return lAnswerOptions;
		},
	
		setShouldAddToTotal: function(iShouldAddToTotal)
		{
			this.shouldAddToTotal = iShouldAddToTotal;
		},
		
        setQuestionStatus: function(iQuestionStatus)
		{
			this.m_QuestionStatus = iQuestionStatus;
		},

		getQuestionStatus: function()
		{
			return this.m_QuestionStatus;
		},

        getQuestionScoringType: function()
		{
			return this.m_scoringType;
		},

		getIsCorrect: function()
		{
			return (this.getQuestionStatus() == this.QuestionStatusEnum.CORRECT);
		},

		getIsPartiallyCorrect: function()
		{
			return (this.getQuestionStatus() == this.QuestionStatusEnum.PARTIAL_CORRECT);
		},

		getIsIncomplete: function()
		{
			return (this.getQuestionStatus() == this.QuestionStatusEnum.INCOMPLETE);
		},

		getIsIncorrect: function()
		{
			return (this.getQuestionStatus() ==this.QuestionStatusEnum.INCORRECT);
		},

		registerSubmitButton: function(iSubmitButtonElement)
		{
			this.submitButtonDivElement = iSubmitButtonElement;
			if(!this.m_areButtonsDisabled)
				this.enableButton(this.submitButtonDivElement);
			else
				this.disableButton(this.submitButtonDivElement);
		},
		
		registerSubmitAllButton: function(iSubmitAllButtonElement)
		{
			this.submitAllButtonDivElement = iSubmitAllButtonElement;
			if(!this.m_areButtonsDisabled)
				this.enableButton(this.submitAllButtonDivElement);
			else
				this.disableButton(this.submitAllButtonDivElement);
		},
		
        registerSkipButton: function(iSkipButtonElement)
		{
			this.skipButtonDivElement = iSkipButtonElement;
			if(!this.shouldDisableSkipButton())
			{				
				cp.enable(this.skipButtonDivElement.id);
				var skipButtonDivData = cp.model.data[this.skipButtonDivElement.id];
				skipButtonDivData.shouldShowDisabledState = false;
				this.skipButtonDivElement.disabled = false;
				this.skipButtonDivElement.style.cursor = "pointer";
				var lButtonData = cp.model.data[this.skipButtonDivElement.id];
				var lClickHandler = lButtonData.chfn;
				this.skipButtonDivElement.onclick = function(e)
									{  
										if(e.stopPropagation)
										{
											e.stopPropagation(); 
										}
										lClickHandler(e.target);
									};
			}
			else
			{
				cp.disable(this.skipButtonDivElement.id);
				var skipButtonDivData = cp.model.data[this.skipButtonDivElement.id];
				skipButtonDivData.shouldShowDisabledState = true;
				this.skipButtonDivElement.disabled = 'disabled';
				this.skipButtonDivElement.tabIndex = -1;
				this.skipButtonDivElement.onclick = "";
				this.skipButtonDivElement.style.cursor = "default";
			}
		},
		
		registerClearButton: function(iClearButtonElement)
		{
			this.clearButtonDivElement = iClearButtonElement;
			if(!this.m_areButtonsDisabled)
				this.enableButton(this.clearButtonDivElement);
			else
				this.disableButton(this.clearButtonDivElement);
		},
		
		registerBackButton: function(iBackButtonElement)
		{
			this.backButtonDivElement = iBackButtonElement;
			this.enableButton(this.backButtonDivElement);			
		},
		
        shouldShowSuccessCaption: function()
        {
            return this.questionData['osct'];
        },

        shouldShowPartialCorrectCaption: function()
        {
            return this.questionData['spcc'];
        },

		shouldShowFailureCaption: function()
        {
            return this.questionData['ofct'];
        },

		shouldShowIncompleteCaption: function()
        {
            return this.questionData['sic'];
        },

        shouldShowRetryCaption: function()
        {
            return this.questionData['sfrc'];
        },

		shouldShowTimeOutCaption: function()
		{
			return this.questionData['stfc'];			
		},
		
		getSuccessCaptionName: function()
        {
            return this.questionData['osc'];
        },
		
		getSuccessFeedback: function()
		{
			var lReturnFeedbackObject = new Object();
			lReturnFeedbackObject.name = this.getSuccessCaptionName();
			lReturnFeedbackObject.action = this.getSuccessAction();
			lReturnFeedbackObject.captionToBeShown = this.shouldShowSuccessCaption();
			
			return lReturnFeedbackObject;
		},
		
        getPartialCorrectCaptionName: function()
        {
            return this.questionData['opcc'];
        },
		
		getPartialCorrectFeedback: function()
		{
			var lReturnFeedbackObject = new Object();
			lReturnFeedbackObject.name = this.getPartialCorrectCaptionName();
			lReturnFeedbackObject.action = this.getSuccessAction();
			lReturnFeedbackObject.captionToBeShown = this.shouldShowPartialCorrectCaption();
			
			return lReturnFeedbackObject;
		},
		
        getRetryCaptionName: function()
        {
            return this.questionData['frc'];
        },
		
		getRetryFeedback: function()
		{
			var lReturnFeedbackObject = new Object();
			lReturnFeedbackObject.name = this.getRetryCaptionName();
			lReturnFeedbackObject.action = "";
			lReturnFeedbackObject.captionToBeShown = this.shouldShowRetryCaption();
			
			return lReturnFeedbackObject;
		},
		
        getFailureCaptionName: function(iIndex)
        {
			if(this.incorrectFeedbackCaptions && this.incorrectFeedbackCaptions.length == 0)
				return undefined;
				
			if (iIndex >= this.incorrectFeedbackCaptions.length || iIndex < 0)
				return undefined;
			
			return this.incorrectFeedbackCaptions[iIndex];		
        },

		getFailureFeedback: function(iIndex)
		{
			var lReturnFeedbackObject = new Object();
			lReturnFeedbackObject.name = this.getFailureCaptionName(iIndex);
			
			if(this.currentAttempt >= (this.numberOfAttempts))
			{
				if(cp.verbose)
					cp.log("Last Attempt. Setting action now.");
				lReturnFeedbackObject.action = this.getFailureAction();
			}
			else
			{
				if(cp.verbose)
					cp.log("Current Attempt :" + this.currentAttempt);
				lReturnFeedbackObject.action = "";
			}			
			
			lReturnFeedbackObject.captionToBeShown = this.shouldShowFailureCaption();
			
			return lReturnFeedbackObject;
		},
		
        getIncompleteCaptionName: function()
        {
            return this.questionData['oic'];
        },
		
		getIncompleteFeedback: function()
		{
			var lReturnFeedbackObject = new Object();
			lReturnFeedbackObject.name = this.getIncompleteCaptionName();
			lReturnFeedbackObject.action = "";
			lReturnFeedbackObject.captionToBeShown = this.shouldShowIncompleteCaption();
			
			return lReturnFeedbackObject;
		},
		
		getTimeOutCaptionName: function()
		{
			return this.questionData['tfcn']; 
		},
		
		getTimeOutFeedback: function()
		{
			var lReturnFeedbackObject = new Object();
			lReturnFeedbackObject.name = this.getTimeOutCaptionName();
			lReturnFeedbackObject.action = "cpCmndResume = 1;";
			lReturnFeedbackObject.captionToBeShown = this.shouldShowTimeOutCaption();
			
			return lReturnFeedbackObject;
		},
		
        getSuccessAction: function()
        {
            return this.questionData['oca'];
        },

        getFailureAction: function()
        {
            return this.questionData['ofa'];
        },

        getSlideIndex: function()
		{
			return this.m_slideIndex;
		},
		
		resetQuestionData: function()
		{
			this.latency = 0;
			this.score = 0;
			this.wasJudged = false;
			this.m_QuestionStatus =this.QuestionStatusEnum.INCOMPLETE;
			this.setCurrentAttempt(0);
			this.enableQuizButtons();
			this.m_answersDisabled = false;
			if(this.m_questionScore)
				this.m_questionScore.resetScore();
		},
		
		setActionToBeExecuted: function(actionToBeExecuted)
		{
			this.actionToBeExecuted = actionToBeExecuted;
		},
		
		getActionToBeExecuted: function()
		{
			return this.actionToBeExecuted;
		},		
		
		getName: function()
		{
			return this.questionObjName;
		},
		
		startLatency: function()
		{
            if(this.getWasJudged())
                return;
			
			var isInReviewMode = this.m_quizController.GetIsInReviewMode();
			if(isInReviewMode)
				return;
			
			this.latency = 0;
			var self = this;
			this.latencyTimer = setInterval(function()
											{
												self.latencyTimer += 100;
											},100);
							
			if(this.timeLimit && this.timeLimit > 0)
			{
				this.timer = setTimeout(function()
										{
											if(self.verbose)
												cp.log("Calling Timeout");
											self.disableAllOptions();
											//self.wasJudged = true;
											self.stopLatencyTimer();
											self.autoJudge();
										},this.timeLimit);
			}
		},
		
		stopLatencyTimer: function()
		{
			if(this.timer)
			{
				if(this.verbose)
					cp.log("Clearing Timeout");
				clearTimeout(this.timer);
			}			
			if(this.latencyTimer)
				clearInterval(this.latencyTimer);
		},
		
		getLatency: function()
		{
			var msecs;
			if((this.startTime != undefined) && (this.startTime != 0) && (this.endTime != undefined) && (this.endTime != 0))
				msecs = this.endTime.getTime() - this.startTime.getTime() - this.pausedMsecs;
			else 
				msecs = 0;
			this.latency = msecs;///1000;
			return this.latency;
		},
		
		getAssociatedObjName: function()
		{
			return this.associatedObjName;
		},
		
		getQuestionType: function()
		{
			this.questionType = this.questionData['qtp'];
			return this.questionType;
		},
		
		getAnswerGroupName: function()
		{
			this.answerGroupName = this.questionData['gn']; 
			return this.answerGroupName;
		},
		
		getQuestionText: function()
		{
			this.questionText = this.questionData['qt'];
			return this.questionText;
		},
		
		getSelectedAnswerTextList: function(aDelimiter)
		{
			return "";
		},
		
		getExpectedCorrectAnswerTextList: function(aDelimiter)
		{
			return "";
		},		
		
		getAnswerTexts: function()
		{
			var lAnswerTexts = new Object();
			lAnswerTexts.learner_response = this.getSelectedAnswerTextList("-");
			lAnswerTexts.correct_response = this.getExpectedCorrectAnswerTextList("-");
			
			return lAnswerTexts;
		},
		
		getDescriptionText: function()
		{
			var lDescriptionText = new Object();
			lDescriptionText.questionText = this.getQuestionText();
			lDescriptionText.answerTexts = this.getAnswerTexts();
			
			return lDescriptionText;
		},
		
		getProgressString: function()
		{
			if(!this.m_quizController)
				return "";
			
			var lQuestionString = "Question";
			var lOfString = "Of";
			var lProgressTemplateString = this.m_quizController.GetProgressTemplateString();
			if(lProgressTemplateString!=undefined)
			{
				lProgressTemplateString = lProgressTemplateString.split(" ");
				if(lProgressTemplateString.length >= 4)
				{
					lQuestionString = lProgressTemplateString[0];
					lOfString = lProgressTemplateString[2];
				}
			}
			
			var lCurrentQuestionNumber = this.getQuestionNumberInQuiz() + 1;
			var lTotalQuestionNumber = this.m_quizController.GetNumberOfQuestionsInQuiz();
			//Check if branch Aware Quizzing is On
			var lGraphManager = this.m_quizController.GetGraphManager();
			if(lGraphManager)
			{
				lCurrentQuestionNumber = lGraphManager.getQuestionSlideProgressNumber(this.m_slideIndex);
				lTotalQuestionNumber = lGraphManager.getNumQuestions();
			}
			
			var lProgressType = this.m_quizController.GetProgressType();
			var lForceAbsolute = this.m_quizController.GetForceAbsoluteProgressType();
			if(lForceAbsolute)
				lProgressType = 1;
				
			if(lProgressType == 0)
			{
				if((lCurrentQuestionNumber == 'NaN') || (lTotalQuestionNumber =='NaN'))
					this.progressString = "";
				else
					this.progressString = lQuestionString+" " + lCurrentQuestionNumber + " "+ lOfString+" "+ lTotalQuestionNumber;
			}
			else
			{
				if(lCurrentQuestionNumber == 'NaN')
					this.progressString = "";
				else
					this.progressString = lQuestionString+" " + lCurrentQuestionNumber;
			}
			
			return this.progressString;
		},
		
		getAnsweredCorrectly: function()
		{
			var lQuestionStatus = this.getQuestionStatus();
			if((lQuestionStatus == this.QuestionStatusEnum.CORRECT) || (lQuestionStatus == this.QuestionStatusEnum.PARTIAL_CORRECT))
				return true;
			else
				return false;
		},
		
		getIsTracked: function()
		{
			this.isTracked = this.questionData['it'];
			return (this.isTracked);
		},
		
		getIsSurvey: function()
		{
			this.isSurvey = this.questionData['is'];
			return (this.isSurvey);
		},
		
		getIsPretest: function()
		{
			var lIsPretest = this.questionData['ipq'];
			return lIsPretest;
		},
		
		getNumberOfAttempts: function()
		{
			return this.numberOfAttempts;
		},
		
		getCurrentAttempt: function()
		{
			return this.currentAttempt;
		},
		
		setCurrentAttempt: function(iCurrentAttempt)
		{
			var lSubmitAll = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.m_quizController.GetIsInReviewMode();
			//var lPretestQuestion = false;
			if(this.m_questionScore)
            {
                this.m_questionScore.m_numTries = iCurrentAttempt;
                //lPretestQuestion = this.m_questionScore.isPretestQuestion;
            }

            this.currentAttempt = iCurrentAttempt;
            var lDisableAnswers = this.currentAttempt >= this.numberOfAttempts;
			
			if(lDisableAnswers && !lSubmitAll)
			{
				this.disableAllOptions();
				if(this.submitButtonDivElement)
				{
					this.submitButtonDivElement.enable = false;
				}				
				if(this.clearButtonDivElement)
				{
					this.clearButtonDivElement.enable = false;
				}	
			}
		},
		
		getQuestionNumberInQuiz: function()
		{
			this.questionNumberInQuiz = this.questionData['qnq'];
			return this.questionNumberInQuiz;
		},
		
		getObjectiveId: function()
		{
			this.objectiveID = this.questionData['oid'];
			return this.objectiveID;
		},
		
		getInteractionId: function()
		{
			this.interactionID = this.questionData['iid'];
			
			var lPlaybackController = this.m_quizController.GetPlaybackController();
			var lLMSType = lPlaybackController.GetLMSType();
			if(!lPlaybackController.IsRunningInConnect() && ((lLMSType == "SCORM12") || (lLMSType == "AICC")))
			{
				//append the question text to interactionID for SCORM 1.2 and AICC
				var lQuestionText = this.getQuestionText();
				this.interactionID = this.interactionID + "_" + lQuestionText;
			}
			
			return this.interactionID;
		},
		
		getWeighting: function()
		{
			this.weighting = this.questionData['w'];
			return this.weighting;
		},
		
		getNegativeWeight: function()
		{
			return this.questionData['nw'];
		},
		
		getInteractionType: function()
		{
			this.interactionType = this.questionData['itp'];
			return this.interactionType;
		},
		
		getScore: function()
		{
			return (this.score);
		},
		
		setScore: function(score)
		{
			if(this.shouldAddToTotal)
			this.score = score;			
			else
				this.score = 0;
		},
				
		getSelectedAnswerChoices: function()
		{
			this.getSelectedAnswersAsString();
		},
		
		getSelectedAnswersAsString: function()
		{
			var lRetStr = "";
			
			if(!this.m_selectedAnswersArr)
				return lRetStr;
			if(this.m_selectedAnswersArr.length <= 0)
				return lRetStr;
			lRetStr += this.m_selectedAnswersArr[0];
			for(var i = 1; i < this.m_selectedAnswersArr.length; ++i)
			{
				lRetStr += ';';
				lRetStr += this.m_selectedAnswersArr[i];
			}
			
			return lRetStr;
		},
		
		setSelectedAnswers: function(userResponse)
		{	
			//parent class method only to be called for Interactive objects
			this.m_selectedAnswersArr = [];
			this.m_selectedAnswersArr.push(userResponse);
		},
		
		getAnswerOrder: function()
		{			
			if(!this.answerOptions)
				return "";
			if(this.answerOptions.length <= 0)
				return "";
			var lAnswerOrder = '';
			lAnswerOrder = this.answerOptions[0];
			for(var i = 1; i < this.answerOptions.length; ++i)
			{
				lAnswerOrder += ';';
				lAnswerOrder += this.answerOptions[i];
			}
			return lAnswerOrder;
		},
		
		setAnswerOrder: function(iOrder)
		{			
			if(!iOrder || iOrder.length <= 0)
				return;
			
			this.answerOptions = iOrder.split(";");
			this.m_answerOrderArray = this.answerOptions.slice(0);
		},
		
		getAnswerID: function(selectedOption)
		{
			var parentDivId;
			var parentDivId = selectedOption.parentNode.parentNode.id;	
			var parentDivData = cp.model.data[parentDivId]; 
			
			var lCanvasHolderElem = cp(parentDivData['answerTextCanvasHolder']);
			var lCanvasElem = lCanvasHolderElem.firstChild;
			var lCanvasElemDivData = cp.model.data[lCanvasElem.id];
			
			return lCanvasElemDivData['aid'];
		},
		
		getExpectedCorrectAnswerIDList: function()
		{
			var lRetList = this.questionData['cal'];			
			return lRetList;
		},
		
		//Return Quiz Points when partial Scoring is OFF 
		getQuestionLevelScoredPoints: function()
		{
			var lPoints = 0;
			if(this.getAnsweredCorrectly())
				lPoints = this.getWeighting();
			else 
				lPoints = this.getNegativeWeight();
			
			return lPoints;
		},
		
        getQuestionScoredPoints: function()
        {
			if(this.getIsSurvey())
				return 0;
			if(!this.wasJudged)
				return 0;
           return this.getQuestionLevelScoredPoints();
        },

		getChosenAnswerFeedback: function()
		{
			return;
		},		
		
		getFeedbackToShow: function(treatIncompleteAsIncorrect,showTimeoutFeedback)
		{
			var lReturnFeedbackObject = new Object();
			var lChosenAnswerFeedback = this.getChosenAnswerFeedback();		
			
			if (showTimeoutFeedback && this.shouldShowTimeOutCaption())
			{
				lReturnFeedbackObject = this.getTimeOutFeedback();
				return lReturnFeedbackObject;
			}
			else if (this.getIsIncomplete() && !treatIncompleteAsIncorrect && this.shouldShowIncompleteCaption()) 
			{
				lReturnFeedbackObject = this.getIncompleteFeedback();
				return lReturnFeedbackObject; 	// Don't count as a try if no answer has been chosen
			}
			else
			{
				if (lChosenAnswerFeedback)
				{
					return lChosenAnswerFeedback;
				}
				else if (this.getAnsweredCorrectly())
				{
					if(this.getIsPartiallyCorrect())
					{
						lReturnFeedbackObject = this.getPartialCorrectFeedback();						
					}	
					else
					{
						lReturnFeedbackObject = this.getSuccessFeedback();						
					}
					return lReturnFeedbackObject;
				}
				else 
				{
					if(this.shouldShowRetryCaption() && (this.currentAttempt < this.numberOfAttempts))
					{						
						lReturnFeedbackObject = this.getRetryFeedback();							
					}
					else
					{
						if ((this.getIsIncomplete() && treatIncompleteAsIncorrect) || (this.currentAttempt >= this.numberOfAttempts)) 
						{
							lReturnFeedbackObject = this.getFailureFeedback(this.incorrectFeedbackCaptions.length - 1);
						}
						else if (this.currentAttempt <= this.incorrectFeedbackCaptions.length) 
						{
							lReturnFeedbackObject = this.getFailureFeedback(this.currentAttempt - 1); 
						}
						else 
						{
							lReturnFeedbackObject = undefined;
						}
					}					
					
					return lReturnFeedbackObject;
				}
			}
		},
		
		hideLastFeedback: function(doAction)
		{			
			if(this.lastFeedbackShown)
			{
				var lastFeedbackName = this.lastFeedbackShown.name;
				cp.hide(lastFeedbackName);				
			}	
			this.lastFeedbackShown = undefined;
		},
		
		saveAnswerOrder: function()
		{ 		
			////OVERRIDDEN IN DERIVED CLASS. IT WILL SAVE SELECTED ANSWER IDS AS STRINGS
		},
		
		pauseQuestion: function()
		{
			if(this.state == this.StateEnum.PLAYING)
			{
				this.state = this.StateEnum.PAUSED;
				this.stopLatencyTimer();
				var currentTime = new Date();
				this.timeBeforePause = this.startTime.getMilliseconds() - currentTime.getMilliseconds();
				this.pausedMsecs += this.timeBeforePause;
				this.timeLimit -= this.timeBeforePause;
				this.timeBeforePause = 0;
			}
		},
		
		resumeQuestion: function()
		{
			if(this.state == this.StateEnum.PAUSED)
			{
				this.state = this.StateEnum.PLAYING;
				var isInReviewMode = this.m_quizController.GetIsInReviewMode();
				if(!isInReviewMode && this.timeLimit > 0)
					this.startLatency();
			}
		},
		
		endQuestion: function(iWasJudged)
		{
			if(this.verbose)
				cp.log("End Question Called");			
			
			if((this.state == this.StateEnum.PLAYING) || (this.state == this.StateEnum.PAUSED))
			{				
				this.state = this.StateEnum.ENDED;
				this.stopLatencyTimer();
				
				var lSubmitAll = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
				var lIsInReviewMode = this.m_quizController && this.m_quizController.GetIsInReviewMode();
				
				if(lSubmitAll && !lIsInReviewMode)
					this.checkAndSetQuestionStatus();
					
				if(!lIsInReviewMode)
					this.saveAnswerOrder();					
				
				var lAnsCorrectly = this.getAnsweredCorrectly();
				this.endTime = new Date();
				
				this.m_questionScore.endTime = this.endTime;
				
				//Update AnswerScores in QuestionScore
				/*_questionScore.answerScores = [];
				var lIter:ICPIterator = _answers.iterator()
				while (lIter.hasNext()) 
				{
					var theAnswer:Object = lIter.next();
					var ansScore:AnswerScore = theAnswer.answerScore.copy();
					if ((ansScore.answerID != null) && (ansScore.answerID.length > 0)) 
						_questionScore.answerScores.push(ansScore);				
				}*/
				
				this.m_questionScore.m_answerScores = this.getAnswerScores();
				
				var lAnsIncomplete = this.getIsIncomplete();
				if(iWasJudged || lIsInReviewMode || this.m_answersDisabled || lSubmitAll)
					this.m_questionScore.m_answersIncomplete = lAnsIncomplete;
				else 
					this.m_questionScore.m_answersIncomplete = true;
					
				this.m_questionScore.m_answeredCorrectly = this.getAnsweredCorrectly();
				this.m_questionScore.m_isShuffled = this.m_isShuffled;
				this.m_questionScore.m_partiallyCorrect = this.getIsPartiallyCorrect();
				
				if(iWasJudged)
				{
					this.m_questionScore.m_wasJudged = iWasJudged;					
					
					this.wasJudged = iWasJudged;
					this.disableAllOptions();
					this.disableQuizButtons();
					this.setHandledClick(true);
					this.stopLatencyTimer();
					//Set Score
					var lScore = this.getQuestionScoredPoints();
					this.setScore(lScore);	
					this.m_questionScore.m_scoredPoints = this.getScore();
					
					if(!this.getIsPretest())
					{
						if(!lAnsCorrectly)
							setCpQuizScopeSlide(cpInfoCurrentSlideIndex);
						else if(this.m_quizController)
							setCpQuizScopeSlide(this.m_quizController.GetNextQuestionSlideNumber());
					}
				}
				else 
				{
					if(!this.getIsPretest())
						setCpQuizScopeSlide(cpInfoCurrentSlideIndex);
					if(lSubmitAll)
					{
						//this.m_questionScore.m_numTries = 1;
						this.m_questionScore.m_wasJudged = !lAnsIncomplete;
												
						this.setCurrentAttempt(1);						
						this.wasJudged = !(this.getIsIncomplete());
						var lScore = this.getQuestionScoredPoints();
						this.setScore(lScore);	
						this.m_questionScore.m_scoredPoints = this.getScore();
					}
					else if(!this.getWasJudged())
					{
						this.m_questionScore.m_wasJudged = false;					
						
						this.wasJudged = false;
						//if(this.verbose)
						//	cp.log("Not attempted. Resetting Score to 0");
						this.setScore(0);
						this.m_questionScore.m_scoredPoints = 0;
					}					
				}	
						
				if(lAnsCorrectly)
				{
					if(!lSubmitAll)
						this.disableAllOptions();
					cpQuizInfoTotalCorrectAnswers = cpQuizInfoTotalCorrectAnswers + 1;
				}
				cpQuizInfoAnswerChoice =  this.getSelectedAnswerChoices();
				if(!this.getIsSurvey())
				{
					cpQuizInfoNoQuestionsPerQuiz =  cpQuizInfoNoQuestionsPerQuiz + 1;
					cpQuizInfoLastSlidePointScored = this.getQuestionScoredPoints();
				}
				else
				{
					cpQuizInfoLastSlidePointScored =  0;
				}

                var lDescriptionText = this.getDescriptionText();
			    
			    // Fix for bug 161633. As discussed with Gaurav.
			    if (iWasJudged && this.getIsTracked() && ! this.m_quizController.GetIsInReviewMode()) 
			    {
				    /*if (eachAnswerIsSeparateInteraction) 
				    {
					    lIter.reset();
					    while (lIter.hasNext()) 
					    {
						    var theAnswerObject:Object = lIter.next();
						    var qs:QuestionScore = theAnswerObject.getQuestionScore();
						    if (qs) 
						    {
							    quizController.sendInteractionData(qs, lDescriptionText);
						    }
					    }
				    } 
				    else 
				    {*/
					if(this.shouldReportAnswers)
					    this.m_quizController.SendInteractionData(this.getQuestionScore(), lDescriptionText);
				    /*}*/
			    }

                var lPlaybackController = this.m_quizController.GetPlaybackController();
                var lShouldSendCourseDataWithInteractionData = lPlaybackController.GetSendCourseDataWithInteractionData();
			    if (this.wasJudged && lShouldSendCourseDataWithInteractionData && !lSubmitAll) 
			    {
                    var lLMSType = lPlaybackController.GetLMSType().toUpperCase();
				    //ED's hotfix
				    if (lPlaybackController.GetIsTracked() && (lLMSType != "EMAIL") &&
															(lLMSType != "ACROBAT") &&
															(lLMSType != "INTERNALSERVER"))
					    lPlaybackController.SendCourseData(true);
				    else
					    lPlaybackController.SendCourseData(false);
			    }
			}
		},
		
		autoJudge: function()
		{
			if(this.verbose)
				cp.log("inside autojudge");
			this.setCurrentAttempt(this.numberOfAttempts - 1);
			this.judge(true, true);
		},
		
		checkAndSetQuestionStatus: function()
		{
			//to be overrridden by children classes
		},
		
		judge: function(iTreatIncompleteAsIncorrect,showTimeoutFeedback)
		{
			if(this.verbose)
				cp.log("inside judge");
			this.saveAnswerOrder();
			this.hideLastFeedback(false);
			
			var lIncompleteCaptionToBeShown = this.shouldShowIncompleteCaption();
			var lIsSurvey = this.getIsSurvey(); 

			var feedbackItem; 
			var timeOut;  
			var action; 
				
			this.checkAndSetQuestionStatus();			
				
			if(lIsSurvey)
			{
				if(this.verbose)
					cp.log("inside judge : isSurvey");
				//////TO DO - Show appropriate feedback and return
				if(this.getIsIncomplete())
				{
					if(this.verbose)
						cp.log("inside judge : incomplete");
					feedbackItem = this.getFeedbackToShow(iTreatIncompleteAsIncorrect,showTimeoutFeedback);
				} 
				else 
				{
					this.setCurrentAttempt(this.currentAttempt + 1);
					this.endQuestion(true);
					
					feedbackItem = this.getFeedbackToShow(iTreatIncompleteAsIncorrect,false);
				}				
			}
			else if(this.currentAttempt < this.numberOfAttempts)
			{ 
				if(this.getIsIncomplete() && !iTreatIncompleteAsIncorrect && lIncompleteCaptionToBeShown)
				{
					feedbackItem = this.getFeedbackToShow(iTreatIncompleteAsIncorrect,showTimeoutFeedback);
				} 
				else
				{ 
					this.setCurrentAttempt(this.currentAttempt + 1);
					feedbackItem = this.getFeedbackToShow(iTreatIncompleteAsIncorrect,showTimeoutFeedback);
					if((this.currentAttempt >= this.numberOfAttempts) || this.getAnsweredCorrectly())
					{
						this.endQuestion(true);
					}
					else
					{
						if(this.getIsIncorrect())
							this.setQuestionStatus(this.QuestionStatusEnum.INCOMPLETE);
						//this.m_questionScore.slideNum = this.slide.slideNum;
					    //this.m_quizController.addQuestionScore(questionScore);
                        var lPlaybackController = this.m_quizController.GetPlaybackController();
                        var lShouldSendCourseDataWithInteractionData = lPlaybackController.GetSendCourseDataWithInteractionData();
					    if (lShouldSendCourseDataWithInteractionData) 
                        {
						    var lLMSType = lPlaybackController.GetLMSType().toUpperCase();
							//ED's hotfix
							if (lPlaybackController.GetIsTracked() && (lLMSType != "EMAIL") &&
															(lLMSType != "ACROBAT") &&
															(lLMSType != "INTERNALSERVER") &&
															(lLMSType != "AICC")) //AICC Performance Improvement
							    lPlaybackController.SendCourseData(true);
						    else
							    lPlaybackController.SendCourseData(false);
					    }
					}				
				}				
			} 		 
			
			if(feedbackItem)
			{
				if(cp.model.data[feedbackItem.name] && feedbackItem.captionToBeShown)
					this.showFeedbackCaptionAndDoAction(feedbackItem);
				else
					cp.movie.executeAction(feedbackItem.action);					
				if(this.m_quizController && this.getIsLastPretestQuestion())
					this.m_quizController.m_PretestQuestionsDisabled = true;
			}			
            var evtArgs = this.getQuestionEventData();
            cp.em.fireEvent('CPQuestionSubmit',evtArgs);
		},		
        getQuestionEventData: function()
        {  
            var evtArgs = {
                slideNumber : this.m_slideIndex,
                questionNumber : this.getQuestionNumberInQuiz(),
                questionScoringType: this.getQuestionScoringType(),
                interactionType: this.getInteractionType(),
                weighting: this.getWeighting(),
                questionAnswered: (this.getIsIncomplete() == false),
                questionAnsweredCorrectly: this.getAnsweredCorrectly(),
                questionMaxScore:this.m_quizController.GetMaxScore(),
                questionScore:this.getScore(),
                questionMaxAttempts:this.numberOfAttempts,
                infiniteAttempts:(this.numberOfAttempts == 9999),
                questionAttempts:this.currentAttempt,
                interactionID:this.getInteractionId(),
                quizName:"QuizName",
                objectiveID:this.getObjectiveId(),
                selectedAnswer:this.getChosenAnswerAsString()
                };
		
            return evtArgs;

        },		
		showFeedbackCaptionAndDoAction: function(feedbackItem)
		{
			var lClickableDiv;
			
			var cachedObj = feedbackItem.name;
			var cachedObjData = cp.model.data[cachedObj];			
			var cachedObjc = cachedObjData.mdi;
			var lHideFeedbackCaptionHandler = function(aIsCorrectKey)
			{
				if(!aIsCorrectKey)
					return;
				
				lClickableDiv.parentNode.removeChild(lClickableDiv);
				cp.hide(cachedObj);
				self.setHandledClick(handledState);
				cp.movie.executeAction(feedbackItem.action);
				//parentSlideDivElement.onclick = parentSlideDivElementClickHandler;
				//parentSlideDivElement.style.cursor = 'default';				
			};
						
			this.hideLastFeedback(true);
						
			var handledState;
			if(this.slide)
			{
				var lSlideData = cp.model.data[this.slide];
				handledState = lSlideData["handled"];
			}			
			this.setHandledClick(false);
			this.lastFeedbackShown = feedbackItem;
			var self = this;			
			
			var lFramesetElement = document.getElementById(cachedObj);
			cp.moveDivElemToTop(lFramesetElement);
			var lCanvasElement = document.getElementById(cachedObjc);
			if(lCanvasElement != undefined)
				cp.moveRewrapElemToTop(lCanvasElement.parentNode);
			
			var lFeedbackItemData = cp.model.data[cachedObj];
			var lEffectObj = lFeedbackItemData['ef'];
			if(lEffectObj&&lEffectObj.id&&lEffectObj['ef'+lEffectObj.id])
			{
				var effectData = lEffectObj['ef'+lEffectObj.id];
				for(var i=0;i < effectData.length; ++i)
				{
					var effect = effectData[i];
					if(effect.sf > 1)
						continue;
					var curKeyFrameData = effect.kf[0];
					var xOffset = curKeyFrameData.x;
					var yOffset = curKeyFrameData.y;
					var	alphaOffset = effect.io/100;
					var matrixStr = 'translate('+xOffset+'px,'+yOffset+'px)';
					applyTransform(lFramesetElement,lFramesetElement.tr ? matrixStr+' '+lFramesetElement.tr : matrixStr);
					lFramesetElement.effectY = yOffset;
					lFramesetElement.effectX = xOffset;
					if(lFramesetElement.drawingBoard)
					{
						applyTransform(lFramesetElement.drawingBoard,matrixStr);
						lFramesetElement.drawingBoard.effectY = yOffset;
						lFramesetElement.drawingBoard.effectX = xOffset;
						lFramesetElement.drawingBoard.style.opacity = alphaOffset + '';
					}
				}
				effectData.startFrame = 0;
				lFeedbackItemData.runningEffects.push(lEffectObj.id);
			}
			var lKeyShortcut = lFeedbackItemData['sc'];
			var lCpShortcut = new cp.Shortcut(lKeyShortcut.k, 
				(lKeyShortcut.c ? true : false), 
				(lKeyShortcut.s ? true : false),
				(lKeyShortcut.a ? true : false));
			var lFrom = lFeedbackItemData['from'];
			var lTo = lFeedbackItemData['to'];
			
			function kHandler(isCorrectKey)
			{
				return lHideFeedbackCaptionHandler(isCorrectKey);
			}			
            var name = '';
           
			var lKeyHandler = new cp.KeyHandler(kHandler, lCpShortcut, lFrom, lTo,name);
			if (lKeyHandler) 
				cp.movie.stage.addKeyHandler(lKeyHandler);
			
			cp.show(cachedObj);
			
			var parentSlideDivElement = cp.movie.stage.getSlideDiv();
			//var parentSlideDivElementClickHandler = parentSlideDivElement.onclick;
			lClickableDiv = document.createElement("div");
			lClickableDiv.id = "feedbackClickDiv";
			lClickableDiv.style.left = parentSlideDivElement.style.left;
			lClickableDiv.style.top = parentSlideDivElement.style.top;
			lClickableDiv.style.width = parentSlideDivElement.style.width;
			lClickableDiv.style.height = parentSlideDivElement.style.height;
			lClickableDiv.style.cursor = 'pointer';		
			lClickableDiv.style.backgroundColor = "#FFFFFF";
			lClickableDiv.style.opacity = 0;
			lClickableDiv.style.display = "block";
			lClickableDiv.style.position = "absolute";
			lClickableDiv.style["WebkitTapHighlightColor"] = "rgba(0,0,0,0)";
			parentSlideDivElement.parentNode.appendChild(lClickableDiv);
			lClickableDiv.onclick = lHideFeedbackCaptionHandler;
		},
		
		clearButtonClickHandler: function(div)
		{
			this.clearAnswers();
		},
		
		skipButtonClickHandler: function(div)
		{
            
			//TODO: pretestHAndling
			var divdata = cp.model.data[div.id]; 
			if (divdata) 
			{ 
				if(!this.m_quizController)
					return;
				var isInReviewMode = this.m_quizController.GetIsInReviewMode();

                if(isInReviewMode==false)
			    {                    
				    if(this.getIsPretest() || !(this.m_quizController && this.m_quizController.GetIsSubmitAll()))
				    {
                        var evtArgs = this.getQuestionEventData();
                        cp.em.fireEvent('CPQuestionSkip',evtArgs);					    
				    }
			    }
				var lSubmitAll = this.m_quizController && this.m_quizController.GetIsSubmitAll();
				if(!this.getWasJudged() && !lSubmitAll)
				{
					this.clearAnswers();
				}
				
				if(cpInfoCurrentSlideIndex == cpInfoSlideCount)
				{
					cpCmndResume = true;
				}
				else
				{
			
					if( this.getIsLastPretestQuestion() )
					{
						if(this.m_quizController)
						{
							this.m_quizController.ExecutePretestAction(this.getSlideIndex());
						}
						return;
					}

					var lNeedBranchAwareHandling = (isInReviewMode == false);
					lNeedBranchAwareHandling = lNeedBranchAwareHandling && !(this.getIsPretest() ||  lSubmitAll );
					
					if( lNeedBranchAwareHandling  && this.m_quizController)
					{
						var lGraphManager = this.m_quizController.GetGraphManager();
						if( undefined != lGraphManager )
						{
							var lNextVisitableSlides = lGraphManager.getNextSlideList(this.getSlideIndex());
							if( lNextVisitableSlides.length == 1 )
							{
								cpCmndGotoSlideAndResume = lNextVisitableSlides[0];
							} 
							else 
							{
								var lCurrentBranch = lGraphManager.getBranchHistory();
								for(var iter = lCurrentBranch.length-1;iter>=0;--iter)
								{
									var lPrevSlideIndex = lCurrentBranch[iter];
									if( lPrevSlideIndex != this.getSlideIndex() )
										continue; 
									if( iter == (lCurrentBranch.length-1) )
										 continue; 
									var  lTargetSlideIndex = lCurrentBranch[iter+1];
									if(!lGraphManager.getIsJumpValid(lPrevSlideIndex,lTargetSlideIndex))
										continue;									
									cpCmndGotoSlideAndResume = lTargetSlideIndex;
									return;
								}
							}
							return;
						}

					}
					
					cpCmndNextOnReview = true;
				}
			}
		},
		
		backButtonClickHandler: function(div)
		{
			var divdata = cp.model.data[div.id]; 
			if (divdata) 
			{ 
				if(!this.m_quizController)
					return;
				var isInReviewMode = this.m_quizController.GetIsInReviewMode();
				var lSubmitAll = this.m_quizController && this.m_quizController.GetIsSubmitAll();
				
				
				var lNeedBranchAwareHandling = (isInReviewMode == false);
				if( lNeedBranchAwareHandling  && this.m_quizController)
				{
					var lGraphManager = this.m_quizController.GetGraphManager();
					if( undefined != lGraphManager )
					{
						var lCurrentBranch = lGraphManager.getBranchHistory();						
						for(var iter = lCurrentBranch.length-1;iter>=0;--iter)
						{
							var lTargetSlideIndex = lCurrentBranch[iter];
							if( lTargetSlideIndex != this.getSlideIndex() )
								continue;								
							if( iter == 0 ) 
								continue;								
							var lPrevSlideIndex  = lCurrentBranch[iter-1];
							if(!lGraphManager.getIsJumpValid(lPrevSlideIndex,lTargetSlideIndex))
								continue; 
							
							if(!this.getWasJudged() && !lSubmitAll)
								this.clearAnswers();
								
							cpCmndGotoSlideAndResume = lPrevSlideIndex;
							return;
						}
						return;
					}
				}
				
				if(!this.getWasJudged() && !lSubmitAll)
				{
					this.clearAnswers();
				}
				cpCmndPreviousOnReview = true;					
			}
		},
		
		clearAnswers: function()
		{
			//overridden in specific child questions
		},
		
		disableAllOptions: function()
		{ 
			//Should be implemented in derived class
		},
		
		getIsStarted: function()
		{
			return this.m_isStarted;
		},
		
		startQuestion: function()
		{
			if(!this.m_quizController)
				return;
			
			if(this.m_questionScore == undefined)
			{
				this.m_questionScore = new cp.QuestionScore();
			}
			
			//Initialize Question Status (needed if question is already visited or getting restore from LMS)
			//this.checkAndSetQuestionStatus();
			
			var lIsInReviewMode = this.m_quizController.GetIsInReviewMode();
			
			var lGoToQuizScopeSlideExecuted = this.m_quizController.GetGoToQuizScopeActionExecuted();
			
			if(lGoToQuizScopeSlideExecuted && !lIsInReviewMode)
			{
				//Ideally pretestQuestion can not be the QuizScopeSlide.. Still we are handling it here for safety
				if(!this.getIsPretest())
					this.resetQuestionData();
				this.m_quizController.SetGoToQuizScopeActionExecuted(false);
			}
			
			if(this.verbose)
				cp.log("current state : " + this.state);
			if((this.state == this.StateEnum.INIT) || (this.state == this.StateEnum.ENDED))
			{
				if(this.verbose)
					cp.log("startQuestion");
				this.state = this.StateEnum.PLAYING;
				
				this.updateQuizProgressIndicator();
				
				if((lIsInReviewMode) || this.getWasJudged())
				{					
					var lCannotDisable = lGoToQuizScopeSlideExecuted && !this.getIsPretest();
					if(lIsInReviewMode || !lCannotDisable )
					{
						this.disableAllOptions();
						this.disableQuizButtons();
					}
					if((lIsInReviewMode) && (this.canShowReviewIcons()))
						this.markQuestionFeedback();
				}	
				else
				{
					this.startLatency();
					this.startTime = new Date();
					if(this.m_questionScore.m_numTries == 0)
						this.m_questionScore.m_startTime = this.startTime;
				}
				
				var lHandleSubmitAll = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
				
				if ((this.getCurrentAttempt() == 0 && !lHandleSubmitAll) || this.getIsIncomplete())
				{
					if(this.getCurrentAttempt() < this.getNumberOfAttempts() )
					{
						if(!(this.m_quizController.GetIsPretestQuestionsDisabled() && this.getIsPretest()))
						{
							if(!lGoToQuizScopeSlideExecuted)
								this.clearAnswers();
						}
					}
				}
				
				cpQuizInfoPointsPerQuestionSlide = this.getWeighting();
				cpQuizInfoNegativePointsOnCurrentQuestionSlide = this.getNegativeWeight();
				cpQuizInfoQuestionPartialScoreOn = this.isPartialScore;
				if(this.timeLimit != undefined)
					cpQuizInfoQuestionSlideTiming = (this.timeLimit/1000);
				
				cpQuizInfoAnswerChoice = "";
				cpQuizInfoQuestionSlideType = this.getInteractionType();
				cpQuizInfoMaxAttemptsOnCurrentQuestion = this.numberOfAttempts;
				
				var lPassingScore = this.m_quizController.GetPassingScore();			
				var lMaxScore = this.m_quizController.GetMaxScore();
				cpQuizInfoQuizPassPoints = lPassingScore; 
				if(lMaxScore != 0) 
					cpQuizInfoQuizPassPercent = parseInt((lPassingScore*100)/lMaxScore);
			}
			
			this.m_isStarted = true;
		},

		markQuestionFeedback: function()
		{
			if(!this.getWasJudged())
				return;
			
			if(!this.questionTextCanvasName)
				return;
						
			var questionTextCanvasData = cp.model.data[this.questionTextCanvasName];
			var questionTextCanvasBounds = questionTextCanvasData['b'];
			var questionTextDivName = 're-'+this.questionTextCanvasName; 
			var bounds = questionTextCanvasBounds;
			var feedbackBounds = {
					minX:  - 30,
					minY: 0,			
					maxX:  - 5,
					maxY: 0
				};
			
			var newImg = document.createElement('img');				
			
			var lQuestionStatus = this.getQuestionStatus();
			if(lQuestionStatus == this.QuestionStatusEnum.CORRECT)
			{
				newImg.src = './assets/htmlimages/correct_question_normal.png';              
				newImg.setAttribute('tabindex', '0');
				if(this.m_correctFeedbackText != undefined)
				{
					newImg.setAttribute('aria-label',this.m_correctFeedbackText);
					cp.removeAccessibilityOutline( newImg );
					newImg.setAttribute('role','img');
				}
			}
			else if(lQuestionStatus == this.QuestionStatusEnum.PARTIAL_CORRECT)
			{
				newImg.src = './assets/htmlimages/partial_correct_question_normal.png';    
				newImg.setAttribute('tabindex', '0');
				if(this.m_partialCorrectFeedbackText != undefined)
				{
					newImg.setAttribute('aria-label',this.m_partialCorrectFeedbackText);
					cp.removeAccessibilityOutline( newImg );
					newImg.setAttribute('role','img');
				}				
			}
			else
			{
				newImg.src = './assets/htmlimages/incorrect_question_normal.png';	
				if((this.m_incorrectDisplayChosenText != undefined) && (this.m_incorrectDisplayCorrectText != undefined) && (this.getQuestionType() != 'Hotspot'))
				{
					var lIncorrectText = "";
					lIncorrectText = lIncorrectText.concat(this.m_incorrectDisplayChosenText," ",this.getChosenAnswerAsStringForReview()," ",this.m_incorrectDisplayCorrectText," ",this.getCorrectAnswerAsStringForReview());
					newImg.setAttribute('tabindex', '0');
					newImg.setAttribute('aria-label',lIncorrectText);
					cp.removeAccessibilityOutline( newImg );
					newImg.setAttribute('role','img');
				}	
			}
			var self = questionTextCanvasData;
           	if(self.sh)
			{
				var mAngle = self.sh.a;
				applyShadow(newImg,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
			}	
			newImg.style.left = feedbackBounds.minX + 'px';
			newImg.style.top = feedbackBounds.minY + 'px';
			//newImg.style.width = (feedbackBounds.maxX - feedbackBounds.minX) + 'px';
			//newImg.style.height = (feedbackBounds.maxY - feedbackBounds.minY) + 'px';
			newImg.style.position = 'absolute';
			var currDiv = document.getElementById(questionTextDivName);
			
			currDiv.appendChild(newImg);
		},
		
		getWasJudged: function()
		{
			return this.wasJudged;
		},
		
		setHandledClick: function(aValue)
		{
			if(this.slide)
			{
				var lSlideData = cp.model.data[this.slide];
				lSlideData["handled"] = aValue;
			}			
		},
		
		enableButton: function(aButton)
		{
			if( aButton == undefined )
				return;
			cp.enable(aButton.id);
			aButton.disabled = false;
			aButton.style.cursor = "pointer";
			var lButtonData = cp.model.data[aButton.id];
			var lClickHandler = lButtonData.chfn;
			aButton.onclick = function(e)
								{  
									if(e.stopPropagation)
									{
										e.stopPropagation(); 
									}
									lClickHandler(e.target);
								};
		},
		
		enableQuizButtons: function()
		{
			if(this.verbose)
				cp.log("Enabling buttons");			
			
			this.enableButton(this.submitButtonDivElement);
			this.enableButton(this.clearButtonDivElement);
			this.enableButton(this.submitAllButtonDivElement);
			
			this.m_areButtonsDisabled = false;
		},		
		
		disableButton: function(aButton)
		{
			if( aButton == undefined )
				return;
			cp.disable(aButton.id);
			aButton.disabled = 'disabled';
			aButton.tabIndex = -1;
			aButton.style.cursor = "default";
			aButton.onclick = "";
		},
		
		disableQuizButtons: function()
		{
			if(this.verbose)
				cp.log("Disabling buttons");
			
			if(!this.m_quizController)
				return;
				
			var lCanDisable = true;
			var lSubmitAll = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
			if(lSubmitAll && !this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions)
				lCanDisable = false;
			
			if(!lCanDisable)
				return;
			
			this.disableButton(this.submitButtonDivElement);
			this.disableButton(this.clearButtonDivElement);
			this.disableButton(this.submitAllButtonDivElement);
						
			this.m_areButtonsDisabled = true;
		},		
		
		shouldDisableSkipButton: function()
		{
			var lShouldDisableSkipbutton = false;
			
			if(this.m_quizController.GetIsInReviewMode())
				return false;
			
			var lSubmitAll = this.m_quizController.GetIsSubmitAll();
			var lMustAnswer = this.m_quizController.GetQuestionAdvanceType() == 'mustAnswer';
			if(lMustAnswer && !lSubmitAll && !this.m_answersDisabled && !this.getIsPretest()) 
				return true;
				
			var lSlideIndex = this.getSlideIndex();
			if((lSlideIndex >=0) && !( this.getIsPretest() ||lSubmitAll))
			{
				var lGraphManager = this.m_quizController.GetGraphManager();
				if( undefined != lGraphManager )
				{
					var lNextVisitableSlides = lGraphManager.getNextSlideList(lSlideIndex);
					if(lNextVisitableSlides != undefined)
					{
						if( lNextVisitableSlides.length == 1 )
						{
							lShouldDisableSkipbutton = false;
						}
						else
						{
							lShouldDisableSkipbutton = true;
							var lCurrentBranch = lGraphManager.getBranchHistory();
							if(lCurrentBranch != undefined)
							{
								for(var iter = lCurrentBranch.length-1;iter>=0;--iter)
								{
									var lPrevSlideIndex = lCurrentBranch[iter];
									if( lPrevSlideIndex != lSlideIndex )
										 continue; 
									if( iter == (lCurrentBranch.length-1) ) 
										continue; 
									var lTargetSlideIndex = lCurrentBranch[iter+1];
									if(!lGraphManager.getIsJumpValid(lPrevSlideIndex,lTargetSlideIndex))
										 continue; 									
									lShouldDisableSkipbutton = false;
									break;
								}
							}
						}
					}
				}
			}
			
			return lShouldDisableSkipbutton;
		},
				
		canShowReviewIcons: function()
		{			
			if(this.getIsSurvey())
				return false;
			if(this.getIsIncomplete())
				return false;
			if(!this.m_quizController)
				return false;
			var lIsInReviewMode = this.m_quizController.GetIsInReviewMode();
			if(!lIsInReviewMode)
				return false;
			if(this.getIsPretest())
				return false;
			return true;	
		},
		
		getIsAttempted: function() //just to check if user has attempted the question even once or not
		{
			return (this.currentAttempt > 0);
		},
		
		resumeSelectedAnswers: function(iAnswerScores)
		{		
			if(iAnswerScores == undefined)
				return;
			
			this.m_selectedAnswersArr = [];
			for (var whichAns = 0; whichAns <iAnswerScores.length; whichAns++)
			{
				if(iAnswerScores[whichAns].m_chosenAnswer == "1")
				{
					this.m_selectedAnswersArr.push(iAnswerScores[whichAns].m_answerID);					
				}
			}			
		},
		
		getChosenAnswerAsString: function()
		{
			return this.getSelectedAnswersAsString();
		},
		
		getCorrectAnswerAsString: function()
		{
			var lRetList = this.getExpectedCorrectAnswerIDList();
			if(lRetList.length <= 0)
				return "0";//Just to avoid LMS error
			
			var lRetStr = lRetList[0];
			for(var i = 1; i < lRetList.length; ++i)
			{
				lRetStr += ";" + lRetList[i];
			}
			
			return lRetStr;
		},
		
		getChosenAnswerAsStringForReview: function()
		{
			return "";
		},
		
		getCorrectAnswerAsStringForReview: function()
		{
			return "";
		},
		
		getAnswerScores: function()
		{
			//get all the answers & check in selected answer to get if its chosen
			var lAnswerScores = [];
			if ( ! this.answerOptions )
				return lAnswerScores;
			
			var lSelectedAnswers = this.m_selectedAnswersArr.slice(0);
			var lSelectedAnswersMap ={};
			for(var lIndex = 0; lIndex < lSelectedAnswers.length; ++lIndex)
			{
				lSelectedAnswersMap[lSelectedAnswers[lIndex]]=lSelectedAnswers[lIndex];
			}
			
			for(var i = 0; i < this.answerOptions.length; ++i)
			{
				var lAnswerOptionData = cp.model.data[this.answerOptions[i]];
				if(!lAnswerOptionData)
					continue;
				var lAnsScore = new cp.AnswerScore();
				lAnsScore.m_answerID = lAnswerOptionData['aid'];
				if(lAnswerOptionData['ic'])
					lAnsScore.m_correctAnswer = "1";
				else
					lAnsScore.m_correctAnswer = "0";
				if(lSelectedAnswersMap[lAnsScore.m_answerID]) //Check if this option is selected
					lAnsScore.m_chosenAnswer = "1";
				else
					lAnsScore.m_chosenAnswer = "0";
				lAnswerScores.push(lAnsScore);					
			}
			return lAnswerScores;		
		},
		
		getQuestionScore: function()
		{
			if(!this.m_questionScore)
				return;
			
			this.m_questionScore.m_isPretestQuestion = this.getIsPretest();
			//Needed for Resume
			this.m_questionScore.m_slideNum= this.m_slideIndex; 			
			this.m_questionScore.m_questionNumInQuiz= this.getQuestionNumberInQuiz();			
			//this.m_questionScore.m_startTime = this.startTime;			
			//this.m_questionScore.m_endTime = this.endTime;			
			//this.m_questionScore.m_wasJudged = this.wasJudged;
			
			var lQuestionStatus = this.getQuestionStatus();
			//this.m_questionScore.m_answeredCorrectly = this.getAnsweredCorrectly();
			//this.m_questionScore.m_answersIncomplete = this.getIsIncomplete();
			this.m_questionScore.m_numTries = this.getCurrentAttempt();
			//this.m_questionScore.m_scoredPoints = this.getScore();
			//this.m_questionScore.m_partiallyCorrect = this.getIsPartiallyCorrect();
			//this.m_questionScore.m_isShuffled = this.m_isShuffled;
			
			//Set InteractionType (QuestionSpecificScore will be created while setting interactionType);
			this.m_questionScore.setinteractionType(this.getInteractionType());
			this.setQuestionSpecificScoreProperties(this.m_questionScore.m_questionSpecificScore);
						
			//this.m_questionScore.m_answerScores = this.getAnswerScores();
			
			//Needed for Interaction Data
			this.m_questionScore.m_interactionID = this.getInteractionId();
			this.m_questionScore.m_objectiveID = this.getObjectiveId();
			this.m_questionScore.m_chosenAnswersAsString = this.getChosenAnswerAsString();
			this.m_questionScore.m_isCorrectAsString = this.getAnsweredCorrectly() ? "C" : "W" ;
			this.m_questionScore.m_correctAnswersAsString = this.getCorrectAnswerAsString();

            this.m_questionScore.m_scoringType = this.getQuestionScoringType();
            this.m_questionScore.m_maxTries = this.numberOfAttempts;
			
			var lDescriptionText = this.getDescriptionText();
			
			this.m_questionScore.m_descriptionTexts = lDescriptionText;//this.getQuestionText();
			this.m_questionScore.m_weighting = this.getWeighting();

			addLeadingZero = function(n)
			{
				if (n < 10) 
				{
					return "0"+ (n);
				} 
				else 
				{
					return n;
				}
			};
			
			var lLatency = this.getLatency();
			this.m_questionScore.m_latencyAsSeconds = lLatency;
			this.m_questionScore.m_latencyAsString = addLeadingZero(Math.round(lLatency/3600))+":"+addLeadingZero(Math.round((lLatency % 3600)/60))+":"+addLeadingZero(Math.round(lLatency) % 60);
			
			var today_date = new Date();
			this.m_questionScore.m_curDateAsString2 = addLeadingZero(today_date.getMonth()+1)+"/"+addLeadingZero(today_date.getDate())+"/"+today_date.getFullYear();
			this.m_questionScore.m_curDateAsString = today_date.getFullYear()+"/"+addLeadingZero(today_date.getMonth()+1)+"/"+addLeadingZero(today_date.getDate());
			this.m_questionScore.m_curTimeAsSecondsSinceMidnight = today_date.getHours()*3600 + today_date.getMinutes()*60+today_date.getSeconds();
						
			return this.m_questionScore;
		},
		
		getSlide: function()
		{
			return this.slide;
		},
		
		updateQuizProgressIndicator: function()
		{
			if(!this.m_quizController)
				return;
			var lQuestionsOnCurrentSlide = this.m_quizController.GetQuestionsOnSlide(this.m_slideIndex);
			if(lQuestionsOnCurrentSlide.length <=0)
				return;
			var lIsFirstQuestionOnCurrentSlide = (this == lQuestionsOnCurrentSlide[0]);
			
			if ((this.state == this.StateEnum.PLAYING) &&  lIsFirstQuestionOnCurrentSlide) 
			{	
				//quizController.quizProgressIndicator.questionNum = 1+questionNumInQuiz;
				//quizController.quizProgressIndicator.numQuestions = quizController.numQuestions;
			}
			
			if(this.state == this.StateEnum.PLAYING )
			{
				var lGraphManager = this.m_quizController.GetGraphManager();
				if(lGraphManager && !this.getIsPretest())
				{
					lGraphManager.setQuestionSlideProgressNumber(this.m_slideIndex);				
					//SetProgressIndicatorType on encountering first non-pretest Question Slide
					if(!this.m_quizController.GetFirstNonPretestQuestionEncountered())
					{
						this.m_quizController.SetFirstNonPretestQuestionEncountered(true);
						var lCompletionBranch = lGraphManager.getCompletionBranch();
						if(lCompletionBranch.length <=0)
							this.m_quizController.SetForceAbsoluteProgressType (true) ;// Set it absolute for whole quiz if not able to find completion branch on first non pretest question 						
					}
				}
			}
		},
		
		setQuestionSpecificScoreProperties: function(aQuestionSpecificScore)
		{
			if(aQuestionSpecificScore == undefined)
				return;
		
			var lAnswerOrder = "";
			var lOptions = this.questionData['ao'];		
			var lAnswerOptions = this.m_answerOrderArray;
			if(lAnswerOptions && lOptions && (lAnswerOptions.length >0) && (lAnswerOptions.length == lOptions.length ))
			{
				var lAnswerNameToIndexMap = {};
				for(var j =0; j < lOptions.length; ++j)
				{
					var lOpt = lOptions[j].split(":");
					lAnswerNameToIndexMap[lOpt[0]] =lOpt[1]; 
				}		
			
				var lKey = lAnswerOptions[0];
				lAnswerOrder += lAnswerNameToIndexMap[lKey];
				
				for(var i=1; i<lAnswerOptions.length; ++i)
				{
					lKey = lAnswerOptions[i];
					lAnswerOrder += ";"+ lAnswerNameToIndexMap[lKey];
				}
			}
			aQuestionSpecificScore.m_answerOrderArrayAsString = lAnswerOrder;
		},

		restoreFromQuestionSpecificScoreProperties: function(aQuestionSpecificScore)
		{
			if(aQuestionSpecificScore == undefined)
				return;
			
			var lAnswerOrder = aQuestionSpecificScore.m_answerOrderArrayAsString ;
			if((lAnswerOrder == undefined) || (lAnswerOrder == ""))
				return;

			var lIndexArr = lAnswerOrder.split(";"); 	
			var lOptions = this.questionData['ao'];		
			var lAnswerOptions = this.answerOptions;
			
			if(!lAnswerOptions || !lOptions )
				return;
			if((lAnswerOptions.length <=0) || (lAnswerOptions.length != lOptions.length )  || (lAnswerOptions.length  != lIndexArr.length) )
				return;
			
				
			var lAnswerIndexToNameMap = {};
			for(var j =0; j < lOptions.length; ++j)
			{
				var lOpt = lOptions[j].split(":");
				lAnswerIndexToNameMap[lOpt[1]] =lOpt[0]; 
			}		
			
			var lAnswerOpt = "";
			var lKey = lIndexArr[0];
			lAnswerOpt += lAnswerIndexToNameMap[lKey];
				
			for(var i=1; i<lIndexArr.length; ++i)
			{
				lKey = lIndexArr[i];
				lAnswerOpt += ";"+ lAnswerIndexToNameMap[lKey];
			}
			
			this.setAnswerOrder(lAnswerOpt);	
		}
	}
	
	
	cp.MultipleChoiceQuestion = function(questionObjName,associatedObjName)
	{
		cp.MultipleChoiceQuestion.baseConstructor.call(this, questionObjName, associatedObjName);
		this.answerOptions = this.getAnswerOptions();
		this.shuffleCounter = -1;
		this.isShuffleEnabled = (this.questionData['sh']);
		this.correctAnswersList = "";
		this.chosenAnswerHasAdvancedFeedback = false;
		this.typeStatesMap = {'radio': {'default':'./assets/htmlimages/radioButton_normal.png',
										'selected':'./assets/htmlimages/radioButton_selected.png',
										'disabled':'./assets/htmlimages/radioButton_disabled.png',
										'selectedDisabled':'./assets/htmlimages/radioButton_selectedDisabled.png'
									   },
							  'checkbox': {'default':'./assets/htmlimages/checkBox_normal.png',
										'selected':'./assets/htmlimages/checkBox_selected.png',
										'disabled':'./assets/htmlimages/checkBox_disabled.png',
										'selectedDisabled':'./assets/htmlimages/checkBox_selectedDisabled.png'
									   }};
		this.verbose = false;
	}
	
	cp.inherits(cp.MultipleChoiceQuestion, cp.Question);
	
	cp.MultipleChoiceQuestion.prototype.getImageForState = function(type,state)
	{
		var typeObj = this.typeStatesMap[type];
		var urlObj = typeObj[state];
		
		return urlObj;
	}
	
	cp.MultipleChoiceQuestion.prototype.getAnswerScore = function(answerID)
	{
		var lAnswerScore = 0;
		for(var i = 0; i < this.answerOptions.length; ++i)
		{
			var lAnswerOptionData = cp.model.data[this.answerOptions[i]];
			if(answerID == lAnswerOptionData['aid'])
			{
				lAnswerScore = lAnswerOptionData['ap'];
				break;
			}	
		}
		return lAnswerScore;
	}
	
	cp.MultipleChoiceQuestion.prototype.getSelectedAnswerChoices = function()
	{
		var lActualAnswerChoices = "";
		
		var lSelectedAnswers = this.m_selectedAnswersArr.slice(0);
		if(lSelectedAnswers && lSelectedAnswers.length <= 0)
			return "";
		
		var lSelectedAnswerChoices = [];
		var lOriginalAnsOptions = this.questionData.ao;
		for(var i = 0; i < lOriginalAnsOptions.length; ++i)
		{
			var lCurrOption = lOriginalAnsOptions[i].split(":");
			var lOriginalAnsCanvasData = cp.model.data[lCurrOption[0]];
			for(var j = 0; j < lSelectedAnswers.length; ++j)
			{
				if(lOriginalAnsCanvasData.aid == lSelectedAnswers[j])
				{
					var lSelectedCanvasData = cp.model.data[this.answerOptions[i]];
					lSelectedAnswerChoices.push(lSelectedCanvasData.aid);
				}				
			}			
		}		

		lActualAnswerChoices += lSelectedAnswerChoices[0];
		for(var lIndex = 1; lIndex < lSelectedAnswerChoices.length; ++lIndex)
		{
			lActualAnswerChoices += ";";
			lActualAnswerChoices += lSelectedAnswerChoices[lIndex];
		}		
		
		return lActualAnswerChoices;
	}
	
	cp.MultipleChoiceQuestion.prototype.getAnswerScores = function()
	{
		//get all the answers & check in selected answer to get if its chosen
		var lAnswerScores = [];		
		if ( ! this.answerOptions )
			return lAnswerScores;
		
		var lAnswerInputs = document.getElementsByName(this.getAnswerGroupName());
		var lSelectedAnswers = this.m_selectedAnswersArr.slice(0);
		var lSelectedAnswersMap ={};
		for(var lIndex = 0; lIndex < lSelectedAnswers.length; ++lIndex)
		{
			lSelectedAnswersMap[lSelectedAnswers[lIndex]]=lSelectedAnswers[lIndex];
		}
		
		for(var i = 0; i < lAnswerInputs.length; ++i)
		{
			var parentId = lAnswerInputs[i].parentElement.parentElement.parentElement.id;
			var lParentData = cp.model.data[parentId];
			var lAnswerTextCanvasHolderElem = cp(lParentData["answerTextCanvasHolder"]);
			var lCanvasElem = lAnswerTextCanvasHolderElem.firstChild;
			var answerTextData = cp.model.data[lCanvasElem.id];
			
			var lAnsScore = new cp.AnswerScore();
			lAnsScore.m_answerID = lParentData['aid'];
			if(answerTextData['ic'])
				lAnsScore.m_correctAnswer = "1";
			else
				lAnsScore.m_correctAnswer = "0";
			if(lSelectedAnswersMap[lParentData['aid']]) //Check if this option is selected
				lAnsScore.m_chosenAnswer = "1";
			else
				lAnsScore.m_chosenAnswer = "0";
			lAnswerScores.push(lAnsScore);					
		}
		return lAnswerScores;		
	}
	
	cp.MultipleChoiceQuestion.prototype.getQuestionScoredPoints = function()
	{
		if (this.getIsSurvey()) 
			return 0;
		if(!this.getWasJudged()) //If Question is not judged or skipped return 0 points
			return 0;
			
		if(!this.isPartialScore) 
			return this.getQuestionLevelScoredPoints();
			
		//Note: If Partial Scoring is ON then scored points  will be the sum of points of selected answers (positive or negative.)
		var lSelectedOptions = this.getSelectedOptions(this.getAnswerGroupName());
		if(!lSelectedOptions)
			return 0;
		var lQuestionScore = 0;
		for (var i = 0; i < lSelectedOptions.length; ++i)
		{
			var lCurrSelectedOption = lSelectedOptions[i];
			var lCurrOptionCanvasAnswerID = this.getAnswerID(lCurrSelectedOption.parentNode);
			if(lCurrOptionCanvasAnswerID)
				lQuestionScore = lQuestionScore + this.getAnswerScore(lCurrOptionCanvasAnswerID);
		}
		return lQuestionScore;		
	}
	
	cp.MultipleChoiceQuestion.prototype.shuffleAnswers = function()
	{
		var lCanDisableAnswer = !this.m_quizController.GetIsAttemptFinished() && this.getWasJudged() && !this.m_quizController.GetIsSubmitAll();
		var lShouldDisablePretestQuestion = this.getIsPretest() && this.m_quizController.GetIsPretestQuestionsDisabled();			
		
		var lCanShuffle = this.isShuffleEnabled && !lCanDisableAnswer && !this.m_quizController.GetIsInReviewMode() && !lShouldDisablePretestQuestion;	
		
		if(!lCanShuffle || this.m_isShuffled)
			return;
				
		var i;
		var len = this.answerOptions.length;
		var n;
		var temp;
		var RandomAnswers_array = new Array();
					
		for(i = 0; i < len ; i++)
		{
			RandomAnswers_array[i] = this.answerOptions[i];
		}

		for(i = len; i > 1 ; i--)
		{
			n = Math.floor(Math.random() * i);
			if(n != i)
			{
				temp = RandomAnswers_array[n];
				RandomAnswers_array[n] =  RandomAnswers_array[i-1];
				RandomAnswers_array[i-1] = temp;
			}
		}
		this.answerOptions = RandomAnswers_array;
		
		this.m_isShuffled = true;
	},
	
	cp.MultipleChoiceQuestion.prototype.getAnswerOption = function(radioButtonDivData)
	{
		this.shuffleAnswers();
		var answerOptionData;			
		
		var lCurrentOption = this.answerOptions[++this.shuffleCounter];
			
		return lCurrentOption;
	},
	
	cp.MultipleChoiceQuestion.prototype.getIfSelected = function(inAnswerID)
	{
		if(!this.m_selectedAnswersArr)
			return false;
		if(this.m_selectedAnswersArr.length <= 0)
			return false;
		
		for(var i = 0; i < this.m_selectedAnswersArr.length; ++i)
		{
			if(inAnswerID == this.m_selectedAnswersArr[i])
				return true;
		}
		
		return false;
	}
		
	cp.MultipleChoiceQuestion.prototype.resetQuestionData = function()
	{
		cp.MultipleChoiceQuestion.superClass.resetQuestionData.call(this);
		if(!this.m_quizController.GetGoToQuizScopeActionExecuted())
			this.m_selectedAnswersArr = [];
		this.correctAnswersList = "";
		this.shuffleCounter = -1;
		this.chosenAnswerHasAdvancedFeedback = false;
	},
		
	cp.MultipleChoiceQuestion.prototype.setSelectedAnswers = function()
	{
		var lSelectedOptions = this.getSelectedOptions(this.getAnswerGroupName());		
		if(!lSelectedOptions)
			return;
		if(lSelectedOptions.length <= 0)
			return;
		this.m_selectedAnswersArr = [];
		for(var i = 0; i < lSelectedOptions.length; ++i)
		{
			var parentId = lSelectedOptions[i].parentElement.parentElement.parentElement.id;
			var lParentData = cp.model.data[parentId];
			this.m_selectedAnswersArr.push(lParentData.aid);
		}
	}
	
	cp.MultipleChoiceQuestion.prototype.disableAllOptions = function()
	{
		if(!this.m_quizController)
			return;
			
		var lCanDisable = true;
		var lSubmitAll = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
		if(lSubmitAll && !this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions)
			lCanDisable = false;
		
		if(!lCanDisable)
			return;
			
		var answerOptions = document.getElementsByName(this.getAnswerGroupName());
		if(answerOptions.length < 1)
			return;
		var textForSplitId = "";
		var typeOfOption = answerOptions[0].type;
		if(typeOfOption == 'radio')
			textForSplitId = '_radioInputField';
		else if(typeOfOption == 'checkbox')
			textForSplitId = '_checkBoxInputField';	
		for(var i=0; i < answerOptions.length; i++)
		{
			var currElem = answerOptions[i];			
			if(currElem.disableOption)
				currElem.disableOption();
		}
		
		this.m_answersDisabled = true;
	}		
	
	cp.MultipleChoiceQuestion.prototype.getChosenAnswerFeedback = function()
	{
		var radioButtons = document.getElementsByName(this.getAnswerGroupName());
		var selectedOptions = [];
		var selectedCount = 0;
		var lReturnFeedbackObject;
		for(var i=0; i < radioButtons.length; i++)
		{
			if (radioButtons[i].checked == true) 
			{
				selectedOptions[selectedCount++] = radioButtons[i];
				var parentId = radioButtons[i].parentElement.parentElement.parentElement.id;
				var lParentData = cp.model.data[parentId];
				var lAnswerTextCanvasHolderElem = cp(lParentData["answerTextCanvasHolder"]);
				var lCanvasElem = lAnswerTextCanvasHolderElem.firstChild;
				var answerTextData = cp.model.data[lCanvasElem.id];
								
				var advancedFeedbackItemName = answerTextData['fb'];
				var advancedFeedbackItemAction = answerTextData['ac'];
				if(advancedFeedbackItemName || advancedFeedbackItemAction)
				{
					lReturnFeedbackObject = new Object();
					if(advancedFeedbackItemName != undefined)
					{					
						if(cp.model.data[advancedFeedbackItemName])
						{
							lReturnFeedbackObject.name = advancedFeedbackItemName;
							lReturnFeedbackObject.captionToBeShown = true;
						}
					}	
					
					if(advancedFeedbackItemAction != undefined)
					{
						lReturnFeedbackObject.action = advancedFeedbackItemAction;					
					}
				}
			}
		}
		
		return lReturnFeedbackObject;
	}
		
	cp.MultipleChoiceQuestion.prototype.getSelectedOptions = function(groupName)
	{
		var radioButtons = document.getElementsByName(groupName);
		var selectedOptions = [];
		var selectedCount = 0;
		for(var i=0; i < radioButtons.length; i++)
		{
			if (radioButtons[i].checked == true) 
			{
				selectedOptions[selectedCount++] = radioButtons[i];				
			}
		}
		
		return selectedOptions;
	}
	
	cp.MultipleChoiceQuestion.prototype.clearAnswers = function()
	{
		if(this.verbose)
			cp.log("Inside Clear Answers");
		
		var lSubmitAll = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
		var lCanClearAnswers = (this.getWasJudged() == false)  || (lSubmitAll && (this.m_quizController.m_submittedAllQuestions == false));
		lCanClearAnswers = lCanClearAnswers && !this.m_quizController.GetIsInReviewMode();
		if(lCanClearAnswers  == false)
			return;		
		
		this.m_selectedAnswersArr = [];
		
		if(this.verbose)
			cp.log("Not Attempted. Hence Clearing");
		var answerOptions = document.getElementsByName(this.getAnswerGroupName());
		if(answerOptions.length < 1)
			return;
		var textForSplitId = "";
		var typeOfOption = answerOptions[0].type;
		if(typeOfOption == 'radio')
			textForSplitId = '_radioInputField';
		else if(typeOfOption == 'checkbox')
			textForSplitId = '_checkBoxInputField';	
		for(var i=0; i < answerOptions.length; i++)
		{
			var currElem = answerOptions[i];
			currElem.checked = false;
			currElem.loadAndDrawImage(this.getImageForState(typeOfOption,'default'));					
		}	
	}
	
    cp.MultipleChoiceQuestion.prototype.checkIfPartiallyCorrect = function(selectedOptions)
	{
		if(!this.isPartialScore)
			return false;
		var expectedCorrectAnsIDList = this.getExpectedCorrectAnswerIDList();
		var expectedCorrectAnsIDMap = {};
		var expectedCorrectAnsCount = expectedCorrectAnsIDList.length;
		for(var mm = 0; mm < expectedCorrectAnsIDList.length; ++mm)
		{
			expectedCorrectAnsIDMap[expectedCorrectAnsIDList[mm]] = expectedCorrectAnsIDList[mm];
		}
		
		
		var selectedCorrectAnsCount = 0;
		var selectedInCorrectAnsCount = 0;
		for(var i = 0; i < selectedOptions.length; ++i)
		{
			var currSelectedOption = selectedOptions[i];
			var selectedAnsID = this.getAnswerID(currSelectedOption.parentNode);
			if(expectedCorrectAnsIDMap[selectedAnsID]) 
				++selectedCorrectAnsCount;
			else
				++selectedInCorrectAnsCount;
		}
		
		var lPartiallyCorrect = false;
		//Question is partially correct if atleast one is correct but question shouldn't be totally correct
		if(selectedCorrectAnsCount >0)
		{
				lPartiallyCorrect = true;
				if((selectedCorrectAnsCount == expectedCorrectAnsCount) && (selectedInCorrectAnsCount ==0)) //Question is Totally Correct
					lPartiallyCorrect =false;
		}
		
		return lPartiallyCorrect;
    }

	cp.MultipleChoiceQuestion.prototype.checkIfCorrect = function(selectedOptions)
	{			
		var expectedCorrectAnsIDList = this.getExpectedCorrectAnswerIDList();
		var expectedCorrectAnsIDMap = {};
		for(var mm = 0; mm < expectedCorrectAnsIDList.length; ++mm)
		{
			expectedCorrectAnsIDMap[expectedCorrectAnsIDList[mm]] = expectedCorrectAnsIDList[mm];
		}
		
		var selectedCorrectAnsIDList = [];
		var selectedCorrectAnsIDMap = {};
		var selectedCorrectAnsCount = 0;
		for(var i = 0; i < selectedOptions.length; ++i)
		{
			var currSelectedOption = selectedOptions[i];
			var parentDivId;
			parentDivId = currSelectedOption.parentNode.parentNode.parentNode.id;	
			var parentDivData = cp.model.data[parentDivId]; 
			
			if(!parentDivData['ic'])
				return false;
			
			var selectedAnsID = this.getAnswerID(currSelectedOption.parentNode);
			
			if(!expectedCorrectAnsIDMap[selectedAnsID]) 
				return false;
			
			selectedCorrectAnsIDList[selectedCorrectAnsCount++] = selectedAnsID;
			selectedCorrectAnsIDMap[selectedAnsID] = selectedAnsID;				
		}
		
		if(selectedCorrectAnsIDList.length != expectedCorrectAnsIDList.length)
			return false;
		
		for(var ll = 0; ll < expectedCorrectAnsIDList.length; ++ll)
		{
			if(!selectedCorrectAnsIDMap[expectedCorrectAnsIDList[ll]])
				return false;
		}
		
		return true;
	}
	
	cp.MultipleChoiceQuestion.prototype.getChosenAnswerAsString = function()
	{
		if(this.getInteractionType() == "choice")
		{
			return this.getSelectedAnswerChoices();
		}
		else
		{
			return this.getAnsweredCorrectly();
		}
	}
		
	cp.MultipleChoiceQuestion.prototype.getCorrectAnswerAsString = function()
	{
		if(this.getInteractionType() == "choice")
		{
			var lRetList = this.getExpectedCorrectAnswerIDList();
			if(lRetList.length <= 0)
				return "0";
			
			var lRetStr = lRetList[0];
			for(var i = 1; i < lRetList.length; ++i)
			{
				lRetStr += ";" + lRetList[i];
			}
			
			return lRetStr;
		}
		else
		{
			return true;
		}		
	}

	cp.MultipleChoiceQuestion.prototype.getChosenAnswerAsStringForReview = function()
	{
		return this.getSelectedAnswerChoices();
	}
		
	cp.MultipleChoiceQuestion.prototype.getCorrectAnswerAsStringForReview = function()
	{
		var lRetList = this.getExpectedCorrectAnswerIDList();
		if(lRetList.length <= 0)
			return "0";
		
		var lRetStr = lRetList[0];
		for(var i = 1; i < lRetList.length; ++i)
		{
			lRetStr += ";" + lRetList[i];
		}
		
		return lRetStr;
	}	
	
	cp.MultipleChoiceQuestion.prototype.getExpectedCorrectAnswerTextList = function(aDelimiter)
	{	
		var lCorrectAnswerTextsArr = new Array();
		
		var lCounter = -1;
		for(var i = 0; i < this.answerOptions.length; ++i)
		{
			var lCurrOptionName = this.answerOptions[i];
			var lCurrOptionData = cp.model.data[lCurrOptionName];
			
			if(!lCurrOptionData['ic'])
				continue;
			
			lCorrectAnswerTextsArr[++lCounter] = trimStartingAndTrailingSpaces(lCurrOptionData["atxtlms"]);
		}
		
		if(lCorrectAnswerTextsArr.length <= 0)
			return "";
		
		var lCorrectAnswerTextStr = lCorrectAnswerTextsArr[0];
		
		for(var i = 1; i < lCorrectAnswerTextsArr.length; ++i)
		{
			lCorrectAnswerTextStr += aDelimiter + lCorrectAnswerTextsArr[i];
		}
		
		if(cp.verbose)
			cp.log("Expected Answer Text List : " + lCorrectAnswerTextStr);
		return lCorrectAnswerTextStr;
	}
	
	cp.MultipleChoiceQuestion.prototype.getSelectedAnswerTextList = function(aDelimiter)
	{	
		var lSelectedOptions = this.getSelectedOptions(this.getAnswerGroupName());
		if(!lSelectedOptions)
			return;
		if(lSelectedOptions.length <= 0)
			return;
						
		var lSelectedAnswerTextsArr = new Array();
		
		var lCounter = -1;
		for(var i = 0; i < lSelectedOptions.length; ++i)
		{
			var currSelectedOption = lSelectedOptions[i];
			var lMainDivId = currSelectedOption.parentNode.parentNode.parentNode.id;
			var lMainDivData = cp.model.data[lMainDivId];
			
			var lCanvasHolderName = lMainDivData["answerTextCanvasHolder"];
			var lDivName = lCanvasHolderName.replace("canvasHolder","");
			var lDivData = cp.model.data[lDivName];
			var lCanvasName = lDivData["mdi"];
			var lCanvasData = cp.model.data[lCanvasName];
			
			lSelectedAnswerTextsArr[++lCounter] = trimStartingAndTrailingSpaces(lCanvasData["atxtlms"]);
		}
		
		if(lSelectedAnswerTextsArr.length <= 0)
			return "";
		
		var lSelectedAnswerTextStr = lSelectedAnswerTextsArr[0];
		
		for(var i = 1; i < lSelectedAnswerTextsArr.length; ++i)
		{
			lSelectedAnswerTextStr += aDelimiter + lSelectedAnswerTextsArr[i];
		}
		
		if(cp.verbose)
			cp.log("Expected Answer Text List : " + lSelectedAnswerTextStr);
		return lSelectedAnswerTextStr;
	}
	
	cp.MultipleChoiceQuestion.prototype.getAnswerTexts = function()
	{
		var lAnswerTexts = cp.MultipleChoiceQuestion.superClass.getAnswerTexts.call(this);
		
		var lAnswerTextMap = {};
		var lOriginalAnswerOptions = this.questionData['ao'];
		for(var i = 0; i < lOriginalAnswerOptions.length; ++i)
		{
			var lOption = lOriginalAnswerOptions[i];
			var lOptionVals = lOption.split(":");
			var lOptionData = cp.model.data[lOptionVals[0]];
			lAnswerTextMap[lOptionData.aid] = trimStartingAndTrailingSpaces(lOptionData.atxtlms);
		}
		
		lAnswerTexts.answerTextMap = lAnswerTextMap;
		
		return lAnswerTexts;
	}
	
	cp.MultipleChoiceQuestion.prototype.saveAnswerOrder = function()
	{
		this.m_answerOrderArray = this.answerOptions.slice(0);
		
		this.setSelectedAnswers();
	}	
	
	cp.MultipleChoiceQuestion.prototype.checkAndSetQuestionStatus = function()
	{
		var questionStatus = this.QuestionStatusEnum.INCOMPLETE;
		var selectedOptions = this.getSelectedOptions(this.getAnswerGroupName());		
		if((!selectedOptions) || (selectedOptions.length == 0))
		{
			questionStatus = this.QuestionStatusEnum.INCOMPLETE;
			this.setQuestionStatus(questionStatus);
			return;
		}
		else if(!this.getIsSurvey())
		{
			if(this.checkIfPartiallyCorrect(selectedOptions))
				questionStatus = this.QuestionStatusEnum.PARTIAL_CORRECT; //Need to define the enum
            else if (this.checkIfCorrect(selectedOptions))
                questionStatus = this.QuestionStatusEnum.CORRECT;							
			else
				questionStatus = this.QuestionStatusEnum.INCORRECT;							
		}
		else
		{
			questionStatus = this.QuestionStatusEnum.CORRECT;
		}		
		
		this.setQuestionStatus(questionStatus);
	}

	cp.MultipleChoiceQuestion.prototype.startQuestion = function()
	{
		this.correctAnswersList = "";
		this.chosenAnswerFeedback = "";
		this.shuffleCounter = -1;
		this.chosenAnswerHasAdvancedFeedback = false;
		
		cp.MultipleChoiceQuestion.superClass.startQuestion.call(this);
	}		
	
	cp.HotspotQuestion = function(questionObjName,associatedObjName)
	{
		cp.HotspotQuestion.baseConstructor.call(this, questionObjName, associatedObjName);
		this.answerOptions = this.getAnswerOptions();
		this.questionData = cp.model.data[this.questionObjName];
		this.hotspotPositionList = [];
		this.hotspotGroupName = 'hotspotImage_' + associatedObjName;
		
		this.selectedHotspotPositions = '';
		this.m_selectedAnswersArr = [];
		this.verbose = false;
	}
	
	cp.inherits(cp.HotspotQuestion, cp.Question);
	
	cp.HotspotQuestion.prototype.resetQuestionData = function()
	{
		cp.HotspotQuestion.superClass.resetQuestionData.call(this);
		
		if(!this.m_quizController.GetGoToQuizScopeActionExecuted())
		{
			this.m_selectedAnswersArr = [];
			this.selectedHotspotPositions = '';
			
			this.resetHotspotPositionList();
			var allHotspotInputs = this.getAllHotspotInputs();
			for(var i = 0; i < allHotspotInputs.length; ++i)
			{
				currHotspotInput = allHotspotInputs[i];
				if(currHotspotInput)
					this.resetHotspotIsMarked(currHotspotInput);
			}		
		}
	}
	
	cp.HotspotQuestion.prototype.drawHotspots = function()
	{
		var currSlide = document.getElementById(this.getAssociatedObjName());
		
		var selectedPositionsString = this.getSelectedPositions();
		if(selectedPositionsString == "")
			return;
		var selectedPositionsArr = selectedPositionsString.split(';');
		var totalPositions = selectedPositionsArr.length;
		if(totalPositions == 0)
			return;
		
		for(var i = 0; i < totalPositions; ++i)
		{
			var currHotspotPositionArr = selectedPositionsArr[i].split('_');
			this.addHotspotDiv(currSlide,currHotspotPositionArr[0],currHotspotPositionArr[1],currHotspotPositionArr[2]);
		}			
	}
	
	cp.HotspotQuestion.prototype.getAllowClickOnHotspotsOnlyFlag = function()
	{
		return (this.questionData['ach']);
	}
	
	cp.HotspotQuestion.prototype.getHotspotImagePath = function()
	{
		return ("./" + this.questionData['chap']);
	}
	
	cp.HotspotQuestion.prototype.getHotspotPositionList = function()
	{
		return this.hotspotPositionList;
	}
	
	cp.HotspotQuestion.prototype.resetHotspotPositionList = function()
	{	
		this.hotspotPositionList = [];
		var lCurrSlide = document.getElementById(this.getAssociatedObjName());
		if(lCurrSlide == undefined)
			return;
		var lCurrDiv = lCurrSlide.parentNode;
		if(lCurrDiv == undefined)
			return;
			
		var lChildren = lCurrDiv.childNodes;		
		for(var i=lChildren.length - 1; i >= 0; --i)
		{
			var lCurrElement = lChildren[i];
			if(lCurrElement.nodeName != 'IMG')
				continue;	
			if(lCurrElement.name.indexOf('hotspotImage_') != -1)
				lCurrDiv.removeChild(lCurrElement);
		}	
	}
	
	cp.HotspotQuestion.prototype.setSelectedPositions = function()
	{
		if(!this.hotspotPositionList)
			return;		
		var totalHotspotPositions = this.hotspotPositionList.length;
		if(totalHotspotPositions <= 0)
			return;
		var selectedPositions = '';
		selectedPositions = this.hotspotPositionList[0].x + '_' + this.hotspotPositionList[0].y + '_' + this.hotspotPositionList[0].isCorrect;
		for(var i = 1; i < totalHotspotPositions; ++i)
		{
			selectedPositions += ';';
			selectedPositions += this.hotspotPositionList[i].x + '_' + this.hotspotPositionList[i].y + '_' + this.hotspotPositionList[i].isCorrect;
		}			
		this.selectedHotspotPositions = selectedPositions;
	}
	
	cp.HotspotQuestion.prototype.getSelectedPositions = function()
	{
		return this.selectedHotspotPositions;
	}
	
	cp.HotspotQuestion.prototype.getHotspotIsMarked = function(hotspotInput)
	{
		var hotspotInputDivData = cp.model.data[hotspotInput.id];
		return hotspotInputDivData['mr'];
	}
	
	cp.HotspotQuestion.prototype.setHotspotIsMarked = function(hotspotInput)
	{
		var hotspotInputDivData = cp.model.data[hotspotInput.id];
		hotspotInputDivData['mr'] = true;
	}
	
	cp.HotspotQuestion.prototype.resetHotspotIsMarked = function(hotspotInput)
	{
		var hotspotInputDivData = cp.model.data[hotspotInput.id];
		if(hotspotInputDivData["cur"])
			hotspotInput.parentNode.style.cursor = "pointer";
		hotspotInputDivData['mr'] = false;
	}
	
	cp.HotspotQuestion.prototype.getHotspotAnswerID = function(hotspotInput)
	{
		var hotspotInputDivData = cp.model.data[hotspotInput.id];
		return hotspotInputDivData['aid'];
	}
	
	cp.HotspotQuestion.prototype.setSelectedAnswers = function()
	{		
		this.setSelectedPositions();
		
		var allHotspotInputs = this.getAllHotspotInputs();
		var markedHotspots = '';
		this.m_selectedAnswersArr = [];
		if(allHotspotInputs.length <= 0)
			return;
		
		for(var i = 0; i < allHotspotInputs.length; ++i)
		{
			var currHotspotInput = allHotspotInputs[i];
			if(this.getHotspotIsMarked(currHotspotInput))
			{
				this.m_selectedAnswersArr.push(this.getHotspotAnswerID(currHotspotInput));
			}
		}
	}
	
	cp.HotspotQuestion.prototype.disableAllOptions = function()
	{
		if(!this.m_quizController)
			return;
			
		var lCanDisable = true;
		var lSubmitAll = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
		if(lSubmitAll && !this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions)
			lCanDisable = false;
		
		if(!lCanDisable)
			return;
			
		var lHotspotInputs = this.getAllHotspotInputs();
		if(lHotspotInputs.length < 1)
			return;
		for(var i=0; i < lHotspotInputs.length; i++)
		{
			var lCurrHotspotInput = lHotspotInputs[i];
			lCurrHotspotInput.parentNode.style.cursor = 'default';			
		}
		
		this.m_answersDisabled = true;
	}
	
	cp.HotspotQuestion.prototype.getAllHotspotInputs = function()
	{
		var answerGroupName = this.getAnswerGroupName();
		var hotspotInputs = [];
		var hotspotCanvasNames = this.answerOptions;//document.getElementsByName(answerGroupName);
		for(var i = 0; i < hotspotCanvasNames.length; ++i)
		{
			hotspotInputs[i] = document.getElementById(hotspotCanvasNames[i]);//.parentNode;
		}
		
		return hotspotInputs;
	}
	
	cp.HotspotQuestion.prototype.getCorrectHotspotInputs = function()
	{
		var allHotspotInputs = this.getAllHotspotInputs();
		var correctHotspotInputs = [];
		
		for(var i = 0; i < allHotspotInputs.length; ++i)
		{
			var currHotspotInput = allHotspotInputs[i];
			var currHotspotInputDivData = cp.model.data[currHotspotInput.id];
			
			if(currHotspotInputDivData)
			{
				var isCorrect = currHotspotInputDivData['ic'];
				if(isCorrect)
					correctHotspotInputs.push(currHotspotInput);
			}
		}
		
		return correctHotspotInputs;
	}
	
	cp.HotspotQuestion.prototype.clearAnswers = function()
	{
		if(this.verbose)
			cp.log("Inside Clear Answers");
		
		var lSubmitAll = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
		var lCanClearAnswers = (this.getWasJudged() == false)  || (lSubmitAll && (this.m_quizController.m_submittedAllQuestions == false));
		lCanClearAnswers = lCanClearAnswers && !this.m_quizController.GetIsInReviewMode();
		if(lCanClearAnswers  == false)
			return;		
		
		this.m_selectedAnswersArr = [];
		this.selectedHotspotPositions = '';
		
		if(this.verbose)
			cp.log("Not Attempted. Hence Clearing");
		//var slideDiv = document.getElementById(this.getSlide());		
		
		var hotspots = document.getElementsByName(this.hotspotGroupName);
		var totalHotspots = hotspots.length;
		for(var i=0; i < totalHotspots; ++i)
		{
			var lCurrHotspotImageElem = hotspots[0];
			var parentElementDiv = lCurrHotspotImageElem.parentNode;
			parentElementDiv.removeChild(lCurrHotspotImageElem);
		}
		var allHotspotInputs = this.getAllHotspotInputs();
		for(var i = 0; i < allHotspotInputs.length; ++i)
		{
			var currHotspotInput = allHotspotInputs[i];
			this.resetHotspotIsMarked(currHotspotInput);
		}	
		this.hotspotPositionList = [];		
	}
	
	cp.HotspotQuestion.prototype.isCorrectHotspotInput = function(hotspotInput)
	{
		var hotspotInputDivData = cp.model.data[hotspotInput.id];
		
		return hotspotInputDivData['ic'];			
	}
	
	cp.HotspotQuestion.prototype.checkIfMarkedCorrectHotspot = function(hotspotPosition)
	{			
		var allHotspotInputs = this.getAllHotspotInputs();
		for(var i = 0; i < allHotspotInputs.length; ++i)
		{
			var currHotspotInput = allHotspotInputs[i];
			currHotspotInputParent = currHotspotInput.parentElement;
			var currHotspotInput_minX = parseFloat(currHotspotInputParent.style.left);
			var currHotspotInput_minY = parseFloat(currHotspotInputParent.style.top);
			var currHotspotInput_maxX = parseFloat(currHotspotInputParent.style.left) + parseFloat(currHotspotInputParent.style.width);
			var currHotspotInput_maxY = parseFloat(currHotspotInputParent.style.top) + parseFloat(currHotspotInputParent.style.height);
			
			if(((hotspotPosition.x > currHotspotInput_minX) && (hotspotPosition.x < currHotspotInput_maxX) && 
				(hotspotPosition.y > currHotspotInput_minY) && (hotspotPosition.y < currHotspotInput_maxY)))
			{					
				if(this.isCorrectHotspotInput(currHotspotInput))
				{
					hotspotPosition.isCorrect = 'true';
					return true;
				}					
			}				
		}
		
		hotspotPosition.isCorrect = 'false';			
		return false;
	}
	
	cp.HotspotQuestion.prototype.checkIfPositionCorrect = function(aXPos, aYPos)
	{			
		var answerGroupName = this.getAnswerGroupName();
		var hotspotCanvasNames = this.answerOptions;
		for(var i = 0; i < hotspotCanvasNames.length; ++i)
		{
			var hotspotInputDivData = cp.model.data[hotspotCanvasNames[i]];
			var vbounds = hotspotInputDivData.vb;
			var currHotspotInput_minX = vbounds[0];
			var currHotspotInput_minY = vbounds[1];
			var currHotspotInput_maxX = vbounds[2];
			var currHotspotInput_maxY = vbounds[3];
			
			if(((aXPos > currHotspotInput_minX) && (aXPos< currHotspotInput_maxX) && 
				(aYPos > currHotspotInput_minY) && (aYPos< currHotspotInput_maxY)))
			{					
				hotspotInputDivData.mr = true;				
				if(hotspotInputDivData.ic)
					return true;
			}				
		}		
		return false;
	}

	cp.HotspotQuestion.prototype.checkIfAllCorrectHotspotsMarked = function()
	{
		var correctHotspotInputs = this.getCorrectHotspotInputs();
		for(var i = 0; i < correctHotspotInputs.length; ++i)
		{
			var currHotspotInput = correctHotspotInputs[i];
			if(!this.getHotspotIsMarked(currHotspotInput))
				return false;
		}
		return true;
	}
	
    cp.HotspotQuestion.prototype.getQuestionScoredPoints = function()
	{
		if (this.getIsSurvey()) 
			return 0;
		if(!this.getWasJudged()) //If Question is not judged or skipped return 0 points
			return 0;
			
		return this.getQuestionLevelScoredPoints();;
	}

	cp.HotspotQuestion.prototype.saveAnswerOrder = function()
	{		
		this.setSelectedAnswers();
	}
	
	cp.HotspotQuestion.prototype.checkAndSetQuestionStatus = function()
	{
		var questionStatus = this.QuestionStatusEnum.INCOMPLETE;
		
		var totalHotspotPositions = this.hotspotPositionList.length;
		if(totalHotspotPositions <= 0)
		{
			questionStatus = this.QuestionStatusEnum.INCOMPLETE;
			this.setQuestionStatus(questionStatus);
			return;
		}			
		
		var areSelectedHotspotsCorrect = true;
		var isQuestionAnsweredCorrectly = false;
		if(!this.getIsSurvey())
		{
			for(var i = 0; i < totalHotspotPositions; ++i)
			{
				if(!this.checkIfMarkedCorrectHotspot(this.hotspotPositionList[i]))
				{	
					areSelectedHotspotsCorrect = areSelectedHotspotsCorrect && false;					
				}				
			}
			
			if(areSelectedHotspotsCorrect)
				isQuestionAnsweredCorrectly = areSelectedHotspotsCorrect && this.checkIfAllCorrectHotspotsMarked();
			
			if(isQuestionAnsweredCorrectly)
				questionStatus = this.QuestionStatusEnum.CORRECT;
			else
				questionStatus = this.QuestionStatusEnum.INCORRECT;
		}
		else if(this.getIsSurvey())
			questionStatus = this.QuestionStatusEnum.CORRECT;
		
		//Updation the correctness of hotspot positions
		this.setSelectedPositions();		
		this.setQuestionStatus(questionStatus);
	}
	
	cp.HotspotQuestion.prototype.hotspotQuestionHandler = function(currDiv,x,y)
	{
		if(!this.m_quizController)
			return;
		var isInReviewMode = this.m_quizController.GetIsInReviewMode();
		var lSubmitAll = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
		if((isInReviewMode) || (this.getWasJudged() && !lSubmitAll))
		{
			return;
		}
		
		var lSlideName = this.getAssociatedObjName();
		var lCurrentSlideDiv = document.getElementById(lSlideName);
		
		this.showHideHotspotImage(lCurrentSlideDiv,x,y);
	}
	
	cp.HotspotQuestion.prototype.checkIfClickedInsideHotspotAndSetMarked = function(x,y)
	{
		var allHotspotInputs = this.getAllHotspotInputs();
		for(var i = 0; i < allHotspotInputs.length; ++i)
		{
			var currHotspotInput = allHotspotInputs[i];
			currHotspotInputParent = currHotspotInput.parentElement;
			var currHotspotInput_minX = parseFloat(currHotspotInputParent.style.left);
			var currHotspotInput_minY = parseFloat(currHotspotInputParent.style.top);
			var currHotspotInput_maxX = parseFloat(currHotspotInputParent.style.left) + parseFloat(currHotspotInputParent.style.width);
			var currHotspotInput_maxY = parseFloat(currHotspotInputParent.style.top) + parseFloat(currHotspotInputParent.style.height);
			
			if(((x > currHotspotInput_minX) && (x < currHotspotInput_maxX) && 
				(y > currHotspotInput_minY) && (y < currHotspotInput_maxY)))
			{					
				this.setHotspotIsMarked(currHotspotInput);
				return true;										
			}				
		}
		
		return false;
	}
	
	cp.HotspotQuestion.prototype.showHideHotspotImage = function(currDiv,x,y) 
	{	
		var shouldMarkHotspotInput = true;
		var children = currDiv.childNodes;
		for(var i=children.length - 1; i >= 0; --i)
		{
			var currElement = children[i];
			if(currElement.nodeName != 'IMG')
				continue;			
			
			if(currElement.name.indexOf('hotspotImage_') != -1)
			{
				var imgminX = parseFloat(currElement.style.left);
				var imgminY = parseFloat(currElement.style.top);
				var imgmaxX = parseFloat(currElement.style.left) + currElement.width;
				var imgmaxY = parseFloat(currElement.style.top) + currElement.height;
				if((x > imgminX && x < imgmaxX) && (y > imgminY && y < imgmaxY))
				{
					shouldMarkHotspotInput = false;
					currDiv.removeChild(currElement);
					this.removeHotspotPosition(imgminX,imgminY,imgmaxX,imgmaxY);
					return;
				}
			}				
		}
		
		var clickedInsideHotspot = this.checkIfClickedInsideHotspotAndSetMarked(x,y,shouldMarkHotspotInput);
		if(this.getAllowClickOnHotspotsOnlyFlag())
		{
			if(!clickedInsideHotspot)
				return;
		}		
		this.addHotspotDiv(currDiv, x,y);
	}
	
	cp.HotspotQuestion.prototype.addHotspotDiv = function(currDiv,x,y,isCorrect)
	{
		var newImg = document.createElement('img'); 
		
		var lIsInReviewMode = this.m_quizController.GetIsInReviewMode();
		if(lIsInReviewMode)
		{
			if(this.getIsSurvey())
				newImg.src = './assets/htmlimages/hotspot_correct_answer_normal.png';
			else if(typeof(isCorrect) == 'undefined')
				newImg.src = this.getHotspotImagePath();//'./assets/htmlimages/hotspot.gif'; 
			else if(isCorrect == 'false')
				newImg.src = './assets/htmlimages/hotspot_incorrect_answer_normal.png'; 
			else if(isCorrect == 'true')
				newImg.src = './assets/htmlimages/hotspot_correct_answer_normal.png';
            
            
		}
		else
		{
			newImg.src = this.getHotspotImagePath();//'./assets/htmlimages/hotspot.gif';
		}			
		
		newImg.name = this.hotspotGroupName; 
		//newImg.style.left = (x - (20/2)) + 'px'; 
		//newImg.style.top = (y - (20/2)) + 'px'; 
		newImg.style.position = 'absolute'; 
		currDiv.appendChild(newImg);
		var lBrowserSpecificW = newImg.clientWidth;
		var lBrowserSpecificH = newImg.clientHeight;
		if(newImg.naturalWidth)
			lBrowserSpecificW = lBrowserSpecificW > newImg.naturalWidth ? lBrowserSpecificW : newImg.naturalWidth;
		if(newImg.naturalHeight)
			lBrowserSpecificH = lBrowserSpecificH > newImg.naturalHeight ? lBrowserSpecificH : newImg.naturalHeight;
		lBrowserSpecificW = lBrowserSpecificW > newImg.width ? lBrowserSpecificW : newImg.width;
		lBrowserSpecificH = lBrowserSpecificH > newImg.height ? lBrowserSpecificH : newImg.height;
		newImg.style.left = (x - (lBrowserSpecificW/2) ) + "px";
		newImg.style.top = (y - (lBrowserSpecificH/2) ) + "px";
		
		this.addHotspotPosition(x,y,isCorrect);
	}
	
	cp.HotspotQuestion.prototype.addHotspotPosition = function(x,y,isCorrect)
	{
		var hotspot = new Object();
		hotspot.x = x;
		hotspot.y = y;
		if(typeof(isCorrect) != 'undefined')
			hotspot.isCorrect = isCorrect;
		else
			hotspot.isCorrect = '-1';
		this.hotspotPositionList.push(hotspot);
	}
	
	cp.HotspotQuestion.prototype.removeHotspotPosition = function(x1,y1,x2,y2)
	{
		for(var i = 0; i < this.hotspotPositionList.length; ++i)
		{
			var currHotspot = this.hotspotPositionList[i];
			if((currHotspot.x > x1 && currHotspot.x < x2) && (currHotspot.y > y1 && currHotspot.y < y2))
			{
				this.hotspotPositionList.splice(i,1);
				return;
			}
		}			
	}
	
	cp.HotspotQuestion.prototype.startQuestion = function()
	{
		if(!this.m_quizController)
			return;		
		var lIsInReviewMode = this.m_quizController.GetIsInReviewMode();
		if((lIsInReviewMode) || this.getWasJudged())
		{
			this.resetHotspotPositionList();
			this.drawHotspots();
		}
		cp.HotspotQuestion.superClass.startQuestion.call(this);
	}
	
	cp.HotspotQuestion.prototype.setQuestionSpecificScoreProperties  = function(aQuestionSpecificScore)
	{
		if(aQuestionSpecificScore == undefined)
			return;
		
		if(!this.getWasJudged())
			return;
		
		var  lTotalHotspotPositions = this.hotspotPositionList.length;
		if(lTotalHotspotPositions <= 0)
			return;
		//GeneratingHotspotName just for SWF Compatibility ( hotSpotAnimation_xPos_yPos)
		aQuestionSpecificScore.m_hotSpotNamesArrayAsString = "hotSpotAnimation_"+ this.hotspotPositionList[0].x+"_"+this.hotspotPositionList[0].y;
		aQuestionSpecificScore.m_hotSpot_xchordsAsString = ''+this.hotspotPositionList[0].x;
		aQuestionSpecificScore.m_hotSpot_ychordsAsString = ''+this.hotspotPositionList[0].y;
					
		for(var i = 1; i < lTotalHotspotPositions; ++i)
		{
			var lHotSpotName = "hotSpotAnimation_"+ this.hotspotPositionList[i].x+"_"+this.hotspotPositionList[i].y;
			aQuestionSpecificScore.m_hotSpotNamesArrayAsString += ";" + lHotSpotName;
			aQuestionSpecificScore.m_hotSpot_xchordsAsString += ";" + this.hotspotPositionList[i].x;
			aQuestionSpecificScore.m_hotSpot_ychordsAsString += ";" + this.hotspotPositionList[i].y;
		}	
	}
	
	cp.HotspotQuestion.prototype.restoreFromQuestionSpecificScoreProperties = function(aQuestionSpecificScore)
	{
		if(aQuestionSpecificScore == undefined)
			return;
		var x_chordarr = [];
		var y_chordarr = [];
				
		if(aQuestionSpecificScore.m_hotSpot_xchordsAsString != "")
			x_chordarr = aQuestionSpecificScore.m_hotSpot_xchordsAsString.split(";");
		if(aQuestionSpecificScore.m_hotSpot_ychordsAsString != "")
			y_chordarr = aQuestionSpecificScore.m_hotSpot_ychordsAsString.split(";");
				
		if(x_chordarr.length != y_chordarr.length)
			return;
		if((x_chordarr.length  <=0) ||  (y_chordarr.length <=0))
			return;
				
		var lSelectedPositions = '';
		lSelectedPositions = x_chordarr[0] + '_' + y_chordarr[0] + '_'+this.checkIfPositionCorrect(x_chordarr[0],y_chordarr[0]); //position syntax - xcord_yCord_isCorrect
		for(var i = 1; i < x_chordarr.length; ++i)
		{
			lSelectedPositions += ';';
			lSelectedPositions += x_chordarr[i] + '_' + y_chordarr[i] + '_'+this.checkIfPositionCorrect(x_chordarr[i],y_chordarr[i]);
		}			
		this.selectedHotspotPositions = lSelectedPositions;		
	}
	
	cp.SequenceQuestion = function(questionObjName,associatedObjName)
	{
		cp.SequenceQuestion.baseConstructor.call(this, questionObjName, associatedObjName);
		
		this.answerOptions = this.getAnswerOptions();
		this.isShuffleEnabled = this.questionData['sh'];
		this.shuffleCounter = -1;
		this.isCorrectCounter = -1;
		this.answerOptionsDrawnCtr = -1;
		this.answerOptionsDrawn = false;
		this.correctSequenceArr = this.questionData['cal'];
		this.defaultTitleImage = this.questionData['defaultTitleImage'];
		//this.originalSequenceArr = new Array();
		this.currentSequenceArr = new Array();	
		this.selectedSequenceArr = new Array();
		this.selectedIndexes = [];
		
		this.sequenceElementList = new Array();
	}
	
	cp.inherits(cp.SequenceQuestion, cp.Question);
	
	cp.SequenceQuestion.prototype.setQuestionSpecificScoreProperties = function(aQuestionSpecificScore)
	{
		if(this.showAsCombo())
		{
			if(this.selectedSequenceArr.length <= 0)
			{			
				aQuestionSpecificScore.m_answerOrderArrayAsString = "";				
				return;
			}
		}
		cp.SequenceQuestion.superClass.setQuestionSpecificScoreProperties.call(this,aQuestionSpecificScore);		
	}
	
	cp.SequenceQuestion.prototype.resumeSelectedAnswers = function(iAnswerScores)
	{				
		if(iAnswerScores.length <= 0)
			return;		
	
		var lOptions = this.questionData['ao'];
		if(!lOptions || lOptions.length <=0)
			return;
		
		var lAnswerIndexToNameMap = {};
		for(var j =0; j < lOptions.length; ++j)
		{
			var lOpt = lOptions[j].split(":");
			lAnswerIndexToNameMap[lOpt[1]] = lOpt[0]; 
		}			
		
		var lSelectedAnswers = '';	
		var lFirstOpt = true;
		for (var whichAns = 0; whichAns <iAnswerScores.length; whichAns++)
		{
			var lAnsText = unescape(iAnswerScores[whichAns].m_chosenAnswer);
			var lSelectedAnswer = "";
			if(lAnswerIndexToNameMap[lAnsText] != undefined)
			{
				lSelectedAnswer = lAnswerIndexToNameMap[lAnsText];
			}
			else
			{
				lAnsText = lAnsText.split("answerText_");
				lSelectedAnswer = lAnswerIndexToNameMap[lAnsText[1]];
			}
			this.m_selectedAnswersArr.push(lSelectedAnswer);
		}
		
		this.resumeSequenceArrays();
	}	
	
	cp.SequenceQuestion.prototype.startQuestion = function()
	{
		this.shuffleCounter = -1;
		this.isCorrectCounter = -1;
		this.answerOptionsDrawnCtr = -1;		
		this.answerOptionsDrawn = false;
		if(!this.m_quizController)
			return;		
		var lIsInReviewMode = this.m_quizController.GetIsInReviewMode();
		
		if(!this.m_isShuffled)
			this.shuffleAnswers();
		
		if(lIsInReviewMode)
			this.addCorrectAnswerDiv();
		cp.SequenceQuestion.superClass.startQuestion.call(this);
	}

	cp.SequenceQuestion.prototype.getExpectedCorrectAnswerTextList = function(aDelimiter)
	{	
		var lCorrectSeqArr = this.correctSequenceArr;
		if(lCorrectSeqArr.length <= 0)
			return "";
		var lCurrSeqCanvasData = cp.model.data[lCorrectSeqArr[0]];
		var lCorrectSeqTextStr = trimStartingAndTrailingSpaces(lCurrSeqCanvasData["atxtlms"]);
		
		for(var i = 1; i < lCorrectSeqArr.length; ++i)
		{
			lCurrSeqCanvasData = cp.model.data[lCorrectSeqArr[i]];
			
			lCorrectSeqTextStr += aDelimiter + trimStartingAndTrailingSpaces(lCurrSeqCanvasData["atxtlms"]);
		}
		
		return lCorrectSeqTextStr;
	}
	
	cp.SequenceQuestion.prototype.getSelectedAnswerTextList = function(aDelimiter)
	{		
		if(!this.showAsCombo())
		{
			var lAllSeqOptions = this.sequenceElementList;
			if(lAllSeqOptions.length <= 0)
				return "";
			var lCurrSeqOptionName = lAllSeqOptions[0];
			var lCurrSeqOptionData = cp.model.data[lCurrSeqOptionName];
			var lCurrCanvasName = lCurrSeqOptionData['answerTextDivName'];
			var lCurrSeqCanvasData = cp.model.data[lCurrCanvasName];
			
			var lSelectedSeqTextStr = trimStartingAndTrailingSpaces(lCurrSeqCanvasData["atxtlms"]);
			
			for(var i = 1; i < lAllSeqOptions.length; ++i)
			{
				lCurrSeqOptionName = lAllSeqOptions[i];
				lCurrSeqOptionData = cp.model.data[lCurrSeqOptionName];
				lCurrCanvasName = lCurrSeqOptionData['answerTextDivName'];
				lCurrSeqCanvasData = cp.model.data[lCurrCanvasName];
				
				lSelectedSeqTextStr += aDelimiter + trimStartingAndTrailingSpaces(lCurrSeqCanvasData["atxtlms"]);
			}
			
			return lSelectedSeqTextStr;
		}
		else
		{
			var lAllSeqOptions = this.getAllOptions();
			if(lAllSeqOptions.length <= 0)
				return "";
				
			var lCurrSeqOption = lAllSeqOptions[0];
			var lCurrCanvasName = lCurrSeqOption.value;
			
			var lSelectedSeqTextStr = " ";
			if(lCurrCanvasName != "")
			{
				var lCurrSeqCanvasData = cp.model.data[lCurrCanvasName];
				lSelectedSeqTextStr = trimStartingAndTrailingSpaces(lCurrSeqCanvasData["atxtlms"]);
			}
			
			for(var i = 1; i < lAllSeqOptions.length; ++i)
			{
				var lCurrSeqOption = lAllSeqOptions[i];
				var lCurrCanvasName = lCurrSeqOption.value;	
				
				if(lCurrCanvasName == "")
				{
					continue;
				}
				else
				{
					var lCurrSeqCanvasData = cp.model.data[lCurrCanvasName];
					lSelectedSeqTextStr += aDelimiter + trimStartingAndTrailingSpaces(lCurrSeqCanvasData["atxtlms"]);
				}				
			}
			
			if(lSelectedSeqTextStr == "")
				lSelectedSeqTextStr = "0";
				
			return lSelectedSeqTextStr;
		}
	}
	
	cp.SequenceQuestion.prototype.getChosenAnswerAsStringForReview = function()
	{
		var lRetVal = this.getSelectedAnswerTextList(";");
		if(!lRetVal || (lRetVal == "0"))
			lRetVal = "";
		return lRetVal;
	}
		
	cp.SequenceQuestion.prototype.getCorrectAnswerAsStringForReview = function()
	{
		var lRetVal =this.getExpectedCorrectAnswerTextList(";");
		if(!lRetVal)
			lRetVal = "";
		return lRetVal;
	}	
	
	cp.SequenceQuestion.prototype.saveAnswerOrder = function()
	{
		if(this.showAsCombo())
		{
			var seqOptions = this.getAllOptions();
			var retVal = true;
			for(var i = 0; i < seqOptions.length; ++i)
			{
				var currSeqOption = seqOptions[i];
				var selectedVal = currSeqOption.value;	
				var selectedIndex = currSeqOption;
									
				this.currentSequenceArr[i] = selectedVal;			
			}
			this.m_answerOrderArray = this.answerOptions.slice(0);
		}
		else
		{
			this.m_answerOrderArray = this.currentSequenceArr.slice(0);
		}
		if(cp.verbose)
		{
			cp.log("Current Sequence : " + this.currentSequenceArr);
			//cp.log("Original Sequence : " + this.originalSequenceArr);
		}
		this.m_selectedAnswersArr = new Array();		
		for(var x = 0; x < this.currentSequenceArr.length; ++x)
		{
			this.m_selectedAnswersArr.push(this.currentSequenceArr[x]);			
		}		
		
		this.setSelectedAnswers();
	}
	
	cp.SequenceQuestion.prototype.setAnswerOrder = function(iOrder)
	{			
		if(!iOrder || iOrder.length <= 0)
			return;
		
		var lAnySelectedAnswer = true;
		var iOrderArr = iOrder.split(";");
		for(var i = 0; i < iOrderArr.length; ++i)
		{
			lAnySelectedAnswer = lAnySelectedAnswer && (iOrderArr[i] != "undefined");
		}
		
		this.answerOptions = iOrderArr.slice(0);				
		this.m_answerOrderArray = iOrderArr.slice(0);		
	}	
	
	cp.SequenceQuestion.prototype.resumeSequenceArrays = function()
	{
		var lSelectedAnswersArr = this.m_selectedAnswersArr.slice(0);
		if(lSelectedAnswersArr.length <= 0)
			return;
		
		if(!this.showAsCombo())
		{
			this.currentSequenceArr = lSelectedAnswersArr;
			this.selectedSequenceArr = lSelectedAnswersArr;
		}
		else
		{
			for(var x = 0; x < lSelectedAnswersArr.length; ++x)
			{
				if(lSelectedAnswersArr[x] == -1 || lSelectedAnswersArr[x] == "undefined")
				{
					this.currentSequenceArr[x] = "";
					this.selectedSequenceArr[x] = ""; 
				}
				else
				{
					this.currentSequenceArr[x] = lSelectedAnswersArr[x];
					this.selectedSequenceArr[x] = lSelectedAnswersArr[x];
				}	
			}
		}
	}
	
	cp.SequenceQuestion.prototype.clearAnswers = function()
	{
		if(this.verbose)
			cp.log("Inside Clear Answers");
		
		var lSubmitAll = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
		var lCanClearAnswers = (this.getWasJudged() == false)  || (lSubmitAll && (this.m_quizController.m_submittedAllQuestions == false));
		lCanClearAnswers = lCanClearAnswers && !this.m_quizController.GetIsInReviewMode();
		if(lCanClearAnswers  == false)
			return;			
		
		if(this.verbose)
			cp.log("Not Attempted. Hence Clearing");
		
		this.selectedSequenceArr = [];
		this.drawSequenceOptions(this.answerOptions);
	}
	
	cp.SequenceQuestion.prototype.showAsCombo = function()
	{
		return this.questionData['sac'];
	}
	
	cp.SequenceQuestion.prototype.getIsOptionCorrect = function(answerOptionCanvasName)
	{
		var lCorrectSequenceArr = this.correctSequenceArr;
		var lSelectedSequenceArr = this.selectedSequenceArr;
		
		var lCorrectAnswerOption = lCorrectSequenceArr[++this.isCorrectCounter];
		
		if(this.isCorrectCounter == this.answerOptions.length)
			this.isCorrectCounter = -1;
		
		return (lCorrectAnswerOption == answerOptionCanvasName);	
	}
	
	cp.SequenceQuestion.prototype.addDragEvents = function(divName)
	{
		var divElem = document.getElementById(divName);			
		if(!divElem)
			return;			
		var self = this;
		var currSlide = document.getElementById(this.getAssociatedObjName());
		this.draggedImageCopy = undefined;
		this.dropIndicatorImage = undefined;
		this.draggedOptionIndex = -1;
		
		if(cp.device != cp.DESKTOP)
		{
			this.lTouchStarted = false;
			divElem.ontouchstart = function(e)
						{
							if(e.touches.length != 1)
								return;
							// Only deal with one finger
							var touch = e.touches[0]; // Get the information for finger #1
							var node = touch.target; // Find the node the drag started from
							var divData = cp.model.data[e.target.id];
							var canvasName = divData['answerTextDivName'];
							
							var scaledTouchPos = getScaledPosition(touch.pageX, touch.pageY);
														
							var dataForXfer;
							var currentSeqOptions = self.currentSequenceArr.slice(0);
							for(var x = 0 ; x < currentSeqOptions.length; ++x)
							{
								if(currentSeqOptions[x] == canvasName)
								{
									dataForXfer = x;
									break;
								}
							}

							self.dropIndicatorImage = document.createElement('img');
							self.dropIndicatorImage.id = 'dropIndicatorImg';
							self.dropIndicatorImage.className = 'dropIndicator';
							self.dropIndicatorImage.style.left = (parseFloat(node.parentNode.style.left) - 50) + "px";
							self.dropIndicatorImage.style.top = (parseFloat(node.parentNode.style.top)) + "px";
							self.dropIndicatorImage.style.position = 'absolute';
														
							self.draggedOptionIndex = dataForXfer;
							
							var lCanvasData = cp.model.data[canvasName];
							self.draggedImageCopy = document.createElement('img');
							self.draggedImageCopy.id = "draggedImageCopy";
							self.draggedImageCopy.src = lCanvasData['ip'];
							self.draggedImageCopy.style.left = (scaledTouchPos.X + 10) + "px";
							self.draggedImageCopy.style.top = scaledTouchPos.Y + "px";
							self.draggedImageCopy.style.display = "block";
							self.draggedImageCopy.style.position = "fixed";	

							currSlide.parentNode.appendChild(self.dropIndicatorImage);
							currSlide.parentNode.appendChild(self.draggedImageCopy);

							self.lTouchStarted = true;
						};
			document.ontouchmove = function(e)
						{
							if(e.preventDefault)
								e.preventDefault();
							if(e.touches.length != 1)
								return;
							if(!self.lTouchStarted)
								return;
							// Only deal with one finger
							var touch = e.touches[0]; // Get the information for finger #1
							var scaledTouchPos = getScaledPosition(touch.pageX, touch.pageY);
							if(self.draggedImageCopy)
							{
								self.draggedImageCopy.style.left = (scaledTouchPos.X) + "px";
								self.draggedImageCopy.style.top = (scaledTouchPos.Y) + "px";
							}
							var allSeqOptions = self.sequenceElementList;
							var totalOptions = allSeqOptions.length;
							var topOfDropIndicator = "";
							for(var i = 0 ; i < allSeqOptions.length; ++i)
							{
								var lCurrSeqOptionName = allSeqOptions[i];
								var lCurrSeqOptionData = cp.model.data[lCurrSeqOptionName];
								var lCurrOptionDivElement = document.getElementById(lCurrSeqOptionName);
								var lCurrOptionX1 = parseFloat(lCurrOptionDivElement.parentNode.style.left);
								var lCurrOptionY1 = parseFloat(lCurrOptionDivElement.parentNode.style.top); 
								var lCurrOptionX2 = parseFloat(lCurrOptionDivElement.parentNode.style.left) + parseFloat(lCurrOptionDivElement.parentNode.style.width);
								var lCurrOptionY2 = parseFloat(lCurrOptionDivElement.parentNode.style.top) + parseFloat(lCurrOptionDivElement.parentNode.style.height);

								var lElemToBeHighlighted = document.getElementById(lCurrSeqOptionName + "_dummyhighlight");
								lElemToBeHighlighted.style.backgroundColor = "transparent";
								if(scaledTouchPos.Y >= lCurrOptionY1 && scaledTouchPos.Y <= lCurrOptionY2)
								{
									topOfDropIndicator = parseFloat(lCurrOptionY1);
									self.dropIndicatorImage.style.top = (topOfDropIndicator + 3) + "px";									
									lElemToBeHighlighted.style.backgroundColor = "#efefef";									
								}
							}							
						};

			divElem.ontouchend = function(e)
						{
							if (e.stopPropagation) 
							{
								e.stopPropagation(); // stops the browser from redirecting.
							}
							self.lTouchStarted = false;
							if(!self.draggedImageCopy)
								return;
							
							var touchEndX = parseFloat(self.draggedImageCopy.style.left);
							var touchEndY = parseFloat(self.draggedImageCopy.style.top);
							
							if(self.draggedImageCopy.parentNode)
								self.draggedImageCopy.parentNode.removeChild(self.draggedImageCopy);
							
							if(self.dropIndicatorImage && self.dropIndicatorImage.parentNode)
								self.dropIndicatorImage.parentNode.removeChild(self.dropIndicatorImage);
							
							self.draggedImageCopy = undefined;
							self.dropIndicatorImage = undefined;
							
							var fromIndex = parseFloat(self.draggedOptionIndex);
							var toIndex = -1;
							
							var canvasName;
							var currentSeqOptions = self.currentSequenceArr.slice(0);;
							var allSeqOptions = self.sequenceElementList;
							for(var i = 0 ; i < allSeqOptions.length; ++i)
							{
								var lCurrSeqOptionName = allSeqOptions[i];
								var lCurrSeqOptionElement = document.getElementById(lCurrSeqOptionName);
								var currOptionX1 = parseFloat(lCurrSeqOptionElement.parentNode.style.left);
								var currOptionY1 = parseFloat(lCurrSeqOptionElement.parentNode.style.top); 
								var currOptionX2 = parseFloat(lCurrSeqOptionElement.parentNode.style.left) + parseFloat(lCurrSeqOptionElement.parentNode.style.width);
								var currOptionY2 = parseFloat(lCurrSeqOptionElement.parentNode.style.top) + parseFloat(lCurrSeqOptionElement.parentNode.style.height);
								
								var lHighlightedElem = document.getElementById(lCurrSeqOptionName + "_dummyhighlight");
								lHighlightedElem.style.backgroundColor = "transparent";
								if(touchEndY >= currOptionY1 && touchEndY <= currOptionY2)
								{
									toIndex = i;
									break;
								}
							}
							if(toIndex == -1)
								return;
							
							var newSequence = new Array();
							
							if(fromIndex < toIndex)
							{
								var temp = currentSeqOptions[fromIndex];
								for(var y = fromIndex; y < toIndex; ++y)
								{
									currentSeqOptions[y] = currentSeqOptions[y + 1];													
								}
								currentSeqOptions[toIndex] = temp;
							}	
							else
							{
								var temp = currentSeqOptions[fromIndex];
								for(var y = fromIndex; y > toIndex; --y)
								{
									currentSeqOptions[y] = currentSeqOptions[y - 1];
								}
								currentSeqOptions[toIndex] = temp;
							}
							
							for(var z = 0; z < currentSeqOptions.length; ++z)
							{
								newSequence.push(currentSeqOptions[z]);
							}
							self.drawSequenceOptions(newSequence);
										
							var newSequence = new Array();							
						};
		}
		else
		{
			this.isMouseDown = false;
			var parentSlideDivElement = cp.movie.stage.getSlideDiv();
			
			divElem.ondragstart = function(){return false;};
			divElem.onselectstart = function(){return false;};		
			var mousemove = function(e)
						{
							if(!self.isMouseDown)
								return;
							if(self.draggedImageCopy)
							{
								var lScaledPosition = getScaledPosition(event.clientX, event.clientY);
								self.draggedImageCopy.style.left = (lScaledPosition.X) + "px";
								self.draggedImageCopy.style.top = (lScaledPosition.Y) + "px";	
							}
							if(self.dropIndicatorImage)
							{
								var allSeqOptions = self.sequenceElementList;//self.getAllOptions();								
								var totalOptions = allSeqOptions.length;
								var topOfDropIndicator = 0;
								for(var i = 0 ; i < allSeqOptions.length; ++i)
								{			
									var lRelatedSeqInputElementName = allSeqOptions[i];
									var lRelatedSeqInputElement = document.getElementById(lRelatedSeqInputElementName);
									var lCurrOptionY1 = parseFloat(lRelatedSeqInputElement.parentNode.style.top);
									var lBottomBoundary = lCurrOptionY1 + parseFloat(lRelatedSeqInputElement.parentNode.style.height);
									
									var lTopBoundary = 0;
									if(i > 0)
									{
										var lPreviousSeqInputElementName = allSeqOptions[i - 1];
										var lPreviousSeqInputElement = document.getElementById(lPreviousSeqInputElementName);
										lTopBoundary = parseFloat(lPreviousSeqInputElement.parentNode.style.top) + parseFloat(lPreviousSeqInputElement.parentNode.style.height);
									}
									
									if(lScaledPosition.Y > lTopBoundary && lScaledPosition.Y < lBottomBoundary)
									{								
										topOfDropIndicator = parseFloat(lCurrOptionY1);
										self.dropIndicatorImage.style.top = (topOfDropIndicator + 3) + "px";
										break;
									}							
								}
							}						
						};		
			divElem.onmousedown = function(e)
						{		
							if(cp.verbose)
								cp.log("Dragging element : " + e.target.id);
							if(self.dropIndicatorImage)
							{
								var dropIndicatorElem = document.getElementById(self.dropIndicatorImage.id);
								if(dropIndicatorElem)
									dropIndicatorElem.parentNode.removeChild(dropIndicatorElem);
							}
							
							if(self.draggedImageCopy)
							{
								var draggedImageElem = document.getElementById(self.draggedImageCopy.id);
								if(draggedImageElem)
									draggedImageElem.parentNode.removeChild(draggedImageElem);
							}					
							
							var lNodeElement = e.target.parentNode.firstChild;
							var divData = cp.model.data[lNodeElement.id];
							var canvasName = divData['answerTextDivName'];
							self.sh = divData['sh'];						
							var dataForXfer;
							var currentSeqOptions = self.currentSequenceArr.slice(0);;
							for(var x = 0 ; x < currentSeqOptions.length; ++x)
							{
								if(currentSeqOptions[x] == canvasName)
								{
									dataForXfer = x;
									break;
								}
							}
							
							self.draggedOptionIndex = dataForXfer;
							var canvasData = cp.model.data[canvasName];
							var canvasImageSrc = canvasData['ip'];						
							
							self.dropIndicatorImage = document.createElement('img');
							self.dropIndicatorImage.id = 'dropIndicatorImg';
							self.dropIndicatorImage.className = 'dropIndicator';
							self.dropIndicatorImage.style.left = (parseFloat(e.target.parentNode.style.left) - 50) + "px";
							self.dropIndicatorImage.style.top = (parseFloat(e.target.parentNode.style.top)) + "px";
							self.dropIndicatorImage.style.position = 'absolute';
							
							self.draggedImageCopy = document.createElement('img');
							self.draggedImageCopy.id = "draggedImageCopy";
							self.draggedImageCopy.src = canvasImageSrc;
							self.draggedImageCopy.style.left = (parseFloat(e.target.parentNode.style.left)) + "px";
							self.draggedImageCopy.style.top = (parseFloat(e.target.parentNode.style.top)) + "px";
							self.draggedImageCopy.style.display = "block";
							self.draggedImageCopy.style.position = "absolute";	
							
							if(self.sh)
							{
								var mAngle = self.sh.a;
								applyShadow(self.draggedImageCopy,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
							}
							
							currSlide.appendChild(self.dropIndicatorImage);							
							currSlide.appendChild(self.draggedImageCopy);					
							
							self.isMouseDown = true;
							if(cp.verbose)
								cp.log(self.isMouseDown);
							divElem.onmousemove = mousemove;
							document.onmousemove = mousemove;
							
							return false;
						};
			document.onmouseup = function(e)
						{
							document.onmousemove = undefined;
							divElem.onmousemove = undefined;
							if(!self.isMouseDown)
								return;
							self.isMouseDown = false;
							if(cp.verbose)
								cp.log("Drag Ended");
							
							var dropIndicatorElem = document.getElementById(self.dropIndicatorImage.id);
							if(dropIndicatorElem)
								dropIndicatorElem.parentNode.removeChild(dropIndicatorElem);
							
							var draggedImageElem = document.getElementById(self.draggedImageCopy.id);
							if(draggedImageElem)
								draggedImageElem.parentNode.removeChild(draggedImageElem);
							
							var dragEndX = parseFloat(self.draggedImageCopy.style.left);
							var dragEndY = parseFloat(self.draggedImageCopy.style.top);
							
							self.dropIndicatorImage = undefined;
							self.draggedImageCopy = undefined;
							
							var fromIndex = parseFloat(self.draggedOptionIndex);
							var toIndex = -1;
							
							var canvasName;
							var currentSeqOptions = self.currentSequenceArr.slice(0);;
							var allSeqOptions = self.sequenceElementList;//getAllOptions();
							for(var i = 0 ; i < allSeqOptions.length; ++i)
							{
								var lRelatedSeqInputElementName = allSeqOptions[i];
								var lRelatedSeqInputElement = document.getElementById(lRelatedSeqInputElementName);
								if(cp.verbose)
									cp.log(lRelatedSeqInputElement.parentNode.id);
								var lBottomBoundary = parseFloat(lRelatedSeqInputElement.parentNode.style.top) + parseFloat(lRelatedSeqInputElement.parentNode.style.height);
								
								var lTopBoundary = 0;
								if(i > 0)
								{
									var lPreviousSeqInputElementName = allSeqOptions[i - 1];
									var lPreviousSeqInputElement = document.getElementById(lPreviousSeqInputElementName);
									if(cp.verbose)
										cp.log(lPreviousSeqInputElement.parentNode.id);
									lTopBoundary = parseFloat(lPreviousSeqInputElement.parentNode.style.top) + parseFloat(lPreviousSeqInputElement.parentNode.style.height);
								}
								
								if(cp.verbose)
									cp.log(dragEndY + "," + lTopBoundary + "," + lBottomBoundary);
								if(dragEndY > lTopBoundary && dragEndY <= lBottomBoundary)
								{								
									toIndex = i;														
									break;
								}
							}
							
							if(toIndex == -1)
								return;
							
							var newSequence = new Array();
							
							if(cp.verbose)
								cp.log("From,To : " + fromIndex + "," + toIndex);
																			
							if(fromIndex < toIndex)
							{
								var temp = currentSeqOptions[fromIndex];
								for(var y = fromIndex; y < toIndex; ++y)
								{
									currentSeqOptions[y] = currentSeqOptions[y + 1];
								}
								currentSeqOptions[toIndex] = temp;
							}	
							else
							{
								var temp = currentSeqOptions[fromIndex];
								for(var y = fromIndex; y > toIndex; --y)
								{
									currentSeqOptions[y] = currentSeqOptions[y - 1];
								}
								currentSeqOptions[toIndex] = temp;
							}
							
							for(var z = 0; z < currentSeqOptions.length; ++z)
							{
								newSequence.push(currentSeqOptions[z]);
							}
							if(cp.verbose)
								cp.log("Sequence to be drawn : " + newSequence.toString());
							self.drawSequenceOptions(newSequence);
										
							var newSequence = new Array();		
						};
		}
	}
	
	cp.SequenceQuestion.prototype.removeDragEvents = function(divName)
	{
		if(cp.verbose)
			cp.log("Removing drag events for : " + divName);
		
		var divElem = document.getElementById(divName);
		if(!divElem)
			return;
		
		document.onmouseup = undefined;
		
		divElem.onmousedown = undefined;		
		divElem.ondragstart = undefined;
		divElem.onselectstart = undefined
		divElem.ontouchstart = undefined;
		divElem.ontouchmove = undefined;
		divElem.ontouchend = undefined;
		
		divElem.style.cursor = "default";		
	}	

	cp.SequenceQuestion.prototype.shuffleAnswers = function()
	{
		var lCanDisableAnswer = !this.m_quizController.GetIsAttemptFinished() && this.getWasJudged() && !this.m_quizController.GetIsSubmitAll();
		var lShouldDisablePretestQuestion = this.getIsPretest() && this.m_quizController.GetIsPretestQuestionsDisabled();
		
		var lCanShuffle = !lCanDisableAnswer && !this.m_quizController.GetIsInReviewMode() && !lShouldDisablePretestQuestion;
		
		if((!lCanShuffle || this.m_isShuffled) && (this.answerOptions.length > 0))
			return;
				
		var i;
		var len = this.answerOptions.length;
		var n;
		var temp;
		var RandomAnswers_array = new Array();
					
		for(i = 0; i < len ; i++)
		{
			RandomAnswers_array[i] = this.answerOptions[i];
		}

		for(i = len; i > 1 ; i--)
		{
			n = Math.floor(Math.random() * i);
			if(n != i)
			{
				temp = RandomAnswers_array[n];
				RandomAnswers_array[n] =  RandomAnswers_array[i-1];
				RandomAnswers_array[i-1] = temp;
			}
		}
		this.updateOriginalSequence(RandomAnswers_array);

		this.m_isShuffled	= true;
	},
	
	cp.SequenceQuestion.prototype.getAnswerOption = function(answerID,sequenceOptionName)
	{
		//SHOULD BE CALLED ONLY FOR DRAG DROP TYPE
		//this.shuffleAnswers();
		var answerOptionData;
		
		if(!this.sequenceElementList || (this.sequenceElementList.length <= 0) || (this.sequenceElementList.length >= this.answerOptions.length))
			this.sequenceElementList = new Array();
			
		this.sequenceElementList.push(sequenceOptionName);
		if(this.shuffleCounter >= this.answerOptions.length)
			this.shuffleCounter = -1;
			
		var lCurrentOption = this.answerOptions[++this.shuffleCounter];
		answerOptionData = cp.model.data[lCurrentOption];
		var sequenceOptionDivData = cp.model.data[sequenceOptionName];
		if(answerOptionData != undefined)
		{	
			answerOptionData['aid'] = sequenceOptionDivData['aid'];	
		}	
		
		if(this.shuffleCounter == this.answerOptions.length - 1)
			this.answerOptionsDrawn = true;
			
		return lCurrentOption;		
	}
	
	cp.SequenceQuestion.prototype.getAnswerScores = function()
	{
		var lAnswerScores = [];
			
		if(this.correctSequenceArr.length <= 0)
			return lAnswerScores;
		
		var lCorrectAnswersArr = this.correctSequenceArr.slice(0);
		var lSelectedAnswersArr = this.selectedSequenceArr.slice(0);
		
		if(!lSelectedAnswersArr || lSelectedAnswersArr.length <= 0)
			return lAnswerScores;

		var lOptions = this.questionData['ao'];		
		var lAnswerOptions = this.m_answerOrderArray;
		if(lAnswerOptions && lOptions && (lAnswerOptions.length >0) && (lAnswerOptions.length == lOptions.length ))
		{
			var lAnswerNameToIndexMap = {};
			for(var j =0; j < lOptions.length; ++j)
			{
				var lOpt = lOptions[j].split(":");
				lAnswerNameToIndexMap[lOpt[0]] =lOpt[1]; 
			}
		}
		
		for(var i = 0; i < lSelectedAnswersArr.length; ++i)
		{
			var lCorrectAnswerOptionData = cp.model.data[lCorrectAnswersArr[i]];
			var lSelectedAnswerData = cp.model.data[lSelectedAnswersArr[i]];
			
			var lAnsScore = new cp.AnswerScore();
			
			if(!lSelectedAnswerData)
			{					
				lAnsScore.m_chosenAnswer = "";
			}
			else
			{
				if(this.showAsCombo())
					lAnsScore.m_chosenAnswer = trimStartingAndTrailingSpaces(lSelectedAnswerData.atxtlms);
				else
					lAnsScore.m_chosenAnswer = "Q_" + (this.getQuestionNumberInQuiz() + 1) + "answerText_" + lAnswerNameToIndexMap[lSelectedAnswersArr[i]];
			}
			
			if(!lCorrectAnswerOptionData)
			{
				lAnsScore.m_answerID = "";
				lAnsScore.m_correctAnswer = "";
			}
			else
			{
				if(this.showAsCombo())
					lAnsScore.m_answerID = lCorrectAnswerOptionData.aid;
				else
					lAnsScore.m_answerID = lSelectedAnswerData.aid;
					
				lAnsScore.m_correctAnswer = trimStartingAndTrailingSpaces(lCorrectAnswerOptionData.atxtlms);
			}
			
			lAnswerScores.push(lAnsScore);
		}
		
		return lAnswerScores;
	}
	
	cp.SequenceQuestion.prototype.getSelectedIndex = function(iAnswerID,sequenceOptionName)
	{
		var retVal = -1;
		
		if(this.selectedSequenceArr.length > 0)
		{
			if(this.shuffleCounter >= this.selectedSequenceArr.length)
				this.shuffleCounter = -1;
			
			var currCanvasName = this.selectedSequenceArr[++this.shuffleCounter];
			if((currCanvasName == undefined) || (currCanvasName == "") || (currCanvasName == "undefined"))
				return -1;
			
			++this.answerOptionsDrawnCtr;
			if(this.answerOptionsDrawnCtr == this.answerOptions.length - 1)
			{
				this.answerOptionsDrawnCtr = -1;
				this.answerOptionsDrawn = true;
			}
			
			for(var j = 0; j < this.answerOptions.length; ++j)
			{
				if(currCanvasName == this.answerOptions[j])
					return j;
			}		
		}
		else
		{
			++this.answerOptionsDrawnCtr;
			if(this.answerOptionsDrawnCtr == this.answerOptions.length - 1);
			{
				this.answerOptionsDrawnCtr = -1;
				this.answerOptionsDrawn = true;
			}
		}
		
		return retVal;
	}
	
	cp.SequenceQuestion.prototype.updateOriginalSequence = function(in_seqAnsArr)
	{	
		if(cp.verbose)
			cp.log("populating original sequence and current sequence");
		for(var i = 0; i < in_seqAnsArr.length; ++i)
		{
			var lCurrVal = in_seqAnsArr[i];
			this.answerOptions[i] = lCurrVal;
			this.currentSequenceArr[i] = lCurrVal;
		}
		if(cp.verbose)
		{
			cp.log("Current Sequence : " + this.currentSequenceArr);
			//cp.log("Original Sequence : " + this.originalSequenceArr);
		}
	}
	
	cp.SequenceQuestion.prototype.resetQuestionData = function()
	{
		cp.SequenceQuestion.superClass.resetQuestionData.call(this);		
		if(!this.m_quizController.GetGoToQuizScopeActionExecuted())
			this.selectedSequenceArr = [];		
		
		this.shuffleCounter = -1;
	}
	
	cp.SequenceQuestion.prototype.disableAllOptions = function()
	{		
		if(!this.m_quizController)
			return;
			
		var lCanDisable = true;
		var lSubmitAll = this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
		if(lSubmitAll && !this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions)
			lCanDisable = false;
		
		if(!lCanDisable)
			return;
			
		if(!this.showAsCombo())
		{
			for(i=0; i < this.sequenceElementList.length; i++)
			{
				//this.sequenceElementList[i].draggable = false; ///////REMOVE THE DRAG EVENT LISTENER WHEN DISABLED
				this.removeDragEvents(this.sequenceElementList[i]);
				var lCurrOptionDiv = cp(this.sequenceElementList[i]);
				if(lCurrOptionDiv && lCurrOptionDiv.disableOption)
					lCurrOptionDiv.disableOption();
				//var lElementToBeDisabled = document.getElementById(this.sequenceElementList[i]);
				//lElementToBeDisabled.tabIndex = -1;
			}
		}
		else
		{
			var sequenceOptions = this.getAllOptions();//document.getElementsByName(this.getAnswerGroupName());
			for(i=0; i < sequenceOptions.length; i++)
			{
				if(cp.DESKTOP != cp.device)
				{
					var selectElement = document.getElementById(sequenceOptions[i].id);
					selectElement.disabled = 'disabled';
				}
				else
				{
					var lSeqOptionName = sequenceOptions[i].id.replace("_sequenceInput","");
					var lSeqOptionData = cp.model.data[lSeqOptionName];
					var oHandler = lSeqOptionData["oHandler"];
					oHandler.disabled(true);
				}	
			}
		}
		
		this.m_answersDisabled = true;
	}		
	
	cp.SequenceQuestion.prototype.getAllOptions = function()
	{
		var ansOptionsList;
		if(!this.showAsCombo())
			ansOptionsList = this.answerOptions;
		else
			ansOptionsList = document.getElementsByName(this.getAnswerGroupName());
		
		return ansOptionsList;
	}
	
	cp.SequenceQuestion.prototype.drawSequenceOptions = function(iSeqArr)
	{
		if(cp.verbose)
			cp.log("Inside drawSequenceOptions");
		if(cp.verbose)
		{
			cp.log("Current Sequence : " + this.currentSequenceArr);
			//cp.log("Original Sequence : " + this.originalSequenceArr);
		}
		this.currentSequenceArr = iSeqArr.slice(0);
		if(cp.verbose)
		{
			cp.log("Current Sequence : " + this.currentSequenceArr);
			//cp.log("Original Sequence : " + this.originalSequenceArr);
		}
		if(!this.answerOptionsDrawn)
			return;
		var lSeqArray = iSeqArr;
		var seqOptions = this.getAllOptions();
		if(!this.showAsCombo())
		{
			for(var i = 0; i < this.sequenceElementList.length; ++i)
			{
				var lCurrSeqOptionName = this.sequenceElementList[i];
				var lCurrSeqOptionData = cp.model.data[lCurrSeqOptionName];
				var lOldSeqCurrOptionName = lCurrSeqOptionData['answerTextDivName'];
				
				var lNnewSeqCurrOptionName = lSeqArray[i];
								
				var lNewSeqCurrOptionData = cp.model.data[lNnewSeqCurrOptionName];
				var lNewSeqCurrOptionImage = lNewSeqCurrOptionData['ip'];
								
				var lNewSeqCurrOptionElement = document.getElementById(lNnewSeqCurrOptionName);
				var lOldSeqCurrOptionElement = document.getElementById(lOldSeqCurrOptionName);
				
				var lCurrSeqOptionCanvasHolderName = lCurrSeqOptionData["answerTextCanvasHolder"];
				var lCurrSeqOptionCanvasHolderElement = document.getElementById(lCurrSeqOptionCanvasHolderName);
				
				var lNewSeqCurrOptionParentElement = lNewSeqCurrOptionElement.parentNode;								
				lNewSeqCurrOptionParentElement.removeChild(lNewSeqCurrOptionElement);
				
				lCurrSeqOptionCanvasHolderElement.appendChild(lNewSeqCurrOptionElement);
				
				lCurrSeqOptionData['answerTextDivName'] = lNnewSeqCurrOptionName;
				
				var lSeqOptionCanvasDivData = cp.model.data[lNnewSeqCurrOptionName];
				
				lSeqOptionCanvasDivData['aid'] = lCurrSeqOptionData['aid'];				
			}
		}
		else
		{
			for(var i = 0; i < seqOptions.length; ++i)
			{									
				var seqOptionDiv = seqOptions[i];
				var parentDivID = seqOptionDiv.id.replace("_sequenceInput","");
				if(cp.DESKTOP != cp.device)
				{
					var selectElement = document.getElementById(seqOptionDiv.id);
					selectElement.setNewIndex(-1);					
				}
				else
				{
					var lSeqOptionName = seqOptionDiv.id.replace("_sequenceInput","");
					var lSeqOptionData = cp.model.data[lSeqOptionName];
					var oHandler = lSeqOptionData["oHandler"];
					oHandler.selectedIndex(-1);
				}	
				parentElementDivData = cp.model.data[parentDivID];
				seqOptionDivData = cp.model.data[lSeqArray[i]];
				seqOptionDivData['aid'] = parentElementDivData['aid'];
			}
		}		
	}
	
	cp.SequenceQuestion.prototype.checkIfAttempted = function()
	{	
		if(this.showAsCombo())
		{
			var seqOptions = this.getAllOptions();
			var expectedSequenceArr = this.correctSequenceArr;
			var retVal = true;
			for(var i = 0; i < seqOptions.length; ++i)
			{
				var currSeqOption = seqOptions[i];
				var selectedVal = currSeqOption.value;	
				
				if("" != selectedVal)
					return true;
			}			
		}
		else
			return true;
			
		return false;
	}
	
	cp.SequenceQuestion.prototype.checkIfCorrect = function()
	{	
		var lCurrentSequenceAsString = this.currentSequenceArr.toString();
		var lCorrectSequenceAsString = this.correctSequenceArr.toString();
		
		return (lCurrentSequenceAsString == lCorrectSequenceAsString);		
	}
	
	cp.SequenceQuestion.prototype.setSelectedAnswers = function()
	{			
		if(!this.showAsCombo())
		{
			this.answerOptions = this.currentSequenceArr.slice(0);
			this.m_answerOrderArray = this.currentSequenceArr.slice(0);
		}
		
		this.selectedSequenceArr = this.currentSequenceArr.slice(0);				
	}
	
	cp.SequenceQuestion.prototype.checkAndSetQuestionStatus = function()
	{
		var questionStatus = this.QuestionStatusEnum.INCOMPLETE;
		
		var isQuestionAnsweredCorrectly = false;
		if(!this.getIsSurvey())
		{
			if(!this.checkIfAttempted())
			{
				questionStatus = this.QuestionStatusEnum.INCOMPLETE;
			}
			else
			{
				isQuestionAnsweredCorrectly = this.checkIfCorrect();
				if(isQuestionAnsweredCorrectly)
					questionStatus = this.QuestionStatusEnum.CORRECT;
				else
					questionStatus = this.QuestionStatusEnum.INCORRECT;
			}
		}
		else
		{
			if(!this.checkIfAttempted())
			{
				questionStatus = this.QuestionStatusEnum.INCOMPLETE;
			}
			else
			{
				questionStatus = this.QuestionStatusEnum.CORRECT;
			}
		}
		
		this.setQuestionStatus(questionStatus);
	}
	
	cp.SequenceQuestion.prototype.addCorrectAnswerDiv = function()
	{
		if(!this.getWasJudged())
			return;
		
		if(this.getAnsweredCorrectly())
			return;
		
		if(!this.questionTextCanvasName)
			return;
					
		var questionTextCanvasData = cp.model.data[this.questionTextCanvasName];
		var questionTextCanvasBounds = questionTextCanvasData['b'];
		var questionTextDivName = questionTextCanvasData['dn']; 
		var bounds = questionTextCanvasBounds;
		if (bounds.length == 4)
		{
			for(var i=0; i<4; i++)
				bounds[i] = parseFloat(bounds[i]);
		}
		else 
		{
			bounds = [0, 0, 0, 0];
		}
		
		var currSlide = document.getElementById(this.getAssociatedObjName());
		
		var lReviewButtonId = this.questionTextCanvasName + "_reviewButton";
		var lReviewButton = document.getElementById(lReviewButtonId);
		if(!lReviewButton)
			lReviewButton = document.createElement('img');
		lReviewButton = lReviewButton;
		lReviewButton.id = lReviewButtonId;
		lReviewButton.className = 'sequenceReviewImage';						
		lReviewButton.style.position = 'absolute';
		lReviewButton.style.left = (bounds[0]) + "px";
		lReviewButton.style.top = (bounds[3]) + "px";
		var self = this;
		lReviewButton.onclick = function(e)
						{	
							var lCorrectSequenceDivId = self.questionTextCanvasName + "_correctSequenceReview";
							var correctSequenceDiv = document.getElementById(lCorrectSequenceDivId);
							if(correctSequenceDiv == undefined)
								correctSequenceDiv = document.createElement('div');
								
							var innerHTMLStr = "<ul style='padding-left:20px;padding-right:20px'>";
							
							var currSeqNames = self.correctSequenceArr;
							for(var i = 0; i < currSeqNames.length; ++i)
							{
								var currOptionName = currSeqNames[i];
								var currOptionData = cp.model.data[currOptionName];
								innerHTMLStr += "<li>" + currOptionData['atxt'] + "</li>";
							}
							
							innerHTMLStr += "</ul>"
							innerHTMLStr += "<img id='sequenceReviewCloseButton' src='./assets/htmlimages/closeReviewButton.png' style='right:6px;top:6px;position:absolute'>";
							correctSequenceDiv.id = lCorrectSequenceDivId;
							correctSequenceDiv.className = 'sequenceReviewArea';
							correctSequenceDiv.style.position = 'absolute';
							correctSequenceDiv.style.left = (parseFloat(lReviewButton.style.left) + parseFloat(lReviewButton.width) + 10) + "px";
							correctSequenceDiv.style.top = 	parseFloat(lReviewButton.style.top) + "px";
							correctSequenceDiv.innerHTML = innerHTMLStr;
							
							if (e.stopPropagation) 
							{
								e.stopPropagation(); // stops the browser from redirecting.
							}
							self.showReviewArea(correctSequenceDiv);								
						};
		
		currSlide.parentNode.appendChild(lReviewButton);		
	}
	
	cp.SequenceQuestion.prototype.showReviewArea = function(divElement)
	{
		var currSlide = document.getElementById(this.getAssociatedObjName());
		currSlide.parentNode.appendChild(divElement);
		
		var parentSlideDivElement = cp.movie.stage.getSlideDiv();
		var parentSlideDivElementClickHandler = parentSlideDivElement.onclick;
		parentSlideDivElement.style.cursor = 'pointer';
		var self = this;
		
		parentSlideDivElement.onclick = function(e)
										{
											currSlide.parentNode.removeChild(divElement);
											parentSlideDivElement.style.cursor = 'default';
											parentSlideDivElement.onclick = parentSlideDivElementClickHandler;
											handleClick(e);
										}
		
		var seqReviewCloseButtonElem = document.getElementById('sequenceReviewCloseButton');
		seqReviewCloseButtonElem.onclick = function(e) 
										{
											currSlide.parentNode.removeChild(divElement);
											parentSlideDivElement.style.cursor = 'default';
											parentSlideDivElement.onclick = parentSlideDivElementClickHandler;
										};
	}
	
	cp.DisplayObject = function(el)
	{
		this.element = el;
	}

	cp.DisplayObject.prototype =
	{
	    forEachChild: function(fn)
		{
			if (this.children)
			{
				var children = this.children;
				var childrenLength = children.length;
				
				for (var i=0; i<childrenLength; i++)
					fn(children[i]);
			}
		},
		
	    updateFrame: function()
		{
			this.forEachChild(function(child) {
				child.updateFrame();
			});
		},
		
	    start: function()
		{
			this.forEachChild(function(child) {
				child.start();
			});
		},
		
	    reset: function(endOfSlide)
		{
			this.forEachChild(function(child) {
				child.reset(endOfSlide);
			});
		},
		
		onEndOfMovie: function()
		{
			this.forEachChild(function(child) {
				child.onEndOfMovie();
			});
		},
		
	    getAttribute: function(name)
		{
			var x = cp.model.data[this.element.id];
			if (!x) 
				return null;
			return x[name];
		},
		
		setAttribute: function(name, value)
		{
			var x = cp.model.data[this.element.id];
			if (x) 
				x[name] = value;
		},
		
		restOfProjectDoOnNewSlide: function()
		{
		},
		
		deleteFromRopMap: function(el)
		{
			delete ropMap[el.id];
		}
	}
	
	// Label class for any question slide review label
    cp.QuestionSlideReviewLabel = function(el, args)
    {
		cp.QuestionSlideReviewLabel.baseConstructor.call(this, el);
        	
		this.textAlign = this.getAttribute("ta");
		this.bold = this.getAttribute("B");
		this.color = this.getAttribute("c");
		this.font = this.getAttribute("f");
		this.italic = this.getAttribute("i");
		this.size = this.getAttribute("sz");
		this.underline = this.getAttribute("u");

		this.id = this.getAttribute("id"); 
		this.visible = this.getAttribute("visible");
		this.re = this.getAttribute("re");
		this.sh = this.getAttribute("sh");
		var bounds = this.getAttribute("b");
			
		this.relatedQuestionSlide = this.getAttribute("rqs");		
		if(undefined != this.relatedQuestionSlide)
		{
			var lQuestionObj = getQuestionObject(this.relatedQuestionSlide);
			if(undefined != lQuestionObj)
			{
				lQuestionObj.m_correctFeedbackText = this.getAttribute('cf');
				lQuestionObj.m_partialCorrectFeedbackText = this.getAttribute('pcf');
				lQuestionObj.m_incorrectDisplayChosenText = this.getAttribute('idc');
				lQuestionObj.m_incorrectDisplayCorrectText = this.getAttribute('ict');
			}
		}		
			
	    this.bounds = {
			    minX: bounds[0],
			    minY: bounds[1],			
			    maxX: bounds[2],
			    maxY: bounds[3]
		    };
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
			    minX: vbounds[0],
			    minY: vbounds[1],			
			    maxX: vbounds[2],
			    maxY: vbounds[3]
		    };	
	    this.args = args;		
		if(this.element)
		{
			this.element.parentElement.drawingBoard = this.element.parentElement;
			this.element.parentElement.bounds = this.bounds;
		}
	    this.isDrawn = false;		    
    }
	
	cp.inherits(cp.QuestionSlideReviewLabel, cp.DisplayObject);
	
	cp.QuestionSlideReviewLabel.prototype.start = function()
	{
		this.addIfNeeded();
	}
	
	cp.QuestionSlideReviewLabel.prototype.reset = function(endOfSlide)
	{
		// release memory
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.QuestionSlideReviewLabel.prototype.addIfNeeded = function()
	{
		var lQuestionObj = getQuestionObject(this.relatedQuestionSlide);
		if(!lQuestionObj)
			return;
			
		if (this.isDrawn || !lQuestionObj.getIsStarted())			
			return;
			
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(!lQuizController)
			return;
		var isInReviewMode = lQuizController.GetIsInReviewMode();
		if(isInReviewMode == false)
			return;				
				
		if(!lQuestionObj.getIsIncomplete() || lQuestionObj.getIsSurvey() || lQuestionObj.getIsPretest()) //Review Area will only be shown in case of skipped graded question
			return;
	
		var id = this.id;
		var bounds = this.bounds;
		var type = this.type;
		
		var fieldWidth = - bounds.minX + bounds.maxX;
		var fieldHeight = - bounds.minY + bounds.maxY;
		if(this.args)
		{
			fieldWidth += Number(this.args[1])+Number(this.args[2]);
			fieldHeight += Number(this.args[1])+Number(this.args[3]);
		}
		
		var parentDiv = document.createElement("div");		
		parentDiv.id = 're-' + this.element.id;
			
		parentDiv.style.position = "absolute";
		parentDiv.style.left = this.vbounds.minX + "px";
		parentDiv.style.top = this.vbounds.minY + "px";
		parentDiv.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
		parentDiv.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		
		this.element.parentElement.style.position = "absolute";
		this.element.parentElement.style.left = this.bounds.minX + "px";
		this.element.parentElement.style.top = this.bounds.minY + "px";
		this.element.parentElement.style.width = (this.bounds.maxX - this.bounds.minX) + "px";
		this.element.parentElement.style.height = (this.bounds.maxY - this.bounds.minY) + "px";

		this.element.style.left = "0px";
		this.element.style.top = "0px";
		this.element.style.width = "100%";
		this.element.style.height = "100%";
		
		if(this.sh)
			this.element.style.textShadow = ((this.sh.i) ? 'inset ' : '') + this.sh.d*Math.cos((Math.PI*this.sh.a)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*this.sh.a)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o );		
		if(this.re)
			parentDiv.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";
		
		this.element.style.position = "absolute";
		this.element.style.textAlign = this.textAlign;
		this.element.style.verticalAlign = "middle";
		
		
		this.visible = 1;
		if(lQuestionObj.getIsIncomplete())
			this.text = this.getAttribute('icf');
		else
			this.text = "";				
		
		//Set Accessbility
		var isMarkedForAccessibility = (this.getAttribute("accstr") != undefined);
		if (isMarkedForAccessibility)
		{
			this.element.setAttribute('tabindex', '0');
			this.element.setAttribute('aria-label',this.text);
			cp.removeAccessibilityOutline( this.element );
			this.element.setAttribute('role','img');
		}
		
		this.element.style.color = this.color;
		this.element.style.fontFamily = this.font;
		this.element.style.fontSize = this.size + 'px';
		
		if(this.bold)
			this.element.style.fontWeight = 'bold';
		else
			this.element.style.fontWeight = 'normal';
		
		if(this.italic)
			this.element.style.fontStyle = 'italic';
		else
			this.element.style.fontStyle = 'normal';				
		
		if(this.underline)
			this.element.style.textDecoration = 'underline';
		else
			this.element.style.textDecoration = 'none';
		
		if(this.element.innerHTML == "")
		{
			this.element.innerHTML += this.text;	
		}
		
		this.element.parentNode.removeChild(this.element);
		
		var parentSlideElement = cp.movie.stage.getSlideDiv().firstChild;
		
		cp.addRewrapObjectAsPerRestOfProjectItem(parentDiv);
		
		parentDiv.setAttribute('class','cp-rewrap');
		parentDiv.appendChild(this.element);
		
		this.isDrawn = true;
		
		if(!this.visible)
			this.element.style.visibility = 'hidden';
	}
	
	// Label class for progress of any question slide labels
    cp.ProgressSlideLabel = function(el, args)
    {
		cp.ProgressSlideLabel.baseConstructor.call(this, el);
        	
		this.id = this.getAttribute("id"); 
		this.visible = this.getAttribute("visible");
		
		this.textAlign = this.getAttribute("ta");
		this.bold = this.getAttribute("B");
		this.color = this.getAttribute("c");
		this.font = this.getAttribute("f");
		this.italic = this.getAttribute("i");
		this.size = this.getAttribute("sz");
		this.underline = this.getAttribute("u");
		
		this.quizParam = this.getAttribute("qp");
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(!lQuizController)
			return;
		var quizParamValue = lQuizController.GetParameterValueByName(this.quizParam);
		
		this.relatedQuestionSlide = this.getAttribute("rqs");		
		
		var bounds = this.getAttribute("b");
	    this.bounds = {
			    minX: bounds[0],
			    minY: bounds[1],			
			    maxX: bounds[2],
			    maxY: bounds[3]
		    };
		this.tr = this.getAttribute("tr");
		this.re = this.getAttribute("re");
		this.sh = this.getAttribute("sh");
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
			    minX: vbounds[0],
			    minY: vbounds[1],			
			    maxX: vbounds[2],
			    maxY: vbounds[3]
		    };
		if(this.element)
		{
			this.element.parentElement.drawingBoard = this.element.parentElement;
			this.element.parentElement.bounds = this.bounds;
		}
	    this.args = args;		
	    this.isDrawn = false;		    
    }

	cp.inherits(cp.ProgressSlideLabel, cp.DisplayObject);
	
	cp.ProgressSlideLabel.prototype.start = function()
	{
		this.addIfNeeded();
	}
	
	cp.ProgressSlideLabel.prototype.reset = function(endOfSlide)
	{
		// release memory
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.ProgressSlideLabel.prototype.addIfNeeded = function()
	{
		var lQuestionObj = getQuestionObject(this.relatedQuestionSlide);
		if(!lQuestionObj)
			return;
			
		if (this.isDrawn || !lQuestionObj.getIsStarted())
			return;
	
		if(lQuestionObj)
			this.text = lQuestionObj.getProgressString();
		else
			this.text = "";
			
		var id = this.id;
		var bounds = this.bounds;
		var type = this.type;
		
		var fieldWidth = - bounds.minX + bounds.maxX;
		var fieldHeight = - bounds.minY + bounds.maxY;
		if(this.args)
		{
			fieldWidth += Number(this.args[1])+Number(this.args[2]);
			fieldHeight += Number(this.args[1])+Number(this.args[3]);
		}
		
		this.element.style.width = bounds.maxX - bounds.minX + "px";
		this.element.style.height = bounds.maxY - bounds.minY + "px";
				
		var parentDiv = document.createElement("div");		
		parentDiv.id = 're-' + this.element.id;
				
		this.element.style.textAlign = this.textAlign;
		this.element.style.verticalAlign = "middle";
		var rotateAngle = 0;
		if(this.tr)
		{
			applyTransform(this.element,this.tr);
			rotateAngle = getAngleFromRotateStr(this.tr);
			this.element.tr = this.tr;
			this.element.parentElement.tr = this.tr;
			applyTransform(this.element.parentElement,this.tr);
		}
		this.element.rotateAngle = rotateAngle;
		this.element.parentElement.rotateAngle = rotateAngle;
		if(this.sh)
			this.element.style.textShadow = this.sh.d*Math.cos((Math.PI*this.sh.a)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*this.sh.a)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + ((this.sh.i) ? ' inset' : '');		
		if(this.re)
			parentDiv.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";
		
		this.element.parentElement.style.position = "absolute";
		this.element.parentElement.style.left = this.bounds.minX + "px";
		this.element.parentElement.style.top = this.bounds.minY + "px";
		this.element.parentElement.style.width = (this.bounds.maxX - this.bounds.minX) + "px";
		this.element.parentElement.style.height = (this.bounds.maxY - this.bounds.minY) + "px";
		
		parentDiv.style.position = "absolute";
		parentDiv.style.left = this.vbounds.minX + "px";
		parentDiv.style.top = this.vbounds.minY + "px";
		parentDiv.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
		parentDiv.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		
		this.element.style.marginLeft = -(this.vbounds.minX - bounds.minX) + "px";
		this.element.style.marginTop = -(this.vbounds.minY - bounds.minY) + "px";
		this.element.style.display = "block";
		this.element.style.position = "absolute";
		
		this.element.style.color = this.color;
		this.element.style.fontFamily = this.font;
		this.element.style.fontSize = this.size + 'px';
		
		if(this.bold)
			this.element.style.fontWeight = 'bold';
		else
			this.element.style.fontWeight = 'normal';
		
		if(this.italic)
			this.element.style.fontStyle = 'italic';
		else
			this.element.style.fontStyle = 'normal';				
		
		if(this.underline)
			this.element.style.textDecoration = 'underline';
		else
			this.element.style.textDecoration = 'none';
		
		if(this.element.innerHTML == "")
		{
			this.element.innerHTML += this.text;	
		}
		
		this.element.parentNode.removeChild(this.element);
		
		var parentSlideElement = cp.movie.stage.getSlideDiv().firstChild;
		cp.addRewrapObjectAsPerRestOfProjectItem(parentDiv);		
		parentDiv.setAttribute('class','cp-rewrap');
		parentDiv.appendChild(this.element);
		
		this.isDrawn = true;
		
		if(!this.visible)
			this.element.style.visibility = 'hidden';
	}
	
	// Label class for any result slide labels
    cp.ResultSlideLabel = function(el, args)
    {
		cp.ResultSlideLabel.baseConstructor.call(this, el);
        	
		this.id = this.getAttribute("id"); 
		this.visible = this.getAttribute("visible");
		
		this.textAlign = this.getAttribute("ta");
		this.bold = this.getAttribute("B");
		this.color = this.getAttribute("c");
		this.font = this.getAttribute("f");
		this.italic = this.getAttribute("i");
		this.size = this.getAttribute("sz");
		this.underline = this.getAttribute("u");
		
		this.quizParam = this.getAttribute("qp");
		var quizParamValue = '';
				 
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(!lQuizController)
			return;
		if(this.quizParam != null)
		{			
			quizParamValue = lQuizController.GetParameterValueByName(this.quizParam);
		}		
		else if(cp.movie.playbackController.HasQuiz())
		{
			if(lQuizController.GetIsPassed())
				quizParamValue = lQuizController.GetPassedScoreFeedback();
			else
				quizParamValue = lQuizController.GetFailedScoreFeedback();
		}
		
		this.text = quizParamValue;
		
		var bounds = this.getAttribute("b");
	    this.bounds = {
			    minX: bounds[0],
			    minY: bounds[1],			
			    maxX: bounds[2],
			    maxY: bounds[3]
		    };
		this.tr = this.getAttribute("tr");
		this.re = this.getAttribute("re");
		this.sh = this.getAttribute("sh");
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
			    minX: vbounds[0],
			    minY: vbounds[1],			
			    maxX: vbounds[2],
			    maxY: vbounds[3]
		    };	
		if(this.element)
		{
			this.element.parentElement.drawingBoard = this.element.parentElement;
			this.element.parentElement.bounds = this.bounds;
		}
	    this.args = args;		
	    this.isDrawn = false;		    
    }

	cp.inherits(cp.ResultSlideLabel, cp.DisplayObject);
	
	cp.ResultSlideLabel.prototype.start = function()
	{
		this.addIfNeeded();
	}
	
	cp.ResultSlideLabel.prototype.reset = function(endOfSlide)
	{
		// release memory
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.ResultSlideLabel.prototype.addIfNeeded = function()
	{
		if (this.isDrawn)
			return;
	
		var id = this.id;
		var bounds = this.bounds;
		var type = this.type;
		
		var fieldWidth = - bounds.minX + bounds.maxX;
		var fieldHeight = - bounds.minY + bounds.maxY;
		if(this.args)
		{
			fieldWidth += Number(this.args[1])+Number(this.args[2]);
			fieldHeight += Number(this.args[1])+Number(this.args[3]);
		}
		
		var parentDiv = document.createElement("div");		
		parentDiv.id = 're-' + this.element.id;	
		
		this.element.parentElement.style.position = "absolute";
		this.element.parentElement.style.left = this.vbounds.minX + "px";
		this.element.parentElement.style.top = this.vbounds.minY + "px";
		this.element.parentElement.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
		this.element.parentElement.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		
		parentDiv.style.position = "absolute";
		parentDiv.style.left = this.vbounds.minX + "px";
		parentDiv.style.top = this.vbounds.minY + "px";
		parentDiv.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
		parentDiv.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		
		this.element.style.left = "0px";
		this.element.style.top = "0px";
		this.element.style.width = "100%";		
		
		if(this.sh)
			this.element.style.textShadow = this.sh.d*Math.cos((Math.PI*this.sh.a)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*this.sh.a)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + ((this.sh.i) ? ' inset' : '');		
		if(this.re)
			parentDiv.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";
		
		this.element.style.position = "absolute";
		this.element.style.textAlign = this.textAlign;
		this.element.style.verticalAlign = "middle";
		this.element.style.color = this.color;
		this.element.style.fontFamily = this.font;
		this.element.style.fontSize = this.size + 'px';
		
		if(this.bold)
			this.element.style.fontWeight = 'bold';
		else
			this.element.style.fontWeight = 'normal';
		
		if(this.italic)
			this.element.style.fontStyle = 'italic';
		else
			this.element.style.fontStyle = 'normal';				
		
		if(this.underline)
			this.element.style.textDecoration = 'underline';
		else
			this.element.style.textDecoration = 'none';
		
		if(this.element.innerHTML == "")
		{
			this.element.innerHTML += this.text;	
		}
		
		this.element.parentNode.removeChild(this.element);
		
		var parentSlideElement = cp.movie.stage.getSlideDiv().firstChild;
		cp.addRewrapObjectAsPerRestOfProjectItem(parentDiv);
		parentDiv.setAttribute('class','cp-rewrap');
		parentDiv.appendChild(this.element);
		
		this.isDrawn = true;
		
		if(!this.visible)
			this.element.style.visibility = 'hidden';
			
		//Place Label middle of the parentElement
		var lTempTextElement = document.createElement("div");
		lTempTextElement.style.color = this.element.style.color;
		lTempTextElement.style.fontFamily = this.element.style.fontFamily;
		lTempTextElement.style.fontSize = this.element.style.fontSize;
		lTempTextElement.style.fontWeight = this.element.style.fontWeight;
		lTempTextElement.style.fontStyle = this.element.style.fontStyle;
		lTempTextElement.style.textDecoration = this.element.style.textDecoration;
		if(this.sh)
			lTempTextElement.style.textShadow = this.element.style.textShadow;
		
		lTempTextElement.style.visibility = 'hidden';
		lTempTextElement.innerHTML = this.element.innerHTML;
		//add TempElement temporarly to get height of the tempElement
		document.body.appendChild(lTempTextElement);
		var lMaxHeight = lTempTextElement.clientHeight; 
		//remove TempElement
		document.body.removeChild(lTempTextElement);		
		var lParentHeight =(this.vbounds.maxY - this.vbounds.minY);
		if((lMaxHeight >0) && (lParentHeight >0) && (lMaxHeight<=lParentHeight))
			this.element.style.top  = (lParentHeight - lMaxHeight)/2 +"px";	
	}
	
	
	cp.HighlightBox = function(el, args)
	{
		cp.HighlightBox.baseConstructor.call(this, el);
			
		this.visible = this.getAttribute("visible");
		this.parentDivName = this.getAttribute("dn");
		this.transIn = 	cp.model.data[this.parentDivName]['trin'];
		var bounds = this.getAttribute("b");
		var actualParent = document.getElementById(this.parentDivName);
		this.actualParent = actualParent;
		this.bounds = {
				minX: bounds[0],
				minY: bounds[1],			
				maxX: bounds[2],
				maxY: bounds[3]
			};
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
				minX: vbounds[0],
				minY: vbounds[1],			
				maxX: vbounds[2],
				maxY: vbounds[3],
				width: vbounds[2] - vbounds[0],
				height: vbounds[3] - vbounds[1],
			};
		if(actualParent)
		{
			actualParent.drawingBoard = this.element.parentElement;
			actualParent.bounds = this.bounds;
			actualParent.drawingBoard.bounds = this.vbounds;
		}		
		
		this.args = args;		
		this.isDrawn = false;
		this.tr = this.getAttribute("tr");
		this.sh = this.getAttribute("sh");
		this.re = this.getAttribute("re");
		
		this.fillColor = this.getAttribute("fc");		
		this.strokeColor = this.getAttribute("sc");
		this.strokeWidth = this.getAttribute("sw");
		this.fillOpacity = this.getAttribute("fo") / 100;
		this.fillOuterArea = this.getAttribute("foa");
	}
	
	cp.inherits(cp.HighlightBox, cp.DisplayObject);
	
	cp.HighlightBox.prototype.start = function()
	{
		this.drawIfNeeded();
	}
	
	cp.HighlightBox.prototype.reset = function(endOfSlide)
	{
		// release memory
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.HighlightBox.prototype.drawIfNeeded = function()
	{
		if (this.isDrawn)
			return;
	
		var bounds = this.bounds;
		var vbounds = this.vbounds;
		var fillColor = this.fillColor;
		var strokeColor = this.strokeColor;
		var strokeWidth = this.strokeWidth;
		var fillOpacity = this.fillOpacity;
		var fillOuterArea = this.fillOuterArea;
				
		var styleLeft = bounds.minX ;
		var styleTop = bounds.minY;
		var styleWidth = bounds.maxX - bounds.minX;
		var styleHeight = bounds.maxY - bounds.minY;
		
		
		var actualParent = this.actualParent;
			
		actualParent.style.left = styleLeft +  "px";
		actualParent.style.top = styleTop + "px";
		actualParent.style.width = styleWidth + "px";
		actualParent.style.height = styleHeight + "px";
		
		var x = 0;
		var y = 0;
		var width = bounds.maxX - bounds.minX;
		var height = bounds.maxY - bounds.minY;

		var lHasShadowOrReflection = false;
		lHasShadowOrReflection = this.re || (this.sh && !this.sh.i) || this.fillOuterArea;
		
		var lHasTransform = this.tr != undefined;
		
		styleLeft 	= (0 < vbounds.minX) && lHasShadowOrReflection ? 0 : vbounds.minX;
		styleTop	= (0 < vbounds.minY) && lHasShadowOrReflection ? 0 : vbounds.minY;
		var styleRight 	= lHasShadowOrReflection && (cp.model.data.project.w > vbounds.maxX) ? cp.model.data.project.w : vbounds.maxX;
		var styleBottom	= lHasShadowOrReflection && (cp.model.data.project.h > vbounds.maxY) ? cp.model.data.project.h : vbounds.maxY;
		styleWidth	= styleRight - styleLeft;
		styleHeight	= styleBottom - styleTop;
		var canvas = this.canvas = cp.createCanvas(0, 0, styleWidth, styleHeight,this.element);

		if(this.tr)
		{
			applyTransform( actualParent,this.tr);
			actualParent.tr=this.tr;
		}
		this.element.style.display = "block";
		this.element.style.position = "absolute";
		this.element.parentElement.style.left = this.vbounds.minX + "px";
		this.element.parentElement.style.top = this.vbounds.minY + "px";
		this.element.parentElement.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
		this.element.parentElement.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		this.element.style.marginLeft = (styleLeft-this.vbounds.minX) + "px";
		this.element.style.marginTop = (styleTop-this.vbounds.minY) + "px";
		
		if(this.re)
			this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";
		cp.movie.stage.addToParentChildMap(actualParent.id,this.element.id);
		this.element.originalParent = actualParent;
		
		var gc = canvas.gc;
		gc.save();
		var transX = 0;
		var transY = 0;		
		if(lHasShadowOrReflection)
		{
			transX = (styleLeft < 0) ? -styleLeft : 0;
			transY = (styleTop < 0) ? -styleTop : 0;
			gc.translate(transX,transY);
			gc.setTransform(1,0,0,1,transX,transY);
		}			
		else if(lHasTransform)
		{
			gc.translate(styleWidth/2,styleHeight/2);
		}

		gc.fillStyle = ConvertColorToRGBA(fillColor,fillOpacity);
		gc.lineWidth = 0;
		var oddStrokeWidth = false;
		if (fillOuterArea) 
		{
			gc.fillRect(0, 0, styleWidth, styleHeight);
			gc.fillStyle = "rgba(0,0,0,0)";			
		}
		if(this.sh && !this.sh.i)
		{
			gc.shadowOffsetX = this.sh.d*Math.cos((Math.PI*this.sh.a)/180);
			gc.shadowOffsetY = this.sh.d*Math.sin((Math.PI*this.sh.a)/180);
			gc.shadowBlur = this.sh.b;
			gc.shadowColor = ConvertRGBToRGBA(this.sh.c,this.sh.o );
			//applyShadow(this.element , this.sh.d*Math.cos((Math.PI*this.sh.a)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*this.sh.a)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ));
		}
		var rotateAngle = 0;
		if(this.tr)
			rotateAngle = getAngleFromRotateStr(this.tr);
		if(lHasShadowOrReflection)
			gc.translate((bounds.minX + bounds.maxX)/2,(bounds.minY + bounds.maxY)/2);
		if(rotateAngle)
			gc.rotate((Math.PI*rotateAngle)/180);
		else if(this.sh)
			gc.rotate((Math.PI*0.02)/180);
		x = !lHasShadowOrReflection && !lHasTransform ? 0 + strokeWidth/2 : (bounds.minX - bounds.maxX)/2;
		y = !lHasShadowOrReflection && !lHasTransform ? 0 + strokeWidth/2 : (bounds.minY - bounds.maxY)/2;
		{
			gc.lineWidth = strokeWidth;
			gc.lineJoin = "miter";
			gc.lineCap = "square";
			gc.strokeStyle = strokeColor;
			/*if(this.sh&&this.sh.i&&!fillOuterArea)
			{
				gc.beginPath();
				gc.moveTo(2*styleWidth,2*styleHeight);
				gc.lineTo(-2*styleWidth,2*styleHeight);
				gc.lineTo(-2*styleWidth,-2*styleHeight);
				gc.lineTo(2*styleWidth,-2*styleHeight);
				gc.lineTo(2*styleWidth,-2*styleHeight);
			}*/
			gc.rect(x, y, width, height);
			
			if(strokeWidth!=0)
			{
				gc.stroke();
			}			
			gc.fill();
			if(strokeWidth!=0)
			{
				gc.shadowOffsetX = 0;
				gc.shadowOffsetY = 0;
				gc.shadowBlur = 0;
				gc.shadowColor = 'rgba(0,0,0,0)';
				gc.stroke();
		}
		}
		if (fillOuterArea) 
			gc.clearRect(x + (strokeWidth / 2), y + (strokeWidth / 2), width - strokeWidth, height - strokeWidth );
		gc.restore();
		this.isDrawn = true;
		gc = null;
		canvas = null;
		if(this.transIn)
			this.element.parentElement.style.opacity = 0;
		if(!this.visible)
			cp.hide( this.parentDivName );
	}	
	cp.Zoom = function(el, args)
	{
		cp.Zoom.baseConstructor.call(this, el);
			
		this.visible = this.getAttribute("visible");
		this.parentDivName = this.getAttribute("dn");
		var divData = cp.model.data[this.parentDivName];
		this.transIn = 	divData['trin'];
		var bounds = this.getAttribute("b");
		var actualParent = document.getElementById(this.parentDivName);
		this.actualParent = actualParent;
		this.bounds = {
				minX: bounds[0],
				minY: bounds[1],			
				maxX: bounds[2],
				maxY: bounds[3]
			};
		var destbounds = this.getAttribute("db");
		this.destbounds = {
				minX: destbounds[0],
				minY: destbounds[1],			
				maxX: destbounds[2],
				maxY: destbounds[3]
			};
		this.vbounds = this.bounds;
		if(actualParent)
		{
			actualParent.drawingBoard = this.element.parentElement;
			actualParent.bounds = this.bounds;
			actualParent.drawingBoard.bounds = this.vbounds;
		}		
		
		this.args = args;		
		this.isDrawn = false;
		this.tr = this.getAttribute("tr");
		
		this.fillColor = this.getAttribute("fc");		
		this.strokeColor = this.getAttribute("sc");
		this.strokeWidth = this.getAttribute("sw");
		this.fillOpacity = this.getAttribute("fo") / 100;
		this.fillOuterArea = this.getAttribute("foa");
		
		this.destfillColor = this.getAttribute("dfc");		
		this.deststrokeColor = this.getAttribute("dsc");
		this.deststrokeWidth = this.getAttribute("dsw");
		this.destfillOpacity = this.getAttribute("dfo") / 100;
		this.zoomfor = this.getAttribute("zf");
		this.from = divData.from;
		this.to = divData.to;
		this.currImage = this.getAttribute( "ip" );
		this.prevDrawnFrame = 0;
	}
	
	cp.inherits(cp.Zoom, cp.DisplayObject);
	
	cp.Zoom.prototype.start = function()
	{
		this.drawIfNeeded();		
	}
	cp.Zoom.prototype.updateFrame = function()
	{
		this.drawIfNeeded();
	}
	cp.Zoom.prototype.reset = function(endOfSlide)
	{
		// release memory
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.prevDrawnFrame = 0;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		this.canvas = null;
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.Zoom.prototype.drawIfNeeded = function()
	{
		var currentRelativeFrame = cpInfoCurrentFrame - this.from + 1;
		if(currentRelativeFrame > 0 && currentRelativeFrame<= this.zoomfor)
			this.isDrawn = false;
		else if(this.isDrawn)
			return;
		else
			currentRelativeFrame = this.zoomfor;
		if(this.prevDrawnFrame == currentRelativeFrame)
			return;
		this.prevDrawnFrame = currentRelativeFrame;
		var bounds = this.bounds;
		var vbounds = this.vbounds;
		var destbounds = this.destbounds;
		var fillColor = this.fillColor;
		var strokeColor = this.strokeColor;
		var strokeWidth = this.strokeWidth;
		var fillOpacity = this.fillOpacity;
		var fillOuterArea = this.fillOuterArea;
		
		var destfillColor = this.destfillColor;
		var deststrokeColor = this.deststrokeColor;
		var deststrokeWidth = this.deststrokeWidth;
		var destfillOpacity = this.destfillOpacity;
		
		var width = bounds.maxX - bounds.minX;
		var height = bounds.maxY - bounds.minY;
		var x = 0;
		var y = 0;	
		
		var destwidth = destbounds.maxX - destbounds.minX;
		var destheight = destbounds.maxY - destbounds.minY;
		var destx = destbounds.minX;
		var desty = destbounds.minY;	
		var actualParent = this.actualParent;
		if(!this.canvas)
		{			
			var styleLeft = bounds.minX ;
			var styleTop = bounds.minY;
			var styleWidth = bounds.maxX - bounds.minX;
			var styleHeight = bounds.maxY - bounds.minY;
			actualParent.style.left = styleLeft +  "px";
			actualParent.style.top = styleTop + "px";
			actualParent.style.width = styleWidth + "px";
			actualParent.style.height = styleHeight + "px";
			
			
			styleWidth	= cp.model.data.project.w;
			styleHeight	= cp.model.data.project.h;
			//zoom has no effect, so it can't move and its position is fixed
			this.canvas  = cp.createCanvas(0, 0, styleWidth, styleHeight,this.element);
			this.element.style.display = "block";
			this.element.style.position = "absolute";
			this.element.parentElement.style.left = this.vbounds.minX + "px";
			this.element.parentElement.style.top = this.vbounds.minY + "px";
			this.element.parentElement.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
			this.element.parentElement.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
			this.element.style.marginLeft = (-this.vbounds.minX) + "px";
			this.element.style.marginTop = (-this.vbounds.minY) + "px";			
			cp.movie.stage.addToParentChildMap(actualParent.id,this.element.id);
			this.element.originalParent = actualParent;
		}
		var canvas = this.canvas;
		var gc = canvas.gc;
		gc.clearRect(0, 0, cp.model.data.project.w, cp.model.data.project.h);
		gc.beginPath();
		
		x = bounds.minX;
		y = bounds.minY;
		if(fillOuterArea)
		{
			gc.fillStyle = ConvertColorToRGBA(fillColor,fillOpacity);		
			gc.lineWidth = 0;
			gc.fillRect(0, 0, cp.model.data.project.w, cp.model.data.project.h);
			gc.fillStyle = "rgba(0,0,0,0)";			
			gc.lineWidth = strokeWidth;
			gc.lineJoin = "miter";
			gc.lineCap = "square";
			gc.strokeStyle = strokeColor;
			gc.rect(x, y, width, height);
			if(strokeWidth!=0)
				gc.stroke();
			gc.clearRect(x + (strokeWidth / 2), y + (strokeWidth / 2), width - strokeWidth, height - strokeWidth );
			gc.beginPath();
		}
		var srcR = parseInt(fillColor.substr(1,2),16);
		var srcG = parseInt(fillColor.substr(3,2),16);
		var srcB = parseInt(fillColor.substr(5,2),16);
		
		var destR = parseInt(destfillColor.substr(1,2),16);
		var destG = parseInt(destfillColor.substr(3,2),16);
		var destB = parseInt(destfillColor.substr(5,2),16);
		
		var curColor = '#';
		var cStr = Math.round((srcR + (destR - srcR)*currentRelativeFrame/this.zoomfor)).toString(16);
		while(cStr.length<2)
			cStr = '0' + cStr;
		curColor += cStr;
		cStr = Math.round((srcG + (destG - srcG)*currentRelativeFrame/this.zoomfor)).toString(16);
		while(cStr.length<2)
			cStr = '0' + cStr;
		curColor += cStr;
		cStr = Math.round((srcB + (destB - srcB)*currentRelativeFrame/this.zoomfor)).toString(16);
		while(cStr.length<2)
			cStr = '0' + cStr;
		curColor += cStr;
		x = x + (destx - x)*currentRelativeFrame/this.zoomfor;
		y = y + (desty - y)*currentRelativeFrame/this.zoomfor;
		width = width + (destwidth - width)*currentRelativeFrame/this.zoomfor;
		height = height + (destheight - height)*currentRelativeFrame/this.zoomfor;
		var imagePath = this.currImage;
		var img = cp.movie.im.images[imagePath];
		if(img)
		{
			if(img.nativeImage.complete)
			{
				gc.drawImage(img.nativeImage,x,y,width,height);
			}
		}
		gc.fillStyle = ConvertColorToRGBA(curColor,(fillOpacity + (destfillOpacity - fillOpacity)*currentRelativeFrame/this.zoomfor));
		strokeWidth = strokeWidth + (deststrokeWidth - strokeWidth)*currentRelativeFrame/this.zoomfor;
		gc.lineWidth = strokeWidth;
		gc.lineJoin = "miter";
		gc.lineCap = "square";
		
		srcR = parseInt(strokeColor.substr(1,2),16);
		srcG = parseInt(strokeColor.substr(3,2),16);
		srcB = parseInt(strokeColor.substr(5,2),16);
		
		destR = parseInt(deststrokeColor.substr(1,2),16);
		destG = parseInt(deststrokeColor.substr(3,2),16);
		destB = parseInt(deststrokeColor.substr(5,2),16);
		
		curColor = '#';
		var cStr = Math.round((srcR + (destR - srcR)*currentRelativeFrame/this.zoomfor)).toString(16);
		while(cStr.length<2)
			cStr = '0' + cStr;
		curColor += cStr;
		cStr = Math.round((srcG + (destG - srcG)*currentRelativeFrame/this.zoomfor)).toString(16);
		while(cStr.length<2)
			cStr = '0' + cStr;
		curColor += cStr;
		cStr = Math.round((srcB + (destB - srcB)*currentRelativeFrame/this.zoomfor)).toString(16);
		while(cStr.length<2)
			cStr = '0' + cStr;
		curColor += cStr;
	
		gc.strokeStyle = curColor;
		gc.rect(x, y, width, height);
		gc.fill();
		if(strokeWidth!=0)
			gc.stroke();
		if(currentRelativeFrame == this.zoomfor)
			this.isDrawn = true;
		if(this.transIn && currentRelativeFrame==1)
			this.element.parentElement.style.opacity = 0;
		if(!this.visible)
			cp.hide( this.parentDivName );
	}	
	
	cp.AnimationItem = function(el, args)
    {
		cp.AnimationItem.baseConstructor.call(this, el);
        	
		this.visible = this.getAttribute("visible");
		this.imgSrc = this.getAttribute("ip");
		var bounds = this.getAttribute("b");
	    this.bounds = {
			    minX: bounds[0],
			    minY: bounds[1],			
			    maxX: bounds[2],
			    maxY: bounds[3]
		    };
		this.tr = this.getAttribute("tr");
		this.re = this.getAttribute("re");
		this.sh = this.getAttribute("sh");
		this.alpha = this.getAttribute( "a" );
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
			    minX: vbounds[0],
			    minY: vbounds[1],			
			    maxX: vbounds[2],
			    maxY: vbounds[3]
		    };
		if(this.element)
		{
			var actualParent = document.getElementById(this.getAttribute("dn"));
			if(actualParent)
				actualParent.drawingBoard = this.element;
			this.element.parentElement.drawingBoard = this.element.parentElement;
			this.element.parentElement.bounds = this.bounds;
			cp.movie.stage.addToParentChildMap(actualParent.id,this.element.id);
		}
	    this.args = args;		
	    this.isDrawn = false;	
    }

	cp.inherits(cp.AnimationItem, cp.DisplayObject);
	
	cp.AnimationItem.prototype.start = function()
	{
		this.addIfNeeded();
	}
	
	cp.AnimationItem.prototype.reset = function(endOfSlide)
	{
		// release memory
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
		
		this.element.style.display = "none";		
	}
	
	cp.AnimationItem.prototype.addIfNeeded = function()
	{
		if (this.isDrawn)
			return;
	
		var id = this.element.id;
		var bounds = this.bounds;
		var type = this.type;
		
		var fieldWidth = - bounds.minX + bounds.maxX;
		var fieldHeight = - bounds.minY + bounds.maxY;
		
		this.element.style.width = bounds.maxX - bounds.minX + "px";
		this.element.style.height = bounds.maxY - bounds.minY + "px";
		this.element.style.verticalAlign = "middle";
		var rotateAngle = 0;
		
		this.element.parentElement.style.position = "absolute";
		this.element.parentElement.style.left = this.vbounds.minX + "px";
		this.element.parentElement.style.top = this.vbounds.minY + "px";
		this.element.parentElement.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
		this.element.parentElement.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		this.element.style.marginLeft = -(this.vbounds.minX - bounds.minX) + "px";
		this.element.style.marginTop = -(this.vbounds.minY - bounds.minY) + "px";
		this.element.style.display = "block";
		this.element.style.position = "absolute";
		
		this.element.rotateAngle = rotateAngle;
		
		if(this.tr)
		{
			applyTransform(this.element,this.tr);
			this.element.tr=this.tr;
		}	
		
		this.element.innerHTML = "<img id='" + this.element.id + "imgSrc' src='" + this.imgSrc + "' style='width:" + (this.vbounds.maxX - this.vbounds.minX) + "px; height:" + (this.vbounds.maxY - this.vbounds.minY) + "px'/>";
		var lImgElem = document.getElementById(this.element.id + "imgSrc");
		if(this.sh && !this.sh.i)
		{
			var mAngle = this.sh.a - rotateAngle;
			applyShadow(lImgElem, this.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + (this.sh.i ? ' inset' : ''));
		}
		if(this.re)
		{
			this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";			
		}
		
		this.isDrawn = true;
		
		if(!this.visible)
			this.element.style.visibility = 'hidden';
	} 
	
	// Label class for progress of any question slide labels
    cp.TextAnimation = function(el, args)
    {
		cp.TextAnimation.baseConstructor.call(this, el);
        	
		this.visible = this.getAttribute("visible");
		
		this.bold = this.getAttribute("B");
		this.color = this.getAttribute("c");
		this.font = this.getAttribute("f");
		this.italic = this.getAttribute("i");
		this.size = this.getAttribute("sz");
		this.text = this.getAttribute("text");
		
		this.m_delay = this.getAttribute("del");
		
		this.m_letterCount = this.getAttribute("nchar");
		this.m_loop = this.getAttribute("l");
		
		this.animType = this.getAttribute("animT");
		this.m_TextAnimationObj = this;
		switch(this.animType)
		{
			case 'Typing Text': this.m_TextAnimationObj = new cp.TypingTextAnimation(el,this.m_loop,this.m_letterCount,this.m_delay); break;
			case 'Typing Text With Sound': this.m_TextAnimationObj = new cp.TypingTextAnimation(el,this.m_loop,this.m_letterCount,this.m_delay,true); break;
			default:this.m_TextAnimationObj = this; break;
		}
		
		var bounds = this.getAttribute("b");
	    this.bounds = {
			    minX: bounds[0],
			    minY: bounds[1],			
			    maxX: bounds[2],
			    maxY: bounds[3]
		    };
		this.tr = this.getAttribute("tr");
		this.re = this.getAttribute("re");
		this.sh = this.getAttribute("sh");
		this.alpha = this.getAttribute( "a" );
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
			    minX: vbounds[0],
			    minY: vbounds[1],			
			    maxX: vbounds[2],
			    maxY: vbounds[3]
		    };
		if(this.element)
		{
			var actualParent = document.getElementById(this.getAttribute("dn"));
			if(actualParent)
				actualParent.drawingBoard = this.element;
			this.element.parentElement.drawingBoard = this.element.parentElement;
			this.element.parentElement.bounds = this.bounds;
			cp.movie.stage.addToParentChildMap(actualParent.id,this.element.id);
		}
	    this.args = args;		
	    this.isDrawn = false;	
    }

	cp.inherits(cp.TextAnimation, cp.DisplayObject);
	
	cp.TextAnimation.prototype.start = function()
	{
		this.addIfNeeded();
	}
	
	cp.TextAnimation.prototype.reset = function(endOfSlide)
	{
		// release memory
		if(this.m_TextAnimationObj != this)
			this.m_TextAnimationObj.reset();
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
		
		this.element.style.display = "none";		
	}
	
	cp.TextAnimation.prototype.draw = function()
	{
		this.element.innerHTML = this.text;	
	}
	
	cp.TextAnimation.prototype.addIfNeeded = function()
	{
		if (this.isDrawn)
			return;
	
		var id = this.element.id;
		var bounds = this.bounds;
		var type = this.type;
		
		var fieldWidth = - bounds.minX + bounds.maxX;
		var fieldHeight = - bounds.minY + bounds.maxY;
				
		var lDeviceSpecWidth = (cp.device == cp.IDEVICE) ? (fieldWidth * 1.5) : fieldWidth;
		this.element.style.width = lDeviceSpecWidth + "px";
		this.element.style.height = bounds.maxY - bounds.minY + "px";
		this.element.style.verticalAlign = "middle";
		var rotateAngle = 0;
		if(this.tr)
		{
			applyTransform(this.element,this.tr);
			rotateAngle = getAngleFromRotateStr(this.tr);
			this.element.tr = this.tr;
		}
		this.element.rotateAngle = rotateAngle;
		if(this.sh) {
			var dx = this.sh.d*Math.cos((Math.PI*this.sh.a)/180);
			var dy = this.sh.d*Math.sin((Math.PI*this.sh.a)/180);
			var x1 = dx;
			var y1 = dy;
			if ( rotateAngle != 0 ) {
				var pos_r = rotateAngle;
				while ( pos_r < 0 )
					pos_r = 360 + rotateAngle;
				var counterClockAngle = 360 - rotateAngle;
				var sin_a = Math.sin( ( Math.PI * counterClockAngle ) / 180 );
				var cos_a = Math.cos( ( Math.PI * counterClockAngle ) / 180 );
				x1 = dx * cos_a - dy * sin_a;
				y1 = dx * sin_a + dy * cos_a; 
			}
			this.element.style.textShadow = x1 + 'px ' + y1 + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + ((this.sh.i) ? ' inset' : '');		
		}
		if(this.re)
			this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";
		this.element.parentElement.style.position = "absolute";
		this.element.parentElement.style.left = this.vbounds.minX + "px";
		this.element.parentElement.style.top = this.vbounds.minY + "px";
		
		var lDeviceSpecVWidth = (cp.device == cp.IDEVICE) ? ((this.vbounds.maxX - this.vbounds.minX) * 1.5) : (this.vbounds.maxX - this.vbounds.minX);		
		this.element.parentElement.style.width = lDeviceSpecVWidth + "px";
		this.element.parentElement.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		this.element.style.marginLeft = -(this.vbounds.minX - bounds.minX) + "px";
		this.element.style.marginTop = -(this.vbounds.minY - bounds.minY) + "px";
		this.element.style.display = "block";
		this.element.style.position = "absolute";
		
		this.element.style.color = this.color;
		this.element.style.fontFamily = this.font;
		this.element.style.fontSize = this.size + 'px';
		this.element.style.lineHeight = '100%';
		this.element.style.opacity = this.alpha;
		
		if(this.bold)
			this.element.style.fontWeight = 'bold';
		else
			this.element.style.fontWeight = 'normal';
		
		if(this.italic)
			this.element.style.fontStyle = 'italic';
		else
			this.element.style.fontStyle = 'normal';
				
		this.m_TextAnimationObj.draw(this.text);

		this.isDrawn = true;
		
		if(!this.visible)
			this.element.style.visibility = 'hidden';
	} 
	
	cp.TypingTextAnimation = function(el,aLoop,aLetterCount,aDelay,aHasAudio)
	{
		this.element = el;
		this.loop = aLoop;
		this.letterCount = aLetterCount;
		this.delay = aDelay;
		this.hasAudio = aHasAudio;
		this.canPlayAnimation = false;
		this.lTimer = undefined;
	}
	
	cp.TypingTextAnimation.prototype.reset = function(endOfSlide)
	{
		clearInterval(this.lTimer);
		this.lTimer = undefined;
		this.canPlayAnimation = false;		
	}
	
	cp.TypingTextAnimation.prototype.draw = function(aText)
	{
		this.text = aText;
		var lInterval = ( this.delay * 1000 ) / cpInfoFPS;
		
		var self = this;
		var lCurrIndex = 0;
		function getNextWordToAdd()
		{
			if(lCurrIndex >= self.text.length)
				return undefined;
			var lRetWord = "";
			
			var lTagStarted = false;
			var lTagEnded = false;
			
			var lEscCharStarted = false;
			var lEscCharEnded = false;
			
			var nbspCtr = 0;
			var lChar = self.text[lCurrIndex];
			if(lChar == "&")
			{
				lEscCharStarted = true;
				var lTempWord = "";
				var lTempIndexRunner = 0;
				do
				{					
					lTempWord += lChar;
					lCurrIndex++;
					lTempIndexRunner++;
					lChar = self.text[lCurrIndex];
					if((lChar == "&") && lEscCharStarted)
					{
						lCurrIndex -= (lTempIndexRunner - 1);
						lEscCharStarted = false;
						lEscCharEnded = true;
						break;
					}
					
					if((lChar == ";") && lEscCharStarted)
					{
						lTempWord += lChar;
						lCurrIndex++;
						lChar = self.text[lCurrIndex];
						lEscCharStarted = false;
						lEscCharEnded = true;
					}
					
					var lNBSPWord;
					if(nbspCtr == 0)
						lNBSPWord = "";
					if(lTempWord == "&nbsp;")
					{						
						//lEscCharEnded = false;						
						if(cp.verbose)
							cp.log("Next Characters : " + self.text.substring(lCurrIndex,lCurrIndex + 18));
						if(self.text.substring(lCurrIndex,lCurrIndex + 18) == "&nbsp;&nbsp;&nbsp;")
						{
							lTempWord += self.text.substring(lCurrIndex,lCurrIndex + 18);							
						}
						break;
					}					
				}
				while(!lEscCharEnded);
				lCurrIndex--;
				lRetWord = lTempWord;
			}
			else if(lChar == "<")
			{
				lTagStarted = true;
				var lTempWord = "";
				var lTempIndexRunner = 0;
				do
				{
					lTempWord += lChar;
					lCurrIndex++;
					lTempIndexRunner++;					
					lChar = self.text[lCurrIndex];
					if((lChar == "<") && lTagStarted)
					{
						lCurrIndex -= (lTempIndexRunner - 1);
						lTagStarted = false;						
						break;
					}
					
					if((lChar == ">") && lTagStarted)
					{
						lTempWord += lChar;
						
						if(lTempWord == "<br>")
						{						
							lTagEnded = true;
							break;
						}
						else
						{
							lCurrIndex -= lTempIndexRunner;
							lTagStarted = false;						
							break;
						}
					}
				}
				while(lChar != ">");
				
				lRetWord = lTempWord;
			}
			else
				lRetWord = lChar;
			//cp.log(lRetWord);
			
			lCurrIndex++;
			
			return lRetWord;
		}
		
		this.txtElement = document.createElement("div");
		this.txtElement.id = this.element.id + "_txt";
		this.txtElement.style["display"] = "inline";
		this.element.appendChild(self.txtElement);
		this.cursorElement = document.createElement("div");
		this.cursorElement.id = this.element.id + "_cursor";		
		this.cursorElement.style["display"] = "inline";
		this.element.appendChild(self.cursorElement);		
		this.canPlayAnimation = true;
		this.lTimer = setInterval(function()
										{
											if(cp.movie.paused)
												return;
											if(!self.canPlayAnimation)
											{
												clearInterval(self.lTimer);
												self.lTimer = undefined;
												return;
											}
											var lNextChar = getNextWordToAdd();
											if(lNextChar != undefined)
											{
												if(self.hasAudio && (self.element.style.visibility != "hidden" || self.element.style.display != "block"))
													cp.movie.am.playKeyTap();
												self.txtElement.innerHTML += lNextChar;										
											}
											else
											{
												if(!self.loop)
												{
													clearInterval(self.lTimer);
													self.lTimer = undefined;
												}
												else
												{
													lCurrIndex = 0;
													self.txtElement.innerHTML = "";
												}
											}											
										},lInterval);
				
		var lCursorVal = true;
		var lCursorTimer = setInterval(function()
								{
									if(cp.movie.paused)
									{
										self.cursorElement.innerHTML = "";
										return;
									}
									if(self.lTimer != undefined)
									{
										if(lCursorVal)
											self.cursorElement.innerHTML = "|";
										else
											self.cursorElement.innerHTML = "";
										lCursorVal = !lCursorVal;																					
									}
									else
									{
										if(!self.loop)
										{
											self.cursorElement.innerHTML = "";
											clearInterval(lCursorTimer);
											lCursorTimer = undefined;
										}
									}
									
								},lInterval/2);
	}
	
	// HotspotInput CLASS for Radio Button Input
    cp.HotspotInput = function(el, args)
    {
        cp.HotspotInput.baseConstructor.call(this, el);
        	
		this.id = this.getAttribute("id"); 
		this.type = this.getAttribute("type");
		this.answerID = this.getAttribute("aid");
		this.relatedQuestionSlide = this.getAttribute("rqs");	
		this.isCorrect = this.getAttribute("ic");		
		
		this.value = 'enabled';
		this.marked = this.getAttribute("mr");
        this.showHandCursorOnOver = this.getAttribute("cur");
		this.isDrawn = false;		    
    }
	
	cp.inherits(cp.HotspotInput, cp.HighlightBox);
	
	cp.HotspotInput.prototype.start = function()
	{
		this.drawIfNeeded();
	}
	
	cp.HotspotInput.prototype.reset = function(endOfSlide)
	{		
		// release memory
		delete ropMap[this.element.id];
		cp.HotspotInput.superClass.reset.call(this, endOfSlide);
		
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.HotspotInput.prototype.drawIfNeeded = function()
	{	
		var lQuestionObj = getQuestionObject(this.relatedQuestionSlide);
		if(!lQuestionObj)
			return;
			
		if (this.isDrawn || !lQuestionObj.getIsStarted())
			return;
		var actualElement = this.element;
		var actualParent = actualElement.parentElement;
		var parentDiv =  document.createElement('div');
		parentDiv.id = 're-' + this.element.id;
		this.element = document.createElement('canvas');		
		var parentSlideElement = cp.movie.stage.getSlideDiv().firstChild;
		
		cp.addRewrapObjectAsPerRestOfProjectItem(parentDiv);		
		parentDiv.setAttribute('class','cp-rewrap');
		parentDiv.appendChild(this.element);
		this.parentDivName += 'hotspot';
		if(actualParent)
		{
			actualParent.drawingBoard = parentDiv;
			actualParent.bounds = this.bounds;
			actualParent.drawingBoard.bounds = this.vbounds;
		}
		cp.HotspotInput.superClass.drawIfNeeded.call(this);
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(!lQuizController)
			return;
		var isInReviewMode = lQuizController.GetIsInReviewMode();
		
		
		var lShouldDisable = lQuestionObj.shouldDisableOptions();
		this.group = lQuestionObj.getAnswerGroupName();
		
		var parentNodeId = actualElement.parentNode.id;
		
		actualParent.style.backgroundColor = "#FFFFFF";
		actualParent.style.opacity = "0";
		
        if(this.showHandCursorOnOver)
            actualParent.style.cursor = 'pointer';
        else
            actualParent.style.cursor = 'default';
        	
		actualElement.name = this.group;
		
		if(lShouldDisable)
		{
			this.value = 'disabled';
            actualParent.style.cursor = 'default';
			if(lQuestionObj.getWasJudged() &&  lQuestionObj.canShowReviewIcons())
			{
				if(this.isCorrect)
				{
					var newImg = document.createElement('img');
					newImg.src = './assets/htmlimages/correct_answer_normal.png';
					newImg.style.position = "absolute";				
					newImg.style.left = parseFloat(actualElement.parentElement.style.width)/2 - parseFloat(newImg.width)/2 + "px";
					newImg.style.top = parseFloat(actualElement.parentElement.style.height)/2 - parseFloat(newImg.height)/2 + "px";					
					if(this.sh)
					{
						var mAngle = this.sh.a;
						applyShadow(newImg,this.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + (this.sh.i ? ' inset' : ''));				
					}
					parentDiv.appendChild(newImg);	
				}	
			}	
		}		
		
		actualElement.style.position = 'absolute';
		this.isDrawn = true;
		
		if(!this.visible)
			actualElement.style.visibility = 'hidden';
	}
	
	
	// CheckBoxInput CLASS for Radio Button Input
    cp.CheckBoxInput = function(el, args)
    {
        cp.CheckBoxInput.baseConstructor.call(this, el);	
        	
		this.id = this.getAttribute("id"); 
		this.type = this.getAttribute("type");
		this.visible = this.getAttribute("visible");
		this.answerID = this.getAttribute("aid");
		this.relatedQuestionSlide = this.getAttribute("rqs");
		this.isCorrect = this.getAttribute("ic");
		
		this.tabIndex = this.getAttribute('ti');
		this.accessibilityText = this.getAttribute('ad');
		this.canvasDivName = this.getAttribute("cn");
		this.value = 'enabled';
		this.checked = 'unchecked';
	    var bounds = this.getAttribute("b");
		this.bounds = {
			    minX: bounds[0],
			    minY: bounds[1],			
			    maxX: bounds[2],
			    maxY: bounds[3]
		    };
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
				minX: vbounds[0],
				minY: vbounds[1],			
				maxX: vbounds[2],
				maxY: vbounds[3]
			};	
        this.answerHolderLeft = this.getAttribute("ahl");
        this.answerHolderTop = this.getAttribute("aht");
		this.sh = 	this.getAttribute("sh");
	    this.args = args;		
	    this.isDrawn = false;
    }
	
	cp.inherits(cp.CheckBoxInput, cp.DisplayObject);
	
	cp.CheckBoxInput.prototype.start = function()
	{
		this.addIfNeeded();
	}
	
	cp.CheckBoxInput.prototype.reset = function(endOfSlide)
	{
		// release memory
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.CheckBoxInput.prototype.addIfNeeded = function()
	{
		var lQuestionObj = getQuestionObject(this.relatedQuestionSlide);
		if(!lQuestionObj)
			return;
			
		if (this.isDrawn || !lQuestionObj.getIsStarted())
			return;
		
		var id = this.element.id;
		var bounds = this.bounds;
		var type = this.type;
		
		var fieldWidth = - bounds.minX + bounds.maxX;
		var fieldHeight = - bounds.minY + bounds.maxY;
		if(this.args)
		{
			fieldWidth += Number(this.args[1])+Number(this.args[2]);
			fieldHeight += Number(this.args[1])+Number(this.args[3]);
		}
		
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(!lQuizController)
			return;
		var isInReviewMode = lQuizController.GetIsInReviewMode();
		
		var lShouldDisable = lQuestionObj.shouldDisableOptions();
		this.group = lQuestionObj.getAnswerGroupName();
				
		var lCursorStyle = lShouldDisable ? 'default' : 'pointer';
				
		var divData = cp.model.data[this.element.id];
		this.answerTextCanvasDivName = lQuestionObj.getAnswerOption(divData);
		
		var answerLabelCanvasElement = document.getElementById(this.canvasDivName);
		
		var parentSlideElement = cp.movie.stage.getSlideDiv().firstChild;		
		
		var answerTextCanvasDivData = cp.model.data[this.answerTextCanvasDivName];
		
		if(lQuestionObj.getIfSelected(this.answerID))
		{
			this.checked = "checked";
		}	
		
		this.accessibilityText = answerTextCanvasDivData['accstr'];
		
		this.isCorrect = answerTextCanvasDivData['ic'];				
		divData['ic'] = this.isCorrect;
		
		var lHasShadowOrReflection = false;
		lHasShadowOrReflection = this.re || (this.sh && !this.sh.i);
		
		var answerTextCanvasImageSrc = answerTextCanvasDivData['ip'];
		var answerTextCanvasImageBounds = answerTextCanvasDivData['b'];
		this.answerTextCanvasImageBounds = {
				minX: answerTextCanvasImageBounds[0],
				minY: answerTextCanvasImageBounds[1],			
				maxX: answerTextCanvasImageBounds[2],
				maxY: answerTextCanvasImageBounds[3]
			};		

		var lAnswerLabelData = cp.model.data[divData.cn];
		var lAnswerLabelBounds = lAnswerLabelData.b;
		this.lAnswerLabelBounds = {
				minX: lAnswerLabelBounds[0],
				minY: lAnswerLabelBounds[1],			
				maxX: lAnswerLabelBounds[2],
				maxY: lAnswerLabelBounds[3]
			};
		
		if(this.element.innerHTML == "")
		{
			this.element.innerHTML += "<div id='" + id + "_highlight' "+ "tabindex = '0' role='checkbox' aria-label='" + this.accessibilityText + "' "+ "style='" + cp.accOutlineStyleStr + ";cursor:" + lCursorStyle + ";border-radius:5px; left: -5px; top: -1px;width: " + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 50) + "px; height: " + (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6) + "px;position:absolute'><label><input type='" + type + "' " + this.value + " " + this.checked + " name='" + this.group + "' id='" + id + "_checkBoxInputField' style='cursor:" + lCursorStyle + ";opacity:0;left: 0px; top: " + (((this.lAnswerLabelBounds.maxY - this.lAnswerLabelBounds.minY) - 22)/2) + "px;width: 22px; height: 22px;position:absolute;border-radius:0px;'></input></label></div>";			
		}

		var dummyHighlight = document.createElement('div');
		cp.addRewrapObjectAsPerRestOfProjectItem(dummyHighlight);
		dummyHighlight.id = id + '_dummyhighlight';
		dummyHighlight.style.cursor = lCursorStyle;
		dummyHighlight.style.borderRadius = "5px";
		dummyHighlight.style.left = (this.bounds.minX - 5) + "px";
		dummyHighlight.style.top = (this.bounds.minY - 3) + "px";
		dummyHighlight.style.width = (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 50) + "px";
		dummyHighlight.style.height = (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6) + "px"; 
		dummyHighlight.style.position = "absolute";
		
		var checkBoxElement = document.getElementById(id + "_checkBoxInputField");
		checkBoxElement.tabIndex = -1;
		var actualID = divData.actid;//actualID.replace('ch','');
		var answertextParentDiv = document.createElement('div');
		cp.addRewrapObjectAsPerRestOfProjectItem(answertextParentDiv);
		answertextParentDiv.setAttribute('class','cp-rewrap');
		answertextParentDiv.id = actualID + "canvasHolder";
		divData["answerTextCanvasHolder"] = answertextParentDiv.id;
		var answertextCanvas = document.createElement('canvas');		
		answertextCanvas.setAttribute('class','cp-shape');
		answertextCanvas.id = this.answerTextCanvasDivName;
		answertextParentDiv.appendChild(answertextCanvas);
		
		var actualElem = document.getElementById(answerTextCanvasDivData["dn"]);
		actualElem.drawingBoard = answertextParentDiv;
		updateVarText(actualElem);
		
		cp.model.data[this.answerTextCanvasDivName].dns = this.element.id;
		var answertextCanvasShape = new cp.Shape(answertextCanvas, cp.model.data[this.answerTextCanvasDivName]);
		answertextCanvasShape.start();
		
		var lActualIDDivData = cp.model.data[actualID];
		var lCanvasName = lActualIDDivData.mdi;
		
		answertextCanvas.parentElement.style.left = parseFloat(answertextCanvas.parentElement.style.left) + (cp.model.data[lCanvasName].b[0] - this.answerTextCanvasImageBounds.minX) + 'px';
		answertextCanvas.parentElement.style.top = parseFloat(answertextCanvas.parentElement.style.top) + (cp.model.data[lCanvasName].b[1] - this.answerTextCanvasImageBounds.minY) + 'px';
		
		var answerLabelCanvasParentElement = answerLabelCanvasElement.parentElement;
		parentSlideElement.removeChild(answerLabelCanvasParentElement);
		cp.addRewrapObjectAsPerRestOfProjectItem(answerLabelCanvasParentElement);
		
		var checkCanvasElement = document.createElement('canvas');
		var lCheckBoxLeft = this.bounds.minX;
		var lCheckBoxTop = ((this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY) - 22)/2;
		var styleLeft 	= (0 < (this.vbounds.minX)) && lHasShadowOrReflection ? 0 : (this.vbounds.minX);
		var styleTop	= (0 < (this.vbounds.minY)) && lHasShadowOrReflection ? 0 : (this.vbounds.minY);
		var styleRight 	= (cp.model.data.project.w > this.vbounds.maxX) && lHasShadowOrReflection ? cp.model.data.project.w : this.vbounds.maxX + 4;
		var styleBottom	= (cp.model.data.project.h > this.vbounds.maxY) && lHasShadowOrReflection ? cp.model.data.project.h : this.vbounds.maxY + 4;
		var styleWidth	= styleRight - styleLeft;
		var styleHeight	= styleBottom - styleTop;
		canvas = this.canvas = cp.createCanvas(0, 0,  styleWidth, styleHeight,checkCanvasElement);
		var gc 	= canvas.gc;
		checkCanvasElement.style.display = "block";
		checkCanvasElement.style.position = "absolute";
		var newPa = document.createElement('div');
		cp.addRewrapObjectAsPerRestOfProjectItem(newPa);
		newPa.appendChild(checkCanvasElement);
		newPa.style.display = "block";
		newPa.style.position = "absolute";
		newPa.style.left = this.vbounds.minX + "px";
		newPa.style.top = (this.lAnswerLabelBounds.minY + ((this.lAnswerLabelBounds.maxY - this.lAnswerLabelBounds.minY - 22)/2)) + "px";
		newPa.style.width = "22px";
		newPa.style.height = "22px";
		if(lHasShadowOrReflection)
		{
			checkCanvasElement.style.marginLeft = (-this.vbounds.minX ) + "px";
			checkCanvasElement.style.marginTop = (- this.lAnswerLabelBounds.minY) + "px";	
		}
		else
		{
			checkCanvasElement.style.marginLeft = "-2px";
			checkCanvasElement.style.marginTop = "-2px";	
		}
		gc.width = styleWidth;
		gc.height = styleHeight;
		gc.left = styleLeft;
		gc.top = styleTop;
		if(this.sh && !this.sh.i)
		{
			gc.shadowOffsetX = this.sh.d*Math.cos((Math.PI*this.sh.a)/180);
			gc.shadowOffsetY = this.sh.d*Math.sin((Math.PI*this.sh.a)/180);
			gc.shadowBlur = this.sh.b;
			gc.shadowColor = ConvertRGBToRGBA(this.sh.c,this.sh.o );				
		}
		var self = this;
		checkBoxElement.loadAndDrawImage = function(src)
		{
			if(self.loadedBtnImages == null)
			{
				self.loadedBtnImages = new Object();
			}
			checkCanvasElement.img = src;
			
			if(self.loadedBtnImages[src]==null)
			{
				var btnImage = new Image();
				btnImage.onload = function(e)
				{
					//gc.rotate((Math.PI*0.02)/180);
					self.loadedBtnImages[src] = btnImage;
					gc.clearRect(gc.left,gc.top,gc.width, gc.height);
					if(lHasShadowOrReflection)
						gc.drawImage(self.loadedBtnImages[src],(bounds.minX - 2),(bounds.minY  - 2));
					else
						gc.drawImage(self.loadedBtnImages[src],0,0);
				};
				self.loadedBtnImages[src] = btnImage;
				btnImage.src = src;
			}
			else
			{
				gc.clearRect(gc.left,gc.top,gc.width, gc.height);
				if(lHasShadowOrReflection)
					gc.drawImage(self.loadedBtnImages[src],(bounds.minX  - 2),(bounds.minY  - 2));
				else
					gc.drawImage(self.loadedBtnImages[src],0,0);
			}
		};
		var highlightElement = document.getElementById(id + "_highlight");	
		
		this.element.style.left = (this.bounds.minX) + "px";
		this.element.style.top = (this.bounds.minY - 2) + "px";
		this.element.style.width = (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 50) + "px";
		this.element.style.height = (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6) + "px";
		this.element.style.position = "absolute";
		
		this.element.style.backgroundColor = "#ff0000";
		this.element.style.opacity = 0;
				
		if(cp.DESKTOP == cp.device)
		{
			var dummyhighlightElement = document.getElementById(id + "_dummyhighlight");
			highlightElement.onmouseover = function(e)
										{
											if(!lShouldDisable)
											{
												dummyhighlightElement.style.backgroundColor = "#000000";
												dummyhighlightElement.style.opacity = "0.3";
												if(self.sh)
												{
													var mAngle = self.sh.a;
													applyShadow(dummyhighlightElement,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
												}
											}
										}	
			highlightElement.onmouseout = function(e)
										{
											if(!lShouldDisable)
											{
												dummyhighlightElement.style.backgroundColor = "transparent";
												applyShadow(dummyhighlightElement,'');
											}
												
										}	
		}
					
		this.element.onclick = checkBoxElement.onclick = function(e)
								{
									if(checkBoxElement.disabled)
										return;
									var allradios = document.getElementsByName(self.group);
									for(var i = 0; i < allradios.length; ++i)
									{
										var currCheckBoxElem = allradios[i];
										if(checkBoxElement == currCheckBoxElem)
											currCheckBoxElem.checked = !currCheckBoxElem.checked;
										if(currCheckBoxElem.checked)
											currCheckBoxElem.loadAndDrawImage(lQuestionObj.getImageForState(self.type,'selected'));
										else
											currCheckBoxElem.loadAndDrawImage(lQuestionObj.getImageForState(self.type,'default'));
									}		
								};	
		if(this.checked == "checked")
			checkBoxElement.loadAndDrawImage(lQuestionObj.getImageForState(this.type,'selected'));
		else
			checkBoxElement.loadAndDrawImage(lQuestionObj.getImageForState(this.type,'default'));

		checkBoxElement.disableOption = function()
		{
			if(self.value == 'disabled')
				return;
			lShouldDisable = true;
			self.element.style.cursor = "default";
			self.value = 'disabled';
			checkBoxElement.disabled = 'disabled';
			
			checkBoxElement.style.cursor = 'default';
			checkBoxElement.parentNode.style.cursor = 'default';
			checkBoxElement.parentNode.parentNode.style.cursor = 'default';
			
			highlightElement.tabIndex = -1;
			if(checkBoxElement.checked)
				checkBoxElement.loadAndDrawImage(lQuestionObj.getImageForState(self.type,'selectedDisabled'));
			else
				checkBoxElement.loadAndDrawImage(lQuestionObj.getImageForState(self.type,'disabled'));

			if(lQuestionObj.getWasJudged() && lQuestionObj.canShowReviewIcons())
			{
				if(self.isCorrect)
				{
					var newImg = document.createElement('img');
					if(self.checked == 'checked')
					newImg.src = './assets/htmlimages/correct_answer_normal.png';
					else
						newImg.src = './assets/htmlimages/skip_answer_normal.png';
                    newImg.tabIndex = 0;
					newImg.style.position = "absolute";				
					newImg.style.left = self.bounds.minX - 20 + "px";
					newImg.style.top = self.bounds.minY + "px";
					self.element.parentNode.appendChild(newImg);
					if(self.sh)
					{
						var mAngle = self.sh.a;
						applyShadow(newImg ,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
					}
				}	
				else
				{
					if((lQuestionObj.getWasJudged()) && (self.checked == "checked"))
					{
						var newImg = document.createElement('img');
						newImg.src = './assets/htmlimages/incorrect_answer_normal.png';
						newImg.style.position = "absolute";		
                        newImg.tabIndex = 0;		
						newImg.style.left = self.bounds.minX - 20 + "px";
						newImg.style.top = self.bounds.minY + "px";
						self.element.parentNode.appendChild(newImg);
						if(self.sh)
						{
							var mAngle = self.sh.a;
							applyShadow(newImg ,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
						}
					}
				}
			}
		};
		
		if(lShouldDisable)
		{
			checkBoxElement.disableOption();
		}
		
		this.isDrawn = true;
		
		if(!this.visible)
			this.element.style.visibility = 'hidden';
		
	}
    
	// RadioInput CLASS for Radio Button Input
	cp.RadioInput = function(el, args)
	{
		cp.RadioInput.baseConstructor.call(this, el);
			
		this.type = this.getAttribute("type");
		this.visible = this.getAttribute("visible");
		this.answerID = this.getAttribute("aid");		
		this.relatedQuestionSlide = this.getAttribute("rqs");
		
		this.tabIndex = this.getAttribute('ti');
		this.accessibilityText = this.getAttribute('ad');
		this.canvasDivName = this.getAttribute("cn");
		this.value = 'enabled';
		this.checked = 'unchecked';
		
		var bounds = this.getAttribute("b");
		this.bounds = {
				minX: bounds[0],
				minY: bounds[1],			
				maxX: bounds[2],
				maxY: bounds[3]
			};
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
				minX: vbounds[0],
				minY: vbounds[1],			
				maxX: vbounds[2],
				maxY: vbounds[3]
			};
        this.answerHolderLeft = this.getAttribute("ahl");
        this.answerHolderTop = this.getAttribute("aht");
        this.sh = 	this.getAttribute("sh");
		this.args = args;		
		this.isDrawn = false;			    
	}
	
	cp.inherits(cp.RadioInput, cp.DisplayObject);
	
	cp.RadioInput.prototype.start = function()
	{
		this.addIfNeeded();
	}
	
	cp.RadioInput.prototype.reset = function(endOfSlide)
	{
		// release memory
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.RadioInput.prototype.addIfNeeded = function()
	{
		var lQuestionObj = getQuestionObject(this.relatedQuestionSlide);
		if(!lQuestionObj)
			return;
			
		if (this.isDrawn || !lQuestionObj.getIsStarted())
			return;
	
		var id = this.element.id;
		var bounds = this.bounds;
		var type = this.type;
		
		var fieldWidth = - bounds.minX + bounds.maxX;
		var fieldHeight = - bounds.minY + bounds.maxY;
		if(this.args)
		{
			fieldWidth += Number(this.args[1])+Number(this.args[2]);
			fieldHeight += Number(this.args[1])+Number(this.args[3]);
		}
		
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(!lQuizController)
			return;
		var isInReviewMode = lQuizController.GetIsInReviewMode();
		
		var lShouldDisable = lQuestionObj.shouldDisableOptions();
		this.group = lQuestionObj.getAnswerGroupName();
		
		var lCursorStyle = lShouldDisable ? 'default' : 'pointer';
				
		var divData = cp.model.data[this.element.id];
		this.answerTextCanvasDivName = lQuestionObj.getAnswerOption(divData);
		
		var answerLabelCanvasElement = document.getElementById(this.canvasDivName);
		if (! answerLabelCanvasElement)
			return; // Something is wrong.
		
		var parentSlideElement = cp.movie.stage.getSlideDiv().firstChild;
		
		var answerTextCanvasDivData = cp.model.data[this.answerTextCanvasDivName];
		
		if(lQuestionObj.getIfSelected(this.answerID))
			this.checked = "checked";
		
		this.accessibilityText = answerTextCanvasDivData['accstr'];
		
		this.isCorrect = answerTextCanvasDivData['ic'];				
		divData['ic'] = this.isCorrect;
		
		var lHasShadowOrReflection = false;
		lHasShadowOrReflection = this.re || (this.sh && !this.sh.i);	
		
		var answerTextCanvasImageSrc = answerTextCanvasDivData['ip'];
		var answerTextCanvasImageBounds = answerTextCanvasDivData['b'];
		this.answerTextCanvasImageBounds = {
				minX: answerTextCanvasImageBounds[0],
				minY: answerTextCanvasImageBounds[1],			
				maxX: answerTextCanvasImageBounds[2],
				maxY: answerTextCanvasImageBounds[3]
			};
		
		var lAnswerLabelData = cp.model.data[divData.cn];
		var lAnswerLabelBounds = lAnswerLabelData.b;
		this.lAnswerLabelBounds = {
				minX: lAnswerLabelBounds[0],
				minY: lAnswerLabelBounds[1],			
				maxX: lAnswerLabelBounds[2],
				maxY: lAnswerLabelBounds[3]
			};
		
		if(this.element.innerHTML == "")
		{			
			this.element.innerHTML += "<div id='" + id + "_highlight' "+ "tabindex = '0' role='radio' aria-label='" + this.accessibilityText + "' "+ "style='" + cp.accOutlineStyleStr + ";cursor:" + lCursorStyle + ";border-radius:5px; left: -5px; top: -1px;width: " + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 50) + "px; height: " + (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6) + "px;position:absolute';background-color:#FF0000;opacity:.5'><label><input type='" + type + "' " + this.value + " " + this.checked + " name='" + this.group + "' id='" + id + "_radioInputField' style='cursor:" + lCursorStyle + ";opacity:0;left: 0px; top: " + (((this.lAnswerLabelBounds.maxY - this.lAnswerLabelBounds.minY) - 22)/2) + "px;width: 22px; height: 22px;position:absolute;border-radius:0px;'></input></label></div>";			
		}
		
		var dummyHighlight = document.createElement('div');
		cp.addRewrapObjectAsPerRestOfProjectItem(dummyHighlight);
		dummyHighlight.id = id + '_dummyhighlight';
		dummyHighlight.style.cursor = lCursorStyle;
		dummyHighlight.style.borderRadius = "5px";
		dummyHighlight.style.left = (this.bounds.minX - 5) + "px";
		dummyHighlight.style.top = (this.bounds.minY - 3) + "px";
		dummyHighlight.style.width = (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 50) + "px";
		dummyHighlight.style.height = (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6) + "px"; 
		dummyHighlight.style.position = "absolute";
		
		var radioElement = document.getElementById(id + "_radioInputField");		
		radioElement.tabIndex = -1;
		var actualID = divData.actid;//actualID.replace('r','');
		var answertextParentDiv = document.createElement('div');
		cp.addRewrapObjectAsPerRestOfProjectItem(answertextParentDiv);
		answertextParentDiv.setAttribute('class','cp-rewrap');
		answertextParentDiv.id = actualID + "canvasHolder";
		divData["answerTextCanvasHolder"] = answertextParentDiv.id;
		var answertextCanvas = document.createElement('canvas');		
		answertextCanvas.setAttribute('class','cp-shape');
		answertextCanvas.id = this.answerTextCanvasDivName;
		answertextParentDiv.appendChild(answertextCanvas);
		
		var actualElem = document.getElementById(answerTextCanvasDivData["dn"]);
		actualElem.drawingBoard = answertextParentDiv;
		updateVarText(actualElem);
		
		cp.model.data[this.answerTextCanvasDivName].dns = this.element.id;
		var answertextCanvasShape = new cp.Shape(answertextCanvas, cp.model.data[this.answerTextCanvasDivName]);
		answertextCanvasShape.start();
		
		var lActualIDDivData = cp.model.data[actualID];
		var lCanvasName = lActualIDDivData.mdi;
		
		answertextCanvas.parentElement.style.left = parseFloat(answertextCanvas.parentElement.style.left) + (cp.model.data[lCanvasName].b[0] - this.answerTextCanvasImageBounds.minX) + 'px';
		answertextCanvas.parentElement.style.top = parseFloat(answertextCanvas.parentElement.style.top) + (cp.model.data[lCanvasName].b[1] - this.answerTextCanvasImageBounds.minY) + 'px';
		
		
		var answerLabelCanvasParentElement = answerLabelCanvasElement.parentElement;
		parentSlideElement.removeChild(answerLabelCanvasParentElement);
		cp.addRewrapObjectAsPerRestOfProjectItem(answerLabelCanvasParentElement);
		
		var radioCanvasElement = document.createElement('canvas');
		var lRadioButtonLeft = this.bounds.minX;
		var lRadioButtonTop = ((this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY) - 22)/2;
		var styleLeft 	= (0 < (this.vbounds.minX)) && lHasShadowOrReflection ? 0 : (this.vbounds.minX);
		var styleTop	= (0 < (this.vbounds.minY)) && lHasShadowOrReflection ? 0 : (this.vbounds.minY);
		var styleRight 	= (cp.model.data.project.w > this.vbounds.maxX) && lHasShadowOrReflection ? cp.model.data.project.w : this.vbounds.maxX + 4;
		var styleBottom	= (cp.model.data.project.h > this.vbounds.maxY) && lHasShadowOrReflection ? cp.model.data.project.h : this.vbounds.maxY + 4;
		var styleWidth	= styleRight - styleLeft;
		var styleHeight	= styleBottom - styleTop;
		canvas = this.canvas = cp.createCanvas(0, 0,  styleWidth, styleHeight,radioCanvasElement);
		var gc 	= canvas.gc;
		radioCanvasElement.style.display = "block";
		radioCanvasElement.style.position = "absolute";
		var newPa = document.createElement('div');
		cp.addRewrapObjectAsPerRestOfProjectItem(newPa);
		newPa.appendChild(radioCanvasElement);
		newPa.style.display = "block";
		newPa.style.position = "absolute";
		newPa.style.left = this.vbounds.minX + "px";
		newPa.style.top = (this.lAnswerLabelBounds.minY + ((this.lAnswerLabelBounds.maxY - this.lAnswerLabelBounds.minY - 22)/2)) + "px";
		newPa.style.width = "22px";
		newPa.style.height = "22px";
		if(lHasShadowOrReflection)
		{
			radioCanvasElement.style.marginLeft = (-this.vbounds.minX ) + "px";
			radioCanvasElement.style.marginTop = (- this.lAnswerLabelBounds.minY) + "px";		
		}
		else
		{
			radioCanvasElement.style.marginLeft = "-2px";
			radioCanvasElement.style.marginTop = "-2px";		
		}
		gc.width = styleWidth;
		gc.height = styleHeight;
		gc.left = styleLeft;
		gc.top = styleTop;
		if(this.sh && !this.sh.i)
		{
			gc.shadowOffsetX = this.sh.d*Math.cos((Math.PI*this.sh.a)/180);
			gc.shadowOffsetY = this.sh.d*Math.sin((Math.PI*this.sh.a)/180);
			gc.shadowBlur = this.sh.b;
			gc.shadowColor = ConvertRGBToRGBA(this.sh.c,this.sh.o );				
		}
						
		var self = this;
		
		radioElement.loadAndDrawImage = function(src)
		{
			if(self.loadedBtnImages == null)
			{
				self.loadedBtnImages = new Object();
			}
			radioCanvasElement.img = src;
			
			if(self.loadedBtnImages[src]==null)
			{
				var btnImage = new Image();
				btnImage.onload = function(e)
				{
					//gc.rotate((Math.PI*0.02)/180);
					self.loadedBtnImages[src] = btnImage;
					gc.clearRect(gc.left,gc.top,gc.width, gc.height);
					if(lHasShadowOrReflection)
						gc.drawImage(self.loadedBtnImages[src],(self.bounds.minX - 2),(self.bounds.minY  - 2));
					else
						gc.drawImage(self.loadedBtnImages[src],0,0);
				};
				self.loadedBtnImages[src] = btnImage;
				btnImage.src = src;
			}
			else
			{
				gc.clearRect(gc.left,gc.top,gc.width, gc.height);
				if(lHasShadowOrReflection)
					gc.drawImage(self.loadedBtnImages[src],(self.bounds.minX - 2),(self.bounds.minY  - 2));
				else
					gc.drawImage(self.loadedBtnImages[src],0,0);
			}
		};	
		
		this.element.style.left = (this.bounds.minX) + "px";
		this.element.style.top = (this.bounds.minY - 2) + "px";
		this.element.style.width = (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 50) + "px";
		this.element.style.height = (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6) + "px";
		this.element.style.position = "absolute";
		
		this.element.style.backgroundColor = "#ff0000";
		this.element.style.opacity = 0;
				
		var highlightElement = document.getElementById(id + "_highlight");				
		if(cp.DESKTOP == cp.device)
		{
			var dummyhighlightElement = document.getElementById(id + "_dummyhighlight");
			highlightElement.onmouseover = function(e)
										{
											if(!lShouldDisable)											
											{
												dummyhighlightElement.style.backgroundColor = "#000000";
												dummyhighlightElement.style.opacity = "0.3";
												if(self.sh)
												{
													var mAngle = self.sh.a;
													applyShadow(dummyhighlightElement, self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
												}
											}
										}	
			highlightElement.onmouseout = function(e)
										{
											if(!lShouldDisable)
											{
												dummyhighlightElement.style.backgroundColor = "transparent";
												applyShadow(dummyhighlightElement,'');
											}
												
										}	
		}
		
		this.element.onclick = radioElement.onclick = function(e)
								{
									if(radioElement.disabled)
										return;
									var allradios = document.getElementsByName(self.group);
									for(var i = 0; i < allradios.length; ++i)
									{
										var currRadioElem = allradios[i];
										if(radioElement == currRadioElem)
											currRadioElem.checked = true;
										else
											currRadioElem.checked = false;
										if(currRadioElem.checked)
											currRadioElem.loadAndDrawImage(lQuestionObj.getImageForState(self.type,'selected'));
										else
											currRadioElem.loadAndDrawImage(lQuestionObj.getImageForState(self.type,'default'));
									}		
								};
		
		if(this.checked == "checked")
			radioElement.loadAndDrawImage(lQuestionObj.getImageForState(this.type,'selected'));
		else
			radioElement.loadAndDrawImage(lQuestionObj.getImageForState(this.type,'default'));
		
		radioElement.disableOption = function()
		{
			if(self.value == 'disabled')
				return;
			lShouldDisable = true;
			self.element.style.cursor = "default";
			self.value = 'disabled';
			radioElement.disabled = 'disabled';
			
			radioElement.style.cursor = 'default';
			radioElement.parentNode.style.cursor = 'default';
			radioElement.parentNode.parentNode.style.cursor = 'default';	
			
			highlightElement.tabIndex = -1;				
			if(radioElement.checked)
				radioElement.loadAndDrawImage(lQuestionObj.getImageForState(this.type,'selectedDisabled'));
			else
				radioElement.loadAndDrawImage(lQuestionObj.getImageForState(this.type,'disabled'));
			if(lQuestionObj.getWasJudged() &&  lQuestionObj.canShowReviewIcons())
			{						
				if(self.isCorrect)
				{							
					var newImg = document.createElement('img');
					newImg.src = './assets/htmlimages/correct_answer_normal.png';
                    newImg.tabIndex = 0;
					newImg.style.position = "absolute";				
					newImg.style.left = self.bounds.minX - 20 + "px";
					newImg.style.top = self.bounds.minY + "px";
					self.element.parentNode.appendChild(newImg);
					if(self.sh)
					{
						var mAngle = self.sh.a;
						applyShadow(newImg ,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
					}
				}
				else
				{
					if((lQuestionObj.getWasJudged()) && (self.checked == "checked"))
					{								
						var newImg = document.createElement('img');
						newImg.src = './assets/htmlimages/incorrect_answer_normal.png';
                        newImg.tabIndex = 0;
						newImg.style.position = "absolute";				
						newImg.style.left = self.bounds.minX - 20 + "px";
						newImg.style.top = self.bounds.minY + "px";
						self.element.parentNode.appendChild(newImg);
						if(self.sh)
						{
							var mAngle = self.sh.a;
							applyShadow(newImg ,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
						}
					}							
				}
			}
		};
		
		if(lShouldDisable)
		{
			radioElement.disableOption();
		}
		
		this.isDrawn = true;
		
		if(!this.visible)
			this.element.style.visibility = 'hidden';
	}
	
	cp.SequenceInput = function(el, args)
	{
		cp.SequenceInput.baseConstructor.call(this, el);
			
		this.type = this.getAttribute("type");
		this.visible = parseFloat(this.getAttribute("visible"));
		this.answerID = this.getAttribute("aid");
		this.relatedQuestionSlide = this.getAttribute("rqs");
		
		this.canvasDivName = this.getAttribute("cn");
		var bounds = this.getAttribute("b");
		this.bounds = {
				minX: bounds[0],
				minY: bounds[1],			
				maxX: bounds[2],
				maxY: bounds[3]
			};
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
				minX: vbounds[0],
				minY: vbounds[1],			
				maxX: vbounds[2],
				maxY: vbounds[3]
			};
        this.answerHolderLeft = this.getAttribute("ahl");
        this.answerHolderTop = this.getAttribute("aht");
        this.sh = 	this.getAttribute("sh");
		this.args = args;		
		this.isDrawn = false;			    
	}
	
	cp.inherits(cp.SequenceInput, cp.DisplayObject);
	
	cp.SequenceInput.prototype.start = function()
	{
		this.addIfNeeded();
	},
	
	cp.SequenceInput.prototype.reset = function(endOfSlide)
	{
		// release memory
		delete ropMap[this.element.id];
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	},
	
	cp.SequenceInput.prototype.addIfNeeded = function()
	{
		var lQuestionObj = getQuestionObject(this.relatedQuestionSlide);
		if(!lQuestionObj)
			return;
			
		if (this.isDrawn || !lQuestionObj.getIsStarted())
			return;
	
		var id = this.element.id;
		var bounds = this.bounds;
		var type = this.type;
		
		var fieldWidth = - bounds.minX + bounds.maxX;
		var fieldHeight = - bounds.minY + bounds.maxY;
		if(this.args)
		{
			fieldWidth += Number(this.args[1])+Number(this.args[2]);
			fieldHeight += Number(this.args[1])+Number(this.args[3]);
		}
		var ctr = 0
		
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(!lQuizController)
			return;
		var isInReviewMode = lQuizController.GetIsInReviewMode();
		
				
		var lShouldDisable = lQuestionObj.shouldDisableOptions();
		var answerLabelCanvasElement = document.getElementById(this.canvasDivName);
		
		var parentSlideElement = cp.movie.stage.getSlideDiv().firstChild;
		
		this.shouldShowComboBox = lQuestionObj.showAsCombo();
		this.group = lQuestionObj.getAnswerGroupName();		
						
		var divData = cp.model.data[id];
		
		this.isCorrect = false;
		this.isSkipped = false;
		var lReviewIconPositionLeft;
		var lReviewIconPositionTop;
		
		var lCursorStyle = lShouldDisable ? 'default' : 'pointer';
		
		if(!this.shouldShowComboBox)
		{		
			this.answerTextCanvasDivName = lQuestionObj.getAnswerOption(this.answerID,id);
			var answerTextCanvasDivData = cp.model.data[this.answerTextCanvasDivName];
			
			divData['answerTextDivName'] = this.answerTextCanvasDivName;//adding this property dynamically in model data
			
			var answerTextCanvasImageSrc = answerTextCanvasDivData['ip'];
			var answerTextCanvasImageBounds = answerTextCanvasDivData['b'];
			if (answerTextCanvasImageBounds.length == 4)
			{
				for(var i=0; i<4; i++)
					answerTextCanvasImageBounds[i] = parseFloat(answerTextCanvasImageBounds[i]);
			}
			else 
			{
				answerTextCanvasImageBounds = [0, 0, 0, 0];
			}
				
			this.answerTextCanvasImageBounds = {
					minX: answerTextCanvasImageBounds[0],
					minY: answerTextCanvasImageBounds[1],			
					maxX: answerTextCanvasImageBounds[2],
					maxY: answerTextCanvasImageBounds[3]
				};			
			
			this.element.style.cursor = lCursorStyle;
			this.element.style.borderRadius = "5px"; 
			this.element.style.left = "-20px"; 
			this.element.style.top = "-2px";
			this.element.style.width = (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 40) + "px"; 
			this.element.style.height = (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6) + "px";
			this.element.style.position = 'absolute';
			this.element.style.background = "#000000";
			this.element.style.opacity = 0;
			
			var dummyHighlight = document.createElement('div');
			cp.addRewrapObjectAsPerRestOfProjectItem(dummyHighlight);
			dummyHighlight.id = id + '_dummyhighlight';
			dummyHighlight.style.cursor = lCursorStyle;
			dummyHighlight.style.borderRadius = "5px";
			dummyHighlight.style.left = (this.bounds.minX - 30) + "px";
			dummyHighlight.style.top = (this.bounds.minY - 3) + "px";
			dummyHighlight.style.width = (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX + 40) + "px";
			dummyHighlight.style.height = (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 6) + "px"; 
			dummyHighlight.style.position = "absolute";
			
			var actualID = divData.actid;//actualID.replace('seq','');
			var answertextParentDiv = document.createElement('div');			
			cp.addRewrapObjectAsPerRestOfProjectItem(answertextParentDiv);
			answertextParentDiv.id = id + "canvasHolder";
			divData["answerTextCanvasHolder"] = answertextParentDiv.id;
			answertextParentDiv.setAttribute('class','cp-rewrap');
			var sequenceCanvasElement = document.createElement('canvas');
			canvas = this.canvas = cp.createCanvas(0, 0,  cp.model.data.project.w, cp.model.data.project.h,sequenceCanvasElement);
			var gc 	= canvas.gc;
			sequenceCanvasElement.setAttribute('class','cp-shape');			
			sequenceCanvasElement.setAttribute('name',this.group);
			//sequenceCanvasElement.setAttribute('draggable','true');
			sequenceCanvasElement.id = this.answerTextCanvasDivName;
			answertextParentDiv.appendChild(sequenceCanvasElement);
			var answertextCanvasShape = new cp.Shape(sequenceCanvasElement, cp.model.data[this.answerTextCanvasDivName]);
			answertextCanvasShape.start();					
			
			var lActualIDDivData = cp.model.data[actualID];
			var lCanvasName = lActualIDDivData.mdi;
			
			var lLeftPosition = parseFloat(sequenceCanvasElement.parentElement.style.left) + (cp.model.data[lCanvasName].b[0] - this.answerTextCanvasImageBounds.minX);
			var lTopPosition = parseFloat(sequenceCanvasElement.parentElement.style.top) + (cp.model.data[lCanvasName].b[1] - this.answerTextCanvasImageBounds.minY);
						
			sequenceCanvasElement.parentElement.style.left = lLeftPosition + 'px';
			sequenceCanvasElement.parentElement.style.top = lTopPosition + 'px';
						
			var answerLabelCanvasParentElement = answerLabelCanvasElement.parentElement;
			parentSlideElement.removeChild(answerLabelCanvasParentElement);
			cp.addRewrapObjectAsPerRestOfProjectItem(answerLabelCanvasParentElement);
			
			var self = this;
			
			if(cp.DESKTOP == cp.device)
			{
				var dummyhighlightElement = document.getElementById(id + "_dummyhighlight");
				this.element.onmouseover = function(e)
											{
												if(!lShouldDisable)
												{
													dummyhighlightElement.style.backgroundColor = "#000000";
													dummyhighlightElement.style.opacity = "0.3";
													if(self.sh)
													{
														var mAngle = self.sh.a;
														applyShadow(dummyhighlightElement,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
													}
												}
											}	
				this.element.onmouseout = function(e)
											{
												if(!lShouldDisable)
												{
													dummyhighlightElement.style.backgroundColor = "transparent";
													applyShadow(dummyhighlightElement,'');
												}
													
											}	
			}
			
			//this.element.setAttribute("draggable",true);

			this.element.disableOption = function()
			{
				lShouldDisable = true;				
				self.element.tabIndex = -1;
			}
			
			if(!lShouldDisable)
				lQuestionObj.addDragEvents(id);
				
			lReviewIconPositionLeft = "-40px";
			lReviewIconPositionTop = "0px";
		}
		
		else
		{
			this.element.style.position = 'absolute';
			this.element.style.left = bounds.minX + "px";
			this.element.style.top = bounds.minY + "px";
			this.element.style.width = (bounds.maxX - bounds.minX) + "px";
			this.element.style.height = (bounds.maxY - bounds.minY) + "px";
		
			var selectedIndex = lQuestionObj.getSelectedIndex(this.answerID);
			this.answerTextCanvasDivNames = lQuestionObj.answerOptions.slice(0);								
			var firstAnswerTextCanvasDivData = cp.model.data[this.answerTextCanvasDivNames[0]];
			var answerTextCanvasImageBounds = (firstAnswerTextCanvasDivData['b']);
			if (answerTextCanvasImageBounds.length == 4)
			{
				for(var i=0; i<4; i++)
					answerTextCanvasImageBounds[i] = parseFloat(answerTextCanvasImageBounds[i]);
			}
			else 
			{
				answerTextCanvasImageBounds = [0, 0, 0, 0];
			}
				
			this.answerTextCanvasImageBounds = {
					minX: answerTextCanvasImageBounds[0],
					minY: answerTextCanvasImageBounds[1],			
					maxX: answerTextCanvasImageBounds[2],
					maxY: answerTextCanvasImageBounds[3]
				};					
						
			var lDefaultTitleImagePath = lQuestionObj.defaultTitleImage;
			
			if(this.element.innerHTML == "")
			{						
				var innerHTMLStr = "";
				innerHTMLStr += "<select class='mydds' id='" + id + "_sequenceInput' name='" + this.group + "'>";
				for(var z = 0; z < this.answerTextCanvasDivNames.length; ++z)
				{
					var answerTextCanvasDivData = cp.model.data[this.answerTextCanvasDivNames[z]];
					var answerTextCanvasImageSrc = answerTextCanvasDivData['ip'];
												
					innerHTMLStr += "<option value='" + this.answerTextCanvasDivNames[z] + "' style='position:absolute;width:" + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX) + "px' title='" + answerTextCanvasImageSrc + "'>"
					
					if(cp.DESKTOP != cp.device)
					{
						innerHTMLStr += answerTextCanvasDivData['atxt'];						
					}
					
					innerHTMLStr += "</option>";
				}
				innerHTMLStr += "</select> ";		
									
				document.getElementById(this.element.id).innerHTML = innerHTMLStr;
				var selectElement = document.getElementById(id + "_sequenceInput");
				
				selectElement.style.width = (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX) + "px";
				selectElement.style.height = (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY) + "px";
				selectElement.style.position = 'absolute';

				var actualID = divData.actid;//actualID.replace('seq','');
				var answertextParentDiv = document.createElement('div');			
				cp.addRewrapObjectAsPerRestOfProjectItem(answertextParentDiv);
				answertextParentDiv.id = id + "canvasHolder";
				divData["answerTextCanvasHolder"] = answertextParentDiv.id;
				answertextParentDiv.setAttribute('class','cp-rewrap');
				var oHandler;
				if(cp.DESKTOP != cp.device)
				{							
					//selectElement.style.zIndex = 10;
					selectElement.style.opacity = 0;
					var self = this;
					selectElement.onchange = function(e)
											{
												selectElement.setNewIndex(selectElement.selectedIndex);												
											};
					
					var lTouchedCtr = 0;
					var lOpenSelectElement = function(e)
											{
												if(selectElement.selectedIndex == -1)
												{
													self.answerTextCanvasDivName = self.answerTextCanvasDivNames[0];
													var lSelectedImageData = cp.model.data[self.answerTextCanvasDivName];
													lTitleImageSrc = lSelectedImageData['ip'];
													selectElement.selectedIndex = 0;
													selectElement.value = lSelectedImageData[0];													
													selectElement.setNewIndex(0);
												}
											};
					
					selectElement.ontouchstart = lOpenSelectElement;
					if(cp.verbose)
						cp.log("Index : " + selectedIndex);
					
					var spaninnerStr = "<img id='" + id + "_spanImage' src='" + lDefaultTitleImagePath + "' style='position:absolute;left:5px; height:" + (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY) + "px; title='" + lDefaultTitleImagePath + "'/>";
					spaninnerStr += "<img id='" + id + "_spanImageArrow' class='spanArrow' style='position:absolute;left:" + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX - 20) + "px;top:3px'/>";
					
					var spanChild = document.createElement('span');
					spanChild.id='spanComboBoxTitleImage';
					spanChild.className = 'spanComboBox';
					//spanChild.className += 'shadow';					

					spanChild.innerHTML = spaninnerStr;
					spanChild.style.width = (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX) + "px";
					spanChild.style.height = (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY + 3) + "px";
					
					answertextParentDiv.appendChild(spanChild);	
					
					var lTitleImageSrc;
					var lTitleSpanElem = document.getElementById(id + "_spanImage");					
					selectElement.setNewIndex = function(iIndex)
					{						
						if(iIndex != -1)
						{
							self.answerTextCanvasDivName = self.answerTextCanvasDivNames[iIndex];
							var lSelectedImageData = cp.model.data[self.answerTextCanvasDivName];
							lTitleImageSrc = lSelectedImageData['ip'];
							selectElement.selectedIndex = iIndex;
						}
						else
						{
							if(cp.verbose)
							{
								cp.log("Inside setNewIndex : " + iIndex);
								cp.log("Setting image path as : " + lDefaultTitleImagePath);
							}
							self.answerTextCanvasDivName = "";
							lTitleImageSrc = lDefaultTitleImagePath;						
							selectElement.selectedIndex = -1;
							selectElement.value = "";
							selectElement.text = "";
						}
						//iPad 3 was not able to render the image immediately with the correct size of image
						//Putting a hack - trying to force render the image on a timer basis
						//impact - there will be a visible time gap when image is changed
						lTitleSpanElem.style.display = "none";
						lTitleSpanElem.src = lTitleImageSrc;
						lTitleSpanElem.onload = setTimeout(function(e)
															{						
																lTitleSpanElem.style.display = "block";
															},100);
					}					
					
					selectElement.setNewIndex(selectedIndex);										
					
					answertextParentDiv.style.position = 'absolute';
					answertextParentDiv.style.left = bounds.minX + "px";
					answertextParentDiv.style.top = bounds.minY + "px";
					answertextParentDiv.style.width = (bounds.maxX - bounds.minX) + "px";
					answertextParentDiv.style.height = (bounds.maxY - bounds.minY) + "px";
					
					if(this.sh)
					{
						var mAngle = this.sh.a;
						applyShadow(this.element,this.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + (this.sh.i ? ' inset' : ''));				
					}
				}
				else
				{
					this.element.removeChild(selectElement);
					answertextParentDiv.appendChild(selectElement);
										
					var lLeftPosition = parseFloat(selectElement.parentElement.style.left) + (this.answerTextCanvasImageBounds.minX);
					var lTopPosition = parseFloat(selectElement.parentElement.style.top) + (this.answerTextCanvasImageBounds.minY);
					
					selectElement.parentElement.style.position = 'absolute';
					selectElement.parentElement.style.left = bounds.minX + "px";
					selectElement.parentElement.style.top = bounds.minY + "px";
					selectElement.parentElement.style.width = (bounds.maxX - bounds.minX) + "px";
					selectElement.parentElement.style.height = (bounds.maxY - bounds.minY) + "px";					
					
					var lSelectElement = jQuery("#" + id + "_sequenceInput");
					lSelectElement.css("width",(this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX));
					oHandler = jQuery("#" + id + "_sequenceInput").msDropDown({style:"position:fixed, left:" + (bounds.minX + 20) + "px, top:" + (this.bounds.minY) + "px, height:" + (this.answerTextCanvasImageBounds.maxY - this.answerTextCanvasImageBounds.minY) + "px, width:" + (this.answerTextCanvasImageBounds.maxX - this.answerTextCanvasImageBounds.minX) + "px,"},lDefaultTitleImagePath).data("dd");	
					
					divData["oHandler"] = oHandler;
					
					if(selectedIndex == -1)
						this.isSkipped = true;
										
					//oHandler.setDefaultTitleImagePath(lDefaultTitleImagePath);
					oHandler.selectedIndex(selectedIndex);					
					
					if(this.sh)
					{	
						var mAngle = this.sh.a;
						applyShadow(this.element,this.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + (this.sh.i ? ' inset' : ''));
					}
					
					this.element.onclick = function(e)
											{											
												oHandler.open();//THIS IS TO BE LOOKED ONCE AGAIN
											};
				}
								
				if(lShouldDisable)
				{
					this.element.style.cursor = "default";
					if(cp.DESKTOP != cp.device)
					{
						selectElement.disabled = 'disabled';
					}
					else
					{
						oHandler.disabled(true);
					}	
				}	
			}	
			
			var lSelectElement = document.getElementById(id + "_sequenceInput");
			this.answerTextCanvasDivName = lSelectElement.value;
			
			lReviewIconPositionLeft = (parseFloat(this.element.style.left) - 40) + "px";
			lReviewIconPositionTop = parseFloat(this.element.style.top) + "px";
		}
		
		this.isCorrect = lQuestionObj.getIsOptionCorrect(this.answerTextCanvasDivName);
				
		if(lShouldDisable)
		{
			this.element.style.cursor = "default";
			this.element.tabIndex = -1;
			if(lQuestionObj.getWasJudged() &&  lQuestionObj.canShowReviewIcons())
			{				
				var self = this;
				if(lQuestionObj.getAnsweredCorrectly())
				{
					var newImg = document.createElement('img');
					newImg.id = id + "_reviewCorrect";
					newImg.src = './assets/htmlimages/correct_answer_normal.png';
                    newImg.tabIndex = 0;
					newImg.style.position = "absolute";				
					newImg.style.left = lReviewIconPositionLeft;
					newImg.style.top = lReviewIconPositionTop;					
					this.element.parentNode.appendChild(newImg);
					if(self.sh)
					{
						var mAngle = self.sh.a;
						applyShadow(newImg,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : '') + (self.sh.i ? ' inset' : ''));
					}
				}
				else
				{
					var imgSrc;
					if(this.isCorrect)
						imgSrc = './assets/htmlimages/correct_answer_normal.png';
					else if(this.isSkipped)
						imgSrc = './assets/htmlimages/skip_answer_normal.png';
					else
						imgSrc = './assets/htmlimages/incorrect_answer_normal.png';
					var newImg = document.createElement('img');
					newImg.id = id + "_reviewIncorrect";
					newImg.src = imgSrc;
                    newImg.tabIndex = 0;
					newImg.style.position = "absolute";				
					newImg.style.left = lReviewIconPositionLeft;
					newImg.style.top = lReviewIconPositionTop;
					this.element.parentNode.appendChild(newImg);
					if(self.sh)
					{
						var mAngle = self.sh.a;
						applyShadow(newImg,self.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + self.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + self.sh.b + 'px '+ ConvertRGBToRGBA(self.sh.c,self.sh.o ) + (self.sh.i ? ' inset' : ''));
					}
				}
			}	
		}	
		
		this.isDrawn = true;								
		
		if(!this.visible)
			this.element.style.visibility = 'hidden';
	}
	
	// TextInput CLASS for Text Input
	cp.TextInput = function(el, args)
	{
		cp.TextInput.baseConstructor.call(this, el);
		var self = this;
		
		function submitTEBValue()
		{
			var expectedDivData = self.tebData;
			var scObj = expectedDivData[ 'sc' ];

			var sc = new cp.Shortcut( scObj.k, 1 == scObj.c, 1 == scObj.s, 1 == scObj.a );
			var eventSc = cp.getShortCutFromKeyEvent( event );

			if ( sc.isSame( eventSc ) ) {
				self.tebcData.keyHandledOnce = true;
				if ( event.currentTarget && event.currentTarget.parentElement )
					vTEB( event.currentTarget.parentElement.id );
				else if ( event.srcElement && event.srcElement.parentElement && event.srcElement.parentElement.parentElement ) // IE
					vTEB( event.srcElement.parentElement.parentElement.id );
				//cp.preventEventDefault( event );
			}

			setTimeout( (function() {
				if ( self.inputField ) {
					// Update the variable.
					if ( expectedDivData.vn.length > 0 ) {
						var var_arr = new Array;
						var_arr.push( expectedDivData.vn );
						setVariableValueImpl( expectedDivData.vn, self.inputField.value, var_arr );
					}
					if ( self.retainText )
						self.tebcData.txt = self.inputField.value;
				}
			}), 200 );			
		}

		this.id = this.getAttribute("id"); 
		this.type = 'text';
		var ft = this.getAttribute("ft");
		if ( ft == 'pw' )
			this.type = 'password';
		this.expectedStrings = this.getAttribute("exp") || [];
		this.defaultText = this.getAttribute("txt");
        this.accstring = this.getAttribute("accstr");
		this.visible = this.getAttribute("visible");
		this.parentDivName = this.getAttribute("dn");
		this.transIn = 	cp.model.data[this.parentDivName]['trin'];
		this.element.parentElement.drawingBoard = this.element.parentElement;
		var bounds = this.getAttribute("b");
		this.bounds = {
				minX: bounds[0],
				minY: bounds[1],			
				maxX: bounds[2],
				maxY: bounds[3]
			};
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
				minX: vbounds[0],
				minY: vbounds[1],			
				maxX: vbounds[2],
				maxY: vbounds[3]
			};
		this.element.parentElement.bounds = this.vbounds;
		
		this.args = args;		
		this.isDrawn = false;
		this.inputField = null;
		
		this.showScroll = this.getAttribute( 'ss' );
		this.fillColor	= this.getAttribute( 'fc' );
		this.fillAlpha = this.getAttribute( 'fa' );
		if ( undefined == this.fillAlpha )
			this.fillAlpha = 1.0;
		this.font = this.getAttribute( 'font' );
		this.showBorder = this.getAttribute( 'sb' );
		this.retainText = this.getAttribute( 'rtx' );
		this.focusLostAction = '';
		if ( cp.model.data[this.id].ofla )
			this.focusLostAction = cp.model.data[this.id].ofla;
			
		this.tebcData = cp.model.data[ this.element.id ];
		this.tebData = cp.model.data[ this.tebcData.id ];
		this.element.onkeyup = submitTEBValue;
		
		this.tr = this.getAttribute("tr");
		this.sh = this.getAttribute("sh");
		this.re = this.getAttribute("re");
	}
	
	cp.inherits(cp.TextInput, cp.DisplayObject);

	cp.TextInput.prototype.start = function()
	{
		this.addIfNeeded();
	}
	
	cp.TextInput.prototype.reset = function(endOfSlide)
	{
		delete ropMap[this.element.id];
		if ( this.retainText )
			this.setAttribute( 'txt', this.inputField.value );
		this.setAttribute( 'keyHandledOnce', false );
		// release memory
		if ( this.inputField ) {
			this.inputField.onblur = null;
			this.inputField.onchange = null;
		}
		this.inputField = null;
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.TextInput.prototype.addIfNeeded = function()
	{
		if (this.isDrawn)
			return;    		
		
		var id = this.id;
		var bounds = this.bounds;
		var type = this.type;
		var tag = 'input';
		var otherStyleStr = "";
		
		if ( this.showScroll )
			tag = 'textarea';
		var fieldWidth = - bounds.minX + bounds.maxX;
		var fieldHeight = - bounds.minY + bounds.maxY;
		if(this.args)
		{
			fieldWidth += Number(this.args[1])+Number(this.args[2]);
			fieldHeight += Number(this.args[1])+Number(this.args[3]);
		}
		var rotateAngle = 0;
		if(this.tr)
			rotateAngle = getAngleFromRotateStr(this.tr);
		var Pa = this.element.parentElement;

		var paTop = this.vbounds.minY;
		var paHeight = this.vbounds.maxY - this.vbounds.minY;
		if ( cp.MSIE == cp.browser && ! this.showBorder ) {
			paTop -= 1;
			paHeight += 1;
		}
		
		Pa.style.left = this.vbounds.minX + "px";
		Pa.style.top = paTop + "px";
		Pa.style.width = this.vbounds.maxX - this.vbounds.minX + "px";
		Pa.style.height = paHeight + "px";
		
		this.element.rotateAngle = rotateAngle;
		this.element.style.left = (bounds.minX - this.vbounds.minX) + "px";
		this.element.style.top = (bounds.minY - this.vbounds.minY) + "px";
		this.element.style.width = bounds.maxX - bounds.minX + "px";
		this.element.style.height = bounds.maxY - bounds.minY + 3 +  "px";
		if(this.tr)
		{
			applyTransform(this.element,this.tr);
			this.element.tr=this.tr;
		}
		if(this.sh && !this.sh.i)
		{
			var mAngle = this.sh.a - rotateAngle;
			applyShadow(this.element ,this.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + (this.sh.i ? ' inset' : ''));
		}
		if(this.re)
			this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";					
		if(this.element.innerHTML == "")
		{
			if ( this.font ) {
				otherStyleStr += ' -webkit-appearance:none;';
				otherStyleStr += ' font-family:"' + this.font.n + '";';
				otherStyleStr += 'font-size:' + this.font.s + 'px;';
				otherStyleStr += 'color: ' + this.font.c + ';';
				if ( this.font.B )
					otherStyleStr += 'font-weight:bold;';
				if ( this.font.u )
					otherStyleStr += 'text-decoration: underline;';
				if ( this.font.i )
					otherStyleStr += 'font-style: italic;';
				if ( this.showScroll )
					otherStyleStr += 'resize: none;';
				if ( undefined != this.showBorder && ! this.showBorder )
					otherStyleStr += 'border:0px;';
				else 
					otherStyleStr += 'border:1px solid;border-top-color:#696969;border-left-color:#696969;border-right-color:#E6E6E6;border-bottom-color:#E6E6E6;';
				otherStyleStr += 'border-radius:0px;padding:0px;';
				// Now handle the fill color.
				if ( undefined != this.fillColor && 7 == this.fillColor.length && '#' == this.fillColor[ 0 ] ) {
					var r = parseInt( this.fillColor.substr( 1, 2 ), 16 );
					var g = parseInt( this.fillColor.substr( 3, 2 ), 16 );
					var b = parseInt( this.fillColor.substr( 5, 2 ), 16 );
					otherStyleStr += 'background-color: rgba(' + r + ', ' + g + ', ' + b + ', ' + this.fillAlpha + ');';
				}
			}
			var topPos = bounds.minY;
			var inputHeight = (bounds.maxY - bounds.minY);
			if ( cp.MSIE == cp.browser ) {
				topPos -= 1;
				inputHeight += 1;
			}
			this.element.innerHTML += "<" + tag + " type='" + type + "'" + (this.enabled == 0? " disabled ": "")+ " aria-label='" + this.accstring + "' id='" + id + "_inputField' style='left: " 
				+ bounds.minX + "px; top: " + topPos + "px; width:" + (bounds.maxX - bounds.minX) + "px; height:" + inputHeight + "px;" 
				+ otherStyleStr + "'></" + tag + ">";	
				
			if ( this.tebData.vn.length > 0 ) {
				var var_arr = new Array;
				var_arr.push( this.tebData.vn );
				setVariableValueImpl( this.tebData.vn, this.defaultText, var_arr );
			}
				
		}
		this.inputField = document.getElementById(id + "_inputField");
		if ( this.inputField ) {
			cp.removeAccessibilityOutline(this.inputField);
			this.inputField.value = this.defaultText;
			var textLen = this.inputField.value.length;
			this.inputField.focus();
			if ( this.inputField.setSelectionRange ) 
				this.inputField.setSelectionRange( textLen, textLen );
		}
		
		this.isDrawn = true;
		
		function getOnChange( inputField )
		{
			var input = inputField;
			return function () {
				input.cp_has_changed = true;
			}
		}
		
		function getOnFocusLost( action, inputField, tebObj )
		{
			var act = action;
			var input = inputField;
			var obj = tebObj;
			
			return function() {
				if ( obj && obj.handled )
					return;
				if ( input.cp_has_changed ) {
					input.cp_has_changed = false;
					cp.movie.executeAction( act ); 
				}
			}
		}
		
		if ( this.focusLostAction.length > 0 ) {
			this.inputField.onchange = getOnChange( this.inputField );
			this.inputField.onblur = getOnFocusLost( this.focusLostAction, this.inputField, this.tebData );
		}
		if(this.transIn)
			this.element.parentElement.style.opacity = 0;
		if(!this.visible)
			cp.hide( this.parentDivName );
	}

	cp.Gradient = function(el, parentId, args)
	{
		cp.Gradient.baseConstructor.call(this, el);
			
		this.visible = 1;
		this.parentId = parentId;
		this.parentObj = cp.model.data[parentId];
		
		if (this.parentObj) {
			this.gradientData = this.parentObj.gf;		
			var bounds = this.gradientData.b;
			this.bounds = {
					minX: bounds[0],
					minY: bounds[1],			
					maxX: bounds[2],
					maxY: bounds[3]
				};
			this.args = args;	
		}		
		this.isDrawn = false;		    
	}
	
	cp.inherits(cp.Gradient, cp.DisplayObject);
	
	cp.Gradient.prototype.start = function()
	{
		this.drawIfNeeded();
	}
	
	cp.Gradient.prototype.reset = function(endOfSlide)
	{
		delete ropMap[this.element.id];
		// release memory
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.Gradient.prototype.drawIfNeeded = function()
	{
		if (this.isDrawn)
			return;

		if (! this.gradientData)
			return;
			
		// Find the canvas elem.
		if (undefined == this.canvasElem) {
			var child = this.element.firstChild;
			for( ; child; child = child.nextSibling)
			{
				if (child.nodeType != Node.ELEMENT_NODE)
					continue;

				if (child.id && child.id == this.parentId + 'gf')
				{
					this.canvasElem = child;
					break;
				}
			}
		}

		if (! this.canvasElem)
			return;
			
		// Need to fix this bounds business. Need to 
		var bounds = this.bounds;
						
		var styleLeft = bounds.minX;
		var styleTop = bounds.minY;
		var styleWidth = bounds.maxX - bounds.minX;
		var styleHeight = bounds.maxY - bounds.minY;
				
		this.canvasElem.style.position = "absolute";
		
		var canvas = this.canvas = cp.createCanvas(styleLeft, styleTop, styleWidth, styleHeight, this.canvasElem);
		var gc = canvas.gc;
		
		gc.save();
		// Create the gradient.
		var grad = cp.getGradientFill(this.gradientData, gc);
		if (grad) {
			gc.fillStyle = grad;
			gc.fillRect( 0, 0, styleWidth, styleHeight );			
		}
		
		gc.restore();
				
		gc = null;
		canvas = null;
		this.isDrawn = true;
	}

	cp.ImageFill = function(el, parentId, args)
	{
		cp.ImageFill.baseConstructor.call(this, el);
			
		this.visible = 1;
		this.parentId = parentId;
		this.parentObj = cp.model.data[parentId];
		
		if (this.parentObj) {
			this.tileData = this.parentObj.imgf;		
			var bounds = this.tileData.b;
			this.bounds = {
					minX: bounds[0],
					minY: bounds[1],			
					maxX: bounds[2],
					maxY: bounds[3]
				};
			this.args = args;	
		}		
		this.isDrawn = false;		    
	}
	
	cp.inherits(cp.ImageFill, cp.DisplayObject);
	
	cp.ImageFill.prototype.start = function()
	{
		this.drawIfNeeded();
	}
	
	cp.ImageFill.prototype.reset = function(endOfSlide)
	{
		delete ropMap[this.element.id];
		// release memory
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.ImageFill.prototype.drawIfNeeded = function()
	{
		if (this.isDrawn)
			return;

		if (! this.tileData || ! this.tileData.img || ! this.tileData.img.ip)
			return;
			
		// Find the canvas elem.
		if (undefined == this.canvasElem) {
			var child = this.element.firstChild;
			for( ; child; child = child.nextSibling)
			{
				if (child.nodeType != Node.ELEMENT_NODE)
					continue;

				if (child.id && child.id == this.parentId + 'imgf')
				{
					this.canvasElem = child;
					break;
				}
			}
		}

		if (! this.canvasElem)
			return;
			
		// Need to fix this bounds business. Need to 
		var bounds = this.bounds;
						
		var styleLeft = bounds.minX;
		var styleTop = bounds.minY;
		var styleWidth = bounds.maxX - bounds.minX;
		var styleHeight = bounds.maxY - bounds.minY;
				
		this.canvasElem.style.position = "absolute";
		this.canvasElem.style.backgroundColor = '#FFFFFF';
		
		var imagePath = this.tileData.img.ip;
		var img = cp.movie.im.images[imagePath];
		if ( img && img.nativeImage.complete )
		{
			var canvas = this.canvas = cp.createCanvas(styleLeft, styleTop, styleWidth, styleHeight, this.canvasElem);
			var gc = canvas.gc;
			
			gc.save();
			var xTrans = this.tileData.img.x;
			var yTrans = this.tileData.img.y;
		
			gc.translate( xTrans, yTrans );
			var bStretch = this.tileData.s;
			var bTile = this.tileData.t;
			if ( bTile ) {
				var pat = gc.createPattern( img.nativeImage, "repeat" );
				gc.rect( 0, 0, styleWidth - xTrans, styleHeight - yTrans );
				gc.fillStyle = pat;
				gc.fill();	
			}
			else if ( bStretch ) 
				gc.drawImage( img.nativeImage, 0, 0, styleWidth - xTrans, styleHeight - yTrans );
			else 
				gc.drawImage( img.nativeImage, 0, 0 );		
			gc.restore();
					
			gc = null;
			canvas = null;
			this.isDrawn = true;
		}
	}
	
	cp.Line = function(el, args)
	{
		cp.Line.baseConstructor.call(this, el);
			
		this.visible = this.getAttribute("visible");
		this.data = cp.model.data[ this.element.id ];
		this.parentDivName = this.getAttribute("dn");
		var actualParent = document.getElementById(this.parentDivName);
		this.actualParent = actualParent;
		var bounds = this.data.b;
		this.bounds = {
				minX: bounds[0],
				minY: bounds[1],			
				maxX: bounds[2],
				maxY: bounds[3]
			};
		var vbounds = this.data.vb;
		this.vbounds = {
			minX: vbounds[0],
			minY: vbounds[1],			
			maxX: vbounds[2],
			maxY: vbounds[3],
			width: vbounds[2] - vbounds[0],
			height: vbounds[3] - vbounds[1],
		};
		if(actualParent)
		{
			actualParent.drawingBoard = this.element.parentElement;
			actualParent.bounds = this.bounds;
			actualParent.drawingBoard.bounds = this.vbounds;
		}
		this.args = args;	
		this.isDrawn = false;		    
		this.sh = this.getAttribute("sh");
		this.re = this.getAttribute("re");		    
	}
	
	cp.inherits(cp.Line, cp.DisplayObject);
	
	cp.Line.prototype.start = function()
	{
		this.drawIfNeeded();
	}
	
	cp.Line.prototype.reset = function(endOfSlide)
	{
		delete ropMap[this.element.id];
		// release memory
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.Line.prototype.drawIfNeeded = function()
	{
		if (this.isDrawn)
			return;

		if (! this.data)
			return;
			
		// Find the canvas elem.
		// Need to fix this bounds business. Need to 
		var bounds = this.bounds;
		var vbounds = this.vbounds;				
		var sWidth = this.data.sw;
		if ( sWidth < 5 )
			sWidth = 5; 
		
		var styleLeft = bounds.minX ;
		var styleTop = bounds.minY;
		var styleWidth = bounds.maxX - bounds.minX;
		var styleHeight = bounds.maxY - bounds.minY;
				
		var actualParent = this.actualParent;
		
		actualParent.style.left = styleLeft +  "px";
		actualParent.style.top = styleTop + "px";
		actualParent.style.width = styleWidth + "px";
		actualParent.style.height = styleHeight + "px";
		
		var x = 0;
		var y = 0;
		var width = bounds.maxX - bounds.minX;
		var height = bounds.maxY - bounds.minY;
		
		styleLeft 	= 0 < vbounds.minX ? 0 : vbounds.minX;
		styleTop	= 0 < vbounds.minY ? 0 : vbounds.minY;
		var styleRight 	= cp.model.data.project.w > vbounds.maxX ? cp.model.data.project.w : vbounds.maxX;
		var styleBottom	= cp.model.data.project.h > vbounds.maxY ? cp.model.data.project.h : vbounds.maxY;
		styleWidth	= styleRight - styleLeft;
		styleHeight	= styleBottom - styleTop;
		var canvas = this.canvas = cp.createCanvas(0, 0, styleWidth, styleHeight,this.element);
		
		this.element.style.display = "block";
		this.element.style.position = "absolute";
		this.element.parentElement.style.left = this.vbounds.minX + "px";
		this.element.parentElement.style.top = this.vbounds.minY + "px";
		this.element.parentElement.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
		this.element.parentElement.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		this.element.style.marginLeft = (styleLeft-this.vbounds.minX) + "px";
		this.element.style.marginTop = (styleTop-this.vbounds.minY) + "px";
		if(this.re)
			this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";
		cp.movie.stage.addToParentChildMap(actualParent.id,this.element.id);
		this.element.originalParent = actualParent;
		
		var gc = canvas.gc;
		
		gc.save();
		var transX = styleLeft < 0 ? -styleLeft : 0;
		var transY = styleTop < 0 ? -styleTop : 0;
		gc.translate(transX,transY);
		if(this.sh && !this.sh.i)
		{
			gc.shadowOffsetX = this.sh.d*Math.cos((Math.PI*this.sh.a)/180);
			gc.shadowOffsetY = this.sh.d*Math.sin((Math.PI*this.sh.a)/180);
			gc.shadowBlur = this.sh.b;
			gc.shadowColor = ConvertRGBToRGBA(this.sh.c,this.sh.o );
			//applyShadow(this.element , this.sh.d*Math.cos((Math.PI*this.sh.a)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*this.sh.a)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ));
		}
		var x1 = this.data.x1;
		var y1 = this.data.y1;
		var x2 = this.data.x2;
		var y2 = this.data.y2;
		
		gc.lineWidth = this.data.sw;
		gc.strokeStyle = this.data.sc;

		gc.moveTo( x1, y1 );
		if ( 0 == this.data.ss )
			gc.lineTo( x2, y2 );
		else  
			cp.drawDashedLine( gc, x1, y1, x2, y2, this.data.ss );
		gc.stroke();
			
		cp.drawLineCapStyle( gc, x1, y1, x2, y2, this.data.sc, sWidth, this.data.sst, 0 );
		cp.drawLineCapStyle( gc, x1, y1, x2, y2, this.data.sc, sWidth, this.data.est, 1 );
		
		gc.restore();
				
		gc = null;
		canvas = null;
		this.isDrawn = true;
		if(!this.visible)
			cp.hide( this.parentDivName );
	}

	cp.DrawingItem = function(el, canvasId, args)
	{
		cp.DrawingItem.baseConstructor.call(this, el);
		this.visible = 1;
		this.parentId = cp.model.data[canvasId].dn;
		this.parentObj = cp.model.data[this.parentId];
		this.canvasObj = null;
		this.transIn = 	this.parentObj['trin'];
		if ( undefined != this.parentObj )
			this.canvasObj = cp.model.data[ this.parentObj.mdi ];
		this.parentDivName = this.getAttribute("dn");
		var actualParent = document.getElementById(this.parentDivName);
		this.actualParent = actualParent;
		if ( this.canvasObj ) {
			this.type = this.canvasObj.t;
			var bounds = this.canvasObj.b;
			this.bounds = {
					minX: bounds[0],
					minY: bounds[1],			
					maxX: bounds[2],
					maxY: bounds[3]
				};
			this.args = args;	
			var vbounds = this.canvasObj.vb;
			this.vbounds = {
				minX: vbounds[0],
				minY: vbounds[1],			
				maxX: vbounds[2],
				maxY: vbounds[3],
				width: vbounds[2] - vbounds[0],
				height: vbounds[3] - vbounds[1],
			};	
			this.sh = this.canvasObj.sh;
			this.re = this.canvasObj.re;				
			this.tr = this.canvasObj.tr;
			this.currImage = this.getAttribute( "ip" );
		}
		if(actualParent)
		{
			actualParent.drawingBoard = this.element.parentElement;
			actualParent.bounds = this.bounds;
			actualParent.drawingBoard.bounds = this.vbounds;
		}
		this.isDrawn = false;		    
	}
	
	cp.inherits(cp.DrawingItem, cp.DisplayObject);
	
	cp.DrawingItem.prototype.start = function()
	{
		this.drawIfNeeded();
	}
	
	cp.DrawingItem.prototype.reset = function(endOfSlide)
	{
		delete ropMap[this.element.id];
		// release memory
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.DrawingItem.prototype.drawIfNeeded = function()
	{
		if (this.isDrawn)
			return;

		if (! this.canvasObj || ! this.type || ! this.canvasObj.b)
			return;
			
			
		// Need to fix this bounds business. Need to 
		var bounds = this.bounds;
		var vbounds = this.vbounds;
		var boundOffset = this.canvasObj.sw;
		if ( undefined == boundOffset )
			boundOffset = 1; 
				
		var styleLeft = bounds.minX ;
		var styleTop = bounds.minY;
		var styleWidth = bounds.maxX - bounds.minX;
		var styleHeight = bounds.maxY - bounds.minY;
		
		var actualParent = this.actualParent;
		
		actualParent.style.left = styleLeft +  "px";
		actualParent.style.top = styleTop + "px";
		actualParent.style.width = styleWidth + "px";
		actualParent.style.height = styleHeight + "px";
		
		var x = 0;
		var y = 0;
		var width = bounds.maxX - bounds.minX;
		var height = bounds.maxY - bounds.minY;
		
		var lHasShadowOrReflection = false;
		lHasShadowOrReflection = this.re || (this.sh && !this.sh.i);
		
		var lHasTransform = this.tr != undefined;
		
		styleLeft 	= (0 < vbounds.minX) && lHasShadowOrReflection ? 0 : vbounds.minX;
		styleTop	= (0 < vbounds.minY) && lHasShadowOrReflection ? 0 : vbounds.minY;
		var styleRight 	= lHasShadowOrReflection && (cp.model.data.project.w > vbounds.maxX) ? cp.model.data.project.w : vbounds.maxX;
		var styleBottom	= lHasShadowOrReflection && (cp.model.data.project.h > vbounds.maxY) ? cp.model.data.project.h : vbounds.maxY;
		styleWidth	= styleRight - styleLeft;
		styleHeight	= styleBottom - styleTop;
		var canvas = this.canvas = cp.createCanvas(0, 0, styleWidth, styleHeight,this.element);
		
		this.element.style.display = "block";
		this.element.style.position = "absolute";
		this.element.parentElement.style.left = this.vbounds.minX + "px";
		this.element.parentElement.style.top = this.vbounds.minY + "px";
		this.element.parentElement.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
		this.element.parentElement.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		this.element.style.marginLeft = (styleLeft-this.vbounds.minX) + "px";
		this.element.style.marginTop = (styleTop-this.vbounds.minY) + "px";
		if(this.re)
			this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";
		cp.movie.stage.addToParentChildMap(actualParent.id,this.element.id);
		this.element.originalParent = actualParent;
		var gc = canvas.gc;
		
		gc.save();
		var transX = 0;
		var transY = 0;		
		if(lHasShadowOrReflection)
		{
			transX = (styleLeft < 0) ? -styleLeft : 0;
			transY = (styleTop < 0) ? -styleTop : 0;
			gc.setTransform(1,0,0,1,transX,transY);
			//gc.translate((bounds.minX + bounds.maxX)/2,(bounds.minY + bounds.maxY)/2);
		}			
		else if(lHasTransform)
		{
			gc.translate(-this.vbounds.minX,-this.vbounds.minY);
			//gc.translate(-bounds.minX,-bounds.minY);
		}
		else
		{
			gc.translate(-bounds.minX,-bounds.minY);
		}
		if(this.sh && !this.sh.i)
		{
			gc.shadowOffsetX = this.sh.d*Math.cos((Math.PI*this.sh.a)/180);
			gc.shadowOffsetY = this.sh.d*Math.sin((Math.PI*this.sh.a)/180);
			gc.shadowBlur = this.sh.b;
			gc.shadowColor = ConvertRGBToRGBA(this.sh.c,this.sh.o );
			//applyShadow(this.element , this.sh.d*Math.cos((Math.PI*this.sh.a)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*this.sh.a)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ));
		}		
		this.element.style.display = "block";
		this.element.style.position = "absolute";

		var gc = canvas.gc;
		
		gc.save();

		var rotateAngle = 0;
		if(this.tr)
			rotateAngle = getAngleFromRotateStr(this.tr);
		actualParent.rotateAngle = rotateAngle;
		if ( this.sh || (0 != rotateAngle)) 
		{
		gc.translate((bounds.minX + bounds.maxX)/2,(bounds.minY + bounds.maxY)/2);
		if(0 != rotateAngle)
			gc.rotate((Math.PI*rotateAngle)/180);			
			else
				gc.rotate((Math.PI*0.02)/180);
			gc.translate(-(bounds.minX + bounds.maxX)/2,-(bounds.minY + bounds.maxY)/2);
		}
		var strokeType = 0;
		if ( undefined != this.canvasObj.ss )
			strokeType = this.canvasObj.ss;
		
		gc.translate(this.canvasObj.sw/2,this.canvasObj.sw/2);
		var ok = this.draw( gc, strokeType );
		
		// Draw an image, if it is there.
		if ( ok && undefined != this.currImage ) {
			var img = cp.movie.im.images[ this.currImage ];
			if ( img && img.nativeImage.complete) 
			{
				gc.translate(-this.canvasObj.sw/2,-this.canvasObj.sw/2);
				gc.translate((bounds.minX + bounds.maxX)/2,(bounds.minY + bounds.maxY)/2);
				gc.drawImage(img.nativeImage,-img.nativeImage.width/2,-img.nativeImage.height/2,img.nativeImage.width,img.nativeImage.height);
			}
			else
				ok = false;
		}

		gc.restore();
		if(this.transIn)
			this.element.parentElement.style.opacity = 0;
		gc = null;
		canvas = null;
		this.isDrawn = ok;
	}
	
	cp.DrawingItem.prototype.draw = function( gc, strokeType )
	{
		// First draw with solid stroke, so that the fill gets applied correctly.
		switch ( this.type ) {
		case cp.kCPOTOvalItem:
			this.drawOval( gc, 0 );
			break;
		case cp.kCPOTAnswerArea:
		case cp.kCPOTStageQuestionText:
		case cp.kCPOTStageQuestionTitle:
		case cp.kCPOTRectangleItem:
			this.drawRectangle( gc, 0 );
			break;
		case cp.kCPOTPolygon:		
			this.drawPolygon( gc, 0 );
			break;
		default:
			return true;
		}
		
		// Now fill.
		var fillAlpha = 1;
		if ( undefined != this.canvasObj.fa )
			fillAlpha = this.canvasObj.fa / 100;
		
		var oldAlpha = gc.globalAlpha;
		gc.globalAlpha = fillAlpha;

		var ok = this.setFill( gc );
		gc.globalAlpha = oldAlpha;
		
		// Now do the stroking without filling.
		if ( 0 != strokeType && this.canvasObj.sw > 0 ) {
			switch ( this.type ) {
			case cp.kCPOTOvalItem:
				this.drawOval( gc, strokeType );
				break;
			case cp.kCPOTAnswerArea:
			case cp.kCPOTStageQuestionText:
			case cp.kCPOTStageQuestionTitle:
			case cp.kCPOTRectangleItem:
				this.drawRectangle( gc, strokeType );
				break;
			case cp.kCPOTPolygon:		
				this.drawPolygon( gc, strokeType );
				break;
			default:
				return true;
			}
		}
		
		if ( this.canvasObj.sw > 0 ) {
			gc.lineWidth = this.canvasObj.sw;
			gc.strokeStyle = this.canvasObj.sc;
			gc.stroke();
		}
		return ok;
	}
	
	cp.DrawingItem.prototype.setFill = function( gc )
	{
		var tileData = null;
		var imagePath = '';
		var img = null;
		var bounds = [];
		var xTrans = 0, yTrans = 0;
		var bStretch = 0;
		var bTile = 1;
		var pat = null, grad = null;
		var ok = true;
		var w = 0, y = 0, scaleX = 1, scaleY = 1;
		var translated = false;
		var hasImageOnTop = false;
		
		if ( this.canvasObj.gf ) {
			grad = cp.getGradientFill( this.canvasObj.gf, gc );
			if ( grad ) 
				gc.fillStyle = grad;
		}
		else if ( this.canvasObj.imgf ) {
			ok = false;
			tileData = this.canvasObj.imgf;
			if ( undefined == tileData.img || undefined == tileData.img.ip )
				return false;
			imagePath = tileData.img.ip;
			img = cp.movie.im.images[ imagePath ];
			if ( img && img.nativeImage.complete )
			{
				xTrans = tileData.img.x + this.canvasObj.b[ 0 ];
				yTrans = tileData.img.y + this.canvasObj.b[ 1 ];
				
				translated = true;
				gc.translate( xTrans, yTrans );
				bStretch = tileData.s;
				bTile = tileData.t;
				if ( bTile ) {
					pat = gc.createPattern( img.nativeImage, "repeat" );
					gc.fillStyle = pat;
				}
				else if ( bStretch ) {
					if ( undefined != this.canvasObj.b && 4 == this.canvasObj.b.length ) {
						bounds = this.canvasObj.b;						
						w = bounds[ 2 ] - bounds[ 0 ];
						h = bounds[ 3 ] - bounds[ 1 ];
						scaleX = w / tileData.img.w;
						scaleY = h / tileData.img.h;
						gc.scale( scaleX, scaleY );
						pat = gc.createPattern( img.nativeImage, "no-repeat" );
						gc.fillStyle = pat;
					}
				}
				else {
					gc.fillStyle = '#FFFFFF';
					gc.fill();
					pat = gc.createPattern( img.nativeImage, "no-repeat" );
					gc.fillStyle = pat;
				}
				ok = true;
			}		
		}
		else if ( this.canvasObj.bc ) 
			gc.fillStyle = this.canvasObj.bc;
		else if ( this.currImage ) {
			hasImageOnTop = true;
			ok = false;
		}
		if ( ok )
			gc.fill();	
		if ( 1 != scaleX || 1 != scaleY )
			gc.scale( 1 / scaleX, 1 / scaleY );			
		if ( translated )
			gc.translate( -xTrans, -yTrans ); 
		return ok || hasImageOnTop;
	}
	
	cp.DrawingItem.prototype.drawRectangle = function( gc, strokeType )
	{
		// Calculate the radius.
		var r = 0;
		var bounds = [];
		var width = 0, height = 0, minDim = 0, left = 0, top = 0, right = 0, bottom = 0;
		if ( undefined == this.canvasObj.b || 4 != this.canvasObj.b.length )
			return;

		bounds = this.canvasObj.b;
		width = bounds[ 2 ] - bounds[ 0 ];
		height = bounds[ 3 ] - bounds[ 1 ];
		minDim = width;
		if ( height < width )
			minDim = height;
			
		if ( undefined != this.canvasObj.cr ) {
			r = this.canvasObj.cr;
			r = ( minDim * r ) / 100;
		}
		
		left = bounds[ 0 ];
		top = bounds[ 1 ];
		right = bounds[ 2 ];
		bottom = bounds[ 3 ];
		
		if ( 0 != strokeType ) {
			cp.drawDashedRectangle( gc, left, top, width, height, r, strokeType );
			return;
		}
		
		gc.beginPath();	

		cp.moveTo( gc, left,  bottom - r, strokeType );
		cp.lineTo( gc, left, top + r, strokeType ); 
		if ( r > 0 ) 
			cp.bezierCurveTo( gc, left, top + r, left, top, left + r, top, strokeType ); 

		cp.lineTo( gc, left + r, top, strokeType );
		cp.lineTo( gc, right - r, top, strokeType );
		if ( r > 0 )
			cp.bezierCurveTo( gc, right - r, top, right, top, right, top + r, strokeType );
		
		cp.lineTo( gc, right, top + r, strokeType );
		cp.lineTo( gc, right, bottom - r, strokeType );

		if ( r > 0 )
			cp.bezierCurveTo( gc, right, bottom - r, right, bottom, right - r, bottom, strokeType );

		cp.lineTo( gc, right - r, bottom, strokeType ) ;
		cp.lineTo( gc, left + r, bottom, strokeType );
		if ( r > 0 )
			cp.bezierCurveTo( gc, left + r, bottom, left, bottom, left, bottom - r, strokeType );

		gc.closePath();
	}
	
	cp.DrawingItem.prototype.drawOval = function( gc, strokeType )
	{
		var bounds = [];
		var halfWidth = 0, halfHeight = 0, minDim = 0, left = 0, top = 0, right = 0, bottom = 0, ctrlX = 0, ctrlY = 0;
		if ( undefined == this.canvasObj.b || 4 != this.canvasObj.b.length )
			return;

		bounds = this.canvasObj.b;
		left = bounds[ 0 ];
		top = bounds[ 1 ];
		right = bounds[ 2 ];
		bottom = bounds[ 3 ];

		halfWidth	= ( right - left ) / 2;
		halfHeight	= ( bottom - top ) / 2;
		ctrlX		= 0.55285 * halfWidth;
		ctrlY		= 0.55285 * halfHeight;	

		if ( 0 != strokeType ) {
			cp.drawDashedOval( gc, ( left + right ) / 2, ( top + bottom ) / 2, halfWidth, halfHeight, strokeType );
			return;
		}
		
		gc.beginPath();	

		cp.moveTo( gc, right, top + halfHeight, strokeType );
		cp.bezierCurveTo( gc, right, top + halfHeight + ctrlY,
					   left + halfWidth + ctrlX, bottom,
					   left + halfWidth, bottom, strokeType );
		cp.bezierCurveTo( gc, left + halfWidth - ctrlX,
					   bottom, left,
					   top + halfHeight + ctrlY,
					   left, top + halfHeight, strokeType );
		cp.bezierCurveTo( gc, left, top + halfHeight - ctrlY,
					   left + halfWidth - ctrlX, top,
					   left + halfWidth, top, strokeType ); 
		cp.bezierCurveTo( gc, left + halfWidth + ctrlX, top,
					   right, top + halfHeight - ctrlY,
					   right, top + halfHeight, strokeType );	
		gc.closePath();			
	}

	cp.DrawingItem.prototype.drawPolygon = function( gc, strokeType )
	{
		var pt = null;
		var ptArr = this.canvasObj.pta;
		var i = 0;
		if ( undefined == ptArr || ptArr.length < 2 )
			return;

		if ( 0 != strokeType ) {
			cp.drawDashedPolyLine( gc, ptArr, strokeType );
			return;
		}			
			
		gc.beginPath();
		pt = ptArr[ 0 ];
		cp.moveTo( gc, pt.x, pt.y, strokeType );
		
		for ( i = 1; i < ptArr.length; ++i ) {
			pt = ptArr[ i ];
			cp.lineTo( gc, pt.x, pt.y, strokeType );
		}
		
		gc.closePath();
	}
	
	cp.AutoShape = function(el, canvasId, args)
	{
		function doOnMouseDown( elem, data )
		{
			var tr_str = 'translate(' + data.tx + 'px,' + data.ty + 'px) scalex(' + data.sx + ') scaley(' + data.sy + ')';
			var tr_str1 = '';
			applyTransform( elem, tr_str );
			var oldTr = data.old_tr ? data.old_tr : '';
			
			if ( oldTr.length > 0 )
				tr_str1 = oldTr + ' ';
			tr_str1 += 'scalex(' + data.sx + ') scaley(' + data.sy + ')';
			applyTransform( data.p, tr_str1 );
		}

		function doOnMouseUp( elem, data )
		{
			applyTransform( elem, '' );
			var oldTr = data.old_tr ? data.old_tr : '';
			applyTransform( data.p, oldTr );
		}
		
		function getMouseHandler( elem, dataObj, handler, old_handler )
		{
			var old = old_handler;
			var e = elem;
			var data = {sx: dataObj.sx, sy: dataObj.sy, tx: dataObj.tx, ty: dataObj.ty, p: dataObj.p, old_tr: dataObj.old_tr};			
			return function() {
				if ( self.parentData && undefined != self.parentData.enabled ) {
					if ( ! self.parentData.enabled )
						return; // Don't act on disabled elements.
				}
				if ( old ) 
					old();
				if ( handler ) 
					handler( e, data );
			}
		}
	
		cp.AutoShape.baseConstructor.call(this, el);
		this.visible = this.getAttribute("visible");
		this.parentId = cp.model.data[canvasId].dn;
		this.parentObj = cp.model.data[this.parentId];
		this.canvasObj = null;
		this.transIn = 	this.parentObj['trin'];
		if ( undefined != this.parentObj )
			this.canvasObj = cp.model.data[ this.parentObj.mdi ];
		this.parentDivName = this.getAttribute("dn");
		this.parentData = cp.model.data[this.parentDivName];
		var actualParent = document.getElementById(this.parentDivName);
		this.actualParent = actualParent;
		if ( this.canvasObj ) {
			var bounds = this.canvasObj.b;
			this.bounds = {
					minX: bounds[0],
					minY: bounds[1],			
					maxX: bounds[2],
					maxY: bounds[3]
				};
			this.args = args;	
			var vbounds = this.canvasObj.vb;
			this.vbounds = {
				minX: vbounds[0],
				minY: vbounds[1],			
				maxX: vbounds[2],
				maxY: vbounds[3],
				width: vbounds[2] - vbounds[0],
				height: vbounds[3] - vbounds[1],
			};	
			this.sh = this.canvasObj.sh;
			this.re = this.canvasObj.re;				
			this.tr = this.canvasObj.tr;
			this.currImage = this.getAttribute( "ip" );
		}
		if(actualParent)
		{
			actualParent.drawingBoard = this.element.parentElement;
			actualParent.bounds = this.bounds;
			actualParent.drawingBoard.bounds = this.vbounds;
		}		
		// For buttons, we need to handle press.
		if ( actualParent && undefined != this.parentData.pa && this.bounds ) {
			// handle main master slide case.
			if ( -1 != this.parentData.pa && this.parentData.omms ) {
				// Set new pause time.
				if ( cp.movie.stage.currentSlide )
					this.parentData.pa = cp.movie.stage.currentSlide.to - 1;
				this.setAttribute('clickedOnce', false);
			}
			var width = this.bounds.maxX - this.bounds.minX;
			var height = this.bounds.maxY - this.bounds.minY;
			var scaleX = 1.0, scaleY = 1.0;
			var transX = 0, transY = 0;
			if ( width > 10 ) 
				scaleX = ( width - 4 ) / width;
			if ( height > 10 ) 
				scaleY = ( height - 4 ) / height;
			if ( scaleX < 1.0 && scaleY < 1.0 ) {
				// Earlier autoshapes were drawn on canvas of size of stage. Now this is changed
				var projWidth	= cp.model.data.project.w;
				var projHeight	= cp.model.data.project.h;
				var lHasShadowOrReflection = false;
				lHasShadowOrReflection = this.re || (this.sh && !this.sh.i);
				
				var lHasTransform = this.tr != undefined;
				
				var styleLeft 	= (0 < this.vbounds.minX) && lHasShadowOrReflection ? 0 : this.vbounds.minX;
				var styleTop	= (0 < this.vbounds.minY) && lHasShadowOrReflection ? 0 : this.vbounds.minY;
				var styleRight 	= lHasShadowOrReflection && (cp.model.data.project.w > this.vbounds.maxX) ? cp.model.data.project.w : this.vbounds.maxX;
				var styleBottom	= lHasShadowOrReflection && (cp.model.data.project.h > this.vbounds.maxY) ? cp.model.data.project.h : this.vbounds.maxY;
				var styleWidth	= styleRight - styleLeft;
				var styleHeight	= styleBottom - styleTop;
				
				var centerX = ( ( this.vbounds.maxX + this.vbounds.minX ) / 2 );
				var centerY = ( ( this.vbounds.maxY + this.vbounds.minY ) / 2 );
				
				var dX = ( styleWidth / 2 ) - centerX;
				var dY = ( styleHeight / 2 ) - centerY;
				
				var afterScaleX = ( styleWidth / 2 ) - ( dX * scaleX );
				var afterScaleY = ( styleHeight / 2 ) - ( dY * scaleY );
				
				if(lHasShadowOrReflection)
				{
					transX = afterScaleX - centerX;
					transY = afterScaleY - centerY;
				}
				else
				{
					transX = 0;
					transY = 0;
				}
				
				this.oldMouseOver = actualParent.onmouseover;
				this.oldMouseOut = actualParent.onmouseout;
				
				var dataObj = {sx: scaleX, sy: scaleY, tx: -transX, ty: -transY, p: actualParent, old_tr:this.tr};
				if ( cp.device == cp.IDEVICE ) {
					actualParent.ontouchstart = getMouseHandler( this.element, dataObj, doOnMouseDown );
					actualParent.ontouchend = getMouseHandler( this.element, dataObj, doOnMouseUp );
				}
				else {
					actualParent.onmouseover = getMouseHandler( this.element, dataObj, null, actualParent.onmouseover );
					actualParent.onmouseout = getMouseHandler( this.element, dataObj, doOnMouseUp, actualParent.onmouseout );
					actualParent.onmousedown = getMouseHandler( this.element, dataObj, doOnMouseDown );
					actualParent.onmouseup = getMouseHandler( this.element, dataObj, doOnMouseUp );
				}
				this.setUpClickHandler();
			}
		}
		this.isDrawn = false;		    
	}
	
	cp.inherits(cp.AutoShape, cp.DisplayObject);
	
	cp.AutoShape.prototype.start = function()
	{
		this.drawIfNeeded();
	}
	
	cp.AutoShape.prototype.reset = function(endOfSlide)
	{
		delete ropMap[this.element.id];
		// release memory
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
			
		if ( this.actualParent ) {
			this.actualParent.onclick = null;
			if ( cp.device == cp.IDEVICE ) {
				this.actualParent.ontouchstart = null;
				this.actualParent.ontouchend = null;
			}
			else {
				this.actualParent.onmouseout = null;
				this.actualParent.onmousedown = null;
				this.actualParent.onmouseup = null;
				this.actualParent.onmouseover = null;
				
				if ( this.oldMouseOver ) 
					this.actualParent.onmouseover = this.oldMouseOver;
				if ( this.oldMouseOut ) 
					this.actualParent.onmouseout = this.oldMouseOut;
			
			}
		}
	}
	
	cp.AutoShape.prototype.setUpClickHandler = function()
	{
		// Check whether current slide is question slide.
		var isQuestionSlide = false, isHotspot = false, needsOwnHandler = false;
		var currSlide = cp.movie.stage.currentSlide;
		if ( this.actualParent && currSlide ) {
			isQuestionSlide = ( currSlide.st == "Question Slide" );
			// Check whether this is a hotspot.
			if ( isQuestionSlide ) {
				if ( currSlide.qs ) {
					var data = cp.model.data[ currSlide.qs ]; 
					if ( data && data.qtp == 'Hotspot' )
						isHotspot = true;
				}
			}
			needsOwnHandler = isQuestionSlide && ! isHotspot;
			if ( needsOwnHandler && ! this.actualParent.onclick ) {
				function get_on_click( data ) {
					var objData = data;
					return function () {
						cp.clickSuccessHandler( objData );
					}
				}
				this.actualParent.onclick = get_on_click( this.parentData );
			}
			else {
				this.actualParent.onclick = null; // remove.
			}
		}
	}
	
	cp.AutoShape.prototype.restOfProjectDoOnNewSlide = function()
	{
		this.setUpClickHandler();
	}
	
	cp.AutoShape.prototype.drawIfNeeded = function()
	{
		if (this.isDrawn)
			return;

		if (! this.canvasObj || ! this.canvasObj.b || ! this.canvasObj.p0 )
			return;
			
			
		// Need to fix this bounds business. Need to 
		var bounds = this.bounds;
		var vbounds = this.vbounds;
		var boundOffset = this.canvasObj.sw;
		if ( undefined == boundOffset )
			boundOffset = 1; 
				
		var styleLeft = bounds.minX ;
		var styleTop = bounds.minY;
		var styleWidth = bounds.maxX - bounds.minX;
		var styleHeight = bounds.maxY - bounds.minY;
		
		var actualParent = this.actualParent;
		
		actualParent.style.left = styleLeft +  "px";
		actualParent.style.top = styleTop + "px";
		actualParent.style.width = styleWidth + "px";
		actualParent.style.height = styleHeight + "px";
		
		var x = 0;
		var y = 0;
		var width = bounds.maxX - bounds.minX;
		var height = bounds.maxY - bounds.minY;
		
		var lHasShadowOrReflection = false;
		lHasShadowOrReflection = this.re || (this.sh && !this.sh.i);
		
		var lHasTransform = this.tr != undefined;
		
		styleLeft 	= (0 < vbounds.minX) && lHasShadowOrReflection ? 0 : vbounds.minX;
		styleTop	= (0 < vbounds.minY) && lHasShadowOrReflection ? 0 : vbounds.minY;
		var styleRight 	= lHasShadowOrReflection && (cp.model.data.project.w > vbounds.maxX) ? cp.model.data.project.w : vbounds.maxX;
		var styleBottom	= lHasShadowOrReflection && (cp.model.data.project.h > vbounds.maxY) ? cp.model.data.project.h : vbounds.maxY;
		styleWidth	= styleRight - styleLeft;
		styleHeight	= styleBottom - styleTop;
		var canvas = this.canvas = cp.createCanvas(0, 0, styleWidth, styleHeight,this.element);
		
		this.element.style.display = "block";
		this.element.style.position = "absolute";
		this.element.parentElement.style.left = this.vbounds.minX + "px";
		this.element.parentElement.style.top = this.vbounds.minY + "px";
		this.element.parentElement.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
		this.element.parentElement.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
		this.element.style.marginLeft = (styleLeft-this.vbounds.minX) + "px";
		this.element.style.marginTop = (styleTop-this.vbounds.minY) + "px";
		if(this.re)
			this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";
		cp.movie.stage.addToParentChildMap(actualParent.id,this.element.id);
		this.element.originalParent = actualParent;
		var gc = canvas.gc;
		
		gc.save();
		var transX = 0;
		var transY = 0;		
		if(lHasShadowOrReflection)
		{
			transX = (styleLeft < 0) ? -styleLeft : 0;
			transY = (styleTop < 0) ? -styleTop : 0;
			gc.setTransform(1,0,0,1,transX,transY);
			//gc.translate((bounds.minX + bounds.maxX)/2,(bounds.minY + bounds.maxY)/2);
		}			
		else if(lHasTransform)
		{
			gc.translate(-this.vbounds.minX,-this.vbounds.minY);			
		}
		else
		{
			gc.translate(-bounds.minX,-bounds.minY);
		}
		if(this.sh && !this.sh.i)
		{
			gc.shadowOffsetX = this.sh.d*Math.cos((Math.PI*this.sh.a)/180);
			gc.shadowOffsetY = this.sh.d*Math.sin((Math.PI*this.sh.a)/180);
			gc.shadowBlur = this.sh.b;
			var opacity = this.sh.o;
			if(opacity == 1.0)
				opacity = 0.999;
			gc.shadowColor = ConvertRGBToRGBA(this.sh.c,opacity );
			//applyShadow(this.element , this.sh.d*Math.cos((Math.PI*this.sh.a)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*this.sh.a)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ));
		}		
		this.element.style.display = "block";
		this.element.style.position = "absolute";

		var gc = canvas.gc;
		
		gc.save();

		var rotateAngle = 0;
		if ( this.tr ) {
			applyTransform( actualParent,this.tr );					
			actualParent.tr = this.tr;
			rotateAngle = getAngleFromRotateStr( this.tr );
		}
			
		actualParent.rotateAngle = rotateAngle;
		if ( this.sh || (0 != rotateAngle)) 
		{
			gc.translate((bounds.minX + bounds.maxX)/2,(bounds.minY + bounds.maxY)/2);
			if(0 != rotateAngle)
				gc.rotate((Math.PI*rotateAngle)/180);			
			else
				gc.rotate((Math.PI*0.02)/180);
			gc.translate(-(bounds.minX + bounds.maxX)/2,-(bounds.minY + bounds.maxY)/2);
		}
		
		var strokeType = 0;
		if ( undefined != this.canvasObj.ss )
			strokeType = this.canvasObj.ss;
		var fillAlpha = 1;
		if ( undefined != this.canvasObj.fa )
			fillAlpha = this.canvasObj.fa / 100;
		if ( undefined != this.currImage && fillAlpha != 1 ) {
			var img = cp.movie.im.images[ this.currImage ];
			if ( img && img.nativeImage.complete) 
			{
				gc.translate((bounds.minX + bounds.maxX)/2,(bounds.minY + bounds.maxY)/2);
				//gc.drawImage(img.nativeImage,-img.nativeImage.width/2,-img.nativeImage.height/2,img.nativeImage.width,img.nativeImage.height);
				gc.translate(-(bounds.minX + bounds.maxX)/2,-(bounds.minY + bounds.maxY)/2);
			}
		}
		
		if ( !this.sh && (0 == rotateAngle)) 
			gc.translate(this.canvasObj.sw*2,this.canvasObj.sw*2);
		var ok = this.draw( gc, strokeType );
		
		// Draw an image, if it is there.
		if ( ok && undefined != this.currImage ) {
			var img = cp.movie.im.images[ this.currImage ];
			if ( img && img.nativeImage.complete) 
			{
				if(this.sh && !this.sh.i)
				{
					gc.shadowOffsetX = 0;
					gc.shadowOffsetY = 0;
					gc.shadowBlur = 0;
					gc.shadowColor = 'rgba(0,0,0,0)';
				}
				//if ( !this.sh && (0 == rotateAngle))
					//gc.translate(-this.canvasObj.sw*2,-this.canvasObj.sw*2);
				gc.translate((bounds.minX + bounds.maxX)/2,(bounds.minY + bounds.maxY)/2);
				gc.drawImage(img.nativeImage,-img.nativeImage.width/2,-img.nativeImage.height/2,img.nativeImage.width,img.nativeImage.height);
			}
			else
				ok = false;
		}

		gc.restore();
		if(this.transIn)
			this.element.parentElement.style.opacity = 0;
		
		gc = null;
		canvas = null;
		this.isDrawn = ok;
		if(!this.visible)
			cp.hide( this.parentDivName );		
	}
	
	cp.AutoShape.prototype.draw = function( gc, strokeType )
	{
		// First draw with solid stroke, so that the fill gets applied correctly.
		var forFill = true;
		//if ( 0 == strokeType && this.canvasObj.sw > 0 )
			//forFill = false;
		this.drawFillBoundary( gc, forFill );
		
		// Now fill.
		var fillAlpha = 1;
		if ( undefined != this.canvasObj.fa )
			fillAlpha = this.canvasObj.fa / 100;
		
		var oldAlpha = gc.globalAlpha;
		var ok = false;
		var fillDone = false;
		if ( 0 != strokeType && this.canvasObj.sw > 0 ) {
			// First fill.
			gc.globalAlpha = fillAlpha;
			ok = this.setFill( gc );
			gc.globalAlpha = oldAlpha;
			// Now do the stroking without filling.
			this.drawBoundary( gc, strokeType );
		}

		if ( ! fillDone ) {
			gc.globalAlpha = fillAlpha;
			ok = this.setFill( gc );
			gc.globalAlpha = oldAlpha;
		}
		
		if ( 0 == strokeType && this.canvasObj.sw > 0 ) {
			// Now draw boundary for stroke.
			this.drawFillBoundary( gc, false );
		}
		
		if ( this.canvasObj.sw > 0 ) {
			gc.lineWidth = this.canvasObj.sw;
			gc.strokeStyle = this.canvasObj.sc;
			gc.stroke();
		}

		if(this.canvasObj.sw!=0)
		{
			gc.shadowOffsetX = 0;
			gc.shadowOffsetY = 0;
			gc.shadowBlur = 0;
			gc.shadowColor = 'rgba(0,0,0,0)';
			gc.stroke();
		}	
		return ok;
	}
	
	cp.AutoShape.prototype.drawFillBoundary = function( gc, forFill )
	{
		var op = null;
		var dArr = this.canvasObj.p0;
		var opVal;
		var lastX = 0, lastY = 0, i = 0, opIndex = 0;
		if ( ! dArr )
			return;
		
		gc.beginPath();
		for ( i = 0; i < dArr.length; ++i ) {
			op = dArr[ i ];
			if ( op.length <= 0 )
				continue;
			switch ( op[ 0 ] ) {
			case cp.kBeginPath:
				break; 
			case cp.kMoveTo:
				gc.moveTo( op[ 1 ], op[ 2 ] );
				lastX = op[ 1 ]; 
				lastY = op[ 2 ];
				break;
			case cp.kLineTo:
				gc.lineTo( op[ 1 ], op[ 2 ] );
				lastX = op[ 1 ]; 
				lastY = op[ 2 ];
				break;
			case cp.kBezierTo:
				gc.bezierCurveTo( op[ 1 ], op[ 2 ], op[ 3 ], op[ 4 ], op[ 5 ], op[ 6 ] );
				lastX = op[ 5 ]; 
				lastY = op[ 6 ];
				break;
			case cp.kClosePath:
				gc.closePath();
				break;
			case cp.kNotClosed:
				if ( ! forFill )
					break; // We need to consider while stroking.
			case cp.kNoStroke:
				// Skip up to next begin, closed or no stroke;
				opIndex = i;
				if ( i < ( dArr.length - 1 ) ) {
					opVal = dArr[ ++i ][ 0 ];
					if ( cp.kBeginPath != opVal )
						--i;
				}
					while ( i < ( dArr.length - 1 ) ) {
					opVal = dArr[ ++i ][ 0 ];
					if ( cp.kNotClosed == opVal || cp.kNoStroke == opVal || cp.kBeginPath == opVal ) {
						--i;
							break;
					}					
				}
				break; // TODO - Handle.
			default:
				break;
			}		
		}
	}
	
	cp.AutoShape.prototype.drawBoundary = function( gc, strokeType )
	{
		var op = null;
		var dArr = this.canvasObj.p0;
		var lastX = 0, lastY = 0, i = 0;
		if ( ! dArr )
			return;
			
		var struct = new cp.dashStruct();
		var pattern = cp.getPattern( strokeType, 7, 3 );			
		
		gc.beginPath();
		for ( i = 0; i < dArr.length; ++i ) {
			op = dArr[ i ];
			if ( op.length <= 0 )
				continue;
			switch ( op[ 0 ] ) {
			case cp.kBeginPath:
				break; 
			case cp.kMoveTo:
				gc.moveTo( op[ 1 ], op[ 2 ] );
				lastX = op[ 1 ]; 
				lastY = op[ 2 ];
				struct = new cp.dashStruct();
				break;
			case cp.kLineTo:
				cp.drawDashedLineImpl( gc, pattern, struct, lastX, lastY, op[ 1 ], op[ 2 ] );
				lastX = op[ 1 ]; 
				lastY = op[ 2 ];
				break;
			case cp.kBezierTo:
				cp.drawDashedBezierCurve( gc, pattern, struct, lastX, lastY, op[ 1 ], op[ 2 ], op[ 3 ], op[ 4 ], op[ 5 ], op[ 6 ] );
				lastX = op[ 5 ]; 
				lastY = op[ 6 ];
				break;
			case cp.kClosePath:
				struct = new cp.dashStruct();
				break;
			case cp.kNotClosed:	
			case cp.kNoStroke:
				break; 
			default:
				break;
			}		
		}
	}
	
	cp.AutoShape.prototype.setFill = function( gc )
	{
		var tileData = null;
		var imagePath = '';
		var img = null;
		var bounds = [];
		var xTrans = 0, yTrans = 0;
		var bStretch = 0;
		var bTile = 1;
		var pat = null, grad = null;
		var ok = true;
		var w = 0, y = 0, scaleX = 1, scaleY = 1;
		var translated = false;
		var hasImageOnTop = false;
		
		if ( this.canvasObj.gf ) {
			grad = cp.getGradientFill( this.canvasObj.gf, gc );
			if ( grad ) 
				gc.fillStyle = grad;
		}
		else if ( this.canvasObj.imgf ) {
			ok = false;
			tileData = this.canvasObj.imgf;
			if ( undefined == tileData.img || undefined == tileData.img.ip )
				return false;
			imagePath = tileData.img.ip;
			img = cp.movie.im.images[ imagePath ];
			if ( img && img.nativeImage.complete )
			{
				xTrans = tileData.img.x + this.canvasObj.b[ 0 ];
				yTrans = tileData.img.y + this.canvasObj.b[ 1 ];
				
				translated = true;
				gc.translate( xTrans, yTrans );
				bStretch = tileData.s;
				bTile = tileData.t;
				if ( bTile ) {
					pat = gc.createPattern( img.nativeImage, "repeat" );
					gc.fillStyle = pat;
				}
				else if ( bStretch ) {
					if ( undefined != this.canvasObj.b && 4 == this.canvasObj.b.length ) {
						bounds = this.canvasObj.b;						
						w = bounds[ 2 ] - bounds[ 0 ];
						h = bounds[ 3 ] - bounds[ 1 ];
						scaleX = w / tileData.img.w;
						scaleY = h / tileData.img.h;
						gc.scale( scaleX, scaleY );
						pat = gc.createPattern( img.nativeImage, "no-repeat" );
						gc.fillStyle = pat;
					}
				}
				else {
					gc.fillStyle = '#FFFFFF';
					gc.fill();
					pat = gc.createPattern( img.nativeImage, "no-repeat" );
					gc.fillStyle = pat;
				}
				ok = true;
			}		
		}
		else if ( this.canvasObj.bc ) 
			gc.fillStyle = this.canvasObj.bc;
		else if ( this.currImage ) {
			hasImageOnTop = true;
			ok = false;
		}
		if ( ok )
			gc.fill();	
		if ( 1 != scaleX || 1 != scaleY )
			gc.scale( 1 / scaleX, 1 / scaleY );			
		if ( translated )
			gc.translate( -xTrans, -yTrans ); 
		return ok || hasImageOnTop;
	}
	
	cp.AnswerArea = function(el, parentId, args)
	{
		cp.AnswerArea.baseConstructor.call(this, el, parentId);
		this.canvasElem = this.element;
	}
	
	cp.inherits(cp.AnswerArea, cp.DrawingItem);
	
	cp.RectWithText = function(el, parentId, args)
	{
		cp.RectWithText.baseConstructor.call(this, el, parentId);
		this.canvasElem = this.element;
		this.currImage = this.getAttribute( "ip" );	
	}
	
	cp.inherits(cp.RectWithText, cp.DrawingItem);
	
    // typing text class for typing text
    cp.TypingText = function(movie, el, args) {
        cp.TypingText.baseConstructor.call(this, movie, el);

        this.id = this.getAttribute("id");
        this.positions = this.getAttribute("b");
        this.left = this.getAttribute("l");
        this.top = this.getAttribute("t");
        this.srcimage = this.getAttribute("ip");
		this.playKeyTap = this.getAttribute("pkt");
        this.isDrawn = false;
    }

    cp.inherits(cp.TypingText, cp.DisplayObject);

    cp.TypingText.prototype.start = function() {
        this.addIfNeeded();
    }

    cp.TypingText.prototype.reset = function(endOfSlide) {
		delete ropMap[this.element.id];
        // release memory
        this.id = "";
        this.positions = "";
        this.srcimage = "";
        this.left = "";
        this.top = "";
        this.isDrawn = false;
    }

    cp.TypingText.prototype.addIfNeeded = function() {

        if (this.isDrawn)
            return;

        var idstring = this.id;
        var uniqueid = 0;
        var lengthsubframes = 1; //this.positions.length;

        for (var i = 0; i < lengthsubframes; i++) {
            var bound = this.positions;
            uniqueid += 1;

            //create the css to be added to head element - TODO - remove this when not needed
            var idstr = '#' + idstring + uniqueid;
            var width = bound[2] + 'px';
            var height = bound[3] + 'px';
            var xpos = -bound[0] + 'px';
            var ypos = -bound[1] + 'px';
            var str = idstr + '{position: absolute; width:' + width + '; height:' + height + '; display:block; background:url(' + this.srcimage + ') ' + xpos + ' ' + ypos + '; }';
            var el = document.getElementsByTagName('style')[0];
            var found = el.innerHTML.indexOf(str) != -1;
            if (found == false) 
				el.appendChild(document.createTextNode(str)); // others

            //create image element and add it to DOM
            var newImg = document.createElement('img');
            newImg.id = idstring + uniqueid;
            newImg.src = 'assets/htmlimages/img_trans.gif';
            newImg.style.left = this.left + 'px';
            newImg.style.top = this.top + 'px';
            newImg.width = 1;
            newImg.height = 1;
            this.element.appendChild(newImg);
        
        }

        this.isDrawn = true;
		if(this.playKeyTap)
		{
			cp.movie.am.playKeyTap();
		}
    }

	cp.mouseStateOver = 1;
	cp.mouseStateOut = 2;
	cp.mouseStateDown = 3;
	cp.mouseStateUp = 4;
	cp.mouseStateTouchStart = 5;
	cp.mouseStateTouchMove = 6;
	cp.mouseStateTouchEnd = 7;
	
	// SHAPE CLASS for DRAWING
	cp.Shape = function(el, args)
	{
		var self = this;
		this.mouseState = cp.mouseStateOut;
		
		function doOnMouseOver()
		{
			self.visible = self.getAttribute("visible");
			self.isDrawn = false;
			self.currImage = self.hoverImage;
			// Hack.
			var oldTransIn = self.transIn;
			var oldModParent = self.modifyParent;
			self.modifyParent = false;
			self.transIn = null;
			self.drawIfNeeded();
			self.transIn = oldTransIn; 
			self.modifyParent = oldModParent;
		}
		
		function doOnMouseOut()
		{
			self.visible = self.getAttribute("visible");
			self.isDrawn = false;
			self.currImage = self.normalImage;
			// Hack.
			var oldTransIn = self.transIn;
			var oldModParent = self.modifyParent;
			self.modifyParent = false;
			self.transIn = null;
			self.drawIfNeeded();
			self.transIn = oldTransIn; 
			self.modifyParent = oldModParent;
		}
			
		function doOnMouseDown()
		{
			self.isDrawn = false;
			self.currImage = self.downImage;
			// Hack.
			var oldTransIn = self.transIn;
			var oldModParent = self.modifyParent;
			self.modifyParent = false;
			self.transIn = null;
			self.drawIfNeeded();
			self.transIn = oldTransIn; 
			self.modifyParent = oldModParent;
		}

		function doOnMouseUp()
		{
			self.isDrawn = false;
			if ( self.hoverImage && cp.device != cp.IDEVICE)
				self.currImage = self.hoverImage;
			else
				self.currImage = self.normalImage;
			// Hack.
			var oldTransIn = self.transIn;
			var oldModParent = self.modifyParent;
			self.modifyParent = false;
			self.transIn = null;
			self.drawIfNeeded();
			self.transIn = oldTransIn; 
			self.modifyParent = oldModParent;
		}
		
		function getMouseHandler( state, handler, check, old_handler )
		{
			var s = state;
			var c = check;
			var old = old_handler;
			return function() {
				if ( self.parentData && undefined != self.parentData.enabled ) {
					if ( ! self.parentData.enabled )
						return; // Don't act on disabled elements.
				}
				if ( old )
					old();
				if ( c && self.mouseState == s )
					return;
				self.mouseState = s;
				handler();
			}
		}

		cp.Shape.baseConstructor.call(this, el);
			
		var shapeRenderer = this.getAttribute("sr");
		if (shapeRenderer)
			this.shape = shapeRenderer;
				
		var bounds = this.getAttribute("b");
		this.bounds = {
				minX: bounds[0],
				minY: bounds[1],			
				maxX: bounds[2],
				maxY: bounds[3]
			};
		var vbounds = this.getAttribute("vb");
		this.vbounds = null;
		if(vbounds)
		{
			this.vbounds = {
				minX: vbounds[0],
				minY: vbounds[1],			
				maxX: vbounds[2],
				maxY: vbounds[3]
			};
		}
		else
			this.vbounds = this.bounds ;
		this.args = args;		
		this.isDrawn = false;
		this.canvas = null;
		this.visible = this.getAttribute("visible");
		if(this.getAttribute("dns"))
			this.divName = this.getAttribute("dns");			
		else
			this.divName = this.getAttribute("dn");
		if(this.getAttribute("tex"))
			this.tex = this.getAttribute("tex");
		else
			this.tex = 0;
		if(this.getAttribute("tey"))
			this.tey = this.getAttribute("tey");
		else
			this.tey = 0;
		this.parentData = cp.model.data[this.divName];
		this.isParentOfTypeSlide = ( undefined == this.parentData.type );
		this.modifyParent = ! this.isParentOfTypeSlide;
		this.transIn = 	this.parentData['trin'];
		this.normalImage = this.getAttribute( "ip" );
		if(!this.normalImage)
		{
			if(cp.device == cp.IDEVICE)
				this.normalImage = this.getAttribute("aip");
		}
		this.currImage = this.normalImage;
		this.isMouse = false;
		if(this.parentData['mp'])
			this.isMouse = true;
		var hoverImg = this.getAttribute( "hImg" );
		var downImg = this.getAttribute( "pImg" );
		var actualParent = document.getElementById(this.divName);
		if(actualParent)
		{
			actualParent.drawingBoard = this.element.parentElement;
			actualParent.bounds = this.bounds;
			actualParent.drawingBoard.bounds = this.vbounds;
		}			
		this.actualParent = actualParent;
		if ( hoverImg ) {
			this.hoverImage = hoverImg;
			if(actualParent)
			{
				actualParent.onmouseover = getMouseHandler( cp.mouseStateOver, doOnMouseOver, false, actualParent.onmouseover );
				actualParent.onmouseout = getMouseHandler( cp.mouseStateOut, doOnMouseOut, false, actualParent.onmouseout );
				if ( cp.device == cp.IDEVICE ) 
					actualParent.ontouchstart = getMouseHandler( cp.mouseStateTouchStart, doOnMouseOver );
				if ( cp.device == cp.IDEVICE ) 
					actualParent.ontouchend = getMouseHandler( cp.mouseStateTouchEnd, doOnMouseOut );
				if ( downImg ) {
					this.downImage = downImg;
					actualParent.onmousedown = getMouseHandler( cp.mouseStateDown, doOnMouseDown );
					actualParent.onmouseup = getMouseHandler( cp.mouseStateUp, doOnMouseUp );
					if ( cp.device == cp.IDEVICE ) 
						actualParent.ontouchmove = getMouseHandler( cp.mouseStateTouchMove, doOnMouseDown, true );
				}
			}
		}
		this.tr = this.getAttribute("tr");
		this.sh = this.getAttribute("sh");
		this.re = this.getAttribute("re");
	}
	
	cp.inherits(cp.Shape, cp.DisplayObject);
	
	cp.Shape.prototype.start = function()
	{
		this.drawIfNeeded();
	}
	
	cp.Shape.prototype.reset = function(endOfSlide)
	{
		delete ropMap[this.element.id];
		// release memory
		this.canvas = null;
		this.isDrawn = false;
		this.element.width = "0";
		this.element.height = "0";
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = "0";
		this.element.top = "0";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
	
	cp.Shape.prototype.drawIfNeeded = function()
	{
		if (this.isDrawn)
			return;
	
		var itemName = this.getAttribute('dn');
		var itemData = cp.model.data[itemName];
		
		var bounds = this.bounds;
		var canvasWidth = - bounds.minX + bounds.maxX;
		var canvasHeight = - bounds.minY + bounds.maxY;
		if(canvasWidth == 0 || canvasHeight == 0)
		{
			this.isDrawn = true;
			return;
		}
		if(this.args)
		{
			canvasWidth += Number(this.args[1])+Number(this.args[2]);
			canvasHeight += Number(this.args[1])+Number(this.args[3]);
		}
		
		var lType = itemData['type'];
		var canvas;
		if(lType == cp.kCPOTClickBoxItem)
			cp.log("Drawing ClickBox Canvas");
		if(lType == cp.kCPOTClickBoxItem)
			canvas = this.canvas = cp.createCanvas(bounds.minX, bounds.minY, 0, 0, this.element);
		else
			canvas = this.canvas = cp.createCanvas(bounds.minX, bounds.minY, Math.ceil(canvasWidth), Math.ceil(canvasHeight), this.element);
		var gc = canvas.gc;
		
		this.element.style.left = bounds.minX + "px";
		this.element.style.top = bounds.minY + "px";
		this.element.style.width = bounds.maxX - bounds.minX + "px";
		this.element.style.height = bounds.maxY - bounds.minY + "px";
		
		var lHasShadowOrReflection = false;
		lHasShadowOrReflection = this.re || (this.sh && !this.sh.i);
		
		var lHasTransform = this.tr != undefined;
		
		var imagePath = this.currImage;
		var modifyParent = this.modifyParent && ! this.isParentOfTypeSlide;
		
		gc.save();
		if(!this.isMouse)
		{
			var styleLeft = bounds.minX ;
			var styleTop = bounds.minY;
			var styleWidth = bounds.maxX - bounds.minX;
			var styleHeight = bounds.maxY - bounds.minY;
			var actualParent = this.actualParent;
			if(actualParent)
			{
				if ( modifyParent ) {
					actualParent.style.left = styleLeft + (actualParent.effectX!=undefined ? actualParent.effectX : 0) + "px";
					actualParent.style.top = styleTop + (actualParent.effectY!=undefined ? actualParent.effectY : 0) + "px";
					actualParent.style.width = styleWidth + "px";
					actualParent.style.height = styleHeight + "px";
				}
				var rotateAngle = 0;
				
				if(this.tr)
				{
					if ( modifyParent ) {
						applyTransform( actualParent,this.tr);					
						actualParent.tr = this.tr;
					}
					rotateAngle = getAngleFromRotateStr(this.tr);
				}
				this.element.style.display = "block";
				this.element.style.position = "absolute";
				if ( modifyParent ) { 
					actualParent.rotateAngle = rotateAngle;
					cp.movie.stage.addToParentChildMap(actualParent.id,this.element.id);
					this.element.parentElement.style.left = this.vbounds.minX + (this.element.parentElement.effectX!=undefined ? this.element.parentElement.effectX : 0) + "px";
					this.element.parentElement.style.top = this.vbounds.minY + (this.element.parentElement.effectY!=undefined ? this.element.parentElement.effectY : 0) + "px";
					this.element.parentElement.style.width = (this.vbounds.maxX - this.vbounds.minX) + "px";
					this.element.parentElement.style.height = (this.vbounds.maxY - this.vbounds.minY) + "px";
					if(this.re)
						this.element.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";				
				}
			}
			this.init = true;
			this.element.originalParent = actualParent;
			styleLeft 	= (0 < this.vbounds.minX) && lHasShadowOrReflection ? 0 : this.vbounds.minX;
			styleTop	= (0 < this.vbounds.minY) && lHasShadowOrReflection ? 0 : this.vbounds.minY;
			var styleRight 	= lHasShadowOrReflection && (cp.model.data.project.w > this.vbounds.maxX) ? cp.model.data.project.w : this.vbounds.maxX;
			var styleBottom	= lHasShadowOrReflection && (cp.model.data.project.h > this.vbounds.maxY) ? cp.model.data.project.h : this.vbounds.maxY;
			styleWidth	= styleRight - styleLeft;
			styleHeight	= styleBottom - styleTop;
			if(lType == cp.kCPOTClickBoxItem)
				canvas = this.canvas = cp.createCanvas(0, 0, 0, 0, this.element);
			else
			{
				var lCanvasLeft = (itemData.st != undefined) ? styleLeft : 0;
				var lCanvasTop = (itemData.st != undefined) ? styleTop : 0;
				canvas = this.canvas = cp.createCanvas(lCanvasLeft, lCanvasTop, styleWidth, styleHeight,this.element);
			}
			this.element.style.display = "block";
			this.element.style.position = "absolute";
			if ( ! this.isParentOfTypeSlide ) {
				this.element.style.marginLeft = (styleLeft-this.vbounds.minX) + "px";
				this.element.style.marginTop = (styleTop-this.vbounds.minY) + "px";
			}
			if(this.sh && !this.sh.i)
			{
				gc.shadowOffsetX = this.sh.d*Math.cos((Math.PI*this.sh.a)/180);
				gc.shadowOffsetY = this.sh.d*Math.sin((Math.PI*this.sh.a)/180);
				gc.shadowBlur = this.sh.b;
				gc.shadowColor = ConvertRGBToRGBA(this.sh.c,this.sh.o );	
			}
			var rotateAngle = 0;
			if(this.tr)
				rotateAngle = getAngleFromRotateStr(this.tr);
			
			var transX = 0;
			var transY = 0;
			if(lHasShadowOrReflection)
			{
				transX = (styleLeft < 0) ? -styleLeft : 0;
				transY = (styleTop < 0) ? -styleTop : 0;
			gc.setTransform(1,0,0,1,transX,transY);
			gc.translate((bounds.minX + bounds.maxX)/2,(bounds.minY + bounds.maxY)/2);
			}			
			else if(lHasTransform)
			{
				gc.translate(styleWidth/2,styleHeight/2);
			}
			gc.rotate((Math.PI*rotateAngle)/180);
			gc.tex = this.tex;
			gc.tey = this.tey;
			gc.centreImage = true;
			gc.width = styleWidth;
			gc.height = styleHeight;
			
		}
		if (this.shape)
		{
			try {
				var objectToBeHidden = this.getAttribute("objectToBeHidden");
				if (this.shape(gc,imagePath,objectToBeHidden,this.visible,this.divName,lHasShadowOrReflection,lHasTransform) || (lType == cp.kCPOTClickBoxItem))
					this.isDrawn = true;
			}
			catch(e)
			{
				//console.error(e);
			}
		}
		gc.restore();
		
		

		var isQuizButton = itemData['iqb'];
		if(cp.movie.playbackController)
		{	
			var lQuizController = cp.movie.playbackController.GetQuizController();	
			if(lQuizController)
			{
				var isInReviewMode = lQuizController.GetIsInReviewMode();
				if(isQuizButton && (isInReviewMode == true))
				{
					var type = itemData['qbt'];
					switch(type)
					{
						case 'submit':
						case 'submitAll':
						case 'clear':						
							this.element.style.visibility = 'hidden';
							this.element.tabIndex = -1;
							break;
						case 'skip':break;
						case 'back':break;							
						default: break;
					}
				}
			}
		}
		
		gc = null;
		canvas = null;
		if(this.transIn)
			this.element.parentElement.style.opacity = 0;
		if(!this.visible)
			cp.hide( this.divName );
	}
	
	cp.Shape.prototype.playPath = function(path)
	{
		var l = path.length;
		var c = 0; 
		var gc = this.canvas.gc;
		gc.beginPath();
		while(c < l)
			switch(path[c++])
			{
				case 'M': gc.moveTo(path[c++], path[c++]);break;
				case 'L': gc.lineTo(path[c++], path[c++]);break;
				case 'Z': gc.closePath();break;
				case 'Q': gc.quadraticCurveTo(path[c++],path[c++],path[c++],path[c++]);break;
				case 'C': gc.bezierCurveTo(path[c++],path[c++],path[c++],path[c++],path[c++],path[c++]);
			}		
	}
	
	// Mouse click drawing class.
	cp.MouseClick = function(el, args)
	{
		cp.MouseClick.baseConstructor.call(this, el, args);
		this.data = this.getAttribute("data");
	}
	
	cp.inherits(cp.MouseClick, cp.Shape);
		
	cp.MouseClick.prototype.drawIfNeeded = function()
	{
		if (this.isDrawn)
			return;
	
		var bounds = this.bounds;
		var canvasWidth = - bounds.minX + bounds.maxX;
		var canvasHeight = - bounds.minY + bounds.maxY;
		
		var canvas = this.canvas = cp.createCanvas(bounds.minX, bounds.minY, Math.ceil(canvasWidth), Math.ceil(canvasHeight), this.element);
		var gc = canvas.gc;
		
		gc.save();
		
		this.element.style.left = bounds.minX + "px";
		this.element.style.top = bounds.minY + "px";
		this.element.style.width = bounds.maxX - bounds.minX + "px";
		this.element.style.height = bounds.maxY - bounds.minY + "px";
		
		if (this.shape)
		{
			try {
				var objectToBeHidden = this.getAttribute("objectToBeHidden");
				if (this.shape(gc, this.data, objectToBeHidden, this.visible, this.divName ))
					this.isDrawn = true;
			}
			catch(e)
			{
				//console.error(e);
			}
		}
		gc.restore();		
	
		gc = null;
		canvas = null;
	}
	
	// FRAMESET OR ANY CP OBJECT...
	cp.FrameSet = function(el, children)
	{
		function getKeyHandler(handler, shortcut, obj, objc, from, to)
		{
			var cachedObj = obj;
			var cachedObjc = objc;
			var cpShortcut = new cp.Shortcut(shortcut.k, 
				(shortcut.c ? true : false), 
				(shortcut.s ? true : false),
				(shortcut.a ? true : false));
			function kHandler(isCorrectKey)
			{
				return handler(cachedObj, cachedObjc, isCorrectKey);
			}
            var name = '';
            if (obj.eh != undefined)
                name = objc.dn;
			return new cp.KeyHandler(kHandler, cpShortcut, from, to,name);
		}
		
		cp.FrameSet.baseConstructor.call(this, el);
		this.children = children;
		
		this.from = this.getAttribute("from");
		this.to = this.getAttribute("to");
		this.afrom = this.getAttribute("afrom"); // Needed for mouse. Will not be available elsewhere.
		this.ato = this.getAttribute("ato"); // Needed for mouse. Will not be available elsewhere.

		this.transIn = this.getAttribute("trin");
		if(!this.transIn)
			this.transIn = 0;
		this.transOut = this.getAttribute("trout"); 
		if(!this.transOut)
			this.transOut = 0;
		if(this.element.drawingBoard)
		{
			if(this.transIn > 0)
				this.element.drawingBoard.style.opacity = 0;
			else
				this.element.drawingBoard.style.opacity = 1;
		}	
		var cpMotionPath = this.getAttribute("mp");
		if (cpMotionPath == 'mouse')
		{
			this.motionPathMover = cp.movie.mousePath;
			this.motionPathArgs = this.getAttribute("mpa");
		}
		
		this.type = this.getAttribute("type");
		this.itemData = cp.model.data[this.element.id];
		this.itemCanvasData = null;
		if ( this.itemData && this.itemData.mdi )
			this.itemCanvasData = cp.model.data[ this.itemData.mdi ];
		this.itemData.runningEffects = [];
		this.itemData.ranEffectsX = 0;
		this.itemData.ranEffectsY = 0;
		if (!(cp.kCPOTSuccessCaptionItem == this.type ||
			cp.kCPOTFailureCaptionItem == this.type ||
			cp.kCPOTHintCaptionItem == this.type ))
		{
		this.effectObj = this.getAttribute("ef");
		if(this.effectObj && this.effectObj['ef'+this.effectObj.id])
			this.itemData.runningEffects.push(this.effectObj.id);
		}
		if (cp.kCPOTIncompleteFeedbackItem == this.type ||
			cp.kCPOTStageCorrectFeedback == this.type ||
			cp.kCPOTStageIncorrectFeedback == this.type ||
			cp.kCPOTStagePartialCorrectFeedback == this.type ||
			cp.kCPOTTimeoutFeedbackItem == this.type ||
			cp.kCPOTRetryFeedbackItem == this.type)
		{
			this.itemData.runningEffects = [];
		}
		
		this.pa = this.getAttribute("pa");
		this.alwaysPause = this.getAttribute("cpa");
		var psv = this.getAttribute("psv");
		if(psv)
			this.psv = psv;
			
		if (undefined != this.pa) {
			this.element.style["WebkitTapHighlightColor"] = "rgba(0,0,0,0.3)";
			this.setAttribute('handled', false);
			this.setAttribute('clickedOnce', false);
			this.setAttribute('currentAttempt', 0); // re-initialize.
			this.setAttribute('actionInProgress', false);
			var lIsQuizButton = ((this.getAttribute("iqb") != undefined) && this.getAttribute("iqb"));
			if(lIsQuizButton)
			{
				var slideName = this.getAttribute("sn");
				var parentSlideData = cp.model.data[slideName];
				var questions = parentSlideData['qs'];
				var questionObj;
				if(questions && (questions.indexOf(",") == -1))
					questionObj = getQuestionObject(questions);
				var buttonType = this.getAttribute("qbt");
				var lClickHandler = this.getAttribute("chfn");
				this.element.style.cursor = "pointer";
				this.element.onclick = function(e){  
													if(e.stopPropagation)
													{
														e.stopPropagation(); 
													}
													lClickHandler(e.target);
												};
				if(buttonType)
				{
					switch(buttonType)
					{
						case "submit": questionObj.registerSubmitButton(this.element);break;
						case "back": questionObj.registerBackButton(this.element);break;
						case "skip": questionObj.registerSkipButton(this.element);break;
						case "clear": questionObj.registerClearButton(this.element);break;
						case "submitAll": questionObj.registerSubmitAllButton(this.element);break;
						default:break;
					}
				}
			}
			this.dependents = this.getAttribute( "dep" );
			// Do special handling for rest of project for autoshape button.
			if ( cp.kCPOTAutoShape == this.type && 1 == this.getAttribute( 'rp' ) ) {
				// Need to ensure that they pause once on each slide.
				// Get current slide. If start of slide is > pause time, means it's on later slide, set special flag.
				var currSlide = cp.movie.stage.currentSlide;
				if ( currSlide && currSlide.from > this.pa ) {
					this.rp_pa = currSlide.from + this.pa - this.from;
				}
			}
		}
		this.htmlDependents = [];
		if(undefined != this.psv)
		{
			this.setAttribute('pausedOnce', false);
		}
		
		var cpOnShowFn = this.getAttribute("onShow");
		if (cpOnShowFn)	
			this.onShow = window[cpOnShowFn];
		this.keyHandler = this.getAttribute("kh");
		if (this.keyHandler) {
			this.keyShortcut = this.getAttribute("sc");
			if (this.keyShortcut) {
				var keyHandler = getKeyHandler( this.keyHandler, this.keyShortcut, cp.model.data[this.element.id], 
					cp.model.data[this.element.id + 'c'], this.from, this.to);
				if (keyHandler) 
					cp.movie.stage.addKeyHandler(keyHandler);
			}
		}
		
        //add enter and return key handlers
		if ( ! this.keyHandler ) { // No point in having 2 key handlers.
			this.keyHandler = this.getAttribute("eh");
			if (this.keyHandler) {						
				var keyHandler = getKeyHandler( this.keyHandler, '', cp.model.data[this.element.id], 
					cp.model.data[this.element.id + 'c'], this.from, this.to);
				if (keyHandler) 
					cp.movie.stage.addKeyHandler(keyHandler);			
			}
		}
		
		this.isStarted = false;
		if ( cp.kCPOTClickBoxItem == this.type || cp.kCPOTScorableButtonItem == this.type || cp.kCPOTAutoShape == this.type ) {
			// Do checks for right click or double click.
			this.dblClick = this.getAttribute( "dclk" );
			if ( this.dblClick ) {
				cp.movie.stage.getClickManager().addDoubleClick( cp.model.data[this.element.id], 
					cp.model.data[this.element.id + 'c'], this.element );
			}
			else if ( cp.kCPOTClickBoxItem == this.type ) {
				this.rightClick = this.getAttribute( "rclk" );
				if ( this.rightClick ) {
					cp.movie.stage.getClickManager().addRightClick( cp.model.data[this.element.id], 
						cp.model.data[this.element.id + 'c'], this.element );
				}
			}
		}
		if ( cp.kCPOTTextEntryButtonItem == this.type ) {
			this.parentId = this.getAttribute( 'vid' );
			if ( this.parentId ) 
				cp.movie.stage.addToParentChildMap( this.parentId, this.element.id );
		}
		
		// For IE9, add white background with full opacity. This is needed for making the div respond to mouse events.
		if ( cp.MSIE == cp.browser ) {
			switch ( this.type ) {
			case cp.kCPOTStageQuestionNextButton:
			case cp.kCPOTStageQuestionClearButton:
			case cp.kCPOTStageQuestionBackButton:
			case cp.kCPOTStageQuestionSubmitButton:
			case cp.kCPOTScoringResultItem:
			case cp.kCPOTScoringReviewButton:
			case cp.kCPOTScoringContinueButton:
			case cp.kCPOTClickBoxItem:
			case cp.kCPOTScorableButtonItem:
			case cp.kCPOTAutoShape:
			case cp.kCPOTTextEntryButtonItem:
			case cp.kCPOTRetakeButton:
			case cp.kCPOTSubmitAllButton:
				el.style.backgroundColor = '#FFFFFF';
				el.style.opacity = 0;
				break;
			default:
				break;
			}
		}
	}
	
	cp.inherits(cp.FrameSet, cp.DisplayObject);
	
	cp.FrameSet.prototype.isInRange = function(frame)
	{
		if (this.from == 0 && this.to == 0)
			return true;
		if (cp.kCPOTSuccessCaptionItem == this.type ||
			cp.kCPOTFailureCaptionItem == this.type ||
			cp.kCPOTHintCaptionItem == this.type )
			return true;

		return (this.from <= frame) && (this.to >= frame);
	}
	
	cp.FrameSet.prototype.updateOpacity = function()
	{
		if(this.element.drawingBoard)
		{
			var areFeedbackCaptions = (cp.kCPOTSuccessCaptionItem == this.type ||
				cp.kCPOTFailureCaptionItem == this.type ||
				cp.kCPOTHintCaptionItem == this.type );
				
			if(!areFeedbackCaptions)
			{
				var currentRelativeFrame = cpInfoCurrentFrame - this.from + 1;
				var currentRelativeFrameFromEnd = this.to - cpInfoCurrentFrame;
				if(currentRelativeFrame<=this.transIn)
					this.element.drawingBoard.style.opacity = (currentRelativeFrame)/this.transIn;
				else if(currentRelativeFrame>this.to - this.from - this.transOut)
					this.element.drawingBoard.style.opacity = (currentRelativeFrameFromEnd)/this.transOut;
				else
					this.element.drawingBoard.style.opacity = 1;
			}
		}
	}
	
	cp.FrameSet.prototype.updateFrame = function(reason)
	{
		this.updateOpacity();
		
		cp.FrameSet.superClass.updateFrame.call(this);

		var areFeedbackCaptions = (cp.kCPOTSuccessCaptionItem == this.type ||
			cp.kCPOTFailureCaptionItem == this.type ||
			cp.kCPOTHintCaptionItem == this.type );

		if ( ! areFeedbackCaptions )
			this.applyEffects();
		if(reason == cp.Timeline.ReasonForUpdate.JUMP)
			this.setAttribute('clickedOnce', false);
	}
	
	cp.FrameSet.prototype.start = function()
	{
		var i = 0;
		this.isStarted = true;
		this.element.style.display = "block";
		if (undefined != this.pa) {
			if(null != cp.movie.stage.currentSlide) {
				var doSet = -1 != this.pa;
				if ( ! doSet ) {
					// Check for interactive objects.
					doSet = cp.kCPOTClickBoxItem == this.type || cp.kCPOTScorableButtonItem == this.type || 
						cp.kCPOTAutoShape == this.type || cp.kCPOTTextEntryBoxItem == this.type;
				}
				if ( doSet )
					cp.movie.stage.currentSlide.topMostObjectInteractiveObject = this.element.id;
			}
		}
		cp.FrameSet.superClass.start.call(this);
		if ( this.itemCanvasData && 1 == this.itemCanvasData.visible ) { // actual visible guy.
			for ( i = 0; i < this.htmlDependents.length; ++i ) 
				this.htmlDependents[ i ].style.visibility = 'visible';	
		}
		
		this.updateOpacity();
		this.applyEffects();
		if (this.onShow)
		{
			try {
				this.onShow.call(this.timeline);
			} catch (e) {
				//console.error(e);
			}
		}
	}
	
	cp.FrameSet.prototype.applyEffects = function()
	{
		if(!this.effectObj)
			return;
		if(!this.itemData)
			return;
		if(!this.itemData.runningEffects)
			return;
		if(!this.itemData.runningEffects.length)
			return;
		var xOffset = 0;
		var yOffset = 0;
		var multiEffects = this.itemData.runningEffects.length > 1 ? true : false;
		for(var index=0;index < this.itemData.runningEffects.length; ++index)
		{
			var efId = 'ef'+this.itemData.runningEffects[index];
			var effectData = this.effectObj[efId];
			if(!effectData)
				continue;
			for(var i=0;i < effectData.length; ++i)
			{ 
				var effect = effectData[i];
				if(!effect)
					continue;
					
				var from;
				if(this.itemData.rp)
					from = cp.movie.stage.cStart;
				else
					from = this.from;
				var relFrame = (cpInfoCurrentFrame - from);
				if(effectData.offsetFrame)
					relFrame -= effectData.offsetFrame;
				if(effectData.startFrame!=undefined)
				{
					relFrame = effectData.startFrame;
					++effectData.startFrame;
				}
				if(index != this.itemData.runningEffects.length - 1 && multiEffects)
					relFrame = effectData.currentFrame;
				
				if(effect.sf-1 > relFrame || effect.sf - 1 + effect.du <= relFrame)
				{
					effect.ci = -1;
					if(effectData.offsetFrame)
					{
						effectData.offsetFrame = null;
						effectData.startFrame = null;
						this.itemData.runningEffects.splice(index,1);
						--index;
						this.itemData.ranEffectsX += effect.kf[effect.kf.length-1].x;
						this.itemData.ranEffectsY += effect.kf[effect.kf.length-1].y;
					}
					else
						effectData.currentFrame = relFrame;
					if(effect.sf - 1 + effect.du <= relFrame)
					{
						xOffset += effect.kf[effect.kf.length-1].x;
						yOffset += effect.kf[effect.kf.length-1].y;
					}
					continue;
				}
				var curKeyFrameData;
				relFrame -= effect.sf - 1;
				for(var j=0;j < effect.kf.length-1; ++j)
				{
					if(effect.kf[j].f <= relFrame && effect.kf[j+1].f > relFrame)
					{
						effect.ci= j;
						break;
					}
				}
				if(effect.ci==-1)
					continue;
				else if(effect.ci==effect.kf.length)
				{
					xOffset += effect.kf[effect.kf.length-1].x;
					yOffset += effect.kf[effect.kf.length-1].y;
					alphaOffset = effect.fo/100;
					continue;
				}
				curKeyFrameData = effect.kf[effect.ci];
				var initialopacity = effect.io;
				var finalopacity = effect.fo;
				var nxtKeyFrameData = effect.kf[effect.ci+1];
				var relEffectFrame = (relFrame - curKeyFrameData.f);
				var ease = effect.ease < 0 ? (-effect.ease/100 + 1) : (1 - effect.ease/200);
					
				xOffset += curKeyFrameData.x + (nxtKeyFrameData.x - curKeyFrameData.x)*Math.pow(relEffectFrame/(nxtKeyFrameData.f - curKeyFrameData.f),ease);
				yOffset += curKeyFrameData.y + (nxtKeyFrameData.y - curKeyFrameData.y)*Math.pow(relEffectFrame/(nxtKeyFrameData.f - curKeyFrameData.f),ease);
				if(index != this.itemData.runningEffects.length - 1)
					continue;
					
				effectData.currentFrame = relFrame;
				
				var	alphaOffset = (initialopacity + (finalopacity - initialopacity)*relFrame/effect.du)/100;
				alphaOffset = alphaOffset < 0 ? 0 : alphaOffset;
				alphaOffset = alphaOffset > 1 ? 1 : alphaOffset;
				
				if(this.element.drawingBoard)
				{
					this.element.drawingBoard.style.opacity = alphaOffset + '';
				}
			}
		}
		this.applyEffectData(xOffset,yOffset);
	}
	
	cp.FrameSet.prototype.applyEffectData = function(xOffset,yOffset)
	{
		xOffset+=this.itemData.ranEffectsX;
		yOffset+=this.itemData.ranEffectsY;
		var matrixStr = 'translate('+xOffset+'px,'+yOffset+'px)';
		applyTransform(this.element,this.element.tr ? matrixStr+' '+this.element.tr : matrixStr);
		this.element.effectY = yOffset;
		this.element.effectX = xOffset;
		if(this.element.drawingBoard)
		{
			applyTransform(this.element.drawingBoard,matrixStr);
			this.element.drawingBoard.effectY = yOffset;
			this.element.drawingBoard.effectX = xOffset;
		}
	}
	cp.FrameSet.prototype.reset = function(endOfSlide)
	{
		var i = 0;
		delete ropMap[this.element.id];
		cp.FrameSet.superClass.reset.call(this, endOfSlide);
		this.isStarted = false;
		this.itemData.runningEffects = [];
		this.itemData.ranEffectsX = 0;
		this.itemData.ranEffectsY = 0;
		this.applyEffectData(0,0);
		if(this.effectObj && this.effectObj['ef'+this.effectObj.id])
			this.itemData.runningEffects.push(this.effectObj.id);
		if ((cp.kCPOTIncompleteFeedbackItem == this.type ||
			cp.kCPOTStageCorrectFeedback == this.type ||
			cp.kCPOTStageIncorrectFeedback == this.type ||
			cp.kCPOTStagePartialCorrectFeedback == this.type ||
			cp.kCPOTTimeoutFeedbackItem == this.type ||
			cp.kCPOTRetryFeedbackItem == this.type) && this.effectObj )
		{
			this.itemData.runningEffects = [];
		}
		this.element.style.display = "none";
		if (undefined != this.pa) {
			this.setAttribute('handled', false);
			this.setAttribute('clickedOnce', false);
			if (undefined != this.dependents) {
				// Hide each of them.
				for ( i = 0; i < this.dependents.length; ++i )
					cp.hide( this.dependents[ i ] );
			}
		}
		for ( i = 0; i < this.htmlDependents.length; ++i ) 
			this.htmlDependents[ i ].style.visibility = 'hidden';
		
		if( undefined != this.psv )
		{
			this.setAttribute('pausedOnce', false);
		}
		if(this.element.drawingBoard)
			this.element.drawingBoard.style.opacity = 0;
	}
	
	cp.FrameSet.prototype.ApplyMotion = function(frame)
	{
		
		if(this.motionPathMover == null)
			return;
		try 
		{
			this.motionPathMover(this, frame);
		}
		catch(e)
		{
			//console.error(e);
		}	
		
	}	
	
	cp.FrameSet.prototype.handleRewind = function()
	{
		// For the moment set handle only handled property.
		if (undefined != this.pa) {
			this.setAttribute('handled', false);
			this.setAttribute('clickedOnce', false);
		}
		if(undefined != this.psv)
		{
			this.setAttribute('pausedOnce', false);
		}
		
		if ( undefined != this.type && cp.kCPOTWidgetItem == this.type && ! this.itemData.rp ) {
			if ( 1 == this.children.length )
				this.reset(); // Do reset for widgets.
		}
	}
	
	cp.FrameSet.prototype.onEndOfSlide = function(reason)
	{
		var doReset = this.isStarted && !this.isInRange(cpInfoCurrentFrame);
		if ( ! doReset ) {
			var alwaysReset = (cp.kCPOTSuccessCaptionItem == this.type ||
				cp.kCPOTFailureCaptionItem == this.type ||
				cp.kCPOTHintCaptionItem == this.type || 
				cp.kCPOTAutoShape == this.type );
			doReset = alwaysReset; // Always reset feedback captions. They don't get started always and cause special problems otherwise.
			// And also auto shape, since they add handlers. Ideally we could have left out non button auto shapes but anyway..
			// Also reset widgets, if they are not rest of project.
			if ( ! doReset ) {
				if ( this.type == cp.kCPOTWidgetItem && ! this.itemData.rp )
					doReset = true;
			}
		}
		if ( doReset )
			this.reset(reason == cp.Timeline.ReasonForUpdate.PROGRESS);
	}
	
	//IDEVICE specific class
	cp.VideoFrameSet = function(el, children)
	{
		//start() does the "real" construction
		this.suppliedElement = el;
		this.children = children;
		this.element = el;
		this.from = this.getAttribute("from");
		this.to = this.getAttribute("to");
		this.type = this.getAttribute("type");
		this.itemData = cp.model.data[this.element.id];
		this.pa = this.getAttribute("pa");
		var psv = this.getAttribute("psv");
		if(psv)
			this.psv = psv;
			
		if (undefined != this.pa)
			this.setAttribute('pausedOnce', false);
		if(undefined != this.psv)
			this.setAttribute('pausedOnce', false);
		this.isStarted = false;
	}
	
	cp.inherits(cp.VideoFrameSet, cp.FrameSet);
	
	cp.VideoFrameSet.prototype.start = function()
	{
		if(cp.movie.stage.VideoPlaying)
			return;
			
		var elem = cp.movie.stage.VideoElement;
		if(!elem)
		{
			elem = this.suppliedElement;
			cp.movie.stage.VideoElement = elem;
		}
		cp.VideoFrameSet.baseConstructor.call(this, elem, this.children);
		cp.VideoFrameSet.superClass.start.call(this);
	}
	
	cp.VideoFrameSet.prototype.reset = function(endOfSlide)
	{
		var suppliedElement = this.suppliedElement;
		if(suppliedElement == this.element)
			suppliedElement = null;
		cp.VideoFrameSet.superClass.reset.call(this, endOfSlide);
		if(suppliedElement)
		{
			suppliedElement.style.display = 'none';
			//if(suppliedElement.drawingBoard)
				//suppliedElement.drawingBoard.style.opacity = 0;
		}
	}
	
	cp.VideoFrameSet.prototype.getAttribute = function(name)
	{
		var x = cp.model.data[this.suppliedElement.id];
		if (!x) 
			return null;
		return x[name];
	}
	
	cp.VideoFrameSet.prototype.setAttribute = function(name, value)
	{
		var x = cp.model.data[this.suppliedElement.id];
		if (x) 
			x[name] = value;
	}

	cp.FeedbackType = {
		SUCCESS: 0,
		FAILURE: 1,
		HINT: 2,
		OTHER: 3
	};

	cp.FeedbackCloseReason = {
		SHOW_SUCCESS: 1,
		SHOW_FAILURE: 2,
		SHOW_HINT: 3,
		SLIDE_CHANGE:4,
		OTHER: 5
	};
	
	cp.Feedback = function(itemName, endAction, pause, feedbackType, actionObj)
	{
		this.currentFrame = 0;
		this.startFrame = 0;
		this.lastFrame = 0;
		this.itemName = itemName;
		this.endAction = endAction;
		this.parentSlide = cp.movie.stage.currentSlide;
		this.element = document.getElementById(itemName);
		this.item = cp.model.data[itemName];
		this.type = cp.FeedbackType.OTHER;
		if ( undefined != feedbackType ) {
			switch ( feedbackType ) {
			case cp.FeedbackType.SUCCESS:
			case cp.FeedbackType.FAILURE:
			case cp.FeedbackType.HINT:
				this.type = feedbackType;
				break;
			default:
				break;
			}
		}
		this.actionObj = actionObj;
		if ( cp.FeedbackType.SUCCESS == this.type && this.actionObj )
			this.actionObj.actionInProgress = true;
		
		if(this.item)
		{
			this.transIn = this.item.trin;
			this.effectObj = this.item.ef;
		}
		if(!this.transIn)
			this.transIn = 0;
		this.drawingBoard = null;
		if(this.element&&this.element.drawingBoard)
		{
			this.element.drawingBoard.style.opacity = 0;
			this.drawingBoard = this.element.drawingBoard;
		}
		if(this.item)
			this.transOut = this.item.trout;
		if(!this.transOut)
			this.transOut = 0;
		this.pause = pause;
		this.onMouse = false;
		if (this.item && this.item.to && this.item.from) 
			this.lastFrame = this.item.to - this.item.from;
		if (this.item && undefined != this.item.du)
			this.lastFrame = this.item.du;
	}
	
	cp.Feedback.prototype = 
	{
		update: function()
		{
			this.currentFrame++;
			if (this.currentFrame > this.lastFrame) {
				cp.movie.stage.RemoveFeedback(this);
				this.hide();
				if (this.endAction)
					cp.movie.executeAction(this.endAction);
			}
			if(this.effectObj)
			{
				var effectData = this.effectObj['ef'+this.effectObj.id];
				if (effectData && effectData.length) {
					for(var i=0;i < effectData.length; ++i)
					{ 
						var effect = effectData[i];
						var relFrame = this.currentFrame;
						
						if(effect.sf-1 > relFrame || effect.sf - 1 + effect.du <= relFrame)
						{
							effect.ci = -1;
							continue;
						}
						var curKeyFrameData;
						relFrame -= effect.sf - 1;
						for(var j=0;j < effect.kf.length-1; ++j)
						{
							if(effect.kf[j].f <= relFrame && effect.kf[j+1].f > relFrame)
							{
								effect.ci= j;
								break;
							}
						}
						curKeyFrameData = effect.kf[effect.ci];
						var initialopacity = effect.io;
						var finalopacity = effect.fo;
						var nxtKeyFrameData = effect.kf[effect.ci+1];
						var relEffectFrame = (relFrame - curKeyFrameData.f);
						var ease = effect.ease < 0 ? (-effect.ease/100 + 1) : (1 - effect.ease/200);
							
						var xOffset = curKeyFrameData.x + (nxtKeyFrameData.x - curKeyFrameData.x)*Math.pow(relEffectFrame/(nxtKeyFrameData.f - curKeyFrameData.f),ease);
						var yOffset = curKeyFrameData.y + (nxtKeyFrameData.y - curKeyFrameData.y)*Math.pow(relEffectFrame/(nxtKeyFrameData.f - curKeyFrameData.f),ease);
						
						var	alphaOffset = (initialopacity + (finalopacity - initialopacity)*relFrame/effect.du)/100;
						alphaOffset = alphaOffset < 0 ? 0 : alphaOffset;
						alphaOffset = alphaOffset > 1 ? 1 : alphaOffset;
						this.element.style.left = this.element.bounds.minX + xOffset + 'px';
						this.element.style.top = this.element.bounds.minY + yOffset + 'px';
						this.element.effectY = yOffset;
						this.element.effectX = xOffset;
						if(this.element.drawingBoard)
						{
							this.element.drawingBoard.style.left = this.element.drawingBoard.bounds.minX + xOffset + 'px';
							this.element.drawingBoard.style.top = this.element.drawingBoard.bounds.minY + yOffset + 'px';
							this.element.drawingBoard.effectY = yOffset;
							this.element.drawingBoard.effectX = xOffset;
							this.element.drawingBoard.style.opacity = alphaOffset + '';
						}
					}
				}
			}
			if(this.drawingBoard)
			{
				var lUseWebkitAnimation = cp.canUseWebkitAnimations() && !(cp.FeedbackType.HINT == this.type);
				var currentRelativeFrame = this.currentFrame;
				var currentRelativeFrameFromEnd = this.lastFrame - this.currentFrame;
				if(currentRelativeFrame<this.transIn)
				{
					if(!lUseWebkitAnimation)
					{
						if(cp.device != cp.DESKTOP) //for the devices with webkit version lower than expected, no animation will be shown.
							this.drawingBoard.style.opacity = 1;
						else
							this.drawingBoard.style.opacity = (currentRelativeFrame)/this.transIn;
					}					
				}
				else
				{
					if(!lUseWebkitAnimation)
					{	
						if(cp.device != cp.DESKTOP) //for the devices with webkit version lower than expected, no animation will be shown.
						{							
							this.drawingBoard.style.opacity = 1;
						}
						else
						{
							if(currentRelativeFrame>this.lastFrame - this.transOut)
							{
								this.drawingBoard.style.opacity = (currentRelativeFrameFromEnd)/this.transOut;
							}
							else
							{
								this.drawingBoard.style.opacity = 1;
							}
						}
					}
					if(this.onMouse)
						this.currentFrame = this.lastFrame - this.transOut - 1;				
				}
			}
		},
		onRollover : function()
		{
			this.onMouse = true;
			this.currentFrame = 0;
			this.show();
		},
		onRollout : function()
		{
			this.onMouse = false;
			this.currentFrame = this.lastFrame - this.transOut;
		},
		
		show: function()
		{
			if(this.drawingBoard)
			{
				if(cp.canUseWebkitAnimations() && !(cp.FeedbackType.HINT == this.type))
				{
					if(cp.verbose)
						cp.log("Using Webkit animation");
					this.drawingBoard.style.webkitAnimationName = 'fadeinfadeout';
					this.drawingBoard.style.webkitAnimationDuration = '3s';	
				}
				else
				{
					if(cp.device != cp.DESKTOP) //for the devices with webkit version lower than expected, no animation will be shown.
						this.drawingBoard.style.opacity = 1;
					else
						this.drawingBoard.style.opacity = 0;
				}
			}
			if (this.parentSlide != undefined && this.parentSlide == cp.movie.stage.currentSlide) {
				if(this.pause && !cp.movie.paused)
					cp.movie.pause(cp.ReasonForPause.FEEDBACK_ITEM);
				var closeReason = cp.FeedbackCloseReason.OTHER;
				switch ( this.type ) {
				case cp.FeedbackType.SUCCESS:
					closeReason = cp.FeedbackCloseReason.SHOW_SUCCESS;
					break;
				case cp.FeedbackType.FAILURE:
					closeReason = cp.FeedbackCloseReason.SHOW_FAILURE;
					break;
				case cp.FeedbackType.HINT:
					closeReason = cp.FeedbackCloseReason.SHOW_HINT;
					break;
				default:
					break;
				}
				cp.movie.stage.RemoveFeedbacks(closeReason);
				cp.movie.stage.AddFeedback(this);
				cp.moveDivElemToTop(this.element);
				var lItemData = cp.model.data[this.itemName];
				var lCanvasName = lItemData.mdi;
				var lCanvasElement = document.getElementById(lCanvasName);
				if(lCanvasElement != undefined)
					cp.moveRewrapElemToTop(lCanvasElement.parentNode);
				cp.show(this.itemName);
			}
		},
		
		hide: function()
		{
			if ( cp.FeedbackType.SUCCESS == this.type && this.actionObj )
				this.actionObj.actionInProgress = false;
			cp.hide(this.itemName);
			if(this.drawingBoard)
				this.drawingBoard.style.opacity = 1;
		},
		
		canHide: function(reason)
		{
			if ( cp.FeedbackType.HINT == this.type || cp.FeedbackType.OTHER == this.type )
				return true;
			if ( cp.FeedbackCloseReason.SLIDE_CHANGE == reason || 
				cp.FeedbackCloseReason.OTHER == reason )
				return true;
			if ( cp.FeedbackCloseReason.SHOW_HINT == reason ) 
				return false;
			if ( cp.FeedbackType.SUCCESS == this.type )
				return false;
			return true;
		}
	}
	
	// THIS IS MAIN TIMELINE
	cp.Timeline = function(el)
	{
		cp.Timeline.baseConstructor.call(this, el);
		
		this.slides = (this.getAttribute("slides") || "").split(",");
		this.previousSlideStartFrame = -1;
		this.nextSlideStartFrame = -1;
		this.currentSlideStartFrame = -1;
		
		this.lastFrame = this.getAttribute('to');
		this.movieEndAction = this.getAttribute('endAction');
		this.fadeInAtStart = this.getAttribute('fadeInAtStart');
		this.fadeOutAtEnd = this.getAttribute('fadeOutAtEnd');
		
		this.noSkipFrames = {};
		
		var self = this;    		
		this.paused = false;
		this.cStart = this.lastFrame + 1;
		this.cEnd = -1;
		this.imagesToBeCleared = [];
		this.slideDiv = null;
		this.eventListeners = new Array();
		this.feedbacks = new Array();
		this.m_keyManager = new cp.KeyManager();
		this.m_clickManager = new cp.ClickManager();
		this.parentChildMap = new Array();
		this.ccItems = null;
		this.curCCItem = -1;
		this.itemsNotLoaded = [];
		this.interactivePauseFrame = -1;
		
		this.mainSlideDiv = this.element.children[0];
		
		var cpDocElem = document.getElementById( 'cpDocument' );
		if (cpDocElem) {
			jQuery(document).keydown( function(event) {
				self.m_keyManager.handleKeyDown(event);
			});
			jQuery(document).keyup( function(event) {
				self.m_keyManager.handleKeyUp(event);
			});
			jQuery(document).focusout( function(event) {
				self.m_keyManager.handleFocusOut(event);
			});
		}
		cpDocElem.style.backgroundColor = cp.model.data.project.htmlBgColor;
		this.verbose = false;
	}
	
	cp.inherits(cp.Timeline, cp.DisplayObject);	
	
	cp.Timeline.prototype.addToItemNotLoaded = function( obj )
	{
		this.itemsNotLoaded.push( obj );
	}
	
	cp.Timeline.prototype.removeFromItemNotLoaded = function( obj )
	{
		for ( var i = 0; i < this.itemsNotLoaded.length; ++i ) {
			if ( obj == this.itemsNotLoaded[ i ] ) {	
				this.itemsNotLoaded.splice( i, 1 );
				break;
			}
		}
	}
	
	cp.Timeline.prototype.hasItemsLoaded = function()
	{
		var itemsPending = this.itemsNotLoaded.length > 0;
		if(cp.verbose && itemsPending > 0)
			cp.log(itemsPending + ' widgets pending');
		return ! itemsPending;
	}
	
	cp.Timeline.prototype.addToParentChildMap = function( parentName, childName )
	{
		// Try to find the parent name.
		var i = 0;
		var temp = '';
		var obj = null;
		if ( '' == parentName || '' == childName )
			return;
		
		for ( i = 0; i < this.parentChildMap.length; ++i ) {
			temp = this.parentChildMap[ i ].m_parent;
			if ( temp == parentName ) {
				this.parentChildMap[ i ].m_childArr.push( childName );
				return;
			}
		}
		
		obj = new Object();
		obj.m_parent = parentName;
		obj.m_childArr = new Array();
		obj.m_childArr.push( childName );
		this.parentChildMap.push( obj );
	}
	
	cp.Timeline.prototype.clearParentChildMap = function()
	{
		this.parentChildMap = [];
	}
	
	cp.Timeline.prototype.getChildrenForParent = function( parentName, outArr )
	{
		var i = 0;
		var temp = '';
		var obj = null;
		if ( '' == parentName )
			return;
		
		for ( i = 0; i < this.parentChildMap.length; ++i ) {
			temp = this.parentChildMap[ i ].m_parent;
			if ( temp == parentName ) {
				for ( j = 0; j < this.parentChildMap[i].m_childArr.length; ++j ) {
					outArr.push(this.parentChildMap[ i ].m_childArr[j]);
					this.getChildrenForParent(this.parentChildMap[ i ].m_childArr[j],outArr);
				}
			}
		}

		return;
	}
	
	cp.Timeline.prototype.addKeyHandler = function(keyHandler)
	{
		if (keyHandler)
			this.m_keyManager.addHandler(keyHandler);
	}
	
	cp.Timeline.prototype.getClickManager = function()
	{
		return this.m_clickManager;
	}
	
	cp.Timeline.prototype.setupSlideItemDiv = function(item, itemData, slide, slideDiv, itemDiv, slideCanvas)
	{
		// For the moment, apply simple hack.
		var elemType = 'canvas';
		var classType = 'cp-shape';
		var rewrap = true;
		if ( cp.kCPHighlight == item.t )
		{
			classType = 'cp-hb';
		}
		else if (cp.kCPZoomSource == item.t)
		{
			classType = 'cp-zoom';
		}
		else if ( cp.kCPMouse == item.t )
		{
			rewrap = false;
		}
		else if ( cp.kCPMouseClick == item.t )
		{
			classType = 'cp-mc';
			rewrap = false;
		}
		else if ( cp.kCPOTReviewArea == item.t )
		{
			elemType = "div";
			classType = "cp-questionSlideReviewLabel";
			rewrap = false;
		}
		else if ( cp.kCPOTProgressIndicator == item.t )
		{
			elemType = "div";
			classType = "cp-progressSlideLabel";
			rewrap = false;
		}
		else if ( cp.kCPOTScoringResult == item.t )
		{
			elemType = "div";
			classType = "cp-resultSlideLabel";
			rewrap = false;
		}
        else if (cp.kCPTypingText == item.t) {
            elemType = 'div';
            classType = 'cp-typingtext';
			//rewrap = false;
        }
		else if (cp.kCPOTTextEntryBoxItem == item.t) {
            elemType = 'div';
            classType = 'cp-input';
			rewrap = false;
		}
		else if (cp.kCPOTLineItem == item.t) 
			classType = 'cp-line';
		else if (cp.kCPOTAnswerArea == item.t) 
			classType = 'cp-answerArea';
		else if (cp.kCPOTStageQuestionText == item.t || cp.kCPOTStageQuestionTitle == item.t)
			classType = 'cp-rectWithText';			
		else if( cp.kCPOTWidgetItem == item.t) {
			elemType = 'div';
            classType = 'cp-widget';
			rewrap = false;
		}
		else if ( cp.kCPOTTAItem == item.t ) {
			elemType = 'div';
            classType = 'cp-ta';
		}
		else if(cp.kCPOTFLVItem == item.t)
		{
			elemType = 'div';
			classType = 'cp-eventVideo';
			rewrap = true;
		}
		else if(cp.kCPOTVideo == item.t)
		{
			elemType = 'div';
			classType = 'cp-slideVideo';
			rewrap = true;
		}
        else if (cp.kCPFullMotion == item.t)
		{
            elemType = 'div';
            classType = 'cp-fmrVideo';
			rewrap = true;
        }
		else if(cp.kCPOTVideoResource == item.t)
		{
			elemType = 'div';
			classType = 'cp-cpvcVideo';
			rewrap = true;
		}
		else if(cp.kCPOTAnimationItem == item.t)
		{
			elemType = 'div';
			classType = 'cp-animationItem';
			rewrap = true;
		}
		var divStr = "";
		
		var nameSuffix = 'c';
		if ( cp.kCPOTStageAnswerItem == item.t ) {
            var itemData = cp.model.data[item.n + 'c'];
            var answerType = itemData['at'];
            if( answerType == cp.kCPOTStageSingleChoiceMultipleAnswer )
			{
                nameSuffix = 'r';
                classType = 'cp-radioInput';
            }
            else if( answerType == cp.kCPOTStageMultipleChoiceMultipleAnswer )
            {
                nameSuffix = 'ch';
                classType = 'cp-checkBoxInput';
            }
			else if( answerType == cp.kCPOTStageSequenceAnswer )
			{
                nameSuffix = 'seq';
                classType = 'cp-sequenceInput';
            }
			elemType = "div";
			rewrap = false;
		}
		if( cp.kCPOTItemHotSpot == item.t ) {
			classType = 'cp-hotspotInput';
			nameSuffix = 'hotspot';
			elemType = 'div';
			rewrap = false;
		}
		else if ( cp.kCPOTOvalItem == item.t || cp.kCPOTRectangleItem == item.t || cp.kCPOTPolygon == item.t || cp.kCPOTAnswerArea == item.t) {
			classType = 'cp-drawingItem'; 
		}
		else if ( cp.kCPOTTitleAutoShape == item.t || cp.kCPOTSubTitleAutoShape == item.t || cp.kCPOTAutoShape == item.t )
			classType = 'cp-autoShape';

		//SetVisibilty of item
		this.SetItemVisibility(item);

		var itemElem = document.createElement(elemType);
		itemElem.id = item.n + nameSuffix;
		itemElem.setAttribute('class', classType);

        if ( cp.kCPOTStageAnswerItem == item.t ){
        var itemData = cp.model.data[item.n + 'c'];
            var answerType = itemData['at'];
            if( answerType == cp.kCPOTStageSequenceAnswer ){
                itemElem.setAttribute('tabindex', '0');
				itemElem.setAttribute('aria-label',itemData['accstr']);
				cp.removeAccessibilityOutline( itemElem );
				itemElem.setAttribute('role','img');
            }
        }

		if ( cp.kCPOTTextEntryBoxItem == item.t  && item.d ) {
			if ( item.d.hc && item.d.hc.length > 0 && cp.device != cp.IDEVICE )
			{
				itemElem.setAttribute('onmouseover','cp.showHint("' + item.d.hc + '",this)');
				itemElem.setAttribute('onmouseout','cp.hideHint("' + item.d.hc + '",this)');
			}
			if ( item.d.cur )
				itemElem.style.cursor = 'text';
		}
		
		if(rewrap)
		{
			var rewrapDiv = document.createElement('div');
			rewrapDiv.id = 're-'+itemElem.id;
			rewrapDiv.setAttribute('class', 'cp-rewrap');
			rewrapDiv.appendChild(itemElem);

			if ( cp.kCPOTTAItem == item.t ) {
			    rewrapDiv.tabIndex = 0;     
			    cp.removeAccessibilityOutline( rewrapDiv );           
		    }
			
			if(itemData.rpa)
			{
				slideDiv.appendChild(rewrapDiv);
				if(!this.m_lowestRewrapElementThatIsRestOfProjectAndOnTop)
					this.m_lowestRewrapElementThatIsRestOfProjectAndOnTop = rewrapDiv;
			}
			else
			{
				if(this.m_lowestRewrapElementThatIsRestOfProjectAndOnTop)
					slideDiv.insertBefore(rewrapDiv, this.m_lowestRewrapElementThatIsRestOfProjectAndOnTop)
				else
				{
					if(cp.kCPFullMotion == item.t || cp.kCPOTVideoResource == item.t)
					{
						var nextToSlideCanvas = slideCanvas.nextSibling;
						if(nextToSlideCanvas)
							slideDiv.insertBefore(rewrapDiv, nextToSlideCanvas);
						else
							slideDiv.appendChild(rewrapDiv);
					}
					else
						slideDiv.appendChild(rewrapDiv);
				}
			}
		}
		else
		{
			itemDiv.appendChild(itemElem);
		}
		
	}
	
	cp.Timeline.prototype.SetItemVisibility = function(inItem)
	{
		//Set Visibilty of Retake Button
		if(inItem && (cp.kCPOTRetakeButton == inItem.t))
		{
			var lButtonData = cp.model.data[inItem.n];
			if(lButtonData)
			{
				var lCanvasItem = lButtonData['mdi'];
				var lCanvasData = cp.model.data[lCanvasItem];
				if(!cp.movie.playbackController)
					return;
				var lQuizController = cp.movie.playbackController.GetQuizController();
				if(lCanvasData && lQuizController)
					lCanvasData['visible'] = lQuizController.CanShowRetakeButton();
			}
		}
	}
	
	cp.Timeline.prototype.setupSlideDiv = function(slide, slideHolderDiv)
	{
		var lMovieWidth 	= cp.model.data.project.w;
		var lMovieHeight	= cp.model.data.project.h;
		
		var slideDivCreated = false;
		var slideDiv = slideHolderDiv.firstChild;
		
		if(!slideDiv)
		{
			slideDiv = document.createElement('div');
			slideDiv.setAttribute('class', 'cp-frameset');
			slideDivCreated = true;
		}
		
		var oldSlideId = slideDiv.id;
		slideDiv.id = 'Slide' + slide.id;
		slideDiv.style.cssText = 'left:0px; width:'+lMovieWidth+'px; height:'+lMovieHeight+'px;background-color:'+slide.bc;
        
        slideDiv.setAttribute('tabindex', '0');
		slideDiv.setAttribute('aria-label',slide.accstr);
		cp.removeAccessibilityOutline( slideDiv );
		slideDiv.setAttribute('role','img');
		
		if(slideDivCreated)
			slideHolderDiv.appendChild(slideDiv);
		
		if(slide['st'] == "Question Slide")
		{
			var lQuestionObjName = getQuestionObjectName(slideDiv.id);
			var lQuestionObjData = cp.model.data[lQuestionObjName];
			if(lQuestionObjData)
			{	
				if(lQuestionObjData['qtp'] != 'Hotspot')
					slideHolderDiv.onclick = undefined;
				else
					slideHolderDiv.onclick = handleClick;
			}
		}
		else
			slideHolderDiv.onclick = handleClick;
			
		var bgDiv;
		var bgDivFound = false;
		if(slideDivCreated)
			bgDivFound = false;
		else
		{
			if(slideDiv.firstChild && slideDiv.firstChild.id == '__bgDiv__')
			{
				bgDiv = slideDiv.firstChild;
				bgDivFound = true;
			}
		}
		
		var bgDivCreated = false;
		var bgDivRequired = false;
			
		var slideSvgStr = '';
		if (slide.gf) {
			bgDivRequired = true;
			
			if(!bgDivFound)
			{
				bgDiv = document.createElement('div');
				bgDiv.id = '__bgDiv__';
				bgDivCreated = true;
			}	
			if (cp.browser_supports_svg)
			{
				var svgStr = cp.getGradientSvgStr(slide.gf, lMovieWidth, lMovieHeight);
				if (svgStr.length > 0) 
				{
					bgDiv.setAttribute('class', '');
					bgDiv.style.cssText = 'position:absolute; width:' + lMovieWidth + 'px;height:' + lMovieHeight + 'px';
					bgDiv.innerHTML = svgStr;
				}
			}
			else {
				bgDiv.setAttribute('class', 'cp-gf');
				bgDiv.style.cssText = 'position:absolute; width:' + lMovieWidth + 'px;height:' + lMovieHeight + 'px';
				bgDiv.innerHTML = '<canvas id="Slide' + slide.id + 'gf"></canvas>';
			}
		}
		else if (slide.imgf) {
			bgDivRequired = true;
			
			if(!bgDivFound)
			{
				bgDiv = document.createElement('div');
				bgDiv.id = '__bgDiv__';
				bgDivCreated = true;
			}
			
			bgDiv.setAttribute('class','cp-imgf');
			bgDiv.style.cssText = 'position:absolute; width:' + lMovieWidth + 'px;height:' + lMovieHeight + 'px';
			bgDiv.innerHTML = '<canvas id="Slide' + slide.id + 'imgf"></canvas>';
		}
		
		if(bgDivRequired)
		{
			if(bgDivCreated)
			{
				if(slideDiv.firstChild)
					slideDiv.insertBefore(bgDiv, slideDiv.firstChild);
				else
					slideDiv.appendChild(bgDiv);
			}
		}
		else
		{
			if(bgDivFound)
				slideDiv.removeChild(bgDiv);
		}
		
		var slideCanvas;
		
		if(!slideDivCreated)
			slideCanvas = document.getElementById(oldSlideId + 'c');
			
		if(!slideCanvas)
		{
			slideCanvas = document.createElement('canvas');
			slideCanvas.setAttribute('class', 'cp-shape');
			slideDiv.appendChild(slideCanvas);
		}
		slideCanvas.id = 'Slide' + slide.id + 'c';
		
		if(slide.si.length > 0)
		{
			var itemsArr = slide.si;
			for(var i =0; i< itemsArr.length; ++i)
			{
				var item = itemsArr[i];
				
				var itemData = cp.model.data[item.n];
				
				var existingElem = document.getElementById(item.n);
				if(existingElem)
				{
					//do nothing
				}
				else
				{
					var itemDiv = document.createElement('div');
					itemDiv.id = item.n;
					if(cp.device == cp.IDEVICE)
					{
						if(cp.kCPOTFLVItem == item.t || cp.kCPOTVideo == item.t || cp.kCPFullMotion == item.t || cp.kCPOTVideoResource == item.t)
							itemDiv.setAttribute('class', 'cp-videoframeset');
						else
							itemDiv.setAttribute('class', 'cp-frameset');
					}
					else
						itemDiv.setAttribute('class', 'cp-frameset');
					this.setupAccessibility(item, itemDiv);

                    this.addHyperLinks(item, itemDiv);
					
					if ( cp.kCPOTTextEntryButtonItem == item.t )
						itemDiv.setAttribute('onclick','TEBValidator(this)');
					if ( (cp.kCPOTScorableButtonItem == item.t || cp.kCPOTClickBoxItem == item.t || cp.kCPOTAutoShape == item.t) && item.d  )
					{
						if(item.d.hc && item.d.hc.length > 0 && cp.device != cp.IDEVICE )
						{
							itemDiv.setAttribute('onmouseover','cp.showHint("' + item.d.hc + '",this)');
							itemDiv.setAttribute('onmouseout','cp.hideHint("' + item.d.hc + '",this)');
						}
						if ( item.d.cur ) 
							itemDiv.style.cursor = "pointer";
					}
					
					this.setupSlideItemDiv(item, itemData, slide, slideDiv, itemDiv, slideCanvas);
					
					if(itemData.rpa)
					{
						slideHolderDiv.appendChild(itemDiv);
						if(!this.m_lowestElementThatIsRestOfProjectAndOnTop)
							this.m_lowestElementThatIsRestOfProjectAndOnTop = itemDiv;
					}
					else
					{
						if(this.m_lowestElementThatIsRestOfProjectAndOnTop)
							slideHolderDiv.insertBefore(itemDiv, this.m_lowestElementThatIsRestOfProjectAndOnTop);
						else
						{
							if(item.t == cp.kCPFullMotion || item.t == cp.kCPOTVideoResource)
							{
								var nextToSlideDiv = slideDiv.nextSibling;
								if(nextToSlideDiv)
									slideHolderDiv.insertBefore(itemDiv, nextToSlideDiv);
								else
									slideHolderDiv.appendChild(itemDiv);
							}
							else
								slideHolderDiv.appendChild(itemDiv);
						}
					}
				}
			}
		}
	}
	
    cp.Timeline.prototype.addHyperLinks = function (inItem, inDiv)
    {
        if(inItem)
		{
		    var lItemData = cp.model.data[inItem.n + 'c'];

            if (lItemData == undefined)
                return;
		    
		    //Is this item marked for accessibility
			var hasHyperLinks = lItemData.hasOwnProperty("hl");
			if (hasHyperLinks == false)
			    return;	

            //find out how many hyperlinks
            var lHyperLinks = lItemData['hl'].split(",");
            for (var i=0; i<lHyperLinks.length; i++)
			{
                var hyperlinkName = lHyperLinks[i];
               
                if (hyperlinkName != '')
                {
                    //find the corresponding element and add the hyperlink
                     var hyperLinkData = cp.model.data[hyperlinkName];
                     if (hyperLinkData == undefined)
                            return;
                     var actionString = hyperLinkData['oca'];
                     if (actionString == '')
                        return;
                     var questionTextCanvasBounds = hyperLinkData['b'];
                     if (questionTextCanvasBounds == '')
                        return;

                     //for number of times a hyperlink is there in caption
                        var hyperlinkDiv = document.createElement('div');
			            hyperlinkDiv.id = hyperlinkName;
                        
                        //accessibility related stuff
                        hyperlinkDiv.setAttribute('tabindex', '0');
				        hyperlinkDiv.setAttribute('aria-label',hyperLinkData['accstr']);
						cp.removeAccessibilityOutline( hyperlinkDiv );
				        hyperlinkDiv.setAttribute('role','link');
			            hyperlinkDiv.style.display = 'block';
                        hyperlinkDiv.style.position = 'absolute';

                        hyperlinkDiv.style.width = questionTextCanvasBounds[2] - questionTextCanvasBounds[0] +'px';
                        hyperlinkDiv.style.height = questionTextCanvasBounds[3] - questionTextCanvasBounds[1] +'px';
                        hyperlinkDiv.style.top = questionTextCanvasBounds[1]+'px';
                        hyperlinkDiv.style.left = questionTextCanvasBounds[0]+'px';

                        hyperlinkDiv.style.backgroundColor = '#FFFFFF';
                        hyperlinkDiv.style.opacity = 0;

                        hyperlinkDiv.style.cursor = 'pointer';
                        hyperlinkDiv.setAttribute('onclick','hyperlinkClick(this)');
                        inDiv.appendChild(hyperlinkDiv);
                }
            }
         }
    }

    cp.Timeline.prototype.setupAccessibility = function(inItem, inDiv)
	{
	    if(inItem)
		{
		    var lItemData = cp.model.data[inItem.n + 'c'];

            if (lItemData == undefined)
                return;
		    
		    //Is this item marked for accessibility
			var isMarkedForAccessibility = lItemData.hasOwnProperty("accstr");
			if (isMarkedForAccessibility == "false")
			    return;	
			
			if ((inItem.t == cp.kCPOTCaptionItem) || (inItem.t == cp.kCPOTScoringResultItem) || ( cp.kCPOTSuccessCaptionItem == inItem.t ) 
				|| ( cp.kCPOTFailureCaptionItem == inItem.t ) || ( cp.kCPOTHintCaptionItem == inItem.t ) 
				|| ( cp.kCPOTIncompleteFeedbackItem == inItem.t ) || ( cp.kCPOTStageCorrectFeedback == inItem.t ) || ( cp.kCPOTStageIncorrectFeedback == inItem.t ) 
				|| ( cp.kCPOTStagePartialCorrectFeedback == inItem.t ) || ( cp.kCPOTTimeoutFeedbackItem == inItem.t ) || ( cp.kCPOTRetryFeedbackItem == inItem.t ) )
			{
				inDiv.setAttribute('tabindex', '0');
				inDiv.setAttribute('aria-label',lItemData['accstr']);
				cp.removeAccessibilityOutline( inDiv );
				inDiv.setAttribute('role','img');
			}
			else if ((inItem.t == cp.kCPOTScorableButtonItem )|| (inItem.t == cp.kCPOTRetakeButton) || (inItem.t == cp.kCPOTScoringReviewButton) || (inItem.t == cp.kCPOTScoringContinueButton))
			{
				inDiv.setAttribute('tabindex', '0');
				inDiv.setAttribute('aria-label',lItemData['accstr']);
				cp.removeAccessibilityOutline( inDiv );
				inDiv.setAttribute('role','button');
			}	
			else if (inItem.t == cp.kCPOTTextEntryButtonItem)
			{
				inDiv.setAttribute('tabindex', '0');
				inDiv.setAttribute('aria-label',lItemData['accstr']);
				cp.removeAccessibilityOutline( inDiv );
				inDiv.setAttribute('role','button');
			}	
			else if (inItem.t == cp.kCPOTClickBoxItem	)
			{
				inDiv.setAttribute('tabindex', '0');
				inDiv.setAttribute('aria-label',lItemData['accstr']);
				cp.removeAccessibilityOutline( inDiv );
				inDiv.setAttribute('role','button');
			}
			else if ((inItem.t == cp.kCPOTLineItem) || (inItem.t == cp.kCPOTOvalItem) || (inItem.t == cp.kCPOTRectangleItem) || (inItem.t == cp.kCPOTPolygon) || (inItem.t == cp.kCPOTAutoShape))
			{
				inDiv.setAttribute('tabindex', '0');
				inDiv.setAttribute('aria-label',lItemData['accstr']);
				cp.removeAccessibilityOutline( inDiv );
				inDiv.setAttribute('role','img');
			}
			else if ((inItem.t == cp.kCPOTStageQuestionText))
			{
				inDiv.setAttribute('tabindex', '0');
				inDiv.setAttribute('aria-label',lItemData['accstr']);
				cp.removeAccessibilityOutline( inDiv );
				inDiv.setAttribute('role','img');
			}
			else if (inItem.t == cp.kCPOTStageQuestionTitle)
			{
				inDiv.setAttribute('tabindex', '0');
				inDiv.setAttribute('aria-label',lItemData['accstr']);
				cp.removeAccessibilityOutline( inDiv );
				inDiv.setAttribute('role','img');
			}
			else if ((inItem.t == cp.kCPOTStageQuestionNextButton) || (inItem.t == cp.kCPOTStageQuestionClearButton) || (inItem.t == cp.kCPOTStageQuestionBackButton) || (inItem.t == cp.kCPOTStageQuestionSubmitButton) || (inItem.t == cp.kCPOTSubmitAllButton))
			{
				inDiv.setAttribute('tabindex', '0');
				inDiv.setAttribute('aria-label',lItemData['accstr']);
				cp.removeAccessibilityOutline( inDiv );
				inDiv.setAttribute('role','button');
			}
		}
	}

	cp.Timeline.prototype.getSlideDiv = function()
	{
		return this.mainSlideDiv;
	}

	cp.Timeline.prototype.canUpdateToFrame = function(frame, indexOfSlideToJumpTo)
	{
		var slideIndex = indexOfSlideToJumpTo;
		if(!slideIndex)
			slideIndex = this.getSlideIndexForFrame(frame);
		return this.canUpdateToSlide(slideIndex);
	}
	
	cp.Timeline.prototype.canUpdateToSlide = function(indexOfSlideToJumpTo)
	{
		if(indexOfSlideToJumpTo >= this.slides.length || indexOfSlideToJumpTo < 0)
			return false;
			
		if(cp.movie.playbackController)
		{	
			var lError = cp.movie.playbackController.AllowedToGoToSlide(cpInfoCurrentSlideIndex, indexOfSlideToJumpTo);
			return ( lError == "" );
		}
		return true;	
	}
			
	cp.Timeline.prototype.getSlideIndexForFrame = function(frame)
	{
		for(var i=0; i<this.slides.length; ++i)
		{					
			var slideName = this.slides[i];
			var slideData = cp.model.data[slideName];
							
			var from = slideData["from"];
			var to = slideData["to"];
			if( (frame >= from) && (frame <= to) )
			{
				return i;
			}
		}
		
		return -1;
	}
	
	cp.Timeline.prototype.getSlideNameForIndex = function(index)
	{
		if(0 <= index && index < this.slides.length)
			return this.slides[index];
		return '';
	}
	
	cp.Timeline.prototype.getSlideIndexForName = function(aName)
	{
		if((aName == undefined) || (aName ==''))
			return -1;
			
		for(var lSlideIndex =0; lSlideIndex< this.slides.length; ++lSlideIndex)
		{
			if(aName == this.slides[lSlideIndex])
				return lSlideIndex;
		}		
		return -1;
	}
	
	cp.Timeline.prototype.updatePlaybar = function(newFrame)
	{
		if(cp.verbose)
			cp.log('update playbar ' + newFrame);
		if(!this.frameSlider)
		{
			this.frameSlider = document.getElementById('playbarSlider');
		}
		if(this.frameSlider!=undefined)	
			this.frameSlider.updateSlider( newFrame );				
	}
	
	cp.Timeline.prototype.updateToc = function(newFrame)
	{
		if(!cp.model.data.project.hasTOC)
			return;
		if(!cp.model.data.tocProperties.showTotalD)
			return;	
		if(!this.toc)
		{
			this.toc = document.getElementById('tocFooterText');
		}
		if(this.toc!=undefined)	
			this.toc.updateTime( newFrame );				
	}
	
	cp.Timeline.prototype.updateSlideNumber = function(i)
	{
	}
	
	cp.Timeline.prototype.setAdjacentSlidesStartFrames = function(slides,i)
	{
		this.updateSlideNumber(i);
		var previousSlide = cp.model.data[slides[i - 1]];								
		if(previousSlide)
			this.previousSlideStartFrame = previousSlide["from"];
		else
			this.previousSlideStartFrame = -1;
		
		var nextSlide = cp.model.data[slides[i + 1]];
		if(nextSlide)
			this.nextSlideStartFrame = nextSlide["from"];
		else
			this.nextSlideStartFrame = -1;
	}
	
	cp.Timeline.prototype.AddEventListeners = function(slide)
	{
		if(slide.si.length > 0)
		{
			var itemsArr = slide.si;
			for(var i =0; i< itemsArr.length; ++i)
			{
				var item = itemsArr[i];
				var itemData = cp.model.data[item.n];
				var htmlItem = cp(item.n);
				if(htmlItem && itemData)
				{
					var added = false;
					var text = itemData.vt;
					if(text != undefined && text != "" )
					{
						if ( undefined == itemData.vars && undefined == itemData.varLens && undefined == itemData.texts ) {
							itemData.vars = new Array();
							itemData.varLens = new Array();
							itemData.texts = new Array();
							var tokens = text.split('$$');
							if(tokens.length > 1)
							{
								for ( var j = 0; j < tokens.length; j += 2 )
								{
									itemData.texts.push( tokens[ j ] );
									if ( j + 1 < tokens.length )
									{
										var token 		= tokens[ j + 1 ];
										var tokenLen 	= 0;
										if(token && '' != token) {
											added = cp.em.addEventListener(htmlItem, cp.SPECIFIC_VARIABLE_CHANGED_EVENT, token );
											tokenLen = cp.vm.getVariableLength( token );
										}
										if ( undefined == token )
											token = '';
										itemData.vars.push( token );
										itemData.varLens.push( tokenLen );
									}
								}
							}
							else 
								itemData.texts.push( text );
						}
						else {
							for ( var j = 0; j < itemData.vars.length; ++j ) 
								cp.em.addEventListener( htmlItem, cp.SPECIFIC_VARIABLE_CHANGED_EVENT, itemData.vars[ j ] );
						}
					}
					if(added)
					{
						this.eventListeners.push(htmlItem);
					}
				}
			}
		}
	}

	cp.Timeline.prototype.AddFeedback = function(feedback)
	{
		if (feedback)
			this.feedbacks.push(feedback);
	}
	
	cp.Timeline.prototype.RemoveFeedbacks = function( closeReason )
	{
		var i = 0;
		var feedbacksRetained = [];
		for (i = 0; i < this.feedbacks.length; ++i) {
			if ( cp.FeedbackCloseReason.SLIDE_CHANGE == closeReason || this.feedbacks[ i ].canHide( closeReason ) )
				this.feedbacks[ i ].hide();
			else
				feedbacksRetained.push( this.feedbacks[ i ] );
		}
		this.feedbacks = [];
		for (i = 0; i < feedbacksRetained.length; ++i) 
			this.feedbacks.push( feedbacksRetained[ i ] );
	}
	
	cp.Timeline.prototype.RemoveFeedback = function(feedback)
	{
		for (var i = 0; i < this.feedbacks.length; ++i) {
			if (this.feedbacks[ i ] == feedback) {
				this.feedbacks.splice( i, 1 );
				break;
			}
		}
	}
	
	cp.Timeline.prototype.UpdateFeedbacks = function()
	{
		for (var i = 0; i < this.feedbacks.length; ++i)
			this.feedbacks[ i ].update();
	}
	
	cp.Timeline.prototype.RemoveEventListeners = function()
	{
		for(var i = 0; i < this.eventListeners.length; ++i)
		{
			cp.em.removeEventListener(this.eventListeners[i], cp.SPECIFIC_VARIABLE_CHANGED_EVENT);
		}
		this.eventListeners.length = 0;
	}
	
	// May be used later.
	cp.Timeline.prototype.getFrameset = function(name)
	{
		var retVal = null, i = 0;
		for (i = 0; i < this.children.length; ++i) {
			if (name == this.children[ i ].element.id)
				return this.children[ i ];
		}
		return retVal;
	}

	//IDEVICE, Video specific prototype methods
	//-------------------
	cp.Timeline.prototype.correctReWrapZOrder = function(fixedVideoElem, referenceVideoElement)
	{
		if(!fixedVideoElem || !referenceVideoElement || fixedVideoElem.id == referenceVideoElement.id)
			return;
		
		if(referenceVideoElement.className != 'cp-rewrap' || fixedVideoElem.className != 'cp-rewrap')
			return;
			
		var p = referenceVideoElement.parentElement;
		if(!p)
			return;
		
		for(var x = p.firstChild; x.id != referenceVideoElement.id; x = x.nextSibling)
		{
			if(x.id == fixedVideoElem.id)
				continue;
			if(x.className != 'cp-rewrap')
				continue;
			var c = x.firstChild;
			if(c)
			{
				c = c.firstChild;
				if(c && c.tagName == 'VIDEO')
					continue;
			}
	
			if(cp.verbose)
				cp.log('inserting ' + x.id + ' before ' + fixedVideoElem.id);
			p.insertBefore(x, fixedVideoElem);
		}
	}
	
	cp.Timeline.prototype.correctParentZOrder = function(fixedVideoElem, referenceVideoElement)
	{
		if(!fixedVideoElem || !referenceVideoElement || fixedVideoElem.id == referenceVideoElement.id)
			return;
		
		if(referenceVideoElement.className != 'cp-frameset' || fixedVideoElem.className != 'cp-frameset')
			return;
			
		var p = referenceVideoElement.parentElement;
		if(!p)
			return;
		
		for(var x = p.firstChild; x.id != referenceVideoElement.id; x = x.nextSibling)
		{
			if(x.id == fixedVideoElem.id)
				continue;
			if(x.className != 'cp-frameset')//cp-videoframeset will also be skipped
				continue;

			if(cp.verbose)
				cp.log('inserting ' + x.id + ' before ' + fixedVideoElem.id);
			p.insertBefore(x, fixedVideoElem);
		}
	}
	//-------------------
	
	cp.Timeline.prototype.selectivelyRemoveHTMLObjects = function(slideHolderDiv)
	{
		var slideDiv = slideHolderDiv.firstChild;
		if(!slideDiv)
			return;

		var thingsToPreserve = {}
		if(this.children)
		{
			for(var i = 1; i < this.children.length; ++i)
			{
				var frameset = this.children[i];
				var preserve = false;
				if(frameset.itemData.rp || frameset.itemData.ddv)
				{
					if(frameset.itemData.from <= cpInfoCurrentFrame && frameset.itemData.to >= cpInfoCurrentFrame)
						preserve = true;
				}
				if(cp.kCPOTVideo == frameset.type)
				{
					var displayObj = frameset.children[0];
					if(displayObj && displayObj.element)
					{
						var nativeVideo = displayObj.element.firstChild;
						if(nativeVideo && nativeVideo.tagName == 'VIDEO')
							preserve = true;
					}
				}
				else if(cp.IDEVICE == cp.device)
				{
					if(cp.kCPOTFLVItem == frameset.type || cp.kCPFullMotion == frameset.type || cp.kCPOTVideo == frameset.type || cp.kCPOTVideoResource == frameset.type)
					{
						var displayObj = frameset.children[0];
						if(displayObj && displayObj.element)
						{
							var nativeVideo = displayObj.element.firstChild;
							if(nativeVideo && nativeVideo.tagName == 'VIDEO')
								preserve = true;
						}
					}
				}		

				if(preserve)
				{
					for(var j in frameset.children)
					{
						var displayObj = frameset.children[j];
						if(displayObj.element)
						{
							var parent = displayObj.element.parentElement;
							if(parent)
							{
								if(parent.className == "cp-rewrap")
									thingsToPreserve[parent.id] = 1;
								else
									thingsToPreserve[displayObj.element.id] = 1;
							}
						}
					}
					if(frameset.element)
						thingsToPreserve[frameset.element.id] = 1;
						
					if(cp.IDEVICE == cp.device)
					{
						if(frameset.suppliedElement)
							thingsToPreserve[frameset.suppliedElement.id] = 1;
					}
				}
			}
		}
		
		var next;
		for(var child = slideDiv.firstChild; child; child = next)
		{
			next = child.nextSibling;

			if(!child || child.id == '__bgDiv__' || slideDiv.id + 'c' == child.id || thingsToPreserve[child.id])
				continue;
				
			child.onmouseover = null;
			child.onmouseout = null;
			child.ontouchstart = null;
			child.ontouchend = null;
			child.onmousedown = null;
			child.onmouseup = null;
			child.ontouchmove = null;
			child.onclick = null;
			if(cp.verbose)
				cp.log('removing ' + child.id);
			slideDiv.removeChild(child);
		}
		
		for(var misc = slideDiv.nextSibling; misc; misc = next)
		{
			next = misc.nextSibling;
			if(!thingsToPreserve[misc.id])
			{
				misc.onmouseover = null;
				misc.onmouseout = null;
				misc.ontouchstart = null;
				misc.ontouchend = null;
				misc.onmousedown = null;
				misc.onmouseup = null;
				misc.ontouchmove = null;
				misc.onclick = null;
				if(cp.verbose)
					cp.log('removing ' + misc.id);
				slideHolderDiv.removeChild(misc);
			}
		}
		
		for(var i = this.parentChildMap.length -1; i >= 0; --i)
		{
			var key = this.parentChildMap[i].m_parent;
			if(!thingsToPreserve[key])
			{
				this.parentChildMap.splice(i, 1);
			}
		}
	}
	
	cp.Timeline.prototype.addFramesetsAndLoadAssetsForSlideAtIndex = function(slideIndex)
	{
		if(cp.verbose)
			cp.log('addFramesetsAndLoadAssetsForSlideAtIndex ' + slideIndex);

		cp.movie.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
		cp.movie.pm.loadSlideAssets(slideIndex);
		
		if(slideIndex < this.slides.length - 1)
		{
			cp.movie.pm.preloadSlideAssets(slideIndex+1);//if needed we shall preload more slides
		}
		
		var tempSlideName = this.slides[slideIndex];
		var tempSlideData = cp.model.data[tempSlideName];
		var tempSlideID = tempSlideData['id'];
		var slideHolderDiv = this.getSlideDiv();
	
		this.RemoveFeedbacks(cp.FeedbackCloseReason.SLIDE_CHANGE);
		this.m_keyManager.clearHandlers();
		this.m_clickManager.clearClicks();
		
		this.selectivelyRemoveHTMLObjects(slideHolderDiv);
		
		this.m_lowestElementThatIsRestOfProjectAndOnTop = null;
		this.m_lowestRewrapElementThatIsRestOfProjectAndOnTop = null;
		this.itemsNotLoaded = [];
		
		if(this.children)
		{
			for(var i = 1; i < this.children.length; ++i)
			{
				var frameset = this.children[i];
				if(frameset.itemData.rp && frameset.itemData.from <= cpInfoCurrentFrame && frameset.itemData.to >= cpInfoCurrentFrame)
				{
					if(!this.m_lowestElementThatIsRestOfProjectAndOnTop)
					{
						if(frameset.itemData.rpa)
						{
							this.m_lowestElementThatIsRestOfProjectAndOnTop = frameset.element;
							
							for(var j in frameset.children)
							{
								var displayObj = frameset.children[j];
								if(displayObj.element)
								{
									var parent = displayObj.element.parentElement;
									if(parent)
									{
										if(parent.className == "cp-rewrap")
										{
											this.m_lowestRewrapElementThatIsRestOfProjectAndOnTop = parent;
											break;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		this.setupSlideDiv(tempSlideData, slideHolderDiv);
		
		var lQuestionsOnSlide = tempSlideData['qs'].split(",");
		if(!cp.movie.playbackController)
			return;
		
		var lGraphManager = cp.movie.playbackController.GetGraphManager();
		if(lGraphManager)
			lGraphManager.onSlideJump(slideIndex);
			
		var lQuizController = cp.movie.playbackController.GetQuizController();
		if(lQuestionsOnSlide && (lQuestionsOnSlide != ""))
		{
			if(lQuestionsOnSlide.length > 0)
			{				
				if(!lQuizController)
					return;
					
				for(var questionIdx = 0; questionIdx < lQuestionsOnSlide.length; ++questionIdx)
				{
					var lQuestionObj = getQuestionObject(lQuestionsOnSlide[questionIdx]);
					if(lQuestionObj)
					{
						if(this.verbose)
							cp.log("Starting question for : " + lQuestionsOnSlide[questionIdx]);
						lQuestionObj.m_isStarted = false;
					}					
				}				
			}		
		}
		
		if(lQuizController)
		{
			if(slideIndex == lQuizController.GetAnyScoreSlideIndex())
			{
				//lQuizController.SetIsInReviewMode(true);
				lQuizController.GetScore();
			
				//lQuizController.IncrementCurrentAttempt();
				if(!(lQuizController.GetIsAllowReviewMode()) && (lQuizController.GetIsQuizCompleted()))
				{
					cp.movie.paused = true;
					shouldShowSlide = false;									
				}	
				if((lQuizController.GetCurrentAttempt() >= lQuizController.GetNumberOfQuizAttempts()) || (lQuizController.GetIsPassed()))
				{
					lQuizController.SetIsQuizCompleted(true);								
					//lQuizController.HideRetakeButton();									
				}	
				
				if((lQuizController.GetIsAllowReviewMode()) && (lQuizController.GetIsQuizCompleted()))
				{								
					lQuizController.SetIsInReviewMode(true);
				}
				lQuizController.GetScore();				
			}
			else
			{
				shouldShowSlide = false;
			}
		}		
		rewrapChildrenMap = new Object();
		var framesets = [];
		var child = slideHolderDiv.firstChild;
		for( ; child; child = child.nextSibling)
		{
			if (child.nodeType != Node.ELEMENT_NODE)
				continue;

			if (child.nodeName == 'IMG')
				continue;
				
			
			var considerForUpdate = false;
			if('Slide' + tempSlideData.id == child.id)
				considerForUpdate = true;
			else
			{
				for(var k = 0; k < tempSlideData.si.length; ++k)
				{
					if(tempSlideData.si[k].n == child.id)
					{
						considerForUpdate = true;
						break;
					}
				}
			}
				
			var classNames = (child.className + "").split(" ");
			var isFrameset = (classNames.indexOf("cp-frameset") != -1) || (classNames.indexOf("cp-videoframeset") != -1);
			var isMask = classNames.indexOf("cp-mask") != -1;
			if (!isFrameset && !isMask)
			{
				//console.error("cp-timeline ", el, " should only contain cp-framesets or cp-mask. Invalid element: ", child);
				continue;
			}
	
			if (isFrameset)
			{
				var frameset = cp.parseFrameset(child);
				frameset.considerForUpdate = considerForUpdate;
				frameset.timeline = self;
				framesets.push(frameset);
			}
		}
		this.children = framesets;		

        var slideData = cp.model.data[this.slides[cpInfoCurrentSlideIndex]];
		if ( ! cp.movie.stage.hasItemsLoaded() ) {
			cp.movie.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
		}
			
		slideHolderDiv.style.display = 'block';
	}			
	
	cp.Timeline.prototype.handleRewindForFramesets = function()
	{
		for ( var i = 0; i < this.children.length; ++i ) 
			this.children[ i ].handleRewind();
	}
	
	cp.Timeline.prototype.createQuestionObjs = function()
	{	
		this.questions = [];
		var questionStr = this.getAttribute("questions") || "";
		if (questionStr.length > 0 )
			this.questions = questionStr.split(",");
		for(var k = 0 ; k < this.questions.length; ++k)
		{
			var lQuestionObjName = this.questions[k];			
			
			if("" == lQuestionObjName)
				continue;
				
			var lQuestionData = cp.model.data[lQuestionObjName];
			var lSlideName = lQuestionData['sn'];
			var lQuestion;
			switch(lQuestionData['qtp'])
			{
				case 'MCQ':
					lQuestion = new cp.MultipleChoiceQuestion(lQuestionObjName,lSlideName);
					break;
				case 'Hotspot':
					lQuestion = new cp.HotspotQuestion(lQuestionObjName,lSlideName);
					break;	
				case 'Sequence':
					lQuestion = new cp.SequenceQuestion(lQuestionObjName,lSlideName);
					break;	
				default:
					lQuestion = new cp.Question(lQuestionObjName,lSlideName);
					break;
			}
			if(!lQuestion)
				break;
			cp.movie.questionObjs[k] = lQuestion;
		}	
	}
	
	cp.Timeline.prototype.getNextBoundForNoLoad = function(slideIndex)
	{
		slideIndex = (slideIndex < this.slides.length) ? slideIndex : (this.slides.length - 1);
		
		var tempSlideName = this.slides[slideIndex];
		var tempSlideData = cp.model.data[tempSlideName];
		
		return tempSlideData["to"];
	}
	
	cp.Timeline.prototype.getPreviousBoundForNoLoad = function(slideIndex)			
	{
		slideIndex = (slideIndex >= 0) ? slideIndex : 0;
		
		var tempSlideName = this.slides[slideIndex];
		var tempSlideData = cp.model.data[tempSlideName];
		
		return tempSlideData["from"];
	}	
	
	cp.Timeline.prototype.loadSlideAtFrame = function(newFrame)
	{		
		if (this.slides.length <= 0)
			return;
			
		displayObjectMap = {};
		
		for(var i=0; i<this.slides.length; i++)
		{					
			var slideName = this.slides[i];
			var slideData = cp.model.data[slideName];
							
			var from = slideData.from;
			var to = slideData.to;
			if( (newFrame >= from) && (newFrame <= to) )
			{
				setCpInfoCurrentSlide(i+1);
				setCpInfoCurrentSlideLabel(slideData.lb);
				this.currentSlide = slideData;
				this.cStart = from;
				this.cEnd = to;
				this.ccItems = slideData.cc;
				this.curCCItem = -1;
				cp.movie.ccText.innerHTML = '';
				
				cp.movie.am.changeCurrentSlide(i, from);
				
				slideData.v = true;
				var projData = cp.model.data.project_main;
				projData.currentFrame = from;						
				if(!cp.movie.playbackController)
					return;
				this.slideEnterAction = slideData.sea;
				this.slideExitAction = slideData.sxa;
				this.currentSlideStartFrame = from;
				this.setAdjacentSlidesStartFrames(this.slides,i);

				////////Loading images of slide and slideItems						
				try
				{
					this.RemoveEventListeners();
					
					this.addFramesetsAndLoadAssetsForSlideAtIndex(i);
					
					var tempSlideName = this.slides[i];
					var tempSlideData = cp.model.data[tempSlideName];
					this.AddEventListeners(tempSlideData);
					
					this.forEachChild(updateNoSkipFramesAndUpdateVarText);
					this.noSkipFrames[this.cEnd] = this.cEnd;
					this.noSkipFrames[this.cEnd+1] = this.cEnd+1;
				}
				catch (e)
				{
					cp.log(e);
					if(e.stack)
					{
						cp.log(e.stack);
					}
				}
				break;
			}							
		}					
	}

	cp.Timeline.ReasonForUpdate = {};
	cp.Timeline.ReasonForUpdate.PROGRESS = 1;
	cp.Timeline.ReasonForUpdate.JUMP = 2;
	
	cp.Timeline.prototype.updateFrame = function(reasonForUpdate)
	{
		this.updatePlaybar(cpInfoCurrentFrame);					
		this.updateToc(cpInfoCurrentFrame);
		if (cpInfoCurrentFrame > this.lastFrame)
		{
			this.onEndOfMovie();
			cp.movie.pause(cp.ReasonForPause.MOVIE_ENDED);
			cp.movie.executeAction(this.movieEndAction);
			return;
		}
		if(this.cEnd == -1)
		{
			var startFrame = getStartFrameOfMovie();
			if(startFrame != 1)
				setCpInfoCurrentFrame(startFrame);
		}
		if(this.cEnd == cpInfoCurrentFrame)
		{
			if(!cp.movie.playbackController)
				return;
			var lQuizController = cp.movie.playbackController.GetQuizController();
			if(lQuizController)
			{
				if(lQuizController.GetIsReportingEnabled())
					cp.movie.playbackController.SendCourseData(!cp.movie.playbackController.LMSIsAICC());//AICC Performance Improvement
			}

			var nextSlideIndex = 1;
			if(cpInfoCurrentSlideIndex)
			{
				nextSlideIndex = cpInfoCurrentSlideIndex + 1;
			}
			
			//Check for the last slide
			if(nextSlideIndex >= this.slides.length)
			{
				var lQuizController = cp.movie.playbackController.GetQuizController();	
				if(lQuizController)
				{
					var lHandledSubmitAllOnLastSlide = lQuizController.DoSubmitAll(cpInfoCurrentSlideIndex);
					if(lHandledSubmitAllOnLastSlide)
					{
						cp.movie.pause(cp.ReasonForPause.CANNOT_MOVE_AHEAD);
						return;
					}
				}
			}
			
			if(!this.canUpdateToSlide(nextSlideIndex) && nextSlideIndex < this.slides.length)
			{
				cp.movie.pause(cp.ReasonForPause.CANNOT_MOVE_AHEAD);
				return;
			}

			cp.movie.play();
			
			//Note: Since there is not slide Exit action for QuizSlide so, execute LeaveSlide for the QuizSlide(Question/ResultSlide)
			if(cp.movie.playbackController)
			{
				var lQuizController = cp.movie.playbackController.GetQuizController();	
				if(lQuizController)
				{
					var lSlideType = lQuizController.GetSlideType(cpInfoCurrentSlideIndex);
					if((lSlideType == "Question") || (lSlideType =="AnyScoreSlide"))
						lQuizController.LeaveSlide(cpInfoCurrentSlideIndex);
				}
			}
			
			cp.movie.executeAction(this.slideExitAction);	
		}
		
		// Means I need to load..
		var slideLoaded = false;
		if( (this.cEnd < cpInfoCurrentFrame) || (this.cStart > cpInfoCurrentFrame))
		{
        	if(this.cEnd != -1)
			{
				var slideData = cp.model.data[this.slides[cpInfoCurrentSlideIndex]];
				slideData.slideNumber = cpInfoCurrentSlideIndex + 1;
                slideData.lcpversion = getCaptivateVersion();
                slideData.frameNumber = cpInfoCurrentFrame;
                var percentageSlidesVisited = -1;
                if(cp.movie)
		        {
			         var lplaybackController = cp.movie.playbackController;	
			         if(lplaybackController)
					        percentageSlidesVisited = lplaybackController.GetPercentageSlidesSeen();
		        }	
                slideData.percentageSlideSeen = percentageSlidesVisited;

				cp.em.fireEvent('CPSlideExit',slideData);
			}
		
			this.onEndOfSlide(reasonForUpdate);
			setCpInfoLastVisitedSlide(cpInfoCurrentSlideIndex);
			cp.movie.cpInfoLastVisitedSlideStartFrame = this.currentSlideStartFrame;
			var lNewSlideIndex = this.getSlideIndexForFrame(cpInfoCurrentFrame);
			//LeaveCurrentSlide
			if(cp.movie.playbackController)
				cp.movie.playbackController.LeaveCurrentSlide(lNewSlideIndex);
			//Load New Slide
			this.loadSlideAtFrame(cpInfoCurrentFrame);
			slideLoaded = true;
			//Set NewSlide as CurrentSlide			
			if(cp.movie.playbackController)
				cp.movie.playbackController.SetCurrentSlide(lNewSlideIndex);

			cp.movie.executeAction(this.slideEnterAction);

            var slideData = cp.model.data[this.slides[cpInfoCurrentSlideIndex]];
            slideData.slideNumber = cpInfoCurrentSlideIndex + 1;
            slideData.frameNumber = cpInfoCurrentFrame;
            slideData.lcpversion = getCaptivateVersion();
		    cp.em.fireEvent('CPSlideEnter',slideData);

		}
		this.syncMotionToFrame(cpInfoCurrentFrame);
		this.updateToFrame(cpInfoCurrentFrame, false,reasonForUpdate);
		
		if(reasonForUpdate == cp.Timeline.ReasonForUpdate.JUMP)
		{
			cp.movie.am.seekTo(cpInfoCurrentFrame);
			cp.movie.vdm.seekTo(cpInfoCurrentFrame, true);
		}
		
		if(slideLoaded)
		{
			if(cp.device == cp.IDEVICE)
			{
			}
			else
			{
				var slideToPreload = this.getSlideIndexForFrame(cpInfoCurrentFrame) + 1;
				var slideName = cp.movie.stage.getSlideNameForIndex(slideToPreload);
				if(slideName != '')
				{
					cp.movie.am.preload(slideName);
					cp.movie.vdm.preload(slideName);
				}
			}
		}
		
		this.pauseAtFrame(cpInfoCurrentFrame);
		
		if(!cp.movie.paused)
		{
			cp.movie.am.play(cpInfoCurrentFrame);
		}
		
	}
	
	cp.Timeline.prototype.attemptToAdvanceCurrentFrameByOffset = function(elapsedFrames)
	{
		if(elapsedFrames <= 0)
			return;
			
		var newFrame = cpInfoCurrentFrame + elapsedFrames;
		for(var i in this.noSkipFrames)
		{
			var f = this.noSkipFrames[i];
			if(cpInfoCurrentFrame < f && newFrame > f)
			{
				newFrame = f;
				break;
			}
		}
		
		setCpInfoCurrentFrame(newFrame);
	}
	
	cp.Timeline.prototype.updateFrameCurrentOnPause = function()
	{
		this.updateToFrame(cpInfoCurrentFrame, true);
	}
	
	cp.Timeline.prototype.pauseAtFrame = function(frame)
	{
		if (this.paused)
			return;
		this.paused = false;
		var self = this;
		this.forEachChild(function(child)
		{
			var elem = cp.model.data[child.element.id];
			var canvasItem = elem.mdi;
			var isVisible = (cp.model.data[canvasItem].visible);
			if(frame == cp.movie.stage.interactivePauseFrame)
				return;
			if (isVisible && ((child.pa == frame) || (child.rp_pa && frame == child.rp_pa)))
			{
				// Check whether handled. Return if item is handled OR item is quiz button(QSlide will have 'pa' property)
				//if(this.verbose)
				//	cp.log("Should pause for element : " + elem.id + " - " + !(elem.handled || elem.iqb));
				var isHandled = elem.handled;
				if ( isHandled ) {
					// For button and click box, we should still pause if handled.
					if ( cp.kCPOTClickBoxItem == elem.type || cp.kCPOTScorableButtonItem == elem.type || cp.kCPOTAutoShape == elem.type )
						isHandled = false;
				}
				if (isHandled || elem.iqb  || elem.clickedOnce)
					return;
				if ( undefined != elem.enabled && ! elem.enabled )
					return;

				cp.movie.am.interactiveItemFound = true;
				
				var divData = cp.model.data[child.element.id];
				if(divData.ssp)
				{
					cp.movie.am.ssp = 1;
				}
				
				cp.movie.pause(cp.ReasonForPause.INTERACTIVE_ITEM);

				if(cp.movie.paused  && null != cp.movie.stage.currentSlide)
					cp.movie.stage.currentSlide.topMostObjectInteractiveObject = child.element.id;
				return;
			}
			else if(child.psv == frame && isVisible)
			{
				if(elem.pausedOnce)
					return;
				if ( undefined != elem.enabled && ! elem.enabled )
					return;
				var dispObj = child.children[0];
				if(dispObj)
				{
					var e = dispObj.element;
					if(e)
					{
						var v = e.firstChild;
						if(v &&  v.tagName == 'VIDEO')
						{
							if(v.paused || v.ended)
								return;
						}
					}
				}
				elem.pausedOnce = true;
				cp.movie.pause(cp.ReasonForPause.EVENT_VIDEO_PAUSE);
			}
		});
	}
	cp.Timeline.prototype.updateCC = function(frame)
	{
		if(!cpCmndCC)
			return;
		if(!this.ccItems)
			return;
		var ccDiv = cp.movie.cc;
		var ccTextDiv = cp.movie.ccText;
		var ccLineCount = cp.movie.ccLines;
		frame -= (this.cStart - 1);
		var i=this.ccItems.length-1;
		var minFrame = 1;
		var maxFrame = this.cEnd - this.cStart + 1;
		if(i>=0)
		{
			minFrame = this.ccItems[i].sf;
			maxFrame = this.ccItems[i].ef;
		}
		for(;i >=0 ; --i)
		{
			if(minFrame > this.ccItems[i].sf)
				minFrame = this.ccItems[i].sf;
			if(maxFrame < this.ccItems[i].ef)
				maxFrame = this.ccItems[i].ef;
			if(this.ccItems[i].sf <= frame && this.ccItems[i].ef >= frame)
		{
				if(this.curCCItem == i)
					return;
			var ccString = '';
			var tempStr = this.ccItems[i].t.split("<br/>");
			if (tempStr.length>0) 
			{
				ccString=tempStr[0];
				for(var j=1;j<tempStr.length && j<ccLineCount;j++)
					ccString=ccString+"<br/>"+tempStr[j];
			}
			ccTextDiv.innerHTML = ccString;			
		}
	}
		if(frame<minFrame||frame>maxFrame)
			ccTextDiv.innerHTML = '';
	}
	cp.Timeline.prototype.updateToFrame = function(frame, force,reason)
	{
		if(frame > this.lastFrame)
		{
			return;
		}
		if (this.paused)
			return;

		var lCurrentRelativeFrameFromEnd = this.lastFrame - frame;
		if(this.fadeInAtStart && ( frame <= this.fadeInAtStart) )
			this.mainSlideDiv.style.opacity = frame/this.fadeInAtStart;
		else if(this.fadeOutAtEnd &&  (frame > (this.lastFrame - this.fadeOutAtEnd)) )
			this.mainSlideDiv.style.opacity = lCurrentRelativeFrameFromEnd/this.fadeOutAtEnd;
		else
			this.mainSlideDiv.style.opacity = 1;
		
		
		if(cp.movie.waitingForResources())
			return;
		this.updateCC(frame);
		var self = this;
		if(this.interactivePauseFrame != frame)
			this.interactivePauseFrame = -1;
		this.forEachChild(function(child)
		{
			if(child.considerForUpdate)
			{
				if (child.isInRange(frame))
				{
					if ( (!child.isStarted) || force )
						 child.start();
					else
						child.updateFrame(reason);
					   
				}
				else if (child.isStarted)
				{
					child.reset();
				}
			}
		});
	}
	
	cp.Timeline.prototype.onEndOfSlide = function(reason)
	{
		var self = this;
		this.forEachChild(function(child)
		{
			child.onEndOfSlide(reason);
		});
	}
	
	cp.Timeline.prototype.onEndOfMovie = function()
	{
		var self = this;

        cp.em.fireEvent('CPMovieStop');

		this.forEachChild(function(child)
		{
			child.onEndOfMovie();
		});
	}
	
	cp.Timeline.prototype.syncMotionToFrame = function(frame)
	{
		var self = this;
		this.forEachChild(function(child)
		{
			if (child.isStarted && child.isInRange(frame))
			{
				//if(!cp.movie.paused) // TODO: This was commented for mouse. But need to see how to do it only when frame changes.
					child.ApplyMotion(frame);
			}

		});
	}
	
	cp.Timeline.prototype.start = function()
	{
		this.paused = false;
		this.element.style.display = "block";
		this.m_keyManager.clearHandlers();
		this.m_clickManager.clearClicks();
		setCpInfoCurrentFrame(1);
		this.updateToFrame(cpInfoCurrentFrame);
		this.RemoveFeedbacks(cp.FeedbackCloseReason.SLIDE_CHANGE);
		this.clearParentChildMap();
	}
	
	cp.Timeline.prototype.reset = function()
	{
		this.paused = false;
		this.element.style.display = "none";
		this.m_keyManager.clearHandlers();
		this.m_clickManager.clearClicks();
		setCpInfoCurrentFrame(0);
		this.updateToFrame(cpInfoCurrentFrame);
		this.RemoveFeedbacks(cp.FeedbackCloseReason.SLIDE_CHANGE);
		this.clearParentChildMap();
	}
	
	cp.Timeline.prototype.stop = function()
	{
		this.paused = true;
	}
	
	var objectsByType = {};
	cp.initObjectFactory = function ()
	{
		objectsByType["questionSlideReviewLabel"] = cp.QuestionSlideReviewLabel;
		objectsByType["progressSlideLabel"]= cp.ProgressSlideLabel;
		objectsByType["sequenceInput"]= cp.SequenceInput;
		objectsByType["hotspotInput"]= cp.HotspotInput;
		objectsByType["checkBoxInput"]= cp.CheckBoxInput;
		objectsByType["resultSlideLabel"]= cp.ResultSlideLabel;
		objectsByType["radioInput"]= cp.RadioInput;
		objectsByType["input"]= cp.TextInput;
		objectsByType["shape"]= cp.Shape;
		objectsByType["image"]= cp.DisplayObject;
		objectsByType["group"]= cp.Group;
		objectsByType["svg"]= cp.DisplayObject;
		objectsByType["text"]= cp.DisplayObject;
		objectsByType["placeholder"]= cp.Placeholder;
		objectsByType["hb"]= cp.HighlightBox;
		objectsByType["mc"]= cp.MouseClick;
		objectsByType["gf"]= cp.Gradient;
		objectsByType["imgf"]= cp.ImageFill;
        objectsByType["typingtext"]= cp.TypingText;
		objectsByType["line"]= cp.Line;
		objectsByType["drawingItem"]= cp.DrawingItem;
		objectsByType["answerArea"] = cp.AnswerArea;
		objectsByType["rectWithText"]= cp.RectWithText;
		objectsByType["autoShape"] = cp.AutoShape;
		objectsByType["widget"]= cp.Widget;
		objectsByType["eventVideo"] = cp.EventVideo;
		objectsByType["slideVideo"] = cp.SlideVideo;
		objectsByType["fmrVideo"]= cp.FMRVideo;
		objectsByType["cpvcVideo"]= cp.CPVCVideo;
		objectsByType["zoom"] = cp.Zoom;
		objectsByType["ta"] = cp.TextAnimation;
		objectsByType["animationItem"] = cp.AnimationItem;
	};
	
	var rewrapChildrenMap = new Object();
	var ropMap = new Object();
	var displayObjectMap = new Object();
	
	cp.parseChildren = function(el, args)
	{
		var prefix = "cp-";
		var prefixLength = prefix.length;
		
		var children = [];
		
		var childCanvasName = el.id + 'c';
		if(rewrapChildrenMap[childCanvasName])
			children.push(rewrapChildrenMap[childCanvasName]);
			 
		var child = el.firstChild;
		for( ; child; child = child.nextSibling)
		{
			var elObj = child;
			var rewrapChild = false;
			if(child.className == "cp-rewrap")
			{
				elObj = child.firstChild;
				rewrapChild = true;
			}
			if (elObj.nodeType != Node.ELEMENT_NODE)
				continue;
				
			var classNames = (elObj.className + "").split(" ");
			
			var type = null;
			var classname;
			var needsId = false;
			var parentId = '';
			
			for (var i=0; i<classNames.length && type == null; i++)
			{
				if (classNames[i].substr(0, prefixLength) == prefix)
				{
					// found a potential type prefix
					classname = classNames[i].substr(prefixLength);
					type = objectsByType[classname];
					var tempStr = classNames[i].substr(prefixLength);
					if (tempStr == "gf" || tempStr == "imgf" || tempStr == "drawingItem" 
						|| tempStr == "answerArea" || tempStr == "rectWithText" || tempStr == "autoShape" )
						needsId = true;
					if (( tempStr == "gf" || tempStr == "imgf" ) && elObj.parentElement)
						parentId = elObj.parentElement.id; // Gradient background for JS.
				}
			}
			
			if (!type)
			{
				//console.error("Invalid type for element " + elObj.id);
				continue;
			}

			var childObj = ropMap[elObj.id];
			if(!childObj)
			{
				if (needsId) {
					if (0 == parentId.length)
						parentId = elObj.id;
					childObj = new type(elObj, parentId, args);
				}
				else
					childObj = new type(elObj, args);

				if(cp.verbose)
					cp.log('created new ' + classname);
					
				var rop = 0;
				var divName = childObj.getAttribute('dn');
				if(divName)
				{
					rop = cp.model.data[divName].rp;
				}
				if(elObj.id && 1 == rop)
				{
					ropMap[elObj.id] = childObj;
					if(cp.verbose)
						cp.log('added ' + elObj.id +' to ropMap');
				}
			}
			else
			{
				childObj.restOfProjectDoOnNewSlide();
				if(cp.verbose)
					cp.log('resued childObj from ropMap for ' + elObj.id);
			}

			displayObjectMap[elObj.id] = childObj;

			if(rewrapChild)
				rewrapChildrenMap[elObj.id] = childObj;
			else
				children.push(childObj);
		}
		return children;
	}
	
	cp.parseFrameset = function(el)
	{
		if(cp.verbose)
			cp.log('parseFrameset ' + el.id);
			
		var children = cp.parseChildren(el);
		
		if(cp.device == cp.IDEVICE)
		{
			var x = cp.model.data[el.id];
			if(x)
			{
				var type = x['type'];
				if(cp.kCPOTFLVItem == type || cp.kCPOTVideo == type || cp.kCPFullMotion == type || cp.kCPOTVideoResource == type)
					return new cp.VideoFrameSet(el, children);
			}
		}
		
		var f = new cp.FrameSet(el, children);
		displayObjectMap[el.id] = f;
		return f;
	}
		
	cp.parseTimeline = function (el)
	{
		return new cp.Timeline(el);
	}

	cp.PrefetchManager = function()
	{
		cp.movie.pm = this;
		this.cache = new Array(3+1);
		this.head = 0;
		this.tail = 0;
	}

	function internalUnloadSlideAssets(slideIndex)
	{
		var stage = cp.movie.stage;
		var SlideName = stage.slides[slideIndex];
		var SlideData = cp.model.data[SlideName];
		
		var SlideCanvasName = SlideData["mdi"];
		var SlideCanvas = cp.model.data[SlideCanvasName];
		var SlideImageSrc = SlideCanvas["ip"];
		
		if(SlideImageSrc != '')
		{
			cp.movie.im.unloadImage(slideIndex, SlideImageSrc);
		}

		var SlideItems = SlideData["si"];

		if(SlideItems)
		{
			for (var k=0; k<SlideItems.length; k++)
			{
				var slideItemName = SlideItems[k].n;
				var slideItemData = cp.model.data[slideItemName];
									
				var slideItemDrawingPropertiesItemName = slideItemData["mdi"];
				var slideItemDrawingPropertiesItemData = cp.model.data[slideItemDrawingPropertiesItemName];
				if(slideItemDrawingPropertiesItemData)
				{
					var slideItemDisplayResourceSrc = slideItemDrawingPropertiesItemData["ip"];
					if(slideItemDisplayResourceSrc)
					{
						var isRestOfProject = false;
						if(!slideItemData['pa'])
							isRestOfProject = slideItemData['rp'] == '1';
						if(!isRestOfProject)
						{
							cp.movie.im.unloadImage(slideIndex, slideItemDisplayResourceSrc);
							
							slideItemDisplayResourceSrc = slideItemDrawingPropertiesItemData[ 'hImg' ];
							if(slideItemDisplayResourceSrc)
								cp.movie.im.unloadImage(slideIndex, slideItemDisplayResourceSrc);
							slideItemDisplayResourceSrc = slideItemDrawingPropertiesItemData[ 'pImg' ];
							if(slideItemDisplayResourceSrc)
								cp.movie.im.unloadImage(slideIndex,slideItemDisplayResourceSrc);
							var imgf = slideItemDrawingPropertiesItemData["imgf"];
							if ( imgf && imgf.img && imgf.img.ip && imgf.img.ip.length > 0 )
								cp.movie.im.unloadImage(slideIndex, imgf.img.ip );
						}
					}
				}	
			}
		}
	}

	function internalLoadSlideAssets(slideIndex, monitor)
	{
		var imagesToLoad = [];
		var stage = cp.movie.stage;
		var SlideName = stage.slides[slideIndex];
		var SlideData = cp.model.data[SlideName];
		
		var slideCanvasName = SlideData["mdi"];
		var slideCanvas = cp.model.data[slideCanvasName];
		var slideImageSrc = slideCanvas["ip"];
		if(!slideImageSrc)
		{
			if(cp.device == cp.IDEVICE)
				slideImageSrc = slideCanvas["aip"];
		}
		if(slideImageSrc)
		{
			imagesToLoad.push(slideImageSrc);
		}
		
		// Check for tile image.
		if ( SlideData.imgf && SlideData.imgf.img && SlideData.imgf.img.ip && SlideData.imgf.img.ip.length > 0 )
			imagesToLoad.push( SlideData.imgf.img.ip );
		
		var si = SlideData["si"];
		for (var k =0; k<si.length;++k)
		{
			var slideItem = si[k];
			var slideItemData = cp.model.data[slideItem.n];
			
			var slideItemDrawingPropertiesItemName = slideItemData["mdi"];
			var slideItemDrawingPropertiesItemData = cp.model.data[slideItemDrawingPropertiesItemName];
			if(slideItemDrawingPropertiesItemData)
			{
				var slideItemDisplayResourceSrc = slideItemDrawingPropertiesItemData["ip"];
				
				if(slideItemDisplayResourceSrc)
				{
					imagesToLoad.push(slideItemDisplayResourceSrc);
				}						
				slideItemDisplayResourceSrc = slideItemDrawingPropertiesItemData[ 'hImg' ];
				if(slideItemDisplayResourceSrc)
					imagesToLoad.push(slideItemDisplayResourceSrc);
				slideItemDisplayResourceSrc = slideItemDrawingPropertiesItemData[ 'pImg' ];
				if(slideItemDisplayResourceSrc)
					imagesToLoad.push(slideItemDisplayResourceSrc);
				var imgf = slideItemDrawingPropertiesItemData["imgf"];
				if ( imgf && imgf.img && imgf.img.ip && imgf.img.ip.length > 0 )
					imagesToLoad.push( imgf.img.ip );
			}	
		}				
		

		cp.movie.im.loadImages(slideIndex, imagesToLoad, monitor);
	}

	
	cp.PrefetchManager.prototype =
	{
		print:function()
		{
			var s="[ ";
			for(var i = this.tail; i != this.head; i = (i +1)%this.cache.length)
			{
				s += this.cache[i];
				s += " ";
			}
			s += "]";
			console.log('cached slides:' + s);
		},
		
		slideWasPrefetched:function(slideIndex)
		{
			for(var i = this.tail; i != this.head; i = (i +1)%this.cache.length)
			{
				if(this.cache[i] == slideIndex)
				{
					
					return true;
				}
			}
			return false;
		},
		
		ifPrefetchedMakeMRU:function(slideIndex)
		{
			for(var i = this.tail; i != this.head; i = (i +1)%this.cache.length)
			{
				if(this.cache[i] == slideIndex)
				{
					var j = i;
					var k = (j+1)%this.cache.length;
					while( k != this.head)
					{
						this.cache[j] = this.cache[k];
						j = k;
						k = (j+1)%this.cache.length;
					}
					this.cache[j] = slideIndex;
					return true;
				}
			}
			return false;
		},
		
		throwAwayLRUSlide: function()
		{
			if(this.head == this.tail)
				return;
				
			var slideIndexToUnload = this.cache[this.tail];
			
			if(cp.movie.im.verbose)
				cp.log('throwing Away LRU Slide ' + slideIndexToUnload);
				
			internalUnloadSlideAssets(slideIndexToUnload);
			
			this.tail = (this.tail + 1)%this.cache.length;
		},
		
		isLoading: function()
		{
			return this.loading;
		},
		
		loadSlideAssets: function(slideIndex)
		{
			if(this.loading)
				return false;
			
			this.loading = true;
			try
			{
				if(cp.movie.im.verbose)
					cp.log('loading assets of slide ' + slideIndex);
				if(this.ifPrefetchedMakeMRU(slideIndex))
				{
					internalLoadSlideAssets(slideIndex, true);
				}
				else
				{
					var newHead = (this.head + 1)%this.cache.length;
					if(newHead == this.tail)
					{
						this.throwAwayLRUSlide();
					}
					internalLoadSlideAssets(slideIndex, true);
					this.cache[this.head] = slideIndex;
					this.head = newHead;
				}
				if(cp.movie.im.verbose)
					this.print();
			}
			catch(e){}
			this.loading = false;
			return true;
		},
		
		preloadSlideAssets: function(slideIndex)
		{
			if(cp.movie.im.verbose)
				cp.log('preloading assets of slide ' + slideIndex);
			if(this.slideWasPrefetched(slideIndex))
			{
				//do nothing
			}
			else
			{
				var newHead = (this.head + 1)%this.cache.length;
				if(newHead == this.tail)
				{
					this.throwAwayLRUSlide();
				}
				internalLoadSlideAssets(slideIndex);
				this.cache[this.head] = slideIndex;
				this.head = newHead;
			}
			if(cp.movie.im.verbose)
				this.print();
		}
	}
	
	cp.ImageObject = function(imageManager, src)
	{
		this.im = imageManager;
		this.nativeImage = new Image();this.nativeImage.cpImage = this;
		this.src = src;
		this.complete = false;//nativeImage.complete is *readonly* and *true* by default
		this.loaders = {};
		this.preloaded = false;
		
		this.monitorFunc = function(event)
		{
			event.target.cpImage.complete = true;
			if(cp.movie.im.verbose)
				cp.log('loaded ' + event.target.src);
		}
	}
	
	cp.ImageObject.prototype = 
	{
		load: function(loader, monitor)
		{
			if(undefined == this.src || '' == this.src || null == this.src)
				return;
			
			if(this.im.verbose)
			{
				cp.log('load (monitor = '+ monitor+') ' + this.src);
				if(this.complete)
					cp.log('completed');
				if(this.nativeImage.onload)
					cp.log('onload is set');
			}
			
			if(!this.complete && !this.nativeImage.onload)
			{
				if(true == monitor)
					this.monitor = true;
				else
					this.monitor = false;
				this.nativeImage.onload = this.monitorFunc;
			}
			
			if(!this.complete && this.nativeImage.onload)
			{
				if(true == monitor)
					this.monitor = true;
			}

			this.loaders[loader] = 1;
			if(this.im.verbose)
				cp.log('loaded by = ' + loader);

			if(true != monitor)
				this.preloaded = true;

			if(this.nativeImage.src != '')
				return;

			if(this.im.verbose)
				cp.log('loading ' + this.src);
			this.nativeImage.src = this.src;
			return true;
		},
		
		unload:function(loader)
		{
			if(this.im.verbose)
				cp.log('unload ' + this.src + ' preloaded = ' + this.preloaded);
			
			if(this.loaders[loader])
				delete this.loaders[loader];
				
			var j = 0;
			for(var i in this.loaders)
			{
				++j;
			}
			if(j == 0)
			{
				if(this.im.verbose)
					cp.log('unloading ' + this.src);
				this.nativeImage = new Image();this.nativeImage.cpImage = this;
				this.complete = false;
				this.preloaded = false;
				this.monitor = false;
				return true;
			}

			return false;
		}
	}
	
	cp.ImageManager = function()
	{
		cp.movie.im = this;
		this.images = {};
		this.preloadingProjectImages = false;
		this.m_projectImages = {};
		this.verbose = false;
		this.reset();
		
		var projectImages = cp.model.projectImages;
		for (var i=0; i<projectImages.length; i++)
		{
			this.m_projectImages[projectImages[i]] = new cp.ImageObject(this, projectImages[i]);
		}
		
		var images = cp.model.images;
		for (var i=0; i<images.length; i++)
		{
			this.images[images[i]] = new cp.ImageObject(this, images[i]);
		}
	}
	
	cp.ImageManager.prototype = 
	{
		imagesNotLoaded : function()
		{
			var pendingImages = 0;
			
			if(this.preloadingProjectImages)
			{
				for(var i in this.m_projectImages)
				{
					if(this.m_projectImages[i].monitor && !this.m_projectImages[i].complete)
						++pendingImages;
				}
			}
			else
			{
				for(var i in this.images)
				{
					if(this.images[i].monitor && !this.images[i].complete)
						++pendingImages;
				}
			}
			
			if(cp.verbose && pendingImages > 0)
				cp.log(pendingImages + ' imaged pending');
			return pendingImages > 0;
		},

		loadImages: function(slideIndex, imageNames, monitor, iProjectImages)
		{
			if(imageNames.length == 0)
				return;
						
			this.preloadingProjectImages = iProjectImages ? true : false;
			
			for(var i = 0; i < imageNames.length; ++i)
			{
				var imageName = imageNames[i];
				var img = iProjectImages ? this.m_projectImages[imageName]:this.images[imageName];
				if(!img)
				{
					img = new cp.ImageObject(this, imageName);
					if(iProjectImages)
						this.m_projectImages[imageName] = img;
					else
						this.images[imageName] = img;
				}				
					
				img.load(slideIndex, monitor);				
			}
			if(true == monitor)
			{
				if(this.imagesNotLoaded())
					cp.movie.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
			}
		},
		
		unloadImage: function(slideIndex, imageName)
		{
			var img = this.images[imageName];
			if(img)
			{
				img.unload(slideIndex);
			}
		},
		reset: function()
		{
			if(this.preloadingProjectImages)
			{
				for(var i in this.m_projectImages)
					this.m_projectImages[i].monitor = false;
			}
			else
			{
				for(var i in this.images)
					this.images[i].monitor = false;
			}
		}
	}

	cp.MediaSeeker = function()
	{
		cp.movie.ms = this;
		this.retryQueue = {};
		this.verbose = false;
		
		this.enabled = false;//MediaSeeker turned out to be a disaster on multiple browser/device combinations
		if((cp.browser == cp.MSIE && cp.browserVersion >= cp.MSIE_MIN_SUPPORTED_VERSION) ||
		(cp.OS == cp.WINDOWS && cp.browser == cp.CHROME && cp.browserVersion >= cp.CHROME_MIN_SUPPORTED_VERSION) ||
		(cp.device == cp.IDEVICE && cp.IOSFlavor >= cp.IOS4))
			this.enabled = true;//selectively enable MediaSeeker
	
		if(this.verbose)
			cp.log('MediaSeeker enabled = ' + this.enabled);
	}
	
	cp.MediaSeeker.prototype = 
	{
		resetFlags: function(cpMedia)
		{
			delete cpMedia.retryCount;
			delete cpMedia.lastKnownBuffered;
			delete cpMedia.thulped;
			delete cpMedia.resting;
			delete cpMedia.rested;
			delete cpMedia.failure1;
			delete cpMedia.failure2;
		},
		
		addToQueue: function(cpMedia)
		{
			if(!this.enabled)
				return;
			this.retryQueue[cpMedia.id] = cpMedia;
			cpMedia.retryCount = 1;
			cpMedia.lastKnownBuffered = 0;
			cpMedia.thulped = false;
			cpMedia.resting = false;
			cpMedia.rested = false;
			cpMedia.failure1 = 0;
			cpMedia.failure2 = 0;
		},
		removeFromQueue: function(cpMedia)
		{
			if(!this.enabled)
				return;
			this.resetFlags(cpMedia);
			delete this.retryQueue[cpMedia.id];
		},
		inQueue: function(cpMedia)
		{
			if(!this.enabled)
				return false;
			if(this.retryQueue[cpMedia.id])
				return true;
			return false;
		},
		hasSeeked: function(cpMedia)
		{
			if(!this.enabled)
				return true;
			++cpMedia.retryCount;

			var nativeMedia = cpMedia.nativeAudio;
			if(!nativeMedia)
				nativeMedia = cpMedia.nativeVideo;
			
			if(!nativeMedia)
			{
				if(this.verbose)
					cp.log('MediaSeeker: no native media to seek ' + cpMedia.id);
				return true;
			}
			
			if(undefined == cpMedia.seekToTime)
			{
				if(this.verbose)
					cp.log('MediaSeeker: seekToTime is undefined ' + cpMedia.id);
				return true;
			}
			
			if(cpMedia.thulped)
			{
				if(cpMedia.retryCount < 3)
					return false;
				else
				{
					if(this.verbose)
						cp.log('retrying thulped media ' + cpMedia.id + ' seekToTime = ' + cpMedia.seekToTime);
					cpMedia.thulped = false;
					cpMedia.retryCount = 0;
					nativeMedia.src = cpMedia.src;
					nativeMedia.load();
					return false;
				}
			}
			
			if(cpMedia.resting)
			{
				if(cpMedia.retryCount >= 3)
				{
					if(this.verbose)
						cp.log('retrying rested media ' + cpMedia.id + ' seekToTime = ' + cpMedia.seekToTime);
					cpMedia.resting = false;
					cpMedia.rested = true;
					cpMedia.retryCount = 0;
				}
				return false;
			}

			if(cpMedia.seekToTime < 0)
				cpMedia.seekToTime = 0;
				
			if(isNaN(nativeMedia.duration) || !isFinite(nativeMedia.duration))
			{
				if(this.verbose)
					cp.log('MediaSeeker: duration is NAN ' + cpMedia.id );
				
				if(cpMedia.seekToTime == 0)
					return true;//no need to seek to beginning if the video is yet to load. It will anyway play from zero
				
				if(cpMedia.rested)
				{
					cpMedia.rested = false;
					++cpMedia.failure1;
					if(cpMedia.failure1 >= 2)
					{
						if(cp.exceptionalLogs)
							console.log(cpMedia.id + ' gotStuck while seeking (NAN). gave up seeking');
						return true;
					}

					cpMedia.thulped = true;
					try{
						nativeMedia.src = 'cp_non_existing_media';
					}catch(e){}
					try{
						nativeMedia.load();
					}catch(e){}
				}
				else
					cpMedia.resting = true;
				return false;
			}

			if(cpMedia.seekToTime > nativeMedia.duration)
				cpMedia.seekToTime = nativeMedia.duration;
			
			var seekSuccess = true;
			try{
				nativeMedia.currentTime = cpMedia.seekToTime;
				var delta = Math.abs(nativeMedia.currentTime - cpMedia.seekToTime);
				if(delta >= 0.05)
				{
					seekSuccess = false;
					var b = nativeMedia.buffered;
					var buffered = b.end(b.length - 1);
					if(cpMedia.lastKnownBuffered == b)
					{
						if(cpMedia.rested)
						{
							cpMedia.rested = false;
							++cpMedia.failure2;
							if(cpMedia.failure2 >= 2)
							{
								if(cp.exceptionalLogs)
									console.log(cpMedia.id + ' gotStuck while seeking (CONST BUFF). gave up seeking');
								return true;
							}

							cpMedia.thulped = true;
							try{
								nativeMedia.src = 'cp_non_existing_media';
							}catch(e){}
							try{
								nativeMedia.load();
							}catch(e){}
						}
						else
							cpMedia.resting = true;
					}
					else
					{
						cpMedia.lastKnownBuffered = b;
					}
				}
			}
			catch(e)
			{
				var delta = Math.abs(nativeMedia.currentTime - cpMedia.seekToTime);
				if(delta >= 0.05)
					seekSuccess = false;
				else
					seekSuccess = true;
			}
			
			if(this.verbose && seekSuccess)
				cp.log('MediaSeeker: ' + cpMedia.id + ' currentTime = ' + nativeMedia.currentTime);
			return seekSuccess;
		},
		
		pendingItems: function()
		{
			if(!this.enabled)
				return 0;
				
			var numPending = 0;
			for(var i in this.retryQueue)
			{
				var j = this.retryQueue[i];
				if(this.hasSeeked(j))
				{
					delete j.seekToTime;
					this.removeFromQueue(j);
					if(j.revoke)
					{
						delete j.revoke;
						if(this.verbose)
							cp.log('MediaSeeker revoking play of ' + j.id);
						j.play();
					}
				}
				else
				{
					++numPending;
				}
			}
			
			if(this.verbose && numPending && this.numPending != numPending)
				cp.log('MediaSeeker: ' + numPending + ' items pending seek');

			this.numPending = numPending;
			
			if(cp.verbose && numPending > 0)
				cp.log(numPending + ' pendingForSeek');
			return numPending;
		},
		
		reset: function()
		{
			for(var i in this.retryQueue)
			{
				var j = this.retryQueue[i];
				delete j.seekToTime;
				delete j.revoke;
				this.resetFlags(j);
			}
			
			this.retryQueue = {};
		}
	}
	
	cp.NativeAudio = function()
	{
		if (typeof Audio === "undefined" || !Audio)
			return document.createElement('audio');
		return new Audio();
	}
	
	cp.AudioObject = function(audioManager, id, src, fromFrame, toFrame, duration)
	{
		this.am = audioManager;
		this.id = id;
		this.nativeAudio = null;
		this.src = src;
		this.from = fromFrame;
		this.to = toFrame;
		if(duration)
			this.duration = duration/1000;//convert from mS to seconds
		this.ended = false;
		this.hidden = false;
		this.paused = true;
		this.loop = false;
		this.cploop = false;
		this.gotStuck = 0;
	}
	
	cp.AudioObject.prototype = 
	{
		deviceSpecificInit: function()
		{
			this.am.deviceSpecificInit(this.src);
		},
		load:function()
		{
			if(this.nativeAudio)
				this.nativeAudio.load();
		},
		setSrc:function(src)
		{
			this.src = src;
			if(this.nativeAudio)
			{
				this.nativeAudio.cpSrc = src;
				this.nativeAudio.src = src;
				this.load();
			}
		},
		play: function()
		{
			if(this.ended == true || this.hidden)
			{
				return;
			}
			
			if(!this.paused)
			{
				if(this.nativeAudio)
				{
					if(this.lastTime == this.nativeAudio.currentTime)
					{
						++this.gotStuck;
						if(this.gotStuck >= 30)
						{
							if(cp.exceptionalLogs)
								console.log(this.id + ' ' + this.src + ' gotStuck @' + this.nativeAudio.currentTime);
							this.gotStuck = 0;
							try
							{
								this.nativeAudio.src = 'cp_non_existing_media';
							}catch(e){};
							this.nativeAudio.src = this.src;
							this.nativeAudio.load();
							this.nativeAudio.play();
						}
					}
					else
					{
						this.lastTime = this.nativeAudio.currentTime;
						this.gotStuck = 0;
					}
				}
				return;
			}
			
			this.paused = false;
			
			if(this.am.verbose)
				cp.log("AdObjPlay "+ this.id+" "+this.src);

			if(!this.nativeAudio)
				this.am.allocAudioChannel(this, cp.IDEVICE != cp.device);
				
			if(!this.nativeAudio)
				return;
				
			if(this.isSeekPending())
			{
				this.finishPendingSeek();
				return;
			}

			this.nativeAudio.play();
		},
		resetAndPlay: function()
		{
			if(this.am.verbose)
				cp.log("AudioObject "+ this.id+" resetAndPlay()");
				
			this.ended = false;
			
			this.setCurrentTime(0);
			this.play();
		},
		show: function()
		{
			if(this.am.verbose)
				cp.log("AudioObject "+ this.id+" show()");
			this.hidden = false;
		},
		hide: function()
		{
			if(this.am.verbose)
				cp.log("AudioObject "+ this.id+" hide()");
		
			this.hidden = true;
			this.pause();
		},
		pause: function()
		{
			if(this.isSeekPending())
			{
				if(this.am.verbose && this.revoke)
					cp.log("AdObjPause deleting revoke "+ this.id);
				delete this.revoke;
			}

			if(this.paused)
				return;
			
			this.paused = true;

			if(this.am.verbose)
				cp.log("AdObjPause "+ this.id+" "+this.src);
				
			if(this.nativeAudio)
			{
				this.nativeAudio.pause();
				this.nativeAudio.pausedAt = new Date().getTime();
			}
		},
		setLoop: function(loop, loopFrames)
		{
			this.loop = loop;
			this.loopFrames = loopFrames;
			
			if(cp.IDEVICE == cp.device)
				this.cploop = loop;
			else
			{
				if(this.nativeAudio)
				{
					if(loop)
						this.nativeAudio.loop = true;
					else
						delete this.nativeAudio.loop;
				}
			}
		},
		setCurrentTime: function(time)
		{
			if(this.from == -1 && this.to == -1)//eventAudio
			{
				return;
			}
			
			if(this.am.verbose)
				cp.log("AudioObject "+ this.id+" setCurrentTime("+time+")");

			if(!this.nativeAudio)
			{
				this.seekToTime = time;
				if(this.am.verbose)
					cp.log('no native audio. Kept in pending...');
				return;
			}
		
			if(Math.abs(this.nativeAudio.currentTime - time) < 0.1)
			{
				if(this.am.verbose)
					cp.log('not seeking delta < 0.1');
					
				if(!cp.movie.ms.inQueue(this))
				{
					delete this.seekToTime;
				}

				return;
			}
			
			delete this.seekToTime;
			
			if(!this.paused)
			{
				if(this.am.verbose)
					cp.log('setting revoke to true');
				this.revoke = true;
				this.pause();
			}
			
			var seekSuccess = true;
			try
			{
				this.nativeAudio.currentTime = time;
				var delta = Math.abs(this.nativeAudio.currentTime - time);
				if(delta >= 0.05)
					seekSuccess = false;
			}
			catch(e)
			{
				var delta = Math.abs(this.nativeAudio.currentTime - time);
				if(delta >= 0.05)
					seekSuccess = false;
				else
					seekSuccess = true;
			}
			
			if(this.am.verbose)
				cp.log('seekSuccess = ' + seekSuccess);
			
			if(cp.movie.ms.enabled)
			{
				if(seekSuccess)
				{
					if(this.revoke)
					{
						if(this.am.verbose)
							cp.log('revoking play');
						delete this.revoke;
						this.play();
					}
				}
				else
				{
					if(this.am.verbose)
						cp.log('pause movie and add to seekQueue');

					this.seekToTime = time;
					this.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
					cp.movie.ms.addToQueue(this);
				}
			}
			else
			{
				if(this.revoke)
				{
					if(this.am.verbose)
						cp.log('revoking play');
					delete this.revoke;
					this.play();
				}
			}
		},
		isSeekPending: function()
		{
			if(this.from == -1 && this.to == -1)//eventAudio
			{
				return false;
			}
			var result = (undefined != this.seekToTime);
			//if(this.am.verbose)
				//cp.log("AudioObject "+ this.id+" isSeekPending " + result);
			return result;
		},
		finishPendingSeek: function()
		{
			if(!this.nativeAudio || !this.isSeekPending())
				return;
			
			if(this.am.verbose)
				cp.log("AudioObject "+ this.id+" finishPendingSeek");

			this.setCurrentTime(this.seekToTime);
		},
		seekTo: function(frame)
		{
			if(this.from == -1 && this.to == -1)//eventAudio
			{
				return true;
			}
			
			//if(this.from > frame) //removing this so that seeking from right to left is also taken care of
			//	return false;
				
			if(this.am.verbose)
				cp.log("AudioObject "+ this.id+" seekTo("+frame+")");
			if(this.loop && this.loopFrames)
			{
				if(this.from <= frame)
				{
					var f = (frame - this.from) % this.loopFrames;
					this.setCurrentTime(f /cpInfoFPS);
					this.ended = false;
					return true;
				}
			}
			else
			{
				if(this.from <= frame && this.to >= frame)
				{
					this.setCurrentTime((frame - this.from)/cpInfoFPS);
					this.ended = false;
					return true;
				}
				else if(this.to >= frame)
				{
					this.setCurrentTime(0);
					this.ended = false;
				}
			}
			
			if(this.id == 'bga')
				this.ended = true;
			return false;
		}
	}
	
	cp.MediaView = function(channel)
	{
		this.a = channel;
		
		if(!cp.MediaView.PROGRESS_WIDTH)
		{
			cp.MediaView.PROGRESS_WIDTH = 500;
			cp.MediaView.STATUS1_WIDTH = 100;
			cp.MediaView.STATUS2_WIDTH = 100;
			cp.MediaView.STATUS3_WIDTH = 100;
			cp.MediaView.STATUS_WIDTH = cp.MediaView.STATUS1_WIDTH + cp.MediaView.STATUS2_WIDTH + cp.MediaView.STATUS3_WIDTH;
			cp.MediaView.LEFT_OFFSET = 100;
			cp.MediaView.TOP_OFFSET = 5;
			cp.MediaView.HEIGHT = 15;
			cp.MediaView.GAP = 5;
			cp.MediaView.NUM_MEDIA_VIEWS = 0;
		}
		
		this.view = document.createElement("div");
		this.status = document.createElement("div");
		this.status2 = document.createElement("div");
		this.status3 = document.createElement("div");
		this.progressBar = document.createElement("div");
		this.srcNameBar = document.createElement("div");
		this.downloaded = document.createElement("div");
		this.playHead = document.createElement("div");
		document.body.appendChild(this.view);
		this.view.appendChild(this.status);
		this.view.appendChild(this.status2);
		this.view.appendChild(this.status3);
		this.view.appendChild(this.progressBar);
		this.progressBar.appendChild(this.downloaded);
		this.progressBar.appendChild(this.playHead);
		this.progressBar.appendChild(this.srcNameBar);
		
		this.view.style.cssText = "display:block; position:fixed; left:"+cp.MediaView.LEFT_OFFSET+"px; top:" + (cp.MediaView.TOP_OFFSET + cp.MediaView.NUM_MEDIA_VIEWS * (cp.MediaView.HEIGHT+cp.MediaView.GAP)) + "px; width:" + (cp.MediaView.STATUS_WIDTH + cp.MediaView.PROGRESS_WIDTH) +"px; height:"+cp.MediaView.HEIGHT+"px; background-color:#555555;opacity:0.5";
		this.status.style.cssText = "display:block; position:absolute; left:0px; top:0px; width:"+cp.MediaView.STATUS1_WIDTH+"px; height:"+cp.MediaView.HEIGHT+"px;background-color:#0000ff";
		this.status2.style.cssText = "display:block; position:absolute; left:"+cp.MediaView.STATUS1_WIDTH+"px; top:0px; width:"+cp.MediaView.STATUS2_WIDTH+"px; height:"+cp.MediaView.HEIGHT+"px;background-color:#ffffff";
		this.status3.style.cssText = "display:block; position:absolute; left:"+(cp.MediaView.STATUS1_WIDTH+cp.MediaView.STATUS2_WIDTH) +"px; top:0px; width:"+cp.MediaView.STATUS3_WIDTH+"px; height:"+cp.MediaView.HEIGHT+"px;background-color:#ffffff";
		this.progressBar.style.cssText = "display:block; position:absolute; left:" + cp.MediaView.STATUS_WIDTH + "px; top:0px; width:"+cp.MediaView.PROGRESS_WIDTH+"px; height:"+cp.MediaView.HEIGHT+"px;background-color:#888888";
		this.srcNameBar.style.cssText = "display:block; position:absolute; left:0px; top:0px; width:"+cp.MediaView.PROGRESS_WIDTH+"px; height:"+cp.MediaView.HEIGHT+"px;white-space: nowrap; overflow: hidden;";
		this.downloaded.style.cssText = "display:block; position:absolute; left:0px; top:0px; width:0px; height:"+(cp.MediaView.HEIGHT/3)+"px;background-color:#10ff10;";
		this.playHead.style.cssText = "display:block; position:absolute; left:0px; top:0px; width:2px; height:"+(cp.MediaView.HEIGHT/3)+"px;background-color:#101010";
		
		++cp.MediaView.NUM_MEDIA_VIEWS;
	}

	cp.MediaView.prototype = 
	{
		update:function()
		{
			var cpMedia = this.a.cpAudio;
			if(!cpMedia)
				cpMedia = this.a.cpVideo;
			
			var index = this.a.src.indexOf('/ar/');
			if(index == -1)
				index = this.a.src.indexOf('/vr/');
			if(index == -1)
				index = this.a.src.indexOf('cp_non_existing_media');
			if(index == -1)
				index = 0;
			var s = this.a.src.substr(index);
			if(cpMedia)
				s += '.' + cpMedia.src + '.' + cpMedia.id;
			this.srcNameBar.innerHTML = "<font style='font-size:9px'>" + s + "</font>";
			
			if(this.a.paused)
				s = 'paused';
			else
				s = 'playing';
			if(this.a.ended)
				s += ' end';
			this.status2.innerHTML = "<font color='#000000' style='font-size:8px'>"+s+"</font>";
			
			if(cpMedia)
			{
				if(cpMedia.paused)
					s = 'paused';
				else
					s = 'playing';
				if(cpMedia.ended)
					s += ' end';
				if(cpMedia.hidden)
					s += ' hdn';
			}
			else
				s = 'NULL';
			
			this.status3.innerHTML = "<font color='#000000' style='font-size:8px'>"+s+"</font>";
			
			if(this.a.ended)
			{
				this.status.style.backgroundColor = "#ffff00";
				this.status.innerHTML = "<font color='#000000' style='font-size:8px'>Ended</font>";
			}
			else if(this.a && this.a.networkState == this.a.NETWORK_EMPTY)
			{
				this.status.style.backgroundColor = "#000000";
				this.status.innerHTML = "<font color='#ffffff' style='font-size:8px'>Empty</font>";
			}
			else if(this.a && this.a.networkState == this.a.NETWORK_IDLE)
			{
				this.status.style.backgroundColor = "#aaaaaa";
				this.status.innerHTML = "<font color='#000000' style='font-size:8px'>Idle</font>";
			}
			else if(this.a && this.a.networkState == this.a.NETWORK_LOADING)
			{
				this.status.style.backgroundColor = "#00ff00";
				this.status.innerHTML = "<font color='#000000' style='font-size:8px'>Loading</font>";
			}
			else if(this.a && this.a.networkState == this.a.NETWORK_NO_SOURCE)
			{
				this.status.style.backgroundColor = "#ff0000";
				this.status.innerHTML = "<font color='#ffffff' style='font-size:8px'>NoSrc</font>";
			}

			var duration;
			if(this.a && !isNaN(this.a.duration) && isFinite(this.a.duration))
				duration = this.a.duration;
			else if(cpMedia && cpMedia.duration)
				duration = cpMedia.duration;
				
			if(duration)
			{
				var buffered = this.a.buffered;
				if(buffered.length)
				{
					var downloaded = buffered.end(buffered.length - 1);
					this.downloaded.style.width = ((downloaded/duration)*cp.MediaView.PROGRESS_WIDTH) + 'px';
				}

				this.playHead.style.left = (this.a.currentTime/duration)*cp.MediaView.PROGRESS_WIDTH + 'px';
			}
		},
	}
	
	cp.AudioView = cp.MediaView;
	cp.VideoView = cp.MediaView;
	
	cp.AudioManager = function()
	{
		cp.movie.am = this;
		this.volume = 1;
		this.muted = false;
		this.loaded = false;
		this.verbose = false;
		this.viewAudio = false;
		
		this.errorCallBackFn = function(e)
		{
			if(-1 == this.src.indexOf('cp_non_existing_media'))
			{
				if(cp.exceptionalLogs)
				{
					cp.log('src = ' + this.src + ' error code = ' + (this.error?this.error.code:'NULL') + ' n/w state = ' + this.networkState);
					cp.log(e);
				}
				
				this.waitCount = 0;
			}
		}
		
		this.waitingFn = function(e)
		{
			var duration;
			if((!isNaN(this.duration)) && isFinite(this.duration)) 
				duration = this.duration;
			else if(this.cpAudio && this.cpAudio.duration)
				duration = this.cpAudio.duration;
			
			if(duration)
			{
				var delta = Math.abs(this.currentTime - duration);
				if(cp.movie.am.verbose)
					cp.log(this.cpSrc + ' wait came when delta = ' + delta );
				if( delta < 0.3)//some arbitrary cut off
				{
					if(cp.movie.am.verbose)
						cp.log('simulating arrival of ended event');
					cp.movie.am.onEndedCallBackFn.call(this, e);
					return;
				}
			}
			++this.waitCount;
			if(cp.movie.am.verbose)
			{
				var s = 'wait ' + this.waitCount + ' ' + this.cpSrc  + ' currTime = ' + this.currentTime + ' duration = ' + duration + ' curFrame = ' + cpInfoCurrentFrame;
					
				if(this.cpAudio)
				{
					s += ' id = ' + this.cpAudio.id;
					s += ' from ' + this.cpAudio.from;
					s += ' to ' + this.cpAudio.to;
				}
				cp.log(s);
			}
		}
		
		this.canPlayCallBackFn = function(e)
		{
			this.waitCount = 0;
			
			if(cp.movie.am.verbose)
				cp.log('cnPly ' + this.cpSrc + ' ' + (this.cpAudio?this.cpAudio.id:''));
		}
		
		this.onEndedCallBackFn = function(e)
		{
			this.waitCount = 0;
			if(this.cploop)
			{
				if(cp.movie.am.verbose)
					cp.log(this.cpSrc+' loop');
				if(this.cpAudio)
				{
					this.cpAudio.pause();
					this.cpAudio.seekTo(this.cpAudio.from);
					this.cpAudio.play();
				}
			}
			else
			{
				if(cp.movie.am.verbose)
					cp.log(this.cpSrc+' ended');
				this.endedAt = new Date().getTime();
				if(this.cpAudio)
				{
					this.cpAudio.ended = true;
					this.cpAudio.pause();
					
					if(this.cpAudio.id == 'spa')
						cp.movie.play();
				}
			}
		}
		
		this.PlayPauseCallBackFn = function(e)
		{
			if(this.paused)
			{
				this.pausedAt = new Date().getTime();
			}
			if(this.cpAudio)
				this.cpAudio.paused = this.paused;
		}
		
		if(cp.device == cp.IDEVICE)
			this.MAX_AUDIO_CHANNELS = 1;
		else
			this.MAX_AUDIO_CHANNELS = 10;

		this.audioChannels = new Array();
		
		for(var i = 0; i < this.MAX_AUDIO_CHANNELS; ++i)
		{
			var a = cp.NativeAudio();
			a.cpSrc = '';
			a.cpAudio = null;
			a.ended = false;
			a.addEventListener("ended", this.onEndedCallBackFn, false);
			a.addEventListener("error", this.errorCallBackFn, false);
			
			if(cp.device == cp.IDEVICE && cp.IOSFlavor >= cp.IOS5)
			{
				a.addEventListener("waiting", this.waitingFn, false);
				a.addEventListener("canplay", this.canPlayCallBackFn, false);
			}
			
			a.addEventListener("play", this.PlayPauseCallBackFn, false);
			a.addEventListener("pause", this.PlayPauseCallBackFn, false);
			a.waitCount = 0;
			a.muted = this.muted;
			a.volume = this.volume;
			this.audioChannels[i] = a;
		}
		
		if(this.verbose)
		{
			var tmp = cp.NativeAudio();
			cp.log('NetworkStates: NETWORK_EMPTY = ' + tmp.NETWORK_EMPTY + ' NETWORK_IDLE = ' + tmp.NETWORK_IDLE + ' NETWORK_LOADING = ' + tmp.NETWORK_LOADING + ' NETWORK_NO_SOURCE = ' + tmp.NETWORK_NO_SOURCE);
			tmp = null;
		}
	}
		
	cp.AudioManager.prototype = 
	{
		pendingAudios: function()
		{
			var numPending = 0;
			for(var i = 0; i < this.MAX_AUDIO_CHANNELS; ++i)
			{
				var a = this.audioChannels[i];
				if(a.waitCount > 0 && !a.endedAt)
					++numPending;
			}

			if(numPending > 0)
			{
				if(this.numPending != numPending)
				{
					this.numPending = numPending;
					if(cp.verbose)
						cp.log(numPending + ' audios pending');
				}
			}
			else
			{
				if(this.numPending && cp.verbose)
					cp.log('no audios pending');
				this.numPending = 0;
			}

			return numPending;
		},
		
		resetAllWaitingAudios:function()
		{
			for(var i = 0; i < this.MAX_AUDIO_CHANNELS; ++i)
			{
				var a = this.audioChannels[i];
				a.waitCount = 0;
			}
		},
		
		LRUAudioIndex: function()
		{
			var t = new Date().getTime();
			var idx = -1;
			var currFrame = cpInfoCurrentFrame;
			for(var i = 0; i < this.MAX_AUDIO_CHANNELS; ++i)
			{
				var a = this.audioChannels[i];
				if(a.ended || a.paused)
				{
					if(a.endedAt)
					{
						if(t > a.endedAt)
						{
							t = a.endedAt;
							idx = i;
						}
					}
					else if(a.pausedAt)
					{
						if(t > a.pausedAt)
						{
							t = a.pausedAt;
							idx = i;
						}
					}
					else if(idx == -1 && currFrame > a.cpTo)
					{
						idx = i;
					}
				}
			}
			return idx;
		},
		
		allocAudioChannel: function(audioObj, createNewIfAllChannelsAreBusy)
		{
			if(this.verbose)
				cp.log('allocAudioChannel ' + audioObj.id + ' ' + audioObj.src + ' ' + createNewIfAllChannelsAreBusy);
			if(cp.IDEVICE == cp.device)
			{
				var a1 = this.audioChannels[0];
				if(!a1.paused)
				{
					if(a1.cpAudio != null)
						a1.cpAudio.pause();
					else
						a1.pause();
				}

				if(a1.cpAudio != null)
					a1.cpAudio.nativeAudio = null;

				audioObj.nativeAudio = a1;
				a1.cpAudio = audioObj;
				//a1.loop = audioObj.loop;
				a1.cploop = audioObj.cploop;
				a1.ended = false;
				delete a1.endedAt;
				delete a1.pausedAt;

				if(a1.cpSrc != audioObj.src)
				{
					a1.waitCount = 0;
					a1.cpSrc = audioObj.src;
					a1.src = audioObj.src;
					
					if(a1.currentTime >0)
						if(this.verbose)
							cp.log('currentTime after changing src = ' + a1.currentTime+ ' going to wait...');
							
					if(cp.IOSFlavor <= cp.IOS5)
					{
						while(a1.currentTime > 0)
							a1.load();
					}
					else
					{
						var lLoadWaitCtr = 0;
						while(a1.currentTime > 0 && ++lLoadWaitCtr < 100)
						{
							if(cp.verbose)
								cp.log("waiting for " + lLoadWaitCtr + " time");
							a1.load();
						}
					}
					
					if(this.verbose)
						cp.log('finished waiting');
				}
				else if(!audioObj.isSeekPending())
					audioObj.seekTo(audioObj.from);
				
				audioObj.finishPendingSeek();
				a1.load();
				return;
			}
			else
			{
				for(var i = 0; i < this.MAX_AUDIO_CHANNELS; ++i)
				{
					var a = this.audioChannels[i];
					if(a.cpSrc == audioObj.src && (a.ended || a.paused))
					{
						if(a.cpAudio != null)
						{
							a.cpAudio.nativeAudio = null;
							a.cpAudio = null;
						}
						
						audioObj.nativeAudio = a;
						a.cpAudio = audioObj;
						a.loop = audioObj.loop;
						a.ended = false;
						delete a.endedAt;
						delete a.pausedAt;
						a.cpTo = audioObj.to;

						if(!audioObj.isSeekPending())
							audioObj.seekTo(audioObj.from);

						audioObj.finishPendingSeek();
						a.load();
						if(this.verbose)
							cp.log('allocAudioChannel found existing @ ' + i);
						return true;
					}
				}
				for(var i = 0; i < this.MAX_AUDIO_CHANNELS; ++i)
				{
					var a = this.audioChannels[i];
					if(a.cpSrc == '')
					{
						a.waitCount = 0;
						a.cpSrc = audioObj.src;
						a.src = audioObj.src;
						audioObj.nativeAudio = a;
						a.cpAudio = audioObj;
						a.loop = audioObj.loop;
						a.ended = false;
						delete a.endedAt;
						delete a.pausedAt;
						a.cpTo = audioObj.to;
						audioObj.finishPendingSeek();
						a.load();
						if(this.verbose)
							cp.log('allocAudioChannel found empty slot @ ' + i);
						return true;
					}
				}
				var idx = this.LRUAudioIndex();
				if(-1 != idx)
				{
					var a = this.audioChannels[idx];
					if(a.cpAudio != null)
					{
						a.cpAudio.nativeAudio = null;
						a.cpAudio = null;
					}
					
					audioObj.nativeAudio = a;
					a.cpAudio = audioObj;
					a.loop = audioObj.loop;
					a.ended = false;
					delete a.endedAt;
					delete a.pausedAt;
					a.cpTo = audioObj.to;
					
					if(a.cpSrc != audioObj.src)
					{
						a.waitCount = 0;
						a.cpSrc = audioObj.src;
						a.src = audioObj.src;
					}
					else if(!audioObj.isSeekPending())
						audioObj.seekTo(audioObj.from);

					audioObj.finishPendingSeek();
					a.load();
					if(this.verbose)
						cp.log('allocAudioChannel re-used LRU slot @ ' + idx);
					return true;
				}
				
				if(createNewIfAllChannelsAreBusy)
				{
					var a = cp.NativeAudio();
					a.addEventListener("ended", this.onEndedCallBackFn, false);
					a.addEventListener("error", this.errorCallBackFn, false);
					a.addEventListener("waiting", this.waitingFn, false);
					a.addEventListener("canplay", this.canPlayCallBackFn, false);
					a.addEventListener("play", this.PlayPauseCallBackFn, false);
					a.addEventListener("pause", this.PlayPauseCallBackFn, false);
					a.waitCount = 0;					
					a.cpSrc = audioObj.src;
					a.src = audioObj.src;
					audioObj.nativeAudio = a;
					a.cpAudio = audioObj;
					a.muted = this.muted;
					a.volume = this.volume;
					a.loop = audioObj.loop;
					a.ended = false;
					a.cpTo = audioObj.to;
					audioObj.finishPendingSeek();
					a.load();
					this.audioChannels[this.MAX_AUDIO_CHANNELS] = a;
					
					if(this.audioViews)
						this.audioViews[this.MAX_AUDIO_CHANNELS] = new cp.AudioView(a);
					
					if(this.verbose)
						cp.log('allocAudioChannel created new @ ' + this.MAX_AUDIO_CHANNELS);
					
					++this.MAX_AUDIO_CHANNELS;
					return true;
				}
			}
			return false;
		},
		
		allocSingletonAudioChannelForPlayAudioAction: function(src)
		{
			if(this.verbose)
				cp.log('allocSingletonAudioChannelForPlayAudioAction ' + src);

			var a = cp.NativeAudio();
			a.addEventListener("ended", this.onEndedCallBackFn, false);
			a.addEventListener("error", this.errorCallBackFn, false);
			a.addEventListener("waiting", this.waitingFn, false);
			a.addEventListener("canplay", this.canPlayCallBackFn, false);
			a.addEventListener("play", this.PlayPauseCallBackFn, false);
			a.addEventListener("pause", this.PlayPauseCallBackFn, false);
			a.waitCount = 0;					
			a.cpSrc = src;
			a.src = src;
			cp.movie.am.singletonPlayAudio.nativeAudio = a;
			a.cpAudio = cp.movie.am.singletonPlayAudio;
			a.muted = this.muted;
			a.volume = this.volume;
			a.ended = false;
			a.load();
			
			if(this.audioViews)
				this.audioViews.push(new cp.AudioView(a));
			
		},
		
		load:function(postLoadFunc)
		{
			//load bg audio
			var bgAudioData = cp.model.data.pbga;
			if(bgAudioData)
			{
				this.bgAudio = new cp.AudioObject(this, 'bga', bgAudioData.src, 1, bgAudioData.to, bgAudioData.du);
				this.bgAudio.deviceSpecificInit();
				
				if(bgAudioData.l)
				{
					this.bgAudio.setLoop(true);
				}
				this.bgAudio.stopAtProjectEnd = bgAudioData.spe;
				this.bgAudio.lowerVolumeOnSlidesWithAudio = bgAudioData.lv;
				this.bgAudio.lowerVolumePercentage = bgAudioData.vp;
			}
			
			
			//load slides' audio
			var slideAudioNames = (cp.model.data.project_main.slideAudios || "").split(',');
			this.slideAudios = {};
			for(var i =0; i < slideAudioNames.length; ++i)
			{
				if('' != slideAudioNames[i])
				{
					var slideAudioData = cp.model.data[slideAudioNames[i]];
					var newAudioObj = new cp.AudioObject(this, slideAudioNames[i], slideAudioData.src, slideAudioData.from, slideAudioData.to, slideAudioData.du);
					newAudioObj.deviceSpecificInit();
					
					if(slideAudioData.l)
					{
						newAudioObj.setLoop(true, slideAudioData.lf);
					}
					
					this.slideAudios[slideAudioNames[i]] = newAudioObj;
					newAudioObj = null;
				}
			}
			
			//load slide items' audios
			this.objectAudios = {};
			this.eventAudios = {};
			var slideNames = (cp.model.data.project_main.slides || "").split(',');
			for(var j=0; j < slideNames.length; ++j)
			{
				var slideData = cp.model.data[slideNames[j]];
				var objectAudioNames = (slideData.oa || "").split(',');
				var slideObjectAudios = {};
				var slideHasObjectAudio = false;
				for(var k = 0; k < objectAudioNames.length; ++k)
				{
					if('' != objectAudioNames[k])
					{
						var objectAudioData = cp.model.data[objectAudioNames[k]];
						var newAudioObj = new cp.AudioObject(this, objectAudioNames[k], objectAudioData.src, objectAudioData.from, objectAudioData.to, objectAudioData.du);
						newAudioObj.mouseAudio = objectAudioData.msa;
						newAudioObj.deviceSpecificInit();
						slideObjectAudios[objectAudioNames[k]] = newAudioObj;
						newAudioObj = null;
						slideHasObjectAudio = true;
					}
				}
				if(slideHasObjectAudio)
				{
					this.objectAudios[slideNames[j]] = slideObjectAudios;
				}
			
				var eventAudioNames = (slideData.ea || "").split(',');
				var slideEventAudios = {};
				var slideHasEventAudio = false;
				for(var k = 0; k < eventAudioNames.length; ++k)
				{
					if('' != eventAudioNames[k])
					{
						var eventAudioData = cp.model.data[eventAudioNames[k]];
						var newAudioObj = new cp.AudioObject(this, eventAudioNames[k], eventAudioData.src, -1, -1, eventAudioData.du);
						newAudioObj.deviceSpecificInit();
						slideEventAudios[eventAudioNames[k]] = newAudioObj;
						newAudioObj = null;
						slideHasEventAudio = true;
					}
				}
				
				if(slideHasEventAudio)
				{
					this.eventAudios[slideNames[j]] = slideEventAudios;
				}
			}

			if(cp.movie.playKeyTap)
			{
				this.keyTap = new cp.AudioObject(this, 'pkt', 'ar/KeyClick.mp3', -1, -1, undefined);
				this.keyTap.deviceSpecificInit();
			}
			
			this.singletonPlayAudio = new cp.AudioObject(this, 'spa', '', -1, -1, undefined);
			//load project's event audio
			var projEventAudioNames = (cp.model.data.project_main.ea || "").split(',');
			for(var i =0; i < projEventAudioNames.length; ++i)
			{
				if('' != projEventAudioNames[i])
				{
					var eventAudioData = cp.model.data[projEventAudioNames[i]];
					this.deviceSpecificInit(eventAudioData.src);
				}
			}

			if(cp.IDEVICE == cp.device)
			{
				try{
					this.audioChannels[0].src = 'cp_non_existing_media';
				}catch(e){}
				try{
					this.audioChannels[0].load();
				}catch(e){}
			}
			
			this.loaded = true;
			if(postLoadFunc)
				postLoadFunc();
		},
		
		deviceSpecificInit: function(src)
		{
			if(cp.IDEVICE == cp.device)
			{
				this.audioChannels[0].src = src;
				this.audioChannels[0].load();
			}
		},
		
		playKeyTap: function()
		{
			if(this.verbose)
				cp.log('playKeyTap');
				
			if(cp.device == cp.IDEVICE)
			{
				if(this.audioPlaying || cp.movie.stage.VideoPlaying)
				{
					if(this.verbose)
						cp.log('audioPlaying ' + this.audioPlaying + ' videoPlaying ' + this.videoPlaying);
					return;
				}
			}
			
			if(!this.muted && 1 == cp.movie.speed)
			{
				this.eventAudioPlaying = this.keyTap.id;
				this.keyTap.resetAndPlay();
			}
		},
	
		seekTo:function(frame)
		{
			if(!this.loaded)
				return -1;
				
			var idx = cp.movie.stage.getSlideIndexForFrame(frame);
			if(-1 == idx)
				return -1;
				
			this.ssc = 0;
			
			this.changeCurrentSlide(idx, frame, false);

			if(this.currentSlide)
			{
				var objectAudios = this.objectAudios[this.currentSlide];
				
				if(objectAudios)
				{
					for(var j in objectAudios)
					{
						var objectAudio = objectAudios[j];
						if(objectAudio)
						{
							if(!objectAudio.seekTo(frame))
							{
								objectAudio.pause();
							}
						}
					}
				}
			}
		
			if(this.currentSlideAudio)
			{
				var slideAudio = this.slideAudios[this.currentSlideAudio];
				
				if(slideAudio)
				{
					if(!slideAudio.seekTo(frame))
					{
						slideAudio.pause();
					}
				}
			}
			
			if(this.bgAudio)
			{
				this.bgAudio.seekTo(frame);
			}
			
			if(this.singletonPlayAudio)
				this.singletonPlayAudio.pause();
			
			return idx;
		},
		
		changeCurrentSlide:function(newSlideIdx, newSlideFromFrame, seek)
		{
			var newSlide = cp.movie.stage.getSlideNameForIndex(newSlideIdx);
			
			if(newSlide == '' || this.currentSlide == newSlide)
			{
				return;
			}
			
			if(this.verbose)
				cp.log('am changing slide from '+this.currentSlide+ ' to ' + newSlide + ' seek = ' + seek);
			
			this.interactiveItemFound = false;
			this.ssc = 0;//stop slide audio on item click
			this.ssp = 0;//stop slide audio in item pause
			
			if(this.currentSlide)
			{
				var objectAudios = this.objectAudios[this.currentSlide];
				
				if(objectAudios)
				{
					for(var j in objectAudios)
					{
						var objectAudio = objectAudios[j];
						objectAudio.pause();
						//objectAudio.seekTo(objectAudio.from);
					}
				}
				
				var eventAudios = this.eventAudios[this.currentSlide];
				
				if(eventAudios)
				{
					for(var k in eventAudios)
					{
						var eventAudio = eventAudios[k];
						if(eventAudio.src.indexOf('ar/Mouse.mp3') == -1 && eventAudio.src.indexOf('ar/dblmouse.mp3') == -1)
							eventAudio.pause();
					}
				}
				
				this.singletonPlayAudio.pause();
				
				if(this.currentSlideAudio)
				{
					var slideAudio = this.slideAudios[this.currentSlideAudio];
					if(slideAudio.from > newSlideFromFrame || slideAudio.to < newSlideFromFrame)
					{
						slideAudio.pause();
						delete this.currentSlideAudio;
					}
					else if(undefined == seek || true == seek)
						slideAudio.seekTo(newSlideFromFrame);
				}
			}
			
			this.currentSlide = newSlide;
			if(!this.currentSlideAudio)
			{
				this.currentSlideAudio = cp.model.data[this.currentSlide].audioName;
			}
			
			if(undefined == seek || true == seek)
			{
				if(this.currentSlide)
				{
					var objectAudios = this.objectAudios[this.currentSlide];
					
					if(objectAudios)
					{
						for(var j in objectAudios)
						{
							var objectAudio = objectAudios[j];
							objectAudio.seekTo(objectAudio.from);
						}
					}
				}
			}
			
			var currentSlideData = cp.model.data[this.currentSlide];
			if(currentSlideData && currentSlideData.sba)
			{
				this.stopBGAudio = true;
			}
			else
			{
				this.stopBGAudio = false;
			}
		},
		
		preload: function(slideName)
		{
			if(!this.loaded || 1 != cp.movie.speed)
				return;
			
			if(this.verbose)
				cp.log('audio manager preload ' + slideName);
				
			var slideData = cp.model.data[slideName];
			if(slideData)
			{
				var slideAudio = this.slideAudios[slideData.audioName];
				if(slideAudio && !slideAudio.nativeAudio)
				{
					if(!this.allocAudioChannel(slideAudio, false))
						return;
				}
			}
			
			var objectAudios = this.objectAudios[slideName];
			for(var j in objectAudios)
			{
				var objectAudio = objectAudios[j];
				if(objectAudio)
				{
					if(!this.allocAudioChannel(objectAudio, false))
						return;
				}
			}
			
			var eventAudios = this.eventAudios[slideName];
			if(eventAudios)
			{
				for(var k in eventAudios)
				{
					var eventAudio = eventAudios[k];
					if(eventAudio)
					{
						if(!this.allocAudioChannel(eventAudio, false))
							return;
					}
				}
			}
			
			if(this.keyTap)
			{
				this.allocAudioChannel(this.keyTap, false);
			}
		},
		
		play:function(frame)
		{
			this.pace = null;

			if(!this.loaded || 1 != cp.movie.speed)
				return;
				
			if(cp.device == cp.IDEVICE)
			{
				var a = this.audioChannels[0];
				if(!a.paused && !a.ended && a.cpAudio && a.cpAudio.id == this.eventAudioPlaying)
					return;
					
				if(cp.movie.stage.VideoPlaying)
					return;
			}
			
			var foregroundAudioPlaying = false;
			var audioObj = null;
			var slideAudioObj = null;
			if(this.currentSlide)
			{
				var objectAudios = this.objectAudios[this.currentSlide];
				
				if(objectAudios)
				{
					for(var j in objectAudios)
					{
						var objectAudio = objectAudios[j];
						if(objectAudio && !objectAudio.ended)
						{
							if(objectAudio.from <= frame && objectAudio.to >= frame)
							{
								if(cp.device == cp.IDEVICE)
								{
									if(null == audioObj)
									{
										audioObj = objectAudio;
									}
								}
								else
								{
									objectAudio.play();
								}
								foregroundAudioPlaying = true;
							}
							else
							{
								if(!objectAudio.mouseAudio)
									objectAudio.pause();
							}
						}
					}
				}
			}
			
			if(this.currentSlideAudio)
			{
				var slideAudio = this.slideAudios[this.currentSlideAudio];
				
				if(slideAudio && !slideAudio.ended)
				{
					if(slideAudio.from <= frame && slideAudio.to >= frame)
					{
						if(cp.device == cp.IDEVICE)
						{
							if(null == audioObj)
							{
								audioObj = slideAudio;
								slideAudioObj = slideAudio;
							}
							if(this.ssc != 1 && this.ssp != 1)
								foregroundAudioPlaying = true;
						}
						else
						{
							if(this.ssc != 1 && this.ssp != 1)
							{
								slideAudio.play();
								slideAudioObj = slideAudio;
								foregroundAudioPlaying = true;
							}
							else
								slideAudio.pause();
						}
					}
					else
					{
						slideAudio.pause();
					}
				}
			}
			
			if(this.bgAudio)
			{
				if(foregroundAudioPlaying)
				{
					if(this.bgAudio.lowerVolumeOnSlidesWithAudio)
					{
						if(this.bgAudio.nativeAudio)
							this.bgAudio.nativeAudio.volume = (this.volume * (this.bgAudio.lowerVolumePercentage/100.0));
					}
				}
				else
				{
					if(this.bgAudio.nativeAudio)
						this.bgAudio.nativeAudio.volume = this.volume;
				}
				
				if(cp.device == cp.IDEVICE)
				{
					if(null == audioObj)
						audioObj = this.bgAudio;
				}
				else
				{
					if(this.stopBGAudio)
						this.bgAudio.pause();
					else
						this.bgAudio.play();
				}
			}
			
			this.audioPlaying = null;
			if(cp.device == cp.IDEVICE && audioObj)
			{
				if(slideAudioObj == audioObj)
				{
					if(this.ssc != 1 && this.ssp != 1)
					{
						this.audioPlaying = audioObj.id;
						audioObj.play();
					}
				}
				else if(this.bgAudio == audioObj)
				{
					if(this.stopBGAudio)
						audioObj.pause();
					else
					{
						this.audioPlaying = audioObj.id;
						audioObj.play();
					}
				}
				else
				{
					this.audioPlaying = audioObj.id;
					audioObj.play();
				}
			}
			
			if(cp.IDEVICE == cp.device)
			{
				if(1 == cp.movie.speed)
				{
					if(audioObj && audioObj != this.bgAudio
					&& !audioObj.ended && !audioObj.paused && !audioObj.loop 
					&& audioObj.nativeAudio && audioObj.nativeAudio.currentTime > 0)
					{
						this.pace = audioObj.from + audioObj.nativeAudio.currentTime * cpInfoFPS;
						if(this.pace > audioObj.to)
							this.pace = audioObj.to;
					}
					else
						this.pace = cp.movie.vdm.pace();
				}
			}
			else
			{
				if(1 == cp.movie.speed && !this.interactiveItemFound)
				{
					if(slideAudioObj && !slideAudioObj.ended && !slideAudioObj.paused && !slideAudioObj.loop && slideAudioObj.nativeAudio && slideAudioObj.nativeAudio.currentTime > 0)
					{
						this.pace = slideAudioObj.from + slideAudioObj.nativeAudio.currentTime * cpInfoFPS;
						if(this.pace > slideAudioObj.to)
							this.pace = slideAudioObj.to;
					}
					else
						this.pace = cp.movie.vdm.pace();
				}
			}
		},
		
		pause:function(reasonForPause)
		{
			this.reasonForPause = reasonForPause;
			
			if(reasonForPause == cp.ReasonForPause.PLAYBAR_ACTION ||
			reasonForPause == cp.ReasonForPause.CPCMNDPAUSE ||
			reasonForPause == cp.ReasonForPause.MOVIE_REWIND_STOP ||
			reasonForPause == cp.ReasonForPause.EVENT_VIDEO_PAUSE ||
			reasonForPause == cp.ReasonForPause.ONLY_ONE_MEDIUM_CAN_PLAY)
			{
				if(this.currentSlide)
				{
					var objectAudios = this.objectAudios[this.currentSlide];
					
					if(objectAudios)
					{
						for(var j in objectAudios)
						{
							var objectAudio = objectAudios[j];
							objectAudio.pause();
						}
					}
					
					//Should we pause event audios of this slide??
				}
			}
			
			var frame = cpInfoCurrentFrame;
			if(this.currentSlideAudio)
			{
				var slideAudio = this.slideAudios[this.currentSlideAudio];
				
				if(slideAudio)
				{
					if(slideAudio.from <= frame && slideAudio.to >= frame)
					{
						if(reasonForPause == cp.ReasonForPause.INTERACTIVE_ITEM)
						{
							if(this.ssp == 1)
								slideAudio.pause();
						}
						else if(reasonForPause == cp.ReasonForPause.PLAYBAR_ACTION ||
						reasonForPause == cp.ReasonForPause.CPCMNDPAUSE ||
						reasonForPause == cp.ReasonForPause.MOVIE_REWIND_STOP ||
						reasonForPause == cp.ReasonForPause.EVENT_VIDEO_PAUSE ||
						reasonForPause == cp.ReasonForPause.ONLY_ONE_MEDIUM_CAN_PLAY)
							slideAudio.pause();
					}
					else
					{
						slideAudio.pause();
					}
				}
			}
				
			if(this.bgAudio)
			{
				if(reasonForPause == cp.ReasonForPause.MOVIE_ENDED)
				{
					if(this.bgAudio.stopAtProjectEnd)
					{
						this.bgAudio.pause();
					}
					//else...continue playback
				}
				else
				{
					if(reasonForPause == cp.ReasonForPause.PLAYBAR_ACTION ||
					reasonForPause == cp.ReasonForPause.CPCMNDPAUSE ||
					reasonForPause == cp.ReasonForPause.MOVIE_REWIND_STOP ||
					reasonForPause == cp.ReasonForPause.EVENT_VIDEO_PAUSE ||
					reasonForPause == cp.ReasonForPause.ONLY_ONE_MEDIUM_CAN_PLAY)
					{
						this.bgAudio.pause();
					}
				}
			}
		},
		
		pauseCurrentSlideAudioForInteractiveClick:function()
		{
			if(this.verbose)
				cp.log('pause currentSlide Audio for SSC');
			var frame = cpInfoCurrentFrame;
			if(this.currentSlideAudio)
			{
				var slideAudio = this.slideAudios[this.currentSlideAudio];
				
				if(slideAudio)
				{
					if(slideAudio.from <= frame && slideAudio.to >= frame)
					{
						this.ssc = 1;
						slideAudio.pause();
					}
				}
			}				
		},
		
		mute:function(aMute)
		{
			var m;
			if(aMute == true || aMute > 0)
				m = true;
			else
				m = false;
		
			var playbar = document.getElementById("playbar");
			if(m&&playbar['mute']!=undefined)
				playbar.mute();
			if(!m&&playbar['unmute']!=undefined)
				playbar.unmute();
				
			for(var i = 0; i < this.MAX_AUDIO_CHANNELS; ++i)
				this.audioChannels[i].muted = m;
			this.muted = m;
		},
		
		setVolume:function(v)
		{
			if(v < 0)
			{
				v = 0;
			}
			if(v > 1)
			{
				v = 1;
			}
			
			this.volume = v;
				
			for(var i = 0; i < this.MAX_AUDIO_CHANNELS; ++i)
				this.audioChannels[i].volume = v;
		},
		
		playPauseEventAudio: function(eventAudioName, play)
		{
			if(cp.device == cp.IDEVICE)
			{
				if(this.audioPlaying || cp.movie.stage.VideoPlaying)
					return;
			}
			
			if(this.muted || 1 != cp.movie.speed)
				return;
				
			if(this.currentSlide)
			{
				var eventAudios = this.eventAudios[this.currentSlide];
				
				if(eventAudios)
				{
					var eventAudio = eventAudios[eventAudioName];
					
					if(eventAudio)
					{
						if(play)
						{
							this.eventAudioPlaying = eventAudio.id;
							eventAudio.resetAndPlay();
						}
						else
						{
							eventAudio.pause();
						}
					}
				}
			}
		},
		
		showHideObjectAudio: function(objectAudioName, show)
		{
			if(this.currentSlide)
			{
				var objectAudios = this.objectAudios[this.currentSlide];
				
				if(objectAudios)
				{
					var objectAudio = objectAudios[objectAudioName];
					
					if(objectAudio)
					{
						if(show)
						{
							objectAudio.show();
						}
						else
						{
							objectAudio.hide();
						}
					}
				}
			}
		},
		
		/*print: function()
		{
			//cp.log('***** Audio status *******');
			for(var i in this.objectAudios)
			{
				var objectAudios = this.objectAudios[i];
				
				if(objectAudios)
				{
					for(var j in objectAudios)
					{
						var objectAudio = objectAudios[j];
						objectAudio.print();
					}
				}
			}
			
			for(var k in this.slideAudios)
			{
				var slideAudio = this.slideAudios[k];
				
				if(slideAudio)
				{
					slideAudio.print();
				}
			}
				
			if(this.bgAudio)
			{
				this.bgAudio.print();
			}
			//cp.log('**********************');
		},*/

		updateAudioViews: function()
		{
			if(this.viewAudio && this.audioViews)
				for(var i in this.audioViews)
					this.audioViews[i].update();
		},
	}
	
	
	cp.VARIABLE_CREATED_EVENT = 0;
	cp.VARIABLE_CHANGED_EVENT = 1;
	cp.SPECIFIC_VARIABLE_CHANGED_EVENT = 2;
	cp.SLIDEENTEREVENT = 3;	
	cp.SLIDEEXITEVENT = 4;

    cp.INTERACTIVEITEMSUBMITEVENT = 5;    
    cp.MOVIEPAUSEEVENT = 6;
    cp.MOVIERESUMEEVENT = 7;
    cp.MOVIESTARTEVENT = 8;
    cp.MOVIESTOPEVENT = 9;
    cp.QUESTIONSKIPEVENT = 10;
    cp.QUESTIONSUBMITEVENT = 11;
    cp.STARTPLAYBARSCRUBBINGEVENT = 12;
    cp.ENDPLAYBARSCRUBBINGEVENT = 13;   
cp.MOVIEFOCUSINEVENT = 14;
    cp.MOVIEFOCUSLOSTEVENT = 15; 
    
	var EventListeners = new Array();
	EventListeners[cp.VARIABLE_CREATED_EVENT] = new Array();
	EventListeners[cp.VARIABLE_CHANGED_EVENT] = new Array();
	EventListeners[cp.SPECIFIC_VARIABLE_CHANGED_EVENT] = new Array();
	EventListeners[cp.SLIDEENTEREVENT] = new Array();
	EventListeners[cp.SLIDEEXITEVENT] = new Array();
	
  
	EventListeners[cp.INTERACTIVEITEMSUBMITEVENT] = new Array();
    EventListeners[cp.MOVIEPAUSEEVENT] = new Array();
    EventListeners[cp.MOVIERESUMEEVENT] = new Array();
    EventListeners[cp.MOVIESTARTEVENT] = new Array();
    EventListeners[cp.MOVIESTOPEVENT] = new Array();
    EventListeners[cp.QUESTIONSKIPEVENT] = new Array();
    EventListeners[cp.QUESTIONSUBMITEVENT] = new Array(); 
    EventListeners[cp.STARTPLAYBARSCRUBBINGEVENT] = new Array();
    EventListeners[cp.ENDPLAYBARSCRUBBINGEVENT] = new Array();
    EventListeners[cp.MOVIEFOCUSINEVENT] = new Array();
    EventListeners[cp.MOVIEFOCUSLOSTEVENT] = new Array();     
   
	function updateVarText(element, checkVisibility)
	{
		var iVar = 0, iText = 0;
		var nVars = 0, nTexts = 0, oneVarLen = 0;
		var tempStr = '', innerDivId = '', isVisible = false;
		var parentFrameset = null;
		var checkForVisibility = false;
		if ( checkVisibility )
			checkForVisibility = true;
		if(element.id)
		{
			var elementData = cp.model.data[element.id];
			if(elementData)
			{
				var text = elementData.vt;
				var evalText = '';
				if(text)
				{
					if(element.drawingBoard)
					{
						var canvasId = elementData.mdi;
						var canvasItem = null;
						if(canvasId)
						{
							canvasItem = cp.model.data[canvasId];
						}
						var drawingBoard = element.drawingBoard;
						if(canvasItem && canvasItem.b && drawingBoard)
						{
							var nhtmlelems = 2;
							var innerDiv = null;
							if(drawingBoard.children.length < nhtmlelems)
							{
								var margins = {};
								if(undefined != elementData.lm)
								{
									margins.lm = elementData.lm;
									margins.tm = elementData.tm;
									margins.rm = elementData.rm;
									margins.bm = elementData.bm;
								}
								innerDiv = document.createElement('div');
								innerDiv.className = 'cp-vtxt';
								innerDivId = canvasId + '-vtext';
								innerDiv.id = innerDivId;
								// Check visibility.
								parentFrameset = cp.movie.stage.getFrameset( element.id );
								if ( canvasItem && parentFrameset && parentFrameset.isStarted && 1 == canvasItem.visible )
									isVisible = true;
								innerDiv.style.cssText = "word-wrap:break-word;margin-left:" + ((canvasItem.b[0] + margins.lm) - canvasItem.vb[0]) + "px; margin-top:" + ((canvasItem.b[1] + margins.tm) - canvasItem.vb[1]) + "px; width: " + (canvasItem.b[2] - canvasItem.b[0] - (margins.lm + margins.rm)) +"px; height:" + (canvasItem.b[3] - canvasItem.b[1] - (margins.tm + margins.bm)) + "px;line-height:90%;overflow:hidden;";
								if ( ! isVisible )
									innerDiv.style.visibility = 'hidden';
								if(canvasItem.tr)
									applyTransform(innerDiv,canvasItem.tr);
								if(canvasItem.sh)
									applyShadow(innerDiv,canvasItem.sh);
								if ( parentFrameset )
									parentFrameset.htmlDependents.push( innerDiv );
								cp.movie.stage.addToParentChildMap( element.id, innerDivId );
								drawingBoard.appendChild(innerDiv);
							}
							else
							{
								innerDiv = drawingBoard.children[ nhtmlelems - 1 ];
								if ( innerDiv && checkForVisibility ) {
									if ( canvasItem && 1 == canvasItem.visible )
										innerDiv.style.visibility = 'visible';									
								}
							}
						
							try
							{
								// The variables can have various lengths. So we need to be able to break down the variables, set their values
								// and then merge them back.
								if ( undefined != elementData.vars && undefined != elementData.varLens && undefined != elementData.texts ) {
									// Now we need to create the text.
									nVars = elementData.vars.length, nTexts = elementData.texts.length;
									while ( true ) {
										evalText += elementData.texts[ iText++ ];
										if ( iVar < nVars ) {
											tempStr = window[ elementData.vars[ iVar ] ];
											if ( undefined == tempStr )
												tempStr = '';
											oneVarLen = elementData.varLens[ iVar ];
											if ( tempStr.length > oneVarLen )
												tempStr = tempStr.substr( 0, oneVarLen );
											++iVar;
											evalText += tempStr;
										}
										if ( iText >= nTexts )
											break;
									}
									innerDiv.innerHTML = evalText;
								}
								else 
									innerDiv.innerHTML = text;
							}
							catch(e){
								cp.log(e);
							}
						}
					}
				}
			}
		}
	}
	
	function updateNoSkipFramesAndUpdateVarText(cpElement)
	{
		if(cpElement.element)
		{
			updateVarText(cpElement.element, true);
		}
		if(cpElement.pa)
		{
			cp.movie.stage.noSkipFrames[cpElement.pa] = cpElement.pa;
		}
		if(cpElement.psv)
		{
			cp.movie.stage.noSkipFrames[cpElement.psv] = cpElement.psv;
		}
	}
	function tellListener(listener, evt)
	{
		try{
			if(listener.id)
			{
				updateVarText(listener);
			}
			else
			{
				listener(evt);
			}
		}
		catch(e){}
	}
	
	function PrivateEventListener(evt)
	{
		//cp.log("evt listener :" + evt.cpData.varName);
		if(evt.cpName == 'CPVariableValueChangedEvent')
		{
			var arr = EventListeners[cp.VARIABLE_CHANGED_EVENT];
			tellAllListeners(evt,arr);			
			
			for(var k = 0; k < evt.cpData.notify.length; ++k)
			{
				var name = evt.cpData.notify[k];
				var arr2 = EventListeners[cp.SPECIFIC_VARIABLE_CHANGED_EVENT];
				for(var j = 0; j < arr2.length; ++j)
				{
					if(arr2[j].n == name)
					{
						var listener = arr2[j].l;

                        if (arr2[j].r)
                            evt.reciever = arr2[j].r;

						tellListener(listener, evt);
					}
				}
			}
		}
		else if(evt.cpName == 'CPVariableCreatedEvent')
		{
			var arr = EventListeners[cp.VARIABLE_CREATED_EVENT];
			tellAllListeners(evt,arr);			
		}		
		else if(evt.cpName == 'CPSlideEnter')
		{
			var arr = EventListeners[cp.SLIDEENTEREVENT];
            tellAllListeners(evt,arr);			
		}
		else if(evt.cpName == 'CPSlideExit')
		{
			var arr = EventListeners[cp.SLIDEEXITEVENT];
			tellAllListeners(evt,arr);
		}       
        else if(evt.cpName == 'CPInteractiveItemSubmit')
		{
			var arr = EventListeners[cp.INTERACTIVEITEMSUBMITEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPMoviePause')
		{
			var arr = EventListeners[cp.MOVIEPAUSEEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPMovieResume')
		{
			var arr = EventListeners[cp.MOVIERESUMEEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPMovieStart')
		{
			var arr = EventListeners[cp.MOVIESTARTEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPMovieStop')
		{
			var arr = EventListeners[cp.MOVIESTOPEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPQuestionSkip')
		{
			var arr = EventListeners[cp.QUESTIONSKIPEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPQuestionSubmit')
		{
			var arr = EventListeners[cp.QUESTIONSUBMITEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPStartPlaybarScrub')
		{
			var arr = EventListeners[cp.STARTPLAYBARSCRUBBINGEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPEndPlaybarScrub')
		{
			var arr = EventListeners[cp.ENDPLAYBARSCRUBBINGEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPMovieFocusIn')
		{
			var arr = EventListeners[cp.MOVIEFOCUSINEVENT];
			tellAllListeners(evt,arr);
		}
        else if(evt.cpName == 'CPMovieFocusLost')
		{
			var arr = EventListeners[cp.MOVIEFOCUSLOSTEVENT];
			tellAllListeners(evt,arr);
		}
	}

    function tellAllListeners(evt,arr)
    {
			for(var i =0; i < arr.length; ++i)
			{
				var listener = arr[i];
            if (listener.r)
                evt.reciever = listener.r;
			tellListener(listener.l, evt);
			}
		}
	
	cp.EventManager = function()
	{
		cp.em = this;
		if((/*!document.createEventObject &&*/ !document.createEvent) || !document.addEventListener)
		{
			alert('EVENT FIRING WILL NOT WORK');
		}
		
		document.addEventListener('propertyChange', PrivateEventListener, false);
		this.verbose = false;
	}
	
	
	cp.EventManager.prototype = 
	{
		fireEvent: function(eventName, args)
		{
			if(document.createEvent)
			{
				var evt = document.createEvent("Events");
				evt.initEvent('propertyChange', true, true, null );
				evt.cpName = eventName;
				evt.cpData = args;
				return !document.dispatchEvent(evt);
			}
		},
		
		addEventListener : function(listener, type, varname,reciever)
		{
			if(this.verbose)
				cp.log("cp.em.addEventListener : " + listener + " " + type + " " + varname);
			if(type == cp.VARIABLE_CREATED_EVENT || type == cp.VARIABLE_CHANGED_EVENT ||
				type == cp.SLIDEENTEREVENT || type == cp.SLIDEEXITEVENT ||
				type == cp.STARTPLAYBARSCRUBBINGEVENT || type == cp.INTERACTIVEITEMSUBMITEVENT ||
				type == cp.MOVIEPAUSEEVENT || type == cp.MOVIERESUMEEVENT ||
				type == cp.MOVIESTARTEVENT || type == cp.MOVIESTOPEVENT ||
				type == cp.QUESTIONSKIPEVENT || type == cp.QUESTIONSUBMITEVENT ||
                type == cp.MOVIEFOCUSINEVENT || type == cp.MOVIEFOCUSLOSTEVENT ||
				type == cp.ENDPLAYBARSCRUBBINGEVENT)
			{
				var array = EventListeners[type];
				array.push({l:listener, r:reciever});
				if(this.verbose)
					cp.log(array);
				return true;
			}
			else if(type == cp.SPECIFIC_VARIABLE_CHANGED_EVENT)
			{
				var array = EventListeners[type];
				array.push({l:listener, n:varname,r:reciever});
				if(this.verbose)
					cp.log(array);
				return true;
			}
			
			return false;
		},
		
		removeEventListener : function(listener, type, varname)
		{
			if(this.verbose)
				cp.log("cp.em.removeEventListener : " + listener + " " + type + " " + varname);
			var retVal = false;
			if(type == cp.VARIABLE_CREATED_EVENT || type == cp.VARIABLE_CHANGED_EVENT ||
            type == cp.SLIDEENTEREVENT || type == cp.SLIDEEXITEVENT ||
				type == cp.STARTPLAYBARSCRUBBINGEVENT || type == cp.INTERACTIVEITEMSUBMITEVENT ||
				type == cp.MOVIEPAUSEEVENT || type == cp.MOVIERESUMEEVENT ||
				type == cp.MOVIESTARTEVENT || type == cp.MOVIESTOPEVENT ||
				type == cp.QUESTIONSKIPEVENT || type == cp.QUESTIONSUBMITEVENT ||
                type == cp.MOVIEFOCUSINEVENT || type == cp.MOVIEFOCUSLOSTEVENT ||		 
				type == cp.ENDPLAYBARSCRUBBINGEVENT)
			{
				var array = EventListeners[type];
				if(listener.id != undefined)
				{
					for(var i = 0; i < array.length; ++i)
					{
						if(array[i].l.id == listener.id)
						{
							array.splice(i,1);
							retVal = true;
						}
					}
				}
				else
				{
				for(var i = 0; i < array.length; ++i)
				{
					if(array[i].l == listener)
					{
						array.splice(i,1);
							retVal = true;
						}
					}
				}
				if(retVal)
				{
					if(this.verbose)
						cp.log(array);
				}
			}
			else if(type == cp.SPECIFIC_VARIABLE_CHANGED_EVENT)
			{
				var array = EventListeners[type];
				if(varname != undefined && varname != '')
				{
					if(listener.id != undefined)
					{
						for(var i = 0; i < array.length; ++i)
						{
							if(array[i].l.id == listener.id && array[i].n == varname)
							{
								array.splice(i,1);
								retVal = true;
							}
						}
					}
					else
					{
				for(var i = 0; i < array.length; ++i)
				{
					if(array[i].l == listener && array[i].n == varname)
					{
						array.splice(i,1);
								retVal = true;
							}
						}
					}
				}
				else
				{
					if(listener.id != undefined)
					{
						for(var i = 0; i < array.length; ++i)
						{
							if(array[i].l.id == listener.id)
							{
								array.splice(i,1);
								retVal = true;
							}
						}
					}
					else
					{
						for(var i = 0; i < array.length; ++i)
						{
							if(array[i].l == listener)
							{
								array.splice(i,1);
								retVal = true;
							}
						}
					}
					}
				if(retVal)
				{
					if(this.verbose)
						cp.log(array);
				}

			}
			return retVal;
		}
	}
	
	var vh = {};

	function getCaptivateVersion()
	{
		if(vh._CaptivateVersion)
			return vh._CaptivateVersion;
		else
			return '';
	}
	
	function createInternalVariable(variableName,variableValue)
	{
		eval('vh._' + variableName + ' = variableValue;');
	}
	
	function StoreVariableValue(variableName,variableValue)
	{
		var lOldValue = null;
		if(variableName && variableName != '')
		{
			lOldValue = eval('vh._' + variableName);
			if(lOldValue != variableValue)
			{
				eval('vh._' + variableName +' = variableValue;');
			}
		}
		return lOldValue;
	}

	function setVariableValueImpl(variableName,variableValue,notifyNames)
	{
		var lOldValue = null;
		
		if(variableName != '')
		{
			lOldValue = StoreVariableValue(variableName,variableValue);
			if(cp.em && lOldValue != variableValue)
			{
				var evtArgs = {
					captivateVersion:getCaptivateVersion(),
					varName:variableName,
					oldVal:lOldValue,
					newVal:variableValue,
					notify:notifyNames
				};
				cp.em.fireEvent('CPVariableValueChangedEvent', evtArgs);
			}
		}
		else
		{
			if(cp.em)
			{
				var evtArgs = {
					captivateVersion:getCaptivateVersion(),
					varName:'',
					newVal:variableValue,
					notify:notifyNames
				};
				cp.em.fireEvent('CPVariableValueChangedEvent', evtArgs);
			}
		}
	}
	
	function getCpCmndVolume()
	{
		return vh._cpCmndVolume;
	}
	
	function setCpCmndVolume(aVolume)
	{
		if(aVolume < 0)
		{
			aVolume = 0;
		}
		if(aVolume > 1)
		{
			aVolume = 1;
		}
		
		cp.movie.am.setVolume(aVolume);
		cp.movie.vdm.setVolume(aVolume);
		setVariableValueImpl('cpCmndVolume',aVolume,['cpCmndVolume']);
	}
	
	function setCpCmndMute(aMute)
	{
		cp.movie.am.mute(aMute);
		cp.movie.vdm.mute(aMute);
		setVariableValueImpl("cpCmndMute",aMute,['cpCmndMute', 'rdcmndMute']);
	}
	
	function getCpCmndMute()
	{
		return vh._cpCmndMute;
	}
	
	function getCpCmndPlaybarMoved()
	{
		return vh._cpCmndPlaybarMoved;
	}
	
	function setCpCmndPlaybarMoved(aMoved)
	{
		setVariableValueImpl("cpCmndPlaybarMoved",aMoved,['cpCmndPlaybarMoved', 'rdcmndPlaybarMoved']);
	}
	
	function getCpCmndShowPlaybar()
	{
		return vh._cpCmndShowPlaybar;
	}
	
	function setCpCmndShowPlaybar(inShow)
	{
		//Dont show playbar if branch Aware is ON
		if(inShow && cp.movie && cp.movie.playbackController)
		{
			 var lQuizController = cp.movie.playbackController.GetQuizController();	
			 if(lQuizController && lQuizController.GetQuizBranchAware())
					return;
		}
		
		var playbar = document.getElementById("playbar");
		if(playbar != undefined)
		{
			if(!inShow)
				playbar.style.display = 'none';
			else
				playbar.style.display = 'block';
		}
		setVariableValueImpl("cpCmndShowPlaybar",inShow,['cpCmndShowPlaybar']);
	}

	
	function getCpCmndCC()
	{	
		return vh._cpCmndCC;
	}
	
	function setCpCmndCC(aCC)
	{
		if(aCC)
			cp.movie.cc.style.visibility = '';
		else
			cp.movie.cc.style.visibility = 'hidden';
		setVariableValueImpl("cpCmndCC",aCC,['cpCmndCC', 'rdcmndCC']);
	}
	
	function getCpCmndRewindAndPlay()
	{	
		return vh._cpCmndRewindAndPlay;
	}
	
	function setCpCmndRewindAndPlay(aRewindAndPlay)
	{
		if(aRewindAndPlay)
			cp.movie.rewind();
		setVariableValueImpl("cpCmndRewindAndPlay",aRewindAndPlay,['cpCmndRewindAndPlay', 'rdcmndRewindAndPlay']);
	}

	function getCpCmndRewindAndStop()
	{	
		return vh._cpCmndRewindAndStop;
	}
	
	function setCpCmndRewindAndStop(aRewindAndStop)
	{
		if(aRewindAndStop)
		{
			cp.movie.jumpToFrame(1);
			cp.movie.pause(cp.ReasonForPause.MOVIE_REWIND_STOP);
		}
		setVariableValueImpl("cpCmndRewindAndStop",aRewindAndStop,['cpCmndRewindAndStop', 'rdcmndRewindAndStop']);
	}	
	
	function getCpCmndPreviousSlide()
	{	
		return vh._cpCmndPreviousSlide;
	}
	
	function setCpCmndPreviousSlide(aPrevious)
	{
		if(aPrevious)
		{
			cp.jumpToPreviousSlide();
		}
		setVariableValueImpl("cpCmndPreviousSlide",aPrevious,['cpCmndPreviousSlide', 'cpCmndPrevious', 'rdcmndPreviousSlide', 'rdcmndPrevious']);
	}
	
	function setCpCmndPreviousOnReview(aPrevious)
	{
		if(!aPrevious)
			return;		
		if(!cp.movie)
			return;
		
		var lPreviousSlide = -1;
		var lIsInReviewMode = false;
		if(cp.movie.playbackController)
		{
		 	var lQuizController = cp.movie.playbackController.GetQuizController();	
			lIsInReviewMode = lQuizController && lQuizController.GetIsInReviewMode();
		
			if(lIsInReviewMode) 
				lPreviousSlide = lQuizController.GetPreviousQuestionSlideNumber();
		}
		if(lIsInReviewMode && (lPreviousSlide >= 0))
			cpCmndGotoSlideAndResume = lPreviousSlide;				
		else
			cpCmndPreviousSlide = aPrevious;	
	}

	function getCpCmndResume()
	{	
		//return vh._cpCmndResume;
		return !cp.movie.paused;
	}
	
	function setCpCmndResume(aCmndResume)
	{
		if(aCmndResume)
		{
			cp.movie.play();
		}
		setVariableValueImpl("cpCmndResume",aCmndResume,['cpCmndResume', 'rdcmndResume']);
	}
	
	function setCpCmndNextOnReview(aVal)
	{
		if(!aVal)
			return;		
			
		if(!cp.movie)
			return;
		
		var lNextSlide = -1;
		var lIsInReviewMode = false;
		if(cp.movie.playbackController)
		{
		 	var lQuizController = cp.movie.playbackController.GetQuizController();	
			lIsInReviewMode = lQuizController && lQuizController.GetIsInReviewMode();
		
			if(lIsInReviewMode) 
				lNextSlide = lQuizController.GetNextQuestionSlideNumber();
		
			
		}
		if(lIsInReviewMode && (lNextSlide >= 0))
			cpCmndGotoSlideAndResume = lNextSlide;				
		else
			cpCmndNextSlide = aVal;	
	}
	
	function setCpCmndGotoFrame(aFrameNum)
	{
		cp.movie.jumpToFrame(aFrameNum);
		setVariableValueImpl("",aFrameNum,['cpCmndGotoFrame', 'rdcmndGotoFrame']);
	}
	
	function setCpCmndGotoFrameAndResume(aFrameNum)
	{
		cp.movie.jumpToFrame(aFrameNum);
		cp.movie.play();
		setVariableValueImpl("",aFrameNum,['cpCmndGotoFrameAndResume', 'rdcmndGotoFrameAndResume']);
	}
	
	function setCpCmndGotoSlide(aSlide)
	{
		if( aSlide < 0 || aSlide >= cp.movie.stage.slides.length)
		{
			cpCmndResume = true;
			return;
		}
			
		var slideName = cp.movie.stage.slides[aSlide];
		var slideData = cp.model.data[slideName];
		if(slideData)
		{
			cp.movie.jumpToFrame(slideData.from);
		}
		setVariableValueImpl("",aSlide,['cpCmndGotoSlide', 'rdcmndGotoSlide']);
	}
			
	function setCpCmndFastForward(aVal)
	{
		var oldSpeed = cp.movie.speed;
		
		switch(cp.movie.speed)
		{
			case 1:
			case 2:
				cp.movie.speed *=2;
				break;
			case 4:
			default:
				cp.movie.speed = 1;
				break;
		}
		
		if(oldSpeed == cp.movie.speed)
			return;
		
		cp.movie.resetFPS();
		
		if(1 == cp.movie.speed)
		{
			cp.movie.am.seekTo(cpInfoCurrentFrame);
			cp.movie.vdm.seekTo(cpInfoCurrentFrame, false);
		}
		else
		{
			cp.movie.am.pause();
			//TODO::video speed up. But SWF output merely mutes the audio (including Video's audio) and lets video play in its own pace!!
		}
		
		if(IsRegisteredForUpdateTimeBasedSystemVariables())
		{
			UnregisterForUpdateTimeBasedSystemVariables();
			RegisterForUpdateTimeBasedSystemVariables();
		}
		
		setVariableValueImpl("",cpInfoFPS,["cpInfoFPS", "rdinfoFPS"]);
		setVariableValueImpl("cpCmndFastForward",aVal,['cpCmndFastForward']);
	}
	
	function setCpLockTOC(aVal)
	{
		setVariableValueImpl("cpLockTOC",aVal,['cpLockTOC']);
	}
	
	function getCpLockTOC()
	{
		return vh._cpLockTOC;
	}
	
	function setCpCmndTOCVisible(aVal)
	{
		setVariableValueImpl("cpCmndTOCVisible",aVal,['cpCmndTOCVisible']);		
		var toc = document.getElementById('toc');
		if(toc!=undefined && toc.animator)
		{
			if(aVal)
				toc.animator.showTOC();
			else
				toc.animator.hideTOC();
		}
	}
	
	function getCpCmndTOCVisible(aVal)
	{
		if(vh._cpCmndTOCVisible)
			return true;
		return false;
	}
	
	function setCpCmndGotoSlideAndResume(aSlide)
	{
		if( aSlide < 0 || aSlide >= cp.movie.stage.slides.length)
		{
			cpCmndResume = true;
			return;
		}
			
		var slideName = cp.movie.stage.slides[aSlide];
		var slideData = cp.model.data[slideName];
		if(slideData)
		{
			cp.movie.jumpToFrame(slideData.from);
			cp.movie.play();
		}
		setVariableValueImpl("",aSlide,['cpCmndGotoSlideAndResume']);
	}
	
	function setCpCmndGotoSlideByUIDAndResume(aSlide)
	{
		var slideName = 'Slide'+aSlide;
		var slideData = cp.model.data[slideName];
		if(slideData)
		{
			cp.movie.jumpToFrame(slideData.from);
			cp.movie.play();
			setVariableValueImpl("",aSlide,['cpCmndGotoSlideByUIDAndResume']);
		}
	}
	
	function getCpCmndExit()
	{
		return vh._cpCmndExit;
	}
	
	function setCpCmndExit(aVal)
	{
		setVariableValueImpl("cpCmndExit",aVal, ['cpCmndExit', 'rdcmndExit']);
		window.close();
		//TODO::look at //captivate\titan\dev\source\components\publish\swfpublish\flash\src\main\com\adobe\captivate\main\cpMovieController.as exit() and implement relevant equivalent code here
	}
	
	function setCpCmndNextSlide(aVal)
	{
		if(aVal)
		{
			cp.jumpToNextSlide();
		}
		setVariableValueImpl("cpCmndNextSlide",aVal, ['cpCmndNextSlide', 'cpCmndNext', 'rdcmndNextSlide', 'rdcmndNext']);
	}
	
	function setCpCmndPause(aVal)
	{
		if(aVal)
		{
			cp.movie.pause(cp.ReasonForPause.CPCMNDPAUSE);
		}
		setVariableValueImpl("cpCmndPause",aVal, ['cpCmndPause', 'rdcmndPause']);
	}
	
	function getCpCmndPause()
	{
		//return vh._cpCmndPause;
		return cp.movie.paused;
	}
	
	function setCpCmndInfo(aVal)
	{
		setVariableValueImpl("cpCmndInfo",aVal, ['cpCmndInfo', 'rdcmndInfo']);
		
		/*//TODO::impl
		if(aVal)
		{
			m_MovieController.doShowInfo();
		}*/
	}
	
	function getCpCmndInfo()
	{
		return vh._cpCmndInfo;
	}
	
	function getCpInfoAuthor()
	{
		return vh._cpInfoAuthor;
	}
	
	function getCpInfoDescription()
	{
		return vh._cpInfoDescription;
	}
	
	function getCpQuizInfoLastSlidePointScored()
	{
		return vh._cpQuizInfoLastSlidePointScored;
	}
	
	function setCpQuizInfoLastSlidePointScored( iVal )
	{
		setVariableValueImpl("cpQuizInfoLastSlidePointScored",iVal,['cpQuizInfoLastSlidePointScored']);
	}
	
	function getCpQuizInfoPointsPerQuestionSlide()
	{
		return vh._cpQuizInfoPointsPerQuestionSlide;
	}
	
	function setCpQuizInfoPointsPerQuestionSlide( iVal )
	{
		setVariableValueImpl("cpQuizInfoPointsPerQuestionSlide",iVal,['cpQuizInfoPointsPerQuestionSlide']);
	}
	
	function getCpQuizInfoNegativePointsOnCurrentQuestionSlide()
	{
		return vh._cpQuizInfoNegativePointsOnCurrentQuestionSlide;
	}
	
	function setCpQuizInfoNegativePointsOnCurrentQuestionSlide( iVal )
	{
		setVariableValueImpl("cpQuizInfoNegativePointsOnCurrentQuestionSlide",iVal,['cpQuizInfoNegativePointsOnCurrentQuestionSlide']);
	}
	
	function getCpQuizInfoQuestionPartialScoreOn()
	{
		return vh._cpQuizInfoQuestionPartialScoreOn;
	}
	
	function setCpQuizInfoQuestionPartialScoreOn( iVal )
	{
		setVariableValueImpl("cpQuizInfoQuestionPartialScoreOn",iVal,['cpQuizInfoQuestionPartialScoreOn']);
	}
	
	function getCpInfoCurrentSlideLabel()
	{
		return vh._cpInfoCurrentSlideLabel;
	}
	
	function setCpInfoCurrentSlideLabel(aLabel)
	{
		setVariableValueImpl("cpInfoCurrentSlideLabel",aLabel,['cpInfoCurrentSlideLabel']);
	}

	function getCpQuizInfoQuizPassPercent()
	{
		return vh._cpQuizInfoQuizPassPercent;
	}
	
	function setCpQuizInfoQuizPassPercent( iVal )
	{
		setVariableValueImpl("cpQuizInfoQuizPassPercent",iVal,['cpQuizInfoQuizPassPercent']);
	}

	function getCpQuizInfoTotalProjectPoints()
	{
		return vh._cpQuizInfoTotalProjectPoints;
	}

	function setCpQuizInfoTotalProjectPoints( iVal )
	{
		setVariableValueImpl("cpQuizInfoTotalProjectPoints",iVal,["cpQuizInfoTotalProjectPoints"]);
	}

	function getCpInfoPrevSlide()
	{
		return vh._cpInfoPrevSlide;
	}
	
	function setCpInfoPrevSlide(aPrevSlide)
	{
		setVariableValueImpl("cpInfoPrevSlide",aPrevSlide,['cpInfoPrevSlide']);
	}
	
	function getCpQuizInfoTotalCorrectAnswers()
	{
		if(!cp.movie)
			return 0;
		if(!cp.movie.playbackController)
				return;
		var lQuizController = cp.movie.playbackController.GetQuizController();
		if(lQuizController)
			return lQuizController.GetTotalCorrectQuestions();
		return 0;
	}
	
	function setCpQuizInfoTotalCorrectAnswers( iVal)
	{
		setVariableValueImpl("cpQuizInfoTotalCorrectAnswers",iVal,["cpQuizInfoTotalCorrectAnswers"]);
	}
	
	function getCpInfoPercentage()
	{
		if(!cp.movie)
			return 0;
		if(!cp.movie.playbackController)
				return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(lQuizController)
		{
			var lScore = lQuizController.GetScore();
			var lMaxScore = lQuizController.GetMaxScore();
			if(lMaxScore != 0)
				return Math.round((lScore*100)/lMaxScore);
					}
		return 0;			
	}
	
	function setCpInfoPercentage( iVal)
	{
		setVariableValueImpl("cpInfoPercentage",iVal,["cpInfoPercentage"]);
	}
	
	function getCpQuizInfoTotalQuestionsPerProject()
	{
		return vh._cpQuizInfoTotalQuestionsPerProject;
	}
	
	function setCpQuizInfoTotalQuestionsPerProject( iVal)
	{
		setVariableValueImpl("cpQuizInfoTotalQuestionsPerProject",iVal,["cpQuizInfoTotalQuestionsPerProject"]);
	}
	
	function getCpQuizInfoQuizPassPoints()
	{
		return vh._cpQuizInfoQuizPassPoints;
	}
	
	function setCpQuizInfoQuizPassPoints( iVal )
	{
		setVariableValueImpl("cpQuizInfoQuizPassPoints",iVal,["cpQuizInfoQuizPassPoints"]);
	}
	
	function getCpQuizInfoQuestionSlideType()
	{
		return vh._cpQuizInfoQuestionSlideType;
	}
	
	function setCpQuizInfoQuestionSlideType(inStr)
	{
		setVariableValueImpl("cpQuizInfoQuestionSlideType",inStr,["cpQuizInfoQuestionSlideType"]);
	}

	function getCpQuizInfoTotalUnansweredQuestions()
	{
		return vh._cpQuizInfoTotalUnansweredQuestions;
	}
	
	function setCpQuizInfoTotalUnansweredQuestions( iVal )
	{
		setVariableValueImpl("cpQuizInfoTotalUnansweredQuestions",iVal,["cpQuizInfoTotalUnansweredQuestions"]);
	}
	
	function getCpInfoLastVisitedSlide()
	{
		return vh._cpInfoLastVisitedSlide;
	}
	
	function setCpInfoLastVisitedSlide(aSlide)
	{
		setVariableValueImpl("cpInfoLastVisitedSlide",aSlide,["cpInfoLastVisitedSlide"]);
	}
	
	function getCpQuizInfoMaxAttemptsOnCurrentQuestion()
	{
		return vh._cpQuizInfoMaxAttemptsOnCurrentQuestion;
	}
	
	function setCpQuizInfoMaxAttemptsOnCurrentQuestion( iVal)
	{
		setVariableValueImpl("cpQuizInfoMaxAttemptsOnCurrentQuestion",iVal,["cpQuizInfoMaxAttemptsOnCurrentQuestion"]);
	}
	
	function getCpQuizInfoQuestionSlideTiming()
	{
		return vh._cpQuizInfoQuestionSlideTiming;
	}
	
	function setCpQuizInfoQuestionSlideTiming( iVal )
	{
		setVariableValueImpl("cpQuizInfoQuestionSlideTiming",iVal,["cpQuizInfoQuestionSlideTiming"]);
	}
	
	function getCpInfoCompany()
	{
		return vh._cpInfoCompany;
	}
	function getCpQuizInfoAnswerChoice()
	{
		return vh._cpQuizInfoAnswerChoice;
	}
	function setCpQuizInfoAnswerChoice( iVal )
	{
		setVariableValueImpl("cpQuizInfoAnswerChoice",iVal,["cpQuizInfoAnswerChoice"]);
	}
	function getCpQuizInfoNoQuestionsPerQuiz()
	{
		return vh._cpQuizInfoNoQuestionsPerQuiz;
	}
	
	function setCpQuizInfoNoQuestionsPerQuiz( iVal )
	{
		setVariableValueImpl("cpQuizInfoNoQuestionsPerQuiz",iVal,["cpQuizInfoNoQuestionsPerQuiz"]);
	}
	
	function getCpQuizInfoPointsscored()
	{
		if(!cp.movie)
			return 0;
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(lQuizController)
			return lQuizController.GetScore();
			
		return 0;
	}
	
	function setCpQuizInfoPointsscored( iVal )
	{
		setVariableValueImpl("cpQuizInfoPointsscored",iVal,["cpQuizInfoPointsscored"]);
	}

	function getCpInfoCopyright()
	{
		return vh._cpInfoCopyright;
	}
	
	function getCpInfoWebsite()
	{
		return vh._cpInfoWebsite;
	}
			
	function getCpInfoProjectName()
	{
		return vh._cpInfoProjectName;
	}
	
	function getCpInfoEmail()
	{
		return vh._cpInfoEmail;
	}
	 
	function getCpInfoIsStandalone()
	{
		return false;
	}
	
	function getCpInfoHasPlaybar()
	{
		return vh._cpInfoHasPlaybar;
	}
	
	function getCpQuizInfoAttempts()
	{
		return vh._cpQuizInfoAttempts;
	}
	
	function setCpQuizInfoAttempts( iVal )
	{
		setVariableValueImpl("cpQuizInfoAttempts",iVal,["cpQuizInfoAttempts"]);
	}
	
	function getCpInfoFrameCount()
	{
		return cp.model.data.project_main.to;
	}
	
	function getCpQuizInfoTotalQuizPoints()
	{
		return vh._cpQuizInfoTotalQuizPoints;
	}
	function setCpQuizInfoTotalQuizPoints( iVal)
	{
		setVariableValueImpl("cpQuizInfoTotalQuizPoints",iVal,["cpQuizInfoTotalQuizPoints"]);
	}

	var timeBasedVarsUpdateIntervalID = 0;

	function leftPadWithZeroIfNeeded(num)
	{
		var retVal = '' + num;
		if(num >= 0 && num < 10)
			retVal = '0' + retVal;
			
		return retVal;
	}
	
	function UpdateTimeBasedSystemVariables( )
	{
		var lDate = new Date();
		
		if(vh._cpInfoEpochMS != lDate.getTime())
		{
			setVariableValueImpl("cpInfoEpochMS",lDate.getTime() ,["cpInfoEpochMS"]);
		}
		
		if(vh._cpInfoElapsedTimeMS != (cpInfoEpochMS - cp.movie.startTime))
		{
			setVariableValueImpl("cpInfoElapsedTimeMS", cpInfoEpochMS - cp.movie.startTime ,["cpInfoElapsedTimeMS"]);
		}
		
		if(vh._cpInfoCurrentMinutes != lDate.getMinutes())
		{
			setVariableValueImpl("cpInfoCurrentMinutes", lDate.getMinutes(), ["cpInfoCurrentMinutes"]);
		}

		if(vh._cpInfoCurrentHour != lDate.getHours())
		{
			setVariableValueImpl("cpInfoCurrentHour", lDate.getHours(), ["cpInfoCurrentHour"]);
		}
		
		var currentTime = (lDate.getHours() + ":" + lDate.getMinutes() + ":" + lDate.getSeconds());
		if(vh._cpInfoCurrentTime != currentTime)
		{
			setVariableValueImpl("cpInfoCurrentTime", currentTime, ["cpInfoCurrentTime"]);
		}
		
		if(vh._cpInfoCurrentDay != lDate.getDay() + 1)
		{
			setVariableValueImpl("cpInfoCurrentDay", lDate.getDay() + 1, ["cpInfoCurrentDay"]);
		}
		
		if(vh._cpInfoCurrentYear != lDate.getFullYear())
		{
			setVariableValueImpl("cpInfoCurrentYear", lDate.getFullYear(), ["cpInfoCurrentYear"]);
		}
		
		if(vh._cpInfoCurrentMonth != lDate.getMonth() + 1)
		{
			setVariableValueImpl("cpInfoCurrentMonth", leftPadWithZeroIfNeeded(lDate.getMonth() + 1),["cpInfoCurrentMonth"]);
		}
		
		if(vh._cpInfoCurrentDate != lDate.getDate())
		{
			setVariableValueImpl("cpInfoCurrentDate", leftPadWithZeroIfNeeded(lDate.getDate()), ["cpInfoCurrentDate"]);
		}
		
		var dateString = (lDate.getMonth() + 1) + "/" + lDate.getDate() + "/" + lDate.getFullYear();
		if(vh._cpInfoCurrentDateString != dateString)
		{
			setVariableValueImpl("cpInfoCurrentDateString", dateString , ["cpInfoCurrentDateString"]);
		}
	}
	
	function IsRegisteredForUpdateTimeBasedSystemVariables()
	{
		return (timeBasedVarsUpdateIntervalID != 0);
	}
	
	function RegisterForUpdateTimeBasedSystemVariables()
	{
		if(0 == timeBasedVarsUpdateIntervalID)
		{
			UpdateTimeBasedSystemVariables();
			timeBasedVarsUpdateIntervalID = setInterval(UpdateTimeBasedSystemVariables, 1000/cpInfoFPS);
		}
	}
	
	function UnregisterForUpdateTimeBasedSystemVariables()
	{
		if(0 != timeBasedVarsUpdateIntervalID)
		{
			clearInterval(timeBasedVarsUpdateIntervalID);
			timeBasedVarsUpdateIntervalID = 0;
		}
	}
	
	function getCpInfoCurrentDateString()
	{
		return vh._cpInfoCurrentDateString;
	}
	
	function getCpInfoCurrentDate()
	{
		return vh._cpInfoCurrentDate;
	}
	
	function getCpInfoCurrentMonth()
	{
		return vh._cpInfoCurrentMonth;
	}
	
	function getCpInfoCurrentYear()
	{
		return vh._cpInfoCurrentYear;
	}
	
	function getCpInfoCurrentDay()
	{
		return vh._cpInfoCurrentDay;
	}
	
	function getCpInfoCurrentTime()
	{
		return vh._cpInfoCurrentTime;
	}
	
	function getCpInfoCurrentHour()
	{
		return vh._cpInfoCurrentHour;
	}
		
	function getCpInfoCurrentMinutes()
	{
		return vh._cpInfoCurrentMinutes;
	}
	
	function getCpInfoEpochMS()
	{
		return vh._cpInfoEpochMS;
	}
	
	function getCpInfoElapsedTimeMS()
	{
		return vh._cpInfoElapsedTimeMS;
	}
	
	function getCpInfoCurrentSlideType()
	{
		var currSlideData =  cp.movie.stage.currentSlide;
		if(currSlideData)
		{
			return currSlideData.st;
		}
		return "";
	}
	
	/* Quiz Variables */
	function getCpQuizInfoPassFail()
	{
		if(!cp.movie)
			return false;
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(lQuizController)
			return lQuizController.GetIsPassed();
		return false;
	}
	
	function getCpInfoSlidesInProject()
	{
		//TODO::impl
		return 0;
	}
	
	function getCpInfoCurrentFrame()
	{
		return vh._cpInfoCurrentFrame;
	}
	
	function setCpInfoCurrentFrame(aCurrFrame)
	{
		setVariableValueImpl("cpInfoCurrentFrame",aCurrFrame, ["cpInfoCurrentFrame", "rdinfoCurrentFrame"]);
	}

	function getRdInfoCurrentSlide()
	{
		return cpInfoCurrentSlide - 1;
	}
	
	function getCpInfoCurrentSlide()
	{
		return vh._cpInfoCurrentSlide;
	}
	
	function setCpInfoCurrentSlide(aSlide)
	{
		setVariableValueImpl("cpInfoCurrentSlide",aSlide,["cpInfoCurrentSlide"]);
	}
	
	function getCpInfoSlideCount()
	{
		return cp.movie.stage.slides.length;
	}
	
	function getCpInfoFPS()
	{
		return cp.movie.fps*cp.movie.speed;
	}
	
	function getCpQuizScopeSlide()
	{
		return vh._cpQuizScopeSlide; 
	}
	
	function setCpQuizScopeSlide(aSlide)
	{
		setVariableValueImpl("cpQuizScopeSlide",aSlide,["cpQuizScopeSlide"]);
	}
	
	function getCpInQuizScope()
	{
		return vh._cpInQuizScope; 
	}
	
	function setCpInQuizScope(aInQuizScope)
	{
		if(cpInfoHasPlaybar)
		{
			if(cp.movie && cp.movie.playbackController)
			{
				var lQuizController = cp.movie.playbackController.GetQuizController();	
				if(lQuizController &&  lQuizController.GetHidePlaybarInQuiz())
				{
					if(aInQuizScope &&  !lQuizController.GetIsInReviewMode())
						cpCmndShowPlaybar = 0;
					else
						cpCmndShowPlaybar = 1;
				}
			}
		}			
		
		setVariableValueImpl("cpInQuizScope",aInQuizScope,["cpInQuizScope"]);
	}
	
	function getCpQuizInfoPretestPointsscored()
	{
		if(!cp.movie)
			return 0;
		if(!cp.movie.playbackController)
			return 0;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(lQuizController)
			 return lQuizController.GetPretestScore();
			 
		return 0;
	}
	
	function getCpQuizInfoPretestScorePercentage()
	{
		if(!cp.movie)
			return 0;
		if(!cp.movie.playbackController)
			return 0;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(lQuizController)
		{
			var lMaxPretestScore = lQuizController.GetMaxPretestScore() ;
			var lPretestScore = lQuizController.GetPretestScore() ;
			
			if ((lMaxPretestScore == undefined) || (lMaxPretestScore <= 0) || (lPretestScore == undefined) || (lPretestScore <= 0))
				return 0;
			
			return Math.round(lPretestScore*100.0/lMaxPretestScore);
		}
		
		return 0;			
	}
	
	function setCpCmndGotoQuizScopeSlide(aSlide)
	{
		if(!cp.movie)
			return;
		if(!cp.movie.playbackController)
			return;
		var lQuizController = cp.movie.playbackController.GetQuizController();	
		if(lQuizController)
			lQuizController.GotoQuizScopeSlide(aSlide);
	}
	
	function getCpInfoCourseID()
	{
		return vh._cpInfoCourseID;
	}

	function setCpInfoCourseID(val)
	{
		setVariableValueImpl("cpInfoCourseID",val,["cpInfoCourseID"]);
	}
	

	function getCpInfoCourseName()
	{
		return vh._cpInfoCourseName;
	}

	function setCpInfoCourseName(val)
	{
		setVariableValueImpl("cpInfoCourseName",val,["cpInfoCourseName"]);
	}

	function emptySetter(val){}
	
	function emptyGetter(){return null;}
	
	function assignSetterGetter(propertyName, setter, getter)
	{
		if(setter == null)
		{
			setter = emptySetter;
		}
		if(getter == null)
		{
			getter = emptyGetter;
		}
		if(Object.defineProperty)// Use the standards-based syntax
		{
			Object.defineProperty(window, propertyName, {get: getter,set: setter});
		}
		else if(window.__defineGetter__)//use legacy syntax
		{
			if(getter)
			{
				window.__defineGetter__(propertyName, getter);
			}
			if(setter)
			{
				window.__defineSetter__(propertyName, setter);
			}
		}
	}

	
	
	function assignSetterGetterForUserVar(x)
	{
		eval('(function(){var _' + x +';function get'+x+'(){return _'+x+';}function set'+x+'(val){setVariableValueImpl('+x+', val, ["'+x+'"]);} assignSetterGetter("'+x+'",set'+x+',get'+x+');})();');
	}
	
	cp.VarInfo = function(name, len, systemDefined)
	{
		this.name = name;
		this.len = len;
		this.systemDefined = systemDefined;
	}
	
	cp.VariablesManager = function()
	{
		cp.vm = this;
		this.varInfos = new Array();
		
		if (!Object.defineProperty && !window.__defineGetter__)
		{
			alert('VARIABLES SETTER GETTER WILL NOT WORK');
		}
		else
		{
			//commands
			assignSetterGetter('cpCmndVolume', setCpCmndVolume, getCpCmndVolume);
			assignSetterGetter('cpCmndMute', setCpCmndMute, getCpCmndMute);assignSetterGetter('rdcmndMute', setCpCmndMute, getCpCmndMute);
			assignSetterGetter('cpCmndCC', setCpCmndCC, getCpCmndCC);assignSetterGetter('rdcmndCC', null, getCpCmndCC);
			assignSetterGetter('cpCmndNext', setCpCmndNextSlide, null);assignSetterGetter('rdcmndNext', setCpCmndNextSlide, null);
			assignSetterGetter('cpCmndNextSlide', setCpCmndNextSlide, null);assignSetterGetter('rdcmndNextSlide', setCpCmndNextSlide, null);
			assignSetterGetter('cpCmndPrevious', setCpCmndPreviousSlide, getCpCmndPreviousSlide);assignSetterGetter('rdcmndPrevious', setCpCmndPreviousSlide, getCpCmndPreviousSlide);
			assignSetterGetter('cpCmndNextOnReview', setCpCmndNextOnReview, null);
			assignSetterGetter('cpCmndPreviousSlide', setCpCmndPreviousSlide, getCpCmndPreviousSlide);assignSetterGetter('rdcmndPreviousSlide', setCpCmndPreviousSlide, getCpCmndPreviousSlide);
			assignSetterGetter('cpCmndPreviousOnReview', setCpCmndPreviousOnReview, null);
			assignSetterGetter('cpCmndPlaybarMoved', setCpCmndPlaybarMoved, getCpCmndPlaybarMoved);assignSetterGetter('rdcmndPlaybarMoved', setCpCmndPlaybarMoved, getCpCmndPlaybarMoved);
			assignSetterGetter('cpCmndShowPlaybar', setCpCmndShowPlaybar, getCpCmndShowPlaybar);
			assignSetterGetter('cpCmndFastForward', setCpCmndFastForward, null);
			assignSetterGetter('cpCmndRewindAndPlay', setCpCmndRewindAndPlay, getCpCmndRewindAndPlay);assignSetterGetter('rdcmndRewindAndPlay', setCpCmndRewindAndPlay, getCpCmndRewindAndPlay);
			assignSetterGetter('cpCmndRewindAndStop', setCpCmndRewindAndStop, getCpCmndRewindAndStop);assignSetterGetter('rdcmndRewindAndStop', setCpCmndRewindAndStop, getCpCmndRewindAndStop);
			assignSetterGetter('cpCmndGotoFrame', setCpCmndGotoFrame, null);assignSetterGetter('rdcmndGotoFrame', setCpCmndGotoFrame, null);
			assignSetterGetter('cpCmndGotoFrameAndResume', setCpCmndGotoFrameAndResume, null);assignSetterGetter('rdcmndGotoFrameAndResume', setCpCmndGotoFrameAndResume, null);
			assignSetterGetter('cpCmndGotoSlide', setCpCmndGotoSlide, null);assignSetterGetter('rdcmndGotoSlide', setCpCmndGotoSlide, null);
			assignSetterGetter('cpCmndGotoSlideAndResume', setCpCmndGotoSlideAndResume, null);
			assignSetterGetter('cpCmndGotoSlideByUIDAndResume', setCpCmndGotoSlideByUIDAndResume, null);
			assignSetterGetter('cpCmndResume', setCpCmndResume, getCpCmndResume);assignSetterGetter('rdcmndResume', setCpCmndResume, getCpCmndResume);
			assignSetterGetter('cpCmndPause', setCpCmndPause, getCpCmndPause);assignSetterGetter('rdcmndPause', setCpCmndPause, getCpCmndPause);
			assignSetterGetter('cpCmndExit', setCpCmndExit, getCpCmndExit);assignSetterGetter('rdcmndExit', setCpCmndExit, getCpCmndExit);
			assignSetterGetter('cpLockTOC', setCpLockTOC, getCpLockTOC);
			assignSetterGetter('cpCmndInfo', setCpCmndInfo, getCpCmndInfo);assignSetterGetter('rdcmndInfo', setCpCmndInfo, getCpCmndInfo);
			assignSetterGetter('cpCmndTOCVisible', setCpCmndTOCVisible, getCpCmndTOCVisible);
			
			//info
			assignSetterGetter('cpInfoSlidesInProject', null, getCpInfoSlidesInProject);assignSetterGetter('rdinfoSlidesInProject', null, getCpInfoSlidesInProject);
			assignSetterGetter('rdinfoCurrentSlideInProject', null, (function(){return 0;}));
			assignSetterGetter('cpInfoFPS', null, getCpInfoFPS);assignSetterGetter('rdinfoFPS', null, getCpInfoFPS);
			assignSetterGetter('cpInfoAuthor', null, getCpInfoAuthor);
			assignSetterGetter('cpInfoCompany', null, getCpInfoCompany);
			assignSetterGetter('cpInfoEmail', null, getCpInfoEmail);
			assignSetterGetter('cpInfoWebsite', null, getCpInfoWebsite);
			assignSetterGetter('cpInfoCopyright', null, getCpInfoCopyright);
			assignSetterGetter('cpInfoProjectName', null, getCpInfoProjectName);
			assignSetterGetter('cpInfoDescription', null, getCpInfoDescription);
			assignSetterGetter('cpInfoCurrentFrame', null, getCpInfoCurrentFrame);assignSetterGetter('rdinfoCurrentFrame', null, getCpInfoCurrentFrame);
			assignSetterGetter('cpInfoFrameCount', null, getCpInfoFrameCount);
			assignSetterGetter('cpInfoPrevSlide', null, getCpInfoPrevSlide);
			assignSetterGetter('cpInfoLastVisitedSlide', null, getCpInfoLastVisitedSlide);
			assignSetterGetter('cpInfoCurrentSlide', null, getCpInfoCurrentSlide);assignSetterGetter('rdinfoCurrentSlide', null, getRdInfoCurrentSlide);assignSetterGetter('cpInfoCurrentSlideIndex', null, getRdInfoCurrentSlide);
			assignSetterGetter('cpInfoCurrentSlideLabel', null, getCpInfoCurrentSlideLabel);
			assignSetterGetter('cpInfoSlideCount', null, getCpInfoSlideCount);assignSetterGetter('rdinfoSlideCount', null, getCpInfoSlideCount);
			assignSetterGetter('cpInfoIsStandalone', null, getCpInfoIsStandalone);
			assignSetterGetter('cpInfoHasPlaybar', null, getCpInfoHasPlaybar);
			assignSetterGetter('cpInfoCurrentSlideType', null, getCpInfoCurrentSlideType);

			//date-time info
			assignSetterGetter('cpInfoElapsedTimeMS', null, getCpInfoElapsedTimeMS);
			assignSetterGetter('cpInfoEpochMS', null, getCpInfoEpochMS);
			assignSetterGetter('cpInfoCurrentMinutes', null, getCpInfoCurrentMinutes);
			assignSetterGetter('cpInfoCurrentHour', null, getCpInfoCurrentHour);
			assignSetterGetter('cpInfoCurrentTime', null, getCpInfoCurrentTime);
			assignSetterGetter('cpInfoCurrentDay', null, getCpInfoCurrentDay);
			assignSetterGetter('cpInfoCurrentYear', null, getCpInfoCurrentYear);
			assignSetterGetter('cpInfoCurrentMonth', null, getCpInfoCurrentMonth);
			assignSetterGetter('cpInfoCurrentDate', null, getCpInfoCurrentDate);
			assignSetterGetter('cpInfoCurrentDateString', null, getCpInfoCurrentDateString);
			
			//quiz.command
			assignSetterGetter('cpCmndGotoQuizScopeSlide', setCpCmndGotoQuizScopeSlide, null);
			
			//quiz.info
			assignSetterGetter('cpQuizInfoLastSlidePointScored', setCpQuizInfoLastSlidePointScored, getCpQuizInfoLastSlidePointScored);
			assignSetterGetter('cpQuizInfoQuestionSlideType', setCpQuizInfoQuestionSlideType, getCpQuizInfoQuestionSlideType);
			assignSetterGetter('cpQuizInfoAnswerChoice', setCpQuizInfoAnswerChoice, getCpQuizInfoAnswerChoice);
			assignSetterGetter('cpQuizInfoMaxAttemptsOnCurrentQuestion', setCpQuizInfoMaxAttemptsOnCurrentQuestion, getCpQuizInfoMaxAttemptsOnCurrentQuestion);
			assignSetterGetter('cpQuizInfoPointsPerQuestionSlide', setCpQuizInfoPointsPerQuestionSlide, getCpQuizInfoPointsPerQuestionSlide);
			assignSetterGetter('cpQuizInfoNegativePointsOnCurrentQuestionSlide', setCpQuizInfoNegativePointsOnCurrentQuestionSlide, getCpQuizInfoNegativePointsOnCurrentQuestionSlide);
			assignSetterGetter('cpQuizInfoQuestionSlideTiming', setCpQuizInfoQuestionSlideTiming, getCpQuizInfoQuestionSlideTiming);
			assignSetterGetter('cpQuizInfoQuizPassPoints', setCpQuizInfoQuizPassPoints, getCpQuizInfoQuizPassPoints);
			assignSetterGetter('cpQuizInfoQuizPassPercent', setCpQuizInfoQuizPassPercent, getCpQuizInfoQuizPassPercent);
			assignSetterGetter('cpQuizInfoTotalProjectPoints', setCpQuizInfoTotalProjectPoints, getCpQuizInfoTotalProjectPoints);
			assignSetterGetter('cpQuizInfoTotalUnansweredQuestions', setCpQuizInfoTotalUnansweredQuestions, getCpQuizInfoTotalUnansweredQuestions);
			assignSetterGetter('cpQuizInfoNoQuestionsPerQuiz', setCpQuizInfoNoQuestionsPerQuiz, getCpQuizInfoNoQuestionsPerQuiz);
			assignSetterGetter('cpQuizInfoPointsscored', setCpQuizInfoPointsscored, getCpQuizInfoPointsscored);
			assignSetterGetter('cpQuizInfoPretestPointsscored', null, getCpQuizInfoPretestPointsscored);
			assignSetterGetter('cpQuizInfoPretestScorePercentage', null, getCpQuizInfoPretestScorePercentage);
			assignSetterGetter('cpQuizInfoTotalCorrectAnswers', setCpQuizInfoTotalCorrectAnswers, getCpQuizInfoTotalCorrectAnswers);
			assignSetterGetter('cpInfoPercentage', setCpInfoPercentage, getCpInfoPercentage);
			assignSetterGetter('cpQuizInfoTotalQuizPoints', setCpQuizInfoTotalQuizPoints, getCpQuizInfoTotalQuizPoints);
			assignSetterGetter('cpQuizInfoAttempts', setCpQuizInfoAttempts, getCpQuizInfoAttempts);
			assignSetterGetter('cpQuizInfoTotalQuestionsPerProject', setCpQuizInfoTotalQuestionsPerProject, getCpQuizInfoTotalQuestionsPerProject);
			assignSetterGetter('cpQuizInfoQuestionPartialScoreOn', setCpQuizInfoQuestionPartialScoreOn, getCpQuizInfoQuestionPartialScoreOn);
			assignSetterGetter('cpQuizScopeSlide', null, getCpQuizScopeSlide);
			assignSetterGetter('cpInQuizScope', null, getCpInQuizScope);
			assignSetterGetter('cpQuizInfoPassFail', null, getCpQuizInfoPassFail);
			assignSetterGetter('cpInfoCourseID', null, getCpInfoCourseID);
			assignSetterGetter('cpInfoCourseName', null, getCpInfoCourseName);

			//ver
			assignSetterGetter('CaptivateVersion', null, getCaptivateVersion);

		}
		cp.initVariables();
		
		//Create variables used only for internal use (not created from published side).
		cp.vm.createVariable('cpQuizScopeSlide',-1, true, 100);	
		
		cp.initVariables = null;
	}
	
	function DefineProperty(x)
	{
		var s = '(function(){function get'+x+'(){return vh._'+x+';}function set'+x+'(val){setVariableValueImpl("'+x+'", val, ["'+x+'"]);} assignSetterGetter("'+x+'",set'+x+',get'+x+');})();';
		eval(s);
	}

	cp.VariablesManager.prototype = 
	{
		hasOwnProperty : function(variableName)
		{
			var v = eval('vh._' + variableName);
			if(v == undefined)
			{
				return false;
			}
			
			return true;
		},
		
		getVariableValue : function(variableName)
		{
			var lValue = null;
			if(variableName && variableName != '')
			{
				lValue = eval('vh._' + variableName);
			}
			return lValue;
		},

		createVariable: function(variableName,variableValue, systemDefined, length)
		{
			if(undefined == systemDefined)
			{
				systemDefined = true;
			}
			if(variableName && variableName != '' && this.hasOwnProperty(variableName) == false)
			{
				this.addVarInfo( variableName, length, systemDefined );
				createInternalVariable(variableName, variableValue);
				if(cp.em && systemDefined != true)
				{
					DefineProperty(variableName);
					var evtArgs = {
						captivateVersion:getCaptivateVersion(),
						varName:variableName,
						varVal:variableValue
					};
					cp.em.fireEvent('CPVariableCreatedEvent', evtArgs);
				}
				return true;
			}
			return false;
		},
		
		setVariableValue : function(variableName,variableValue,createNew)
		{
			if(createNew == undefined)
			{
				createNew = true;
			}
			
			var lAssign = true;
			if(createNew)
			{
				if(this.createVariable(variableName,variableValue, true, 10000) == true)
				{
					lAssign = false;
				}
			}
			else
			{
				if(this.hasOwnProperty(variableName) == false)
				{
					lAssign = false;
				}
			}
			if(lAssign)
			{
				eval(variableName+' = variableValue;');
			}
		},
		
		addVarInfo: function( name, len, systemDefined )
		{
			this.varInfos.push( new cp.VarInfo( name, len, systemDefined ) );
		},
		
		getVariableLength: function( name )
		{
			var i = 0;
			// Find the name.
			for ( i = 0; i < this.varInfos.length; ++i ) {
				if ( name == this.varInfos[ i ].name )
					return this.varInfos[ i ].len;
			}
			
			return 1000; // default.
		}
	}

	cp.EventVideo = function(el)
	{
		this.vdm = cp.movie.vdm;

		if(this.vdm.verbose)
			cp.log('EventVideo being constructed for el ' + el.id);
		cp.EventVideo.baseConstructor.call(this, el);
		

		this.parentDivName = this.getAttribute("dn");
		this.id = this.parentDivName;
		var divData = cp.model.data[this.parentDivName];
		this.from = divData.from;
		this.to = divData.to;
		this.displayForDurationOfVideo = divData.ddv;

		if(cp.IDEVICE == cp.device)
			this.cploop = this.getAttribute('l');
		else
			this.loop = this.getAttribute('l');

		this.autoPlay = this.getAttribute('au');
		this.autoRewind = this.getAttribute('ar');
		this.src = this.getAttribute('mp4');
		
		if(cp.device == cp.IDEVICE)
		{
			var asrc = this.getAttribute('amp4');
			if(asrc)
				this.src = asrc;
		}

		this.nativeVideo = null;
		this.ended = false;
		this.paused = true;
		
		this.visible = this.getAttribute("visible");
		this.transIn = 	divData['trin'];
		this.element.parentElement.drawingBoard = this.element.parentElement;
		var bounds = this.getAttribute("b");
		var actualParent = document.getElementById(this.parentDivName);
		this.actualParent = actualParent;
		this.bounds = {
				minX: bounds[0],
				minY: bounds[1],			
				maxX: bounds[2],
				maxY: bounds[3]
			};
		var vbounds = this.getAttribute("vb");
		this.vbounds = {
				minX: vbounds[0],
				minY: vbounds[1],			
				maxX: vbounds[2],
				maxY: vbounds[3],
				width: vbounds[2] - vbounds[0],
				height: vbounds[3] - vbounds[1],
			};
		if(actualParent)
		{
			actualParent.drawingBoard = this.element.parentElement;
			actualParent.bounds = this.bounds;
			actualParent.drawingBoard.bounds = this.vbounds;
		}
		
		this.isDrawn = false;
	
		this.tr = this.getAttribute("tr");
		if(!this.tr)
			this.tr = 'rotate(0deg)';
		this.sh = this.getAttribute("sh");
		this.re = this.getAttribute("re");
		cp.movie.stage.addToParentChildMap(actualParent.id,this.element.id);
	}
	
	cp.inherits(cp.EventVideo, cp.DisplayObject);
	
	cp.EventVideo.prototype.start = function()
	{
		this.drawIfNeeded();
		this.addNativeVideoIfNeeded();
	}
	
	cp.EventVideo.prototype.reset = function(endOfSlide)
	{
		if(this.vdm.verbose)
			cp.log('EventVideo ' + this.id + ' reset('+endOfSlide+')');
		delete ropMap[this.element.id];
		this.pause();
		if(this.nativeVideo)
		{
			this.nativeVideo.cpVideo = null;
			
			this.nativeVideo.style.display = 'none';
			
			if(cp.device == cp.IDEVICE)
			{
				try{
					this.src = 'vr/cp_non_existing_media';
					this.nativeVideo.cpSrc = this.src;
					this.nativeVideo.src = this.src;
				}catch(e){}
				this.nativeVideo.load();
			}
			this.nativeVideo = null;
		}
		
		this.isDrawn = false;
		
		this.element.width = 0;
		this.element.height = 0;
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = 0;
		this.element.top = 0;
		this.element.style.left = "0px";
		this.element.style.top = "0px";
		
		if(cp.device == cp.IDEVICE)
			cp.movie.stage.VideoPlaying = false;
			
		this.ended = false;
		delete this.seekToTime;
	}
	
	cp.EventVideo.prototype.onEndOfMovie = function()
	{
		if(this.vdm.verbose)
			cp.log('EventVideo ' + this.id + ' onEndOfMovie()');
			
		if(this.displayForDurationOfVideo)
			return;
			
		this.pause();
		if(this.nativeVideo)
		{
			this.nativeVideo.cpVideo = null;
			this.nativeVideo = null;
		}
		
		this.isDrawn = false;
		
		if(cp.device == cp.IDEVICE)
			cp.movie.stage.VideoPlaying = false;
			
		this.ended = false;
		delete this.seekToTime;
	}
	
	cp.EventVideo.prototype.drawIfNeeded = function()
	{
		if(cp.device == cp.IDEVICE)
		{
			if(cp.movie.stage.VideoPlaying)
				return;
				
			cp.movie.am.pause(cp.ReasonForPause.ONLY_ONE_MEDIUM_CAN_PLAY);
			cp.movie.stage.VideoPlaying = true;
		}

		if(this.isDrawn)
			return;

		if(this.vdm.verbose)
			cp.log('EventVideo ' + this.id + ' start()');
			
		var id = this.id;
		var bounds = this.bounds;
		var vbounds = this.vbounds;
		
		var rotateAngle = 0;
		if(this.tr)
			rotateAngle = getAngleFromRotateStr(this.tr);
			
		var elem;
		
		if(cp.device == cp.IDEVICE)
		{
			elem = cp.movie.stage.NativeVideoElement;
			if(!elem)
			{
				elem = this.element;
				cp.movie.stage.NativeVideoElement = this.element;
			}
		}
		else
			elem = this.element;
		
		var actualParent = this.actualParent;
		actualParent.style.left = bounds.minX +  "px";
		actualParent.style.top = bounds.minY + "px";
		actualParent.style.width = (bounds.maxX - bounds.minX) + "px";
		actualParent.style.height = (bounds.maxY - bounds.minY) + "px";
		
		var Pa = elem.parentElement;
		Pa.style.left = "0px";
		Pa.style.top = "0px";
		Pa.style.width = cp.model.data.project.w + "px";
		Pa.style.height = cp.model.data.project.h + "px";
		
		elem.rotateAngle = rotateAngle;
		elem.style.left = bounds.minX +  "px";
		elem.style.top = bounds.minY + "px";
		elem.style.width = (bounds.maxX - bounds.minX) + "px";
		elem.style.height = (bounds.maxY - bounds.minY) + "px";
		elem.style.display = 'block';
		elem.style.position = 'absolute';
		if(this.tr)
		{
			applyTransform(elem,this.tr);
			applyTransform(actualParent,this.tr);
			elem.tr = this.tr;
			actualParent.tr = this.tr;
		}
		if(this.sh && !this.sh.i)
		{
			var mAngle = this.sh.a - rotateAngle;
			applyShadow(elem ,this.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + (this.sh.i ? ' inset' : ''));
		}
		if(this.re)
			elem.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";					

		if(this.transIn)
			elem.parentElement.style.opacity = 0;
		if(!this.visible)
			cp.hide( this.parentDivName );

		this.isDrawn = true;
	}

	cp.EventVideo.prototype.addNativeVideoIfNeeded = function()
	{
		if(!this.isDrawn || this.nativeVideo)
			return;
		
		var elem;
		if(cp.device == cp.IDEVICE)
			elem = cp.movie.stage.NativeVideoElement;
		else
			elem = this.element;
		
		this.vdm.allocVideoChannel(this, cp.IDEVICE != cp.device);
		if(this.nativeVideo)
		{
			var bounds = this.bounds;
			var vbounds = this.vbounds;
			this.nativeVideo.style.display = 'block';
			this.nativeVideo.style.left = "0px";
			this.nativeVideo.style.top = "0px";
			if(cp.device == cp.IDEVICE && cp.IOSFlavor >= cp.IOS5)
			{
				this.nativeVideo.CPcanPlay = false;
				this.nativeVideo.CPwidth = (bounds.maxX - bounds.minX) + "px";
				this.nativeVideo.CPheight = (bounds.maxY - bounds.minY) + "px";			
				this.nativeVideo.style.width = "0px";
				this.nativeVideo.style.height = "0px";
			}
			else
			{
				this.nativeVideo.style.width = (bounds.maxX - bounds.minX) + "px";
				this.nativeVideo.style.height = (bounds.maxY - bounds.minY) + "px";
			}
			
			if(cp.device == cp.IDEVICE)
			{
				if(!this.nativeVideo.parentElement)
					elem.appendChild(this.nativeVideo);
				else
				{
					cp.movie.stage.correctReWrapZOrder(elem.parentElement,this.element.parentElement);
					cp.movie.stage.correctParentZOrder(cp.movie.stage.VideoElement, this.actualParent);
				}
			}
			else
				elem.appendChild(this.nativeVideo);	
		
			if(this.visible)
			{
				elem.style.display = 'block';
				elem.style.visibility = 'visible';
				
				if(this.autoPlay)
					this.play();
				else if(this.nativeVideo)
					this.nativeVideo.controls = true;
			}
		}
		
	}
	
	cp.EventVideo.prototype.load = function()
	{
		if(this.nativeVideo)
			this.nativeVideo.load();
	}
	
	cp.EventVideo.prototype.play = function()
	{
		if(this.ended == true || this.paused == false)
			return;
		
		if(this.isSeekPending())
		{
			if(this.vdm.verbose)
				cp.log("EventVideo.Play setting revoke "+ this.id);
			this.revoke = true;
			this.finishPendingSeek();
			return;
		}
		
		if(!this.nativeVideo)
			return;
		
		this.paused = false;
		
		if(this.nativeVideo.src.indexOf(this.src) == -1)
		{
			this.nativeVideo.cpSrc = this.src;
			this.nativeVideo.src = this.src;
			this.nativeVideo.load();
		}
		
		if(this.vdm.verbose)
			cp.log("EventVideo.Play "+ this.id+" "+this.src);

		this.nativeVideo.play();
	}
	
	cp.EventVideo.prototype.pause = function()
	{
		if(this.isSeekPending())
		{
			if(this.vdm.verbose)
				cp.log("EventVideo.Pause deleting revoke "+ this.id);
			delete this.revoke;
		}
		
		if(this.paused)
			return;
		
		this.paused = true;

		if(this.vdm.verbose)
			cp.log("EventVideo.Pause "+ this.id+" "+this.src);
			
		if(this.nativeVideo)
		{
			this.nativeVideo.pause();
			this.nativeVideo.pausedAt = new Date().getTime();
		}
	}
	
	cp.EventVideo.prototype.setLoop = function(loop, loopFrames)
	{
		this.loop = loop;
		this.loopFrames = loopFrames;
		
		if(cp.IDEVICE == cp.device)
			this.cploop = loop;
		else
		{
			if(this.nativeVideo)
			{
				if(loop)
					this.nativeVideo.loop = true;
				else
					delete this.nativeVideo.loop;
			}
		}
	}
	
	cp.EventVideo.prototype.setCurrentTime = function(time)
	{
		if(this.vdm.verbose)
			cp.log("VideoObject "+ this.id+ "src " + this.src + " setCurrentTime("+time+")");

		if(!this.nativeVideo)
		{
			this.seekToTime = time;
			if(this.vdm.verbose)
				cp.log('no native video. Kept in pending...');
			return;
		}
	
		/*if(Math.abs(this.nativeVideo.currentTime - time) < 0.05)
		{
			if(this.vdm.verbose)
				cp.log('not seeking delta < 0.05');
				
			if(!cp.movie.ms.inQueue(this))
				delete this.seekToTime;
				
			return;
		}*/
		
		delete this.seekToTime;

		if(!this.paused)
		{
			if(this.vdm.verbose)
				cp.log('setting revoke');
			this.revoke = true;
			this.pause();
		}
			
		var seekSuccess = true;
		try
		{
			this.nativeVideo.currentTime = time;
			var delta = Math.abs(this.nativeVideo.currentTime - time);
			if(delta >= 0.05)
				seekSuccess = false;

		}
		catch(e)
		{
			var delta = Math.abs(this.nativeVideo.currentTime - time);
			if(delta >= 0.05)
				seekSuccess = false;
			else
				seekSuccess = true;
		}

		if(this.vdm.verbose)
			cp.log('seekSuccess = ' + seekSuccess);
		
		if(cp.movie.ms.enabled)
		{
			if(seekSuccess)
			{
				if(this.revoke)
				{
					if(this.vdm.verbose)
						cp.log('revoking play');
					delete this.revoke;
					this.play();
				}
			}
			else
			{
				if(this.vdm.verbose)
					cp.log('pause movie and add to seekQueue');

				this.seekToTime = time;
				this.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
				cp.movie.ms.addToQueue(this);
			}
		}
		else
		{
			if(this.revoke)
			{
				if(this.vdm.verbose)
					cp.log('revoking play');
				delete this.revoke;
				this.play();
			}
		}
	}
	
	cp.EventVideo.prototype.isSeekPending = function()
	{
		var result = (undefined != this.seekToTime);
		//if(this.vdm.verbose)
			//cp.log("VideoObject "+ this.id+" isSeekPending " + result);
		return result;
	}
	
	cp.EventVideo.prototype.finishPendingSeek = function()
	{
		if(!this.nativeVideo || !this.isSeekPending())
			return;
		
		if(this.vdm.verbose)
			cp.log("VideoObject "+ this.id+" finishPendingSeek");

		this.setCurrentTime(this.seekToTime);
	}
	
	cp.EventVideo.prototype.seekTo = function(frame)
	{
		//if(this.from > frame) //removing this so that seeking from right to left is also taken care of
		//	return false;

		if(this.vdm.verbose)
			cp.log("VideoObject "+ this.id+" seekTo("+frame+")");
		if(this.loop && this.loopFrames)
		{
			if(this.from <= frame)
			{
				var f = (frame - this.from) % this.loopFrames;
				this.setCurrentTime(f /cpInfoFPS);
				this.ended = false;
				return true;
			}
		}
		else
		{
			if(this.from <= frame && this.to >= frame)
			{
				this.setCurrentTime((frame - this.from)/cpInfoFPS);
				this.ended = false;
				return true;
			}
			else if(this.to >= frame)
			{
				this.setCurrentTime(0);
				this.ended = false;
			}
		}
		return false;
	}
	
	cp.FMRVideo = function(el)
	{
		cp.FMRVideo.baseConstructor.call(this, el);	
	}

	cp.inherits(cp.FMRVideo, cp.EventVideo);
	
	cp.FMRVideo.prototype.addNativeVideoIfNeeded = function()
	{
		cp.FMRVideo.superClass.addNativeVideoIfNeeded.call(this);
		this.vdm.demoVideo = this.nativeVideo;
	}
	
	cp.FMRVideo.prototype.reset = function(endOfSlide)
	{
		cp.FMRVideo.superClass.reset.call(this, endOfSlide);
		this.vdm.demoVideo = this.nativeVideo;
	}
	
	cp.FMRVideo.prototype.onEndOfMovie = function()
	{
		cp.FMRVideo.superClass.onEndOfMovie.call(this);
		this.vdm.demoVideo = this.nativeVideo;
	}
	
	cp.FMRVideo.prototype.updateFrame = function()
	{
		if(this.paused && !cp.movie.paused && this.autoPlay && this.visible)
			this.play();
	}
	
	cp.CPVCVideo = function(el)
	{
		cp.CPVCVideo.baseConstructor.call(this, el);	
	}

	cp.inherits(cp.CPVCVideo, cp.FMRVideo);
	
	cp.SlideVideo = function(el)
	{
		cp.SlideVideo.baseConstructor.call(this, el);	
		this.autoPlay = 1;
		this.seek_From = this.getAttribute('vsf');
		this.seek_To = this.getAttribute('vst');
		this.showInTOC = this.getAttribute('sit');
		this.continueToNextSlide = this.getAttribute('continueToNextSlide');
		this.continueFromPrevSlide = this.getAttribute('continueFromPrevSlide');

	}
	
	cp.inherits(cp.SlideVideo, cp.EventVideo);	
	
	cp.SlideVideo.prototype.reset = function(endOfSlide)
	{
		if(this.vdm.verbose)
			cp.log('SlideVideo ' + this.id + ' reset('+endOfSlide+')');
		if(endOfSlide && this.continueToNextSlide)
		{
			if(this.nativeVideo)
			{
				this.nativeVideo.cpVideo = null;
				this.nativeVideo = null;
			}
		}
		else
		{
			this.pause();
			if(this.showInTOC)
			{
				toc.rootObj.showVideo(false);
				if(this.nativeVideo)
				{
					this.nativeVideo.cpVideo = null;
					/*if(cp.device == cp.IDEVICE)
					{
						try{
							this.src = 'vr/cp_non_existing_media';
							this.nativeVideo.cpSrc = this.src;
							this.nativeVideo.src = this.src;
						}catch(e){}
						this.nativeVideo.load();
					}*/
					this.nativeVideo = null;
				}
			}
			else
			{
				if(this.nativeVideo)
				{
					this.nativeVideo.cpVideo = null;
					
					this.nativeVideo.style.display = 'none';
				
					/*if(cp.device == cp.IDEVICE)
					{
						try{
							this.src = 'vr/cp_non_existing_media';
							this.nativeVideo.cpSrc = this.src;
							this.nativeVideo.src = this.src;
						}catch(e){}
						this.nativeVideo.load();
					}*/
					this.nativeVideo = null;
				}
			}
		}
		
		this.isDrawn = false;
		
		this.element.width = 0;
		this.element.height = 0;
		this.element.style.width = "0px";
		this.element.style.height = "0px";
		
		this.element.left = 0;
		this.element.top = 0;
		this.element.style.left = "0px";
		this.element.style.top = "0px";
		
		if(cp.device == cp.IDEVICE)
			cp.movie.stage.VideoPlaying = false;
			
		this.ended = false;
		delete this.seekToTime;
	}
	
	cp.SlideVideo.prototype.onEndOfMovie = function()
	{
		if(this.vdm.verbose)
			cp.log('SlideVideo ' + this.id + ' onEndOfMovie()');
			
		this.pause();
		if(this.nativeVideo)
		{
			this.nativeVideo.cpVideo = null;
			this.nativeVideo = null;
		}
		
		this.isDrawn = false;
		
		if(cp.device == cp.IDEVICE)
			cp.movie.stage.VideoPlaying = false;
			
		this.ended = false;
		delete this.seekToTime;
	}
	
	cp.SlideVideo.prototype.drawIfNeeded = function()
	{
		if(cp.device == cp.IDEVICE)
		{
			if(cp.movie.stage.VideoPlaying)
				return;
			cp.movie.stage.VideoPlaying = true;
		}

		if(this.isDrawn)
			return;

		if(this.showInTOC)
		{
			this.isDrawn = true;
			return;
		}
			
		if(this.vdm.verbose)
			cp.log('SlideVideo ' + this.id + ' start()');
			
		var id = this.id;
		var bounds = this.bounds;
		var vbounds = this.vbounds;
		
		var rotateAngle = 0;
		if(this.tr)
			rotateAngle = getAngleFromRotateStr(this.tr);
			
		var elem = cp.movie.stage.NativeSlideVideoElement;
		if(!elem)
		{
			elem = this.element;
			cp.movie.stage.NativeSlideVideoElement = this.element;
		}
		
		var actualParent = this.actualParent;
		actualParent.style.left = bounds.minX +  "px";
		actualParent.style.top = bounds.minY + "px";
		actualParent.style.width = (bounds.maxX - bounds.minX) + "px";
		actualParent.style.height = (bounds.maxY - bounds.minY) + "px";
		
		var Pa = elem.parentElement;
		Pa.style.left = "0px";
		Pa.style.top = "0px";
		Pa.style.width = cp.model.data.project.w + "px";
		Pa.style.height = cp.model.data.project.h + "px";
		
		elem.rotateAngle = rotateAngle;
		elem.style.left = bounds.minX +  "px";
		elem.style.top = bounds.minY + "px";
		elem.style.width = (bounds.maxX - bounds.minX) + "px";
		elem.style.height = (bounds.maxY - bounds.minY) + "px";
		elem.style.display = 'block';
		elem.style.position = 'absolute';
		if(this.tr)
		{
			applyTransform(elem,this.tr);
			applyTransform(actualParent,this.tr);
			elem.tr = this.tr;
			actualParent.tr = this.tr;
		}
		if(this.sh && !this.sh.i)
		{
			var mAngle = this.sh.a - rotateAngle;
			applyShadow(elem ,this.sh.d*Math.cos((Math.PI*mAngle)/180) + 'px ' + this.sh.d*Math.sin((Math.PI*mAngle)/180) + 'px ' + this.sh.b + 'px '+ ConvertRGBToRGBA(this.sh.c,this.sh.o ) + (this.sh.i ? ' inset' : ''));
		}
		if(this.re)
			elem.parentElement.style.webkitBoxReflect = "below " + this.re.d + "px" + " -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(" + (1 - this.re.s/100) +", transparent), to(rgba(255, 255, 255, "+ (1-this.re.p/100) +")))";					

		if(this.transIn)
			elem.parentElement.style.opacity = 0;
		if(!this.visible)
			cp.hide( this.parentDivName );

		this.isDrawn = true;
	}

	cp.SlideVideo.prototype.addNativeVideoIfNeeded = function()
	{
		if(!this.isDrawn || this.nativeVideo)
			return;
		
		if(this.showInTOC)
		{
			if(cp.device == cp.IDEVICE)
			{
				this.nativeVideo = this.vdm.tocVideoChannel;
			}
			else
			{
				this.vdm.tocVideoChannel.cpVideo = null;
				if(this.vdm.tocVideoChannel0.cpSrc == this.src)
				{
					if(this.vdm.verbose)
						cp.log('TOCVideo ' + this.id + ' found existing @ tocV0');
					this.vdm.tocVideoChannel = this.vdm.tocVideoChannel0;
				}
				else if(this.vdm.tocVideoChannel1.cpSrc == this.src)
				{
					if(this.vdm.verbose)
						cp.log('TOCVideo ' + this.id + ' found existing @ tocV1');
					this.vdm.tocVideoChannel = this.vdm.tocVideoChannel1;
				}
				else
					this.vdm.tocVideoChannel = this.vdm.tocVideoChannel0;
				this.nativeVideo = this.vdm.tocVideoChannel;
			}
		}
		else
		{
			if(cp.device == cp.IDEVICE)
			{
				this.nativeVideo = this.vdm.slideVideoChannel;
			}
			else
			{
				this.vdm.slideVideoChannel0.cpVideo = null;
				if(this.vdm.slideVideoChannel0.cpSrc == this.src)
				{
					if(this.vdm.verbose)
						cp.log('SlideVideo ' + this.id + ' found existing @ SV0');
					this.vdm.slideVideoChannel = this.vdm.slideVideoChannel0;
				}
				else if(this.vdm.slideVideoChannel1.cpSrc == this.src)
				{
					if(this.vdm.verbose)
						cp.log('SlideVideo ' + this.id + ' found existing @ SV1');
					this.vdm.slideVideoChannel = this.vdm.slideVideoChannel1;
				}
				else
					this.vdm.slideVideoChannel = this.vdm.slideVideoChannel0;
				this.nativeVideo = this.vdm.slideVideoChannel;
			}
		}

		this.nativeVideo.cpVideo = this;
		
		var sourceChanged = false;
		
		if(this.continueFromPrevSlide)
		{
			if(this.nativeVideo.paused)
				this.seekTo(cpInfoCurrentFrame);
		}
		else
		{
			if(this.nativeVideo.cpSrc == this.src)
				this.seekTo(this.from);
			else
			{
				if(cp.device == cp.IDEVICE)
				{
					try{
						this.nativeVideo.src = 'cp_non_existing_media';
					}catch(e){}
					try{
						this.nativeVideo.load();
					}catch(e){}
				}
				this.nativeVideo.cpSrc = this.src;
				this.nativeVideo.src = this.src;
				this.nativeVideo.load();
				this.seekTo(this.from);
				sourceChanged = true;
			}
		}
		
		if(this.showInTOC)
		{
			this.nativeVideo.CPtoc = true;
			if(sourceChanged && cp.device == cp.IDEVICE && cp.IOSFlavor >= cp.IOS5)
			{
				this.nativeVideo.CPcanPlay = false;
				this.nativeVideo.CPwidth = "192px";
				this.nativeVideo.CPheight = "144px";
				this.nativeVideo.style.width = "0px";
				this.nativeVideo.style.height = "0px";
			}
			else
				toc.rootObj.showVideo(true);
		}
		else
		{
			this.nativeVideo.CPtoc = false;
			var bounds = this.bounds;
			var vbounds = this.vbounds;
			this.nativeVideo.style.display = 'block';
			this.nativeVideo.style.left = "0px";
			this.nativeVideo.style.top = "0px";
			
			if(sourceChanged && cp.device == cp.IDEVICE && cp.IOSFlavor >= cp.IOS5)
			{
				this.nativeVideo.CPcanPlay = false;
				this.nativeVideo.CPwidth = (bounds.maxX - bounds.minX) + "px";
				this.nativeVideo.CPheight = (bounds.maxY - bounds.minY) + "px";
				this.nativeVideo.style.width = "0px";
				this.nativeVideo.style.height = "0px";
			}
			else
			{
				this.nativeVideo.style.width = (bounds.maxX - bounds.minX) + "px";
				this.nativeVideo.style.height = (bounds.maxY - bounds.minY) + "px";
			}

			var elem = cp.movie.stage.NativeSlideVideoElement;
			
			if(cp.device == cp.IDEVICE)
			{
				if(!this.nativeVideo.parentElement)
					elem.appendChild(this.nativeVideo);
				else
				{
					cp.movie.stage.correctReWrapZOrder(elem.parentElement,this.element.parentElement);
					cp.movie.stage.correctParentZOrder(cp.movie.stage.VideoElement, this.actualParent);
				}
			}
			else
				elem.appendChild(this.nativeVideo);	
				
			if(this.visible)
			{
				elem.style.display = 'block';
				elem.style.visibility = 'visible';
			}
		}
	
		if(this.visible)
		{
			if(this.autoPlay)
				this.play();
			else if(this.nativeVideo)
				this.nativeVideo.controls = true;
		}
		
	}
	
	cp.SlideVideo.prototype.updateFrame = function()
	{
		if(this.paused && !cp.movie.paused && this.autoPlay && this.visible)
			this.play();
	}
	
	cp.SlideVideo.prototype.seekTo = function(frame)
	{
		//if(this.from > frame) //removing this so that seeking from right to left is also taken care of
		//	return false;

		if(this.vdm.verbose)
			cp.log("SlideVideo "+ this.id+" seekTo("+frame+")");
		if(this.loop && this.loopFrames)
		{
			if(this.from <= frame)
			{
				var f = (frame - this.from) % this.loopFrames;
				this.setCurrentTime((f /cpInfoFPS) + this.seek_From);
				this.ended = false;
				return true;
			}
		}
		else
		{
			if(this.from <= frame && this.to >= frame)
			{
				this.setCurrentTime(((frame - this.from)/cpInfoFPS) + this.seek_From);
				this.ended = false;
				return true;
			}
			else if(this.to >= frame)
			{
				this.setCurrentTime(this.seek_From);
				this.ended = false;
			}
		}
		return false;
	}
	
	cp.SlideVideo.prototype.pause = function()
	{
		var wasPlaying = this.nativeVideo && !this.nativeVideo.paused && !this.nativeVideo.ended;
		cp.SlideVideo.superClass.pause.call(this);
		if(cp.device == cp.IDEVICE)
		{
			if(wasPlaying && this.nativeVideo && (this.nativeVideo.paused || this.nativeVideo.ended))
				cp.movie.stage.VideoPlaying = false;
		}
	}
	
	cp.SlideVideo.prototype.play = function()
	{
		var wasPlaying = this.nativeVideo && !this.nativeVideo.paused && !this.nativeVideo.ended;
		cp.SlideVideo.superClass.play.call(this);
		if(cp.device == cp.IDEVICE)
		{
			if(!wasPlaying && this.nativeVideo && !this.nativeVideo.paused && !this.nativeVideo.ended)
				cp.movie.stage.VideoPlaying = true;
		}
	}
	
	cp.NativeVideo = function(id)
	{
		var v = document.createElement('video');
		if(id)
		{
			v.id = id;
		}
		return v;
	}
	
	cp.VideoManager = function()
	{
		cp.movie.vdm = this;
		this.loaded = false;
		this.verbose = false;
		this.viewVideo = false;
		this.numVideosWaiting = 0;
		
		this.errorCallBackFn = function(e)
		{
			var vdm = cp.movie.vdm;
			if(-1 == this.src.indexOf('cp_non_existing_media'))
			{
				if(cp.exceptionalLogs)
				{
					cp.log('src = ' + this.src + ' error code = ' + (this.error?this.error.code:'NULL') + ' n/w state = ' + this.networkState);
					cp.log(e);
				}
			
				if(this.cpVideo)
				{
					var divData = cp.model.data[this.cpVideo.id];
					if(divData.psv)
						divData.pausedOnce = true;
				}
				
				if(this.waitCount > 0)
				{
					--vdm.numVideosWaiting;

					if(vdm.verbose)
						cp.log('vdm.numVideosWaiting = ' + vdm.numVideosWaiting);
				}
			}
		}
		
		this.waitingFn = function(e)
		{
			++this.waitCount;
			if(cp.movie.vdm.verbose)
				cp.log('wait ' + this.waitCount + ' ' + this.cpSrc + ' ' + (this.cpVideo?this.cpVideo.id:''));
			if(1 == this.waitCount)
			{
				++cp.movie.vdm.numVideosWaiting;
				if(cp.movie.vdm.verbose)
					cp.log('cp.movie.vdm.numVideosWaiting = ' + cp.movie.vdm.numVideosWaiting);
				
				if(1 == cp.movie.vdm.numVideosWaiting)
					cp.movie.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
			}
		}
		
		this.canPlayCallBackFn = function(e)
		{
			if(this.CPcanPlay == false)
			{
				this.CPcanPlay = true;
				this.style.width = this.CPwidth;
				this.style.height = this.CPheight;
				if(this.CPtoc)
				{
					toc.rootObj.showVideo(true);
				}
			}
			
			if(this.cpVideo && this.cpVideo.displayForDurationOfVideo)
				cp.model.data[this.cpVideo.parentDivName].to = this.duration* cp.movie.fps;//not using cpInfoFPS since this calc is independent of movie speed
				
			if(this.waitCount > 0)
			{
				this.waitCount = 0;
				
				if(cp.movie.vdm.verbose)
					cp.log('cnPly ' + this.cpSrc + ' ' + (this.cpVideo?this.cpVideo.id:''));
					
				--cp.movie.vdm.numVideosWaiting;
				if(cp.movie.vdm.verbose)
					cp.log('cp.movie.vdm.numVideosWaiting = ' + cp.movie.vdm.numVideosWaiting);

			}
		}
		
		this.onEndedCallBackFn = function(e)
		{
			if(this.cploop)
			{
				if(cp.movie.vdm.verbose)
					cp.log(this.cpSrc+' loop');
				if(this.cpVideo)
				{
					this.cpVideo.pause();
					this.cpVideo.seekTo(this.cpVideo.from);
					this.cpVideo.play();
				}
			}
			else
			{
				if(cp.movie.vdm.verbose)
					cp.log(this.cpSrc+' ended');
					
				if(this.cpVideo)
				{
					if(this.cpVideo.autoRewind)
					{
						this.cpVideo.pause();
						this.cpVideo.seekTo(this.cpVideo.from);
					}
					else
					{
						this.cpVideo.ended = true;
						this.endedAt = new Date().getTime();
						this.cpVideo.pause();
					}
				}
				else
					this.endedAt = new Date().getTime();
				
				if(cp.movie.paused)
				{
					if(cp.ReasonForPause.EVENT_VIDEO_PAUSE == cp.movie.reasonForPause)
						cp.movie.play();//can be buggy with multiple event videos on a slide. But SWF o/p is also similar.
				}
				else if(this.cpVideo)
					this.cpVideo.actualParent.pausedOnce = true;
					
				if(this.cpVideo && this.cpVideo.displayForDurationOfVideo)
					this.cpVideo.reset();
			}
		}
		
		this.PlayPauseCallBackFn = function(e)
		{
			if(this.paused)
			{
				this.pausedAt = new Date().getTime();
			}
			if(this.cpVideo)
				this.cpVideo.paused = this.paused;
		}
		
		if(cp.device == cp.IDEVICE)
		{
			this.slideVideoChannel = new cp.NativeVideo();
			this.slideVideoChannel.cpSrc = '';
			this.slideVideoChannel.cpVideo = null;
			this.slideVideoChannel.ended = false;
			//this.slideVideoChannel.addEventListener("ended", this.onEndedCallBackFn, false);
			this.slideVideoChannel.addEventListener("error", this.errorCallBackFn, false);
			
			if(cp.IOSFlavor >= cp.IOS5)
			{
				this.slideVideoChannel.addEventListener("waiting", this.waitingFn, false);
				this.slideVideoChannel.addEventListener("canplay", this.canPlayCallBackFn, false);
			}
			
			this.slideVideoChannel.addEventListener("play", this.PlayPauseCallBackFn, false);
			this.slideVideoChannel.addEventListener("pause", this.PlayPauseCallBackFn, false);
			this.slideVideoChannel.waitCount = 0;
		}
		else
		{
			this.slideVideoChannel0 = new cp.NativeVideo();
			this.slideVideoChannel0.cpSrc = '';
			this.slideVideoChannel0.cpVideo = null;
			this.slideVideoChannel0.ended = false;
			//this.slideVideoChannel0.addEventListener("ended", this.onEndedCallBackFn, false);
			this.slideVideoChannel0.addEventListener("error", this.errorCallBackFn, false);
			this.slideVideoChannel0.addEventListener("waiting", this.waitingFn, false);
			this.slideVideoChannel0.addEventListener("canplay", this.canPlayCallBackFn, false);
			this.slideVideoChannel0.addEventListener("play", this.PlayPauseCallBackFn, false);
			this.slideVideoChannel0.addEventListener("pause", this.PlayPauseCallBackFn, false);
			this.slideVideoChannel0.waitCount = 0;
		
			this.slideVideoChannel1 = new cp.NativeVideo();
			this.slideVideoChannel1.cpSrc = '';
			this.slideVideoChannel1.cpVideo = null;
			this.slideVideoChannel1.ended = false;
			//this.slideVideoChannel1.addEventListener("ended", this.onEndedCallBackFn, false);
			this.slideVideoChannel1.addEventListener("error", this.errorCallBackFn, false);
			this.slideVideoChannel1.addEventListener("waiting", this.waitingFn, false);
			this.slideVideoChannel1.addEventListener("canplay", this.canPlayCallBackFn, false);
			this.slideVideoChannel1.addEventListener("play", this.PlayPauseCallBackFn, false);
			this.slideVideoChannel1.addEventListener("pause", this.PlayPauseCallBackFn, false);
			this.slideVideoChannel1.waitCount = 0;

			this.slideVideoChannel = this.slideVideoChannel0;
		}
			
		if(cp.model.data.project.hasTOC)
		{
			if(cp.device == cp.IDEVICE)
			{
				this.tocVideoChannel = document.getElementById('tocVideo');
				if(!this.tocVideoChannel)
				{
					this.tocVideoChannel = new cp.NativeVideo('tocVideo');
				}
				
				this.tocVideoChannel.cpSrc = '';
				this.tocVideoChannel.cpVideo = null;
				this.tocVideoChannel.ended = false;
				//this.tocVideoChannel.addEventListener("ended", this.onEndedCallBackFn, false);
				this.tocVideoChannel.addEventListener("error", this.errorCallBackFn, false);
				
				if(cp.IOSFlavor >= cp.IOS5)
				{
					this.tocVideoChannel.addEventListener("waiting", this.waitingFn, false);
					this.tocVideoChannel.addEventListener("canplay", this.canPlayCallBackFn, false);
				}
				
				this.tocVideoChannel.addEventListener("play", this.PlayPauseCallBackFn, false);
				this.tocVideoChannel.addEventListener("pause", this.PlayPauseCallBackFn, false);
				this.tocVideoChannel.waitCount = 0;
			}
			else
			{
				this.tocVideoChannel0 = document.getElementById('tocVideo');
				if(!this.tocVideoChannel0)
				{
					this.tocVideoChannel0 = new cp.NativeVideo('tocVideo');
				}
				
				this.tocVideoChannel0.cpSrc = '';
				this.tocVideoChannel0.cpVideo = null;
				this.tocVideoChannel0.ended = false;
				//this.tocVideoChannel0.addEventListener("ended", this.onEndedCallBackFn, false);
				this.tocVideoChannel0.addEventListener("error", this.errorCallBackFn, false);
				this.tocVideoChannel0.addEventListener("waiting", this.waitingFn, false);
				this.tocVideoChannel0.addEventListener("canplay", this.canPlayCallBackFn, false);
				this.tocVideoChannel0.addEventListener("play", this.PlayPauseCallBackFn, false);
				this.tocVideoChannel0.addEventListener("pause", this.PlayPauseCallBackFn, false);
				this.tocVideoChannel0.waitCount = 0;
				
				this.tocVideoChannel1 = new cp.NativeVideo('tocVideo');
				this.tocVideoChannel1.cpSrc = '';
				this.tocVideoChannel1.cpVideo = null;
				this.tocVideoChannel1.ended = false;
				//this.tocVideoChannel1.addEventListener("ended", this.onEndedCallBackFn, false);
				this.tocVideoChannel1.addEventListener("error", this.errorCallBackFn, false);
				this.tocVideoChannel1.addEventListener("waiting", this.waitingFn, false);
				this.tocVideoChannel1.addEventListener("canplay", this.canPlayCallBackFn, false);
				this.tocVideoChannel1.addEventListener("play", this.PlayPauseCallBackFn, false);
				this.tocVideoChannel1.addEventListener("pause", this.PlayPauseCallBackFn, false);
				this.tocVideoChannel1.waitCount = 0;
				
				this.tocVideoChannel = this.tocVideoChannel0;
			}
		}
		
		if(cp.device == cp.IDEVICE)
			this.MAX_VIDEO_CHANNELS = 1;
		else
			this.MAX_VIDEO_CHANNELS = 10;

		this.videoChannels = new Array();
			
		for(var i = 0; i < this.MAX_VIDEO_CHANNELS; ++i)
		{
			var v = new cp.NativeVideo();
			v.cpSrc = '';
			v.cpVideo = null;
			v.ended = false;
			v.addEventListener("ended", this.onEndedCallBackFn, false);
			v.addEventListener("error", this.errorCallBackFn, false);
			
			if(cp.device == cp.IDEVICE && cp.IOSFlavor >= cp.IOS5)
			{
				v.addEventListener("waiting", this.waitingFn, false);
				v.addEventListener("canplay", this.canPlayCallBackFn, false);
			}
			
			v.addEventListener("play", this.PlayPauseCallBackFn, false);
			v.addEventListener("pause", this.PlayPauseCallBackFn, false);
			v.waitCount = 0;
			this.videoChannels[i] = v;
		}
	}
	
	
	cp.VideoManager.prototype = 
	{
		mute:function(aMute)
		{
			var m;
			if(aMute == true || aMute > 0)
				m = true;
			else
				m = false;
		
			for(var i in this.videoChannels)
				this.videoChannels[i].muted = m;
				
			this.slideVideoChannel.muted = m;
			if(this.tocVideoChannel)
				this.tocVideoChannel.muted = m;
			this.muted = m;
		},
		
		setVolume:function(v)
		{
			if(v < 0)
			{
				v = 0;
			}
			if(v > 1)
			{
				v = 1;
			}
			
			this.volume = v;
				
			for(var i in this.videoChannels)
				this.videoChannels[i].volume = v;
				
			this.slideVideoChannel.volume = v;
			if(this.tocVideoChannel)
				this.tocVideoChannel.volume = v;
		},
		
		LRUVideoIndex: function()
		{
			var t = new Date().getTime();
			var idx = -1;
			var currFrame = cpInfoCurrentFrame;
			for(var i = 0; i < this.MAX_VIDEO_CHANNELS; ++i)
			{
				var v = this.videoChannels[i];
				if(v.ended || v.paused)
				{
					if(v.endedAt)
					{
						if(t > v.endedAt)
						{
							t = v.endedAt;
							idx = i;
						}
					}
					else if(v.pausedAt)
					{
						if(t > v.pausedAt)
						{
							t = v.pausedAt;
							idx = i;
						}
					}
					else if(idx == -1 && currFrame > v.cpTo)
					{
						idx = i;
					}
				}
			}
			return idx;
		},
		
		allocVideoChannel: function(videoObj, createNewIfAllChannelsAreBusy)
		{
			if(this.verbose)
				cp.log('allocVideoChannel ' + videoObj.id + ' ' + videoObj.src + ' ' + createNewIfAllChannelsAreBusy);
			if(cp.IDEVICE == cp.device)
			{
				var v1 = this.videoChannels[0];
				if(!v1.paused)
				{
					if(v1.cpVideo != null)
						v1.cpVideo.pause();
					else
						v1.pause();
				}

				if(v1.cpVideo != null)
					v1.cpVideo.nativeVideo = null;

				videoObj.nativeVideo = v1;
				v1.cpVideo = videoObj;
				//v1.loop = videoObj.loop;
				v1.cploop = videoObj.cploop;
				v1.ended = false;
				delete v1.endedAt;
				delete v1.pausedAt;

				if(v1.cpSrc != videoObj.src)
				{
					try{
						v1.src = 'cp_non_existing_media';
					}catch(e){}
					v1.load();
					v1.waitCount = 0;
					v1.cpSrc = videoObj.src;
					v1.src = videoObj.src;
					
					if(v1.currentTime >0)
						if(this.verbose)
							cp.log('currentTime after changing src = ' + v1.currentTime+ ' going to wait...');
					
					if(cp.IOSFlavor <= cp.IOS5)
					{
						while(v1.currentTime > 0)
							v1.load();
					}
					else
					{
						var lLoadWaitCtr = 0;
						while(v1.currentTime > 0 && ++lLoadWaitCtr < 100)
						{
							if(cp.verbose)
								cp.log("waiting for " + lLoadWaitCtr + " time");
							v1.load();
						}
					}
					
					if(this.verbose)
						cp.log('finished waiting');
				}
				else if(!videoObj.isSeekPending())
					videoObj.seekTo(videoObj.from);
				
				videoObj.finishPendingSeek();
				v1.load();
				return;
			}
			else
			{
				for(var i = 0; i < this.MAX_VIDEO_CHANNELS; ++i)
				{
					var v = this.videoChannels[i];
					if(v.cpSrc == videoObj.src && (v.ended || v.paused))
					{
						if(v.cpVideo != null)
						{
							v.cpVideo.nativeVideo = null;
							v.cpVideo = null;
						}

						videoObj.nativeVideo = v;
						v.cpVideo = videoObj;
						v.loop = videoObj.loop;
						v.ended = false;
						delete v.endedAt;
						delete v.pausedAt;
						v.cpTo = videoObj.to;

						if(!videoObj.isSeekPending())
							videoObj.seekTo(videoObj.from);

						videoObj.finishPendingSeek();
						//v.load();
						if(this.verbose)
							cp.log('allocVideoChannel found existing @ ' + i);
						return true;
					}
				}
				for(var i = 0; i < this.MAX_VIDEO_CHANNELS; ++i)
				{
					var v = this.videoChannels[i];
					if(v.cpSrc == '')
					{
						v.waitCount = 0;
						v.cpSrc = videoObj.src;
						v.src = videoObj.src;
						videoObj.nativeVideo = v;
						v.cpVideo = videoObj;
						v.loop = videoObj.loop;
						v.ended = false;
						delete v.endedAt;
						delete v.pausedAt;
						v.cpTo = videoObj.to;
						videoObj.finishPendingSeek();
						v.load();
						if(this.verbose)
							cp.log('allocVideoChannel found empty slot @ ' + i);
						return true;
					}
				}
				var idx = this.LRUVideoIndex();
				if(-1 != idx)
				{
					var v = this.videoChannels[idx];
					if(v.cpVideo != null)
					{
						v.cpVideo.nativeVideo = null;
						v.cpVideo = null;
					}

					videoObj.nativeVideo = v;
					v.cpVideo = videoObj;
					v.loop = videoObj.loop;
					v.ended = false;
					delete v.endedAt;
					delete v.pausedAt;
					v.cpTo = videoObj.to;

					if(v.cpSrc != videoObj.src)
					{
						v.waitCount = 0;
						v.cpSrc = videoObj.src;
						v.src = videoObj.src;
					}
					else if(!videoObj.isSeekPending())
						videoObj.seekTo(videoObj.from);

					videoObj.finishPendingSeek();
					v.load();
					if(this.verbose)
						cp.log('allocVideoChannel re-used LRU slot @ ' + idx);
					return true;
				}
				
				if(createNewIfAllChannelsAreBusy)
				{
					var v = new cp.NativeVideo();
					v.addEventListener("ended", this.onEndedCallBackFn, false);
					v.addEventListener("error", this.errorCallBackFn, false);
					v.addEventListener("waiting", this.waitingFn, false);
					v.addEventListener("canplay", this.canPlayCallBackFn, false);
					v.waitCount = 0;					
					v.cpSrc = videoObj.src;
					v.src = videoObj.src;
					videoObj.nativeVideo = v;
					v.cpVideo = videoObj;
					v.muted = this.muted;
					v.volume = this.volume;
					v.loop = videoObj.loop;
					v.ended = false;
					v.cpTo = videoObj.to;
					videoObj.finishPendingSeek();
					v.load();
					this.videoChannels[this.MAX_VIDEO_CHANNELS] = v;
					
					if(this.videoViews)
						this.videoViews.push(new cp.VideoView(v));
					
					if(this.verbose)
						cp.log('allocVideoChannel created new @ ' + this.MAX_VIDEO_CHANNELS);
					
					++this.MAX_VIDEO_CHANNELS;
					return true
				}
			}
			return false;
		},
		
		preallocVideoChannel: function(videoSrc)
		{
			if(this.verbose)
				cp.log('preallocVideoChannel ' + videoSrc);
			for(var i = 0; i < this.MAX_VIDEO_CHANNELS; ++i)
			{
				var v = this.videoChannels[i];
				if(v.cpSrc == videoSrc)
				{
					if(this.verbose)
						cp.log('preallocVideoChannel found existing @ ' + i);
					return true;
				}
			}
			for(var i = 0; i < this.MAX_VIDEO_CHANNELS; ++i)
			{
				var v = this.videoChannels[i];
				if(v.cpSrc == '')
				{
					v.waitCount = 0;
					v.cpSrc = videoSrc;
					v.src = videoSrc;
					v.ended = false;
					delete v.endedAt;
					delete v.pausedAt;
					delete v.cpTo;
					v.load();
					if(this.verbose)
						cp.log('preallocVideoChannel found empty slot @ ' + i);
					return true;
				}
			}
			return false;
		},
		
		load:function(postLoadFunc)
		{
			if(cp.IDEVICE == cp.device)
			{
				for(var i = cp.model.videos.length - 1; i >= 0 ; --i)
				{
					var src = cp.model.videos[i];
					
					if(src.indexOf("AFMR") == 0)
					{
						if(i > 0)
						{
							var nxtSrc = cp.model.videos[i-1];
							if(src.indexOf(nxtSrc) == 1)
							{
								--i;
							}
						}
					}
					this.videoChannels[0].src = src;
					this.videoChannels[0].load();
					try{
						this.videoChannels[0].src = 'cp_non_existing_media';
					}catch(e){}
					try{
						this.videoChannels[0].load();
					}catch(e){}
				}
				
				for(var i = cp.model.slideVideos.length - 1; i >= 0; --i)
				{
					this.slideVideoChannel.src = cp.model.slideVideos[i];
					this.slideVideoChannel.load();
					try{
						this.slideVideoChannel.src = 'cp_non_existing_media';
					}catch(e){}
					try{
						this.slideVideoChannel.load();
					}catch(e){}
				}
				
				if(this.tocVideoChannel)
				{
					for(var i = cp.model.tocVideos.length - 1; i >= 0; --i)
					{
						this.tocVideoChannel.src = cp.model.tocVideos[i];
						this.tocVideoChannel.load();
						try{
							this.tocVideoChannel.src = 'cp_non_existing_media';
						}catch(e){}
						try{
							this.tocVideoChannel.load();
						}catch(e){}
					}
				}
			}

			this.loaded = true;
			if(postLoadFunc)
				postLoadFunc();
		},
		
		preload: function(slideName)
		{
			if(!this.loaded || 1 != cp.movie.speed)
				return;

			if(this.verbose)
				cp.log('video manager preload ' + slideName);
			
			var slide = cp.model.data[slideName];
			if(slide.videos)
			{
				var prealloc1Success = true;
				var prealloc2Success = true;
				var prealloc3Success = true;
				for(var i = 0; i < slide.videos.length; ++i)
				{
					var v = cp.model.data[slide.videos[i]];
					if(v.type == cp.kCPFullMotion || v.type == cp.kCPOTVideoResource || v.type == cp.kCPOTFLVItem)
					{
						if(prealloc1Success)
						{
							var vc = cp.model.data[v.mdi];
							prealloc1Success = this.preallocVideoChannel(vc.mp4);
						}
					}
					else if(v.type == cp.kCPOTVideo)
					{
						var vc = cp.model.data[v.mdi];
						if(vc.sit)//toc
						{
							if(!prealloc2Success)
								continue;
								
							if(this.tocVideoChannel0.cpSrc == vc.mp4 || this.tocVideoChannel1.cpSrc == vc.mp4)
							{
								if(this.verbose)
									cp.log('vdm preload found existing ' + vc.mp4);
								continue;
							}
							if(!this.tocVideoChannel0.cpVideo)
							{
								this.tocVideoChannel0.cpSrc = vc.mp4;
								this.tocVideoChannel0.src = vc.mp4;
								this.tocVideoChannel0.load();
								if(this.verbose)
									cp.log('vdm preloaded tocV0 with ' + vc.mp4);
							}
							else if(!this.tocVideoChannel1.cpVideo)
							{
								this.tocVideoChannel1.cpSrc = vc.mp4;
								this.tocVideoChannel1.src = vc.mp4;
								this.tocVideoChannel1.load();
								if(this.verbose)
									cp.log('vdm preloaded tocV1 with ' + vc.mp4);
							}
							else prealloc2Success = false;
						}
						else
						{
							if(!prealloc3Success)
								continue;
								
							if(this.slideVideoChannel0.cpSrc == vc.mp4 || this.slideVideoChannel1.cpSrc == vc.mp4)
							{
								if(this.verbose)
									cp.log('vdm preload found existing ' + vc.mp4);
								continue;
							}
							if(!this.slideVideoChannel0.cpVideo)
							{
								this.slideVideoChannel0.cpSrc = vc.mp4;
								this.slideVideoChannel0.src = vc.mp4;
								this.slideVideoChannel0.load();
								if(this.verbose)
									cp.log('vdm preloaded SV0 with ' + vc.mp4);
							}
							else if(!this.slideVideoChannel1.cpVideo)
							{
								this.slideVideoChannel1.cpSrc = vc.mp4;
								this.slideVideoChannel1.src = vc.mp4;
								this.slideVideoChannel1.load();
								if(this.verbose)
									cp.log('vdm preloaded SV1 with ' + vc.mp4);
							}
							else prealloc3Success = false;
						}
					}
				}
			}
		},
		
		seekTo: function(frame, pause)
		{
			var v1, v2, v3;

			if(this.slideVideoChannel)
				v1 = this.slideVideoChannel.cpVideo;
			if(this.tocVideoChannel)
				v2 = this.tocVideoChannel.cpVideo;
			if(this.demoVideo)
				v3 = this.demoVideo.cpVideo;

			if(pause)
			{
				if(v1)
					v1.pause();
				if(v2)
					v2.pause();
				if(v3)
					v3.pause();
			}
			
			
			if(v1)
				v1.seekTo(frame);

			if(v2)
				v2.seekTo(frame);
			
			if(v3)			
				v3.seekTo(frame);
		},
		
		pause: function(reasonForPause)
		{
			this.reasonForPause = reasonForPause;
			
			if(reasonForPause == cp.ReasonForPause.PLAYBAR_ACTION ||
			reasonForPause == cp.ReasonForPause.CPCMNDPAUSE ||
			reasonForPause == cp.ReasonForPause.MOVIE_REWIND_STOP ||
			reasonForPause == cp.ReasonForPause.EVENT_VIDEO_PAUSE ||
			reasonForPause == cp.ReasonForPause.INTERACTIVE_ITEM)
			{
				//skipping event Videos
				if(this.slideVideoChannel && this.slideVideoChannel.cpVideo)
					this.slideVideoChannel.cpVideo.pause();
				if(this.tocVideoChannel && this.tocVideoChannel.cpVideo)
					this.tocVideoChannel.cpVideo.pause();
				if(this.demoVideo && this.demoVideo.cpVideo)
					this.demoVideo.cpVideo.pause();
			}
		},
		
		pace: function()
		{
			if(cp.device == cp.IDEVICE)
			{
				if(!cp.movie.stage.VideoPlaying)
					return null;
			}

			var v = this.slideVideoChannel;
			if(v)
			{
				var cpv = v.cpVideo;
				if(cpv && !v.ended && !v.paused && !cpv.loop && v.currentTime > 0)
					return cpv.from + ((v.currentTime - cpv.seek_From) * cpInfoFPS);
			}
			
			v = this.tocVideoChannel;
			if(v)
			{
				var cpv = v.cpVideo;
				if(cpv && !v.ended && !v.paused && !cpv.loop && v.currentTime > 0)
					return cpv.from + ((v.currentTime - cpv.seek_From) * cpInfoFPS);
			}
			
			v = this.demoVideo;
			if(v)
			{
				var cpv = v.cpVideo;
				if(cpv && !v.ended && !v.paused && !cpv.loop && v.currentTime > 0)
					return cpv.from + (v.currentTime* cpInfoFPS);
			}
			
			return null;
		},
		
		updateVideoViews: function()
		{
			if(this.viewVideo && this.videoViews)
				for(var i in this.videoViews)
					this.videoViews[i].update();
		}
	}
	
	cp.ReasonForPause = new Object();
	cp.ReasonForPause.PLAYBAR_ACTION = 0;
	cp.ReasonForPause.INTERACTIVE_ITEM = 1;
	cp.ReasonForPause.MOVIE_ENDED = 2;
	cp.ReasonForPause.VIDEO_SYNC = 3;
	cp.ReasonForPause.FEEDBACK_ITEM = 4;
	cp.ReasonForPause.CANNOT_MOVE_AHEAD = 5;
	cp.ReasonForPause.WAIT_FOR_RESOURCES = 6;
	cp.ReasonForPause.MOVIE_REWIND_STOP = 7;
	cp.ReasonForPause.CPCMNDPAUSE = 8;
	cp.ReasonForPause.SHOW_VALUE_AT_FRAME = 9;
	cp.ReasonForPause.DONT_CARE_DEPRECATED_CODE = 10;
	cp.ReasonForPause.EVENT_VIDEO_PAUSE = 11;
	cp.ReasonForPause.ONLY_ONE_MEDIUM_CAN_PLAY = 12;//iDevices
	
	cp.ReasonForPlay = new Object();
	cp.ReasonForPlay.PLAYBAR_ACTION = 0;
	cp.ReasonForPlay.INTERNAL = 1;
	
	cp.Movie = function(element)
	{
		this.virgin = true;
	    this.element = element;
		this.symbols = {};
		this.main = null;
		this.cc = document.getElementById("cc");
		
		this.cpInfoLastVisitedSlideStartFrame = 0;
		this.fps = cp.model.data[element.id].fps;
		this.hidePlaybarInQuiz = cp.model.data.quizzingData.hidePlaybarInQuiz;
		this.offset = (cp.offsetInnerWidth - cp.model.data[element.id].w + (cp.model.data.project.hasTOC  &&  !cp.model.data.tocProperties.overlay ? (cp.model.data.tocProperties.position == 1 ? cp.model.data.tocProperties.width : -cp.model.data.tocProperties.width) : 0))/2;
			
		this.paused = true;
		this._parseElements();	

		var questionsString = cp.model.data[this.main.id].questions;
		if(questionsString)
		{
			this.questions = (questionsString).split(",");
			this.questionObjs = [];
		}		
		
		this.element.style.backgroundColor = cp.model.data[this.element.id].prjBgColor;
				
		this.currAudioType = 'bg';
		this.currAudioStartFrame = -1;
		this.currAudioStopFrame = -1;		
		this.counter = 0;
		this.speed = 1;
		this.playKeyTap = cp.model.data[element.id].pkt;

		this.m_hasIsTrackedBeenSet = false;
		
		this.waitedForResources = 0;//mS
		this.MIN_WAIT_TIME_TO_PAUSE_MOVIE = 0;//mS
		this.MIN_WAIT_TIME_TO_BLOCK_UI = 2000;//mS
		this.MAX_WAIT_TIME = 100000;//mS
	}
	
	cp.Movie.prototype = 
	{
		handleProjectOptions: function()
		{
			this.handleAutoplay();
					
			this.handlePasswordProtected();
									
			this.handlePreloader();			
						
			this.handleExpiry();			
		},
		
		handleExpiry: function()
		{
			var lHasExpiryOn = cp.model.data[this.main.id].prjExpOn;
			if(!lHasExpiryOn)
			{
				cp.expiryDiv.style.display = "none";
				cp.expiryDiv.style.visibility = "hidden";
				return;
			}			
			
			var lMainModelData = cp.model.data[this.main.id];
			var lExpYear = lMainModelData.prjExpY;
			var lExpMonth = lMainModelData.prjExpM;
			var lExpDay = lMainModelData.prjExpD;
			var lExpDate = new Date();
			lExpDate.setFullYear(lExpYear, lExpMonth - 1, lExpDay - 1);
			var lCurrDate = new Date();
			
			if(lCurrDate.getTime() <= lExpDate.getTime())
			{
				if(cp.expiryDiv)
					cp.expiryDiv.parentNode.removeChild(cp.expiryDiv);
				return;
			}
			
			var lExpMsg = lMainModelData.prjExpMsg;
						
			cp('project').style.visibility = "hidden";		
			cp('playbar').style.visibility = "hidden";
			cp('toc').style.visibility = "hidden";
			
			var lInnerHTML = "<div id='expMsg' style='width:380px;height:54px;left:" + ((cp.model.data.project.w - 380)/2) + "px;top:" + ((cp.model.data.project.h - 54)/2) + "px;position:absolute'>" +
							 "<div id='expImg' style='width:100%;height:100%;background-image:url(assets/htmlimages/movieexpire.png);background-repeat:no-repeat;'></div>" +
							 "<div id='expText' style='color:#ffffff; width:300px;left:65px; position:absolute; height:15px; top:20px; font-size:12px; text-align:left; text-overflow: clip;overflow: hidden'/>" + lExpMsg + "</div>" +
							 "</div>";
			//cp.expiryDiv.style.width = cp.model.data.project.w + "px";
			//cp.expiryDiv.style.height = cp.model.data.project.h + "px";
			cp.expiryDiv.style.backgroundColor = cp.model.data[this.element.id].prjBgColor;
			cp.expiryDiv.innerHTML = lInnerHTML;			
		},
		
		handleAutoplay: function()
		{
			var lShouldAutoplay = cp.model.data[this.main.id].autoplay;
			
			var playImgDiv = document.getElementById("playImage");
			if(!lShouldAutoplay)
			{				
				this.autoplayimagew = 0;
				this.autoplayimageh = 0;
				
				var lImageSrc = cp.model.data[this.main.id].autoplayFileName;			
				if(lImageSrc != undefined)
				{				
					cp.autoplayImage.src = lImageSrc;
					cp.autoplayImage.style.opacity = 0.7;
					this.autoplayimagew = cp.model.data[this.main.id].autoplayimagew;
					this.autoplayimageh = cp.model.data[this.main.id].autoplayimageh;
				}
				else
				{
					cp.autoplayImage.style.display = "none";
					cp.autoplayImage.style.visibility = "hidden";
				}
			}
			else
			{
				//hide only the autoplay background image element and not the whole div. Because we always keep autoplay off for HTML5
				//document.getElementById('autoplayDiv').style.display = "none";
				cp.autoplayImage.style.display = "none";
				cp.autoplayImage.style.visibility = "hidden";
			}
		},
		
		handlePasswordProtected: function()
		{
			var lIsPwdProtected = cp.model.data[this.main.id].pwdProtected;
			if(!lIsPwdProtected)
			{
				cp.passwordDiv.style.display = "none";
				cp.passwordDiv.style.visibility = "hidden";
				return;
			}
				
			var lMainModelData = cp.model.data[this.main.id];
			var lPwdStr = lMainModelData.pwd;
			var lPwdMsg = lMainModelData.pwdMsg;
			var lPwdRetryMsg = lMainModelData.pwdRetryMsg;
			var lPwdTxtBoxVarName = lMainModelData.pwdTxtBoxVarName;
			var lPwdTxtBoxW = lMainModelData.pwdTxtBoxW;
			var lPwdTxtBoxH = lMainModelData.pwdTxtBoxH;
			
			var showHideOtherControls = function(iBool)
			{
				if(!iBool)
				{
					cp('project').style.visibility = "hidden";
					cp('playbar').style.visibility = "hidden";
					cp('toc').style.visibility = "hidden";					
				}			
				else
				{
					cp('project').style.visibility = "visible";
					cp('playbar').style.visibility = "visible";
					cp('toc').style.visibility = "visible";					
					cp.passwordDiv.parentNode.removeChild(cp.passwordDiv);
				}
				
			};			
			
			var checkIfCorrectPassword = function()
										 {
											var lPasswordInputElem = document.getElementById(lPwdTxtBoxVarName);
											if(lPasswordInputElem && lPasswordInputElem.value == lPwdStr)
											{
												showHideOtherControls(true);												
											}
											else
											{
												if(cp.verbose)
													cp.log("incorrect pwd");
												var lPromptMsgElem = document.getElementById('promptMsg');
												if(lPromptMsgElem)
													lPromptMsgElem.innerHTML = lPwdRetryMsg;
											}
										 };
			var lInnerHTML = "<table id='pwdTable' style='position:absolute;background-color:#FFFFFF;left:0px;top:0px;width:100%;height:100%'>" + 
								"<tr style='width:100%;height:100%;text-align:center;vertical-align:middle'>" +
								"<td>" +
								"<table style='width:100%;text-align:center;vertical-align:middle'>" + 
								"<tr style='text-align:center;vertical-align:middle'><td id='promptMsg'>" + lPwdMsg + "</td></tr>" + 
								"<tr style='text-align:center;vertical-align:middle'><td><input id='" + lPwdTxtBoxVarName + "' type='password' style='width:" + lPwdTxtBoxW + "px;height:" + lPwdTxtBoxH + "px;'/></td></tr>" + 
								"<tr style='text-align:center;vertical-align:middle'><td><button id='checkPwdButton'>Continue</button></td></tr>" + 
								"</table>" + 
								"</td>" + 
								"</tr>";
			
			cp.passwordDiv.innerHTML = lInnerHTML;		
						
			document.getElementById("checkPwdButton").onclick = checkIfCorrectPassword;
			var inputElem = document.getElementById(lPwdTxtBoxVarName)
			inputElem.focus();
			inputElem.onkeyup = function(e) 
								{ 
									if(e.keyCode == 13) 
										checkIfCorrectPassword(); 
								};
			showHideOtherControls(false);
		},
		
		handlePreloader: function()
		{			
			var lHasPreloader = cp.model.data[this.main.id].preloader;
			var lProjMainData = cp.model.data[this.main.id];			
			var lPreloaderImageSrc = lProjMainData.preloaderFileName;
			if((lPreloaderImageSrc != undefined) && (lPreloaderImageSrc != '') && lHasPreloader)
			{
				var lPreloaderPercentage = lProjMainData.preloaderPercentage;
				
				cp.preloaderImage.src = lPreloaderImageSrc;
				if(lPreloaderImageSrc.indexOf('defaultloading.png') != -1)
					cp.preloaderImage.defaultImage = true;
				else
					cp("loadingString").style.display = 'none';
			}
			else
			{
				cp.preloaderImage.style.display = 'none';
			}
			
			this.preloadProjectAssets();
		},
		
		preloadProjectAssets: function()
		{
			var lProjectAssets = cp.model.projectImages;
			if(!lProjectAssets)
				return;
			if(lProjectAssets.length == 0)
				return;
			
			cp.movie.im.loadImages(-1, lProjectAssets, true, true);
		},
		
		rewind: function()
		{
			this.stage.handleRewindForFramesets();			
			this.stage.RemoveFeedbacks(cp.FeedbackCloseReason.SLIDE_CHANGE);
			cp.movie.stage.itemsNotLoaded = [];
			
			this.jumpToFrame(1);
			if ( ! cp.movie.stage.hasItemsLoaded() ) 
				cp.movie.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
			else	
				this.play();
		},
		
		_parseElements: function()
		{
			var child = this.element.firstChild;
			for( ; child; child = child.nextSibling)
			{
				if (child.nodeType != Node.ELEMENT_NODE)
					continue;
				
				var classNames = (child.className + "").split(" ");
				var isTimeline = classNames.indexOf("cp-timeline") != -1;
				if (!isTimeline)
				{
					//console.error("cp-movie ", this.element, " should only contain cp-timelines. Invalid element: ", child);
					continue;
				}
				
				var isMain = classNames.indexOf("cp-main") != -1;
				var isSymbol = classNames.indexOf("cp-symbol") != -1;
				
				if (isSymbol)
					this.symbols[child.id] = child;
				
				if (isMain)
				{
					if (this.main != null) {
						//console.error("Already got a main old value: ", this.main, " new value " + child);
					}
					
					this.main = child;
				}
			}
			
			if (this.main == null)
			{
				//console.error("No cp-main defined for movie ", this.element);
				return;
			}
			
			this.stage = cp.parseTimeline(this.main);
			
			if (debug)
			{
				var self = this;
				var pauseButton = document.createElement("input");
				pauseButton.setAttribute("type", "button");
				pauseButton.value = "Play " + self.element.id;
				document.body.appendChild(pauseButton);
				pauseButton.onclick = function()
				{
					self.pause(cp.ReasonForPause.PLAYBAR_ACTION);
					if (self.paused)
						pauseButton.value = "Play " + self.element.id;
					else
						pauseButton.value = "Pause " + self.element.id;
				}
			}
		},
		
		resetFPS: function()
		{
			if (cpInfoFPS == 0)
			{
				//console.error("Framerate is zero.");
				return;
			}
			
			this.POLL_INTERVAL = 1000 / cpInfoFPS;
			
			if(this.interval)
			{
				clearInterval(this.interval);
				this.interval = 0;
			}
			
			var self = this;
			this.interval = setInterval(function() 
			{ 
				self._onEnterFrame(); 
			}, this.POLL_INTERVAL);		
		},
		
		startTimer: function()
		{
			if (this.interval)
				return;
			
			this.stage.start();
			this.element.style.display = "block";

			this.resetFPS();
		},
		
		stop: function()
		{
			this.stage.reset();
			this.element.style.display = "none";
			var playbar = document.getElementById("playbar");
			if(playbar['pause']!=undefined)
				playbar.pause();
		},
		
		play: function(reasonForPlay)
		{
			if(cp.verbose)
				cp.log('movie.play deleting pendingPlay');
			delete this.pendingPlay;
			
			if(this.virgin)
			{
				if(cp.verbose)
					cp.log('movie virgin play');
				this.virgin = false;
				/*var lPlaybackController = cp.movie.playbackController;
				if(lPlaybackController)
					lPlaybackController.RestoreQuizState();					*/
				
				if(cp.IDEVICE == cp.device)
					loadMediaAndBeginMovie();
				else
					beginMovie();
				return true;
			}

			if(!this.paused)
				return false;
				
			if(this.waitingForResources())
			{
				if(cp.verbose)
					cp.log('set pendingPlay = true. movie cannot play since resources not available');
				this.pendingPlay = true;
				return false;
			}
			
			if(cp.verbose)
				cp.log('movie play');
			
			this.am.ssp = 0;
			
			var playbar = document.getElementById("playbar");
			if(playbar['play']!=undefined)
				playbar.play();
			if(cpInfoCurrentFrame==1 && ! this.tocPlaybarHandlerSet )
			{
				if ( playbar.animator )
					playbar.animator.startTimer();
				var slideDiv = this.stage.getSlideDiv();
				if (slideDiv) 
				{
					this.tocPlaybarHandlerSet = true;
					if(cp.device == cp.IDEVICE)
					{
						if ( playbar.animator || ( cp.model.data.project.hasTOC  &&  cp.model.data.tocProperties.overlay ) ) {
							slideDiv.ontouchstart = cp.handleMouseOver;
							slideDiv.ontouchend = cp.handleMouseOut;
							slideDiv.touchstartX = null;
							slideDiv.isMoving = false;
							if(cp.model.data.project.hasTOC  &&  cp.model.data.tocProperties.overlay)
							{
								slideDiv.showTOC = true;
								slideDiv.swipeDir = cp.model.data.tocProperties.position;
							}
						}
					}
					else						
					{
						if ( playbar.animator ) {
							slideDiv.onmouseover = cp.handleMouseOver;
							slideDiv.onmouseout = cp.handleMouseOut;
						}
					}
				}
			}
			this.now = new Date();
			if(this.startTime == undefined)
			{
				this.startTime = this.now;
                cp.em.fireEvent('CPMovieStart');
			}
            else
            {
                cp.em.fireEvent('CPMovieResume',reasonForPlay);
			}

			this.paused = false;
			this.stage.updateToFrame(cpInfoCurrentFrame);
			
			RegisterForUpdateTimeBasedSystemVariables();
			
			return true;
		},
		
		pause: function(reasonForPause)
		{
			if(this.paused && reasonForPause != cp.ReasonForPause.WAIT_FOR_RESOURCES)
			{
				if( this.waitingForResources() || this.reasonForPause == cp.ReasonForPause.WAIT_FOR_RESOURCES)
				{
					if(cp.verbose)
						cp.log('set pendingPause = true. movie cannot pause since resources not available');
					this.pendingPause = true;
					return;
				}
			}

			if(this.paused)
				return;

			if(cp.verbose)			
				cp.log('movie pause ' + reasonForPause);
			this.reasonForPause = reasonForPause;

			if(cp.verbose)
				cp.log('movie.pause deleting pendingPlay');
			delete this.pendingPlay;
			if(reasonForPause == cp.ReasonForPause.INTERACTIVE_ITEM)
				this.stage.interactivePauseFrame = cpInfoCurrentFrame;
				
			UnregisterForUpdateTimeBasedSystemVariables();
			var playbar = document.getElementById("playbar");
			if(playbar['pause']!=undefined)
				playbar.pause();
			if(reasonForPause == cp.ReasonForPause.MOVIE_ENDED && playbar.animator)
			{
				playbar.animator.showPlaybar(true);
			}
			this.paused = true;
			this.stage.updateToFrame(cpInfoCurrentFrame);
			
			if(this.am)
				this.am.pause(reasonForPause);
			if(this.vdm)
				this.vdm.pause(reasonForPause);

            cp.em.fireEvent('CPMoviePause',reasonForPause);
		},
		
		blockUI: function()
		{
			if(!this.blockedUI)
			{
				this.blockedUI = true;
				cp('blockUserInteraction').style.display = 'block';
				cp('blockUserInteraction').style.width = '100%';
				cp('blockUserInteraction').style.height = '100%';
				this.preloadRot = 0;
			}
			else
			{
				if(cp.preloaderImage && cp.preloaderImage.defaultImage)
				{
					this.preloadRot = (this.preloadRot + 20)%360;
					applyTransform(cp.preloaderImage, 'rotate(' + this.preloadRot + 'deg)');
				}
			}
		},
		
		unblockUI: function()
		{
			if(this.blockedUI)
			{
				this.blockedUI = false;
				cp('blockUserInteraction').style.display = 'none';
			}
		},
		
		_jumpToFrame: function()
		{
			var tmp = this._jumpFrame;
			if(tmp)
			{
				delete this._jumpFrame;
				setCpInfoCurrentFrame(tmp);
				this.stage.updateFrame(cp.Timeline.ReasonForUpdate.JUMP);
			}
		},
		
		jumpToFrame: function(frame)
		{
			if(this.waitingForResources())
			{
				if(cp.verbose)
					cp.log('movie cannot jumpToFrame since resources not available');
				this.pendingJump = frame;
				return false;
			}
			
			if(frame == "cpInfoLastVisitedSlide")
				frame = this.cpInfoLastVisitedSlideStartFrame;
			
			var indexOfSlideToJumpTo = cp.movie.stage.getSlideIndexForFrame(frame);
            if(!this.stage.canUpdateToFrame(frame, indexOfSlideToJumpTo))
			{
				if(cp.verbose)
					cp.log('movie cannotUpdateToFrame '+ frame);
				return false;
			}
            
			if(this.pm.isLoading())
			{
				if(cp.verbose)
					cp.log('movie cannot jumpToFrame since prefetchManager is loading');
				this.pendingJump = frame;
				return false;
			}
			
			this._jumpFrame = frame;
			this.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
			return this.pm.loadSlideAssets(indexOfSlideToJumpTo);			
		},

		executeAction: function(str)
		{
			if(cp.verbose)
				cp.log('execute action str [' + str + ']');
			if(str && str != '')
			{
				try
				{
					eval(str);
				}
				catch(e)
				{
					cp.log(e);
				}
			}
		},
		
		mousePath: function(object, frame)
		{
			if (frame < object.afrom || frame > object.ato)
				return;
				
			var deltaFrame = object.ato - object.afrom;
			if(deltaFrame == 0)
				return;

			// Now, we need to reach the end point sometime before reaching to point.
			var subFrameNo = Math.floor( cpInfoFPS * 0.5 );
			deltaFrame -= subFrameNo;
			if (deltaFrame <= 0)
				deltaFrame = 0;
				
			var mpa = this.motionPathArgs;
			var bounds = mpa.b;
			
			var deltax = bounds[2] - bounds[0];
			var deltay = bounds[3] - bounds[1];

			var slideFrame = frame - object.afrom;
						
			// Now, for all the calculations regarding mouse paths.
			var lStartX = bounds[0];
			var lStartY = bounds[1];

			var lEndX = bounds[2];
			var lEndY = bounds[3];
			
			var bx = lEndX;
			var by = lStartY;
			
			var lPower = 1.0;
			if (mpa.s == 1)
				lPower = 0.5;
			
			var leftPos = lEndX;
			var topPos = lEndY;
			
			if (deltaFrame > 0 && slideFrame < deltaFrame) {
				var straighMouse = (0 == mpa.t) || (0 == deltax) || (0 == deltay);
				var mu = Math.pow(slideFrame/deltaFrame,lPower);

				if (straighMouse) {
					leftPos = (lStartX + deltax * mu);
					topPos = (lStartY + deltay * mu);
				}
				else {
					var musqd = mu * mu;
					var muInverse = 1 -mu;
					var muInverseSqd = muInverse * muInverse;
					leftPos = ((lStartX * muInverseSqd) + (2 * bx * muInverse * mu) + (lEndX * musqd));
					topPos = ((lStartY * muInverseSqd) + (2 * by * muInverse * mu) + (lEndY * musqd));
				}
			}
			
			
			object.children[0].element.left = leftPos;
			object.children[0].element.style.left = leftPos + "px";

			object.children[0].element.top = topPos;
			object.children[0].element.style.top = topPos + "px";
		},
	
		waitingForResources: function()
		{
			var i = (this.im && this.im.imagesNotLoaded());
			var h = (this.stage && !this.stage.hasItemsLoaded());
			var a = (this.am && this.am.pendingAudios() > 0);
			var v = (this.vdm && this.vdm.numVideosWaiting > 0);//TODO::may have to remove numVideosWaiting just like audio
			if(cp.verbose && v)
				cp.log(this.vdm.numVideosWaiting + ' videos pending');
			var p = (this.ms && this.ms.pendingItems() > 0);
			if( i || h || a || v || p )
				return true;
			return false;
		},
		
		resetAllWaitingResources: function()
		{
			if(this.im)
				this.im.reset();
			if(this.stage)
				this.stage.itemsNotLoaded = [];
			if(this.am)
				this.am.resetAllWaitingAudios();
			if(this.vdm)
				this.vdm.numVideosWaiting = 0;
			if(this.ms)
				this.ms.reset();
				
			this.waitedForResources = 0;
		},
		
		_onEnterFrame: function()
		{
			this.am.updateAudioViews();
			this.vdm.updateVideoViews();
			
			if(this.waitingForResources())
			{
				this.waitedForResources += this.POLL_INTERVAL;//not accurate, but doesn't matter
				//if(cp.verbose)
					//cp.log('waitedFor ' + this.waitedForResources + ' mS');
					
				if(this.waitedForResources >= this.MAX_WAIT_TIME)
				{
					if(cp.verbose)
						cp.log('waited too long...given up waiting! Paused = ' + this.paused + ' reason = ' + this.reasonForPause + ' pendingPlay = ' + this.pendingPlay);

					this.resetAllWaitingResources();
					this.unblockUI();
					
					if(!this.paused && this.pendingPause)
					{
						this.pause();
						delete this.pendingPause;
						return;
					}
					
					if((this.paused && this.reasonForPause == cp.ReasonForPause.WAIT_FOR_RESOURCES) || this.pendingPlay)
					{
						this.play();
					}
					return;
				}
				else if(this.waitedForResources >= this.MIN_WAIT_TIME_TO_BLOCK_UI)
				{
					this.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
					this.blockUI();
					return;
				}
				else if(this.waitedForResources >= this.MIN_WAIT_TIME_TO_PAUSE_MOVIE)
				{
					this.pause(cp.ReasonForPause.WAIT_FOR_RESOURCES);
					return;
				}

				return;
			}
			else
			{
				if(this.waitedForResources > 0)
				{
					if(cp.verbose)
						cp.log('finished waiting! Paused = ' + this.paused + ' reason = ' + this.reasonForPause + ' pendingPlay = ' + this.pendingPlay);
				}
				this.waitedForResources = 0;
				this.unblockUI();
				if(!this.paused && this.pendingPause)
				{
					this.pause();
					delete this.pendingPause;
					return;
				}
				if((this.paused && this.reasonForPause == cp.ReasonForPause.WAIT_FOR_RESOURCES) || this.pendingPlay)
				{
					this.play();
					return;
				}
			}
			
			if(this._jumpFrame)
			{
				this._jumpToFrame();
				return;
			}
			
			var tmp = this.pendingJump;
			if(tmp)
			{
				if(cp.verbose)
					cp.log('jumping to pending jump frame ' + tmp);
				delete this.pendingJump;
				this.jumpToFrame(tmp);
				return;
			}

			if (this.paused)
			{
				this.stage.UpdateFeedbacks();
				this.stage.updateFrameCurrentOnPause();
    		    return;
			}
			
			var beforeUpdate = new Date();
			this.stage.UpdateFeedbacks();
			this.stage.updateFrame(cp.Timeline.ReasonForUpdate.PROGRESS);
			var afterUpdate = new Date();

			if(this.paused)
				return;
			
			var elapsedFrames = 0;
			if(cp.disablePaceMaker)
			{
				elapsedFrames = 1;
			}
			else
			{
				if(1 == this.speed && this.am.pace)
				{
					elapsedFrames = Math.round(this.am.pace - cpInfoCurrentFrame);
					this.now = new Date();
				}
				else
				{
					var then = this.now;
					var now = new Date();
					elapsedFrames = Math.round(((now.getTime() - then.getTime() - (afterUpdate.getTime() - beforeUpdate.getTime()))*cpInfoFPS)/1000.0);
					if(elapsedFrames > 0)
					{
						this.now = now;
					}
				}
			}
			
			if(cp.verbose)
				cp.log("elapsed frames = " + elapsedFrames);
			this.stage.attemptToAdvanceCurrentFrameByOffset(elapsedFrames);
		},
		
		registerQuizVariableSetters: function()
		{
			if(!cp.movie.playbackController)
				return;
			var lQuizController = cp.movie.playbackController.GetQuizController();	
			if(!lQuizController)
				return;
				
			lQuizController.quizInScopeSetter = setCpInQuizScope;
			lQuizController.quizScopeSlideSetter = setCpQuizScopeSlide;
		},

		initLMS: function()
		{
			if (this.playbackController)
			{				
				var loadingResumeData = this.playbackController.GetLoadingResumeDataBln();
				//if (loadingResumeData)
				//	m_VarHandle.rdcmndPause = 1;
				
				if (!this.m_hasIsTrackedBeenSet)
				{
					if (!this.playbackController.GetIsTrackedFlag())
					{
						this.playbackController.SetIsTracked(false);
						this.m_hasIsTrackedBeenSet = true;
					}
					else //if (m_currSlide)
					{
						this.playbackController.SetIsTracked(true);
						this.m_hasIsTrackedBeenSet = true;
					}
					loadingResumeData = this.playbackController.GetLoadingResumeDataBln();
					//if (loadingResumeData)
					//	m_VarHandle.rdcmndPause = 1;
				}
			}
		},
		
		resumeMovieSpecificValue: function()
		{
			if(!this.playbackController)
				return;
			var lRestoringFrame = this.playbackController.GetRestoredQuizSlide();
			if(lRestoringFrame >=0)
				setCpInfoCurrentFrame(lRestoringFrame);
		}
	}
	
})();


function playPause(fromPlaybar)
{
    var reason;
	if(cp.movie.paused)
	{
        if (fromPlaybar == true)
            reason = cp.ReasonForPlay.PLAYBAR_ACTION;
		cp.movie.play(reason);
	}
	else
	{
        if (fromPlaybar == true)
            reason = cp.ReasonForPause.PLAYBAR_ACTION;
		cp.movie.pause(reason);
	}
}

function goToPreviousSlide()
{
	cp.jumpToPreviousSlide()
}
function goToNextSlide()
{
	cp.jumpToNextSlide();
}
function jumpToSlide(uid)
{
	cpCmndGotoSlideByUIDAndResume = uid;
}
function rewind()
{
	cpCmndRewindAndPlay = 1;
}
function showHideCC()
{
	if(cpCmndCC)
		cpCmndCC = 0;
	else
		cpCmndCC = 1;
}
function showHideTOC()
{
	var toc = document.getElementById('toc');
	if(toc!=undefined && toc.animator)
	{
		if(toc.animator.direction == 0)
			toc.animator.showTOC();
		else
			toc.animator.hideTOC();
	}
}
function fastForward()
{
	cpCmndFastForward = 1;
}
function shouldMoveTo(frame)
{
	return cp.movie.stage.canUpdateToFrame(frame);
}

function showValue(frame) 
{
	showHideElements();
	cp.movie.pause(cp.ReasonForPause.SHOW_VALUE_AT_FRAME);
	cp.movie.jumpToFrame(frame);
}

function showHideFeedbackCaptionsClickHandler (div,shouldExecuteAction, item) 
{ 
	var object = item;
	if (! object) {
		var slideDivData = cp.model.data[div.id]; 
		object = slideDivData['topMostObjectInteractiveObject']; 
	}
	if (! object)
		return false;
	var divdata = cp.model.data[object]; 
	if ( divdata && undefined != divdata.val ) // means TEB.
		return false; // TEB has it's own handler.
	return cp.clickFailureHandler(divdata, shouldExecuteAction);
} 

function vTEB( tebDivName )
{
	var divdata = cp.model.data[ tebDivName ];
	if ( undefined == divdata || divdata.handled )
		return false;
		
	var currentAttempt = 0;
	var cAttempt = divdata[ 'currentAttempt' ];
	if ( undefined != cAttempt )
		currentAttempt = cAttempt;

	var maxAttempts = divdata[ 'ma' ];
	currentAttempt = currentAttempt + 1;
	divdata[ 'currentAttempt' ] = currentAttempt;
	
	var isCorrect = cp.isTEBValueCorrect( tebDivName, divdata ); 
		
	var successCaption = divdata[ 'osc' ];  
	var successAction = divdata[ 'oca' ];

	var failureCaption = divdata[ 'ofc' ];  
	var failureAction = divdata[ 'ofa' ];

	var captionToBeShown = false; 
	var caption = ''; 
	var isCaptionVisible = false; 
	var action = ''; 
	var pauseMovie = false;
	var feedback = null;
	var feedbackType = cp.FeedbackType.SUCCESS;

	if ( isCorrect ) { 
		caption = successCaption; 
		action = successAction; 
		pauseMovie = ( divdata.pfc == 1 );
		SubmitInteractions(tebDivName, true, currentAttempt);
	} 
	else { 
		feedbackType = cp.FeedbackType.FAILURE;
		caption = failureCaption; 
		action = failureAction; 
		SubmitInteractions(tebDivName, false, currentAttempt);
	}

	if ( caption.length > 2 )
		captionToBeShown = true;
	
	var shouldExecuteAction = ( maxAttempts != -1 && currentAttempt >= maxAttempts ) || isCorrect;
	if ( ! divdata.handled )
		divdata.handled = shouldExecuteAction;
		
	if ( captionToBeShown ) {
		if ( ! shouldExecuteAction )
			action = '';
		feedback = new cp.Feedback( caption, action, pauseMovie, feedbackType );
		feedback.show();		
	} 		 
	else if ( shouldExecuteAction )
		cp.movie.executeAction( action ); 
	return isCorrect;
}	

function TEBValidator( div ) 
{ 
	var button_divdata = cp.model.data[ div.id ];
	if ( button_divdata ) 
		vTEB( button_divdata[ 'vid' ] );
}

function hyperlinkClick( div ) 
{ 
    var hyperLink_divData = cp.model.data[div.id];
    if (hyperLink_divData)
    {
        var actionString = hyperLink_divData['oca'];
            if(cp.movie.paused)
            {
               actionString = actionString.replace("cpCmndResume = 1;", "");            		
            }
												
        cp.movie.executeAction(actionString); 
    }	
}

function clickHandler (div) 
{ 
	var divdata = cp.model.data[div.id]; 
	cp.clickSuccessHandler(divdata);
} 

function ch(div){return clickHandler(div);}

function SubmitInteractions(objName,isCorrect,currentAttempt)
{
	var lClickItemData = cp.model.data[objName];
    var objType = lClickItemData.type;   
        
	if ( ! lClickItemData )
		return;
	var shouldIncludeInQuiz = ((lClickItemData['siq'] != undefined) && (lClickItemData['siq']));
	if(shouldIncludeInQuiz)
	{
		var lQuestionObj = getQuestionObject(objName);
		if(lQuestionObj)
		{
			if(!cp.movie.playbackController)
				return;
			var lQuizController = cp.movie.playbackController.GetQuizController();	
			if(!lQuizController)
				return;
			
			var lIsDone = false;
			if(!lQuizController.GetIsInReviewMode() && !lQuizController.GetIsQuizCompleted())
				lQuestionObj.setCurrentAttempt(currentAttempt + 1);
			
			var lCorrectValues;
			var lCurrentValues;
			if(lQuestionObj.getInteractionType() == "fill-in")
			{
				var inputFieldName = objName + '_inputField'; 
				var input = document.getElementById( inputFieldName );
				if ( ! input )
					return false;				
				
				lCorrectValues = lClickItemData['exp'];
				lCurrentValue = input.value;
			}	
			else
			{
				lCorrectValues = ['1'];
				if(isCorrect)
					lCurrentValue = '1';
				else
					lCurrentValue = '0';
			}
			
			lQuestionObj.questionData['cal'] = lCorrectValues;
			lQuestionObj.setSelectedAnswers(lCurrentValue);
			
			if(isCorrect)
			{				
				lIsDone = true
			}
			else
			{
				if(lQuestionObj.getCurrentAttempt() >= lQuestionObj.getNumberOfAttempts())
					lIsDone = true;
			}
						
			var shouldAddToTotal = ((lClickItemData['sat'] != undefined) && (lClickItemData['sat']));
			lQuestionObj.setShouldAddToTotal(shouldAddToTotal);
			if(!lQuizController.GetIsInReviewMode() && !lQuizController.GetIsQuizCompleted())
			{				
				if(lIsDone)
				{
					if(isCorrect)
						lQuestionObj.setQuestionStatus(lQuestionObj.QuestionStatusEnum.CORRECT);
					else
						lQuestionObj.setQuestionStatus(lQuestionObj.QuestionStatusEnum.INCORRECT);
								
					lQuestionObj.endQuestion(true);
				}
			}
		}

        
	}

        var evtArgs = {
				        itemname: objName,
                        frameNumber: cpInfoCurrentFrame,
				        objecttype: objType,
				        issuccess: isCorrect,
                        slideNumber: cpInfoCurrentSlideIndex + 1,
                        includedInQuiz:shouldIncludeInQuiz
				    };
        if (lQuestionObj)
              evtArgs.questioneventdata = lQuestionObj.getQuestionEventData()       

        cp.em.fireEvent('CPInteractiveItemSubmit',evtArgs);
	}
function hotspotQuestionSlideHandler(e) 
	{ 
			var lScaledPosition = getScaledPosition(e.pageX, e.pageY);
			var x = lScaledPosition.X; 
			var y = lScaledPosition.Y; 
			//x -= cp.movie.offset;
			//y -= cp.movie.topOffset;
			var currDiv = e.currentTarget; 
			var children = currDiv.childNodes; 
			var currElement = children[0]; 
			var currElementDivData = cp.model.data[currElement.id];
			var lQuestionObj = getQuestionObject(currElement.id); 
			if(lQuestionObj)
				lQuestionObj.hotspotQuestionHandler(currDiv, x, y); 			
	} 
function handleClickExternal(e)
{
	function IsNonQuestionInteractiveObject(obj)
	{
		// For the moment, handle only click box.
		return cp.kCPOTClickBoxItem == obj.type || cp.kCPOTScorableButtonItem == obj.type || cp.kCPOTAutoShape == obj.type;
	}	
	
	function createClickTimer( currElem, clickItem, attempt ) 
	{
		var elem = currElem;
		var cItem = clickItem;
		var currentAttempt = attempt;
		
		function handleClickInternal()
		{
			cp.stopClickTimer();
			currentAttempt = currentAttempt + 1;
			cItem[ 'currentAttempt' ] = currentAttempt;
			
			var maxAttempts	= cItem[ 'ma' ];
			var canvasItem = cItem[ 'mdi' ];
			var isVisible = (cp.model.data[canvasItem].visible);	
			
			var shouldExecuteAction = (maxAttempts != -1 && currentAttempt >= maxAttempts) && (isVisible);
							
			var retVal = showHideFeedbackCaptionsClickHandler( currElem, shouldExecuteAction, cp.model.data[canvasItem].dn);
			if ( IsNonQuestionInteractiveObject( cItem ) && ! cItem.handled ) 
				cItem.handled = shouldExecuteAction;
			return retVal;
		}
		
		if ( ! cp.isClickTimerRunning() )
			cp.startClickTimer( 500, handleClickInternal );
	}
	
	function ShouldHandle( obj )
	{
		// For autoshape on hotspot question, we need to handle only when autoshape is on top.
		if ( ! obj || cp.kCPOTAutoShape != obj.type )
			return true; // handle.
			
		var currSlide = cp.movie.stage.currentSlide;
		var isHotspot = false;
		var areQuestionSlideOptionsDisabled = false;
		
		var sFrom = 0, sTo = 0;
		
		if ( currSlide ) {
			sFrom = currSlide.from;
			sTo = currSlide.to;
			if ( currSlide.st == "Question Slide" ) {
				if ( currSlide.qs ) {
					var data = cp.model.data[ currSlide.qs ]; 
					if ( data && data.qtp == 'Hotspot' )
						isHotspot = true;
					
					var lQuestionObj = getQuestionObject(currSlide.qs);
					if(lQuestionObj && lQuestionObj.shouldDisableOptions())
						areQuestionSlideOptionsDisabled = true;
				}
			}
		}
		
		if ( ! isHotspot )
			return true; // not hot spot, so default behaviour.
		
		if(areQuestionSlideOptionsDisabled)
			return true; // if answer options are to be disabled on any question slide, smart button actions can be handled.
				
		if ( ! obj.rp )
			return false; // not rest of project, on hot spot, so no handling.
			
		if ( ! obj.rpa )
			return false; // not above, so no handling.
			
		// This autoshape is rest of project and above, but starts at this slide.
		var objfrom = obj.from;
		if ( obj.from > sFrom )
			return false; // Starts on this slide.
			
		return true; // handle
	}
	
	if ( cp.isClickTimerRunning() )
		return false;
		
	var lScaledPosition = getScaledPosition(e.pageX, e.pageY);
	var x = lScaledPosition.X;
	var y = lScaledPosition.Y;
	//x -= cp.movie.offset;
	//y -= cp.movie.topOffset;
	var clickItem = null;
	var currDiv = e.currentTarget;
	var children = currDiv.childNodes;
	var shouldShowFailure = false;
	var clickItemId = '';
	var firstFailureClickItem = null;
	var firstFailureClickItemId = '';
	var maxAttempts = -1;
	var currentAttempt = 0;
	var failureMaxAttempts = -1;
	var failureCurrentAttempt = 0;
	var failureElemDivData = null;
	
	for(var i=children.length - 1; i >= 0; --i)
	{
		var currElement = children[i];
		if(currElement.nodeName != 'DIV')
			continue;
		if(currElement.style.display != 'block')
			continue;
		currElementDivData = cp.model.data[currElement.id];
		
		var canvasItem = currElementDivData['mdi'];
		if(!cp.model.data[canvasItem].visible)
			continue;
		
		if(!currElementDivData['pa'])
			continue;
		if(undefined != currElementDivData['val'])
			continue;
		
		var drawingItemForCurrElement = currElementDivData['mdi'];
		drawingItemDivData = cp.model.data[drawingItemForCurrElement];
		
		currentAttempt = 0;
		maxAttempts = -1;
		var cAttempt = currElementDivData ['currentAttempt'];
		if (cAttempt != undefined)
			currentAttempt = cAttempt;
		maxAttempts = currElementDivData ['ma'];
		clickItem = currElementDivData;
		clickItemId = currElement.id;
		
		if (undefined != clickItem.amc && ! clickItem.amc) {
			if ( cp.device != cp.IDEVICE ) // For idevice we don't honour this.
				continue; // No mouse click allowed.
		}
			
		var projectData = cp.model.data['project'];
		
		var minX = parseFloat(currElement.style.left);
		var minY = parseFloat(currElement.style.top);
		var maxX = parseFloat(currElement.style.left) + parseFloat(currElement.style.width);
		var maxY = parseFloat(currElement.style.top) + parseFloat(currElement.style.height);
		if ( currElement.effectX ) {
			minX += currElement.effectX;
			maxX += currElement.effectX;
		}
		if ( currElement.effectY ) {
			minY += currElement.effectY;
			maxY += currElement.effectY;
		}
		var rot = 0;
		if(currElement.rotateAngle)
			rot = currElement.rotateAngle;
		var IsPointWithin = function()
		{
			var tempX = x;
			var tempY = y;
			tempX -= (minX + maxX)/2;
			tempY -= (minY + maxY)/2;
			var newX = tempX*Math.cos((Math.PI*(-rot))/180) - tempY*Math.sin((Math.PI*(-rot))/180);
			var newY = tempX*Math.sin((Math.PI*(-rot))/180) + tempY*Math.cos((Math.PI*(-rot))/180);
			newX += (minX + maxX)/2;
			newY += (minY + maxY)/2;
			if((newX >= minX && newX <= maxX) && (newY >= minY && newY <= maxY))
				return true;
			return false;
		};
		if(IsPointWithin())
		{
			if(currElementDivData['iqb'])
				return true; // Question buttons - have been handled separately.
			if(currElementDivData['vid'])
				return true; // TEB button - has already been handled.
			if(currElementDivData['enabled'])
			{
				if ( clickItem.actionInProgress )
					return false;
				if ( clickItem.dclk || clickItem.rclk ) {
					// Can only be wrong.
					createClickTimer( currElement, clickItem, currentAttempt ); 
					return false;
				}
				if ( ! ShouldHandle( clickItem ) ) 
					return false;

				var clickHandlerFunctionName = currElementDivData['chfn'];
				SubmitInteractions(currElement.id, true, currentAttempt);
				var oldSlide = cp.movie.stage.currentSlide;
				clickHandlerFunctionName(currElement);	// can cause slide jump.
				var newSlide = cp.movie.stage.currentSlide;
				if ( oldSlide == newSlide && IsNonQuestionInteractiveObject( clickItem ) )
					clickItem.handled = true; 
				return true;
			}
			shouldShowFailure = false;
			break;
		}
		else if ( currElementDivData['vid'] ) // TEB button. No handling needed.
			continue;
		else {
			shouldShowFailure = true;
			if ( null == firstFailureClickItem ) {
				// Now check whether this really has failure action. For failure action:
				// a) failure caption should be there OR
				// b) attempts should not be infinite.
				if ( clickItem.ofc || clickItem.ma != -1 ) {
					firstFailureClickItemId = clickItemId;
					firstFailureClickItem = clickItem;
					failureCurrentAttempt = currentAttempt;
					failureMaxAttempts = maxAttempts;
					failureElemDivData = currElementDivData;
				}
			}
		}
	}
	
	if ( shouldShowFailure ) {
		if ( firstFailureClickItem ) {
			clickItem = firstFailureClickItem;
			clickItemId = firstFailureClickItemId;
			currentAttempt = failureCurrentAttempt;
			maxAttempts = failureMaxAttempts;
			currElementDivData = failureElemDivData;
		}
		if ( clickItem && clickItem.actionInProgress )
			return false;
		if(clickItem)
		{
			currentAttempt = currentAttempt + 1;
			clickItem .currentAttempt = currentAttempt;
			
			var lItemId;
			var lItemCanvas;
			if(clickItem.mdi)
				lItemCanvas = cp.model.data[clickItem.mdi];
			if(lItemCanvas)
				lItemId = lItemCanvas.dn;			
			SubmitInteractions(lItemId, false, currentAttempt - 1);
		}
		
		var canvasItem = currElementDivData['mdi'];
		var isVisible = (cp.model.data[canvasItem].visible);	
		
		var shouldExecuteAction = (maxAttempts != -1 && currentAttempt >= maxAttempts) && (isVisible);		
		var itemForHandling = '';
		if ( clickItem && IsNonQuestionInteractiveObject( clickItem ) )
			itemForHandling = clickItemId;
		showHideFeedbackCaptionsClickHandler(children[0],shouldExecuteAction, itemForHandling);
		if (clickItem && IsNonQuestionInteractiveObject( clickItem ) && ! clickItem.handled ) 
			clickItem.handled = shouldExecuteAction;		
	}
	return false;
}

function handleClick(e)
{
	var handled = handleClickExternal(e);
	if(!handled)
	{
		var currDiv = e.currentTarget; 
		var children = currDiv.childNodes; 
		var currElement = children[0]; 
		if(!currElement)
			return;
		if(currElement.nodeName != 'DIV') 
				return; 
		if(currElement.style.display != 'block') 
				return; 
		
		var lQuestionObjName = getQuestionObjectName(currElement.id);		
		var lQuestionObjData = cp.model.data[lQuestionObjName];
		if(lQuestionObjData)
		{	
			if(lQuestionObjData['qtp'] == 'Hotspot')
				hotspotQuestionSlideHandler(e);
		}
	}	
}
function showInfoDialog()
{
	var lPausedByInfo = false;
	if(!cp.movie.paused)
	{
		cp.movie.pause(cp.ReasonForPause.PLAYBAR_ACTION);
		lPausedByInfo = true;
	}
	var infoBGImage = cp.movie.im.m_projectImages["assets/playbar/PlaybarIcons/infobg.png"];	
	var lInfoDialog = document.createElement("div");
	cp.project.appendChild(lInfoDialog);
	lInfoDialog.id = "infoDialog";	
	lInfoDialog.style.position = "absolute";
	lInfoDialog.style.backgroundImage = "url(" + infoBGImage.src + ")";	
	lInfoDialog.style.left = (cp.model.data.project.w - infoBGImage.nativeImage.width)/2 + "px";
	lInfoDialog.style.top = (cp.model.data.project.h - infoBGImage.nativeImage.height)/2 + "px";	
	lInfoDialog.style.width = infoBGImage.nativeImage.width + "px";
	lInfoDialog.style.height = infoBGImage.nativeImage.height + "px";	
	
	var lInfoCloseButton = document.createElement("div");
	lInfoCloseButton.onclick = function(e){cp.project.removeChild(lInfoDialog);if(lPausedByInfo)cp.movie.play();};
	lInfoCloseButton.style.cursor = "pointer";
	lInfoCloseButton.style.backgroundColor = "#ffffff";
	lInfoCloseButton.style.opacity = 0;	
	lInfoCloseButton.style.left = "170px";
	lInfoCloseButton.style.top = "5px";
	lInfoCloseButton.style.width = "15px";
	lInfoCloseButton.style.height = "15px";
	lInfoCloseButton.style.position = "absolute";
	lInfoCloseButton.style.display = "block";
	lInfoDialog.appendChild(lInfoCloseButton);
	
	var lInformationDiv = document.createElement("div");
	var lInfoStr = "<ul style='padding-left:15px;padding-right:15px;padding-top:20px;list-style-type: none;'>";
	lInfoStr += "<li style='overflow:hidden'>" + cpInfoAuthor + "</li>";
	lInfoStr += "<li style='overflow:hidden'>" + cpInfoCompany + "</li>";
	lInfoStr += "<li style='overflow:hidden;cursor:pointer;' onclick='cp.sendEmail(\"" + cpInfoEmail + "\")'>" + cpInfoEmail + "</li>";
	
	var lCpInfoWebsite = "http://";
	
	if(cpInfoWebsite.indexOf("://") == -1)
		lCpInfoWebsite += cpInfoWebsite;
	else
		lCpInfoWebsite = cpInfoWebsite;
		
	lInfoStr += "<li style='overflow:hidden;cursor:pointer;' onclick='cp.openURL(\"" + lCpInfoWebsite + "\")'>" + cpInfoWebsite + "</li>";
	lInfoStr += "<li style='overflow:hidden'>" + cpInfoCopyright + "</li>";
	lInfoStr += "</ul>";
	
	lInformationDiv.innerHTML = lInfoStr;
	lInfoDialog.appendChild(lInformationDiv);
	
	var lInfoCPLinkButton = document.createElement("div");
	lInfoCPLinkButton.onclick = function(e){cp.openURL("http://www.adobe.com/products/captivate");};
	lInfoCPLinkButton.style.cursor = "pointer";
	lInfoCPLinkButton.style.backgroundColor = "#ffffff";	
	lInfoCPLinkButton.style.opacity = 0;	
	lInfoCPLinkButton.style.left = "10px";
	lInfoCPLinkButton.style.bottom = "10px";
	lInfoCPLinkButton.style.width = "170px";
	lInfoCPLinkButton.style.height = "25px";
	lInfoCPLinkButton.style.position = "absolute";
	lInfoCPLinkButton.style.display = "block";
	lInfoDialog.appendChild(lInfoCPLinkButton);
}
function toggleMute()
{
	if(cp.movie.am.muted)
	{
		cp.movie.am.mute(false);
	}
	else
	{
		cp.movie.am.mute(true);
	}
}
function playbarMoved()
{
	cpCmndPlaybarMoved=1;
}
function showHideElements()
{
	cp('blockUserInteraction').style.display = 'none';
	cp.autoplayDiv.style.display = 'none';
	cp.autoplayDiv.style.visibility = 'hidden';
	
	document.getElementById('playbar').style.display = 'block';
	var snapShotElem = document.getElementById('firstSlideSnapshot');
	if ( snapShotElem )
		snapShotElem.style.display = 'none';
}

function beginMovie()
{
	showHideElements();
	cpInfoCurrentFrame = getStartFrameOfMovie();
	cp.movie.play();
}

function loadMediaAndBeginMovie()
{
	cp.movie.vdm.load();
	cp.movie.am.load(beginMovie);//media loading done as part of user-click event so that media plays on iDevices
}

function playMovie() 
{
	cp.movie.play();
}
function pauseMovie()
{
	cp.movie.pause();
}

function mouse_click_draw(ctx, data, objectToBeHidden, visible, divName)
{
	var drawColor = "#000000";
	var r = 3;
	if (undefined != data.c) {
		drawColor = data.c;
		r = data.r;
	}

	ctx.save();

	ctx.fillStyle = drawColor;
	ctx.beginPath();
	ctx.arc( r, r, r, 0, Math.PI*2, true );
	ctx.closePath();
	ctx.fill();
	
	ctx.restore();
	ctx = null;	
	return true;
}
 
function mcd(ctx, data, objectToBeHidden, visible, divName){return mouse_click_draw(ctx, data, objectToBeHidden, visible, divName);}
 
function frameset_mc_draw (ctx,imagePath,objectToBeHidden,visible,divName,lHasShadowOrReflection,lHasTransform)
{
	if(imagePath == '')
	{
		return true;
	}
	
	var drawn = false;
	ctx.save();
	var divData = cp.model.data[divName];
	if(divData.shouldShowDisabledState)
	{
		ctx.globalAlpha=0.5;
	}
	var img = cp.movie.im.images[imagePath];
	if(img)
	{
		if(img.nativeImage.complete)
		{
			if(cp.verbose)
				cp.log('drawing completed img ' + imagePath);
			if(ctx.centreImage && (lHasShadowOrReflection || lHasTransform))
			{
				ctx.clearRect(-ctx.width,-ctx.height,2*ctx.width,2*ctx.height);
				ctx.drawImage(img.nativeImage,-img.nativeImage.width/2+ctx.tex,-img.nativeImage.height/2+ctx.tey,img.nativeImage.width,img.nativeImage.height);
			}
			else
			{
				ctx.drawImage(img.nativeImage, 0, 0);
			}
			drawn = true;
			if(objectToBeHidden)
			{
				if(cp.verbose)
					cp.log('hiding1 ' + imagePath);
				cp.hide(objectToBeHidden);
			}
			else if(!visible)
			{
				if(cp.verbose)
					cp.log('hiding2 ' + imagePath);
				cp.hide(divName);
			}
			ctx = null;	
		}
		else
		{
			if(cp.exceptionalLogs)
				console.log('**** drawing failed. img incomplete ' + imagePath);
		}
	}
	else
	{
		if(imagePath)
		{
			if(cp.exceptionalLogs)
				console.log('***** drawing failed. img not found ' + imagePath);
		}
	}
	return drawn;
}

function fd(a,b,c,d,e,f,g){return frameset_mc_draw(a,b,c,d,e,f,g);}
function setMovieLeftTopRightBottom(leftOffset,topOffset,rightOffset,bottomOffset)
{
	var pc = getProjectContainer();
	pc.style.width = parseFloat(pc.style.width) + leftOffset + rightOffset + 'px';
	pc.style.height = parseFloat(pc.style.height) + topOffset + bottomOffset + 'px';
	var lContainerLeft = (getInnerWidth() - parseFloat(pc.style.width))/2;
	lContainerLeft = (lContainerLeft > 0 ? lContainerLeft : 0 );
	pc.style.left = lContainerLeft + 'px';
	
	//var playImage = cp.playImage;
	//playImage.style.top = parseFloat(playImage.style.top) + topOffset;
	//playImage.style.left = parseFloat(playImage.style.left) + leftOffset;

	var p = getProject();
	cp.movie.topOffset += topOffset;
	p.style.top = cp.movie.topOffset + "px";
	p.style.left = parseFloat(p.style.left) + leftOffset + "px";
	cp.movie.offset = lContainerLeft +  parseFloat(p.style.left);
	
	tocInit(cp.model.data,leftOffset,topOffset,rightOffset,bottomOffset);	
}
function setCCPosition(playbarHeight)
{
	cp.movie.cc.style.top =  (cp.movie.topOffset + (cp.model.data.project.h - parseFloat(cp.movie.cc.style.height)) - playbarHeight) + 'px';
}
function ConvertRGBToRGBA(str,opacity)
{
	var sopacity = opacity + '';
	var s = str.replace(')', ' ,' + sopacity + ')');
	return s.replace('rgb','rgba');
}
function ConvertColorToRGBA(str,opacity)
{
	var retVal = 'rgba(' + parseInt(str.substr(1,2),16) + ' ,' + parseInt(str.substr(3,2),16) + ' ,' + parseInt(str.substr(5,2),16) + ' ,' + opacity + ')';
	return retVal;
}
function getAngleFromRotateStr(rotStr)
{
	var rotate1 = rotStr.replace('rotate(','');
	return parseFloat(rotate1.replace('deg)',''));
}
function applyTransform(element,matrixStr)
{
	element.style['transform']  = matrixStr;
	element.style['msTransform'] = matrixStr;
	element.style['MozTransform'] =  matrixStr;
	element.style['WebkitTransform']  = matrixStr;
	element.style['OTransform'] = matrixStr;
};
function applyShadow(element,shadowStr)
{
	element.style['mozBoxShadow']  = shadowStr;
	element.style['webkitBoxShadow'] =  shadowStr;
	element.style['boxShadow'] = shadowStr;
};
function setFillStrokeStyle(fillObj, canvasElem, stroke)
{
	var srccontext = canvasElem.getContext('2d');
	if(fillObj.gf)
	{
		var gradObj;
		if(fillObj.gf.t == 0)
		{	
			switch(fillObj.gf.di)
			{
				case 0:
					gradObj = srccontext.createLinearGradient(0, canvasElem.height/2, canvasElem.width, canvasElem.height/2);
					break;
				case 1:
					gradObj = srccontext.createLinearGradient(canvasElem.width, canvasElem.height/2, 0, canvasElem.height/2);
					break;
				case 2:
					gradObj = srccontext.createLinearGradient(0, 0, canvasElem.width, canvasElem.height);
					break;
				case 3:
					gradObj = srccontext.createLinearGradient(canvasElem.width, canvasElem.height, 0, 0);
					break;
				case 5:
					gradObj = srccontext.createLinearGradient(canvasElem.width/2, canvasElem.height, canvasElem.width/2, 0);
					break;
				case 6:
					gradObj = srccontext.createLinearGradient(0, canvasElem.height, canvasElem.width, canvasElem.height);
					break;
				case 7:
					gradObj = srccontext.createLinearGradient(canvasElem.width, canvasElem.height, 0, canvasElem.height);
					break;
				default:
				case 4:
					gradObj = srccontext.createLinearGradient(canvasElem.width/2, 0, canvasElem.width/2, canvasElem.height);
					break;
			}
		}
		else
		{
			var dist = 0;
			switch(fillObj.gf.di)
			{
				case 0:
					gradObj = srccontext.createRadialGradient(canvasElem.width/2, canvasElem.height/2, 0, canvasElem.width, canvasElem.height/2,canvasElem.width/2);
					break;
				case 2:
					dist = canvasElem.width < canvasElem.height ? canvasElem.width : canvasElem.height;
					gradObj = srccontext.createRadialGradient(0, 0, 0, dist, 0,dist);
					break;
				case 3:
					gradObj = srccontext.createRadialGradient(canvasElem.width/2, 0, 0, canvasElem.width/2, canvasElem.height,canvasElem.height);
					break;
				case 4:
					dist = canvasElem.width < canvasElem.height ? canvasElem.width : canvasElem.height;
					gradObj = srccontext.createRadialGradient(canvasElem.width, 0, 0, canvasElem.width, dist,dist);
					break;
				case 5:
					gradObj = srccontext.createRadialGradient(canvasElem.width, canvasElem.height/2, 0, 0, canvasElem.height/2,canvasElem.width);
					break;
				case 6:
					dist = canvasElem.width < canvasElem.height ? canvasElem.width : canvasElem.height;
					gradObj = srccontext.createRadialGradient(canvasElem.width, canvasElem.height, 0, canvasElem.width-dist, canvasElem.height-dist,dist);
					break;
				case 7:
					gradObj = srccontext.createRadialGradient(canvasElem.width/2, canvasElem.height, 0, canvasElem.width/2, 0,canvasElem.height);
					break;
				case 8:
					dist = canvasElem.width < canvasElem.height ? canvasElem.width : canvasElem.height;
					gradObj = srccontext.createRadialGradient(0, canvasElem.height, 0, dist, canvasElem.height,dist);
					break;
				case 9:
					gradObj = srccontext.createRadialGradient(0, canvasElem.height/2, 0, canvasElem.width, canvasElem.height/2,canvasElem.width);
					break;
				default:
				case 4:
					gradObj = srccontext.createRadialGradient(canvasElem.width/2, canvasElem.height/2, 0, canvasElem.width, canvasElem.height,Math.sqrt(canvasElem.width*canvasElem.width + canvasElem.height*canvasElem.height));
					break;
			}
		}
		for(var i=0;i < fillObj.gf.cs.length ; ++i)
		{
			var colorStop = fillObj.gf.cs[i];
			var colorStr = getRGBA(colorStop.c,colorStop.o);
			gradObj.addColorStop(colorStop.p/100,colorStr);
		}
		if(stroke)
			srccontext.strokeStyle = gradObj;
		else
			srccontext.fillStyle = gradObj;
	}
	else
	{
		if(stroke)
			srccontext.strokeStyle = fillObj.bc;
		else
			srccontext.fillStyle = fillObj.bc;
	}
	srccontext.globalAlpha = fillObj.alpha/100;
}

function loadjscssfile(filename, filetype,onloadfunc)
{
	var fileref;
	if (filetype=="js"){ //if filename is a external JavaScript file
	fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", filename);
	fileref.onload = onloadfunc;
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		  fileref=document.createElement("link");
		  fileref.setAttribute("rel", "stylesheet");
		  fileref.setAttribute("type", "text/css");
		  fileref.setAttribute("href", filename);
		  var loadfunc = onloadfunc;
		  fileref.onload = loadfunc;
		  var cssnum = document.styleSheets.length;
			  var ti = setInterval(function() {
				if (document.styleSheets.length > cssnum) {
				  clearInterval(ti);
				  loadfunc();
				}
			  }, 50);
	}
	if(fileref!= undefined)
		document.getElementsByTagName("head")[0].appendChild(fileref);
	return fileref;
};

function CPPlayButtonHandle(event)
{
    var code;
        
    //find the keycode
    if (event.keyCode) 
        code = event.keyCode;
	else if (event.which) 
        code = event.which;	   
        
    //handle the space bar and enter key        
    if ((code == 13) || (code == 32))
    {
        cp.movie.play();
    }
}

function ccInit(ccProperties)
{
	var ccDiv = document.getElementById('cc');
	ccDiv.style.width = ccProperties.w + 'px';
	ccDiv.style.height = ccProperties.h + 'px';
	var ccBkDiv = ccDiv.firstElementChild;
	ccBkDiv.style.backgroundColor = ConvertColorToRGBA(ccProperties.c,ccProperties.o/100);
	ccBkDiv.style.fontFamily = ccProperties.f;
	ccBkDiv.style.fontSize = ccProperties.fs + 'px';
	ccBkDiv.style.color = ccProperties.tc;	
	cp.movie.ccText = ccBkDiv.firstElementChild;
	cp.movie.ccLines = ccProperties.lc;
	var p = getProject();
	ccDiv.style.left = p.style.left;
	ccDiv.style.top =  (cp.model.data.project.h - parseFloat(ccDiv.style.height)) + 'px';
}

function CPPreInit()
{
	function CPInitDebugControls()
	{
		if(cp.dynamicLogControl)
		{
			if(cp.consolidateLogs)
				cp.logArray = new Array();
				
			var logButton = document.createElement('div');
			logButton.style.cssText = "position:absolute;left:0px; top:0px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/hotspot_correct_answer_normal.png);opacity:"+(cp.consolidateLogs?1:0.5);
			logButton.onclick = function(){
				if(!cp.logArray)
					cp.logArray = new Array();
					
				if(cp.consolidateLogs)
				{
					for(var i = 0; i < cp.logArray.length; ++i)
						console.log(cp.logArray[i]);
					cp.logArray.length = 0;
				}
				
				cp.consolidateLogs = !cp.consolidateLogs;
				logButton.style.opacity = cp.consolidateLogs?1:0.5;
			}
			logButton.innerHTML = "<font color='#000000' style='font-size:10px'>consolidateLogs</font>";
			document.body.appendChild(logButton);

			var imageLogButton = document.createElement('div');
			imageLogButton.style.cssText = "position:absolute;left:0px; top:30px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/hotspot_correct_answer_normal.png);opacity:"+(cp.movie.im.verbose?1:0.5);
			imageLogButton.onclick = function(){
				cp.movie.im.verbose = !cp.movie.im.verbose;
				imageLogButton.style.opacity = cp.movie.im.verbose?1:0.5;
			}
			imageLogButton.innerHTML = "<font color='#000000' style='font-size:10px'>imageLogs</font>";
			document.body.appendChild(imageLogButton);
			
			var audioLogButton = document.createElement('div');
			audioLogButton.style.cssText = "position:absolute;left:0px; top:60px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/hotspot_correct_answer_normal.png);opacity:"+(cp.movie.am.verbose?1:0.5);
			audioLogButton.onclick = function(){
				cp.movie.am.verbose = !cp.movie.am.verbose;
				audioLogButton.style.opacity = cp.movie.am.verbose?1:0.5;
			}
			audioLogButton.innerHTML = "<font color='#000000' style='font-size:10px'>audioLogs</font>";
			document.body.appendChild(audioLogButton);
			
			var audioViewButton = document.createElement('div');
			audioViewButton.style.cssText = "position:absolute;left:60px; top:60px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/arrow_right.gif);opacity:"+(cp.movie.am.viewAudio?1:0.5);
			audioViewButton.onclick = function(){
				cp.movie.am.viewAudio = !cp.movie.am.viewAudio;
				audioViewButton.style.opacity = cp.movie.am.viewAudio?1:0.5;
				
				if(cp.movie.am.viewAudio)
				{
					cp.movie.am.audioViews = new Array();

					for(var i = 0; i < cp.movie.am.MAX_AUDIO_CHANNELS; ++i)
					{
						var a = cp.movie.am.audioChannels[i];
						cp.movie.am.audioViews[i] = new cp.AudioView(a);
					}
				}
				else
				{
					for(var i in cp.movie.am.audioViews)
					{
						var a = cp.movie.am.audioViews[i];
						document.body.removeChild(a.view);
						--cp.MediaView.NUM_MEDIA_VIEWS;
					}
					delete cp.movie.am.audioViews;
				}
			}
			audioViewButton.innerHTML = "<font color='#000000' style='font-size:10px'>view</font>";
			document.body.appendChild(audioViewButton);
			
			var videoLogButton = document.createElement('div');
			videoLogButton.style.cssText = "position:absolute;left:0px; top:90px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/hotspot_correct_answer_normal.png);opacity:"+(cp.movie.vdm.verbose?1:0.5);
			videoLogButton.onclick = function(){
				cp.movie.vdm.verbose = !cp.movie.vdm.verbose;
				videoLogButton.style.opacity = cp.movie.vdm.verbose?1:0.5;
			}
			videoLogButton.innerHTML = "<font color='#000000' style='font-size:10px'>videoLogs</font>";
			document.body.appendChild(videoLogButton);
			
			var videoViewButton = document.createElement('div');
			videoViewButton.style.cssText = "position:absolute;left:60px; top:90px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/arrow_right.gif);opacity:"+(cp.movie.vdm.viewVideo?1:0.5);
			videoViewButton.onclick = function(){
				cp.movie.vdm.viewVideo = !cp.movie.vdm.viewVideo;
				videoViewButton.style.opacity = cp.movie.vdm.viewVideo?1:0.5;
				
				if(cp.movie.vdm.viewVideo)
				{
					cp.movie.vdm.videoViews = new Array();
					if(cp.device == cp.IDEVICE)
					{
						if(cp.movie.vdm.slideVideoChannel)
							cp.movie.vdm.videoViews.push(new cp.VideoView(cp.movie.vdm.slideVideoChannel));
						if(cp.movie.vdm.tocVideoChannel)
							cp.movie.vdm.videoViews.push(new cp.VideoView(cp.movie.vdm.tocVideoChannel));
					}
					else
					{
						if(cp.movie.vdm.slideVideoChannel0)
							cp.movie.vdm.videoViews.push(new cp.VideoView(cp.movie.vdm.slideVideoChannel0));
						if(cp.movie.vdm.slideVideoChannel1)
							cp.movie.vdm.videoViews.push(new cp.VideoView(cp.movie.vdm.slideVideoChannel1));
						if(cp.movie.vdm.tocVideoChannel0)
							cp.movie.vdm.videoViews.push(new cp.VideoView(cp.movie.vdm.tocVideoChannel0));
						if(cp.movie.vdm.tocVideoChannel1)
							cp.movie.vdm.videoViews.push(new cp.VideoView(cp.movie.vdm.tocVideoChannel1));
					}
					for(var i = 0; i < cp.movie.vdm.MAX_VIDEO_CHANNELS; ++i)
					{
						var v = cp.movie.vdm.videoChannels[i];
						cp.movie.vdm.videoViews.push(new cp.VideoView(v));
					}
				}
				else
				{
					for(var i in cp.movie.vdm.videoViews)
					{
						var v = cp.movie.vdm.videoViews[i];
						document.body.removeChild(v.view);
						--cp.MediaView.NUM_MEDIA_VIEWS;
					}
					delete cp.movie.vdm.videoViews;
				}
			}
			videoViewButton.innerHTML = "<font color='#000000' style='font-size:10px'>view</font>";
			document.body.appendChild(videoViewButton);
			
			var xcpnLogButton = document.createElement('div');
			xcpnLogButton.style.cssText = "position:absolute;left:0px; top:120px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/hotspot_incorrect_answer_normal.png);opacity:"+(cp.exceptionalLogs?1:0.5);
			xcpnLogButton.onclick = function(){
				cp.exceptionalLogs = !cp.exceptionalLogs;
				xcpnLogButton.style.opacity = cp.exceptionalLogs?1:0.5;
			}
			xcpnLogButton.innerHTML = "<font color='#000000' style='font-size:10px'>ErrorExcpn</font>";
			document.body.appendChild(xcpnLogButton);
			
			var verboseLogButton = document.createElement('div');
			verboseLogButton.style.cssText = "position:absolute;left:0px; top:150px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/hotspot_correct_answer_normal.png);opacity:"+(cp.verbose?1:0.5);
			verboseLogButton.onclick = function(){
				cp.verbose = !cp.verbose;
				verboseLogButton.style.opacity = cp.verbose?1:0.5;
			}
			verboseLogButton.innerHTML = "<font color='#000000' style='font-size:10px'>verbose</font>";
			document.body.appendChild(verboseLogButton);
			
			var disablePaceMakerButton = document.createElement('div');
			disablePaceMakerButton.style.cssText = "position:absolute;left:0px; top:180px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/hotspot_correct_answer_normal.png);opacity:"+(cp.disablePaceMaker?0.5:1);
			disablePaceMakerButton.onclick = function(){
				cp.disablePaceMaker = !cp.disablePaceMaker;
				disablePaceMakerButton.style.opacity = cp.disablePaceMaker?0.5:1;
			}
			disablePaceMakerButton.innerHTML = "<font color='#000000' style='font-size:10px'>PaceMaker</font>";
			document.body.appendChild(disablePaceMakerButton);
			
			var seekLogButton = document.createElement('div');
			seekLogButton.style.cssText = "position:absolute;left:0px; top:210px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/hotspot_correct_answer_normal.png);opacity:"+(cp.movie.ms.verbose?1:0.5);
			seekLogButton.onclick = function(){
				cp.movie.ms.verbose = !cp.movie.ms.verbose;
				seekLogButton.style.opacity = cp.movie.ms.verbose?1:0.5;
			}
			seekLogButton.innerHTML = "<font color='#000000' style='font-size:10px'>seekLogs</font>";
			document.body.appendChild(seekLogButton);
			
			if(cp.device != cp.IDEVICE)
			{
				var emulateIPadButton = document.createElement('div');
				emulateIPadButton.style.cssText = "position:absolute;left:0px; top:240px; width:20px; height:20px;display:block;background-image:url(assets/htmlimages/hotspot_correct_answer_normal.png);opacity:"+((cp.device == cp.IDEVICE)?0.5:1);
				emulateIPadButton.onclick = function(){
					if(cp.origDevice)
					{
						cp.device = cp.origDevice;
						delete cp.origDevice;
					}
					else
					{
						cp.origDevice = cp.device;
						cp.device = cp.IDEVICE;
					}
					emulateIPadButton.style.opacity = ((cp.device == cp.IDEVICE)?0.5:1);
				}
				emulateIPadButton.innerHTML = "<font color='#000000' style='font-size:10px'>emulateiDevice</font>";
				document.body.appendChild(emulateIPadButton);
			}
		}
	}
	function establishSlideVideosContinuity()
	{
		var slideVideos = cp.model.data.project_main.slideVideos;
		if ( ! slideVideos )
			return;
			
		var i = 0;
		var j = 1;
		for(;j < slideVideos.length; ++i, ++j)
		{
			var v1ID = slideVideos[i];
			var v2ID = slideVideos[j];
			var v1 = cp.model.data[v1ID];
			var v2 = cp.model.data[v2ID];
			if(v1.to + 1 == v2.from)//continuous in timeline
			{
				var v1c = cp.model.data[v1.mdi];
				var v2c = cp.model.data[v2.mdi];
				if(Math.abs(v1c.vst - v2c.vsf) <= 0.1)//continuous in seek time
				{
					if(v1c.mp4 == v2c.mp4)//seeking from same source
					{
						v1c.continueToNextSlide = 1;
						v2c.continueFromPrevSlide = 1;
					}
				}
			}
		}
	}
	
	function connectSlideAudiosToSlides()
	{
		var slideAudioNames = (cp.model.data.project_main.slideAudios || "").split(',');
		var slideNames = (cp.model.data.project_main.slides || "").split(',');
		var jMax = slideAudioNames.length;
		var iMax = slideNames.length;
		var j = 0;
		for(var i = 0; i < iMax && j < jMax; ++i)
		{
			var slide = cp.model.data[slideNames[i]]
			if(!slide)
				break;

			var slideAudio = cp.model.data[slideAudioNames[j]];
			if(!slideAudio)
				break;

			if(slideAudio.from <= slide.to || slideAudio.to >= slide.from)
			{
				slide.audioName = slideAudioNames[j];
			}
			
			if(slide.to >= slideAudio.to)
				++j;
		}
	}
	
	function connectSlideVideosToSlides()
	{
		var slideNames = (cp.model.data.project_main.slides || "").split(',');
		var iMax = slideNames.length;
		for(var i = 0; i < iMax; ++i)
		{
			var slide = cp.model.data[slideNames[i]]
			if(!slide)
				break;

			var videos = '';
			for(var j in slide.si)
			{
				var item = slide.si[j];
				if(cp.kCPOTFLVItem == item.t || cp.kCPOTVideo == item.t || cp.kCPFullMotion == item.t || cp.kCPOTVideoResource == item.t)
				{
					if(!slide.videos)
						slide.videos = [];
					slide.videos.push(item.n);
				}
			}
		}
	}
	
	establishSlideVideosContinuity();
	connectSlideAudiosToSlides();
	connectSlideVideosToSlides();
	
	cp.offsetInnerWidth = 0;
	getInnerWidth();
	var pc = getProjectContainer();
	pc.style.width = cp.model.data.project.w + (cp.model.data.project.hasTOC  &&  !cp.model.data.tocProperties.overlay ? cp.model.data.tocProperties.width : 0) + 'px';
	pc.style.height = cp.model.data.project.h + 'px';
	var lContainerLeft = (cp.offsetInnerWidth - parseFloat(pc.style.width))/2;
	pc.style.left = ( lContainerLeft > 0 ? lContainerLeft : 0 ) + 'px';
	if(!cp.playImage)
		cp.playImage	= cp('playImage');
	
	if(!cp.autoplayImage)
		cp.autoplayImage = cp('autoplayImage');
	
	if(!cp.autoplayDiv)
		cp.autoplayDiv = cp('autoplayDiv');
	
	if(!cp.passwordDiv)
		cp.passwordDiv = cp('passwordDiv');		
	
	if(!cp.expiryDiv)
		cp.expiryDiv = cp('expDiv');
	
	if(!cp.preloaderImage)
		cp.preloaderImage = cp('preloaderImage');
		
	if(cp.movie == undefined)
	{
		cp.movie = new cp.Movie(cp('project'));
		cp.eventManager = new cp.EventManager();
		cp.variablesManager = new cp.VariablesManager();
		cp.movie.audioManager = new cp.AudioManager();
		cp.movie.videoManager = new cp.VideoManager();
		cp.movie.mediaSeeker = new cp.MediaSeeker();
		
		if(cp.IDEVICE != cp.device)
		{
			cp.movie.vdm.load();
			cp.movie.am.load();
			
			var slideName = cp.movie.stage.getSlideNameForIndex(0);
			if(slideName != '')
			{
				cp.movie.am.preload(slideName);
				cp.movie.vdm.preload(slideName);
			}
		}
		
		cp.movie.imageManager = new cp.ImageManager();
		cp.movie.prefetchManager = new cp.PrefetchManager();
		cp.movie.handleProjectOptions();		
		
		cp.movie.pm.preloadSlideAssets(0);
		cp.movie.topOffset = 0;
		
		var p = getProject();
		p.style.left = (cp.model.data.project.hasTOC  &&  !cp.model.data.tocProperties.overlay && (cp.model.data.tocProperties.position == 1) ? cp.model.data.tocProperties.width : 0) + "px";
	}

	var slideDiv = cp.movie.stage.getSlideDiv();;
	if (slideDiv) {
		slideDiv.ondblclick = cp.handleDblClick;
		slideDiv.oncontextmenu = cp.handleRightClick;
	}
	
	ccInit(cp.model.data.ccProperties);
	playBarInit(cp.model.data);
	cp.playImage.style.left = (cp.model.data.project.w - 58)/2 + 'px';
	cp.playImage.style.top = (cp.model.data.project.h - 59)/2 + 'px';
	
	cp.autoplayImage.style.left = (cp.model.data.project.w - cp.movie.autoplayimagew)/2 + 'px';
	cp.autoplayImage.style.top = (cp.model.data.project.h - cp.movie.autoplayimageh)/2 + 'px';
	
	CPInitDebugControls();
	
	SetScaleAndPosition();
	setTimeout("window.scrollTo(0,0);",500);
}


function CPPostInit()
{	
    cp.initObjectFactory();
	setPlaybarCallback(cp.movie);
	setTOCCallback(cp.movie,cp.em);
	cp.movie.startTimer();	
}
function getInnerWidth()
{
	if((!window.innerWidth) || (window.innerWidth == 0))
		cp.offsetInnerWidth = 640;
	else
		cp.offsetInnerWidth = window.innerWidth;
	return cp.offsetInnerWidth;
}
function getProjectContainer()
{
	if(!cp.projectContainer)
		cp.projectContainer	= cp('project_container');
	return cp.projectContainer;
}
function getProject()
{
	if(!cp.project)
		cp.project	= cp('project');
	return cp.project;
}
window.onorientationchange = window.onresize = function(event)
{
	if(!SetScaleAndPosition())
	{
		getInnerWidth();
		var pc = getProjectContainer();
		var p = getProject();
		var lContainerLeft = (cp.offsetInnerWidth - parseFloat(pc.style.width))/2;
		pc.style.left = ((lContainerLeft > 0) ? lContainerLeft : 0) + 'px';
		cp.movie.offset = ((lContainerLeft > 0) ? lContainerLeft : 0) +  parseFloat(p.style.left);
	}
	
	cp('blockUserInteraction').style.width = "100%";
	cp('blockUserInteraction').style.height = "100%";	
	
	window.scrollTo(0,0);
};

function getOffsetPosition(iValX,iValY)
{
	var lRetVal = new Object();
	
	lRetVal.X = iValX - cp.movie.offset;
	lRetVal.Y = iValY - cp.movie.topOffset;
		
	return lRetVal;
}

function getScaledPosition(iValX,iValY)
{
	var lRetVal = new Object();
	
	if(!cp.shouldScale)
	{
		var lOffsetPosition = getOffsetPosition(iValX,iValY);
		return lOffsetPosition;
	}	
	
	var lXPositionPercentageWRTNewW = (iValX - cp.movie.newPrjContainerL) / (cp.movie.newPrjContainerW);
	var lYPositionPercentageWRTNewH = (iValY - cp.movie.newPrjContainerT) / (cp.movie.newPrjContainerH);
	
	var lOrigXPosition = Math.round(cp.movie.oldPrjContainerW * lXPositionPercentageWRTNewW);
	var lOrigYPosition = Math.round(cp.movie.oldPrjContainerH * lYPositionPercentageWRTNewH);
	
	var lToc = document.getElementById('toc');
	var lTocWidth = 0;
	if((lToc.style.display != "none" && lToc.style.visibility != "hidden") && cp.model.data.project.hasTOC)
	{
		//consider the width of TOC only in following cases :
		//1. Not an overlay
		//2. Position = left
		lTocWidth = !cp.model.data.tocProperties.overlay ? (cp.model.data.tocProperties.position == 1 ? cp.model.data.tocProperties.width : 0) : 0;
	}
	
	var lPlaybar = document.getElementById('playbar');
	var lPlaybarHeight = 0;
	var lPlaybarWidth = 0;
	if((lPlaybar.style.display != "none" && lPlaybar.style.visibility != "hidden") && (cp.model.data.playBarProperties.hasPlayBar))
	{
		if(cp.model.data.playBarProperties.overlay)
		{
			lPlaybarHeight = 0;
			lPlaybarWidth = 0;
		}
		else
		{
			var lPlaybarBackground = document.getElementById('playbarBkGrnd');
			var lCurrPlaybarH = parseFloat(lPlaybarBackground.clientHeight);
			var lCurrPlaybarW = parseFloat(lPlaybarBackground.clientWidth);			
			//consider the playbar height only in case when it is left or top
			lPlaybarHeight = ((cp.model.data.playBarProperties.position == 1)) ? lCurrPlaybarH : 0;
			lPlaybarWidth = ((cp.model.data.playBarProperties.position == 4)) ? lCurrPlaybarW : 0;
		}
	}
	
	lRetVal.X = lOrigXPosition - lTocWidth - lPlaybarWidth;
	lRetVal.Y = lOrigYPosition - lPlaybarHeight;
		
	return lRetVal;
}

function SetScaleAndPosition()
{
	var lPrjContainer = document.getElementById('project_container');	
	var lScreenWidth = window.innerWidth;
	var lScreenHeight = window.innerHeight;
	
	var lPlaybar = document.getElementById('playbar');
	var lPlaybarHeight = 0;
	var lPlaybarWidth = 0;
	if(!(lPlaybar.style.display == "none" || lPlaybar.style.visibility == "hidden") && (cp.model.data.playBarProperties.hasPlayBar))
	{
		if(cp.model.data.playBarProperties.overlay)
		{
			lPlaybarHeight = 0;
			lPlaybarWidth = 0;
		}
		else
		{			
			var lPlaybarBackground = document.getElementById('playbarBkGrnd');
			var lCurrPlaybarH = parseFloat(lPlaybarBackground.clientHeight);
			var lCurrPlaybarW = parseFloat(lPlaybarBackground.clientWidth);	
			//position = 1 - Top, 2 - Right, 3 - Bottom, 4 - Left
			lPlaybarHeight = ((cp.model.data.playBarProperties.position == 1) || (cp.model.data.playBarProperties.position == 3)) ? lCurrPlaybarH : 0;
			lPlaybarWidth = ((cp.model.data.playBarProperties.position == 2) || (cp.model.data.playBarProperties.position == 4)) ? lCurrPlaybarW : 0;
		}
	}
	
	var lToc = document.getElementById('toc');
	var lTocWidth = 0;
	if(!(lToc.style.display == "none" || lToc.style.visibility == "hidden") && cp.model.data.project.hasTOC)
	{
		lTocWidth = !cp.model.data.tocProperties.overlay ? (cp.model.data.tocProperties.position == 1 ? cp.model.data.tocProperties.width : 0) : 0;
	}
	
	var lProjW = cp.model.data.project.w;
	var lProjH = cp.model.data.project.h;
	
	cp.movie.oldPrjContainerW = (lProjW + lTocWidth + 5);//considering shadow width
	cp.movie.oldPrjContainerH = (lProjH + lPlaybarHeight + 5);//considering shadow height
	
	var lWScalingFactor = ((cp.movie.oldPrjContainerW == undefined) || (cp.movie.oldPrjContainerW == 0)) ? 1 : (lScreenWidth/cp.movie.oldPrjContainerW);
	var lHScalingFactor = ((cp.movie.oldPrjContainerH == undefined) || (cp.movie.oldPrjContainerH == 0))?1:(lScreenHeight/cp.movie.oldPrjContainerH);
		
	cp.movie.m_scaleFactor = lWScalingFactor < lHScalingFactor ? lWScalingFactor : lHScalingFactor;	
	//cp.shouldScale = true;
	//if((cp.device == cp.DESKTOP) || (cp.movie.m_scaleFactor >= 1))
		cp.shouldScale = cp.model.data.project.shc;
	
	if(cp.verbose)
	{
		cp.log(cp.model.data.project.shc);
		cp.log(cp.movie.m_scaleFactor);
		cp.log(cp.shouldScale);
	}
	
	if(!cp.shouldScale)
		return false;
	
	cp.movie.newPrjContainerW = Math.round(cp.movie.m_scaleFactor * cp.movie.oldPrjContainerW);
	cp.movie.newPrjContainerH = Math.round(cp.movie.m_scaleFactor * cp.movie.oldPrjContainerH);
	
	cp.movie.oldPrjContainerL = parseFloat(lPrjContainer.style.left);
	cp.movie.oldPrjContainerT = parseFloat(lPrjContainer.style.top);
		
	lPrjContainer.style['webkitTransformOrigin'] = "left top";
	lPrjContainer.style['MozTransformOrigin'] = "left top";
	lPrjContainer.style['msTransformOrigin'] = "left top";
	
	cp.movie.newPrjContainerL = Math.round((lScreenWidth - cp.movie.newPrjContainerW)/2 > 0 ? (lScreenWidth - cp.movie.newPrjContainerW)/2 : 0);
	cp.movie.newPrjContainerT = Math.round((lScreenHeight - cp.movie.newPrjContainerH)/2 > 0 ? (lScreenHeight - cp.movie.newPrjContainerH)/2 : 0);
	
	lPrjContainer.style.left = cp.movie.newPrjContainerL + "px";
	lPrjContainer.style.top = cp.movie.newPrjContainerT + "px";
	
	cp.movie.offset = cp.movie.newPrjContainerL;
	cp.movie.topOffset = cp.movie.newPrjContainerT;
	
	lPrjContainer.style['webkitTransform'] = "scale(" + cp.movie.m_scaleFactor + ")";
	lPrjContainer.style['MozTransform'] = "scale(" + cp.movie.m_scaleFactor + ")";	
	lPrjContainer.style['msTransform'] = "scale(" + cp.movie.m_scaleFactor + ")";	
	
	document.body.style.overflow = "hidden";//this will hide the scrollbars which appear on resizing the window. Since we are rescaling, there is no need of scrollbars.
	lPrjContainer.style.position = "fixed";//everytime the content the rescaled it should appear in the center of the visible area. Hence position of the container will be changed to fixed.
	return true;
}

function trimStartingAndTrailingSpaces(strToTrim)
{	
	var tempTrimmedStr = "";
	tempTrimmedStr = strToTrim.replace(/^[\s|\t|\n]+/g,"");
	tempTrimmedStr = tempTrimmedStr.replace(/[\s|\t|\n]+$/g,"");
	return tempTrimmedStr;	
}