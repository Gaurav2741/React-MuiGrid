import express from 'express';
import http from 'http';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLScalarType, Kind, buildSchema } from 'graphql';
import mongoose from 'mongoose';
import cors from 'cors';


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Mongoose Model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  job_title: String,
  joining_date: Date,
  content: String
}));

// Express App Setup
const app = express();
app.use(express.json({ limit: '16mb' }));
app.use(cors());

// Custom GraphQL Scalar for Date
const resolverDate = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};

// GraphQL Schema Definition
const schema = buildSchema(`
  scalar Date

  type User {
    id: ID
    name: String
    email: String
    job_title: String
    joining_date: Date
    content: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String, email: String, job_title: String, joining_date: Date, content: String): Boolean
    updateUser(id: ID!, name: String, email: String, job_title: String, joining_date: Date, content: String): Boolean
    deleteUser(id: ID!): Boolean
  }
`);

// GraphQL Root Resolver
const root = {
  ...resolverDate,

  getUsers: async () => {
    return await User.find();
  },

  getUser: async ({ id }) => {
    return await User.findById(id);
  },

  createUser: async ({ name, email, job_title, joining_date, content }) => {
    const user = new User({ name, email, job_title, joining_date, content });
    await user.save();
    return true;
  },

  updateUser: async ({ id, name, email, job_title, joining_date, content }) => {
    const result = await User.updateOne(
      { _id: id },
      { $set: { name, email, job_title, joining_date, content } }
    );
    return result.modifiedCount > 0;
  },

  deleteUser: async ({ id }) => {
    const result = await User.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
};

// Mount GraphQL API
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

// Start Server
const httpServer = http.createServer(app);
httpServer.listen(4000, () => {
  console.log('🚀 GraphQL API running at http://localhost:4000/graphql');
});
