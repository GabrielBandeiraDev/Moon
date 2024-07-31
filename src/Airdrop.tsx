import  { useEffect, useState } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dollarCoin, hamsterCoin } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Coins from './icons/Coins';

function App() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [confirmationClicked, setConfirmationClicked] = useState(false);
  const [confirmationTime, setConfirmationTime] = useState<Date | null>(null);

  useEffect(() => {
    // Perform any side-effects or initializations here
    console.log('Component mounted or updated');
  }, []);

  const handlePayment = () => {
    // Logic to process the payment (send data, validation, etc.)
    console.log(`Address: ${address}`);
    console.log(`Amount: ${amount}`);
    // Add logic to call an API, validate the data, etc.
    
    // Show payment information
    setShowPaymentInfo(true);
    setConfirmationTime(new Date()); // Mark the time when the donation was processed
  };

  const handleConfirmation = () => {
    const now = new Date();
    if (confirmationTime) {
      const timeDiff = (now.getTime() - confirmationTime.getTime()) / 1000 / 60; // time difference in minutes

      if (timeDiff < 2) {
        alert('Você não doou. Por favor, aguarde um pouco mais antes de confirmar.');
      } else if (timeDiff >= 3 && timeDiff <= 5) {
        alert('Doação confirmada! Você receberá o airdrop quando a coleta chegar a um valor astronômico.');
      } else {
        alert('Tempo de confirmação inválido. Por favor, tente novamente.');
      }

      setConfirmationClicked(true);
    }
  };

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
        
        <div className='bg-gray-900 p-4 rounded-t-lg mt-4 shadow-md'>
          <h2 className='text-xl font-bold text-white mb-4'>Faça uma Doação</h2>
          <div className='mb-4'>
            <label htmlFor='address' className='block text-gray-400 mb-2'>Endereço da sua Carteira:</label>
            <input
              id='address'
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white'
              placeholder='Digite o endereço da carteira'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='amount' className='block text-gray-400 mb-2'>Valor da sua Doação:</label>
            <input
              id='amount'
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white'
              placeholder='Digite o valor da doação'
            />
          </div>
          <button
            onClick={handlePayment}
            className='w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200'
          >
            Enviar Doação
          </button>

          {showPaymentInfo && (
            <div className='mt-4 p-4 bg-gray-800 rounded-md border border-gray-700'>
              <h3 className='text-lg font-bold text-white mb-2'>Informações de Pagamento</h3>
              <p className='text-gray-400 mb-2'>Chave PIX: <span className='text-blue-400'>SUA-CHAVE-PIX</span></p>
              <p className='text-gray-400 mb-2'>Carteira Meta: <span className='text-blue-400'>SUA-CARTEIRA-META</span></p>
              <p className='text-gray-400 mt-4'>
                Agradecemos sua generosidade! O valor da sua doação ajuda a fortalecer o projeto. 
                Em reconhecimento, o valor do airdrop que você receberá será maior conforme o valor da sua doação. 
                Sua contribuição é essencial e cada real conta para o nosso sucesso!
              </p>
              <p>
                PIX : Nós Salvamos a Carteira que você associou junto ao valor da doação, para entrega do Airdrop  
              </p>
              <p>Carteira Meta : Associamos a sua carteira para o recebimento do Airdrop. </p>
              {!confirmationClicked && (
                <button
                  onClick={handleConfirmation}
                  className='w-full p-2 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200'
                >
                  Confirmo que Doei!
                </button>
              )}
            </div>
          )}
        </div>

        <div className='bg-gray-900 p-4 rounded-t-lg mt-4 shadow-md'>
          <h2 className='text-xl font-bold text-white mb-2'>Acompanhe Nas Redes Sociais</h2>
          <p className='text-gray-400'>
            Para mais informações e atualizações, siga-nos nas redes sociais. Sua participação é muito importante para nós.
          </p>
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
        <div className='text-center text-gray-400 w-1/3 hover:bg-gray-700 p-3 rounded-2xl transition duration-200 ease-in-out'>
          <img src={hamsterCoin} alt="Airdrop" className='w-8 h-8 mx-auto' />
          <p className='mt-1'>Airdrop</p>
        </div>
      </div>
    </div>
  );
}

export default App;
