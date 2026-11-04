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

  const transaction = {
    id: Date.now(),
    description: description,
    amount: amount,
    type: type,
    category: category
  };

  transactions.push(transaction);

  updateSummary();
  renderTransactions();
  transactionForm.requestFullscreen();

  console.log("New Transaction", transaction);
  console.log("All Transaction:", transaction);

  function updateSummary() {

    let income = 0;
    let expenses = 0;

    transactions.forEach(function (transction){

      if(transction.type === "income") {
        income += transction.amount; 
        
      } else if (transction.type === "expense") {
        expenses += transction.amount;
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
      deleteBtn.dateset.id = transaction.id;

      item.appendChild(details);
      item.appendChild(amount);
      item.appendChild(deleteBtn);

      transactionList.appendChild(item);

    
      item.innerHTML =  `
      <div>
      <h3>${transaction.description}</h3>
      <p>${transaction.category}</p>
      </div>
      
      <p>
        ${transaction.type === "income" ? "+" : "-"}
        ₹${transaction.amount}
      </p>
       `;
      transactionList.appendChild(item);
    });
  }
});