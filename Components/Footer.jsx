
export default () => {
  const footerNav = [
    {
      href: "javascript:void(0)",
      name: "Terms",
    },
    {
      href: "javascript:void(0)",
      name: "Licenses",
    },
    {
      href: "javascript:void(0)",
      name: "Privacy",
    },
    {
      href: "javascript:void(0)",
      name: "About us",
    },
  ];

  return (
    <>
      <footer className="pt-10">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="justify-between sm:flex">
            <div className="space-y-6">
              <img
                src="https://www.floatui.com/logo.svg"
                className="w-32"
                alt="Float UI logo"
              />
              <p className="max-w-md">
              Welcome to our company. We are dedicated to providing the best service in the industry. Our mission is to offer high-quality products and unparalleled customer service. We strive to meet the needs of our customers with innovative solutions and a commitment to excellence.
              </p>
            </div>
            <div className="space-y-6 sm:space-y-0 sm:flex sm:items-center">
              <ul className="flex space-x-4 sm:space-x-6">
                {footerNav.map((item, idx) => (
                  <li key={idx} className="hover:text-gray-900">
                    <a href={item.href}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
