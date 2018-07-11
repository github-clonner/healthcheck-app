# HEALTHCHECK APP

This projects is a little express application that runs wherever you want and launches checks periodically.
You can PING machines, do XHR to other sites, make requests to DB.

Actually there is only PostgreSQL and mongodb supported, more to come soon (elastic search).

The results of checks can be stored in daily rotated log files in /logs folder at the root by default.

For each check you want to do, you have to create an object in config.local.js, all types of checks are covered in the config.example.js file.

## Local install

Clone the project and create a file in the root directory named 'config.local.js'
This file shouldn't be versioned as it may contain DB credentials.

You can launch app.js with pm2 to set envorionnement variables for DB credentials.
Don't commit the pm2 conf file too.

## Test tools

Cool site to test status codes => http://httpstat.us/
