import CollectionGrid from "@/components/CollectionGrid";
import FeaturedProductsCards from "@/components/FeaturedProductsCards";
import { HeroSection } from "@/components/HeroSection";
import ProductCategoryCircle from "@/components/productcategorycircle";

export default async function Home() {
  // const currentUser = await getCurrentUser();

  // const { data } = await getClient().query(LandingRouteQuery, {
  //   user_id: currentUser?.id,
  // });

  // if (data === null) return notFound();

  return (
    <main>
      <HeroSection />

      <ProductCategoryCircle />
      <FeaturedProductsCards />
      <CollectionGrid />
      {/* <Shell>
        {data.products && data.products.edges ? (
          <ProductSubCollectionsCircles
            collections={data.collectionScrollCards.edges}
          />
        ) : null}

        {data.products && data.products.edges ? (
          <FeaturedProductsCards products={data.products.edges} />
        ) : null}

        <CollectionGrid />

        <DifferentFeatureCards />

        <LessIsMoreCard />
      </Shell> */}
    </main>
  );
}
