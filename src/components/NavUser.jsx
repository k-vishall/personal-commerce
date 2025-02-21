import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ShoppingBag,
  ShoppingCart,
  ScrollText,
  IndianRupee,
  MapPinHouse,
  Headset,
  LogOut,
  TrendingUp ,
  ChartBarStacked ,
  Gift ,
} from "lucide-react";
import profileIcon from "/profile.png";
import { useNavigate } from "react-router-dom";

export function NavUser() {
  const navigate = useNavigate();

  const handleOrdersClick = () => {
    console.log("Redirecting to Orders...");
  };

  const handleWishlistClick = () => {
    console.log("Redirecting to Wish List...");
  };

  const handlePromotionsClick = () => {
    console.log("Viewing Promotions...");
  };

  // Function to handle log out
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={profileIcon} alt="Profile" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/createItem")}>
            <ShoppingBag /> Create Item
            <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/createCategory")}>
            <ChartBarStacked /> Create Category
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOrdersClick}>
            <ShoppingCart/> Cart
            <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleWishlistClick}>
            <ScrollText/> Wish List
            <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Payment Methods")}>
            <IndianRupee /> Payment Methods
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Manage Addresses")}>
            <MapPinHouse /> Addresses
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handlePromotionsClick}>
            <TrendingUp /> Promotions
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>New Arrivals</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => console.log("Viewing Current Offers")}
                >
                  Current Offers
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Viewing Upcoming Sales")}
                >
                  Upcoming Sales
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => console.log("Viewing More Promotions")}
                >
                  More...
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("Contacting Support")}>
          <Headset /> Customer Support
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          onClick={() => console.log("Checking Gift Cards")}
        >
         <Gift /> Gift Cards
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut /> Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
