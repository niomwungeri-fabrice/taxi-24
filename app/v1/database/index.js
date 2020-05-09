const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DEV_DATABASE,
  password: process.env.PG_PASSWORD,
});

pool.on("connect", () => {
  if (process.env.NODE_ENV !== "test") {
    console.log("connected to the db");
  }
});

const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      drivers(
        id SERIAL PRIMARY KEY,
        names VARCHAR(25) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        email VARCHAR(25) NOT NULL UNIQUE,
        location VARCHAR(128),
        is_available BOOLEAN
      ); CREATE TABLE IF NOT EXISTS
      riders(
        id SERIAL PRIMARY KEY,
        names VARCHAR(25) NOT NULL,
        phone VARCHAR(25) NOT NULL,
        email VARCHAR(25) NOT NULL UNIQUE
      ); CREATE TABLE IF NOT EXISTS
      trips(
        id SERIAL PRIMARY KEY,
        departure VARCHAR(25),
        destination VARCHAR(25),
        coordinates VARCHAR(25),
        cost_amount numeric,
        is_complete BOOLEAN,
        rider_id integer REFERENCES riders (id),
        driver_id integer REFERENCES drivers (id)
      ); CREATE TABLE IF NOT EXISTS
      invoices(
        id SERIAL PRIMARY KEY,
        trip_id integer REFERENCES trips (id) ON DELETE CASCADE,
        rider_id integer REFERENCES riders (id) ON DELETE CASCADE,
        driver_id integer REFERENCES drivers (id) ON DELETE CASCADE 
      );`;

  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const seedDatabase = () => {
  const queryText = `INSERT INTO drivers
                      (names, phone, email, location, is_available) 
                      VALUES
                      ('John Doe', '0784758395', 'john.doe@email.com', '-1.956537,30.063616', true),
                      ('Allan Smith', '0784758305', 'allan.smith@email.com', '-1.971142,30.103683', false),
                      ('John Gakuba', '0784758315', 'john.gakuba@email.com', '-1.949549,30.126161', false),
                      ('Henry Mugenzi', '0784752395', 'henry.mugenzi@email.com', '-1.978963,30.223335', true),
                      ('Manzi Eric', '0784758395', 'manzi.eric@email.com', '-1.977940,30.043773', true);
                    INSERT INTO riders
                     (names, phone, email)
                     VALUES
                     ('Laura inema', '0786893958', 'laura.inema@email.com'),
                     ('Chris Rock', '0787940695', 'chris.rock@email.com'),
                     ('Bushido Bushali', '0780033958', 'bushido.bushali@email.com'),
                     ('Maleek Berry', '0734895855', 'maleek.berry@email.com'),
                     ('Mike Kayehuri', '0769785498', 'mike.kayehura@email.com');
                   INSERT INTO trips
                     (departure, destination, cost_amount, coordinates ,is_complete, rider_id, driver_id)
                     VALUES
                     ('Remera', 'Kagugu', 2000,'-1.956537,30.063616', false, 1, 3),
                     ('Kimironko', 'Rebero', 2000,'-1.956537,30.063616', true, 2, 1),
                     ('Nyabugogo', 'Nyanza', 3000,'-1.956537,30.063616', true, 3, 1),
                     ('Kanombe', 'Kabuga', '5000','-1.956537,30.063616', false, 2, 2),
                     ('Kicukiro', 'Gikondo', '1000','-1.956537,30.063616', false, 3, 3);
                   INSERT INTO invoices
                     (rider_id, driver_id, trip_id)
                     VALUES
                     (1, 1, 2),
                     (1, 2, 4),
                     (3, 1, 3),
                     (4, 1, 1),
                     (2, 1, 2);
                   `;
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = `
                    DROP TABLE IF EXISTS invoices;
                    DROP TABLE IF EXISTS drivers;
                    DROP TABLE IF EXISTS riders; 
                    DROP TABLE IF EXISTS trips;
                    `;
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool
      .query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
  seedDatabase,
  query,
};

require("make-runnable");
