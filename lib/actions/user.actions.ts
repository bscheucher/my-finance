"use server";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { signUpFormSchema, signInFormSchema } from "../validators";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

// Sign user out
export async function signOutUser() {
  await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        fullName: user.name,
        email: user.email,
        passwordHash: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("Error signing up user", error);
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");
  return user;
}

export async function createUserFromGoogle(userEmail: string) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: userEmail },
    });

    if (existingUser) {
      return existingUser; // User already exists
    }

    // Extract the username from the email
    const username = userEmail.split("@")[0];

    // Truncate the username to a maximum of 12 characters
    const truncatedUsername = username.substring(0, 12);

    const newUser = await prisma.user.create({
      data: {
        fullName: truncatedUsername,
        email: userEmail,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user from Google:", error);
    throw error; // Rethrow the error for handling elsewhere
  }
}
