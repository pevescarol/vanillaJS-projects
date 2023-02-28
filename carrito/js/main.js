// Cart menu
let cartIcon = document.querySelector(".cart")
let cartMenu = document.querySelector(".cart-menu")
let closeCartMenu = document.querySelector("#close-cart")

// Open cart
cartIcon.onclick = () => {
    cartMenu.classList.add("active");
    console.log("hey")
};

// Close cart
closeCartMenu.onclick = () => {
    cartMenu.classList.remove("active");
};

// Cart

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    // Remove items
    let removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for (let i = 0; i < removeCartButtons.length; i++){
        let button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    // Quantity changes
    let quantityInputs = document.getElementsByClassName("cart-quantity")
    for (let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    // Add to cart
    let addCart = document.getElementsByClassName("btn-cart")
    for(let i = 0; i < addCart.length; i++) {
        let button = addCart[i]
        button.addEventListener("click", addCartClicked)
    }

    // Buy btn
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked)
    
}

// Buy button
function buyButtonClicked(){
    alert("Tu compra se ha realizado")
    let cartContent = document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}


// Remove Items

function removeCartItem(e){
    let buttonCliked = e.target
    console.log(buttonCliked.parentElement)
    buttonCliked.parentElement.parentElement.parentElement.parentElement.remove()
    updateTotal()
}

// Quantity Changes
function quantityChanged(e){
    let input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal()
}


//Add to cart
function addCartClicked(e) {
    let button = e.target
    let products = button.parentElement
    let title = products.getElementsByClassName("product-title")[0].innerText
    let price = products.getElementsByClassName("price")[0].innerText
    let productImg = products.getElementsByClassName("product-img")[0].src
    console.log(title, price,productImg)
    addProductToCart(title, price, productImg)
    updateTotal()
}

function addProductToCart(title, price, productImg){
    let cartBox = document.createElement("div")
    cartBox.classList.add("cart-box","card","mb-3")
    let cartItems = document.getElementsByClassName("cart-content")[0]
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
    for (let i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("Ya agregaste este producto al carrito.")
            return
        }
    }

    let cartBoxContent = `
            <div class="card-body">
                <div class="d-flex justify-content-around">
                    <div class="d-flex flex-row align-items-center">
                        <div>
                            <img
                            src="${productImg}"
                            class="img-fluid rounded-3" alt="Shopping item" style="width: 75px;">
                        </div>
                        <div class="mx-3 d-flex flex-column align-items-left">
                            <h6 class="cart-product-title">${title}</h6>
                            
                            <div style="width: 60px;" class="mt-2">
                                <input min="0" name="quantity" value="1" type="number" class="form-control form-control-md cart-quantity" />
                            </div>
                        </div>
                        
                    </div>
                    <div class="d-flex flex-row align-items-center">
                        
                        <div class="ms-3 " style="width: 80px;">
                            <h6 class="mb-0 cart-price">${price}</h6>
                        </div>
                        <i class="fas fa-trash-alt cart-remove text-muted"></i>
                    </div>
                </div>
            </div>
`
cartBox.innerHTML = cartBoxContent
cartItems.append(cartBox)
cartBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem)
cartBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)

}





// Update Total

function updateTotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0]
    let cartCards = cartContent.getElementsByClassName("cart-box") 

    let total = 0
    for (let i = 0; i < cartCards.length; i++){
        let cartCard = cartCards[i]
        let priceElement = cartCard.getElementsByClassName("cart-price")[0]
        let quantityElement = cartCard.getElementsByClassName("cart-quantity")[0]
        let price = parseFloat(priceElement.innerText.replace("$", ""))
        let quantity = quantityElement.value
        total = total + price * quantity
    }
    // Si el precio contiene algun centavo
    //total = Math.round(total *100 / 100)
    document.getElementsByClassName("total-price")[0].innerText = "$" + total
}