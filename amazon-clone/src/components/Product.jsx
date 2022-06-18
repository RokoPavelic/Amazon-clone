import React from "react";
import styles from "../style/Product.css";
import { useStateValue } from "../components/StateProvider";

function Product({ id, title, image, price, rating }) {
  //here we dont need basket so we can use "state" and dispatch shoot the actions or we can leave it
  const [{}, dispatch] = useStateValue();
  // function that will add product to basket
  const addToBasket = () => {
    //dispatch shoot the action from reducer "action type"
    dispatch({
      type: "ADD_TO_BASKET",
      //item adding things from the props
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
