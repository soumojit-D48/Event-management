// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, QrCode, BarChart3, Users, CheckCircle, TrendingUp, ArrowRight, Menu, X } from 'lucide-react';

// export default function LandingPage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const features = [
//     {
//       icon: <Calendar className="w-8 h-8" />,
//       title: "Smart Event Management",
//       description: "Streamline event creation, scheduling, and coordination with automated workflows"
//     },
//     {
//       icon: <QrCode className="w-8 h-8" />,
//       title: "QR Code Check-ins",
//       description: "Instant participant verification and real-time attendance tracking"
//     },
//     {
//       icon: <BarChart3 className="w-8 h-8" />,
//       title: "Analytics Dashboard",
//       description: "Comprehensive insights and automated report generation for data-driven decisions"
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Role-Based Access",
//       description: "Secure permissions for organizers, participants, and administrators"
//     }
//   ];

//   const stats = [
//     { value: "500+", label: "Events Managed" },
//     { value: "10K+", label: "Registrations" },
//     { value: "98%", label: "Satisfaction Rate" },
//     { value: "50hrs", label: "Time Saved" }
//   ];

//   return ( // from-indigo-900 via-sky-500 to-cyan-400
//     // <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
//     <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-sky-700 to-cyan-600">
//       {/* Navbar */}
//       <motion.nav 
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//           scrolled ? 'bg-slate-950/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <motion.div 
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-2xl font-bold text-white">EventHub</span>
//             </motion.div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
//               <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
//               <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-lg"
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden text-white"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <motion.div 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="md:hidden mt-4 pb-4 space-y-4"
//             >
//               <a href="#features" className="block text-slate-300 hover:text-white transition-colors">Features</a>
//               <a href="#about" className="block text-slate-300 hover:text-white transition-colors">About</a>
//               <a href="#contact" className="block text-slate-300 hover:text-white transition-colors">Contact</a>
//               <button className="w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold">
//                 Get Started
//               </button>
//             </motion.div>
//           )}
//         </div>
//       </motion.nav>

//       {/* Hero Section */}
//       <div className="pt-32 pb-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//                 Transform Your
//                 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> College Events</span>
//               </h1>
//               <p className="text-xl text-slate-300 mb-8">
//                 End-to-end event management platform with real-time tracking, automated reports, and seamless coordination. Eliminate inefficiencies and embrace data-driven decisions.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-2xl flex items-center justify-center space-x-2"
//                 >
//                   <span>Start Free Trial</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors"
//                 >
//                   Watch Demo
//                 </motion.button>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
//                 <img 
//                   src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" 
//                   alt="Event Management"
//                   className="relative rounded-2xl shadow-2xl w-full h-auto"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="py-16 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 className="text-center"
//               >
//                 <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-slate-400">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div id="features" className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Powerful Features
//             </h2>
//             <p className="text-xl text-slate-400 max-w-2xl mx-auto">
//               Everything you need to manage college events efficiently and effectively
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 text-white">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
//                 <p className="text-slate-400">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-20 px-6">
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden"
//           >
//             <div className="absolute inset-0 bg-black/20"></div>
//             <div className="relative z-10">
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                 Ready to revolutionize your events?
//               </h2>
//               <p className="text-xl text-white/90 mb-8">
//                 Join colleges already transforming their event management
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-10 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-2xl inline-flex items-center space-x-2"
//               >
//                 <span>Get Started Now</span>
//                 <ArrowRight className="w-5 h-5" />
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="py-12 px-6 border-t border-white/10">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                   <Calendar className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold text-white">EventHub</span>
//               </div>
//               <p className="text-slate-400">Transforming college event management through technology</p>
//             </div>
//             <div>
//               <h4 className="font-semibold text-white mb-4">Product</h4>
//               <div className="space-y-2">
//                 <a href="#" className="block text-slate-400 hover:text-white transition-colors">Features</a>
//                 <a href="#" className="block text-slate-400 hover:text-white transition-colors">Pricing</a>
//                 <a href="#" className="block text-slate-400 hover:text-white transition-colors">Demo</a>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-semibold text-white mb-4">Company</h4>
//               <div className="space-y-2">
//                 <a href="#" className="block text-slate-400 hover:text-white transition-colors">About</a>
//                 <a href="#" className="block text-slate-400 hover:text-white transition-colors">Blog</a>
//                 <a href="#" className="block text-slate-400 hover:text-white transition-colors">Careers</a>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-semibold text-white mb-4">Support</h4>
//               <div className="space-y-2">
//                 <a href="#" className="block text-slate-400 hover:text-white transition-colors">Help Center</a>
//                 <a href="#" className="block text-slate-400 hover:text-white transition-colors">Contact</a>
//                 <a href="#" className="block text-slate-400 hover:text-white transition-colors">Privacy</a>
//               </div>
//             </div>
//           </div>
//           <div className="pt-8 border-t border-white/10 text-center text-slate-400">
//             <p>© 2025 EventHub. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }























import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, QrCode, BarChart3, Users, ArrowRight } from 'lucide-react';
import Layout from '../components/layoutComponents/Layout'; // ✅ Import Layout
import { useNavigate, Link } from 'react-router-dom';

export default function LandingPage() {
  const {navigate} = useNavigate();

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Event Management",
      description: "Streamline event creation, scheduling, and coordination with automated workflows"
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "QR Code Check-ins",
      description: "Instant participant verification and real-time attendance tracking"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and automated report generation for data-driven decisions"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Role-Based Access",
      description: "Secure permissions for organizers, participants, and administrators"
    }
  ];

  const stats = [
    { value: "500+", label: "Events Managed" },
    { value: "10K+", label: "Registrations" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "50hrs", label: "Time Saved" }
  ];

  return (
    // ✅ Wrap everything with Layout (includes Navbar & Footer)
    <Layout>
      {/* ✅ Remove old navbar - Layout handles it */}
      
      {/* ✅ Add pt-16 to account for fixed navbar */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-sky-700 to-cyan-600 pt-16">
        
        {/* Hero Section */}
        <div className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div 
            
            className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Transform Your
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {" "}College Events
                  </span>
                </h1>
                <p className="text-xl text-slate-300 mb-8">
                  End-to-end event management platform with real-time tracking, automated reports, and seamless coordination. Eliminate inefficiencies and embrace data-driven decisions.
                </p>
                <div
                
                 className="flex flex-col sm:flex-row gap-4">
                  <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-2xl flex items-center justify-center space-x-2"
                    
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    Watch Demo
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" 
                    alt="Event Management"
                    className="relative rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Everything you need to manage college events efficiently and effectively
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to revolutionize your events?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Join colleges already transforming their event management
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg shadow-2xl inline-flex items-center space-x-2"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* ✅ Footer is handled by Layout component */}
    </Layout>
  );
}