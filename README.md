# About
A quick start stack in case I need live updates in a web-app.

# How To Run
1. Install Docker and Docker Compose if you haven't

    a. [Get Docker](https://docs.docker.com/get-docker/)
    
    b. [Get Docker Compose](https://docs.docker.com/compose/install/)
2. Update the docker-compose.yml configuration file to list the host volumes from YOUR machine
3. Run `docker-compose up -d`

If at least the web-client starts this should show:
```
web-client         | You can now view my-app in the browser.
web-client         | 
web-client         | Local:            http://localhost:3000
```