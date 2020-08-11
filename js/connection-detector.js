/*
###
# Project Name : Connection Detector
# Author : Emmanuel Essien
# Author : emmaessiensp@gmail.com
# Maintainer By: Emmanuel Essien
# Maintainer Email: emmaessiensp@gmail.com
# Created by Betacodings on 26 July 2020.
###
*/


const connectionClient = function () {


    this.check = function (theUrl, theme, alertConnect_) {

        var response = 0
        var ClientHttpRequest = new XMLHttpRequest();
        
        try {
            ClientHttpRequest.open("GET", theUrl, true); // true for asynchronous 
            ClientHttpRequest.send();
            ClientHttpRequest.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    response = 1;
                } else if (this.readyState > this.HEADERS_RECEIVED && this.status == 200) {
                    response = 2;
                } else if (this.readyState == 0 && this.status == 0) {
                    response = 0;
                } else {
                    response = 'off';
                }
                
                alertConnect_ == true ? new display(response, theme) : ""
            
                return response == 1 || response == 2 ? true : false
            }



        } catch (error) {
            
            ClientHttpRequest.open("GET", theUrl, false); // false for synchronous request
            ClientHttpRequest.send();
            if (ClientHttpRequest.readyState == 4 && ClientHttpRequest.status == 200) {
                response = 1;
            } else if (ClientHttpRequest.readyState == ClientHttpRequest.HEADERS_RECEIVED && ClientHttpRequest.status == 200) {
                response = 2;
            } else if (ClientHttpRequest.readyState == 0 && ClientHttpRequest.status == 0) {
                response = 0;
            } else {
                response = 'off';
            }
            alertConnect_ == true ? new display(response, theme) : ""
            return response == 1 || response == 2 ? true : false
            
        }

    }
}
const idClass = 'connectionDetector';

window.onload = function get_body() {
   
    var newElement = document.createElement("div");
    newElement.className = idClass;
    document.getElementsByTagName('body')[0].prepend(newElement);
    
}
const setDefault = {
    url: window.location.href,
    theme: 'black'
}
let setTimer = 3000
let setVal_Obj  = {}

const connection = function() {
    let url = "",
        theme = "";
    
    this.isClient = function(setVal = setDefault, alertConnect_=true){
        setVal_Obj = setVal;
        if (setVal_Obj != "" && typeof (setVal_Obj) === 'object') {
            const objSet = setVal_Obj;
            url = objSet.url != undefined & objSet.url != "" ? objSet.url : setDefault.url
            theme = objSet.theme != undefined & objSet.theme != "" ? objSet.theme : setDefault.theme
        } else {
    
            url = setDefault.url
            theme = setDefault.theme
        }
        var response = true;
    
        const client = new connectionClient();
        setInterval(function () {
            const client = new connectionClient();
            response = client.check(url, theme.toLowerCase(), alertConnect_);
            return response
        }, setTimer);
        return response
    }
    

this.isActive = function (setVal = setDefault, alertConnect_=false){
    
    is_active  = this.Client(setVal, alertConnect_);
    return is_active;
}

}

const loaderSVG = '<svg version="1.1" class="connection-loader"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="15px" width="15px" viewBox="0 0 40 40" enable-background="new 0 0 30 30" xml:space="preserve"> <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/><path fill="#FF6700" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/> </path> </svg>';


const connectionAlert = function () {
    
    this.warning = function (theme) {

        return '<div class="connection connection-'+theme+'"><div class="dot warningdot"> </div> Initiating connection <a class="reconnect-btn">'+loaderSVG+' connecting <a> </div>'
    }

    this.error = function (theme) {

        return '<div class="connection connection-'+theme+'"> <div class="dot dangerdot"> </div>  Internet Connection lost <a class="reconnect-btn " onClick="new ClickReconnect()" id="reconnect"> Reconnect <a> </div>'
    }

    this.success = function (theme) {
        
        return '<div class="connection connection-'+theme+'">  <div class="dot successdot"> </div>  Internet Connection is Good <a class="reconnect-btn">  Connected<a> </div>'

    }




}

const display = function (responseInt, theme) {

    alertConnect = new connectionAlert();
    html_r = ""
    if (responseInt == 'off') {
        html_r = alertConnect.error(theme);
    }
    if (responseInt == 0) {
        html_r = alertConnect.warning(theme);
    }
    if (responseInt == 2) {
        html_r = alertConnect.success(theme);
    }
    
    
    document.getElementsByClassName(idClass)[0].innerHTML = html_r
    return responseInt
}

const ClickReconnect = function(){
        setTimer = 10000
        document.getElementById('reconnect').innerHTML = loaderSVG + " reconnecting"
        connect_ = new connection();
        return connect_.isClient(setVal_Obj);
        
}


const isClient = function(setVal = setDefault, alertConnect_=true){
    setTimer = 5000
    connect_ = new connection();
    return connect_.isClient(setVal_Obj);  
}

const isActive = function(setVal = setDefault, alertConnect_=false){
    setTimer = 5000
    connect_ = new connection();
    return connect_.isActive(setVal_Obj);  
}



