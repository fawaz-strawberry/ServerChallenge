******************************************************************************
******************************************************************************
Build a PWA(Progressive Web Application) that allows users to do the following for a set of random objects positioned on a map, 
the map can be as simple as an SVG HTML Image, a WebGL rendered object, or an actual geographical map.


Functionality:

    Add/Update/Delete Config
    View streaming data



The data model should contain the following structures:

    Object Configuration: Contains data like (Id, title, location-, and a bunch of dynamic properties)
    Object Real-time Data: The corresponding object will be sending streaming data at a cadence of ~500 ms



Project components:

    Web frontend: You can use any off the shelf component framework (Material UI, ant.design…)
    Form based component to add/update/delete the object configuration
    Realtime component to show streamed data
    Backend (Any language of choice, Nodejs/Python/Go …)
    Add/Update/Delete Object Configuration (REST)
    Stream Object Data (Websockets), potentially build a simple simulation component so that you can test your UI
    Database (Any SQL/NoSQL DBMS would be ok)
    Bonus: Infrastructure components (Docker, Docker-Compose, even kuberenetes…)
    Bonus: Set Location on the map by moving the object
    Bonus: Webgl based 3D UI for showing the actual 3d models of the objects + data overlay, using something like threejs (You can find low poly 3d models on sketchfab or ploy)
    Bonus: Send a Web Notification if streamed data go beyond a certain threshold



Some Considerations:

    The project needs to be delivered the day before your interview day.
    The project has to be delivered as a git controlled folder, the code is yours, so you can choose to put it on github and give us access to it, or just give it to us as a shared folder.
    We will be only testing on Chrome
    You can send any questions you might have, we will be replying ASAP
******************************************************************************
******************************************************************************