import logo from './logo.svg';
import './App.css';
import web3 from './web3.js'
import lottery from './lottery';
import { useEffect, useState } from 'react';

function App() {

  const [manager, setmanager] = useState('');
  const [players, setplayers] = useState([]);
  const [balance, setbalance] = useState('');
  const [input, setinput] = useState('');
  const [msg, setmsg] = useState('');

  const onchange =(e)=>{
    setinput(e.target.value);
    console.log(input);
  }

  const onSubmit  = async(event)=>{
    // event.preventDefault();
    console.log("Submitted")
    const accounts =  await web3.eth.getAccounts();

    setmsg("transanction in progress !!");
    await lottery.methods.enter().send({
      from:accounts[0],
      value:web3.utils.toWei(input,'ether')
    });
    setmsg("You have entered successfully !!");
  };
  
  
  const findwinner  = async()=>{
    const accounts = await web3.eth.getAccounts();
    setmsg("finding winner !!");
    await lottery.methods.pickWinner().send({
      from:accounts[0]
    });
    setmsg("To find winner check your accounts !!");


    
  };
  
  useEffect(() => {
      const getmanager = async()=>{
        const man  = await lottery.methods.manager().call();
        setmanager(man);
        const player  = await lottery.methods.getPlayers().call();
        setplayers(player);
        console.log(player);
        const bal  = await web3.eth.getBalance(lottery.options.address);
        setbalance(bal);
        console.log(bal);
      
      }
      getmanager();

  }, [])
  
  // web3.eth.getAccounts().then(console.log);
  // console.log(web3.version);
  return (
    <div className="App">

      <div>
      address of the manager is:
     {manager}
      </div>

      <div>
        total players currently are : { players.length}
      </div>
      <div>
        the current prize money  is : {web3.utils.fromWei(balance,'ether')} ether 
      </div>

      <hr />

      <div>
        <h3>wanna try luck</h3>
        <div>
          amount of ether to enter
          <input value={input} onInput={(e)=>onchange(e)} type="number" />
        </div>
        <div>clack to enter<button onClick={()=>onSubmit()}>submit</button></div>
      </div>

      <hr />

      <div>

        tap to pick a winner !!
         <div>
        <button onClick={() =>findwinner()}>pick winner</button>
         </div>

      </div>

      <h2>{msg}</h2>

    
    </div>
  );
}

export default App;
