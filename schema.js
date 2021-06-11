const { 
    GraphQLSchema,
    GraphQLObjectType,
     GraphQLString,
      GraphQLInt,      
      GraphQLList
     } = require("graphql")


//hard coded data
const customers = [
    {id : "1" , name : 'John Doe' , email : 'john@gmail.com' , age : 25},
    {id : "2" , name : 'Jim Collins' , email : 'jim@gmail.com' , age : 55},
    {id : "3" , name : 'Sarah Fisher' , email : 'sarah@gmail.com' , age : 45},
]

//customer type
const CustomerType = new GraphQLObjectType({
    name : 'Customer',
    fields : ()=>({
        id : {type : GraphQLString},
        name : {type : GraphQLString},
        email : {type : GraphQLString},
        age : {type : GraphQLInt},
    })
})




//RootQuery
const RootQuery  = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        customer : {
            type : CustomerType,
            args : {
                id : {type : GraphQLString}
            },
            resolve : (parent , args)=>{
              for(let i = 0 ; i < customers.length ; i++){
                  if(customers[i].id === args.id){
                      return customers[i]   
                  }
              }
            }
        },
        customers : {
            type : new GraphQLList(CustomerType),
            resolve : (parent , args)=>{
                return customers
            }
        }
    }
})


module.exports = new GraphQLSchema ({
    query  : RootQuery
})