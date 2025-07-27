import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-yellow-800 border-t pt-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 text-white text-sm">

        {/* Logo */}
        <div className="flex flex-col text-center">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-red-300 via-orange-200 to-yellow-100 text-transparent bg-clip-text">
            Supplico
          </h2>
          <p className="mt-2 font-bold text-white justify-center">Empowering street vendors through affordable raw materials.</p>
        </div>

        {/* Services */}
        <div>
          <u><h3 className="text-sm font-bold mb-2">Services</h3></u>
          <ul className="space-y-0.5  text-xs">
            <li>Raw Material Supply</li>
            <li>Vendor-Buyer Matching</li>
            <li>Location-based Discovery</li>
            <li>Dashboard & Analytics</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <u><h3 className="text-sm font-bold mb-2">Contact Us</h3></u>
          <ul className="space-y-0.5 text-xs">
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

      {/* Bottom Line */}
      <div className=" bg-black text-center text-white text-xs p-0.5 border-t">
        &copy; {new Date().getFullYear()} Supplico. All rights reserved.
      </div>
    </footer>
  );
}
