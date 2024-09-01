const menuIcon = document.querySelector(".menu-icon");
const backdrop = document.querySelector(".back-drop");
const navLinks = document.querySelector("nav .links");
const closeIconNav = document.querySelector("nav .close-icon");

menuIcon.addEventListener("click", () => {
  navLinks.classList.add("active");
  backdrop.classList.add("active");
});

closeIconNav.addEventListener("click", () => {
  navLinks.classList.remove("active");
  backdrop.classList.remove("active");
});

backdrop.addEventListener("click", () => {
  navLinks.classList.remove("active");
  backdrop.classList.remove("active");
});

const mainImages = document.querySelectorAll(".default  .main-img img");
const thubnails = document.querySelectorAll(".default .thubnails div");

const lightbox = document.querySelector(".lightbox");
const lightBoxMainImages = document.querySelectorAll(
  ".lightbox  .main-img img"
);
const lightBoxThubnails = document.querySelectorAll(".lightbox .thubnails div");
const closeIconLightbox = document.querySelector(".lightbox .close-icon");
const iconPrev = document.querySelector(".previous-icon");
const iconNext = document.querySelector(".next-icon");

let currentIndex = 0;

const changeImage = (index, mainImgs, thubs) => {
  mainImgs.forEach((img) => {
    img.classList.remove("active");
  });

  thubs.forEach((thub) => {
    thub.classList.remove("active");
  });

  mainImgs[index].classList.add("active");
  thubs[index].classList.add("active");
  currentIndex = index;
};

thubnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, mainImages, thubnails);
  });
});

mainImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    changeImage(index, lightBoxMainImages, lightBoxThubnails);
  });
});

lightBoxThubnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, lightBoxMainImages, lightBoxThubnails);
  });
});

iconPrev.addEventListener("click", () => {
  if (currentIndex <= 0) {
    changeImage(
      --lightBoxMainImages.length,
      lightBoxMainImages,
      lightBoxThubnails
    );
  } else {
    changeImage(--currentIndex, lightBoxMainImages, lightBoxThubnails);
  }
});

iconNext.addEventListener("click", () => {
  if (currentIndex >= --lightBoxMainImages.length) {
    changeImage(0, lightBoxMainImages, lightBoxThubnails);
  } else {
    changeImage(++currentIndex, lightBoxMainImages, lightBoxThubnails);
  }
});

closeIconLightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

const productAmount = document.querySelector(".counter .amount");
const decrementIcon = document.querySelector(".counter .decrement");
const incrementIcon = document.querySelector(".counter .increment");
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart-container");
const cartCounter = document.querySelector(".cart-counter");
const addToCartButton = document.querySelector("button.add-to-cart");
const cartItems = document.querySelector(".cart-items");
const checkoutButton = document.querySelector(".checkout");

let amount = 0;
let totalQuantity = 0;

const updateAmount = (newAmount) => {
  amount = newAmount;
  productAmount.textContent = amount;
};

decrementIcon.addEventListener("click", () => {
  if (amount > 0) {
    updateAmount(--amount);
  }
});

incrementIcon.addEventListener("click", () => {
  updateAmount(++amount);
});

cartIcon.addEventListener("click", () => {
  cart.classList.toggle("active");
});

cartCounter.addEventListener("click", () => {
  cart.classList.toggle("active");
});

const addProductToCart = () => {
  const productName = document.querySelector(".product-name").textContent;
  const productPrice = parseFloat(
    document.querySelector(".current-price").textContent.replace("$", "")
  ).toFixed(2);
  const productImage = document
    .querySelector(".gallery.default .main-img img:nth-child(1)")
    .getAttribute("src");

  const totalPrice = productPrice * amount;

  const product = document.createElement("div");
  product.className = "cart-item";
  product.dataset.quantity = amount;
  product.innerHTML = `
    <img src= "${productImage}" alt="product-img"/>
    <div class="product-infos">
      <p>${productName}</p>
      <div>
        <p>
          $${productPrice} x ${amount}
          <span class="total-price">$${totalPrice.toFixed(2)}</span> 
        </p>
      </div>
    </div>
    <button class="delete">
      <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
    </button>

  `;
  cartItems.appendChild(product);
  updateTotalQuantity();

  const deleteButton = product.querySelector(".delete");
  deleteButton.addEventListener("click", (event) => {
    const item = event.target.closest(".cart-item");
    item.remove();
    updateTotalQuantity();
    if (cartItems.children.length === 2) {
      cart.classList.remove("active");
      cartItems.classList.add("empty");
    }
  });
};

const updateTotalQuantity = () => {
  const cartProductsList = document.querySelectorAll(".cart-item");
  totalQuantity = 0;
  cartProductsList.forEach((item) => {
    totalQuantity += parseInt(item.dataset.quantity);
  });
  cartCounter.textContent = totalQuantity;
};

addToCartButton.addEventListener("click", () => {
  if (amount === 0) {
    return;
  }
  addProductToCart();
  cart.classList.add("active");
  cartItems.classList.remove("empty");
  updateAmount(0);
});
