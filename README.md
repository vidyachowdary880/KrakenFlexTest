#  KrakenFlex Back End Test App

App folder contains main.js file where whole code is resided.
Test cases are in main.spec.js

Application start with `init` function where we have 3 functions.
1) getOutages : makes get call `GET /outages` to obtain full outages data.
2) getSiteInfo: makes get call `GET /site-info/{siteId}` with siteid `norwich-pear-tree` to             get siteinformation and also filters the data as per the requirements and returns matched outages.
3) postOutagestoSiteId: post matched outages to respective siteid `POST /site-outages/{siteId}`. If it is a acceptable request function returns status 200 otherwise 400. 

# Dependencies and Run commands

```
1) Node js runtime version V14.x. [14.x] and js language.
2) Inside the project repo
	Run: npm install
3) modules used: "axiom" and for testing "jest".
4) Run the application with :
    Run: npm start
5) Run the test suit(including coverage) with :
    Run: npm test -- --coverage
```
 
