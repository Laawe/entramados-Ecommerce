# ENTRAMADOS e-comerce #
### V1.0.0
<img src=assets/images/.png>

## Tabla de Contenido
1. [Descripción de producto](#descripcion)
2. [Descripción funcional](#descripcion-func)
    1. [Navegación](#navegacion)
3. [Fundamentos del producto](#fundamentos)
    1. [Usuario objetivo](#usuario)
    2. [Research](#research)
    3. [Problemas a resolver para el usuario](#problemas)
4. [Planeación](#planeacion)

## <a name="descripcion"></a> Descripción de producto:
- Actualmente entramados e-comerce es una app móvil dedicada a la difusión y venta de téxtiles artesanales de marca propia "Entramados", en un principio nos dedicamos a filtrar uno de los catálogos en línea, más grandes de latinoamerica para ofrecer únicamente productos artesanales al público interesado en esta gama específica. A la par, decidimos incursionar en este mercado con nuestra propia línea de productos con base en un amplio conocimiento en la ejecución de técnicas téxtiles artesanales.
- Con esta app, el usuario tendrá a su disposición lo siguiente:
    - Conocer la marca Entramados y sus productos y realizar la seleccion de uno o varios productos para colocarlos en el carrito de compras.
    - Consultar el catálogo de productos proveniente de mercado libre y realizar la seleccion de uno o varios productos para colocarlos en el carrito de compras.
    - Visualizar el carrito de compras con los productos secllecionados.
    - Poder pagar la orden mediante paypal, uno de los métodos de pago en línea, más seguros y accesibles vía web.
    - Para quienes no cuentan con una tarjeta bancaria vinculada a paypal, ofrecemos un método alternativo de pago      (mercado pago).
    - Confirmar compra y obtener un folio.

## <a name="descripcion-func"></a> Descripción funcional:

- Interfaz intuitiva y de flujo sencillo para el usuario por medio de diferentes secciones:
    - Home. Conoce Entramados y nuestra identidad.
    - Sección "Productos" con sus respectivas líneas ropa, ornamentacion y accesorios.
    - Sección Técnicas textiles (Telar conolial, telar de cintura, bordado y tintes naturales.)
    - Mis artículos seleccionados en el carrito de compras, con nombre del producto y total.
    - Botón de pago Paypal
    - En el footer encontramos formas de contactos y social media.
    - Uso de APIs.
    - Términos y condiciones.

- <a name="navegacion"></a> Acerca de la navegación:
    - **Navegación No Lineal**: Uso de tabs para facilitar la navegación del usuario para que sea consistente y fácilmente identificable y que pueda saltar de una sección a otra.
    - Arquitectura de la información con base en los conceptos SPA y el patrón de arquitectura de software MVC.

## <a name="fundamentos"></a> Fundamentos del producto:

- ## <a name="usuario"></a> Usuario Objetivo:
    - Mujeres y hombres mayores de edad que aprecian técnicas con amplia tradición para la elaboración de téxtiles.
    - Compradores de piezas artesanales y coleccionistas.

- ## <a name="research"></a> Research:
    - Herramienta utilizada: ¿Testing con posibles usuarios?
    - Resultados del research
        -¿?
        -¿?
        -¿?

- ### <a name="problemas"></a> Problemas a Resolver para el usuario:
    - Plataforma que ofrece productos para un nicho de mercado muy especializado, pues no es necesario que naveguen en un enorme sitio con miles de productos diversos para encontrar lo que buscan, a la par pone a la disposición del usuario, productos de varias regiones sin necesidad de viajar a todos estos sitios. Simplificar que los usuarios nos conozcan y puedan comprar de nuestros productos en el mismo sitio.
    - Proceso de pago amigable con integración a una plataforma ampliamente conocida como Paypal.
    -Alternativa para quienes no usan paypal.

## <a name="planeacion"></a> Planeación:

Utilizamos de Trello y github en modo colaborativo para la organización, asignación de tareas, deadlines, commmits, resolución de issues y merge en un solo repositiorio master.

Liga del tablero de Trello: [Aquí](https://trello.com/b/6c1LhyKL/e-comerce)

![TrelloView](/assets/images/IMAGEN TRELLO.png)

Se tiene una retrospectiva y feedback diarios para ver lista de actividades que ya se realizaron, tareas por hacer a la par de asignar responsables .

## <a name="sketching"></a> Sketching y Descripciones ##

- *Vistas del sitio*:

    1. Home
    	1.1. Productos
    	1.2. Técnicas textiles
			1.3. Contacto
    2. Carrito de compras
			2.1 Productos
			2.2 Mis artículos seleccionados
			2.3. Contacto


1.  <a name="sketch-login"></a>**HOME**
    - <img src=assets/images/Sketches/INDEX.HTML.png>
    - Sección principal con menú dropdown:
        - Nuevos Productos:
            1.1-Visualización de los productos con foto, descripción y precio.
	            - Botón de agregar al carrito.
						1.2- Técnicas textiles
							-Taller de tintes naturales.
			        -Taller de bordado.
							-Taller de telar de cintura.
							-Sobre el telar Coloniar.
        - :
            - Botón de conocer más para ampliar información.
    				1.3-Footer con formas de contacto y ligas a nuestras redes sociales.
						-Dirección
						-Teléfono
						-Correo
						-Instagram
						-Facebook
						-Twitter

					-Copyrigth
2.  <a name="sketch-login"></a>**HOME**
		- <img src=assets/images/Sketches/SCKETCH NO-SIDE BAR.png>
		- Sección principal con menú dropdown:
			2.1-Catálogo de productos:
					  -Visualización de los productos con foto, descripción y precio.
						- Botón de agregar al carrito.
			2.2- Mis artículos seleccionados
						-Tabla con nombre y precio del producto
						- Botón para pagar con Paypal.
					        - :

			1.3-Footer con formas de contacto y ligas a nuestras redes sociales.
			-Dirección
			-Teléfono
			-Correo
			-Instagram
			-Facebook
			-Twitter


Strongly Typed by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)


This is Strongly Typed, a new site template with a minimal, semi-retro
look (inspired by old instruction manuals) and, as you might guess from its
name, a strong emphasis on type. It's fully responsive, built on HTML5/CSS3,
and includes styling for all basic page elements. Demo images* are courtesy of
regularjane, an incredibly talented photographer friend of mine. Be sure to
check out more of her work over at deviantART:

http://regularjane.deviantart.com/

(* = Not included! Only meant for use with my own on-site demo, so please do NOT download
and/or use any of Jane's work without her explicit permission!)

As usual, feedback, bug reports, and comments are not only welcome, but strongly
encouraged :)

AJ
aj@lkn.io | @ajlkn

PS: Not sure how to get that contact form working? Give formspree.io a try (it's awesome).


Credits:

	Demo Images:
		regularjane (regularjane.deviantart.com)

	Icons:
		Font Awesome (fortawesome.github.com/Font-Awesome)

	Other:
		jQuery (jquery.com)
		html5shiv.js (@afarkas @jdalton @jon_neal @rem)
		CSS3 Pie (css3pie.com)
		background-size polyfill (github.com/louisremi)
		Respond.js (j.mp/respondjs)
		jquery.dropotron (@ajlkn)
		Skel (skel.io)
