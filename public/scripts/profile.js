const budgetInput = document.getElementById("monthly-budget");

budgetInput.oninput = (event) => {
  if (budgetInput.getAttribute("value")) {
    budgetInput.value = event.data;
    budgetInput.setAttribute("value", "");
  }

  const budget = budgetInput.value;
  let cleanedBudget = budget.replace(/[^0-9\,]/g, "").replace(",", ".");
  let formattedBudget;

  if (budget.includes(",")) {
    const lastPosition = budget.length - 1;

    if (budget.indexOf(",") != lastPosition && budget[lastPosition] == ",") {
      const budgets = [...cleanedBudget];
      budgets.pop();

      cleanedBudget = budgets.join("");
    }

    const splittedBudget = cleanedBudget.split(".");
    splittedBudget[0] = Number(splittedBudget[0]).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });

    formattedBudget = splittedBudget.join(",");
  } else {
    formattedBudget = Number(cleanedBudget).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });
  }

  budgetInput.value = formattedBudget;
};
