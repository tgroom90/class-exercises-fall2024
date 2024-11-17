# Activity 4 -- Experimenting with SQL from Python

This activity is designed to be completed entirely in class.

The goals with this activity are as follows:

1. Get experience interacting with a Postgres database from Python
2. Get experience querying the databse via an ORM

## Setup

We'll use the same data model from the last activity. We'll also use
the same Dockerfile that runs our Postgres instance.

Additionally, I've added a simple `compose.yaml` file since we'll want
to forward the postgres port on our container. So to get things up and
running, all you have to do is run:

Instead of running our application in a container, we'll want to use
Python on our local computer. See the tips in the [Project 2
Readme](../projects/project2), if you aren't sure what I'm talking
about (the section called "Use Poetry Outside of Docker").

```
$ docker compose up
```

### Potential Errors
If you already have PostgreSQL installed on your local machine (from another class), you'll need to map your Docker PostgreSQL instance to another port (e.g., 5333). Change your `compose.yaml` as follows:

```
services:
  db:
    build:
      context: .
    ports:
      - "5433:5432"
```

And change your database connection string in your `orm.py` as follows (line 127):

```
 "postgresql+asyncpg://postgres:postgres@localhost:5433/dvdrental"
```


## Run the Program

Once you have your Postgres container up and running, you can install
the poetry dependencies.

```
$ poetry install
```

And now you should be able to run the `orm.py` file as usual.

```
$ poetry run python orm.py
```

## Examples

We'll muddle through some examples in class