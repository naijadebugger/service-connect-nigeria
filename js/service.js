

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
    console.log()

    let artisanGrid = document.querySelector('.all-artisans');
    console.log(totalPages)

    let renderPage = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = artisans.slice(start, end);
        console.log(pageData)
        renderArtisans(pageData)
        updatePagination(page, totalPages)
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
        pagination.innerHTML = ``;

        const prevBtn = document.createElement("button");
        prevBtn.className = 'page-btn prev';
        prevBtn.textContent = '<';
        prevBtn.disabled = page === 1;
        prevBtn.onclick = () => {
            if(currentPage > 1){
                currentPage--;
                renderPage(currentPage)
            }
        }
        pagination.appendChild(prevBtn);

        const addPageButton =  (i) => {
            const Pages = document.createElement('button')
            Pages.className = `page-btn ${page === i ? 'active' : ''}`;
            Pages.textContent = i
            Pages.onclick = () => {
                currentPage = i
                renderPage(currentPage)
            }
            pagination.appendChild(Pages)
        }

        addPageButton(1);
        if(page > 3){
            const ellapsis = document.createElement('span');
            ellapsis.className = 'page-ellipsis';
            ellapsis.textContent = '...';
            pagination.appendChild(ellapsis)
        }

        for(let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++){
            addPageButton(i)
        }

        if(page < totalPages - 2){
            const ellapsis = document.createElement('span');
            ellapsis.className = 'page-ellipsis';
            ellapsis.textContent = '...';
            pagination.appendChild(ellapsis)
        }

        if(totalPages > 1){
            addPageButton(totalPages)
        }

        const nextBtn = document.createElement("button");
        nextBtn.className = 'page-btn next';
        nextBtn.textContent = '>'
        nextBtn.disabled = page === totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
            }
        }
        pagination.appendChild(nextBtn)
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

