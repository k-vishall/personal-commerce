import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useState } from "react";
export function OrderSummaryCard({
  subtotal,
  discount,
  taxDetails,
  total,
  onCheckout,
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onCheckout();
    setLoading(false);
  };

  return (
    <Card className="bg-muted/40 rounded-lg p-6">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-2 p-0 mt-4">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="text-red-500">-₹{discount.toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        {taxDetails.map((tax) => (
          <div className="flex justify-between" key={tax.name}>
            <span>{tax.name}</span>
            <span>₹{tax.amount.toFixed(2)}</span>
          </div>
        ))}
        {/* <div className="flex items-center justify-between">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div> */}
        <Separator className="my-2" />
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter className="p-0 mt-4">
        <Button
          size="lg"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Proceed to Checkout"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
