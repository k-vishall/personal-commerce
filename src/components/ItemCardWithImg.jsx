import { useState } from "react"
import { motion } from "framer-motion"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDispatch } from "react-redux"
import { updateItem } from "@/features/item/itemSlice"
import { ItemModel } from "@/models/itemModel"

export function ItemCardWithImg({ product, className, ...props }) {
  const dispatch = useDispatch();

  if (!product) return null;
  
  const {
    id = 0,
    name = "Product Name",
    desc = "Product Description",
    price = 0,
    discPercent = 0,
    discAmount= 0,
    netPrice= 0,
    category = "Un categorized",
    imageUrl = "/placeholder.svg?height=300&width=300",
    rating = 0,
    quantity = 0,
  } = product;

  const incrementQuantity = () => {
    dispatch(updateItem({ id, newItem: { quantity: quantity + 1 } }));
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      dispatch(updateItem({ id, newItem: { quantity: quantity - 1 } }));
    }
  };

  return (
    <Card className={`w-[300px] flex flex-col overflow-hidden ${className}`} {...props}>
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
        />
        {discPercent > 0 && (
          <Badge className="absolute top-2 right-2 bg-white text-black font-semibold">
            {discPercent}% OFF
          </Badge>
        )}
      </div>

      <CardHeader className="flex flex-col flex-grow">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="line-clamp-2">{desc}</CardDescription>
      </CardHeader>

      <CardContent >
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <span className="text-2xl font-bold">₹{netPrice}</span>
            {discPercent > 0 && (
              <span className="text-sm text-muted-foreground line-through">₹{price}</span>
            )}
          </div>
          <div className="text-sm text-muted-foreground">★★★★☆ ({rating})</div>
        </div>
      </CardContent>

      <CardFooter className="flex-shrink-0">
        {quantity === 0 ? (
          <Button onClick={incrementQuantity} className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" size="icon" onClick={decrementQuantity}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium w-8 text-center">{quantity}</span>
            <Button variant="outline" size="icon" onClick={incrementQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>

  )
}
