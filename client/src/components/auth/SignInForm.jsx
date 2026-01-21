import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
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
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";

import { useIsAuthQuery } from "@/state/api";
import { useLoginMutation } from "@/state/api";


export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const { data: authData } = useIsAuthQuery();

  useEffect(() => {
    if (authData?.user) {
      navigate("/dashboard");
    }
  }, [authData, navigate]);

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
      const response = await login(data).unwrap();
      toast.success("Welcome back!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-300">Sign in to continue to CampusSync</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>

            <p className="text-center text-sm text-slate-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
