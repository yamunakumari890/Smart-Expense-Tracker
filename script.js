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

  function saveTransactions() {
     localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
     );
  }

  function loadTransactions() {

    const savedTransactions = localStorage.getItem("transactions");
    if(savedTransactions !== null) {
      transactions = JSON.parse(savedTransactions);
    }

    updateSummary();
    renderTransactions();
  }

  transactionForm.addEventListener("submit", function(event){
    event.preventDefault();

    const description = descriptionInput.ariaValueMax.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;

    if(description === "" || amount <=0 || !Number.isFinite(amount)){
      alert("please enter a valid description and amount!");
      return;
    }

    const transaction = {
      id: Date.now(), description: description, amount: amount, type: type, category: category
    };

    transactions.push(transaction);

    saveTransactions();
    updateSummary();
    renderTransactions();

    transactionForm.reset();

  });

  function updateSummary() {

    let income = 0;
    let expenses = 0;

    transactions.forEach(function(transaction) {
     
      if(transaction.type === "income") {
        income += transaction.amount;
      } else if(transaction.type === "expense") {

      }
    });

    const balance = income - expenses;

    totalIncome.textContent = "₹" + income;
    totalExpenses.textContent = "₹" + expenses;
    totalBalance.textContent = "₹" + balance;
  }

  function renderTransactions() {
    transactionList.innerHTML = "";

    if(transactions.length === 0) {
      transactionList.innerHTML = "<p>No transactions yet.<p>";
      return;
    }

    transactions.forEach(function(transaction){

      const item = document.createElement("div");
      item.classList.add("transaction-item");

      const details = document.createElement("div");


      const title = document.createElement("h3");
      title.textContent = transaction.description;

      const category = document.createElement("p");
      category.textContent = transaction.category;

      details.appendChild(title);
      details.appendChild(category);

      const amount = document.createElement("p");

      amount.textContent = (transaction.type === "income" ? "+" : "-") + "₹" + transaction.amount;

      const deleteBtn = document.createElement("button");

      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.dataset.id = transaction.id;

      item.appendChild(details);
      item.appendChild(amount);
      item.appendChild(deleteBtn);

      transactionList.appendChild(item);

    });
  }
    
  transactionList.addEventListener("click", function(event){
    if(event.target.classList.contains("delete-btn")){
      const id = Number(event.target.dataset.id);
      transactions = transactions.filter(function(transaction){
        return transaction.id !== id;
      });

      saveTransactions();
      updateSummary();
      renderTransactions();
    }
  });

  clearAllBtn.addEventListener("click", function() {
    if(transactions.length === 0) {
      alert("No transactions to clear!");
      return;
    }
    const confirmClear = confirm("Are you sure you want to clear all transactions?");

    if(confirmClear) {
      transactions = [];

      saveTransactions();
      updateSummary();
      renderTransactions();
    }
  });

  loadTransactions();
    