let artisanGrid = document.querySelector('.all-artisans');

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
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    const artisans = data.artisans;
    console.log(artisans);
    artisans.map(artisan => {
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