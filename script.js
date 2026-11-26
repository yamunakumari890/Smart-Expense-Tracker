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

const searchInput = document.getElementById("searchInput");

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

    const description = descriptionInput.value.trim();
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
        expenses += transaction.amount;
      }
    });

    const balance = income - expenses;

    totalIncome.textContent = "₹" + income.toFixed(2);
    totalExpenses.textContent = "₹" + expenses,toFixed(2);
    totalBalance.textContent = "₹" + balance.toFixed(2);
  }

  function renderTransactions(list = transactions) {
    transactionList.innerHTML = "";

    if(list.length === 0) {
      transactionList.innerHTML = "<p>No transactions yet.</p>";
      return;
    }

    list.forEach(function(transaction){

      const transactionItem = document.createElement("div");
      transactionItem.classList.add("transaction-item");

       transactionItem.innerHTML= 
        `
            <div>
                <h3>${transaction.description}</h3>
                <p>${transaction.category}</p>
            </div>

            <div>
             <span class="${transaction.type}">
                    ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount.toFixed(2)}
                </span>

                <button class="delete-btn">Delete</button>
            </div>
        `;

  
      const deleteBtn = transactionItem.querySelector(".delete-btn");

      deleteBtn.dataset.id = transaction.id;

        deleteBtn.addEventListener("click", function() {

            deleteTransaction(transaction.id);

        });

      transactionList.appendChild(transactionItem);

    });
  }

  function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    saveTransactions();
    updateSummary();
    renderTransactions();

}

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

   function searchTransactions() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const filteredTransactions = transactions.filter(function(transaction){
      return transaction.description.toLowerCase().includes(searchValue);
    });
    renderTransactions(filteredTransactions);
  }
  searchInput.addEventListener("input", searchTransactions);

  loadTransactions();
    