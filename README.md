==Cloud Login==

A simple login form created in HTML and javascript (using jQuery) to add a CAS-aware login to the Geodan Cloud to any website. 

* If the user isn't logged in it will show a login form and reset password & register links
* If the user is logged in, it will show the user name and a logout button.

It uses a special service 'whoami.jsp' to check if an user is logged in and if so retrieve the user credentials. 

For IE<10 you the login.js script isn't working, due to AJAX/CORS implementation issues in IE<10. So for IE you can use indexie.html; it uses an iFrame to load a script from the CAS server. unfortunately this means that the website doesn't know about the user. Improvements on this approach are most welcome.