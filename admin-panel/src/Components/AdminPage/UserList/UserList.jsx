import testUsers from '../../../data/testUsers.json'
import { UserListItem } from './UserListItem'
import './UserList.css'
import { UserListSearchBar } from './UserListSearchBar'
import { useState } from 'react'

/** Displays a list of users.
 * Includes a search bar.
 *
 * @param {{}} props
 * @returns
 */
export function UserList({ editUserButtonHandler }) {
  /** Contains the users list. */
  const [users, setUsers] = useState(null);

  // Search bar params.
  const [searchTerm, setSearchTerm] = useState('');
  const [fieldToSearch, setFieldToSearch] = useState('');
  const [usersPerPage, setUsersPerPage] = useState(20);

  /** Retrieves all users from the db. */
  function getAllUsers(usersPerPage) {
    try {
      if (!users) {
        
        const dbResponse = testUsers.testUsers;

        setUsers(dbResponse);
        return users;
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Get all of the users. */
  getAllUsers(usersPerPage);

  /** Handles the search bar being clicked.
   * 
   * @param {string} fieldName The name of the field to search. 
   * @param {string} fieldValue The value of the field to search.
   * @param {number} usersPerPage The number of users per page.
   */
  function searchButtonHandler(fieldName, fieldValue, usersPerPage) {
    if (!fieldName) {
      throw new Error(`!fieldName`);
    }
    if (!fieldValue) {
      throw new Error(`!fieldValue`);
    }
    if (!usersPerPage) {
      throw new Error(`!usersPerPage`);
    }

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
          {users ?

            users.map((user, index) => {

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
