import testUsers from '../../../data/testUsers.json'
import user_db_api_endpoints from '../../../data/user_db_api_endpoints.json'
import urls from '../../../data/urls.json'
import { UserListItem } from './UserListItem'
import './UserList.css'
import { UserListSearchBar } from './UserListSearchBar'
import React, { useState, useEffect } from 'react'

/** Displays a list of users.
 * Includes a search bar.
 *
 * @param {{}} props
 * @returns
 */
export function UserList({ editUserButtonHandler }) {
  const [users, setUsers] = useState(null);/** Contains the users list. */
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
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
async function resetUserTable() {
  try {
    const endpoint = `${urls.sqlDatabaseAPI}/getUsers`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error! Response status: ${response.status}`);
    }

    const result = await response.json();

    if (!Array.isArray(result)) {
      throw new Error(`Response is not an array.`);
    }

    setUsers(result);
  } catch (error) {
    console.error(error);
  }
}

=======
  const [fieldToSearch, setFieldToSearch] = useState('displayname');
  const [usersPerPage, setUsersPerPage] = useState(20);// Search bar params.
  const [currentPage, setCurrentPage] = useState(1);// new state for pagination
  const [totalPages, setTotalPages] = useState(0); // state for total number of pages
  const [jumpToPage, setJumpToPage] = useState('');

// Fetch users when components mounts
useEffect(() => {
  const allUsers = testUsers.testUsers;  // Initialize users with the test data or fetched data
  setUsers(allUsers);
  setTotalPages(Math.ceil(allUsers.length / usersPerPage)); // Calculate total pages
}, [usersPerPage]); // Depend on usersPerPage in case it changes

// Calculate the current users to display
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = users ? users.slice(indexOfFirstUser, indexOfLastUser) : [];
>>>>>>> origin/6-page-button-functionality-for-admin-panel

//const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));

  const previousPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  const firstPage = () => setCurrentPage(1);

  const lastPage = () => setCurrentPage(totalPages);

  const handleJumpToPage = (event) => {
    event.preventDefault();
    const pageNumber = Math.max(1, Math.min(totalPages, Number(jumpToPage)));
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    return (
      <div className='pagination'>
        <button onClick={firstPage} disabled={currentPage === 1}>|&lt;</button>
        <button onClick={previousPage} disabled={currentPage === 1}>&lt;</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>&gt;</button>
        <button onClick={lastPage} disabled={currentPage === totalPages}>&gt;|</button>
        <form onSubmit={handleJumpToPage}>
          <label>
            Jump to page:
            <input
              type="number"
              value={jumpToPage}
              onChange={e => setJumpToPage(e.target.value)}
              min="1"
              max={totalPages}
              step="1"
            />
          </label>
          <button type="submit">Go</button>
        </form>
      </div>
    );
  };

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
        onReset={resetUserTable}
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
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <UserListItem
                key={index}
                user={user}
                editUserButtonHandler={editUserButtonHandler}
              />
            ))
          ) : (
            <tr><td colSpan="4">No users to display.</td></tr>
          )}
        </tbody>
      </table>
      {renderPagination()}
    </>
  );
}

