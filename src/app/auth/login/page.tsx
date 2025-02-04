// src/app/auth/login/page.tsx
"use client"; // marks as a client side component as it uses react hooks

import LoginForm from "@/app/components/LoginForm";

/**
 * Login page component
 * Allows users to perform a login action
 * After a successful login, the user will be routed to the home page
 */
const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen px-4">
      <div className="max-w-[30rem] w-full p-6 rounded-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
