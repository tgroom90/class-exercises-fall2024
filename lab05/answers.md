# Lab 5: Package Management Tutorial
Please complete the hands-on activities associated with this lab outlined in the <a href="https://csci338.github.io/fall2024/assignments/lab05" target="_blank">Lab 5 Instructions</a> (on the course website). When you're done, answer the following questions. Feel free to use Google / ChatGPT to help you think about these questions (but keep in mind that you'll need to know them for the midterm exam).

## Part 1. Operating System Package Managers
Answer the questions for either Homebrew or apt (depending on whether you're using Linux / WSL or Windows)
1. What is Homebrew / apt, and why is it useful?

Homebrew is a package manager that lets you easily install, remove, and manage software packages via the terminal via the command line. All the things homebrew does could be done manually, but they would have to be done individually whereas homebrew can do most of the work for you.

2. What does the `update` command do (either `brew update` or `apt-get update`)?

It does two things: firstly, it updates the version of Homebrew itself if you do not have the latest ones, and it also updates the list of packages available through Homeborew.

3. Where are the packages that are managed by Homebrew / apt stored on your local computer?

In the cellar directory.

## Part 2.
1. What is a python virtual environment?

A python virtual environment is a self-contained environment where packages and dependencies exist independently such that you can work on multiple python projects, each with its own virtual environments, that use different versions of the same packages without creating conflicts.

2. What is Poetry, and how is it different from other Python package managers like pip?

Poetry manages dependencies and it is different from other package managers in that it integrates several different toolsets into one tool, like the virtual environments mentioned in the last question.

3. What happened when you issued the `poetry new poetry-demo` command?

It created a new directory called poetry demo with a few attendant files. It basically sets the stage for a demo of what poetry is and how it works.

4. How do you run a python file using the poetry virtual environment?

poetry run python <.py script name>

5. What is the purpose of the `poetry.lock` file?

It provides a record of dependencies including version numbers. When cloning a project, all the necessary packages are installed exactly as specified in the lock file.


## Part 3.
1. What are some of the things that `package.json` is used for?

It provides script and dependency management, as well as containing some basic information about the project.

2. Why wouldn't you want to check in the `node_modules` directory into GitHub?

This I've learned first hand from the previous lab and the mistake of including them! nodes_modules contains a huge volume of files and the overall size can be large. This bloads things up so much that it makes it take a *significant* amount of time to stage, commit, and push/pull files. 


