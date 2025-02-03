// src/app/auth/login/page.tsx
'use client' // marks as a client side component as it uses react hooks
import { useLogin } from "@/api/hooks/useLogin";
import { useRouter } from "next/navigation" // Use navigation hook to redirect

 /**
  * Login page component
  * Allows users to perform a login action
  * After a successful login, the user will be routed to the home page
  */
 const Login = () => {
   // Get login mutation from custom hook
    const {isLoading, mutate:login } = useLogin()
    // Get a router object from the router hook
    const router = useRouter();
    /**
      * Function that calls the login mutation
      * This will perform a login with hardcoded values
      * and then route to the home page after login is complete.
      */
    const handleLogin = ()=>{
        login({email:"super.admin@example.com", password:"123"}) // Log in with hardcoded details
        router.push('/') // Redirect the user to home
     }

   return (
          <div>
             <h1>Login</h1>
            {/*Show loader when the api is called*/}
             {isLoading && <div>Loading...</div>}
             <button onClick={handleLogin}>Login</button>
          </div>
         )
        }

export default Login