const axios = require('axios');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

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
    customers: {
      type: new GraphQLList(CustomerType),
      async resolve(parentVal, args) {
        const { data } = await axios.get('http://localhost:3000/customers');

        return data;
      },
    },
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(parentVal, args) {
        const { data } = await axios.get(
          `http://localhost:3000/customers/${args.id}`
        );

        return data;
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      async resolve(parentVal, args) {
        const newCustomerObj = {
          name: args.name,
          email: args.email,
          age: args.age,
        };

        const { data } = await axios.post(
          'http://localhost:3000/customers',
          newCustomerObj
        );

        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
