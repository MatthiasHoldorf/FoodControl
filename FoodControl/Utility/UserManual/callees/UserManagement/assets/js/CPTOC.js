// JavaScript Document
// masking support  - http://www.rekim.com/2011/02/11/html5-canvas-globalcompositeoperation-browser-handling/
window.toc = function(str)
{
	return document.getElementById(str);
};
toc.movieProperties = null;
toc.rootObj = null;
toc.mainMovie = null;
toc.tocAssetArr = [
	'blankBookmark',
	'fullBookmark',
	'visited',
	'searchBtnNormal',
	'searchBtnSelect',
	'expander',
	'infoClose',
	'go',
	'clear',
	'expandIcon',
	'collapseIcon',
	'moreinfo'
];
toc.tocIconsFolder = "./assets/toc/tocIcons/";
toc.PNGSuffix = ".png";
toc.loadedAssetArr = new Object();
toc.assetsLoaded = 0;
toc.tocRightMargin = 10;
toc.tocLeftMargin = 8;
toc.entryTopMargin = 3;
toc.entryBottomMargin = 3;
toc.expanderWidth = 25;
toc.TOCNAVIGATEBTN_X = 12;
toc.TOCNAVIGATEBTN_Y = 4;
toc.statusWidth = 26;
toc.scrollBarWidth = 0;
toc.entryHeight = 40;
toc.indentationOffset = 20;
toc.bookMarkWidth = 19;
toc.expanderRight = 8;
toc.defaultCanvas = null;
toc.rolloverCanvas = null;
toc.activeCanvas = null;
toc.patternWidth = 8;
toc.patternHeight = 8;
toc.isSearchMode = false;
toc.eventManager = null;
toc.tocAnimator = null;
toc.leftOffset = 0;
function measureTextWidth(divElem,text,maxWidth,appendSuffix)
{
	if(text == '')
		return;
	var test = document.getElementById("tocTest");
	if(test==null)
	{
		test = document.createElement('div');
		document.getElementById('toc').appendChild(test);
		test.id = 'tocTest';
		test.setAttribute('class','tocTest');
	}
	var innerHTMLText = text;
	if(appendSuffix)
		innerHTMLText += '...';
	test.innerHTML = innerHTMLText;
	test.style.fontSize = window.getComputedStyle(divElem).fontSize;
	test.style.fontFamily = window.getComputedStyle(divElem).fontFamily;
	test.style.color = window.getComputedStyle(divElem).color;
	test.style.textDecoration = window.getComputedStyle(divElem).textDecoration;
	test.style.fontWeight = window.getComputedStyle(divElem).fontWeight;
	test.style.fontStyle = window.getComputedStyle(divElem).fontStyle;
	var height = (test.clientHeight);
	var width = (test.clientWidth) ;
	if(maxWidth && width >  maxWidth)
	{
		measureTextWidth(divElem,text.substr(0,text.length-1),maxWidth,true);
		return;
	}
	divElem.height = height;
	divElem.style.height = height + "px";
	
	divElem.innerHTML = '<nobr>' +innerHTMLText + '</nobr>';
	divElem.textWidth = width;
	if(divElem.clientWidth <  width)
	{
		divElem.style.width = width + "px";
		divElem.width = width;
	}
	else
	{
		divElem.style.width = divElem.clientWidth + "px";
		divElem.width = divElem.clientWidth;
	}
}
function scrollbarWidth() {
    var div = document.createElement('div');
	div.style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;";
	var innerdiv = document.createElement('div');
	innerdiv.style="height:100px;"
    // Append our div, do our calculation and then remove it
	document.getElementById('toc').appendChild(div);
	div.appendChild(innerdiv);
    var w1 = div.scrollWidth;
    div.style.overflowY='scroll';
    var w2 = div.scrollWidth;
    document.getElementById('toc').removeChild(div);
    return (w1 - w2);
}
function getDisplayTime(inSec)
{
	var min = '';
	var intMin = 0;
	var sec = '';
	var intSec = 0;
	var res = '';
	inSec = Math.floor(inSec);
	intMin = Math.floor(inSec/60);
	min = intMin + '';
	intSec = (inSec - (intMin * 60));
	sec = intSec + '';
	if(intMin<10)
		res = "0"+ intMin + ":";
	else
		res = intMin + ":";
	if(intSec < 10)
		res = res + "0" + sec ;
	else
		res = res + sec;
	return res;
}
function applyFontSettings(div,fontSettings){
	div.style.fontFamily = fontSettings.font;
	div.style.fontSize = fontSettings.fontSize + 'px';
	div.style.color = fontSettings.color;
	div.style.fontFamily = fontSettings.font;
	if(fontSettings.underline)
		div.style.textDecoration = 'underline';
	if(fontSettings.bold)
		div.style.fontWeight = 'bold';
	if(fontSettings.italic)
		div.style.fontStyle = 'italic';		
}
function isSubString(SourceStr, matchStr)
{
	var sources = SourceStr.toLowerCase();
	var match = matchStr.toLowerCase();
	var matches = sources.split(match);
	if (matches.length > 1)
		return true;
	else
		return false;
}
toc.tocPersistanceManager = null;
toc.PersistanceManager = function()
{
	this.enteredArray = new Array();
	this.visitedArray = new Array();
	this.bookmarkArray = new Array();
	this.lastVisitedEntry = -1;
	this.fileID = toc.movieProperties.tocProperties.htmlFileId;
	this.dontWrite = 1;
}
toc.PersistanceManager.prototype = 
{
	flushData : function()
	{
		if(!toc.movieProperties.tocProperties.hasSelfPaced)
			return;
		var str1 = '';
		var str2 = '';
		var str3 = '';
		var obj = toc.tocPersistanceManager;
		for(var i=0;i<toc.movieProperties.tocProperties.entries.length;++i)
		{
			if(obj.enteredArray[i])
				str1 += i + ',';
			if(obj.visitedArray[i])
				str2 += i + ',';
			if(obj.bookmarkArray[i])
				str3 += i + ',';
		}
		var str = '';
		if(this.dontWrite)
			str = this.fileID + '/'+this.dontWrite+'/'+str1 + '/'+str2 + '/'+ str3 +'/'+ obj.lastVisitedEntry;
		else
			str = this.fileID + '/0////';
		document.cookie= str;
	},
	readArray : function(str,anarray)
	{
		if(!str)
			return;
		var indexNums = str.split(",");
		for(var i=0;i<indexNums.length;++i)
		{
			var indexNumStr = indexNums[i];
			if(indexNumStr!='')
			{
				var indexNum = parseInt(indexNumStr);
				anarray[indexNum]=true;
			}
		}
	},
	hasData : function()
	{
		var cookieArray=document.cookie.split("/");
		var str1 = cookieArray[0];
		if(!toc.movieProperties.tocProperties.hasSelfPaced || (str1 != (toc.movieProperties.tocProperties.htmlFileId + '')))
		{
			return 0;
		}		
		if(cookieArray[1]&&cookieArray[1] == '1')
			return 1;
		else if(cookieArray[1]&&cookieArray[1] == '2')
			return 2;
		return 0;
	},
	readData : function()
	{
		var cookieArray=document.cookie.split("/");
		var str1 = cookieArray[0];
		if(!toc.movieProperties.tocProperties.hasSelfPaced || (str1 != (toc.movieProperties.tocProperties.htmlFileId + '')))
		{
			var str = "/////; expires=" + new Date(0).toUTCString();
			document.cookie= str;
			return;
		}
		if(cookieArray[1]&&cookieArray[1]!='')
			this.dontWrite = parseInt(cookieArray[1]);
		else
			this.dontWrite = 1;
		this.readArray(cookieArray[2],this.enteredArray);
		this.readArray(cookieArray[3],this.visitedArray);
		this.readArray(cookieArray[4],this.bookmarkArray);
		if(cookieArray[5]&&cookieArray[5]!='')
			this.lastVisitedEntry = parseInt(cookieArray[5]);
		else
			this.lastVisitedEntry = -1;
	},
	setEntered : function(tocEntry)
	{
		this.enteredArray[tocEntry.index] = true;
		this.lastVisitedEntry = tocEntry.index;
		this.flushData();
	},
	setVisited : function(tocEntry)
	{
		this.visitedArray[tocEntry.index] = true;
		this.flushData();
	},
	clearVisited : function(tocEntry)
	{
		this.visitedArray[tocEntry.index] = false;
		this.flushData();
	},
	setBookmarked : function(tocEntry)
	{
		this.bookmarkArray[tocEntry.index] = true;
		this.flushData();
	},
	getEntered : function(tocEntry)
	{
		if(this.enteredArray[tocEntry.index])
			return true;
		return false;
	},
	setDontWrite : function(val)
	{
		this.dontWrite = val;
	},
	getVisited : function(tocEntry)
	{
		if(this.visitedArray[tocEntry.index])
			return true;
		return false;
	},
	getBookmarked : function(tocEntry)
	{
		if(this.bookmarkArray[tocEntry.index])
			return true;
		return false;
	}
}
toc.tocEntry = function(element,entryData,index)
{
	this.contentDiv = element;
	this.durationDiv = null;
	this.visitedDiv = null;
	this.bookmarkDiv = null;
	this.clickDiv = null;
	this.expanderDiv = null;
	this.textDiv = null;
	this.entryContainer = null;
	this.level = entryData.level;
	this.text = entryData.text;
	this.duration = 0;
	this.hasChild = entryData.hasChild;
	this.index = index;
	this.fontSettings = toc.movieProperties.tocProperties.fontSettings['level' + this.level  + 'Settings'];
	this.expanderWidth = 0;
	this.durationWidth = 0;
	this.expanded = entryData.expanded;
	if(entryData.link && toc.movieProperties['Slide'+entryData.link])
	{
		toc.movieProperties['Slide'+entryData.link].tocEntry = this;
		this.link = entryData.link;
		this.lastlink = toc.movieProperties['Slide'+entryData.link];
	}
};
toc.tocEntry.prototype =
{
	bookmarkOnClick : function(event)
	{
		if(event.target.bookmarked)
			return;
		var ctx = event.target.getContext("2d");
		ctx.clearRect(0,0,event.target.width,event.target.height);
		var imgElem;
		if(event.target.bookmarked==undefined)
		{
			if(toc.movieProperties.tocProperties.hasSelfPaced)
				event.target.bookmarked = toc.tocPersistanceManager.getBookmarked(this);
			else
				event.target.bookmarked = false;
		}
		else
		{
			event.target.bookmarked = true;
			toc.tocPersistanceManager.setBookmarked(this.parentObj);
		}
		if(event.target.bookmarked)
		{
			imgElem = toc.loadedAssetArr['fullBookmark'];
		}
		else
			imgElem = toc.loadedAssetArr['blankBookmark'];
		ctx.drawImage(imgElem,(event.target.width-imgElem.width)/2,(event.target.height-imgElem.height)/2,imgElem.width,imgElem.height);
	},
	createBookmark : function(entryDiv)
	{
		var bookmarkDiv = document.createElement('canvas');
		bookmarkDiv.setAttribute('class','tocBookmark');
		entryDiv.appendChild(bookmarkDiv);
		bookmarkDiv.width = bookmarkDiv.clientWidth;
		this.expanderWidth = toc.bookMarkWidth;
		bookmarkDiv.height = parseFloat(window.getComputedStyle(entryDiv).height.replace('px',''));
		bookmarkDiv.style.height = bookmarkDiv.height + "px";
		bookmarkDiv.style.left = toc.tocLeftMargin + ((this.level-1)*toc.indentationOffset) + "px";
		this.expanderWidth += (this.level-1)*toc.indentationOffset;
		var evt = new Object();
		evt.target = bookmarkDiv;
		bookmarkDiv.onclick = this.bookmarkOnClick;
		bookmarkDiv.parentObj = this;
		this.bookmarkOnClick(evt);
		this.bookmarkDiv = bookmarkDiv;
	},
	createNavigate : function(entryDiv)
	{
		var clickDiv = document.createElement('div');
		entryDiv.appendChild(clickDiv);
		var clickLeft = 0;
		if(this.bookmarkDiv)
			clickLeft = parseFloat(window.getComputedStyle(this.bookmarkDiv).left.replace('px','')) + this.bookmarkDiv.width;
		clickDiv.style.position = 'absolute';
		clickDiv.style.marginLeft = clickLeft + "px";
		clickDiv.style.top = '0px';
		clickDiv.style.width = (entryDiv.width - clickLeft) + 'px';
		clickDiv.style.height = entryDiv.height + 'px';
		if(cp.device == cp.IDEVICE)
		{
			clickDiv.ontouchend = this.navigate;
		}
		else if ( cp.MSIE == cp.browser )
		{
			for(var i =0;i<entryDiv.childNodes.length; ++i)
			{
				if(this.bookmarkDiv == entryDiv.childNodes[i])
					continue;
				entryDiv.childNodes[i].onclick = this.navigate;
				entryDiv.childNodes[i].parentObj = this;
			}
		}
		else
			clickDiv.onclick = this.navigate;
		clickDiv.parentObj = this;
		this.clickDiv = clickDiv;
	},
	navigate: function(event)
	{
		if(!this.parentObj.hasChild)
		{
			if(this.parentObj.link&&toc.movieProperties.tocProperties.enableNavigation)
			{
				if((toc.movieProperties.tocProperties.navigateVisited&&toc.tocPersistanceManager.getEntered(this.parentObj))
					||!toc.movieProperties.tocProperties.navigateVisited)
				{
					if(!cpLockTOC)
						jumpToSlide(this.parentObj.link);
				}
			}
		}
		else
		{
			if(!toc.isSearchMode)
			{
				this.parentObj.entryContainer.expanded = !this.parentObj.entryContainer.expanded;
				this.parentObj.showHideChildren(this.parentObj.entryContainer.expanded,true);
				this.parentObj.contentDiv.parentObj.updateTOCEntries();
			}
			else
			{
				if(!toc.movieProperties.tocProperties.enableNavigation)
					return;
				var link;
				for(var i= this.parentObj.index + 1; i< this.parentObj.contentDiv.tocEntries.length; ++i)
				{
					if(this.parentObj.contentDiv.tocEntries[i].level <= this.level)
						break;
					else if(this.parentObj.contentDiv.tocEntries[i].link != undefined)
					{
						link = this.parentObj.contentDiv.tocEntries[i].link;
						break;
					}
				}
				if(link)
				{
					if((toc.movieProperties.tocProperties.navigateVisited&&toc.tocPersistanceManager.getEntered(this.parentObj))
					||!toc.movieProperties.tocProperties.navigateVisited)
						jumpToSlide(link);
				}
			}
		}
	},
	showhideChildDivs :function(show)
	{
		var visibletext = '';
		if(!show)
			visibletext = 'hidden';
		if(this.durationDiv)
			this.durationDiv.style.visibility = visibletext;
		if(this.visitedDiv)
		{
			if(!this.entryContainer.visited)
				this.visitedDiv.style.visibility = 'hidden';
			else
				this.visitedDiv.style.visibility = visibletext;
		}
		if(this.bookmarkDiv)
		{
			if(toc.isSearchMode)
				this.bookmarkDiv.style.visibility = 'hidden';
			else
				this.bookmarkDiv.style.visibility = visibletext;
		}
		if(this.clickDiv)
		{
			this.clickDiv.style.visibility = visibletext;
		}
		if(this.expanderDiv)
		{
			if(toc.isSearchMode)
				this.expanderDiv.style.visibility = 'hidden';
			else
				this.expanderDiv.style.visibility = visibletext;
		}
		if(this.textDiv)
			this.textDiv.style.visibility = visibletext;
	},
	showHideChildren: function(show,force)
	{
		var imactive = this.entryContainer.active;
		for(var i= this.index + 1; i< toc.movieProperties.tocProperties.entries.length; ++i)
		{
			if(this.contentDiv.tocEntries[i].level - this.level == 1 )
			{
				var toshow = this.contentDiv.tocEntries[i].expanded;
				if(force || !show)
					toshow = show;
				if(toshow)
				{
					this.contentDiv.tocEntries[i].entryContainer.style.height = window.getComputedStyle(this.entryContainer).height;
					if(this.contentDiv.tocEntries[i].entryContainer.active&&imactive)
					{
						this.entryContainer.active = false;
						var src;
						if(force)
							src = toc.rolloverCanvas;
						else
							src = toc.defaultCanvas;
						this.entryContainer.style.backgroundImage = 'url("' + src +'")';
						this.entryContainer.style.backgroundSize = '100% 100%';
						src = toc.activeCanvas;
						this.contentDiv.tocEntries[i].entryContainer.style.backgroundImage = 'url("' + src +'")';
						this.contentDiv.tocEntries[i].entryContainer.style.backgroundSize = '100% 100%';
					}
				}
				else
				{
					this.contentDiv.tocEntries[i].entryContainer.style.height = '0px';
				}
				this.contentDiv.tocEntries[i].showhideChildDivs(toshow);
				if(force)
				{
					this.expanded = toshow;
					this.entryContainer.expanded = toshow;
					if(!this.contentDiv.tocEntries[i].expanderDiv)
					{
						this.contentDiv.tocEntries[i].expanded = toshow;
						this.contentDiv.tocEntries[i].entryContainer.expanded = toshow;
					}
				}
				this.contentDiv.tocEntries[i].showHideChildren(show);
				if(this.contentDiv.tocEntries[i].entryContainer.active&&!imactive&&!toshow)
				{
					this.entryContainer.active = true;
					var src = toc.activeCanvas;
					this.entryContainer.style.backgroundImage = 'url("' + src +'")';
					this.entryContainer.style.backgroundSize = '100% 100%';
					src = toc.defaultCanvas;
					this.contentDiv.tocEntries[i].entryContainer.style.backgroundImage = 'url("' + src +'")';
					this.contentDiv.tocEntries[i].entryContainer.style.backgroundSize = '100% 100%';
				}
			}
			else if(this.contentDiv.tocEntries[i].level <= this.level)
				break;
			else
				continue;
		}
		if(this.expanderDiv)
		{
			if(this.expanded)
				applyTransform(this.expanderDiv,'matrix(0,1,-1,0,0,0)');
			else
				applyTransform(this.expanderDiv,'matrix(1,0,0,1,0,0)');
		}
	},
	createExpander : function(entryDiv)
	{
		var expanderDiv = document.createElement('img');
		expanderDiv.setAttribute('class','tocExpander');
		entryDiv.appendChild(expanderDiv);
		expanderDiv.src = toc.loadedAssetArr['expander'].src;
		expanderDiv.width = expanderDiv.clientWidth;
		expanderDiv.height = expanderDiv.clientHeight;
		this.expanderWidth = (this.level-1)*toc.indentationOffset;
		expanderDiv.style.left = toc.tocLeftMargin + ( this.expanderWidth )+"px";
		this.expanderWidth += toc.expanderRight + expanderDiv.width;
		if(this.expanded)
			applyTransform(expanderDiv,'matrix(0,1,-1,0,0,0)');
		else
			applyTransform(expanderDiv,'matrix(1,0,0,1,0,0)');
		entryDiv.parentObj = this;
		this.expanderDiv = expanderDiv;
	},
	createVisited : function(entryDiv)
	{
		var visitedDiv = document.createElement('img');
		visitedDiv.src = toc.loadedAssetArr['visited'].src;
		entryDiv.appendChild(visitedDiv);
		visitedDiv.style.marginTop = (parseFloat(window.getComputedStyle(entryDiv).height.replace('px','')) - visitedDiv.height)/2 + "px";
		visitedDiv.style.marginLeft = (parseFloat(window.getComputedStyle(entryDiv).width.replace('px','')) - toc.tocRightMargin - toc.scrollBarWidth - visitedDiv.width ) + "px";
		this.visitedDiv = visitedDiv;
		if(!toc.tocPersistanceManager.getVisited(this))
			visitedDiv.style.visibility = 'hidden';
	},
	createEntryCanvas : function(entryDiv,color)
	{
		var colorCanvas = document.createElement('canvas');
		colorCanvas.width = entryDiv.width;
		colorCanvas.height = entryDiv.height;
		var srccontext = colorCanvas.getContext('2d');
		srccontext.clearRect(0,0,entryDiv.width,entryDiv.height);
		setFillStrokeStyle( color,colorCanvas);
		srccontext.fillRect(0,0,entryDiv.width,entryDiv.height);
		setFillStrokeStyle( toc.movieProperties.tocProperties.headingColor,colorCanvas);
		srccontext.fillRect(0,entryDiv.height-1,entryDiv.width,entryDiv.height);
		if(toc.movieProperties.tocProperties.outlineColor)
		{
			setFillStrokeStyle( toc.movieProperties.tocProperties.outlineColor,colorCanvas,true);
			colorCanvas.lineWidth = 4.0;
			srccontext.strokeRect(0,-2,entryDiv.width,entryDiv.height+4);
		}
		return colorCanvas.toDataURL('image/png');
	},
	setParentActive : function(bool)
	{
		this.entryContainer.active = bool;
		if(this.entryContainer.style.height != '0px')
		{
			this.setCanvas(bool);
			return;
		}
		for(var i= this.index - 1; i>=0; --i)
		{
			if( this.level - this.contentDiv.tocEntries[i].level == 1 )//get immediate parent
			{
				this.contentDiv.tocEntries[i].setParentActive(bool);
				return;
			}
		}
	},
	setActive : function(bool)
	{
		toc.tocPersistanceManager.setEntered(this);
		this.setParentActive(bool);
	},
	setCanvas : function(bool)
	{
		var src = this.entryContainer.mousein ? toc.rolloverCanvas : toc.defaultCanvas;
		if(bool)
			src = toc.activeCanvas;
		this.entryContainer.style.backgroundImage = 'url("' + src +'")';
		this.entryContainer.style.backgroundSize = '100% 100%';
	},
	checkChildrenAndVisited: function(index)
	{
		if(this.duration == 0)
			return;
		var sum = 0;
		for(var j = this.index+1; j < this.contentDiv.tocEntries.length; ++j)
		{
			if(this.contentDiv.tocEntries[j].level <= this.level)
				break;
			else if( this.contentDiv.tocEntries[j].level - this.level == 1 )// immediate children
			{
				if( this.contentDiv.tocEntries[j].entryContainer.visited )
						sum+= this.contentDiv.tocEntries[j].duration;
			}				
		}
		if(sum == this.duration)
		{
			this.setVisited();//propagate upwards
			this.entryContainer.visited = true;
			if(this.entryContainer.style.height != '0px')
				this.visitedDiv.style.visibility = '';
		}
	},
	setVisited : function()
	{
		if(!this.visitedDiv)
			return;
		if(this.entryContainer.visited)
			return;
		this.entryContainer.visited = true;
		toc.tocPersistanceManager.setVisited(this);
		if(this.entryContainer.style.height != '0px')
			this.visitedDiv.style.visibility = '';
		if(this.level!=1)
		{
			for(var i= this.index - 1; i>=0; --i)
			{
				if( this.level - this.contentDiv.tocEntries[i].level == 1 )//get immediate parent
				{
					this.contentDiv.tocEntries[i].checkChildrenAndVisited();
					break;
				}
				else
					continue;
			}
		}
		else
			this.checkChildrenAndVisited();
	},
	onRolloverEntry : function(event)
	{
		this.mousein = true;
		if(this.style.height == '0px')
		{
			this.style.cursor = 'default';
			return;
		}
		if(this.parentObj.durationDiv)
			this.parentObj.durationDiv.style.color = toc.movieProperties.tocProperties.fontSettings['level'+this.parentObj.level+'Settings'].rolloverColor;
		if(this.parentObj.textDiv)
			this.parentObj.textDiv.style.color = toc.movieProperties.tocProperties.fontSettings['level'+this.parentObj.level+'Settings'].rolloverColor;
		if(this.active)
			return;
		if(!this.parentObj.hasChild&&toc.movieProperties.tocProperties.navigateVisited&&!toc.tocPersistanceManager.getEntered(this.parentObj))
			return;
		var src = toc.rolloverCanvas;
		this.style.backgroundImage = 'url("' + src +'")';
		this.style.backgroundSize = '100% 100%';
	},
	onRolloutEntry : function(event)
	{
		this.mousein = false;
		var src = toc.defaultCanvas;
		if(this.active)
			src = toc.activeCanvas;
		if(this.parentObj.durationDiv)
			this.parentObj.durationDiv.style.color = toc.movieProperties.tocProperties.fontSettings['level'+this.parentObj.level+'Settings'].color;
		if(this.parentObj.textDiv)
			this.parentObj.textDiv.style.color = toc.movieProperties.tocProperties.fontSettings['level'+this.parentObj.level+'Settings'].color;
		this.style.backgroundImage = 'url("' + src +'")';
		this.style.backgroundSize = '100% 100%';
	},
	createDuration : function(entryDiv)
	{
		var durationDiv = document.createElement('div');
		entryDiv.appendChild(durationDiv);
		durationDiv.setAttribute('class','tocDuration');
		applyFontSettings(durationDiv,this.fontSettings);
		measureTextWidth(durationDiv,getDisplayTime(this.duration)); 
		entryDiv.appendChild(durationDiv);
		durationDiv.style.top = (parseFloat(window.getComputedStyle(entryDiv).height.replace('px','')) - durationDiv.height)/2 + "px";
		durationDiv.style.left = (parseFloat(window.getComputedStyle(entryDiv).width.replace('px','')) - toc.tocRightMargin - toc.scrollBarWidth - durationDiv.width - toc.statusWidth) + "px";
		this.durationDiv = durationDiv;
		this.durationWidth = durationDiv.width;
	},
	createText : function(entryDiv)
	{
		var textDiv = document.createElement('div');
		entryDiv.appendChild(textDiv);
		textDiv.setAttribute('class','tocText');
		applyFontSettings(textDiv,this.fontSettings);
		measureTextWidth(textDiv,this.text,(parseFloat(window.getComputedStyle(entryDiv).width.replace('px','')) - toc.tocLeftMargin - toc.tocRightMargin - toc.scrollBarWidth - this.durationWidth - toc.statusWidth - this.expanderWidth)); 
		entryDiv.appendChild(textDiv);
		textDiv.style.top = (parseFloat(window.getComputedStyle(entryDiv).height.replace('px','')) - textDiv.height)/2 + "px";
		textDiv.style.left = (toc.tocLeftMargin + this.expanderWidth) + "px";
		this.textDiv = textDiv;
	},
	calculateDuration : function()
	{
		if(this.link)
			return;
		for(var i=this.index + 1;i<toc.movieProperties.tocProperties.entries.length;++i)
		{
			var entry = toc.movieProperties.tocProperties.entries[i];
			if(entry.level <= this.level )
				break;
			else if(entry.link&&toc.movieProperties['Slide'+entry.link])
				this.duration += toc.movieProperties['Slide'+entry.link].tocEntry.duration;
		}
	},
	createEntry : function()
	{
		this.calculateDuration();
		var entryContainer = document.createElement('div');
		entryContainer.setAttribute('class','tocEntryContainerStyle');
		this.contentDiv.appendChild(entryContainer);
		entryContainer.style.width = this.contentDiv.width;
		entryContainer.style.height = window.getComputedStyle(entryContainer).height;
		entryContainer.width = parseFloat(entryContainer.style.width.replace('px',''));
		entryContainer.height = parseFloat(entryContainer.style.height.replace('px',''));
		if(toc.defaultCanvas == null)
			toc.defaultCanvas = this.createEntryCanvas(entryContainer,toc.movieProperties.tocProperties.defaultColor);
		if(toc.rolloverCanvas == null)
			toc.rolloverCanvas = this.createEntryCanvas(entryContainer,toc.movieProperties.tocProperties.rolloverColor);
		if(toc.activeCanvas == null)
			toc.activeCanvas = this.createEntryCanvas(entryContainer,toc.movieProperties.tocProperties.activeColor);
		entryContainer.active = false;
		entryContainer.visited = false;
		entryContainer.mousein = false;
		var src = toc.defaultCanvas;
		entryContainer.style.backgroundImage = 'url("' + src +'")';
		entryContainer.style.backgroundSize = '100% 100%';
		entryContainer.parentObj = this;
		if(cp.device == cp.IDEVICE)
		{
			entryContainer.ontouchstart = this.onRolloverEntry;
			entryContainer.ontouchend = this.onRolloutEntry;
		}
		else
		{
			entryContainer.onmouseover = this.onRolloverEntry;
			entryContainer.onmouseout = this.onRolloutEntry;
		}
        entryContainer.tabIndex = 0;
        entryContainer.setAttribute('aria-label', this.text + ' duration ' + this.duration);
		cp.removeAccessibilityOutline( entryContainer );
        entryContainer.setAttribute('role','img');

		if(this.hasChild)
			this.createExpander(entryContainer);
		else
			this.createBookmark(entryContainer);
		if(toc.movieProperties.tocProperties.statusFlag)
			this.createVisited(entryContainer);
		if(toc.movieProperties.tocProperties.showDuration)
			this.createDuration(entryContainer);
		this.createText(entryContainer);
			this.createNavigate(entryContainer);
		this.entryContainer = entryContainer;
		if(this.level != 1 && !this.expanded)
		{
			this.entryContainer.style.height = '0px';
			this.showhideChildDivs();
		}
		this.entryContainer.expanded = this.expanded;
	},
	repositionEntry : function()
	{
		if(this.visitedDiv)
			this.visitedDiv.style.marginLeft = (parseFloat(window.getComputedStyle(this.entryContainer).width.replace('px','')) - toc.tocRightMargin - toc.scrollBarWidth -  this.visitedDiv.width ) + "px";
		if(this.durationDiv)
			this.durationDiv.style.left = (parseFloat(window.getComputedStyle(this.entryContainer).width.replace('px','')) - toc.tocRightMargin - toc.scrollBarWidth - this.durationDiv.width - toc.statusWidth) + "px";
		var pwidth = parseFloat(window.getComputedStyle(this.entryContainer).width.replace('px',''));
		this.textDiv.style.width = "0px";
		this.textDiv.width = 0;
		var expanderWidth = this.expanderWidth;
		if(toc.isSearchMode)
			expanderWidth = toc.indentationOffset;
		measureTextWidth(this.textDiv,this.text,(pwidth - toc.tocLeftMargin - toc.tocRightMargin - toc.scrollBarWidth - this.durationWidth - toc.statusWidth - expanderWidth)); 
		this.textDiv.style.left = (toc.tocLeftMargin + expanderWidth) + "px";
	}
};
toc.tocConstruct = function(element)
{
	this.tocDiv = element;
	this.bkGrndDiv = null;
	this.bkCanvas = null;
	this.titleCanvas = null;
	this.contentDiv = null;
	this.curActiveEntry = null;
	this.tocEntries = new Array();
	this.appearanceArray = new Array();
	this.matchIndicesArray = new Array();
};
toc.tocConstruct.prototype = 
{
	createTOCEntries : function(contentDiv)
	{
		var contentDivHt =parseFloat(window.getComputedStyle(contentDiv).height.replace('px',''));
		var numEntries = 0;
		for(var i=0;i<toc.movieProperties.tocProperties.entries.length;++i)
		{
			var entry = toc.movieProperties.tocProperties.entries[i];
			if(i+1 != toc.movieProperties.tocProperties.entries.length && toc.movieProperties.tocProperties.entries[i].level < toc.movieProperties.tocProperties.entries[i+1].level)
				entry.hasChild = true;
			else
				entry.hasChild = false;
			if(entry.level == 1 ||entry.expanded)
				++numEntries;
		}
		if( contentDivHt < numEntries*toc.entryHeight)
			toc.scrollBarWidth = scrollbarWidth();
		else
			toc.scrollBarWidth = 0;
		contentDiv.width = window.getComputedStyle(contentDiv).width;
		for(var i=0;i<toc.movieProperties.tocProperties.entries.length;++i)
		{
			var entry = new toc.tocEntry(contentDiv,toc.movieProperties.tocProperties.entries[i],i);
			this.tocEntries[i] = entry;
		}		
		var temp = null;
		var slides = toc.movieProperties.project_main.slides.split(",");
		for(var i=0;i<slides.length;++i)
		{
			if(toc.movieProperties[slides[i]].tocEntry == null)
				toc.movieProperties[slides[i]].tocEntry = temp;
			else
				temp = toc.movieProperties[slides[i]].tocEntry;
		}
		for(var i=0;i<slides.length;++i)
		{
			if(toc.movieProperties[slides[i]].tocEntry)
			{
				toc.movieProperties[slides[i]].tocEntry.duration += (toc.movieProperties[slides[i]].to - toc.movieProperties[slides[i]].from + 1)/toc.movieProperties.project.fps;
				toc.movieProperties[slides[i]].tocEntry.lastlink = toc.movieProperties[slides[i]];
			}
		}
		for(var i=0;i<this.tocEntries.length;++i)
		{
			var entry = this.tocEntries[i];
			entry.createEntry();
		}
		contentDiv.tocEntries = this.tocEntries;
		contentDiv.parentObj = this;
	},
	updateTOCEntries : function()
	{
		var contentDivHt =parseFloat(window.getComputedStyle(this.contentDiv).height.replace('px',''));
		var prevScrollBarWidth = toc.scrollBarWidth;
		var visibleEntries = 0;
		for(var i=0;i<this.tocEntries.length;++i)
		{
			if(this.tocEntries[i].entryContainer.style.height != '0px')
				visibleEntries++;;
		}
		if( contentDivHt < visibleEntries*toc.entryHeight)
			toc.scrollBarWidth = scrollbarWidth();
		else
			toc.scrollBarWidth = 0;
		if(prevScrollBarWidth == toc.scrollBarWidth)
			return;
		for(var i=0;i<this.tocEntries.length;++i)
		{
			var entry = this.tocEntries[i];
			entry.repositionEntry();
		}
	},
	createCanvas : function(curDiv,color,dontdrawBorder,strokeLeft,strokeTop,strokeRight,strokeBottom)
	{
		var colorCanvas = document.createElement('canvas');
		colorCanvas.width = curDiv.width;
		colorCanvas.height = curDiv.height;
		var srccontext = colorCanvas.getContext('2d');
		srccontext.clearRect(0,0,curDiv.width,curDiv.height);
		setFillStrokeStyle( color,colorCanvas);
		srccontext.fillRect(0,0,curDiv.width,curDiv.height);
		if(!dontdrawBorder)
		{
			if(toc.movieProperties.tocProperties.outlineColor)
			{
				setFillStrokeStyle( toc.movieProperties.tocProperties.outlineColor,colorCanvas,true);
				colorCanvas.lineWidth = 4.0;
				srccontext.strokeRect(strokeLeft,strokeTop,curDiv.width+strokeRight,curDiv.height+strokeBottom);
			}
		}
		return colorCanvas.toDataURL('image/png');
	},
	searchBtnDraw : function(event)
	{
		var ctx = event.target.getContext("2d");
		ctx.clearRect(0,0,event.target.width,event.target.height);
		var imgElem;
		if(event.type == 'mousedown' || event.type == 'touchstart')
			imgElem = toc.loadedAssetArr['searchBtnSelect'];
		else
			imgElem = toc.loadedAssetArr['searchBtnNormal'];
		ctx.drawImage(imgElem,(event.target.width-imgElem.width)/2,(event.target.height-imgElem.height)/2,imgElem.width,imgElem.height);
	},
	searchBtnClick : function(event)
	{
		var srchBar = document.getElementById('tocSearchBar');
		var displayStr = window.getComputedStyle(srchBar).display;
		var srchBarHt = parseFloat(window.getComputedStyle(srchBar).height);
		if(displayStr == 'none')
		{
			displayStr = 'block';
			srchBarHt = -srchBarHt;
		}
		else
			displayStr = 'none';
		srchBar.style.display = displayStr;
		var content = document.getElementById('tocContent');
		content.style.height = (parseFloat(window.getComputedStyle(content).height) + srchBarHt) + "px";
		this.parentObj.updateTOCEntries();
		var srchInput = document.getElementById('tocSearchInput');
		if(displayStr == 'none')
		{
			if(toc.isSearchMode)
			{
				toc.isSearchMode = false;
				
				var noSrch = document.getElementById('tocNoSearch');
				if(noSrch)
				{
					noSrch.style.display = 'none';
				}
				for(var i=0;i<srchInput.parentObj.matchIndicesArray.length;++i)
				{
					var entry = srchInput.parentObj.tocEntries[srchInput.parentObj.matchIndicesArray[i]];
					entry.repositionEntry();
					entry.entryContainer.style.height = '0px';
					entry.showhideChildDivs(false);
				}
				var tocEntries = srchInput.parentObj.tocEntries;
				for(var i =0;i<tocEntries.length; ++i)
				{
					if(!srchInput.parentObj.appearanceArray[i])
					{
						tocEntries[i].entryContainer.style.height = '0px';
						tocEntries[i].showhideChildDivs(false);
					}
					else
					{
						
						tocEntries[i].entryContainer.style.height = tocEntries[i].entryContainer.height + 'px';
						tocEntries[i].showhideChildDivs(true);
					}
					srchInput.parentObj.updateTOCEntries();
				}
			}
		}
		else
		{
			srchInput.focus();
		}
	},
	infoCloseBtnDraw : function(event)
	{
		var ctx = event.target.getContext("2d");
		ctx.clearRect(0,0,event.target.width,event.target.height);
		if(event.type != 'mouseover'&&event.type != 'touchstart')
			setFillStrokeStyle( toc.movieProperties.tocProperties.defaultColor,event.target);
		else
			ctx.fillStyle = '#fff';
		ctx.fillRect(0,0,event.target.width,event.target.height);
		if(toc.movieProperties.tocProperties.outlineColor)
		{
			setFillStrokeStyle( toc.movieProperties.tocProperties.outlineColor,event.target,true);
			ctx.lineWidth = 1.0;
			ctx.strokeRect(0,0,event.target.width,event.target.height);
		}
		var imgElem=toc.loadedAssetArr['infoClose'];
		if(imgElem)
			ctx.drawImage(imgElem,(event.target.width-imgElem.width)/2,(event.target.height-imgElem.height)/2,imgElem.width,imgElem.height);
	},
	clearBtnClick : function(event)
	{
		for(var i=0;i<this.parentObj.tocEntries.length;++i)
		{
			var entry = this.parentObj.tocEntries[i];
			toc.tocPersistanceManager.clearVisited(entry);
			if(entry.visitedDiv)
				entry.visitedDiv.style.visibility = 'hidden';
			entry.entryContainer.visited = false;
		}
	},
	goBtnKey : function(event)
	{
		if(event.which == 13)
			this.parentObj.goBtnClick(event);
	},
	goBtnClick : function(event)
	{
		var srchInput = document.getElementById('tocSearchInput');
		if(srchInput.value == '')
		{
			if(toc.isSearchMode)
			{
				toc.isSearchMode = false;
				
				var noSrch = document.getElementById('tocNoSearch');
				if(noSrch)
				{
					noSrch.style.display = 'none';
				}
				for(var i=0;i<srchInput.parentObj.matchIndicesArray.length;++i)
				{
					var entry = srchInput.parentObj.tocEntries[srchInput.parentObj.matchIndicesArray[i]];
					entry.repositionEntry();
					entry.entryContainer.style.height = '0px';
					entry.showhideChildDivs(false);
				}
				var tocEntries = srchInput.parentObj.tocEntries;
				for(var i =0;i<tocEntries.length; ++i)
				{
					if(!srchInput.parentObj.appearanceArray[i])
					{
						tocEntries[i].entryContainer.style.height = '0px';
						tocEntries[i].showhideChildDivs(false);
					}
					else
					{
						
						tocEntries[i].entryContainer.style.height = tocEntries[i].entryContainer.height + 'px';
						tocEntries[i].showhideChildDivs(true);
					}
					srchInput.parentObj.updateTOCEntries();
				}
			}
			return;
		}
		if(toc.isSearchMode)
		{
			for(var i=0;i<srchInput.parentObj.matchIndicesArray.length;++i)
			{
				var entry = srchInput.parentObj.tocEntries[srchInput.parentObj.matchIndicesArray[i]];
				entry.repositionEntry();
				entry.entryContainer.style.height = '0px';
				entry.showhideChildDivs(false);
			}
			var tocEntries = srchInput.parentObj.tocEntries;
			for(var i =0;i<tocEntries.length; ++i)
			{
				if(!srchInput.parentObj.appearanceArray[i])
				{
					tocEntries[i].entryContainer.style.height = '0px';
					tocEntries[i].showhideChildDivs(false);
				}
				else
				{
					
					tocEntries[i].entryContainer.style.height = tocEntries[i].entryContainer.height + 'px';
					tocEntries[i].showhideChildDivs(true);
				}
				srchInput.parentObj.updateTOCEntries();
			}
		}
		
		toc.isSearchMode = true;
		var tocEntries = srchInput.parentObj.tocEntries;
		srchInput.parentObj.matchIndicesArray.length = 0;
		srchInput.parentObj.appearanceArray.length = 0;
		for(var i =0;i<tocEntries.length; ++i)
		{
			if(tocEntries[i].entryContainer.style.height == '0px')
				srchInput.parentObj.appearanceArray.push(false);
			else
				srchInput.parentObj.appearanceArray.push(true);
			tocEntries[i].entryContainer.style.height = '0px';
			tocEntries[i].showhideChildDivs(false);
			if(isSubString(tocEntries[i].text,srchInput.value))
				srchInput.parentObj.matchIndicesArray.push(i);
			
			if(tocEntries[i].link!=undefined)
			{
				for(var k =0;k< toc.movieProperties.trecs.length; ++k)
				{
					if(tocEntries[i].link == toc.movieProperties.trecs[k].link)
					{
						var textList = toc.movieProperties.trecs[k].text;
						for(var j =0;j<textList.length; ++j)
						{
							if(isSubString(textList[j],srchInput.value))
							{
								srchInput.parentObj.matchIndicesArray.push(i);
								break;
							}
						}
					}
				}
			}				
		}
		var contentDivHt =parseFloat(window.getComputedStyle(srchInput.parentObj.contentDiv).height.replace('px',''));
		var prevScrollBarWidth = toc.scrollBarWidth;
		var visibleEntries = srchInput.parentObj.matchIndicesArray.length;
		if( contentDivHt < visibleEntries*toc.entryHeight)
			toc.scrollBarWidth = scrollbarWidth();
		else
			toc.scrollBarWidth = 0;
		for(var i=0;i<srchInput.parentObj.matchIndicesArray.length;++i)
		{
			var entry = srchInput.parentObj.tocEntries[srchInput.parentObj.matchIndicesArray[i]];
			entry.entryContainer.style.height = entry.entryContainer.height + 'px';
			entry.showhideChildDivs(true);
			entry.repositionEntry();
		}
		if(srchInput.parentObj.matchIndicesArray.length == 0)
		{
			var noSrch = document.getElementById('tocNoSearch');
			if(noSrch)
			{
				noSrch.style.display = 'block';
			}
		}
	},
	drawFooterText : function(frame)
	{
		var currTime = (frame/toc.movieProperties.project.fps);
		currTime = (Math.round (currTime));
		var elem = this;
		var srccontext = elem.getContext('2d');
		var curTimeText = getDisplayTime(currTime);
		if(curTimeText == srccontext.prevTime)
			return;
		
		var totalTime = (toc.movieProperties.project_main.to/toc.movieProperties.project.fps);
		totalTime = (Math.round(totalTime));
		
		srccontext.clearRect(0,0,elem.width,elem.height);
		srccontext.font = '9px Verdana';
		srccontext.textBaseline = 'middle';
		srccontext.textAlign = 'center';
		srccontext.fillStyle    = toc.movieProperties.tocProperties.headingTextColor;
		srccontext.fillText(curTimeText + " / " + getDisplayTime(totalTime) + " " + toc.movieProperties.tocProperties.minutes,elem.width/2,elem.height/2);
		srccontext.prevTime = curTimeText;
	},
	createTOC : function(entryContainer)
	{
		this.bkCanvas = this.createCanvas(this.tocDiv,toc.movieProperties.tocProperties.bkColor,false,0,0,0,0);
		this.tocDiv.style.backgroundImage = 'url("' + this.bkCanvas +'")';
		this.tocDiv.style.backgroundSize = '100% 100%';
		
		var title = document.createElement('div');
		title.setAttribute('class','tocTitle');
		this.tocDiv.appendChild(title);
		title.style.width = this.tocDiv.width;
		title.width = this.tocDiv.width;
		title.height = parseFloat(window.getComputedStyle(title).height.replace('px',''));
		this.titleCanvas = this.createCanvas(title,toc.movieProperties.tocProperties.titleColor,false,0,0,0,2);
		title.style.backgroundImage = 'url("' + this.titleCanvas +'")';
		title.style.backgroundSize = '100% 100%';
		
		
		var searchBtn;
		var srchBtnLeft = toc.tocRightMargin;
		if(toc.movieProperties.tocProperties.showSearch)
		{
			searchBtn = document.createElement('canvas');
			title.appendChild(searchBtn);
			searchBtn.setAttribute('class','tocSearchBtn');
			searchBtn.height = parseFloat(window.getComputedStyle(searchBtn).height.replace('px',''));
			searchBtn.width = parseFloat(window.getComputedStyle(searchBtn).width.replace('px',''));
			searchBtn.style.top = (title.height - searchBtn.height)/2 + "px";
			srchBtnLeft = parseFloat(window.getComputedStyle(searchBtn).left.replace('px',''));
            searchBtn.tabIndex = 0;
            searchBtn.setAttribute('role', 'button');
            searchBtn.setAttribute('aria-label', 'search');
			cp.removeAccessibilityOutline( searchBtn );
			var evt = new Object();
			evt.target = searchBtn;
			evt.type = '';
			searchBtn.onclick = this.searchBtnClick;
			searchBtn.parentObj = this;
			this.searchBtnDraw(evt);
		}
		var titleTextDiv = document.createElement('div');
		titleTextDiv.setAttribute('class','tocTitleText');
		title.appendChild(titleTextDiv);
		applyFontSettings(titleTextDiv,toc.movieProperties.tocProperties.titleSettings);
		titleTextDiv.style.textAlign = 'center';
		var maxTitleWidth = title.width - toc.tocLeftMargin - srchBtnLeft;
		if(toc.movieProperties.tocProperties.showSearch)
			maxTitleWidth += - searchBtn.width - parseFloat(window.getComputedStyle(searchBtn).right.replace('px','')) ;
		var titleText = toc.movieProperties.tocProperties.title;
		if(titleText == '')
			titleText = toc.movieProperties.tocProperties.toc;
		measureTextWidth(titleTextDiv,titleText,maxTitleWidth);
		titleTextDiv.style.top = (title.height - titleTextDiv.height)/2 + "px";
		titleTextDiv.tabIndex = 0;
		if(toc.movieProperties.tocProperties.showSearch)
		{
			var searchBarDiv = document.createElement('div');
			searchBarDiv.id = 'tocSearchBar';
			this.tocDiv.appendChild(searchBarDiv);
			searchBarDiv.setAttribute('class','tocSearchBar');
			searchBarDiv.width = this.tocDiv.width;
			searchBarDiv.style.width = this.tocDiv.style.width;
			
			var  goBtn = document.createElement('img');
			goBtn.src = './assets/toc/tocIcons/go.png';
			goBtn.setAttribute('class','tocGoBtn');
			searchBarDiv.appendChild(goBtn);
			goBtn.onclick = this.goBtnClick;
			goBtn.title = toc.movieProperties.tocProperties.go;
			
			if(toc.movieProperties.tocProperties.outlineColor)
			{
				var searchInputBorder = document.createElement('canvas');
				searchBarDiv.appendChild(searchInputBorder);
				searchInputBorder.setAttribute('class','tocSearchInputBorder');
				searchInputBorder.style.width = (searchBarDiv.width -  43) + "px"; 
				searchInputBorder.width = (searchBarDiv.width -  43) + "px"; 
				searchInputBorder.height = parseFloat(window.getComputedStyle(searchBtn).height.replace('px',''))
				var ctx = searchInputBorder.getContext("2d");
				ctx.clearRect(0,0,searchInputBorder.width,searchInputBorder.height);			
				setFillStrokeStyle( toc.movieProperties.tocProperties.outlineColor,searchInputBorder,true);
				ctx.lineWidth = 1.0;
				ctx.strokeRect(0,0,searchInputBorder.width,searchInputBorder.height);
			}
			
			var  searchInput = document.createElement('input');
			searchInput.id = 'tocSearchInput';
			searchInput.parentObj = this;
			searchInput.setAttribute('class','tocSearchInput');
			searchBarDiv.appendChild(searchInput);
			searchInput.style.width = (searchBarDiv.width -  49) + "px"; 
			searchInput.onkeypress = this.goBtnKey;
			
			
			searchBarDiv.style.display = 'none';
		}
		var infoDiv = document.createElement('div');
		this.tocDiv.appendChild(infoDiv);
		var tocInfoLeft = 8;
		var maxFieldWidth = this.tocDiv.width - tocInfoLeft;
		var minMoreInfoTop = 0;
		if(toc.loadedAssetArr['photo']!=undefined)
		{
			var lWidth = toc.loadedAssetArr['photo'].width;
			var lHeight = toc.loadedAssetArr['photo'].height;
			lHeight = (60 * lHeight)/lWidth;
			lWidth = 60;
			var photoCanvas = document.createElement('canvas');
			photoCanvas.width = lWidth+4;
			photoCanvas.height = lHeight+4;
			var srccontext = photoCanvas.getContext('2d');
			srccontext.clearRect(0,0,photoCanvas.width,photoCanvas.height);
			srccontext.lineWidth = 1;
			var colorStr = getRGBA('#ffffff',127);
			srccontext.strokeStyle = colorStr;
			srccontext.strokeRect(0,0,photoCanvas.width,photoCanvas.height);
			colorStr = getRGBA('#666666',255);
			srccontext.strokeStyle = colorStr;
			srccontext.strokeRect(1,1,photoCanvas.width-2,photoCanvas.height-2);
			srccontext.drawImage(toc.loadedAssetArr['photo'],0,0,toc.loadedAssetArr['photo'].width,toc.loadedAssetArr['photo'].height,2,2,lWidth,lHeight);
			colorStr = getRGBA('#ffffff',127);
			srccontext.strokeStyle = colorStr;
			srccontext.strokeRect(2,2,photoCanvas.width-4,photoCanvas.height-4);
			infoDiv.appendChild(photoCanvas);
			photoCanvas.style.left = tocInfoLeft + "px";
			photoCanvas.style.marginTop = "5px";
			photoCanvas.style.width = photoCanvas.width + "px";
			photoCanvas.style.height = photoCanvas.height +"px";
			photoCanvas.style.position = 'absolute';
			tocInfoLeft += 69;
			maxFieldWidth -= 69;
			minMoreInfoTop = photoCanvas.height+10;
		}
		var tocInfoTop = 0;
		if(toc.movieProperties.tocProperties.name != '')
		{
			var nameDiv = document.createElement('div');
			nameDiv.setAttribute('class','tocInfoField');
			infoDiv.appendChild(nameDiv);
			applyFontSettings(nameDiv,toc.movieProperties.tocProperties.nameSettings);
			nameDiv.style.position = 'absolute';
			nameDiv.style.marginTop = tocInfoTop + "px";
			nameDiv.style.left = tocInfoLeft + "px";
			measureTextWidth(nameDiv,toc.movieProperties.tocProperties.name,maxFieldWidth);
			tocInfoTop += nameDiv.height;
		}
		if(toc.movieProperties.tocProperties.designation != '')
		{
			var designationDiv = document.createElement('div');
			designationDiv.setAttribute('class','tocInfoField');
			infoDiv.appendChild(designationDiv);
			applyFontSettings(designationDiv,toc.movieProperties.tocProperties.designationSettings);
			designationDiv.style.position = 'absolute';
			designationDiv.style.marginTop = tocInfoTop + "px";
			designationDiv.style.left = tocInfoLeft + "px";
			measureTextWidth(designationDiv,toc.movieProperties.tocProperties.designation,maxFieldWidth);
			tocInfoTop += designationDiv.height;
		}
		if(toc.movieProperties.tocProperties.email != '')
		{
			var emailDiv = document.createElement('div');
			emailDiv.setAttribute('class','tocInfoField');
			infoDiv.appendChild(emailDiv);
			applyFontSettings(emailDiv,toc.movieProperties.tocProperties.emailSettings);
			emailDiv.style.position = 'absolute';
			emailDiv.style.marginTop = tocInfoTop + "px";
			emailDiv.style.left = tocInfoLeft + "px";
			measureTextWidth(emailDiv,toc.movieProperties.tocProperties.email,maxFieldWidth);
			tocInfoTop += emailDiv.height;
		}
		if(toc.movieProperties.tocProperties.website != '')
		{
			var webDiv = document.createElement('div');
			webDiv.setAttribute('class','tocInfoField');
			infoDiv.appendChild(webDiv);
			applyFontSettings(webDiv,toc.movieProperties.tocProperties.websiteSettings);
			webDiv.style.position = 'absolute';
			webDiv.style.marginTop = tocInfoTop + "px";
			webDiv.style.left = tocInfoLeft + "px";
			measureTextWidth(webDiv,toc.movieProperties.tocProperties.website,maxFieldWidth);
			tocInfoTop += webDiv.height;
		}
		if(toc.movieProperties.tocProperties.description != '')
		{
			if(tocInfoTop < minMoreInfoTop)
				tocInfoTop = minMoreInfoTop;
			var moreInfoDiv = toc.loadedAssetArr['moreinfo'];
			moreInfoDiv.setAttribute('class','tocMoreInfoField');
			infoDiv.appendChild(moreInfoDiv);
			moreInfoDiv.style.marginTop = tocInfoTop + "px";
			if(toc.movieProperties.tocProperties.position == 1)
				moreInfoDiv.style.left = (this.tocDiv.width  - moreInfoDiv.width - 10) + "px";
			else
				moreInfoDiv.style.left = "10px";
			tocInfoTop += moreInfoDiv.height + 10;
		}		
		if(tocInfoTop < minMoreInfoTop)
			tocInfoTop = minMoreInfoTop + 10;
		if(tocInfoTop)
		{
			infoDiv.style.width = this.tocDiv.width + "px";
			infoDiv.style.height = tocInfoTop + "px";
		}
		else
		{
			this.tocDiv.removeChild(infoDiv);
		}
		
		var tocVideo = cp.movie.vdm.tocVideoChannel;
		if(!tocVideo)
			tocVideo = new cp.NativeVideo('tocVideo');
		tocVideo.style.cssText = 'left:' + ((parseInt(this.tocDiv.style.width) - 192)/2) + 'px;top:0px;width:192px;height:144px;position:relative;display:none';
		this.tocDiv.appendChild(tocVideo);
		
		var headingDiv = document.createElement('div');
		this.tocDiv.appendChild(headingDiv);
		headingDiv.setAttribute('class','tocHeadingStyle');
		headingDiv.style.width = this.tocDiv.style.width ;
		headingDiv.width = this.tocDiv.width ;
		headingDiv.height = parseFloat(window.getComputedStyle(headingDiv).height.replace('px',''));
		this.headingCanvas = this.createCanvas(headingDiv,toc.movieProperties.tocProperties.headingColor,false,0,-2,0,4);
		headingDiv.style.backgroundImage = 'url("' + this.headingCanvas +'")';
		headingDiv.style.backgroundSize = '100% 100%';
			
		var bookmarkHeading = document.createElement('img');
		bookmarkHeading.title = toc.movieProperties.tocProperties.bookmark;
		bookmarkHeading.src = './assets/toc/tocIcons/fullBookmark.png';
		headingDiv.appendChild(bookmarkHeading);
		bookmarkHeading.setAttribute('class','tocBookmarkHeadingStyle');
		
		var slideTitleHeading = document.createElement('div');
		slideTitleHeading.setAttribute('class','tocSlideTitleHeading');
		headingDiv.appendChild(slideTitleHeading);
		measureTextWidth(slideTitleHeading,toc.movieProperties.tocProperties.slideTitle); 
		slideTitleHeading.style.color = toc.movieProperties.tocProperties.headingTextColor;
		slideTitleHeading.tabIndex = 0;
		if(toc.movieProperties.tocProperties.showDuration)
		{
			var durationHeading = document.createElement('div');
			durationHeading.setAttribute('class','tocDurationHeading');
			durationHeading.id = 'tocDurationHeading';
			headingDiv.appendChild(durationHeading);
			measureTextWidth(durationHeading,toc.movieProperties.tocProperties.duration); 
			durationHeading.style.color = toc.movieProperties.tocProperties.headingTextColor;
            durationHeading.tabIndex = 0;
			if(toc.movieProperties.tocProperties.statusFlag)
				durationHeading.style.right = (parseFloat(window.getComputedStyle(durationHeading).right.replace('px','')) + 25) + 'px';
		}
		
		var content = document.createElement('div');
		content.id = 'tocContent';
		content.setAttribute('class','tocContentStyle');
		this.tocDiv.appendChild(content);
		content.style.width = this.tocDiv.width;
		this.contentDiv = content;
	
		var footerDiv = document.createElement('div');
		this.tocDiv.appendChild(footerDiv);
		footerDiv.setAttribute('class','tocFooterStyle');
		footerDiv.style.width = this.tocDiv.style.width ;
		footerDiv.width = this.tocDiv.width ;
		footerDiv.height = parseFloat(window.getComputedStyle(footerDiv).height.replace('px',''));
		footerDiv.style.top = (this.tocDiv.height - footerDiv.height) + "px";
		footerDiv.style.backgroundImage = 'url("' +  this.createCanvas(footerDiv,toc.movieProperties.tocProperties.headingColor,false,0,-2,0,2) +'")';
		footerDiv.style.backgroundSize = '100% 100%';
		
		if(toc.movieProperties.tocProperties.showTotalD)
		{
		var footerText = document.createElement('canvas');
		footerText.id = 'tocFooterText';
		footerText.setAttribute('class','tocFooterText');
		footerDiv.appendChild(footerText);
		footerText.width = parseFloat(window.getComputedStyle(footerText).width.replace('px',''));
		footerText.height = parseFloat(window.getComputedStyle(footerText).height.replace('px',''));
		footerText.updateTime = this.drawFooterText;
		footerText.updateTime(1);
		}
		
		if(toc.movieProperties.tocProperties.showClear)
		{
			var  clearBtn = document.createElement('img');
			clearBtn.src = './assets/toc/tocIcons/clear.png';
			clearBtn.setAttribute('class','tocClearBtn');
			footerDiv.appendChild(clearBtn);
			clearBtn.onclick = this.clearBtnClick;
			clearBtn.parentObj = this;
			clearBtn.title = toc.movieProperties.tocProperties.clear;
		}
		
		var cheight = (this.tocDiv.height - headingDiv.height - footerDiv.height - title.height - tocInfoTop);
		content.style.height = cheight + "px";
		if(toc.movieProperties.tocProperties.showSearch)
		{
			var nosearchDiv = document.createElement('div');
			nosearchDiv.id = 'tocNoSearch';
			nosearchDiv.setAttribute('class','tocNoSearch');
			content.appendChild(nosearchDiv);
			nosearchDiv.style.fontFamily = 'Verdana';
			nosearchDiv.style.fontSize = '14px';
			measureTextWidth(nosearchDiv,toc.movieProperties.tocProperties.noSearchText);
			nosearchDiv.style.width = nosearchDiv.textWidth + "px";
			nosearchDiv.style.marginLeft = (this.tocDiv.width - nosearchDiv.textWidth)/2 + "px";
			nosearchDiv.style.display = 'none';
			var srchBar = document.getElementById('tocSearchBar');
			var srchBarHt = parseFloat(window.getComputedStyle(srchBar).height);
			nosearchDiv.style.marginTop = (cheight - srchBarHt - nosearchDiv.height)/2 + "px";
			nosearchDiv.onmouseover = 'this.style.mouse = \'default\';';
		}
		if(!toc.movieProperties.tocProperties.statusFlag)
			toc.statusWidth = 0;
		this.createTOCEntries(content);
		if(toc.movieProperties.tocProperties.description != '')
		{
			var infoWindow = document.createElement('div');
			this.tocDiv.parentElement.appendChild(infoWindow);
			infoWindow.setAttribute('class','tocInfoWindow');
			infoWindow.style.left = parseFloat(window.getComputedStyle(this.tocDiv).left.replace('px','')) + (toc.movieProperties.tocProperties.position == 1 ? (parseFloat(window.getComputedStyle(this.tocDiv).width.replace('px','')) +1) : (-parseFloat(window.getComputedStyle(infoWindow).width.replace('px',''))) - 1) + "px";
			infoWindow.style.top = parseFloat(window.getComputedStyle(infoWindow).top.replace('px','')) + parseFloat(window.getComputedStyle(this.tocDiv).top.replace('px','')) + "px";
			var infoheaderDiv = document.createElement('div');
			infoWindow.appendChild(infoheaderDiv);
			infoheaderDiv.setAttribute('class','tocInfoHeader');		
			infoheaderDiv.width = parseFloat(window.getComputedStyle(infoheaderDiv).width.replace('px',''));
			infoheaderDiv.height = parseFloat(window.getComputedStyle(infoheaderDiv).height.replace('px',''));			
			infoheaderDiv.style.backgroundImage = 'url("' + this.createCanvas(infoheaderDiv,toc.movieProperties.tocProperties.headingColor,false,0,0,0,2) +'")';
			infoheaderDiv.style.backgroundSize = '100% 100%';
			
			var infoCloseBtn = document.createElement('canvas');
			infoheaderDiv.appendChild(infoCloseBtn);
			infoCloseBtn.setAttribute('class','tocInfoClose');
			infoCloseBtn.width = infoCloseBtn.clientWidth;
			infoCloseBtn.height = infoCloseBtn.clientHeight;
			var evt = new Object();
			evt.target = infoCloseBtn;
			evt.type = '';
			infoCloseBtn.onclick = function()
			{
				infoWindow.style.visibility = 'hidden';
			};
			infoCloseBtn.parentObj = this;
			if(cp.device == cp.IDEVICE)
			{
				infoCloseBtn.ontouchstart = this.infoCloseBtnDraw;
				infoCloseBtn.ontouchend = this.infoCloseBtnDraw;
			}
			else
			{
				infoCloseBtn.onmouseover = this.infoCloseBtnDraw;
				infoCloseBtn.onmouseout = this.infoCloseBtnDraw;
			}
			this.infoCloseBtnDraw(evt);
			
			var infoBodyDiv = document.createElement('div');
			infoWindow.appendChild(infoBodyDiv);
			infoBodyDiv.setAttribute('class','tocInfoBody');		
			infoBodyDiv.style.backgroundImage = 'url("' + this.bkCanvas +'")';
			infoBodyDiv.style.backgroundSize = '100% 100%';
			applyFontSettings(infoBodyDiv,toc.movieProperties.tocProperties.descriptionSettings);
			infoBodyDiv.style.top = infoheaderDiv.height + "px";
			infoBodyDiv.style.height = (infoWindow.clientHeight - infoheaderDiv.clientHeight) + "px";
			infoBodyDiv.innerHTML = toc.movieProperties.tocProperties.description;
			
			infoWindow.style.visibility = 'hidden';
			moreInfoDiv.parentObj = this;
			moreInfoDiv.onclick = function()
			{
				if(infoWindow.style.visibility == 'hidden')
				{
					infoWindow.style.visibility = '';
					infoWindow.style.left = parseFloat(window.getComputedStyle(this.parentObj.tocDiv).left.replace('px','')) + (toc.movieProperties.tocProperties.position == 1 ? (parseFloat(window.getComputedStyle(this.parentObj.tocDiv).width.replace('px','')) +1) : (-parseFloat(window.getComputedStyle(infoWindow).width.replace('px',''))) - 1) + "px";
				}
				else
					infoWindow.style.visibility = 'hidden';
			};
			infoWindow.style.opacity = toc.movieProperties.tocProperties.alpha/100 + '';
		}
		if(toc.movieProperties.tocProperties.overlay)
		{
			var expandDiv = toc.loadedAssetArr['expandIcon'];
			document.getElementById('project_container').appendChild(expandDiv);
			expandDiv.setAttribute('class','tocExpandCollapse');
			var lWidth = toc.loadedAssetArr['expandIcon'].width;
			var lHeight = toc.loadedAssetArr['expandIcon'].height;
			lHeight = (16 * lHeight)/lWidth;
			if ( cp.device == cp.IDEVICE ) {
				lWidth *= 2;
				lHeight *= 2;
			}
			if ( cp.device == cp.IDEVICE )
				toc.loadedAssetArr['expandIcon'].style.width = "32px";
			else
				toc.loadedAssetArr['expandIcon'].style.width = "16px";
			toc.loadedAssetArr['expandIcon'].style.height = lHeight +"px";			
			if ( cp.device == cp.IDEVICE )
				expandDiv.style.left = (toc.movieProperties.tocProperties.position == 1 ? 
								toc.leftOffset : (parseFloat(window.getComputedStyle(this.tocDiv).left.replace('px','')) -32)) + "px";
			else
				expandDiv.style.left = (toc.movieProperties.tocProperties.position == 1 ? 
								toc.leftOffset : (parseFloat(window.getComputedStyle(this.tocDiv).left.replace('px','')) -16)) + "px";
				
			expandDiv.style.top = window.getComputedStyle(this.tocDiv).top;
			
			var collapseDiv = toc.loadedAssetArr['collapseIcon'];
			document.getElementById('project_container').appendChild(collapseDiv);
			collapseDiv.setAttribute('class','tocExpandCollapse');
			lWidth = toc.loadedAssetArr['collapseIcon'].width;
			lHeight = toc.loadedAssetArr['collapseIcon'].height;
			lHeight = (16 * lHeight)/lWidth;
			if ( cp.device == cp.IDEVICE ) {
				lWidth *= 2;
				lHeight *= 2;
			}
			if ( cp.device == cp.IDEVICE )
				toc.loadedAssetArr['collapseIcon'].style.width = "32px";
			else
				toc.loadedAssetArr['collapseIcon'].style.width = "16px";
			toc.loadedAssetArr['collapseIcon'].style.height = lHeight +"px";
			if ( cp.device == cp.IDEVICE )
				collapseDiv.style.left = (toc.movieProperties.tocProperties.position == 1 ? 
									toc.leftOffset : (parseFloat(window.getComputedStyle(this.tocDiv).left.replace('px','')) -32)) + "px";
			else
				collapseDiv.style.left = (toc.movieProperties.tocProperties.position == 1 ? 
									toc.leftOffset : (parseFloat(window.getComputedStyle(this.tocDiv).left.replace('px','')) -16)) + "px";
			
			collapseDiv.style.top = parseFloat(window.getComputedStyle(this.tocDiv).top.replace('px','')) + "px";
			
			if(toc.movieProperties.tocProperties.position==0)//if right.. interchange expand colapse
			{
				var temp = collapseDiv;
				collapseDiv = expandDiv;
				expandDiv = temp;
			}
			collapseDiv.onclick = this.hideTOC;
			expandDiv.onclick = this.showTOC;
			collapseDiv.style.visibility = 'hidden';
			
			toc.tocAnimator = new toc.tocAnimator(this.tocDiv,expandDiv,collapseDiv);
			toc.tocAnimator.init();
		}
		this.tocDiv.style.opacity = toc.movieProperties.tocProperties.alpha/100 + '';
	},
	showTOC : function()
	{
		toc.tocAnimator.showTOC();
	},
	hideTOC : function()
	{
		toc.tocAnimator.hideTOC();
	},
	listenToSlideEnter : function(args)
	{
		if(toc.rootObj.curActiveEntry)
			toc.rootObj.curActiveEntry.setActive(false);
		toc.rootObj.curActiveEntry = args.cpData.tocEntry;
		if(args.cpData.tocEntry)
			args.cpData.tocEntry.setActive(true);
	},
	listenToSlideExit : function(args)
	{
		if(toc.rootObj.curActiveEntry)
			toc.rootObj.curActiveEntry.setActive(false);
		toc.rootObj.curActiveEntry = null;
		if(args.cpData.tocEntry && args.cpData.tocEntry.lastlink == args.cpData)
			args.cpData.tocEntry.setVisited();
	},
	tocAssetsLoaded : function()
	{
		toc.assetsLoaded++;
		if(toc.assetsLoaded == toc.tocAssetArr.length)
		{
			this.parentObj.createTOC();
		}
	},
	loadTOCAssets : function()
	{
		if(toc.movieProperties.tocProperties.hasPhoto)
			toc.tocAssetArr.push('photo');
		for(var i=0; i< toc.tocAssetArr.length; ++i)
		{
			var img = new Image();
			img.assetName = toc.tocAssetArr[i];
			img.parentObj = this;
			toc.loadedAssetArr[toc.tocAssetArr[i]] = img;
			img.onload=this.tocAssetsLoaded;
			img.onerror=this.tocAssetsLoaded;
			img.src = toc.tocIconsFolder + toc.tocAssetArr[i] + toc.PNGSuffix;
		}
	},
	showVideo : function(show)
	{
		var video = document.getElementById('tocVideo');
		if((video.style.display != 'none' && show) || (video.style.display == 'none' && !show))
			return;
			
		var videoHt = parseFloat(window.getComputedStyle(video).height);

		if(show)
		{
			video.style.display = 'block';
			videoHt = -videoHt;
		}
		else
			video.style.display = 'none';

		var content = document.getElementById('tocContent');
		content.style.height = (parseFloat(window.getComputedStyle(content).height) + videoHt) + "px";
	}
};
toc.tocAnimator = function(tocDiv,expandDiv,collapseDiv)
{
	this.startVal = 0;
	this.endVal = 0;
	this.param = 'left';
	this.tocDiv = tocDiv;
	this.expandDiv = expandDiv;
	this.collapseDiv = collapseDiv;
	this.totalSteps = 25;
	this.currStep = 0;
	this.direction = 0;
	this.intervalId = -1;
	this.isAnimating = false;
};
toc.tocAnimator.prototype = 
{
	init : function()
	{
		if(toc.movieProperties.tocProperties.position == 0)
		{
			this.startVal = parseFloat(window.getComputedStyle(this.tocDiv)['left'].replace('px',''));
			this.endVal = this.startVal - this.tocDiv.width;
		}
		else
		{
			this.startVal = parseFloat(window.getComputedStyle(this.tocDiv)['left'].replace('px',''));
			this.endVal = this.startVal + this.tocDiv.width;		
		}
		this.tocDiv.animator = this;
	},
	easeOut : function(minValue,maxValue) 
	{ 
		var delta = maxValue - minValue; 
		var stepp = minValue+(Math.pow(((1 / this.totalSteps) * this.currStep), 0.3) * delta); 
		return Math.ceil(stepp);
    }, 
	beginAnim : function()
	{
		var objDiv = document.getElementById('toc');
		if(objDiv==null)
			return;
		var animator = objDiv.animator;
		if(animator.direction)
		{
			animator.currStep++;
			if (animator.currStep >= animator.totalSteps)
			{
				clearInterval(animator.intervalId);
				animator.currStep = 0;
				animator.isAnimating = false;
				objDiv.style[animator.param] = animator.endVal + "px"; 
				objDiv.otherObj.style[animator.param] = animator.endVal + objDiv.otherparam + "px";
				return;
			}
			if(((cp.CHROME == cp.browser) || (cp.SAFARI == cp.browser) || (cp.device == cp.IDEVICE)) &&  (objDiv.style.webkitTransform != undefined))
			{
				objDiv.style['webkitTransform'] = "translateX(0px)";			
				objDiv.otherObj.style['webkitTransform'] = "translateX(0px)";
			}
			var val = animator.easeOut(animator.startVal,animator.endVal);
			objDiv.style[animator.param] = val + "px";
			objDiv.otherObj.style[animator.param] = val + objDiv.otherparam + "px";
		}
		else
		{
			animator.currStep++;
			if (animator.currStep >= animator.totalSteps)
			{
				clearInterval(animator.intervalId);
				animator.currStep = 0;
				animator.isAnimating = false;
				objDiv.style[animator.param] = animator.startVal + "px"; 
				objDiv.otherObj.style[animator.param] = animator.startVal + objDiv.otherparam + "px";
				return;
			}
			if(((cp.CHROME == cp.browser) || (cp.SAFARI == cp.browser) || (cp.device == cp.IDEVICE)) &&  (objDiv.style.webkitTransform != undefined))
			{
				objDiv.style['webkitTransform'] = "translateX(0px)";	
				objDiv.otherObj.style['webkitTransform'] = "translateX(0px)";
			}
			var val = animator.easeOut(animator.endVal,animator.startVal);
			objDiv.style[animator.param] = val + "px";
			objDiv.otherObj.style[animator.param] = val + objDiv.otherparam + "px";
		}		
		 
	},
	hideTOC : function()
	{
		if(this.isAnimating && this.direction == 0 )
				return;
		else if(parseFloat(window.getComputedStyle(this.tocDiv)[this.param].replace('px','')) == this.startVal)
				return;
		this.collapseDiv.style.visibility = 'hidden';
		this.direction = 0;
		if(toc.movieProperties.tocProperties.position == 0)
			this.tocDiv.otherparam = -this.expandDiv.width;
		else
			this.tocDiv.otherparam = this.tocDiv.width;
		this.expandDiv.style.left = this.endVal + this.tocDiv.otherparam + "px";
		this.expandDiv.style.visibility = '';
		this.tocDiv.otherObj = this.expandDiv;
		this.isAnimating = true;
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.beginAnim,20);
	},
	showTOC : function(atEnd)
	{
		if(this.isAnimating && this.direction == 1 )
				return;
		else if(parseFloat(window.getComputedStyle(this.tocDiv)[this.param].replace('px','')) == this.endVal)
				return;
		this.expandDiv.style.visibility = 'hidden';
		this.direction = 1;
		if(toc.movieProperties.tocProperties.position == 0)
			this.tocDiv.otherparam = -this.collapseDiv.width;
		else
			this.tocDiv.otherparam = this.tocDiv.width;
		this.collapseDiv.style.left = this.startVal + this.tocDiv.otherparam + "px";
		this.collapseDiv.style.visibility = '';
		this.tocDiv.otherObj = this.collapseDiv;
		this.isAnimating = true;
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.beginAnim,20);
	}
};
function loadtoc()
{
	var tocDiv = document.getElementById('toc');
	(toc.movieProperties.tocProperties.position == 1) ? tocDiv.setAttribute('class','tocLeftStyle') : tocDiv.setAttribute('class','tocRightStyle');	
	toc.rootObj.loadTOCAssets();	
};
function RegisterTOCToEvents()
{
	if(toc.eventManager&&toc.rootObj)
	{
		toc.eventManager.addEventListener( toc.rootObj.listenToSlideEnter,cp.SLIDEENTEREVENT);
		toc.eventManager.addEventListener( toc.rootObj.listenToSlideExit,cp.SLIDEEXITEVENT);
	}
};
function tocInit(movieProperties,leftOffset,topOffset,rightOffset,bottomOffset)
{
	toc.movieProperties = movieProperties;
	
	var tocDiv = document.getElementById('toc');
	if(!toc.movieProperties.project.hasTOC)
	{
		tocDiv.style.display = 'none';
		return;
	}	
	toc.rootObj = new toc.tocConstruct(tocDiv);
	toc.tocPersistanceManager = new toc.PersistanceManager();
	var hasData = toc.tocPersistanceManager.hasData();
	if(hasData == 1)
	{
		var lRunTimeMsgBox = cp.ShowWarning(toc.movieProperties.tocProperties.cnfmsg,cp.model.data['rtDialog']['rtWarningTitle'],true,true);
		lRunTimeMsgBox.setDontAskMe(true);
		lRunTimeMsgBox.setDontAskMeText(toc.movieProperties.tocProperties.dntask);
		var lOkHandler = function()
		{			
			toc.tocPersistanceManager.readData();
			if(lRunTimeMsgBox.getDontAskMeInput())
			{
				toc.tocPersistanceManager.setDontWrite(2);
				toc.tocPersistanceManager.flushData();
			}
			else
				toc.tocPersistanceManager.setDontWrite(1);
			lRunTimeMsgBox.hide();			
			continueTOCInit(leftOffset,topOffset,rightOffset,bottomOffset);
		}
		var lCancelHandler = function()
		{
			if(lRunTimeMsgBox.getDontAskMeInput())
			{
				toc.tocPersistanceManager.setDontWrite(0);
				toc.tocPersistanceManager.flushData();
			}
			else
				toc.tocPersistanceManager.setDontWrite(1);
			lRunTimeMsgBox.hide();
			continueTOCInit(leftOffset,topOffset,rightOffset,bottomOffset);
		}
		lRunTimeMsgBox.registerFirstButtonHandler(lOkHandler);	
		lRunTimeMsgBox.registerSecondButtonHandler(lCancelHandler);	
		lRunTimeMsgBox.show();
	}
	else if(hasData == 2)
	{
		toc.tocPersistanceManager.readData();
		continueTOCInit(leftOffset,topOffset,rightOffset,bottomOffset);
	}
	else
		continueTOCInit(leftOffset,topOffset,rightOffset,bottomOffset);
};
function continueTOCInit(leftOffset,topOffset,rightOffset,bottomOffset)
{
	var tocDiv = document.getElementById('toc');
	window.onclose = toc.tocPersistanceManager.flushData;
	document.onunload = toc.tocPersistanceManager.flushData;
	RegisterTOCToEvents();
	tocDiv.width = toc.movieProperties.tocProperties.width;
	tocDiv.height = toc.movieProperties.project.h;
	if(toc.movieProperties.tocProperties.stretch)
	{
		tocDiv.height += topOffset + bottomOffset;
		topOffset = 0;
	}	
	tocDiv.style.width = tocDiv.width + "px";
	tocDiv.style.height = tocDiv.height + "px";
	var left = ((toc.movieProperties.tocProperties.position == 1) ? 
						(toc.movieProperties.tocProperties.overlay ? -tocDiv.width : 0) + leftOffset :
						toc.movieProperties.project.w ) ;
	toc.leftOffset = leftOffset;
	tocDiv.style.left = left + "px";
						 
	tocDiv.style.top = topOffset + "px";
	loadtoc();
}
function setTOCCallback(movie,em)
{
	toc.mainMovie = movie;
	toc.eventManager = em;
	RegisterTOCToEvents();
}
function getStartFrameOfMovie()
{
	if(toc.movieProperties.tocProperties.hasSelfPaced)
	{
		if(toc.tocPersistanceManager.lastVisitedEntry!=-1)
		{
			if(toc.movieProperties['Slide'+toc.rootObj.tocEntries[toc.tocPersistanceManager.lastVisitedEntry].link])
				return toc.movieProperties['Slide'+toc.rootObj.tocEntries[toc.tocPersistanceManager.lastVisitedEntry].link].from;
		}
	}
	return 1;
}