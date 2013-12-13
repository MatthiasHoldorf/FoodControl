
/* jslint cap: true, debug: true, devel: true, evil:false, white:true, plusplus:false */
/*global clearInterval: false, clearTimeout: false, document: false, event: false,
 frames: false, history: false, Image: false, location: false, name: false,
 navigator: false, Option: false, parent: false, screen: false,
 setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false,
cp: false, OpenAjax: false, jQuery: false, applyTransform: false, getAngleFromRotateStr:false,
applyShadow: false, ConvertRGBToRGBA:false
 */

function scriptPath() {
    "use strict";
    var i, path = '', scripts = document.getElementsByTagName('script');

    if (scripts && scripts.length > 0) {
        for (i = 0; i < scripts.length; i += 1) {
            if (scripts[i].src && scripts[i].src.match(/CPWidgetManager\.js$/)) {
                path = scripts[i].src.replace(/(.*)CPWidgetManager\.js$/,'$1');
                break;
            }
        }
    }
    return path;
}

function loadScript(aScriptSrc, aCompleteFunction) {
    "use strict";
    var script, head = document.getElementsByTagName('head')[0];
    if (head) {
        script = document.createElement('script');
        script.setAttribute('src', aScriptSrc);
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('defer', false);
        if (typeof aCompleteFunction !== "undefined" && aCompleteFunction !== null) {
            script.onreadystatechange = function () {
                if (this.readyState === 'complete' || this.readyState === 'loaded') {
                    this.onreadystatechange = this.onload = null;
                    aCompleteFunction();
                }
            };
            script.onload = function () {
                this.onreadystatechange = this.onload = null;
                aCompleteFunction();
            };
        }
        head.appendChild(script);
    }
}

loadScript(scriptPath() + 'OpenAjaxManagedHub-all.js', function () {
    "use strict";
    if (typeof OpenAjax !== "undefined") {
        OpenAjax.hub.registerLibrary("Captivate.html5.WidgetLoader", "http://com.adobe.captivate/html5/widget", "0.1", {});
    }
});

cp.WidgetManager = function () {
    "use strict";
    var instance, that = this;
	that.verbose = false;

    function SingletonConstructor() {
        function onSubscribe(topic, container) {
            return true;
        }
        function onPublish(topic, data, pcont, scont) {
            return true;
        }

        function onUnsubscribe(topic, container) {
            return true;
        }
        that.hub = new OpenAjax.hub.ManagedHub(
            {
                onPublish : onPublish,
                onSubscribe : onSubscribe,
                onUnsubscribe : onUnsubscribe,
                log : function (msg) {
                    if (that.verbose) {
                        cp.log(msg);
                    }
                }
            }
        );
        return that;
    }

    // Returning the public interface. This now makes it a singleton
    return {
        getInstance : function () {
            if (instance === null || instance === undefined) {
                instance = SingletonConstructor();
                instance.constructor = null;
            }
            return instance;
        }
    };
};

cp.WidgetManager.prototype.getHub = function () {
    "use strict";
    return this.hub;
};

cp.WidgetManager.getInstance = function () {
    "use strict";
    return new cp.WidgetManager().getInstance();
};

cp.Widget = function (el, args) {
    "use strict";
    cp.Widget.baseConstructor.call(this, el);

    var  rotateAngle, tr, sh, widgetID, clientURI, jsClass, that, widgetParams,
        dir, mAngle, slideName, lstartFrame, boundsArray = this.getAttribute("b"), 
		resourceInfoArr = this.getAttribute( "wrs" ),
		cpContentLeft = 0, cpContentTop = 0, cpMovieWidth = cp.model.data.project.w, cpMovieHeight = cp.model.data.project.h;

	// Get actual values.
	if ( cp.model.data.project.hasTOC && cp.model.data.tocProperties && ! cp.model.data.tocProperties.overlay ) {
		if ( 1 == cp.model.data.tocProperties.position ) // left
			cpContentLeft = cp.model.data.tocProperties.width;
		cpMovieWidth += cp.model.data.tocProperties.width;
	}
	var playbarHeight = 30;
	if ( cp.model.data.playBarProperties.playBarHeight )
		playbarHeight = cp.model.data.playBarProperties.playBarHeight;
		
	if ( cp.model.data.playBarProperties.hasPlayBar ) {
		switch ( cp.model.data.playBarProperties.position ) {
		case 0: // left
			cpContentLeft += playbarHeight;
			cpMovieWidth += playbarHeight;
			break;
		case 1: // top
			cpContentTop += playbarHeight;
			cpMovieHeight += playbarHeight;
			break;
		case 2: // right
			cpMovieWidth += playbarHeight;
			break;
		case 3: // bottom
			cpMovieHeight += playbarHeight;
			break;
		default:
			break;
		}
	}
	
    var hub, cliId, sid;
    that = this;
    this.bounds = {
        minX: boundsArray[0],
        minY: boundsArray[1],
        maxX: boundsArray[2],
        maxY: boundsArray[3]
    };

    this.args = args;
    this.isDrawn = false;
    this.visible = this.getAttribute("visible");
    this.element.style.left = this.bounds.minX + "px";
    this.element.style.top = this.bounds.minY + "px";
    this.element.style.width = this.bounds.maxX - this.bounds.minX + "px";
    this.element.style.height = this.bounds.maxY - this.bounds.minY + "px";
    this.element.style.position = 'absolute';
    this.element.style.color = "#00FF00";
    this.element.style.borderWidth = '0 px';
    this.widgetManager = cp.WidgetManager.getInstance();
    this.widget = null;
	this.isStarted = false;
	this.parentDivName = this.getAttribute("dn");
	cp.movie.stage.addToParentChildMap(this.parentDivName,this.element.id);
	
    tr = this.getAttribute("tr");
    sh = this.getAttribute("sh");
    rotateAngle = 0;
    if (tr) {
        applyTransform(this.element, tr);
        rotateAngle = getAngleFromRotateStr(tr);
    }
    if (sh) {
        mAngle = sh.a - rotateAngle;
        applyShadow(this.element, sh.d * Math.cos((Math.PI * mAngle) / 180) + 'px ' + sh.d * Math.sin((Math.PI * mAngle) / 180) + 'px ' + sh.b + 'px ' + ConvertRGBToRGBA(sh.c, sh.o ));
    }
    widgetID = this.getAttribute("id");
    clientURI = this.getAttribute("wu");
    jsClass = this.getAttribute("wc");
    widgetParams = this.getAttribute("wp");
    slideName = this.getAttribute("sn");


    this.getClientID = function () {
        return widgetID;
    };

    this.getClientURI = function () {
        return clientURI;
    };
    var lWindowRef = window.location.href;
    dir = lWindowRef.substring(0, lWindowRef.lastIndexOf('/')) + '/' + clientURI.substring(0, clientURI.lastIndexOf('/')) + '/';	

    this.getJsClass = function () {
        return jsClass;
    };

    /* Open Ajax Object Implementation */
    this.OpenAjax = {
        getId : function () {
            return that.getClientID();
        },
        getAvailableSize : function () {
            return {
                width : that.element.style.width,
                height : that.element.style.height
            };
        },
        getSize : function () {
            return that.OpenAjax.getAvailableSize();
        },
        requestSizeChange : function (size) {
        },
        getMode : 'view',
        requestModeChange : function (mode) {
        },
        getPropertyValue : function (name) {
        },
        setPropertyValue : function (name, value) {
        },
        getPropertyNames : function () {
        },
        getMsg : function (msg) {
        },
        rewriteURI : function (params) {
            return (dir + params);
        },
        hub : that.widgetManager.getHub(),
        widget : {
            byId : function () {
                return that.widget;
            },
            Error : {
                // The widget is not active at this time
                Inactive : "OpenAjax.widget.Error.Inactive",
                // Either a required argument is missing or an invalid argument was provided
                BadParameters : "OpenAjax.widget.Error.BadParameters",
                // The requested resource could not be found
                NotFound : "OpenAjax.widget.Error.NotFound"
            }
        }
    };
    lstartFrame = cp.model.data[slideName].from;

    this.captivate = {
        CPMovieHandle : {
            widgetParams : function () {
                return widgetParams;
            },
            replaceVariables : function (varString) {
                var token, varEvalText, l, k, newText, tokens = varString.split('$$');
                if (tokens.length > 1) {
                    newText = tokens[0];
                    l = 0;
                    for (k = 1; k < tokens.length; ++k) {
                        token = tokens[k];
                        if (l === 0) {
                            l = 1;
                            newText += '\"+' + token;
                        } else {
                            l = 0;
                            newText += '+\"' + token;
                        }
                    }
                    varEvalText = newText;
                    return eval(varEvalText);
                } else {
                    return varString;
                }
            },
            getContainerProps : function () {
                return {
                    containerType : "Slide"
                };
            },
            getSlideProps : function () {
                return {
                    startFrame: lstartFrame,
                    endFrame : cp.model.data[slideName].to,
                    slideType : function () {
                        return cp.model.data[slideName].st;
                    },
                    slideHandle : function () {
                        return {
                            AddNoSkipFrame : function (aFrame) {
                                var lAbsFrame = aFrame + lstartFrame;
                                cp.movie.stage.noSkipFrames[lAbsFrame] = lAbsFrame;
                            }
                        };
                    }
                };
            },
            getCPSlideData: function () {
                return cp.getCPSlideData();
            },
            doesCourseHasQuiz: function () {
                return cp.doesCourseHasQuiz();
            },
            getQuizController: function () {
                if (!cp.movie)
                    return 0;
                if (!cp.movie.playbackController)
                    return 0;
                var lQuizController = cp.movie.playbackController.GetQuizController();
                return lQuizController;
            },
            getMovieProps : function () {
                return {
                    contentWidth : cp.model.data.project.w,
                    contentHeight : cp.model.data.project.h,
					contentLeft : cpContentLeft,
					contentTop : cpContentTop,
					movieWidth : cpMovieWidth,
					movieHeight : cpMovieHeight,					
                    variablesHandle : window,
                    movieHandle : cp.Timeline,
                    eventDispatcher: {
                        VARIABLECREATEDEVENT: cp.VARIABLE_CREATED_EVENT,
                        VARIABLECHANGEDEVENT: cp.VARIABLE_CHANGED_EVENT,
                        SLIDE_ENTER_EVENT : cp.SLIDEENTEREVENT,
                        SLIDE_EXIT_EVENT : cp.SLIDEEXITEVENT,
                        INTERACTIVE_ITEMSUBMIT_EVENT : cp.INTERACTIVEITEMSUBMITEVENT,
                        MOVIE_PAUSE_EVENT : cp.MOVIEPAUSEEVENT,
                        MOVIE_RESUME_EVENT : cp.MOVIERESUMEEVENT,
                        MOVIE_START_EVENT : cp.MOVIESTARTEVENT,
                        MOVIE_STOP_EVENT : cp.MOVIESTOPEVENT,
                        QUESTION_SKIP_EVENT : cp.QUESTIONSKIPEVENT,
                        QUESTION_SUBMIT_EVENT : cp.QUESTIONSUBMITEVENT,                       
                        START_PLAYBAR_SCRUBBING_EVENT: cp.STARTPLAYBARSCRUBBINGEVENT,
                        END_PLAYBAR_SCRUBBING_EVENT : cp.ENDPLAYBARSCRUBBINGEVENT,
                        MOVIE_FOCUS_IN: cp.MOVIEFOCUSINEVENT,
                        MOVIE_FOCUS_LOST: cp.MOVIEFOCUSLOSTEVENT,
                        addEventListener: function (type, listener, reciever) {
                            return cp.em.addEventListener(listener, type, '', reciever);
                        },
                        removeEventListener : function (type, listener) {
                            return cp.em.removeEventListener(listener, type);
                        }
                    },
					getCpHandle : function() {
						return cp;
					},
                    ExternalResourceLoader : {
                        getResourcePath : function (resId) {
							// Find out if it exists.
							var i = 0;
							if ( resourceInfoArr ) {
								for ( ; i < resourceInfoArr.length; ++i ) {
									if ( resId == resourceInfoArr[ i ].id )
										return dir + resourceInfoArr[ i ].p;
								}
							}
                            return '';
                        }
                    }
                };
            },
            isWidgetVisible : function () {
                return that.getAttribute('visible');
            },
            isWidgetEnabled : function () {
                return true;
            },
            getCPRandomPoolSlideProperties : function () {
                return null;
            },
            getCPQuestionPoolProperties : function () {
                return null;
            },
			pauseMovie : function () {
				cpCmndPause = 1;
			},
			playMovie : function () {
				cpCmndPause = 0;
				cpCmndResume = 1;
			}
        }
    };
	
	this.iframe = null;
	this.loaded = false;
	this.loadingStarted = false;
	this.loadingCompleted = false;
	this.doOpenAjaxLoading( false );
};

cp.inherits(cp.Widget, cp.DisplayObject);

cp.Widget.prototype.start = function () {
    "use strict";
    if (this.isStarted === true) {
        return;
    }
	
	this.isStarted = true;
	//cp.log( 'widget start' );
	if ( ! this.loadingCompleted ) {
		if ( this.iframe )
			this.doActualWidgetLoad();
		else
			this.doOpenAjaxLoading( true );
	}
	if(!this.visible)
		cp.hide( this.parentDivName );    
	cp.Widget.superClass.start.call(this);
};

cp.Widget.prototype.doActualWidgetLoad = function()
{
	if (this.iframe) {
		var type = this.getJsClass();
		if (type) {
			try {
				//cp.log( 'widget - inside' );
				this.loadingCompleted = true;
				this.widget = new this.iframe[type]();
				this.widget.OpenAjax = this.OpenAjax;
				this.widget.captivate = this.captivate;
				if (this.widget.onLoad) {
					this.widget.onLoad();
				}
			} catch (e) {

			}
		}
	}
}

cp.Widget.prototype.doOpenAjaxLoading = function( calledFromStart )
{
	if ( this.loaded || this.loadingStarted )
		return;
		
	//cp.log( 'widget doOpenAjaxLoading' );
	cp.movie.stage.addToItemNotLoaded( this );
	this.loadingStarted = true;
    var hub = this.widgetManager.getHub();
	var that = this;
    var cliId = this.getClientID();
	var needsActualLoading = calledFromStart;
    var sid = hub.subscribe(cliId + "_loaded", function () {
        var type, iframe, actual_i_frame = null;
		that.loaded = true;
		//cp.log( 'widget callback returned' );
		cp.movie.stage.removeFromItemNotLoaded( that );
        if (that.verbose) {
            cp.log("Client Success fully loaded");
        }

        hub.unsubscribe(sid);
        iframe = that.container.getIframe();
		actual_i_frame = iframe;
        iframe = iframe.contentWindow || iframe.contentDocument;

        if (iframe) {
            that.iframe = iframe;
			cp.movie.stage.addToParentChildMap(that.parentDivName,actual_i_frame.id);
			if ( needsActualLoading )
				that.doActualWidgetLoad();
        }
    });
    this.container = new OpenAjax.hub.IframeContainer(hub,
        cliId, {
            Container :
                {
                    onSecurityAlert : function (source, alertType) {
                        if (that.verbose) {
                            cp.log("onSecurityAlert: s=" + source.getClientID() + " a=" + alertType);
                        }
                    },
                    scope : this,
                    log : function (msg) {
                        if (that.verbose) {
                            cp.log(msg);
                        }
                    }
                },
            IframeContainer :
                {
                    parent : this.element,
                    uri : this.getClientURI(),
                    iframeAttrs :
                        {
                            frameBorder : "0",
                            scrolling : "no",
                            style :
                                {
                                    width : "100%",
                                    height : "100%",
                                    borderWidth : "0 px"
                                }
                        }
                }
        });	
}

cp.Widget.prototype.reset = function () {
	this.isStarted = false;
    "use strict";
	this.deleteFromRopMap(this.element);
	this.loaded = false;
	this.loadingStarted = false;
	this.loadingCompleted = false;
    var hub = this.widgetManager.getHub();
	//cp.log( 'widget reset' );
    try {
        if (this.widget.onUnLoad) {
            this.widget.onUnLoad();   
        }
    } catch (e) {

    }

    if (this.iframe && this.iframe.deInit) {
        try {
            this.iframe.deInit();
        } catch (e) {
        }
    }
    try {
        hub.removeContainer(this.container);
    } catch (e1) {
    }
	this.iframe = null;
};
