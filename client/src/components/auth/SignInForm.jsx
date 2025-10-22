import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";

import { useIsAuthQuery } from "@/state/api";
import { useLoginMutation } from "@/state/api";


export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(null);
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  // console.log(isLoading, error);
  

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setRegistrationResult(null);

      // Call the register mutation
      const response = await login(data).unwrap()
      console.log("Response:", response);

      // Store the response to show appropriate message
      setRegistrationResult(response);

      // Check if user needs approval
      const needsApproval =
        response.user?.requestedRole && !response.user?.isApproved;

      if (needsApproval) {
        // Show approval pending message, then redirect after delay
        setTimeout(() => {
          navigate("/dashboard"); // or '/login' if you want them to wait
        }, 3000);
      } else {
        // Direct participant - redirect immediately
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setRegistrationResult({
        success: false,
        message:
          error?.data?.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedRole = form.watch("requestedRole");
  const requiresApproval = ["faculty", "organizer", "volunteer"].includes(
    selectedRole
  );


  return (
  <div className="max-w-md mx-auto p-6 space-y-6">
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold">Create Account</h1>
      <p className="text-gray-600">Join our campus community</p>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
            <Link 
              to="/forgot-password" 
              className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>

      
        <Button type="submit" className="w-full bg-amber-600 cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Login...
            </>
          ) : (
            "Login"
          )}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Register Here!{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </form>
    </Form>
  </div>
);
}
