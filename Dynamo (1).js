document.addEventListener("DOMContentLoaded", function(){
    let mod = 1;
    let qust = "";
    let ans = "";
    let Dynamo = function() {
        let current, xhttp;
        const API_ENDPOINT = "https://5qu0u527q2.execute-api.ap-northeast-1.amazonaws.com/v1/";
        function response() {
            if (xhttp.readyState == 4 && xhttp.status == 200) { 
                let res = JSON.parse(xhttp.responseText);
                console.log(res);
                xhttp = new XMLHttpRequest();
                let rsp1 = {"id": "7",
                            "rsp1": ans
                            };
                let rsp2 = {"id": "7",
                            "rsp2": ans
                            };
                xhttp.open("POST", API_ENDPOINT, true);
                xhttp.setRequestHeader('Content-Type', 'application/json');
                if (mod == 1) {
                    xhttp.send(JSON.stringify(rsp1));
                } else {
                    xhttp.send(JSON.stringify(rsp2));
                }
            }
        }
        function clickListener(questionNum, userAnswer) {
            ans = userAnswer;
            qust = document.getElementById("question"+questionNum).innerHTML;
            xhttp = new XMLHttpRequest();
            let urlString = API_ENDPOINT;        
            xhttp.onreadystatechange = function() { response();}
            xhttp.open("GET", urlString , true);
            xhttp.send();
        }
        function nextQuestion() {
            mod = 2;
            document.getElementById("question1").style.display = "none";
            document.getElementById("form1").style.display = "none";
            document.getElementById("question2").style.display = "block";
            document.getElementById("form2").style.display = "block";
        }
        function initModule() {
            document.getElementById("next").addEventListener("click", nextQuestion);
            document.querySelectorAll(".answer-btn").forEach(function(button){
            button.addEventListener("click", function(){ Dynamo.clickListener(mod, this.innerHTML); });
            });
        }
        return {initModule: initModule, clickListener: clickListener}
    }();
    Dynamo.initModule();
});
