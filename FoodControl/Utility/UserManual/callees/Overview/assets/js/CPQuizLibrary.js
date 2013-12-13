var user_responseIdentifierArr = [];
var correct_responseIdentifierArr = [];
function quizContinueButtonClickHandler(div)
{
    cp.movie.play();
}

function qcnch(d){return quizContinueButtonClickHandler(d);}

function defaultHandlerForRuntimeMessageBox()
{
	 var lQuizController = cp.movie.playbackController.GetQuizController();
	if (!lQuizController)
			return;
	lQuizController.DefaultHandlerForRuntimeMessageBox();
}

function returnToQuiz()
{
	 var lQuizController = cp.movie.playbackController.GetQuizController();
	if (!lQuizController)
			return;
	lQuizController.ReturnToQuiz();
}

function forceSubmitAll()
{
	var lQuizController = cp.movie.playbackController.GetQuizController();
	if (!lQuizController)
			return;
	lQuizController.ForceSubmitAll();
}

function quizReviewButtonClickHandler(div)
{
    var divdata = cp.model.data[div.id];

    var lQuizController = cp.movie.playbackController.GetQuizController();
    if (!lQuizController)
        return;
    if(!cp.movie.playbackController.HasQuiz())
		return;

    lQuizController.SetIsInReviewMode(true);
    if (divdata) 
	{
		var lSlideNames = cp.movie.playbackController.GetSlideNames();
        var lFirstSlideInQuiz = lQuizController.GetFirstSlideInQuizIndex();
		if(lFirstSlideInQuiz != undefined)
			cpCmndGotoSlideAndResume = lFirstSlideInQuiz;
    }
}

function qrch(d){return quizReviewButtonClickHandler(d);}

function resetQuizData()
{	
	var lQuizController = cp.movie.playbackController.GetQuizController();
	if(!lQuizController)
		return;	
	var lQuestions = cp.movie.questionObjs;
	if(!lQuestions)
		return 0;
	var lNumQuestions = lQuestions.length;
	if(lNumQuestions<=0)
		return;
	
	for(var lIndex = 0; lIndex < lNumQuestions; ++lIndex)
	{
		if(!lQuestions[lIndex])
			continue;				
		if(lQuestions[lIndex].getIsPretest()) // Pretest Questions Should not be reset while retaking quiz
			continue;
		lQuestions[lIndex].resetQuestionData();
	}
	//ResetScores
	lQuizController.GetScore();
}

function quizRetakeButtonClickHandler(div)
{	
	var lQuizController = cp.movie.playbackController.GetQuizController();
	if(!lQuizController)
		return;	
	  if(!cp.movie.playbackController.HasQuiz())
		return;
	var lDivdata = cp.model.data[div.id];
	if(!lDivdata)
		return;
	var lSlideNames = cp.movie.playbackController.GetSlideNames();
	var lFirstSlideInQuiz = lQuizController.GetFirstSlideInQuizIndex();
	if(lFirstSlideInQuiz >= 0)
	{
		var lNameOfFirstSlideInQuiz = lSlideNames[lFirstSlideInQuiz];
		var lDataOfFirstSlideInQuiz = cp.model.data[lNameOfFirstSlideInQuiz];
		if(lDataOfFirstSlideInQuiz)
		{
			//Reset Current Branch in Graph
			var lGraphManager = cp.movie.playbackController.GetGraphManager();
			if(lGraphManager!=undefined)
				lGraphManager.resetCurrentBranch(lFirstSlideInQuiz);
			
			//Reset here only because order in which question components(like radio) are drawn and questionData getting reset is no unpredicatable due to asset loading
			resetQuizData(); //Note: reset used be get called while stating quiz or entering first question
			var lFirstSlideStartFrame = lDataOfFirstSlideInQuiz['from'];
			cpCmndGotoFrameAndResume = lFirstSlideStartFrame;
		}
	}
}

function qrtch(d){return quizRetakeButtonClickHandler(d);}

function quizClearButtonClickHandler(div) 
{
	var lQuizController = cp.movie.playbackController.GetQuizController();
	if(!lQuizController)
		return;	
    var divdata = cp.model.data[div.id];
    var questionStatus;
    if (divdata)
	{
        var slideName = divdata['sn'];
        var questionObj = getQuestionObject(slideName);
        if (!questionObj)
            return;
		if(questionObj.getIsPretest() && lQuizController.GetIsPretestQuestionsDisabled())
			return;
        questionObj.clearButtonClickHandler(div);
    }
}

function qcch(d){return quizClearButtonClickHandler(d);}

function quizSkipButtonClickHandler(div)
{
	var lQuizController = cp.movie.playbackController.GetQuizController();
	if(!lQuizController)
		return;
    var divdata = cp.model.data[div.id];
    if (divdata) 
	{
        var slideName = divdata['sn'];
        var questionObj = getQuestionObject(slideName);
        if (!questionObj)
            return;
		if(!lQuizController.GetIsInReviewMode())
		{
			if( questionObj.getIsLastPretestQuestion() )
				return lQuizController.ExecutePretestAction(cp.movie.playbackController.GetCurrentSlideIndex());
			
			var lSubmitAll = lQuizController.GetIsSubmitAll();
			var lMustAnswer = lQuizController.GetQuestionAdvanceType() == 'mustAnswer';
			
			if(lMustAnswer && !lSubmitAll && !questionObj.m_answersDisabled && !questionObj.getIsPretest()) 
				return;
			
			var lSlideIndex = questionObj.getSlideIndex();
			if((lSlideIndex >=0) && !( questionObj.getIsPretest() ||lSubmitAll))
			{
				var lShouldDisableNextbutton = false;
				var lGraphManager = lQuizController.GetGraphManager();
				if( undefined != lGraphManager )
				{
					var lNextVisitableSlides = lGraphManager.getNextSlideList(lSlideIndex);
					if(lNextVisitableSlides != undefined)
					{
						if( lNextVisitableSlides.length == 1 )
						{
							lShouldDisableNextbutton = false;
						}
						else
						{
							lShouldDisableNextbutton = true;
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
									lShouldDisableNextbutton = false;
									break;
								}
							}
						}
					}
				}
				
				if( lShouldDisableNextbutton )
					return;
			}
			
				
			var lError = cp.movie.playbackController.AllowedToGoToSlide(cpInfoCurrentSlideIndex, cpInfoCurrentSlideIndex+1);
			if(lError != "")
				return;
		}
		
		cpQuizInfoTotalUnansweredQuestions = cpQuizInfoTotalUnansweredQuestions + 1;
        questionObj.skipButtonClickHandler(div);
    }
}

function qskch(d){return quizSkipButtonClickHandler(d);}

function quizBackButtonClickHandler(div) 
{
	var lQuizController = cp.movie.playbackController.GetQuizController();
	if(!lQuizController)
		return;
    var divdata = cp.model.data[div.id];
    var questionStatus;
    if (divdata) 
	{
        var slideName = divdata['sn'];
        var questionObj = getQuestionObject(slideName);
        if (!questionObj)
            return;
		if(!lQuizController.GetIsInReviewMode())
		{
			var lError = cp.movie.playbackController.AllowedToGoToSlide(cpInfoCurrentSlideIndex, cpInfoCurrentSlideIndex-1);
			if(lError != "")
				return;
		}
        questionObj.backButtonClickHandler(div);
    }
}

function qbch(d){return quizBackButtonClickHandler(d);}

function quizSubmitButtonClickHandler(div)
{
	var lQuizController = cp.movie.playbackController.GetQuizController();
	if(!lQuizController)
		return;		   
    var divdata = cp.model.data[div.id];
    var questionStatus;
    if (divdata) 
	{
        var slideName = divdata['sn'];
        var questionObj = getQuestionObject(slideName);
        if (!questionObj)
            return;
		if(questionObj.getIsPretest() && lQuizController.GetIsPretestQuestionsDisabled())
			return;
		if(!questionObj.getWasJudged())
			questionObj.judge(false,false);
    }
}

function qsbch(d){return quizSubmitButtonClickHandler(d);}

function quizSubmitAllButtonClickHandler(div)
{
    var lQuizController = cp.movie.playbackController.GetQuizController();
	if(!lQuizController)
		return;		
	lQuizController.SubmitAllQuestions(true, false);
}

function qsabch(d){return quizSubmitAllButtonClickHandler(d);}

var intTimeoutID = "";

function CallFunctionAfterAPIIsLoaded(strCodeToExecute) 
{
    if (!IsLoaded())
	{
        intTimeoutID = window.setTimeout("CallFunctionAfterAPIIsLoaded(" + strCodeToExecute + ")", 100);
    }
    else
	{

        if (intTimeoutID != "") 
		{
            window.clearTimeout(intTimeoutID);
            intTimeoutID = "";
        }
        //cp.log(strCodeToExecute);
        return eval(strCodeToExecute);
    }
}

function UnloadActivties() 
{
    var lPlaybackController = cp.movie.playbackController;
	if (lPlaybackController && lPlaybackController.GetIsTracked() &&(lPlaybackController.m_lmsType.toUpperCase() != "EMAIL") && (lPlaybackController.m_lmsType.toUpperCase() != "ACROBAT") && (lPlaybackController.m_lmsType.toUpperCase() != "INTERNALSERVER"))
	{
		if(cp.movie.virgin)
			lPlaybackController.RestoreQuizState();
		lPlaybackController.SendCourseData(true);
	}
	LMSDriverHolder.Unload();
}

function LoadContent()
{
    //cp.log("LoadContent called...");
}

var intQuestionSymbolCounter = 0,
ASCII_QUESTION = 63;
	
function CheckForDebugCommand(e) 
{
	var intKeyCode = 0;
	if (window.event) 
	{
		intKeyCode = window.event.keyCode;
	} 
	else 
	{
		intKeyCode = e.which;
	}

	if (intKeyCode == ASCII_QUESTION) 
	{
		intQuestionSymbolCounter++;
		if (intQuestionSymbolCounter == 3) 
		{
			intQuestionSymbolCounter = 0;
			LMSDriverHolder.ShowDebugWindow();
		}
	} 
	else if (intKeyCode != 0) 
	{ 
	    /*in FireFox, the shift key comes through as a 
	    keypress with code of 0...we want to ignore this */
		intQuestionSymbolCounter = 0;
	}
}


var resumeDataChunk;
var startBlnStr = false;
function LoadActivities() 
{	
	document.onkeypress = CheckForDebugCommand;
	
	LMSDriverHolder.Start();
    //cp.log("parent : " + parent);	
	try
	{
    	var x = LMSDriverHolder.IsLoaded();
		startBlnStr = x;
		if(!x)
		{
			cp.log("LMS Driver not loaded.");
			return;
		}	
	}
	catch(e)
	{
		cp.log("LMS Driver not found.");
		return;
	}
	//if(cp.verbose)
	//	LMSDriverHolder.ShowDebugWindow();
    var retVal = LMSDriverHolder.GetEntryMode();

    if (retVal == LMSDriverHolder.ENTRY_FIRST_TIME) 
	{
		resumeDataChunk = unescape(LMSDriverHolder.GetDataChunk());
        if((resumeDataChunk != "") && (resumeDataChunk != undefined) && resumeDataChunk != "0")
		{
			var lPlaybackController = undefined;
			if(cp.movie)
				lPlaybackController = cp.movie.playbackController;
			if(lPlaybackController)
				lPlaybackController.RestoreQuizState();						
		}
		else
		{
			LMSDriverHolder.SetBookmark('0');
			LMSDriverHolder.SetDataChunk('0');
		}
		if(cp.movie)
			cp.movie.unblockUI();
    }
    else 
	{	
        retVal = LMSDriverHolder.GetBookmark();
		var getDataChunkTimer = setInterval(function()
											{												
												if((resumeDataChunk != "") && (resumeDataChunk != undefined) && resumeDataChunk != "0")
												{
													if(cp.verbose)
													{
														cp.log(resumeDataChunk);
														cp.log("Unblocking UI");
													}
													var lPlaybackController = cp.movie.playbackController;
													if(lPlaybackController)
														lPlaybackController.RestoreQuizState();
													cp.movie.unblockUI();
													clearInterval(getDataChunkTimer);
												}
												else
												{
													resumeDataChunk = unescape(LMSDriverHolder.GetDataChunk());
													if(cp.verbose)
													{
														cp.log("waiting for resume data");
													}
												}
											},100);
        return;
    }
}

function resumeValuesFromDataChunk()
{
    if (!resumeDataChunk || resumeDataChunk == "0")
        return;

    var lmsData = cp.model.data['quizReportingData'];
    if (lmsData) 
	{
        if (lmsData['trackingSendResumeData'] != true)
            return;
    }

	if(!cp.movie.playbackController)
		return;
	
 	 var  lQuizState = new cp.QuizState();
 	 lQuizState.init();
  	 lQuizState.fromString(resumeDataChunk);
   	 cp.movie.playbackController.restoreQuizFromState(lQuizState);
}

function createAndGetDataChunk()
{
	if(!cp.movie.playbackController)
		return "";
		
	var myState = new  cp.QuizState();
	myState.init();
	cp.movie.playbackController.saveQuizState(myState);
	
	var lQuizState = myState.toString();
	return  lQuizState;
}

function getQuestionNumberInQuiz(objName)
{
    var lQuestionNumberInQuiz;
	var lObjData = cp.model.data[objName];
	if(lObjData != undefined)
		lQuestionNumberInQuiz = lObjData['qnq'];
	return lQuestionNumberInQuiz; 
}

function getQuestionObjectName(objName)
{
	var lQuestionObjectName ="";
    var lQuestionNumberInQuiz = getQuestionNumberInQuiz(objName);
    if (lQuestionNumberInQuiz != undefined)
        lQuestionObjectName = cp.movie.questions[lQuestionNumberInQuiz];
	return lQuestionObjectName;
}

function getQuestionObject(objName)
{
	var lQuestionObject;
    var lQuestionNumberInQuiz = getQuestionNumberInQuiz(objName);
    if (lQuestionNumberInQuiz != undefined)
        lQuestionObject = cp.movie.questionObjs[lQuestionNumberInQuiz];
	return lQuestionObject;
}

cp.QuizState = function()
{
	this.m_curReadPos = 0;

	this.m_b64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
	this.m_to64 = [];
	this.m_from64 = [];

	this.m_escAlphabet = "$.!*+";
	this.m_doubleEsc = "~";
	this.m_esc = [];
	this.m_mask = [63, 4095, 262143, 16777215, 1073741823];
	this.m_fromEsc =[];
	this.m_state = "";
}
cp.QuizState.prototype = 
{

	init: function()
	{
		for (var i=0; i<this.m_b64Alphabet.length ;i++)
		{
			this.m_to64[i] = this.m_b64Alphabet.charAt(i);
			this.m_from64[this.m_b64Alphabet.charCodeAt(i)] = i;
		}
		
		for (var j=0; j < this.m_escAlphabet.length;++j) 
		{
			this.m_esc[j] = this.m_escAlphabet.charAt(j);
			this.m_fromEsc[this.m_escAlphabet.charAt(j)] = j+1;
		}
	},

	toString: function()
	{
		return this.m_state;
	},

	fromString: function(aString)
	{
		this.m_state = aString;
		this.m_curReadPos = 0;
	},

	writeNumber: function(aNum)
	{
		var numBytes;
		var rShift;
		var b;

		aNum = Math.floor(aNum);
		if (aNum > this.m_mask[this.m_mask.length-1]) 
		{
			this.m_state = this.m_state.concat(this.m_doubleEsc);
			this.writeNumber(aNum / (this.m_mask[this.m_mask.length-1]+1));
			this.writeNumber(aNum & this.m_mask[this.m_mask.length-1]);
			// Write it in two parts because of limitations of 32-bit logical arithmetic in ActionScript
		} 
		else
		{
			for (numBytes=0; numBytes < this.m_esc.length; numBytes++) 
			{
				if ((aNum & this.m_mask[numBytes]) == aNum)
				{
					if (numBytes > 0) 
					{
						this.m_state = this.m_state.concat(this.m_esc[numBytes-1]);
					}
					rShift = 0;
					for (var i=0; i <= numBytes; i++) 
					{
						b = (aNum >> rShift) & 63;
						this.m_state = this.m_state.concat(this.m_to64[b]);
						rShift += 6;
					}
					break;
				}
			}
		}
	},

	readNumber: function()
	{
		var escByteChar = this.m_state.charAt(this.m_curReadPos);
		var escByteCode = this.m_state.charCodeAt(this.m_curReadPos++);
		var numBytes;
		var i;
		var b;
		var result = 0;
		var lShift;


		if (escByteChar == this.m_doubleEsc) 
		{
			var num1 = this.readNumber();
			var num2 = this.readNumber();
			return (num1 * (this.m_mask[this.m_mask.length-1]+1)) + num2;
		} 
		else 
		{
			numBytes = this.m_fromEsc[escByteChar];
			if ((numBytes == 0) || (numBytes == undefined))
			{
				result = this.m_from64[escByteCode];
			} 
			else
			{
				lShift = 0;
				for (i=0; i <= numBytes; i++)
				{
					b = this.m_from64[this.m_state.charCodeAt(this.m_curReadPos++)];
					result |= (b << lShift);
					lShift += 6;
				}
			}
			return result;
		}
	},

	writeBoolean: function(aBool)
	{
		this.m_state = this.m_state.concat(aBool ? "1" : "0");

	},

	readBoolean: function()
	{
		return (this.m_state.charAt(this.m_curReadPos++) == "1");
	},

	writeString: function(aString)
	{
		var stringToWrite = aString;
		this.writeNumber(stringToWrite.length);
		this.m_state = this.m_state.concat(stringToWrite);
	},

	readString: function()
	{
		var len = this.readNumber();
		var theStr = this.m_state.substr(this.m_curReadPos, len);
		this.m_curReadPos += len;
		return theStr;
	},
	
	getReadPos: function()
	{
		return this.m_curReadPos;
	},

	setReadPos: function(aNewPos)
	{
		this.m_curReadPos = aNewPos;
	},

	getWritePos: function()
	{
		return this.m_curReadPos;
	},

	setWritePos: function(aNewPos)
	{
		this.m_curReadPos = aNewPos;
	},

	getData: function()
	{
		return this.toString();
	},

	setData: function(aNewData)
	{
		this.fromString(aNewData);
	}	
}

cp.QuizController = function () 
{
    this.quizInProgress = false;
    this.quizNumStarts = 0;
    this.quizNumFinishes = 0;
    this.sawAnyScoreSlide = false;
    this.m_QuizzingData;
	this.m_questionSlideNames = [];
	
	this.m_playbackController;
	this.m_scoreDisplay = new Object();
	this.m_GoToQuizScopeActionExecuted = false;
	this.m_RunTimeMsgBox = undefined;
	this.m_HandledSubmitAll = false;
	this.m_submittedAllQuestions = false;
	this.verbose = false;
	this.m_forceAbsoluteProgressType = false;
	this.m_FirstNonPretestQuestionEncountered = false;
	this.m_PretestQuestionsDisabled = false;
	this.m_ExecutingPretestAction = false;
}
cp.QuizController.prototype =
{
	GetIsCurrentSlideLastPrestest: function()
	{
		if(!this.m_playbackController)
			return false;
		var lCurrSlideIndex = this.m_playbackController.GetCurrentSlideIndex();
		if((lCurrSlideIndex<0 ) || (lCurrSlideIndex>=cp.movie.stage.slides.length))
			return false;
		
		var lQuestions = this.GetQuestionsOnSlide(lCurrSlideIndex);
		if(!lQuestions || (lQuestions.length<=0))
			return false;
		var lCurQuestion = lQuestions[0];
		if( lCurQuestion )
			return lCurQuestion.getIsLastPretestQuestion();
		return false;
	},
	GetIsPretestQuestionsDisabled: function()
	{
		return this.m_PretestQuestionsDisabled;
	},	
	GetForceAbsoluteProgressType: function()
	{
		return this.m_forceAbsoluteProgressType;
	},
	SetForceAbsoluteProgressType: function(aVal)
	{
		this.m_forceAbsoluteProgressType = aVal;
	},
	GetFirstNonPretestQuestionEncountered: function()
	{
		return this.m_FirstNonPretestQuestionEncountered;
	},
	SetFirstNonPretestQuestionEncountered: function(aVal)
	{
		this.m_FirstNonPretestQuestionEncountered = aVal;
	},
	
	GetQuestionScoresToSend:function()
	{
		var lQuestionScores =[];
		
		var lSlideNames = cp.movie.stage.slides;
		if(!lSlideNames)
			return [];		
		
		for(var i = 0; i < lSlideNames.length; ++i)
		{
			var lSlideData = cp.model.data[lSlideNames[i]];
			if(lSlideData['v']) //We Will consider only those questions which are visited (in swf only those questionScore are present)
			{
				var lQuestionsOnSlide = this.GetQuestionsOnSlide(i);
				for(var j=0; j<lQuestionsOnSlide.length; ++j)				
				{
					var lQuestion = lQuestionsOnSlide[j];
					if(lQuestion)
						lQuestionScores.push(lQuestion.getQuestionScore());				
				}
			}
		}	
		
		return lQuestionScores;
	},
	
	saveState: function(aQuizState)
	{
		aQuizState.writeBoolean(this.GetIsInReviewMode());
		aQuizState.writeBoolean(false); //forceReviewMode
		aQuizState.writeBoolean(this.quizInProgress);
		aQuizState.writeNumber(this.quizNumStarts);
		aQuizState.writeNumber(this.quizNumFinishes);
		aQuizState.writeBoolean(this.sawAnyScoreSlide);
		aQuizState.writeBoolean(this.m_submittedAllQuestions);
		aQuizState.writeBoolean(this.m_PretestQuestionsDisabled);		
		
		var lQuizScopeEndSlide = ""+cpQuizScopeSlide; //Saving it as string as deafult valure od cpQuizScopeSlide can be negative and negative number reading is not supported yet
		aQuizState.writeString(lQuizScopeEndSlide);
		
		var lQuestionScores = this.GetQuestionScoresToSend();
		
		aQuizState.writeNumber(lQuestionScores.length );
		
		for (whichQuestionScore in lQuestionScores)
		{
			var lQuesScore = lQuestionScores[whichQuestionScore];
			if(lQuesScore)
				lQuesScore.saveState(aQuizState);
		}
		
		//Save Branch Information
		this.saveBranchInfo(aQuizState);
	},
	
	saveBranchInfo: function(aQuizState)
	{
		var lCompletionBranchString = undefined;
		var lCurrentBranchString = undefined;	
		var lProgressIndicatorMapString = "";
		var lGraphManager = this.GetGraphManager();
		var lHasBranchInfo = (lGraphManager != undefined);
		//Write Boolean to know if Branch Info is written
		aQuizState.writeBoolean(lHasBranchInfo);
		if(lGraphManager)
		{
			//Write Completion Branch
			//---------------------------------------------------------------------
			var lCompletionBranch = lGraphManager.getCompletionBranch();
			aQuizState.writeNumber(lCompletionBranch.length);
			for(var i = 0; i< lCompletionBranch.length; ++i)
				aQuizState.writeNumber(lCompletionBranch[i]);
			
			//Write Current Branch
			//---------------------------------------------------------------------	
			var lCurrentBranch = lGraphManager.getCurrentBranch();				
			aQuizState.writeNumber(lCurrentBranch.length);			
			for(var j = 0; j< lCurrentBranch.length; ++j)
				aQuizState.writeNumber(lCurrentBranch[j]);
			
			//(progress Indicator)			
			if(lGraphManager.m_SlideNumToQuestionNumMap!=undefined)
			{
				for(var lKey in lGraphManager.m_SlideNumToQuestionNumMap)
				{
					lProgressIndicatorMapString += lKey+"_"+lGraphManager.m_SlideNumToQuestionNumMap[lKey]+",";
				}
			}
			aQuizState.writeString(lProgressIndicatorMapString);
		}
	},
	
	restoreState: function(aQuizState)
	{
		if(!aQuizState)
			return;
			
		this.SetIsInReviewMode(aQuizState.readBoolean());
		var lForcedReviewMode = aQuizState.readBoolean(); //Dummy Read not to be used yet --For SWF Compatability
		this.quizInProgress = aQuizState.readBoolean();
		this.quizNumStarts = aQuizState.readNumber();
		this.quizNumFinishes = aQuizState.readNumber();
		this.sawAnyScoreSlide = aQuizState.readBoolean();
		this.m_submittedAllQuestions = aQuizState.readBoolean();	
		this.m_PretestQuestionsDisabled = aQuizState.readBoolean();
		
		this.quizScopeSlideSetter(parseFloat(aQuizState.readString()));		
		
		var lNumQuestionScores  = aQuizState.readNumber();
		for (var whichQuestionScore = 0; whichQuestionScore < lNumQuestionScores; ++whichQuestionScore) 
		{
			var lQuestionScore = new cp.QuestionScore();
			lQuestionScore.restoreState(aQuizState);
		}		
		//Save Branch Information
		this.restoreBranchInfo(aQuizState);
	},
	
	restoreBranchInfo: function(aQuizState)
	{
		if(!aQuizState)
			return;
			
		var lCompletionBranch = [];
		var lCurrentBranch = [];
		var lProgressIndicatorMapString = "";
		var lHasBranchInfo = aQuizState.readBoolean();
		if(lHasBranchInfo)
		{
			//Read Completion Branch			
			var lNumSlidesInBranch = aQuizState.readNumber();			
			for(var i = 0; i< lNumSlidesInBranch; ++i)
				lCompletionBranch.push(aQuizState.readNumber());
			
			//Read Current Branch			
			var lNumSlidesInCurrentBranch = aQuizState.readNumber();			
			for(var j = 0; j< lNumSlidesInCurrentBranch; ++j)
				lCurrentBranch.push(aQuizState.readNumber());
			
			//Read Progress Indicator associated with Questions
			lProgressIndicatorMapString = aQuizState.readString();
		}
		
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager)
		{
			lGraphManager.restoreCompletionBranchState(lCompletionBranch);
			lGraphManager.restoreCurrentBranchState(lCurrentBranch);
			this.RestoreGraphProgressIndicatorMap(lProgressIndicatorMapString);			
		}
	},
	
	ResumeState: function(key,value)
	{
		if(this.verbose)
			cp.log("QuizController :: ResumeState()");
		switch(key)
		{
			case "isInReviewMode" : this.SetIsInReviewMode((value == "true")); break;
			case "quizInProgress" : this.quizInProgress = (value == "true"); break;
			case "quizNumStarts"  : this.quizNumStarts = parseFloat(value); break;
			case "quizNumFinishes"  : this.quizNumFinishes = parseFloat(value); break;
			case "sawAnyScoreSlide"  : this.sawAnyScoreSlide = (value == "true"); break;
			case "submittedAllQuestions"  : this.m_submittedAllQuestions = (value == "true"); break;
			case "quizScopeSlide"  : this.quizScopeSlideSetter(parseFloat(value)); break;
			case "completionBranch": this.RestoreCompletionBranchState(value);break;
			case "currentBranch": this.RestoreCurrentBranchState(value);break;
			case "qpiMap":this.RestoreGraphProgressIndicatorMap(value);break;
			default: break;
		}
	},
	
	RestoreGraphProgressIndicatorMap: function(aVal)
	{
		if((undefined==aVal) || (aVal == ""))
			return;
		var lQPIMapStrArr = aVal.split(",");
		var lQPIMap = {};
		var lMaxProgressNum =0;
		for(var i = 0; i< lQPIMapStrArr.length; ++i)
		{
			var lQuestionNumProgressArr = lQPIMapStrArr[i].split("_");
			if(lQuestionNumProgressArr.length == 2)
			{
				var lQNum = parseInt(lQuestionNumProgressArr[0]);
				var lQProgressNum = parseInt(lQuestionNumProgressArr[1]);
				lQPIMap[lQNum] = lQProgressNum;
				if(lMaxProgressNum < lQProgressNum)
					lMaxProgressNum = lQProgressNum;
			}
		}
			
		var lGraphManager = this.GetGraphManager();
		if((lGraphManager!=undefined )&& (lGraphManager.m_SlideNumToQuestionNumMap!=undefined) && (lGraphManager.m_progressNumber!=undefined))
		{
			lGraphManager.m_SlideNumToQuestionNumMap = lQPIMap;
			lGraphManager.m_progressNumber =lMaxProgressNum;
		}
	},
	
	RestoreCompletionBranchState: function(aVal)
	{
		if(undefined==aVal)
			return;
		var lCompletionBranchStrArr = aVal.split(",");
		var lCompletionBranch = [];
		for(var i = 0; i< lCompletionBranchStrArr.length; ++i)
			lCompletionBranch.push(parseInt(lCompletionBranchStrArr[i]));
			
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager!=undefined)
			lGraphManager.restoreCompletionBranchState(lCompletionBranch);
	},
	
	RestoreCurrentBranchState: function(aVal)
	{
		if(undefined==aVal)
			return;
		var lCurrentBranchStrArr = aVal.split(",");
		var lCurrentBranch = [];
		for(var i = 0; i< lCurrentBranchStrArr.length; ++i)
			lCurrentBranch.push(parseInt(lCurrentBranchStrArr[i]));
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager!=undefined)
			lGraphManager.restoreCurrentBranchState(lCurrentBranch);
	},	
	
    SaveQuestionScore: function(question)
	{
	    if (!this.GetIsInReviewMode())// && !restoringState) 
	    {
			this.AddQuestionScore(question.GetQuestionScore());
			question.SetQuestionScore(undefined);
		}
	},
		
	AddQuestionScore: function(qs)
	{
		for (var i in this.questionScores) 
		{
			if (this.questionScores[i].questionNumInQuiz == qs.questionNumInQuiz) 
            {
				this.questionScores[i] = qs;
				return;
			}
		}
		// not found
		if(qs.questionNumInQuiz != -1)
			questionScores[qs.questionNumInQuiz] = qs;		
		else
			questionScores.push(qs);
	},

    HasQuiz: function()
	{
		return (this.m_QuizzingData != undefined) ? true:false;
	},
	
	InitializeQuizController: function()
	{
		if(this.verbose)
			cp.log("QuizController :: InitializeQuizController()");
		this.m_QuizzingData = cp.model.data['quizzingData'];
	},
	
	GetGraphManager:function()
	{
		var lGraphManager = undefined;
		if(this.m_playbackController)
			lGraphManager = this.m_playbackController.GetGraphManager();
		return lGraphManager;
	},
    
	GetGoToQuizScopeActionExecuted: function()
	{
		return this.m_GoToQuizScopeActionExecuted;
	},
	
	SetGoToQuizScopeActionExecuted: function(aActionExecuted)
	{
		this.m_GoToQuizScopeActionExecuted = aActionExecuted; 
	},
	
	GetIsInReviewMode: function ()
	{
        if (!this.m_QuizzingData)
            return false;
        var lIsInReviewMode = this.m_QuizzingData['isInReviewMode'];
        return lIsInReviewMode;
    },

    SetIsInReviewMode: function (aInReviewMode) 
	{
        if (!this.m_QuizzingData)
            return;
        this.m_QuizzingData['isInReviewMode'] = aInReviewMode;
    },

    SetQuizInProgress: function (aQuizInProgress) 
	{
        if (aQuizInProgress && !this.quizInProgress)
		{
            this.m_HandledSubmitAll = false;
            resetQuizData();            
			//Send Course Data before starting the Quiz after resetting the quizdata
			if(this.m_playbackController)
			{
				if (this.m_playbackController.GetIsTracked() && (this.m_playbackController.m_lmsType.toUpperCase() != "EMAIL") && (this.m_playbackController.m_lmsType.toUpperCase() != "ACROBAT") && (this.m_playbackController.m_lmsType.toUpperCase() != "INTERNALSERVER"))
					this.m_playbackController.SendCourseData(!this.m_playbackController.LMSIsAICC());//AICC Performance Improvement
				else
					this.m_playbackController.SendCourseData(false);
			}
			this.m_submittedAllQuestions = false;
			this.IncrementCurrentAttempt();
            this.sawAnyScoreSlide = false;
        }
        else if (!aQuizInProgress && this.quizInProgress)
		{
            this.quizNumFinishes = this.quizNumFinishes + 1;
        }
        this.quizInProgress = aQuizInProgress;
        this.quizInScopeSetter(aQuizInProgress);
    },

    GetIsAttemptFinished: function ()
	{
        if ((this.quizNumStarts > 0) && (this.quizNumStarts == this.quizNumFinishes))
		{
            return true;
        }
        if (this.sawAnyScoreSlide) 
		{
            return true;
        }
        return false;
    },
	
	GetCurrentSlideType: function()
	{		
		var currSlideName = this.m_playbackController.GetCurrentSlide();
		var currSlideIndex = this.m_playbackController.GetCurrentSlideIndex();
		var tempSlideData = cp.model.data[currSlideName];
		var lQuestionsOnSlide = this.GetQuestionsOnSlide(currSlideIndex);
		if(lQuestionsOnSlide && lQuestionsOnSlide.length > 0)
			return "Question";
		else if(this.GetAnyScoreSlideIndex() == currSlideIndex)
			return "AnyScoreSlide";
		return "";
	},
	
	IsNonPretestQuestionSlide: function( aSlideIndex)
	{
		var  isPretest = false;
		var lQuestionsOnSlide = this.GetQuestionsOnSlide(aSlideIndex);
		if(lQuestionsOnSlide && lQuestionsOnSlide.length > 0)
		{
			var lQSlideHasPretest = false;
			for (var i = 0; i < lQuestionsOnSlide.length; ++i) 
			{
				var lQuestion = lQuestionsOnSlide[i];
				if(lQuestion && lQuestion.getIsPretest())
				{
					lQSlideHasPretest = true;
					break;
				}
			}
			return  !lQSlideHasPretest;
		}	
		return false;		
	},
	
	/* Return max score for QuestionSlide*/
	getQuizSlideMaxScore: function( aSlideIndex)
	{
		var lMaxScore = 0;
		
		var lQuestionsOnSlide = this.GetQuestionsOnSlide(aSlideIndex);
		if(lQuestionsOnSlide && lQuestionsOnSlide.length > 0)
		{
			for (var i = 0; i < lQuestionsOnSlide.length; ++i) 
			{
				var lQuestion = lQuestionsOnSlide[i];
				if(lQuestion && !lQuestion.getIsPretest() )
					lMaxScore = lMaxScore + lQuestion.getWeighting();
			}
		}			
		return lMaxScore;		
	},
		
	/* Return min score for QuestionSlide*/
	getQuizSlideMinScore: function( aSlideIndex)
	{
		var lMinScore = 0;
		
		var lQuestionsOnSlide = this.GetQuestionsOnSlide(aSlideIndex);
		if(lQuestionsOnSlide && lQuestionsOnSlide.length > 0)
		{
			for (var i = 0; i < lQuestionsOnSlide.length; ++i) 
			{
				var lQuestion = lQuestionsOnSlide[i];
				if(lQuestion && !lQuestion.getIsPretest() )
					lMinScore = lMinScore + lQuestion.getNegativeWeight();
			}
		}			
		return lMinScore;		
	},
	
	/* Return score for QuestionSlide*/
	getQuizSlideScore: function( aSlideIndex)
	{
		var lScore = 0;		
		var lQuestionsOnSlide = this.GetQuestionsOnSlide(aSlideIndex);
		if(lQuestionsOnSlide && lQuestionsOnSlide.length > 0)
		{
			for (var i = 0; i < lQuestionsOnSlide.length; ++i) 
			{
				var lQuestion = lQuestionsOnSlide[i];
				if(lQuestion && !lQuestion.getIsPretest() )
					lScore = lScore + lQuestion.getScore();
			}
		}			
		return lScore;		
	},
	
	GetSlideType: function(aSlideIndex)
	{
		if(!cp.movie.stage)
			return "";
		var lQuestionsOnSlide = this.GetQuestionsOnSlide(aSlideIndex);
		if((lQuestionsOnSlide) && (lQuestionsOnSlide.length > 0))
			return "Question";
		else if(this.GetAnyScoreSlideIndex() == aSlideIndex)
			return "AnyScoreSlide";
		return "";
	},
	
	GetTotalQuestionsInProject: function()
	{
		if(!cp.movie)
			return 0;
		var lQuestions = cp.movie.questionObjs;
		if(!lQuestions)
			return 0;
		return lQuestions.length;
	},
	
	GetNumQuestions: function()
	{
		var lGraphManager = this.GetGraphManager();		
		if(lGraphManager!=undefined)
			return lGraphManager.getNumQuestions();
		
		return this.GetTotalQuestionsInProject();
	},

	GotoQuizScopeSlide: function(aSlideNum)
	{
		if(!cp.movie || !cp.movie.stage)
			return;
			
		if((aSlideNum < 0) || (aSlideNum >= cpInfoSlideCount))
		{
			cpCmndResume = true;
			return;				
		}
		var lCurrentSlideType = this.GetCurrentSlideType();
		if(lCurrentSlideType == "Question")
		{
			//User is already on Quiz Slide, so just perform continue action. e.g button included in Quiz
			cpCmndResume = true;
			return;	
		}
		
		// Checking if the quiz had entered review mode earlier
		var lShouldResume = false;
		if (this.GetIsInReviewMode())  // in review mode
			lShouldResume = true;			
		/*if( this.sawAnyScoreSlide) // Seen Result slide
			lShouldResume = true;			
		if( this.quizNumFinishes > 0) // Attempts taken still
			lShouldResume = true;*/
			
		if( lShouldResume )
		{ 
			cpCmndResume = true;
			return;
		}
			
		//Set Flag to indicate that user is going to QuestionSlide through GoToQuizScopeAction
		//This flag need to be reset while entering to the relevant Question
		this.m_GoToQuizScopeActionExecuted = true;
		cpCmndGotoSlideAndResume = aSlideNum;			
	},
	
    EnterCurrentSlide: function () 
	{
		var slideIsScoreSlide = false;
		var lSlideType = this.GetCurrentSlideType();
		var lCurrSlideIndex = this.m_playbackController.GetCurrentSlideIndex();
		var lQuizScopeEndSlideIndex = this.GetQuizScopeEndSlideIndex();
		
		//Hide Playbar for question and quizScopeEndSlide if hidePlaybarInQuiz is ON
		if(cpInfoHasPlaybar && this.GetHidePlaybarInQuiz() && !this.GetIsInReviewMode())
		{
			 var lHidePlaybar = false;
			 if(lSlideType == "Question")
			 	lHidePlaybar = true;
			 else if((lCurrSlideIndex >=0) && (lCurrSlideIndex == lQuizScopeEndSlideIndex) && (lSlideType != "AnyScoreSlide"))
				lHidePlaybar = true;
			 if(lHidePlaybar)
				cpCmndShowPlaybar = false;
		}	
		
        if (lSlideType == "Question" && !this.quizInProgress && !this.GetIsInReviewMode())
		{
            // startQuiz			
            this.SetQuizInProgress(true);
			cpQuizInfoTotalProjectPoints = this.GetMaxScore();			
			cpQuizInfoAttempts = this.quizNumStarts;			
			cpQuizInfoTotalQuestionsPerProject = this.GetTotalQuestionsInProject();
        }
        if (lSlideType == "AnyScoreSlide") 
		{
            this.quizInScopeSetter(false); // On Entering Result Slide, set value of InQuizScope variable false;
			slideIsScoreSlide = true;
            this.sawAnyScoreSlide = true;
        }
		
		
		var currentQuestions = this.GetQuestionsOnSlide(lCurrSlideIndex);
		if (currentQuestions) 
		{
			for (var i = 0; i < currentQuestions.length; ++i) 
			{
				var currentQuestion = currentQuestions[i];
				this.StartQuestion(currentQuestion);
			}
		} 
		else if (slideIsScoreSlide) 
		{
			//If user is entering Result Slide and submitAll is ON then submit All question Scores without showing any message
			this.m_scoreDisplay = new Object();
			this.m_scoreDisplay.score = this.GetScore();
			this.m_scoreDisplay.maxScore = this.GetMaxScore();
			this.m_scoreDisplay.numQuestions = this.GetNumQuestions();
			this.m_scoreDisplay.numRetries = this.GetTotalRetries();
			this.m_scoreDisplay.numQuizAttempts = this.quizNumStarts;
			this.m_scoreDisplay.percentCorrect = this.GetPercentCorrect();
			this.m_scoreDisplay.numQuestionsCorrect = this.GetTotalCorrectQuestions();
			this.m_scoreDisplay.passed = this.GetIsPassed();
			if (this.GetIsPassed()) 
			{
				this.m_scoreDisplay.feedback = this.GetPassedScoreFeedback();
			} 
			else 
			{
				this.m_scoreDisplay.feedback = this.GetFailedScoreFeedback();
			}
			this.m_scoreDisplay.quizController = this;
			//this.m_scoreDisplay.setAccessibility();
		}
		//ED's hotfix
		if(this.m_playbackController)
		{
			if (this.m_playbackController.GetIsTracked() && (this.m_playbackController.m_lmsType.toUpperCase() != "EMAIL") && (this.m_playbackController.m_lmsType.toUpperCase() != "ACROBAT") && (this.m_playbackController.m_lmsType.toUpperCase() != "INTERNALSERVER"))
				this.m_playbackController.SendCourseData(!this.m_playbackController.LMSIsAICC()); //AICC Performance Improvements
			else
				this.m_playbackController.SendCourseData(false);
		}
    },

    LeaveSlide: function (aFromSlideIndex, aToSlideIndex)
	{
		var lLeavingQuiz = false;
		if(!this.m_QuizzingData)
			return;
		var lQuizScopeEndSlideIndex = this.m_QuizzingData['quizScopeEndSlide'];
		if(!lQuizScopeEndSlideIndex)
			return;
		if(this.verbose)
			cp.log("Inside Leave Slide");
		if(aToSlideIndex >= 0)
		{
			//jumping forward from QuizScopeEndSlide
			lLeavingQuiz = (aFromSlideIndex >= 0) &&  (aToSlideIndex > aFromSlideIndex) && (aFromSlideIndex == lQuizScopeEndSlideIndex)
		}
		else if((aFromSlideIndex >= 0) && (aFromSlideIndex == lQuizScopeEndSlideIndex))
		{
			lLeavingQuiz = true;
		}
		
		if((aFromSlideIndex >= 0) && (aFromSlideIndex == this.GetAnyScoreSlideIndex()) && !this.GetIsInReviewMode())
		{
			lLeavingQuiz = true;
		}
		
		var lSlideType = this.GetSlideType(aFromSlideIndex);
		if(lSlideType == "Question") 
		{
			var currentQuestions = this.GetQuestionsOnSlide(aFromSlideIndex);
			if(currentQuestions)
			{
				for (var i = 0; i < currentQuestions.length; ++i) 
				{
					var currentQuestion = currentQuestions[i];
					if (currentQuestion) 
					{
						currentQuestion.endQuestion(false);
						if(!this.GetIsSubmitAll())
							currentQuestion.clearAnswers();						
					}
				}
			}
		}
		
		var lHasQuiz = this.m_playbackController && this.m_playbackController.HasQuiz();
		if(!lHasQuiz)
			lLeavingQuiz = false;
			
		var lPrevQuizInProgressVal = this.quizInProgress;
		if (lLeavingQuiz) 
		{
			this.SetQuizInProgress(false); //Order is important here...first set quizInProgress then set review Mode(below)
		}
		if (lLeavingQuiz)
		{
            if (!this.GetIsInReviewMode() &&  (this.quizNumStarts >= this.GetNumberOfQuizAttempts())  && this.GetIsAllowReviewMode()){
				this.SetIsInReviewMode(true);
			}
            this.SetQuizInProgress(false);
			
			if((aToSlideIndex == undefined) && lPrevQuizInProgressVal)
			{
				//Executes Quiz Pass/Fail Action
				var lAction = this.GetDefaultActionType();
				if (this.GetIsPassed())
					lAction = this.GetPassingGradeAction();
				else 
					lAction = this.GetFailingGradeAction();
				cp.movie.executeAction(lAction);
			}
        }
		
	//Show Playbar incase it was hidden in Question or QuizScopeEndSlide
	if( cpInfoHasPlaybar && this.GetHidePlaybarInQuiz())
	{
		 var lRestorePlaybar = false;
		 if(lSlideType == "Question")
			lRestorePlaybar = true;
		 else if((aFromSlideIndex >= 0) && (aFromSlideIndex == lQuizScopeEndSlideIndex) && (lSlideType != "AnyScoreSlide"))
			lRestorePlaybar = true;
		 if(lRestorePlaybar)
			cpCmndShowPlaybar = true;
	}
    },
	
	ExecutePretestAction: function( aFromSlideIndex)
	{
		if(this.m_ExecutingPretestAction)
			return false;
		
		if( (undefined ==aFromSlideIndex ) || ( aFromSlideIndex < 0) || (aFromSlideIndex >= cp.movie.stage.slides.length))
			return false;		
		
		var lCurrentQuestions = this.GetQuestionsOnSlide(aFromSlideIndex);
		if((lCurrentQuestions == undefined) || (lCurrentQuestions.length<=0) || (lCurrentQuestions[0] == undefined))
			return false;
		var lCurrQuestion = lCurrentQuestions[0];
		
		var lTargetSlideIndex = aFromSlideIndex+1;
		if(lTargetSlideIndex >= cp.movie.stage.slides.length)
			lTargetSlideIndex = -1;
			
		var lTargetQuestions = undefined;
		if(lTargetSlideIndex != -1)
			lTargetQuestions = this.GetQuestionsOnSlide(lTargetSlideIndex);
			
		var lIsTargetPretest = false;
		if(( lTargetQuestions!=undefined) &&(lTargetQuestions.length >0) && (lTargetQuestions[0]!=undefined))
			lIsTargetPretest =  lTargetQuestions[0].getIsPretest();
		
		
		var  lShouldResetPretest = lCurrQuestion.getIsPretest();
		lShouldResetPretest = lShouldResetPretest && ((lTargetSlideIndex == -1) || (!lIsTargetPretest) )
		
		if( !lShouldResetPretest )
			return false;
		
		// Assumption : this means we are crossing the last pretest so disable all previous pretest questions
		var lTempCurSlideIndex = aFromSlideIndex;
		
		while((lTempCurSlideIndex!=undefined) && (lTempCurSlideIndex >=0) )
		{
			var lQuestionsOnTempCurrSlide = this.GetQuestionsOnSlide(lTempCurSlideIndex);
			if(( lQuestionsOnTempCurrSlide==undefined) ||(lQuestionsOnTempCurrSlide.length <=0) || (lQuestionsOnTempCurrSlide[0]==undefined) || (! lQuestionsOnTempCurrSlide[0].getIsPretest()))
			{
				lTempCurSlideIndex = -1
				break;
			}
			
			var lNumQuestions = lQuestionsOnTempCurrSlide.length;
			for(var qIndex =0; qIndex< lNumQuestions; ++qIndex)
			{
				var lQuestionObj = lQuestionsOnTempCurrSlide[qIndex];
				if( lQuestionObj!=undefined )
				{ 
					//lQuestionObj.disableAnswers();	// Disable answers ( or mark it attempted)
				}
			}
			
			lTempCurSlideIndex = lTempCurSlideIndex -1;
		}
		
		this.m_PretestQuestionsDisabled = true;
		var lPretestAction = this.GetPretestAction();
		if( lPretestAction!=undefined)
		{
			this.m_ExecutingPretestAction = true;
			cp.movie.executeAction(lPretestAction);
			this.m_ExecutingPretestAction = false;
		}
		return true;
	},

    GetProgressType: function () 
	{
        if (!this.m_QuizzingData)
            return 0;

        return (this.m_QuizzingData['progressIndicatorType']);
    },

   	GetProgressTemplateString: function () 
	{
        if (!this.m_QuizzingData)
            return "";

        return (this.m_QuizzingData['progressIndicatorString']);
    },


    GetIsReportingEnabled: function ()
	{
        if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['reportingEnabled'];
    },

    GetParameterValueByName: function (paramName)
	{
        if (!this.m_QuizzingData)
            return '';
		var lHasQuiz = this.m_playbackController && this.m_playbackController.HasQuiz();
		if(!lHasQuiz)
			return '';	
		
		var retVal = "";
		switch(paramName)
		{
			case "quizInfoPointsScored" : retVal = this.GetScore(); break;
			case "quizInfoTotalQuizPoints" : retVal = this.GetMaxScore(); break;
			case "quizInfoTotalCorrectAnswers" : retVal = this.GetTotalCorrectQuestions(); break;
			case "numQuestionsInQuiz" : retVal = this.GetNumQuestions(); break;
			case "quizInfoPercentScored" : retVal = this.GetPercentCorrect(); break;
			case "quizInfoCurrentAttempt" : retVal = this.quizNumStarts; break;
			default: retVal = this.m_scoreDisplay.feedback; break;
		}
		
        return retVal;
    },

    GetPassedScoreFeedback: function () 
	{
        if (!this.m_QuizzingData)
            return '';

        return this.m_QuizzingData['passedScoreFeedback'];
    },

    GetFailedScoreFeedback: function ()
	{
        if (!this.m_QuizzingData)
            return '';

        return this.m_QuizzingData['failedScoreFeedback'];
    },

    GetIsAllowReviewMode: function () 
	{
        if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['allowReviewMode'];
    },

    GetIsQuizCompleted: function () 
	{
        if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['quizCompleted'];
    },

    SetIsQuizCompleted: function (iValue)
	{
        if (!this.m_QuizzingData)
            return;

        this.m_QuizzingData['quizCompleted'] = iValue;
    },

    GetAnyScoreSlideIndex: function ()
	{
        if (!this.m_QuizzingData)
            return -1;

        var lIndex = this.m_QuizzingData['anyScoreSlide'];

        if (lIndex != undefined)
            return lIndex;

        return -1;
    },
	
	GetPretestAction: function()
	{
		var lPretestAction = undefined;
		if (this.m_QuizzingData)
			lPretestAction = this.m_QuizzingData['pretestAction'];
		return lPretestAction;
	},
	
	GetQuizScopeEndSlideIndex: function ()
	{
        if (!this.m_QuizzingData)
            return -1;

        var lIndex = this.m_QuizzingData['quizScopeEndSlide'];

        if (lIndex != undefined)
            return lIndex;

        return -1;
    },
	
    GetFirstSlideInQuizIndex: function () 
	{
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager!=undefined)
		{
			var lSlideIndex = lGraphManager.getReviewFirstQuestionSlideIndex();
			if((lSlideIndex ==undefined) ||(lSlideIndex < 0) || (lSlideIndex =='NaN'))
				lSlideIndex = -1;
			return lSlideIndex;
		}	
		
        if (!this.m_QuizzingData)
            return -1;

        var lIndex = this.m_QuizzingData['firstSlideInQuiz'];

        if (lIndex != undefined)
            return lIndex;

        return -1;
    },
	
	GetLastSlideInQuizIndex: function () 
	{
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager!=undefined)
		{
			var lSlideIndex = lGraphManager.getLastQuestionSlideIndex();
			if((lSlideIndex ==undefined) ||(lSlideIndex < 0) || (lSlideIndex =='NaN'))
				lSlideIndex = -1;
			return lSlideIndex;
		}	
		
        if (!this.m_QuizzingData)
            return -1;

        var lIndex = this.m_QuizzingData['lastSlideInQuiz'];

        if (lIndex != undefined)
            return lIndex;

        return -1;
    },
	
	GetLastQuestionSlideInQuiz: function()
	{
		if(!cp.movie || !cp.movie.stage)
			return -1;
		var lLastQuestionSlideIndex = -1;
		var lSlides = cp.movie.playbackController.GetSlideNames();
		var lFirstSlideInQuiz = this.GetFirstSlideInQuizIndex();
		var lLastSlideInQuiz = this.GetLastSlideInQuizIndex();
		if((lFirstSlideInQuiz == -1) || (lLastSlideInQuiz == -1))
			return -1;
		
		for (var lSlideIndex = 0; lSlideIndex < lSlides.length; ++lSlideIndex) 
		{
			var lSlideType = this.GetSlideType(lSlideIndex);
			if ((lSlideType == 'Question') && (lSlideIndex >= lFirstSlideInQuiz) && (lSlideIndex <= lLastSlideInQuiz)) 
			{
				if ((lLastQuestionSlideIndex != -1) || (lSlideIndex > lLastQuestionSlideIndex)) 
				{
					lLastQuestionSlideIndex = lSlideIndex;
				}
			}
		}
		return lLastQuestionSlideIndex;
	},

    GetNumberOfQuizAttempts: function () 
	{
        if (!this.m_QuizzingData)
            return 0;

        return this.m_QuizzingData['numQuizAttemptsAllowed'];
    },
    
    GetIsPassed: function () 
	{
        if (!this.m_QuizzingData)
            return false;
		var lQuizPointsScored = parseFloat(this.GetScore());
		var lQuizPassPoints = parseFloat(cpQuizInfoQuizPassPoints);
		return ( lQuizPointsScored >= lQuizPassPoints);
    },

    GetScore: function () 
	{
        if (!this.m_QuizzingData)
            return 0;
	
		var lGraphManager = this.GetGraphManager();		

        var lQuestionObjs = cp.movie.questionObjs;
        var rawScore = 0;

        if (!lQuestionObjs)
            return 0;

        for (var i = 0; i < lQuestionObjs.length; ++i)
		{
            if (!lQuestionObjs[i])
                continue;
			if(lQuestionObjs[i].getIsPretest())
				continue;

			if(lGraphManager!=undefined )
			{ 
				if(lGraphManager.isSlidePartOfCurrentBranch(lQuestionObjs[i].getSlideIndex()))
					rawScore += lQuestionObjs[i].getScore();
			}
			else
			{
		            rawScore += lQuestionObjs[i].getScore();
			}
        }
        this.m_QuizzingData['quizInfoPointsScored'] = rawScore;
        this.m_QuizzingData['quizInfoPercentScored'] = (100 * this.m_QuizzingData['quizInfoPointsScored'] / this.m_QuizzingData['quizInfoTotalQuizPoints']).toFixed(2) + "%";
        return this.m_QuizzingData['quizInfoPointsScored'];
    },
	
	GetMaxScore: function () 
	{
        if (!this.m_QuizzingData)
            return 0;	
	
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager != undefined)
			return lGraphManager.getMaxQuizScore();
			
        return this.m_QuizzingData['maxScore'];
    },
	
    GetMinScore: function () 
	{
        if (!this.m_QuizzingData)
            return 0;
			
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager != undefined)
			return lGraphManager.getMinQuizScore();

        return this.m_QuizzingData['minScore'];
    },
  
  	GetMaxPretestScore: function () 
	{
		if (!this.m_QuizzingData)
            return 0;	
	
		return this.m_QuizzingData['maxPretestScore'];
    },
	
  	GetPretestScore: function () 
	{
		if (!this.m_QuizzingData)
			return 0;
			
		var lQuestionObjs = cp.movie.questionObjs;
		var lPretestScore = 0;
	
		if (!lQuestionObjs)
			return 0;
	
		for (var i = 0; i < lQuestionObjs.length; ++i) 
		{
			if (!lQuestionObjs[i])
				continue;
			if(lQuestionObjs[i].getIsPretest())		
				lPretestScore += lQuestionObjs[i].getScore();
		}
	
        return  lPretestScore;
    },
	
    GetCurrentAttempt: function () 
	{
        return this.quizNumStarts;
    },
	
	GetIsSubmitAll: function () 
	{
        if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['submitAll'];
    },
	GetHidePlaybarInQuiz: function()
	{
		  if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['hidePlaybarInQuiz'];
	},
	
	GetQuizBranchAware: function () 
	{
        if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['quizBranchAware'];
    },
	GetPassFailPassingScoreTypeInPrecent: function()
	{
		if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['passFailPassingScoreTypeInPrecent'];		
	},
	GetPassFailPassingScoreValue: function()
	{
		if (!this.m_QuizzingData)
            return 0;

        return this.m_QuizzingData['passFailPassingScoreValue'];		
	},
    IncrementCurrentAttempt: function (iValue) 
	{
        if (!this.m_QuizzingData)
            return;
		this.quizNumStarts = this.quizNumStarts + 1;
        this.m_QuizzingData['quizInfoCurrentAttempt'] = this.m_QuizzingData['quizInfoCurrentAttempt'] + 1;
    },

    CanShowRetakeButton: function ()
	{
       if((this.GetCurrentAttempt() >= this.GetNumberOfQuizAttempts()) || (this.GetIsPassed()) || this.GetIsInReviewMode())
			return false;
		return true;
    },

    GetQuizAdvanceType: function () 
	{
        if (!this.m_QuizzingData)
            return 'optional';

        return this.m_QuizzingData['quizAdvance'];
    },

    GetQuestionAdvanceType: function ()
	{
        if (!this.m_QuizzingData)
            return 'optional';

        return this.m_QuizzingData['questionAdvance'];
    },

    GetDefaultActionType: function () 
	{
        if (!this.m_QuizzingData)
            return '';

        return this.m_QuizzingData['defaultActionType'];
    },

    GetDefaultActionArgument: function () 
	{
        if (!this.m_QuizzingData)
            return '';

        return this.m_QuizzingData['defaultActionArg1'];
    },

    GetPassingGradeAction: function ()
	{
        if (!this.m_QuizzingData)
            return '';

        return this.m_QuizzingData['passingGradeAction'];
    },

    GetFailingGradeAction: function () 
	{
        if (!this.m_QuizzingData)
            return '';

        return this.m_QuizzingData['failingGradeAction'];
    },

    GetTotalCorrectAnswers: function ()
	{
        if (!this.m_QuizzingData)
            return 0;

        return this.m_QuizzingData['quizInfoTotalCorrectAnswers'];
    },

    GetNumberOfQuestionsInQuiz: function () 
	{
        if (!this.m_QuizzingData)
            return 0;

        return this.m_QuizzingData['numQuestionsInQuiz'];
    },
	
	GetAllowSkipAnyScoreSlide: function()
	{
		if (!this.m_QuizzingData)
            return true;

        return this.m_QuizzingData['allowSkipAnyScoreSlide'];
	},
	
	GetPassingScore: function()
	{
		if (!this.m_QuizzingData)
            return 0;
		//Note: If sendScoreAsPercent is true then quizParams.passingSore will hold the score based on total number of questions and not in current branch (check out publish code)
		var lScoreAsPrecent = this.GetPassFailPassingScoreTypeInPrecent();
		if(lScoreAsPrecent)
		{
			var lGraphManager = this.GetGraphManager();
			if(lGraphManager != undefined)
			{
				var lMaxQuizScore = lGraphManager.getMaxQuizScore();
				if(lMaxQuizScore =='NaN')
					return 'NaN';
				if(lMaxQuizScore <= 0)
					return 0;
				return (this.GetPassFailPassingScoreValue()/100)*lMaxQuizScore;
			}
		}
		return this.m_QuizzingData['passingScore'];
	},
	
	GetAllowBackwardMovementInQuiz: function()
	{
		if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['allowBackwardMovement'];
	},
	
	GetIsSlideJudged: function(iSlideNum)
	{
		var lQuestionObjArr = this.GetQuestionsOnSlide(iSlideNum);
		if(!lQuestionObjArr)
			return false;
		if(lQuestionObjArr.length <= 0)
			return false;
		var lSlideJudged = true;
		for(var i = 0; i < lQuestionObjArr.length; ++i)
		{
			var lQues = lQuestionObjArr[i];
			lSlideJudged = lSlideJudged && lQues.getWasJudged();
			if(!lSlideJudged)
				return false;
		}
		
		return lSlideJudged;
	},
	
	GetQuestionsOnSlide: function(aSlideIndex)
	{
		var retQuestionObjArr = [];
		if(!cp.movie.stage)
			return "";
		var tempSlideName = this.m_playbackController.GetSlideNameAtIndex(aSlideIndex);
		if(undefined == tempSlideName)
			return "";
		var tempSlideData = cp.model.data[tempSlideName];
		var lQuestionsStr = tempSlideData['qs'];
		if( (lQuestionsStr.length <= 0) || (lQuestionsStr == ""))
			return "";
		
		lQuestionsOnSlide = lQuestionsStr.split(",");
		if(lQuestionsOnSlide && (lQuestionsOnSlide != ""))
		{
			if(lQuestionsOnSlide.length > 0)
			{				
				for(var questionIdx = 0; questionIdx < lQuestionsOnSlide.length; ++questionIdx)
				{
					var lQuestionObj = getQuestionObject(lQuestionsOnSlide[questionIdx]);
					if(lQuestionObj)
					{
						retQuestionObjArr.push(lQuestionObj);
					}					
				}				
			}		
		}
			
		return retQuestionObjArr;
	},
	
	GetTotalRetries: function()
	{
		var lTotal = 0;
		
		var lQuestions = cp.movie.questionObjs;
		if(!lQuestions)
			return 0;
		var lNumQuestions = lQuestions.length;
		if(lNumQuestions<=0)
			return 0;
	
		for(var lIndex = 0; lIndex < lNumQuestions; ++lIndex)
		{
			if(!lQuestions[lIndex])
				continue;				
			lTotal = lTotal + lQuestions[lIndex].currentAttempt;
		}
	
		return lTotal;
	},
	
    CanDoSubmitAll:function()
	{
		//Check Must Take               
		if ((this.GetQuizAdvanceType() == 'mustTake') && (this.GetCurrentAttempt() <= 1))
		{
			var lAnyQuesAns = false;
			if(this.GetQuizBranchAware())
				lAnyQuesAns = this.GetAnyQuestionInBranchAnswered();
			else
				lAnyQuesAns = this.GetAnyQuestionsAnswered();
			
			if(!lAnyQuesAns)
				return "QUIZ_ERROR_MUST_TAKE_QUIZ";
		}
		
		return "";
	},
	
	GetAnyQuestionInBranchAnswered: function()
	{
		var lGraphManager = this.GetGraphManager();
		if(!lGraphManager)
			return false;
		var lCompletionBranch = lGraphManager.getCompletionBranch();
		if((lCompletionBranch == undefined) || (lCompletionBranch.length <= 0))
			return false;
		
		//Check all the question slides in the branch is visited and attempted		
		for( var iter = 0; iter < lCompletionBranch.length ; ++iter )
		{
			var lBranchSlideIndex = lCompletionBranch[iter];
			var lQuestionsOnSlide = this.GetQuestionsOnSlide(lBranchSlideIndex);
			if(lQuestionsOnSlide && lQuestionsOnSlide.length>0)
			{
				for (var i = 0; i < lQuestionsOnSlide.length; ++i) 
				{
					var lQuestion = lQuestionsOnSlide[i];
					if(lQuestion.getIsPretest())
						continue;
					if (lQuestion.getWasJudged()  && !lQuestion.getIsIncomplete()) 
					{
						return true;
					}
				}
			}
		}
       		
		return false;
	},
    
	GetAnyQuestionsAnswered: function()
	{
		var lQuestions = cp.movie.questionObjs;
		if(!lQuestions)
			return false;
		var lNumQuestions = lQuestions.length;
		if(lNumQuestions<=0)
			return false;
	
		for(var lIndex = 0; lIndex < lNumQuestions; ++lIndex)
		{
			if(!lQuestions[lIndex])
				continue;
			if (lQuestions[lIndex].getWasJudged() && !lQuestions[lIndex].getIsIncomplete()) 
			{
				return true;
			}
		}
		return false;
	},
	
	//If a question that is not a pre-test question is answered, this returns true. Else, false.
	GetAnyNonPreTestQuestionAnswered: function()
	{
		var lQuestions = cp.movie.questionObjs;
		if(!lQuestions)
			return false;
		var lNumQuestions = lQuestions.length;
		if(lNumQuestions<=0)
			return false;
	
		for(var lIndex = 0; lIndex < lNumQuestions; ++lIndex)
		{
			if(!lQuestions[lIndex])
				continue;
			if(lQuestions[lIndex].getIsPretest())
				continue;
			if (lQuestions[lIndex].getWasJudged() && !lQuestions[lIndex].getIsIncomplete()) 
			{
				return true;
			}
		}
		return false;
	},
	
	CanEnterSlide: function(aSlideIndex)
	{
		var lHasQuiz = this.m_playbackController && this.m_playbackController.HasQuiz();
		if(!lHasQuiz)
			return "";
			
		var toSlideType = this.GetSlideType(aSlideIndex);
		var lCurrentSlideIndex = cpInfoCurrentSlideIndex;
		var lSlideIsScoreSlide = false;
		if ((lCurrentSlideIndex ==  this.GetAnyScoreSlideIndex())&& (toSlideType == "Question") && !this.GetIsInReviewMode() && (this.GetCurrentAttempt() >= this.GetNumberOfQuizAttempts())) 
		{
			// don't allow re-entry into quiz if not in review mode and
			// too many quiz attempts already.
			if (this.GetIsAllowReviewMode()) 
			{
				//if number of attempts have expired, and we are tring to go back to a question slide because of success/failure action
				//then allow it, to go in review mode
				return "";
			} 
			else 
			{
				return "QUIZ_ERROR_TOO_MANY_QUIZ_ATTEMPTS";
			}
		}
		if (!this.quizInProgress || 
			((this.GetQuestionAdvanceType() == 'optional') && (this.GetTotalRetries() > 0))) 
			{
			// we're allowed to advance past the end of the questions
			switch (toSlideType) 
			{
				case "Question":
					if (!this.GetIsInReviewMode() && !this.quizInProgress && (this.GetCurrentAttempt() >= this.GetNumberOfQuizAttempts())) 
					{
						if (this.GetIsAllowReviewMode()) 
						{
							return ("");
			            } 
			            else
			            {
			               	return("QUIZ_ERROR_TOO_MANY_QUIZ_ATTEMPTS");
			            }
					}
					break;
				case "AnyScoreSlide":
					lSlideIsScoreSlide = true;
					break;
			}
			
			if ((lSlideIsScoreSlide && (!this.quizInProgress)) && (!this.GetIsInReviewMode())) 
			{
				return "QUIZ_ERROR_MUST_START_QUIZ_TO_SEE_SCORE_SLIDE";
			}
		}
		return "";
	},
	
	CanLeavePretestQuestionSlide: function(aMovingBackward, aQuestion)
	{
		//Commenting as pretest is now always allowed to skip
		/*if(!aQuestion)
			return "";
			
		if (!this.GetIsInReviewMode() && !aMovingBackward && (aQuestion.currentAttempt == 0))
			return "QUIZ_ERROR_MUST_ANSWER_QUESTION";*/
			
		return "";
	},
	
	CanLeaveQuestionSlide: function(aFromSlideIndex, aMovingBackward)
	{
		var lQuestionsOnSlide = this.GetQuestionsOnSlide(aFromSlideIndex);
		if(lQuestionsOnSlide)
		{
			for(var i = 0; i < lQuestionsOnSlide.length; i++)
			{
				var lQuestion = lQuestionsOnSlide[i];				
				if (lQuestion && lQuestion.getIsPretest()) 
					return this.CanLeavePretestQuestionSlide(aMovingBackward, lQuestion);							
			}
		}
			
		// If we're on a question, see if we are allowed to advance past it
		var lSubmitAll = this.GetIsSubmitAll();		
		var lBranchAware = this.GetQuizBranchAware();		
		
		if ((this.GetQuestionAdvanceType() == 'mustAnswer') && !this.GetIsInReviewMode()  && !lSubmitAll && !lBranchAware)
		{
			var lQuestionsOnSlide = this.GetQuestionsOnSlide(aFromSlideIndex);
			if(!lQuestionsOnSlide)
				return "";
			for(var i = 0; i < lQuestionsOnSlide.length; i++)
			{
				var lQuestion = lQuestionsOnSlide[i];				
				if (!aMovingBackward && (lQuestion && (lQuestion.currentAttempt == 0))) 
					return "QUIZ_ERROR_MUST_ANSWER_QUESTION";							
			}
		}
		
		// If we're the last question, see if we can advance past the end of the quiz
		if (!aMovingBackward && (aFromSlideIndex == this.GetLastQuestionSlideInQuiz())) 
		{
			// last question in slide
			if ((this.GetQuizAdvanceType() == 'mustTake') && !this.GetAnyQuestionsAnswered() && (this.GetCurrentAttempt() <= 1)) 
			{
				return "QUIZ_ERROR_MUST_TAKE_QUIZ";
			}
		}
		else if (aMovingBackward) 
		{
			if (!this.GetIsInReviewMode() && !this.GetAllowBackwardMovementInQuiz() && (cpInfoCurrentSlideIndex == aFromSlideIndex)) 
			{
				// This prohibits *any* backward movement
				// (to a question or a non-question slide
				// before the quiz).
				return "QUIZ_ERROR_CANNOT_MOVE_BACKWARD_IN_QUIZ";
			}
		}
		return "";
	},
	
	CanLeaveSlide: function(aFromSlideIndex, aMovingBackward)
	{
		var lHasQuiz = this.m_playbackController && this.m_playbackController.HasQuiz();
		if(!lHasQuiz)
			return "";
		var lError ="";
			
		var lFromSlideType = this.GetSlideType(aFromSlideIndex);
		var lQuizScopeEndSlideIndex = this.GetQuizScopeEndSlideIndex();
		
		if(lFromSlideType == "Question")
		{
			lError = this.CanLeaveQuestionSlide(aFromSlideIndex, aMovingBackward);
			if(lError != "")
				return lError;
		}
		
		if((aFromSlideIndex >= 0) && (aFromSlideIndex ==  lQuizScopeEndSlideIndex))
		{
			if(lFromSlideType == "AnyScoreSlide")
			{
				if (!this.GetAllowSkipAnyScoreSlide() && !this.sawAnyScoreSlide  && this.quizInProgress) 
					return "QUIZ_ERROR_MUST_SEE_SCORE_SLIDE";
			}
			var lPassingScore = this.GetPassingScore();
			if (!aMovingBackward && (this.GetQuizAdvanceType() == "mustPass") && (lPassingScore != 'NaN') && (this.GetScore() < lPassingScore)) 
				return "QUIZ_ERROR_MUST_PASS_QUIZ";			
		}
		return lError;
	},
	
	GetPreviousQuestionSlideNumber: function()
	{
		 var lPreviousQuestionSlideNum = -1;	
		 if(!cp.movie || !cp.movie.stage)
			return -1;
			
		 var lCurrentSlideIndex = cpInfoCurrentSlideIndex;
		  //Case1: If QuizBranchAware Is ON then pick question from branch
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager!=undefined)
		{
			var lCurrentBranch = lGraphManager.getCompletionBranch();
			for( var iter = 0; iter < lCurrentBranch.length ; ++iter )
			{
				var lSlideIndex = lCurrentBranch[iter];
				var lSlideType = "";
				var lQuestions = this.GetQuestionsOnSlide(lSlideIndex);
				if(lQuestions && lQuestions.length > 0)
					lSlideType = "Question";
				else if(this.GetAnyScoreSlideIndex() == lSlideIndex)
					lSlideType = "AnyScoreSlide";			
				if(((lSlideType == "AnyScoreSlide") || (lSlideType == "Question")) && (lSlideIndex < lCurrentSlideIndex))
				{
					if((lPreviousQuestionSlideNum == -1) || (lSlideIndex > lPreviousQuestionSlideNum))
						lPreviousQuestionSlideNum = lSlideIndex;	
				}
			}			
		}
		else
		{
			var lSlides = this.m_playbackController.GetSlideNames();
			//Now need to find out the immediate previous question slide in sequence
			for (var lSlideIndex = 0; lSlideIndex < lSlides.length; ++lSlideIndex) 
			{
				var tempSlideName = lSlides[lSlideIndex];
				var tempSlideData = cp.model.data[tempSlideName];
				var lSlideType = "";
				var lQuestions = this.GetQuestionsOnSlide(lSlideIndex);
				if(lQuestions && lQuestions.length > 0)
					lSlideType = "Question";
				else if(this.GetAnyScoreSlideIndex() == lSlideIndex)
					lSlideType = "AnyScoreSlide";
				if(((lSlideType == "AnyScoreSlide") || (lSlideType == "Question")) && (lSlideIndex < lCurrentSlideIndex))
				{
					if((lPreviousQuestionSlideNum == -1) || (lSlideIndex > lPreviousQuestionSlideNum))
						lPreviousQuestionSlideNum = lSlideIndex;	
				}
			}	
		}
		return lPreviousQuestionSlideNum;
	},
	
	GetNextQuestionSlideNumber: function()
	{
		 var lNextQuestionSlideNum = -1;	
		 if(!cp.movie || !cp.movie.stage)
			return -1;
			
		  var lCurrentSlideIndex = cpInfoCurrentSlideIndex;
		 //Case1: If QuizBranchAware Is ON then pick question from branch
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager!=undefined)
		{
			var lCurrentBranch = lGraphManager.getCurrentBranch();
			for( var iter = 0; iter < lCurrentBranch.length ; ++iter )
			{
				var lSlideIndex = lCurrentBranch[iter];
				var lSlideType = "";
				var lQuestions = this.GetQuestionsOnSlide(lSlideIndex);
				if(lQuestions && lQuestions.length > 0)
					lSlideType = "Question";
				else if(this.GetAnyScoreSlideIndex() == lSlideIndex)
					lSlideType = "AnyScoreSlide";			
				if(((lSlideType == "AnyScoreSlide") || (lSlideType == "Question")) && (lSlideIndex > lCurrentSlideIndex))
				{
					if((lNextQuestionSlideNum == -1) || (lSlideIndex < lNextQuestionSlideNum) || (lNextQuestionSlideNum == lCurrentSlideIndex ))
						lNextQuestionSlideNum = lSlideIndex;	
				}
			}			
		}
		else
		{
			var lSlides = this.m_playbackController.GetSlideNames();
			//Now need to find out the immediate previous question slide in sequence
			for (var lSlideIndex = 0; lSlideIndex < lSlides.length; ++lSlideIndex) 
			{
				var tempSlideName = lSlides[lSlideIndex];
				var tempSlideData = cp.model.data[tempSlideName];
				var lSlideType = "";
				var lQuestions = this.GetQuestionsOnSlide(lSlideIndex);
				if(lQuestions && lQuestions.length > 0)
					lSlideType = "Question";
				else if(this.GetAnyScoreSlideIndex() == lSlideIndex)
					lSlideType = "AnyScoreSlide";			
				if(((lSlideType == "AnyScoreSlide") || (lSlideType == "Question")) && (lSlideIndex > lCurrentSlideIndex))
				{
					if((lNextQuestionSlideNum == -1) || (lSlideIndex < lNextQuestionSlideNum))
						lNextQuestionSlideNum = lSlideIndex;	
				}
			}	
		}
		return lNextQuestionSlideNum;
	},
	
	GetPercentCorrect: function()
	{
		var lMaxScore = this.GetMaxScore();
		if(lMaxScore == 0)
			return " ";
		if(!lMaxScore)
			return " ";
			
		var pct;
		pct = Math.round((this.GetScore()*100.0/lMaxScore)*100)/100;
		return pct+"%";
	},
	
	GetTotalCorrectQuestions: function()
	{
		if (!this.m_QuizzingData)
            return 0;
	
	var lGraphManager = this.GetGraphManager();	

        var lQuestionObjs = cp.movie.questionObjs;
        if (!lQuestionObjs)
            return 0;
		
		var lNumQuestionsCorrect = 0;
        for (var i = 0; i < lQuestionObjs.length; ++i) 
		{
            if (!lQuestionObjs[i])
                continue;
	 		if (lQuestionObjs[i].getIsPretest())
				continue;
			if(lGraphManager!=undefined)
			{
				//If Branch Aware is On then check if the slide is present in current branch
				if(lGraphManager.isSlidePartOfCurrentBranch(lQuestionObjs[i].getSlideIndex()) && lQuestionObjs[i].getWasJudged() && lQuestionObjs[i].getAnsweredCorrectly())
					lNumQuestionsCorrect = lNumQuestionsCorrect + 1;
			}
			else if(lQuestionObjs[i].getWasJudged() && lQuestionObjs[i].getAnsweredCorrectly())
				lNumQuestionsCorrect = lNumQuestionsCorrect + 1;
        }
		return lNumQuestionsCorrect;
	},
	
	StartQuestion: function(currentQuestion)
	{
		if(currentQuestion != undefined)
		{
			currentQuestion.slide = this.m_playbackController.GetCurrentSlide();
			currentQuestion.startQuestion();
		}
	},
		   
	GetFailingGradeActionString: function () 
	{
        if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['failingGradeActionString'];
    },

    GetFailingGradeActionParam: function () 
	{
        if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['failingGradeActionParam'];
    },

    GetIsTracked: function()
	{
		if (!this.m_QuizzingData)
            return false;

        return this.m_QuizzingData['it'];
	},	
	
	GetQuestionSlidesNames: function()
	{
		return this.m_questionSlideNames;
	},
	
	AddQuestionSlideNames: function(slideName)
	{
		if(!this.m_questionSlideNames)
			this.m_questionSlideNames = new Array();
		
		this.m_questionSlideNames.push(slideName);
	},
	GetAllQuestionsInBranchAnswered: function()
	{
		var lGraphManager = this.GetGraphManager();
		if(!lGraphManager)
			return false;
		var lCompletionBranch = lGraphManager.getCompletionBranch();
		if((lCompletionBranch == undefined) || (lCompletionBranch.length <= 0))
			return false;
		
		//Check all the question slides in the branch is visited and attempted		
		for( var iter = 0; iter < lCompletionBranch.length ; ++iter )
		{
			var lBranchSlideIndex = lCompletionBranch[iter];
			var lQuestionsOnSlide = this.GetQuestionsOnSlide(lBranchSlideIndex);
			if(lQuestionsOnSlide && lQuestionsOnSlide.length>0)
			{
				for (var i = 0; i < lQuestionsOnSlide.length; ++i) 
				{
					var lQuestion = lQuestionsOnSlide[i];
					if(lQuestion.getIsPretest() &&  this.m_PretestQuestionsDisabled)
						continue;
					var lSubmitAll = this.GetIsSubmitAll() && !lQuestion.getIsPretest();
					if ((lQuestion.getWeighting() >= 0) &&  ((!lQuestion.getWasJudged()  && !lSubmitAll)|| lQuestion.getIsIncomplete() || (lQuestion.getCurrentAttempt() == 0))) 
					{
						return false;
					}
				}
			}
		}
		
		return true;
	},
	GetAllQuestionsAnswered: function()
	{
		var lQuizBranchAware = this.GetQuizBranchAware();
		if(lQuizBranchAware == true)
		{
			if(this.GetAllQuestionsInBranchAnswered())
				return true;
		}
			
		var lQuestionScores = this.GetQuestionScoresToSend();
		var lSlidesSeen = [];
		// Make sure that all questions with nonzero weight have been
		// answered.
		for (whichQuestionScore in lQuestionScores) 
		{
			var lQuesScore = lQuestionScores[whichQuestionScore];
			if(lQuesScore)
				lSlidesSeen[lQuesScore.getslideNum()] = true;
		}
		
		 var lFirstSlideInQuizIndex = this.m_QuizzingData['firstSlideInQuiz'];
		 var lLastSlideInQuizIndex = this.m_QuizzingData['lastSlideInQuiz'];
		if(lFirstSlideInQuizIndex == undefined || lFirstSlideInQuizIndex == -1 || lLastSlideInQuizIndex == undefined || lLastSlideInQuizIndex == -1)
			return true;
			
		for (var i = lFirstSlideInQuizIndex; i <= lLastSlideInQuizIndex; i++) 
		{
			if (!lSlidesSeen[i])
			{
				var lQuestionsOnSlide = this.GetQuestionsOnSlide(i);
				if(lQuestionsOnSlide && lQuestionsOnSlide.length>0)
				{
					return false;
				}
			}
		}
		
		for (whichQuestionScore in lQuestionScores) 
		{
			var lQuesScore = lQuestionScores[whichQuestionScore];
			if(lQuesScore)
			{
				if(lQuesScore.getIsPretest() &&  this.m_PretestQuestionsDisabled)
					continue;
				var lSubmitAll = this.GetIsSubmitAll() && !lQuesScore.getIsPretest();
				if ((lQuesScore.getweighting() >= 0) &&  ((!lQuesScore.getwasJudged() && !lSubmitAll)|| lQuesScore.getAnswersIncomplete() || (lQuesScore.getNumTries() == 0))) 
				{
					return false;
				}
			}
		}		
		
		return true;
	},
	
	SendInteractionData: function(questionScore,descriptionText)
	{
		if (!this.m_QuizzingData)
            return false;
		
		if(this.verbose)
			cp.log("QuizController::SendInteraction()");
		
		if(this.GetIsTracked())
		{
			this.m_playbackController.SendInteractionData(questionScore,descriptionText);
		}
	},

    SendQuestionEventDataForSubmitAll: function () {
        var lQuestionScores = this.GetQuestionScoresToSend();
        for (whichQuestionScore in lQuestionScores) {
            var lQuesScore = lQuestionScores[whichQuestionScore];
            if (!lQuesScore)
                continue;

            if (lQuesScore.getisPretestQuestion())
                continue;

            this.m_playbackController.SendQuestionEventData(lQuesScore);            
        }
    },

	SendInteractionsForSubmitAll: function()
	{
		var lQuestionScores = this.GetQuestionScoresToSend();
		for (whichQuestionScore in lQuestionScores)
		{
			var lQuesScore = lQuestionScores[whichQuestionScore];
			if(!lQuesScore)
				continue;
			if(lQuesScore.getisPretestQuestion())
				continue;
			if(lQuesScore.getanswersIncomplete()) 
				continue; //dont send interaction for this question
						
			var lDescriptionText = lQuesScore.getdescriptionText();			
			this.SendInteractionData(lQuesScore, lDescriptionText);
		}	
	},
	
	DoSubmitAll:function(aCurrentSlideIndex)
	{
		if((aCurrentSlideIndex==undefined) || (aCurrentSlideIndex < 0))
			return false;
		//Show submit all dialog only if  last slide(quizScopeEndSlide)
		var lQuizScopeEndSlideIndex = this.GetQuizScopeEndSlideIndex();
		if((lQuizScopeEndSlideIndex  == undefined)|| (lQuizScopeEndSlideIndex < 0))
			return false;
		if(aCurrentSlideIndex != lQuizScopeEndSlideIndex)
			return false;			
		if(this.m_RunTimeMsgBox!=undefined) //dialog already shown 
			return false;	
		if(this.m_HandledSubmitAll)
			return false;
		if(this.GetIsSubmitAll() == false)
			return false;		
		this.SubmitAllQuestions(true, false);
		return true;
	},
	
	SubmitAllDialogShown:function(aFromSlideIndex, aToSlideIndex)
	{
		if((aFromSlideIndex == undefined) || (aFromSlideIndex < 0) ||(aToSlideIndex == undefined) || (aToSlideIndex < 0))
			return false;
		if(this.m_RunTimeMsgBox != undefined) //Check if message is already shown
			return true;
		if(aFromSlideIndex >= aToSlideIndex)
			return false;
		if(this.m_HandledSubmitAll)
			return false;
		if(this.GetIsInReviewMode())
			return false;
		if(this.GetIsSubmitAll() == false)
			return false;
		
		var lAnyScoreSlidIndex = this.GetAnyScoreSlideIndex();
		var lQuizScopeEndSlideIndex = this.GetQuizScopeEndSlideIndex();
		//Case 1: Result Slide is present
		if(lAnyScoreSlidIndex >= 0) 
		{ 
			if(aToSlideIndex == lAnyScoreSlidIndex) //Need to show submitAll dialog if ToSlide is Result Slide 		
			{
				this.SubmitAllQuestions(true, false);
				return true;
			}				
		}
		//Case2: Result Slide is not present. Check quizScopeEndSlide
		else if(lQuizScopeEndSlideIndex >= 0)
		{
			//Need to show submitAll dialog if FromSlide is QuizScopeEndSlide. i.e. user is trying to leave quizScopeEndSlide
			if(aFromSlideIndex == lQuizScopeEndSlideIndex)
			{
				this.SubmitAllQuestions(true, false);
				return true;
			}
		}
		
		return false;
	},
	
	ReturnToQuiz:function()
	{
		if(this.m_RunTimeMsgBox != undefined)
		{
			//hide dialog 
			this.m_RunTimeMsgBox.hide();
			this.m_RunTimeMsgBox = undefined;
			//Restore Question Accessibility
			var lCurrSlideIndex = this.m_playbackController.GetCurrentSlideIndex();
			var lQuestions = this.GetQuestionsOnSlide(lCurrSlideIndex);
			if (lQuestions) 
			{
				for (var i = 0; i < lQuestions.length; ++i) 
				{
					var lQuestion = lQuestions[i];
					//lQuestion.setAccessibility();
					lQuestion.state = lQuestion.StateEnum.PAUSED;
				}
			}	
		}
		
		//Now GoToFirstQuizSlide
		var lFirstQuestionSlideIndex = this.GetFirstSlideInQuizIndex();
		if(lFirstQuestionSlideIndex >= 0)
		{
			cpCmndGotoSlideAndResume = lFirstQuestionSlideIndex;
			this.m_HandledSubmitAll = false; //reset the value so that user can again do the submit all
		}
	},
	
	ForceSubmitAll:function()
	{
		if(!this.m_playbackController)
			return;
			
		if(this.m_RunTimeMsgBox != undefined)
		{
			//hide dialog
			this.m_RunTimeMsgBox.hide();
			this.m_RunTimeMsgBox = undefined;
			//Restore Question Accessibility
			var lCurrSlideIndex = this.m_playbackController.GetCurrentSlideIndex();
			var lQuestions = this.GetQuestionsOnSlide(lCurrSlideIndex);
			if (lQuestions) 
			{
				for (var i = 0; i < lQuestions.length; ++i) 
				{
					var lQuestion = lQuestions[i];
					//lQuestion.setAccessibility();
					lQuestion.state = lQuestion.StateEnum.PAUSED;
				}
			}	
		}
		
		var lAnyScoreSlideIndex = this.GetAnyScoreSlideIndex();
		var lQuizScopeEndSlideIndex = this.GetQuizScopeEndSlideIndex();
		
		//Jump to Result Slide or slide after quizScopeSlide
		if(lAnyScoreSlideIndex >= 0)
		{
			cpCmndGotoSlideAndResume = lAnyScoreSlideIndex;			
		}
		else if(lQuizScopeEndSlideIndex >= 0)
		{
			var lQuizScopeEndSlideLastFrame = -1;
			var lSlideNames = this.m_playbackController.GetSlideNames();
			var lNumSlides = lSlideNames.length;
			if((lNumSlides >0) && (lQuizScopeEndSlideIndex < lNumSlides))
			{
				var lQuizScopeEndSlideName = lSlideNames[lQuizScopeEndSlideIndex];
				if(lQuizScopeEndSlideName)
				{
					var lQuizScopeEndSlideData = cp.model.data[lQuizScopeEndSlideName];
					if(lQuizScopeEndSlideData)
						lQuizScopeEndSlideLastFrame = lQuizScopeEndSlideData.to;
				}
			}
			cpCmndGotoFrameAndResume = lQuizScopeEndSlideLastFrame -1;
			
			
			if (!this.GetIsInReviewMode() && (this.GetCurrentAttempt() >= this.GetNumberOfQuizAttempts()) && this.GetIsAllowReviewMode())
				this.SetIsInReviewMode(true);
		}
		
		this.m_submittedAllQuestions = true;
		//---------------------LMS Specific Stuff------------------------------------------
        //Interaction/Suspend Data  is sent inside question.endQuestion();
        //Course Data(Scores) should be sent here		
        if (this.m_playbackController && this.m_playbackController.GetSendCourseDataWithInteractionData()) 
		{
		    this.SendInteractionsForSubmitAll();
		    this.SendQuestionEventDataForSubmitAll();
		   
			var lLMSType = this.m_playbackController.GetLMSType().toUpperCase();

            if (this.m_playbackController.GetIsTracked() && (lLMSType != "EMAIL") && (lLMSType != "ACROBAT") && (lLMSType != "INTERNALSERVER"))               
			{
                this.m_playbackController.SendCourseData(true);
			}	
            else
			{
                this.m_playbackController.SendCourseData(false);
			}
        }
	},
	
	DefaultHandlerForRuntimeMessageBox: function()
	{
		if(!this.m_playbackController)
			return;
			
		if(this.m_RunTimeMsgBox != undefined)
		{
			//hide dialog
			this.m_RunTimeMsgBox.hide();
			this.m_RunTimeMsgBox = undefined;
			//Restore Question Accessibility
			var lCurrSlideIndex = this.m_playbackController.GetCurrentSlideIndex();
			var lQuestions = this.GetQuestionsOnSlide(lCurrSlideIndex);
			if (lQuestions) 
			{
				for (var i = 0; i < lQuestions.length; ++i) 
				{
					var lQuestion = lQuestions[i];
					//lQuestion.setAccessibility();
					lQuestion.state = lQuestion.StateEnum.PAUSED;
				}
			}	
			
			this.m_HandledSubmitAll = false; //reset the value so that user can again do the submit all
			
			//Resume the question if SubmitAllDialog is shown at the end of QuizScopeEndSlide (Case when dialog is shown at stopOnFrame of quizScopeEndSlide)
			var lQuizScopeEndSlideIndex = this.GetQuizScopeEndSlideIndex();		
			if((lCurrSlideIndex>=0) && (lQuizScopeEndSlideIndex>=0) && (lCurrSlideIndex == lQuizScopeEndSlideIndex))
			{
				var lCurrSlideName = this.m_playbackController.GetCurrentSlide();
				var lSlideData = cp.model.data[lCurrSlideName];	
				if(lSlideData && (cpInfoCurrentFrame >= lSlideData.to))
					cpCmndGotoSlideAndResume = lCurrSlideIndex;
			}
		}
	},
	
	SubmitAllQuestions: function(aShowRunTimeDialog, aLeavingQuiz)
	{
		this.m_HandledSubmitAll = true;

		if(aShowRunTimeDialog == false) //MessageDialog not required ...force submit all Question
			return ForceSubmitAll();
		
		//Show MessageDialog
		if(this.m_RunTimeMsgBox != undefined)
		{
			this.m_RunTimeMsgBox.hide();
			this.m_RunTimeMsgBox = undefined;	
		}
		
		var lAnswerAllQuestions = (this.GetQuestionAdvanceType() == 'mustAnswer');		
		var lCurrSlideIndex = this.m_playbackController.GetCurrentSlideIndex();
		var lQuestions = this.GetQuestionsOnSlide(lCurrSlideIndex);
		if (lQuestions) 
		{
			for (var i = 0; i < lQuestions.length; ++i) 
			{
				var lQuestion = lQuestions[i];
				if(lQuestion)
				{
					//lQuestion.disableAccessibility();
					//Update Question Score before submitting current questions
					//if(!(lAnswerAllQuestions && lQuestion.getIsIncomplete()))
						lQuestion.endQuestion(false);	
				}
			}
		}	
		
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

		var lTitleString = lRuntimeDialogData['rtt'];
		var lSubmitAllMessageString = lRuntimeDialogData['rtsam'];
		var lIncompleteQuizMessageString = lRuntimeDialogData['rtiqm'];
		var lSubmitIncompleteQuizMessageStr = lRuntimeDialogData['rtsiqm'];
		var lSubmitAnywayMessageString = lRuntimeDialogData['rtsanym'];
		
		var lOKButtonString = lRuntimeDialogData['rtokb'];
		var lCancelButtonString = lRuntimeDialogData['rtcb'];
		var lYesButtonString = lRuntimeDialogData['rtyb'];
		var lNoButtonString = lRuntimeDialogData['rtnb'];
		var lSubmitAllButtonString = lRuntimeDialogData['rtsab'];
		var lSubmitAnywayButtonString = lRuntimeDialogData['rtsanyb'];
		var lReturnToQuizButtonString = lRuntimeDialogData['rtrtqb'];
        var lMustTakeQuizMessageString = lRuntimeDialogData['rtmtqm'];
			
		//Create Message Box
		var lAllQuestionsAnswered = this.GetAllQuestionsAnswered();		
        
        var lCanDoSubmitAll = this.CanDoSubmitAll();
        if (lCanDoSubmitAll == "QUIZ_ERROR_MUST_TAKE_QUIZ")
		{
            this.m_RunTimeMsgBox = new RuntimeMessageBox(document.getElementById("cpDocument"),1,
										lBGFillColor,lBGStrokeColor,
										lBtnFillColor,lBtnStrokeColor,
										lSeparatorColor,lTextColor,
										lTextShadowColor,lTextFontName);
			this.m_RunTimeMsgBox.setTitleText(lTitleString);			
			this.m_RunTimeMsgBox.setMessageText(lMustTakeQuizMessageString);
			this.m_RunTimeMsgBox.setFirstButtonText(lOKButtonString);
			this.m_RunTimeMsgBox.registerFirstButtonHandler(defaultHandlerForRuntimeMessageBox);
			this.m_RunTimeMsgBox.show();	
        }            			
		else if(lAnswerAllQuestions && !lAllQuestionsAnswered )
		{
			this.m_RunTimeMsgBox = new RuntimeMessageBox(document.getElementById("cpDocument"),1,
										lBGFillColor,lBGStrokeColor,
										lBtnFillColor,lBtnStrokeColor,
										lSeparatorColor,lTextColor,
										lTextShadowColor,lTextFontName);
			this.m_RunTimeMsgBox.setTitleText(lTitleString);			
			this.m_RunTimeMsgBox.setMessageText(lIncompleteQuizMessageString);
			this.m_RunTimeMsgBox.setFirstButtonText(lOKButtonString);
			this.m_RunTimeMsgBox.registerFirstButtonHandler(defaultHandlerForRuntimeMessageBox);
			this.m_RunTimeMsgBox.show();			
		}
		else if(!lAllQuestionsAnswered)
		{
			this.m_RunTimeMsgBox = new RuntimeMessageBox(document.getElementById("cpDocument"),2,
										lBGFillColor,lBGStrokeColor,
										lBtnFillColor,lBtnStrokeColor,
										lSeparatorColor,lTextColor,
										lTextShadowColor,lTextFontName);
			this.m_RunTimeMsgBox.setTitleText(lTitleString);
			if(aLeavingQuiz)
			{
				this.m_RunTimeMsgBox.setMessageText(lSubmitAnywayMessageString);
				this.m_RunTimeMsgBox.setFirstButtonText(lSubmitAnywayButtonString);
				this.m_RunTimeMsgBox.setSecondButtonText(lReturnToQuizButtonString);			
				this.m_RunTimeMsgBox.registerSecondButtonHandler(returnToQuiz);				
			}
			else
			{
				this.m_RunTimeMsgBox.setMessageText(lSubmitIncompleteQuizMessageStr);
				this.m_RunTimeMsgBox.setFirstButtonText(lYesButtonString);
				this.m_RunTimeMsgBox.setSecondButtonText(lNoButtonString);			
				this.m_RunTimeMsgBox.registerSecondButtonHandler(defaultHandlerForRuntimeMessageBox);				
			}
			this.m_RunTimeMsgBox.registerFirstButtonHandler(forceSubmitAll);					
			this.m_RunTimeMsgBox.show();				
		}
		else
		{
			//All Questions are answered
			this.m_RunTimeMsgBox = new RuntimeMessageBox(document.getElementById("cpDocument"),2,
										lBGFillColor,lBGStrokeColor,
										lBtnFillColor,lBtnStrokeColor,
										lSeparatorColor,lTextColor,
										lTextShadowColor,lTextFontName);
			this.m_RunTimeMsgBox.setTitleText(lTitleString);			
			this.m_RunTimeMsgBox.setMessageText(lSubmitAllMessageString);
			this.m_RunTimeMsgBox.setFirstButtonText(lSubmitAllButtonString);
			this.m_RunTimeMsgBox.registerFirstButtonHandler(forceSubmitAll);
			this.m_RunTimeMsgBox.setSecondButtonText(lReturnToQuizButtonString);			
			this.m_RunTimeMsgBox.registerSecondButtonHandler(returnToQuiz);
			this.m_RunTimeMsgBox.show();	
		}
	},
	
	GetPlaybackController: function(iPlaybackController)
	{
		return this.m_playbackController;
	},
	
	SetPlaybackController: function(iPlaybackController)
	{
		this.m_playbackController = iPlaybackController;
	}
}

cp.PlaybackController = function()
{
	this.m_QuizReportingData = cp.model.data['quizReportingData'];
	//ReportingOptionsEnum
	if (!this['ReportingOptionsEnum'])
	{
		this.ReportingOptionsEnum = new Object();
		this.ReportingOptionsEnum.breeze = 0;
		this.ReportingOptionsEnum.quiz_only = 1;
		this.ReportingOptionsEnum.quiz_and_views = 2;
		this.ReportingOptionsEnum.views_only = 3;
		this.ReportingOptionsEnum.access = 4;
		this.ReportingOptionsEnum.completion_success = 5;
		this.ReportingOptionsEnum.incompleteToPassedOrFailed = 6;
		this.ReportingOptionsEnum.completion_only = 7;
	}	
	
	//Slide Views Type Enum
	if (!this['SlideViewsTypeEnum'])
	{
		this.SlideViewsTypeEnum = new Object();
		this.SlideViewsTypeEnum.percent = 0;
		this.SlideViewsTypeEnum.number = 1;		
	}
	
	//Slide Views For Completion Enum
	if (!this['QuizCriteriaEnum'])
	{
		this.QuizCriteriaEnum = new Object();
		this.QuizCriteriaEnum.QuizIsPassed = 0;
		this.QuizCriteriaEnum.QuizIsAttempted = 1;	
		this.QuizCriteriaEnum.QuizIsPassedOrAttempLimitReached = 2
	}	
	
	this.m_sendCourseDataWithInteractionData = true;
	
	this.m_completionValueToSend = "default";
	this.m_completionTrigger; //type :ReportingOptionsEnum
	this.m_slideViewsForSuccess;//type :Number;
	this.m_slideViewsForCompletion;//type :Number;
	this.m_completionCriteria;//type :cpReportingOptionsEnum;
	this.m_successCriteria;//type :cpReportingOptionsEnum;
	this.m_successQuizCriteria;//type :cpQuizCriteriaEnum;
	this.m_completionQuizCriteria;//type :cpQuizCriteriaEnum;
	this.m_completionSlideViewsType;//type :cpSlideViewsTypeEnum;
	this.m_successSlideViewsType;//type :cpSlideViewsTypeEnum;
	
	this.m_sendIncompleteToPassedOrFailed = false;
	this.m_beginSendingSuccessStatus = true;
		
	this.m_VarHandle;//type :cpVariablesHandle;
	this.m_GoToQuizScopeActionExeuted = false;
	this.m_UseRusticiAdapter = true;
		
	this.m_lmsType;
	this.m_AuthorwareDelimeter;
	this.m_sendScoreAsPercent = false;
	this.m_trackingLevel = 0;
	this.m_completionSlideViewPercentage = 100;
	this.m_reportingOption = 0;
	//this.m_reportingVariables = 'cpReportingVariables';
	this.m_emailAddress = '';
	this.m_internalServerURL = '';
	this.m_companyName = '';
	this.m_departmentName = '';
	this.m_courseName = '';
	this.m_courseNode = '';
	this.m_isTrackedFlag = false;
	this.m_trackingUrlEncodeVersionAndSession = true;
	this.m_trackingCharsToNotUrlEncode = "";
	this.m_trackingSendResumeData = true;
	this.m_CmiExitNormalAfterCompletion= true;
	
	this.m_trackingIsOn = false;
	this.m_loadingResumeData = false;
	
	this.m_quizController;	
	
	this.currentSlide = "";
	this.currentSlideIndex = 0;
	this.m_slideNames = [];
	
	this.m_lastCourseDataSent;
	
	this.m_isTracked = false;
	this.m_trackingIsOn = false;
	this.verbose = false;
	
	this.m_GraphManager = undefined;
}	
cp.PlaybackController.prototype = 
{
	InitializePlaybackController: function()
	{
		var lSlideNames = cp.movie.stage.slides;
		if(!lSlideNames)
			return;		
		
		var lQuizController = this.GetQuizController();
				
		for(var i = 0; i < lSlideNames.length; ++i)
		{
			this.AddSlideInfo(lSlideNames[i]);				
		}
	},
	
	AddQuestionSlideNames: function()
	{
		var lSlideNames = cp.movie.stage.slides;
		if(!lSlideNames)
			return;		
		
		var lQuizController = this.GetQuizController();	
		if(!lQuizController)
			return;
		for(var i = 0; i < lSlideNames.length; ++i)
		{
			var lQuestionsOnSlide = lQuizController.GetQuestionsOnSlide(i);
			if(lQuestionsOnSlide && (lQuestionsOnSlide.length > 0))
				lQuizController.AddQuestionSlideNames(lSlideNames[i]);				
		}			
	},
	
	HasQuiz: function()
	{
		var lHasQuiz = false;
		var lQuizController = this.GetQuizController();
		if(lQuizController)
		{
			var lQuestions = lQuizController.GetQuestionSlidesNames();
			if((lQuestions != undefined) && (lQuestions.length>0))
				lHasQuiz = true;
		}
		return lHasQuiz;
	},
	
	InitializeGraphManager: function()
	{
		//BranchData will be there only if QuizIsBranchAware
		var lBranchData = cp.model.data['sgMgr'];
		if(lBranchData==undefined)
			return;
	
		var lQuestions = undefined;
		var lQuizController = this.GetQuizController();
		if(lQuizController)
			lQuestions = lQuizController.GetQuestionSlidesNames();
			
		if((lQuestions != undefined) && (lQuestions.length>0))
			this.m_GraphManager = new  cp.QuizSlideGraphManager();
		else
			this.m_GraphManager = new  cp.SlideGraphManager();
		
		if(this.m_GraphManager != undefined)
			this.m_GraphManager.initialize();
	},
	
	InitializeReportingVariables: function()
	{
		if(!this.m_QuizReportingData)
			return;
		var lmsInitializationCalls = this.m_QuizReportingData['lmsInitializationString'];
		if(!lmsInitializationCalls || lmsInitializationCalls == "")
			return;
		eval(lmsInitializationCalls);
	},
	
	GetGraphManager: function()
	{
		return this.m_GraphManager;
	},
	
	
	GetLoadingResumeDataBln: function()
	{
		return this.m_loadingResumeData;		
	},
	
	SetLoadingResumeData: function(iLoading)
	{
		var lOldLoadingResumeData = this.m_loadingResumeData;
		this.m_loadingResumeData = iLoading;
		/*if(lOldLoadingResumeData == false && iLoading)
		{
			m_movieController.pauseMovie();
		}
		if (lOldLoadingResumeData && !iLoading)
		{
			var lResumeMovie:Boolean = true;
			var lMovieProps:cpMovieProperties = cpMovieProperties.getInstance();
			if(m_movieController && (m_movieController.getState() == cpMovieStateEnum.cpMovieInitialState) &&
			   lMovieProps 	&& (lMovieProps.m_IsAutoPlay == false))
			{
				lResumeMovie = false;					
			}
			if(lResumeMovie)
				m_movieController.resumeMovie();
		}*/
	},
	
	saveQuizState: function(aQuizState)
	{
		aQuizState.writeNumber(cpInfoCurrentSlideIndex);
		for (var whichSlide =0; whichSlide < this.m_slideNames.length; ++whichSlide) 
		{
			var lSlideName = this.m_slideNames[whichSlide];
			var lSlideData = cp.model.data[lSlideName];
			if(!lSlideData)
				continue;
			aQuizState.writeBoolean(lSlideData.v); //seen
			aQuizState.writeString(""); //selectedPoolName //For SWF Compatibility
			aQuizState.writeNumber(999); //selectedQSlideIndex //For SWF Compatibility
		}
		
		var lQuizController = cp.movie.playbackController.GetQuizController();
		var lHasQuiz = cp.movie.playbackController.HasQuiz();		
		if(lQuizController && lHasQuiz)					
			lQuizController.saveState(aQuizState);
		
		//Write  SuspendVarsArr for User Variables
		var lVarInfo;		
		var lSuspendVarsArr = [];
		var lTotNum = cp.vm.varInfos.length;
		for (var i = 0; i < lTotNum; ++i)
		{
			lVarInfo = cp.vm.varInfos[i];
			if(lVarInfo && !lVarInfo.systemDefined)
				lSuspendVarsArr.push(lVarInfo);
		}		
			
		var itr  = 0;
		var lTotNumSuspendVar= lSuspendVarsArr.length;		
		var lVarValue;
		//Write total number of suspend var
		aQuizState.writeNumber(lTotNumSuspendVar);		
		for (itr = 0; itr < lTotNumSuspendVar; ++itr)
		{
			lVarInfo = lSuspendVarsArr[itr];
			lVarValue = cp.vm.getVariableValue(lVarInfo.name);
			if(lVarValue==null &&  lVarValue==undefined)
				lVarValue = 0;	
			//write variable Name
			aQuizState.writeString(lVarInfo.name);
			//write variable value
			if (isNaN(lVarValue))
			{
				aQuizState.writeNumber(0);
				aQuizState.writeString(lVarValue);
			}
			else
			{
				aQuizState.writeNumber(1);
				aQuizState.writeNumber(lVarValue);
			}
		}
	},

	restoreQuizFromState: function(aQuizState)
	{
		if(!aQuizState)
			return;
		var  lStateStr = aQuizState.toString();
		if(lStateStr.length <=0)
			return;
		
		var lRestoreSlideIndex =   aQuizState.readNumber();

		for (var whichSlide =0; whichSlide < this.m_slideNames.length; ++whichSlide) 
		{
			var lSlideName = this.m_slideNames[whichSlide];
			var lSlideData = cp.model.data[lSlideName];
			if(!lSlideData)
				continue;
			lSlideData.v =  aQuizState.readBoolean();
			var lSelectedPoolName = aQuizState.readString(); //Dummy Read not to be used yet
			var lSelectedQSlideIndex = aQuizState.readNumber(); //Dummy Read not to be used yet
			
		}
		
		var lQuizController = cp.movie.playbackController.GetQuizController();
		var lHasQuiz = cp.movie.playbackController.HasQuiz();
		if(lQuizController && lHasQuiz)
			lQuizController.restoreState(aQuizState);
			
		//Read for SuspendVar Realted Stuff for SWF Compatibility
		var itr = 0;
		var lVarName;
		var lVarValue;
		var lVarType = 0;
		var len = aQuizState.readNumber();
		for (itr = 0; itr < len; ++itr)
		{
			lVarName = aQuizState.readString();
			lVarType = aQuizState.readNumber();
			if (lVarType == 0)	 // string data
				lVarValue = aQuizState.readString(); 
			else	 // numeric data
				lVarValue = aQuizState.readNumber(); 
			if(cp.vm.hasOwnProperty(lVarName))
				cp.vm.setVariableValue(lVarName,lVarValue,false);
		}
		
		this.UpdateRestoredSlideIndex(lRestoreSlideIndex);
	},
	
	UpdateRestoredSlideIndex: function(lRestoreSlideIndex)
	{
		//BEGIN - BRINGING THIS CODE FROM ACTIONSCRIPT AS IT IS.....
		//dnayak: Fix bug 1680227... Earlier user would get stuck at slide if he has disabled navigation controls
		// and quits after answering last slide but before moving to another slide. Now we check if the last slide user was in was judged 
		// and move to next slide if true.		
		var lInlastslide = false;
		if(lRestoreSlideIndex >= (cp.movie.stage.slides.length - 1))
			lInlastslide = true;
		
		var lQuizController = cp.movie.playbackController.GetQuizController();
		var lIsJudged = false;
		var lSubmitAll = false;
		if(lQuizController)
		{
			lIsJudged = lQuizController.GetIsSlideJudged(lRestoreSlideIndex);
			lSubmitAll = lQuizController.GetIsSubmitAll();
		}
		if(!lInlastslide && !lSubmitAll && lIsJudged)
			lRestoreSlideIndex = lRestoreSlideIndex + 1;			
		
		//END - BRINGING THIS CODE FROM ACTIONSCRIPT AS IT IS.....
		
		var lProjData = cp.model.data['project_main'];
		if((lRestoreSlideIndex  >=0) && (lRestoreSlideIndex < cp.movie.stage.slides.length) && lProjData)
		{
			var lRestoreSlide = cp.movie.stage.slides[lRestoreSlideIndex];
			if(lRestoreSlide)
			{
				var lRestoreSlideData = cp.model.data[lRestoreSlide];
				if(lRestoreSlideData)
				{
					var lRestoreFrame = lRestoreSlideData['from'];
					if(lRestoreFrame != undefined)
						lProjData.currentFrame  = lRestoreFrame;
				}
			}
		}
	},
	
	AddSlideInfo: function(slideName)
	{
		if(!this.m_slideNames)
			this.m_slideNames = new Array();
		
		this.m_slideNames.push(slideName);
	},
	
	GetNumSlides: function()
	{
		if(!this.m_slideNames)
			return 0;
		return this.m_slideNames.length;
	},
	
	GetSlideNameAtIndex: function(index)
	{		
		if(!this.m_slideNames)
			return;
		if((index >= 0) && (index < this.m_slideNames.length))
			return this.m_slideNames[index];
	},
	
	GetSlideNames: function()
	{
		return this.m_slideNames;
	},
	
	
	LeaveCurrentSlide:function(aToSlideIndex)
	{
		if(this.verbose)
			cp.log("CPQuizLibrary :: PlaybackController :: Calling LeaveCurrentSlide");
		if(!this.m_quizController)
			return;
		if((aToSlideIndex == undefined)|| (aToSlideIndex<0))
			return;
		if(this.currentSlideIndex ==aToSlideIndex)
			return;
		this.m_quizController.LeaveSlide(this.currentSlideIndex,aToSlideIndex);
	},
	
	SetCurrentSlide: function(index)
	{
		//var prevQuizController:QuizController = quizControllerForSlide(currentSlide);
		if(this.verbose)
			cp.log("CPQuizLibrary :: QuizController :: inside SetCurrentSlide - " + index);
		var lSlideName = this.GetSlideNameAtIndex(index);
		if (lSlideName == this.currentSlide)
			return;
		if (lSlideName != this.currentSlide) 
		{
			//_gotoSlide(lSlideInfo, /* notifyOnly */ true, /* p_fromHB */ false);
		}
		this.currentSlide = lSlideName;
		this.currentSlideIndex = index;
		if(this.m_quizController)
		{
			this.m_quizController.EnterCurrentSlide(index);
		}
	},
	
	GetCurrentSlideIndex: function()
	{
		return this.currentSlideIndex;
	},
	
	GetCurrentSlide: function()
	{
		return this.currentSlide;
	},
	
	GetQuizController: function()
	{
		if(!this.m_quizController)
		{
			this.m_quizController = new cp.QuizController();
			this.m_quizController.InitializeQuizController();
			this.m_quizController.SetPlaybackController(this); 
		}		
		
		return this.m_quizController;
	},
	
	IsRunningInConnect: function()
	{
		if(!document.referrer)
			return false;
		return (document.referrer.indexOf("airspeed") != -1)//IS BREEZE
	},
	
	LMSIsBreeze: function()
	{
		return (this.m_lmsType == "BREEZE");
	},
		
	LMSIsAICC: function()
	{
		return (this.m_lmsType == "AICC");
	},
		
	LMSIsAlternateReporting:function()
	{
		return (this.m_lmsType == "ACROBAT") || (this.m_lmsType == "INTERNALSERVER");
	},
	
	GetTrackingData: function()
	{
		if(!IsLoaded())
			return;
		if(this.verbose)
			cp.log("Playback controller :: GetTrackingData()");
		this.m_trackingAdapter.GetTrackingData();
		if (this.m_trackingAdapter.IsTrackingDataLoaded()) 
		{
			var quizLocation = this.m_trackingAdapter.GetLessonLocation();
			var quizStateStr = this.m_trackingAdapter.GetLessonData();
			if(this.verbose)
				cp.log("Playback controller :: GetTrackingData() :: quizStateStr :: " + quizStateStr);
		}
		else
		{
			this.TurnOffTracking();			
		}
	},
	
	CreateTrackingAdapter: function()
	{
		if(this.verbose)
			cp.log("Playback controller :: CreateTrackingAdapter() :" + this.m_lmsType);
		//_tracking = new Tracking();
		
		var lAdapterSpecificData = new Object();//:AdapterSpecificData = null;
		if(this.m_lmsType.indexOf("SCORM") != -1)
		{
			lAdapterSpecificData.exitNormal		 =	this.m_CmiExitNormalAfterCompletion;
			lAdapterSpecificData.reportingOption =	this.m_reportingOption;
		}
		
		/*if (_tracking.createTrackingAdapter(preferredLMSType, AuthorwareDelimeter, emailAddress, getTrackingAdapterReference(), this.mmTrackingSWF, trackingUrlEncodeVersionAndSession, trackingCharsToNotUrlEncode, trackingSendResumeData,acrobatUsername,acrobatPassword, internalServerURL, reportingCompanyName, reportingDepartmentName,reportingCourseName, acrobatCourseNode, m_UseRusticiAdapter, lAdapterSpecificData))
		{
			var trAdapter = _tracking.currentTrackingAdapter();
		//trace("in PlaybackController.createTrackingAdapter, trAdapter = "+trAdapter);
			if ((trAdapter == null) || (trAdapter == undefined)) {
				
			} else if (trAdapter.isInitialized()) {
			//trace("tracking adapter is initialized, calling getTrackingData()");
				trAdapter.setReportingVariables(reportingVariables);
				getTrackingData();
			} else {
			//trace("polling for tracking adapter to become initialized");
				_pollLMSIntervalID = setInterval(doPollLMSInitialized, 250, this);
				_pollLMSStartTime = new Date();
				_gotoSlideCounter = 0;
			} 
		}
		else
		{
		//trace("PlaybackController.createTrackingAdapter returns false");
			//delete _tracking;
			_tracking = null;
			loadingResumeData = false;
			_trackingIsOn = false;
			//trace("get create trackign adapter data failed");
			lmsInitDone();
		}
		
		//trace("Actual LMS is:"+actualLMSType );*/
		var lSendSuspendData = true;
		var lReportingData = cp.model.data['quizReportingData'];
		if (lReportingData) 
			lSendSuspendData = lReportingData['trackingSendResumeData'];
			
		this.m_trackingAdapter = new cp.SCORM_Rustici();
		if(this.m_trackingAdapter)
		{
			if (lSendSuspendData != undefined)
				this.m_trackingAdapter.SetLessonDataTracked(lSendSuspendData);
			this.m_trackingAdapter.SetAdapterSpecificData(lAdapterSpecificData);
			this.m_trackingAdapter.Initialize();			
			if(this.m_trackingAdapter.IsInitialized())
			{				
				//trAdapter.setReportingVariables(reportingVariables);
				//this.GetTrackingData();
			}
			else
			{
				
			}
		}
		else
		{
			this.m_loadingResumeData = false;
			this.m_trackingIsOn = false;
			//lmsInitDone(); Hides LMS initialization movie-clip
		}
	},
	
	TurnOnTracking: function()
	{
		if(this.verbose)
			cp.log("Playback controller :: TurnOnTracking()");
		if (!this.m_trackingIsOn)// && !_slideContainer) 
		{
			this.m_loadingResumeData = true;
			this.m_trackingIsOn = true;
			
			//Show lms init movie				
			//cpMainTimeLineBase.getInstance().showLMSInit();
			
			this.CreateTrackingAdapter();				
		}
	},

	TurnOffTracking: function()
	{
		if(this.verbose)
			cp.log("Playback controller :: TurnOffTracking()");
		if (this.m_trackingIsOn) 
		{
			this.m_loadingResumeData = false;
			//clearInterval(_pollLMSIntervalID);
			this.m_trackingIsOn = false;
		}
	},
	
	GetIsTracked: function()
	{
		return this.m_isTracked;
	},
	
	SetIsTracked: function(iTrackedBln)
	{
		/*var urlUtilities:Utilities = new Utilities(null, m_movieController.getSlideContainer());

		//var temp_obj = urlUtilities.findParameter("airspeed");
		//if(temp_obj != undefined || temp_obj != null) {
		//	tracked = true;
		//}*/
		if(this.verbose)
			cp.log("Playback controller :: SetIsTracked()");
		if (iTrackedBln && (iTrackedBln != this.m_isTracked)) 
		{			
			this.TurnOnTracking();
		} 
		else if (!iTrackedBln) 
		{
			if (iTrackedBln != this.m_isTracked) 
			{				
				this.TurnOffTracking();
			} 
			else 
			{
				this.m_loadingResumeData = false;
			}
		}
		this.m_isTracked = iTrackedBln;
	},
	
	AllowedToGoToSlide: function(aFromSlideIndex, aToSlideIndex)
	{
		if(!this.m_quizController)
			return "";
		if(aFromSlideIndex == aToSlideIndex)
			return "";
		
		if ((aFromSlideIndex < 0) || (aToSlideIndex <0)) 
		{
			return "QUIZ_ERROR_BAD_SLIDE_NUM";
		}
		
		var lMovingBackward = aToSlideIndex < aFromSlideIndex;
		
		if(this.m_quizController.SubmitAllDialogShown(aFromSlideIndex,aToSlideIndex))
		{
			return "QUIZ_ERROR_SUBMIT_ALL";
		}
		
		var inc = (aFromSlideIndex<aToSlideIndex)?1:-1;
		var lError = ""
		var lFromSlideIndex = aFromSlideIndex;
		var lToSlideIndex= aToSlideIndex;
		
		while (true) 
		{
			//Loop Ending Condition
			if (lFromSlideIndex == lToSlideIndex) 
			{
				return this.m_quizController.CanEnterSlide(lToSlideIndex);
			}
			
			lError = this.m_quizController.CanLeaveSlide(lFromSlideIndex, lMovingBackward);
			
			if (lError != "") 
				return lError;
			
			lFromSlideIndex = lFromSlideIndex + inc;
		}
		return "";
	},
	
	GetTotalQuizScore: function()
	{
		if(!this.m_quizController)
			return;
		return this.m_quizController.GetScore();
	},
	
	GetTotalQuizMaxScore: function()
	{
		if(!this.m_quizController)
			return;
		return this.m_quizController.GetMaxScore();
	},
	
	GetTotalQuizMinScore: function()
	{
		if(!this.m_quizController)
			return;
		return this.m_quizController.GetMinScore();
	},
	
	GetTotalQuizLocation: function()
	{
		//currently returning slide name. Do we really need to change it to slide number.
		var currSlideName = this.GetCurrentSlide();		
		if(currSlideName)
			return currSlideName;
		return "0";
	},
	
	HasQuizzes: function()
	{
		if(!this.m_quizController)
			return false;
		return this.m_quizController.HasQuiz();
	},
	
	GetAllQuestionsAnswered: function()
	{
		if(!this.m_quizController)
			return false;
			
		if (!this.m_quizController.GetAllQuestionsAnswered()) 
		{
			return false;
		}		
		return true;
	},
	
	GetAllQuizAttemptsFinished: function()
	{
		if(!this.m_quizController)
			return false;
			
		if (!this.m_quizController.GetIsAttemptFinished()) 
		{
			return false;
		}		
		return true;
	},
	
	GetAllQuizzesPassed: function()
	{
		if(!this.m_quizController)
			return false;
			
		if (!this.m_quizController.GetIsPassed()) 
		{
			return false;
		}		
		return true;
	},
	
	GetNumberOfSlidesSeen: function()
	{
		var lNumSlidesSeen = 0;
		if(!this.m_slideNames)
			return false;
				
		for(var i = 0; i < this.m_slideNames.length; ++i)
		{
			var lCurrSlideName = this.m_slideNames[i];
			var lCurrSlideData = cp.model.data[lCurrSlideName];
			if(lCurrSlideData['v'])
				lNumSlidesSeen++;
		}
		
		return lNumSlidesSeen;
	},
	
	GetPercentageSlidesSeen: function()
	{
		var lGraphManager = this.GetGraphManager();
		if(lGraphManager!=undefined)
		{
			var lSlideViewPercent = lGraphManager.getSlideViewPercentage();
			if(lSlideViewPercent == 'NaN')
				return 0;
			else
				return lSlideViewPercent;
		}
		else
		{
			if(!this.m_slideNames)
				return false;
			var totalSlides = this.m_slideNames.length;
			if(totalSlides > 0)
				return ((this.GetNumberOfSlidesSeen()/totalSlides)*100.0);
		}
	},
	
	GetAllSlidesSeen: function()
	{
		if(!this.m_slideNames)
			return false;
				
		for(var i = 0; i < this.m_slideNames.length; ++i)
		{
			var lCurrSlideName = this.m_slideNames[i];
			var lCurrSlideData = cp.model.data[lCurrSlideName];
			if(!lCurrSlideData['v'])
				return false;
		}
		
		return true;
	},
	
	GetAllQuizzesPassingScore: function()
	{
		if(!this.m_quizController)
			return false;
			
		var lPassingScore = this.m_quizController.GetPassingScore();
		return lPassingScore;
	},
	
	GetIsQuizAttempted: function()
	{		
		var lIsAttempted = false;
		if(!this.m_quizController)
			return;
			
		if(this.m_quizController.GetQuizBranchAware())
			lIsAttempted = this.m_quizController.GetAnyNonPreTestQuestionAnswered();
		else
			lIsAttempted = this.m_quizController.GetAnyQuestionsAnswered();
			
		return lIsAttempted;
	},
	
	EvaluateQuizStatus: function(quizCriteria)
	{
		var lStatus = false;
		switch(quizCriteria)
		{	
			case this.QuizCriteriaEnum.QuizIsPassed:
				if(this.GetAllQuizzesPassed())
					lStatus = true;
				break;
			case this.QuizCriteriaEnum.QuizIsAttempted:
					lStatus = this.GetIsQuizAttempted();
				break;
			case this.QuizCriteriaEnum.QuizIsPassedOrAttempLimitReached:
					if(this.GetAllQuizzesPassed() )
					{
						return true;
					}
					
					var attemptLimitReached = true;
					
					if (this.m_quizController && (this.m_quizController.quizNumStarts < this.m_quizController.GetNumberOfQuizAttempts())) 
					{
						attemptLimitReached = false;
						break;						
					}
					
					if(attemptLimitReached)
						return true;
				break;
			default:
				if(this.verbose)
					cp.log("Illegal parameter to EvaluateQuizStatus: " + quizCriteria);	
		}
		return lStatus;
	},
	
	EvaluateViewStatus: function(requiredViews, viewType)
	{
		var lStatus = false;
		var lSlidesViewed = this.GetNumberOfSlidesSeen();
		var lTotalSlides = 0;
		if(this.m_slideNames  &&  this.m_slideNames.length > 0 )
		{
			totalSlides = this.m_slideNames.length;
		}
		else 
		{
			if(this.verbose)
				cp.log("In EvaluateViewStatus,totalSlides not obtained or found to be zero. Returning.");
			return false;
		}
		
		switch(viewType)
		{	
			case this.SlideViewsTypeEnum.percent:
				if( this.GetPercentageSlidesSeen() >= requiredViews )
					lStatus = true;
				break;
			case this.SlideViewsTypeEnum.number:
				if(lSlidesViewed >= requiredViews)
					lStatus = true;
				break;
			default:
				if(this.verbose)
					cp.log("Illegal arg to EvaluateViewStatus:"+ requiredViews+","+viewType);			
		}
		return lStatus;
	},
	
	EvaluateStatus: function(completion_or_success)
	{
		var lStatus = false;
		
		var lQuizCriteria = this.QuizCriteriaEnum;
		var lSlideViewsType = this.SlideViewsTypeEnum;
		var lSlideViews = 0;
		var lCriteriaToConsider = this.ReportingOptionsEnum; 
		
		if(completion_or_success == "completion")
		{
			lQuizCriteria = this.m_completionQuizCriteria;
			lSlideViewsType = this.m_completionSlideViewsType ;
			lSlideViews = this.m_slideViewsForCompletion;
			lCriteriaToConsider = this.m_completionCriteria;
		}
		else if(completion_or_success == "success")
		{
			lQuizCriteria = this.m_successQuizCriteria;
			lSlideViewsType = this.m_successSlideViewsType;
			lSlideViews = this.m_slideViewsForSuccess;
			lCriteriaToConsider = this.m_successCriteria;
		}
		else 
		{
			if(this.verbose)
				cp.log("Illegal status type to evaluateStatus:"+completion_or_success);
			return false;
		}
		
		switch(lCriteriaToConsider)
		{	
			case this.ReportingOptionsEnum.quiz_only:
				lStatus = this.EvaluateQuizStatus(lQuizCriteria);	
				break;
			case this.ReportingOptionsEnum.quiz_and_views:
				if(this.EvaluateQuizStatus(lQuizCriteria) && this.EvaluateViewStatus(lSlideViews, lSlideViewsType ) )
					lStatus = true;
				break;
			case this.ReportingOptionsEnum.views_only:
				lStatus = this.EvaluateViewStatus(lSlideViews, lSlideViewsType );
				break;
			case this.ReportingOptionsEnum.access:
				 lStatus = (this.GetNumberOfSlidesSeen() >= 1);			
				break;
			default:
				if(this.verbose)
					cp.log("Illegal value of criteria in evaluateStatus():"+completion_or_success);
		}
		return lStatus;
	},
	
	IsSlideVisited: function(slideName)
	{		
		var slideData = cp.model.data[slideName];
		if(!slideData)
			return;
		
		return slideData['v'];
	},
	
	ShouldSendSuccessStatus: function()
	{
		var lSendSuccess = false;
		
		if(this.m_successCriteria == this.ReportingOptionsEnum.access)
		{
			lSendSuccess = (this.GetNumberOfSlidesSeen() >= 1);	
		}
		else if(this.m_successCriteria == this.ReportingOptionsEnum.quiz_only )
		{
			lSendSuccess = true;
			if(this.m_quizController)
			{
				var lastSlideInQuiz = this.m_slideNames[this.m_quizController.GetLastSlideInQuizIndex()];			
				if(! (this.IsSlideVisited(lastSlideInQuiz)))
				{
					lSendSuccess = false;
					return lSendSuccess;			
				}
			}
		}
		else if(this.m_successCriteria == this.ReportingOptionsEnum.quiz_and_views)
		{
			var lLastSlideOfQuizzesSeen = true;
			if(this.m_quizController)
			{
				var lastSlideInQuiz = this.m_slideNames[this.m_quizController.GetLastSlideInQuizIndex()];			
				if(! (this.IsSlideVisited(lastSlideInQuiz)))
				{
					lLastSlideOfQuizzesSeen = false;
					return lSendSuccess;
				}
			}
			if((lLastSlideOfQuizzesSeen && !this.GetAllQuizzesPassed()) || this.IsSlideVisited(this.m_slideNames[this.m_slideNames.length - 1])) 
			lSendSuccess = true;
		}
		else if(this.m_successCriteria == this.ReportingOptionsEnum.views_only)
		{
			lSendSuccess = this.IsSlideVisited(this.m_slideNames[this.m_slideNames.length - 1]);
		}
		
		return lSendSuccess;
	},
	
	GetTotalQuizStatusAll: function()
	{
		var result = {isPassed:false, isCompleted:false, sendCompletion:true, sendNothing:false};

		var myCompletionTrigger = this.ReportingOptionsEnum;

		if (this.LMSIsBreeze()) 
		{
			myCompletionTrigger = this.ReportingOptionsEnum.breeze;
		} 
		else 
		{
			myCompletionTrigger = this.GetReportingOption();
		}

		//trace("Completion trigger::::"+myCompletionTrigger);
		
		switch (myCompletionTrigger) 
		{			
			case this.ReportingOptionsEnum.breeze:
				if (this.HasQuizzes()) 
				{
						//Ed's hotfix
					if (this.GetAllQuizAttemptsFinished()) 
					{
					//if (this.allQuestionsAnswered) {
						if (this.GetAllQuizzesPassed()) 
						{
							result.isPassed = true;
							result.isCompleted = true;
							result.sendCompletion = false;
						} 
						else 
						{
							result.isPassed = false;
							result.isCompleted = true;
							result.sendCompletion = false;
						}
					} 
					else 
					{
							// dnayak: We should check if pass criteria for user is TRUE and set status as PASSED
							//TODO::
							result.isPassed = false;
							result.isCompleted = false;
							result.sendCompletion = true;
					}
				} 
				else 
				{
						// no quizzes
					if (this.GetAllSlidesSeen()) 
					{
						result.isPassed = true;
						result.isCompleted = true;
						result.sendCompletion = true;
					} 
					else 
					{
						// Not all slides seen
						result.isPassed = false;
						result.isCompleted = false;
						result.sendCompletion = true;
					}
				}
				break;
			case this.ReportingOptionsEnum.completion_success:
				//this is a new UI option , avbl from CP6 onwards
				//evaluate criteria for completion and success separately,
				//and send both
				result.sendCompletion = false;
				result.isCompleted = this.EvaluateStatus("completion");
				result.isPassed = this.EvaluateStatus("success");
				break;
				
			case this.ReportingOptionsEnum.completion_only:
				//this is a new UI option , avbl from CP6 onwards
				//send criteria for completion alone
				result.sendCompletion = true;
				result.isCompleted = this.EvaluateStatus("completion");
				break;
			case this.ReportingOptionsEnum.incompleteToPassedOrFailed:
				//this is a new UI option , avbl from CP6 onwards, for 1.2 (and similar standards)
				//begin by sending incomplete, and then change to passed/failed
				result.isPassed = this.EvaluateStatus("success");
				//should we send success status yet?
				this.m_beginSendingSuccessStatus = this.ShouldSendSuccessStatus();
				break;
			case this.ReportingOptionsEnum.access:
				break;
			default:
				if (this.GetNumberOfSlidesSeen() < 1) 
				{
					result.isPassed = false;
					result.isCompleted = false;
					result.sendCompletion = true;

				} 
				else 
				{
					result.isPassed = true;
					result.isCompleted = true;
					result.sendCompletion = true;
				}
				break;
		}
		return result;
	},
	
	GetTotalQuizPassed: function()
	{
		var s = this.GetTotalQuizStatusAll();
		if (s.isPassed) 
		{
			return "passed";
		} 
		else 
		{
			return "failed";
		}
	},
	
	GetTotalQuizCompleted: function()
	{
		var s = this.GetTotalQuizStatusAll();
		if (s.isCompleted) 
		{
			return "completed";
		} 
		else 
		{
			return "incomplete";
		}
	},
	
	GetTotalQuizSendCompletion: function()
	{
		var result = true;
		switch (this.m_completionValueToSend) 
		{
			case "completion":
				result = true;
				break;
			case "passed":
				result = false;
				break;
			case "default":
			default:
				var s = this.GetTotalQuizStatusAll();
				result = s.sendCompletion;
				break;
		}
		return result;
	},
	
	GetTotalQuizState: function()
	{
		/*var myState = new  cp.QuizState();
		myState.init();
		this.saveQuizState(myState);
		var lQuizState = myState.toString();
		return  lQuizState;*/
		return "";
	},
	
	GetProgressMeasure: function()
	{
		if(this.m_slideNames.length == 0)
			return 0;
		return this.GetNumberOfSlidesSeen()/this.m_slideNames.length;
	},
			
	ShouldFlushCourseData: function(lastData, thisData)
	{
		if(lastData)
		{
			lastData.printCourseData();
		}
		else if(this.verbose)
			cp.log("lastData is undefined");
			
		if(thisData)
		{
			if(this.verbose)
				cp.log("thisData " );
			thisData.printCourseData();
		}
		else if(this.verbose)
			cp.log("thisData is undefined");
		
		if ((this.m_lmsType.toUpperCase() == "EMAIL") || (this.m_lmsType.toUpperCase() == "ACROBAT") ||(this.m_lmsType.toUpperCase() == "INTERNALSERVER")) 
		{
			if(this.verbose)
				cp.log("return false0");
			return false;
		}
		if ((thisData == undefined)) 
		{
			if(this.verbose)
				cp.log("return false1");
			return false;
		}
		if ((lastData == undefined) ) {
			if(this.verbose)
				cp.log("return true0");
			return true;
		}

		// Do NOT flush if only the slide location or
		// slideCount changes.

		// Flush if what kind of data to send changes
		if ((thisData.quizMinScore != lastData.quizMinScore) || (thisData.quizMaxScore != lastData.quizMaxScore) || 
			(thisData.sendScoreAsPercent != lastData.sendScoreAsPercent) || (thisData.quizSendCompletion != lastData.quizSendCompletion)) {
			if(this.verbose)
				cp.log("return true1");
			return true;
		}

		// Flush if score or completion/passed status change
		if ((thisData.quizScore != lastData.quizScore) || (thisData.quizCompleted != lastData.quizCompleted) || (thisData.quizPassed != lastData.quizPassed)) 
		{
			if(this.verbose)
				cp.log("return true2");
			return true;
		}
		if(this.verbose)
			cp.log("return false2");
		// Ignore difference in quizLocation, quizTime, quizState.
		//trace("shouldFlushCoursedata is false");
		return false;
	},
	
	ShouldSendCourseData: function(lastData, thisData)
	{
		if(lastData)
		{
			if(this.verbose)
				cp.log("lastData ");
			lastData.printCourseData();
		}
		else if(this.verbose)
			cp.log("lastData is undefined");
		
		if(thisData)
		{
			if(this.verbose)
				cp.log("thisData " );
			thisData.printCourseData();
		}
		else if(this.verbose)
			cp.log("thisData is undefined");
		
		if ((this.m_lmsType.toUpperCase() == "EMAIL") || (this.m_lmsType.toUpperCase() == "ACROBAT") || (this.m_lmsType.toUpperCase() == "INTERNALSERVER")) 
		{
			if(this.verbose)
				cp.log("return false -2");
			return false;
		}
		if ((thisData == undefined)) 
		{
			if(this.verbose)
				cp.log("return false -1");
			return false;
		}
		if ((lastData == undefined)) 
		{
			if(this.verbose)
				cp.log("return true0");
			return true;
		}
		
		if(this.verbose)
			cp.log("function shouldSendCourseData 33" );
		// Only send every 10 slide-gotos to reduce server traffic
		if (thisData.slideCount >= lastData.slideCount)// + _sendCourseDataSlideInterval) {
		{
			if(this.verbose)
				cp.log("return true1");
			return true;
		}
		
		// Send if what kind of data to send changes
		if ((thisData.quizMinScore != lastData.quizMinScore) || (thisData.quizMaxScore != lastData.quizMaxScore) || (thisData.sendScoreAsPercent != lastData.sendScoreAsPercent) || (thisData.quizSendCompletion != lastData.quizSendCompletion)) 
		{
			if(this.verbose)
				cp.log("return true2");
			return true;
		}

		// Send if score or completion/passed status change
		if ((thisData.quizScore != lastData.quizScore) || (thisData.quizCompleted != lastData.quizCompleted) || (thisData.quizPassed != lastData.quizPassed)) 
		{
			if(this.verbose)
				cp.log("return true3");
			return true;
		}
		//dnayak: Fix for bug 1688764, quiz location change is getting saved in course data
		// Now on location change we will send the course data to the LMS
		if(thisData.quizLocation != lastData.quizLocation)
		{
			//trace("location has changed");
			return true;
		}
		if(this.verbose)
			cp.log("return false4");
		// Ignore difference in quizLocation, quizTime, quizState.
		//trace("shouldSendCoursedata is false");
		return false;
	},
	
	SendSuspendDataOnly: function()
	{
		if(this.verbose)
			cp.log("PlaybackController::SendSuspendDataOnly()");
		//TODO:: BreezeChanges & Flush Changes		
		if (this.GetIsTracked() && this.m_trackingAdapter)
		{
			/*var lMovieProperties:cpMovieProperties = cpMovieProperties.getInstance();			
			lCurAdapter.isRDPreview = (lMovieProperties.m_MovieType == cpMovieTypeEnum.Preview);
			lCurAdapter.isRDStandAlone = (lMovieProperties.m_MovieType == cpMovieTypeEnum.StandAlone);
			var localizedStringXML:XMLList = cpMainTimeLineBase.getInstance().movieXML.Project.LocalizedStrings;
			lCurAdapter.localizedStrings = localizedStringXML;
			/*
			lCurAdapter.sendTrackingData(undefined,undefined,undefined,undefined,undefined,undefined,
										undefined,undefined,undefined,totalQuizState);			*/
			this.m_trackingAdapter.SendSuspendData(createAndGetDataChunk());
		}
	},
	
	CanSendCourseData: function()
	{
		return true;
		/*var lGraphManager:ICPSlideGraphManager = cpInterfaceManager.getInstance().getInterface(cpInterfaceEnum.ICPGraphManager_Interface,null) as ICPSlideGraphManager;
		if(lGraphManager)
		{
			var lCompletionBranch:Array = lGraphManager.getCompletionBranch();
			//If Completion branch is detected then course data can be sent;
			return (lCompletionBranch.length > 0);
		}
		return true;*/
	},
	
	GetCourseData: function()
	{
		var courseData = new Object();
		courseData.printCourseData = function()
		{
			cp.log("***** CourseData *** slideCount " + courseData.slideCount + " ;quizScore "  + courseData.quizScore+ " ;quizMinScore "  +courseData.quizMinScore+ " ;quizMaxScore "  +courseData.quizMaxScore+ " ;sendScoreAsPercent "  +courseData.sendScoreAsPercent+ " ;quizLocation "  +courseData.quizLocation+ " ;quizCompleted "  +courseData.quizCompleted+ " ;quizPassed "  +courseData.quizPassed+ " ;quizSendCompletion "  +courseData.quizSendCompletion+ " ;quizTime "  +courseData.quizTime+ " ;quizState "  +courseData.quizState + " ;progressMeasure "+courseData.progressMeasure +";sendIncompleteToPassedOrFailed " +courseData.sendIncompleteToPassedOrFailed + ";beginSendingSuccessStatus "+courseData.beginSendingSuccessStatus);
		}
		courseData.slideCount = this.GetCurrentSlide();
		courseData.quizScore = this.GetTotalQuizScore();
		courseData.quizMinScore = this.GetTotalQuizMinScore();
		courseData.quizMaxScore = this.GetTotalQuizMaxScore();
		courseData.sendScoreAsPercent = this.GetSendScoreAsPercent();
		courseData.quizLocation = this.GetTotalQuizLocation();
		courseData.quizCompleted = this.GetTotalQuizCompleted();
		courseData.quizPassed = this.GetTotalQuizPassed();
		courseData.quizSendCompletion = this.GetTotalQuizSendCompletion();
		courseData.quizTime = undefined;
		courseData.quizState = this.GetTotalQuizState();
		courseData.progressMeasure = this.GetProgressMeasure();
		courseData.sendIncompleteToPassedOrFailed = this.m_sendIncompleteToPassedOrFailed;
		courseData.beginSendingSuccessStatus = this.m_beginSendingSuccessStatus;
		
		return courseData;
	},
	
	SendCourseData: function(flush)
	{
		var lQuizController = this.GetQuizController();
		var lSendSupendDataOnly = lQuizController && lQuizController.GetIsSubmitAll() && lQuizController.quizInProgress && !lQuizController.m_submittedAllQuestions;
		if(lSendSupendDataOnly)
		{
			//SubmitAll: Send Suspend Data only if quiz is in progress and submitAll is not done
			this.SendSuspendDataOnly();
			return;
		}

		var lCanSendCourseData = this.CanSendCourseData();
		if(!lCanSendCourseData)
			return;
		
		//setBreezeDefaults();
		/*if (_slideContainer) 
		{
			_slideContainer.sendCourseData(flush);
		} 
		else
		{*/
			
			if (this.m_trackingAdapter && this.GetIsTracked())
			{
				var curCourseData = this.GetCourseData();

				/*var localizedStringXML:XMLList = cpMainTimeLineBase.getInstance().movieXML.Project.LocalizedStrings;
				curAdapter.localizedStrings = localizedStringXML;*/
				flush = flush || this.ShouldFlushCourseData(this.m_lastCourseDataSent, curCourseData);
				if(this.verbose)
					cp.log("sendCourseData flush "  +flush);
				if (flush || this.ShouldSendCourseData(this.m_lastCourseDataSent, curCourseData))
				{
					this.m_lastCourseDataSent = curCourseData;
					if(this.verbose)
						cp.log("sending course data flush " + flush);
										
					this.m_trackingAdapter.SendTrackingData(curCourseData.quizScore, curCourseData.quizMinScore, curCourseData.quizMaxScore, curCourseData.sendScoreAsPercent, curCourseData.quizLocation,curCourseData.quizCompleted, curCourseData.quizPassed, curCourseData.quizSendCompletion, curCourseData.quizTime, curCourseData.quizState,curCourseData.progressMeasure, curCourseData.sendIncompleteToPassedOrFailed, curCourseData.beginSendingSuccessStatus);
					if (flush)
					{
						this.m_trackingAdapter.Flush();	
					}
				}
				else 
				{
					if(this.verbose)
						cp.log("NOT sending course data");
					//delete curCourseData;
					curCourseData = undefined;
				}
			}
		/*}*/
	},

    SendQuestionEventData: function (iQuestionScore) {

        if (this.verbose)
            cp.log("PlaybackController::SendQuestionData()");       

        var maxScore = 0;        
        var qc = this.GetQuizController();
        if (qc) {
            maxScore = qc.GetMaxScore();
        }
        
        var evtArgs = {
            slideNumber: iQuestionScore.getslideNum(),
            questionNumber: iQuestionScore.getquestionNumInQuiz(),
            questionScoringType: iQuestionScore.getQuestionScoringType(),
            interactionType: iQuestionScore.getinteractionType(),
            weighting: iQuestionScore.getWeighting(),
            questionAnswered: (iQuestionScore.getanswersIncomplete() == false),
            questionAnsweredCorrectly: iQuestionScore.getansweredCorrectly(),
            questionMaxScore: maxScore,
            questionScore: iQuestionScore.getscoredPoints(),
            questionMaxAttempts: iQuestionScore.getmaxTries(),
            infiniteAttempts: (iQuestionScore.getmaxTries() == 9999),
            questionAttempts: iQuestionScore.getnumTries(),
            interactionID: iQuestionScore.getinteractionID(),
            quizName: "QuizName",
            objectiveID: iQuestionScore.getobjectiveID(),
            selectedAnswer: iQuestionScore.m_chosenAnswersAsString
        };

        cp.em.fireEvent('CPQuestionSubmit', evtArgs);
    },

	SendInteractionData: function(iQuestionScore,iDescriptionTexts)
	{
		if(this.verbose)
			cp.log("PlaybackController::SendInteraction()");
		var err;
		/*setBreezeDefaults();
		//if (_slideContainer) 
		//{
			//_slideContainer.sendInteractionData(questionScore);
		//}
		//else if (_tracking && isTracked && (trackingLevel == "interactions")) 
		{		*/
			/*var trackingAdapter = _tracking.currentTrackingAdapter();
			if (trackingAdapter) 
			{
				var lMovieProperties:cpMovieProperties = cpMovieProperties.getInstance();			
				trackingAdapter.isRDPreview = (lMovieProperties.m_MovieType == cpMovieTypeEnum.Preview);
				trackingAdapter.isRDStandAlone = (lMovieProperties.m_MovieType == cpMovieTypeEnum.StandAlone);*/
		if(this.GetIsTracked() && (this.m_trackingLevel == "interactions"))	
		{
			var qc = this.GetQuizController();
			var lPoints = 0;
			if(qc)
				lPoints = qc.GetScore();
				
			//with (questionScore) 
			//{					 
				 if(this.LMSIsAICC())
				 {
					this.m_trackingAdapter.SendInteractionData(iQuestionScore.m_interactionID,
									 iQuestionScore.m_objectiveID,
									 iQuestionScore.m_interactionType,//getInteractionTypeForLMS(),
									 iQuestionScore.m_correctAnswersAsString,
									 iQuestionScore.m_chosenAnswersAsString,
									 iQuestionScore.m_isCorrectAsString,
									 iQuestionScore.m_weighting,
									 iQuestionScore.m_latencyAsSeconds,
									 iQuestionScore.m_curDateAsString2,
									 iQuestionScore.m_curTimeAsSecondsSinceMidnight,
									 iDescriptionTexts
									 );
				 }
				 else
				 {
					if(this.LMSIsAlternateReporting())
						escapeAnswers = false;
					
					/*var lQuestionScore = qc.GetQuestionScore();
					if(!lQuestionScore)
						return;*/
					 var correctAnswer = iQuestionScore.m_correctAnswersAsString;
					 if(this.LMSIsAlternateReporting())
					 {
						if(qc)
						{
							var questionObjs = qc.GetQuestionsOnSlide(this.currentSlide);
							if(questionObjs && questionObjs.length != 0)
							{
								var questionObj;
								questionObj = questionObjs[0];
								if(questionObj && questionObj.GetIsSurvey())
									correctAnswer = ' ';
							}
							this.m_trackingAdapter.SetCurrentAttempt(qc.quizNumStarts);
						}
					 }
					this.m_trackingAdapter.SendInteractionData(iQuestionScore.m_interactionID,
									 iQuestionScore.m_objectiveID,
									 iQuestionScore.m_interactionType,//getInteractionTypeForLMS(),
									 correctAnswer,
									 iQuestionScore.m_chosenAnswersAsString,
									 iQuestionScore.m_isCorrectAsString,
									 iQuestionScore.m_weighting,
									 iQuestionScore.m_latencyAsSeconds,
									 iQuestionScore.m_curDateAsString,
									 iQuestionScore.m_curTimeAsSecondsSinceMidnight,
									 iDescriptionTexts
									 );
				}
			//}
		}		
	},
	
	OnEndQuiz: function()
	{
		if (this.GetIsTracked() && (this.m_lmsType.toUpperCase() != "EMAIL") && (this.m_lmsType.toUpperCase() != "ACROBAT") && (this.m_lmsType.toUpperCase() != "INTERNALSERVER")) 		
		{
			this.SendCourseData(true);
		}
	},
	
	SendEmailResults: function()
	{
		if (this.GetIsTracked() && (this.m_lmsType.toUpperCase() == "EMAIL")) {
			if(this.verbose)
				cp.log("sending course data from sendEmailResults");
			this.SendCourseData(true);
		}
	},
	
	PostQuizResults: function()
	{
		if (this.GetIsTracked() && ((this.m_lmsType.toUpperCase() == "ACROBAT") || (this.m_lmsType.toUpperCase() == "INTERNALSERVER"))) 
		{
			if(this.verbose)
				cp.log("sending course data from PostQuizResults");
			this.SendCourseData(true);
		}
	},
	
	DoSendLMSTrackingData: function()
	{
		//ED's hotfix
		if (this.GetIsTracked() && (this.m_lmsType.toUpperCase() != "EMAIL") && (this.m_lmsType.toUpperCase() != "ACROBAT") && (this.m_lmsType.toUpperCase() != "INTERNALSERVER"))
			this.SendCourseData(!this.LMSIsAICC());//AICC Performance Improvement
		else
			this.SendCourseData(false);
	},
	
	RestoreQuizState: function()
	{
		if(this.verbose)
			cp.log("PlaybackController :: RestoreQuizState()");
		var lQuizController = this.GetQuizController();
		if(lQuizController && lQuizController.GetIsReportingEnabled())
		{
			resumeValuesFromDataChunk();			
			cp.movie.resumeMovieSpecificValue();
		}
	},
	
	GetRestoredQuizSlide: function()
	{
		if(this.verbose)
			cp.log("PlaybackController :: GoToRestoredQuizSlide()");
		var projData = cp.model.data['project_main'];
		var currProjectFrame =  projData['currentFrame'];
		if(this.verbose)
			cp.log("Restoring frame :: " + currProjectFrame);
		return currProjectFrame;
	},
	
	DoPollLMSGetTrackingDataLoaded: function()
	{		
		if (this.GetIsTracked()) 
		{		
			if(this.m_trackingAdapter)
			{	
				if (this.m_trackingAdapter.IsTrackingDataLoaded()) 
				{
					//clearInterval(_pollLMSIntervalID);
					var quizLocation = this.m_trackingAdapter.getLessonLocation();
					var quizStateStr = this.m_trackingAdapter.getLessonData();
					/*var quizState = new QuizState();
					quizState.fromString(quizStateStr);

					var rslidenum = getRestoreSlideNum();
					var fps = getFPS();
					var interval:Number = 1000/fps;
					_restoreQuizIntervalID = setInterval(doPollRestoreQuizState, 35, quizState, rslidenum);*/				/*restoreQuizState(quizState);
					loadingResumeData = false;
					//dnayak: Fix for bug 1702350...when user closes quiz as soon as he opens
					 // We have to send the course data as soon as all initialization of adapter completes..
					
					doSendLMSTrackingData(this);
					_pollLMSIntervalID = setInterval(doSendLMSTrackingData, trackingUpdateIntervalSecs*1000, this);*/

				} 
			}
			else 
			{
				if(this.verbose)
					cp.log("_doPollLMSGetTrackingDataLoaded else");
				//var curTime = new Date();
				//var deltaSecs = (curTime.getTime() - this._pollLMSStartTime.getTime())/1000.0;
				//if (deltaSecs > this.pollLMSGetTrackingDataTimeoutSecs) 
				//{
					//trace("get tracking data failed");
					//lmsInitDone();
					turnOffTracking();
				//}
			}
		}
	},
		
	ExitCourse: function()
	{
		//trace("Exiting Course");
		/*if (_slideContainer) {
			_slideContainer.exitCourse();
		}
		else {*/
			if(this.verbose)
				cp.log("function exitCourse 1 "  +isTracked);
			//if (isTracked && _tracking.currentTrackingAdapter()) 
			if (this.m_trackingAdapter && this.GetIsTracked()) 
			{
				if(this.verbose)
					cp.log("function exitCourse isTracked ");
				if (this.m_lmsType.toUpperCase() != "EMAIL" && this.m_lmsType.toUpperCase() != "ACROBAT" && this.m_lmsType.toUpperCase() != "INTERNALSERVER") 
				{
					if(this.verbose)
						cp.log("function exitCourse sendCourseData ");
					this.SendCourseData(true);				
				}
				
				this.m_trackingAdapter.finish();
				// Wait 3 seconds to allow LMS data to flush
				//doActionLater(this, "doFinalExit", null, 0, 0, 3000, 3000);
			} 
			else 
			{
				if(this.verbose)
					cp.log("doFinalExit();");
				//doFinalExit();
			}
		/*}*/
	},
	
	GetSendCourseDataWithInteractionData: function()
	{
		return this.m_sendCourseDataWithInteractionData;
	},
	
	GetLMSType: function()
	{
		return this.m_lmsType;			
	},	
	
	SetLMSType: function()
	{
		if(this.verbose)
			cp.log("SetLMSType");
		var val = this.m_QuizReportingData['lmsType'];
		switch (val)
		{
			case 1:
				this.m_lmsType = "SCORM2004";
				break;
			case 2:
				this.m_lmsType = "SCORM12";
				break;
			case 3:
				this.m_lmsType = "Authorware";
				break;
			case 4:
				this.m_lmsType = "AICC";
				break;
			case 5:
				this.m_lmsType = "Questionmark";
				break;
			case 6:
				this.m_lmsType = "email";
				break;
			case 7:
				this.m_lmsType = "AICC";
				break;
			case 8:
				this.m_lmsType = "Acrobat";
				break;
			case 9:
				this.m_lmsType = "InternalServer";
				break;
			default:
				this.m_lmsType = "";
				break;	
		}
	},
	
	SetAuthorwareDelimeter: function()
	{
		if(this.verbose)
			cp.log("SetAuthorwareDelimeter");
		this.m_AuthorwareDelimeter = this.m_QuizReportingData['authorwareDelimeter'];
	},
	
	SetSendScoreAsPercent: function()
	{
		if(this.verbose)
			cp.log("SetSendScoreAsPercent");
		var val = this.m_QuizReportingData['sendScoreAsPercent'];
		this.m_sendScoreAsPercent = (val) ? true : false;			
	},

	GetSendScoreAsPercent: function()
	{
		return this.m_sendScoreAsPercent;
	},
	
	SetSendCompletionFlag: function()
	{
		var val = this.m_QuizReportingData['sendCompletionFlag'];
		if (val)
			this.m_completionValueToSend = "completion";
		else
			this.m_completionValueToSend = "passed";
	},
	
	GetSendCompletionFlag: function()
	{
		return this.m_completionValueToSend;
	},
	
	SetTrackingLevel: function()
	{
		if(this.verbose)
			cp.log("SetTrackingLevel");
		var val = this.m_QuizReportingData['trackingLevel'];
		switch(val)
		{
			case 0:	// Final only
				this.m_trackingLevel = "interactions";			
				break;
			case 2:	// Objectives, interactions and final
				this.m_trackingLevel = "score";
				break;			
		}
	},		

	SetSlideViewPercentage: function()
	{
		if(this.verbose)
			cp.log("SetSlideViewPercentage");
		this.m_completionSlideViewPercentage = this.m_QuizReportingData['slideViewPercentage'];
	},
	
	SetReportingOption: function()
	{
		if(this.verbose)
			cp.log("SetReportingOption");
		var val = this.m_QuizReportingData['reportingOption'];
		switch(val)
		{
			// New Option for Cp6 - Completion and Success are both to be reported using
			//individual criteria 
			//TBD: Make sure that completionValueToSend = "default" when  this option comes in - aghose
			case 0: 
				this.m_reportingOption = this.ReportingOptionsEnum.completion_success;
				break;
			case 1: 
				this.m_reportingOption = this.ReportingOptionsEnum.completion_only;
				break;
			case 2: 
				this.m_reportingOption = this.ReportingOptionsEnum.incompleteToPassedOrFailed;
				this.m_sendIncompleteToPassedOrFailed = true;
				break;
			case 4: 
				this.m_reportingOption = this.ReportingOptionsEnum.breeze;
				break;
			default:
				this.m_reportingOption = "";
				break;	
		}
		this.m_completionTrigger = this.m_reportingOption;
	},
	
	GetReportingOption: function()
	{
		return this.m_reportingOption;
	},
	
	SetSlideViewsForSuccess: function()
	{
		if(this.verbose)
			cp.log("SetSlideViewsForSuccess");
		this.m_slideViewsForSuccess = this.m_QuizReportingData['slideViewsForSuccess'];
		var val = this.m_QuizReportingData['slideViewsTypeForSuccess'];
		switch(val)
		{	
			case 0:
				this.m_successSlideViewsType = this.SlideViewsTypeEnum.percent;
				break;
			case 1:
				this.m_successSlideViewsType =	this.SlideViewsTypeEnum.number;
				break;
			default:
				this.m_successSlideViewsType = this.SlideViewsTypeEnum.percent;
		}
	},		
	
	SetSlideViewsForCompletion: function()
	{
		if(this.verbose)
			cp.log("SetSlideViewsForCompletion");
		this.m_slideViewsForCompletion = this.m_QuizReportingData['slideViewsForCompletion'];
		var val = this.m_QuizReportingData['slideViewsTypeForCompletion'];
		switch(val)
		{	
			case 0:
				this.m_completionSlideViewsType = this.SlideViewsTypeEnum.percent;
				break;
			case 1:
				this.m_completionSlideViewsType =	this.SlideViewsTypeEnum.number;
				break;
			default:
				this.m_completionSlideViewsType = this.SlideViewsTypeEnum.percent;
		}
	},		 
	
	SetQuizCriteriaForCompletion: function()
	{
		if(this.verbose)
			cp.log("SetQuizCriteriaForCompletion");
		var val = this.m_QuizReportingData['quizCriteriaForCompletion'];
		switch(val)
		{	
			case 0:
				this.m_completionQuizCriteria = this.QuizCriteriaEnum.QuizIsPassed;
				break;
			case 1:
				this.m_completionQuizCriteria = this.QuizCriteriaEnum.QuizIsAttempted;
				break;
			case 2:
				this.m_completionQuizCriteria = this.QuizCriteriaEnum.QuizIsPassedOrAttempLimitReached;
				break;
			default:
				if(this.verbose)
					cp.log("Value of quizCriteria not valid in setQuizCriteriaForCompletion()!");
				this.m_completionQuizCriteria = this.QuizCriteriaEnum.QuizIsPassed;
		}
	},
			
	SetQuizCriteriaForSuccess: function()
	{
		if(this.verbose)
			cp.log("SetQuizCriteriaForSuccess");
		var val = this.m_QuizReportingData['quizCriteriaForSuccess'];
		switch(val)
		{	
			case 0:
				this.m_successQuizCriteria = this.QuizCriteriaEnum.QuizIsPassed;
				break;
			case 1:
				this.m_successQuizCriteria = this.QuizCriteriaEnum.QuizIsAttempted;
				break;
			case 2:
				this.m_successQuizCriteria = this.QuizCriteriaEnum.QuizIsPassedOrAttempLimitReached;
				break;
			default:
				if(this.verbose)
					cp.log("Value of quizCriteria not valid in setQuizCriteriaForSuccess()!");
				this.m_successQuizCriteria = this.QuizCriteriaEnum.QuizIsPassed;
		}
	},
	
	SetCompletionCriteria: function()
	{
		if(this.verbose)
			cp.log("SetCompletionCriteria");
		var val = this.m_QuizReportingData['completionCriteria'];
		switch(val)
		{
			case 0:	
				this.m_completionCriteria = this.ReportingOptionsEnum.breeze;
				break;
			case 1:	
				this.m_completionCriteria = this.ReportingOptionsEnum.quiz_only;
				break;
			case 2:	
				this.m_completionCriteria = this.ReportingOptionsEnum.quiz_and_views;
				break;
			case 3:	
				this.m_completionCriteria = this.ReportingOptionsEnum.views_only;
				break;
			case 4:	
				this.m_completionCriteria = this.ReportingOptionsEnum.access;
				break;
			case 5:	
				this.m_completionCriteria = this.ReportingOptionsEnum.completion_success;
				break;
			case 6:	
				this.m_completionCriteria = this.ReportingOptionsEnum.incompleteToPassedOrFailed;
				break;
			default:
				if(this.verbose)
					cp.log("Invalid criteria recd in setOnlySuccessCriteria");
		}
	},
			
	SetSuccessCriteria: function()
	{
		if(this.verbose)
			cp.log("SetSuccessCriteria");
		var val = this.m_QuizReportingData['successCriteria'];
		switch(val)
		{
			case 0:	
				this.m_successCriteria = this.ReportingOptionsEnum.breeze;
				break;
			case 1:	
				this.m_successCriteria = this.ReportingOptionsEnum.quiz_only;
				break;
			case 2:	
				this.m_successCriteria = this.ReportingOptionsEnum.quiz_and_views;
				break;
			case 3:	
				this.m_successCriteria = this.ReportingOptionsEnum.views_only;
				break;
			case 4:	
				this.m_successCriteria = this.ReportingOptionsEnum.access;
				break;
			case 5:	
				this.m_successCriteria = this.ReportingOptionsEnum.completion_success;
				break;
			case 6:	
				this.m_successCriteria = this.ReportingOptionsEnum.incompleteToPassedOrFailed;
				break;
			default:
				if(this.verbose)
					cp.log("Invalid criteria recd in setOnlySuccessCriteria");
		}
	},
	
	SetEmailAddress: function()
	{
		if(this.verbose)
			cp.log("SetEmailAddress");
		this.m_emailAddress = this.m_QuizReportingData['emailAddress'];;			
	},
	
	SetInternalServerURL: function()
	{
		if(this.verbose)
			cp.log("SetInternalServerURL");
		this.m_internalServerURL = this.m_QuizReportingData['internalServerURL'];;			
	},		
	
	SetDirectory: function()
	{
		if(this.verbose)
			cp.log("SetDirectory");
		this.m_companyName = this.m_QuizReportingData['companyName'];;
		this.m_departmentName = this.m_QuizReportingData['departmentName'];;
		this.m_courseName = this.m_QuizReportingData['courseName'];;
	},
	
	SetCourseNode: function()
	{
		if(this.verbose)
			cp.log("SetCourseNode");
		this.m_courseNode = this.m_QuizReportingData['courseNode'];;
	},
	
	GetIsTrackedFlag: function()
	{
		return this.m_isTrackedFlag;
	},	
	
	SetIsTrackedFlag: function()
	{
		if(this.verbose)
			cp.log("SetIsTrackedFlag");
		this.m_isTrackedFlag = this.m_QuizReportingData['isTrackedFlag'];
	},
	
	SetTrackingUrlEncodeVersionAndSession: function()
	{
		if(this.verbose)
			cp.log("SetTrackingUrlEncodeVersionAndSession");
		var val = this.m_QuizReportingData['trackingUrlEncodeVersionAndSession'];
		this.m_trackingSendResumeData = (val) ? true : false;
	},
	
	SetTrackingCharsToNotUrlEncode: function()
	{
		if(this.verbose)
			cp.log("SetTrackingCharsToNotUrlEncode");
		var val = this.m_QuizReportingData['trackingCharsToNotUrlEncode'];
		this.m_trackingCharsToNotUrlEncode = val;
	},

	SetTrackingSendResumeData: function()
	{
		if(this.verbose)
			cp.log("SetTrackingSendResumeData");
		var val = this.m_QuizReportingData['trackingSendResumeData'];
		this.m_trackingSendResumeData = (val) ? true : false;
	},

	SetCmiExitNormalAfterCompletion: function()
	{
		if(this.verbose)
			cp.log("SetCmiExitNormalAfterCompletion");
		var val = this.m_QuizReportingData['cmiExitNormalAfterCompletion'];
		this.m_CmiExitNormalAfterCompletion = val;
	}
	
}
	
cp.TrackingAdapter = function()
{
	this.m_trackingAdapterType = new Object();
	this.m_initialized = false;
	this.m_trackingDataLoaded_bln = false;
	this.m_interactionDataTracked_bln = true;
	this.m_lessonDataTracked_bln = true;	
	this.m_escapeAICCvs_bln = true;
	this.m_ignoreEscapeList_str = "";	
	
	this.m_currentAttempt = 0;
	
	this.m_timer_int = 0;
	this.m_timer_str = "";
	
	this.m_score_raw;
	this.m_score_min;
	this.m_score_max;
	this.m_score_scaled_cp;				// SCORM 2004 support
	this.m_score_pass;					// Used for compatibility with Breeze
	this.m_score_tot;					// Used for compatibility with Breeze
	this.m_time = "";
	this.m_lesson_status;
	this.m_success_status = "";
	this.m_statusType_int = 1;
	
	this.m_lesson_mode = "";
	this.m_student_id = "";
	this.m_student_name = "";
	this.m_credit = "";
	this.m_entry = "";
	this.m_exit = "";
	this.m_progressMeasure = 0;
	
	this.m_interaction_ary = new Array();
	
	this.m_lessonLocation = "";
	
	this.m_lesson_data = "";
	this.m_suspend_data = "";
	
	this.m_vendor_data = "";	
	
	this.m_launch_data = "";
	
	this.m_comments_from_lms = "";
	this.m_comments = "";
	
	this.m_lesson_status;
	this.m_lesson_status_array = new Array();
	this.m_score_array = new Array();
	this.m_mastery_score = 0;
	this.m_max_time_allowed = "";
	this.m_time_limit_action = "";

	this.m_isRDPreview = false;
	this.m_isRDStandAlone = false;
	
	this.m_adapterReportingVariables = new Array();
	this.verbose = false;
}

cp.TrackingAdapter.prototype =
{
	GetInteractionArray: function()
	{
		return this.m_interaction_ary;
	},
	
	GetCurrentAttempt: function()
	{
		return this.m_currentAttempt;
	},
	SetCurrentAttempt: function(val)
	{
		this.m_currentAttempt = val;
	},
	
	SetInitialized: function(iValue) 
	{
		if(iValue == "true")
		{
			iValue = true;
		} 
		else if(iValue == "false") 
		{
			iValue = false;
		}
		this.m_initialized = iValue;
	},
	
	IsInitialized: function() {return this.m_initialized;},
	IsInteractionDataTracked: function(){return this.m_interactionDataTracked_bln;},
	IsLessonDataTracked: function()	{return this.m_lessonDataTracked_bln;},
	IsTrackingDataLoaded: function() 	{return this.m_trackingDataLoaded_bln;},
	//function isAICCvsEscaped():Boolean			{return escapeAICCvs_bln;}
	
	GetTrackingAdapterType: function()	{return this.m_trackingAdapterType;},
	SetTrackingAdapterType: function(adapterType_int, adapterType_str)
	{
		this.m_trackingAdapterType.type_int = adapterType_int;
		this.m_trackingAdapterType.type_str = adapterType_str;
	},
		
	Flush: function() {},
	Finish: function() {},
	
	GetInteractionDataTracked: function() {return this.m_interactionDataTracked_bln},
	GetLessonDataTracked: function() {return this.m_lessonDataTracked_bln;},
	//function getEscapeAICCvs():Boolean			{return escapeAICCvs_bln;}
	//function getIgnoreEscapeList():String		{return ignoreEscapeList_str;}
	
	SetInteractionDataTracked: function(isTracked_bln){this.m_interactionDataTracked_bln = isTracked_bln;},
	SetLessonDataTracked: function(isTracked_bln) {this.m_lessonDataTracked_bln = isTracked_bln;},
	//function setEscapeAICCvs(isEscaped_bln:Boolean):void			{escapeAICCvs_bln = isEscaped_bln;}
	//function setIgnoreEscapeList(escapeList_str:String):void		{ignoreEscapeList_str = escapeList_str;}
	
	SetTrackingDataLoaded: function(iValue) 	{return this.m_trackingDataLoaded_bln = iValue;},
	SetTrackingFinished: function()
	{
		this.SetInitialized(false);
		this.SetTrackingDataLoaded(false);
	},
	
	SetStatusType: function(type_int) {this.m_statusType_int = type_int;},
	GetStatusType: function() {return this.m_statusType_int;},
			
	GetScore: function(scoreAsRaw_bln)
	{
		var result = this.GetScoreRaw();
		if(result == "")
		{
			result = " ";
		}
		if(scoreAsRaw_bln == undefined || scoreAsRaw_bln == false)
		{
			if (this.GetScoreMax() != "" && this.GetScoreMin() != "")
			{
				result = result + "," + this.GetScoreMax() + "," + this.GetScoreMin();
			}
		}
		return result;
	},

	GetScoreRaw: function()
	{
		if (this.m_score_raw == undefined)
		{
			this.m_score_raw = "";
		}
		return this.m_score_raw;
	},
	GetScoreMax: function()
	{
		if (this.m_score_max == undefined || this.m_score_max == "" || this.m_score_max == " ")
		{
			this.m_score_max = "";
		}
		return this.m_score_max;
	},
	GetScoreMin: function()
	{
		if (this.m_score_min == undefined || this.m_score_min == "" || this.m_score_min == " ")
		{
			this.m_score_min = "";
		}
		return this.m_score_min;
	},
	GetScoreScaled: function()
	{
		if (this.m_score_scaled_cp == undefined || this.m_score_scaled_cp == "" || this.m_score_scaled_cp == " ")
		{
			this.m_score_scaled_cp = 1;
		}
		return this.m_score_scaled_cp;
	},
	GetScorePass: function()
	{
		 return this.m_score_pass;
	 },
	GetScoreTot: function()
	{
		 return this.m_score_tot;
	 },
	GetTimeInSession: function() {return this.m_time;},
	GetLessonLocation: function()
	{
		if (this.m_lessonLocation == undefined || this.m_lessonLocation == "")
		{
			this.m_lessonLocation = " ";
		}
		return this.m_lessonLocation;
	},
	GetLessonStatus: function()
	{
		if (this.m_lesson_status == undefined)
		{
			this.m_lesson_status = "incomplete";
		}
		return this.m_lesson_status;
	},
	GetSuccessStatus: function()
	{
		return this.m_success_status;
	},
	GetLessonMode: function() {return this.m_lesson_mode;},
	GetStudentID: function() {return this.m_student_id;},
	GetStudentName: function() {return this.m_student_name;},
	GetCredit: function() {return this.m_credit;},
	GetEntry: function() {return this.m_entry;},
	GetProgressMeasure: function() {return this.m_progressMeasure;},
	
	SetScore: function(_scoreRaw_int, _scoreMin_int , _scoreMax_int )
	{
		 if(_scoreRaw_int != undefined)
		 {
			 this.SetScoreRaw(_scoreRaw_int);
		 }
		 if(_scoreMin_int != undefined)
		 {
			 this.SetScoreMin(_scoreMin_int);
		 }
		 if(_scoreMax_int != undefined)
		 {
			 this.SetScoreMax(_scoreMax_int);
		 }
		 if(_scoreMax_int != undefined && _scoreMax_int != 0 && _scoreRaw_int != undefined)
		 {
			 this.SetScoreScaled(_scoreRaw_int/_scoreMax_int);
		 } 
		 else if (_scoreRaw_int != undefined) 
		 {
			 this.SetScoreScaled(_scoreRaw_int/100);
		 }
	},
	
	ValidateScore: function(value)
	{
		var tempValue;
		switch (typeof value)
		{
			case "null":
				tempValue = undefined;
				break;
			case "string":
				if (Number(value) == value)
				{
					tempValue = Number(value);
				}else{
					tempValue = undefined;
				}
				break;
			case "number":
				if(isNaN(value))
				{
					tempValue = undefined;
				} else {
					tempValue = value;
				}
				break;
			default:
				tempValue = undefined;
		}
		if (tempValue != undefined)
		{
			tempValue = this.RoundDecimals(tempValue, 2);
			tempValue = tempValue.toString();
		}else{
			tempValue = " ";
		}
		return tempValue
	},
	
	SetScoreRaw: function(value) {this.m_score_raw = this.ValidateScore(value);},
	SetScoreMax: function(value) {this.m_score_max = this.ValidateScore(value);},
	SetScoreMin: function(value) {this.m_score_min = this.ValidateScore(value);},
	SetScoreScaled: function(value) {this.m_score_scaled_cp = this.ValidateScore(value);},
	SetScorePass: function(value) {this.m_score_pass = value;},
	SetScoreTot: function(value) {this.m_score_tot = value;},
	
	SetProgressMeasure: function(value)
	{
		if((value < 0) || (value >1)) return;
		this.m_progressMeasure = value;
	},	
	
	SetTimeInSession: function(time_var)
	{
		// Don't require a parameter.  If one isn't passed, we'll determine the time automatically.
		/*if (time_var == undefined || time_var == "" || time_var == null)
		{
			time_var = this.FormatTime(((Math.floor(getTimer()/1000)) - timer_int));
		} 
		else if (typeof(time_var == "number")) 
		{
			time_var = this.FormatTime(time_var);
		}*/
		this.m_time = time_var;
		this.timer_str = time_var;
	},
	SetLessonLocation: function(value) {this.m_lessonLocation = value;},
	SetLessonStatus: function(statusCompletion_str, statusSuccess_str)
	{
		// contains optional success status for SCORM 2004 support, primarily
		// Validate Lesson Status
		if (!statusCompletion_str || statusCompletion_str.substring(0,1) == "n" || statusCompletion_str == "" || statusCompletion_str == undefined || statusCompletion_str == " ")
		{
			this.m_lesson_status = "incomplete";
		} 
		else 
		{
			this.m_lesson_status = statusCompletion_str;
		}
		if(statusSuccess_str != undefined)
		{
			this.m_success_status = statusSuccess_str;
		}
	},

	SetStudentID: function(value_str) {this.m_student_id = value_str;},
	SetStudentName: function(value_str) {this.m_student_name = value_str;},
	SetCredit: function(value_str) {this.m_credit = value_str;},
	
	GetLessonData: function()
	{
		if (this.m_lesson_data == undefined || this.IsLessonDataTracked() == false)
		{
			this.SetLessonData("");
		}
		return this.m_lesson_data;
	},
	
	SetLessonMode: function(value_str) {this.m_lesson_mode = value_str;},

	// Core_Lesson functions (Set)
	SetLessonData: function(value_str) {this.m_lesson_data = value_str;},
	
	// Core_Vendor functions (Get)
	GetVendorData: function() {return this.m_vendor_data;},

	// Core_Vendor functions (Set)
	SetVendorData: function(value_str) {this.m_vendor_data = value_str;},
	
	// Student_data functions (Get)
	GetLessonStatusArray: function() {return this.m_lesson_status_array;},
	GetScoreArray: function() {return this.m_score_array;},
	GetMasteryScore: function() {return this.m_mastery_score;},
	GetMaxTimeAllowed: function() {return this.m_max_time_allowed;},
	GetTimeLimitAction: function() {return this.m_time_limit_action;},

	// Student_data functions (Set)
	AddToLessonStatusArray: function(value_str) {this.m_lesson_status_array.push(value_str);},
	AddToScoreArray: function(value) {this.m_score_array.push(value);},
	SetMasteryScore: function(value) {this.m_mastery_score = value;},
	SetMaxTimeAllowed: function(value_str) {this.m_max_time_allowed = value_str;},
	SetTimeLimitAction: function(value_str) {this.m_time_limit_action = value_str;},
	
	SendSuspendData: function(_resumeData_str)
	{
		// placeholder - do nothing (this is a placeholder for each of the tracking adapters)
		if(_resumeData_str != undefined)
		{
			this.SetLessonData(_resumeData_str);
		}
	},	
	
	SendTrackingData: function(_scoreRaw_int, _scoreMin_int, _scoreMax_int, _scoreAsPercent_bln, _location_str, _statusCompletion_str, _statusSuccess_str, _statusPreference_bln, _time_str, _resumeData_str,	_progressMeasure_Number, _sendIncompleteToPassedOrFailed_bln, _beginSendingSuccessStatus_bln)
	{
		// placeholder - do nothing (this is a placeholder for each of the tracking adapters)
		if(_time_str == undefined)
		{
			_time_str = "";
		}
		this.SetTrackingData(_scoreRaw_int, _scoreMin_int, _scoreMax_int, _scoreAsPercent_bln, _location_str, _statusCompletion_str, _statusSuccess_str, _statusPreference_bln, _time_str, _resumeData_str);
	},
	
	SetTrackingData: function(_scoreRaw_int, _scoreMin_int, _scoreMax_int, _scoreAsPercent_bln, _location_str, _statusCompletion_str, _statusSuccess_str, _statusPreference_bln, _time_str, _resumeData_str,	_progressMeasure_Number, _sendIncompleteToPassedOrFailed_bln, _beginSendingSuccessStatus_bln)
	{
		// call each of the set functions
		if(_scoreAsPercent_bln==true)
		{
			// Set score as a percent
			if(_scoreRaw_int != undefined && _scoreMax_int != undefined && !isNaN(Math.round((_scoreRaw_int/_scoreMax_int)*100)) && _scoreMax_int != 0)
			{
				// based on raw and max
				this.SetScore(Math.round((_scoreRaw_int*100/_scoreMax_int)*100)/100);
			} 
			else 
			{
				// based on raw score
				this.SetScore(Math.round(_scoreRaw_int*100)/100);
			}
		} 
		else 
		{
			if(_scoreRaw_int != undefined && _scoreMin_int != undefined && _scoreMax_int != undefined)
			{
				this.SetScore(_scoreRaw_int, _scoreMin_int, _scoreMax_int);
			} 
			else if(_scoreRaw_int != undefined && _scoreMax_int != undefined) 
			{
				this.SetScore(_scoreRaw_int, 0, _scoreMax_int);
			} 
			else if(_scoreRaw_int != undefined) 
			{
				this.SetScore(_scoreRaw_int);
			}
		}
		if(_location_str != undefined)
		{
			this.SetLessonLocation(_location_str);
		}
		if(_statusPreference_bln != undefined)
		{
			// Preference set for what type of status to store/send
			if(_statusPreference_bln == true && _statusCompletion_str != undefined)
			{
				// send Completion Status
				this.SetLessonStatus(_statusCompletion_str);
			} 
			else if(_statusSuccess_str != undefined) 
			{
				// send Success status
				if(_statusCompletion_str != undefined)
				{
					this.SetLessonStatus(_statusCompletion_str, _statusSuccess_str);
				}
			}
		} 
		else 
		{
			// No preference
			if(_statusCompletion_str != undefined)
			{
				this.SetLessonStatus(_statusCompletion_str);
			} 
			else if(_statusSuccess_str != undefined) 
			{
				this.SetLessonStatus(_statusSuccess_str);
			}
		}
		if(_time_str != undefined)
		{
			this.SetTimeInSession(_time_str);
		}
		if(_resumeData_str != undefined)
		{
			this.SetLessonData(_resumeData_str);
		}
	},

	GetTrackingData: function()
	{
		if(this.IsTrackingDataLoaded())
		{
			// do nothing
		} 
		else 
		{
			this.SetTrackingDataLoaded(true);
		}
	},

	GetTrackingDataCore: function()
	{
		if(this.IsTrackingDataLoaded())
		{
			// do nothing
		} 
		else 
		{
			this.SetTrackingDataLoaded(true);
		}
	},

	SetInteractionData: function(interactionID_str, objectiveID_str, type_str, correctResponse_str, studentResponse_str, result_str, weight_int, latency_str, date_str, time_str, description_texts)
	{
		if(!this.m_interaction_ary)
			this.m_interaction_ary = new Array();		
		
		var temp_int = this.m_interaction_ary.length;
		this.m_interaction_ary[temp_int] = new Array();
		this.m_interaction_ary[temp_int]["interactionID_str"] = interactionID_str;
		this.m_interaction_ary[temp_int]["objectiveID_str"] = objectiveID_str;
		this.m_interaction_ary[temp_int]["type_str"] = type_str;
		this.m_interaction_ary[temp_int]["correctResponse_str"] = correctResponse_str;
		this.m_interaction_ary[temp_int]["studentResponse_str"] = studentResponse_str;
		this.m_interaction_ary[temp_int]["result_bln"] = result_str;
		this.m_interaction_ary[temp_int]["weight_int"] = weight_int;
		this.m_interaction_ary[temp_int]["description_texts"] = description_texts;
		//trace("Tracking Adapter setting interaction data");
		if(latency_str == undefined || latency_str == "" || latency_str == "0")
		{
			latency_str = this.FormatTime(0);
		} 
		else if(typeof(latency_str) == "number") 
		{
			latency_str == this.FormatTime(latency_str);
		}
		this.m_interaction_ary[temp_int]["latency_str"] = latency_str;
		if(date_str == undefined || date_str == "")
		{
			date_str = this.FormatDate();
		}
		this.m_interaction_ary[temp_int]["date_str"] = date_str;
		if(time_str == undefined || time_str == "")
		{
			time_str = this.FormatTime(0);
		} 
		else if(typeof(time_str) == "number") 
		{
			time_str = this.FormatTime(time_str);
		}
		this.m_interaction_ary[temp_int]["time_str"] = time_str;
		//trace("Tracking Adapter setting interaction data interaction_ary = " + interaction_ary.toString());
	},
	
	SendInteractionData: function(interactionID_str, objectiveID_str, type_str, correctResponse_str, studentResponse_str, result_str, weight_int, latency_str, date_str, time_str, description_texts)
	{
		if(interactionID_str != undefined && interactionID_str != "")
		{
			this.SetInteractionData(interactionID_str, objectiveID_str, type_str, correctResponse_str, studentResponse_str, result_str, weight_int, latency_str, date_str, time_str, description_texts);
		}
	},

	RoundDecimals: function(num_int, decimals_int)
	{
		decimals_int = ((!decimals_int && decimals_int != 0) ? 2 : decimals_int);
		return Math.round(num_int * Math.pow(10,decimals_int))/Math.pow(10,decimals_int);
	},
		
	FormatNum: function(initialValue_var, numToPad_int)
	{
		var paddedValue_str = "";						 // String; Contains the value padded with 0's
		var i = 0;									 // Integer; Variable used for looping
		var initialValue_str = "'" + initialValue_var + "'";	

		if (initialValue_str.length > numToPad_int)
		{
			// error - length of initial value already exceeds the number to pad
			// Will return the initialValue_var without additional padding
		} 
		else 
		{
			for (i = 1; i <= (numToPad_int - initialValue_str.length); i++)
			{
				paddedValue_str = paddedValue_str + "0";
			}
		}
		paddedValue_str = paddedValue_str + initialValue_var;
		return paddedValue_str;
	},
	
	FormatTime: function(timeInSeconds, minutes_str, seconds_str, typeFormat_int)
	{
		var hours_str, formattedTime_str;

		seconds_str = "00";
		minutes_str = "00";
		hours_str   = "00";

		seconds_str = this.FormatNum(Math.floor(timeInSeconds), 2);

		if (seconds_str > 59)
		{
			minutes_str = Math.floor(seconds_str / 60);
			seconds_str = seconds_str - (minutes_str * 60);
			minutes_str = this.FormatNum(minutes_str, 2);
			seconds_str = this.FormatNum(seconds_str, 2);
		}
		if (minutes_str > 59)
		{
			hours_str = Math.floor(minutes_str/ 60);
			minutes_str = minutes_str - (hours_str * 60);
			hours_str = this.FormatNum(hours_str, 2);
			minutes_str = this.FormatNum(minutes_str, 2);
		}
		formattedTime_str = hours_str + ":" + minutes_str + ":" + seconds_str;
		return formattedTime_str;
	},

	FormatDate: function(date_var, day_str, year_str, format_type)
	{
		var month_str, formattedDate_str;

		if (date_var == undefined)
		{
			// Create date based on today's date
			var date_obj = new Date();
			date_var = this.FormatNum((date_obj.getMonth()+1), 2);
			day_str  = this.FormatNum((date_obj.getDate()), 2);
			year_str = (date_obj.getFullYear());
		} 
		else if(typeof(date_var) == "string" && date_var.indexOf("/") > -1) 
		{
			// Convert from MM/DD/YYYY - this doesn't make sense for most cases, but
			date_obj = date_var.split("/");
			date_var = this.FormatNum(date_obj[0], 2);
			day_str  = this.FormatNum(date_obj[1], 2);
			year_str = this.FormatNum(date_obj[2], 4);
		}
		
		if(format_type == 1)
			formattedDate_str = (year_str + "/" + date_var + "/" + day_str);
		else
			formattedDate_str = (date_var + "/" + day_str + "/" + year_str);
		return formattedDate_str;
	}

}

cp.SCORM_Rustici = function()
{
	cp.SCORM_Rustici.baseConstructor.call(this);
	this.m_cmiExitValue = "";
	this.m_cmiEntryValue = "";
	this.m_ExitNormal = false;
	this.verbose = false;
}

cp.inherits(cp.SCORM_Rustici, cp.TrackingAdapter);

cp.SCORM_Rustici.prototype.SetAdapterSpecificData = function(lAdapterSpecificData)
{
	this.SetExitNormal(lAdapterSpecificData.exitNormal);
	this.SetReportingOption(lAdapterSpecificData.reportingOption);
}

cp.SCORM_Rustici.prototype.SetExitNormal = function(iValue)
{
	this.m_ExitNormal = iValue;
}

cp.SCORM_Rustici.prototype.GetExitNormal = function()
{
	return this.m_ExitNormal;
}

cp.SCORM_Rustici.prototype.SetReportingOption = function(iValue)
{
	this.m_ReportingOption = iValue;
}

cp.SCORM_Rustici.prototype.GetReportingOption = function()
{
	switch(this.m_reportingOption)
	{
		// New Option for Cp6 - Completion and Success are both to be reported using
		//individual criteria 
		//TBD: Make sure that completionValueToSend = "default" when  this option comes in - aghose
		case 5: 
			return "completion_success";
			break;
		case 7: 
			return "completion_only";
			break;
		case 6: 
			return "incompleteToPassedOrFailed";			
			break;
		case 0: 
			return "breeze";
			break;
		default:	
			return "";
			break;	
	}
}

cp.SCORM_Rustici.prototype.Initialize = function()
{
	if(!this.IsInitialized())
	{
		if(!LMSDriverHolder.IsLoaded())
			return;
		this.SetInitialized(startBlnStr);
	}
	
	//After loading driver, set the exit related parameters
	if( this.GetReportingOption() == "incompleteToPassedOrFailed")
	{
		if(this.m_ExitNormal)
		{
			LMSDriverHolder.EXIT_SUSPEND_IF_COMPLETED = false;
			LMSDriverHolder.EXIT_NORMAL_IF_PASSED =true;
		}
		else
		{
			LMSDriverHolder.EXIT_SUSPEND_IF_COMPLETED = false;
			LMSDriverHolder.EXIT_NORMAL_IF_PASSED =false;
		}	
	}
	else
	{
		if(this.m_ExitNormal)
		{
			LMSDriverHolder.EXIT_SUSPEND_IF_COMPLETED = false;
			LMSDriverHolder.EXIT_NORMAL_IF_PASSED =false;
		}
		else
		{
			LMSDriverHolder.EXIT_SUSPEND_IF_COMPLETED = true;
			LMSDriverHolder.EXIT_NORMAL_IF_PASSED =false;
		}
	}
	
	return this.IsInitialized();
}

cp.SCORM_Rustici.prototype.GetTrackingData = function()
{
	//if(this.verbose)
	//	cp.log("function getTrackingData waitForData_var " + waitForData_var);
	//return; //blocking for AICC
	if(!this.IsTrackingDataLoaded())
	{
		this.GetTrackingDataCore();
		LMSDriverHolder.GetLaunchData(this.GetVendorData());
		//myTrace("    function getTrackingData  objectives_count : " + "objectives_count" +  "  ;vendor_data "  );
		/*if(waitForData_var == undefined)
		{
			waitForData_var = setInterval(waitForData, 100, this, getTimer() + (waitForData_int * 1000));
		}*/
	}
}

cp.SCORM_Rustici.prototype.GetTrackingDataCore = function()
{
	if(this.verbose)
		cp.log("cp.SCORM_Rustici :: function getTrackingDataCore ");

	//trace("\n-----------------------------------------------------------------\n");

	this.m_cmiEntryValue = LMSDriverHolder.GetEntryMode();
	//trace("Get of cmi.entry is:"+cmiEntryValue+":");
	
	this.SetLessonData(LMSDriverHolder.GetDataChunk());
	this.SetLessonLocation(LMSDriverHolder.GetBookMark());
	
	//trace("-----------------------------------------------------------------\n");	
	
	/*if(waitForData_var == undefined)
	{
		waitForData_var = setInterval(waitForData, 100, this, getTimer() + (waitForData_int * 1000));
	}*/
}

cp.SCORM_Rustici.prototype.SetTrackingData = function(_scoreRaw_int, _scoreMin_int, _scoreMax_int, _scoreAsPercent_bln, _location_str, _statusCompletion_str, _statusSuccess_str, _statusPreference_bln, _time_str, _suspendData_str,_progressMeasure_Number, _sendIncompleteToPassedOrFailed_bln, _beginSendingSuccessStatus_bln)
{
	if(this.verbose)
		cp.log("function setTrackingData ");
	// call each of the set functions
	if(_scoreAsPercent_bln==true)
	{
		// Set score as a percent
		if(_scoreRaw_int != undefined && _scoreMax_int != undefined && !isNaN(Math.round((_scoreRaw_int/_scoreMax_int)*100)) && _scoreMax_int != 0)
		{
			// based on raw and max
			this.SetScore(Math.round((_scoreRaw_int*100/_scoreMax_int)*100)/100, 0, 100);
		} 
		else 
		{
			// based on raw score
			this.SetScore(Math.round(_scoreRaw_int*100)/100);
		}
	} else {
		if(_scoreRaw_int != undefined && _scoreMin_int != undefined && _scoreMax_int != undefined)
		{
			this.SetScore(_scoreRaw_int, _scoreMin_int, _scoreMax_int);
		} 
		else if(_scoreRaw_int != undefined && _scoreMax_int != undefined) 
		{
			this.SetScore(_scoreRaw_int, 0, _scoreMax_int);
		} 
		else if(_scoreRaw_int != undefined) 
		{
			this.SetScore(_scoreRaw_int);
		} 
		else 
		{
			this.SetScore();
		}
	}
	
	if(_progressMeasure_Number != undefined)
	{
		this.SetProgressMeasure(_progressMeasure_Number);
	}
	
	if(_location_str != undefined)
	{
		this.SetLessonLocation(_location_str);
	}
	if(_sendIncompleteToPassedOrFailed_bln)
	{
		this.SetLessonStatus(_statusCompletion_str, _statusSuccess_str);
	}
	else
	{
		if(_statusPreference_bln != undefined && _statusPreference_bln == true)
		{
			//Completion only
			this.SetLessonStatus(_statusCompletion_str);
		}
		else
		{
			this.SetLessonStatus(_statusCompletion_str, _statusSuccess_str);
		}
	}
	this.SetTimeInSession(_time_str);

	if(_suspendData_str != undefined)
	{
		this.SetLessonData(_suspendData_str);
	}
}

cp.SCORM_Rustici.prototype.SendSuspendData = function(_resumeData_str)
{
	//myTrace("function sendSuspendData "  +arguments);
	if(_resumeData_str != undefined)
	{
		this.SetLessonData(_resumeData_str);
	}	
	
	if(this.IsLessonDataTracked())
	{
		var dataChunk = createAndGetDataChunk();
		//if(this.GetLessonData() != "")
		if(dataChunk != "");
		{
			var lArgs = new Array();
			lArgs.push(dataChunk);
			this.SCORMbuild("SetDataChunk",lArgs);
			//LMSDriverHolder.SetDataChunk(dataChunk);//escape(this.GetLessonData()));
		}	
	}
}

cp.SCORM_Rustici.prototype.SendTrackingData = function(_scoreRaw_int, _scoreMin_int, _scoreMax_int, _scoreAsPercent_bln, _location_str, _statusCompletion_str, _statusSuccess_str, _statusPreference_bln, _time_str, _suspendData_str, _progressMeasure_Number, _sendIncompleteToPassedOrFailed_bln, _beginSendingSuccessStatus_bln)
{
	if(this.verbose)
		cp.log("function sendTrackingData ");
	var tempSuccess_str = "";
	var tempCompletion_str = "";
	
	//Note that _sendIncompleteToPassedOrFailed_bln, _beginSendingSuccessStatus_bln are not sent to setTrackingData since these only modify when something is to be reported
	//and dont really belong in the model. However, the function signature has been modified for future extension.  - aghose
	this.SetTrackingData(_scoreRaw_int, _scoreMin_int, _scoreMax_int, _scoreAsPercent_bln, _location_str, _statusCompletion_str, _statusSuccess_str, _statusPreference_bln, _time_str,		 _suspendData_str, _progressMeasure_Number, _sendIncompleteToPassedOrFailed_bln);
		
	if(_sendIncompleteToPassedOrFailed_bln)
	{
		if(this.GetSuccessStatus() == "passed")
		{
			var lArgs = new Array();
			lArgs.push("");
			this.SCORMbuild("SetPassed",lArgs);
			//LMSDriverHolder.SetPassed();
		}	
		else if(_beginSendingSuccessStatus_bln) 
		{
			var lArgs = new Array();
			lArgs.push("");
			this.SCORMbuild("SetFailed",lArgs);
			//LMSDriverHolder.SetFailed();
		}
	}
	else 
	{
		/*Set success status only when completion status is "completed"
		Set success status only when the success status in the tracking adapter is not null
		If it is null, assume that user doesnt want to send a success status - new behaviour for Cp6 publish options (this can happen in SCORM 2004)
		*/
		if( this.GetLessonStatus() == "completed" ) 
		{
			var lArgs = new Array();
			lArgs.push("");
			this.SCORMbuild("SetReachedEnd",lArgs);
			//LMSDriverHolder.SetReachedEnd();
			
			if(this.GetSuccessStatus())
			{
				//Set the success status
				if(this.GetSuccessStatus() == "passed")
				{
					var lArgs = new Array();
					lArgs.push("");
					this.SCORMbuild("SetPassed",lArgs);
					//LMSDriverHolder.SetPassed();
				}
				else if(this.GetSuccessStatus() == "failed")
				{
					var lArgs = new Array();
					lArgs.push("");
					this.SCORMbuild("SetFailed",lArgs);
					//LMSDriverHolder.SetFailed();
				}
			}
			
		}
	}
	var lArgs = new Array();
	lArgs.push(this.GetScoreRaw());
	lArgs.push(this.GetScoreMax());
	lArgs.push(this.GetScoreMin());
	this.SCORMbuild("SetPointBasedScore",lArgs);
	//LMSDriverHolder.SetPointBasedScore(this.GetScoreRaw(), this.GetScoreMax(), this.GetScoreMin());
	//SCORMbuild("SetProgressMeasure", getProgressMeasure(), "");

	/*
	if(getSuccessStatus() == "passed")
		SCORMbuild("SetPassed", "", "");
	else
		SCORMbuild("SetFailed", "", "");  */
		//1==1;
	
	//Change above calls to scormdriver calls
	var lArgs = new Array();
	lArgs.push(this.GetLessonLocation());
	this.SCORMbuild("SetBookmark",lArgs);
	//LMSDriverHolder.SetBookmark(this.GetLessonLocation());
	
	//Not sending session time here- should be taken care of in the driver end
	//SCORMbuild("SetSessionTime", getTimer(), "");
	
	//if(this.GetLessonData() != "")
	if(this.IsLessonDataTracked())
	{
		var dataChunk = createAndGetDataChunk();
		//if(this.GetLessonData() != "")
		if(dataChunk != "");
		{
			if(this.verbose)
				cp.log("Calling SCORM_Rustici::SendTrackingData::SetDataChunk");
			var lArgs = new Array();
			lArgs.push(dataChunk);
			this.SCORMbuild("SetDataChunk",lArgs);
			//LMSDriverHolder.SetDataChunk(dataChunk);//escape(this.GetLessonData()));
		}	
	}
}

cp.SCORM_Rustici.prototype.Flush = function()
{
	if(this.verbose)
		cp.log("function flush ");
	var lArgs = new Array();
	lArgs.push("");
	this.SCORMbuild("CommitData",lArgs);
	//LMSDriverHolder.CommitData();
}

cp.SCORM_Rustici.prototype.SetFinishedBln = function(value_bln)
{
	//myTrace("function finished_bln "  +arguments);
	
	var vartype = (typeof value_bln);
	
	if(vartype != "boolean")
	{
		if(vartype == "string")
		{
			if(value_bln.toLowerCase() == "true")
			{
				value_bln = true;
			} 
			else if(value_bln.toLowerCase() == "false") 
			{
				value_bln = false;
			}
		}
		else
		{
			value_bln = false;
		}
	}
	this.SetInitialized(!value_bln);
}

cp.SCORM_Rustici.prototype.Finish = function()
{
	//myTrace("function finish "  +arguments);
	var lArgs = new Array();
	lArgs.push("");
	this.SCORMbuild("CommitData",lArgs);
	//LMSDriverHolder.CommitData();
	this.SetFinishedBln(LMSDriverHolder.Finish());
}

cp.SCORM_Rustici.prototype.SetTrackingComplete = function()
{
	//myTrace("function finish "  +arguments);
	this.Finish();
}

cp.SCORM_Rustici.prototype.AICCTokenToSCORMToken = function(list_str,token_str)
{
	var a = list_str.split(",");
	var c = token_str.substr(0,1).toLowerCase();
	for (var i=0;i<a.length;i++)
	{
		if (c == a[i].substr(0,1)) return a[i]
	}
	return token_str;
}

cp.SCORM_Rustici.prototype.NormalizeStatus = function(status_str)
{
	//myTrace("function normalizeStatus "  +arguments);
	return this.AICCTokenToSCORMToken("completed,incomplete,not attempted,failed,passed", status_str);
}

cp.SCORM_Rustici.prototype.NormalizeInteractionType = function(type_str)
{
	var returnType_str = type_str;
	if(returnType_str.toLowerCase() == "long-fill-in")
	{
		returnType_str = "long-fill-in";
	} 
	else 
	{
		returnType_str = this.AICCTokenToSCORMToken("true-false,choice,fill-in,matching,performance,sequencing,likert,numeric", returnType_str);
	}
	if(returnType_str=="" || returnType_str==undefined)
	{
		returnType_str = "other";
	}
	return returnType_str;
}

cp.SCORM_Rustici.prototype.NormalizeInteractionResult = function(result_str)
{
	//myTrace("function normalizeInteractionResult "  +arguments);
	var tempResult_str = this.AICCTokenToSCORMToken("correct,wrong,unanticipated,neutral", result_str);
	tempResult_str = (tempResult_str == "wrong"?"incorrect":tempResult_str);
	return tempResult_str;
}

cp.SCORM_Rustici.prototype.NormalizeRespose = function(response_str)
{
	//myTrace("function normalizeRespose "  +arguments);
	return this.AICCTokenToSCORMToken("true,false", response_str);
}

cp.SCORM_Rustici.prototype.FormatTimestamp = function(time_var)
{
	return this.FormatDate() + "T" + this.FormatTime(time_var, undefined, undefined, 2);
}

cp.SCORM_Rustici.prototype.SetInteractionData = function(interactionID_str, objectiveID_str, type_str, correctResponse_str, studentResponse_str, result_str, weight_int, latency_str, date_str, time_str, description_texts)
{
	if(this.verbose)
		cp.log("function setInteractionData ");
	if(!this.m_interaction_ary)
		this.m_interaction_ary = new Array();		
		
	var temp_int = this.m_interaction_ary.length;
	this.m_interaction_ary[temp_int] = new Array();
	this.m_interaction_ary[temp_int]["interactionID_str"] = interactionID_str;
	this.m_interaction_ary[temp_int]["objectiveID_str"] = objectiveID_str;
	this.m_interaction_ary[temp_int]["type_str"] = this.NormalizeInteractionType(type_str);
	this.m_interaction_ary[temp_int]["correctResponse_str"] = correct_responseIdentifierArr;
	this.m_interaction_ary[temp_int]["studentResponse_str"] = user_responseIdentifierArr;
	this.m_interaction_ary[temp_int]["result_str"] = this.NormalizeInteractionResult(result_str);
	this.m_interaction_ary[temp_int]["weight_int"] = weight_int;
	this.m_interaction_ary[temp_int]["latency_str"] = parseFloat(latency_str);
	this.m_interaction_ary[temp_int]["description_texts"] = description_texts;
	
	
	if(date_str == undefined || date_str == "")
	{
		date_str = this.FormatDate();
	} 
	else 
	{
		date_str = this.FormatDate(date_str);
	}
	this.m_interaction_ary[temp_int]["date_str"] = date_str;
	if(time_str == undefined || time_str == "")
	{
		time_str = this.FormatTimestamp(0);
	} 
	else 
	{
		time_str = this.FormatTimestamp(time_str);
	}
	this.m_interaction_ary[temp_int]["time_str"] = time_str;
}

cp.SCORM_Rustici.prototype.SendInteractionData = function(interactionID_str, objectiveID_str, type_str, correctResponse_str, studentResponse_str, result_str, weight_int, latency_str, date_str, time_str, description_texts)
{		
	if(this.verbose)
		cp.log("Rustici SCORM:: SendInteractionData ");
	if(this.IsInteractionDataTracked())
	{
		if(interactionID_str != undefined && interactionID_str != "")
		{
			user_responseIdentifierArr = [];
			correct_responseIdentifierArr = [];
			
			var aryResponseArr = new Array();
			var aryCorrectResponseArr = new Array();
			
			if(studentResponse_str.length > 0)
			{
				if(studentResponse_str.indexOf(";") != -1)
					aryResponseArr = studentResponse_str.split(';');
				else
					aryResponseArr.push(studentResponse_str);
			}
			
			if(correctResponse_str.length > 0)
			{
				if(correctResponse_str.indexOf(";") != -1)
					aryCorrectResponseArr = correctResponse_str.split(';');
				else
					aryCorrectResponseArr.push(correctResponse_str);
			}		
			
			this.SetInteractionData(interactionID_str, objectiveID_str, type_str, correctResponse_str, studentResponse_str, result_str, weight_int, latency_str, date_str, time_str, description_texts);
		}		
		
		var lQuestion_text = description_texts.questionText;
		//var result_bln = ConvertToInteractionResultConstant( result_str );
		//call the respective intercation fucntion depending on the question type		
		var ia_int = this.m_interaction_ary.length - 1;				
		switch(this.m_interaction_ary[ia_int].type_str)
		{
			case "choice":
			case "hotspot":
			{
				var lAnswerTextMap = description_texts.answerTexts.answerTextMap;		
				var lIsHotspot = this.m_interaction_ary[ia_int].type_str == "hotspot";
				for(var i = 0; i < aryResponseArr.length; ++i)
				{
					var longData = lIsHotspot ? aryResponseArr[i] : lAnswerTextMap[aryResponseArr[i]];
					user_responseIdentifierArr.push(LMSDriverHolder.CreateResponseIdentifier(aryResponseArr[i],longData));
				}
				
				for(var j = 0; j < aryCorrectResponseArr.length; ++j)
				{
					var longData = lIsHotspot ? aryCorrectResponseArr[j] : lAnswerTextMap[aryCorrectResponseArr[j]];					
					correct_responseIdentifierArr.push(LMSDriverHolder.CreateResponseIdentifier(aryCorrectResponseArr[j],longData));
				}
				var lArgs = new Array();
				lArgs.push(interactionID_str);
				lArgs.push(user_responseIdentifierArr);
				//lArgs.push(result_bln);
				lArgs.push(ConvertToInteractionResultConstant(this.m_interaction_ary[ia_int]["result_str"]));
				lArgs.push(correct_responseIdentifierArr);
				lArgs.push(lQuestion_text);
				lArgs.push(weight_int);
				lArgs.push(latency_str);
				lArgs.push(objectiveID_str);
				this.SCORMbuild("RecordMultipleChoiceInteraction",lArgs);
				//LMSDriverHolder.RecordMultipleChoiceInteraction(interactionID_str, user_responseIdentifierArr, result_bln, correct_responseIdentifierArr, lQuestion_text,  weight_int, latency_str, objectiveID_str);			
				break;
			}
			case "true-false":
			{
				var lArgs = new Array();
				lArgs.push(interactionID_str);
				lArgs.push(Boolean(studentResponse_str));
				lArgs.push(ConvertToInteractionResultConstant(this.m_interaction_ary[ia_int]["result_str"]));
				lArgs.push(Boolean(correctResponse_str));
				lArgs.push(lQuestion_text);
				lArgs.push(weight_int);
				lArgs.push(latency_str);
				lArgs.push(objectiveID_str);
				lArgs.push(date_str);
				this.SCORMbuild("RecordTrueFalseInteraction",lArgs);
				//LMSDriverHolder.RecordTrueFalseInteraction(interactionID_str,Boolean(studentResponse_str),result_bln,Boolean(correctResponse_str),lQuestion_text,weight_int,latency_str,objectiveID_str,date_str);
				break;
			}
			case "fill-in":
				var lArgs = new Array();
				lArgs.push(interactionID_str);
				lArgs.push(studentResponse_str);
				lArgs.push(ConvertToInteractionResultConstant(this.m_interaction_ary[ia_int]["result_str"]));
				lArgs.push(correctResponse_str);
				lArgs.push(lQuestion_text);
				lArgs.push(weight_int);
				lArgs.push(latency_str);
				lArgs.push(objectiveID_str);
				lArgs.push(date_str);
				this.SCORMbuild("RecordFillInInteraction",lArgs);
				//LMSDriverHolder.RecordFillInInteraction(interactionID_str, studentResponse_str, result_bln, correctResponse_str, lQuestion_text,  weight_int, latency_str, objectiveID_str);
				break;
			case "long-fill-in":
				LMSDriverHolder.RecordFillInInteraction(interactionID_str, studentResponse_str, result_bln, correctResponse_str, lQuestion_text,  weight_int, latency_str, objectiveID_str);
				break;
			case "matching":
				LMSDriverHolder.RecordMatchingInteraction(interactionID_str, studentResponse_MatchingResponses_arr, result_bln, correctResponse_MatchingResponses_arr, lQuestion_text,  weight_int, latency_str, objectiveID_str);
				break;
			case "sequencing":
			{
				var lArgs = new Array();
				lArgs.push(interactionID_str);
				lArgs.push(LMSDriverHolder.CreateResponseIdentifier(studentResponse_str.substring(0,1),description_texts.answerTexts.learner_response));
				//lArgs.push(result_bln);
				lArgs.push(ConvertToInteractionResultConstant(this.m_interaction_ary[ia_int]["result_str"]));
				lArgs.push(LMSDriverHolder.CreateResponseIdentifier(correctResponse_str.substring(0,1), description_texts.answerTexts.correct_response));
				lArgs.push(lQuestion_text);
				lArgs.push(weight_int);
				lArgs.push(latency_str);
				lArgs.push(objectiveID_str);
				this.SCORMbuild("RecordSequencingInteraction",lArgs);
				//LMSDriverHolder.RecordSequencingInteraction(interactionID_str, LMSDriverHolder.CreateResponseIdentifier(studentResponse_str.substring(0,1),description_texts.answerTexts.learner_response), result_bln, LMSDriverHolder.CreateResponseIdentifier(correctResponse_str.substring(0,1), description_texts.answerTexts.correct_response), lQuestion_text,  weight_int, latency_str, objectiveID_str);
				break;
			}
			case "likert":
				LMSDriverHolder.RecordLikertInteraction(interactionID_str, LMSDriverHolder.CreateResponseIdentifier(studentResponse_str.substring(0,1),studentResponse_str), result_bln, LMSDriverHolder.CreateResponseIdentifier(correctResponse_str.substring(0,1),correctResponse_str), lQuestion_text,  weight_int, latency_str, objectiveID_str);
				break;			
		}
		this.m_interaction_ary = [];
	}
	return;
}

cp.SCORM_Rustici.prototype.SCORMbuild = function(iFunction_str, iArgsArr)
{
	if(cp.movie.playbackController.LMSIsAICC())
		this.AddToQueue(iFunction_str, iArgsArr);
	else
		this.ProcessLMSCalls(iFunction_str, iArgsArr);
}

cp.SCORM_Rustici.prototype.ProcessLMSCalls = function(iFunction_str, iArgsArr)
{	
	var getArgumentString = function()
						{
							var lArgsStr = "";
							if(iArgsArr.length > 0)
							{
								if(typeof(iArgsArr[0]) == "string")
									lArgsStr = "'" + iArgsArr[0] + "'";
								else
									lArgsStr = iArgsArr[0];
								for(var i = 1; i < iArgsArr.length; ++i)
								{
									lArgsStr += ",";
									if(typeof(iArgsArr[i]) == "string")
										lArgsStr += "'" + iArgsArr[i] + "'";
									else
										lArgsStr += iArgsArr[i];
								}
							}
							
							return lArgsStr;
						};
	var callStr = "LMSDriverHolder." + iFunction_str + "(" + getArgumentString() + ")";
	if(cp.verbose)
		cp.log(callStr);			
						
	switch(iFunction_str)
	{
		case "RecordMultipleChoiceInteraction" :
		{
			LMSDriverHolder.RecordMultipleChoiceInteraction(iArgsArr[0],iArgsArr[1],iArgsArr[2],iArgsArr[3],iArgsArr[4],iArgsArr[5],iArgsArr[6],iArgsArr[7]);
			break;
		}
		case "RecordTrueFalseInteraction" :
		{
			LMSDriverHolder.RecordTrueFalseInteraction(iArgsArr[0],iArgsArr[1],iArgsArr[2],iArgsArr[3],iArgsArr[4],iArgsArr[5],iArgsArr[6],iArgsArr[7],iArgsArr[8]);
			break;
		}
		case "RecordSequencingInteraction" :
		{
			LMSDriverHolder.RecordSequencingInteraction(iArgsArr[0],iArgsArr[1],iArgsArr[2],iArgsArr[3],iArgsArr[4],iArgsArr[5],iArgsArr[6],iArgsArr[7]);
			break;
		}
		case "RecordFillInInteraction" :
		{
			LMSDriverHolder.RecordFillInInteraction(iArgsArr[0],iArgsArr[1],iArgsArr[2],iArgsArr[3],iArgsArr[4],iArgsArr[5],iArgsArr[6],iArgsArr[7]);
			break;
		}
		default :
		{
			eval(callStr);
			break;
		}
	}
}

cp.SCORM_Rustici.prototype.AddToQueue = function(iFunction_str, iArgsArr)
{
	if(!this.AICCQueue)
		this.AICCQueue = new Array();
	
	var functionObj = new Object();
	functionObj.function_str = iFunction_str;
	functionObj.argsArr = iArgsArr;
	
	this.AICCQueue.push(functionObj);
	
	var self = this;
	var AICCLMSCallTimer;	
	if(!AICCLMSCallTimer)
	{
		AICCLMSCallTimer = setInterval(function()
										{
											if(self.AICCQueue.length <= 0)
											{
												clearInterval(AICCLMSCallTimer);
												AICCLMSCallTimer = undefined;
												return;
											}											
											var lFunctionObj = self.AICCQueue.shift();
											self.ProcessLMSCalls(lFunctionObj.function_str, lFunctionObj.argsArr);
										},100);
	}	
}

cp.AnswerScore = function()
{
	this.m_answerID ="";
	this.m_chosenAnswer = "";
	this.m_correctAnswer="";
}

cp.ChoiceQuestionSpecificScore = function()
{
	this.m_answerOrderArrayAsString = "";
}
cp.ChoiceQuestionSpecificScore.prototype = 
{
	saveState: function(aQuizState)
	{
		if(  this.m_answerOrderArrayAsString == undefined || this.m_answerOrderArrayAsString == "")
			aQuizState.writeString("");
		else
			aQuizState.writeString(this.m_answerOrderArrayAsString);
	},

	restoreState: function(aQuizState)
	{
		this.m_answerOrderArrayAsString = aQuizState.readString();
	},
	
	reset: function()
	{
		this.m_answerOrderArrayAsString = "";
	}
}

cp.HotSpotQuestionSpecificScore = function()
{
	this.m_hotSpotNamesArrayAsString = "";
	this.m_hotSpot_xchordsAsString = "";
	this.m_hotSpot_ychordsAsString = "";
}
cp.HotSpotQuestionSpecificScore.prototype = 
{
	saveState: function(aQuizState)
	{
		if(this.m_hotSpotNamesArrayAsString == undefined || this.m_hotSpotNamesArrayAsString == "")
			aQuizState.writeString("nil");
		else
			aQuizState.writeString(this.m_hotSpotNamesArrayAsString);
		
		if(this.m_hotSpot_xchordsAsString == undefined || this.m_hotSpot_xchordsAsString == "")
			aQuizState.writeString("nil");
		else
			aQuizState.writeString(this.m_hotSpot_xchordsAsString);
		
		if(this.m_hotSpot_ychordsAsString == undefined || this.m_hotSpot_ychordsAsString == "")
			aQuizState.writeString("nil");
		else
			aQuizState.writeString(this.m_hotSpot_ychordsAsString);
	},
	
	restoreState: function(aQuizState)
	{
		this.m_hotSpotNamesArrayAsString = aQuizState.readString();
		if(this.m_hotSpotNamesArrayAsString == "nil")
			this.m_hotSpotNamesArrayAsString = "";
		
		this.m_hotSpot_xchordsAsString = aQuizState.readString();
		if(this.m_hotSpot_xchordsAsString == "nil")
			this.m_hotSpot_xchordsAsString = "";
		
		this.m_hotSpot_ychordsAsString = aQuizState.readString();
		if(this.m_hotSpot_ychordsAsString == "nil")
			this.m_hotSpot_ychordsAsString = "";
	},
	
	reset: function()
	{
		this.m_answerOrderArrayAsString = "";
	}
}

cp.QuestionScore = function()
{	
    this.m_slideNum;
    this.m_startTime;
    this.m_endTime;
    this.m_interactionType;
    this.m_objectiveID;
    this.m_interactionID;
    this.m_weighting;
    this.m_negativeWeight = 0;
    this.m_answerScores = []; // An array that has one entry per answer.  Each entry in this array gives the correct answer
    // and the chosen answer.
    this.m_numTries = 0; 	// Number of tries/attempts user made answering the question.
    this.m_answersIncomplete = true; // Were the answers for the last attempt complete?
    this.m_answeredCorrectly = false;
    this.m_pausedMsecs = 0;
    this.m_questionNumInQuiz = -1;
    this.m_wasJudged;
    this.m_isPretestQuestion = false;
    this.m_escapeAnswers = true;

    this.m_questionSpecificScore = undefined;

    this.m_restoredFromLMS = false;

    this.m_scoredPoints = 0;
    this.m_scoringType = 0;
    this.m_maxTries = -1;

    this.m_chosenAnswersAsString = "";
    this.m_correctAnswersAsString = "";
    this.m_isCorrectAsString = "";
    this.m_descriptionTexts = "";
    this.m_latencyAsSeconds = 0;
    this.m_latencyAsString = "";
    this.m_curDateAsString = "";
    this.m_curTimeAsSecondsSinceMidnight = 0;
    this.m_isShuffled = false;
    this.m_partiallyCorrect = false;
}

cp.QuestionScore.prototype =
{
	getdescriptionText: function()
	{
        return this.m_descriptionTexts;
    },

	getrestoredFromLMS: function()
	{
        return this.m_restoredFromLMS;
    },

	setrestoredFromLMS: function(aVal)
	{
        this.m_restoredFromLMS = aVal;
    },

	getslideNum: function()
	{
        return this.m_slideNum;
    },

	setslideNum: function(num)
	{
        this.m_slideNum = num;
    },

	getstartTime: function()
	{
        return this.m_startTime;
    },

	setstartTime: function(time)
	{
        this.m_startTime = time;
    },

	getendTime: function()
	{
        return this.m_endTime;
    },

    getQuestionScoringType: function () 
	{
        return this.m_scoringType;
    },

    setendTime: function (time) 
	{
        this.m_endTime = time;
    },

	getpausedMsecs: function()
	{
        return this.m_pausedMsecs;
    },

	setpausedMsecs: function(msecs)
	{
        this.m_pausedMsecs = msecs;
    },

	getinteractionType: function()
	{
        return this.m_interactionType;
    },

	setinteractionType: function(theType)
	{
        this.m_interactionType = theType;
        this.createQuestionSpecificScore();
    },

	getobjectiveID: function()
	{
        return this.m_objectiveID;
    },

	setobjectiveID: function(id)
	{
        this.m_objectiveID = id;
    },

	getquestionNumInQuiz: function()
	{
        return this.m_questionNumInQuiz;
    },

	setquestionNumInQuiz: function(num)
	{
        this.m_questionNumInQuiz = num;
    },

    // Returns number of seconds spent on this question
	getlatency: function()
	{
        var msecs;
        var seconds;
        if (startTime)
            msecs = this.m_endTime.getTime() - this.m_startTime.getTime() - this.m_pausedMsecs;
        else
            msecs = 0;
        seconds = msecs / 1000;
        return seconds;
    },


	getanswerScores: function()
	{
        return this.m_answerScores;
    },

	setanswerScores: function(scores)
	{
        this.m_answerScores = scores;
    },

	getanswersIncomplete: function()
	{
        return this.m_answersIncomplete;
    },

	setanswersIncomplete: function(incomplete)
	{
        this.m_answersIncomplete = incomplete;
    },

	getescapeAnswers: function()
	{
        return this.m_escapeAnswers;
    },

	setescapeAnswers: function(bool)
	{
        this.m_escapeAnswers = bool;
    },

	setquestionSpecificScore: function(aQuestionSpecificScore)
	{
        this.m_questionSpecificScore = aQuestionSpecificScore;
    },

	getquestionSpecificScore: function()
	{
        return this.m_questionSpecificScore;
    },

	answersAsString: function(whichProp, forReview)
	{
        /*var currAnswerScore:AnswerScore = null;
        var thisAns:String;
        var result:String = "";
        var separator:String = ",";

        //Adding extra space after the seperator
        for (var ans in answerScores) 
        {
        currAnswerScore = this.m_answerScores[ans];
        separator = currAnswerScore.getSeperator(forReview);
        thisAns = currAnswerScore.getAnswerAsString(whichProp,forReview,interactionType,_escapeAnswers);
        if (thisAns.length > 0) 
        {
        if (result.length > 0) 
        {
        result += separator;
        }
        result += thisAns;
        }
        }
        return result;*/
    },

	getcorrectAnswersAsString: function()
	{
        return this.answersAsString("correctAnswer", false);
    },


	getchosenAnswersAsString: function()
	{
        return this.answersAsString("chosenAnswer", false);
    },

	getcorrectAnswersForReview: function()
	{
        return this.answersAsString("correctAnswer", true);
    },

	getchosenAnswersForReview: function()
	{
        return this.answersAsString("chosenAnswer", true);
    },

	getansweredCorrectly: function()
	{
        return this.m_answeredCorrectly;
    },

	setansweredCorrectly: function(isCorrect)
	{
        this.m_answeredCorrectly = isCorrect;
    },

	getisCorrectAsString: function()
	{
        if (this.m_answeredCorrectly) {
            return "C";
        } else {
            return "W";
        }
    },

	getnumTries: function()
	{
        return this.m_numTries;
    },

    getmaxTries: function () 
	{
        return this.m_maxTries;
    },

    setnumTries: function (tries) 
	{
        this.m_numTries = tries;
    },

	getweighting: function()
	{
        return this.m_weighting;
    },

	setweighting: function(wt)
	{
        this.m_weighting = wt;
    },

	getnegativeWeight: function()
	{
        return this.m_negativeWeight;
    },

	setnegativeWeight: function(wt)
	{
        this.m_negativeWeight = wt;
    },

	getscoredPoints: function()
	{
        return this.m_scoredPoints;
    },

	setscoredPoints: function(pts)
	{
        this.m_scoredPoints = pts;
    },

	addLeadingZero: function(n)
	{
        if (n < 10) {
            return "0" + String(n);
        } else {
            return String(n);
        }
    },


	getlatencyAsString: function()
	{
        var latency_str = addLeadingZero(Math.round(latency / 3600)) + ":" + addLeadingZero(Math.round((latency % 3600) / 60)) + ":" + addLeadingZero(Math.round(latency) % 60);
        return latency_str;
    },

	getlatencyAsSeconds: function()
	{
        return latency;
    },


	getcurDateAsString: function()
	{
        var today_date = new Date();
        var date_str = addLeadingZero(today_date.getMonth() + 1) + "/" + addLeadingZero(today_date.getDate()) + "/" + today_date.getFullYear();
        return date_str;
    },

    //GS in format YYYY/MM/DD
	getcurDateAsString2: function()
	{
        var today_date = new Date();
        var date_str = today_date.getFullYear() + "/" + addLeadingZero(today_date.getMonth() + 1) + "/" + addLeadingZero(today_date.getDate());
        return date_str;
    },

	getcurTimeAsString: function()
	{
        var today_date = new Date();
        var time_str = addLeadingZero(today_date.getHours()) + ":" + addLeadingZero(today_date.getMinutes()) + ":" + addLeadingZero(today_date.getSeconds());
        return time_str;
    },

	getcurTimeAsSecondsSinceMidnight: function()
	{
        var today_date;
        return today_date.getHours() * 3600 + today_date.getMinutes() * 60 + today_date.getSeconds();
    },


	getscore: function()
	{
        if (this.m_wasJudged)
            return this.m_scoredPoints;
        else
            return 0;
    },

	getwasJudged: function()
	{
        return this.m_wasJudged;
    },

	setwasJudged: function(judged)
	{
        this.m_wasJudged = judged;
    },

	getisPretestQuestion: function()
	{
        return this.m_isPretestQuestion;
    },

	setisPretestQuestion: function(iVal)
	{
        this.m_isPretestQuestion = iVal;
    },


	saveState: function(aQuizState)
	{
        aQuizState.writeNumber(this.m_slideNum);
        aQuizState.writeNumber(this.m_questionNumInQuiz);
        if ((this.m_startTime != undefined) && (this.m_startTime != 0))
            aQuizState.writeNumber(this.m_startTime.getTime());
        else
            aQuizState.writeNumber(0);

        if ((this.m_endTime != undefined) && (this.m_endTime != 0))
            aQuizState.writeNumber(this.m_endTime.getTime());
        else
            aQuizState.writeNumber(0);
        aQuizState.writeBoolean(this.m_wasJudged);
        aQuizState.writeBoolean(this.m_partiallyCorrect);
        aQuizState.writeBoolean(this.m_answeredCorrectly);
        aQuizState.writeBoolean(this.m_answersIncomplete);
        aQuizState.writeNumber(this.m_numTries);
        aQuizState.writeBoolean(this.m_isShuffled); //TODO:: Need to handle in swf

        //Write ScoredPoints and its sign----------
        var isScorePointsNegative = false;
        var lScoredPoints = this.m_scoredPoints;
		if(lScoredPoints < 0)
		{
            isScorePointsNegative = true;
            lScoredPoints = -lScoredPoints;  //We can write only positive number else it wont be read properly while restoring
        }
        aQuizState.writeBoolean(isScorePointsNegative);
        aQuizState.writeNumber(lScoredPoints);
        //------------------------------------------

        aQuizState.writeNumber(this.m_answerScores.length);

        var lInteractionTypeAsNum = 0;
		switch(this.m_interactionType)
		{
            case "choice":
                lInteractionTypeAsNum = 0; //SWF compatible
                break;
            case "true-false":
                lInteractionTypeAsNum = 1; //SWF compatible
                break;
            case "fill-in":
                lInteractionTypeAsNum = 2; //SWF compatible
                break;
            case "sequencing":
                lInteractionTypeAsNum = 5; //SWF compatible
                break;
            case "hotspot":
                lInteractionTypeAsNum = 6; //SWF compatible				
                break;
            default:
                break;
        }

        aQuizState.writeNumber(lInteractionTypeAsNum);

        //QuestionSpecificScore		
        if (this.m_questionSpecificScore)
            this.m_questionSpecificScore.saveState(aQuizState);

		for (var whichAns = 0; whichAns <this.m_answerScores.length; whichAns++)
		{
            aQuizState.writeString(this.m_answerScores[whichAns].m_answerID);
            aQuizState.writeString(this.m_answerScores[whichAns].m_chosenAnswer);
            aQuizState.writeString(this.m_answerScores[whichAns].m_correctAnswer);
        }
    },

	restoreState: function(aQuizState)
	{
        if (!aQuizState)
            return;

        this.m_slideNum = aQuizState.readNumber(); //Dummy Read for SWF Compatibility
        this.m_questionNumInQuiz = aQuizState.readNumber();

        if ((this.m_startTime == undefined) || (this.m_startTime == 0))
            this.m_startTime = new Date();
        this.m_startTime.setTime(aQuizState.readNumber());

        if ((this.m_endTime == undefined) || (this.m_endTime == 0))
            this.m_endTime = new Date();
        this.m_endTime.setTime(aQuizState.readNumber());

        this.m_wasJudged = aQuizState.readBoolean();
        this.m_partiallyCorrect = aQuizState.readBoolean(); //TODO:: Need to handle in swf
        this.m_answeredCorrectly = aQuizState.readBoolean();
        this.m_answersIncomplete = aQuizState.readBoolean();
        this.m_numTries = aQuizState.readNumber();
        this.m_isShuffled = aQuizState.readBoolean(); //TODO:: Need to handle in swf

        //Read ScoredPoints
        var isScorePointsNegative = aQuizState.readBoolean();
        this.m_scoredPoints = aQuizState.readNumber();
        if (isScorePointsNegative)
            this.m_scoredPoints = -this.m_scoredPoints;
        //------------------------------------------		

        var lNumAnswerScores = aQuizState.readNumber();

        var lInteractionType = aQuizState.readNumber();
        var lInteractionTypeAsString = "choice";
		switch(lInteractionType)
		{
            case 0:
                lInteractionTypeAsString = "choice"; //SWF compatible
                break;
            case 1:
                lInteractionTypeAsString = "true-false"; //SWF compatible
                break;
            case 2:
                lInteractionTypeAsString = "fill-in"; //SWF compatible
                break;
            case 5:
                lInteractionTypeAsString = "sequencing"; //SWF compatible
                break;
            case 6:
                lInteractionTypeAsString = "hotspot"; //SWF compatible				
                break;
            default:
                break;
        }

        this.setinteractionType(lInteractionTypeAsString);

        if (this.m_questionSpecificScore)
            this.m_questionSpecificScore.restoreState(aQuizState);

		for (var whichAns = 0; whichAns <lNumAnswerScores; ++whichAns)
		{
            var lAnsScore = new cp.AnswerScore();
            lAnsScore.m_answerID = aQuizState.readString();
            lAnsScore.m_chosenAnswer = aQuizState.readString();
            lAnsScore.m_correctAnswer = aQuizState.readString();
            this.m_answerScores.push(lAnsScore);
        }
        this.restoreQuestionProperties();
    },

    restoreQuestionProperties: function () //Restore Question Properties from QuestionScore
    {
        if (!cp.movie.questionObjs)
            return;
        if ((this.m_questionNumInQuiz < 0) || (this.m_questionNumInQuiz >= cp.movie.questionObjs.length))
            return;
        var lQuestionObject = cp.movie.questionObjs[this.m_questionNumInQuiz];
        if (!lQuestionObject)
            return;
        //SlideIndex will be set in Question Constructor..No Need to get it from QuestionScore
        lQuestionObject.questionNumberInQuiz = this.m_questionNumInQuiz;

        lQuestionObject.startTime = this.m_startTime;
        lQuestionObject.endTime = this.m_endTime;

        lQuestionObject.wasJudged = this.m_wasJudged;

        lQuestionObject.currentAttempt = this.m_numTries;
        lQuestionObject.setScore(this.m_scoredPoints);
        lQuestionObject.m_isShuffled = this.m_isShuffled;

        if (this.m_partiallyCorrect)
            lQuestionObject.m_QuestionStatus = lQuestionObject.QuestionStatusEnum.PARTIAL_CORRECT;
        else if (this.m_answersIncomplete)
            lQuestionObject.m_QuestionStatus = lQuestionObject.QuestionStatusEnum.INCOMPLETE;
        else if (this.m_answeredCorrectly)
            lQuestionObject.m_QuestionStatus = lQuestionObject.QuestionStatusEnum.CORRECT;
        else
            lQuestionObject.m_QuestionStatus = lQuestionObject.QuestionStatusEnum.INCORRECT;

        //TODO:: original Sequence
        //TODO::Question Status
        //TODO -- set it start of Question --- no need to pass to LMS

        //Resume Answer Order
        lQuestionObject.restoreFromQuestionSpecificScoreProperties(this.m_questionSpecificScore);

        //Resume Selected Answers		
        lQuestionObject.resumeSelectedAnswers(this.m_answerScores.slice(0));
        lQuestionObject.m_questionScore = this;
    },

	getinteractionID: function()
	{
        return this.m_interactionID;
    },

	setinteractionID: function(id)
	{
        this.m_interactionID = id;
    },

	setQuestionDatafromQuestion: function(aObjectiveID,aInteractionid,aWeighting, aNegativeWeight)
	{
        this.m_objectiveID = aObjectiveID;
        this.m_interactionID = aInteractionid;
        this.m_weighting = aWeighting;
        this.m_negativeWeight = aNegativeWeight;
    },

	createQuestionSpecificScore: function()
	{
		if(!this.m_questionSpecificScore)
		{
            if (this.m_interactionType == "hotspot")
                this.m_questionSpecificScore = new cp.HotSpotQuestionSpecificScore();
            else
                this.m_questionSpecificScore = new cp.ChoiceQuestionSpecificScore();
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////
    // IQuestionScore
    ////////////////////////////////////////////////////////////////////////////////////


	getSlideNum: function()
	{
        return this.m_slideNum;
    },

	setSlideNum: function(num)
	{
        this.m_slideNum = num;
    },

	getStartTime: function()
	{
        return this.m_startTime;
    },

	setStartTime: function(time)
	{
        this.m_startTime = time;
    },

	getEndTime: function()
	{
        return this.m_endTime;
    },

	setEndTime: function(time)
	{
        this.m_endTime = time;
    },

	getInteractionTypeForLMS: function()
	{
        var lRet;
		switch(this.m_interactionType)
		{
            case cpInteractionTypeEnum.Choice:
            case cpInteractionTypeEnum.HotSpot:
                lRet = "choice";
                break;
            case cpInteractionTypeEnum.TrueFalse:
                lRet = "true-false";
                break;
            case cpInteractionTypeEnum.FillIn:
                lRet = "fill-in";
                break;
            case cpInteractionTypeEnum.LongFillIn:
                lRet = "long-fill-in";
                break;
            case cpInteractionTypeEnum.Matching:
                lRet = "matching";
                break;
            case cpInteractionTypeEnum.Sequence:
                lRet = "sequencing";
                break;
            case cpInteractionTypeEnum.Likert:
                lRet = "likert";
                break;
            case cpInteractionTypeEnum.Widget:
                lRet = "widget";
                break;
        }
        return lRet;
    },
	getInteractionType: function()
	{
        var lRet;
		switch(this.m_interactionType)
		{
            case cpInteractionTypeEnum.Choice:
                lRet = "choice";
                break;
            case cpInteractionTypeEnum.TrueFalse:
                lRet = "true-false";
                break;
            case cpInteractionTypeEnum.FillIn:
                lRet = "fill-in";
                break;
            case cpInteractionTypeEnum.LongFillIn:
                lRet = "long-fill-in";
                break;
            case cpInteractionTypeEnum.Matching:
                lRet = "matching";
                break;
            case cpInteractionTypeEnum.Sequence:
                lRet = "sequencing";
                break;
            case cpInteractionTypeEnum.Likert:
                lRet = "likert";
                break;
            case cpInteractionTypeEnum.HotSpot:
                lRet = "hotspot";
                break;
            case cpInteractionTypeEnum.Widget:
                lRet = "widget";
                break;
        }
        return lRet;
    },

	setInteractionType: function(intType)
	{
        var lRet; //:cpInteractionTypeEnum;
		switch(intType)
		{
            case "choice":
                lRet = cpInteractionTypeEnum.Choice;
                break;
            case "true-false":
                lRet = cpInteractionTypeEnum.TrueFalse;
                break;
            case "fill-in":
                lRet = cpInteractionTypeEnum.FillIn;
                break;
            case "long-fill-in":
                lRet = cpInteractionTypeEnum.LongFillIn;
                break;
            case "matching":
                lRet = cpInteractionTypeEnum.Matching;
                break;
            case "sequencing":
                lRet = cpInteractionTypeEnum.Sequence;
                break;
            case "hotspot":
                lRet = cpInteractionTypeEnum.HotSpot;
                break;
            case "likert":
                lRet = cpInteractionTypeEnum.Likert;
                break;
            case "widget":
                lRet = cpInteractionTypeEnum.Widget;
                break;
        }
        this.m_interactionType = lRet;
    },

	getObjectiveID: function()
	{
        return this.m_objectiveID;
    },

	setObjectiveID: function(id)
	{
        this.m_objectiveID = id;
    },


	getInteractionID: function()
	{
        return this.m_interactionID;
    },

	setInteractionID: function(id)
	{
        this.m_interactionID = id;
    },


	getWeighting: function()
	{
        return this.m_weighting;
    },

	setWeighting: function(wt)
	{
        this.m_weighting = wt;
    },

	getNegativeWeight: function()
	{
        return this.m_negativeWeight;
    },

	setNegativeWeight: function(wt)
	{
        this.m_negativeWeight = wt;
    },

	getAnswerScores: function()
	{
        return this.m_answerScores;
    },

	setAnswerScores: function(scores)
	{
        this.m_answerScores = scores;
    },

	getNumTries: function()
	{
        return this.m_numTries;
    },

	setNumTries: function(num)
	{
        this.m_numTries = num;
    },

	getAnswersIncomplete: function()
	{
        return this.m_answersIncomplete
    },

	setAnswersIncomplete: function(incomplete)
	{
        this.m_answersIncomplete = incomplete
    },


	getAnsweredCorrectly: function()
	{
        return this.m_answeredCorrectly;
    },

	setAnsweredCorrectly: function(correct)
	{
        this.m_answeredCorrectly = correct;
    },

	getPausedMsecs: function()
	{
        return this.m_pausedMsecs;
    },

	setPausedMsecs: function(msecs)
	{
        this.m_pausedMsecs = msecs;
    },

	getQuestionNumInQuiz: function()
	{
        return this.m_questionNumInQuiz;
    },

	setQuestionNumInQuiz: function(num)
	{
        this.m_questionNumInQuiz = num;
    },

	getWasJudged: function()
	{
        return this.m_wasJudged;
    },

	setIsPretest: function(iVal)
	{
        this.m_isPretestQuestion = iVal;
    },

	getIsPretest: function()
	{
        return this.m_isPretestQuestion;
    },

	setWasJudged: function(judged)
	{
        this.m_wasJudged = judged;
    },

	resetScore: function()
	{
        this.m_answerScores = [];
        this.m_numTries = 0;
        this.m_startTime = undefined;
        this.m_endTime = undefined;
        this.m_answersIncomplete = false;
        this.m_answeredCorrectly = false;
        this.m_pausedMsecs = 0;
        this.m_wasJudged = false;
        if (this.m_questionSpecificScore)
            this.m_questionSpecificScore.reset();
    }
}

cp.SlideGraphManager = function()
{
	this.m_CurrentBranch = [];
	this.m_BranchHistory = [];
	this.m_SlideGraphObj = {};
	this.m_RootSlideIndex = -1;
	this.m_InvalidSlideJump = false;
		
		
	// slide view traverse variables
	this.m_CompletionBranch = [];
	this.m_CompletionBranchSet = false;
	this.m_CompletionBranchSlideCount = -1;
	this.m_CompletionBranchSlideCountSet = false;
	this.m_BranchNumber = 0;
	
	//Branch Enum
	if (!this['BranchEnum'])
	{
		this.BranchEnum = new Object();
		this.BranchEnum.kBranchNotFound = 0;
		this.BranchEnum.kBranchFound = 1;
		this.BranchEnum.kLoopBranchFound = 2;
		this.BranchEnum.kMultipleBranchFound = 3;
	}
}

cp.SlideGraphManager.prototype =
{

	countUniqItems: function( iArray )
	{
		var countObj = {};
		var count = 0;
		for( var iter = 0; iter < iArray.length ; ++iter )
		{
			var valueObj = iArray[iter];
			if( countObj[ valueObj]==undefined )
			{
				countObj[ valueObj ] = valueObj;
				++count;
			}
		}
		return count;
	},
		
	findCompletionBranchTraverse:function( aCurrentSlideIndex , aCurrentTempSlidesArray , aCurrentTempSlidesObj )
	{
		var lBranchEnded = false;
		var lCurrentBranchType = -1;
		
		//trace(" aCurrentSlideIndex = "+aCurrentSlideIndex);
		
		if( !lBranchEnded && (this.m_SlideGraphObj[aCurrentSlideIndex ]==undefined))
		{
			lCurrentBranchType = this.BranchEnum.kBranchFound;
			lBranchEnded = true;
			//trace("lBranchEnded = true");
		}
		//trace(" !m_SlideGraphObj.hasOwnProperty( aCurrentSlideIndex ) "+lBranchEnded);
		
		if( !lBranchEnded && (aCurrentTempSlidesObj[ aCurrentSlideIndex ]!=undefined))
		{
			lCurrentBranchType = this.BranchEnum.kLoopBranchFound;
			lBranchEnded = true;
			//trace("lBranchEnded = true");
		}
		//trace(" aCurrentTempSlidesObj.hasOwnProperty( aCurrentSlideIndex ) "+lBranchEnded);
		//trace("lBranchEnded = "+lBranchEnded);
		
		
		aCurrentTempSlidesArray.push(aCurrentSlideIndex);
		aCurrentTempSlidesObj[aCurrentSlideIndex] = aCurrentSlideIndex;
		//trace("aCurrentTempSlidesArray.length"+aCurrentTempSlidesArray.length);
		
		if( lBranchEnded )
		{ 
			++this.m_BranchNumber;
			if( this.m_BranchNumber == 1 )
			{
				
				this.m_CompletionBranch = this.m_CurrentBranch.concat(aCurrentTempSlidesArray);
				this.m_CompletionBranchSet = true;
				
				var lShouldCountSlides = ! ( ( lCurrentBranchType == this.BranchEnum.kLoopBranchFound ) && (aCurrentSlideIndex == aCurrentTempSlidesArray[0]) );
				
				if(lShouldCountSlides)
				{
					this.m_CompletionBranchSlideCount = this.countUniqItems(this.m_CurrentBranch.concat(aCurrentTempSlidesArray));
					this.m_CompletionBranchSlideCountSet = true;
				}
				
				aCurrentTempSlidesArray.pop(); // remove the last element
				delete aCurrentTempSlidesObj[aCurrentSlideIndex];
				
				return this.BranchEnum.kBranchFound;
				
			}
			else if( this.m_BranchNumber >= 2 )
			{
				this.m_CompletionBranchSet = false;
				if(this.m_CompletionBranchSlideCountSet)
				{
					var lPresentCount = this.countUniqItems(this.m_CurrentBranch.concat(aCurrentTempSlidesArray));
					//trace(" lPresentCount = "+lPresentCount);
					var lShouldCountSlidesSecond = ! ( ( lCurrentBranchType == this.BranchEnum.kLoopBranchFound ) && (aCurrentSlideIndex == aCurrentTempSlidesArray[0]) );
					if( lShouldCountSlidesSecond && ( lPresentCount == this.m_CompletionBranchSlideCount ) )
					{
						aCurrentTempSlidesArray.pop(); // remove the last element
						delete aCurrentTempSlidesObj[aCurrentSlideIndex];
						return this.BranchEnum.kBranchFound;
					}
					else
					{
						this.m_CompletionBranchSlideCountSet = false;
						aCurrentTempSlidesArray.pop(); // remove the last element
						delete aCurrentTempSlidesObj[aCurrentSlideIndex];
						return this.BranchEnum.kMultipleBranchFound;
					}
				}
				else
				{
					aCurrentTempSlidesArray.pop(); // remove the last element
					delete aCurrentTempSlidesObj[aCurrentSlideIndex];
					return this.BranchEnum.kMultipleBranchFound;
				}
			}
		}
		
		var lConnectedSlideObj = this.m_SlideGraphObj[ aCurrentSlideIndex ];
		
		var lIsBranchFound = false;
		
		for( var lConnectedSlide in lConnectedSlideObj )
		{
			var lTempState = this.findCompletionBranchTraverse(Number(lConnectedSlide),aCurrentTempSlidesArray,aCurrentTempSlidesObj);
			switch( lTempState )
			{
				case this.BranchEnum.kBranchFound:
					lIsBranchFound = true;
				case this.BranchEnum.kBranchNotFound:
					break;
				case this.BranchEnum.kMultipleBranchFound:
					return this.BranchEnum.kMultipleBranchFound;
			}
		}
		
		aCurrentTempSlidesArray.pop(); // remove the last element
		delete aCurrentTempSlidesObj[aCurrentSlideIndex];
		
		return (lIsBranchFound)?this.BranchEnum.kBranchFound:this.BranchEnum.kBranchNotFound;		
	},
		
	findCompletionBranch: function()
	{
		this.m_CompletionBranch = [];
		this.m_CompletionBranchSet = false;
		this.m_BranchNumber = 0;
		
		var lStartSlideIndex = (this.m_CurrentBranch.length>=1)?this.m_CurrentBranch[this.m_CurrentBranch.length-1]:this.m_RootSlideIndex;
		var tempArray = [];
		var tempObject = {};
		this.findCompletionBranchTraverse(lStartSlideIndex,tempArray,tempObject);
	},
		
		
	/* Initializes the slide graph from movie XML */
	initialize: function()
	{
		var lGraphManagerData = cp.model.data['sgMgr'];
		if(lGraphManagerData == undefined)
			return;
		var lRootSlideIndex = lGraphManagerData['ri'];		
		var lSlideGraph = lGraphManagerData['sg'];
		if((lRootSlideIndex == undefined )||(lSlideGraph == undefined))
			return;
		
		this.m_InvalidSlideJump = false;
		this.m_RootSlideIndex = lRootSlideIndex;
		
		for (var i = 0; i < lSlideGraph.length; ++i) 
		{
			var lSlide = lSlideGraph[i]; 
			if((lSlide==undefined) || (lSlide.length != 2)) // lSlide = [slideIndex, [ConnectedSlideVector]]
				continue;
			this.m_SlideGraphObj[lSlide[0]]={};
			var lConnectedSlideVector = lSlide[1]; //[[3,[0]],[5,[3]]]
			for(var k=0; k<lConnectedSlideVector.length; ++k)
			{
				var lConnectedSlide = lConnectedSlideVector[k]; //lConnectedSlide = [slideIndex,[branchTypeVector]]
				if((lConnectedSlide==undefined) || (lConnectedSlide.length != 2)) // lSlide = [slideIndex, [ConnectedSlideVector]]
					continue;
				this.m_SlideGraphObj[lSlide[0]][lConnectedSlide[0]]={};
				var lbranchTypes = lConnectedSlide[1];
				for(var bt=0; bt<lbranchTypes.length;++bt)
				{
					var lbt = lbranchTypes[bt];
					if(lbt!=undefined)
						this.m_SlideGraphObj[lSlide[0]][lConnectedSlide[0]][lbt]=lbt;
				}
			}			
		}			
	},

	/* Capture Slide Jump */
	onSlideJump: function( aDestinationSlideIndex )
	{
		if(this. m_CurrentBranch.length > 0 )
		{
			var lPreviousSlideIndex = this.m_CurrentBranch[this.m_CurrentBranch.length-1];
			if( aDestinationSlideIndex == lPreviousSlideIndex )
			{
				//trace("Same slide added before");
				return;
			}
			
			if( this.m_SlideGraphObj[lPreviousSlideIndex]  == undefined)
			{
				//alert(" Inavlid slide jump ");
				this.m_BranchHistory.push( aDestinationSlideIndex );
				this.m_InvalidSlideJump = true;
				return;
			}
			
			if( this.m_SlideGraphObj[lPreviousSlideIndex][aDestinationSlideIndex] == undefined )
			{
				//alert(" Inavlid slide jump ");
				this.m_InvalidSlideJump = true;
				//Since this might be the case when user is try to jump to visited slide (transition not present in the graph) e.g through TOC
				//In that case we might need to update the current branch or scores.
				this.updateCurrentBranch(aDestinationSlideIndex);
				this.m_BranchHistory.push( aDestinationSlideIndex );
				return;
			}
		}
		this.m_BranchHistory.push( aDestinationSlideIndex );
		this.m_CurrentBranch.push( aDestinationSlideIndex );			
	},
		
	/* Calculate Slide view percentage */
	getSlideViewPercentage:function()
	{
		if( ( !this. m_CompletionBranchSet ) && ( ! this.m_CompletionBranchSlideCountSet  ) )
		{
			//trace("findCompletionBranch() called");
			this.findCompletionBranch();
		}
		
		if( ( ! this.m_CompletionBranchSet ) && ( ! this.m_CompletionBranchSlideCountSet  ) )
		{
			//trace(" No completion branch found second time ");
			return 'NaN';
		}
		
		var lViewedSlideCount = this.countUniqItems(this.m_CurrentBranch);
		
		var lTotalSlideCount = -1;
		if(this.m_CompletionBranchSlideCountSet)
			lTotalSlideCount = this.m_CompletionBranchSlideCount ;
		else
			lTotalSlideCount = this.countUniqItems(this.m_CompletionBranch);
		
		if( lTotalSlideCount <= 0 ) 
			return 'NaN'; 
		
		return lViewedSlideCount*100/lTotalSlideCount;
	},
		
	/*Check if Slide is present in the current branch*/
	isSlidePartOfCurrentBranch: function(aSlideIndex)
	{
		if((this.m_CurrentBranch.length > 0) && (this.m_CurrentBranch.indexOf(aSlideIndex) != -1))
			return true;			
		return false;
	},
		
	getCompletionBranch: function()
	{
		if(!this.m_CompletionBranchSet)
			this.findCompletionBranch();
		
		if(!this.m_CompletionBranchSet) //No completion branch found second time
			return [];
			
		return this.m_CompletionBranch;					
	},
	
	getCurrentBranch:function()
	{
		return this.m_CurrentBranch;					
	},
	
	getBranchHistory: function()
	{
		return this.m_BranchHistory;
	},
		
	/*restore Completion Branch from LMS */
	restoreCompletionBranchState:function(aCompletionBranch)
	{
		if(aCompletionBranch.length>0)
		{
			this.m_CompletionBranch = []
			this.m_CompletionBranch = aCompletionBranch;
			this.m_CompletionBranchSet = true;
		}
	},
	/*restore Current Branch from LMS */
	restoreCurrentBranchState:function( aCurrentBranch)
	{
		if(aCurrentBranch.length>0)
		{
			this.m_CurrentBranch = []
			this.m_CurrentBranch = aCurrentBranch;
			
			this.m_BranchHistory = []
			this.m_BranchHistory = aCurrentBranch.slice();
		}
	},
	
	/*Reset Current Branch e.g while retaking from quiz */
	resetCurrentBranch: function(aSlideIndex)
	{
		if(aSlideIndex < 0)
			return;
		var lSlideIndexInBranch = -1;
		for(var lIndex = 0; lIndex < this.m_CurrentBranch.length; ++lIndex)
		{
			if(this.m_CurrentBranch[lIndex] == aSlideIndex)
			{
				lSlideIndexInBranch = aSlideIndex;
				break;
			}
		}
		if((lSlideIndexInBranch >=0) && ((lSlideIndexInBranch+1) < this.m_CurrentBranch.length))
			this.m_CurrentBranch.splice(lSlideIndexInBranch+1);
	},
	
	updateCurrentBranch: function(aDestinationSlideIndex)
	{
		//Need to take care the case where aDestinationSlideIndex is present multiple times in branch. In that case how to update the branch
	},
	
	/* calcuates teh max Quiz Score */
	getMaxQuizScore: function()
	{	
		//Should be implemented in QuizSlideGraphManager	
		return 0;
	},
	
	/* calcuates the min Quiz Score */
	getMinQuizScore: function()
	{
		//Should be implemented in QuizSlideGraphManager
		return 0;
	},
	
	/* Calculate The marks percentage */
	getQuizScorePercentage: function()
	{
		//Should be implemented in QuizSlideGraphManager
		return 0;
	},
	
	/* First Slide to Jump to after second attempt */
	getNextAttemptFirstQuestionSlideIndex: function()
	{	
		//Should be implemented in QuizSlideGraphManager
		return -1;
	},	
	
	/* First Slide to Jump to after review is clicked */
	getReviewFirstQuestionSlideIndex: function()
	{
		//Should be implemented in QuizSlideGraphManager
		return -1;
	},
	/* calcuates num of questions in a branch. Returns NaN if not able to find definitive branch*/
	getNumQuestions: function()
	{
		//Should be implemented in QuizSlideGraphManager
		return 0;
	},
	getQuestionSlideProgressNumber: function(aQSlideIndex)
	{
		//Should be implemented in QuizSlideGraphManager
		return 'NaN';
	},
	setQuestionSlideProgressNumber: function(aQSlideIndex)
	{
		//Should be implemented in QuizSlideGraphManager
	},
	getLastQuestionSlideIndex: function()
	{
		//Should be implemented in QuizSlideGraphManager
		return -1;
	},
	
	/* get the list of connected slides for the last visited slide */
	getNextSlideList: function( aFromSlideIndex)
	{
		var lRetVal = [];
		if( this.m_SlideGraphObj[aFromSlideIndex] != undefined )
		{
			var lConnectedSlides = this.m_SlideGraphObj[aFromSlideIndex];
			for( var lSlideIter in lConnectedSlides )
			{
				lRetVal.push(Number(lSlideIter));
			}
		}		
		return lRetVal;
	},
	getIsJumpValid: function( aStartSlideIndex, aEndSlideIndex )
	{
		if(this.m_SlideGraphObj[aStartSlideIndex] == undefined )
		{
			return false;
		}
		if( this.m_SlideGraphObj[aStartSlideIndex][aEndSlideIndex] == undefined )
		{
			return false;
		}
		return true;
	}
}

cp.QuizSlideGraphManager = function()
{
	cp.QuizSlideGraphManager.baseConstructor.call(this);
	this.m_CompletionBranchMaxQuizScore = 0;
	this.m_CompletionBranchMinQuizScore = 0;
	this.m_CompletionBranchMaxQuizScoreSet = false;
	this.m_CompletionBranchMinQuizScoreSet = false;	
	this.m_SlideNumToQuestionNumMap = {};
	this.m_progressNumber = 0;
	this.m_startSlideIndex = -1;
}

cp.inherits(cp.QuizSlideGraphManager, cp.SlideGraphManager);

{

	cp.QuizSlideGraphManager.prototype.getPlaybackController = function()
	{
		return cp.movie.playbackController;
	}
		
	cp.QuizSlideGraphManager.prototype.countQuizSlides = function( iBranch )
	{
		var countObj = {};
		var quizSlideCountInBranch = 0;
		for( var iter = 0; iter < iBranch.length ; ++iter )
		{
			var lSlideIndex = iBranch[iter];
			if( countObj[lSlideIndex ] == undefined )
			{
				countObj[ lSlideIndex ] = lSlideIndex;
				if(this.IsNonPretestQuestionSlide(lSlideIndex))
					++quizSlideCountInBranch; 					
			}
		}
		return quizSlideCountInBranch;			
	}
		
	cp.QuizSlideGraphManager.prototype.countQuizMaxScore = function( iBranch )
	{
		var lPlaybackController = this.getPlaybackController();
		if(lPlaybackController == undefined)
			return 'NaN';
		var lQuizController = lPlaybackController.GetQuizController();
		if(!lQuizController)
			return 0;
			
		var countObj = {};
		var quizMaxScoreInBranch = 0;
		for( var iter = 0; iter < iBranch.length ; ++iter )
		{
			var lSlideIndex = iBranch[iter];
			if( countObj[lSlideIndex ] == undefined )
			{
				countObj[ lSlideIndex ] = lSlideIndex;
				quizMaxScoreInBranch += lQuizController.getQuizSlideMaxScore(lSlideIndex);
			}
		}
		return quizMaxScoreInBranch;
	}
	
	cp.QuizSlideGraphManager.prototype.countQuizMinScore = function( iBranch )
	{
		var lPlaybackController = this.getPlaybackController();
		if(lPlaybackController == undefined)
			return 'NaN';
		var lQuizController = lPlaybackController.GetQuizController();
		if(!lQuizController)
			return 0;
			
		var countObj = {};
		var quizMinScoreInBranch = 0;
		for( var iter = 0; iter < iBranch.length ; ++iter )
		{
			var lSlideIndex = iBranch[iter];
			if( countObj[lSlideIndex ] == undefined )
			{
				countObj[ lSlideIndex ] = lSlideIndex;
				quizMinScoreInBranch += lQuizController.getQuizSlideMinScore(lSlideIndex);
			}
		}
		return quizMinScoreInBranch;
	}
	
	cp.QuizSlideGraphManager.prototype.countQuizScore = function( iBranch )
	{
		var lPlaybackController = this.getPlaybackController();
		if(lPlaybackController == undefined)
			return 'NaN';
		var lQuizController = lPlaybackController.GetQuizController();
		if(!lQuizController)
			return 0;
			
		var countObj = {};
		var quizScoreInBranch = 0;
		for( var iter = 0; iter < iBranch.length ; ++iter )
		{
			var lSlideIndex = iBranch[iter];
			if( countObj[lSlideIndex ] == undefined )
			{
				countObj[ lSlideIndex ] = lSlideIndex;
				quizScoreInBranch += lQuizController.getQuizSlideScore(lSlideIndex);
			}
		}
		return quizScoreInBranch;
	}		
		
		
	cp.QuizSlideGraphManager.prototype.findCompletionBranchTraverse = function( aCurrentSlideIndex , aCurrentTempSlidesArray , aCurrentTempSlidesObj )
	{
		var lBranchEnded = false;
		var lCurrentBranchType = -1;
		
		if( !lBranchEnded && (this.m_SlideGraphObj[ aCurrentSlideIndex ] == undefined))
		{
			lCurrentBranchType = this.BranchEnum.kBranchFound;
			lBranchEnded = true;
		}
		
		if( !lBranchEnded && (aCurrentTempSlidesObj[aCurrentSlideIndex] != undefined))
		{
			lCurrentBranchType = this.BranchEnum.kLoopBranchFound;
			lBranchEnded = true;
		}
		
		if(lCurrentBranchType != this.BranchEnum.kLoopBranchFound)
		{
			aCurrentTempSlidesArray.push(aCurrentSlideIndex);
			aCurrentTempSlidesObj[aCurrentSlideIndex] = aCurrentSlideIndex;
		}
		
		if( lBranchEnded )
		{ 
			++this.m_BranchNumber;
			if( this.m_BranchNumber == 1 )
			{
				var lCompletionBranch = [];
				var lCurrentBranchLength = this.m_CurrentBranch.length;
				var lCurrentTempSlidesLength = aCurrentTempSlidesArray.length;
				if((lCurrentBranchLength>0) && (lCurrentTempSlidesLength>0) && (this.m_CurrentBranch[lCurrentBranchLength-1] == aCurrentTempSlidesArray[0]))
				{
					lCompletionBranch = this.m_CurrentBranch.slice(0,lCurrentBranchLength-1); //ignoring last index as it is already present in currentTempSlidesArray
					lCompletionBranch = lCompletionBranch.concat(aCurrentTempSlidesArray);
					this.m_CompletionBranch = lCompletionBranch.slice();
				}
				else
				{
					this.m_CompletionBranch = this.m_CurrentBranch.concat(aCurrentTempSlidesArray);
				}
					
				this.m_CompletionBranchSet = true;
				
				this.m_CompletionBranchMaxQuizScore = this.countQuizMaxScore(this.m_CompletionBranch );
				this.m_CompletionBranchMaxQuizScoreSet = true;
				
				this.m_CompletionBranchMinQuizScore = this.countQuizMinScore(this.m_CompletionBranch );
				this.m_CompletionBranchMinQuizScoreSet = true;
				
				aCurrentTempSlidesArray.pop(); // remove the last element
				delete aCurrentTempSlidesObj[aCurrentSlideIndex];
				
				return this.BranchEnum.kBranchFound;
				
			}
			else if( this.m_BranchNumber >= 2 )
			{
				this.m_CompletionBranchSet = false;
				if(this.m_CompletionBranchMaxQuizScoreSet)
				{
					var lPresentMaxScore = this.countQuizMaxScore(this.m_CurrentBranch.concat(aCurrentTempSlidesArray));
					
					if( lPresentMaxScore == this.m_CompletionBranchMaxQuizScore )
					{
						if(lCurrentBranchType != this.BranchEnum.kLoopBranchFound)
						{
							aCurrentTempSlidesArray.pop(); // remove the last element
							delete aCurrentTempSlidesObj[aCurrentSlideIndex];
						}
						return this.BranchEnum.kBranchFound;
					}
					else
					{
						this.m_CompletionBranchMaxQuizScoreSet = false;
						if(lCurrentBranchType != this.BranchEnum.kLoopBranchFound)
						{
							aCurrentTempSlidesArray.pop(); // remove the last element
							delete aCurrentTempSlidesObj[aCurrentSlideIndex];
						}
						return this.BranchEnum.kMultipleBranchFound;
					}
				}
				else
				{
					if(lCurrentBranchType != this.BranchEnum.kLoopBranchFound)
					{
						aCurrentTempSlidesArray.pop(); // remove the last element
						delete aCurrentTempSlidesObj[aCurrentSlideIndex];
					}
					return this.BranchEnum.kMultipleBranchFound;
				}
			}
		}
		
		var lConnectedSlideObj = this.m_SlideGraphObj[ aCurrentSlideIndex ];
		
		var lIsBranchFound = false;
		
		for( var lConnectedSlide in lConnectedSlideObj )
		{
			var lTempState = this.findCompletionBranchTraverse(Number(lConnectedSlide),aCurrentTempSlidesArray,aCurrentTempSlidesObj);
			switch( lTempState )
			{
				case this.BranchEnum.kBranchFound:
					lIsBranchFound = true;
				case this.BranchEnum.kBranchNotFound:
					break;
				case this.BranchEnum.kMultipleBranchFound:
					return this.BranchEnum.kMultipleBranchFound;
			}
		}
		
		if(lCurrentBranchType != this.BranchEnum.kLoopBranchFound)
		{
			aCurrentTempSlidesArray.pop(); // remove the last element
			delete aCurrentTempSlidesObj[aCurrentSlideIndex];
		}
		
		return (lIsBranchFound)?this.BranchEnum.kBranchFound:this.BranchEnum.kBranchNotFound;
		
	}
		
	cp.QuizSlideGraphManager.prototype.findCompletionBranch = function()
	{
		var lStartSlideIndex = (this.m_CurrentBranch.length>=1)?this.m_CurrentBranch[this.m_CurrentBranch.length-1]:this.m_RootSlideIndex;
		//if(this.m_startSlideIndex == lStartSlideIndex)
		//	return; //already searched branch
		this.m_startSlideIndex = lStartSlideIndex;
			
		this.m_CompletionBranch = [];
		this.m_CompletionBranchSet = false;
		this.m_BranchNumber = 0;
		
		
		var lTempArray = [];
		var lTempObject = {};
		this.findCompletionBranchTraverse(lStartSlideIndex,lTempArray,lTempObject);
	}
		
	cp.QuizSlideGraphManager.prototype.IsNonPretestQuestionSlide = function( aSlideIndex)
	{
		// should return true only if the slide index corresponding slide is a question slide and scoringType is not 2 ( pretest ) 
		var lPlaybackController =  this.getPlaybackController();
		if(lPlaybackController)
		{
			var lQuizController = lPlaybackController.GetQuizController();
			if(lQuizController)
				return lQuizController.IsNonPretestQuestionSlide(aSlideIndex);		
		}
		return false;			
	}
		
	cp.QuizSlideGraphManager.prototype.findFirstNonPretestQuestionSlide = function()
	{
		var lSlideCount = this.m_CurrentBranch.length;
		for( var slideIter = 0 ; slideIter < lSlideCount ; ++slideIter )
		{
			if( this.IsNonPretestQuestionSlide(this.m_CurrentBranch[slideIter]) )
				return this.m_CurrentBranch[slideIter];
		}
		return -1;
	}
		
	/* calcuates the max Quiz Score */
	cp.QuizSlideGraphManager.prototype.getMaxQuizScore = function()
	{
		if( ( !this.m_CompletionBranchSet ) && ( !this.m_CompletionBranchMaxQuizScoreSet  ) )
		{
			this.findCompletionBranch();
		}
		
		if( ( !this.m_CompletionBranchSet ) && ( !this.m_CompletionBranchMaxQuizScoreSet  ) )
		{
			return 'NaN';
		}
		
		var lTotalQuizMaxScore = -1;
		if(this.m_CompletionBranchMaxQuizScoreSet)
			lTotalQuizMaxScore = this.m_CompletionBranchMaxQuizScore ;
		else
			lTotalQuizMaxScore = this.countQuizMaxScore(this.m_CompletionBranch);
		
		return lTotalQuizMaxScore;
	}
		
	/* calcuates the min Quiz Score */
	cp.QuizSlideGraphManager.prototype.getMinQuizScore = function()
	{
		if( ( !this.m_CompletionBranchSet ) && ( ! this.m_CompletionBranchMinQuizScoreSet  ) )
		{
			this.findCompletionBranch();
		}
		
		if( ( ! this.m_CompletionBranchSet ) && ( ! this.m_CompletionBranchMinQuizScoreSet  ) )
		{
			return 'NaN';
		}
		
		var lTotalQuizMinScore = 'NaN';
		if(this.m_CompletionBranchMinQuizScoreSet)
			lTotalQuizMinScore = this.m_CompletionBranchMinQuizScore ;
		else
			lTotalQuizMinScore = this.countQuizMinScore(this.m_CompletionBranch);		
		
		return lTotalQuizMinScore;
	}
		
	/* Calculate Quiz Score percentage */
	cp.QuizSlideGraphManager.prototype.getQuizScorePercentage = function()
	{
		if( ( ! this.m_CompletionBranchSet ) && ( ! this.m_CompletionBranchMaxQuizScoreSet  ) )
		{
			this.findCompletionBranch();
		}
		
		if( ( ! this.m_CompletionBranchSet ) && ( ! this.m_CompletionBranchMaxQuizScoreSet  ) )
		{
			return 'NaN';
		}
		
		var lCurrentQuizScore = this.countQuizScore(this.m_CurrentBranch);
		
		var lTotalQuizMaxScore = -1;
		if(this.m_CompletionBranchSlideCountSet)
			lTotalQuizMaxScore = this.m_CompletionBranchSlideCount ;
		else
			lTotalQuizMaxScore = this.countQuizMaxScore(this.m_CompletionBranch);
		
		if( lTotalQuizMaxScore <= 0 )
		{
			return 'NaN'; 
		}
		
		return lCurrentQuizScore*100/lTotalQuizMaxScore;
	}
		
	/* First Slide to Jump to after second attempt */
	cp.QuizSlideGraphManager.prototype.getNextAttemptFirstQuestionSlideIndex = function()
	{
		return this.findFirstNonPretestQuestionSlide();
	}
		
	/* First Slide to Jump to after review is clicked */
	cp.QuizSlideGraphManager.prototype.getReviewFirstQuestionSlideIndex = function()
	{
		return this.findFirstNonPretestQuestionSlide();
	}
	
	/* calcuates num of questions in a branch. Returns NaN if not able to find definitive branch*/
	cp.QuizSlideGraphManager.prototype.getNumQuestions = function()
	{
		if( ( ! this.m_CompletionBranchSet ) && ( ! this.m_CompletionBranchMaxQuizScoreSet  ) )
		{
			this.findCompletionBranch();
		}
		
		if( ( ! this.m_CompletionBranchSet ) && ( ! this.m_CompletionBranchMaxQuizScoreSet  ) )
		{
			return 'NaN';
		}
		
		return this.countQuizSlides(this.m_CompletionBranch);
	}
		
	/* return  Progress Number for QuestionSlide */
	cp.QuizSlideGraphManager.prototype.getQuestionSlideProgressNumber = function(aQSlideIndex)
	{
		if(this.m_SlideNumToQuestionNumMap && (this.m_SlideNumToQuestionNumMap[aQSlideIndex] != undefined) )
			return this.m_SlideNumToQuestionNumMap[aQSlideIndex];			
		return 'NaN';
	}
	
	/* Set Progress Number for Question Slide */
	cp.QuizSlideGraphManager.prototype.setQuestionSlideProgressNumber =function(aQSlideIndex)
	{
		if(!this.m_SlideNumToQuestionNumMap)
			this.m_SlideNumToQuestionNumMap = {};
			
		if( this.m_SlideNumToQuestionNumMap[aQSlideIndex] == undefined )
			this.m_SlideNumToQuestionNumMap[ aQSlideIndex ] = ++this.m_progressNumber;
	}
		
	/*Find last Question Slide in Branch*/
	cp.QuizSlideGraphManager.prototype.getLastQuestionSlideIndex = function()
	{
		var lPlaybackController = this.getPlaybackController();
		if(!lPlaybackController)
			return -1;
			
		if(!this.m_CompletionBranchSet)
			this.findCompletionBranch();
		
		//Second Attempt
		if(!this.m_CompletionBranchSet)
			return -1;
		
		var lLastQuizSlideIndex = -1;
		var lSlideCount = this.m_CompletionBranch.length;
		for( var slideIter = 0 ; slideIter < lSlideCount ; ++slideIter )
		{
			var lSlideIndex = this.m_CompletionBranch[slideIter];
			if( this.IsNonPretestQuestionSlide(lSlideIndex) && (lSlideIndex > lLastQuizSlideIndex))
				lLastQuizSlideIndex = lSlideIndex;
		}
		return lLastQuizSlideIndex;
	}
		
	cp.QuizSlideGraphManager.prototype.resetCurrentBranch = function(aSlideIndex)
	{
		if(aSlideIndex < 0)
			return;
		
		var lSlideIndexInBranch = -1;
		for(var lIndex = 0; lIndex < this.m_CurrentBranch.length; ++lIndex)
		{
			if(this.m_CurrentBranch[lIndex] == aSlideIndex)
			{
				lSlideIndexInBranch = aSlideIndex;
				break;
			}
		}
		
		if((lSlideIndexInBranch >=0) && ((lSlideIndexInBranch+1) < this.m_CurrentBranch.length))
			this.m_CurrentBranch.splice(lSlideIndexInBranch+1);
		
		//update the progress Number also
		var lSlideNumToQuestionNumMap = {};
		var lProgressNumber = 0;
		for(var lIndex = 0; lIndex < this.m_CurrentBranch.length; ++lIndex)
		{
			var lSlideNumber = this.m_CurrentBranch[lIndex];
			if( this.m_SlideNumToQuestionNumMap.hasOwnProperty(lSlideNumber) )
			{
				lSlideNumToQuestionNumMap[lSlideNumber] = this.m_SlideNumToQuestionNumMap[ lSlideNumber ];
				if(lProgressNumber < this.m_SlideNumToQuestionNumMap[ lSlideNumber ])
					lProgressNumber = this.m_SlideNumToQuestionNumMap[ lSlideNumber ];
			}
		}
		this.m_SlideNumToQuestionNumMap	 = lSlideNumToQuestionNumMap;
		this.m_progressNumber = lProgressNumber;	
			
		this.m_CompletionBranchMaxQuizScore = 0;
		this.m_CompletionBranchMinQuizScore = 0;
		this.m_CompletionBranchMaxQuizScoreSet = false;
		this.m_CompletionBranchMinQuizScoreSet = false;
		this.findCompletionBranch();
	}
	
	cp.QuizSlideGraphManager.prototype.findLastContinousBranchFromHistory = function(aFromIndex,aToIndex)
	{
		var lRetVal = [];
		
		for(var j = this.m_BranchHistory.length-1;j>=0;--j)
		{
			lRetVal = [];
			if(this.m_BranchHistory[j] == aFromIndex)
			{
				var lastOccurence = j;
				var newBranchEnd = -1;
				var validGraph = true;
				
				for(var k = lastOccurence;k<this.m_BranchHistory.length;++k){
					lRetVal.push(this.m_BranchHistory[k]);
					if( this.m_BranchHistory[k] == aToIndex ){
						newBranchEnd = k;
						break;
					}
					if( k == (this.m_BranchHistory.length-1) ){ continue; }
					
					if(!this.getIsJumpValid(this.m_BranchHistory[k],this.m_BranchHistory[k+1])){
						validGraph = false;
						break;
					}
				}
				
				if( (newBranchEnd !=-1) && validGraph ){
					return lRetVal;
				}
				
			}
		}
		lRetVal = [];
		return lRetVal;
	}
		
	cp.QuizSlideGraphManager.prototype.updateCurrentBranch = function(aDestinationSlideIndex)
	{
		if(aDestinationSlideIndex < 0)
			return;
		//Need to take care the case where aDestinationSlideIndex is present multiple times in branch. In that case how to update the branch
		var lPlaybackController = this.getPlaybackController();
		if(!lPlaybackController)
			return;
		//Don't update in Review Mode
		var lQuizController = lPlaybackController.GetQuizController();
		if(  !lQuizController  && lQuizController.GetIsInReviewMode() )
			return;
		
		//Now removing all the slide index in the current branch after the destination slides.
		var lCurrentBranchLength = this.m_CurrentBranch.length;
		var lDestSlideIndexInCurrentBranch = -1;
		for(var i = 0; i< this.m_CurrentBranch.length; ++i)
		{
			if(this.m_CurrentBranch[i] == aDestinationSlideIndex)
			{
				lDestSlideIndexInCurrentBranch = i;
				break;
			}
		}
		
		if((lDestSlideIndexInCurrentBranch != -1) && ((lDestSlideIndexInCurrentBranch+1) < lCurrentBranchLength))
		{
			this.m_CurrentBranch.splice(lDestSlideIndexInCurrentBranch+1);
			//update the progress Number also
			var lSlideNumToQuestionNumMap = {};
			var lProgressNumber = 0;
			for(var lIndex = 0; lIndex < this.m_CurrentBranch.length; ++lIndex)
			{
				var lSlideNumber = this.m_CurrentBranch[lIndex];
				if( this.m_SlideNumToQuestionNumMap.hasOwnProperty(lSlideNumber) )
				{
					lSlideNumToQuestionNumMap[lSlideNumber] = this.m_SlideNumToQuestionNumMap[ lSlideNumber ];
					if(lProgressNumber < this.m_SlideNumToQuestionNumMap[ lSlideNumber ])
						lProgressNumber = this.m_SlideNumToQuestionNumMap[ lSlideNumber ];
				}
			}
			this.m_SlideNumToQuestionNumMap	 = lSlideNumToQuestionNumMap;
			this.m_progressNumber = lProgressNumber;		
		}
		else
		{
			// We are trying to reset to a slide which was not present in current branch
			// So we try to regain the branch from Branch history				
			// towards this aim we try to find out the last time the current branch head was used in branch history				
			if( (this.m_CurrentBranch.length > 0 ) && ( lDestSlideIndexInCurrentBranch == -1))
			{ 	
				// Current Branch Exist				
				// Step 1 . Find the branch head position in current branch					
				var branchHead = this.m_CurrentBranch[this.m_CurrentBranch.length-1];					
				// Step 2 . Find last occurence in branch history					
				var branch = this.findLastContinousBranchFromHistory(branchHead,aDestinationSlideIndex);
				for(var l = 0;l<branch.length;++l)
				{
					this.m_CurrentBranch.push(branch[l]);
					this.m_BranchHistory.push(branch[l]);
					
					if(!lQuizController) { continue; }
					
					var lSlideType = lQuizController.GetSlideType(branch[l]);						
					if( "Question" == lSlideType )
						this.setQuestionSlideProgressNumber(branch[l]);
				}
			}
		}	
		
		
		//Now Update Completion branch
		this.m_CompletionBranchMaxQuizScore = 0;
		this.m_CompletionBranchMinQuizScore = 0;
		this.m_CompletionBranchMaxQuizScoreSet = false;
		this.m_CompletionBranchMinQuizScoreSet = false;
		this.findCompletionBranch();
	}
}

cp.QuizLibraryInit = function()
{
	cp.movie.playbackController = new cp.PlaybackController();
	cp.movie.playbackController.InitializeReportingVariables();
	cp.movie.playbackController.InitializePlaybackController();
	cp.movie.registerQuizVariableSetters();
	cp.movie.stage.createQuestionObjs();
	cp.movie.playbackController.AddQuestionSlideNames();
	cp.movie.playbackController.InitializeGraphManager();
	cp.movie.initLMS();	
}

/*
	In AICC the result can be the following strings: correct, wrong, unanticipated, neutral
	In SCORM the possible values can be: correct, incorrect, unanticipated, neutral
	
	Map these to the corresponding constants in the RUSTICI SCORM driver
	"incorrect" in SCORM is mapped to the contant INTERACTION_RESULT_WRONG
*/
function ConvertToInteractionResultConstant(token_str)
{
	var c = token_str.toLowerCase();
	var interactionResult;
	switch(c)
	{
		case "correct": 
			interactionResult = LMSDriverHolder.INTERACTION_RESULT_CORRECT;
			break;
			
		case "wrong": 
			interactionResult = LMSDriverHolder.INTERACTION_RESULT_WRONG;
			break;
		
		case "unanticipated": 
			interactionResult = LMSDriverHolder.INTERACTION_RESULT_UNANTICIPATED;
			break;
		
		case "neutral": 
			interactionResult = LMSDriverHolder.INTERACTION_RESULT_NEUTRAL;
			break;
		
		case "incorrect": 
			interactionResult = LMSDriverHolder.INTERACTION_RESULT_WRONG;
			break;
		
		default:
			if(cp.verbose)
				cp.log("Could not find appropriate token for interaction result! -" + token_str);
			break;	
	}
	
	return interactionResult;
}