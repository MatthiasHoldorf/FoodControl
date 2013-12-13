// JavaScript Document
// masking support  - http://www.rekim.com/2011/02/11/html5-canvas-globalcompositeoperation-browser-handling/
window.playbar = function(str)
{
	return document.getElementById(str);
};
playbar.kLargeBtn = 0;
playbar.kSmallBtn = 1;
playbar.kBtnMargin = 2;
playbar.kIndentMargin = 8;
playbar.movieProperties = null;
playbar.assetsLoaded = 0;
playbar.isVertical = false;
playbar.numBtns = 0;
playbar.playBarDim = 0;
playbar.mainMovie = null;
playbar.playBarOtherDim = 0;
playbar.playbarHasLogo = false;
playbar.playbarHasInfo = false;
playbar.playbarHasPrint = false;
playbar.loadedAssetArr = new Object();
playbar.playBarIconsFolder = "./assets/playbar/PlaybarIcons/";
playbar.PNGSuffix = ".png";
playbar.btnSizeMap = new Object();
playbar.btnSizeMap['AudioOff'] = playbar.kSmallBtn;
playbar.btnSizeMap['AudioOn'] = playbar.kSmallBtn;
playbar.btnSizeMap['Backward'] = playbar.kSmallBtn;
playbar.btnSizeMap['CC'] = playbar.kSmallBtn;
playbar.btnSizeMap['Exit'] = playbar.kSmallBtn;
playbar.btnSizeMap['FastForward'] = playbar.kSmallBtn;
playbar.btnSizeMap['FastForward1'] = playbar.kSmallBtn;
playbar.btnSizeMap['FastForward2'] = playbar.kSmallBtn;
playbar.btnSizeMap['Forward'] = playbar.kSmallBtn;
playbar.btnSizeMap['Play'] = playbar.kLargeBtn;
playbar.btnSizeMap['Pause'] = playbar.kLargeBtn;
playbar.btnSizeMap['Rewind'] = playbar.kSmallBtn;
playbar.btnSizeMap['TOC'] = playbar.kSmallBtn;
playbar.btnSizeMap['Info'] = playbar.kSmallBtn;
playbar.btnSizeMap['Print'] = playbar.kSmallBtn;
playbar.playBarHeight = 0;
playbar.playBarCSSLoaded = false;
playbar.toolTips = new Object();
playbar.toolTips['Rewind'] = ["Rewind ","倒帶 ","Rembobiner ","Zurückspulen ","Riavvolgi ","巻き戻し ","Rebobinar ","되감기 " ];
playbar.toolTips['Backward'] = ["Back ","後退 ","Retour ","Zurück ","Indietro ","戻る ","Atrás ","뒤로 "];
playbar.toolTips['Play'] = ["Play ","播放 ","Lire ","Abspielen ","Esegui ","再生 ","Reproducir ","재생 "];
playbar.toolTips['Pause'] = ["Pause ","暫停 ","Pause ","Anhalten ","Pausa ","一時停止 ","Pausa ","일시 중지 "];
playbar.toolTips['Forward'] = ["Forward ","前進 ","Avancer ","Weiter ","Avanti ","進む ","Adelante ","앞으로 "];
playbar.toolTips['CC'] = ["Closed Captioning ","隱藏式字幕 ","Sous-titrage ","Bilduntertitel ","Didascalie ","クローズドキャプション ","Subtítulos opcionales ","폐쇄 캡션 "];
playbar.toolTips['AudioOn'] = ["Audio On ","開啟音訊 ","Audio activé ","Audio an ","Audio acceso ","音声 オン ","Audio act.","오디오 켜기 "];
playbar.toolTips['AudioOff'] = ["Audio Off ","關閉音訊 ","Audio désactivé ","Audio aus ","Audio spento ","音声 オフ ","Audio desact. ","오디오 끄기 "];
playbar.toolTips['Exit'] = ["Exit ","結束 ","Quitter ","Beenden ","Esci ","閉じる ","Salir ","끝내기 "];
playbar.toolTips['Info'] = ["Information ","資訊 ","Informations ","Informationen ","Informazioni ","情報 ","Información ","정보 "];
playbar.toolTips['TOC'] = ["Table of Contents ","目錄 ","Table des matières ","Inhaltsverzeichnis ","Sommario ","目次 ","Contenido ","목차 "];
playbar.toolTips['FastForward'] = ["2x Fast Forward Speed ","2 倍速快轉 ","Vitesse d'avance rapide x2 ","Zweifache Vorspulgeschwindigkeit ","Velocità avanzamento rapido 2x ","2 倍速 ","Velocidad de avance rápido 2x ","2배속 빨리 감기 "];
playbar.toolTips['FastForward1'] = ["4x Fast Forward Speed ","4 倍速快轉 ","Vitesse d'avance rapide x4 ","Vierfache Vorspulgeschwindigkeit ","Velocità avanzamento rapido 4x ","4 倍速 ","Velocidad de avance rápido 4x ","4배속 빨리 감기 ",];
playbar.toolTips['FastForward2'] = ["Normal Speed ","正常速度 ","Vitesse normale ","Normale Geschwindigkeit ","Velocità normale ","標準速度 ", "Velocidad normal ", "일반 속도 "];
playbar.toolTips['Print'] = ["Print","列印 ","Imprimer ","Drucken ","Stampa ","印刷 ","Imprimir ","인쇄 "];
playbar.toolTipLocaleIndex = 0;
function applyTransform(element,matrixStr)
{
	element.style['transform']  = matrixStr;
	element.style['msTransform'] = matrixStr;
	element.style['MozTransform'] =  matrixStr;
	element.style['WebkitTransform']  = matrixStr;
	element.style['OTransform'] = matrixStr;
};
function getRGBA(color,alpha)
{
	return 'rgba(' + 	
	parseInt(color.substring(1,3),16) + 
	' , ' +
	parseInt(color.substring(3,5),16) + 
	' , ' + 
	parseInt(color.substring(5,7),16) + 
	' , '+
	alpha + ' )';
}
function localizeToolTips(str)
{
	if(playbar.toolTips[str][playbar.toolTipLocaleIndex])
		return playbar.toolTips[str][playbar.toolTipLocaleIndex];
	else if(playbarTooltips[str])
		return playbarTooltips[str];
	else
		return str;
}
playbar.PlayBarButton = function(iconName,parent,clickHandler)
{
	this.SmallSuffix = "Small";
    this.isSmall = playbar.btnSizeMap[iconName];
	this.iconName = iconName;
    this.playBarDiv = parent;
    this.currDiv = document.createElement('canvas');
	this.currDiv.parentObj = this;
	this.playBarDiv.appendChild(this.currDiv);
	this.currDiv.setAttribute('class', this.isSmall ? 'playbarSmallButton' : 'playbarBigButton');
	this.currDiv.width = this.currDiv.clientWidth;
	this.currDiv.height = this.currDiv.clientHeight;
	this.ctx = this.currDiv.getContext("2d");
	this.currDiv.imgElemArray = new Array();
	this.currDiv.toggleimgElemArray = new Array();
	if(!playbar.movieProperties.playBarProperties.noToolTips)
		this.currDiv.title = this.iconName;
	else
		this.currDiv.title = '';
	this.currDiv.curIcon = 0;
	
    this.currDiv.tabIndex = 0;
	this.currDiv.setAttribute('role', 'button');

	this.clickHandler = clickHandler;
	if(playbar.movieProperties.playBarProperties.tworow == 0)
		this.currDiv.style.marginTop = (this.playBarDiv.height - this.currDiv.height)/2 + "px";
	else
		this.currDiv.style.marginTop = "0px";
	this.currDiv.style.marginLeft =  "0px";
};
playbar.PlayBarButton.prototype = 
{
    setImage : function(imgName)
    {
        var img = playbar.loadedAssetArr[imgName + (this.isSmall ? this.SmallSuffix : "")];
		if(img == undefined)
			return;
		img.isGlow = (imgName == 'Glow');
		img.showImage = true;
		img.imageName = imgName + (this.isSmall ? this.SmallSuffix : "");
		this.currDiv.imgElemArray[this.currDiv.imgElemArray.length] = img;
    },
	getWidth : function()
	{
		return this.currDiv.clientWidth;
	},
	destroy : function()
	{
		this.playBarDiv.removeChild(this.currDiv);
	},
	setPosNWidth : function(left,top,width)
	{
		this.currDiv['onclick'] = this.onClick;
        this.currDiv['onkeydown'] = this.onKeyDown;
		var curleft = parseFloat(window.getComputedStyle(this.currDiv).marginLeft.replace('px',''));
		this.currDiv.style.marginLeft =  curleft + left + "px";
		var curtop = parseFloat(window.getComputedStyle(this.currDiv).marginTop.replace('px',''));
		this.currDiv.style.marginTop =  curtop + top + "px";
		this.refresh();
		return playbar.kBtnMargin;
	},
	setIcon : function(imgName)
    {
        var img = playbar.loadedAssetArr[imgName];
		img.parentElem = this.currDiv;
		img.isGlow = false;
		img.imageName = imgName;
		var matrixStr = 'matrix(0,1,-1,0,0,0)';
		if(playbar.isVertical)
			applyTransform(img,matrixStr);
		this.currDiv.toggleimgElemArray[this.currDiv.toggleimgElemArray.length] = img;
		if(!playbar.movieProperties.playBarProperties.noToolTips)
			this.currDiv.title = localizeToolTips(this.currDiv.toggleimgElemArray[this.currDiv.curIcon].imageName);
		else
			this.currDiv.title = '';
    },
    onClick: function (event) {
        this.parentObj.toggleImage(event);
        if (this.parentObj.clickHandler != undefined)
            this.parentObj.clickHandler();
    },
    onKeyDown: function (event) {
        var code;

        //find the keycode
        if (event.keyCode)
            code = event.keyCode;
        else if (event.which)
            code = event.which;

        //now handle the space bar and return keys
        if (code == 32) {
		
		if(this.parentObj.clickHandler!=undefined)
			this.parentObj.clickHandler();
        }
	},
	toggleImage : function(event)
	{
		var currDiv = this.currDiv;
		if(currDiv == null)
			currDiv = this;
		currDiv.curIcon = (currDiv.curIcon + 1)%currDiv.toggleimgElemArray.length;
		if(!playbar.movieProperties.playBarProperties.noToolTips)
			currDiv.title = localizeToolTips(currDiv.toggleimgElemArray[currDiv.curIcon].imageName);
		else
			currDiv.title = '';
		currDiv.parentObj.onMouseOver(event);
	},
	changeImage : function(name)
	{
		var currDiv = this.currDiv;
		if(currDiv == null)
			currDiv = this;
		for(var i=0; i< currDiv.toggleimgElemArray.length; ++ i)
		{
			if(name == currDiv.toggleimgElemArray[i].imageName)
			{
				if(i== currDiv.curIcon)
					return;
				currDiv.curIcon = i;
				currDiv.title = localizeToolTips(currDiv.toggleimgElemArray[currDiv.curIcon].imageName);
			}
		}
		if(currDiv['rollover'])
			currDiv.parentObj.onMouseOver(null);
		else
			currDiv.parentObj.onMouseOut(null);
	},
	refresh : function()
	{
		this.onMouseOut(null);
	},
	onMouseOver : function(event)
	{
		var ctx = this.ctx;
		var currDiv = this.currDiv;
		if(currDiv == null)
			currDiv = this;
		if(ctx == null)
			ctx = this.getContext("2d");
		currDiv['rollover'] = true;
		var img;
		ctx.clearRect(0,0,currDiv.clientWidth,currDiv.clientHeight);
	   for (var i=0; i<currDiv.imgElemArray.length; ++i)
       {
			img = currDiv.imgElemArray[i];
			ctx.drawImage(img,(currDiv.clientWidth-img.width)/2,(currDiv.clientHeight-img.height)/2);                       
       }
	   img = currDiv.toggleimgElemArray[currDiv.curIcon];
	   var x = currDiv.clientWidth / 2;
	   var y = currDiv.clientHeight / 2;
	   var width = img.width;
	   var height = img.height;
	   ctx.translate(x, y);
	   ctx.rotate(Math.PI/180 * (playbar.isVertical ? -90 : 0));
	   ctx.drawImage(img, -width / 2, -height / 2, width, height);
	   ctx.rotate(Math.PI/180 * (playbar.isVertical ? 90 : 0));
	   ctx.translate(-x, -y);
	},
	onMouseOut : function(event)
	{
	   var ctx = this.ctx;
		var currDiv = this.currDiv;
		if(currDiv == null)
			currDiv = this;
		if(ctx == null)
			ctx = this.getContext("2d")
		currDiv['rollover'] = false;
		ctx.clearRect(0,0,currDiv.clientWidth,currDiv.clientHeight);
	   for (var i=0; i<currDiv.imgElemArray.length; ++i)
       {
			var img = currDiv.imgElemArray[i];
            if(img.isGlow)
                continue;
            ctx.drawImage(img,(currDiv.clientWidth-img.width)/2,(currDiv.clientHeight-img.height)/2);                       
       }
	   img = currDiv.toggleimgElemArray[currDiv.curIcon];
	   var x = currDiv.clientWidth / 2;
	   var y = currDiv.clientHeight / 2;
	   var width = img.width;
	   var height = img.height;
	   ctx.translate(x, y);
	   ctx.rotate(Math.PI/180 * (playbar.isVertical ? -90 : 0));
	   ctx.drawImage(img, -width / 2, -height / 2, width, height);
	   ctx.rotate(Math.PI/180 * (playbar.isVertical ? 90 : 0));
	   ctx.translate(-x, -y);
	}
};

playbar.PlayBarSlider = function(parent)
{
	this.thumbBase = 'ThumbBase';
	this.progress = 'Progress';
	this.thumb = 'Thumb';
    this.playBarDiv = parent;
    this.currDiv = document.createElement('div');
	this.currDiv.setAttribute('class', 'playbarSlider');
	this.playBarDiv.appendChild(this.currDiv);
	this.currDiv.border = "0px";
	this.currDiv.margin = "0px";
	this.currDiv.padding = "0px";
    
	this.currDiv.tabIndex = 0;
	this.currDiv.setAttribute('role', 'slider');
	
	this.progressDiv = document.createElement('canvas');
	this.currDiv.appendChild(this.progressDiv);
	this.currDiv['progressDiv'] = this.progressDiv;
	this.progressDiv.id = "playbarSlider";
	this.thumbimg = playbar.loadedAssetArr[this.thumb];
	this.thumbDiv = document.createElement('div');
	
	this.thumbDiv.setAttribute('class', 'playbarSliderThumb');
	this.currDiv.appendChild(this.thumbDiv);
	this.thumbDiv.style.width = this.thumbimg.width + "px";
	this.thumbDiv.style.height = this.thumbimg.height + "px";
	//this.thumbimg.style['float'] = 'left';
	this.thumbimg.style['display'] = 'block';
	this.thumbDiv.appendChild(this.thumbimg);
	this.thumbDiv.width = this.thumbimg.width;
	this.thumbDiv.height = this.thumbimg.height;
	this.progressDiv.thumbDiv = this.thumbDiv;
	this.thumbDiv.progressDiv = this.progressDiv;
	this.thumbDiv.id = 'playbarSliderThumb';
	this.currDiv.style.marginLeft =  "0px";
	if(this.currDiv.style.marginTop == "")
		this.currDiv.style.marginTop =  "0px";
	if(playbar.movieProperties.playBarProperties.tworow == 1)
		this.currDiv.height = this.playBarDiv.height/2;
	else
		this.currDiv.height = this.playBarDiv.height;
};
playbar.PlayBarSlider.prototype = 
{
	setPosNWidth : function(left,top,width)
	{
		width -= this.progressDiv.thumbDiv.width;
		this.currDiv.width = width;
		this.currDiv.style.width = width + "px";
		var curleft = parseFloat(window.getComputedStyle(this.currDiv).marginLeft.replace('px',''));
		this.currDiv.style.marginLeft = curleft + left + 2*playbar.kBtnMargin + "px";
		var curtop = parseFloat(window.getComputedStyle(this.currDiv).marginTop.replace('px',''));
		this.currDiv.style.marginTop =  curtop + top + "px";
		this.init();		
		this.refresh();
		this.currDiv.style.display = "inline";
		return 2*playbar.kBtnMargin;
	},
	getWidth : function()
	{
		return this.currDiv.clientWidth + this.progressDiv['thumbDiv'].width;
	},
	destroy : function()
	{
		this.playBarDiv.removeChild(this.currDiv);
	},
    init : function()
    {
		var img = playbar.loadedAssetArr[this.thumbBase];
		this.progressDiv.parentObj = this;
		this.progressDiv['onclick'] = this.moveSlider;
		this.progressDiv['updateSlider'] = this.updateSlider;
		this.progressDiv['thumbBasePattern'] = this.progressDiv.getContext("2d").createPattern(img,"repeat");
		img = playbar.loadedAssetArr[this.progress];
        this.progressDiv['progressPattern'] = this.progressDiv.getContext("2d").createPattern(img,"repeat");
		this.progressDiv.width = this.currDiv.width;
		this.progressDiv.height = img.height;
		this.progressDiv.style.marginTop = "0px";
		this.progressDiv.style.marginLeft =  this.thumbDiv.width/2 + "px";
		this.progressDiv['maxFrameWidth'] = this.progressDiv.width;
		this.progressDiv['maxFrameHeight'] = this.progressDiv.height;
		if(playbar.movieProperties.playBarProperties.tworow == 0)
			this.progressDiv.style.marginTop = (this.playBarDiv.height - this.progressDiv.height)/2  + "px";
		else
		{
			this.progressDiv.style.marginTop = (this.playBarDiv.height/2 - this.progressDiv.height)/2  + "px";
		}
		this.currDiv.width += this.thumbDiv.width;
		this.currDiv.style.width = this.currDiv.width + "px";
		this.currDiv.height = this.playBarDiv.height;
		if(cp.browser != cp.FIREFOX)
		{
			if(cp.device == cp.IDEVICE)
				this.thumbDiv['ontouchstart'] = this.onMouseDown;
			else
				this.thumbDiv['onmousedown'] = this.onMouseDown;
		}
		var top = parseFloat(window.getComputedStyle(this.thumbDiv)['top'].replace('px',''));
		if(playbar.movieProperties.playBarProperties.tworow == 1)
		{
			this.thumbDiv.style.top = top + this.playBarDiv.height/2 + (this.playBarDiv.height/2 - this.progressDiv.height)/2  + "px";
		}
		else
			this.thumbDiv.style.top = top + (this.playBarDiv.height - this.progressDiv.height)/2  + "px";
    },	
	refresh : function()
	{
		this.updateSlider(1);
	},
	onMouseDown : function(event)
	{
		this.underDrag = true;
	    if (cp.em) {
	        cp.em.fireEvent('CPStartPlaybarScrub');
	    }
		this.style.position = 'absolute';
		var self = this; 
		var progDiv = document.getElementById('playbarSliderThumb').progressDiv;
		var prevLen = progDiv.progLen;
		var prevMouseMove = document.onmousemove;
		var prevMouseUp = document.onmouseup;
		if(cp.device == cp.IDEVICE)
		{
			prevMouseMove = document.ontouchmove;
			prevMouseUp = document.ontouchend;
		}
		var pree = event;
		if(cp.device == cp.IDEVICE)
			pree = event.touches[0];
		var curmousemove = function(e) {
		playbarMoved();
		e.stopPropagation();
		var cure = e;
		if(cp.device == cp.IDEVICE)
		{
			cure = e.touches[0];
			e.preventDefault();
		}
	    var diffpos = 0;
		if(playbar.isVertical)
			diffpos = cure.clientY - pree.clientY;
		else
			diffpos = cure.clientX - pree.clientX;
		
		if(diffpos == 0)
			return;
		var pos =  prevLen + diffpos;
		var frame = (pos*playbar.movieProperties.project_main.to)/progDiv.width;
		if(frame < 1)
			frame = 1;
		else if(frame>playbar.movieProperties.project_main.to)
			frame = playbar.movieProperties.project_main.to;
		if(playbar.mainMovie && !playbar.mainMovie.virgin)
		{
			playbar.mainMovie.pause(cp.ReasonForPause.PLAYBAR_ACTION);
			playbar.mainMovie.jumpToFrame(frame);
		}
	  }
	  if(cp.device == cp.IDEVICE)
		document.ontouchmove = curmousemove;
	else
		document.onmousemove = curmousemove;
	 var curmouseup = function() {
		 if(cp.device == cp.IDEVICE)
			{
				document.ontouchmove = prevMouseMove;
				document.ontouchend = prevMouseUp;
			}
		else
			{
				document.onmousemove = prevMouseMove;
				document.onmouseup = prevMouseUp;
            }
				if (cp.em) {
                cp.em.fireEvent('CPEndPlaybarScrub');
				}
	  }
	   if(cp.device == cp.IDEVICE)
			document.ontouchend = curmouseup;
		else
			document.onmouseup = curmouseup;
	},
	moveSlider : function(event)
	{
		playbarMoved();
		var posX = event.offsetX == undefined ? (event.layerX - event.currentTarget.offsetLeft): event.offsetX;
		var frame = (posX*playbar.movieProperties.project_main.to)/this.width;
		if(frame < 1)
			frame = 1;
		else if(frame>playbar.movieProperties.project_main.to)
			frame = playbar.movieProperties.project_main.to;
		if(playbar.mainMovie && !playbar.mainMovie.virgin)
		{
			playbar.mainMovie.pause(cp.ReasonForPause.PLAYBAR_ACTION);
			playbar.mainMovie.jumpToFrame(frame);
		}
			
	},
	updateSlider : function(frame)
	{
		if(frame>playbar.movieProperties.project_main.to)
			frame = playbar.movieProperties.project_main.to;
		var progDiv = this.progressDiv;
		if(progDiv == null)
			progDiv = this;
		var ctx = progDiv.getContext("2d");
		ctx.clearRect(0,0,progDiv.width,progDiv.height);
		ctx.fillStyle = progDiv['thumbBasePattern'];
		ctx.fillRect(0,0,progDiv.width,progDiv.height);
		ctx.fillStyle = progDiv['progressPattern'];
		ctx.fillRect(0,0,(progDiv.width*frame)/playbar.movieProperties.project_main.to,progDiv.height);
		progDiv.progLen = (progDiv.width*frame)/playbar.movieProperties.project_main.to;
	   	progDiv.thumbDiv.style.marginLeft = ( progDiv.progLen )+ "px";
	}
};

playbar.playBarConstruct = function(element)
{
	this.playBarDiv = element;
	this.bkGrndDiv = null;
	this.slider = null;
	this.firstRowArray = new Array();
	this.secondRowArray = new Array();
	this.btnMap = new Object();
	this.minWidth = 0;
	this.firstRowMinWidth = 0;
	this.secondRowMinWidth = 0;
	this.logo = null;
};
playbar.playBarConstruct.prototype = 
{
	createSlider : function(containerArr,curWidth)
	{
		if(playbar.movieProperties.playBarProperties['hasSlider'] == undefined || playbar.movieProperties.playBarProperties['hasSlider'] == 0)
			return 0;
		this.slider = new playbar.PlayBarSlider(this.bkGrndDiv);
		if(this.slider.getWidth() + 4*playbar.kBtnMargin + curWidth + 2*playbar.kIndentMargin> playbar.playBarDim)
		{
			this.slider.destroy();
			this.slider = null;
			return 0;
		}
		containerArr[containerArr.length] = this.slider;
		this.slider.expectedWidth = this.slider.getWidth();
		return this.slider.expectedWidth + 4*playbar.kBtnMargin;
	},
	createBackground: function()
	{
		var bkDiv = document.getElementById('playbarBkGrnd');
		bkDiv.height = bkDiv.clientHeight;
		this.bkGrndDiv = bkDiv;
	},
	setBackGroundWidth : function(bkWidth)
	{
		this.bkGrndDiv.width = bkWidth;
		this.bkGrndDiv.style.width = bkWidth + "px";
		var src = playbar.loadedAssetArr['BackGround'].src;
		if(playbar.movieProperties.playBarProperties.applyColors)
		{
			var colorCanvas = document.createElement('canvas');
			colorCanvas.width = this.bkGrndDiv.width;
			colorCanvas.height = this.bkGrndDiv.height;
			var srccontext = colorCanvas.getContext('2d');
			srccontext.clearRect(0,0,this.bkGrndDiv.width,this.bkGrndDiv.height);
			setFillStrokeStyle( playbar.movieProperties.playBarProperties.BkColor,colorCanvas);
			srccontext.fillRect(0,0,this.bkGrndDiv.width,this.bkGrndDiv.height);
			src = colorCanvas.toDataURL('image/png');
			this.bkGrndDiv.style.backgroundImage = 'url("' + src +'")';
			this.bkGrndDiv.style.backgroundSize = '100% 100%';
		}		
		else
		{
			var bgCanvas = document.createElement('canvas');
			this.bkGrndDiv.insertBefore(bgCanvas,this.bkGrndDiv.firstChild);
			bgCanvas.width = this.bkGrndDiv.width;
			bgCanvas.height = this.bkGrndDiv.height;
			bgCanvas.style.position = "absolute";
			bgCanvas.style.display = "block";
			var srccontext = bgCanvas.getContext('2d');			
			srccontext.clearRect(0,0,this.bkGrndDiv.width,this.bkGrndDiv.height);
			srccontext.globalAlpha = playbar.movieProperties.playBarProperties.alpha/100;
			srccontext.drawImage(playbar.loadedAssetArr['BackGround'],0,0,this.bkGrndDiv.width,this.bkGrndDiv.height);		
			bgCanvas.style.zIndex = -10;
		}
	},
	createButton : function ( btnNameArr , containerArr, clickHandler, curWidth)
	{
		if(btnNameArr[0] != 'Info' && btnNameArr[0] != 'Print')
		{
			if( playbar.movieProperties.playBarProperties['has'+btnNameArr[0]] == undefined || playbar.movieProperties.playBarProperties['has'+btnNameArr[0]] == 0)
				return 0;
		}
		else if((btnNameArr[0] == 'Info' && playbar.playbarHasInfo == false) || (btnNameArr[0] == 'Print' && playbar.playbarHasPrint== false))
			return 0;
		if(playbar.loadedAssetArr[btnNameArr[0]] == undefined)
			return 0;
		var btn = new playbar.PlayBarButton(btnNameArr[0],this.bkGrndDiv,clickHandler);
		if(btn.getWidth() + playbar.kBtnMargin + curWidth + 2*playbar.kIndentMargin> playbar.playBarDim)
		{
			btn.destroy();
			return 0;
		}
		btn.setImage('Shadow');
		btn.setImage('Stroke');
		btn.setImage('Color');
		btn.setImage('Shade');
		btn.setImage('InnerStroke');
		btn.setImage('Glow');
		btn.setImage('InnerShade');
		for(var i=0;i<btnNameArr.length; ++i)
		{
			btn.setIcon(btnNameArr[i]);
			this.btnMap[btnNameArr[i]] = btn;
		}	
		btn.currDiv['onmouseover']=btn.onMouseOver;
		btn.currDiv['onclick']=btn.toggleImage;
		btn.currDiv['onmouseout']=btn.onMouseOut;
		containerArr[containerArr.length] = btn;
		btn.expectedWidth = btn.getWidth();
		return btn.expectedWidth + playbar.kBtnMargin;
	},
	createLogo : function (curWidth)
	{
		if(playbar.playbarHasLogo == false)
			return 0;
		var logo = document.createElement('div');
		logo.id = "playbarLogo";
		this.bkGrndDiv.appendChild(logo);
		logo.setAttribute('class','playbarLogo');
		if(playbar.movieProperties.playBarProperties.tworow == 0)
			logo.style.marginTop = (this.bkGrndDiv.height - logo.clientHeight)/2 + "px";
		else
			logo.style.marginTop = "0px";
		if(logo.clientWidth + playbar.kBtnMargin + curWidth + 2*playbar.kIndentMargin > playbar.playBarDim)
		{
			this.bkGrndDiv.removeChild(logo);
			return 0;
		}
		this.logo = logo;
		return logo.clientWidth + playbar.kBtnMargin;
	},
	initComponents : function()
	{
		if(playbar.movieProperties.playBarProperties.tworow == 0)
		{
			var indent =  playbar.kIndentMargin;
			var indentStep = 0;
			if(this.slider == undefined)
			{
				if(this.firstRowArray.length > 1)
					indentStep = (this.bkGrndDiv.width - this.firstRowMinWidth)/(this.firstRowArray.length - 1);
				else
					indentStep = (this.bkGrndDiv.width - this.firstRowMinWidth)/2;
			}
			else
				indentStep = 0;
			for(var i = 0; i< this.firstRowArray.length; ++i)
			{
				indent = this.firstRowArray[i].setPosNWidth(indent, 0,  this.firstRowArray[i].expectedWidth);
				indent += indentStep;
			}
			if(this.logo != null)
			{
				this.logo.style.marginLeft =  indent + "px";
			}
		}
		else
		{
			var indent =  playbar.kIndentMargin;
			var indentStep = (this.bkGrndDiv.width - this.firstRowMinWidth);
			if(this.firstRowArray.length > 1)
				indentStep = (this.bkGrndDiv.width - this.firstRowMinWidth)/(this.firstRowArray.length - 1);
			else
				indentStep = (this.bkGrndDiv.width - this.firstRowMinWidth)/2;
			var maxHeight = 0;
			for(var i = 0; i< this.firstRowArray.length; ++i)
			{
				indent = this.firstRowArray[i].setPosNWidth(indent, (this.bkGrndDiv.height/2 - this.firstRowArray[i].currDiv.height)/2, this.firstRowArray[i].expectedWidth);
				indent += indentStep;
				if(maxHeight<(this.bkGrndDiv.height/2 + this.firstRowArray[i].currDiv.height)/2)
					maxHeight = (this.bkGrndDiv.height/2 + this.firstRowArray[i].currDiv.height)/2;
			}
			indent =  playbar.kIndentMargin;
			indentStep = (this.bkGrndDiv.width - this.secondRowMinWidth);
			if(this.slider == undefined)
			{
				if(this.secondRowArray.length > 1)
					indentStep = (this.bkGrndDiv.width - this.secondRowMinWidth)/(this.secondRowArray.length - 1);
				else
					indentStep = (this.bkGrndDiv.width - this.secondRowMinWidth)/2;
			}
			else
				indentStep = 0;
			for(var i = 0; i< this.secondRowArray.length; ++i)
			{
				indent = this.secondRowArray[i].setPosNWidth(indent, this.bkGrndDiv.height/2 - maxHeight + (this.bkGrndDiv.height/2 - this.secondRowArray[i].currDiv.height)/2, this.secondRowArray[i].expectedWidth);
				indent += indentStep;
			}
			if(this.logo != null)
			{
				this.logo.style.marginLeft =  indent + "px";
				this.logo.style.marginTop =  (this.bkGrndDiv.height/2 - maxHeight + (this.bkGrndDiv.height/2 - this.secondRowArray[i].currDiv.height)/2) + "px";
			}
		}
	},
	transformPlaybar : function()
	{
		var matrixStr = 'matrix(';
		if(playbar.isVertical)
			matrixStr += '0,1,-1,0,';
		else
			matrixStr += '1,0,0,1,';
		var translateX = 0;
		var translateY = 0;
		switch(playbar.movieProperties.playBarProperties.position)
		{
			case 2:
				translateX += playbar.playBarOtherDim;
				if(playbar.movieProperties.playBarProperties.overlay)
					translateX -= this.bkGrndDiv.height;
			case 0:
			{
				translateX += (-this.bkGrndDiv.width + this.bkGrndDiv.height)/2;
				switch(playbar.movieProperties.playBarProperties.layout)
				{
					case 0:
						translateY = (this.bkGrndDiv.width - this.bkGrndDiv.height)/2;
					break;
					case 1:
						translateY = (playbar.playBarDim - this.bkGrndDiv.height)/2;
					break;
					case 2:
						translateY = (playbar.playBarDim) - (this.bkGrndDiv.width + this.bkGrndDiv.height)/2;
					break;
					case 3:
						translateY = (playbar.playBarDim - this.bkGrndDiv.height)/2;
						break;
					default:
						break;
				}
			}
			break;
			case 3:
				translateY += playbar.playBarOtherDim;
				if(playbar.movieProperties.playBarProperties.overlay)
					translateY -= this.bkGrndDiv.height;
			case 1:
			{
				switch(playbar.movieProperties.playBarProperties.layout)
				{
					case 0:
						translateX = 0;
					break;
					case 1:
						translateX = (playbar.playBarDim) - (this.bkGrndDiv.width);						
					break;
					case 2:
						translateX = (playbar.playBarDim - this.bkGrndDiv.width)/2;
					break;
					case 3:
						translateX = 0;
						break;
					default:
						break;
				}
			}
			break;
			default:
				break;
		}
		matrixStr += translateX + ','+ translateY + ')';
		applyTransform(this.playBarDiv,matrixStr);
	},
	applyColor : function(color,imgElem)
	{
		var colorCanvas = document.createElement('canvas');
		var coloringCanvas = document.createElement('canvas');
		coloringCanvas.width = imgElem.width;
		coloringCanvas.height = imgElem.height;
		colorCanvas.width = imgElem.width;
		colorCanvas.height = imgElem.height;
		var srccontext = colorCanvas.getContext('2d');
		srccontext.clearRect(0,0,imgElem.width,imgElem.height);
		setFillStrokeStyle( color,colorCanvas);
		srccontext.fillRect(0,0,imgElem.width,imgElem.height);
		var destcontext = coloringCanvas.getContext('2d');
		destcontext.clearRect(0,0,imgElem.width,imgElem.height);
		destcontext.drawImage(imgElem,0,0,imgElem.width,imgElem.height);
		destcontext.globalCompositeOperation = 'source-atop';
		destcontext.drawImage(colorCanvas,0,0,imgElem.width,imgElem.height);
		return coloringCanvas;
	},
	layoutPlaybar : function()
	{
		var bkWidth = 0;
		var measuredWidthNoSlider = -playbar.kBtnMargin;
		playbar.isVertical = (playbar.movieProperties.playBarProperties.position % 2 == 0) ?  true : false;
		playbar.playBarDim = (playbar.isVertical) ? playbar.movieProperties.project.h : playbar.movieProperties.project.w;
		playbar.playBarOtherDim = (playbar.isVertical == false) ? playbar.movieProperties.project.h : playbar.movieProperties.project.w;
		this.createBackground(playbar.playBarDim);
		if(!playbar.movieProperties.playBarProperties.tworow)
		{
			measuredWidthNoSlider += this.createButton(['Rewind'],this.firstRowArray,this.rewindHandler,measuredWidthNoSlider);		
			measuredWidthNoSlider += this.createButton(['Play','Pause'],this.firstRowArray,this.playPauseHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['Backward'],this.firstRowArray,this.backwardHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['Forward'],this.firstRowArray,this.forwardHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['FastForward','FastForward1','FastForward2'],this.firstRowArray,this.fastForwardHandler,measuredWidthNoSlider);
			var sliderWidth = this.createSlider(this.firstRowArray,measuredWidthNoSlider);
			if(cp.device != cp.IDEVICE)
				measuredWidthNoSlider += this.createButton(['AudioOn','AudioOff'],this.firstRowArray,this.audioOnOffHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['CC'],this.firstRowArray,this.ccHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['TOC'],this.firstRowArray,this.tocHandler,measuredWidthNoSlider);	
			measuredWidthNoSlider += this.createButton(['Print'],this.firstRowArray,null,measuredWidthNoSlider);
			if(cp.browser != cp.SAFARI)
				measuredWidthNoSlider += this.createButton(['Exit'],this.firstRowArray,this.exitHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['Info'],this.firstRowArray,this.showInfoHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createLogo(measuredWidthNoSlider);
			measuredWidthNoSlider += 2*playbar.kIndentMargin;
			this.firstRowMinWidth = measuredWidthNoSlider;
			this.minWidth = measuredWidthNoSlider;
			if(playbar.movieProperties.playBarProperties.layout == 3)
			{
				bkWidth = playbar.playBarDim;
				if(this.slider == undefined)
					sliderWidth = 0;
				else
				{
					sliderWidth = bkWidth - measuredWidthNoSlider - 4*playbar.kBtnMargin;
					this.slider.expectedWidth = sliderWidth;
				}
			}
			else
				bkWidth = measuredWidthNoSlider + sliderWidth;
		}
		else
		{
			measuredWidthNoSlider += this.createButton(['Rewind'],this.firstRowArray,this.rewindHandler,measuredWidthNoSlider);		
			measuredWidthNoSlider += this.createButton(['Backward'],this.firstRowArray,this.backwardHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['Play','Pause'],this.firstRowArray,this.playPauseHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['Forward'],this.firstRowArray,this.forwardHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['FastForward','FastForward1','FastForward2'],this.firstRowArray,this.fastForwardHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += 2*playbar.kIndentMargin;
			this.firstRowMinWidth = measuredWidthNoSlider;
			measuredWidthNoSlider = -playbar.kBtnMargin;
			measuredWidthNoSlider += this.createButton(['TOC'],this.secondRowArray,this.tocHandler,measuredWidthNoSlider);	
			measuredWidthNoSlider += this.createButton(['Print'],this.secondRowArray,null,measuredWidthNoSlider);
			if(cp.browser != cp.SAFARI)
				measuredWidthNoSlider += this.createButton(['Exit'],this.secondRowArray,this.exitHandler,measuredWidthNoSlider);
			var sliderWidth = this.createSlider(this.secondRowArray,measuredWidthNoSlider);
			if(cp.device != cp.IDEVICE)
				measuredWidthNoSlider += this.createButton(['AudioOn','AudioOff'],this.secondRowArray,this.audioOnOffHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['CC'],this.secondRowArray,this.ccHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createButton(['Info'],this.secondRowArray,this.showInfoHandler,measuredWidthNoSlider);
			measuredWidthNoSlider += this.createLogo(measuredWidthNoSlider);
			measuredWidthNoSlider += 2*playbar.kIndentMargin;
			this.secondRowMinWidth = measuredWidthNoSlider + sliderWidth;
			this.minWidth = this.firstRowMinWidth > this.secondRowMinWidth ? this.firstRowMinWidth : this.secondRowMinWidth;
			if(playbar.movieProperties.playBarProperties.layout == 3)
			{
				bkWidth = playbar.playBarDim;
				if(this.slider == undefined)
					sliderWidth = 0;
				else
				{
					sliderWidth = bkWidth - measuredWidthNoSlider - 4*playbar.kBtnMargin;
					this.slider.expectedWidth = sliderWidth;
				}
			}
			else
				bkWidth = this.minWidth;
		}
		this.setBackGroundWidth(bkWidth);
		this.initComponents();
		this.transformPlaybar();
		this.playBarDiv['constrObj'] = this;
		this.playBarDiv['play'] = this.onMovieResume;
		this.playBarDiv['pause'] = this.onMoviePaused;
		this.playBarDiv['mute'] = this.onAudioOff;
		this.playBarDiv['unmute'] = this.onAudioOn;
		handleSpecialForPlaybar(this);
		if(playbar.movieProperties.playBarProperties.showOnHover)
		{
			var animator = new playbar.playbarAnimator(this.playBarDiv);
			animator.init(playbar.playBarHeight);
			this.playBarDiv.animator = animator;
		}
	},
	morphImages : function()
	{
		for(var i=0; i< playbarAssetArr.length; ++i)
		{
			var img = playbar.loadedAssetArr[playbarAssetArr[i]];
			if(img == undefined)
				continue;
			var imgName = img.playbarassetName;
			imgName = imgName.replace('Small','');
			if(imgName == 'Glow' || imgName == 'Progress')
				playbar.loadedAssetArr[playbarAssetArr[i]] = this.applyColor(playbar.movieProperties.playBarProperties.GlowColor,img);
			else if(imgName == 'Color' || imgName == 'ThumbBase')
				playbar.loadedAssetArr[playbarAssetArr[i]] = this.applyColor(playbar.movieProperties.playBarProperties.FaceColor,img);
			else if(imgName == 'AudioOff' || 
					imgName == 'AudioOn' || 
					imgName == 'Backward' ||
					imgName == 'CC' ||
					imgName == 'Exit' ||
					imgName == 'FastForward' ||
					imgName == 'FastForward1' ||
					imgName == 'FastForward2' ||
					imgName == 'Forward' ||
					imgName == 'Play' ||
					imgName == 'Pause' ||
					imgName == 'Rewind' ||
					imgName == 'TOC')
				playbar.loadedAssetArr[playbarAssetArr[i]] = this.applyColor(playbar.movieProperties.playBarProperties.IconColor,img);
		}
	},
	exitHandler : function()
	{
		window.open('', '_self', '');
		window.close();
	},
	showInfoHandler : function()
	{
		showInfoDialog();
	},
	audioOnOffHandler : function()
	{
		toggleMute();
	},
	playPauseHandler : function()
	{
	    playPause(true);
	},
	backwardHandler : function()
	{
		goToPreviousSlide();
	},
	forwardHandler : function()
	{
		goToNextSlide();
	},
	fastForwardHandler : function()
	{
		fastForward();
	},
	rewindHandler : function()
	{
		rewind();
	},
	ccHandler : function()
	{
		showHideCC();
	},
	tocHandler : function()
	{
		showHideTOC();
	},
	onMoviePaused : function()
	{
		var playbarConstruct = this.constrObj;
		if(playbarConstruct != undefined && playbarConstruct.btnMap['Pause'] != undefined)
		{
			playbarConstruct.btnMap['Pause'].changeImage('Play');
		}
	},
	onMovieResume : function()
	{
		var playbarConstruct = this.constrObj;
		if(playbarConstruct != undefined && playbarConstruct.btnMap['Play'] != undefined)
		{
			playbarConstruct.btnMap['Play'].changeImage('Pause');
		}
	},
	onAudioOn : function()
	{
		var playbarConstruct = this.constrObj;
		if(playbarConstruct != undefined && playbarConstruct.btnMap['AudioOn'] != undefined)
		{
			playbarConstruct.btnMap['AudioOn'].changeImage('AudioOff');
		}
	},
	onAudioOff : function()
	{
		var playbarConstruct = this.constrObj;
		if(playbarConstruct != undefined && playbarConstruct.btnMap['AudioOff'] != undefined)
		{
			playbarConstruct.btnMap['AudioOff'].changeImage('AudioOn');
		}
	},
	playbarAssetsLoaded : function()
	{
		playbar.assetsLoaded++;
		if(playbar.assetsLoaded == playbarAssetArr.length)
		{
			if(playbar.movieProperties.playBarProperties.applyColors)
				this.parentObj.morphImages();
			this.parentObj.layoutPlaybar();
		}
	},
	createBkDiv : function()
	{
		var bkDiv = document.createElement('div');
		this.playBarDiv.appendChild(bkDiv);
		bkDiv.setAttribute('class', 'playbarBackGround');
		bkDiv.style.webkitBoxShadow = '';
		bkDiv.style.boxShadow = '';
		bkDiv.style.mozBoxShadow = '';
		bkDiv.id = "playbarBkGrnd";
		if(playbar.movieProperties.playBarProperties.tworow)
			bkDiv.style.height = 2*bkDiv.clientHeight + "px";
		var bkHeight = parseFloat(window.getComputedStyle(bkDiv)['height'].replace('px',''));
		if(!playbar.movieProperties.playBarProperties.overlay)
		{
			var mLeft = 0;
			var mTop = 0;
			var mRight = 0;
			var mBottom = 0;
			if(playbar.movieProperties.playBarProperties.position == 0)
				mLeft = bkHeight;
			else if(playbar.movieProperties.playBarProperties.position == 1)
				mTop = bkHeight;
			else if(playbar.movieProperties.playBarProperties.position == 2)
				mRight = bkHeight;
			else if(playbar.movieProperties.playBarProperties.position == 3)
				mBottom = bkHeight;
			setMovieLeftTopRightBottom(mLeft,mTop,mRight,mBottom);
			setCCPosition(0);
		}
		else
		{
			setMovieLeftTopRightBottom(0,0,0,0);
			if(playbar.movieProperties.playBarProperties.position == 3)
				setCCPosition(bkHeight);
			else
				setCCPosition(0);
		}
		playbar.playBarHeight = bkHeight;
		playbar.movieProperties.playBarProperties.playBarHeight = bkHeight;
	},
	loadPlaybarAssets : function()
	{
		for(var i=0; i< playbarAssetArr.length; ++i)
		{
			var img = new Image();
			img.playbarassetName = playbarAssetArr[i];
			if(playbarAssetArr[i] == 'Logo')
				playbar.playbarHasLogo = true;
			if(playbarAssetArr[i] == 'Info')
				playbar.playbarHasInfo = true;
			if(playbarAssetArr[i] == 'Print')
				playbar.playbarHasPrint = true;
			img.parentObj = this;
			playbar.loadedAssetArr[playbarAssetArr[i]] = img;
			img.onload=this.playbarAssetsLoaded;
			img.onerror=this.playbarAssetsLoaded;
			img.src = playbar.playBarIconsFolder + playbarAssetArr[i] + playbar.PNGSuffix;
		}
	}
};
function loadplaybar()
{
	playbar.rootObj.createBkDiv();
	playbar.rootObj.loadPlaybarAssets();
};
playbar.playbarAnimator = function(playbarDiv)
{
	this.startVal = 0;
	this.endVal = 0;
	this.param = '';
	this.objDiv = playbarDiv;
	this.totalSteps = 25;
	this.currStep = 0;
	this.direction = 1;
	this.timeoutId = -1;
	this.intervalId = -1;
	this.isAnimating = false;
};
playbar.playbarAnimator.prototype = 
{
	init : function(playbarHeight)
	{
		if(playbar.movieProperties.playBarProperties.position == 3)
		{
			this.startVal = parseFloat(window.getComputedStyle(this.objDiv)['top'].replace('px',''));
			this.endVal = this.startVal + playbarHeight;
			this.param = 'top';
		}
		else if(playbar.movieProperties.playBarProperties.position == 2)
		{
			this.startVal = parseFloat(window.getComputedStyle(this.objDiv)['left'].replace('px',''));
			this.endVal = this.startVal + playbarHeight;
			this.param = 'left';
		}
		else if(playbar.movieProperties.playBarProperties.position == 1)
		{
			this.startVal = parseFloat(window.getComputedStyle(this.objDiv)['top'].replace('px',''));
			this.endVal = this.startVal - playbarHeight;
			this.param = 'top';
		}
		else if(playbar.movieProperties.playBarProperties.position == 0)
		{
			this.startVal = parseFloat(window.getComputedStyle(this.objDiv)['left'].replace('px',''));
			this.endVal = this.startVal - playbarHeight;
			this.param = 'left';
		}
	},
	startTimer : function()
	{
		clearTimeout(this.timeoutId);
		this.timeoutId = setTimeout(this.hidePlaybar, 2000);
	},
	easeOut : function(minValue,maxValue) 
	{ 
		var delta = maxValue - minValue; 
		var stepp = minValue+(Math.pow(((1 / this.totalSteps) * this.currStep), 0.3) * delta); 
		return Math.ceil(stepp);
    }, 
	beginAnim : function()
	{
		var objDiv = document.getElementById('playbar');
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
				return;
			}
			objDiv.style[animator.param] = animator.easeOut(animator.startVal,animator.endVal) + "px";
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
				return;
			}
			objDiv.style[animator.param] = animator.easeOut(animator.endVal,animator.startVal) + "px";
		}		
		 
	},
	hidePlaybar : function()
	{
		var playBarDiv = document.getElementById('playbar');
		if(playBarDiv)
		{
			clearTimeout(playBarDiv.animator.timeoutId);
			playBarDiv.animator.direction = 1;
			playBarDiv.animator.isAnimating = true;
			clearInterval(playBarDiv.animator.intervalId);
			playBarDiv.animator.intervalId = setInterval(playBarDiv.animator.beginAnim,20);
		}
	},
	showPlaybar : function(atEnd)
	{
		var playBarDiv = document.getElementById('playbar');
		if(playBarDiv)
		{
			clearTimeout(playBarDiv.animator.timeoutId);
			if(!atEnd)
				playBarDiv.animator.timeoutId = setTimeout(playBarDiv.animator.hidePlaybar, 2000);
			if(playBarDiv.animator.isAnimating && playBarDiv.animator.direction == 0 )
				return;
			else if(parseFloat(window.getComputedStyle(playBarDiv)[playBarDiv.animator.param].replace('px','')) == this.startVal)
				return;
			playBarDiv.animator.direction = 0;
			playBarDiv.animator.isAnimating = true;
			clearInterval(playBarDiv.animator.intervalId);
			playBarDiv.animator.intervalId = setInterval(playBarDiv.animator.beginAnim,20);
		}
	}
};
function playBarInit(movieProperties)
{
	playbar.movieProperties = movieProperties;
	if(playbar.movieProperties.playBarProperties.locale)
		playbar.toolTipLocaleIndex = playbar.movieProperties.playBarProperties.locale;
	var playBarDiv = document.getElementById('playbar');
	if(!playbar.movieProperties.playBarProperties.hasPlayBar)
	{
		playBarDiv.style.display = 'none';
		setMovieLeftTopRightBottom(0,0,0,0);
	}	
	playbar.rootObj = new playbar.playBarConstruct(playBarDiv);
	playBarDiv.style.left = (playbar.movieProperties.project.hasTOC &&  !playbar.movieProperties.tocProperties.overlay && (cp.model.data.tocProperties.position == 1) ? cp.model.data.tocProperties.width :  0) + "px";
	playBarDiv.style.top = "0px";
	//playBarDiv.style.opacity = playbar.movieProperties.playBarProperties.alpha/100 + '';
	if(playbar.movieProperties.project.hasTOC &&  playbar.movieProperties.tocProperties.overlay)
		playbar.movieProperties.playBarProperties.hasTOC = true;
	if(playbar.movieProperties.playBarProperties.hasPlayBar)
		loadplaybar();
};
function setPlaybarCallback(movie)
{
	playbar.mainMovie = movie;
}