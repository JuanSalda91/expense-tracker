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