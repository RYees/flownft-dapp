export const mintNFT = `
import MyNFT from 0x313f4090b991a391

transaction(ipfsHash: String, name: String) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&MyNFT.Collection>(from: /storage/MyNFTCollection)
                     ?? panic("This collection does not exist here")
    let nft <- MyNFT.createToken(ipfsHash: ipfsHash, metadata: {"name": name})
    collection.deposit(token: <- nft)
  }

  execute {
    // let metadata : {String : String} = {
    //   "name": "The New Pic",
    //   "swing_velocity": "29", 
    //   "swing_angle": "45", 
    //   "rating": "5",
    //   "uri": "ipfs://QmPsoxbJVdf4G7aQVkR9PJ4jEPnNnf7sceJ6yHbZJz9MJZ"
    // }
    // let nft <- MyNFT.createToken(ipfsHash: ipfsHash, metadata: {"name": name})
    // collection.deposit(token: <- nft)

    // self.receiverRef.deposit(token: <-newNFT, metadata: metadata)

    log("A user minted an NFT in to their account")
  }
}
`