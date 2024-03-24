import testUsers from '../../../data/testUsers.json';
import user_db_api_endpoints from '../../../data/user_db_api_endpoints.json';
import urls from '../../../data/urls.json';
import { UserListItem } from './UserListItem';
import './UserList.css';
import { UserListSearchBar } from './UserListSearchBar';
import React, { useState, useEffect } from 'react';

export function UserList({ editUserButtonHandler }) {
  const [users, setUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fieldToSearch, setFieldToSearch] = useState('user_id');
  const [usersPerPage, setUsersPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jumpToPage, setJumpToPage] = useState('');

  useEffect(() => {
    const allUsers = testUsers.testUsers;
    setUsers(allUsers);
    setTotalPages(Math.ceil(allUsers.length / usersPerPage));
  }, [usersPerPage]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users ? users.slice(indexOfFirstUser, indexOfLastUser) : [];

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

  async function getAllUsers() {
    try {
      if (!users) {
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
      }
    } catch (error) {
      console.error(error);
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

  async function searchButtonHandler(event, fieldName, fieldValue, usersPerPage) {
    event.preventDefault();
    try {
      const endpoint = `${urls.sqlDatabaseAPI}/getUser`;
      let response;
      let result;
      let params;

      if (!fieldName) {
        throw new Error(`!fieldName`);
      }
      if (!fieldValue) {
        throw new Error(`!fieldValue`);
      }
      if (!usersPerPage) {
        throw new Error(`!usersPerPage`);
      }

      params = {
        'fieldName': fieldName,
        'fieldValue': fieldValue,
        'usersPerPage': usersPerPage
      };

      const queryString = `?${fieldName}=${fieldValue}`;

      response = await fetch(endpoint + queryString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error! Response status: ${response.status}`);
      }

      result = await response.json();

      if (!result) {
        throw new Error(`result is ${result}`);
      }

      setUsers(result);

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
          {users ?
            users.map((user, index) => {
              return <UserListItem
                key={index}
                user={user}
                editUserButtonHandler={editUserButtonHandler}
              />;
            }) : <tr><td colSpan="4">No users to display.</td></tr>
          }
        </tbody>
      </table>

      {renderPagination()}
    </>
  );
}

