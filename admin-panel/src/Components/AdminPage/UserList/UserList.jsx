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
      const endpoint = `${urls.sqlDatabaseAPI}${user_db_api_endpoints.getAllUsers}`; // The API endpoint to call.
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

      // Get the response from the server.
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
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
      setUsers(response);

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
