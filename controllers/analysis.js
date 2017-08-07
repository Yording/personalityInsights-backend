'user strict'

// Dependencias
var executeQuery = require('../middlewares/executequery')
var PersonalyInsightsV3 = require('watson-developer-cloud/personality-insights/v3')
var sql = require('mssql')

// Variables
var query = '';


function recursiveParsingAnalysis(obj) {
    var nuevo = {};
    keys = Object.keys(obj);
    if (obj.name) {
        nuevo.name = obj.name;
    }

    if (obj.percentile) {
        nuevo.size = obj.percentile;
    }
    if (obj.children) {
        nuevo.children = [];
        obj.children.map(function(ele) {
            nuevo.children.push(recursiveParsingAnalysis(ele))
        })
    }

    if (obj.consumption_preferences) {
        nuevo.children = [];
        obj.consumption_preferences.map(function(ele) {
            nuevo.children.push(recursiveParsingAnalysis(ele))
        })

    } else {
        if (obj.score) {
            nuevo.size = obj.score;
        }
    }
    return nuevo;
}


module.exports = {
    getAnalysiss: function(req, res) {
        query = `SELECT a.[id]
                ,a.[id_study]
                ,a.[id_candidate]
                ,c.[name] candidate
                ,o.[name] organization
                ,a.[analisys]
                ,a.[observations]
                ,a.[date_created]
            FROM [dbo].[analisys] a INNER JOIN
                [dbo].[study] s ON a.[id_study] = s.[id] INNER JOIN
                [dbo].[organization] o ON s.[id_organization] = o.[id] INNER JOIN
                [dbo].[candidate] c ON a.[id_candidate] = c.[id_user]
            WHERE s.[id] = ${req.params.id_user}`
        executeQuery(res, query)
    },
    getAnalysis: function(req, res) {
        query = `SELECT a.[id]
                ,a.[id_study]
                ,a.[id_candidate]
                ,c.[name] candidate
                ,o.[name] organization
                ,a.[analisys]
                ,a.[observations]
                ,a.[date_created]
            FROM [dbo].[analisys] a INNER JOIN
                [dbo].[study] s ON a.[id_study] = s.[id] INNER JOIN
                [dbo].[organization] o ON s.[id_organization] = o.[id] INNER JOIN
                [dbo].[candidate] c ON a.[id_candidate] = c.[id_user]
            WHERE a.[id] = ${req.params.id}`
        executeQuery(res, query)

    },
    parsingAnalysis: function(req, res) {
        var request = new sql.Request();
        query = "SELECT A.[id], A.[id_study], A.[id_candidate], A.[analisys], A.[observations], A.[date_created] FROM [dbo].[analisys] A INNER JOIN [dbo].[candidate] C ON A.[id_candidate] = C.[id_user] INNER JOIN [dbo].[study] S ON A.[id_study] = S.[id] WHERE A.[id] = " + req.params.id
            // query
        request.query(query, function(err, analysis) {
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).send(err);
            } else {
                var data = JSON.parse(analysis.recordset[0]['analisys'])

                var personality = {
                    name: 'personality',
                    children: []
                };
                var needs = {
                    name: 'needs',
                    children: []
                };
                var values = {
                    name: 'values',
                    children: []
                };
                var consumption_preferences = {
                    name: 'consumption_preferences',
                    children: []
                };
                var wrapped = {
                    name: 'altogether',
                    children: [personality, needs, values, consumption_preferences]
                };
                data.personality.map(function(ele) {
                    personality.children.push(recursiveParsingAnalysis(ele));
                });
                data.needs.map(function(ele) {
                    needs.children.push(recursiveParsingAnalysis(ele));
                });
                data.values.map(function(ele) {
                    values.children.push(recursiveParsingAnalysis(ele));
                });
                data.consumption_preferences.map(function(ele) {
                    consumption_preferences.children.push(recursiveParsingAnalysis(ele));
                });

                analysis.recordset[0].analisys = wrapped;
                res.status(200).send(analysis.recordset[0]);
            }
        });
    },
    createAnalysis: function(req, res) {
        var personalyInsights = new PersonalyInsightsV3({
            "url": "https://gateway.watsonplatform.net/personality-insights/api",
            "username": "30d890a0-9314-4283-9095-20455e2679e6",
            "password": "LKAwUGd0jS2k",
            "version_date": '2016-10-20',
            "headers": {
                'X-Watson-Learning-Opt-Out': 'true'
            }
        });

        var params = {
            text: req.body.text,
            // content_items: require('./data/profile.json').contentItems,
            consumption_preferences: true,
            raw_scores: true,
            headers: {
                'accept-language': 'en',
                'accept': 'application/json'
            }
        };

        personalyInsights.profile(params, function(err, data) {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: `Error al realizar al consultar el servicio en watson: ${err}` })
            } else {
                // * En este query debe ir el update que actualizara el analisis que devuelve watson
                // console.log(`${unescape(JSON.stringify(data))}`)
                query = `INSERT INTO [dbo].[analisys] ([id_study], [id_candidate], [analisys], [observations], [date_created]) VALUES (${req.body.id_study}, ${req.body.id_candidate}, N'${JSON.stringify(data)}', '', GETDATE())`;
                executeQuery(res, query)
            }
        })

    },
    updateAnalysis: function(req, res) {
        query = "UPDATE A SET A.[observations] = '" + req.body.observations + "' FROM [dbo].[analisys] A INNER JOIN [dbo].[study] S ON A.[id_study] = S.[id] WHERE A.[id] = " + req.params.id;
        executeQuery(res, query)
    },
    deleteAnalysis: function(req, res) {
        query = "DELETE A FROM [dbo].[analisys] A INNER JOIN [dbo].[study] S ON A.[id_study] = S.[id] WHERE A.[id] = " + req.params.id;
        executeQuery(res, query)
    }
}