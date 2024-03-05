import './UserListSearchBar.css'
import { useState } from 'react'

export function UserListSearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [usersPerPage, setUsersPerPage] = useState(20);
  const [fieldToSearch, setFieldToSearch] = useState('displayname');

  /** Handles the search form submission.
   * 
   * @param {*} event 
   */
  async function handleSearch(event) {
    event.preventDefault()

    // Start search.
    if (onSearch) {
      onSearch(fieldToSearch, searchTerm, usersPerPage)
    }
  }

  /**
   * 
   * @param {*} event 
   * @param {*} state 
   */
  async function handleChange(event, state) {
    state(event.target.value);
  }

  return (
    <form className='user-list-search-bar' onSubmit={handleSearch}>
      <div>
        <label htmlFor='searchUser'>Search users:</label>
        <input
          id='searchUser'
          type='text'
          value={searchTerm}
          onChange={(event) => handleChange(event, setSearchTerm)}
          placeholder='Search users...'
          required
          autoComplete='off'
        />
      </div>
      <div>
        <label htmlFor='fieldSelect'>Field to search:</label>
        <select
          id='fieldSelect'
          value={fieldToSearch}
          onChange={(event) => handleChange(event, setFieldToSearch)}
          required>
          <option value='id'>id</option>
          <option value='displayname'>displayname</option>
          <option value='email'>email</option>
        </select>
      </div>
      <div>
        <label htmlFor='numUsersPerPageInput'>Users per page:</label>
        <input
          id='numUsersPerPage'
          type='number'
          value={usersPerPage}
          onChange={(event) => handleChange(event, setUsersPerPage)}
          placeholder='users/page'
          required
        />
      </div>
      <div>
        <button
          type='submit'
        >Search</button>
      </div>
    </form>
  )
}
