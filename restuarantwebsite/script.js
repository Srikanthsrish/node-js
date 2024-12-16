
const API_URLS = {
    hero: 'https://restaurantdeployment.onrender.com/api/hero',
    menu: 'https://restaurantdeployment.onrender.com/api/menu',
    footer: 'https://restaurantdeployment.onrender.com/api/footer',
  };
  
  
  async function fetchHeroData() {
    try {
      const response = await fetch(API_URLS.hero);
      const data = await response.json();
  
      const heroSection = document.getElementById('hero');
      heroSection.style.backgroundImage = `url(${data.image})`;
      heroSection.innerHTML = `
        <h1>${data.title}</h1>
        <p>${data.tagline}</p>
      `;
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  }
  
  
  async function fetchMenuData() {
    try {
      const response = await fetch(API_URLS.menu);
      const data = await response.json();
  
      const menuContainer = document.getElementById('menu-items');
      data.forEach((item) => {
        const menuItem = document.createElement('div');
        menuItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          
        `;
        menuContainer.appendChild(menuItem);
      });
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  }
  
  
  async function fetchFooterData() {
    try {
      const response = await fetch(API_URLS.footer);
      const data = await response.json();
  
      const footer = document.getElementById('footer');
      footer.innerHTML = `
        <p>${data.address}</p>
        <p>${data.email}</p>
        <p>
          <a href="${data.facebook}" target="_blank">Facebook</a> |
          <a href="${data.instagram}" target="_blank">Instagram</a> |
          <a href="${data.twitter}" target="_blank">Twitter</a>
        </p>
      `;
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  }
  
 
  document.addEventListener('DOMContentLoaded', () => {
    fetchHeroData();
    fetchMenuData();
    fetchFooterData();
  });
  
