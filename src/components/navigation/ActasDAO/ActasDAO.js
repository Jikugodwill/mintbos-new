import React, { useState, useEffect } from "react";
import { _address } from "./lib/_address";
import { validateUserInDao } from "./lib/daoHelpers";

const LOCALSTORAGE_KEY = " actAsDao_data";

const getLocalStorageData = () => {
  try {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
  return null;
};

const setLocalStorageData = (data) => {
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

const ActAsDao = () => {
  const [actAsDao, setActAsDao] = useState(() => {
    const savedData = getLocalStorageData();
    return (
      savedData || {
        address: "",
        toggle: false,
      }
    );
  });

  const [inputActive, setInputActive] = useState(false);
  const [daoAddress, setDaoAddress] = useState("");
  const [daoError, setDaoError] = useState("");
  const [address, setAddress] = useState([]);

  useEffect(() => {
    setLocalStorageData(actAsDao);
  }, [actAsDao]);

  const handleToggle = (newToggle) => {
    setActAsDao((prev) => ({ ...prev, toggle: newToggle }));
    if (newToggle && !actAsDao.address) {
      setInputActive(true);
    }
  };

  // const markDaoAsDefault = (address) => {
  // Implement marking DAO as default if needed
  // };

  const addOrRemoveDaoAddress = (newAddress) => {
    setAddress(newAddress);
  };

  const handleAddDao = async (e) => {
    e.preventDefault();
    if (!daoAddress) {
      setDaoError("Please enter a valid DAO address.");
      return;
    }

    const check = await validateUserInDao(daoAddress);
    if (check) {
      setDaoError(check);
      return;
    }

    // if (addresses.includes(daoAddress)) {
    //   setDaoError("DAO address already exists.");
    //   return;
    // }

    // if (addresses.length === 0) {
    //   markDaoAsDefault(daoAddress);
    // }

    addOrRemoveDaoAddress(daoAddress);
    setDaoAddress("");
    setInputActive(false);
    setDaoError("");
  };
  return (
    <div className="act-as-dao">
      <div className="header">
        <label htmlFor="act-dao" className="label">
          <span>Act as DAO</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-info-circle info-icon"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
        </label>
        <label className="switch">
          <input
            type="checkbox"
            id="act-dao"
            checked={actAsDao.toggle}
            onChange={(e) => handleToggle(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      {actAsDao.toggle && (
        <div className="content">
          {actAsDao.address && !inputActive && (
            <div className="dao-address">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              <span>{_address(actAsDao.address, 22)}</span>
            </div>
          )}
          {inputActive || !actAsDao.address ? (
            <form onSubmit={handleAddDao}>
              <input
                type="text"
                className="dao-input"
                placeholder="Enter DAO address"
                value={actAsDao}
                onChange={(e) => setDaoAddress(e.target.value)}
              />
              {daoError && <p className="error">{daoError}</p>}
              <button type="submit">Add DAO</button>
            </form>
          ) : (
            <button className="change-dao" onClick={() => setInputActive(true)}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Change DAO
            </button>
          )}
        </div>
      )}
      <style jsx>{`
        .act-as-dao {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .header .label {
          font-size: 16px;
          display: flex;
          flex-direction: row;
          /* align-items: center; */
          gap: 5px;
        }
        .header svg {
          width: 12px;
        }
        .label {
          display: flex;
          align-items: center;
          font-weight: bold;
          color: #333;
        }
        .info-icon {
          margin-left: 8px;
        }
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
        }
        input:checked + .slider {
          background-color: #2196f3;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
        .content {
          margin-top: 16px;
        }
        .dao-address {
          display: flex;
          align-items: center;
          background-color: #e0e0e0;
          padding: 8px;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        .dao-address svg {
          margin-right: 8px;
        }
        .dao-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        .change-dao {
          display: flex;
          align-items: center;
          background-color: #2196f3;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;
        }
        .change-dao:hover {
          background-color: #1976d2;
        }
        .change-dao svg {
          margin-right: 8px;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

export default ActAsDao;
