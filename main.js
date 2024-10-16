let nextProduct = 2;

function addProduct() {
    // create div container for a product box
    let div = document.createElement("div");
    div.setAttribute("class", "product-container");

    // Create and append price input element
    let priceInput = document.createElement("input");
    priceInput.setAttribute("id", "in-price-" + nextProduct);
    priceInput.setAttribute("type", "number");
    priceInput.setAttribute("step", "0.10");
    priceInput.setAttribute("placeholder", "הכנס מחיר בשקלים");
    priceInput.setAttribute("oninput", "calculatePrice(this);comparePrices()");
    priceInput.setAttribute("onkeydown", "checkForAddProduct(event)");
    div.appendChild(priceInput);
    let span = document.createElement("span");
    span.innerHTML = " ₪";
    div.appendChild(span);

    // Add a line break
    div.appendChild(document.createElement("br"));

    // Create and append weight input element
    let weightInput = document.createElement("input");
    weightInput.setAttribute("id", "in-weight-" + nextProduct);
    weightInput.setAttribute("type", "number");
    weightInput.setAttribute("placeholder", "הכנס משקל בגרם");
    weightInput.setAttribute("oninput", "calculatePrice(this);comparePrices()");
    weightInput.setAttribute("onkeydown", "checkForAddProduct(event)");
    div.appendChild(weightInput);
    span = document.createElement("span");
    span.innerHTML = " gr";
    div.appendChild(span);

    // Create a div element (price per 100gr)
    let price100GrDiv = document.createElement("div");
    price100GrDiv.setAttribute("class", "price-100gr");
    div.appendChild(price100GrDiv);

    // Append the created product container to the products container
    document.getElementById("products").appendChild(div);

    nextProduct++;
    document.getElementById("bt-clear").style.display = null;
    priceInput.focus();
}

function clearProducts() {
    if (confirm("פעולה זאת תמחק את כל המוצרים")) {
        document.getElementById("products").innerHTML = null;
        nextProduct = 2;
        document.getElementById("bt-clear").style.display = "none";
        document.getElementById("in-price-1").value = null;
        document.getElementById("in-weight-1").value = null;
        document.getElementsByClassName("price-100gr")[0].innerHTML = null;
        document.getElementsByClassName("product-container")[0].setAttribute("class", "product-container");
    }
}

function calculatePrice(inputEl) {
    let productContainer = inputEl.parentNode;
    let inputs = productContainer.getElementsByTagName("input");
    let price = +inputs[0].value;
    let weight = +inputs[1].value;
    let priceDiv = productContainer.getElementsByTagName("div")[0];
    if (weight == 0 || isNaN(price) || isNaN(weight)) {
        priceDiv.innerHTML = null;
        return;
    }
    let pricePer100Gr = ((price / weight) * 100).toFixed(2);
    priceDiv.innerHTML = "מחיר למאה גרם " + pricePer100Gr + ' ש"ח';
}

function comparePrices() {
    let bestPricePer100Gr = 9999999999;
    let productNum = 0;
    let products = document.getElementsByClassName("product-container");
    for (let i = 0; i < products.length; i++) {
        const productDiv = products[i];
        productDiv.setAttribute("class", "product-container");
        let inputs = productDiv.getElementsByTagName("input");
        let price = inputs[0].value;
        let weight = inputs[1].value;
        let pricePer100Gr = (price / weight) * 100;
        if (pricePer100Gr < bestPricePer100Gr) {
            bestPricePer100Gr = pricePer100Gr;
            let arr = inputs[0].id.split("-");
            productNum = arr[arr.length - 1];
        }
    }
    let msg;
    if (productNum == 0) {
        msg = "אין מחירים להשוואה";
    } else {
        msg = "המוצר המשתלם ביותר הוא מוצר " + productNum;
        products[productNum - 1].setAttribute("class", "product-container green");
        console.log(products);
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            let inputs = product.getElementsByTagName("input");
            let price = inputs[0].value;
            let weight = inputs[1].value;
            let pricePer100Gr = (price / weight) * 100;
            if (pricePer100Gr === bestPricePer100Gr) {
                product.setAttribute("class", "product-container green");
            }
        }
        //document.getElementById("result").innerHTML = msg;
    }
}

function checkForAddProduct(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        if (event.target.value != "") {
            let productContainer = event.target.parentNode;
            let inputs = productContainer.getElementsByTagName("input");
            let price = +inputs[0].value;
            let weight = +inputs[1].value;
            if (price != "" && weight != "") {
                addProduct();
            }

        }
    }
}
