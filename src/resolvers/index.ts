import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient()

interface userInfo {
    name: string,
    email: string,
    password: string
}


export const resolvers = {
    Query: {
        me:{
            
        }
  
    },
    Mutation:{
        signup:async(parent:any,args:userInfo,context:any)=>{
   
            return await prisma.user.create({
                data:args
            })

        }
    }
  };