import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCategoryCircle() {
  return (
    <section className="flex justify-start items-center gap-x-10 overflow-auto py-12">
      <Link href={`/collections/`} key={`collection_circle`}>
        <div
          className={cn(
            "relative bg-secondary rounded-full flex justify-center items-center",
            "w-[280px] h-[280px]"
            // "md:w-[320px] md:h-[320px]"
            // "lg:w-[360px] lg:h-[360px]"
          )}
        >
          <Image
            src={
              "https://hiyori-backpack.s3.us-west-2.amazonaws.com/public/hero-image.jpg"
            }
            alt={"category-img"}
            width={320}
            height={320}
            className={cn(
              "object-center object-cover hover:scale-105 transition-all duration-500",
              "w-[240px] h-[240px]"
              // "md:w-[280px] md:h-[280px]",
              // "lg:w-[320px] lg:h-[320px]"
            )}
          />
        </div>
        <p className="text-black text-center mt-3 font-semibold">{"label"}</p>
      </Link>
    </section>
  );
}
