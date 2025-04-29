export const User = {
    posts:async(parent:any,args:any,{prisma,userInfo}:any)=>{
  

        const myProfile =  parent.id === userInfo.id;

        if(myProfile){
            return await prisma.post.findMany({
                where:{
                    id:parent.id
                }
            })

        }else{
            return await prisma.post.findMany({
                where:{
                    id:parent.id,
                    published: true,
                }
            })
        }
     
       

    }
}