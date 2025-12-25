import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading text-2xl mb-6">LOCALWORK</h3>
            <p className="font-paragraph text-sm text-secondary-foreground/80 mb-6">
              Connecting local talent with opportunities. Find part-time jobs or hire skilled workers in your area.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-6">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-paragraph text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="font-paragraph text-sm hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/find-jobs" className="font-paragraph text-sm hover:text-primary transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="font-paragraph text-sm hover:text-primary transition-colors">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-lg mb-6">RESOURCES</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pricing" className="font-paragraph text-sm hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/safety" className="font-paragraph text-sm hover:text-primary transition-colors">
                  Safety & Trust
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-paragraph text-sm hover:text-primary transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/admin" className="font-paragraph text-sm hover:text-primary transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg mb-6">CONTACT US</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="font-paragraph text-sm">support@localwork.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="font-paragraph text-sm">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground/70">
              © {new Date().getFullYear()} LocalWork. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="font-paragraph text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
