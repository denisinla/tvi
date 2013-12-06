<!--
function preloadImages() { //v3.0
	var d=document; 
	if(d.images){ 
		if(!d.p) d.p=new Array();
	    var i,j=d.p.length,a=preloadImages.arguments; 
		for(i=0; i<a.length; i++)
		{
	   		if (String(a[i]).indexOf("#")!=0){
				d.p[j]=new Image; 
				d.p[j++].src=a[i];
			}
	    }
	}
}

function swapImgRestore() { //v3.0
	var i,x,a=document.sr;
	for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function findObj(n, d) { //v4.01
	var p,i,x;
	if(!d) d=document;
	if((p=n.indexOf("?"))>0&&parent.frames.length) {
    	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
	}
	if(!(x=d[n])&&d.all) x=d.all[n];
	for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document);
  	if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function swapImage() { //v3.0
	document.sImg = null;
	var i,j=0,x,a=swapImage.arguments;
	document.sr=new Array();
	for(i=0;i<(a.length-2);i+=3)
   	if ((x=findObj(a[i]))!=null){
		document.sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];
	}
 }
//-->
<!--

// default values
var x = 0, y = 0; 
var remoteWindow;

function popWin(theURL,winName,w,h,features,winOffset) {

		if(typeof(winOffset) != "undefined"){
			x=y=winOffset;
		}else{
			x=y=20;
		}
		// if WinIE	
		/*
		if(remoteWindow && window.print){
			
			//remoteWindow.resizeTo(w,h);
			//remoteWindow.moveTo(x,y)
			if(remoteWindow.name == winName){
				alert('closing');
				remoteWindow.close();
			}
		}
		*/
	
 		remoteWindow = window.open(theURL,winName,'width='+w+',height='+h+','+ features +',top='+y+',screenY='+y+',left='+x+',screenX='+x);
		//if (remoteWindow.opener == null) remoteWindow.opener = self;
		remoteWindow.focus();
}

function popWinCentered(theURL,winName,w,h,features) {
		// get the width of the display
		var screen_width=window.screen.width 
		var screen_height=window.screen.height 

		// determine the requested placement
		var x = Math.round((screen_width-w)/2) 
		var y = Math.round((screen_height-h)/2) 

		if(remoteWindows[winName]){
			remoteWindows[winName].close();
		}
 		remoteWindows[winName] = window.open(theURL,winName,features + ",width="+w+",height="+h+',top='+y+',screenY='+y+',left='+x+',screenX='+x);
		if (remoteWindows[winName].opener == null) remoteWindows[winName].opener = self;
		remoteWindows[winName].focus();
}

function getResized(target){
	if(target== null){
		target = this;
	}else{
		target = eval('parent.'+target);
	}
	if (document.all) {
		x = target.screenLeft;
		y = target.screenTop;
	} else if (document.layers) {
		x = target.screenX;
		y = target.screenY;
	}
}

function getCentered(w,h){
	// get the width of the display
	screen_width=window.screen.width 
	screen_height=window.screen.height 

	// determine the requested placement
	x = Math.round((screen_width-w)/2) 
	y = Math.round((screen_height-h)/2)
}

/* call-links */
function launchCallLinkWindow(clID){
	popWin('/CallLinks/?id=' + clID,'callLinkWin',340,500,'scrollbars=1,resizable=1,status=1');
}
//-->

<!-- 
function launchFileManager(nameCtl, idCtl){
	popWin('/FileManager/?nameCtl='+nameCtl+'&idCtl='+idCtl+'','fileWin',460,580,'scrollbars=1,resizeable=0,status=1');
}
function removeFileReference(nameCtl, idCtl){
	var d = document.forms[0];
	d[nameCtl].value = "None";
	d[idCtl].value = 0;
	alert("The file reference has been removed.\r\rBe sure to click \"Update\" to save any changes.");
}
function notifyReadOnly(){
	alert("This field is protected.\r\rTo modify, click the Edit or Remove buttons.");
}
//-->
<!--
/* global vars*/
var helpURL = "http://help.thevoiceinternet.com";
/**** general functions ****/
function _init(){
	/* call any preload image functions throughout the template */
	if(typeof window.preloadGlobalImages == "function" ) window.preloadGlobalImages();
	if(typeof window.preloadHeaderImages == "function" ) window.preloadHeaderImages();
	if(typeof window.preloadContextImages == "function" ) window.preloadContextImages();
	if(typeof window.preloadFooterImages == "function" ) window.preloadFooterImages();
	if(typeof window.preloadPopUpImages == "function" ) window.preloadPopUpImages();

	/* call any specified onLoadExtras methods within the core page */
	if(typeof window.onLoadExtras == "function" ) window.onLoadExtras();

	// focus the first textfield/textarea if it exists
	try
	{
	    if(document.forms[0] != "undefined" && document.forms[0] != null){
    		var elements = document.forms[0].elements
		    for(var a=0; a<elements.length;a++){
    			if((elements[a].type == "text" || elements[a].type == "textarea" || elements[a].type == "password") && !elements[a].readOnly && !elements[a].disabled){
				    elements[a].focus()
				    break;
			    }
		    }
	    }
	}catch(err){}
}
function goBack(steps){
	// check optional steps arg
	if( !isNaN(parseFloat(steps)) ){
		// if a valid value was passed 
		// then go back that many steps
		history.go(-steps);
	}else{
		// default - go back 1
		history.go(-1);
	}
}
function goTo(url){
	window.location = url;
}
function goTo_frompopup(url){
	var ow = window.opener;
	if(ow == null || typeof ow == "undefined" || ow.closed){
		// (nonIE, IE, IE)
		// HAD or NO opener
		var nw = window.open(url);
		nw.focus();
	}else{
		// HAS opener
		ow.location.href=url;
		ow.focus();
	}
}
function SetAllCheckboxes(bool)
{
	var e = document.forms[0];
	// loop through the element and select/deselect the boxes
	for (var n=0; n < e.length; n++){
		if (e.elements[n].type=='checkbox'){
			e.elements[n].checked=bool;
		}
	}
	return false;
}
function getQueryString(){
	var q = window.location.search
	q = q.substring(1, q.length);
	return q;
}
function getQSArgs() {
	var args = new Object();
	var query = location.search.substring(1);
	var pairs = query.split("&");
	for (var i = 0; i < pairs.length; i++){
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	};
	return args;
};


/**** help functions ****/
function show_help(id)
{
    var url = '/help/GetArticle.ashx?ID=' + id;
    $.ajax({
        type: "GET", //POST
        url: url, //Set call to Page Method
        data: null, // Set Method Params
        success: function(msg, status) {
            overlib(msg,CAPTION,'HELP',WIDTH,350, BGCLASS, 'ol_bg', FGCLASS, 'ol_fg', CELLPAD, 5, 10);
            },
        error: function(xhr,msg,e){
            overlib('Error retrieving Help information',CAPTION,'HELP',WIDTH,300, BGCLASS, 'ol_bg', FGCLASS, 'ol_fg', CELLPAD, 5, 10);
            }
        });
}
function registerForHelp(ev, articleid)
{
    // register the calling element for help mouse events
    ev.onmouseover = function(){show_help(articleid);}
    ev.onmouseout = function(){return nd();}
    // forward the initial call
    show_help(articleid);
}

function getHelp(topicID, windowType){
	if(typeof topicID == 'undefined'){topicID = 0;}
	if(typeof helpType == 'undefined'){helpType = HH_HELP_CONTEXT;}
	if(typeof windowType == 'undefined'){windowType = "Main";}
	// Check the browser...we're looking for ie/win, but not aol
	var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;    // true if we're on ie
	var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false; // true if we're on windows
	var strPathAndWindow;

	/* deliver only WebHelp for now
	 * other help formats do not contribute to reporting
	 */
	strPathAndWindow = helpURL + "/roboapi.asp>" + windowType;

	RH_ShowHelp(0, strPathAndWindow, helpType, topicID)
}
function getTutorial(topicID){
	var tutURL = helpURL + "/tutorials/?id=" + topicID;
	popWin(tutURL, 'tutorialWin', 740, 525, 'status=1');
}
//-->
// Macromedia
// Copyright� 1998-2004 eHelp� Corporation.All rights reserved.
// RoboHelp_CSH.js
// The Helper function for WebHelp Context Sensitive Help

//     Syntax:
//     function RH_ShowHelp(hParent, a_pszHelpFile, uCommand, dwData)
//
//     hParent
//          Reserved - Use 0
//   
//     pszHelpFile
//          WebHelp: 
//               Path to help system start page ("http://www.myurl.com/help/help.htm" or "/help/help.htm")
//               For custom windows (defined in Help project), add ">" followed by the window name ("/help/help.htm>mywin")
//
//          WebHelp Enterprise: 
//               Path to RoboEngine server ("http://RoboEngine/roboapi.asp")
//               If automatic merging is turned off in RoboEngine Configuration Manager, specify the project name in the URL ("http://RoboEngine/roboapi.asp?project=myproject")
//               For custom windows (defined in Help project), add ">" followed by the window name ("http://RoboEngine/roboapi.asp>mywindow")
//
//     uCommand
//          Command to display help. One of the following:
//                    HH_HELP_CONTEXT     // Displays the topic associated with the Map ID sent in dwData
//											if 0, then default topic is displayed.				
//               The following display the default topic and the Search, Index, or TOC pane. 
//               Note: The pane displayed in WebHelp Enterprise will always be the window's default pane.
//                    HH_DISPLAY_SEARCH 
//                    HH_DISPLAY_INDEX
//                    HH_DISPLAY_TOC
//
//     dwData
//          Map ID associated with the topic to open (if using HH_HELP_CONTEXT), otherwise 0
//
//     Examples:
//     <p>Click for <A HREF='javascript:RH_ShowHelp(0, "help/help.htm", 0, 10)'>Help</A> (map number 10)</p>
//     <p>Click for <A HREF='javascript:RH_ShowHelp(0, "help/help.htm>mywindow", 0, 100)'>Help in custom window (map number 100)</A></p>


var gbNav6=false;
var gbNav61=false;
var gbNav4=false;
var gbIE4=false;
var gbIE=false;
var gbIE5=false;
var gbIE55=false;

var gAgent=navigator.userAgent.toLowerCase();
var gbMac=(gAgent.indexOf("mac")!=-1);
var gbSunOS=(gAgent.indexOf("sunos")!=-1);
var gbOpera=(gAgent.indexOf("opera")!=-1);

var HH_DISPLAY_TOPIC = 0;
var HH_DISPLAY_TOC = 1;
var HH_DISPLAY_INDEX = 2;
var HH_DISPLAY_SEARCH = 3;
var HH_HELP_CONTEXT = 15;

var gVersion=navigator.appVersion.toLowerCase();

var gnVerMajor=parseInt(gVersion);
var gnVerMinor=parseFloat(gVersion);

gbIE=(navigator.appName.indexOf("Microsoft")!=-1);
if(gnVerMajor>=4)
{
	if(navigator.appName=="Netscape")
	{
		gbNav4=true;
		if(gnVerMajor>=5)
			gbNav6=true;
	}
	gbIE4=(navigator.appName.indexOf("Microsoft")!=-1);
}
if(gbNav6)
{
	document.gnPageWidth=innerWidth;
	document.gnPageHeight=innerHeight;
	var nPos=gAgent.indexOf("netscape");
	if(nPos!=-1)
	{
		var nVersion=parseFloat(gAgent.substring(nPos+10));
		if(nVersion>=6.1)
			gbNav61=true;
	}
}else if(gbIE4)
{
	var nPos=gAgent.indexOf("msie");
	if(nPos!=-1)
	{
		var nVersion=parseFloat(gAgent.substring(nPos+5));
		if(nVersion>=5)
			gbIE5=true;
		if(nVersion>=5.5)
			gbIE55=true;
	}
}

function RH_ShowHelp(hParent, a_pszHelpFile, uCommand, dwData)
{
	// this function only support WebHelp
	var strHelpPath = a_pszHelpFile;
	var strWnd = "";
	var nPos = a_pszHelpFile.indexOf(">");
	if (nPos != -1)
	{
		strHelpPath = a_pszHelpFile.substring(0, nPos);
		strWnd = a_pszHelpFile.substring(nPos+1); 
	}
	if (isServerBased(strHelpPath))
		RH_ShowWebHelp_Server(hParent, strHelpPath, strWnd, uCommand, dwData);
	else
		RH_ShowWebHelp(hParent, strHelpPath, strWnd, uCommand, dwData);
}

function RH_ShowWebHelp_Server(hParent, strHelpPath, strWnd, uCommand, dwData)
{
	// hParent never used.
	ShowWebHelp_Server(strHelpPath, strWnd, uCommand, dwData);
}

function RH_ShowWebHelp(hParent, strHelpPath, strWnd, uCommand, dwData)
{
	// hParent never used.
	ShowWebHelp(strHelpPath, strWnd, uCommand, dwData);
}


function ShowWebHelp_Server(strHelpPath, strWnd, uCommand, nMapId)
{
	var a_pszHelpFile = "";
	if (uCommand == HH_HELP_CONTEXT)
	{
		if (strHelpPath.indexOf("?") == -1)
			a_pszHelpFile = strHelpPath + "?ctxid=" + nMapId;
		else
			a_pszHelpFile = strHelpPath + "&ctxid=" + nMapId;
	}
	else
	{
		if (strHelpPath.indexOf("?") == -1)
			a_pszHelpFile = strHelpPath + "?ctxid=0";
		else
			a_pszHelpFile = strHelpPath + "&ctxid=0";
	}

	if (strWnd)
		a_pszHelpFile += ">" + strWnd;

	if (gbIE4)
	{
		a_pszHelpFile += "&cmd=newwnd&rtype=iefrm";
		loadData(a_pszHelpFile);
	}
	else if (gbNav4)
	{
		a_pszHelpFile += "&cmd=newwnd&rtype=nswnd";
		var sParam = "left="+screen.width+",top="+screen.height+",width=100,height=100";
		window.open(a_pszHelpFile, "__webCshStub", sParam);
	}
	else
	{
		var sParam = "left="+screen.width+",top="+screen.height+",width=100,height=100";
		if (gbIE5)
			window.open("about:blank", "__webCshStub", sParam);
		window.open(a_pszHelpFile, "__webCshStub");
	}
}


function ShowWebHelp(strHelpPath, strWnd, uCommand, nMapId)
{
	var a_pszHelpFile = "";
	if (uCommand == HH_DISPLAY_TOPIC)
	{
		a_pszHelpFile = strHelpPath + "#<id=0";
	}
	if (uCommand == HH_HELP_CONTEXT)
	{
		a_pszHelpFile = strHelpPath + "#<id=" + nMapId;
	}
	else if (uCommand == HH_DISPLAY_INDEX)
	{
		a_pszHelpFile = strHelpPath + "#<cmd=idx";
	}
	else if (uCommand == HH_DISPLAY_SEARCH)
	{
		a_pszHelpFile = strHelpPath + "#<cmd=fts";
	}
	else if (uCommand == HH_DISPLAY_TOC)
	{
		a_pszHelpFile = strHelpPath + "#<cmd=toc";
	}
	if (strWnd)
		a_pszHelpFile += ">>wnd=" + strWnd;

	if (a_pszHelpFile)
	{
		if (gbIE4)
			loadData(a_pszHelpFile);
		else if (gbNav4)
		{
			var sParam = "left="+screen.width+",top="+screen.height+",width=100,height=100";
			window.open(a_pszHelpFile, "__webCshStub", sParam);
		}
		else
		{
			var sParam = "left="+screen.width+",top="+screen.height+",width=100,height=100";
			if (gbIE5)
				window.open("about:blank", "__webCshStub", sParam);
			window.open(a_pszHelpFile, "__webCshStub");
		}
	}
}

function isServerBased(a_pszHelpFile)
{
	if (a_pszHelpFile.length > 0)
	{
		var nPos = a_pszHelpFile.lastIndexOf('.');
		if (nPos != -1 && a_pszHelpFile.length >= nPos + 4)
		{
			var sExt = a_pszHelpFile.substring(nPos, nPos + 4);
			if (sExt.toLowerCase() == ".htm")
			{
				return false;
			}
		}
	}
	return true;
}

function getElement(sID)
{
	if(document.getElementById)
		return document.getElementById(sID);
	else if(document.all)
		return document.all(sID);
	return null;
}

function loadData(sFileName)
{
	// loadData_OG IE hack
	/* hack around RoboHelps IE popup implementation 
	 * to prevent SSL pages from being marked unsecure after lauching a help request
	 * do to loading the popupmanager in to an iframe within a secure page
	 */
	//var tempParam = "left="+screen.width+",top="+screen.height+",width=100,height=100";
	//
	// normally offset, we need to show full size incase popup blocker is present
	var tempParam = "left=20,top=20,width=675,height=600";
	var hackWin = window.open(sFileName, "__webCshStub", tempParam);	
	
	/* 
	 * ensure that the following line of code is added to mr_wnd_mgr.js in each server
	 * to hack around RoboHelps IE window iplementation.
	 * insert in to mr_wnd_mgr.js [Execute method] line 180 for hack continuation 
	 */
	/* TVI hack - refer to RoboHelp_CSH.js line 242 */
	//window.close();
}

/* hacking around this method above */
function loadData_OG(sFileName){
	
	if(!getElement("dataDiv"))
	{
		if(!insertDataDiv())
		{
			gsFileName=sFileName;
			return;
		}
	}
	var sHTML="";
	if(gbMac)
		sHTML+="<iframe name=\"__WebHelpCshStub\" src=\""+sFileName+"\"></iframe>";
	else
		sHTML+="<iframe name=\"__WebHelpCshStub\" style=\"visibility:hidden;width:0;height:0\" src=\""+sFileName+"\"></iframe>";
		//sHTML+="<iframe name=\"__WebHelpCshStub\" style=\"width:100%;height:50px\" src=\""+sFileName+"\"></iframe>";
	
	var oDivCon=getElement("dataDiv");
	if(oDivCon)
	{
		if(gbNav6)
		{
			if(oDivCon.getElementsByTagName&&oDivCon.getElementsByTagName("iFrame").length>0)
			{
				oDivCon.getElementsByTagName("iFrame")[0].src=sFileName;
			}
			else
				oDivCon.innerHTML=sHTML;
		}
		else
			oDivCon.innerHTML=sHTML;
	}
}

function insertDataDiv()
{
	var sHTML="";
	if(gbMac)
		sHTML+="<div id=dataDiv style=\"display:none;\"></div>";
	else
		//alert("ms1")
		sHTML+="<div id=dataDiv style=\"visibility:hidden\"></div>";
		//sHTML+="<div id=dataDiv></div>";
		

	document.body.insertAdjacentHTML("beforeEnd",sHTML);
	return true;
};

if(typeof com=="undefined"){var com=new Object();}
if(typeof com.deconcept=="undefined"){com.deconcept=new Object();}
if(typeof com.deconcept.util=="undefined"){com.deconcept.util=new Object();}
if(typeof com.deconcept.FlashObjectUtil=="undefined"){com.deconcept.FlashObjectUtil=new Object();}
com.deconcept.FlashObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a,_b){
if(!document.createElement||!document.getElementById){return;}
this.DETECT_KEY=_b?_b:"detectflash";
this.skipDetect=com.deconcept.util.getRequestParameter(this.DETECT_KEY);
this.params=new Object();
this.variables=new Object();
this.attributes=new Array();
this.useExpressInstall=_7;
if(_1){this.setAttribute("swf",_1);}
if(id){this.setAttribute("id",id);}
if(w){this.setAttribute("width",w);}
if(h){this.setAttribute("height",h);}
if(_5){this.setAttribute("version",new com.deconcept.PlayerVersion(_5.toString().split(".")));}
this.installedVer=com.deconcept.FlashObjectUtil.getPlayerVersion(this.getAttribute("version"),_7);
if(c){this.addParam("bgcolor",c);}
var q=_8?_8:"high";
this.addParam("quality",q);
var _d=(_9)?_9:window.location;
this.setAttribute("xiRedirectUrl",_d);
this.setAttribute("redirectUrl","");
if(_a){this.setAttribute("redirectUrl",_a);}
};
com.deconcept.FlashObject.prototype={setAttribute:function(_e,_f){
this.attributes[_e]=_f;
},getAttribute:function(_10){
return this.attributes[_10];
},addParam:function(_11,_12){
this.params[_11]=_12;
},getParams:function(){
return this.params;
},addVariable:function(_13,_14){
this.variables[_13]=_14;
},getVariable:function(_15){
return this.variables[_15];
},getVariables:function(){
return this.variables;
},createParamTag:function(n,v){
var p=document.createElement("param");
p.setAttribute("name",n);
p.setAttribute("value",v);
return p;
},getVariablePairs:function(){
var _19=new Array();
var key;
var _1b=this.getVariables();
for(key in _1b){_19.push(key+"="+_1b[key]);}
return _19;
},getFlashHTML:function(){
var _1c="";
if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
if(this.getAttribute("doExpressInstall")){
this.addVariable("MMplayerType","PlugIn");
}
_1c="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";
_1c+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";
var _1d=this.getParams();
for(var key in _1d){_1c+=[key]+"=\""+_1d[key]+"\" ";}
var _1f=this.getVariablePairs().join("&");
if(_1f.length>0){_1c+="flashvars=\""+_1f+"\"";}
_1c+="/>";
}else{
if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");}
_1c="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\">";
_1c+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />\"";
var _20=this.getParams();
for(var key in _20){_1c+="<param name=\""+key+"\" value=\""+_20[key]+"\">";}
var _22=this.getVariablePairs().join("&");
if(_22.length>0){_1c+="<param name=\"flashvars\" value=\""+_22+"\">";}}
return _1c;
},write:function(_23){
if(this.useExpressInstall){
var _24=new com.deconcept.PlayerVersion([6,0,65]);
if(this.installedVer.versionIsValid(_24)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){
this.setAttribute("doExpressInstall",true);
this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));
document.title=document.title.slice(0,47)+" - Flash Player Installation";
this.addVariable("MMdoctitle",document.title);}
}else{this.setAttribute("doExpressInstall",false);}
if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){
var n=(typeof _23=="string")?document.getElementById(_23):_23;
n.innerHTML=this.getFlashHTML();
}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}}};
com.deconcept.FlashObjectUtil.getPlayerVersion=function(_26,_27){
var _28=new com.deconcept.PlayerVersion(0,0,0);
if(navigator.plugins&&navigator.mimeTypes.length){
var x=navigator.plugins["Shockwave Flash"];
if(x&&x.description){_28=new com.deconcept.PlayerVersion(x.description.replace(/([a-z]|[A-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}
}else{
try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
for(var i=3;axo!=null;i++){
axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
_28=new com.deconcept.PlayerVersion([i,0,0]);}}
catch(e){}
if(_26&&_28.major>_26.major){return _28;}
if(!_26||((_26.minor!=0||_26.rev!=0)&&_28.major==_26.major)||_28.major!=6||_27){
try{
_28=new com.deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
}catch(e){}}}
return _28;
};
com.deconcept.PlayerVersion=function(_2c){
this.major=parseInt(_2c[0])||0;
this.minor=parseInt(_2c[1])||0;
this.rev=parseInt(_2c[2])||0;
};
com.deconcept.PlayerVersion.prototype.versionIsValid=function(fv){
if(this.major<fv.major){return false;}
if(this.major>fv.major){return true;}
if(this.minor<fv.minor){return false;}
if(this.minor>fv.minor){return true;}
if(this.rev<fv.rev){return false;}
return true;
};
com.deconcept.util={getRequestParameter:function(_2e){
var q=document.location.search||document.location.href.hash;
if(q){var _30=q.indexOf(_2e+"=");
var _31=(q.indexOf("&",_30)>-1)?q.indexOf("&",_30):q.length;
if(q.length>1&&_30>-1){
return q.substring(q.indexOf("=",_30)+1,_31);}}return "";
},removeChildren:function(n){
while(n.hasChildNodes()){
n.removeChild(n.firstChild);}}};
if(Array.prototype.push==null){
Array.prototype.push=function(_33){
this[this.length]=_33;
return this.length;};}
var getQueryParamValue=com.deconcept.util.getRequestParameter;
var FlashObject=com.deconcept.FlashObject;


if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();