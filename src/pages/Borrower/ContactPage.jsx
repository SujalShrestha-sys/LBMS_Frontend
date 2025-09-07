import ContactStats from "../../components/contact/ContactStats";
import { MapPin } from "lucide-react";
import ContactForm from "../../components/contact/ContactForm";
import MessagesTable from "../../components/contact/MessageTable";

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <MapPin className="w-7 h-7 text-blue-500" />
        Contact Us
      </h1>

      {/* Subheading */}
      <p className="text-gray-600 mb-6 text-md">
        We’d love to hear from you! Whether it’s a question, feedback, or just
        to say hello.
      </p>

      {/* Contact Stats*/}
      <ContactStats />
      <ContactForm />
      <MessagesTable />
    </div>
  );
};

export default ContactPage;
