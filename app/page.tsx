import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {
  // Check if user is authenticated
  const session = await auth();
  
  // Redirect based on auth status
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/sign-in");
  }
}