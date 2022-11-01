const getProducts = async () => {
    try {
        const response = await fetch('/api/products')
        const products = await response.json()
        return products
    } catch (error) {
        console.log(error)
    }
}

const MakeProductTable = async (products) =>{
    const archivoTemplate = await fetch('views/products-table.hbs')
    const templateText = await archivoTemplate.text()
    const templateCompiled = Handlebars.compile(templateText)
    return templateCompiled({products})
}

const renderProducts = async () => {
    const productsContainer = document.getElementById('productsContainer')

    const products = await getProducts()

    productsContainer.innerHTML = await MakeProductTable(products)
    

    // products.map(product => `<div><p> ${product.title} </p></div>`).join(" ")
}

const getProductBtn = document.getElementById('getProductsBtn')
getProductBtn.addEventListener('click', renderProducts)
