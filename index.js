// use graceful-fs just like fs 
const fs = require('graceful-fs');
const lessonsFolder = '../governance-content/';
const re = /^\d+_\d/;
var lessonsList = [];
const urlPrefix = 'http://governance-staging.netlify.com/';
const envName = 'Governance Staging';

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
fs.writeFile("index.html", content(lessonsList, urlPrefix, envName), function(err) {
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
function content(list,prefix,name) {
	var html = '<!DOCTYPE html><html><head><style>ul{list-style:none;height:80px;overflow:scroll;position:-webkit-sticky;position:sticky;top:0;}iframe{position:fixed;width:100%;height:600px;top:100px;}h1{position:absolute;left:40%;font-family:sans-serif;}</style></head><body><h1>'+name+'</h1><ul>';
	for (var i = 0; i < list.length; i++) {
		html += '<li><a href="'+prefix+list[i]+'" target="f">'+list[i]+'</a></li>';
	}
	html += '</ul><iframe name="f"></iframe></body></html>';
	return html;
}