import './UserListSearchBar.css'

export function UserListSearchBar({
  fieldName, setFieldName,
  fieldValue, setFieldValue,
  usersPerPage, setUsersPerPage,
  onSearch,
  onReset 
}) {
  /**
   *
   * @param {*} event
   * @param {*} state
   */
  async function handleChange(event, state) {
    try {
      state(event.target.value);
    } catch (error) {
      console.log(error);
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
      <div>
        <button
          type='button'
        >Reset</button>
      </div>
    </form>
  )
}

