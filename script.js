const totalBalance = document.getElementById("totalBalance");
const totalIncome = document.getElementById("totalIncome");
const totalExpenses = document.getElementById("totalExpenses");

const transactionForm = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");

const transactionList = document.getElementById("transactionList");
const clearAllBtn = document.getElementById("clearAllBtn");

let transactions = [];

console.log("Smart Expense Tracker is ready!");
console.log(transactions);

transactionForm.addEventListener("submit", function(event){
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;
  const category = categoryInput.value;

  if(description === "" || amount <= 0 || !Number.isFinite(amount)) {
    alert("Please enter a valid description and amount!");
    return;
  }

  console.log("Descrption:", description);
  console.log("Amount", amount);
  console.log("Type", type);
  console.log("Category", category);
});