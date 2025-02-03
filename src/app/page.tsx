"use client"; // Marks this as a client component
import { useLogout } from "@/api/hooks/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import the Root State type
import { useRouter } from "next/navigation"; // use the router to redirect the user
import LoginForm from "./components/LoginForm";

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
      router.push("/auth/login"); // Move to the login page
    }
  };

  return (
    <main>
    {/* If user is logged in, then show the details and log out button */}
    {user ? (
      <div>
        <div>
          You are logged in as {user.email} with role {user.roleType}
        </div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    ) : (
      // Center the LoginForm specifically
      <div className="flex justify-center items-center h-screen px-4">
        <div className="max-w-[30rem] w-full p-6 rounded-lg">
          <LoginForm />
        </div>
      </div>
    )}
  </main>
  );
}