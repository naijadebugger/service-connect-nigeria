// Import the fetch utility from api.js 
// Make sure script tag has type="module"
import { fetchPublicArtisans } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  // PLACEHOLDER: Currently pulls mock data from api.js with a simulated delay
  // when live endpoints are ready, this same function call will fetch from the real backend
  const artisans = await fetchPublicArtisans();
  
  // render your grid/cards dynamically with the fetched array
  renderArtisanGrid(artisans); 
});