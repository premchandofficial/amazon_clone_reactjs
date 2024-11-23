import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { BsCartCheckFill } from "react-icons/bs";

import { CiSquareMinus } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateTotal, incrementQuantity, decrementQuantity ,removeItem
} from "../redux-toolkit/createSlice1.jsx";
import { Link } from "react-router-dom";

function Cartpage() {
  //const carts=useSelector((state)=>state.myStoreData.stateData)

  const { stateData, totalQuantity, totalPrice, totalItems } = useSelector((state) => state.myStore);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [stateData]);

  return (
    <>
      <header className="h-[65px] bg-[#004234] text-[white] sticky top-[0px]">
        <Link
          to="/"
          className="text-[28px] font-bold mx-[20px] flex items-center pt-[5px] hover:text-[black] duration-700"
        >
            <div className="p-[8px] pt-[15px] hover:border-[1px] border-[white] ">
              <img
                src="../../public/PngItem_12080.png"
                alt=""
                className="h-[20px] w-[60px] sm:h-[30px] sm:w-[80px]"
              />
            </div>
         
        </Link>
      
      </header>

      <div className="text-3xl text-center font-semibold pt-4">
        Cart Products
      </div>
      <div className="text-3xl m-2">Total Items : {totalItems}</div>

     

      <div className="">
        <div>
          {stateData.map((item, index) => {
            let price = item.price.toFixed(2);
            let x = item.quantity * item.price;
            let itemPrice = x.toFixed(2);
            let name = item.title.slice(0, 25);

            // console.log(item)
            return (
              <div key={index}>
                <div></div>
                <hr />
                <div className=" font-medium sm:flex sm:justify-between sm:px-[20px] sm:p-[10px]">
                  <div>
                    <div className="flex">
                      <img
                        src={item.image}
                        alt="cartimg"
                        className="w-[70px] h-[70px] p-[5px]"
                      />
                      <div>
                        <p className="pt-[10px]">{name}</p>
                        <p className="">Price : $ {price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-around py-[10px] px-[40px]">
                    <div className="flex">
                      <button
                        className="text-[40px]"
                        onClick={() => dispatch(incrementQuantity(item))}
                      >
                        <CiSquarePlus />
                      </button>

                       <p className="px-[5px] text-[25px]">{item.quantity}</p>

                      <button
                        className="text-[40px] "
                        onClick={() => dispatch(decrementQuantity(item))}
                      >
                        <CiSquareMinus />
                      </button>
                    </div>

                    <button
                      className="w-[20%] flex justify-center items-center text-[30px] sm:mx-[300px]"
                      onClick={() => dispatch(removeItem(item))}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <hr />

        <div className="bg-[#004234] ">
          <div className="text-[25px] py-4 px-8 font-medium text-[white]">
            <p>Total Quantity : $ {totalQuantity}</p>

            <p>Total Price : $ {totalPrice}</p>
          </div>
          <button className="bg-[#02990e] text-3xl py-4 px-8 text-[white] w-full text-left flex gap-[10px]">
            Order Now
            <p>
              <BsCartCheckFill />
            </p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cartpage;