import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FaShoppingCart } from "react-icons/fa";

import { AiTwotoneMail } from "react-icons/ai";
import { Link } from "react-router-dom";

import { calculateTotal ,addtoCart} from "../redux-toolkit/createSlice1";

//import Product from "../Products.json";


import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

import { GrLocation } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { PiShoppingCartSimpleBold } from "react-icons/pi";



const images = [
  "../../public/1.jpg",
  "../../public/2.jpg",
  "../../public/3.jpg",
  "../../public/4 (5).jpg",
  "../../public/5 (2).jpg",
  "../../public/6.jpg",
];

function Home() {


  const dispatch = useDispatch();
  const { stateData, totalQuantity, totalPrice } = useSelector(
    (state) => state.myStore
  );

  useEffect(() => {
    dispatch(calculateTotal());
  }, [stateData]);

  const [mainProducts, setMainProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);


  //price filters hooks
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(1000);
  // search filter handle change
  function searchFilterChange(e) {

    setSearchItem(e.target.value);
  }
 
  // search filters function
  function searchFilter() {
    let searchData = category.filter((curvalue) => {
      return curvalue.title.toLowerCase().includes(searchProducts);
    });
    setMainProducts(searchData);
  }

  //category filter function
  function filterCategory(val) {
    let updateItem = category.filter((item) => {
      //console.log(item)
      return item.category === val;
    });
    setMainProducts(updateItem);
    //console.log(updateItem)
  }

  // price filter handle change
  function priceFilterChange(event) {
    let { value } = event.target;
    setmaxPrice(value);
  }
  //price filter function
  function filterPrice() {
    let filterPrice = category.filter((items) => {
      return items.price >= minPrice && items.price <= maxPrice;
    });
    setMainProducts(filterPrice);
  }

  // get fake API data
  let getApiData = async () => {
    try {
      let apiResponce = await fetch("https://fakestoreapi.com/products");
      let apiData = await apiResponce.json();
      //console.log(data)
      setMainProducts(apiData);
      setCategory(apiData);
    } catch (error) {
      console.log("Failed to fetch data");
    }
  };

  useEffect(()=>{
    getApiData()
  },[])


  

  const [current, setCurrent] = useState(0);

  function nextSlide() {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }

  function prevSlide() {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  }      

 
  return (
    <>
      <div className="w-full h-full bg-[#E3E6E6]">
        <header className="flex bg-[#004234] sticky top-0 sm:justify-between h-[90px]">
          <div className="sm:px-[20px] sm:flex items-center">
            <div className="px-[15px] pt-[15px] sm:py-[10px] hover:border-[1px] border-[white] ">
              <img
                src="../../public/PngItem_12080.png"
                alt=""
                className="h-[20px] w-[60px] sm:h-[30px] sm:w-[80px]"
              />
            </div>

            <div className="text-[white] pl-[10px] hidden sm:block   hover:border-[1px] border-[white] sm:pt-[10px]">
              <p className="text-[12px]">Delievery to</p>
              <div className="flex text-[16px] items-center pb-[5px]">
                <GrLocation className="text-[20px]" />
                <p className="font-medium">Pakistan</p>
              </div>
            </div>
          </div>

          <div className="pt-[10px] sm:flex sm:justify-between">
            <div className="">
              <div className="flex sm:pr-[100px]">
                <button className="flex items-center h-[30px] px-[5px] bg-[#d4d3d3] rounded-l sm:h-[40px] sm:px-[10px]">
                  <p>All</p>
                  <p>
                    <IoMdArrowDropdown />
                  </p>
                </button>
                <input
                  type="text"
                  placeholder="Search Amazon"
                  className="w-[140px] px-[10px] h-[30px] outline-none sm:w-[600px] sm:h-[40px]"
                  onChange={searchFilterChange}
                />
                <button
                  className="bg-[#c71781] text-[20px] text-[white] px-[8px] h-[30px] rounded-r hover:bg-[#a01267] duration-150 sm:h-[40px] sm:px-[10px] "
                  onClick={() => searchFilter()}
                >
                  <IoIosSearch />
                </button>
              </div>
            </div>

            <div className="flex justify-end items-center pb-[10px] px-[5px] mt-[2px] sm:px-[20px] pb-[15px]">
              <div className=" text-white font-medium  sm:text-[18px] flex gap-[10px]">
                <p className="">Return</p>
                <p className="">& Order</p>
              </div>
              <Link to="/Cartpage" className="flex py-[5px] ml-[20px]">
                <PiShoppingCartSimpleBold className="text-3xl text-[white]" />

                <sup
                  className="h-[25px] w-[25px] text-[18px] rounded-full flex items-center justify-center text-[white] pr-[5px]"
                >
                  {totalQuantity}
                </sup>
              </Link>
            </div>
          </div>
        </header>

        <div className="bg-[#035e4a]">
          <div className="slider flex justify-evenly items-center">
            <div
              className="left-arrow bg-gray-200 hover:bg-gray-400 hover:text-white p-2 cursor-pointer"
              onClick={prevSlide}
            >
              <TbPlayerTrackPrevFilled />
            </div>
            {images.map(
              (image, index) =>
                current === index && (
                  <div key={image} className="slide flex justify-center">
                    <img className="sm:h-[450px]" src={image} alt="images" />
                  </div>
                )
            )}
            <div
              className="right-arrow bg-gray-200 hover:bg-gray-400 hover:text-white p-2 cursor-pointer"
              onClick={nextSlide}
            >
              <TbPlayerTrackNextFilled />
            </div>
          </div>
        </div>

       
        <main className="sm:flex justify-between">

          <aside className="font-semibold border-[black] sm:w-[20%]">
            <p className="text-[25px] px-[20px] pt-[5px] sm:py-[10px]">
              Category Filters
            </p>

            <div className="flex flex-wrap gap-x-[50px] items-start text-[22px] pt-[20px] pl-[20px] w-[100%] sm:flex-col sm:gap-[20px]">
              <button onClick={() => setMainProducts(category)}>
                All Products
              </button>
              <button onClick={() => filterCategory("electronics")}>
                Electonics
              </button>
              <button onClick={() => filterCategory("jewelery")}>
                Jewelary
              </button>
              <button onClick={() => filterCategory("men's clothing")}>
                Man's Clothes
              </button>
              <button onClick={() => filterCategory("women's clothing")}>
                Woman's Clothes
              </button>
            </div>
            <div className="text-[22px] font-bold px-[20px] pt-[10px] sm:py-[30px]">
              <p className="pb-[10px]">Price Filter</p>

              <p>
                $ {minPrice} - {maxPrice}
              </p>
              <input
                type="range"
                name=""
                id=""
                className="mb-[30px]"
                value={maxPrice}
                onChange={priceFilterChange}
                onClick={filterPrice}
              />
            
            </div>
          </aside>

          <div className="flex  flex-wrap gap-[20px] items-center justify-center my-[20px] sm:w-[80%]">
            {mainProducts.map((items, index) => {
              let name = items.title.slice(0, 40);

              return (
                <div key={index} className="flex items-center">
                  <div className=" w-[300px] sm:w-[300px] border-[#141414] border-[2px] font-medium flex flex-col">
                    <div className="overflow-hidden">
                      <img
                        src={items.image}
                        alt=""
                        className="w-[100%] h-[230px] hover:scale-110 duration-300"
                      />
                    </div>

                    <p className="p-[5px]">{name}</p>

                    <p className="px-[5px] font-medium text-[22px]">
                      Price : $ {items.price}
                    </p>

                    <button
                      onClick={() => dispatch(addtoCart(items))}
                      className="flex m-auto bg-[#01634e] items-center px-[20px] py-[5px] my-[6px] text-[20px] text-[white] rounded hover:bg-[#004234] duration-300"
                    >
                      Add To Cart{" "}
                      <div className="px-[5px]">
                        <FaShoppingCart />
                      </div>

                    </button>
                  </div>
                </div>
              );
            })}
           </div>
          </main>
        

     
         
       
        <hr />

        <footer className="text-white">
          <div className="py-[20px] bg-[#485769] w-full flex items-center justify-center">
            <img
              src="../../public/PngItem_12080.png"
              alt=""
              className="h-[34px] w-[100px]"
            />
          </div>
          <div className="py-[30px] px-[15px] bg-[#232F3E] sm:flex sm:justify-around">
            <div>
              <p className="font-medium text-[20px] pb-[10px] gap-[10px]">
                Get To Know Us
              </p>
              <p>Careers</p>
              <p>Blog</p>
              <p>About Amazon</p>
              <p>Investers Relations</p>
              <p>Amazon Devices</p>
            </div>

            <div>
              <p className="font-medium text-[20px] pb-[10px]">
                Make Money With Us
              </p>
              <p>Sell products on Amazon</p>
              <p>Sell on Amazon Business</p>
              <p>Sell apps on Amazon</p>
              <p>Become an Affiliate</p>
              <p>Advertise Your Products</p>
              <p>Host an Amazon Hub</p>
            </div>

            <div>
              <p className="font-medium text-[20px] pb-[10px]">
                Amazon Payment Products
              </p>
              <p>Amazon Business Card</p>
              <p>Shop with Points</p>
              <p>Reload Your Balance</p>
              <p>Amazon Currency Converter</p>
            </div>
          </div>

        
          <div></div>
        </footer>
      </div>
    </>
  );
}

export default Home;
