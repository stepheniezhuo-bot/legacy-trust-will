class LegacyPlanningForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        form {
          display: grid;
          gap: 1.5rem;
        }
        fieldset {
          border: 1px solid #ccc;
          padding: 1.5rem;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.8);
        }
        legend {
          font-weight: bold;
          color: #003366;
          padding: 0 0.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
        }
        input, select, textarea {
          width: 100%;
          padding: 0.75rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }
        button {
          padding: 1rem;
          background-color: #008080;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #005959;
        }
        .dynamic-entry {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
        }
        .remove-btn {
          background-color: #dc3545;
        }
        #summary {
          margin-top: 2rem;
          padding: 1.5rem;
          border-radius: 8px;
          background-color: #f8f9fa;
          border: 1px solid #ccc;
        }
        @media (max-width: 600px) {
          .dynamic-entry {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <form id="legacy-form">
        <fieldset>
          <legend>Personal Information</legend>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          <label for="gender">Gender:</label>
          <select id="gender" name="gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label for="birth_date">Birth Date:</label>
          <input type="date" id="birth_date" name="birth_date" required>
          <label for="marital_status">Marital Status:</label>
          <select id="marital_status" name="marital_status" required>
            <option value="">Select Status</option>
            <option value="married">Married</option>
            <option value="single">Single</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
          <label for="dependents">Dependents:</label>
          <textarea id="dependents" name="dependents"></textarea>
          <label for="medical_history">Medical History:</label>
          <textarea id="medical_history" name="medical_history"></textarea>
        </fieldset>

        <fieldset>
          <legend>Assets</legend>
          <div id="assets-container"></div>
          <button type="button" id="add-asset">Add Asset</button>
        </fieldset>

        <fieldset>
          <legend>Debts & Liabilities</legend>
          <div id="debts-container"></div>
          <button type="button" id="add-debt">Add Debt</button>
        </fieldset>

        <fieldset>
          <legend>Legal & Estate Planning</legend>
          <label for="cpf_nomination">CPF Nomination:</label>
          <select id="cpf_nomination" name="cpf_nomination" required>
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <label for="will">Will:</label>
          <select id="will" name="will" required>
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <label for="lpa">LPA (Lasting Power of Attorney):</label>
          <select id="lpa" name="lpa" required>
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <label for="acp">ACP (Advance Care Planning):</label>
          <select id="acp" name="acp" required>
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Financial Partners</legend>
          <label for="financial_partners">Banking Institutions & Relationships:</label>
          <textarea id="financial_partners" name="financial_partners"></textarea>
        </fieldset>

        <fieldset>
          <legend>Organ Donation Wishes</legend>
          <p>Under the Human Organ Transplant Act (HOTA), all Singapore Citizens and Permanent Residents of sound mind and aged 21 or above are presumed to consent to organ donation upon death, unless they have opted out.</p>
          <label for="organ_donation">I wish to opt out of HOTA:</label>
          <select id="organ_donation" name="organ_donation" required>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
      <div id="summary" style="display:none;">
        <h2>Legacy Planning Summary</h2>
        <div id="summary-content"></div>
      </div>
    `;

    this.addAsset = this.addAsset.bind(this);
    this.addDebt = this.addDebt.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.getElementById('add-asset').addEventListener('click', this.addAsset);
    this.shadowRoot.getElementById('add-debt').addEventListener('click', this.addDebt);
    this.shadowRoot.getElementById('legacy-form').addEventListener('submit', this.handleSubmit);
    this.addAsset(); // Start with one asset entry
    this.addDebt();  // Start with one debt entry
  }

  disconnectedCallback() {
    this.shadowRoot.getElementById('add-asset').removeEventListener('click', this.addAsset);
    this.shadowRoot.getElementById('add-debt').removeEventListener('click', this.addDebt);
    this.shadowRoot.getElementById('legacy-form').removeEventListener('submit', this.handleSubmit);
  }

  addAsset() {
    const container = this.shadowRoot.getElementById('assets-container');
    const entry = document.createElement('div');
    entry.className = 'dynamic-entry';
    entry.innerHTML = `
      <input type="text" placeholder="Asset Type (e.g., Property)" class="asset-type" required>
      <input type="number" placeholder="Value (SGD)" class="asset-value" required>
      <button type="button" class="remove-btn">Remove</button>
    `;
    container.appendChild(entry);
    entry.querySelector('.remove-btn').addEventListener('click', () => entry.remove());
  }

  addDebt() {
    const container = this.shadowRoot.getElementById('debts-container');
    const entry = document.createElement('div');
    entry.className = 'dynamic-entry';
    entry.innerHTML = `
      <input type="text" placeholder="Debt Type (e.g., Mortgage)" class="debt-type" required>
      <input type="number" placeholder="Amount (SGD)" class="debt-value" required>
      <button type="button" class="remove-btn">Remove</button>
    `;
    container.appendChild(entry);
    entry.querySelector('.remove-btn').addEventListener('click', () => entry.remove());
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = this.shadowRoot.getElementById('legacy-form');
    if (!form.checkValidity()) {
      alert('Please fill out all required fields.');
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.assets = Array.from(this.shadowRoot.querySelectorAll('#assets-container .dynamic-entry')).map(entry => ({
      type: entry.querySelector('.asset-type').value,
      value: entry.querySelector('.asset-value').value
    }));

    data.debts = Array.from(this.shadowRoot.querySelectorAll('#debts-container .dynamic-entry')).map(entry => ({
      type: entry.querySelector('.debt-type').value,
      value: entry.querySelector('.debt-value').value
    }));

    const summaryContent = this.shadowRoot.getElementById('summary-content');
    summaryContent.innerHTML = `
      <h3>Personal Information</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Gender:</strong> ${data.gender}</p>
      <p><strong>Birth Date:</strong> ${data.birth_date}</p>
      <p><strong>Marital Status:</strong> ${data.marital_status}</p>
      <p><strong>Dependents:</strong> ${data.dependents}</p>
      <p><strong>Medical History:</strong> ${data.medical_history}</p>

      <h3>Assets</h3>
      <ul>
        ${data.assets.map(asset => `<li>${asset.type}: SGD ${asset.value}</li>`).join('')}
      </ul>

      <h3>Debts & Liabilities</h3>
      <ul>
        ${data.debts.map(debt => `<li>${debt.type}: SGD ${debt.value}</li>`).join('')}
      </ul>

      <h3>Legal & Estate Planning</h3>
      <p><strong>CPF Nomination:</strong> ${data.cpf_nomination}</p>
      <p><strong>Will:</strong> ${data.will}</p>
      <p><strong>LPA:</strong> ${data.lpa}</p>
      <p><strong>ACP:</strong> ${data.acp}</p>

      <h3>Financial Partners</h3>
      <p>${data.financial_partners}</p>

      <h3>Organ Donation Wishes</h3>
      <p><strong>Opt out of HOTA:</strong> ${data.organ_donation}</p>
    `;

    this.shadowRoot.getElementById('summary').style.display = 'block';
    form.style.display = 'none';
  }
}

customElements.define('legacy-planning-form', LegacyPlanningForm);
