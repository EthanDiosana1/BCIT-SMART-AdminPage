import urls from '../../../data/urls.json';
import { UserListItem } from './UserListItem';
import './UserList.css';
import { UserListSearchBar } from './UserListSearchBar';
import React, { useState, useEffect } from 'react';
import PageButton from './PageButton';

export function UserList({ editUserButtonHandler }) {
  const [users, setUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fieldToSearch, setFieldToSearch] = useState('user_id');
  const [usersPerPage, setUsersPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jumpToPage, setJumpToPage] = useState('');

  useEffect(() => {
    getAllUsers();
  }, [usersPerPage, currentPage]);

  useEffect(() => {
    if (users) {
      setTotalPages(Math.ceil(users.length / usersPerPage));
    }
  }, [users, usersPerPage]);

  async function getAllUsers() {
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

      { <PageButton
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handleJumpToPage={handleJumpToPage}
        setJumpToPage={setJumpToPage}
        jumpToPage={jumpToPage}
      />}
    </>
  );
}
