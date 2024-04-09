import './AdminPage.css'
import urls from '../../data/urls.json';
import React, { useState, useEffect } from 'react'
import { UserInfoContainer } from './UserInfoContainer'
import { EditUserPanel } from './EditUserPanel/EditUserPanel'
import { AdminPageNavbar } from './AdminPageNavbar/AdminPageNavbar'
import { UserList } from './UserList/UserList'

export function AdminPage(props) {

  /** Contains the selected user. */
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /** Retrieves the selected user by id from the db. */
  useEffect(() => {
      setIsLoading(true);
    const getSelectedUser = async (user_id) => {
      if (!user_id) {
        setSelectedUser(null);
        return;
      }
      try {
        const queryString = '?user_id=' + user_id;
        const endpoint = `${urls.sqlDatabaseAPI}/getUser` + queryString;
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error! Response status: ${response.status}`);
        }

        const userData = await response.json();
        setSelectedUser(userData[0]);
              setIsLoading(false);
              setNeedsUpdate(false);
      } catch (error) {
              setIsLoading(false);
        setNeedsUpdate(false);
        console.error(error);
        setSelectedUser(null);
      }
  };

    getSelectedUser(selectedUserId);
  }, [selectedUserId, needsUpdate]);
  

  /** Sends an API request to delete the selected user.
   * 
   * @param {string} userId The id of the user to delete.
   * @returns 
   */
  function deleteUserButtonHandler(user_id) {
    // If the selected user id is null, exit.
    if (!user_id) {
      return;
    }

    const parsed = parseInt(user_id);
    
    // If the selected user id is not an int, throw an error.
    if (!parsed || isNaN(parsed)) {
      throw new Error(`userId is not a number: ${parsed}\n`);
    }

    // Send a request to delete the user.
  }

  return (
      isLoading ? <div>Loading...</div> : 
    <div className='admin-page'>
      <AdminPageNavbar />
      <UserInfoContainer>
        {selectedUser ? (
          // If a user is selected, display edit user panel.
          <EditUserPanel
            user={selectedUser}
            backButtonHandler={setSelectedUserId}
            deleteUserButtonHandler={deleteUserButtonHandler(selectedUserId)}
            setNeedsUpdate={setNeedsUpdate}
            setSelectedUserId={setSelectedUserId}
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


