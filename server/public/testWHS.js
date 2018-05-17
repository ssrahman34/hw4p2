// Global; will be replaced by a call to the server! 
var photos=[];
var photoURLArray = 
[
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/A%20Torre%20Manuelina.jpg"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Uluru%20sunset1141.jpg" },
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Sejong tomb 1.jpg"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Serra%20da%20Capivara%20-%20Painting%207.JPG"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Royal%20Palace%2c%20Rabat.jpg"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Red%20pencil%20urchin%20-%20Papahnaumokukea.jpg"}
 ];

console.log("In testWHS.js...");



// Function to send AJAX request to server
function sendRequest() {
    console.log("Entered sendRequest...");
    var num = document.getElementById("num").value;
    var input = document.getElementById("num").value;
    var numList = input.split(",");
    var num = numList[0];
    
    console.log("Requested " + num);

    if (Number(num) > 990 || Number(num) < 1 || isNaN(Number(num))) {
	console.log("Invalid input! Please try again.");
    }

    else {
	var oReq = new XMLHttpRequest();
	//var url = "query?num=" + num;

	// Build url
	console.log("Building URL!");

	var url = "query?num=";
	for (i = 0; i < numList.length; i++) {
	    if (i == numList.length - 1)
		url = url + numList[i];
	    
	    else url = url + numList[i] + "+";
	}
	
	oReq.open("GET", url);
	console.log("Opened oReq...");
	
	// load --> when data is returned
	oReq.addEventListener("load", handleResponse2);
	// oReq.addEventListener("load", handleResponseMultiple);
	console.log("Added handleResponse listener...");
	oReq.send();
	console.log("Sent oReq...");
    }

    // Callback function to display photo (db version)
    function handleResponse2() {
	console.log("Entered handleResponse2: " + oReq.responseText);

	var requestedRecords = oReq.responseText;
	var recordsObj = JSON.parse(requestedRecords); 
	var zeroIndex = "0";
	
	var startOfURL = "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/";
	var photoName = recordsObj["0"]["fileName"];
	console.log("Photoname: " + photoName);
	
	var photoURL =  encodeURI(startOfURL + photoName);

	console.log("Filename: " + photoName);
	console.log("Final url: " + photoURL);
	var display = document.getElementById("photoImg");
	display.src = photoURL;	

	// Print all photo names requested
	console.log("End of Part 4: Printing all fileNames of photos requested...");
	var len = Object.keys(recordsObj).length;
	var URL="http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/"
	//This will be the object that has each photos fileName, width and height
	for (i = 0; i < len; i++) {
	    var photoRow = new Object();
	    var iStr = i.toString();
	    photoRow.src = encodeURI(URL+recordsObj[iStr]["fileName"]);
	    photoRow.width = recordsObj[iStr]["width"];
	    photoRow.height = recordsObj[iStr]["height"];
	    photos.push(photoRow);	    
	    console.log(i + ": " + photoName); 
	}
	for (var i = 0; i < photos.length; i++){
		console.log(photos[i]);
	}

    }
    
    // Callback function to display name of photo corresponding to number requested by browser
    // function handleResponse() {
    // 	console.log("Entered handleResponse!");
    // 	console.log("Entering handleResponse. This is the value of responseText: " + oReq.responseText);

    // 	if (oReq.status >= 400) {
    // 	    console.log("The requested input is not valid! Please try again.");
    // 	}

    // 	var startOfURL = "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/";
    // 	var photoName = oReq.responseText;
    // 	var photoURL =  startOfURL + photoName;

    // 	console.log("Final url: " + photoURL);
    // 	var display = document.getElementById("photoImg");
    // 	display.src = photoURL;
    // }
}



// function sendRequest2() {
//     // Parse numList by comma

//     // For each num,
//     // check if w/in bounds
//     // based on # have server retrieve fileName, width, height from db
//     // push each to dictList
// }


// Called when the user pushes the "submit" button 
function photoByNumber() {
    //sendRequest();
    var num = document.getElementById("num").value;
    num = num.trim();
    var photoNum = Number(num);
    if (photoNum != NaN) {
	var photoURL = photoURLArray[photoNum].url;
	var display = document.getElementById("photoImg");
	display.src = photoURL;
    }
}



