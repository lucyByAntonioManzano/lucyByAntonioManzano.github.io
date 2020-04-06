$(document).ready(function () {

    resolucionAlto = 819;
    resolucionAncho = 1458;

    // Limitar pantalla para que la resolución no cambie independientemente de las dimensiones de la ventana
    if ((resolucionAlto/resolucionAncho) >= window.innerHeight/window.innerWidth) {
        var pantallaAncho = (resolucionAncho/ (resolucionAlto / window.innerHeight)) / 100;
        var pantallaAlto = window.innerHeight / 100;
    } else {
        var pantallaAlto = (resolucionAlto / (resolucionAncho / window.innerWidth)) / 100;
        var pantallaAncho = window.innerWidth / 100;
    }

    var pilaInstrucciones = [
        // casa de fondo + lucy -------------------------   Imagen    ---------- 0
        function () {
            $("#principal").attr("style", "position: fixed; background-color: transparent; top: " + 0 + "px " + "; left: "+ 0 + "px " +"; width: "+ pantallaAncho * 100 +
            "px; height: "+pantallaAlto*100+"px;background-repeat: no-repeat; background-size:"+pantallaAncho*100+"px "+pantallaAlto*100+
            "px;background-image: url('./imagenes/lucy1.png'), url('./imagenes/casa1.jpg') ;")
        },

        // casa de fondo --------------------------------   Imagen    ---------- 1
        function () {
            $("#principal").attr("style", "position: fixed; background-color: transparent; top: " + 0 + "px " + "; left: "+ 0 + "px " +"; width: "+ pantallaAncho * 100 +
            "px; height: "+pantallaAlto*100+"px;background-repeat: no-repeat; background-size:"+pantallaAncho*100+"px "+pantallaAlto*100+
            "px;background-image: url('./imagenes/casa1.jpg') ;")
        },

        // casa de fondo --------------------------------   Divs      ---------- 2
        function () {

            //Borra todos los divs que se creen en esta función para evitar que exista alguno al realizar una llamada
            function borradoLocal(){
                $(".charco").remove();
                $(".canalon").remove();
                $(".puerta").remove();
            }

            // El canalón se divide en dos secciones pero solo hace falta añadirle la funcionalidad a la clase para que ambos divs la tengan
            establecerDiv((221/resolucionAlto)*100,(259/resolucionAncho)*100,(214/resolucionAlto)*100,(42/resolucionAncho)*100,"canalon");
            establecerDiv((205/resolucionAlto)*100,(259/resolucionAncho)*100,(23/resolucionAlto)*100,(899/resolucionAncho)*100,"canalon");
            $(".canalon").click(function () {
                pilaInstrucciones[0]();
                borradoLocal();
                establecerComentario(4);
            });

            establecerDiv((417/resolucionAlto)*100,(209/resolucionAncho)*100,(21/resolucionAlto)*100,(86/resolucionAncho)*100,"charco");
            $(".charco").click(function () {
                pilaInstrucciones[0]();
                borradoLocal();
                establecerComentario(2);
            });

            establecerDiv((250/resolucionAlto)*100,(529/resolucionAncho)*100,(225/resolucionAlto)*100,(80/resolucionAncho)*100,"puerta");
            $(".puerta").click(function () {
                pilaInstrucciones[0]();
                borradoLocal();
                establecerComentario(6);
            });

            establecerDiv((410/resolucionAlto)*100,(414/resolucionAncho)*100,(33/resolucionAlto)*100,(18/resolucionAncho)*100,"rejilla");
            $(".rejilla").click(function () {
                pilaInstrucciones[0]();
                borradoLocal();
                establecerComentario(5);
            });

            establecerDiv((252/resolucionAlto)*100,(332/resolucionAncho)*100,(129/resolucionAlto)*100,(85/resolucionAncho)*100,"ventanaIzq");
            $(".ventanaIzq").click(function () {
                pilaInstrucciones[0]();
                borradoLocal();
                establecerComentario(9);
            });

            establecerDiv((472/resolucionAlto)*100,(485/resolucionAncho)*100,(35/resolucionAlto)*100,(88/resolucionAncho)*100,"felpudo");
            $(".felpudo").click(function () {
                pilaInstrucciones[0]();
                borradoLocal();
                establecerComentario(5);
            });
        },

    ]

    var establecerDiv = (function () {
        function CrearDiv(posAlto, posAncho, tamAlto, tamAncho, clase) {
            /*  posAlto     ->  punto inicial primer pixel Alto     EN PORCENTAJE 
                posAncho    ->  punto inicial primer pixel Ancho    EN PORCENTAJE 
                tamAlto     ->  tamaño Alto                         EN PORCENTAJE
                tamAncho    ->  tamaño Ancho                        EN PORCENTAJE
                clase       ->  clase si la tuviera ---------------- (opcional)
            */

            if(clase == "no"){
                $(document.body).append('<div style="' + "position: fixed; background-color: transparent; top: "+ pantallaAlto * posAlto + "px " + "; left: "+ pantallaAncho * posAncho + "px " +"; width: " + pantallaAncho * tamAncho + "px; height: " + pantallaAlto * tamAlto + "px;" + '">');
            } else {
                $(document.body).append('<div class="' + clase + '" style="' + "position: fixed; background-color: transparent; top: " + pantallaAlto * posAlto + "px " + "; left: "+ pantallaAncho * posAncho + "px " +"; width: " + pantallaAncho * tamAncho + "px; height: " + pantallaAlto * tamAlto + "px;" + '">');
            };
        };
        return CrearDiv;
    }());

    var establecerComentario = (function () {
        var pilaComentarios = [
            /* 
                nombre de la clase
                comentario, 
                posición siguiente llamada (siempre las hay, ya sea otro comentario o una llamada a "instr") LLAMAR TAMBIEN A CAMBIOS DE PERSONAJES DE DIALOGO DE DIVS
                en caso de ser ajena se inserta aqui el nombre

                ----------------CUANDO HAYA MÁS DE UN PERSONAJE ESPECIFICAR CUAL ES EN OTRO APARTADO DEL DIALOGO Y SOLO CARGARLO CUANDO NO ESTÉ YA EN PANTALLA-----------------
            */
            ["p0", "Donde tendré la cabeza... Ya he olvidado otra vez la llave dentro de casa.", 1],
            ["p1", "Papá siempre dejaba una escondida pero no recuerdo donde está, no debería andar lejos...", "instr", [1, 2]],
            ["p2", "Es un simple charco de agua y el desagüe, papá habrá estado regando.", 7],
            ["p3", "Debería decirle lo del charco cuando entre, quizá esté obstruido.", "instr", [1, 2]],
            ["p4", "El canalón, aunque la llave estuviese allí no podría alcanzarla...", "instr", [1, 2]],
            ["p5", "Una rejilla de ventilación, parece que la llave no está aquí.", "instr", [1, 2]], 
            ["p6", "Sin llave no sirve de nada intentar abrirla.", 8],
            ["p7", "De todas formas ahí no voy a encontrar la llave, a nadie se le ocurriría dejarla en el desagüe.", 3],
            ["p8", "Llamaría a la puerta pero papá estará ensimismado y no me escuchará, como siempre.", "instr", [1, 2]],
            ["p9", "La ventana está cerrada desde dentro. Desde aquí se ve el salón pero no se ve a nadie.", "instr", [1, 2]],
            ["p9", "La ventana está cerrada desde dentro. Desde aquí se ve el salón pero no hay nadie.", "instr", [1, 2]],

        ]
        var porcent = 26.3736 * pantallaAlto;

        function colorearDiv(comentario) {
            $(document.body).append('<div class="textos" style="' + "position: fixed; background-color: lightgrey; top: " + ((pantallaAlto * 100) - porcent) + "px ; left: 0px; width: " + pantallaAncho * 100 + "px; height: " + porcent + "px;" + '">' + comentario + "</div>");
        };

        function controlarDiv(clase) {
            $(document.body).append('<div class="' + clase + '" style="' + "position: fixed; background-color: transparent; top: 0px; left: 0px; width: " + pantallaAncho * 100 + "px; height: " + pantallaAlto * 100 + "px;" + '"></div>');
        };

        function crearDiv(posición) {
            colorearDiv(pilaComentarios[posición][1]);
            controlarDiv(pilaComentarios[posición][0]); 

            if (pilaComentarios[posición][2] != "instr") {
                $("."+pilaComentarios[posición][0]).click(function () {
                    // alert("clase "+pilaComentarios[pilaComentarios[posición][2]][0] + " removida");
                    $("." + pilaComentarios[posición][0]).remove();
                    $(".textos").remove();
                    establecerComentario(pilaComentarios[posición][2]);
                });
            } else {
                $("."+pilaComentarios[posición][0]).click(function () {
                    $("." + pilaComentarios[posición][0]).remove();
                    $(".textos").remove();
                    for(i=0;i<pilaComentarios[posición][3].length;i++){
                        pilaInstrucciones[pilaComentarios[posición][3][i]]();
                    };
                });
            };
        };

        return crearDiv;
    }());

    // $(document.body).append('<audio id="audio"><source type="audio/mpeg" src="./sonido/cadaGolpe.mp3"></audio>');                          background-repeat: no-repeat; background-size: 300px 100px;
    // var audio  = document.getElementById("audio");
    // audio.play();
    
    /*
        $("#piter").click(function () {
            $(".hola").remove();
            $("#piter").remove();
            new establecerDiv(25,5,70,90, "nop");
            $(".nop").click(function () {
                audio.pause();
                $("#audio").remove();
            })
            $("#principal").attr("style", "position: fixed; background-color: transparent; top: " + 0 + "px " + "; left: "+ 0 + "px " +"; width: "+ pantallaAncho*100 +"px; height: "+pantallaAlto*100+"px;background-image: url('./imagenes/imagen2.jpg');");
        });
    */

    // conversaciones : 216x1458

    // ESTABLECER UN TAMAÑO DELETRA FIJO CON PORCENTAJES RESPECTO AL TAMAÑO DE LA PANTALLA
    
    $(document.body).attr("style", "font-size: " + ((31.7 * pantallaAncho * 100) / resolucionAncho) + "px;color: black;")
    
    $(document.body).append('<div id="principal" style="' + "position: fixed; background-color: transparent; top: " + 0 + "px " + "; left: "+ 0 + "px " +"; width: "+ pantallaAncho * 100 +"px; height: "+pantallaAlto*100+"px;background-repeat: no-repeat; background-size:"+pantallaAncho*100+"px "+pantallaAlto*100+"px;" + '"></div>');
    pilaInstrucciones[0]();
    new establecerComentario(0);

});
