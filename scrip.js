// Daftar produk
const products = [
    { id: 1, name: "Produk 1", price: 50000, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Produk 2", price: 70000, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Produk 3", price: 80000, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Produk 4", price: 60000, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Produk 5", price: 65000, image: "https://via.placeholder.com/150" },
    { id: 6, name: "Produk 6", price: 75000, image: "https://via.placeholder.com/150" },
    { id: 7, name: "Produk 7", price: 90000, image: "https://via.placeholder.com/150" },
    { id: 8, name: "Produk 8", price: 55000, image: "https://via.placeholder.com/150" },
    { id: 9, name: "Produk 9", price: 85000, image: "https://via.placeholder.com/150" },
    { id: 10, name: "Produk 10", price: 95000, image: "https://via.placeholder.com/150" }
];

// Menampilkan produk ke halaman
const productList = document.getElementById("product-list");
products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-name">${product.name}</div>
        <div class="price">Rp ${product.price.toLocaleString()}</div>
        <input type="number" id="quantity-${product.id}" class="quantity-input" min="0" max="99" value="0" onchange="updateTotal()">
    `;
    productList.appendChild(productDiv);
});

// Menghitung total harga
function updateTotal() {
    let total = 0;
    products.forEach(product => {
        const quantity = parseInt(document.getElementById(`quantity-${product.id}`).value) || 0;
        total += product.price * quantity;
    });
    document.getElementById("total-display").innerText = "Total: Rp " + total.toLocaleString();
}

// Checkout
function checkout() {
    const orderDetails = products.map(product => {
        const quantity = parseInt(document.getElementById(`quantity-${product.id}`).value) || 0;
        return quantity > 0 ? `${product.name} x ${quantity}` : null;
    }).filter(item => item !== null);

    if (orderDetails.length === 0) {
        alert("Tidak ada produk yang dipilih.");
        return;
    }

    const confirmation = `Anda telah memilih:\n\n${orderDetails.join("\n")}\n\nApakah Anda ingin melanjutkan checkout?`;
    if (confirm(confirmation)) {
        alert("Terima kasih sudah berbelanja!");
        // Reset jumlah produk
        products.forEach(product => {
            document.getElementById(`quantity-${product.id}`).value = 0;
        });
        updateTotal();
    }
}
