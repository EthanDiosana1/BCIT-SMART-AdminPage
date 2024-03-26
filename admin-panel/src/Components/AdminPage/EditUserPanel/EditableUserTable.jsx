import { DeleteUserButton } from "./DeleteUserButton";
import { EditableFieldRow } from "./EditableUserFieldRow";
import "./EditableUserTable.css";
import { EditDisplayNameModal } from "./Modals/EditDisplayNameModal";
import { EditPasswordModal } from "./Modals/EditPasswordModal";
import { EditEmailModal } from "./Modals/EditEmailModal";

export function EditableUserTable({ user, deleteUserButtonHandler }) {


  function submitDisplayName() {
    //console.log('submitdisplayname');

    const endpoint = `${urls.sqlDatabaseAPI}/editUser`;
  }

  function submitPassword() {

  }

  function submitEmail() {

  }

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
          submitButtonHandler={
            submitDisplayName
          }
       />
       <EditableFieldRow
         fieldName="Password"
         fieldValue={"HASHED PASSWORD"}
         modalTitle={"Edit Password: "}
         modal={
          EditPasswordModal}
         submitButtonHandler={
          submitPassword
         }
       />
        <EditableFieldRow
         fieldName="Email"
         fieldValue={user.email}
         modalTitle={"Edit Email: "}
         modal={
          EditEmailModal}
         submitButtonHandler={
          submitEmail
         } 
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
