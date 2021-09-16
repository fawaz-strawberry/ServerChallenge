1) Download MongoDB Community 
https://www.mongodb.com/try/download/community

2) Set a PATH Environemnt Variable to the bin folder of MongoDB

3) Download NodeJS
https://nodejs.org/en/download/

4) Ensure that PATH Environment Variable gets set for Node as well

5) Navigate to folder containing this PWA

6) Run "node ./init_script/mongoDB_init.js" to initialize database and collection

7) Run "npm --prefix backend-server/ install"
8) Run "npm --prefix map-app/ install"
9) Run "npm --prefix sim-server/ install"

10) Run "npm --prefix sim-server/ start" to start simulation server
11) Run "npm --prefix backend-server/ start" to start up DBServer
12) Run "npm --prefix map-app/ start" to start up React App
