function getDataML(){
    fetch('https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MLM/search?q=artesania+textiles', {
       credentials: "same-origin",
       headers: {
           'X-Requested-With': 'XMLHttpRequest',
       }

    }).then((response) => {
       response.json().then((data) => {
           paintData(data['results'])
       })


    })
    }

      let entramadosML = []
    function paintData(array) {

        let index = 15;
        array.forEach(element => {
            var photo = element.thumbnail.replace('I', 'O')
            var product = {}
            product['id'] = index
            product['title'] = element['title']
            product['price'] = element['price']
            product['photo'] = photo
            product['state'] = element['seller_address']['state']['name']
            entramadosML.push(product)
            index ++
        });
        drawProductsIndex(entramadosML)
    }


    getDataML()
