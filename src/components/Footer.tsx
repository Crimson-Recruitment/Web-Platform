export default function Footer() {
  return (
    <footer className="bg-[#8B0000] shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Crimson Recruitment
            </span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 list-none">
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6 ">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="mr-4 hover:underline md:mr-6">
                About
              </a>
            </li>
            <li>
              <a href="/pricing" className="mr-4 hover:underline md:mr-6 ">
                Pricing
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:underline  md:mr-6">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center ">
          © 2023 Crimson Recruitment. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
