//contenedor para función drawProductsIndex
let row = document.getElementById("container-products");
//firebase
let buttonLogin = document.getElementById("button-index");



const theCounter = () =>{
	let counter = document.getElementById("counterItems");
	let arrayProducts = localStorage.getItem("emptyArray");
  //Convertir a Array
	let productsArr =(JSON.parse(arrayProducts)).length;
	//console.log(productsArr);
	counter.innerText = productsArr;
}

// const decressCounter = ()=>{
// 	let counter = document.getElementById("counterItems");
// 	let arrayProductsLess = localStorage.getItem("itemResult");
//   //Convertir a Array
// 	let productsArrLess =(JSON.parse(arrayProductsLess)).length;
// 	//console.log(productsArr);
// 	counter.innerText = productsArrLess;
// }

// Función que se detona después del click de los botones "agregar carrito"----------------------------------------------------------------------------------------------
let emptyArray = [];
const addToCart = (id => {
//console.log(entramadosML)
let entramadosAll = entramados.concat(entramadosML);
//console.log(entramadosAll);
	let products = entramadosAll[id];
	console.log(products);
	// let products = event.target.dataset.id
	//  let concat = products.concat(products2)

		emptyArray.push(products)
		console.log(emptyArray);
	localStorage.setItem("emptyArray", JSON.stringify(emptyArray));
	theCounter();
	})



const removeFromCart = (id => {
	console.log(id)
	let totalArrayProducts = JSON.parse(localStorage.getItem("emptyArray"));
	console.log(totalArrayProducts);
	let itemResult = totalArrayProducts.filter(function(item){
		return item.id != id	
	})
	//poner este nuevo array en local storge o quiter este item del local storage anterior
	console.log(itemResult);
});



// Función que se detona después del click de los botones "agregar carrito"----------------------------------------------------------------------------------------------
const changeButtonStatus = (id =>{
	let buttonToCart = document.getElementById(id);
	//console.log(buttonToCart);
	//console.log(buttonToCart);
	//console.log(buttonToCart.id);

	if (buttonToCart.innerText ==="Agregar a carrito"){
		buttonToCart.innerText = "Quitar del carrito";
		addToCart(buttonToCart.id);
	}else{
		buttonToCart.innerText = "Agregar a carrito"
		removeFromCart(buttonToCart.id);
	}
})


// Habilitando el botón después del login con firebase----------------------------------------------------------------------------------------------
const disabledFalse = (buttons => {
	let button = Array.from(buttons);

	button.forEach(item => {
		item.disabled = false;
	})
})


// Función para pintar data----------------------------------------------------------------------------------------------
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
						<p><strong>Precio: </strong>${product.price}.00 MXN<br/>
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
// Initialize Firebase
var config = {
	apiKey: "AIzaSyBrqYHRUUVgQlnvOjkUTWwYfRWvQ2KqwGY",
	authDomain: "entramados-ecommerce.firebaseapp.com",
	databaseURL: "https://entramados-ecommerce.firebaseio.com",
	projectId: "entramados-ecommerce",
	storageBucket: "",
	messagingSenderId: "167315135160"
};
firebase.initializeApp(config);


buttonLogin.addEventListener("click", authGoogle)

function authGoogle() {
	var provider = new firebase.auth.GoogleAuthProvider();
	authentication(provider);
}

function authentication(provider) {
	firebase.auth().signInWithPopup(provider).then(function (result) {

			var token = result.credential.accessToken;

			var user = result.user;

			buttonLogin.innerText = "Log out";

			let buttons = document.getElementsByClassName("button-Change");
			disabledFalse(buttons);	 //llamando a la función que habilita los botones
		})
		.catch(function (error) {

			var errorCode = error.code;
			var errorMessage = error.message;


			var email = error.email;


			var credential = error.credential;

		});
}
