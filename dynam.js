
let mod = 1;
let qust = "";
let ans1 = "";
let ans2 = "";

let Dynamo = function() {
    let current, xhttp;
    const API_ENDPOINT = "https://5qu0u527q2.execute-api.ap-northeast-1.amazonaws.com/v1/";
   
    function response() {
        if (xhttp.readyState == 4 && xhttp.status == 200) { 
   
	let res = JSON.parse(xhttp.responseText);
	console.log(parseInt(res.no1));
	
           xhttp = new XMLHttpRequest();
	let rsp;
        if (mod == 1) {
        rsp = {"id": Math.max(parseInt(res.yes1)+parseInt(res.no1),parseInt(res.yes2)+parseInt(res.no2)),
                      "rsp1": ans1,
		      "rsp2": ans2
                      };
	if (ans1 == "Y") {
	document.getElementById("question").innerText = "you answered like "+parseInt(res.yes1)+" of "+Math.max(parseInt(res.yes1)+parseInt(res.no1),parseInt(res.yes2)+parseInt(res.no2));
	}
	else {
	document.getElementById("question").innerText = "you answered like"+parseInt(res.no1)+" of "+Math.max(parseInt(res.yes1)+parseInt(res.no1),parseInt(res.yes2)+parseInt(res.no2));
	}
        }
	else {
	if (ans1 != "") {
	rsp = {"id": Math.max(parseInt(res.yes1)+parseInt(res.no1),parseInt(res.yes2)+parseInt(res.no2))-1,
                      "rsp1": ans1,
		      "rsp2": ans2
                      };
	}else{
	rsp = {"id": Math.max(parseInt(res.yes1)+parseInt(res.no1),parseInt(res.yes2)+parseInt(res.no2)),
                      "rsp1": ans1,
		      "rsp2": ans2
                      };
	}
if (ans2 == "Y") {
	document.getElementById("question").innerText = "you answered like "+parseInt(res.yes2)+" of "+Math.max(parseInt(res.yes1)+parseInt(res.no1),parseInt(res.yes2)+parseInt(res.no2));
	}
	else {
	document.getElementById("question").innerText = "you answered like"+parseInt(res.no2)+" of "+Math.max(parseInt(res.yes1)+parseInt(res.no1),parseInt(res.yes2)+parseInt(res.no2));
	}
	}
	
        xhttp.open("POST", API_ENDPOINT, true);
      
        xhttp.setRequestHeader('Content-Type', 'application/json');

        xhttp.send(JSON.stringify(rsp));
        }
    }
        
	function clickListenery() {
		if (mod == 1) {
		ans1 = "Y";
		}
		else{
		ans2 = "Y";
		}
		
		xhttp = new XMLHttpRequest();
		let urlString = API_ENDPOINT;        
		
		xhttp.onreadystatechange = function() { response();}
		xhttp.open("GET", urlString , true);
		xhttp.send();
		document.getElementById("ys").style.display = "none";
		document.getElementById("no").style.display = "none";
		}
		
		function clickListenern() {
			if (mod == 1) {
			ans1 = "N";
		} else {
			ans2 = "N";
		}
		document.getElementById("ys").style.display = "none";
		document.getElementById("no").style.display = "none";
		let xhttp = new XMLHttpRequest();
		let urlString = API_ENDPOINT;        
		xhttp.onreadystatechange = function() { response();}
		xhttp.open("GET", urlString , true);
		xhttp.send();
	}
	
	 
		 function nxt() {
			if(mod == 1) {
				mod = 2;
				document.getElementById("question").innerText = "is this the best course?";
				document.getElementById("ys").style.display = "block";
				document.getElementById("no").style.display = "block";
			}			
		  }
		  
    function initModule() {
        document.getElementById("next").addEventListener("click",  nxt);
	document.getElementById("ys").addEventListener("click",  clickListenery);
	document.getElementById("no").addEventListener("click",  clickListenern);
    }
    
    return {initModule: initModule}
}();
