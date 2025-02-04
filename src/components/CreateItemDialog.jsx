import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CirclePlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function CreateItemDialog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [category, setCategory] = useState("");

  const discountedPrice = Math.max(originalPrice - discountAmount, 0);
  const calculatedDiscountPercentage = originalPrice > 0 ? (discountAmount / originalPrice) * 100 : 0;

  const handleDiscountAmountChange = (amount) => {
    setDiscountAmount(amount);
    setDiscountPercentage(amount > 0 ? (amount / originalPrice) * 100 : 0);
  };

  const handleDiscountPercentageChange = (percentage) => {
    setDiscountPercentage(percentage);
    setDiscountAmount(originalPrice * (percentage / 100));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend or state management
    console.log({ name, description, originalPrice, discountAmount, discountPercentage, discountedPrice, category });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            toast("Create Item Clicked...", {
              description: "No Description",
              action: {
                label: "Ok",
                onClick: () => console.log("Button Create Item Clicked"),
              },
            });
          }}
        >
          <CirclePlus />
          Create Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
          <DialogDescription>
            Add a new item to your inventory. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="toys">Toys</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="originalPrice" className="text-right">
                Price
              </Label>
              <Input
                id="originalPrice"
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discountAmount" className="text-right">
                Disc Amount
              </Label>
              <Input
                id="discountAmount"
                type="number"
                value={discountAmount}
                onChange={(e) =>
                  handleDiscountAmountChange(Number(e.target.value))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discountPercentage" className="text-right">
                Disc %
              </Label>
              <Input
                id="discountPercentage"
                type="number"
                value={discountPercentage}
                onChange={(e) =>
                  handleDiscountPercentageChange(Number(e.target.value))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discountedPrice" className="text-right">
                Net Price
              </Label>
              <Input
                id="discountedPrice"
                type="number"
                value={discountedPrice}
                readOnly
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
