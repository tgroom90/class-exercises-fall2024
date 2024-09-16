# Lab 4: Docker Tutorial

**Before you begin...**
1. Ensure that Docker is running and that you can access the Docker Dashboard
1. Open the command prompt
2. Run the following command: `docker run -dp 80:80 docker/getting-started`
3. Open [http://localhost](http://localhost) in your browser to complete the tutorial.


Complete the following tutorial sections (note that #4 and #9 are optional) and answer the questions below:

## 1. Getting Started
Consider the command you just ran: `docker run -d -p 80:80 docker/getting-started`

Answer the following:
1. Explain what the -p flag is doing (in your own words)
2. How do you think [http://localhost](http://localhost) is communicating with Docker?

1. As far as I can tell, from the description in the docker tutorial, the -p command maps a port of the container to a port on the host machine.
2. As far as I can tell from what I've learned so far, a container is a semi-isolated(if it were fully isolated then we wouldn't be able to communicate with it) environment that is somewhat separate from our session on the host machine, so that network functionality is needed to communicate between the host and the container. Because the container exists locally, we should be able to do this without any internet connection. 

On this first sections the descriptions are rather short, but it seems that containers could more or less be a way to simulate a separate machine and runtime environment, but at this point I'm not sure. I've known about Virtual Machines for many years, but at this point I'm not sure what makes them different from containers.

## 2. Our Application
When you download and unzip `app`, save it inside of the `lab04` directory (while on your `lab04` branch). Then follow the instructions for this section. When you're done, answer the following questions about the `Dockerfile` you just made:
1. What is `node:18-alpine` and where did it come from?
2. Which commands in the Dockerfile instructed Docker to copy the code from `app` onto the Docker image? Explain.
3. What do you think would happen if you forgot to add `CMD ["node", "src/index.js"]` in your Dockerfile? Why?

1. I think that node 18 is another container or machine that was included as part of the docker getting started package, which in this case we are connecting to in order to download files from.
2. I believe it is this command in the Dockerfile we made: WORKDIR /app
It's telling the system that the given directory is our working directory that we are building our image from.
3. Our program wouldn't actually start when we visited http://localhost:3000/ because it needs this line to know what script to actually execute. Our container won't do us any good if we can't actually get the script or scripts on it to execute.

## 3. Updating Our App
In this section, you learned that if you make a change to the code, you have to 
* Rebuild the Docker image,
* Delete the container that you previously made (which is still running), and
* Create a brand new container

Answer the following:
1. What are two ways you can delete a container?

1. We can do this from the Docker dashboard by finding the row with the container name and looking at the right end of the row where there is a garbage can icon. Click on it and you can delete the container. 
The second way is to enter the following command into the terminal: docker stop <Insert Container ID here>
Then you must follow it up with: docker rm <Insert Container ID here>
The first command only stops the container, the second deletes it.

## 4. Sharing Our App (Optional)
You don't have to complete this section, but I do want you to navigate to the Docker Image repository and take a look: [https://hub.docker.com/search?q=&type=image&image_filter=official](https://hub.docker.com/search?q=&type=image&image_filter=official). These are all of the potential Docker Images you can utilize to build your own containers (which will save you a lot of time)!

## 5. Persisting our DB

1. What is the difference between the `run` and the `exec` command?
2. What does the `docker exec -it` command do, exactly. Try asking ChatGPT!
3. What was the purpose of creating a volume?
4. Optional: How does the TODO app code know to use the volume you just made? Hint: open `app/src/persistence/sqlite.js` and see if you can figure it out.

1. 'run' is the command you use to create and start containers with Docker, 'exec' is how you actually have the container itself run commands.
2. This command has the container execute the command in a way that allows a new terminal session within the context of the container that accepts user input and can provide output.
3. The volume allowed our user-inputted data to persist across container sessions. Without the volume, any entries on the to-do list would disappear once the container was stopped.
4. When we created the new container, we did so with a command to ensure that it used the volume we previously created. The volume is actually stored locally on our machine, and not on the container. There appears to be a particular line in the sqlite.js code that looks to see if we have a database from the volume before creating a new one, with this line(line 3): const location = process.env.SQLITE_DB_LOCATION || '/etc/todos/todo.db';

If we look at this line of code, it is an OR statement. I don't specifically understand everything that is going on with the first part of it, but this is where I believe it attempts to see if we have a database within our volume, and if it doesn't, it looks in the specified directory which is going to be empty when we run a new container, so it will be creating that a new database if one isn't found from the first part of the statement.

## 6. Using Bind Mounts
1. Why are bind mounts useful? 
2. Note that the commands below can also be represented in a Dockerfile (instead of in one big string of commands on the terminal). What are the advantages of using a Dockerfile?

```
docker run -dp 3000:3000 \
    -w /app -v "$(pwd):/app" \
    node:18-alpine \
    sh -c "yarn install && yarn run dev"
```

1. Bind mounts create a direct link between the container and your local system's directory. This allows changes resulting from tweaks to the code to be observed near instantly, and you don't have to bother deleting the container and starting a new one with the updated code.
2.  The most obvious advantage of a Dockerfile is that it's just faster to use. Instead of having to type up or paste multiple lines of code, you can just use one that relies on your Dockerfile. It also minimizes human error, as there's much less of a chance of a mistake just writing one line of code to build with your Dockerfile as opposed to writing multiple lines by hand. An additional benefit of Dockerfiles is that you could potentially write comments explaining things, which could be useful if you're working as part of a team or are working over a long span of time and may have forgotten why you did something in particular.

## 7. Multi-Container Apps
If you have never worked with network applications, this section may be confusing. That said, try to answer this question as best you can:

1. If you have two containers running that are sandboxed (i.e., one container can't reach into another container and see its internal state or code), how did you get your two containers to communicate with one another? In other words, how was the web application container able to communicate with the database container?

1. This is a challenging question, but as far as I can tell, when we create a container, we map it to a given port, so that it should be possible when making multiple containers that using the port information we have from the rest of our containers, we should be able to have them interface with each other. The tutorial demonstrates that this can be done with aliases to make things a little easier.

We can create custom networks within docker and when creating a container, we can specify what network we want it to connect to. You can do this when creating a container with the run command with the "-network" command, but this presupposes we have already created a network, which can be done with the "docker network create <name>" command.

## 8. Using Docker Compose
1. What is the purpose of the `docker-compose.yml` file?

1. In short, the compose file synthesizes everything from the above lessons. It is a script that provides a simple way to create a multi-container development environment where everything is linked together without us having to manually go through all of the steps we did in previous parts of the tutorial by hand every time.

## 9. Image Building Best Practices (Optional)
Optional section. Only complete if you want to.


## What to turn in
After answering all of the questions above...
1. Make sure that your `app` folder is inside of your `lab04` folder (including your `Dockerfile` and `docker-compose.yml` files).
1. Then, stage, commit, and push your 'lab04' branch to GitHub. 
1. Create a Pull Request (but do not merge your pull request -- that doesn't happen until Sarah reviews it).
1. Paste a link to your pull request in the Lab04 submission
