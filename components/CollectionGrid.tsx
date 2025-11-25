import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

export default function CollectionGrid() {
  return (
    <section className="relative lg:space-x-5 space-y-5 lg:space-y-0 grid grid-cols-1 lg:grid-cols-3 max-h-[840px]">
      <div className="relative col-span-2 w-full h-[840px]">
        <Image
          src={
            "https://hiyori-backpack.s3.us-west-2.amazonaws.com/public/hero-image.jpg"
          }
          width={1080}
          height={1080}
          className="object-cover w-full h-full"
          alt="1"
        />
        <div className="bg-zinc-800/20 flex justify-center items-center flex-col absolute w-full h-full top-0 left-0 text-white">
          <p className="text-5xl mb-3">Bath Room</p>
          <p className=" font-light mb-8">Designed for enhanchment</p>
          <Link
            className={cn(buttonVariants({ size: "lg" }), "text-xl py-8 px-10")}
            href={"/collections/bathroom"}
          >
            DiscoverNow
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full space-y-5 h-[840px]">
        <div className="relative w-full h-[340px]">
          <Image
            src={
              "https://hiyori-backpack.s3.us-west-2.amazonaws.com/public/hero-image.jpg"
            }
            width={800}
            height={900}
            className="object-cover w-full h-full"
            alt="1"
          />
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={
              "https://hiyori-backpack.s3.us-west-2.amazonaws.com/public/hero-image.jpg"
            }
            width={800}
            height={900}
            className="object-cover w-full h-full"
            alt="1"
          />
        </div>
      </div>
    </section>
  );
}
