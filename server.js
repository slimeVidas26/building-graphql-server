const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema')

const app = express();

//path to graphql-server
app.use('/graphql' , graphqlHTTP({   
    schema : schema,
    graphiql : true
}));



//server
const port = process.env.port || 4000
app.listen(port, ()=>{
    console.log(`listen on port ${port}`)
})