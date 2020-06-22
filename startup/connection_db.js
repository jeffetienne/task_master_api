const Sequelize = require('sequelize');
const { DataTypes, Model } = require('sequelize');
const sql = require('mssql');
//*
module.exports = new Sequelize('task_master', 'sa', 'd0m5av5pr1n9fd5', {
    dialect: 'mssql',
    host: 'localhost',
    logQueryParameters: true,
    freezeTableName: true,
    dialectOptions: {
        encrypt: true
    }
});

/*/
var dbConfig = {  
    user: "sa",  
    password: "d0m5av5pr1n9fd5",  
    server: "localhost",  
    database: "task_master"  
};//*/

/*/
module.exports = {
    connectToDb: async function (){
        /*
        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(dbConfig);
            console.log('connection successfull...');
        } catch (err) {
            // ... error checks
            console.log('Erreur lors de la connection - ' + err);
        }

        sequelize.authenticate().then((err) => {
            console.log('Connection successful', err);
            
        })
        .catch((err) => {
            console.log('Unable to connect to database', err);
        });
    }
}//*/