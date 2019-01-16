## Teams API

<h3>Detailed Instructions:</h3>

<h4>Quick Note: Before you Start</h4>

> This guide requires that you have Node.js and MongoDB correctly installed on your system.  If you cannot execute the commands: `npm --version` or `mongorestore --version`, please [Install NodeJS](https://nodejs.org/) and/or [MongoDB](https://www.mongodb.com/) (See: the [Official Install Guide](https://docs.mongodb.com/manual/administration/install-community/) or the [WEB322 Notes](http://zenit.senecac.on.ca/~patrick.crawford/index.php/web322/course-notes/week8-class1/) for detailed instructions).

Once you have cloned the repository, move the teams-api folder out of the "Code Examples" folder and open it in Visual Studio Code and issue the command "npm install" from the integrated terminal.  This will look at the package.json file and add the required dependant modules.

If you open the "server.js" file, you will notice that the top 2 lines define the constants "mongoDBConnectionString" and "HTTP_PORT".  The HTTP_PORT is fine the way it is (unless you have a conflict on your local machine with port 8081), however the mongoDBConnectionString value will need to change...

### MongoDB Database:

For this course we will be continuing to use MongoDB Atlas (If you're new to MongoDB Atlas, See the [WEB322 Notes (Week 8)](http://zenit.senecac.on.ca/~patrick.crawford/index.php/web322/course-notes/week8-class1/) on how to create an account and get started):

1. Log into your Atlas Account here: [https://cloud.mongodb.com/user#/atlas/login](https://cloud.mongodb.com/user#/atlas/login)

2. Click on the "Collections" Tab for your SenecaWeb Cluster

3. Click "Create Database" and name it "teams-api-data" and enter "tbd" for the collection name (we will be deleting this collection once the database is populated - see below).

4. Click "Create" to create the new database and close the modal window

5. Click on the "Command Line Tools" tab (next to the "Collections" tab)

6. Copy the the "mongorestore" command and paste it into a text editor (textEdit, notepad, etc)

7. Change the "&lt;PASSWORD&gt;" value to the value that you used as your "MongoDB User" when setting up your SenecaWeb Cluster.
    
    **Important Note:** If your password contains special characters, you will need to enclose your password in single quotes, ie 'myPassword' for the mongorestore command to function properly.

8. Add the following flag to the end of the command: **-d teams-api-data**

9. Once you have the completed mongorestore command (with a valid "&lt;PASSWORD&gt;"), go back to the integrated terminal in Visual Studio code and Change the working directory ("cd") in the integrated terminal to "API-data-restore"

10. Once this is done and your working directory is "API-data-restore", paste the completed mongorestore command into the terminal and press enter to execute it
    
    **Important Note** For the mongorestore command to work correctly (and not display SSL errors), you will need an up-to-date version of the [MongoDB Community Server](https://www.mongodb.com/download-center/community) - See the [WEB322 Notes (Week 8)](http://zenit.senecac.on.ca/~patrick.crawford/index.php/web322/course-notes/week8-class1/) for a refresher on installing the community server. 

11. You should see a number of lines output to the terminal indicating the progress, and then finally a "done" message

12. If you go back to MongoDB Atlas online (Under the "Collections" tab) and hit "REFRESH", you should now see that your "teams-api-data" database contains 5 collections (including "tbd").  You may now remove the "tbd" collection.

### OBTAINING The mongoDBConnectionString:

Now that we have our back-end MongoDB all set up and populated with data, we just have to make that all-important update to the mongoDBConnectionString constant.

To obtain the connection string:

1. Go back to mongoDB Atlas online and click the "Command Line Tools" tab once again.

2. Under "Connect To Your Cluster", you should see a "Connect Instructions" button - click this to open a "Connect to SenecaWeb" modal window.

3. Click the "Connect Your Application" button

4. Under the first option, click the "Standard connection string (For drivers compatible with MongoDB 3.4+)" button and copy the URI connection string and paste it in a text file for now. You will notice that there's a space for &lt;PASSWORD&gt; - simply replace this with the actual password that you used as your "MongoDB User" when setting up your SenecaWeb Cluster

5. Search the connection string for the text "mongodb.net:27017/test" - it should be in there somewhere. To connect to a specific database, simply replace the string "test" with the actual database name, ie: "teams-api-data" (mongodb.net:27017/teams-api-data).

**Sample Connection String**

When complete, your connection string should look something like this:

```
mongodb://userName:password@senecaweb-shard-00-00-abcd.mongodb.net:27017,senecaweb-shard-00-01-abcd.mongodb.net:27017,senecaweb-shard-00-02-fe4bt.mongodb.net:27017/teams-api-data?ssl=true&replicaSet=SenecaWeb-shard-0&authSource=admin&retryWrites=true
```

### UPDATING The mongoDBConnectionString in server.js:

1. First, switch back to the previous directory using the integrated terminal (cd ..) so that our working directory has the "server.js" file in it.

2. Next, open the server.js file and using the credentials identified above, modify the mongoDBConnectionString value your newly completed connection string (from above)

3. Save the changes and run the server from the integrated terminal using the familiar command "node server.js"

4. If the server starts successfully (ie: you see the output: "API listening on: 8081", then the connection to your MongoDB Atlass Account has succeeded!  

5.  At this point, it will be easiest if you push this server to Heroku, so that you can easily use it in all of your projects, without having to start up a local copy of the API server every time we want access to the data.  

**Note:** For a refresher on how initialize the folder with a .git repository, create an App with the Heroku CLI, and publish the App to Heroku, refer to the WEB322 notes on ["Getting Started with Heroku"](http://zenit.senecac.on.ca/~patrick.crawford/index.php/web322/course-notes/getting-started-with-heroku).

## USING THE API

The TeamsAPI project is a simple Web Api consisting of 4 collections:

* Employees
* Positions
* Projects
* Teams

These collections are related in the following way:

![Teams API Data Model](https://cdn.rawgit.com/sictweb/resources/2f4fa285/teams-api-model-2.png)

Essentially, this will allow us to manage a number of teams by making AJAX requests to the API server running in the background.  Each team will work on 0 or more projects and will have 0 or more employees and one single team lead.

You can access Create, Read and Update (no Delete) operations on each of the collections (using JSON) with the following routes:

#### Employees

* GET /employees (returns all employees with all foreign keys populated)
* GET /employees-raw (returns all "raw" employees, ie: foreign keys not populated)
* GET /employee/:employeeId (returns an array containing a single employee with all foreign keys populated)
* GET /employee-raw/:employeeId (returns an array containing a single "raw" employee, ie: foreign keys not populated)
* PUT /employee/:employeeId (updates a single employee)
* POST /employees (adds an employee to the system)

#### Positions

* GET /positions (returns all positions)
* GET /position/:positionId (returns an array containing a single position)
* PUT /position/:positionId (updates a single position)
* POST /positions (adds a position to the system)

#### Projects

* GET /projects (returns all projects)
* GET /project/:projectId (returns an array containing a single project)
* PUT /project/:projectId (updates a single project)
* POST /projects (adds a project to the system)

#### Teams

* GET /teams (returns all teams with all foreign keys populated)
* GET /teams-raw (returns all "raw" teams, ie: foreign keys not populated)
* GET /team/:teamId (returns an array containing a single team with all foreign keys populated)
* GET /team-raw/:teamId (returns an array containing a single "raw" team, ie: foreign keys not populated)
* PUT /team/:teamId (updates a single team)
* POST /teams (adds a team to the system)
