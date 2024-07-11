import { naxiosInstance } from "./naxiosInstance";

export const checkIfDaoAddress = (addresss) => {
  return addresss.endsWith(
    "mainnet" ? "sputnik-dao.near" : "sputnik-dao.testnet" // TODO: not sure about this one
  );
};

export const validateUserInDao = async (daoAddress) => {
  try {
    // Check if daoAddress is provided and valid
    if (!daoAddress || typeof daoAddress !== 'string') {
      return "Please enter a valid DAO address.";
    }

    const daoContractApi = naxiosInstance.contractApi({
      contractId: daoAddress,
    });

    // Check if daoContractApi was created successfully
    if (!daoContractApi) {
      return "Failed to create DAO contract API. Please check the DAO address.";
    }

    try {
      const policy = await daoContractApi.view("get_policy");
      console.log("policy", policy);

      // Check if policy exists
      if (!policy) {
        return "Unable to retrieve DAO policy. Please check if the DAO address is correct.";
      }

      // If we've reached this point, validation was successful
      return "";
    } catch (viewError) {
      console.error("Error viewing DAO policy:", viewError);
      return "Error retrieving DAO policy. Please ensure the DAO address is correct and try again.";
    }

  } catch (error) {
    console.error("Error in validateUserInDao:", error);
    return "An unexpected error occurred. Please try again later.";
  }
};

// export function updateList(list, item) {
//   const index = list.indexOf(item);
//   if (index === -1) {
//     // Item does not exist, add it
//     list.push(item);
//   } else {
//     // Item exists, remove it
//     list.splice(index, 1);
//   }
//   return list;
// }
