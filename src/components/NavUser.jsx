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
import profileIcon from "/profile.png";

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
  console.log("Logging out...");
};

export function NavUser() {
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
          <DropdownMenuItem onClick={handleOrdersClick}>
            Orders
            <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleWishlistClick}>
            Wish List
            <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Payment Methods")}>
            Payment Methods
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Manage Addresses")}>
            Addresses
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handlePromotionsClick}>
            Promotions
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
          Customer Support
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          onClick={() => console.log("Checking Gift Cards")}
        >
          Gift Cards
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
