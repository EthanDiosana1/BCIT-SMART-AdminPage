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
  /** Contains the users list. */
  const [users, setUsers] = useState(null);

  // Search bar params.
  const [searchTerm, setSearchTerm] = useState('');
  const [fieldToSearch, setFieldToSearch] = useState('displayname');
  const [usersPerPage, setUsersPerPage] = useState(20);

  // new state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

// Fetch users when components mounts
useEffect(() => {
  // Initialize users with the test data or fetched data
  const allUsers = testUsers.testUsers;
  setUsers(allUsers);
  setTotalPages(Math.ceil(allUsers.length / usersPerPage)); // Calculate total pages
}, [usersPerPage]); // Depend on usersPerPage in case it changes

// Calculate the current users to display
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = users ? users.slice(indexOfFirstUser, indexOfLastUser) : [];

// Handler to change page
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};

// Render pagination controls
const renderPagination = () => {
  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button key={i} onClick={() => paginate(i)} className={currentPage === i ? 'active' : ''}>
        {i}
      </button>
    );
  }
  return <div className='pagination'>{pageNumbers}</div>;
};


  /** Retrieves all users from the db. */
  // function getAllUsers() {
  //   try {
  //     if (!users) {
  //       const dbResponse = testUsers.testUsers;

  //       setUsers(dbResponse);
  //       return users;
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // /** Get all of the users. */
  // getAllUsers(usersPerPage);

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
