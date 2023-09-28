//import { useCartContext } from "../contexts/cart_context";
import { useState } from "react";
import { Button } from "./Button";
import CartAmountToggle from "../component/CartAmountToggle"
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../contexts/cartContext";



const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();


  const { id, colors, stock } = product;
  const [color, setColor] = useState(colors[0]);

  // amount is quantity of items 
  const [amount, setAmount] = useState(1);

  // Decrease the quantity , limit is 1 
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  // Increase the quantity , limit is stock size
  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };


  
  return (
    <Wrapper>
      <div className="colors">
        <p>
          Color:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}

                // Only highlight that color button which is active
                className={color === curColor ? "btnStyle active" : "btnStyle"}

                // when click then tick on color appears 
                onClick={() => setColor(curColor)}>
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>

      {/* this component is responsilbe for increase or decrease quantity 
           when clicks on '+' or '-'
       */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />


      <NavLink to="/cart" onClick={() => addToCart(id, color, amount, product)} >
        <Button className="btn">Add To Cart</Button>
      </NavLink>

    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;
