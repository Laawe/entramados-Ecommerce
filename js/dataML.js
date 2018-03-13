function getDataML(){
    fetch('https://api.mercadolibre.com/sites/MLM/search?q=artesania+textiles', {
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
    
    
    function paintData(array) {
        let entramados = []
        array.forEach(element => {
            var photo = element.thumbnail.replace('I', 'O')
            var product = {}
            product['id'] = element['id']
            product['title'] = element['title'] 
            product['price'] = element['price']
            product['photo'] = photo
            product['state'] = element['seller_address']['state']['name']
            entramados.push(product)
            
        });
        drawProductsIndex(entramados)
    }
    
    
    getDataML()