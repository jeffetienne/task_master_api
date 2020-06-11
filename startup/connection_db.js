
var dbConfig = {  
    user: "sa",  
    password: "d0m5av5pr1n9fd5",  
    server: "localhost",  
    database: "creation_compte"  
};

module.exports = {
    connectToDb: async function (sql){
        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(dbConfig);
            console.log('connection successfull...');
        } catch (err) {
            // ... error checks
            console.log('Erreur lors de la connection - ' + err);
        }
    }
}