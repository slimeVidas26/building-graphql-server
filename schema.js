const axios = require('axios')

const { 
    GraphQLSchema,
    GraphQLObjectType,
     GraphQLString,
      GraphQLInt,      
      GraphQLList,
      GraphQLNonNull
     } = require("graphql")


//hard coded data
// const customers = [
//     {id : "1" , name : 'John Doe' , email : 'john@gmail.com' , age : 25},
//     {id : "2" , name : 'Jim Collins' , email : 'jim@gmail.com' , age : 55},
//     {id : "3" , name : 'Sarah Fisher' , email : 'sarah@gmail.com' , age : 45},
// ]

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
            //   for(let i = 0 ; i < customers.length ; i++){
            //       if(customers[i].id === args.id){
            //           return customers[i]   
            //       }
            //   }
            return axios.get(`http://localhost:3000/customers/${args.id}`)
            .then((res)=>res.data)
            }
        },
        customers : {
            type : new GraphQLList(CustomerType),
            resolve : (parent , args)=>{
                return axios.get(`http://localhost:3000/customers`)
                .then((res)=>res.data)
            }
        }
    }
})


//mutation
const mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        removeCustomer : {
            type : CustomerType,
            args : {
                id : {type : new GraphQLNonNull(GraphQLString) },
              
            },
            resolve : (parent , args)=>{
               return axios.delete('http://localhost:3000/customers/' +args.id )
               .then((res)=> res.data)
            }
        },
        addCustomer : {
            type : CustomerType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString) },
                email : {type : new GraphQLNonNull(GraphQLString) },
                age : {type : new GraphQLNonNull(GraphQLInt) }
            },
            resolve : (parent , args)=>{
               return axios.post('http://localhost:3000/customers' , {
                   name:args.name,
                   email : args.email,
                   age : args.age
               })
               .then((res)=> res.data)
            }
        },
        editCustomer : {
            type : CustomerType,
            args : {
                id : {type : new GraphQLNonNull(GraphQLString )},
                name : {type : GraphQLString },
                email : {type : GraphQLString},
                age : {type :GraphQLInt }
              
            },
            resolve : (parent , args)=>{
               return axios.patch('http://localhost:3000/customers/' +args.id , args )
               .then((res)=> res.data)
            }
        }
    }

})


module.exports = new GraphQLSchema ({
    query  : RootQuery,
    mutation
})