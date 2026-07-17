import { pendingReviews, pastReviews } from '../../js/api.js';

function renderPending() {
  const list = document.getElementById("pending-list");
  pendingReviews.forEach((review) => {
    const card = document.createElement("article");
    card.className = "review-item";

    const avatar = document.createElement("img");
    avatar.className = "review-item-avatar";
    avatar.src = review.artisanAvatar;
    avatar.alt = review.artisanName;
    avatar.width = 48;
    avatar.height = 48;

    const body = document.createElement("div");
    body.className = "review-item-body";
    body.innerHTML =
      '<h3 class="review-item-name">' + review.artisanName + "</h3>" +
      '<p class="review-item-sub">' + review.trade + " • " + review.serviceType + "</p>" +
      '<p class="review-item-date">Completed: ' + review.completedDate + "</p>";

    card.append(avatar, body);
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

    const avatar = document.createElement("img");
    avatar.className = "review-item-avatar";
    avatar.src = review.artisanAvatar;
    avatar.alt = review.artisanName;
    avatar.width = 40;
    avatar.height = 40;

    const who = document.createElement("div");
    who.innerHTML =
      '<h3 class="review-item-name">' + review.artisanName + "</h3>" +
      '<p class="review-item-sub">' + review.trade + "</p>";

    head.append(avatar, who);

    const text = document.createElement("p");
    text.className = "review-item-text";
    text.textContent = '"' + review.reviewText + '"';

    const date = document.createElement("p");
    date.className = "review-item-date";
    date.textContent = "Reviewed on " + review.reviewedOn;

    card.append(head, text, date);
    list.append(card);
  });
}

renderPending();
renderPast();