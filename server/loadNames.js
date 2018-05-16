var url = require('url');
var http = require('http');
//var sizeOf = require('image-size');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./PhotoQ.db');
imgList=[];

readJson();
function readJson(){
var fs = require('fs');
loadImageList();
function loadImageList () {
	var data = fs.readFileSync('6whs.json');
		if (! data) {
	    		console.log("cannot read the .json");
		} else {
				listObj = JSON.parse(data);
				imgList = listObj.photoURLs;
				console.log(imgList[0], imgList[1]);
		}
		for (var i = 1; i < imgList.length; i++){
		console.log(imgList[i]);
		//var cmdStr="INSERT INTO photoTags VALUES(i, 'Dtring', 0,0,'','')"
		fillDB(imgList[i]);
		}
		function fillDB(url){
		urlList = url.split('/');
		console.log(urlList[urlList.length -1]);				
		}
//		var cmdStr="INSERT INTO photoTags VALUES(10, 'Dtring', 0,0,'','')"
//		db.run(cmdStr, dbCallback); 
//		function dbCallback(err) {
//		   if (err) { console.log(err); }
//		   else{
//			console.log("Inserted"); 
//		}  
//	}
}//loadIMG
}//read
/*function dumpDB() {
	console.log("in dump");
	db.all ( 'SELECT * FROM photoTags', dataCallback);
		function dataCallback( err, data ) {
		  console.log(data) 
		} } */
