import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-sky-700 to-cyan-600 py-12 px-4 overflow-hidden">
      
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-start justify-center text-5xl sm:text-8xl md:text-9xl lg:text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 select-none pointer-events-none pt-20"
      >
        CampusSync
      </motion.h1>

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-md w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Calendar className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
