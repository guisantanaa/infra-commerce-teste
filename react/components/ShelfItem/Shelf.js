import React, { useState, useEffect } from "react";
import ShelfItem from "./ShelfItem";
import { SliderLayout } from "vtex.slider-layout";
import { useOrderItems } from "vtex.order-items/OrderItems";
import style from "./style.css";

const Shelf = () => {
  const { addItems } = useOrderItems(),
    [arrayProducts, setArrayProducts] = useState([]);

  useEffect(() => {
    getCategoryItems();
  }, []);

  const getCategoryItems = () => {
    fetch("/api/catalog_system/pub/products/search/")
      .then((response) => response.json())
      .then((data) => {
        setArrayProducts(data);
        console.log("==>", data);
      });
  };

  const addToCart = async (event) => {
    const id = event.target.id;

    await fetch(`/api/catalog_system/pub/products/search?fq=productId:${id}`)
      .then((response) => response.json())
      .then((data) => {
        populateCart(data);
      });
  };

  const populateCart = (data) => {
    const cart = [
      {
        additionalInfo: {
          brandName: data[0].brand,
          __typename: "ItemAdditionalInfo",
        },
        availability: data[0].items[0].sellers[0].commertialOffer.IsAvailable,
        id: data[0].items[0].itemId,
        imageUrls: {
          at1x: data[0].items[0].images[0].imageUrl,
          __typename: "ImageUrls",
        },
        listPrice: data[0].items[0].sellers[0].commertialOffer.ListPrice,
        measurementUnit: data[0].items[0].measurementUnit,
        name: data[0].productName,
        price: data[0].items[0].sellers[0].commertialOffer.Price,
        productId: data[0].productId,
        quantity: 1,
        seller: data[0].items[0].sellers[0].sellerId,
        sellingPrice: data[0].items[0].bestPrice,
        skuName: data[0].items[0].nameComplete,
        unitMultiplier: data[0].items[0].unitMultiplier,
        uniqueId: data[0].items[0].itemId,
        isGift: false,
        __typename: "Item",
      },
    ];

    // O addItems ele espera receber um array de objeto com informações úteis do produto para adicionar ao carrinho.
    addItems(cart);
  };

  return (
    <>
			<h1>Products Custom</h1>
      <div className={`${style.containerShelf}`}>
        {arrayProducts ? (
          <>
            <SliderLayout
              itemsPerPage={{
                desktop: 4,
                tablet: 3,
                phone: 1,
              }}
              showPaginationDots="always"
            >
              {arrayProducts.map((product) => (
                <ShelfItem
                  link={product.link}
                  key={product.productId}
                  id={product.productId}
                  imageURL={product.items[0].images[0].imageUrl}
                  name={product.productName}
                  sellingPrice={
                    product.items[0].sellers[0].commertialOffer.ListPrice
                  }
                  price={product.items[0].sellers[0].commertialOffer.Price}
                  addToCart={addToCart}
                />
              ))}
            </SliderLayout>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Shelf;
