import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border-t  text-white ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center">
        {/* Logo */}
        <div className="text-2xl  font-extrabold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-transparent bg-clip-text">
          Supplico
        </div>

        {/* Services */}
        <div>
          <u><h3 className="text-lg font-bold mb-1">Services</h3></u>
          <ul className="space-y-1">
            <li>Raw Material Supply</li>
            <li>Vendor-Buyer Matching</li>
            <li>Location-based Discovery</li>
            <li>Dashboard & Analytics</li>
          </ul>
        </div>

         {/* Contact */}
        <div>
          <u><h3 className="text-lg font-bold mb-1">Contact Us</h3></u>
          <ul className="space-y-1">
            <li>Email: support@supplico.in</li>
            <li>Phone: +91 1234567890</li>
            <li>Location: Delhi, India</li>
          </ul>
        </div>
        
         {/* Follow Us */}
        <div>
          <u><h3 className="text-lg font-bold mb-2">Follow Us</h3></u>
          <div className="flex space-x-4 text-xl mt-1">
            <a href="#" className="hover:text-red-500" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-orange-500" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-500" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <p className="text-white min-w-screen text-center bg-black text-sm  font-medium mt-2 sm:mt-0">
          &copy; {new Date().getFullYear()} Supplico. All rights reserved.
        </p>
    </footer>
  );
}
