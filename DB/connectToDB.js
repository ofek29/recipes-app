// const sql = require('mssql');
// require('dotenv').config(); //error handaling?!
// //console.log(process.env)

// const config = {
//     user: 'SA', //process.env.USER,
//     password: '12345678Qwe', // process.env.PASSWORD,
//     server: 'localhost', //process.env.SERVER, // You might need to change this depending on your MSSQL server setup
//     database: 'recipesapp', //process.env.DATABASE,
//     port: 1402, //  TODO  PORT='1433' .env
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: true, // For Azure Databases
//         //enableArithAbort: true,
//         trustServerCertificate: true // For development only
//     }
// };

// //error handling?!?
// const appPool = new sql.ConnectionPool(config)
// appPool.connect()
//     .then(pool => {
//         console.log('Connected to MSSQL');
//         return pool;
//     })
//     .catch(err => console.log('Database Connection Failed! Bad Config: ', err));


// // Export the connection server and pool
// module.exports = {
//     sql,
//     appPool,
// };