"use stric";

document.addEventListener("DOMContentLoaded", function () {

    let lugares = document.querySelector("#lugares").value;
    let elSelect = document.querySelector("#colision");
        
    let secuencia = 0;
    armarTabla(lugares);

    // funcion A estacionar n veces
    document.querySelector("#btnEstacionar").addEventListener("click", p=>{
        let intentos = document.querySelector("#intentos").value;
        elSelect.innerHTML = "";
        probarNintentos(intentos);
    });

    // funcion B probabilidad 
    document.querySelector("#btnProbabilidad").addEventListener("click", p=>{
        let cantProbabilidad = document.querySelector("#cantProbabilidad").value;
        let intentos = document.querySelector("#intentos").value;
        elSelect.innerHTML = "";
        let colision = 0;        
        for (let cantidad = 0; cantidad < cantProbabilidad; cantidad++) {
            probarNintentos(intentos);
        }
        let cantColisiones =elSelect.length;
        //console.log("Cant.col "+cantColisiones);
        let probabilidadLaplace = cantColisiones/cantProbabilidad;
        document.querySelector("#probabilidad").value = probabilidadLaplace;
    });

    // funcion C probar b con valores distintos 
    document.querySelector("#btnProbabilidad_c").addEventListener("click", p=>{
        
        let array_n = new Array(document.querySelector("#intentos_1").value,document.querySelector("#intentos_2").value,document.querySelector("#intentos_3").value);
        let array_m = new Array(10,100,1000);
        let n=0;
        let m=0;
        let o=0;
        let nn = 0;
        let mm = 0;
        let probabilidadLaplace = 0;
        for (n = 0; n < array_m.length; n++) {
            nn++;
            mm=0;
            for (o = 0; o < array_m.length; o++) {
                mm++;
                elSelect.innerHTML = "";
                let colision = 0;   
                //alert(array_n[n]);     
                for (m = 0; m < array_m[n]; m++) {
                    probarNintentos(array_n[n]);
                }
                let cantColisiones =elSelect.length;
                console.log("Cant.col "+cantColisiones);
                probabilidadLaplace = cantColisiones/array_m[n];
                document.querySelector("#probabilidad_"+nn+"_"+mm).value = probabilidadLaplace;
            }
        }

    });

    // funcion D probabilidad diferencia epsilon
    document.querySelector("#btnProbabilidad_d").addEventListener("click", p=>{
        
        document.querySelector("#cant_d").value = 0;
        let elSelect_d = document.querySelector("#prob_d");
        elSelect_d.innerHTML="";        
        let cantProbabilidad = document.querySelector("#cantProbabilidad_d").value;
        let epsilon = document.querySelector("#epsilon").value;
        let intentos = document.querySelector("#intentos").value;
        
        let anterior = 0;
        let diferencia = 10;
        while (diferencia>epsilon) {
            elSelect.innerHTML = "";
            let colision = 0;        
            for (let cantidad = 0; cantidad < cantProbabilidad; cantidad++) {
                probarNintentos(intentos);
            }
            let cantColisiones =elSelect.length;
            //console.log("Cant.col "+cantColisiones);
            let probabilidadLaplace = cantColisiones/cantProbabilidad;
            let opt_d = document.createElement('option');
            opt_d.text = probabilidadLaplace;            
            elSelect_d.append(opt_d);            
            diferencia = Math.abs(anterior - probabilidadLaplace);
            console.log("Dif "+diferencia+" - anterior "+anterior+" prob "+probabilidadLaplace);
            anterior = probabilidadLaplace;
            
        }
        document.querySelector("#cant_d").value = elSelect_d.length;
        
    });

    function probarNintentos(intentos){
        let colision = estacionar(intentos);
        if(colision!=-1){
            agregarColision(colision);        
        }
    }

    function estacionar(intentos) {

        armarTabla(lugares);
        let contador = 0;
        let patente = 0;
        let lugar = 0;
        while (contador<intentos) {
            patente = generarPatente();
            lugar = ubicarPatente(patente); 
            if(lugar>0){               
                document.querySelector("#td_" + lugar).innerHTML = patente;        
                contador++;
            }   
            else if (lugar==-2){
                colision = true;
                return contador;
            }
        }
        return -1;        
    }

    function agregarColision(colision){
        let opt = document.createElement('option');
        opt.text = colision;            
        elSelect.append(opt);
    }
        
    function generarPatente() {
        let patente = Math.floor(Math.random()*1000);
        return patente;
    }

    function ubicarPatente(patente) {

        let elLugar = 0;
        elLugar = (patente % 20)+1;
        
        let laPosicion = parseInt(document.querySelector("#td_" + elLugar).innerHTML);
        if (isNaN(laPosicion)) {
            return elLugar
        } else {
            if (laPosicion == patente) {                
                return -1;
            } else {
                //console.log("el lugar "+elLugar+" pat. "+patente);
                return -2;                
            }
        }
    }

    function armarTabla(lugares) {
        let losTR = "";
        for (let index = 1; index <= lugares; index++) {
            losTR += '<tr><th scope="row">' + index + '</th><td id="td_' + index + '"></td></tr>';
        }
        document.querySelector("tbody").innerHTML = losTR;
    }
});