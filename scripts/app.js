/* jshint unused:false */ 
/* revealing module pattern causes js lint issues */

/* application logic */

// revealing module pattern
var getData = (function(){
	/*jshint validthis: true */
	"use strict";

	function xhrSuccess () { this.successCallback.call(this, JSON.parse(this.responseText)); }

	function xhrError () { this.errorCallback.call(this.statusText); }

	function loadFile (URL, resolve, reject) {
	  var oReq = new XMLHttpRequest();
	  oReq.successCallback = resolve;
	  oReq.errorCallback = reject;
	  oReq.onload = xhrSuccess;
	  oReq.onerror = xhrError;
	  oReq.open("get", URL, true);
	  oReq.send();
	}

	// make it a true asyncronous function
	function getData(url){
		// using the new ES6 Promise API
		return new Promise(function(resolve, reject){
			loadFile (url, resolve, reject);
		});
	}

	return getData;
}());