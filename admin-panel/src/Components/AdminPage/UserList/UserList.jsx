import testUsers from '../../../data/testUsers.json' 
import { UserListItem } from './UserListItem'
import './UserList.css'
import { UserListSearchBar } from './UserListSearchBar'
import { useState } from 'react'

/** Displays a list of users.
 *
 * @param {{}} props
 * @returns
 */
export function UserList({ editUserButtonHandler }) {
  /** Contains the users list. */
  const [usersList, setUsersList] = useState(null);

  /** The number of users per page. */
  const [usersPerPage, setUsersPerPage] = useState(20);

  /** Retrieves all users from the db. */
  function getAllUsers(usersPerPage) {
    try {
      if (!usersList) {
        setUsersList(testUsers.testUsers);
        return usersList;
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  /** Handles the search bar being clicked.
   * 
   * @param {string} fieldName The name of the field to search. 
   * @param {string} fieldValue The value of the field to search.
   * @param {number} usersPerPage The number of users per page.
   */
  function searchButtonHandler(fieldName, fieldValue, usersPerPage) {
    if(!fieldName) {
      throw new Error(`!fieldName`);
    }
    if(!fieldValue) {
      throw new Error(`!fieldValue`);
    }
    if(!usersPerPage) {
      throw new Error(`!usersPerPage`);
    }

    // TODO: Ensure that all of these html fields are required.

    // TODO: Add search bar handling to the Trello.

    // TODO: Download TODO highlight
  }

  return (
    <>
      <UserListSearchBar
      searchButtonHandler={searchButtonHandler} />
      <table className='user-list'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { usersList ? 
            
            usersList.map((user, index) => {

            return <UserListItem
              key={index}
              user={user}
              editUserButtonHandler={editUserButtonHandler}
            />
          }) : <tr>No users to display.</tr>}
        </tbody>
      </table>
    </>
  )
}
