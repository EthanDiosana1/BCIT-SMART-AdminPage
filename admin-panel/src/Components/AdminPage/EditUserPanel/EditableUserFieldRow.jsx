import './EditableUserFieldRow.css';

/** Displays the name and value of a user's
 * field and a button to edit it.
 * 
 * TODO: make this a generic component called 'EditableFieldRow'
 * 
 * @param {*} param0 
 * @returns 
 */
export function EditableFieldRow({ fieldName, fieldValue, buttonHandler }) {
    return (
        <tr className="editable-user-field-row">
            <td>{fieldName}</td>
            <td>{fieldValue}</td>
            <td>
                <button onClick={() => {buttonHandler()}}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
            </td>
        </tr>
    )
}