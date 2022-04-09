const express = require('express')
const routes = require('./index-routes');
const {
    Sequelize
} = require('sequelize');
const app = express();
const port = 3000;
app.use(express.json());

// const sequelize = new Sequelize('student_node', 'postgres', '12345', {
//     host: 'localhost',
//     dialect: 'postgres'
// });

// sequelize.authenticate()
//     .then(() => {

//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {

//         console.error('Unable to connect to the database:', error);
//     });




app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});

app.use('/api', routes);
app.listen(port, () => console.log(`app listening on port ${port}`));