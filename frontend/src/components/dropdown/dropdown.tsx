import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeCoin, setCoinData, setCoins } from '../../redux/slice'
import { useAxios } from '../../hooks/axios.hook';
import { useEffect } from 'react';

const BitcoinDropDown = () => {
  const dispatch = useDispatch();
  const { selectedCoin, coins, coinsData } = useSelector((state: any) => state.coin);

  const { fetchData: fetchCoinHistory, loading: coinHistoryLoading, response: coinHistory } = useAxios();
  const { fetchData: fetchCoinList, loading: coinsLoading, response: coinListData } = useAxios();
  
  const handleChange = (event: { target: { value: any; }; }) => {
    const { target: { value } } = event;
    const coin = coins.find(({_id}) => _id == value);
    dispatch(changeCoin(coin))
    dispatch(setCoinData([]))
  };

  const getCoinData = async () => {
    await fetchCoinHistory({
      url: 'coin-history',
      method: 'GET',
      params: { coin: selectedCoin?._id }
    })
  }

  const getCoins = async () => {
    await fetchCoinList({
      url: 'coin',
      method: 'GET',
    })
  }

  useEffect(() => {
    if(coinHistory?.data?.length) {
      dispatch(setCoinData(coinHistory.data))
    }
  }, [coinHistory])

  useEffect(() => {
    if(coinListData?.data.length) {
      dispatch(setCoins(coinListData.data))
      dispatch(changeCoin(coinListData.data[0]))
    }
  }, [coinListData])

  useEffect(() => {
    selectedCoin && getCoinData()
  }, [selectedCoin])

  useEffect(() => {
    getCoins();
  }, [])

  if(!coins.length) {
    return null;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Bitcoin</InputLabel>
      <Select
        labelId="label-id"
        id="bitcoin"
        value={selectedCoin._id}
        label={'Bitcoin'}
        onChange={handleChange}
        sx={{
            textAlign: 'left',
            '& .MuiSelect-nativeInput': {
              textAlign: 'left',
            },
            '& .MuiSelect-select': {
              textAlign: 'left',
            },
        }}
      >
        {coins.map((coin: { _id: string, name: string}) => (
          <MenuItem key={coin._id} value={coin._id}>{coin.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BitcoinDropDown;
