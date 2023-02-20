export const mintNFT = `
import MyNFT from 0x313f4090b991a391

transaction(ipfsHash: String, metadata: {String: String}) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&MyNFT.Collection>(from: /storage/MyNFTCollection)
                     ?? panic("This collection does not exist here")
    let nft <- MyNFT.createToken(ipfsHash: ipfsHash, metadata: metadata)
    collection.deposit(token: <- nft)
  }

  execute {
    log("A user minted an NFT in to their account")
  }
}
`