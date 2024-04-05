import React, { useState } from 'react';
import './UserListSearchBar.css';
import urls from '../../../data/urls.json';
import Modal from './Modals/Modal'; // Import the Modal component

export function UserListSearchBar({
  fieldName, setFieldName,
  fieldValue, setFieldValue,
  usersPerPage, setUsersPerPage,
  onSearch,
  onReset,
  updateUsers 
}) {
  const [showModal, setShowModal] = useState(false);

  function handleModalToggle() {
    setShowModal(!showModal);
  }

  async function handleChange(event, state) {
    try {
      state(event.target.value);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleNumUsersChange(event, state){
    handleChange(event, state);

    if(usersPerPage <= 0) {
        setUsersPerPage(1);
    }

    await updateUsers(usersPerPage, 0);
  }

  async function onSubmit(formData) {
    console.log("Trying to create a new user!");
    try {
      const params = {
        display_name: formData.display_name,
        password: formData.password,
        email: formData.email
      };
    
      const endpoint = `${urls.sqlDatabaseAPI}/createUser`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
    
      if (!response.ok) {
        throw new Error(`Error! Response status: ${response.status}`);
      }
    
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className='user-list-search-bar' onSubmit={onSearch}>
      <div>
        <label htmlFor='searchUser'>Search users:</label>
        <input
          id='searchUser'
          type='text'
          value={fieldValue}
          onChange={(event) => handleChange(event, setFieldValue)}
          placeholder='Search users...'
          required
          autoComplete='off'
        />
      </div>
      <div>
        <label htmlFor='fieldSelect'>Field to search:</label>
        <select
          id='fieldSelect'
          value={fieldName}
          onChange={(event) => handleChange(event, setFieldName)}
          required>
          <option value='user_id'>id</option>
          <option value='display_name'>displayname</option>
          <option value='email'>email</option>
        </select>
      </div>
      <div>
        <label htmlFor='numUsersPerPageInput'>Users per page:</label>
        <input
          id='numUsersPerPage'
          type='number'
          value={usersPerPage}
          onChange={(event) => handleNumUsersChange(event, setUsersPerPage)}
          placeholder='users/page'
          required
        />
      </div>
      <div>
        <button
          type='submit'
        >Search</button>
      </div>
      <div>
        <button
          type='button'
          onClick={onReset}
        >Reset</button>
      </div>
      <div>
        <button type='button' onClick={handleModalToggle}>Create User</button>
      </div>
      <Modal isOpen={showModal} onClose={handleModalToggle} onSubmit={onSubmit}>
        <h3>Modal Title</h3>
        <p>Modal Content</p>
      </Modal>
    </form>
  )
}
