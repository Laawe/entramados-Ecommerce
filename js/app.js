//contenedor para función drawProductsIndex
let row = document.getElementById("container-products");
//firebase
//html
let buttonLogin = document.getElementById("button-index");
let input = document.getElementById('input-state')
let select = document.getElementById('select')
//select.addEventListener('change', searchCategory)
input.addEventListener('keyup', searchItem)

//6 función que detona después de búsqueda en el input
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

// 5.1 función que se detona después de la función addToCart()
const theCounter = () => {
	let counter = document.getElementById("counterItems");
	let arrayProducts = localStorage.getItem("emptyArray");

	let productsArr = (JSON.parse(arrayProducts)).length;

	counter.innerText = productsArr;
}

//5.2
const decreaseCounter = () => {
	let counter = document.getElementById("counterItems");
	let arrayProductsLess = localStorage.getItem("decreaseArray");
	//Convertir a Array
	let productsArrLess = (JSON.parse(arrayProductsLess)).length;
	//console.log(productsArr);
	counter.innerText = productsArrLess;
}

// 4.2 Función que se detona al dar click "Quitar carrito"--------------------------
const removeFromCart = (id => {
	// console.log(id)
	let totalArrayProducts = JSON.parse(localStorage.getItem("emptyArray"));
	///console.log(totalArrayProducts);
	let indexes = totalArrayProducts.indexOf(id)
	console.log(indexes);

	//
	let split = totalArrayProducts.splice(indexes);
	console.log(split);
	console.log(totalArrayProducts);

	localStorage.setItem("decreaseArray", JSON.stringify(totalArrayProducts));

	decreaseCounter(); //////////////paypal
});

//4.1 Función que se detona después del click de los botones "agregar carrito"----------------------------------------------------------------------------------------------
let emptyArray = [];
const addToCart = (id => {
	let entramadosAll = entramados.concat(entramadosML); //entramadosML viene del archivo dataML.js

	let products = entramadosAll[id];

	emptyArray.push(products)
	// console.log(emptyArray);
	localStorage.setItem("emptyArray", JSON.stringify(emptyArray)); //se crea el Local Storage
	theCounter();
})


//4 Función que se detona después del click de los botones "agregar carrito"----------------------------------------------------------------------------------------------
const changeButtonStatus = (id => {
	let buttonToCart = document.getElementById(id);

	if (buttonToCart.innerText === "Agregar a carrito") {
		buttonToCart.innerText = "Quitar del carrito";
		addToCart(buttonToCart.id);
	} else {
		buttonToCart.innerText = "Agregar a carrito"
		removeFromCart(buttonToCart.id);
	}
})


//3 Habilitando el botón después del login con firebase----------------------------------------------------------------------------------------------
const disabledFalse = (buttons => {
	let button = Array.from(buttons);

	button.forEach(item => {
		item.disabled = false;
	})
})


// 1 Función para pintar data----------------------------------------------------------------------------------------------
const drawProductsIndex = (entramados => {
	template = "";
	entramados.forEach(product => {
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
						Agregar a carrito
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
	//

})

drawProductsIndex(entramados);



//firebase
// 2 Initialize Firebase
var config = {
	apiKey: "AIzaSyBrqYHRUUVgQlnvOjkUTWwYfRWvQ2KqwGY",
	authDomain: "entramados-ecommerce.firebaseapp.com",
	databaseURL: "https://entramados-ecommerce.firebaseio.com",
	projectId: "entramados-ecommerce",
	storageBucket: "",
	messagingSenderId: "167315135160"
};
firebase.initializeApp(config);


buttonLogin.addEventListener("click", authGoogle);
let photo;

function authGoogle() {
	var provider = new firebase.auth.GoogleAuthProvider();
	authentication(provider);
}

function authentication(provider) {
	firebase.auth().signInWithPopup(provider).then(function (result) {

			var token = result.credential.accessToken;
			//Local Storage
			var user = result.user;
			var name = user.displayName;
			//var photo = user.photoURL;
			
			//
			
			//localStorage.photo = result.user.photoURL;
			//*/
			localStorage.setItem("photo", result.user.photoURL);
			photo = document.getElementById("photo-user").setAttribute("src", localStorage.photo);

			databaseFirebase(name);


			// Habilitando botón "Agregar carrito"
			buttonLogin.innerText = "Log out";

			let buttons = document.getElementsByClassName("button-Change");
			disabledFalse(buttons); //llamando a la función que habilita los botones
		})
		.catch(function (error) {

			var errorCode = error.code;
			var errorMessage = error.message;


			var email = error.email;


			var credential = error.credential;

		});
}

function newPhoto() {
	// console.log("hola")
	// localStorage.getItem("photo");
	// let newPhoto = document.getElementById("photo-user").setAttribute("src", localStorage.photo);
	//
	let counterCheckuot = document.getElementById("counterItems");
	//console.log(counterCheckuot)
	//Tomar del localStorage y colocar en contador la cantdad de items en el array
	let arrayProducts = JSON.parse(localStorage.getItem("emptyArray"));
	let lengthArrayProducts = arrayProducts.length
	counterCheckuot.innerText = lengthArrayProducts;
}

newPhoto();

function databaseFirebase(name){
	firebase.database().ref('users').set({
        username: name
    });
}