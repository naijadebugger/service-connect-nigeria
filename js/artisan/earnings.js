import { artisanEarnings } from '../api.js';
import { drawLineChart } from '../utilis/chart.js';

function formatNaira(value) {
  return "₦ " + value.toLocaleString("en-NG");
}

function renderStats() {
  document.getElementById("balance-amount").innerHTML =
    formatNaira(artisanEarnings.totalBalance) + '<span class="earnings-balance-decimal">.00</span>';

  document.getElementById("month-amount").textContent = formatNaira(artisanEarnings.earningsThisMonth);
  document.getElementById("month-trend").textContent = "↑ +" + artisanEarnings.monthlyGrowth + "% vs last month";

  document.getElementById("pending-amount").textContent = formatNaira(artisanEarnings.pendingPayouts);
  document.getElementById("pending-note").textContent = "Processing (" + artisanEarnings.payoutProcessingDays + ")";
}

function renderTransactions() {
  const body = document.getElementById("transactions-body");
  artisanEarnings.recentTransactions.forEach((tx) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = tx.id;

    const dateCell = document.createElement("td");
    dateCell.textContent = tx.date;

    const methodCell = document.createElement("td");
    methodCell.textContent = tx.method;

    const amountCell = document.createElement("td");
    amountCell.textContent = tx.amount.toLocaleString("en-NG");

    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    const tone = tx.status.toLowerCase() === "successful" ? "success" : "processing";
    badge.className = "earnings-badge earnings-badge--" + tone;
    badge.textContent = tx.status.toUpperCase();
    statusCell.append(badge);

    row.append(idCell, dateCell, methodCell, amountCell, statusCell);
    body.append(row);
  });
}

function renderChart() {
  const canvas = document.getElementById("earnings-chart");
  const amounts = artisanEarnings.trend.map((point) => point.amount);
  const labels = artisanEarnings.trend.map((point) => point.month);
  drawLineChart(canvas, amounts, labels);
}

renderStats();
renderTransactions();
renderChart();

window.addEventListener("resize", renderChart);