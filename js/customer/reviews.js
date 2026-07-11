const pendingReviews = [
  { name: "Oluwaseun Adeyemi", service: "Plumbing • Leak Repair", completed: "Oct 24, 2023", photo: "../../assets/oluwaseun.jpg" },
  { name: "Chinedu Okafor", service: "Electrical • Wiring Install", completed: "Oct 20, 2023", photo: "../../assets/chinedu.jpg" }
];

const pastReviews = [
  { name: "Tunde Bakare", trade: "Carpentry", text: "Excellent work building the custom shelves for my living room. Very professional, and cleaned up after the job. Highly recommend.", reviewedOn: "Sep 15, 2023", photo: "../../assets/tunde.jpg" }
];

function renderSidebar() {
  const sidebar = SCSidebar({ activeItem: "Reviews" });
  document.querySelector(".sc-layout").prepend(sidebar);
}

function renderNavbar() {
  const navbar = SCNavbar({
    variant: "portal",
    user: { name: "Amara N.", role: "Customer", avatarUrl: "" },
    hasNotification: true
  });
  document.querySelector(".sc-main").prepend(navbar);
}

function renderPending() {
  const list = document.getElementById("pending-list");
  pendingReviews.forEach((review) => {
    const card = document.createElement("article");
    card.className = "review-item";
    card.append(SCAvatar({ src: review.photo, name: review.name, size: "md" }));

    const body = document.createElement("div");
    body.className = "review-item-body";
    body.innerHTML =
      '<h3 class="review-item-name">' + review.name + "</h3>" +
      '<p class="review-item-sub">' + review.service + "</p>" +
      '<p class="review-item-date">Completed: ' + review.completed + "</p>";

    card.append(body);
    list.append(card);
  });
}

function renderPast() {
  const list = document.getElementById("past-list");
  pastReviews.forEach((review) => {
    const card = document.createElement("article");
    card.className = "review-item review-item-past";

    const head = document.createElement("div");
    head.className = "review-item-head";
    head.append(SCAvatar({ src: review.photo, name: review.name, size: "sm" }));

    const who = document.createElement("div");
    who.innerHTML =
      '<h3 class="review-item-name">' + review.name + "</h3>" +
      '<p class="review-item-sub">' + review.trade + "</p>";
    head.append(who);

    const text = document.createElement("p");
    text.className = "review-item-text";
    text.textContent = '"' + review.text + '"';

    const date = document.createElement("p");
    date.className = "review-item-date";
    date.textContent = "Reviewed on " + review.reviewedOn;

    card.append(head, text, date);
    list.append(card);
  });
}

renderSidebar();
renderNavbar();
renderPending();
renderPast();