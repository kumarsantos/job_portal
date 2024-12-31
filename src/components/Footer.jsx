import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto flex flex-wrap justify-between gap-8 px-4">
        {/* About Us Section */}
        <div className="w-full sm:w-1/3">
          <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2 mb-4">
            About Us
          </h3>
          <p className="text-sm">
            We are a platform dedicated to connecting talent with opportunities.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="w-full sm:w-1/3">
          <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:underline text-sm">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline text-sm">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline text-sm">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="w-full sm:w-1/3">
          <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2 mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <Link
              to="https://twitter.com"
              className="hover:text-blue-400 text-sm"
            >
              Twitter
            </Link>
            <Link
              to="https://facebook.com"
              className="hover:text-blue-500 text-sm"
            >
              Facebook
            </Link>
            <Link
              to="https://linkedin.com"
              className="hover:text-blue-600 text-sm"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
