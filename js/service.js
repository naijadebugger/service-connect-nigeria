

fetch("../components/header.html")
.then(response => response.text())
.then(data => {
    document.getElementById("header").innerHTML = data;
});

fetch("../components/footer.html")
.then(response => response.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
});

const apiUrl = '../data/api.json';
const itemsPerPage = 6;
let currentPage = 1;


fetch(apiUrl)
.then(response => response.json())
.then(data => {
    const artisans = data.artisans;
    const totalPages = Math.ceil(artisans.length / itemsPerPage);

    let artisanGrid = document.querySelector('.all-artisans');
    console.log(totalPages)

    let renderPage = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = artisans.slice(start, end);
        console.log(pageData)
        renderArtisans(pageData)
        updatePagination(page)
    }

    const renderArtisans = (list) => {
        artisanGrid.innerHTML = '';
        console.log(list);

        list?.map(artisan => {
            const artisanCard = document.createElement('article');
            artisanCard.className = 'sc-card artisan-card';
            artisanCard.innerHTML = `
                <div class="artisan-card__image">
                            <img src=${artisan.image} alt="${artisan.name}, ${artisan.expertise}">
                            <span class="artisan-card__rating">
                            <i class="fa fa-star">
                                <span class="fa--star-o"></span>
                            </i> 4.9
                            </span>
                        </div>

                        <div class="artisan-card__body">
                            <h3 class="artisan-card__name">${artisan.name}</h3>
                            <p class="artisan-card__role">${artisan.expertise}</p>

                            <div class="artisan-card__meta">
                            <span><i class="fa fa-briefcase">
                                <span class="wi--time-3"></span>
                            </i> ${artisan.experience}</span>
                            <span><i class="fa fa-map-marker-alt">
                                <span class="el--map-marker-alt"></span>
                            </i> ${artisan.location}</span>
                            </div>

                            <div class="artisan-card__actions">
                            <button class="button-secondary ">View Profile</button>
                            <button class="button-primary sc-btn sc-btn--primary">Book Now</button>
                            </div>
                        </div>
            `

            artisanGrid.appendChild(artisanCard);
        })

    }

    function updatePagination(page) {
        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = `
            <button class="page-btn prev" ${page === 1 ? 'disabled' : ''}>&lt;</button>
            <button class="page-btn ${page === 1 ? 'active' : ''}">1</button>
            <button class="page-btn ${page === 2 ? 'active' : ''}">2</button>
            <button class="page-btn ${page === 3 ? 'active' : ''}">3</button>
            <span class="page-ellipsis">...</span>
            <button class="page-btn ${page === totalPages ? 'active' : ''}">${totalPages}</button>
            <button class="page-btn next" ${page === totalPages ? 'disabled' : ''}>&gt;</button>
        `;

        pagination.querySelector('.prev').onclick = () => {
            if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
            }
        };
        pagination.querySelector('.next').onclick = () => {
            if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
            }
        };
    }


    renderPage(currentPage);
})
.catch(error => {
    console.error('Error fetching data:', error);
});



document.querySelectorAll('.filter-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.target);
        target.classList.toggle('active');
    });
});

