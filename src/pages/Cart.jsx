import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "@/features/item/itemSlice";
import { Button } from "@/components/ui/button";
import { CartCard } from "@/components/CartCard";
import { useNavigate } from "react-router-dom";
import { OrderSummaryCard } from "@/components/OrderSummaryCard";
export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsData = useSelector((state) => state.items.items);
  const data = itemsData.filter((item) => item.quantity > 0);
  const taxRates = [
    { name: "GST", percent: 5 },
    { name: "Service Tax", percent: 3 },
    { name: "VAT", percent: 4 },
    { name: "Custom Tax", percent: 10 },

  ];
  
  const subtotal = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = data.reduce((sum, item) => sum + (item.discAmount || 0) * item.quantity, 0); 
  const taxDetails = taxRates.map((tax) => ({
    name: tax.name,
    amount: (subtotal - discount) * (tax.percent / 100),
  }));

  const totalTax = taxDetails.reduce((sum, tax) => sum + tax.amount, 0);
  const total = subtotal - discount + totalTax;

  const incrementQuantity = (item) => {
    dispatch(
      updateItem({ id: item.id, newItem: { quantity: item.quantity + 1 } })
    );
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(updateItem({ id: item.id, newItem: { quantity: item.quantity - 1 } }));
    } else {
      dispatch(updateItem({ id: item.id, newItem: { quantity: 0 } })); // Remove item if qty reaches 0
    }
  };

  const handleRemove = (item) => {
    dispatch(updateItem({ id: item.id, newItem: { quantity: 0 } })); // Remove item 0
  };

  const handleCheckout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Checkout clicked");
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto px-4 py-8 items-start">
      {/* Cart Section */}
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <div className="grid gap-4 min-h-[200px]">
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 p-10 border border-dashed border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-900">
              <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-400 text-center">
                🛒 Your cart is feeling lonely... add some snacks before it starts crying! 😢🍕🍔
              </h1>
              <Button
                variant="default"
                className="px-6 py-2 text-lg"
                onClick={() => navigate("/")}
              >
                🛍️ Start Shopping
              </Button>
            </div>
          ) : (
            data.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>
      </div>
  
      {/* Order Summary Section (Only Shows When Items Exist) */}
      {data.length > 0 && (
        <div className="sticky top-24 self-start">
          <OrderSummaryCard
            subtotal={subtotal}
            discount={discount}
            taxDetails={taxDetails}
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  );
  
}

