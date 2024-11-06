class Cart {
  cartItems;
  localStoragekey = undefined;
  //whether you write it as = undefined or just the object and a semicolon they mean the same thing but best practice can be just ending with a semi-colon

  constructor(localStoragekey) {
    this.localStoragekey = localStoragekey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStoragekey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }
  saveToStorage() {
    localStorage.setItem(localStoragekey, JSON.stringify(this.cartItems));
  }
  addToCart(productId) {
    // checking if the productname is already in the cart so we just increase the quantity
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      document.querySelector(".js-quantitySelector").innerHTML =
        matchingItem.quantity += 1;
    } else {
      // to add items to our cart when we click on add to cart button
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptions: "1",
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

// const businessCart = Cart();
const cart = new Cart("cart-oop");

console.log(cart);
