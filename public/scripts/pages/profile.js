const budgetInput = document.getElementById("monthly-budget");

budgetInput.oninput = (event) => {
  if (budgetInput.getAttribute("value")) {
    budgetInput.setAttribute("value", "");
    budgetInput.value = event.data;
  }

  const dirtyBudget = budgetInput.value;
  let cleanedBudget = dirtyBudget.replace(/[^0-9\,]/g, "").replace(",", ".");
  let formattedBudget;

  if (!cleanedBudget.includes(".")) {
    formattedBudget = Number(cleanedBudget).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });
  } else {
    const splittedBudget = cleanedBudget.split(".");

    const intValue = Number(splittedBudget.shift());
    const decimalValue = splittedBudget[0].replace(/\,/g, "");

    const formattedIntValue = intValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });

    formattedBudget = formattedIntValue + "," + decimalValue;
  }

  budgetInput.value = formattedBudget;
};
