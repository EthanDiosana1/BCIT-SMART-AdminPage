import './UserListItem.css'
import { EditUserButton } from './EditUserButton'

/** Holds a user list item.
 *
 * @param {*} param0
 * @returns
 */
export function UserListItem({ user, editUserButtonHandler }) {

  return (
    <tr className='user-list-item'>
      <td>{user.user_id}</td>
      <td>{user.display_name}</td>
      <td>{user.email}</td>
      <td>
        <EditUserButton
          handleClick={() => {
            editUserButtonHandler(user.user_id)
          }}
        />
      </td>
    </tr>
  )
}
