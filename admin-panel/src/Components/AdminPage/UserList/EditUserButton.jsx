import './EditUserButton.css';

/** The button for editing the user.
 * 
 * @param {*} param0 
 * @returns 
 */
export function EditUserButton({ handleClick }) {
    return (
        <button onClick={handleClick}>
            <i className="fa-solid fa-wrench"></i>
        </button>
    );
}