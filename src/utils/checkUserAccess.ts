
export const checkUserAccess = async(prisma:any,userId:any,postId:any)=>{

    console.log(userId,postId);

    const user = await prisma.user.findUnique({
        where:{
            id:userId
        }
    })
   
    if(!user){
        return {
            userError:"you are not authorize",
            post: null
        }
    }

    const post =  await prisma.post.findUnique({
        where:{
            id:postId
        }
    })

    if(!post){
        return {
            userError:"post not found",
            post: null
        }
    }
    
    if(post.authorId !== userId){
        return{
            userError:"you are not authorize",
            post:null
        }
    }




}