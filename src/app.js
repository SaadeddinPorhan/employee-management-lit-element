import { LitElement, html } from 'lit';
import './employee-list.js';
import './employee-form.js';
import './employee-table.js';

class EmployeeApp extends LitElement {
  static properties = {
    employees: { type: Array },
    view: { type: String },  // 'list' or 'form'
    displayFormat: { type: String },  // 'list' or 'table'
    selectedEmployee: { type: Object },  // Holds the employee being edited
    isEditMode: { type: Boolean },  // Tracks if we are in edit mode
  };

  constructor() {
    super();
    this.employees = [];
    this.view = 'list'; // Start with the employee list view
    this.displayFormat = 'list';  // Default to list form
    this.selectedEmployee = null;  // No employee selected initially
    this.isEditMode = false;  // Default mode is adding a new employee
  }

  handleAddEmployee(employee) {
    const newEmployee = { ...employee, id: this.employees.length + 1 };
    this.employees = [...this.employees, newEmployee];
    this.view = 'list';  // Switch back to list after adding
  }

  handleEditEmployee(updatedEmployee) {
    console.log("handleEditEmployee" , updatedEmployee)

    this.employees = this.employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );  // Update the employee array with the new data
    console.log("updated list" , this.employees)

    this.isEditMode = false;  // Reset the mode after editing
    this.selectedEmployee = null;
    this.view = 'list';  // Return to list view
  }

  navigateToAddForm() {
    this.view = 'form';  // Switch to form view
    this.selectedEmployee = null;  // Clear any selected employee
    this.isEditMode = false;  // Switch to add mode
  }

  navigateToEditForm(employee) {
    this.view = 'form';  // Switch to form view to edit the selected employee
    this.selectedEmployee = employee;  // Store the employee to be edited
    this.isEditMode = true;  // Enable edit mode
  }

  _confirmDelete(employeeId) {
    const confirmation = confirm("Are you sure you want to delete this employee?");
    if (confirmation) {
      this._deleteEmployee(employeeId);
    }
  }

  _deleteEmployee(employeeId) {
    this.employees = this.employees.filter(x => x.id != employeeId);
  }
  
  toggleDisplayFormat() {
    this.displayFormat = this.displayFormat === 'list' ? 'table' : 'list';  // Toggle between list and table formats
  }

  render() {
    return html`
      <h1>Employee Management</h1>
      ${this.view === 'list'
        ? html`
          <button @click=${this.navigateToAddForm}>Add New Employee</button>
          <button @click=${this.toggleDisplayFormat}>Toggle to ${this.displayFormat === 'list' ? 'Table' : 'List'} View</button>

          ${this.displayFormat === 'list'
            ? html`
              <employee-list
              .employees=${this.employees}
              @delete-employee=${(e) => this._confirmDelete(e.detail)}
              @open-edit-employee=${(e) => this.navigateToEditForm(e.detail)}
             ></employee-list>
            `
            : html`
              <employee-table
                .employees=${this.employees}
                @delete-employee=${(e) => this._confirmDelete(e.detail)}
                @open-edit-employee=${(e) => this.navigateToEditForm(e.detail)}
              ></employee-table>
            `
          }

        `
        : html`
          <employee-form
            .employee=${this.selectedEmployee}
            .isEditMode=${this.isEditMode}
            @edit-employee=${(e) => this.handleEditEmployee(e.detail)}
            @add-employee=${(e) => this.handleAddEmployee(e.detail)}
          ></employee-form>
        `}
    `;
  }
}

customElements.define('employee-app', EmployeeApp);
