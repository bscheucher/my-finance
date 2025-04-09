import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card-auth";
import CredentialsSignInForm from "./credentials-signin-form";
import { APP_NAME } from "@/lib/constants";
import GoogleLoginButton from "./google-sign-in-button";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();
  if (session) {
    return redirect(callbackUrl || "/");
  }
  console.log("GOOGLE_ID:", process.env.GOOGLE_ID);
  console.log("GOOGLE_SECRET:", process.env.GOOGLE_SECRET);
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              priority={true}
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
          <GoogleLoginButton />
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
