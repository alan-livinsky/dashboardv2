const styles = {
    color: {
        solids: ['rgba(57, 110, 176, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        alphas: ['rgba(57, 110, 176, .2))', 'rgba(33, 192, 215, .2)', 'rgba(217, 158, 43, .2)', 'rgba(205, 58, 129, .2)', 'rgba(156, 153, 204, .2)', 'rgba(225, 78, 202, .2)']
    }
}




//FUNCIONES PARA GRAFICAR

//mostrar total de atenciones por dia de la semana
function  AmbulatoryByDays(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    const total_appoints = [
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
              label: 'Cantidad de turnos', 
              data: total_appoints,
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
    
  }


//grafica de atenciones por sexo
function AmbulatoryBySex(data, id)//, title
  {
    
  const sex = ["F", "M"];

  const total_evals = [
    data.filter(total => total.patient_sex == "f").length,
    data.filter(total => total.patient_sex == "m").length,]
    

  let mycanvas = document.getElementById(id).getContext("2d");

  var myChart2 = new Chart(mycanvas, {
      type: 'doughnut',
      data: {
          labels: sex,
          datasets: [{
              label: 'Cantidad de turnos',
              data: total_evals,
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


//mostrar atenciones por grupos etarios
function AmbulatoryByAgeGroups(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const ages_group = ["90 y más","85-90","80-85","75-79","70-74","65-69","60-64","55-59","50-54","45-49","40-44","35-39","30-34","25-29","20-24","15-19","10-14","5-9","0-4"];
    
    const total_appoints = [
      data.filter(total => total.patient_age >=90).length,
      data.filter(total => total.patient_age >=85 && total.patient_age <90).length,
      data.filter(total => total.patient_age >=80 && total.patient_age <85).length,
      data.filter(total => total.patient_age >=75 && total.patient_age <80).length,
      data.filter(total => total.patient_age >=70 && total.patient_age <75).length,
      data.filter(total => total.patient_age >=65 && total.patient_age <70).length,
      data.filter(total => total.patient_age >=60 && total.patient_age <65).length,
      data.filter(total => total.patient_age >=55 && total.patient_age <60).length,
      data.filter(total => total.patient_age >=50 && total.patient_age <55).length,
      data.filter(total => total.patient_age >=45 && total.patient_age <50).length,
      data.filter(total => total.patient_age >=40 && total.patient_age <45).length,
      data.filter(total => total.patient_age >=35 && total.patient_age <40).length,
      data.filter(total => total.patient_age >=30 && total.patient_age <35).length,
      data.filter(total => total.patient_age >=25 && total.patient_age <30).length,
      data.filter(total => total.patient_age >=20 && total.patient_age <25).length,
      data.filter(total => total.patient_age >=15 && total.patient_age <20).length,
      data.filter(total => total.patient_age >=10 && total.patient_age <15).length,
      data.filter(total => total.patient_age >=5 && total.patient_age <10).length,
      data.filter(total => total.patient_age >=0 && total.patient_age <5).length,
    ]

    var myChart5 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: ages_group,
          datasets: [{
              label: 'Cantidad de turnos', 
              data: total_appoints,
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
          barThickness: 20,
          indexAxis: 'y',
      }
  });


  myChart5.update()
    
};

//atenciones por especialidad por sexo
function AmbulatoryBySpecialtyBySex(data, id)//, title
  {
    //guardo en un array todos los tipos de especialidades que existen
    data_specialty = data.map(total => total.speciality)
    //elimino los repetidos y los guardo en otro array
    const specialties = data_specialty.reduce((acc,item)=>{
    if(!acc.includes(item)){
      acc.push(item);
    }
    return acc;
  },[])
  
  let values_f = []
  let values_m = []

  //relleno el vector de cantidades filtrando por las especialidades del array anterior
  for(var i = 0; i < specialties.length; i++){
    values_f.push(data.filter(eachEval => eachEval.speciality == specialties[i] &&  eachEval.patient_sex == 'f').length)
    values_m.push(data.filter(eachEval => eachEval.speciality == specialties[i] &&  eachEval.patient_sex == 'm').length)
  }

  let mycanvas = document.getElementById(id).getContext("2d");
  mycanvas.width = 250;
  mycanvas.height = 250;
  var myChart6 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: specialties,
          datasets: [
            {
                label:"F",
                data: values_f,
                borderWidth: 1,
                borderColor: 'rgba(245,94,244,1)',
                backgroundColor: 'rgba(245,94,244,0.3)' 
            },
                        {
                label:"M",
                data: values_m,
                borderWidth: 1,
                borderColor: 'rgba(57, 110, 176, 1)',
                backgroundColor: 'rgba(57, 110, 176, 0.3)' 
            },

                  ]
      },
      options: {
        legend: {
          position: 'bottom'
        }
      }
  });
  myChart6.update();
 };

//atenciones por profesional por sexo
 function AmbulatoryByProfessionalBySex(data, id)//, title
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
 
 let values_f = []
 let values_m = []

 //relleno el vector de cantidades filtrando por los profesionales del array anterior
 for(var i = 0; i < health_profs.length; i++){
   values_f.push(data.filter(eachEval => eachEval.health_professional == health_profs[i] &&  eachEval.patient_sex == 'f').length)
   values_m.push(data.filter(eachEval => eachEval.health_professional == health_profs[i] &&  eachEval.patient_sex == 'm').length)
 }

 let mycanvas = document.getElementById(id).getContext("2d");

 var myChart7 = new Chart(mycanvas, {
     type: 'bar',
     data: {
         labels: health_profs,
         datasets: [
           {
               label:"F",
               data: values_f,
               borderWidth: 1,
               borderColor: 'rgba(245,94,244,1)',
               backgroundColor: 'rgba(245,94,244,0.3)' 
           },
                       {
               label:"M",
               data: values_m,
               borderWidth: 1,
               borderColor: 'rgba(57, 110, 176, 1)',
               backgroundColor: 'rgba(57, 110, 176, 0.3)' 
           },

                 ]
     },
     options: {
      indexAxis: 'y',
     }
 });
 myChart7.update();
};

//atenciones segun obra social
function AmbulatoryByInsurance(data, id)//, title
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
            label: 'Cantidad de turnos',
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

//atenciones y diagnósticos CIE-10
function AmbulatoryByICD10(data, id) {

  //guardo en un objeto todos los tipos de procedimientos que existen
  var data_icd10 = data.map(total => total.icd10_procedure)
  
  var icd10_codes_total = [];

  //al dato que me interesa lo tengo guardado en un objeto, que esta dentro
  //de un array, que esta dentro de otro otro obj, dentro de un array

  //tengo q hacer un for para recorrer esos dos arrays y guardar los datos en el array
  for (var i=0; i<data_icd10.length; i++) {
    if (data_icd10[i] != "None"){
      icd10_codes_total.push(data_icd10[i]);
      }
    }
      
  //un vector con todos los procedimientos repetidos
  //elimino los repetidos y los guardo en otro array
  //ARRAY SIN REPETIDOS
  const icd10_procedures = icd10_codes_total.reduce((acc,item)=>{
  if(!acc.includes(item)){
    acc.push(item);
  }
    return acc;
  },[])


  let values = []


  for(var i = 0; i < icd10_procedures.length; i++){
    values.push(data.filter(eachEval => eachEval.icd10_procedure == icd10_procedures[i]).length)
    }

  let mycanvas = document.getElementById(id).getContext("2d");
  mycanvas.width = 250;
  mycanvas.height = 250;
  var myChart6 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: icd10_procedures,
          datasets: [
            {
                label:"ICD-10 codes",
                data: values,
                borderWidth: 1,
                borderColor: 'rgba(94,211,100,1)',
                backgroundColor: 'rgba(94,211,100,0.5)' 
            },

                  ]
      },
      options: {
        legend: {
          position: 'bottom'
        }
      }
  });
  myChart6.update();
}


//atenciones y diagnósticos SNOMED-CT
function AmbulatoryBySnomedCT(data, id) {

  //guardo en un objeto todos los tipos de diagnósticos que existen
  var data_snomed = data.map(total => total.snomed_diagnosis)
  
  var snomed_codes_total = [];

  //al dato que me interesa lo tengo guardado en un objeto, que esta dentro
  //de un array, que esta dentro de otro otro obj, dentro de un array

  //tengo q hacer un for para recorrer esos dos arrays y guardar los datos en el array
    for (var i=0; i<data_snomed.length; i++) {
    for (var j=0; j<data_snomed[i].length; j++) {
      snomed_codes_total.push(data_snomed[i][j].snomed_diagnostic);
            }
        }
    
    
  //un vector con todos los procedimientos repetidos
  //elimino los repetidos y los guardo en otro array
  //ARRAY SIN REPETIDOS
  const snomed_diagnostics = snomed_codes_total.reduce((acc,item)=>{
  if(!acc.includes(item)){
    acc.push(item);
  }
    return acc;
  },[])


  let values = []


  for(var i = 0; i < snomed_diagnostics.length; i++){
    values.push(data.filter(eachEval => (eachEval.snomed_diagnosis.some (proc => proc.snomed_diagnostic.includes(snomed_diagnostics[i])))).length)
  }


  let mycanvas = document.getElementById(id).getContext("2d");
  mycanvas.width = 250;
  mycanvas.height = 250;
  var myChart6 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: snomed_diagnostics,
          datasets: [
            {
                label:"Snomed-CT codes",
                data: values,
                borderWidth: 1,
                borderColor: 'rgba(228,245,22,1)',
                backgroundColor: 'rgba(228,245,22,0.5)' 
            },

                  ]
      },
      options: {
        legend: {
          position: 'bottom'
        }
      }
  });
  myChart6.update();
}


//Generar el selection de Especialidades
 function SpecialtySelect(data)//, title
 {
   //guardo en un array todos los tipos de especialidades que existen
   data_specialty = data.map(total => total.speciality)
   //elimino los repetidos y los guardo en otro array
   const specialties = data_specialty.reduce((acc,item)=>{
   if(!acc.includes(item)){
     acc.push(item);
   }
   return acc;
 },[])
   
   specialties.sort()
   
   let selectBox = document.getElementById('SpecialtySelect');

  for(let i = 0; i < specialties.length; i++){
    var opt = specialties[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectBox.appendChild(el);
    }

 }


//Actualizar graficas

function updateGraph1(newdata_1){
  document.getElementById("AmbulatoryBySpecialtyBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AmbulatoryBySpecialtyBySex";
  document.getElementById("canva1").appendChild(canvas);
  AmbulatoryBySpecialtyBySex(newdata_1, "AmbulatoryBySpecialtyBySex");
};

function updateGraph2(newdata_2) {
  document.getElementById("AmbulatoryByDays").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AmbulatoryByDays"; 
  document.getElementById("canva2").appendChild(canvas);
  AmbulatoryByDays(newdata_2, "AmbulatoryByDays");//, 'Grafico 1 nuevo'
};
  
function updateGraph3(newdata_3){
  document.getElementById("AmbulatoryBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AmbulatoryBySex";
  document.getElementById("canva3").appendChild(canvas);
  AmbulatoryBySex(newdata_3, "AmbulatoryBySex"); //, 'Grafico 2 nuevo'
};

function updateGraph4(newdata_4){
  document.getElementById("AmbulatoryByInsurance").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AmbulatoryByInsurance";
  document.getElementById("canva4").appendChild(canvas);
  AmbulatoryByInsurance(newdata_4, "AmbulatoryByInsurance");
};

function updateGraph5(newdata_5){
  document.getElementById("AmbulatoryByProfessionalBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AmbulatoryByProfessionalBySex";
  document.getElementById("canva5").appendChild(canvas);
  AmbulatoryByProfessionalBySex(newdata_5, "AmbulatoryByProfessionalBySex");
};

function updateGraph6(newdata_6){
  document.getElementById("AmbulatoryByAgeGroups").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AmbulatoryByAgeGroups";
  document.getElementById("canva6").appendChild(canvas);
  AmbulatoryByAgeGroups(newdata_6, "AmbulatoryByAgeGroups");
};

function updateGraph7(newdata_7){
  document.getElementById("AmbulatoryByICD10").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AmbulatoryByICD10";
  document.getElementById("canva7").appendChild(canvas);
  AmbulatoryByICD10(newdata_7, "AmbulatoryByICD10");
};

function updateGraph8(newdata_8){
  document.getElementById("AmbulatoryBySnomedCT").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AmbulatoryBySnomedCT";
  document.getElementById("canva8").appendChild(canvas);
  AmbulatoryBySnomedCT(newdata_8, "AmbulatoryBySnomedCT");
};



//FUNCIONES PARA MOSTRAR DATOS

//mostrar el total de atenciones en el periodo ingresado
function TotalAmbulatory(data) {
  const element = document.getElementById('amb_total');
  element.innerHTML = data.length;
}

function AmbulatoryECNT(data) {
  const element = document.getElementById('amb_ecnt');
  element.innerHTML = data.filter(total => total.patient_chronic == "Si").length; 
}

function PercentAmbulatoryECNT(data) {
  const element = document.getElementById('amb_ecnt_%');
  
  const ecnt = data.filter(every => every.patient_chronic == "Si").length;
  const total = data.length;
  
  
  percent_ecnt_ambulatory = (ecnt / total)*100;
  
  element.innerHTML = Math.round(percent_ecnt_ambulatory)+" %" ; 
}

function DurationAverage(data) {
  const element = document.getElementById('amb_average');
  const total_eval_with_duration = data.filter(total => total.eval_duration > 0).length;
  
  
  var duration = 0;
  
  
  for (var x=0;x<data.length;x++){
      duration += data[x].eval_duration
      }
  
  const average = (duration / total_eval_with_duration)/60;  
  
  element.innerHTML = Math.round(average)+" minutos" ;
  
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
  var Specialty = document.getElementById("SpecialtySelect").value;
  
  if (fechaInicio == ""   || fechaFin == ""){
      alert('Los campos de fecha deben tener un valor')
    }
  
  else {
  
    let data = {
        'start_date': fechaInicio,
        'end_date': fechaFin,
        'specialty': Specialty
    };
    
    const loadingMessage = document.querySelector('.loading-message');

    loadingMessage.classList.add('active');
    
    fetch('/dashboard_ambulatory', {
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
        updateGraph6(datos1);
        updateGraph7(datos1);
        updateGraph8(datos1);
        TotalAmbulatory(datos1);
        AmbulatoryECNT(datos1);
        PercentAmbulatoryECNT(datos1);
        DurationAverage(datos1);
        RewritePeriodBySelection();
        loadingMessage.classList.remove('active');
        })
   }

}

