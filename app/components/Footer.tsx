"use client"; // Mark this component as a Client Component

//import { MailIcon } from "@heroicons/react/solid";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
//import { FaViber, FaWhatsapp } from "react-icons/fa";
//import styles from "../styles/global.css"; // Adjust the path as necessary

export default function Footer() {
 /* const handleEmailSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const email = event.target.email.value; // Get the email value from the input field
    const subject = encodeURIComponent("Contact from Website");
    const body = encodeURIComponent(`Hello,

            I'm reaching out to you via your website.

            Best regards,
            [Your Name]`);

    // Open the default email client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };*/

  return (
    <footer className="fixed bottom-0 left-0 w-full p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        
      </div>
    </footer>
  );
}
