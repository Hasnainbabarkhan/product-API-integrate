document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayCards();

  document.getElementById('search-btn').addEventListener('click', performSearch);

  document.getElementById('search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  document.querySelectorAll('.sidebar button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.sidebar button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.category;
      showCategory(category);
    });
  });
});

let allProducts = [];

function fetchAndDisplayCards() {
  const url = "https://dummyjson.com/products/";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allProducts = data.products;
      showCategory('all');
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      const container = document.getElementById("card-container");
      container.innerHTML = "<p>Error loading products. Please try again later.</p>";
    });
}

function showCategory(category) {
  let filteredProducts = [];

  switch(category) {
    case 'all':
      filteredProducts = allProducts;
      break;
    case 'cosmetics':
      filteredProducts = allProducts.filter(product => product.id >= 1 && product.id <= 10);
      break;
    case 'furnitures':
      filteredProducts = allProducts.filter(product => product.id >= 11 && product.id <= 15);
      break;
    case 'vegetables-fruits':
      filteredProducts = allProducts.filter(product => product.id >= 16 && product.id <= 30);
      break;
    default:
      filteredProducts = allProducts;
  }

  displayCards(filteredProducts);
}

function displayCards(products) {
  const container = document.getElementById("card-container");
  container.innerHTML = '';

  products.forEach((product) => {
    const card = createCard(product);
    container.appendChild(card);
  });
}

function performSearch() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  if (!searchTerm) {
    showCategory('all');
    return;
  }

  const filteredProducts = allProducts.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  });

  displayCards(filteredProducts);
}

const rate = { rename: 'rename.webp' };

function createCard(data) {
  const card = document.createElement("div");
  card.className = "card";

  const imagesContainer = document.createElement("div");
  if (data.images && data.images.length > 0) {
    const img = document.createElement("img");
    img.src = data.images[0];
    img.alt = data.title;
    imagesContainer.appendChild(img);
  }
  card.appendChild(imagesContainer);

  const title = document.createElement("h2");
  title.textContent = data.title;
  card.appendChild(title);

  const body = document.createElement("p");
  body.textContent = data.description;
  card.appendChild(body);

  const ratingContainer = document.createElement("div");
  ratingContainer.className = "rating-container";

  const price = document.createElement("h1");
  price.textContent = `$${data.price}`;
  ratingContainer.appendChild(price);

  const ratingImage = document.createElement("img");
  ratingImage.src = rate.rename;
  ratingImage.alt = "Rating";
  ratingContainer.appendChild(ratingImage);

  card.appendChild(ratingContainer);

  const buyNowButton = document.createElement('button');
  buyNowButton.className = 'buy-now-button';
  buyNowButton.textContent = 'Buy Now';
  card.appendChild(buyNowButton);

  return card;
}
