//button event
//adding given details to data structure
let data = JSON.parse(localStorage.getItem("data")) || [];
let user = ["admin"];
document.querySelector(".add").addEventListener("click", () => {
  addToArray();
  displaylist();
  updateAmount();
});

displaylist();
updateAmount();

//date range display
if (data.length > 0) {
  document.querySelector(".statement-date").innerHTML = `
  Date range : ( ${data[0].date} - ${data[data.length - 1].date} ) 
  `;
}

//total entries
document.querySelector(".total-entries-section").innerHTML = `
<p class="total-entries">total ${data.length} entries</p>
`;

function addToArray() {
  let dateGiven = document.querySelector(".date").value;
  let particularGiven = document.querySelector(".particular").value;
  let remarksGiven = document.querySelector(".remarks").value;
  let debitAmount = Number(document.querySelector(".debit").value);
  let creditAmount = Number(document.querySelector(".credit").value);

  if ((debitAmount && dateGiven !== "") || (creditAmount && dateGiven !== "")) {
    data.push({
      date: dateGiven,
      particular: particularGiven,
      remarks: remarksGiven,
      debit: debitAmount,
      credit: creditAmount,
      balance: "",
    });
    document.querySelector(".warnings").innerHTML = "";
    document.querySelector(".statement-date").innerHTML = `
  Date range : ( ${data[0].date} - ${data[data.length - 1].date} ) 
  `;
  } else {
    document.querySelector(".warnings").innerHTML =
      "*please fill the required fields ( date & amount ) for statement";
  }

  //update entries list
  document.querySelector(".total-entries-section").innerHTML = `
  <p class="total-entries">total ${data.length} entries</p>
  `;

  //local storing data in string format
  localStorage.setItem("data", JSON.stringify(data));
}

function displaylist() {
  let tableAdded = "";

  data.forEach((value, index) => {
    let html = `
<div class="data-section data-"><p>${data[index].date}</p></div>
<div class="data-section data-"><p>${data[index].particular}</p></div>
<div class="data-section data-"><p>${data[index].remarks}</p></div>
<div class="data-section data-"><p>${data[index].debit.toLocaleString(
      "en-US"
    )}</p></div>
<div class="data-section data-"><p>${data[index].credit.toLocaleString(
      "en-US"
    )}</p></div>
<div class="data-section data-"><p class='balance${index}'></p></div>
<div><button class='delete-btn'>Delete</button></div>

`;

    tableAdded = tableAdded + html;
  });

  document.querySelector(".grid-data-section").innerHTML = tableAdded;

  document.querySelector(".date").value = "";
  document.querySelector(".particular").value = "";
  document.querySelector(".remarks").value = "";
  document.querySelector(".debit").value = "";
  document.querySelector(".credit").value = "";

  document.querySelectorAll(".delete-btn").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      data.splice(index, 1);
      displaylist();
      updateAmount();
      addToArray();

      //updating entries after deletion

      document.querySelector(".total-entries-section").innerHTML = `
      <p class="total-entries">total ${data.length} entries</p>
      `;
    });
  });
}

function updateAmount() {
  let totalDebit = 0;
  let totalCredit = 0;

  data.forEach((values, index) => {
    totalDebit = data[index].debit + totalDebit;
    totalCredit = data[index].credit + totalCredit;

    document.querySelector(`.balance${index}`).innerHTML = (
      totalDebit - totalCredit
    ).toLocaleString("en-US");
  });

  let netBalance = totalDebit - totalCredit;

  data.balance = netBalance;

  document.querySelector(".total-debit-amount").innerHTML =
    totalDebit.toLocaleString("en-US");
  document.querySelector(".total-credit-amount").innerHTML =
    totalCredit.toLocaleString("en-US");
  document.querySelector(".net-balance-amount").innerHTML =
    netBalance.toLocaleString("en-US");

  if (netBalance < 0) {
    document.querySelector(".net-balance-amount").classList.add("red");
  } else {
    document.querySelector(".net-balance-amount").classList.remove("red");
  }
}

document.querySelector(".login").addEventListener("click", () => {
  authorize();
});

function authorize() {
  let userID = document.querySelector(".username").value;
  let userPassword = document.querySelector(".password").value;

  if (userID == user[0] && userPassword == user[0]) {
    document.querySelector(".user-auth").classList.add("hide-container");
    document.querySelector(".container").classList.add("show-container");
  } else {
    prompt("user unauthorized!");
  }
}
