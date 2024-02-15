"use client";

function Copyright() {
  return (
    <p className="text-gray-500 text-center">
      Copyright ©
      <a href="/" className="no-underline text-gray-500">
        Parametrica
      </a>
      {new Date().getFullYear()}.
    </p>
  );
}
const Footer = () => {
  return (
    <footer>
      <div className="bg-blue-500 p-6 text-white mt-6">
        <div className="flex justify-center">
          <div>
            <Copyright /> &copy; 2023 Your Company Name. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
