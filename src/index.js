const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const myconn = require('express-myconnection');

const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 3000); //Process.env.port para cuando sea despleagdo
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const dbConfig = {
    host: 'cinefilo.mysql.database.azure.com',
    port: 3306,
    user: 'xaxi',
    password: 'EnanitosVerdesG5',
    database: 'cinefilo',
    dialect: "mysql",
    ssl: {
        rejectUnauthorized: false
    },
    dialectOptions: {
       ssl: {
          require: true
       }
     }
};

app.use(myconn(mysql, dbConfig, 'single'));

app.use('/cineapp', routes);

app.listen(app.get('port'), ()=>{
    console.log('Server running on port', app.get('port'));
})
