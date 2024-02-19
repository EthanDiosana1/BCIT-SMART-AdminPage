import { EditableUserTable } from './EditableUserTable';

/** Panel for editing users.
 * 
 * @param {*} props 
 * @returns 
 */
export function EditUserPanel({user, backButtonHandler}) {

    

    return(
        <div>
        <button onClick={() => backButtonHandler()}>Back</button>
        <h1>UserId: {user.id}</h1>
        <EditableUserTable user={user}/>
        </div>
    );
}