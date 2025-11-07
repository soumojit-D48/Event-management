
import React from 'react';
import { Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Campus Sync</span>
            </div>
            <p className="text-sm">
              Transforming college event management through technology
            </p>
          </div>
          
          {/* Column 2 - Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-sm hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="block text-sm hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#demo" className="block text-sm hover:text-white transition-colors">
                Demo
              </a>
            </div>
          </div>
          
          {/* Column 3 - Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-sm hover:text-white transition-colors">
                About
              </a>
              <a href="#blog" className="block text-sm hover:text-white transition-colors">
                Blog
              </a>
              <a href="#careers" className="block text-sm hover:text-white transition-colors">
                Careers
              </a>
            </div>
          </div>
          
          {/* Column 4 - Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <div className="space-y-2">
              <a href="#help" className="block text-sm hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#contact" className="block text-sm hover:text-white transition-colors">
                Contact
              </a>
              <a href="#privacy" className="block text-sm hover:text-white transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">© 2025 Campus Sync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;