module.exports = {
    port: process.env.PORT || 3000,
    dbConfig: {
        user: "PersonalityML",
        password: "Colombia10",
        server: "personalityinsights.database.windows.net",
        database: "PersonalityML",
        options: {
            encrypt: true // Use this if you're on Windows Azure 
        }
    },
    SECRET_TOKEN: 'personality_insights2017Ml*'
}