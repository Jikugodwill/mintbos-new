import React, { useCallback } from "react";
import { Widget, useNear, useAccount } from "near-social-vm";
import styled from "styled-components";
import { User } from "../../icons/User";
import { LogOut } from "../../icons/LogOut";
import { Withdraw } from "../../icons/Withdraw";
import { NavLink } from "react-router-dom";
import PretendModal from "../PretendModal";
import { Pretend } from "../../icons/Pretend";
import { StopPretending } from "../../icons/StopPretending";
import { QR } from "../../icons/QR";
import MobileQRModal from "../MobileQRModal";
import Attach from "../../icons/Attach";
import ActAsDao from "../ActasDAO/ActasDAO";

const StyledDropdown = styled.div`
  button,
  a {
    font-weight: 500;
  }
  .dropdown-toggle {
    display: flex;
    align-items: center;
    text-align: left;
    background-color: var(--mb-white);
    border-radius: 50px;
    outline: none;
    border: 0;

    &:after {
      color: #fff;
    }

    img {
      border-radius: 50% !important;
    }

    .profile-info {
      margin: 5px 10px;
      line-height: normal;
      max-width: 140px;

      .profile-name,
      .profile-username {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .profile-name {
        color: var(--gray-900);
      }
    }
  }

  ul {
    background-color: var(--mb-white);
    width: 100%;
    border-radius: 0px;
    border: 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 16px 12px;

    li {
      padding: 0 6px;
    }
  }
  .dropdown-menu.show {
    margin: 10px !important;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .tab,
  .ctab {
    text-decoration: none;
    text-align: left;
    display: flex;
    align-items: center;
    /* justify-content: flex-end; */
    gap: 0.2rem;
    border-radius: 0.25rem; /* Assuming default border radius */
    color: ${({ isDarkModeOn }) =>
      isDarkModeOn ? "#fff" : "#000"}; /* Ternary for text color */
    padding: 8px 12px; /* Assuming Tailwind CSS default spacing unit */
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Assuming Tailwind CSS default timing function and duration */
    white-space: nowrap;
    cursor: pointer;
    width: fit-content;

    svg {
      margin-right: 7px;
      min-width: 24px;
      path {
        stroke: ${({ isDarkModeOn }) => (isDarkModeOn ? "#fff" : "#000")};
      }
    }

    &:focus {
      color: ${({ isDarkModeOn }) => (isDarkModeOn ? "#C5D0FF" : "#4F58A3")};
      outline: 2px solid transparent; /* Assuming Tailwind CSS default focus outline */
      outline-offset: 2px; /* Assuming Tailwind CSS default focus outline offset */
      box-shadow: 0 0 0 2px
        ${({ isDarkModeOn }) =>
          isDarkModeOn
            ? "rgba(59, 130, 246, 0.5)"
            : "rgba(66, 153, 225, 0.5)"}; /* Ternary for box-shadow */
      background-color: ${({ isDarkModeOn }) =>
        isDarkModeOn
          ? "rgba(59, 130, 246, 0.35)"
          : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
      svg {
        path {
          stroke: ${({ isDarkModeOn }) =>
            isDarkModeOn ? "#C5D0FF" : "#4F58A3"};
        }
      }
    }

    &:hover {
      color: ${({ isDarkModeOn }) => (isDarkModeOn ? "#C5D0FF" : "#4F58A3")};
      background-color: ${({ isDarkModeOn }) =>
        isDarkModeOn
          ? "rgba(59, 130, 246, 0.15)"
          : "rgba(66, 153, 225, 0.15)"}; /* Ternary for background-color */
      svg {
        path {
          stroke: ${({ isDarkModeOn }) =>
            isDarkModeOn ? "#C5D0FF" : "#4F58A3"};
        }
      }
    }

    @media (max-width: 768px) {
      padding: 12px;
      font-size: 12px;
      line-height: 14px;
    }
  }
  .ctab {
    background-color: var(--gray-100);
    color: var(--gray-800);
    width: 100%;
    font-size: 12px;
  }
`;

export function UserDropdown({ isDarkModeOn, ...props }) {
  const near = useNear();
  const account = useAccount();

  const withdrawStorage = useCallback(async () => {
    await near.contract.storage_withdraw({}, undefined, "1");
  }, [near]);

  console.log("here", near);

  const [showPretendModal, setShowPretendModal] = React.useState(false);
  const [showMobileQR, setShowMobileQR] = React.useState(false);

  return (
    <>
      <StyledDropdown className="dropdown" isDarkModeOn={isDarkModeOn}>
        <button
          className="dropdown-toggle"
          type="button"
          id="dropdownMenu2222"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Widget
            src={props.widgets.profileImage}
            props={{
              accountId: account.accountId,
              className: "d-inline-block",
              style: { width: "40px", height: "40px" },
            }}
          />
          {/* {props.widgets.profileName && (
                  <div className="profile-name">
                    <Widget src={props.widgets.profileName} />
                  </div>
                )} */}
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenu2222"
          style={{ minWidth: "fit-content" }}
        >
          <li>
            <NavLink
              type="button"
              className="dropdown-item ctab"
              to={`/${props.widgets.profileSettingsPage}?page=human&tab=user-settings&accountId=${account.accountId}`}
            >
              <Attach />
              {account.accountId}
            </NavLink>
          </li>
          <li>
            <ActAsDao accountId={account.accountId} />
          </li>
          <li>
            <NavLink
              className="dropdown-item tab"
              type="button"
              to={`/${props.widgets.profilePage}?page=human&tab=owned&accountId=${account.accountId}`}
            >
              <User />
              View Profile
            </NavLink>
          </li>
          <li>
            <button
              className="dropdown-item tab"
              type="button"
              onClick={() => withdrawStorage()}
            >
              <Withdraw />
              Withdraw {props.availableStorage.div(1000).toFixed(2)}kb
            </button>
          </li>
          {account.pretendAccountId ? (
            <li key="pretend">
              <button
                className="dropdown-item tab"
                type="button"
                disabled={!account.startPretending}
                onClick={() => account.startPretending(undefined)}
              >
                <StopPretending />
                Stop pretending
              </button>
            </li>
          ) : (
            <>
              <li key="stop-pretend">
                <button
                  className="dropdown-item tab"
                  type="button"
                  onClick={() => setShowPretendModal(true)}
                >
                  <Pretend />
                  Pretend to be another account
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item tab"
                  type="button"
                  onClick={() => setShowMobileQR(true)}
                >
                  <QR />
                  Mobile Sign-in QR
                </button>
              </li>
            </>
          )}
          <li>
            <button
              className="dropdown-item tab"
              type="button"
              onClick={() => props.logOut()}
            >
              <LogOut />
              Sign Out
            </button>
          </li>
        </ul>
      </StyledDropdown>
      {showPretendModal && (
        <PretendModal
          key="pretend-modal"
          show={showPretendModal}
          onHide={() => setShowPretendModal(false)}
          widgets={props.widgets}
        />
      )}
      {showMobileQR && (
        <MobileQRModal
          key="mobile-qr-modal"
          show={showMobileQR}
          onHide={() => setShowMobileQR(false)}
        />
      )}
    </>
  );
}
