function saveProductLocally(product) {
    let productList = localStorage.getItem('productList');
    productList = productList ? JSON.parse(productList) : [];
    productList.push(product);
    localStorage.setItem('productList', JSON.stringify(productList));
}

function loadProductList() {
    const productList = JSON.parse(localStorage.getItem('productList'));
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    productTable.innerHTML = '';

    if (productList) {
        productList.sort((a, b) => a.value - b.value);

        productList.forEach(function (product) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${product.name}</td>
                <td>R$ ${product.value}</td>
                <td>${product.availability}</td>
            `;
            productTable.appendChild(newRow);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value.trim();
        const productDescription = document.getElementById('productDescription').value.trim();
        const productValue = parseFloat(document.getElementById('productValue').value.replace(',', '.'));
        const productAvailability = document.getElementById('productAvailability').value;

        if (productName === '' || productDescription === '' || isNaN(productValue)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const newProduct = {
            name: productName,
            description: productDescription,
            value: productValue.toFixed(2),
            availability: productAvailability
        };

        saveProductLocally(newProduct);
        alert('Produto cadastrado com sucesso!');

        productForm.reset();

        loadProductList();
    });

    loadProductList();
});
