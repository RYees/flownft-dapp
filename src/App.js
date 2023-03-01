import './App.css';

import Collection from "./Collection.js";
import SaleCollection from "./SaleCollection.js";

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';
import {create} from 'ipfs-http-client';
import {mintNFT} from "./cadence/transactions/mint_nft.js";
import {setupUserTx} from "./cadence/transactions/setup_user.js";
import {listForSaleTx} from "./cadence/transactions/list_for_sale.js";
import {unlistFromSaleTx} from "./cadence/transactions/unlist_from_sale.js";
import img1 from './images/video.mp4'
const client = create('https://ipfs.infura.io:5001/api/v0');

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
  const [nameOfNFT, setNameOfNFT] = useState('');
  const [file, setFile] = useState();
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

  const mint = async () => {
    try {
      const added = await client.add(file)
      const hash = added.path;
      const transactionId = await fcl.send([
        fcl.transaction(mintNFT),
        fcl.args([
          fcl.arg(hash, t.String),
          fcl.arg(nameOfNFT, t.String)
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999)
      ]).then(fcl.decode);
  
      console.log(transactionId);
      return fcl.tx(transactionId).onceSealed();
    } catch(error) {
      console.log('Error uploading file: ', error);
    }
  }

  const setupUser = async () => {
    const transactionId = await fcl.send([
      fcl.transaction(setupUserTx),
      fcl.args([]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log(transactionId);
    return fcl.tx(transactionId).onceSealed();
  }

  const listForSale = async () => {
    const transactionId = await fcl.send([
      fcl.transaction(listForSaleTx),
      fcl.args([
        fcl.arg(parseInt(id), t.UInt64),
        fcl.arg(price, t.UFix64)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log(transactionId);
    return fcl.tx(transactionId).onceSealed();
  }

  const unlistFromSale = async () => {
    const transactionId = await fcl.send([
      fcl.transaction(unlistFromSaleTx),
      fcl.args([
        fcl.arg(parseInt(id), t.UInt64)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log(transactionId);
    return fcl.tx(transactionId).onceSealed();
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
        <input className='inp' type="text" onChange={(e) => setNameOfNFT(e.target.value)} />
        <input className='inp' type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className='btn' onClick={() => mint()}>Mint</button>
      </div>

      <button className='btn' onClick={() => setupUser()}>Setup User</button>

      <div>
        <input className='inp' type="text" onChange={(e) => setAddress(e.target.value)} />
        <button className='btn' onClick={() => setOfficialAddress(address)}>Search</button>
      </div>

      <div>
        <input className='inp' type="text" onChange={(e) => setID(e.target.value)} />
        <input className='inp' type="text" onChange={(e) => setPrice(e.target.value)} />
        <button className='btn' onClick={() => listForSale()}>Lift NFT for Sale</button>
        <button className='btn' onClick={() => unlistFromSale()}>Unlist an NFT from Sale</button>
      </div>

      { user && user.addr && officialAddress && officialAddress !== ''
        ?
        <Collection address={officialAddress}></Collection>
        :
        null
      }

      { user && user.addr && officialAddress && officialAddress !== ''
        ?
        <SaleCollection address={officialAddress}></SaleCollection>
        :
        null
      }
      
      
    </div>
  );
}

export default App;