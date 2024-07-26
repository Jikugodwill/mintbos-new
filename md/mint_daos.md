## DAOs on Mintbase!

### Overview

This page provides a user interface for searching and displaying Decentralized Autonomous Organizations (DAOs) on the Mintbase platform. The primary functionality includes searching for DAOs based on user input and displaying the results as cards, which contain detailed information about each DAO. The page is styled to support both dark and light modes for better user experience.

### DAO Card Component

The `DAOCard` component is responsible for rendering individual DAO details. It displays information such as the DAO's name, the number of owned NFTs, the number of members, and the number of proposals.

```
const { DAOCard } = VM.require(
  "${config_account}/widget/Mintbase.App.DAOs.DAOCard"
) || {
  DAOCard: () => <></>,
};

```

### MintDAOs Component

The `MintDAOs` component manages the state and logic for searching and displaying DAOs. It fetches the DAOs based on the user's search input and displays them using the `DAOCard` component. The cards have a green (connected user belongs to the DAO) and red (connected user does not belong to the DAO) indicator.

## Usage

To use this page, simply include the `MintDAOs` component in your application. It will handle the search functionality and display the DAO cards based on the user's input. The component also supports dark mode, which can be toggled using the `isDarkModeOn` prop.

## Conclusion

This page provides a seamless way for users to search for and explore DAOs on the Mintbase platform. The integration of styled components and asynchronous data fetching
