"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function withAuth(WrappedComponent) {
  return function AuthHOC(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.replace("/auth/login");
      }
    }, [status, router]);


    if (status === "authenticated") {
      return <WrappedComponent {...props} />;
    }

    return null; 
  };
}

export default withAuth;