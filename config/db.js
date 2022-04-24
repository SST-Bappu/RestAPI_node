const { candidateDataValidate } = require("../validation/candidate.validation");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "cmtuser",
  host: "103.157.135.96",
  database: "cmtdb",
  password: "cmt12345",
  port: "5432",
});
(async function () {
  const client = await pool.connect();
  await client.query("SELECT NOW()");
  client.release();
})();

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

// CREATE TRIGGER update_candidate_updateTime BEFORE UPDATE ON public.candidate FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

// CREATE PROCEDURE register_user(character varying, character varying, character varying, character varying, character varying, bigint, boolean, boolean)
// LANGUAGE 'plpgsql'
// AS $$
// BEGIN

// INSERT INTO public.users (fname,uname,username,contactno,password,is_admin,is_hr,clientId)
// VALUES($1,$2,$3,$4,$5,$7,$8,$6);

// COMMIT;

// END;
// $$;

// ------function to get user by id

// CREATE OR REPLACE FUNCTION getUserByUsername(email character varying)
// RETURNS TABLE (fname character varying,uname character varying, username character varying, password character varying, contactno character varying, clientId bigint,is_admin boolean, is_hr boolean,is_active boolean)
// AS
// $$

// BEGIN
// 	RETURN QUERY
// 		SELECT users.fname,users.uname,users.username,users.password,users.contactno,users."clientId",users.is_admin,users.is_hr,users.is_active
// 		FROM users
// 		where users.username = email;
// END;

// $$ LANGUAGE plpgsql;

// //-----add candidate----
// CREATE PROCEDURE add_candidate(character varying, character varying, character varying, integer,integer, character varying, bytea, bytea, character varying, character varying)
//  LANGUAGE 'plpgsql'
//  AS $$
//  BEGIN

//  INSERT INTO public.users (fname,pre_emp,cur_job,cur_ctc,exp_ctc,notice_period,photo,resume,contactno,email)
//  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9);

// COMMIT;

// END;
// $$;

// CREATE OR REPLACE FUNCTION getCandidateByid(id bigint)
// RETURNS TABLE (fname character varying,pre_emp character varying, cur_job character varying, cur_ctc integer, notice_period character varying, photo bytea,resume bytea,contactno character varying, email character varying)
// AS
// $$

// BEGIN
// 	RETURN QUERY
// 		SELECT candidate.fname,candidate.pre_emp,candidate.cur_job,candidate.exp_ctc,candidate.notice_period,candidate.photo,candidate.resume,candidate.contactno,candidate.email
// 		FROM candidate
// 		where candidate.id = id;
// END;

// $$ LANGUAGE plpgsql;

// //-----update candidate----
// CREATE PROCEDURE update_candidate(character varying, character varying, character varying, integer,integer, character varying, bytea, bytea, character varying, character varying, bigint)
//  LANGUAGE 'plpgsql'
//  AS $$
//  BEGIN

//  UPDATE public.candidate
//  SET fname=$1,pre_emp=$2,cur_job=$3,cur_ctc=$4,exp_ctc=$5,notice_period=$6,photo=$7,resume=$8,contactno=$9,email=$10)
//  WHERE candidate.id = $11

// COMMIT;

// END;
// $$;

// ----------get all candidate

// CREATE OR REPLACE FUNCTION getCandidateByid(id bigint)
// RETURNS TABLE (id bigint, fname character varying,pre_emp character varying, cur_job character varying, cur_ctc integer, notice_period character varying, photo bytea,resume bytea,contactno character varying, email character varying)
// AS
// $$

// BEGIN
// 	RETURN QUERY
// 		SELECT candidate.id,candidate.fname,candidate.pre_emp,candidate.cur_job,candidate.exp_ctc,candidate.notice_period,candidate.photo,candidate.resume,candidate.contactno,candidate.email
// 		FROM candidate
// 		where candidate.id = id;
// END;

// $$ LANGUAGE plpgsql;

// create function GetEmployees() returns setof employee as 'select * from employee;' language 'sql';
// select * from GetEmployees() where id > 2;

// //-----delete candidate----
// CREATE PROCEDURE delete_candidate(bigint)
//  LANGUAGE 'plpgsql'
//  AS $$
//  BEGIN

//  DELETE FROM public.users
// WHERE candidate.id = $1

// COMMIT;

// END;
// $$;
