const main = document.getElementsByClassName("serviceCard")
const historyCard = document.getElementById("historyCard")
const menuBtn = document.getElementById("menu");
const sidebar = document.querySelector(".sideBar");
console.log(menuBtn)

 menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
});
const artisanFilter = document.getElementById("artisanFilter");
const generalFilter = document.getElementById("generalFilter");
const dateFilter = document.getElementById("dateFilter");
const categoryFilter = document.getElementById("categoryFilter");


let serviceHistory = [
{
    id: "SH-001",
    artisanName: "Oluwaseun Adebayo",
    trade: "Plumbing",
    avatar: "https://ui-avatars.com/api/?name=Oluwaseun+Adebayo&background=0B2240&color=fff",
    date: "Oct 15, 2023",
    amount: 15000,
    rating: 5,
    status: "Completed",
  },
  {
    id: "SH-002",
    artisanName: "Ngozi Chukwu",
    trade: "Electrical",
    avatar: "https://ui-avatars.com/api/?name=Ngozi+Chukwu&background=FF8C00&color=fff",
    date: "Sep 28, 2023",
    amount: 22500,
    rating: 2,
    status: "Completed",
  },
  {
    id: "SH-003",
    artisanName: "Chinedu Okafor",
    trade: "Cleaning",
    avatar: "https://ui-avatars.com/api/?name=Chinedu+Okafor&background=1D3557&color=fff",
    date: "Aug 12, 2023",
    amount: 8000,
    rating: 3,
    status: "Completed",
  },
  {
    id: "SH-004",
    artisanName: "Tunde Bakare",
    trade: "Carpentry",
    avatar: "https://ui-avatars.com/api/?name=Tunde+Bakare&background=0B2240&color=fff",
    date: "Jul 04, 2023",
    amount: 35000,
    rating: 5,
    status: "Completed",
  },
  {
    id: "SH-005",
    artisanName: "Bisi Akande",
    trade: "AC Maintenance",
    avatar: "https://ui-avatars.com/api/?name=Bisi+Akande&background=FF8C00&color=fff",
    date: "Jun 18, 2023",
    amount: 12000,
    rating: 4,
    status: "Completed",
  },
];

function renderCards(serviceHistory){

historyCard.innerHTML = serviceHistory
.map((item) => { 
  return`
<section class="profile">
<aside>
          <img src="${item.avatar}" alt="${item.artisanName}">
        <div>
          <p>${item.artisanName}</p>
          <p>${item.trade}</p>
        </div>
        <div>
        <small>DATE</small>
          <p>${item.date}</p>
        </div>
        <div class="amount">
        <small>AMOUNT</small>
          <p>${item.amount}</p>
        </div>
        <div><small class="rating">RATINGS</small>
          <p>${"*".repeat(item.rating)}</p>
        </div>
        <div class="status"> ${item.status}</div>
        </div>
        </aside>
        <div class="btn">
          <button class="View">View Details</button>
          <button class="Rebook">Rebook Artisan</button>
          </div>
      </section>
 ` ;
 })
 .join("");
}
renderCards(serviceHistory)

 const category = [... new Set(serviceHistory.map(item => item.trade))];

 category.forEach(trade => {
  categoryFilter.innerHTML += `
  <option value = "${trade}">
  ${trade}
  </option>`;

  categoryFilter.addEventListener("change", () => {

    const selectedTrade = categoryFilter.value;

    if (selectedTrade === "all") {
        renderCards(serviceHistory);
        return;
    }

    const filtered = serviceHistory.filter(item =>
        item.trade === selectedTrade
    );

    renderCards(filtered);

});
 });

 const date =[... new Set(serviceHistory.map(item => item.date))];
 date.forEach(date => {
    dateFilter.innerHTML += `
        <option value="${date}">
            ${date}
        </option>
    `;
    dateFilter.addEventListener("change", () => {

    const selectedDate = dateFilter.value;

    if (selectedDate === "all") {
        renderCards(serviceHistory);
        return;
    }

    const filtered = serviceHistory.filter(item =>
        item.date === selectedDate
    );

    renderCards(filtered);

});
 });

 artisanFilter.addEventListener("input", () => {

    const search = artisanFilter.value.toLowerCase().trim();

    const sorted = [...serviceHistory].sort((a, b) => {

        const aMatch =
            a.artisanName.toLowerCase().includes(search) ||
            a.trade.toLowerCase().includes(search);

        const bMatch =
            b.artisanName.toLowerCase().includes(search) ||
            b.trade.toLowerCase().includes(search);

        return bMatch - aMatch;
    });

    renderCards(sorted);

});

 generalFilter.addEventListener("input", () => {

    const search = generalFilter.value.toLowerCase();

    const sorted = [...serviceHistory].sort((a, b) => {

        const aMatch =
            a.artisanName.toLowerCase().includes(search) ||
            a.trade.toLowerCase().includes(search) ||
            a.date.toLowerCase().includes(search);

        const bMatch =
            b.artisanName.toLowerCase().includes(search) ||
            b.trade.toLowerCase().includes(search) ||
            b.date.toLowerCase().includes(search);

        return bMatch - aMatch;
    });

    renderCards(sorted);

});

console.log(historyCard)