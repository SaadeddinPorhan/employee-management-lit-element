import { LitElement, html } from 'lit';

class EmployeeTable extends LitElement {
  static properties = {
    employees: { type: Array },
  };

  render() {
    return html`
      <h2>Employee Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Date of Employment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.employees.map(
            (employee) => html`
              <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>${employee.phoneNumber}</td>
                <td>${employee.emailAddress}</td>
                <td>${employee.dateOfEmployment}</td>
                <td>
                <button @click=${() => this._deleteEmployee(employee.id)}>Delete</button>
                <button @click=${() => this._openEdit(employee)}>Edit</button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  _openEdit(employee) {
    this.dispatchEvent(new CustomEvent('open-edit-employee', { detail: employee }));
  }

  _deleteEmployee(employeeId) {
    this.dispatchEvent(new CustomEvent('delete-employee', { detail: employeeId }));
  }
}

customElements.define('employee-table', EmployeeTable);
