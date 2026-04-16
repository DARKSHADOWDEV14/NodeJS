npm init -y
npm install express -E // cuando se agrega el -E no aparece el Kateh para la actualización de los paquetes.
npm install zod -E
npm install cors

npx servor ./web = sirve la pagina en una URL
CORS = 

---------------------------------------------
DROP DATABASE IF EXISTS moviesdb;
create database moviesdb;
use moviesdb;

CREATE TABLE movie (
id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
title VARCHAR(255) NOT NULL,
year INT NOT NULL,
director VARCHAR(255) NOT NULL,
duration INT NOT NULL,
poster TEXT,
rate DECIMAL(2, 1) NOT NULL
);

CREATE TABLE genre(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE

);

CREATE TABLE movie_genres(
movie_id BINARY(16) REFERENCES movies(id),
genre_id INT REFERENCES genres(id),
PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre(name) VALUES
("Drama"),
("Action"),
("Crime"),
("Adventure"),
("Sci-Fi"),
("Romance");

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), "Inception", 2010, "Christopher Nolan", 180, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
(UUID_TO_BIN(UUID()), "Avatar", 2009, "James Cameron", 162, "https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg", 7.8),
(UUID_TO_BIN(UUID()), "The Social Network", 2010, "David Fincher", 120, "https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg", 7.7);

INSERT INTO movie_genres (movie_id, genre_id) VALUES
((SELECT id FROM movie WHERE title = "Inception"), (SELECT id FROM genre WHERE name = "Action")),
((SELECT id FROM movie WHERE title = "Avatar"), (SELECT id FROM genre WHERE name = "Action")),
((SELECT id FROM movie WHERE title = "The Social Network"), (SELECT id FROM genre WHERE name = "Drama"));

SELECT 	*, BIN_TO_UUID(id) id FROM movie;

-----------------------




