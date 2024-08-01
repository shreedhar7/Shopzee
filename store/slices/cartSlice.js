import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  items: [],
  orders: [],
  status: 'idle',
  error: null,
};

// Load cart items from AsyncStorage
export const loadCartItems = createAsyncThunk('cart/loadCartItems', async () => {
  try {
    const cartItems = await AsyncStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    throw new Error('Failed to load cart items');
  }
});

const saveCartItems = async (items) => {
  try {
    await AsyncStorage.setItem('cartItems', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart items', error);
  }
};

const saveOrders = async (orders) => {
  try {
    await AsyncStorage.setItem('orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartItems(state.items);
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      saveCartItems(state.items);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
      saveCartItems(state.items);
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartItems(state.items);
    },
    placeOrder: (state, action) => {
      const newOrder = action.payload;
      state.orders.push(newOrder);
      state.items = []; // Clear the cart
      saveCartItems(state.items); // Save the empty cart
      saveOrders(state.orders); // Save the orders
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, placeOrder } = cartSlice.actions;
export default cartSlice.reducer;
