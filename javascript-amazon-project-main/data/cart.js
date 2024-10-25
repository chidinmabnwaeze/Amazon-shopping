export const cart = [
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }
];

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


