class Product {
  constructor(id, title, rating, discountPercentage, price, images) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.discountPercentage = discountPercentage;
    this.price = price;
    this.images = images;
  }

  render() {
    const thum = `<div class="item"><img class="item-img img" src=${this.images[0]} alt=${this.title}>
         <label class="item-name">${this.title.slice(0, 20)}</label>
         <div class="parent">
           <div class="child"><label class="item-rating">⭐${this.rating}</label>
           <button class="addBtn" value=${this.id}>Add</button>
           </div>
           <div class="child1">
           <p class="discount"><sub>off (${this.discountPercentage}%)</sub></p>
           <label class="price">₹${this.price}</label>
           </div>
         </div>
       </div>`;
    document.querySelector(".container").insertAdjacentHTML('beforeend', `${thum}`);
  }
}

class ProductList {
  constructor(url) {
    this.url = url;
    this.products = [];
    this.totalCart = [];
  }

  async fetchProducts() {
    let response = await fetch(this.url);
    const data = await response.json();
    const value = localStorage.getItem("clickk")
    const itemss = localStorage.getItem("cartItems")
    this.products = data.products.map(prod => {
      return new Product(prod.id, prod.title, prod.rating, prod.discountPercentage, prod.price, prod.images);
    });
    // console.log(itemss);
    const notify = document.querySelector(".NoOfItem");
    localStorage.clickk === "0" ? notify.classList.remove("show") : notify.classList.add("show");
    value !== 0 ? localStorage.getItem(notify.innerHTML = localStorage.clickk) : notify.classList.remove("show");
    // localStorage.setItem("product",JSON.stringify(this.products))
    localStorage.setItem("cartItems",JSON.stringify(this.totalCart));
    // itemss === 0||null||undefined?localStorage.setItem("cartItems"): localStorage.getItem("cartItems");
    console.log(this.totalCart); 
  }

  render() {
    this.products.forEach(prod => {
      prod.render();
      const addBtn = document.querySelector(`[value="${prod.id}"]`);
      const notify = document.querySelector(".NoOfItem")
      localStorage.clickk === undefined || null ? localStorage.setItem("clickk", 0) : notify.classList.add("show");
      localStorage.clickk === "0" ? notify.classList.remove("show") : notify.classList.add("show");
      // const refersh = localStorage.getItem("finalCart")
      
      const selectedProduct = []

      addBtn.addEventListener('click', () => {
        // console.log(prod);
        const cart = localStorage.getItem("cartItems")
        // console.log(cart);
        const detail = new Product(prod.id, prod.title, prod.rating, prod.discountPercentage, prod.price, prod.images)
        // let cartStringified = JSON.stringify(detail)    //old code
        // this.totalCart===0||null?this.totalCart:this.totalCart.push(detail)   // old line
        selectedProduct===0||null?selectedProduct:selectedProduct.push(detail)   // old line
        // selectedProduct.push(detail)
        cartproduct.push(detail)
        // this.totalCart===0||null?localStorage.setItem("cartItems",cartStringified):localStorage.setItem("cartItems",this.totalCart.push(cartStringified));  //new line
        // localStorage.setItem("cartItems",[`${cartStringified}`]) //if error remove this line
        // localStorage.setItem("cartItems",`${detail}`)
        // console.log(cart);
        // console.log(detail);
        // console.log(selectedProduct);
        // cartproduct = [...selectedProduct]
        localStorage.setItem("cartItems",[JSON.stringify(selectedProduct)])
        localStorage.setItem("finalCart",[JSON.stringify(cartproduct)])
        
        // NO of cart items
        let clickked = localStorage.getItem("clickk");
        clickked === null || undefined ? localStorage.setItem("clickk", "0") : notify.classList.add("show")
        localStorage.setItem("clickk", parseInt(clickked) + 1);
        notify.innerHTML = localStorage.getItem("clickk")
        notify.classList.add("show");
        console.log(cartproduct);
        // localStorage.setItem("finalCart",[])

        // 
        // localStorage.setItem("prevItems",[...this.totalCart,cartStringified]);
        // const prevData =localStorage.setItem("prevItems",[...this.totalCart,cartStringified]) ;
        //  console.log(localStorage.clickk);

      });
    });

  }

}
// document.addEventListener('DOMContentLoaded',()=>{
//   const prevData = localStorage.getItem("cartItems")
//   console.log(prevData);
//   // localStorage.setItem("cartItems",prevData)
// })
const productList = new ProductList("https://dummyjson.com/products");
let cartproduct = [];
productList.fetchProducts().then(() => productList.render());