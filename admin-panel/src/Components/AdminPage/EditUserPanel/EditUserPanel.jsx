import './EditUserPanel.css';
import { useState } from "react";
import { EditableUserTable } from './EditableUserTable';
import { DeleteUserModal } from './Modals/DeleteUserModal';

/** Panel for editing users.
 * 
 * @param {*} props 
 * @returns 
 */
export function EditUserPanel({ user, backButtonHandler }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [textInputValue, setTextInputValue] = useState("");


    function deleteUserButtonHandler() {
        setIsModalOpen(true);
    }

    function handleChange(event, state) {
        state(event.target.value);
    }
    
    function closeButtonHandler() {
        setIsModalOpen(false);
    }

    return (
        <div className='edit-user-panel'>
            <div>
                <button onClick={() => backButtonHandler()}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
            <h1>UserId: {user.id}</h1>
            <EditableUserTable
                user={user}
                deleteUserButtonHandler={deleteUserButtonHandler} />
                <DeleteUserModal 
                isOpen={isModalOpen}
                title="Are you sure you want to delete this user?"
                textInputValue={textInputValue}
                setTextInputValue={setTextInputValue}
                handleChange={handleChange}
                closeButtonHandler={closeButtonHandler}
                />
        </div>
    );
}
