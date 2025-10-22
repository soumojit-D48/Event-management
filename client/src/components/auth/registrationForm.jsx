import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/lib/schemas";

import { useIsAuthQuery } from "@/state/api";
import { useRegisterMutation } from "@/state/api";

// const useRegisterMutation = () => {
//   return [
//     async (data) => {
//       // Simulated API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const needsApproval =
//         data.requestedRole &&
//         ["faculty", "organizer", "volunteer"].includes(data.requestedRole);

//       return {
//         unwrap: () =>
//           Promise.resolve({
//             success: true,
//             message: needsApproval
//               ? `Registration successful. Your ${data.requestedRole} role request is pending admin approval.`
//               : "Registration successful",
//             user: {
//               name: data.name,
//               email: data.email,
//               role: "participant",
//               requestedRole: data.requestedRole || null,
//               isApproved: !needsApproval,
//             },
//           }),
//       };
//     },
//   ];
// };

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(null);
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  console.log(isLoading, error);
  

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      requestedRole: "participant",
      phone: "",
      department: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setRegistrationResult(null);

      // Call the register mutation
      const response = await register(data).unwrap()
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestedRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="participant">Participant</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="organizer">Organizer</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* {requiresApproval && (
          <Alert className="bg-amber-50 border-amber-200">
            <Clock className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 text-sm">
              Your <strong>{selectedRole}</strong> role request will require
              admin approval. You'll be registered as a participant until
              approved.
            </AlertDescription>
          </Alert>
        )} */}

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* {registrationResult && (
          <Alert
            className={
              registrationResult.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }
          >
            {registrationResult.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Clock className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription
              className={
                registrationResult.success ? "text-green-800" : "text-red-800"
              }
            >
              {registrationResult.message}
            </AlertDescription>
          </Alert>
        )} */}

        <Button type="submit" className="w-full bg-amber-600 cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </form>
    </Form>
  </div>
);
}



// const SignUpForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const {data: authData, isLoading: isAuthLoading} = useIsAuthQuery()
//   const [register] = useRegisterMutation()

//   useEffect(() => {
//   if (authData?.isAuthenticated) {
//     navigate('/dashboard'); // or wherever you want
//   }
// }, [authData, navigate]);

//     const form = useForm({
//         resolver: zodResolver(registrationSchema),

//         defaultValues: {
//             name: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             phone: '',
//             department: '',
//             requestedRole: "participant"
//         }
//     })

//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);

//       // Call the register mutation
//       const response = await register(data).unwrap();

//       // Navigate to sign-in or dashboard after successful registration
//       navigate('/dashboard');

//       // Optional: Show success message
//       console.log('Registration successful', response);
//     } catch (error) {
//       // Handle error (you might want to show a toast/notification)
//       console.error('Registration failed:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-2">Create Account</h1>
//         <p className="text-gray-600">Event Management App</p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

//           <FormField
//               name="name"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//           <FormField
//               name="email"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//           <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//              <FormField
//               name="confirm password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm Password</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Confirm Password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//           <FormField
//               name="Phone"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone Number</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//                 control={form.control}
//                 name="requestedRole"
//                 render={({ field }) => (
//                     <FormItem>
//                     <FormLabel>Role</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Select your role" />
//                         </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                         <SelectItem value="participant">Participant</SelectItem>
//                         <SelectItem value="faculty">Faculty</SelectItem>
//                         <SelectItem value="organizer">Organizer</SelectItem>
//                         <SelectItem value="volunteer">Volunteer</SelectItem>
//                         </SelectContent>
//                     </Select>
//                     <FormMessage />
//                     </FormItem>
//                 )}
//             />

//           <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-500">
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Creating Account...
//               </>
//             ) : (
//               "Create Account"
//             )}
//           </Button>
//         </form>
//       </Form>

//       <div className="text-center text-sm">
//         Already have an account?{" "}
//         <Link to="/sign-in" className="text-blue-600 hover:underline">
//           Sign In
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
