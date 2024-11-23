import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './createSlice1'


export const store=configureStore({
      reducer:{
            myStore: cartReducer
      }
})