import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to our website
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Click the button below to navigate.
          </p>

          {/* Button to Navigate to Another Page */}
          <Button
            onClick={() => navigate("/about")}
            className="mt-6 font-medium"
          >
            Go to About Page
          </Button>
        </div>
      </main>
    </div>
  );
}
