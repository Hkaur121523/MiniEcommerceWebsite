let catListItems = document.querySelector(".category-list");
let productOuter = document.querySelector("#productOuter");


let getCategory = async () => {
    catListItems.innerHTML = '';
    let catData = await fetch('https://dummyjson.com/products/category-list');
    let finalRes = await catData.json();

    let liRow = '';
    finalRes.forEach((catItems, index) => {
        liRow += `<li onclick="getProduct('${catItems}')">${catItems}</li>`;
    });

    catListItems.innerHTML = liRow;
};


let getProduct = async (catname = '') => {
    productOuter.innerHTML = '';
    let apiUrl;
    
    if (catname === '') {
        apiUrl = 'https://dummyjson.com/products';
    } else {
        apiUrl = `https://dummyjson.com/products/category/${catname}`;
    }

    let fetchData = await fetch(apiUrl);
    let finalRes = await fetchData.json();
    let pItems = '';

    finalRes.products.forEach((items, index) => {
        pItems += `
            <div class="product-item">
                <img src="${items.thumbnail}" alt="${items.title}">
                <h3>${items.title}</h3>
                <p class="price">$${items.price}</p>
            </div>
        `;
    });

    productOuter.innerHTML = pItems;
};

getCategory();
getProduct();
