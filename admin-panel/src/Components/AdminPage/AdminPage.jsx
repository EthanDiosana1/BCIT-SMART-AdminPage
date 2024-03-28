import './AdminPage.css'
import testUsers from '../../data/testUsers.json';
import React, { useState } from 'react'
import { UserInfoContainer } from './UserInfoContainer'
import { EditUserPanel } from './EditUserPanel/EditUserPanel'
import { AdminPageNavbar } from './AdminPageNavbar/AdminPageNavbar'
import { UserList } from './UserList/UserList'

export function AdminPage(props) {

  /** Contains the selected user. */
  const [selectedUserId, setSelectedUserId] = useState(null);

  /** Retrieves the selected user by id from the db. */
  function getSelectedUser(user_id) {
    try {
        // Get the user from the database.
        console.log("test");

    } catch (error) {
      console.log(error)
    }
  }

  /** Sends an API request to delete the selected user.
   * 
   * @param {string} userId The id of the user to delete.
   * @returns 
   */
  function deleteUserButtonHandler(userId) {
    // If the selected user id is null, exit.
    if (!userId) {
      return;
    }

    const parsed = parseInt(userId);
    
    // If the selected user id is not an int, throw an error.
    if (!parsed || isNaN(parsed)) {
      throw new Error(`userId is not a number: ${parsed}\n`);
    }

    // Send a request to delete the user.

    // Display a modal saying the user has been deleted.
  }

  return (
    <div className='admin-page'>
      <AdminPageNavbar />
      <UserInfoContainer>
        {selectedUserId ? (
          // If a user is selected, display edit user panel.
          <EditUserPanel
            user={getSelectedUser(selectedUserId)}
            backButtonHandler={setSelectedUserId}
            deleteUserButtonHandler={deleteUserButtonHandler(selectedUserId)}
          />)
          :
          (
            // If no user selected, display user list.
            <UserList
              editUserButtonHandler={setSelectedUserId}
            />
          )}
      </UserInfoContainer>
    </div>
  )
}
