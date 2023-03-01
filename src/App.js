import './App.css';
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';
import img1 from './images/video.mp4'
import Mint from './pages/Mint';
// const projectId = 'xx';
// const projectSecret = 'xx';
// const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
// const options = {
//   host: 'ipfs.infura.io',
//   protocol: 'https',
//   port: 5001,
//   apiPath: '/ipfs/api/v0',
//   headers: {
//     authorization: auth,
//   },
// };
// const dedicatedEndPoint = 'https://xx.infura-ipfs.io';
// const client = create(options);

//0x313f4090b991a391
fcl.config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function App() {
  const [user, setUser] = useState();
  const [id, setID] = useState();
  const [price, setPrice] = useState();
  const [address, setAddress] = useState();
  const [officialAddress, setOfficialAddress] = useState('');

  useEffect(() => {
    // sets the `user` variable to the person that is logged in through Blocto
    fcl.currentUser().subscribe(setUser);
  }, [])

  const logIn = () => {
    // log in through Blocto
    fcl.authenticate();
  }

  return (
    <div className="App">
     <div className='head-box'>
        <div className='titleadd'>
          <h1 className='heading'>Unique Natural Moments NFT Marketplace</h1>
          <h3 className='titleadd-h3'><small>Account address:</small> {user && user.addr ? user.addr : ''}</h3>
        </div>

        <div className='endadd'>
          <button className='btn' onClick={() => logIn()}>Sign In</button>
          <button className='btn' onClick={() => fcl.unauthenticate()}>Sign Out</button>
        </div>
     </div>

     {/* <div >
       <img src={img1} className='image' alt="fire"/>
     </div> */}

     <div >
      <video className='vid' width="320" height="340" controls>
          <source src={img1} type="video/mp4"/>
        </video>
     </div>


      <div>
        {/* <Mint user={user}/> */}
      </div>
    </div>
  );
}

export default App;