"use client";

function Copyright() {
  return (
    <p className="text-center">
      Copyright ©
      <a href="/" className="no-underline ">
        Parametrica
      </a>
      {"  "}
      {new Date().getFullYear()}.
    </p>
  );
}
const Footer = () => {
  return (
    <footer>
      <div className="footer p-6  mt-6">
        <div className="flex justify-center">
          <div>
            <Copyright />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
