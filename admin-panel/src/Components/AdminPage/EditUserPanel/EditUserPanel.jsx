import './EditUserPanel.css';
import { EditableUserTable } from './EditableUserTable';

/** Panel for editing users.
 * 
 * @param {*} props 
 * @returns 
 */
export function EditUserPanel({ user, backButtonHandler }) {



    return (
        <div className='edit-user-panel'>
            <button onClick={() => backButtonHandler()}>
            <i class="fa-solid fa-right-from-bracket"></i>
            </button>
            <h1>UserId: {user.id}</h1>
            <EditableUserTable user={user} />
        </div>
    );
}