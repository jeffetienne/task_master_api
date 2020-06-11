module.exports = {
    insertLog: async function (sql, table, champ, action, ancienne, nouvelle, utilisateur) {
        await sql.query(`INSERT INTO [dbo].[log_modification]
                                                ([action]
                                                ,[table_modifiee]
                                                ,[champ_modifie]
                                                ,[ancienne_valeur]
                                                ,[nouvelle_valeur]
                                                ,[modifie_par]
                                                ,[modifie_le])
                                            VALUES
                                                (${action}
                                                ,'${table}'
                                                ,'${champ}'
                                                ,'${ancienne}'
                                                ,'${nouvelle}'
                                                ,'${utilisateur}'
                                                ,getdate())`);
    }
}
