import { LitElement, html } from '../node_modules/lit-element/lit-element.js'

class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
  };

  render() {
    return html`
      <h2>Employee List</h2>
      <ul>
      <li> First Name - Last Name - Date of Employement - Birth Date - Phone Number - Email- Department- Position </li>
        ${this.employees.map(
          (employee) => html`
            <li>
              ${employee.firstName} - ${employee.lastName} - ${employee.dateOfEmployment} - ${employee.dateOfBirth} -
              ${employee.phoneNumber} - ${employee.emailAddress} - ${employee.department} - ${employee.position} -
              <button @click=${() => this._openEdit(employee)}>Edit</button>
              <button @click=${() => this._deleteEmployee(employee.id)}>Delete</button>
            </li>
          `
        )}
      </ul>
    `;
  }

  _openEdit(employee) {
    this.dispatchEvent(new CustomEvent('open-edit-employee', { detail: employee }));
  }

  _deleteEmployee(employeeId) {
    this.dispatchEvent(new CustomEvent('delete-employee', { detail: employeeId }));
  }
}

customElements.define('employee-list', EmployeeList);
