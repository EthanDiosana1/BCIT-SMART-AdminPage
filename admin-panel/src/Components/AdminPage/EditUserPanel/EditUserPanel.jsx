import "./EditUserPanel.css";
import urls from "../../../data/urls.json";
import { useState } from "react";
import { EditableUserTable } from "./EditableUserTable";
import { DeleteUserModal } from "./Modals/DeleteUserModal";

/** Panel for editing users.
 *
 * @param {*} props
 * @returns
 */
export function EditUserPanel({ user, backButtonHandler }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");

  function deleteUserButtonHandler() {
    setIsModalOpen(true);
  }

  function handleChange(event, state) {
    state(event.target.value);
  }

  function closeButtonHandler() {
    setIsModalOpen(false);
  }

  function submitDeleteUser() {
    if (textInputValue === "yes") {
      try {
        const queryString = "?user_id=" + user.user_id;
        const endpoint = `${urls.sqlDatabaseAPI}/deleteUser` + queryString;
        const response = fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`Error! Response status: ${response.status}`);
          }
            // setSelectedUserId(null);
          return response;
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not deleted");
    }
  }

  return (
    <div className="edit-user-panel">
      <div>
        <button onClick={() => backButtonHandler()}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
      <h1>UserId: {user.user_id}</h1>
      <EditableUserTable
        user={user}
        deleteUserButtonHandler={deleteUserButtonHandler}
      />
      <DeleteUserModal
        isOpen={isModalOpen}
        title="Are you sure you want to delete this user?"
        textInputValue={textInputValue}
        setTextInputValue={setTextInputValue}
        handleChange={handleChange}
        closeButtonHandler={closeButtonHandler}
        submitButtonHandler={submitDeleteUser}
      />
    </div>
  );
}
