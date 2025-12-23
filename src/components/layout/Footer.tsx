import {
  Package,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import { Link } from 'react-router'
export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SwiftParcel
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              Reliable, fast, and secure delivery solutions for individuals and
              businesses worldwide.
            </p>
            <div className="flex gap-4">
              <Link to="/ttps://www.facebook.com" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="/ttps://www.twitter.com" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="/ttps://www.instagram.com" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="/ttps://www.linkedin.com" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-white transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Track a Parcel
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Claims
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  123
                  <br />
                  Sreemangal, Moulvibazar, Sylhet, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <span>+1 2423 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <span>support@swiftparcel.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} SwiftParcel Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
