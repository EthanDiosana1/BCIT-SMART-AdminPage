import './DeleteUserButton.css';

/** The button for deleting the user.
 * 
 * @param {*} props 
 * @returns 
 */
export function DeleteUserButton({ handleClick }) {
    return (<button
        onClick={handleClick}
        className="delete-user-button">
        <i className="fa-regular fa-trash-can"></i>
    </button>);
}
