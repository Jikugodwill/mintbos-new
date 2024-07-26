## Mintbase NFT Method!

A huge part of the mintbos is ability to carry out mintbase functionalities on NFTS. NFT methods which includes `minting, listing, delisting, buying, burning, and multiplying` of NFTs, all of which could be easly called as function. Defined in the `{NAME}/widget/NFT.modules` file. An example shown below, the listing method

### Listing Method

Listing involves two contracts call: one for deposit `storage_deposit` and `nft_approve` to list.
This method has the following required parameters.

- `contractAddress`: which is the address of the contract.
- `tokenIds`: the token ids of the NFT, could be one or more (multiple listing).
- `mainnet`: if this is true, it lists to mainnet and if false, testnet.
- `listAmount`: amount of available multiples to be listed.
- `ft`: usdt or usdc list type (optional).

```js
/**
 * The function `listNFT` lists NFTs for sale on a marketplace contract, handling different scenarios
 * based on parameters such as contract address, token IDs, price, and fungible token.
 * @returns The `listNFT` function returns the result of calling the `Near.call` function with an array
 * of objects containing contract information for depositing storage and listing NFTs. If an error
 * occurs during the process, the function catches the error and logs it to the console.
 */

const listNFT = (contractAddress, tokenIds, mainnet, price, listAmount, ft) => {
  const storageDeposit = listAmount * 1e22;
  if (!contractAddress) return;
  if (tokenIds.length < 1) return;

  const gas = 2.25e14;
  // const storageDeposit = 1e22;
  let msg = { price: _price(price) };
  let optionalDeposit = [];

  if (ft) {
    // Listing to USDT and USDC Contracts
    const ftContractId = ftContracts[ft].mainnet;
    msg.ft_contract = ftContractId;
    msg.price = `${Number(price) * 1000000}`;

    // Extra Deposit
    optionalDeposit.push({
      contractName: ftContracts[ft].mainnet,
      methodName: "storage_deposit",
      args: {
        registration_only: true,
      },
      gas: gas,
      deposit: `1250${"0".repeat(18)}`,
    });
  }

  const ids = tokenIds.slice(0, listAmount).map((data) => ({
    contractName: contractAddress,
    args: {
      token_id: data,
      account_id: mainnet
        ? MARKET_CONTRACT_ADDRESS.mainnet
        : MARKET_CONTRACT_ADDRESS.testnet,
      msg: JSON.stringify(msg),
    },
    methodName: "nft_approve",
    deposit: listAmount > 1 ? `9300${"0".repeat(18)}` : LISTING_DEPOSIT,
    gas: GAS,
  }));

  try {
    return Near.call([
      {
        contractName: mainnet
          ? MARKET_CONTRACT_ADDRESS.mainnet
          : MARKET_CONTRACT_ADDRESS.testnet,
        methodName: "deposit_storage",
        args: {
          autotransfer: true,
        },
        gas: gas,
        deposit: storageDeposit.toString(),
      },
      ...optionalDeposit,
      ...ids,
    ]);
  } catch (error) {
    console.log(error);
  }
};
```
