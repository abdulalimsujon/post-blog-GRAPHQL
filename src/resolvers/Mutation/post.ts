import { checkUserAccess } from "../../utils/checkUserAccess";

export const postResolvers = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return { userError: "unauthorize access", post: null };
    }
    if (!post.title || !post.content) {
      return {
        userError: "title or content are required",
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },
  updatePost: async (parent: any, args: any, { prisma, userInfo }:any) => {
    console.log(args);
    if (!userInfo) {
      return { userError: "unauthorize access", post: null };
    }

    const user = await prisma.user.findFirst({
      where: {
        id: args.postId,
      },
    });

    if (!user) {
      return {
        useError: "user not found",
        post: null,
      };
    }

    const post = await prisma.post.findFirst({
      where: {
        id: Number(args.postId),
      },
    });

    if (!post) {
      return {
        userError: "post not found",
        post: null,
      };
    }

    if (post.authorId !== user.authorId) {
      return {
        userError: "you can not update post",
        post: null,
      };
    }

    const updatePost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      userError: null,
      post: updatePost,
    };
  },
  publishedPost: async (parent: any, args: any, { prisma, userInfo }:any) => {

    if (!userInfo) {
      return { userError: "unauthorize access", post: null };
    }

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userInfo.userId),
      },
    });

    if (!user) {
      return {
        useError: "user not found",
        post: null,
      };
    }


    const post = await prisma.post.findFirst({
      where: {
        id: Number(args.postId),
      },
    });

    if (!post) {
      return {
        userError: "post not found",
        post: null,
      };
    }

    console.log(post.authorId,)

    if (post.authorId !== userInfo.userId) {
      return {
        userError: "you can not update post",
        post: null,
      };
    }

    const updatePost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true
      },
    });

    return {
      userError: null,
      post: updatePost,
    };
  },
  deletePost: async (parent: any, args: any, { prisma, userInfo }:any) => {

   

    const error  = await checkUserAccess(prisma,Number(userInfo.userId),Number(args.postId))

    if (error) {
      return {
        userError: "you can not delete post",
        error: error,
      };
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      }
    });

    return {
      userError: null,
      post: deletePost,
    };
  },


};
