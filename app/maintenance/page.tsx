import { FaTools } from "react-icons/fa"; // Use React Icons
import Header from "../components/Header";

export default function MaintenanceIcon() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <div className="fixed p-4 bg-yellow-200 text-yellow-800 border border-yellow-300 rounded-lg shadow-lg">
        <FaTools className="w-6 h-6 inline-block mr-2" />
        <span>Under Maintenance</span>
      </div>
    </main>
  );
}
