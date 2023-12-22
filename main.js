let nextProduct = 2;

function addProduct() {
  // Create fieldset element
  var fieldset = document.createElement("fieldset");
  fieldset.setAttribute("class", "product-fieldset");

  // Create legend element and set its text
  var legend = document.createElement("legend");
  legend.textContent = "מוצר " + nextProduct;
  fieldset.appendChild(legend);

  // Create and append price label and input elements
  var priceLabel = document.createElement("label");
  priceLabel.setAttribute("for", "in-price-" + nextProduct);
  priceLabel.textContent = "מחיר בשקלים";
  fieldset.appendChild(priceLabel);

  var priceInput = document.createElement("input");
  priceInput.setAttribute("id", "in-price-" + nextProduct);
  priceInput.setAttribute("type", "number");
  priceInput.setAttribute("step", "0.01");
  priceInput.setAttribute("placeholder", "הכנס מחיר בשקלים");
  priceInput.setAttribute("oninput", "calculatePrice(this);comparePrices()");
  fieldset.appendChild(priceInput);

  // Add a line break
  fieldset.appendChild(document.createElement("br"));

  // Create and append weight label and input elements
  var weightLabel = document.createElement("label");
  weightLabel.setAttribute("for", "in-weight-" + nextProduct);
  weightLabel.textContent = "משקל בגרם";
  fieldset.appendChild(weightLabel);

  var weightInput = document.createElement("input");
  weightInput.setAttribute("id", "in-weight-" + nextProduct);
  weightInput.setAttribute("type", "number");
  weightInput.setAttribute("placeholder", "הכנס משקל בגרם");
  weightInput.setAttribute("oninput", "calculatePrice(this);comparePrices()");
  fieldset.appendChild(weightInput);

  // Create a div element (price per 100gr)
  var price100GrDiv = document.createElement("div");
  price100GrDiv.setAttribute("class", "price-100gr");
  fieldset.appendChild(price100GrDiv);

  // Append the created fieldset to the document body (or another desired container)
  document.getElementById("products").appendChild(fieldset);
  nextProduct++;
  document.getElementById("bt-clear").style.display = null;
}

function clearProducts() {
  if (confirm("פעולה זאת תמחק את כל המוצרים")) {
    document.getElementById("products").innerHTML = null;
    nextProduct = 2;
    // document.getElementById("bt-compare").style.display = "none";
    document.getElementById("bt-clear").style.display = "none";
    // document.getElementById("result").innerHTML = null;
  }
}

function calculatePrice(inputEl) {
  let fs = inputEl.parentNode;
  let inputs = fs.getElementsByTagName("input");
  let price = +inputs[0].value;
  let weight = +inputs[1].value;
  let priceDiv = fs.getElementsByTagName("div")[0];
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
  let fieldsets = document.getElementsByTagName("fieldset");
  for (let i = 0; i < fieldsets.length; i++) {
    const fieldset = fieldsets[i];
    fieldset.setAttribute("class", "product-fieldset");
    let inputs = fieldset.getElementsByTagName("input");
    let price = inputs[0].value;
    let weight = inputs[1].value;
    // console.log("price: " + price);
    // console.log("weight: " + weight);
    let pricePer100Gr = (price / weight) * 100;
    if (pricePer100Gr < bestPricePer100Gr) {
      bestPricePer100Gr = pricePer100Gr;
      let arr = inputs[0].id.split("-");
      productNum = arr[arr.length - 1];
    }
  }
  //   console.log(productNum);
  let msg;
  if (productNum == 0) {
    msg = "אין מחירים להשוואה";
  } else {
    msg = "המוצר המשתלם ביותר הוא מוצר " + productNum;
    fieldsets[productNum - 1].setAttribute("class", "product-fieldset green");
  }
  //document.getElementById("result").innerHTML = msg;
}
