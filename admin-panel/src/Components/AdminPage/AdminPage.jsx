import './AdminPage.css'
import testUsers from '../../data/testUsers.json' // Adjusted import path
import React, { useState } from 'react'
import { UserInfoContainer } from './UserList/UserInfoContainer'
import { UserList } from './UserList/UserList'
import { EditUserPanel } from './EditUserPanel/EditUserPanel'
import { AdminPageNavbar } from '../AdminPageNavbar/AdminPageNavbar'

export function AdminPage(props) {
  /** Contains the users list. */
  const [usersList, setUsersList] = useState([])

  /** Contains the selected user. */
  const [selectedUserId, setSelectedUserId] = useState(null)

  /** Retrieves all users from the db. */
  function getAllUsers() {
    try {
    } catch (error) {
      console.log(error)
    }
    return testUsers.testUsers
  }

  /** Retrieves the selected user by id from the db. */
  function getSelectedUser(id) {
    try {
      return testUsers.testUsers[id];
    } catch (error) {
      console.log(error)
    }
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
          />)
          :
          (
            // If no user selected, display user list.
            <UserList
              users={getAllUsers()}
              editUserButtonHandler={setSelectedUserId}
            />
          )}
      </UserInfoContainer>
    </div>
  )
}
