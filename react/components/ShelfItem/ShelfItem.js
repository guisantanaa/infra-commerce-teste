import React from "react";
import { formatPrice } from "../../helpers/Helper";
import style from "./style.css";

const ShelfItem = ({
  id,
  link,
  imageURL,
  name,
  price,
  sellingPrice,
  addToCart,
}) => {
  return (
    <>
      <div key={id} className={`${style.shelfItem}`}>
        <div className={`${style.shelfImage}`}>
          <a href={link} className={style.imgShelf}>
            <img
              src={`${imageURL}`}
              alt={`${name}`}
              className={`${style.shelfImage__img}`}
            />
          </a>
        </div>
        <h2 className={`${style.shelfProductName}`}>{`${name}`}</h2>
        <div className={`${style.shelfPrice}`}>
          <p className={`${style.shelfSellingPrice}`}>
            {price !== sellingPrice ? formatPrice(sellingPrice) : ''}
          </p>
          <p className={`${style.shelfBestPrice}`}>{formatPrice(price)}</p>
        </div>
        <div
          className={`${style.shelfButtonAddToCart}`}
          id={id}
          onClick={addToCart}
        >
          Adicionar ao carrinho
        </div>
      </div>
    </>
  );
};

export default ShelfItem;
