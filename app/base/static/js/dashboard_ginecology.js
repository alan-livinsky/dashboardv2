
const styles = {
    color: {
        solids: ['rgba(57, 110, 176, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        alphas: ['rgba(57, 110, 176, .2))', 'rgba(33, 192, 215, .2)', 'rgba(217, 158, 43, .2)', 'rgba(205, 58, 129, .2)', 'rgba(156, 153, 204, .2)', 'rgba(225, 78, 202, .2)']
    }
}

//FUNCIONES PARA GRAFICAR

//mostrar total de controles prenatales por dia de la semana
function PrenatalByDays(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    const total_evals = [
      data.filter(total => total.day == "lunes").length,
      data.filter(total => total.day == "martes").length,
      data.filter(total => total.day == "miércoles").length,
      data.filter(total => total.day == "jueves").length,
      data.filter(total => total.day == "viernes").length];

    var myChart1 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: days,
          datasets: [{
              label: 'Cantidad de Controles', 
              data: total_evals,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          barThickness: 20,
      }
  });


  myChart1.update()
    
};

//mostrar controles prenatales por grupos etarios
function PrenatalByAgeGroups(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const ages_group = ["0-14","15-19", "20-24","25-29","30-34","35-39","40 y +"];
    const total_evals = [
      data.filter(total => total.age_at_evaluation >=0 && total.age_at_evaluation <15).length,
      data.filter(total => total.age_at_evaluation >=15 && total.age_at_evaluation <20).length,
      data.filter(total => total.age_at_evaluation >=20 && total.age_at_evaluation <25).length,
      data.filter(total => total.age_at_evaluation >=25 && total.age_at_evaluation <30).length,
      data.filter(total => total.age_at_evaluation >=30 && total.age_at_evaluation <35).length,
      data.filter(total => total.age_at_evaluation >=35 && total.age_at_evaluation <40).length,
      data.filter(total => total.age_at_evaluation >=40).length,

    ]

    var myChart5 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: ages_group,
          datasets: [{
              label: 'Cantidad Controles', 
              data: total_evals,
              backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          indexAxis: 'y',
      }
  });


  myChart5.update()
    
};


//controles prenatales por profesional
function PrenatalByProfessional(data, id)//, title
 {
   //guardo en un array todos los profesionales que existen
   data_profesional = data.map(total => total.health_professional)
   //elimino los repetidos y los guardo en otro array
   const health_profs = data_profesional.reduce((acc,item)=>{
   if(!acc.includes(item)){
     acc.push(item);
   }
   return acc;
 },[])
 
 let values = []

 //relleno el vector de cantidades filtrando por los profesionales del array anterior
 for(var i = 0; i < health_profs.length; i++){
   values.push(data.filter(eachEval => eachEval.health_professional == health_profs[i]).length)
 }

 let mycanvas = document.getElementById(id).getContext("2d");

 var myChart7 = new Chart(mycanvas, {
     type: 'bar',
     data: {
         labels: health_profs,
         datasets: [
           {
               label:"Controles Prenatales",
               data: values,
               borderWidth: 1,
               borderColor: 'rgba(245,94,244,1)',
               backgroundColor: 'rgba(245,94,244,0.3)' 
           },


                 ]
     },
     options: {
      indexAxis: 'y',
     }
 });
 myChart7.update();
};


//controles prenatales segun obra social
function PrenatalByInsurance(data, id)//, title
{
const insurance = ["NO", "SI"];
const without_insurance = data.filter(total => total.patient_insurance == "False").length; //cant sin obra social
const with_insurance = data.length - without_insurance //cantidad con obra social

const total_evals = [ without_insurance, with_insurance]

let mycanvas = document.getElementById(id).getContext("2d");

var myChart2 = new Chart(mycanvas, {
    type: 'doughnut',
    data: {
        labels: insurance,
        datasets: [{
            label: 'Controles según OS',
            data: total_evals,
            borderColor:[
                'rgba(153, 102, 255, 1)',
                'rgba(201, 203, 207, 1)'] ,
            backgroundColor: [
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        position: 'bottom'
      }
    }
});
myChart2.update();

}


//Actualizar graficas

function updateGraph1(newdata_1){
  document.getElementById("PrenatalByProfessional").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PrenatalByProfessional";
  document.getElementById("canva1").appendChild(canvas);
  PrenatalByProfessional(newdata_1, "PrenatalByProfessional");
};

function updateGraph2(newdata_2) {
  document.getElementById("PrenatalByDays").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PrenatalByDays"; 
  document.getElementById("canva2").appendChild(canvas);
  PrenatalByDays(newdata_2, "PrenatalByDays");//, 'Grafico 1 nuevo'
};

function updateGraph4(newdata_4){
  document.getElementById("PrenatalByAgeGroups").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PrenatalByAgeGroups";
  document.getElementById("canva4").appendChild(canvas);
  PrenatalByAgeGroups(newdata_4, "PrenatalByAgeGroups");
};

function updateGraph5(newdata_5){
  document.getElementById("PrenatalByInsurance").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PrenatalByInsurance";
  document.getElementById("canva5").appendChild(canvas);
  PrenatalByInsurance(newdata_5, "PrenatalByInsurance");
};



//FUNCIONES PARA MOSTRAR DATOS

//mostrar el total de controles prenatales con HTA
function PrenatalHTA(data){
  const element = document.getElementById('prenatal_hta');
  element.innerHTML = data.filter(every => every.hta == "True").length;
}

//mostrar el total de controles prenatales con preeclampsia
function PrenatalPREE(data) {
  const element = document.getElementById('prenatal_pree');
  element.innerHTML = data.filter(every => every.preeclampsia == "True").length; 
}

//mostrar el total de controles prenatales con Diabetes
function PrenatalDBT(data) {
  const element = document.getElementById('prenatal_dbt');
  element.innerHTML = data.filter(every => every.diabetes == "True").length; 
}

//mostrar el total de controles prenatales con sobrepeso
function PrenatalOW(data) {
  const element = document.getElementById('prenatal_ow');
  element.innerHTML = data.filter(every => every.sobrepeso == "True").length;
}


//Función para reescribir el período de datos que toman las gráficas e indicadores

function RewritePeriodBySelection() {
  const element = document.getElementsByClassName('selected_period'); //son muchos elementos
  const Start = document.getElementById("fecha1").value;
  const parts_start = Start.split('-');
  const StartDate = parts_start[2] + '-' + parts_start[1] + '-' + parts_start[0];
  const End = document.getElementById("fecha2").value;
  const parts_end = End.split('-');
  const EndDate = parts_end[2] + '-' + parts_end[1] + '-' + parts_end[0];
  const print = "Desde " + StartDate + " hasta " + EndDate;
  //como tengo muchos elementos, tengo q recorrer el array para pasar los datos al html
  for(var i=0; i<element.length; i++) {
    element[i].innerHTML = print;
  }
  
}

//función que actualiza el panel con los datos ingresados por el ususario al hacel click en el botón "Aplicar filtro"

function Update(){
  // Remove loading message, show chart panels 
  var fechaInicio = document.getElementById("fecha1").value;
  var fechaFin = document.getElementById("fecha2").value;  
  
  if (fechaInicio == ""   || fechaFin == ""){
      alert('Los campos de fecha deben tener un valor')
    }
  
  else {
  
    let data = {
        'start_date': fechaInicio,
        'end_date': fechaFin
    };
    
    const loadingMessage = document.querySelector('.loading-message');

    loadingMessage.classList.add('active');
    
    fetch('/dashboard_ginecology', {
        method: "POST",
        body: JSON.stringify(data),//convierte el objeto en string
        headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then(response => response.text())
        .then(filtered_data => {
        var datos1 = JSON.parse(filtered_data); //convierte el string a objeto
        updateGraph1(datos1);
        updateGraph2(datos1);
        updateGraph4(datos1);
        updateGraph5(datos1);
        PrenatalHTA(datos1);
        PrenatalPREE(datos1);
        PrenatalDBT(datos1);
        PrenatalOW(datos1);
        RewritePeriodBySelection();
        loadingMessage.classList.remove('active');
        })
  }

}

