const pool = require("../db");
const md5 = require("md5");

const getUser = async (user, pass) => {
  const query = "select * from autorizados where usuario = ? and password = ?";
  const row = await pool.query(query, [user, md5(pass)]);
  return row[0];
};
module.exports = { getUser };
