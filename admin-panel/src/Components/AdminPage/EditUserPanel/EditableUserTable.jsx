import { DeleteUserButton } from "./DeleteUserButton";
import { EditableFieldRow } from "./EditableUserFieldRow";
import "./EditableUserTable.css";
import { EditDisplayNameModal } from "./Modals/EditDisplayNameModal";

export function EditableUserTable({ user, deleteUserButtonHandler }) {
  return (
    <table className="editable-user-table">
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <EditableFieldRow
          fieldName="DisplayName"
          fieldValue={user.name}
          modal={
          EditDisplayNameModal}
//        />
//        <EditableFieldRow
//          fieldName="Password"
//          fieldValue={"HASHED PASSWORD"}
//          modal={EditPasswordModal}
//        />
//        <EditableFieldRow
//          fieldName="Email"
//          fieldValue={user.email}
//          modal={EditEmailModal}
        />
        <tr>
          <td></td>
          <td></td>
          <td>
            <DeleteUserButton onClick={deleteUserButtonHandler} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
