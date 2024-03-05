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
export function UserList({ editUserButtonHandler, setUserList }) {
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
  async function searchButtonHandler(fieldName, fieldValue, usersPerPage, setUserList) {
    try {
      let endpoint; // The API endpoint to call.
      let response; // The response from the server.
      let result; // The json result from the server.
      let params; // The params for the search.

      if (!fieldName) {
        throw new Error(`!fieldName`);
      }
      if (!fieldValue) {
        throw new Error(`!fieldValue`);
      }
      if (!usersPerPage) {
        throw new Error(`!usersPerPage`);
      }

      // TODO: replace this with the real endpoint.
      endpoint = 'endpoint';

      // Set the params
      params = {
        'fieldName': fieldName,
        'fieldValue': fieldValue,
        'usersPerPage': usersPerPage
      }

      // Get the response from the server.
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`Error!`)
      }

      // Convert to json.
      result = await response.json();

      // Throw error if response is not array.
      if (!result) {
        throw new Error(`result is ${result}`);
      }

      console.trace(result);

      // Set the current user list.
      setUserList(response);

    } catch (error) {
      console.log(error);
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
