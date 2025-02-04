import { useNavigate } from "react-router-dom";
import { ItemCardWithImg } from "../components/item-card-with-img";
import { BannerCarousel } from "../components/BannerCarousel";

export default function Dashboard() {
  const navigate = useNavigate();
  const productDataWithImg = [
    {
      title: "Sweet Corns Delight",
      description: "A combination of juicy Sweet Corns & Cheese",
      price: 199,
      originalPrice: 249,
      discount: "20% OFF",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1679924471066-dd984e92f395?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.2,
    },
    {
      title: "Cheezy-7 Pizza",
      description: "An Exotic Combination of White Mozzarilla, Cream White Cheese, Cheddar, Monterey Jack, Cream Orange Cheese",
      price: 299,
      originalPrice: 349,
      discount: "15% OFF",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1679924471091-f7cd7ad90ddf?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      rating: 4.5,
    },
    {
      title: "Burn To Hell Pizza",
      description: "A fiery and lethal combination of hot & garlic dip, jalapenos, mushrooms, olives and capsicum",
      price: 249,
      originalPrice: 299,
      discount: "10% OFF",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1679518412057-6b833a64b143?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D", 
      rating: 4.0,
    },
    {
      title: "Farm Villa Pizza",
      description: "The freshness of capsicum, tomatoes, with the flavour of paneer and red paprika topped with",
      price: 249,
      originalPrice: 299,
      discount: "10% OFF",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1679518411900-25b15c1f074a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8", 
      rating: 4.0,
    },
  ];

  const extendedProductData = [...Array(20)].map((_, index) => {
    const product = productDataWithImg[index % productDataWithImg.length];
    return {
      ...product,
      title: `${product.title} ${index + 1}`, // Give each product a unique name
      description: `${product.description} #${index + 1}`,
      price: product.price + (index % 3) * 10, // Slightly adjust price for variety
      originalPrice: product.originalPrice + (index % 3) * 20,
      rating: 4 + (index % 2) * 0.1, // Alternate between 4.0 and 4.1 ratings
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="">
          <BannerCarousel />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {extendedProductData.map((product, index) => (
            <ItemCardWithImg
              key={index}
              className="shadow-lg"
              product={product}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
