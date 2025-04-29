import { Post } from "../post";
import { Profile } from "../Profile";
import { User } from "../user";
import { Mutation } from "./Mutation/mutation";
import { Query } from "./Query/query";


export const resolvers = {
  Query,
  Post,
  User,
  Profile,
  Mutation,
};
