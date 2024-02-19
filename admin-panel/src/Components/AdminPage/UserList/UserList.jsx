import { UserListItem } from './UserListItem'
import './UserList.css'
import { UserListSearchBar } from './UserListSearchBar'

/** Displays a list of users.
 *
 * @param {{}} props
 * @returns
 */
export function UserList ({ users, editUserButtonHandler }) {
  return (
    <>
      <UserListSearchBar />
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
          {users.map((user, index) => {
            
            return <UserListItem
              key={index}
              user={user}
              editUserButtonHandler={editUserButtonHandler}
            />
          })}
        </tbody>
      </table>
    </>
  )
}
