## SDK Guide!

### Overview

This guide provides a comprehensive list of all the functionalities available on Mintbase and demonstrates how to use them. It includes detailed examples of importing, using, and calling these functionalities within your project.

### Example Function: Transfer Store Ownership

This example illustrates how to transfer ownership of a store on Mintbase using the `transferStoreOwnership` function.
This is just an example to

#### Importing the Function

To use the `transferStoreOwnership` function, you need to import it from the SDK. Here’s how you can do it:

```js
const { transferStoreOwnership } = VM.require(
  "${config_account}/widget/Mintbase.utils.sdk"
);
```

#### Calling the Function

Once the function is imported, you can call it by passing the required parameters. In this example, the function is called within the `onSign` method, which is triggered by a user action, such as clicking a button. you could also add validations when calling the method and error checks

```js
const onSign = () => {
  transferStoreOwnership(contractId, transferAccountName);
};
```

#### Base Function Implementation

Below is the base implementation of the `transferStoreOwnership` function. This function takes the current contract name and the new owner's account name as parameters and performs the ownership transfer.

```js
function transferStoreOwnership(contractName, newOwner) {
  const deposit = 1;
  try {
    return Near.call([
      {
        contractName,
        args: {
          new_owner: newOwner,
          keep_old_minters: true,
        },
        methodName: "transfer_store_ownership",
        deposit,
        gas: GAS,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}
```

### Detailed Explanation

1.  **Importing the Function**: The function is imported using the `VM.require` method. Replace `${config_account}` with the appropriate configuration account path.
2.  **Calling the Function**: The `onSign` method demonstrates how to call the `transferStoreOwnership` function. The `contractId` and `transferAccountName` are the parameters required by the function, representing the current contract's name and the new owner's account name, respectively.
3.  **Function Implementation**:

    - **Parameters**: The `transferStoreOwnership` function takes two parameters: `contractName` (the name of the current contract) and `newOwner` (the new owner's account name).
    - **Deposit**: A deposit of 1 NEAR token is specified for the transaction.
    - **Near.call**: The function uses `Near.call` to make the contract call. It includes the contract name, the method name (`transfer_store_ownership`), and the required arguments (`new_owner` and `keep_old_minters`). The `deposit` and `gas` are also specified.
    - **Error Handling**: If an error occurs during the call, it is logged to the console or you could add custom handling.

This example serves as a **template** for using other **functionalities** provided by the Mintbase SDK. Follow similar steps to import, call, and handle other functions as needed.
