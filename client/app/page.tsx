import Image from "next/image";
import GoogleSignInButton from "./auth/GoogleSignInButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthInterceptorTest from "./components/test/AuthInterceptorTest";

export default function Home() {
  console.log("GOOGLE CLIENT ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  return (
    <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      
    </div>
  );
}
