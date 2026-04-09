const styles = {
    color: {
        solids: ['rgba(57, 110, 176, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        alphas: ['rgba(57, 110, 176, .2))', 'rgba(33, 192, 215, .2)', 'rgba(217, 158, 43, .2)', 'rgba(205, 58, 129, .2)', 'rgba(156, 153, 204, .2)', 'rgba(225, 78, 202, .2)']
    }
}


//GRAFICAS

//Atenciones de enfermería segun sexo del paciente
function NursingAmbulatoryBySex(data, id) {
  const sex = ["F", "M"];

  const total_attentions = [
    data.filter(total => total.gender == "f").length,
    data.filter(total => total.gender == "m").length,]

  let mycanvas = document.getElementById(id).getContext("2d");

  var myChart1 = new Chart(mycanvas, {
      type: 'doughnut',
      data: {
          labels: sex,
          datasets: [{
              label: 'Cantidad de atenciones',
              data: total_attentions,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(10, 10, 255, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(10, 10, 255, 1)'
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
  myChart1.update();
}

//Atenciones de enfermería segun obra social
function NursingAmbulatoryByInsurance(data, id) {

const insurance = ["NO", "SI"];
const without_insurance = data.filter(total => total.insurance == "False").length; //cant sin obra social
const with_insurance = data.length - without_insurance //cantidad con obra social

const total_appoints = [ without_insurance, with_insurance]

let mycanvas = document.getElementById(id).getContext("2d");

var myChart2 = new Chart(mycanvas, {
    type: 'doughnut',
    data: {
        labels: insurance,
        datasets: [{
            label: 'Cantidad de turnos',
            data: total_appoints,
            backgroundColor: [
                'rgba(255, 50, 50, 0.5)',
                'rgba(50, 255, 50, 0.5)'
              ],
              borderColor: [
                'rgba(255, 50, 50, 1)',
                'rgba(50, 255, 50, 1)'
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

//Atenciones de enfermería segun profesional y sexo
function NursingAmbulatoryByProfessionalBySex(data, id) {

//guardo en un array todos los profesionales que existen
data_profesional = data.map(total => total.health_prof)
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
   values_f.push(data.filter(eachAppointment => eachAppointment.health_prof == health_profs[i] &&  eachAppointment.gender == 'f').length)
   values_m.push(data.filter(eachAppointment => eachAppointment.health_prof == health_profs[i] &&  eachAppointment.gender == 'm').length)
 }

 let mycanvas = document.getElementById(id).getContext("2d");

 var myChart3 = new Chart(mycanvas, {
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
 myChart3.update();

}

//Atenciones de enfermería segun grupos etarios
function NursingAmbulatoryByAgeGroups(data, id) {

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

    var myChart4 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: ages_group,
          datasets: [{
              label: 'Cantidad de atenciones', 
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
          barThickness: 15,
          indexAxis: 'y',
      }
  });


  myChart4.update()


}

//Atenciones de enfermería segun dias de la semana
function NursingAmbulatoryByDays(data, id) {

    let mycanvas = document.getElementById(id).getContext("2d");
    const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    const total_attentions = [
      data.filter(total => total.day == "lunes").length,
      data.filter(total => total.day == "martes").length,
      data.filter(total => total.day == "miércoles").length,
      data.filter(total => total.day == "jueves").length,
      data.filter(total => total.day == "viernes").length];

    var myChart5 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: days,
          datasets: [{
              label: 'Cantidad de Atenciones', 
              data: total_attentions,
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


  myChart5.update()
}


//Atenciones de enfermería segun procedimientos y sexo
function NursingAmbulatoryByProceduresBySex(data, id) {

  //guardo en un objeto todos los tipos de procedimientos que existen
  var data_procedures = data.map(total => total.procedures)


  
  var procedimientos_totales = [];

  //al dato que me interesa lo tengo guardado en un objeto, que esta dentro
  //de un array, que esta dentro de otro otro obj, dentro de un array

  //tengo q hacer un for para recorrer esos dos arrays y guardar los datos en el array
  for (var i=0; i<data_procedures.length; i++) {
    for (var j=0; j<data_procedures[i].length; j++) {
      procedimientos_totales.push(data_procedures[i][j].procedure);
    }
  }

  //un vector con todos los procedimientos repetidos
  //elimino los repetidos y los guardo en otro array
  const procedures = procedimientos_totales.reduce((acc,item)=>{
  if(!acc.includes(item)){
    acc.push(item);
  }
    return acc;
  },[])


  let values_f = []
  let values_m = []


  for(var i = 0; i < procedures.length; i++){
    values_f.push(data.filter(eachAppointment => (eachAppointment.procedures.some (proc => proc.procedure.includes(procedures[i]))) &&  eachAppointment.gender == 'f').length)
    values_m.push(data.filter(eachAppointment => (eachAppointment.procedures.some (proc => proc.procedure.includes(procedures[i]))) &&  eachAppointment.gender == 'm').length)
  }
  
  let mycanvas = document.getElementById(id).getContext("2d");
  mycanvas.width = 250;
  mycanvas.height = 250;
  var myChart6 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: procedures,
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
}


//------------------------
//ACTUALIZAR GRAFICAS

//atenciones segun sexo del paciente
function updateGraph1(newdata) {
    document.getElementById("NursingAmbulatoryBySex").remove();
    var canvas = document.createElement("canvas");
    canvas.id = "NursingAmbulatoryBySex"; 
    document.getElementById("canva2").appendChild(canvas);
    NursingAmbulatoryBySex(newdata, "NursingAmbulatoryBySex");//, 'Grafico 2 nuevo'
};

//Atenciones segun obra social
function updateGraph2(newdata) {
    document.getElementById("NursingAmbulatoryByInsurance").remove();
    var canvas = document.createElement("canvas");
    canvas.id = "NursingAmbulatoryByInsurance"; 
    document.getElementById("canva3").appendChild(canvas);
    NursingAmbulatoryByInsurance(newdata, "NursingAmbulatoryByInsurance");//, 'Grafico 3 nuevo'
};

//Atenciones segun profesional y sexo
function updateGraph3(newdata) {
    document.getElementById("NursingAmbulatoryByProfessionalBySex").remove();
    var canvas = document.createElement("canvas");
    canvas.id = "NursingAmbulatoryByProfessionalBySex"; 
    document.getElementById("canva5").appendChild(canvas);
    NursingAmbulatoryByProfessionalBySex(newdata, "NursingAmbulatoryByProfessionalBySex");//, 'Grafico 5 nuevo'
};

//Atenciones segun grupos etarios
function updateGraph4(newdata) {
    document.getElementById("NursingAmbulatoryByAgeGroups").remove();
    var canvas = document.createElement("canvas");
    canvas.id = "NursingAmbulatoryByAgeGroups"; 
    document.getElementById("canva1").appendChild(canvas);
    NursingAmbulatoryByAgeGroups(newdata, "NursingAmbulatoryByAgeGroups");//, 'Grafico 1 nuevo'
};

//Atenciones segun dias
function updateGraph5(newdata) {
    document.getElementById("NursingAmbulatoryByDays").remove();
    var canvas = document.createElement("canvas");
    canvas.id = "NursingAmbulatoryByDays"; 
    document.getElementById("canva4").appendChild(canvas);
    NursingAmbulatoryByDays(newdata, "NursingAmbulatoryByDays");//, 'Grafico 4 nuevo'
};

//Atenciones segun procedimientos segun sexo
function updateGraph6(newdata) {
  document.getElementById("NursingAmbulatoryByProceduresBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "NursingAmbulatoryByProceduresBySex"; 
  document.getElementById("canva6").appendChild(canvas);
  NursingAmbulatoryByProceduresBySex(newdata, "NursingAmbulatoryByProceduresBySex");//, 'Grafico 6 nuevo'

};


//-----------------------
//DATOS
//Atenciones de enfermería totales
function NursingTotal(data) {
  const element = document.getElementById('nursing_total');
  element.innerHTML = data.length;
}

//Atenciones de enfermería segun ECNT
function NursingECNT(data) {
  const element = document.getElementById('nursing_ecnt');
  element.innerHTML = data.filter(total => total.cronico == "Si").length; 
}

//Vacunas realizadas por el servicio
function NursingVaccines(data) {
  const element = document.getElementById('nursing_vaccine');
  
  var data_procedures = data.map(total => total.procedures)
  
  var procedimientos_totales = [];
  
  for (var i=0; i<data_procedures.length; i++) {
    for (var j=0; j<data_procedures[i].length; j++) {
      procedimientos_totales.push(data_procedures[i][j].procedure);
    }
  }
  
  element.innerHTML = procedimientos_totales.filter(total => total == "Vacuna").length; 
}

//-------------------------------
//OTRAS FUNCIONES

//Genero el selection de Profesionales
 function ProfessionalSelect(data)//, title
 {
   //guardo en un array todos los profesionales que existen
   data_professional = data.map(total => total.health_prof)
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
  document.body.classList.add('running')
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
    
    fetch('dashboard_nursing', {
        method: "POST",
        body: JSON.stringify(data), //convierte el objeto en string
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
        NursingTotal(datos1);
        NursingECNT(datos1);
        NursingVaccines(datos1);
        RewritePeriodBySelection();
        loadingMessage.classList.remove('active');

        })
  }
}
