import { useState } from 'react';
import './EditableUserFieldRow.css';
import { Modal } from './Modals/Modal';

/** Displays the name and value of a user's
 * field and a button to edit it.
 * 
 * TODO: make this a generic component called 'EditableFieldRow'
 * 
 * @param {*} param0 
 * @returns 
 */
export function EditableFieldRow({ fieldName, fieldValue }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [textInputValue, setTextInputValue] = useState(fieldValue);

    function buttonHandler() {
        setTextInputValue(fieldValue);
        setIsModalOpen(true);
    }

    function closeButtonHandler() {
        setIsModalOpen(false);
    }

    function handleChange(event, state) {
        state(event.target.value);
    }

    return (<>
        <Modal
            isOpen={isModalOpen}
            onClose={() => { closeButtonHandler() }}
        >
            <input
                type="text"
                placeholder={fieldName}
                value={textInputValue}
                onChange={(event) => {handleChange(event, setTextInputValue)}}
            />
        </Modal>
        <tr className="editable-user-field-row">
            <td>{fieldName}</td>
            <td>{fieldValue}</td>
            <td>
                <button onClick={() => { buttonHandler() }}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
            </td>
        </tr>
    </>
    )
}