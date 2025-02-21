import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, updateCategory } from "../features/category/categorySlice";
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
import { ChartBarStacked } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function CreateCategoryDialog({ open, setOpen, editCategory = null }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  
  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name);
      setDesc(editCategory.desc);
    }
  }, [editCategory]);

 const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: editCategory ? editCategory.id : Date.now(),
      name,
      desc,
    };

    if (editCategory) {
      dispatch(updateCategory({ id: editCategory.id, newCategory }));
    } else {
      dispatch(addCategory(newCategory));
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editCategory ? "Edit Category" :"Create New Category"}</DialogTitle>
          <DialogDescription>
            {editCategory ? "" :"Add a new Category to your inventory. Fill out the details below."}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{editCategory? "Update Category":"Create Category"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
