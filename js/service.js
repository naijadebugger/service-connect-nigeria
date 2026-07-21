import { fetchPublicArtisans } from './api.js';

// ============================================================
// COMPONENT LOADING
// Absolute paths (/components/...) ensure this works on nested routes
// ============================================================
fetch("/components/header.html")
  .then(response => response.text())
  .then(data => {
    const headerEl = document.getElementById("header");
    if (headerEl) headerEl.innerHTML = data;
  })
  .catch(err => console.error("Error loading header component:", err));

fetch("/components/footer.html")
  .then(response => response.text())
  .then(data => {
    const footerEl = document.getElementById("footer");
    if (footerEl) footerEl.innerHTML = data;
  })
  .catch(err => console.error("Error loading footer component:", err));

// ============================================================
// PAGINATION & ARTISAN RENDERING
// ============================================================
const itemsPerPage = 6;
let currentPage = 1;

// Fetch marketplace data cleanly from central api.js
fetchPublicArtisans()
  .then(artisans => {
    const totalPages = Math.ceil(artisans.length / itemsPerPage);
    const artisanGrid = document.querySelector('.all-artisans');

    if (!artisanGrid) return;

    const renderPage = (page) => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pageData = artisans.slice(start, end);

      renderArtisans(pageData);
      updatePagination(page, totalPages);
    };

    const renderArtisans = (list) => {
      artisanGrid.innerHTML = '';

      list?.forEach(artisan => {
        const artisanCard = document.createElement('article');
        artisanCard.className = 'sc-card artisan-card';

        artisanCard.innerHTML = `
          <div class="artisan-card__image">
            <img src="${artisan.avatar || artisan.image}" alt="${artisan.name}, ${artisan.trade || artisan.expertise}">
            <span class="artisan-card__rating">
              <i class="fa fa-star">
                <span class="fa--star-o"></span>
              </i> ${artisan.rating || '4.9'}
            </span>
          </div>

          <div class="artisan-card__body">
            <h3 class="artisan-card__name">${artisan.name}</h3>
            <p class="artisan-card__role">${artisan.trade || artisan.expertise}</p>

            <div class="artisan-card__meta">
              <span>
                <i class="fa fa-briefcase"><span class="wi--time-3"></span></i> 
                ${artisan.experienceYears || artisan.experience || '5+ yrs exp'}
              </span>
              <span>
                <i class="fa fa-map-marker-alt"><span class="el--map-marker-alt"></span></i> 
                ${artisan.location}
              </span>
            </div>

            <div class="artisan-card__actions">
              <button class="button-secondary">View Profile</button>
              <button class="button-primary sc-btn sc-btn--primary">Book Now</button>
            </div>
          </div>
        `;

        artisanGrid.appendChild(artisanCard);
      });
    };

    function updatePagination(page, totalPagesCount) {
      const pagination = document.querySelector('.pagination');
      if (!pagination) return;
      
      pagination.innerHTML = ``;

      // Previous Button
      const prevBtn = document.createElement("button");
      prevBtn.className = 'page-btn prev';
      prevBtn.textContent = '<';
      prevBtn.disabled = page === 1;
      prevBtn.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
        }
      };
      pagination.appendChild(prevBtn);

      const addPageButton = (i) => {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${page === i ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
          currentPage = i;
          renderPage(currentPage);
        };
        pagination.appendChild(pageBtn);
      };

      addPageButton(1);

      if (page > 3) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'page-ellipsis';
        ellipsis.textContent = '...';
        pagination.appendChild(ellipsis);
      }

      for (let i = Math.max(2, page - 1); i <= Math.min(totalPagesCount - 1, page + 1); i++) {
        addPageButton(i);
      }

      if (page < totalPagesCount - 2) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'page-ellipsis';
        ellipsis.textContent = '...';
        pagination.appendChild(ellipsis);
      }

      if (totalPagesCount > 1) {
        addPageButton(totalPagesCount);
      }

      // Next Button
      const nextBtn = document.createElement("button");
      nextBtn.className = 'page-btn next';
      nextBtn.textContent = '>';
      nextBtn.disabled = page === totalPagesCount;
      nextBtn.onclick = () => {
        if (currentPage < totalPagesCount) {
          currentPage++;
          renderPage(currentPage);
        }
      };
      pagination.appendChild(nextBtn);
    }

    renderPage(currentPage);
  })
  .catch(error => {
    console.error('Error fetching artisan data from api.js:', error);
  });

// Filter accordion toggles
document.querySelectorAll('.filter-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (target) target.classList.toggle('active');
  });
});
