import { useNavigate } from "react-router-dom";
import { ItemCardWithImg } from "../components/ItemCardWithImg";
import { BannerCarousel } from "../components/BannerCarousel";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const navigate = useNavigate();
  const itemsData = useSelector((state) => state.items.items);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="">
          <BannerCarousel />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {itemsData.map((product, index) => (
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
