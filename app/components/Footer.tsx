
"use client"; // Mark this component as a Client Component

import { MailIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FaViber, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const handleEmailSubmit = (event:any) => {
    event.preventDefault(); // Prevent default form submission
    const email = event.target.email.value; // Get the email value from the input field
    const subject = encodeURIComponent("Contact from Website");
    const body = encodeURIComponent(`Hello,

            I'm reaching out to you via your website.

            Best regards,
            [Your Name]`);

    // Open the default email client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/galidoresty/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="w-6 h-6 text-blue-600"
            />
            <span className="ml-2">LinkedIn</span>
          </a>
          <a
            href="https://portfolio-tyser1995s-projects.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="w-6 h-6 text-gray-900"
            />
            <span className="ml-2">GitHub</span>
          </a>
          <a
            href="viber://chat?number=639778877083"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FaViber className="w-6 h-6 text-blue-600" />
            <span className="ml-2">Viber</span>
          </a>
          <a
            href="https://wa.me/639778877083"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FaWhatsapp className="w-6 h-6 text-green-500" />
            <span className="ml-2">WhatsApp</span>
          </a>
        </div>

        <form
          onSubmit={handleEmailSubmit}
          className="flex items-center justify-between d-none"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="px-3 py-2 rounded border border-gray-600 bg-gray-900 text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <MailIcon className="w-6 h-6 inline-block mr-2" />
            Send Email
          </button>
        </form>
      </div>
    </footer>
  );
}
