export const cart = [];

export function addToCart(productId) {
  // checking if the productname is already in the cart so we just increase the quantity
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    document.querySelector(".js-quantitySelector").innerHTML =
      matchingItem.quantity += 1;
  } else {
    // to add items to our cart when we click on add to cart button
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}


