$(document).ready(function(){
	console.log("Demo Page Loaded");
	getApiToken();
});

function getApiToken(){
	$.getJSON("/getapitoken", function(json){
		console.log("result: " + json);
		var expireDate = json.expire_date;
		console.log("expireDate: " + expireDate );
		var token = json.token;
		console.log("token: " + token );
		displayAuthInfo(token, expireDate);
	  });
}

function displayAuthInfo(sToken, sExpires){
	$("#apiToken").text(sToken);
	$("#apiExpires").text(sExpires);
	
}
