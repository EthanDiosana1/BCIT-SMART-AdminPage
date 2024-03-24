import testUsers from '../../../data/testUsers.json'
import user_db_api_endpoints from '../../../data/user_db_api_endpoints.json'
import urls from '../../../data/urls.json'
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
  const [fieldToSearch, setFieldToSearch] = useState('user_id');
  const [usersPerPage, setUsersPerPage] = useState(20);

  /** Retrieves all users from the db. */
  async function getAllUsers() {
  try {
    if (!users) {
      const endpoint = `${urls.sqlDatabaseAPI}/getUsers`; // Fix the string interpolation syntax
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error! Response status: ${response.status}`);
      }

      // Convert to json.
      const result = await response.json(); // Declare result variable

      // Throw error if response is not array.
      if (!Array.isArray(result)) {
        throw new Error(`Response is not an array.`);
      }

      console.trace(result);

      // Set the current user list.
      setUsers(result); // Update state with response data
    }
  } catch (error) {
    console.error(error); // Change console.log to console.error for better visibility of errors
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
  async function searchButtonHandler(event, fieldName, fieldValue, usersPerPage) {
  event.preventDefault();
  try {
    const endpoint = `${urls.sqlDatabaseAPI}/getUser`; // The API endpoint to call.
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

    // Set the params
    params = {
      'fieldName': fieldName,
      'fieldValue': fieldValue,
      'usersPerPage': usersPerPage
    }
    console.log("Field value: " + fieldValue);
    console.log("Field name: " + fieldName);
    // Construct the query string
    const queryString = `?${fieldName}=${fieldValue}`;
    //const queryString = `?user_id=1`;
    // Get the response from the server.
    console.log(endpoint + queryString);

    response = await fetch(endpoint + queryString, {
      method: 'GET', // Change method to GET
      headers: {
        'Content-Type': 'application/json'
      },
      // No need to include params in the body for a GET request
    });

    if (!response.ok) {
      throw new Error(`Error! Response status: ${response.status}`);
    }

    // Convert to json.
    result = await response.json();

    // Throw error if response is not array.
    if (!result) {
      throw new Error(`result is ${result}`);
    }

    console.trace(result);

    // Set the current user list.
    setUsers(result); // Update state with response data

  } catch (error) {
    console.log(error);
  }
} 

  return (
    <>
      <UserListSearchBar
        onSearch={(event) => {
          searchButtonHandler(event, fieldToSearch, searchTerm, usersPerPage)
        }}
        onReset={console.log("Running")}
        fieldName={fieldToSearch}
        setFieldName={setFieldToSearch}

        fieldValue={searchTerm}
        setFieldValue={setSearchTerm}

        usersPerPage={usersPerPage}
        setUsersPerPage={setUsersPerPage}
      />


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

