import React from 'react'
import {mintNFT} from "../cadence/transactions/mint_nft.js";
import {setupUserTx} from "../cadence/transactions/setup_user.js";
import {listForSaleTx} from "../cadence/transactions/list_for_sale.js";
import {unlistFromSaleTx} from "../cadence/transactions/unlist_from_sale.js";
import Collection from "../Collection.js";
import SaleCollection from "../SaleCollection.js";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {create} from 'ipfs-http-client';
import {useState} from 'react';
import '../App.css';
const client = create('https://ipfs.infura.io:5001/api/v0');

const Mint = (props) => {
    const [nameOfNFT, setNameOfNFT] = useState('');
    const [file, setFile] = useState();
    const [officialAddress, setOfficialAddress] = useState('');
    const [address, setAddress] = useState();
    const [id, setID] = useState();
    const [price, setPrice] = useState();

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
    <>
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

        { props.user && props.user.addr && officialAddress && officialAddress !== ''
        ?
        <Collection address={officialAddress}></Collection>
        :
        null
        }

        { props.user && props.user.addr && officialAddress && officialAddress !== ''
            ?
            <SaleCollection address={officialAddress}></SaleCollection>
            :
            null
        }
    </>
  )
}

export default Mint