const styles = {
    color: {
        solids: ['rgba(57, 110, 176, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        alphas: ['rgba(57, 110, 176, .2))', 'rgba(33, 192, 215, .2)', 'rgba(217, 158, 43, .2)', 'rgba(205, 58, 129, .2)', 'rgba(156, 153, 204, .2)', 'rgba(225, 78, 202, .2)']
    }
}


//FUNCIONES PARA GRAFICAR

//mostrar total de atenciones por dia de la semana
function OdontoByDays(data, id) //, title
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


//atenciones odontológicas por sexo del paciente
function OdontoBySex(data, id)//, title
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
              label: 'Cantidad de Atenciones',
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


//atenciones odontológicas por grupos etarios
function OdontoByAgeGroups(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const ages_group = ["90 y más","85-90","80-85","75-79","70-74","65-69","60-64","55-59","50-54","45-49","40-44","35-39","30-34","25-29","20-24","15-19","10-14","5-9","0-4"];
    const total_attentions = [
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
              label: 'Cantidad de Atenciones', 
              data: total_attentions,
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


//Atenciones odontológicas por profesional y sexo del paciente
 function OdontoByProfessionalBySex(data, id)//, title
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

//Atenciones odontológicas segun obra social
function OdontoByInsurance(data, id)//, title
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
            label: 'Cantidad de Atenciones',
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

};


//Atenciones odontológicas segun tipo de tratamiento realizado
function OdontoByTreatment(data, id) {

  //guardo en un objeto todos los tipos de procedimientos que existen
  var data_treatment = data.map(total => total.procedures)
  
  var treatments_total = [];

  //al dato que me interesa lo tengo guardado en un objeto, que esta dentro
  //de un array, que esta dentro de otro otro obj, dentro de un array

  //tengo q hacer un for para recorrer esos dos arrays y guardar los datos en el array
    for (var i=0; i<data_treatment.length; i++) {
    for (var j=0; j<data_treatment[i].length; j++) {
      treatments_total.push(data_treatment[i][j].procedure);
            }
        }
        
    
    
  //un vector con todos los procedimientos repetidos
  //elimino los repetidos y los guardo en otro array
  //ARRAY SIN REPETIDOS
  const odonto_treatments = treatments_total.reduce((acc,item)=>{
  if(!acc.includes(item)){
    acc.push(item);
  }
    return acc;
  },[])


  let values = []


  for(var i = 0; i < odonto_treatments.length; i++){
    values.push(data.filter(eachEval => (eachEval.procedures.some (proc => proc.procedure.includes(odonto_treatments[i])))).length)
  }


  let mycanvas = document.getElementById(id).getContext("2d");
  mycanvas.width = 250;
  mycanvas.height = 250;
  var myChart6 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: odonto_treatments,
          datasets: [
            {
                label:"Procedimientos Odontología",
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
};


//Atenciones odontológicas segun tipo de Alta
function OdontoByDischarge(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const discharge = ["Básica", "Intermedia", "Integral"];
    const total_atentions = [
      data.filter(total => total.discharge == "basic").length,
      data.filter(total => total.discharge == "middle").length,
      data.filter(total => total.discharge == "integral").length,
      ]


    var myChart8 = new Chart(mycanvas, {
      type: 'pie',
      data: {
          labels: discharge,
          datasets: [{
              label: 'Tipo de Alta', 
              data: total_atentions,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
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


  myChart8.update();
    
  };

  
//Actualizar graficas
function updateGraph2(newdata_2) {
  document.getElementById("OdontoByDays").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "OdontoByDays"; 
  document.getElementById("canva2").appendChild(canvas);
  OdontoByDays(newdata_2, "OdontoByDays");//, 'Grafico 1 nuevo'
};
  
function updateGraph3(newdata_3){
  document.getElementById("OdontoBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "OdontoBySex";
  document.getElementById("canva3").appendChild(canvas);
  OdontoBySex(newdata_3, "OdontoBySex"); //, 'Grafico 2 nuevo'
};

function updateGraph4(newdata_4){
  document.getElementById("OdontoByInsurance").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "OdontoByInsurance";
  document.getElementById("canva4").appendChild(canvas);
  OdontoByInsurance(newdata_4, "OdontoByInsurance");
};

function updateGraph5(newdata_5){
  document.getElementById("OdontoByProfessionalBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "OdontoByProfessionalBySex";
  document.getElementById("canva5").appendChild(canvas);
  OdontoByProfessionalBySex(newdata_5, "OdontoByProfessionalBySex");
};

function updateGraph6(newdata_6){
  document.getElementById("OdontoByAgeGroups").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "OdontoByAgeGroups";
  document.getElementById("canva6").appendChild(canvas);
  OdontoByAgeGroups(newdata_6, "OdontoByAgeGroups");
};

function updateGraph7(newdata_7){
  document.getElementById("OdontoByTreatment").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "OdontoByTreatment";
  document.getElementById("canva7").appendChild(canvas);
  OdontoByTreatment(newdata_7, "OdontoByTreatment");
};


function updateGraph8(newdata_8){
  document.getElementById("OdontoByDischarge").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "OdontoByDischarge";
  document.getElementById("canva8").appendChild(canvas);
  OdontoByDischarge(newdata_8, "OdontoByDischarge");
};



//FUNCIONES PARA MOSTRAR DATOS

//mostrar el total de atenciones odontológicas
function OdontoTotal(data) {
  const element = document.getElementById('odonto_total');
  element.innerHTML = data.length;
}

//atenciones odontolgicas de pacientes con ECNT
function OdontoECNT(data) {
  const element = document.getElementById('odonto_ecnt');
  element.innerHTML = data.filter(total => total.patient_chronic == "Si").length; 
}

//porcentaje de atenciones odontolgicas de pacientes con ECNT
function PercentOdontoECNT(data) {
  const element = document.getElementById('odonto_ecnt_%');
  
  const ecnt = data.filter(every => every.patient_chronic == "Si").length;
  const total = data.length;
  
  
  percent_ecnt_ambulatory = (ecnt / total)*100;
  
  element.innerHTML = Math.round(percent_ecnt_ambulatory)+" %" ; 
}

//atenciones odontolgicas de primera vez
function OdontoFirstTime(data){
  const element = document.getElementById('odonto_first_time');
  element.innerHTML = data.filter(total => total.first_time == true).length; 
}

//atenciones odontolgicas de urgencia
function OdontoUrgency(data){
  const element = document.getElementById('odonto_urgency');
  element.innerHTML = data.filter(total => total.urgency == true).length;   
}

//atenciones odontolgicas para certificados
function OdontoAttendance(data){
  const element = document.getElementById('odonto_attendance');
  element.innerHTML = data.filter(total => total.attendance == true).length;   
}

//OTRAS FUNCIONES

//Genero el selection de Profesionales
 function ProfessionalSelect(data)//, title
 {
   //guardo en un array todos los tipos de profesionales que existen
   data_professional = data.map(total => total.health_professional)
   //elimino los repetidos y los guardo en otro array
   const professionals = data_professional.reduce((acc,item)=>{
   if(!acc.includes(item)){
     acc.push(item);
   }
   return acc;
 },[])
   
   professionals.sort()
   
   let selectBox = document.getElementById('ProfessionalSelect');

  for(let i = 0; i < professionals.length; i++){
    var opt = professionals[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectBox.appendChild(el);
    }
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
  var Professional = document.getElementById("ProfessionalSelect").value; 
  
  if (fechaInicio == ""   || fechaFin == ""){
      alert('Los campos de fecha deben tener un valor')
    }
  
  else {
    let data = {
        'start_date': fechaInicio,
        'end_date': fechaFin,
        'professional': Professional
    };
    
    const loadingMessage = document.querySelector('.loading-message');

    loadingMessage.classList.add('active');
    
    fetch('/dashboard_odontology', {
        method: "POST",
        body: JSON.stringify(data),//convierte el objeto en string
        headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then(response => response.text())
        .then(filtered_data => {
        var datos1 = JSON.parse(filtered_data); //convierte el string a objeto
        updateGraph2(datos1);
        updateGraph3(datos1);
        updateGraph4(datos1);
        updateGraph5(datos1);
        updateGraph6(datos1);
        updateGraph7(datos1);
        updateGraph8(datos1);
        OdontoTotal(datos1);
        OdontoECNT(datos1);
        PercentOdontoECNT(datos1);
        OdontoFirstTime(datos1);
        OdontoUrgency(datos1);
        OdontoAttendance(datos1);
        RewritePeriodBySelection();
        loadingMessage.classList.remove('active');
        })
  }

}

