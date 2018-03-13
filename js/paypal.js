// let total = 0;
// const calculateTotal = productDetails => {
//   let tableTemplate = ` `;
//   // let total = 0;
//   let totalGap = ` `;
//   productDetails.forEach(product => {
//     total += product.price;
//     tableTemplate += `<tr>
//     <th scope="row">${product.title}</th>
//     <td>${product.price}</td>
//     </tr>`;
//     tabody.innerHTML = tableTemplate;
//   })
//   totalGap += `
//     <td><strong>TOTAL: </strong><em>${total}<em></td>`;
//     totalTR.innerHTML = totalGap;
// }

// const showConfirmation = num => {
//   console.log(num);
//   let conf = `<p class="text-center"><strong>Confirmacion compra: ${num}</strong></p>`;
//   confirmation.innerHTML = conf;
// }

let productsContainer = document.getElementById('table-checkout');
console.log(productsContainer)

let counterCheckuot = document.getElementById("counterItems");  
console.log(counterCheckuot)
//Tomar del localStorage y colocar en contador la cantdad de items en el array
let arrayProducts = JSON.parse(localStorage.getItem("emptyArray"));
let lengthArrayProducts=  arrayProducts.length
counterCheckuot.innerText = lengthArrayProducts;


let sumTotalPrice = 0;
function calculateTotal(json) {
console.log(json);
let jsonForEach = json;
let template = " ";
jsonForEach.forEach(product => {
//guardar en variable función createTemplate
var templateComplite = createTemplate(product)

let tr = document.createElement('tr');
tr.innerHTML=templateComplite

//let productsContainer = document.getElementById('table-checkout');
productsContainer.prepend(tr);
});

let totalContainer = document.getElementById('total_container')
totalContainer.innerHTML = sumTotalPrice
console.log(sumTotalPrice);

}




function createTemplate(product){
let name = product.title;
let price = product.price;
sumTotalPrice += price;

template = `
<th scope="row">${name}</th>
<td>${price}</td>
`
return template
}

calculateTotal(arrayProducts);

paypal.Button.render({

            env: 'sandbox', // sandbox | production

            // PayPal Client IDs - replace with your own
            // Create a PayPal app: https://developer.paypal.com/developer/applications/create
            client: {
                sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                production: 'AfLIioIO6i635ADVZLmpyqHq4ePQzXjLHihuGkAEcQh1JaB1p7UQHM2enTYEvUIl_hLmx9CXEb-a4IKK'
            },

            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,

            // payment() is called when the button is clicked
            payment: function(data, actions) {

                // Make a call to the REST api to create the payment
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: total, currency: 'MXN' }
                            }
                        ]
                    }
                });
            },

            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function(data, actions) {

                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function(data) {
                    // window.alert('Payment Complete!');
                    showConfirmation(data.cart);
                });
            }

        }, '#paypal-button-container');

