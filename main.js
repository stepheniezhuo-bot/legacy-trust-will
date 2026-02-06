class ClientDiscoveryForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .card {
                    background-color: var(--card-background, #fff);
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: var(--card-shadow, 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23));
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                }
                input, select, textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: 1rem;
                }
            </style>
            <div class="card">
                <form id="client-discovery-form">
                    <h2>Basic Profile</h2>
                    <div class="form-group">
                        <label for="full-name">Full Name</label>
                        <input type="text" id="full-name" name="full-name">
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <select id="gender" name="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="birth-date">Birth Date</label>
                        <input type="date" id="birth-date" name="birth-date">
                    </div>
                    <div class="form-group">
                        <label for="marital-status">Marital Status</label>
                        <select id="marital-status" name="marital-status">
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dependents">Dependents</label>
                        <input type="number" id="dependents" name="dependents">
                    </div>
                    
                    <h2>Health & Resilience</h2>
                    <div class="form-group">
                        <label for="medical-history">Medical History</label>
                        <textarea id="medical-history" name="medical-history" rows="4"></textarea>
                    </div>

                    <h2>Financial Snapshot</h2>
                    <h3>Assets</h3>
                    <div class="form-group">
                        <label for="property-mortgage">Property/Mortgage</label>
                        <input type="number" id="property-mortgage" name="property-mortgage">
                    </div>
                    <div class="form-group">
                        <label for="insurance-coverage">Insurance Coverage</label>
                        <input type="number" id="insurance-coverage" name="insurance-coverage">
                    </div>
                    <div class="form-group">
                        <label for="investments-fds">Investments & FDs</label>
                        <input type="number" id="investments-fds" name="investments-fds">
                    </div>
                    <div class="form-group">
                        <label for="savings-cash">Savings/Cash</label>
                        <input type="number" id="savings-cash" name="savings-cash">
                    </div>
                    <h3>Liabilities</h3>
                    <div class="form-group">
                        <label for="outstanding-debts">Outstanding Debts</label>
                        <input type="number" id="outstanding-debts" name="outstanding-debts">
                    </div>
                </form>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const maritalStatus = this.shadowRoot.getElementById('marital-status');
        maritalStatus.addEventListener('change', (e) => {
            const event = new CustomEvent('marital-status-changed', {
                detail: { maritalStatus: e.target.value },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(event);
        });
    }
}

class LegacyChecklist extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.showChecklist = false;

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                 .card {
                    background-color: var(--card-background, #fff);
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: var(--card-shadow, 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23));
                }
                .checklist-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .checklist-item input[type="checkbox"] {
                    width: auto;
                    margin-right: 1rem;
                    accent-color: var(--primary-color);
                }
            </style>
            <div class="card" id="legacy-checklist-card" style="display: none;">
                <h2>The Legacy Checklist</h2>
                 <div class="checklist-item">
                    <input type="checkbox" id="cpf-nomination" name="cpf-nomination">
                    <label for="cpf-nomination">CPF Nomination</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="will" name="will">
                    <label for="will">Will</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="lpa" name="lpa">
                    <label for="lpa">LPA (Lasting Power of Attorney)</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="acp" name="acp">
                    <label for="acp">Advance Care Planning (ACP)</label>
                </div>
                <div class="checklist-item">
                    <input type="checkbox" id="organ-donation" name="organ-donation">
                    <label for="organ-donation">Organ Donation (MSHW)</label>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.parentNode.addEventListener('marital-status-changed', (e) => {
            const maritalStatus = e.detail.maritalStatus;
            this.showChecklist = maritalStatus === 'single' || maritalStatus === 'divorced';
            this.render();
        });

        this.shadowRoot.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checklistState = Array.from(this.shadowRoot.querySelectorAll('input[type="checkbox"]'))
                    .reduce((acc, cb) => {
                        acc[cb.name] = cb.checked;
                        return acc;
                    }, {});

                const event = new CustomEvent('checklist-changed', {
                    detail: { checklistState },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(event);
            });
        });
    }

    render() {
        const checklistCard = this.shadowRoot.getElementById('legacy-checklist-card');
        checklistCard.style.display = this.showChecklist ? 'block' : 'none';
    }
}

class GapAnalysis extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.gapData = {
            'cpf-nomination': {
                title: 'CPF Nomination',
                why: 'Without this, your CPF savings are distributed by the Public Trustee’s Office according to law, and they charge an administration fee.',
                nextStep: 'Perform an <strong>Online CPF Nomination</strong> via the CPF website (requires Singpass and two witnesses).',
                resource: '<a href="https://www.cpf.gov.sg" target="_blank">CPF Board Nomination Portal</a>'
            },
            'will': {
                title: 'Legal Will',
                why: 'Essential for "unmarried" or "divorced" individuals to ensure specific friends, charities, or siblings are looked after.',
                nextStep: 'Engage a legacy lawyer to draft a formal Will. Do not rely on "DIY" templates for complex asset splits.',
                resource: '<a href="https://www.lawsociety.org.sg" target="_blank">Law Society of Singapore - Find a Lawyer</a>'
            },
            'lpa': {
                title: 'Lasting Power of Attorney (LPA)',
                why: 'If you lose mental capacity, your bank accounts could be frozen. An LPA allows your chosen "Donee" to manage your affairs without a costly court order.',
                nextStep: '1. Draft the LPA online via the OPGO portal. 2. Visit a <strong>Certificate Issuer (CI)</strong>—typically a GP or Lawyer—to sign off.',
                resource: '<a href="https://www.msf.gov.sg/opg" target="_blank">Office of the Public Guardian (MSF)</a>'
            },
            'acp': {
                title: 'Advance Care Planning (ACP)',
                why: 'This isn\'t a legal document but a conversation with healthcare providers about your "quality of life" preferences.',
                nextStep: 'Book an ACP session with a facilitator at a hospital or polyclinic.',
                resource: '<a href="https://mylegacy.life.gov.sg" target="_blank">MyLegacy @ LifeSG</a>'
            },
            'organ-donation': {
                title: 'Organ Donation (MSHW)',
                why: 'Opt-in/out via the Medical (Therapy, Education and Research) Act.',
                nextStep: 'Update your preferences on the MSHW website.',
                resource: '<a href="https://www.liveon.gov.sg/" target="_blank">Live On - Organ Donation</a>'
            }
        };

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .card {
                    background-color: var(--card-background, #fff);
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: var(--card-shadow, 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23));
                }
                .gap-analysis-item {
                    border-left: 4px solid var(--secondary-color, #f5a623);
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .gap-analysis-item h3 {
                    margin-top: 0;
                    color: var(--secondary-color, #f5a623);
                }
                 a {
                    color: var(--primary-color, #4a90e2);
                    text-decoration: none;
                    font-weight: bold;
                }

                a:hover {
                    text-decoration: underline;
                }
            </style>
            <div class="card" id="gap-analysis-card" style="display: none;">
                <h2>Gap Analysis & Next Steps</h2>
                <div id="gap-analysis-content"></div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.parentNode.addEventListener('checklist-changed', (e) => {
            const checklistState = e.detail.checklistState;
            this.render(checklistState);
        });
    }

    render(checklistState) {
        const gapAnalysisContent = this.shadowRoot.getElementById('gap-analysis-content');
        gapAnalysisContent.innerHTML = '';

        let hasGaps = false;

        for (const item in checklistState) {
            if (!checklistState[item]) {
                hasGaps = true;
                const gap = this.gapData[item];
                const gapItem = document.createElement('div');
                gapItem.classList.add('gap-analysis-item');
                gapItem.innerHTML = `
                    <h3>🔴 Missing: ${gap.title}</h3>
                    <p><strong>Why it matters:</strong> ${gap.why}</p>
                    <p><strong>Next Step:</strong> ${gap.nextStep}</p>
                    <p><strong>Resource:</strong> ${gap.resource}</p>
                `;
                gapAnalysisContent.appendChild(gapItem);
            }
        }

        this.shadowRoot.getElementById('gap-analysis-card').style.display = hasGaps ? 'block' : 'none';
    }
}

customElements.define('client-discovery-form', ClientDiscoveryForm);
customElements.define('legacy-checklist', LegacyChecklist);
customElements.define('gap-analysis', GapAnalysis);
