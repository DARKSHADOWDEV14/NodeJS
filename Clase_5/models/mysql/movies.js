import mysql from "mysql2/promise";
import fs from "fs";

const DEFAULT_CONFIG = {
  host: "localhost",
  user: "root",
  port: "3306",
  password: "",
  database: "moviesdb",
};

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

// const [rows] = await connection.query("SELECT DATABASE() as db, NOW() as time");
// console.log(rows); // esto es para ver conexion a Eiven

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      // const lowerCaseGenre = genre.toLowerCase()
      // const [genres] = await connection.query(`SELECT id FROM genre WHERE LOWER(name) = ?`, [lowerCaseGenre])
      // if (genres.length === 0) {
      //   return []
      //   const [{id: genreId}] = genres
      // }
    }
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) AS id FROM movie;`,
    );

    console.log(movies);
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) AS id FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id],
    );

    if (movies.length === 0) {
      return null;
    }
    return movies[0];
  }

  static async create(input) {
    const { genre, title, year, director, duration, poster, rate } = input;

    const [uuidResult] = await connection.query(`SELECT UUID() uuid;`);
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO movie (id,title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate],
      );
    } catch (error) {
      throw new Error("Error creating movie");
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) AS id FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid],
    );

    return movies[0];
  }

  static async delete({ id }) {
    const [result] = await connection.query(
      `
    DELETE FROM movie
    WHERE id = UUID_TO_BIN(?);
  `,
      [id],
    );

    if (result.affectedRows === 0) {
      return false;
    }

    return true;
  }

  static async update({ id, input }) {
    const fields = Object.keys(input)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(input);

    const [result] = await connection.query(
      `
    UPDATE movie
    SET ${fields}
    WHERE id = UUID_TO_BIN(?);
  `,
      [...values, id],
    );

    if (result.affectedRows === 0) return false;

    const [[movie]] = await connection.query(
      `
    SELECT 
      BIN_TO_UUID(id) AS id,
      title,
      year,
      director,
      duration,
      poster,
      rate
    FROM movie
    WHERE id = UUID_TO_BIN(?);
  `,
      [id],
    );

    return movie;
  }
}
