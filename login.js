//function to get url variables, as found in: //http://jquery-howto.blogspot.nl/2009/09/get-url-parameters-values-with-jquery.html
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    if(window.location.href.indexOf('?')<0) return [];
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});
//Remove the ticket and forwardUrl variables from the url
var docUrl = function() {
    var search = '';
    $.each($.getUrlVars(), function(key,value) {
        if(value != 'ticket' && value != 'forwardUrl' && value != '') {
            search += value +'='+$.getUrlVar(value) + '&';
        }
    });
    return window.location.href.split('?')[0] + '?' + search;
}

//A minor hack: the login service will return with an ticket URL parameter. 
//It is a bit nicer to remove it, whilst doing so we can directly get the user credentials
if($.getUrlVar('ticket')) {        
        location.href="https://auth.geodan.nl:8443/hellocas/whoami.jsp?forwardUrl="+docUrl();
}

var geodanLogin = function() {

     //Set the various urls for the cloud login 
    var loginurl = "https://auth.geodan.nl:8443/cas/login";
    var loguiturl = "https://auth.geodan.nl:8443/hellocas/cas-logout.jsp";
    var newurl = "https://auth.geodan.nl:8443/pwm/public/NewUser" +"?forwardURL=" + docUrl();
    var reseturl = "https://auth.geodan.nl:8443/pwm/public/ForgottenPassword" + "?forwardURL=" + docUrl();
    var checkurl = "https://auth.geodan.nl:8443/hellocas/whoami.jsp";   

    //Make sure it redirects back to the current page after the user action
    $('.geodan-cas-redirect').val(docUrl());

    //Set the login and loguit urls for the form
    $('.geodan-cas-auth-login').prop('action',loginurl);
    $('.geodan-cas-auth-loguit').prop('action',loguiturl);
    $('.geodan-cas-password-reset').prop('href',reseturl);
    $('.geodan-cas-newaccount').prop('href',newurl);
    var timestamp =new Date().getTime();
    checkurl = checkurl+'?'+timestamp;
    
    //Check if the user is already logged in on the CAS, using the whoami.jsp service
    $.ajax({
        type: "GET",
        url: checkurl,
        xhrFields: {
            withCredentials: true
        },
        success: function(a)
        {   
            $('#naam').html('Welkom '+a.FirstName);
            $('#geodan-cas-loguit').show();
            $('#geodan-cas-login').hide();
        },

        error: function(a,b) {
            $('#geodan-cas-login').show();
            $('#geodan-cas-loguit').hide();
        }
    });

}
$(document).ready(function(){
    //It might take some time for the iframe to load, so waiting a second makes sure
    //the iframe is loaded and validated before the AJAX request is fired
     setTimeout(function(){ geodanLogin()},1000);   
});