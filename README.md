# PRODUCT DEVELOPMENT - REALIZDEA
> TEAM C - Backend

## Working Steps:
1. Setup packages/modules: npm install --save express express-validator sequelize mysql2 body-parser bcrypt multer jsonwebtoken passport passport-local passport-jwt cors moment axios

2. npm init and edit the "test scripts" : ("test" : "nodemon -r ./index.js").

3. Prepare Dummy Data in Excel.

4. Setup SQL(sequelize) Database
  - sequelize init
  - Update the username, password, database in config.js file
  - sequelize db:create
  - Generate Model using scripts:
    ~ sequelize model:generate --name user --attributes fullname:string,firstname:string,lastname:string,email:string,password:string,picture:string,id_role:integer,location:string,bank:string,account_number:string
    ~ sequelize model:generate --name role --attributes role:string
    ~ sequelize model:generate --name contest --attributes title:string,id_provider:integer,prize:decimal,due_date:date,description:text,id_status_contest:integer,announcement:date
    ~ sequelize model:generate --name status --attributes status:string
    ~ sequelize model:generate --name application --attributes id_contest:integer,id_provider:integer,submission:string,description:text,id_status_contest:integer
    ~ sequelize model:generate --name payment --attributes id_contest:integer,id_provider:integer,id_winner:integer,id_status_contest:integer,evidence_provider:string,id_status_provider:integer,evidence_admin:string,id_status_winner:integer
  - Configure the migration files:
    ~ Add allowNull: true or false
    ~ Add deletedAt
  - Configure the model files:
    ~ Add unique: true,
    ~ Add paranoid, timestamps: true,
    ~ Add freezeTableName : true,
    ~ Add custom setters : hash password using bcrypt
  - sequelize db:migrate
  - Setup seeders
    ~ sequelize seed:generate --name add-data-user
    ~ sequelize seed:generate --name add-data-status
    ~ sequelize seed:generate --name add-data-role
    ~ sequelize seed:generate --name add-data-contest
    ~ sequelize seed:generate --name add-data-payment
    ~ sequelize seed:generate --name add-data-application
  - Edit seeders/add-data-(TableName).js
  - sequelize db:seed:all

5. Setup index.js file
  - Import modules and routes (Comment it first until finish coding the validator and controller files).
  - Use bodyParser, express.static, routes, cors and listen to port.

6. Routes
  - Inside the 'routes' folder, create the routes file of based on the architecture designed (Based on the function and the page).

7. Middlewares: Authentication

8. Middlewares: Validator

9. Controller

10. Run teh test using "POSTMAN"

11. Create the ".gitignore" file to prevent the "node_modules/ and config/" file from being push to the git account

12. Push your file to github/gitlab project

13. Setup the instance in AWS EC2 Free-tier
- Create new instance <Launch instaces>
  ~ Select the AMI (Amazon Machine Image) <Ubuntu Server 18.04 LTS>
  ~ Choose instance type <t2.micro Free tier eligible>
  Note: If you already have the key/pem file <Next:Configure Instance Details>, if not select <Review and Launch> to create new key/pem file

  ~ Download the key/pem file
  ~ Success creating the instance

- Connect to server using terminal
  ~ in terminal ~/<path to the key/pem file>$ chmod 400 <pem.file>
  ~ in terminal ~/<path to the key/pem file>$ ssh -i <pem.file> ubuntu@<Public IPv4 address or DNS>
  ~ Success connect to Server

- Install gitlab-runner : https://docs.gitlab.com/runner/install/linux-manually.html

- Install nodejs : https://github.com/nodesource/distributions/blob/master/README.md

- Install MySql : https://ap-southeast-1.console.aws.amazon.com/ec2/v2/home?region=ap-southeast-1#InstanceDetails:instanceId=i-09594620ccc255b4f

- Install nodemon globally, in terminal ~$ sudo npm install -g forever nodemon mocha

- Create the folder where you will upload your project: in terminal ~$ sudo mkdir -p /var/www/final-project

- Permit gitlab-runner to read/write/execute the folder:
in terminal ~$ sudo setfacl -m user:gitlab-runner:rwx /var/www/final-project

- Register the gitlab-runner from the server connecting gitlab project, in terminal ~$ sudo gitlab-runner register
  ~ Enter the gitlab-ci coordinator URL : https://gitlab.com/
  ~ Enter the gitlab-ci token: <in your gitlab project Settings > CI/CD > Runners section
  ~ Enter the gitlab-cit description: final-project
  ~ Enter the gitlab-ci tags: final-project
  ~ Enter the executor : shell

14. CI/CD Deployment
- Create the ".gitlab-ci.yml" file and code based on requirement, (can follow directly the one in slide as it is the simpliest one and accomodate to the above coding style).

15. Setup SSL Cert
- Make ssl certificate
    openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
    openssl rsa -in keytmp.pem -out key.pem
    mkdir ssl
    mv cert.pem key.pem keytmp.pem ssl/

- Add to index.js file
    const fs = require("fs");
    const https = require("https");
    const key = fs.readFileSync("./ssl/key.pem", "utf-8");
    const cert = fs.readFileSync("./ssl/cert.pem", "utf-8");

    https.createServer({key: key, cert: cert }, app).listen(3001);

- Create client.js file to testing one API with https to test the https working or not
- Notes: This is a self-signed certificate, so we need to skip the SSL certificate check with httpsAgent in the client side!
