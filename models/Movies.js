const db = require("../helper/db_conn")
const table = "movies"
module.exports = {
  getAllMovies: (req, res) => {
    return new Promise((resolve, reject) => {
      const { title = "", director = "" } = req.query
      const sql = `SELECT * FROM ${table} ${
        title ? `WHERE title LIKE '%${title}%'` : title && director
      } ${
        director ? `AND director LIKE '%${director}%'` : ""
      } ORDER BY release_date DESC`
      db.query(sql, (err, results) => {
        if (err) {
          reject({ message: "ada error" })
        }
        resolve({
          message: "Get All Movies Success",
          status: 200,
          data: results,
        })
      })
    })
  },
  addMovies: (req, res) => {
    return new Promise((resolve, reject) => {
      const {
        title,
        cover,
        release_date,
        director,
        description,
        casts,
        categories,
      } = req.body
      db.query(
        `INSERT INTO ${table}(title, cover, release, director, description, casts, categories) VALUES ('${title}', '${cover}','${release_date}','${director}','${description}','${casts}','${categories}')`,
        (err, results) => {
          if (err) {
            reject({ message: "ada error" })
          }
          resolve({
            message: "Add Movies Success",
            status: 200,
            data: {
              ...req.body,
            },
          })
        },
      )
    })
  },
  updateMovies: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params
      db.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, results) => {
        if (err) {
          res.send({ message: "ada error" })
        }

        const prevData = {
          ...results[0],
          ...req.body,
        }
        const {
          title,
          cover,
          release_date,
          director,
          description,
          casts,
          categories,
        } = prevData

        db.query(
          `UPDATE ${table} SET title='${title}', cover='${cover}', release='${release_date}', director='${director}', description='${description}', casts='${casts}', categories='${categories}'`,
          (err, results) => {
            if (err) {
              reject({ message: "ada error" })
            }
            resolve({
              message: "Update Movies Success",
              status: 200,
              data: results,
            })
          },
        )
      })
    })
  },
  removeMovies: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params
      db.query(`DELETE FROM ${table} WHERE id = ${id}`, (err, results) => {
        if (err) {
          reject({ message: "ada error" })
        }
        resolve.send({
          message: "Delete Movies Success",
          status: 200,
          data: results,
        })
      })
    })
  }
}
