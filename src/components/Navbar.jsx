import { useEffect, useState } from "react";
import { Menu, Home, Info, Briefcase, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import lightLogo from '/wolf-light.png'
import darkLogo from '/wolf-dark.png'
import { NavUser } from "./NavUser";
import ThemeToggle from "@/components/ThemeToggle";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  
  // Watch for class changes on <html> (real-time theme updates)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md">
      {/* Mobile: Hamburger Menu on Left */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col space-y-4 mt-6">
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setOpen(false)}
              >
                <Home className="w-5 h-5 mr-2" /> Home
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setOpen(false)}
              >
                <Info className="w-5 h-5 mr-2" /> About
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setOpen(false)}
              >
                <Briefcase className="w-5 h-5 mr-2" /> Services
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setOpen(false)}
              >
                <Mail className="w-5 h-5 mr-2" /> Contact
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo */}
      <div className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 flex items-center space-x-2">
        <Avatar>
          <AvatarImage
            src={theme === "dark" ? lightLogo : darkLogo}
            alt="Profile"
          />
          <AvatarFallback>Logo</AvatarFallback>
        </Avatar>
        <span className="text-3xl">AV</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">About</Button>
        <Button variant="ghost">Services</Button>
        <Button variant="ghost">Contact</Button>
      </div>

      {/* User */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <NavUser />
      </div>
    </nav>
  );
}
