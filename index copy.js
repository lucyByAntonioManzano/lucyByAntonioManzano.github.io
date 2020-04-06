$(document).ready(function () {

    var pantallaAncho = window.innerWidth / 100;
    var pantallaAlto = window.innerHeight / 100;

    var EstablecerDiv = (function () {
        
        function CrearDiv(posAlto, posAncho, tamAlto, tamAncho, clase) {
        /*  posAlto     ->  punto inicial primer pixel Alto
            posAncho    ->  punto inicial primer pixel Ancho 
            tamAlto     ->  tamaño Alto     EN PORCENTAJE
            tamAncho    ->  tamaño Ancho    EN PORCENTAJE
            clase       ->  clase si la tuviera ---------------- (opcional)
        */
            if(clase == "no"){
                $(document.body).append('<div style="' + "position: fixed; background-color: green; top: "
                                        + pantallaAlto * posAlto + "px " + "; left: "+ pantallaAncho * posAncho + "px " +"; width: " 
                                        + tamAncho + "px; height: " + tamAlto + "px;" + '">');
            } else {
                $(document.body).append('<div class="' + clase + '" style="' + "position: fixed; background-color: green; top: " 
                                        + pantallaAlto * posAlto + "px " + "; left: "+ pantallaAncho * posAncho + "px " +"; width: "
                                        + tamAncho + "px; height: " + tamAlto + "px;" + '">');
            };
            // Funcionalidad al clickar el boton
            // $("." + clase).click(function () {
            //     alert("Hola desde " + posX);
            // })
        };
        return CrearDiv;
    }());


    var Botones = (function () {
        function Botones() {
            this.contador = 0;
        }
        Botones.prototype.add = function () {

            this.contador++;
            new EstablecerDiv(0,50,203,52,"hola");
        };
        Botones.prototype.rest = function () {
            if (this.contador > 0) {
                $("#" + this.contador).remove();
                this.contador--;
            }
        };
        return Botones;
    }());
    var boton = new Botones();


    $(document.body).append('<audio id="audio"><source type="audio/mpeg" src="./sonido/cadaGolpe.mp3"></audio>');
    var audio  = document.getElementById("audio");
    
    $(document.body).append('<div id="principal" style="' + "position: fixed; background-color: transparent; bottom: " + 0 + "px " + "; right: "+ 0 + "px " +"; width: "+ pantallaAncho * 100 +"px; height: "+pantallaAlto*100+"px;background-image: url('./imagenes/imagen1.jpg');" + '">');
    $("#add").click(function () { boton.add(); });
    $("#rest").click(function () { boton.rest(); });
    $(document.body).append('<div id="piter" style="' + "position: fixed; background-color: transparent; bottom: " + pantallaAlto * 50 + "px " + "; right: "+ pantallaAncho * 50 + "px " +"; width: 300px; height: 150px;" + '">');
    $("#piter").click(function () {
        $("#add").remove();
        $("#rest").remove();
        $(".hola").remove();
        $("#piter").remove();
        new EstablecerDiv(25,25,50,50, "nop");
        $(".nop").click(function () {
            audio.pause();
            $("#audio").remove();
        })
        audio.play();
        $("#principal").attr("style", "position: fixed; background-color: transparent; bottom: " + 0 + "px " + "; right: "+ 0 + "px " +"; width: "+ pantallaAncho*100 +"px; height: "+pantallaAlto*100+"px;background-image: url('./imagenes/imagen2.jpg');");
    });
});