class Product {
  constructor(id, title, rating, discountPercentage, price, images, qty) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.discountPercentage = discountPercentage;
    this.price = price;
    this.images = images;
    this.qty = 1;
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
    // this.totalCart = [];
  }

  async fetchProducts() {
    let response = await fetch(this.url);
    const data = await response.json();
    const value = localStorage.getItem("clickk");
    // const itemss = localStorage.getItem("cartItems")
    this.products = data.products.map(prod => {
      return new Product(prod.id, prod.title, prod.rating, prod.discountPercentage, prod.price, prod.images, prod.qty);
    });
    // console.log(itemss);
    const notify = document.querySelector(".NoOfItem");
    localStorage.clickk === "0" ? notify.classList.remove("show") : notify.classList.add("show");
    value !== 0 ? localStorage.getItem(notify.innerHTML = localStorage.clickk) : notify.classList.remove("show");
  }

  render() {
    const selectedProduct = localStorage["cartItems"] ? JSON.parse(localStorage["cartItems"]) : [];



    this.products.forEach(prod => {
      prod.render();
      const addBtn = document.querySelector(`[value="${prod.id}"]`);
      const notify = document.querySelector(".NoOfItem");
      localStorage.clickk === undefined || null ? localStorage.setItem("clickk", 0) : notify.classList.add("show");
      localStorage.clickk === "0" ? notify.classList.remove("show") : notify.classList.add("show");
      localStorage.getItem("finalCart") === 0 || null || undefined ? localStorage.setItem("finalCart", []) : localStorage.getItem("finalCart")
      const quant = [];


      addBtn.addEventListener('click', () => {
        // const detail = new Product(prod.id, prod.title, prod.rating, prod.discountPercentage, prod.price, prod.images, prod.qty);
        // selectedProduct.push(detail);
        // // selectedProduct===0||null?selectedProduct:selectedProduct.push(detail)   // old line
        // localStorage.setItem("cartItems", [JSON.stringify(selectedProduct)]);

       

        if(typeof(Storage) !== 'undefined'){
          let detail = {
            id: prod.id,
            title: prod.title,
            rating: prod.rating,
            discountPercentage: prod.discountPercentage,
            price: prod.price,
            images: [prod.images],
            qty:1
  
          }
         
          // console.log(val);

          if (JSON.parse(localStorage.getItem("finalCart")) === null) {
            cartproduct.push(detail);
            localStorage.setItem("finalCart", JSON.stringify(cartproduct));
          } 
          
          else {
          const val = cartproduct.find(res => {
            if(res.id === detail.id){
              bool=true;
            }
          });
            cartproduct.map(data=>{
                  if(detail.id == data.id ){
                  data.qty += 1;
                  }
                  else{
                   if(bool==false){
                    cartproduct.push(detail);
                    return bool = true;
                   }
                 }               
              });
              bool = false;
            }
        }else{
            alert("storage not working")
        }
        
        localStorage.setItem("finalCart",JSON.stringify(cartproduct));
        // NO of cart items
        let clickked = localStorage.getItem("clickk");
        clickked === null || undefined ? localStorage.setItem("clickk", "0") : notify.classList.add("show");
        localStorage.setItem("clickk", parseInt(clickked) + 1);
        notify.innerHTML = localStorage.getItem("clickk");
        notify.classList.add("show");


      });
    });

  }

}

const productList = new ProductList("https://dummyjson.com/products");
let bool = false
let cartproduct = localStorage["finalCart"] ? JSON.parse(localStorage["finalCart"]) : [];
productList.fetchProducts().then(() => productList.render());