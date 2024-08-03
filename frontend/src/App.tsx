import './App.css';
import HeaderBar from './components/header/header';
import StockTable from './components/table/table';
import BodyContainer from './components/body-container/body-container';
import { useEffect, useState } from 'react';
import * as io from 'socket.io-client';
import { useAxios } from './hooks/axios.hook';
import { setCoinData } from './redux/slice'
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [socket, setSocket] = useState<io.Socket>(null);
  const { selectedCoin, } = useSelector((state: any) => state.coin);
  const dispatch = useDispatch();
  const { fetchData: fetchCoinHistory, loading: coinHistoryLoading, response: coinHistory } = useAxios();

  const connectToSocket = () => {
    
    const socket: io.Socket = io.connect('http://localhost:4444', {
      path: '/socket.io',
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnection: true
    })
    setSocket(socket);
  }

  const getCoinData = async () => {
    await fetchCoinHistory({
      url: 'coin-history',
      method: 'GET',
      params: { coin: selectedCoin?._id }
    })
  }

  const addListeners = () => {
    socket.on('priceUpdates', () => {
      getCoinData()
    })
  }

  useEffect(() => {
    if(coinHistory?.data?.length) {
      dispatch(setCoinData(coinHistory.data))
    }
  }, [coinHistory])

  useEffect(() => {
    socket && addListeners()
  }, [socket])

  useEffect(() => {
    if(!socket) {
      connectToSocket()
    }
  },[])

  return (
    <div className="App">
      <HeaderBar/>
      <BodyContainer>
        <StockTable/>
      </BodyContainer>
    </div>
  );
}

export default App;
