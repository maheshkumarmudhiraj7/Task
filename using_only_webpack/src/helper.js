export default function helper(){
  console.log("I am app");
}

export function listProduct(item, index) {
	var product = `
			<div class="col-md-3 col-sm-6 mb-5">
	            <div class="product-grid">
	                <div class="product-image">
	                    <a href="#">
	                        <img class="pic-1" src="${item.image}">
	                        <img class="pic-2" src="${item.image}">
	                    </a>
	                    <ul class="social">
	                        <li><a href="" data-tip="Quick View"><i class="fa fa-search"></i></a></li>
	                        <li><a href="" data-tip="Add to Wishlist"><i class="fa fa-shopping-bag"></i></a></li>
	                        <li><a href="" data-tip="Add to Cart"><i class="fa fa-shopping-cart"></i></a></li>
	                    </ul>
	                    <span class="product-new-label">Sale</span>
	                    <span class="product-discount-label">${item.discount}%</span>
	                </div>
	                <ul class="rating">
	                    <li class="fa fa-star"></li>
	                    <li class="fa fa-star"></li>
	                    <li class="fa fa-star"></li>
	                    <li class="fa fa-star"></li>
	                    <li class="fa fa-star disable"></li>
	                </ul>
	                <div class="product-content">
	                    <h3 class="title"><a href="#">${item.name}</a></h3>
	                    <div class="price">Rs ${item.price.actual}
	                        <span>Rs ${item.price.display}</span>
	                    </div>
	                    <a class="add-to-cart" id="${item.id}">+ Add To Cart</a>
	                </div>
	            </div>
	        </div>
		`;
		return product;
}

export function loadCart() {
	
	let cart = `
			<h3>Cart</h3>
			<table class="table">
					<thead>
					    <tr>
					        <th>Product</th>
					        <th>Quantity</th>
					        <th>Price</th>
					        <th>Discount</th>
					        <th>Total</th>
					        <th>Remove</th>
					    </tr>
					</thead><tbody>`;
			var totalPrice = 0;
			var totalDiscount = 0;
			var subTotal = 0;
			if(window.carts.length > 0 ){
				for (let row of window.carts ) {
					let price = row.price.actual;
					let discount = row.price.actual*(row.discount/100);
					let total = (price - discount)*row.qty;
			cart += `<tr>
					        <td>
					        	<img src="${row.image}" height="50"/><br>
					        	${row.name}
					        </td>
					        <td>
					        	${row.qty}
					        </td>
					        <td>${price.toFixed(2)}</td>
					        <td>${discount.toFixed(2)}</td>
					        <td>${total.toFixed(2)}</td>
					        <td><a id="${row.id}" class="removeCart"> <i class="fa fa-remove" style="font-size:24px;color:red"></i> </a></td>
					    </tr>      
					`;
					 totalPrice += price*row.qty;
					 totalDiscount += discount*row.qty;
					 subTotal += total;
				}
			}

		cart += `</tbody></table>
				<br>
				<br>
				
				<table class="table">
					    <tr>
					        <th>Total</th>
					        <td>${totalPrice.toFixed(2)}</td>
					    </tr>
					    <tr><th>Total Discount</th>
					        <td>${totalDiscount.toFixed(2)}</td>
					        </tr>
					    <tr><th>Sub Total</th>
					        <td>${subTotal.toFixed(2)}</td>
					    </tr>
				</table>
	`;

	return cart;
}

export function addCart(id) {
	//console.log(index, window.products);
	//window.carts
	let cartExits = false;
	window.carts.map(function(row) {
		if(row.id == id) {
			cartExits = true;
		}
	});
	
	if(!cartExits) {
		let carts = window.products.filter(function(row) { 
			if(row.id == id) {
				row['qty'] = 1;
				return row;
			}
		});
		window.carts.push(carts[0]);
	} else {

		window.carts = window.carts.map(function(row) {
			if(row.id == id) {
				row['qty'] += 1;
			}
			return row;
		});
	}
}

export function removeCart(id) {
	//console.log(index, window.products);
	window.carts = window.carts.filter(function(row) {
		if(row.id != id) return row;
	});
}