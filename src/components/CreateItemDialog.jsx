import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from "../features/item/itemSlice";
import { nanoid } from "@reduxjs/toolkit";
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

export function CreateItemDialog({ open, setOpen, editItem = null }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [discAmount, setDiscAmount] = useState(0);
  const [discPercent, setDiscPercent] = useState(0);
  const [category, setCategory] = useState("Pizza");
  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRating] = useState(0.0);
  const netPrice = Math.max(price - discAmount, 0);

  // const discountedPrice = Math.max(originalPrice - discountAmount, 0);
  // const calculatedDiscountPercentage = originalPrice > 0 ? (discountAmount / originalPrice) * 100 : 0;
  
  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setDesc(editItem.desc);
      setPrice(editItem.price);
      setDiscAmount(editItem.discAmount);
      setDiscPercent(editItem.discPercent);
      setCategory(editItem.category);
      setImageUrl(editItem.imageUrl);
      setRating(editItem.rating);
    }
  }, [editItem]);


  const handleDiscountAmountChange = (amount) => {
    setDiscAmount(amount);
    setDiscPercent(amount > 0 ? (amount / price) * 100 : 0);
  };

  const handleDiscountPercentageChange = (percentage) => {
    setDiscPercent(percentage);
    setDiscAmount(price * (percentage / 100));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: editItem ? editItem.id : Date.now(),
      name,
      desc,
      price,
      discPercent,
      discAmount,
      netPrice,
      category,
      imageUrl,
      rating: editItem ? editItem.rating : 4.0,
    };

    if (editItem) {
      dispatch(updateItem({ id: editItem.id, newItem }));
      toast("Item updated successfully!");
    } else {
      dispatch(addItem(newItem));
      toast("Item added successfully!");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editItem ? "Edit Item" : "Create New Item"}</DialogTitle>
          <DialogDescription>
            {editItem ? "" :"Add a new item to your inventory. Fill out the details below."}
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
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
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
              <Label htmlFor="imgUrl" className="text-right">
                Image Url
              </Label>
              <Input
                id="imgUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discAmount" className="text-right">
                Disc Amount
              </Label>
              <Input
                id="discAmount"
                type="number"
                value={discAmount}
                onChange={(e) =>
                  handleDiscountAmountChange(Number(e.target.value))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discPercent" className="text-right">
                Discount %
              </Label>
              <Input
                id="discPercent"
                type="number"
                value={discPercent}
                onChange={(e) =>
                  handleDiscountPercentageChange(Number(e.target.value))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="netPrice" className="text-right">
                Net Price
              </Label>
              <Input
                id="netPrice"
                type="number"
                value={netPrice}
                readOnly
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{editItem ? "Update Item" : "Create Item"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
