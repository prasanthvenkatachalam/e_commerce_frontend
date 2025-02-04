"use client"; // Marks this as a client component
import { useLogout } from "@/api/hooks/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import the Root State type
import { useRouter } from "next/navigation"; // use the router to redirect the user
import Loading from "./components/common/Loading";
import { useEffect } from "react";
import Cookies from 'js-cookie';

/**
 * Component for main page.
 * Will show a welcome message with a logout button when logged in.
 * Otherwise will show the login form.
 */
export default function Home() {
  // Get user details from the store
  const { token, user } = useSelector((state: RootState) => state.auth);
  // Get the logout mutation hook.
  const { mutate: logout } = useLogout();
  // Use the router from next navigation to move the user
  const router = useRouter();

  /**
   * Function that calls the logout method from the hook.
   * This will invalidate the session, and then redirect the user to the login page.
   */
  const handleLogout = () => {
    if (token) {
      logout(token); // if user exists, call the logout mutation
      Cookies.remove('auth_token');
      router.push("/auth/login"); // Move to the login page
    }
  };

useEffect(() => {
  if (!user) {
    router.replace("/auth/login");
  }
}, [token, router]);

  if (!user) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
     
        <div>
          <div>
            You are logged in as {user.email} with role {user.roleType}
          </div>
          <button onClick={handleLogout}>Log out</button>
        </div>
     
    </main>
  );
}
