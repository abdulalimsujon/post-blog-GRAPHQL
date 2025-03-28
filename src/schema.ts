export const typeDefs = `#graphql

type Query {
  me: User
  users: [User]
  posts: [Post]
}

type Mutation {
  signup(name: String!, email: String!, password: String!): AuthPayload
  signIn(email:String! ,password: String!): AuthPayload
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User
  createdAt: String!
  published: Boolean!
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String
  createdAt: String!
  posts: [Post]
}

type Profile {
  id: ID!
  bio: String!
  createdAt: String!
  user: User!
}

# New type to represent the auth payload
type AuthPayload {
  token: String
}

`;
