import { LitElement, html } from 'lit';

class EmployeeForm extends LitElement {
  static properties = {
    departments: { type: Array },
    positions: { type: Array },
    selectedEmployee: { type: Object },
    employee: { type: Object },
    isEditMode: { type: Boolean },
  };

  constructor() {
    super();
    this.departments = ['Analytics', 'Tech'];
    this.positions = ['Junior', 'Medior', 'Senior'];
    this.selectedEmployee = null;
    this.firstName = '';
    this.lastName = '';
    this.dateOfEmployment = '';
    this.dateOfBirth = '';
    this.phoneNumber = '';
    this.emailAddress = '';
    this.department = '';
    this.position = '';
    console.log(this.employee)
    this.employee = { firstName: '', lastName: '', department: '', position: '', phoneNumber: '', emailAddress: '', dateOfEmployment: '' };
  }

  updated(changedProperties) {
    if (changedProperties.has('employee') && this.employee) {
      this.shadowRoot.querySelectorAll('input').forEach((input) => {
        input.value = this.employee[input.name];
      });
    }
  }

  handleInput(e) {
    const { name, value } = e.target;
    this[name] = value;
  }

  handleSubmit(e) {
    const employee = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfEmployment: this.dateOfEmployment,
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber,
      emailAddress: this.emailAddress,
      department: this.department,
      position: this.position,
    };
    e.preventDefault();
    const formData = new FormData(e.target);
    const employeeData = Object.fromEntries(formData.entries());
    if (this.isEditMode) {
      this.dispatchEvent(new CustomEvent('edit-employee', { detail: { ...this.employee, ...employeeData } }));
    } else {
      this.dispatchEvent(new CustomEvent('add-employee', { detail: employeeData }));
    }
  }

  _navigateToEmployeeList() {
    window.location.href = '/employee-list';  // Simulate navigation to employee list page
  }

  render() {
    return html`
      <h2>Add New Employee</h2>
      <form @submit=${this.handleSubmit}>
        <label>First Name: <input name="firstName" .value=${this.firstName} @input=${this.handleInput} /></label><br />
        <label>Last Name: <input name="lastName" .value=${this.lastName} @input=${this.handleInput} /></label><br />
        <label>Date of Employment: <input name="dateOfEmployment" type="date" .value=${this.dateOfEmployment} @input=${this.handleInput} /></label><br />
        <label>Date of Birth: <input name="dateOfBirth" type="date" .value=${this.dateOfBirth} @input=${this.handleInput} /></label><br />
        <label>Phone Number: <input name="phoneNumber" type="tel" .value=${this.phoneNumber} @input=${this.handleInput} /></label><br />
        <label>Email Address: <input name="emailAddress" type="email" .value=${this.emailAddress} @input=${this.handleInput} /></label><br />
        <label>Department:
          <select name="department" @change=${this.handleInput}>
            ${this.departments.map((dept) => html`<option value="${dept}">${dept}</option>`)}
          </select>
        </label><br />
        <label>Position:
          <select name="position" @change=${this.handleInput}>
            ${this.positions.map((pos) => html`<option value="${pos}">${pos}</option>`)}
          </select>
        </label><br />
        <button type="submit">${this.isEditMode ? 'Update' : 'Add'}</button>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
