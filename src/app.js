import { LitElement, html } from 'lit';
import './employee-list.js';
import './employee-form.js';
import './employee-table.js';

class EmployeeApp extends LitElement {
  static properties = {
    employees: { type: Array },
    view: { type: String },  // 'list' or 'form'
    displayFormat: { type: String },  // 'list' or 'table'
    selectedEmployee: { type: Object },  // Holds the edit data
    isEditMode: { type: Boolean },  // Flag for form
  };

  constructor() {
    super();
    this.employees = [];
    this.view = 'list';
    this.displayFormat = 'list'; 
    this.selectedEmployee = null;  
    this.isEditMode = false;  
  }

  handleAddEmployee(employee) {
    const newEmployee = { ...employee, id: this.employees.length + 1 };
    this.employees = [...this.employees, newEmployee];
    this.view = 'list';  
  }

  handleEditEmployee(updatedEmployee) {
    this.employees = this.employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );  
    this.isEditMode = false;  
    this.selectedEmployee = null;
    this.view = 'list';  
  }

  navigateToAddForm() {
    this.view = 'form'; 
    this.selectedEmployee = null; 
    this.isEditMode = false; 
  }

  navigateToEditForm(employee) {
    this.view = 'form';  
    this.selectedEmployee = employee;  
    this.isEditMode = true;  
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
    this.displayFormat = this.displayFormat === 'list' ? 'table' : 'list'; 
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
