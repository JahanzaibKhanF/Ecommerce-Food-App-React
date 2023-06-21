// import cheezy2 from "../assets/cheezy2.webp";
import products from "../data/Products";

import { AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FoodCardsSlider from "../components/FoodCardsSlider";

export default function Product() {
  const { id, category } = useParams();
  console.log(id);
  console.log(category);

  const [mainProduct, setMainProduct] = useState();
  const [moreProducts, setMoreProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filteredItem = products.filter((item) => item.id == id);

    setMainProduct(...filteredItem);
    const filteredMore = products.filter(
      (item) => item.id != id && item.category == category
    ); //.............................

    setMoreProducts(filteredMore);
    console.log({ filteredMore });
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <ProductCard item={mainProduct} />;{/* <Slider item={moreProduct} /> */}
      <FoodCardsSlider items={moreProducts} />
    </div>
  );
}
