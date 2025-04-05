import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface userInfo {
  name: string;
  email: string;
  password: string;
}

export const Mutation = {
  signup: async (parent: any, args: userInfo, { prisma }: any) => {
    const hashPassword = await bcrypt.hash(args.password, 12);

    const newUser = await prisma.user.create({
      data: { name: args.name, email: args.email, password: hashPassword },
    });

    const token = jwt.sign({ userId: newUser.id }, "fajf", {
      expiresIn: "1d",
    });
  },

  signIn: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (!user) {
      return { token: null };
    }

    const correctPass = await bcrypt.compare(args.password, user.password);
    if (!correctPass) {
      return { token: null };
    }

    const token = jwt.sign({ userId: user.id }, "fajf", {
      expiresIn: "1d",
    });
  },
};
