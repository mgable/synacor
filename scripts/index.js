/* business logic */
/* globals getData */

(function(){
	"use strict";
	var locationURL = "https://weathersync.herokuapp.com/ip";
	var weatherURL = "https://weathersync.herokuapp.com/weather/${lat},${lng}";
	var iconUrl = "http://openweathermap.org/img/w/${icon}.png";
	var latRE = "\\\$\\\{lat\\\}";
	var lngRE = "\\\$\\\{lng\\\}";
	var iconRE = "\\\$\\\{icon\\\}";

	// page items
	var city, temp, description, icon,
		$ = function(el){return document.getElementById(el);};

	getData(locationURL).then(_processLocation,_error);

	function _processLocation(response){
		city = response.city;
		addToPage("city", city);
		getData(makeWeatherUrl(response)).then(_processWeather, _error);
	}

	function _processWeather(response){
		temp = kToF(response.main.temp);
		addToPage("temp", temp);

		description = response.weather[0].description;
		addToPage("description", description);

		icon = response.weather[0].icon;
		addImage("icon", replace(iconUrl, iconRE, icon));

		display();
	}

	function _error(){
		throw new Error("Error reading data");
	}

	function makeWeatherUrl(locationObj){
		var lat = locationObj.location.latitude,
			lng = locationObj.location.longitude,
			url = "";

		url = replace(weatherURL, latRE, lat);
		url = replace(url, lngRE, lng);

		return url;
	}

	function replace(str, token, value){
		var re = new RegExp(token);
		return str.replace(re, value);
	}

	function kToF(tempInK){
		return Math.round(tempInK * (9/5) - 459.67);
	}

	function addToPage(id, text){
		var element = $(id);
		element.innerHTML = text;
	}

	function addImage(id, imageUrl){
		var element = $(id);
		element.src = imageUrl;
	}

	function display(){
		var spinner = $("spinner"),
			contents = $("contents");

		hide(spinner);
		show(contents);
	}

	function show(element){
		element.setAttribute("class", ['show']);
	}

	function hide(element){
		element.setAttribute("class", ['hide']);
	}
})();