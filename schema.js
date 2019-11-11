const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

// Hardcoded Data
const customersArr = [
  { id: 1, name: 'Clark Kent', email: 'superman@email.com', age: 35 },
  { id: 2, name: 'Bruce Wayne', email: 'batman@email.com', age: 30 },
  { id: 3, name: 'Peter Parker', email: 'spiderman@email.com', age: 25 },
];

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve(parentVal, args) {
        for (let i = 0; i < customersArr.length; i++) {
          let curCustomer = customersArr[i];

          if (curCustomer.id === args.id) {
            return curCustomer;
          }
        }
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentVal, args) {
        return customersArr;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
