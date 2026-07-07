const main = document.getElementsByClassName("serviceCard")
const historyCard = document.getElementById("historyCard")
const menuBtn = document.getElementById("menu");
const sidebar = document.querySelector(".sideBar");
console.log(menuBtn)

 console.log(historyCard)

 menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
});

let user = [
  {
  id:1,
  name: "Tayo",
  service: "Tailoring",
  date:"oct 15, 2023",
  amount: "$15000",
  rating: 5,
  status: "completed",
  image: "https://picsum.photos/900"
  },

  {
  id:2,
  name: "Buike",
  service: "Chef",
  date:"oct 15, 2023",
  amount: "$15000",
  rating: 5,
  status: "completed",
 image: "https://picsum.photos/600"
  },
{
  id:3,
  name: "Ayo",
  service: "Bricklayer",
  date:"oct 15, 2023",
  amount: "$15000",
  rating: 5,
  status: "completed",
  image: "https://picsum.photos/100"
  },

  {
  id:1,
  name: "Ada",
  service: "Baker",
  date:"oct 15, 2023",
  amount: "$15000",
  rating: 5,
  status: "completed",
  image: "https://picsum.photos/500"
},
  {
  id:1,
  name: "Obi",
  service: "Carpenter",
  date:"oct 15, 2023",
  amount: "$15000",
  rating: 5,
  status: "completed",
 image: "https://picsum.photos/400",
  },

  {
  id:1,
  name: "Nnamdi",
  service: "Sales rep",
  date:"oct 15, 2023",
  amount: "$15000",
  rating: 5,
  status: "completed",
  image:"https://picsum.photos/300",
  },

  {
  id:1,
  name: "Zikora",
  service: "Electrictian",
  date:"oct 15, 2023",
  amount: "$15000",
  rating: 5,
  status: "completed",
  image:"https://picsum.photos/200",
  },


];
console.log(historyCard)
// let newUsers = user.find((items) => items.id == id);

// const display = document.getElementById("serviceConnect");
historyCard.innerHTML = user
.map((item) => { 
  return`
<div class="profile">
          <img src="${item.image}" alt="">
        <div>
          <p>${item.name}</p>
          <p>${item.service}</p>
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
        <div class="btn">
          <button class="View">View Details</button>
          <button class="Rebook">Rebook Artisan</button>
        </div>
      </div>
 ` ;
 })
 .join("");
console.log(historyCard)