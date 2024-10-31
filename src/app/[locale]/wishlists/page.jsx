import Container from "../../_components/Container";
import Heading from "../../_components/Heading";
import RecentlyViewed from "../../_components/RecentlyViewed";
import WishlistCard from "../../_components/WishlistCard";
import { fetchWishlists } from "../_actions/wishlist/wishlist";
import grayHeartIcon from "../../app/_assets/gray-heart-icon.jpg";

const Wishlist = async () => {
  const wishlistItems = await fetchWishlists();

  return (
    <Container>
      <div className="mb-6">
        <Heading title="Wishlists" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <RecentlyViewed />
        {wishlistItems &&
          wishlistItems.reverse().map((item) => {
            return (
              <WishlistCard
                key={item.id}
                imageSrc={item.listing[0]?.photos[0] || grayHeartIcon}
                imageAlt={item.title}
                title={item.title}
                savedCount={item.listing.length || 0}
                id={item._id}
              />
            );
          })}
      </div>
    </Container>
  );
};

export default Wishlist;
