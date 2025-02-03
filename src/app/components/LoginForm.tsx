// src/components/LoginForm.tsx
"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/api/hooks/useLogin';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password cannot exceed 100 characters'),
});

type LoginSchema = z.infer<typeof loginSchema>;

/**
 * LoginForm component using react-hook-form for validation.
 */
const LoginForm = () => {
    const { mutate: login, isLoading } = useLogin();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });


    /**
     * Function that is called when a user submits the form.
     * Will call the login function from the login hook.
     * and will push the user to the homepage.
     */
    const onSubmit = async (data:LoginSchema) => {
        await login(data)
        router.push('/');
    };

    return (
        <div className="flex justify-center items-center h-screen container"> {/* Used flex to center, and the container class for padding */}
            <div className="border p-4 rounded-md w-[30rem]"> {/* Set width and style of the form */}
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                 <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                     <div className="flex flex-col space-y-2">
                         {/* Label for the Email input */}
                        <Label htmlFor="email">Email</Label>
                        {/* Input for the email field*/}
                        <Input
                           type="email"
                           id="email"
                           placeholder="Enter your email address"
                           autoComplete='email'
                           {...register('email')} // Use the register method to register this field to use in formik
                        />
                         {/* Show a validation message for the email input*/}
                         {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                           </p>
                        )}
                   </div>
                    <div className="flex flex-col space-y-2">
                       {/* Label for the password input */}
                       <Label htmlFor="password">Password</Label>
                        {/* Input for the password field */}
                        <Input
                           type="password"
                           id="password"
                           placeholder="Enter your password"
                           autoComplete='current-password'
                           {...register('password')} // Use the register method to register this field to use in formik
                            />
                          {errors.password && (
                              <p className="text-sm text-destructive">
                                 {errors.password.message}
                              </p>
                            )}
                      </div>
                    {/* Button to submit the form */}
                    <Button className="w-full mt-4" disabled={isLoading} type="submit">
                       {isLoading ? 'Logging In...' : 'Login'}
                    </Button>
                 </form>
            </div>
        </div>
    );
};

export default LoginForm;