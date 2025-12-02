// ==================== 
// 1. Data
// ====================
let transactions = []; // -- To store transactions
let currentType = 'expenses'; // -- default transaction type

// --- categories to select --- //
const categories = [
    { value: 'grocery', text: 'Groceries' },
    { value: 'rent', text: 'Rent/Housing' },
    { value: 'salary', text: 'Salary'} ,
    { value: 'freelance', text: 'Freelance' },
    { value: 'entertaiment', text: 'Entertaiment' },
    { value: 'utilities', text: 'Utilities' },
    { value: 'other', text: 'Other' }
];

// ==================== 
// 2. DOM Elemenents
// ====================
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpensesEl = document.getElementById('totalExpenses');
const balanceEl = document.getElementById('balance');

const transactionForm = document.getElementById('transactionForm');
const expenseBtn = document.getElementById('expenseBtn');
const incomeBtn = document.getElementById('incomeBtn');

const categorySelect = document.getElementById('category');
const transactionList = document.getElementById('transactionList');
const emptyState = document.getElementById('emptyState');

const noExpensesMsg = document.getElementById('noExpensesMsg');
const spendingChartCanvas = document.getElementById('spendingChart');

// ==================== 
// 3. Categories
// ====================
// --- drop down categories --- //
categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.value;
    option.textContent = cat.text;
    categorySelect.appendChild(option);
});

updateTypeButtons();

// ==================== 
// 4. Event Listeners
// ====================
// --- Toggle between expense and income buttons
expenseBtn.addEventListener('click', () => {
    currentType = 'expenses';
    updateTypeButtons();
});

incomeBtn.addEventListener('click', () => {
    currentType = 'income';
    updateTypeButtons();
});

// --- handle form submission --- //
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault(); // -- Prevent page reload

    // -- get values from inputs -- //
    const amount = parseFloat(document.getElementById('amount').value);
    const category = categorySelect.value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value

    // -- transaction object -- //
    const transaction = {
        id: Date.now(),
        type: currentType, // -- income or expense
        amount: amount,
        category: category,
        description: description,
        date: date
    };

    // --- array to update --- //
    transaction.push(transaction);
    updateUI();

    // --- reset form --- //
    transactionForm.reset();
    // --- reset date --- //
    document.getElementById('date').valueAsDate = new Date ();
});

// ==============================
// 5. CORE FUNCTIONS
// ==============================

function updateUI() {
    updateSummary();
    renderHistory();
    renderChart(); // Update the chart if possible
}

function updateTypeButtons() {
    // Simple style toggle to show active button
    if (currentType === 'expense') {
        expenseBtn.style.backgroundColor = '#ffcccb'; // Light red
        incomeBtn.style.backgroundColor = ''; // Default
    } else {
        incomeBtn.style.backgroundColor = '#d4edda'; // Light green
        expenseBtn.style.backgroundColor = ''; // Default
    }
}

function updateSummary() {
    // Calculate totals
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    // Update HTML
    totalIncomeEl.textContent = `$${income.toFixed(2)}`;
    totalExpensesEl.textContent = `$${expenses.toFixed(2)}`;
    balanceEl.textContent = `$${balance.toFixed(2)}`;
}

function renderHistory() {
    // Clear current list
    transactionList.innerHTML = '';

    if (transactions.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        
        // Loop through recent transactions
        transactions.forEach(t => {
            const item = document.createElement('div');
            // Adding a class for styling later
            item.classList.add('transaction-item'); 
            
            // Set color based on type
            const amountColor = t.type === 'income' ? 'green' : 'red';
            const sign = t.type === 'income' ? '+' : '-';

            item.innerHTML = `
                <div style="border-bottom: 1px solid #ccc; padding: 10px; display: flex; justify-content: space-between;">
                    <div>
                        <strong>${t.description}</strong> <br>
                        <small>${t.date} | ${t.category}</small>
                    </div>
                    <div style="color: ${amountColor}; font-weight: bold;">
                        ${sign}$${t.amount.toFixed(2)}
                    </div>
                </div>
            `;
            
            // Add to the top of the list
            transactionList.prepend(item);
        });
    }
}