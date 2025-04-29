

export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  posts: async (parent: any, args: any, { prisma,userInfo }: any) => {
    return await prisma.post.findMany();
  },
  me: async(__parent:any,__:any,{prisma,userInfo}:any)=>{

    return await prisma.user.findUnique({
      where: {
         useId: userInfo.userId
      }
    })

  },

  profile: async(parent:any,args:any,{prisma,userInfo}:any)=>{
    return await prisma.profile.findUnique({
      where: {
        id: Number(args.userId)
      }
    })
  }
};
