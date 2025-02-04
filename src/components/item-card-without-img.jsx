import { Minus, Plus, ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export function ItemCardWithoutImg({ product, className, ...props }) {
  const [quantity, setQuantity] = useState(0)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1))
 
  // Destructure product details with fallback values in case of null or undefined
  const {
    title = "Product Title", 
    description = "Product Description", 
    price = 0, 
    originalPrice = 0, 
    discount = "No Discount",
  } = product || {}

  return (
    <Card className={cn("w-[300px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold">₹{price}</span>
            <span className="text-sm text-muted-foreground line-through ml-2">₹249</span>
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">20% OFF</span>
        </div>
      </CardContent>
      <CardFooter>
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
