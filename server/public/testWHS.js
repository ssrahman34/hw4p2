// Global; will be replaced by a call to the server! 
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
    console.log("Requested " + num);

    if (Number(num) > 990 || Number(num) < 1 || isNaN(Number(num))) {
	console.log("Invalid input! Please try again.");
    }

    else {
	var oReq = new XMLHttpRequest();
	var url = "query?num=" + num;
	oReq.open("GET", url);
	console.log("Opened oReq...");
	
	// load --> when data is returned
	oReq.addEventListener("load", handleResponse);
	console.log("Added handleResponse listener...");
	oReq.send();
	console.log("Sent oReq...");
    }
    
    // // Callback function to display name of photo corresponding to number requested by browser
    function handleResponse() {
	console.log("Entered handleResponse!");
	console.log("Entering handleResponse. This is the value of responseText: " + oReq.responseText);

	if (oReq.status >= 400) {
	    console.log("The requested input is not valid! Please try again.");
	}

	var startOfURL = "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/";
	var photoName = oReq.responseText;
	var photoURL =  startOfURL + photoName;

	console.log("Final url: " + photoURL);
	var display = document.getElementById("photoImg");
	display.src = photoURL;
    }
}

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



