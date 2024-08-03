import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dollarCoin, hamsterCoin } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Coins from './icons/Coins';

function App() {
  return (
    <div className='bg-gray-800 flex flex-col h-screen'>
      <div className='flex-grow text-white font-bold max-w-xl mx-auto'>
        <div className='px-4 z-10'>
          <div className='flex items-center space-x-2 pt-4'>
            <div className='p-1 rounded-lg bg-gray-700 shadow-md'>
              <Hamster size={24} className='text-gray-400' />
            </div>
            <div>
              <p className='text-sm'>Savitar(CEO)</p>
            </div>
          </div>
          <div className='flex items-center justify-between space-x-4 mt-4'>
            <div className='flex items-center w-1/2'>
              <div className='w-full'>
                <div className='flex justify-between mb-1'>
                  <p className='text-sm text-gray-400'>Progress:</p>
                  <p className='text-sm text-gray-500'><span>/10</span></p>
                </div>
                <div className='flex items-center mt-1 border-2 border-gray-600 rounded-full'>
                  <div className='w-full h-2 bg-gray-700 rounded-full'>
                    <div className='progress-gradient h-2 rounded-full' style={{ width: `50%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center w-1/2 border-2 border-gray-600 rounded-full px-4 py-[2px] bg-gray-700 max-w-64 shadow-md'>
              <img src={binanceLogo} alt='Exchange' className='w-8 h-8' />
              <div className='flex-1 text-center mx-2'>
                <p className='text-xs text-gray-400 font-medium'>Convide Amigos e Ganhe!</p>
                <div className='flex items-center justify-center space-x-1'>
                  <img src={dollarCoin} alt="Dollar" className='w-[18px] h-[18px]' />
                  <Info size={20} className='text-gray-500' />
                </div>
              </div>
              <Settings className='text-white' />
            </div>
          </div>
        </div>
        <div className='flex flex-col bg-gray-900 p-4 rounded-t-lg mt-4 shadow-md'>
          <h2 className='text-xl font-bold text-white mb-2'>Acompanhe Nas Redes Sociais</h2>
          <ul className='list-disc list-inside text-gray-400'>
            <li className='mt-2'>Entre no canal do Telegram: <a href="https://t.me/gb2bet" className='text-blue-400 hover:underline'>https://t.me/gb2bet</a></li>
            <li className='mt-2'>Siga no Twitter: <a href="INDISPONIVEL" className='text-blue-400 hover:underline'>https://x.com/ForGBMoney</a></li>
            <li className='mt-2'>Siga no Instagram: <a href="https://www.instagram.com/moon_cryptocg?igsh=bzh4MG9vb2diaHV4&utm_source=qr" className='text-blue-400 hover:underline'>https://www.instagram.com/moon_cryptocg?igsh=bzh4MG9vb2diaHV4&utm_source=qr</a></li>
          </ul>
        </div>
        <div className='bg-gray-900 p-4 rounded-t-lg mt-4 shadow-md'>
        </div>
      </div>
      <div className='flex justify-around p-4 bg-gray-800 border-t border-gray-700 shadow-md'>
        <a href="/exchange" className='text-center text-gray-400 w-1/3 hover:bg-gray-700 p-3 rounded-2xl transition duration-200 ease-in-out'>
          <img src={binanceLogo} alt="Exchange" className='w-8 h-8 mx-auto' />
          <p className='mt-1'>Exchange</p>
        </a>
        <button className='text-center text-gray-400 w-1/3 hover:bg-gray-700 p-3 rounded-2xl transition duration-200 ease-in-out'>
          <Coins className='w-8 h-8 mx-auto' />
          <p className='mt-1'>Earn</p>
        </button>
        <a href="/Airdrop" className='text-center text-[#85827d] w-1/5'>
       <img src={hamsterCoin} alt="Airdrop" className='w-8 h-8 mx-auto'/>
       <p className='mt-1'>Airdrop</p>
       

       </a>
      </div>
    </div>
  );
}

export default App;
