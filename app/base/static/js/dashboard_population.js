const styles = {
    color: {
        solids: ['rgba(57, 110, 176, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        alphas: ['rgba(57, 110, 176, .2))', 'rgba(33, 192, 215, .2)', 'rgba(217, 158, 43, .2)', 'rgba(205, 58, 129, .2)', 'rgba(156, 153, 204, .2)', 'rgba(225, 78, 202, .2)']
    }
}

//FUNCIONES PARA GRAFICAR

//Población que asistió a la institución según sexo
function PopulationBySex(data, id)//, title
  {
    
  const sex = ["F", "M"];

  const total_appoints = [
    data.filter(total => total.patient_sex == "f").length,
    data.filter(total => total.patient_sex == "m").length,]
    

  let mycanvas = document.getElementById(id).getContext("2d");

  var myChart2 = new Chart(mycanvas, {
      type: 'doughnut',
      data: {
          labels: sex,
          datasets: [{
              label: 'Cantidad de turnos',
              data: total_appoints,
              backgroundColor: [
                'rgba(245,94,244,0.5',
                'rgba(57, 110, 176, 0.5)'
              ],
              borderColor: [
                'rgba(245,94,244,1)',
                'rgba(57, 110, 176, 1)'
              ],
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


//Población que asistió a la institución según grupos etarios y sexo
function PopulationWithAttentionsByAgeGroupsBySex(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const ages_group = ["80 y más","75-79","70-74","65-69","60-64","55-59","50-54","45-49","40-44","35-39","30-34","25-29","20-24","15-19","10-14","5-9","0-4"];
    
    const population_f = [
      data.filter(total => total.patient_age >=80 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=75 && total.patient_age <80 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=70 && total.patient_age <75 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=65 && total.patient_age <70 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=60 && total.patient_age <65 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=55 && total.patient_age <60 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=50 && total.patient_age <55 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=45 && total.patient_age <50 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=40 && total.patient_age <45 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=35 && total.patient_age <40 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=30 && total.patient_age <35 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=25 && total.patient_age <30 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=20 && total.patient_age <25 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=15 && total.patient_age <20 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=10 && total.patient_age <15 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=5 && total.patient_age <10 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=0 && total.patient_age <5 && total.patient_sex == "f").length,
    ]
    
    const population_m = [
      data.filter(total => total.patient_age >=80 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=75 && total.patient_age <80 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=70 && total.patient_age <75 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=65 && total.patient_age <70 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=60 && total.patient_age <65 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=55 && total.patient_age <60 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=50 && total.patient_age <55 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=45 && total.patient_age <50 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=40 && total.patient_age <45 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=35 && total.patient_age <40 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=30 && total.patient_age <35 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=25 && total.patient_age <30 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=20 && total.patient_age <25 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=15 && total.patient_age <20 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=10 && total.patient_age <15 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=5 && total.patient_age <10 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=0 && total.patient_age <5 && total.patient_sex == "m").length,
    ]

    
    var myChart5 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: ages_group,
          datasets: [
              {
               label:"F",
               data: population_f,
               borderWidth: 1,
               borderColor: 'rgba(245,94,244,1)',
               backgroundColor: 'rgba(245,94,244,0.3)' 
           },
                       {
               label:"M",
               data: population_m,
               borderWidth: 1,
               borderColor: 'rgba(57, 110, 176, 1)',
               backgroundColor: 'rgba(57, 110, 176, 0.3)' 
           },
        ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }],
              xAxes: [{
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


//Población que asistió a la institución según cantidad de turnos entregados
function PopulationByQuantityAppointmentsBySex(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const appointments_quantity = ["1","2","3","4","5","6 o más"];
    
    const app_f = [
      data.filter(total => total.total_appointments ==1 && total.patient_sex == "f").length,
      data.filter(total => total.total_appointments ==2 && total.patient_sex == "f").length,
      data.filter(total => total.total_appointments ==3 && total.patient_sex == "f").length,
      data.filter(total => total.total_appointments ==4 && total.patient_sex == "f").length,
      data.filter(total => total.total_appointments ==5 && total.patient_sex == "f").length,
      data.filter(total => total.total_appointments >=6 && total.patient_sex == "f").length,
    ]
    
    const app_m = [
      data.filter(total => total.total_appointments ==1 && total.patient_sex == "m").length,
      data.filter(total => total.total_appointments ==2 && total.patient_sex == "m").length,
      data.filter(total => total.total_appointments ==3 && total.patient_sex == "m").length,
      data.filter(total => total.total_appointments ==4 && total.patient_sex == "m").length,
      data.filter(total => total.total_appointments ==5 && total.patient_sex == "m").length,
      data.filter(total => total.total_appointments >=6 && total.patient_sex == "m").length,
    ]
    

    var myChart4 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: appointments_quantity,
          datasets: [
              {
               label:"F",
               data: app_f,
               borderWidth: 1,
               borderColor: 'rgba(245,94,244,1)',
               backgroundColor: 'rgba(245,94,244,0.3)' 
           },
                       {
               label:"M",
               data: app_m,
               borderWidth: 1,
               borderColor: 'rgba(57, 110, 176, 1)',
               backgroundColor: 'rgba(57, 110, 176, 0.3)' 
           },
        ]
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
          indexAxis: 'x',
      }
  });


  myChart4.update()
    
};


//Población que asistió a la institución según tenga obra social
function PopulationByInsurance(data, id)//, title
{
const insurance = ["NO", "SI"];
const without_insurance = data.filter(total => total.insurance == "False").length; //cant sin obra social
const with_insurance = data.length - without_insurance //cantidad con obra social

const total_appoints = [ without_insurance, with_insurance]

let mycanvas = document.getElementById(id).getContext("2d");

var myChart1 = new Chart(mycanvas, {
    type: 'doughnut',
    data: {
        labels: insurance,
        datasets: [{
            label: 'Cantidad de turnos',
            data: total_appoints,
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
myChart1.update();

}

//Población que asistió a la institución según las obras sociales
function PopulationByInsurancesQuantity(data, id)//, title
 {
   //guardo en un array todos los tipos de obras sociales
   data_insurance = data.map(total => total.insurance)
   //elimino los repetidos y los guardo en otro array
   const insurances = data_insurance.reduce((acc,item)=>{
   if(!acc.includes(item)){
     acc.push(item);
   }
   return acc;
 },[])
 
 let values = []
 
 let elementToRemove = "False";
 
 let new_insurances = insurances.filter(item => item !== elementToRemove);

 //relleno el vector de cantidades filtrando por las obras sociales del array anterior
 for(var i = 0; i < new_insurances.length; i++){
   values.push(data.filter(eachEval => eachEval.insurance == new_insurances[i]).length)
 }

 let mycanvas = document.getElementById(id).getContext("2d");

 var myChart9 = new Chart(mycanvas, {
     type: 'bar',
     data: {
         labels: new_insurances,
         datasets: [
           {
               label:"Obra Social",
               data: values,
               borderWidth: 1,
               borderColor: 'rgba(75, 192, 192, 1)',
               backgroundColor: 'rgba(75, 192, 192, 0.5)' 
           },

                 ]
     },
     options: {
      indexAxis: 'y',
     }
 });
 myChart9.update();
};


//Actualizar graficas

function updateGraph1(newdata_1) {
  document.getElementById("PopulationWithAttentionsByAgeGroupsBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PopulationWithAttentionsByAgeGroupsBySex"; 
  document.getElementById("canva1").appendChild(canvas);
  PopulationWithAttentionsByAgeGroupsBySex(newdata_1, "PopulationWithAttentionsByAgeGroupsBySex");//, 'Grafico 1 nuevo'
};
  
function updateGraph2(newdata_2){
  document.getElementById("PopulationByInsurance").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PopulationByInsurance";
  document.getElementById("canva2").appendChild(canvas);
  PopulationByInsurance(newdata_2, "PopulationByInsurance"); //, 'Grafico 2 nuevo'
};

function updateGraph3(newdata_3){
  document.getElementById("PopulationBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PopulationBySex";
  document.getElementById("canva3").appendChild(canvas);
  PopulationBySex(newdata_3, "PopulationBySex");
};

function updateGraph4(newdata_4){
  document.getElementById("PopulationByQuantityAppointmentsBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PopulationByQuantityAppointmentsBySex";
  document.getElementById("canva4").appendChild(canvas);
  PopulationByQuantityAppointmentsBySex(newdata_4, "PopulationByQuantityAppointmentsBySex");
};

function updateGraph5(newdata_5){
  document.getElementById("PopulationByInsurancesQuantity").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PopulationByInsurancesQuantity";
  document.getElementById("canva5").appendChild(canvas);
  PopulationByInsurancesQuantity(newdata_5, "PopulationByInsurancesQuantity");
};



//FUNCIONES PARA MOSTRAR DATOS

//población total que asitió a la institución
function TotalPopulation(data){
  const element = document.getElementById('pop_total');
  element.innerHTML = data.length;
};

//población con ECNT total que asitió a la institución 
function PopulationECNT(data){
  const element = document.getElementById('pop_ecnt');
  element.innerHTML = data.filter(every => every.chronic == "Si").length; 
};

//Promedio de turnos solicitados
function Average(data){
  const element = document.getElementById('average');
  const total_pat = data.length;
  
  var app = 0;
  
  
  for (var x=0;x<data.length;x++){
    app += data[x].total_appointments
      }
  
  const average = (app / total_pat);  
  
  element.innerHTML = Math.round(average * 100) / 100;  
};

//Promedio de turnos solicitados para pacientes entre 0 y 5 años
function Average0to4(data){
  const element = document.getElementById('average_0_4');
  const total_pat_0_4 = data.filter(total => total.patient_age >= 0 && total.patient_age < 5).length;
  
  var app_0_4 = 0;
  
  for (var x=0;x<data.length;x++){
      if (data[x].patient_age<5){
        app_0_4 += data[x].total_appointments
        }
      }
  
  const average_0_4 = (app_0_4 / total_pat_0_4);  
  
  element.innerHTML = Math.round(average_0_4 * 100) / 100; 
};


//Promedio de turnos solicitados para pacientes entre 5 y 15 años
function Average5to14(data){
  const element = document.getElementById('average_5_14');
  const total_pat_5_14 = data.filter(total => total.patient_age >= 5 && total.patient_age < 15).length;
  
  var app_5_14 = 0;
  
  for (var x=0;x<data.length;x++){
      if (data[x].patient_age>=5 && data[x].patient_age<15){
        app_5_14 += data[x].total_appointments
        }
      }
  
  const average_5_14 = (app_5_14 / total_pat_5_14);  
  
  element.innerHTML = Math.round(average_5_14 * 100) / 100; 

};

//Promedio de turnos solicitados para pacientes entre 15 y 65 años
function Average15to64(data){
  const element = document.getElementById('average_15_64');
  const total_pat_15_64 = data.filter(total => total.patient_age >= 15 && total.patient_age < 65).length;
  
  var app_15_64 = 0;
  
  for (var x=0;x<data.length;x++){
      if (data[x].patient_age>=15 && data[x].patient_age<65){
        app_15_64 += data[x].total_appointments
        }
      }
  
  const average_15_64 = (app_15_64 / total_pat_15_64);  
  
  element.innerHTML = Math.round(average_15_64 * 100) / 100  
};

//Promedio de turnos solicitados para pacientes mayores de 65 años
function Average65AndMore(data){
  const element = document.getElementById('average_65_and_more');
  const total_pat_more_64 = data.filter(total => total.patient_age >= 65).length;
  
  var app_more_64 = 0;
  
  for (var x=0;x<data.length;x++){
      if (data[x].patient_age>=65){
        app_more_64 += data[x].total_appointments
        }
      }
  
  const average_65_and_more = (app_more_64 / total_pat_more_64);  
  
  element.innerHTML = Math.round(average_65_and_more * 100) / 100  
};


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
    
    fetch('/dashboard_population', {
        method: "POST",
        body: JSON.stringify(data),//convierte el objeto en string
        headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then(response => response.text())
        .then(filtered_data => {
        var datos1 = JSON.parse(filtered_data); //convierte el string a objeto
        updateGraph1(datos1);
        updateGraph2(datos1);
        updateGraph3(datos1);
        updateGraph4(datos1);
        updateGraph5(datos1);
        PopulationECNT(datos1);
        TotalPopulation(datos1)
        Average(datos1);
        Average0to4(datos1);
        Average5to14(datos1);
        Average15to64(datos1);
        Average65AndMore(datos1);
        RewritePeriodBySelection();
        loadingMessage.classList.remove('active');
        })
  }

}

