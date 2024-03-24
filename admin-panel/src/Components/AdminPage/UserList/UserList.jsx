//import user_db_api_endpoints from '../../../data/user_db_api_endpoints.json'
import urls from '../../../data/urls.json'
import { UserListItem } from './UserListItem'
import './UserList.css'
import { UserListSearchBar } from './UserListSearchBar'
import React, { useState, useEffect } from 'react'

export function UserList({ editUserButtonHandler }) {
  const [users, setUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fieldToSearch, setFieldToSearch] = useState('user_id');
  const [usersPerPage, setUsersPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jumpToPage, setJumpToPage] = useState('');

  useEffect(() => {
    getAllUsers(usersPerPage);
  }, [usersPerPage, currentPage]);

  useEffect(() => {
    if (users) {
      setTotalPages(Math.ceil(users.length / usersPerPage));
    }
  }, [users, usersPerPage]);

  async function getAllUsers(usersPerPage) {
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

  async function searchButtonHandler(event, fieldName, fieldValue) {
    event.preventDefault();
    try {
      const endpoint = `${urls.sqlDatabaseAPI}/getUser`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fieldName, fieldValue, usersPerPage })
      });

      if (!response.ok) {
        throw new Error(`Error! Response status: ${response.status}`);
      }

      const result = await response.json();

      if (!result) {
        throw new Error(`result is ${result}`);
      }

      setUsers(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleJumpToPage = (event) => {
    event.preventDefault();
    const pageNumber = Math.max(1, Math.min(totalPages, Number(jumpToPage)));
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    return (
      <div className='pagination'>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>|&lt;</button>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>&gt;|</button>
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

  return (
    <>
      <UserListSearchBar
        onSearch={(event) => {
          searchButtonHandler(event, fieldToSearch, searchTerm)
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
          {users ?
            users.map((user, index) => (
              <UserListItem
                key={index}
                user={user}
                editUserButtonHandler={editUserButtonHandler}
              />
            )) :
            <tr><td colSpan="4">No users to display.</td></tr>
          }
        </tbody>
      </table>

      {totalPages > 1 && renderPagination()}
    </>
  );
}
