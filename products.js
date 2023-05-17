
// async function fetchData() {
//      const url = "https://dummyjson.com/products"
//      let response = await fetch(url);
//      const data = await response.json();
//      const prod = data.products;

//      prod.map((val) => {
//           const thum = `<div class="item"><img class="item-img img" src=${val.images[0]} alt=${val.title}>
//      <label class="item-name">${val.title.slice(0, 20)}</label>
//      <div class="parent">
//      <div class="child">⭐<label class="item-rating">${val.rating}</label>
//      <button class="addBtn" value=${val.id}>Add</button>
//      </div>
//      <div class="child1">
//      <p class="discount"><sub>off (${val.discountPercentage}%)</sub></p>
//      <label class="price">₹${val.price}</label>
//      </div>
//      </div>
//      </div>`;
//           document.querySelector(".container").insertAdjacentHTML('beforeend', `${thum}`);
//      })
//      const clicked = document.querySelectorAll(".addBtn")
//      // console.log(clicked.length);
//      console.log(clicked.values)
//      clicked.forEach(btn => {
//           var clickked = 1;
//           btn.addEventListener('click', () => {
//                console.log("clicked");
//                localStorage.setItem("clickk", clickked);
//                clickked++;
//                //     console.log(localStorage.getItem);
//           })
//      })
// }
// fetchData();
// console.log(JSON.parse(localStorage.getItem("finalCart"))[2].title)


// cart item code

const cartItem = document.querySelector(".items");
cartItem.addEventListener('click', () => {
    const cartToggle = document.querySelector('.cartItems');
    cartToggle.classList.toggle('showw');
    // console.log(JSON.parse(localStorage.getItem("finalCart"))[0]);
    let cart = [];
    let finalCart = JSON.parse(localStorage["finalCart"])
    // console.log(finalCart);
    for (let i = 0; i < finalCart.length; i++) {
        cart.push(finalCart[i]);
        // console.log(JSON.parse(localStorage["finalCart"])[i]);
    }
    // console.log(cart);
    let qty = 0
    cart.map((i) => {
     
        // console.log(i);
        // i.forEach(element => {
        //     let qty=0
        //     if(element.id === element.id){
        //          qty=+1
        //     }
        //     console.log(qty);
        // });
        const cartdata = `<div class="cartt">
    <div class="imgContent">
    <img class="cartImg" src=${i.images[0]} alt=${i.title} / >
    </div>
    <div class="cartContent">
    <p>${i.title} </p>
    <p>₹${i.price}</p>
        </div>
    <p>Quantity</p>
    </div>`
        document.querySelector(".cartItems").insertAdjacentHTML('beforeend', `${cartdata}`);
    })
})





 // var objFound_bool = false;
            // // console.log(localItems);
            // for (var i = 0; i < localItems.length; i++){
            //   if (detail.id === localItems[i].id){
            //     objFound_bool = true;
            //     console.log("inside detail update");
            //     localItems[i].qty  = JSON.stringify(detail.qty + 1);
            //     console.log(localItems[i]);
            //   }
            // }
            //   if(!objFound_bool)
            //   {
            //     selectedProduct.push(detail);
            //     // localStorage.setItem("cartItems", [JSON.stringify(selectedProduct)]);
            //   }