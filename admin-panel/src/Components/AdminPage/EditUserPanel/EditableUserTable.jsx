import { DeleteUserButton } from "./DeleteUserButton";
import { EditableFieldRow } from "./EditableUserFieldRow";
import "./EditableUserTable.css";
import { EditDisplayNameModal } from "./Modals/EditDisplayNameModal";
import { EditPasswordModal } from "./Modals/EditPasswordModal";
import { EditEmailModal } from "./Modals/EditEmailModal";

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
          modalTitle={"Edit DisplayName: "}
          modal={
          EditDisplayNameModal}
       />
       <EditableFieldRow
         fieldName="Password"
         fieldValue={"HASHED PASSWORD"}
         modalTitle={"Edit Password: "}
         modal={
          EditPasswordModal}
       />
        <EditableFieldRow
         fieldName="Email"
         fieldValue={user.email}
         modalTitle={"Edit Email: "}
         modal={
          EditEmailModal}
        />
        <tr>
          <td></td>
          <td></td>
          <td>
            <DeleteUserButton 
            handleClick={() => deleteUserButtonHandler()} 
      />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
