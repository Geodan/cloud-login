==Cloud Login==

A simple login form created in HTML and javascript (using jQuery) to add a CAS-aware login to the Geodan Cloud to any website. Currently it does not yet work in Internet Explorer < 10. 

* If the user isn't logged in it will show a login form and reset password & register links
* If the user is logged in, it will show the user name and a logout button.

It uses a special service 'whoami.jsp' to check if an user is logged in and if so retrieve the user credentials. 