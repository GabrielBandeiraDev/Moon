import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dollarCoin, hamsterCoin } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Coins from './icons/Coins';

function App() {
  return (
    <div className='bg-gray-800 flex justify-center'>
      <div className='w-full text-white h-screen font-bold flex flex-col max-w-xl'>
        <div className='px-4 z-10'>
          <div className='flex items-center space-x-2 pt-4'>
            <div className='p-1 rounded-lg bg-gray-700'>
              <Hamster size={24} className='text-gray-400' />
            </div>
            <div>
              <p className='text-sm'>Gabriel (CEO)</p>
            </div>
          </div>
          <div className='flex items-center justify-between space-x-4 mt-1'>
            <div className='flex items-center w-1/3'>
              <div className='w-full'>
                <div className='flex justify-between'>
                  <p className='text-sm'></p>
                  <p className='text-sm'><span className='text-gray-500'>/10</span></p>
                </div>
                <div className='flex items-center mt-1 border-2 border-gray-600 rounded-full'>
                  <div className='w-full h-2 bg-gray-700 rounded-full'>
                    <div className='progress-gradient h-2 rounded-full' style={{ width: `` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center w-2/3 border-2 border-gray-600 rounded-full px-4 py-[2px] bg-gray-700 max-w-64'>
              <img src={binanceLogo} alt='Exchange' className='w-8 h-8' />
              <div className='flex-1 text-center'>
                <p className='text-xs text-gray-400 font-medium'>Convide Amigos !</p>
                <div className='flex items-center justify-center space-x-1'>
                  <img src={dollarCoin} alt="Dollar" className='w-[18px] h-[18px]' />
                  <Info size={20} className='text-gray-500' />
                </div>
              </div>
              <Settings className='text-white' />
            </div>
          </div>
        </div>
        <div className='flex-grow mt-4 bg-gray-900 rounded-t-[48px] relative top-glow z-0'>
          <div className='absolute top-[2px] left-0 right-0 bottom-0 bg-gray-800 rounded-t-[46px]'>
            <div className='flex justify-center items-center h-full'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-white'>Convide Amigos</h2>
                <p className='text-sm text-gray-400 mt-2'>Cada amigo que entrar pelo seu link, você ganha uma chance de entrar na lista de Airdrop Sem mesmo Doar!</p>
                <div className='mt-4'>
                  <p className='text-white font-medium'>Seu link de convite:</p>
                  <div className='bg-gray-700 p-2 rounded-md mt-2'>
                    <p className='text-gray-200'>https://t.me/MoonCG_bot</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-around mt-4'>
  <a href="/exchange" className='text-center text-gray-400 w-1/5 hover:bg-gray-700 p-2 rounded-2xl'>
    <img src={binanceLogo} alt="Exchange" className='w-8 h-8 mx-auto' />
    <p className='mt-1'>Exchange</p>
  </a>
  <a href="/Earn" className='text-center text-gray-400 w-1/5 hover:bg-gray-700 p-2 rounded-2xl'>
    <Coins className='w-8 h-8 mx-auto' />
    <p className='mt-1'>Redes Sociais</p>
  </a>
  <a href="/Airdrop" className='text-center text-[#85827d] w-1/5'>
       <img src={hamsterCoin} alt="Airdrop" className='w-8 h-8 mx-auto'/>
       <p className='mt-1'>Airdrop</p>
       

       </a>
</div>

      </div>
    </div>
  );
}

export default App;
