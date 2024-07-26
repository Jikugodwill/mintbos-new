## Mintbase DAO Methods!

Mintbase DAO (Decentralized Autonomous Organization) methods allow users to interact with the Mintbase platform in a decentralized and community-driven manner. These methods enable the creation of proposals, voting, and execution of various actions related to NFTs and their associated smart contracts. One of the key methods is `listAsADao`, which facilitates listing NFTs as part of a DAO proposal.

#### List of Actions You can carry out as a DAO

- List NFT as a DAO
- Mint NFT as a DAO
- Deploy Store as DAO
- Buy NFT as a DAO

### List NFT as a DAO Method

The `listAsADao` method allows a DAO to propose and execute the listing of NFTs on the Mintbase marketplace. This function requires several parameters including the DAO ID, contract address, token IDs, mainnet flag, price, list amount, and an optional fungible token (ft). Here is the implementation of the `listAsADao` method:- `contractAddress`: which is the address of the contract.

```js
const listAsADao = (
  daoId,
  contractAddress,
  tokenIds,
  mainnet,
  price,
  listAmount,
  ft
) => {
  if (!contractAddress) return;
  if (tokenIds.length < 1) return;

  const gas = 2.25e14;
  let msg = { price: _price(price) };

  const ids = tokenIds.slice(0, listAmount).map((data) => ({
    token_id: data,
    account_id: mainnet
      ? MARKET_CONTRACT_ADDRESS.mainnet
      : MARKET_CONTRACT_ADDRESS.testnet,
    msg: JSON.stringify(msg),
  }));

  return Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `A Proposal for Deposit on Listing`,
          kind: {
            FunctionCall: {
              receiver_id: mainnet
                ? MARKET_CONTRACT_ADDRESS.mainnet
                : MARKET_CONTRACT_ADDRESS.testnet,
              actions: [
                {
                  method_name: "deposit_storage",
                  args: fc_args(
                    JSON.stringify({
                      autotransfer: true,
                    })
                  ),
                  gas: gas?.toString(),
                  deposit: "10000000000000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: 100000000000000000000000,
      gas: 200000000000000,
    },
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `A Proposal to List this NFT on Mintbase`,
          kind: {
            FunctionCall: {
              receiver_id: contractAddress,
              actions: [
                {
                  method_name: "nft_approve",
                  args: fc_args(JSON.stringify(...ids)),
                  deposit:
                    listAmount > 1 ? `9300${"0".repeat(18)}` : LISTING_DEPOSIT,
                  gas: GAS,
                },
              ],
            },
          },
        },
      },
      deposit: 100000000000000000000000,
      gas: 200000000000000,
    },
  ]);
};
```

In this example, the method first checks if the contract address and token IDs are valid. It then constructs a message with the specified price and maps the token IDs to the appropriate contract and account IDs based on the network (mainnet or testnet). The method prepares two proposals for the DAO: one for depositing storage and another for listing the NFTs. These proposals are then submitted to the DAO using the `Near.call` function, ensuring that the actions are executed if the proposals are approved by the DAO members.

### Deploy Store as a DAO Method

The `deployStoreAsADao` method allows a DAO to propose and execute the creation of a new store on the Mintbase platform. This function requires several parameters including the DAO ID, store name, store symbol, reference, reference hash, network flag (isMainnet), and account ID. Here is the implementation of the `deployStoreAsADao` method:

```js
const deployStoreAsADao = ({
  daoId,
  storeName,
  storeSymbol,
  reference,
  referenceHash,
  isMainnet,
  accountId,
}) => {
  const base_uri = "https://arweave.net";
  const isSignedin = !!accountId;
  console.log("isSignedin", context);
  const gas = 2e14;
  const deposit = 65e23;
  if (!isSignedin) return console.log("sign in first");
  if (!storeName || !storeSymbol) {
    return console.log("missing store name or symbol");
  }
  try {
    return Near.call([
      {
        contractName: daoId,
        methodName: "add_proposal",
        args: {
          proposal: {
            description: `A Proposal to Create a Store on Mintbase`,
            kind: {
              FunctionCall: {
                receiver_id: isMainnet
                  ? "mintbase1.near"
                  : "mintspace2.testnet",
                actions: [
                  {
                    method_name: "create_store",
                    args: fc_args(
                      JSON.stringify({
                        owner_id: daoId,
                        metadata: {
                          name: storeName,
                          spec: spec,
                          symbol: storeSymbol,
                          base_uri,
                          ...(reference && { reference }),
                          ...(referenceHash && {
                            reference_hash: referenceHash,
                          }),
                        },
                      })
                    ),
                    deposit: convertScientificToNormal(deposit),
                    gas: convertScientificToNormal(gas),
                  },
                ],
              },
            },
          },
        },
        deposit: 100000000000000000000000,
        gas: 200000000000000,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
```

In this example, the method first checks if the user is signed in and if the store name and symbol are provided. It then constructs the necessary parameters for creating the store, including metadata such as the store name, symbol, and optional references. The method prepares a proposal for the DAO to create the store and submits it using the `Near.call` function. If the proposal is approved by the DAO members, the store will be created on the Mintbase platform.

These DAO methods exemplify how decentralized governance and community involvement can be integrated into the operations of NFT marketplaces like Mintbase. By utilizing these methods, users can participate in the decision-making process and contribute to the growth and development of the platform.
