## SQL Questions
1. SELECT - Retrieving Data. Write a query to list the titles and release years of all movies in the film table.

SELECT title, release_year FROM film;


2. WHERE - Filtering Data. Write a query to find all customers whose last name starts with the letter 'S'.

SELECT * FROM customer WHERE last_name LIKE 'S%';


3. ORDER BY - Sorting Results. List all films titles and their durations, sorted by their rental duration in descending order. If two films have the same rental duration, sort them alphabetically by title.

SELECT title, rental_duration FROM film ORDER BY rental_duration DESC, title ASC;

4. JOIN - Combining Tables.

SELECT film.title, category.name AS category_name
FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id;


5. AGGREGATE FUNCTIONS - Summarizing Data. Write a query to find the average rental duration for movies in each category.

SELECT category.name AS category_name, AVG(film.rental_duration) AS avg_rental_duration
FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
GROUP BY category.name;


6. COUNT - Counting Rows. Write a query to count how many films are in the Action category.

SELECT COUNT(film.film_id) AS action_film_count
FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
WHERE category.name = 'Action';


7. INSERT - Adding Data. Insert a new customer into the customer table. The new customer should have a first name, last name, email, and be linked to an existing store.

INSERT INTO customer (first_name, last_name, email, store_id, address_id)
VALUES ('Eamon', 'Valera', 'evalera@gmail.com', 2, 1);

Note: I needed to add an address_id as the query failed when I did not provide it.
I verified that this was working by running this query: SELECT * FROM customer WHERE first_name LIKE 'Eamon';


8. UPDATE - Modifying Data. Update the rental rate of all films in the Comedy category, increasing it by 10%.

WHERE film_id IN (
    SELECT film.film_id
    FROM film
    JOIN film_category ON film.film_id = film_category.film_id
    JOIN category ON film_category.category_id = category.category_id
    WHERE category.name = 'Comedy'
);


9. DELETE - Removing Data. Write a query to delete all films that have never been rented. Make sure to use a subquery to identify the films that haven't been rented.

First I run this, which shows what films haven't been rented. It turns out to be one: Flash Wars.

SELECT film.title
FROM film
LEFT JOIN rental ON film.film_id = rental.rental_id
WHERE rental.rental_id IS NULL;

Then this query should delete it.

DELETE FROM film
WHERE film_id IN (
    SELECT film_id
    FROM film
    LEFT JOIN rental ON film.film_id = rental.rental_id
    WHERE rental.rental_id IS NULL
);


10. CREATE TABLE & ALTER TABLE - Managing Database Structure. Create a new table called movie_reviews with columns for review_id, film_id, reviewer_name, rating, and comments. Then, add a foreign key constraint linking film_id to the film table.

CREATE TABLE movie_reviews (
    review_id SERIAL PRIMARY KEY,
    film_id INT,
    reviewer_name VARCHAR(255),
    rating DECIMAL(3, 1),
    comments TEXT,                  
    
    CONSTRAINT fk_film_id FOREIGN KEY (film_id) REFERENCES film(film_id)
);



## SQLAlchemy Questions

1. Understanding SQLAlchemy Automap: How do you think the `AutoModels` class works to dynamically generate SQLAlchemy ORM models from the database schema?

AutoModels seems to take in an SQL table and convert it to into a python object. Thinking on an abstract level, this doesn't seem too difficult to grasp. The table itself can be thought of as an object, with each column representing different attributes of the object. The rows would correspond to individual instances of the object, so we can imagine that AutomModels creates an object which uses the table's columns as attributes of the object, and then constructs individual instances of that object using the rows.


2. Async Database Operations: Explain the use of asynchronous database sessions in this script. Why does the script use AsyncSession instead of a regular Session, and how does this improve the efficiency of database operations?

There are some obvious reasons I can think of to use asynchronous sessions, and that this should be done wherever possible. We have to consider that a database may at any given time be performing many operations with clients, so we want to minimize the workload we put on it ourselves. This can be done by retrieving a copy of the database at a given time, perhaps at set intervals to minimize the load on the server, and then we perform queries and work with our local copy, I think this is what an asyncrhnous session is. This is also more efficient in the sense that instead of having the database perform the desired operations at each step, there's no reason we can't do it locally in most cases and save the database server from the strain. In short, aysyncrhonous sessions allow us to eat up less bandwith and processing power from the perspective of the server hosting the database, and in many cases it will simply be faster for us.

3. SQLAlchemy Query Construction: In the `model_examples` function, there is a query that selects all customers whose last names start with the letter "P". See if you can write another questy that selects customers whose first name ends with the letters "n" or "a" using SQLAlchemy syntax.

select(Customer).where(
    or_(
        Customer.last_name.like('%n'),
        Customer.last_name.like('%a')
    )
)



4. In the `raw_sql_examples` function, there are two ways to execute SQL queries: directly via the engine using conn.execute() and using an ORM session with session.execute(). Discuss the pros and cons of executing raw SQL directly compared to using SQLAlchemy’s ORM methods.
Hint: Consider the trade-offs in terms of readability, safety (e.g., SQL injection risks), and flexibility when using raw SQL versus ORM abstractions.

Running raw SQL poses a greater security risk as it runs the risk of SQL injeciton. It can also be more difficult to perform some operations since in SQL complex queries must be done as one potentially giant, complex query, whereas with ORM and the use of Python objects, we can break things up into chunks and handle them more easily. Another downside is that for raw SQL, we must be directly connected to the database.

As for the pros, some queries can be more simply and easily written directly in SQL. Because of the directness and literalness of SQL compared to some other programming languages, it can be easier to read what is going on. ORM doesn't support all SQL functionality that is there, so it may be that the functionality you need simply doesn't exist with ORM. Since ORM provides a layer of abstraction over desired operations, it comes at a performance cost and you can sometimes achieve faster performance with raw SQL.