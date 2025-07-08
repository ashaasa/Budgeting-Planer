const form = document.getElementById("budgetForm");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

let expenses = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const category = categoryInput.value.trim();
  const amount = parseInt(amountInput.value);

  if (!category || isNaN(amount) || amount <= 0) {
    alert("Masukkan data yang valid.");
    return;
  }

  const expense = {
    id: Date.now(),
    category,
    amount,
  };

  expenses = [...expenses, expense]; // Spread Operator
  updateUI();
  form.reset();
});

function updateUI() {
  expenseList.innerHTML = "";

  expenses.forEach(({ id, category, amount }) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${category}</span>
      <span>Rp ${amount.toLocaleString()}</span>
      <button class="edit-btn" onclick="editExpense(${id})">Edit</button>
      <button class="delete-btn" onclick="deleteExpense(${id})">Hapus</button>
    `;

    expenseList.appendChild(li);
  });

  const total = calculateTotal(...expenses.map(e => e.amount)); // Rest + Spread
  totalAmount.textContent = `Rp ${total.toLocaleString()}`;
}

function calculateTotal(...amounts) {
  return amounts.reduce((acc, curr) => acc + curr, 0);
}

function deleteExpense(id) {
  if (confirm("Yakin ingin menghapus pengeluaran ini?")) {
    expenses = expenses.filter(exp => exp.id !== id);
    updateUI();
  }
}

function editExpense(id) {
  const expense = expenses.find(exp => exp.id === id);
  if (!expense) return;

  const newCategory = prompt("Edit kategori:", expense.category);
  const newAmount = prompt("Edit jumlah (Rp):", expense.amount);

  if (newCategory && !isNaN(parseInt(newAmount)) && parseInt(newAmount) > 0) {
    expense.category = newCategory.trim();
    expense.amount = parseInt(newAmount);
    updateUI();
  } else {
    alert("Input tidak valid!");
  }
}
