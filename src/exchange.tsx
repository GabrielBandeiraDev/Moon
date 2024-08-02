import React, { useEffect, useState } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, hamsterCoin, mainCharacter } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Friends from './icons/Friends';
import Coins from './icons/Coins';
 // URL do servidor WebSocket
const WS_URL = 'https://69070921-d03a-4485-b7e1-5c549f94b4c9-00-gw3lj7f3kfzf.kirk.replit.dev/';




function App() {
  const levelNames = [
    "CLIQUE BACANA",
    "CLIQUE MANEIRO",
    "SUPER CLICK",
    "MASTER CLICK", 
    "Esmeralda dos CLICKS ",
    "Diamante DOS CLICK",
    "Escaleno CLICK",
    "Obsidian CLICK ",
    "Badrock CLICK",
    "Inifitos CLICKS"
  ];

  const levelMinPoints = [
    0,
    5000,
    25000,
    1000000,
    2000000,
    100000000,
    5000000000,
    10000000000,
    100000000000,
  ];

  const [levelIndex, setLevelIndex] = useState(1);
  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState<{id: Number, x: Number , y: Number}[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const pointsToAdd = 15;
  const profitPerHour = 1;

  useEffect(() => {
    // Conectar ao servidor WebSocket
    const ws = new WebSocket(WS_URL);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.points !== undefined) {
        setPoints(data.points);
      }
    };
    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);


  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState('');
  const[dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState('');
  const[dailyComboTimeLeft, setDailyComboTimeLeft] = useState('');


  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target= new Date(now);
    target.setUTCHours(targetHour, 0 , 0 , 0);

    if(now.getUTCHours() >= targetHour){
      target.setUTCDate(target.getUTCDate()+1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff/ (1000 * 60 * 60 ));
    const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2; 
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`; 

    setTimeout(() => { 
      card.style.transform = '';
    }, 100);

    setLevelIndex(levelIndex + 1);
    const newPoints = points + pointsToAdd;
    setPoints(newPoints);

    // Enviar os novos pontos para o servidor WebSocket
    if (socket) {
      socket.send(JSON.stringify({ points: newPoints }));
    }

    setClicks([...clicks, {id: Date.now(), x: e.pageX, y : e.pageY}]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };


  useEffect(() => {
    const updateCountDowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountDowns();
    const interval = setInterval(updateCountDowns,60000);

    return () => clearInterval(interval);
  },[]);

  


  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };


  const formatProfitPerHour = (profit : number) =>{
    if (profit >= 1000000000 ) return `+${(profit / 1000000000).toFixed(2)}B`;
    if(profit >= 1000000 ) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };


  


//DEIXAR O FUNDO PRETO 
  return (
    <div className='bg-gray-500 flex justify-center'>   
      <div className='w-full bg-gray-500 text-white h-screen font-bold flex flex-col max-w-xl'>
        <div className='px-4 z-10'>
          <div className='flex items-center space-x-2 pt-4'>
            <div className='p-1 rounded-lg bg-[#1d2025]'>
              <Hamster size={24} className='text-[#d4d4d4]' />
            </div>
            <div>
              <p className='text-sm '>Savitar (CEO)</p>
            </div>
          </div>
          <div className='flex items-center justify-between space-x-4 mt-1'>
            <div className='flex items-center w-1/3'>
              <div className='w-full'>
                <div className='flex justify-between'>
                  <p className='text-sm'>{levelNames[levelIndex]}</p>
                  <p className='text-sm'>{levelIndex + 1} <span className='text-[#95908a]'>/{levelNames.length}</span></p>
                </div>
                <div className='flex items-center mt-1 border-2 border-[#43433b] rounded-full'>
                  <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full'>
                    <div className='progress-gradient h-2 rounded-full' style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center w-2/3 border-2 border-[#43433b]
            rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64'> 
              <img src={binanceLogo} alt='Exchange' className='w-8 h-8'/>    
              <div className='flex-1 text-center'>
              <p className='text-xs text-[#85827d] font-medium'>AJUDE DOANDO PARA O PROJETO!
              </p>
              <div className='flex items-center justify-center space-x-1'>
                <img src={dollarCoin} alt="Dollar" className='w-[18px]
                h-[18px]'/>
              <p className='text-sm '>{formatProfitPerHour(profitPerHour)}</p>
                <Info size={20} className='text-[#43433b]'/>
                

              </div>
                </div> 
                <Settings className='text-white'/>
            </div>
          </div>
        </div>
        <div className='flex-grow mt-4 bg-gray-300 rounded-t-[48px] relative top-glow z-0'>
          <div className='absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]'>

            <div className='px-4 mt-6 flex justify-between gap-2' >

              <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
               <div className='dot'></div> 
               <img src = {dailyReward} alt="Daily Reward" className='mx-auto- w-12 h-12'/>
               <p className='text-[10px] text-center text-white mt-1'>Daily Reward</p>
               <p className='text-[10px] font-medium text-center text-gray-400 mt-2 '>{dailyRewardTimeLeft}</p>
 
              </div>
              <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full 
              relative'>
                <div className='dot'></div>
                <img src = {dailyCipher} alt="Daily Cipher " className='mx-auto w-12 h-12'/>
                <p className='text-[10px] text-center text-white mt-1'>Daily Cipher</p>
                <p className='text-[10px] font-medium text-center text-gray-400 mt-2'>{dailyCipherTimeLeft}</p>

              </div>
              <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full
              relative'>
                <div className="dot"></div>
                <img src = {dailyCombo} alt="Daily Combo" className='mx-auto w-12 h-12'/>
                <p className='text-[10px] text-center text-white mt-1'>Daily Combo</p>
                <p className='text-[10px] font-medium text-center text-gray-400 mt-2'>{dailyComboTimeLeft}</p>
              </div>
            </div>

              <div className='px-4 mt-4 flex justify-center '>
                <div className='px-4 px-2 flex items-center space-x-2'>
                  <img src={dollarCoin} alt="Dollar coin" className='w-10 h-10'/>
                  <p className='text-4xl text-white'>{points.toLocaleString()}</p>

                </div>

              </div>
              <div className='px-4 mt-4 flex justify-center'>
                <div className='w-80 h-80 p-4 rounded-full circle-outer'
                onClick={handleCardClick}>
                  <div className='w-full h-full rounded-full circle-inner '>
                    <img src={mainCharacter} alt = "teste"
                    className='w-full h-full'/>

                  </div>

                </div>

              </div>



          </div>


        </div>
      </div>

      <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs'>
    <div className='text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl'>
        <img src={binanceLogo} alt="Exchange" className='w-8 h-8 mx-auto' />
        <p className='mt-1'>Exchange</p>
   
        </div>
        
        <a href="/friends"
        className='text-center text-[#85827d] w-1/5 hover:bg-gray-200' 
         onClick={() => console.log("Botão clicado")}
         >
          <Friends className='w-8 h-8 mx-auto'/>
         <p className='mt-1'>Friends</p>
         </a>

        <a href="/earn"
        className='text-center text-[#85827d] w-1/5 hover:bg-gray-200' 
         onClick={() => console.log("Botão clicado")}
              >
          <Coins className='w-8 h-8 mx-auto'/>
         <p className='mt-1'>Earn</p>
        </a>
        


       <a href="/Airdrop" className='text-center text-[#85827d] w-1/5'>
       <img src={hamsterCoin} alt="Airdrop" className='w-8 h-8 mx-auto'/>
       <p className='mt-1'>Airdrop</p>
       

       </a>
        </div>
        {clicks.map((click) => (
          <div
          key={click.id.toString()}
    className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
    style={{
      top: `${Number(click.y) - 42}px`,
      left: `${Number(click.x) - 28}px`,      
        animation: `float 1s ease-out`
    }}
    onAnimationEnd={() => handleAnimationEnd(Number(click.id))}
> 
    {pointsToAdd}
  </div>
))}

  

        <div >


        </div>
        </div>
     
  )
}
// cor do fundo quadrado linha 103 bg-gray-400
// dollar coin linha 90
// logo da binance linha 73 
export default App;
