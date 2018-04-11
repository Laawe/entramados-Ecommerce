//contenedor para función drawProductsIndex
let row = document.getElementById("container-products");
let buttonLogin = document.getElementById("button-index");
let input = document.getElementById('input-state')
let select = document.getElementById('select')
let containerAllTable = document.getElementById("content");

let entramadosML = [];
let photo;

//select.addEventListener('change', searchCategory)
input.addEventListener('keyup', searchItem)
buttonLogin.addEventListener("click", authGoogle);

//firebase config
var config = {
	apiKey: "AIzaSyBrqYHRUUVgQlnvOjkUTWwYfRWvQ2KqwGY",
	authDomain: "entramados-ecommerce.firebaseapp.com",
	databaseURL: "https://entramados-ecommerce.firebaseio.com",
	projectId: "entramados-ecommerce",
	storageBucket: "",
	messagingSenderId: "167315135160"
};

//funcion que redirecciona a la seccion correspondiente
function clickTo(e, section) {
	e.preventDefault();
	sectionChange(section);
}

//funcion que cambia la seccion
function sectionChange(section) {
	if (section == '' || section == "home") {
		navigate('');
		document.getElementById("display-home").style.display = 'block';
		document.getElementById("display-cart").style.display = 'none';
	} else if (section = "cart") {
		navigate('cart')
		document.getElementById("display-home").style.display = 'none';
		document.getElementById("display-cart").style.display = 'block';
	}
}

//funcion que cambia la ruta
function navigate(path) {
	var current = window.location.href;
	window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
}

//funcion para iniciar la seccion al cargar
function initSection() {
	sectionChange(window.location.hash);
}

//funcion de busqueda de productos
function searchItem() {
	let titles = document.getElementsByTagName('h3')
	Array.from(titles).forEach(function (title) {
		let search = input.value
		let titleText = title.innerText.trim().toLowerCase()
		if (titleText.indexOf(search.trim().toLowerCase()) == -1) {
			title.parentNode.parentNode.parentNode.style.display = 'none'
		} else {
			title.parentNode.parentNode.parentNode.style.display = 'block'
		}
	})
}

// 4.2 Función que se detona al dar click "Quitar carrito"--------------------------
function removeFromCart(id) {
	let entramadosAll = entramados.concat(entramadosML); //entramadosML viene del archivo dataML.js
	let product = entramadosAll[id];
	let arrayProducts = localStorage.getItem("cartProducts") == null ? [] : JSON.parse(localStorage.getItem("cartProducts"));
	let sumTotalPrice = localStorage.getItem("sumTotalPrice") == null ? 0 : parseInt(localStorage.getItem("sumTotalPrice"));
	arrayProducts = arrayProducts.filter(function (p) {
		return p.id != product.id
	});
	sumTotalPrice -= parseInt(product.price);
	localStorage.setItem("cartProducts", JSON.stringify(arrayProducts)); //se crea el Local Storage
	localStorage.setItem("sumTotalPrice", sumTotalPrice); //se crea el Local Storage
	drawCart();
	drawCounter();
};

//4.1 Función que se detona después del click de los botones "agregar carrito"----------------------------------------------------------------------------------------------
function addToCart(id) {
	let entramadosAll = entramados.concat(entramadosML); //entramadosML viene del archivo dataML.js
	let product = entramadosAll[id];
	let arrayProducts = localStorage.getItem("cartProducts") == null ? [] : JSON.parse(localStorage.getItem("cartProducts"));
	let sumTotalPrice = localStorage.getItem("sumTotalPrice") == null ? 0 : parseInt(localStorage.getItem("sumTotalPrice"));
	arrayProducts.push(product);
	sumTotalPrice += parseInt(product.price);
	localStorage.setItem("cartProducts", JSON.stringify(arrayProducts)); //se crea el Local Storage
	localStorage.setItem("sumTotalPrice", sumTotalPrice); //se crea el Local Storage
	drawCart();
	drawCounter();
};

//4 Función que se detona después del click de los botones "agregar carrito"----------------------------------------------------------------------------------------------
function changeButtonStatus(id) {
	let buttonToCart = document.getElementById(id);

	if (buttonToCart.innerText === "Agregar a carrito") {
		buttonToCart.innerText = "Quitar del carrito";
		addToCart(buttonToCart.id);
	} else {
		buttonToCart.innerText = "Agregar a carrito"
		removeFromCart(buttonToCart.id);
	}
}

//3 Habilitando el botón después del login con firebase----------------------------------------------------------------------------------------------
function disabledFalse() {
	let buttons = document.getElementsByClassName("button-Change");
	let button = Array.from(buttons);

	button.forEach(item => {
		item.disabled = false;
	})
}

//autentificacion con firebase
function authGoogle() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function (result) {
				var token = result.credential.accessToken;
				setUserInfo(result.user);
				//databaseFirebase(name);
			})
			.catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				var email = error.email;
				var credential = error.credential;
			});
	} else {
		firebase.auth().signOut().then(function () {
			localStorage.removeItem('cartProducts');
			localStorage.removeItem('sumTotalPrice');
			location.reload();
		});
	}
}

//escribe informacion del usuario
function setUserInfo(user) {
	document.getElementById("photo-user").setAttribute("src", user.photoURL);
	buttonLogin.innerText = "Log out";
	disabledFalse(); //llamando a la función que habilita los botones
}

// 1 Función para pintar data----------------------------------------------------------------------------------------------
function drawProductsIndex(entramados) {
	let template = "";
	let products = localStorage.getItem("cartProducts") == null ? [] : JSON.parse(localStorage.getItem("cartProducts"));
	entramados.forEach(product => {
		let exists = products.find(function (p) {
			return p.id == product.id
		});
		let buttonText = exists ? 'Quitar del carrito' : 'Agregar a carrito';
		template += `
		<div class="6u 11u(mobile)">
			<section>
				<header>
				<h3>${product.title}</h3>
				</header>
					<a href="#" class="image featured"><img src="${product.photo}" alt="" /></a>
						<p><strong>Precio: </strong>${product.price} MXN<br/>
						<strong>Estado: </strong>${product.state}</p>
						<p> <strong> Descripción: </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, esse tempore vero ab voluptatum tempora incidunt ut inventore aliquid, dicta, nam error ipsam. Quod doloremque perspiciatis nostrum, eaque nulla qui!</p>
						<button id='${product.id}' data-id=${product.id}
						onclick="changeButtonStatus(${product.id})"
						class='button-Change' type="click" disabled>
						${buttonText}
						</button>
						<br>
			</section>
		</div>
		`
	});

	let html = document.createElement("div");
	html.classList.add("row")
	html.innerHTML = template;
	row.appendChild(html);
};


//funcion para pintar contador
function drawCounter() {
	let products = localStorage.getItem("cartProducts") == null ? [] : JSON.parse(localStorage.getItem("cartProducts"));
	document.getElementById("counterItems").innerText = products.length;
}


//funcion para imprimir carrito
function drawCart() {
	let products = localStorage.getItem("cartProducts") == null ? [] : JSON.parse(localStorage.getItem("cartProducts"));
	let sumTotalPrice = localStorage.getItem("sumTotalPrice") == null ? 0 : parseInt(localStorage.getItem("sumTotalPrice"));
	let totalContainer = document.getElementById('total_container')

	cartProducts = document.getElementsByClassName('cart-product');
	while (cartProducts.length > 0) {
		cartProducts[0].remove();
	}
	products.forEach(product => {
		let productsContainer = document.getElementById('table-checkout');
		//guardar en variable función createTemplate
		var templateComplite = createTemplate(product)
		let tr = document.createElement('tr');
		tr.className = 'cart-product';
		tr.innerHTML = templateComplite
		productsContainer.prepend(tr);
	});
	totalContainer.innerHTML = sumTotalPrice
}


//funcion que crea template de items del carrito
function createTemplate(product) {
	let name = product.title;
	let price = product.price;
	template = `
	<th scope="row">${name}</th>
	<td>${price}</td>
	`
	return template
}

//funncion para imprimir confirmacion despues de pago
function showConfirmation() {
	containerAllTable.setAttribute("style", "display:none");
	let templateConfirm = `
	<div class=12u 12u(mobile)>
	<h1 id="logo">¡Gracias por su compra!</h1>
	</div>
	`

	let containerConfirm = document.getElementById("main");
	main.innerHTML = templateConfirm;
	let wrapper = document.getElementById("cart-wrapper");
	wrapper.appendChild(main);
}

//funcion para obtener datos de la API
function getDataML() {
	fetch('https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/search?q=artesania+textiles', {
		credentials: "same-origin",
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
		}
	}).then((response) => {
		response.json().then((data) => {
			// paintData(data['results'])
			let index = 15;
			data['results'].forEach(element => {
				var photo = element.thumbnail.replace('I', 'O')
				var title = element.title;
				title = title.split(" ");
				title = title.slice(0, 7);
				title = title.join(" ")
				var product = {}
				product['id'] = index
				product['title'] = title
				product['price'] = element['price']
				product['photo'] = photo
				product['state'] = element['seller_address']['state']['name']
				entramadosML.push(product)
				index++
			});
			drawProductsIndex(entramadosML);
			if (firebase.auth().currentUser) {
				disabledFalse();
			}
		})
	})
}

//configuracion de pago de paypal
paypal.Button.render({

	env: 'sandbox', // sandbox | production

	// PayPal Client IDs - replace with your own
	// Create a PayPal app: https://developer.paypal.com/developer/applications/create
	client: {
		sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
		production: 'AcGRwPF_uQngnc-WSz7M9F1Mik8xnc4irZw__xE0dserau0k7WhoV79HHDG3rMtgIlDHEZnU2V84ARkT'
	},

	// Show the buyer a 'Pay Now' button in the checkout flow
	commit: true,

	// payment() is called when the button is clicked
	payment: function (data, actions) {
		let sumTotalPrice = localStorage.getItem("sumTotalPrice") == null ? 0 : parseInt(localStorage.getItem("sumTotalPrice"));
		// Make a call to the REST api to create the payment
		return actions.payment.create({
			payment: {
				transactions: [{
					amount: {
						total: sumTotalPrice,
						currency: 'MXN'
					}
				}]
			}
		});
	},

	// onAuthorize() is called when the buyer approves the payment
	onAuthorize: function (data, actions) {

		// Make a call to the REST api to execute the payment
		return actions.payment.execute().then(function (data) {
			// window.alert('Payment Complete!');
			showConfirmation();
		});
	}
}, '#paypal-button-container');


drawProductsIndex(entramados);
drawCart();
drawCounter();

getDataML();
initSection();

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user){
	if(user){
		setUserInfo(user);
	}
});



function databaseFirebase(name) {
	firebase.database().ref('users').set({
		username: name
	});
}