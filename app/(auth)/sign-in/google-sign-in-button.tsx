"use client";

import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.65 1.25 9.12 3.32l6.82-6.82C35.67 2.32 30.2 0 24 0 14.64 0 6.65 5.64 2.92 13.84l8.19 6.36C13.06 13.17 18.03 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.08 24.47c0-1.58-.14-3.1-.4-4.56H24v9.04h12.56c-.61 3.05-2.35 5.63-4.87 7.41l7.46 5.8c4.37-4.05 6.93-10.02 6.93-16.69z"
        />
        <path
          fill="#FBBC05"
          d="M11.11 28.56c-1.07-3.21-1.07-6.91 0-10.12l-8.19-6.36c-3.48 6.94-3.48 15.26 0 22.2l8.19-6.36z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.2 0 11.67-2.02 15.88-5.48l-7.46-5.8c-2.17 1.45-4.88 2.32-7.89 2.32-5.97 0-10.94-3.67-13.88-8.7l-8.19 6.36C6.65 42.36 14.64 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
      </svg>
      Sign in with Google
    </button>
  );
}
