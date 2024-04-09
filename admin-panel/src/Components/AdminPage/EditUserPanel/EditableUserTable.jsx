import urls from '../../../data/urls.json';
import { DeleteUserButton } from "./DeleteUserButton";
import { EditableFieldRow } from "./EditableUserFieldRow";
import "./EditableUserTable.css";
import { EditDisplayNameModal } from "./Modals/EditDisplayNameModal";
import { EditPasswordModal } from "./Modals/EditPasswordModal";
import { EditEmailModal } from "./Modals/EditEmailModal";

export function EditableUserTable({ user, deleteUserButtonHandler, setNeedsUpdate }) {
  //console.log(user);
  function submitDisplayName(newDisplayName) {
    // Construct the endpoint URL and the payload
   try {
    const queryString = '?user_id=' + user.user_id + '&display_name=' + newDisplayName;
    const endpoint = `${urls.sqlDatabaseAPI}/editUser` + queryString;
    const response = fetch (endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then ((response) => {
      if (!response.ok) {
        throw new Error(`Error! Response status: ${response.status}`);
      }
      setNeedsUpdate(true);
      return response;
    }); 
   } catch (error) {
    console.log(error);
   }
  }

  function submitPassword(newPassword) {
    try {
      const queryString = '?user_id=' + user.user_id + '&password=' + newPassword;
      const endpoint = `${urls.sqlDatabaseAPI}/editUser` + queryString;
      const response = fetch (endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then ((response) => {
        if (!response.ok) {
          throw new Error(`Error! Response status: ${response.status}`);
        }
      setNeedsUpdate(true);
        return response;
      }); 
     } catch (error) {
      console.log(error);
     }

  }

  function submitEmail(newEmail) {
    try {
      const queryString = '?user_id=' + user.user_id + '&email=' + newEmail;
      const endpoint = `${urls.sqlDatabaseAPI}/editUser` + queryString;
      const response = fetch (endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then ((response) => {
        if (!response.ok) {
          throw new Error(`Error! Response status: ${response.status}`);
        }
      setNeedsUpdate(true);
        return response;
      }); 
     } catch (error) {
      console.log(error);
     }
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
          fieldValue={user.display_name}
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
