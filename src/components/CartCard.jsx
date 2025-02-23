import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export function CartCard({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <Card className="grid grid-cols-[100px_1fr_auto] items-center gap-4 p-3">
      {/* Product Image */}
      <motion.img
        src={item.imageUrl || "/placeholder.svg"}
        alt={item.name}
        className="rounded-lg object-cover"
        style={{ width: 100, height: 100, aspectRatio: "1/1" }}
        whileHover={{ scale: 1.05 }}
      />

      {/* Product Info */}
      <CardHeader className="p-0">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <CardContent className="p-0 text-muted-foreground text-sm">
          ₹{item.netPrice.toFixed(2)}{" "}
          {item.discPercent > 0 && (
            <span className="line-through text-xs ml-1">₹{item.price.toFixed(2)}</span>
          )}
        </CardContent>
      </CardHeader>

      {/* Quantity Controls */}
      <CardFooter className="p-0 flex flex-col sm:flex-row items-center gap-2">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => onDecrement(item)}
            disabled={item.quantity === 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-6 text-center font-medium">{item.quantity}</span>
          <Button size="icon" variant="outline" onClick={() => onIncrement(item)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Move Delete Button Below on Mobile */}
        <Button
          size="icon"
          variant="destructive"
          className="sm:ml-2 mt-2 sm:mt-0"
          onClick={() => onRemove(item)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>

    </Card>
  );
}
