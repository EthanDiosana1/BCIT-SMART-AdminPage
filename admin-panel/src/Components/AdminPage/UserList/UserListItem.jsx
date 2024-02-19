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
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <EditUserButton
          handleClick={() => {
            console.log(user.id);
            editUserButtonHandler(user.id)
          }}
        />
      </td>
    </tr>
  )
}
