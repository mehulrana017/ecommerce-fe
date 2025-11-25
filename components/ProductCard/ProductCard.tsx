import Link from "next/link";
import { GridTileImage } from "./components/GridTitleImage";
import { Product } from "@/lib/types/api";

type ProductCardProps = {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
};

const ProductCard = ({ item, size, priority }: ProductCardProps) => {
  return (
    <div>
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item._id}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.images?.[0] || ""}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.name as string,
            amount: item.price.toFixed(2),
            currencyCode: "USD",
          }}
        />
      </Link>
    </div>
  );
};

export default ProductCard;
