import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  stateData: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalItems :0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addtoCart: (state, action)=>{
      let find=state.stateData.findIndex((items)=>items.id === action.payload.id)
            if(find >= 0){
                  state.stateData[find].quantity+=1;
            }else{
                  state.stateData.push({...action.payload, quantity : 1 })
            }
      
    },

    calculateTotal :(state,action)=>{
    let {totalQuantity,totalPrice, totalItems} =state.stateData.reduce((ocumulatar,item)=>{
      let {quantity, price}= item;
      ocumulatar.totalPrice+=quantity*price;
      ocumulatar.totalQuantity+=quantity;
      ocumulatar.totalItems+=1;
      return ocumulatar;
    },{totalPrice : 0 , totalQuantity : 0 , totalItems : 0 });
    state.totalPrice=totalPrice;
    state.totalQuantity= totalQuantity;
    state.totalItems=totalItems;
    },

    incrementQuantity :(state,action)=>{
      state.stateData= state.stateData.map((items)=>{
       if (items.id===action.payload.id){
        return {...items, quantity : items.quantity + 1 }
       }
       return items;
      })
    },

    decrementQuantity :(state,action)=>{
      state.stateData= state.stateData.map((items)=>{
       if (items.id===action.payload.id){
        return {...items, quantity : items.quantity - 1 }
       }
       return items;
      })
    },

    
    

    removeItem : (state, action)=>{
      state.stateData= state.stateData.filter((item)=>item.id!==action.payload.id)
    },
  



  },
});

export const { addtoCart,calculateTotal, incrementQuantity, decrementQuantity ,removeItem} = cartSlice.actions;
export default cartSlice.reducer;
