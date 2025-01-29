import { useState } from "react";
import { Menu, Home, Info, Briefcase, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import profileIcon from '/profile.png'
import logo from '/wolf.png'


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
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
      <div className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
        <Avatar>
          <AvatarImage src={logo} alt="Profile" />
          <AvatarFallback>Logo</AvatarFallback>
        </Avatar>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">About</Button>
        <Button variant="ghost">Services</Button>
        <Button variant="ghost">Contact</Button>
      </div>

      {/* Profile Icon */}
      <Avatar>
        <AvatarImage src={profileIcon} alt="Profile" />
        <AvatarFallback>Aman</AvatarFallback>
      </Avatar>
    </nav>
  );
}
