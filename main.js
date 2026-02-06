class LegacyPlanningForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        form {
          display: grid;
          gap: 1rem;
        }
        .form-section {
          border: 1px solid #ccc;
          padding: 1rem;
          border-radius: 8px;
        }
        h2 {
            color: #003366;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
        }
        input, select, textarea {
          width: 100%;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        button {
            padding: 1rem;
            background-color: #008080;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
        #checklist-container {
            margin-top: 1rem;
        }
      </style>
      <form>
        <div class="form-section">
          <h2>Client Information</h2>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name">

          <label for="gender">Gender:</label>
          <select id="gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label for="birth_date">Birth Date:</label>
          <input type="date" id="birth_date" name="birth_date">

          <label for="marital_status">Marital Status:</label>
          <select id="marital_status" name="marital_status">
            <option value="married">Married</option>
            <option value="single">Single</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>

          <label for="dependent">Dependent:</label>
          <textarea id="dependent" name="dependent"></textarea>

          <label for="medical_dependent">Is there a medical dependency for this dependent?</label>
          <select id="medical_dependent" name="medical_dependent">
              <option value="yes">Yes</option>
              <option value="no">No</option>
          </select>

          <label for="medical_history">Medical History:</label>
          <textarea id="medical_history" name="medical_history"></textarea>
        </div>

        <div class="form-section">
            <h2>Financial Information</h2>
            <label for="assets">Assets (e.g. mortgage, car, insurance, investments fixed deposits, savings):</label>
            <textarea id="assets" name="assets"></textarea>

            <label for="debts">Debts:</label>
            <textarea id="debts" name="debts"></textarea>

            <label for="financial_partners">Financial Partners or Banking Institution:</label>
            <input type="text" id="financial_partners" name="financial_partners">
        </div>

        <div class="form-section">
            <h2>Legacy Planning</h2>
            <label for="cpf_nomination">CPF Nomination:</label>
            <select id="cpf_nomination" name="cpf_nomination">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label for="will">Will:</label>
            <select id="will" name="will">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label for="lpa">LPA (Lasting Power of Attorney):</label>
            <select id="lpa" name="lpa">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label for="advance_care_planning">Advance Care Planning:</label>
            <select id="advance_care_planning" name="advance_care_planning">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label for="organ_wishes">Organ Wishes:</label>
            <select id="organ_wishes" name="organ_wishes">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>
        <div id="checklist-container"></div>
        <button type="submit">Submit</button>
      </form>
    `;

    this.maritalStatusSelect = this.shadowRoot.querySelector('#marital_status');
    this.checklistContainer = this.shadowRoot.querySelector('#checklist-container');

    this.maritalStatusSelect.addEventListener('change', (e) => {
      if (e.target.value === 'single' || e.target.value === 'divorced') {
        if (!this.checklistContainer.querySelector('legacy-checklist')) {
            const checklist = document.createElement('legacy-checklist');
            this.checklistContainer.appendChild(checklist);
        }
      } else {
        const checklist = this.checklistContainer.querySelector('legacy-checklist');
        if (checklist) {
            this.checklistContainer.removeChild(checklist);
        }
      }
    });
  }
}

class LegacyChecklist extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .checklist-section {
                    background-color: #f8f9fa;
                    border: 1px solid #ccc;
                    padding: 1rem;
                    border-radius: 8px;
                }
                h3 {
                    color: #003366;
                    margin-top: 0;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 0.5rem;
                }
            </style>
            <div class="checklist-section">
                <h3>Legacy Checklist for Singles & Divorced Individuals</h3>
                <ul>
                    <li><strong>CPF Nomination:</strong> Ensure your CPF savings are distributed according to your wishes. Without a nomination, savings are distributed by the Public Trustee's Office.</li>
                    <li><strong>Will:</strong> A will is crucial for distributing your assets as you intend, especially if you have specific wishes for dependents or other beneficiaries.</li>
                    <li><strong>Lasting Power of Attorney (LPA):</strong> Appoint someone you trust to make decisions on your behalf if you lose mental capacity.</li>
                </ul>
            </div>
        `;
    }
}

customElements.define('legacy-planning-form', LegacyPlanningForm);
customElements.define('legacy-checklist', LegacyChecklist);
