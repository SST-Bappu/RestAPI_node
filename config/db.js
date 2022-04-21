const Pool = require("pg").Pool;
const pool = new Pool({
  user: "cmtuser",
  host: "103.157.135.96",
  database: "cmtdb",
  password: "cmt12345",
  port: "5432",
});
module.exports = pool;

// const {
//     Sequelize,
//     DataTypes
// } = require("sequelize");

// const sequelize = new Sequelize('student_node', 'postgres', '12345', {
//     host: 'localhost',
//     dialect: 'postgres'
// });

// sequelize.authenticate()
//     .then(() => {
//         console.log('Datbase is connected');
//     })
//     .catch(err => {
//         console.log('Error : ', err)
//     })

// const db = {}

// db.Sequelize = Sequelize
// db.sequelize = sequelize

// module.exports=db

// function name to update updated_at is = update_modified_column()
// trigger to call update_modified_column is = trigger_update_time

// CREATE PROCEDURE register_user(character varying, character varying, character varying, character varying, character varying, bigint, boolean, boolean)
// LANGUAGE 'plpgsql'
// AS $$
// BEGIN

// INSERT INTO public.users (fname,uname,username,contactno,password,is_admin,is_hr,clientId)
// VALUES($1,$2,$3,$4,$5,$7,$8,$6);

// COMMIT;

// END;
// $$;
