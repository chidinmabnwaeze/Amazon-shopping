import { cart, removeFromCart } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
// import { updateCartQuantity } from "./amazon.js";

const today = dayjs();
const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM D"));

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
 
const deliveryOptionId = cartItem.deliveryOptionId;

let deliveryOption;

deliveryOptions.forEach((option)=>{
if(option.id === deliveryOptionId){
    deliveryOption = option;
}
});

const today= dayjs(); 
const deliveryDate = today.add(
  //first parameer is how many days we want to add and the second is the length of time
  deliveryOption.deliveryDays, "days"
);
const datestring = deliveryDate.format('dddd, MMMM D');


  cartSummaryHTML += `
    <div class="cart-item-container
    js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${datestring}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src=${matchingProduct.image}>

      <div class="cart-item-details">
        <div class="product-name">
         ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(products.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          =<span class="delete-quantity-link link-primary js-delete-quantity" data-product-id = "${
            matchingProduct.id
          }">
            Delete 
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct ,cartItem)}
    
      </div>
    </div>
  </div>
    `;
  document.querySelector(".js-orderSummary").innerHTML = cartSummaryHTML;
});

document.querySelectorAll(".js-delete-quantity").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    console.log(cart);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
  });
});


function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = ''

deliveryOptions.forEach((deliveryOption)=>{
  const today= dayjs(); 
  const deliveryDate = today.add(
    //first parameer is how many days we want to add and the second is the length of time
    deliveryOption.deliveryDays, "days"
  );
  const datestring = deliveryDate.format('dddd, MMMM D');
  const priceString = deliveryOption.priceCents === 0
  ? 'FREE' 
  : `$${formatCurrency(deliveryOption.priceCents)}`

  const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
   html+=
  `
   <div class="delivery-option">
   <input type="radio" 
   ${isChecked ? "checked" : ""}
     class="delivery-option-input"
     name="delivery-option-${matchingProduct.id}">
   <div>
     <div class="delivery-option-date">
       ${datestring}
     </div>
     <div class="delivery-option-price">
       ${priceString} - Shipping
     </div>
   </div>
 </div>
  `
})
return html;
}
// let quantityCountHTML = ""

// quantityCountHTML +=
// `  let cartQuantity = 0;
// cart.forEach((item) => {
//   cartQuantity += item.quantity;
// });

// document.querySelector(".js-cartQuantity").innerHTML = cartQuantity;`
// function quantityCount (){
//     let cartQuantity = 0;
//     cart.forEach((item) => {
//       cartQuantity += item.quantity;
//     });
//     document.querySelector(".js-quantity-count").innerHTML = cartQuantity;
// }
