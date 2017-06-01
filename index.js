// use graceful-fs just like fs 
const fs = require('graceful-fs');
const lessonsFolder = '../governance-content/';
const private = require('./private.js');
const re = /^\d+_\d/;
var lessonsList = [];
const urlPrefix = 'http://governance-staging.netlify.com/';
// ?actor=%7B"mbox"%3A"mailto%3Aamunoz%40governanceinstitute.com"%2C"name"%3A"amunoz"%2C"objectType"%3A"Agent"%7D&auth=Basic%20MzgtMmQwMWZlOTI2MzkzYWNmOjAxNDc5ZGZhMjcyYmFmMWE0YzM3NTQwMDA%3D&endpoint=https%3A%2F%2Flrs.scitent.us%2FxAPI%2F&registration=OHMYGLOB&activity_id=https%3A%2F%2Fgovernance.netlify.com%2F1_2_measuring_setting_quality_goals%2F
const urlSuffix = '?actor=%7B"mbox"%3A"mailto%3A'+encodeURIComponent(private.email)+'"%2C"name"%3A"'+private.userName+'"%2C"objectType"%3A"Agent"%7D&amp;auth='+encodeURIComponent(private.auth)+'&amp;endpoint=https%3A%2F%2Flrs.scitent.us%2FxAPI%2F&amp;registration=OHMYGLOB&amp;activity_id=https%3A%2F%2Fgovernance.netlify.com%2F';
const envName = 'Governance Content Staging';

// grab the dirs in /governance-content/
fs.readdirSync(lessonsFolder).forEach(file => {
	if(file.search(re) !== -1) {
		lessonsList.push(file);
	}
});

// sort them
lessonsList = lessonsList.sort(function compare(a,b){
	var beginDiff = valBegin(a) - valBegin(b);
	if( beginDiff !== 0 ) {
		return beginDiff;
	} else {
		return valMid(a) - valMid(b);
	}
});

// output them:
fs.writeFile("index.html", content(lessonsList, urlPrefix, urlSuffix, envName), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

/////// HELPERS:
function valBegin(str) {
	return parseInt(str.slice(0,str.indexOf('_')), 10);
}
function valMid(str) {
	var re2 = /_(\d+)_/;
	return parseInt(str.match(re2)[1],10);
}
function content(list,prefix,suffix,name) {
	var html = '<!DOCTYPE html><html><head><style>ul{list-style:none;height:80px;overflow:scroll;position:-webkit-sticky;position:sticky;top:0;}iframe{position:fixed;width:100%;height:600px;top:100px;}h1{position:absolute;left:30%;font-family:sans-serif;}</style></head><body><h1>'+name+'</h1><span id="s"></span><ul>';
	for (var i = 0; i < list.length; i++) {
		var url = prefix+list[i]+suffix+list[i]+'%2F';
		html += '<li><a href=\''+url+'\' target="f">'+list[i]+'</a></li>';
	}
	html += '</ul><iframe name="f"></iframe></body></html>';
	return html;
}