var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");

ancho = 200
alto = 200
celulasIniciales = 1000
tiempoRepeticion = 600	// El tiempo esta dado en milisegundos
tamanioCelula = 3

canvas.width = ancho * tamanioCelula;
canvas.height = alto * tamanioCelula;

//	Arreglo donde se guarda el estado del juego
arreglo = new Array(ancho)
for(i = 0; i < ancho; i++)
	arreglo[i] = new Array(alto);
for(i = 0; i < ancho; i++)
	for(j = 0; j < alto; j++)
		arreglo[i][j] = 0;

//	Arreglo donde temporalmente guardo las variables del juego
copia = new Array(ancho)
for(i = 0; i < ancho; i++)
	copia[i] = new Array(alto);
for(i = 0; i < ancho; i++)
	for(j = 0; j < alto; j++)
		copia[i][j] = 0;

llenarTableroAzar()

presentacion()

window.setInterval(juego, tiempoRepeticion)

function presentacion() {
	w = 20
	h = canvas.height / 2
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white"
	ctx.font = "bold 30px sans-serif"
	ctx.fillText("Bienvenido el juego de la vida esta a punto de comenzar", w, h)
}

function juego() {

	dibujar();

	for(x = 0; x < ancho; x++) {
		for(y = 0; y < alto; y++) {
			alrededor = 0;
			if(x - 1 > 0 && y - 1 > 0 && arreglo[x-1][y-1] == 1)
				alrededor++
			if(y - 1 > 0 && arreglo[x][y-1] == 1)
				alrededor++
			if(x + 1 < ancho && y - 1 > 0 && arreglo[x+1][y-1] == 1)
				alrededor++
			if(x - 1 > 0 && arreglo[x-1][y] == 1)
				alrededor++
			if(x + 1 < ancho && arreglo[x+1][y] == 1)
				alrededor++
			if(y + 1 < alto && x - 1 > 0 && arreglo[x-1][y+1] == 1)
				alrededor++
			if(y + 1 < alto && arreglo[x][y+1] == 1)
				alrededor++
			if(x + 1 < ancho && y + 1 < alto && arreglo[x+1][y+1] == 1)
				alrededor++

			if(arreglo[x][y] == 1) {
				if(alrededor == 2 || alrededor == 3) {
					copia[x][y] = 1;
				} else {
					copia[x][y] = 0;
				}
			} else if(arreglo[x][y] == 0) {
				if(alrededor == 3) {
					copia[x][y] = 1;
				} else {
					copia[x][y] = 0;
				}
			}
		}
	}
	for(i = 0; i < ancho; i++) {
		for(j = 0; j < alto; j++) {
			arreglo[i][j] = copia[i][j]
		}
	}
}

function dibujar() {
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "green"
	for(i = 0; i < ancho; i++) {
		for(j = 0; j < alto; j++) {
			if(arreglo[i][j] == 1) {
				ctx.fillRect(i * tamanioCelula, j * tamanioCelula, tamanioCelula, tamanioCelula);
			}
		}
	}
}

function llenarTableroAzar() {
	for(i = 0; i < celulasIniciales; i++) {
		x = Math.floor(Math.random() * ancho);
		y = Math.floor(Math.random() * alto);
		arreglo[x][y] = 1;
	}
}
