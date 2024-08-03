import { createSlice } from '@reduxjs/toolkit';

const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    coins: [],
    selectedCoin: null,
    coinData: [],
  },
  reducers: {
    changeCoin: (state, action) => {
        state.selectedCoin = action.payload
    },
    setCoinData: (state, action) => {
        state.coinData = action.payload
    },
    setCoins: (state, action) => {
        state.coins = action.payload
    }
  },
});

export const { changeCoin, setCoinData, setCoins } = coinSlice.actions;

export default coinSlice.reducer;
