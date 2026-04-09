const styles = {
    color: {
        solids: ['rgba(57, 110, 176, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        alphas: ['rgba(57, 110, 176, .2))', 'rgba(33, 192, 215, .2)', 'rgba(217, 158, 43, .2)', 'rgba(205, 58, 129, .2)', 'rgba(156, 153, 204, .2)', 'rgba(225, 78, 202, .2)']
    }
}




//FUNCIONES PARA GRAFICAR

//mostrar total de turnos por dia de la semana
function  AppointmentsByDays(data, id) //, title
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


//grafica de turnos por sexo
function AppointmentsBySex(data, id)//, title
  {
    
  const sex = ["F", "M"];

  const total_appoints = [
    data.filter(total => total.gender == "f").length,
    data.filter(total => total.gender == "m").length,]
    

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


//turnos por tipos de visita
function AppointmentsByVisitType(data, id)//, title
  {
    const visit_type = ["Nueva Condición", "Seguimiento", "Control de Menor", "Control Mujer", "Control Hombre"];
    const total_appoints = [
      data.filter(total => total.visit == "new").length,
      data.filter(total => total.visit == "followup").length,
      data.filter(total => total.visit == "well_child").length,
      data.filter(total => total.visit == "well_woman").length,
      data.filter(total => total.visit == "well_man").length];
  
  let mycanvas = document.getElementById(id).getContext("2d");
  mycanvas.width = 250;
  mycanvas.height = 250;
  var myChart3 = new Chart(mycanvas, {
      type: 'pie',
      data: {
          labels: visit_type,
          datasets: [{
              label: 'Cantidad de turnos',
              data: total_appoints,
              backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'
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
  myChart3.update();

}

//turnos por categoría
function AppointmentsByCategory(data, id)//, title
  {

  const categories = ["Demanda Espontánea", "Turno Programado", "Turno Protegido", "Captación Activa"];
    const total_appoints = [
      data.filter(total => total.category == "DE").length,
      data.filter(total => total.category == "TPg").length,
      data.filter(total => total.category == "TPt").length,
      data.filter(total => total.category == "CA").length,
    ]
  
  let mycanvas = document.getElementById(id).getContext("2d");
  mycanvas.width = 250;
  mycanvas.height = 250;
  var myChart4 = new Chart(mycanvas, {
      type: 'pie',
      data: {
          labels: categories,
          datasets: [{
              label: 'Turnos por Categorias',
              data: total_appoints,
              backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(180, 48, 48, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 255, 207, 0.5)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(180, 48, 48, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 255, 207, 0.5)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          position: 'right'
        }
      }
  });
  myChart4.update();

}


//turnos por grupos etarios
function AppointmentsByAgeGroups(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const ages_group = ["90 y más","85-90","80-85","75-79","70-74","65-69","60-64","55-59","50-54","45-49","40-44","35-39","30-34","25-29","20-24","15-19","10-14","5-9","0-4"];
    
    const total_appoints = [
      data.filter(total => total.age >=90).length,
      data.filter(total => total.age >=85 && total.age <90).length,
      data.filter(total => total.age >=80 && total.age <85).length,
      data.filter(total => total.age >=75 && total.age <80).length,
      data.filter(total => total.age >=70 && total.age <75).length,
      data.filter(total => total.age >=65 && total.age <70).length,
      data.filter(total => total.age >=60 && total.age <65).length,
      data.filter(total => total.age >=55 && total.age <60).length,
      data.filter(total => total.age >=50 && total.age <55).length,
      data.filter(total => total.age >=45 && total.age <50).length,
      data.filter(total => total.age >=40 && total.age <45).length,
      data.filter(total => total.age >=35 && total.age <40).length,
      data.filter(total => total.age >=30 && total.age <35).length,
      data.filter(total => total.age >=25 && total.age <30).length,
      data.filter(total => total.age >=20 && total.age <25).length,
      data.filter(total => total.age >=15 && total.age <20).length,
      data.filter(total => total.age >=10 && total.age <15).length,
      data.filter(total => total.age >=5 && total.age <10).length,
      data.filter(total => total.age >=0 && total.age <5).length,
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

//turnos por especialidad por sexo
function AppointmentsBySpecialtyBySex(data, id)//, title
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
    values_f.push(data.filter(eachAppointment => eachAppointment.speciality == specialties[i] &&  eachAppointment.gender == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.speciality == specialties[i] &&  eachAppointment.gender == 'm').length)
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

//turnos por profesional por sexo
 function AppointmentsByProfessionalBySex(data, id)//, title
 {
   //guardo en un array todos los profesionales que existen
   data_profesional = data.map(total => total.professional)
   //elimino los repetidos y los guardo en otro array
   const health_profs = data_profesional.reduce((acc,item)=>{
   if(!acc.includes(item)){
     acc.push(item);
   }
   return acc;
 },[])
 
 let values_f = []
 let values_m = []

 //relleno el vector de cantidades filtrando por los profesioanles del array anterior
 for(var i = 0; i < health_profs.length; i++){
   values_f.push(data.filter(eachAppointment => eachAppointment.professional == health_profs[i] &&  eachAppointment.gender == 'f').length)
   values_m.push(data.filter(eachAppointment => eachAppointment.professional == health_profs[i] &&  eachAppointment.gender == 'm').length)
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

//turnos segun obra social
function AppointmentsByInsurance(data, id)//, title
{
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


//turnos segun las obras sociales de pacientes
function AppointmentsByInsurancesQuantity(data, id)//, title
 {
   //guardo en un array todos los tipos de especialidades que existen
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

 //relleno el vector de cantidades filtrando por las especialidades del array anterior
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


//ACTUALIZAR GRAFICAS

function updateGraph1(newdata_1) {
  document.getElementById("AppointmentsByDays").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AppointmentsByDays"; 
  document.getElementById("canva2").appendChild(canvas);
  AppointmentsByDays(newdata_1, "AppointmentsByDays");//, 'Grafico 1 nuevo'
};
  
function updateGraph2(newdata_2){
  document.getElementById("AppointmentsBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AppointmentsBySex";
  document.getElementById("canva3").appendChild(canvas);
  AppointmentsBySex(newdata_2, "AppointmentsBySex"); //, 'Grafico 2 nuevo'
};

function updateGraph3(newdata_3){
  document.getElementById("AppointmentsByVisitType").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AppointmentsByVisitType";
  document.getElementById("canva7").appendChild(canvas);
  AppointmentsByVisitType(newdata_3, "AppointmentsByVisitType");
};

function updateGraph4(newdata_4){
  document.getElementById("AppointmentsByCategory").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AppointmentsByCategory";
  document.getElementById("canva6").appendChild(canvas);
  AppointmentsByCategory(newdata_4, "AppointmentsByCategory");
};

function updateGraph5(newdata_5){
  document.getElementById("AppointmentsByAgeGroups").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AppointmentsByAgeGroups";
  document.getElementById("canva5").appendChild(canvas);
  AppointmentsByAgeGroups(newdata_5, "AppointmentsByAgeGroups");
};

function updateGraph6(newdata_6){
  document.getElementById("AppointmentsBySpecialtyBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AppointmentsBySpecialtyBySex";
  document.getElementById("canva1").appendChild(canvas);
  AppointmentsBySpecialtyBySex(newdata_6, "AppointmentsBySpecialtyBySex");
};

function updateGraph7(newdata_7){
  document.getElementById("AppointmentsByProfessionalBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AppointmentsByProfessionalBySex";
  document.getElementById("canva4").appendChild(canvas);
  AppointmentsByProfessionalBySex(newdata_7, "AppointmentsByProfessionalBySex");
};

function updateGraph8(newdata_8){
  document.getElementById("AppointmentsByInsurance").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AppointmentsByInsurance";
  document.getElementById("canva8").appendChild(canvas);
  AppointmentsByInsurance(newdata_8, "AppointmentsByInsurance");
};

function updateGraph9(newdata_9){
  document.getElementById("AppointmentsByInsurancesQuantity").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "AppointmentsByInsurancesQuantity";
  document.getElementById("canva9").appendChild(canvas);
  AppointmentsByInsurancesQuantity(newdata_9, "AppointmentsByInsurancesQuantity");
};


//FUNCIONES PARA MOSTRAR DATOS

//mostrar el total de turnos en el periodo ingresado
function TotalAppointments(data) {
  const element = document.getElementById('app_total');
  element.innerHTML = data.length;

}

//total de controles de menor sano
function WellChild(data) {
  const element = document.getElementById('well_child');
  element.innerHTML = data.filter(total => total.visit == "well_child").length;
}

//% controles menores sanos / total turnos
function PercentWellChildRespectTotal(data) {
  const element = document.getElementById('%_well_child_respect_total');
  element.innerHTML = Math.round((data.filter(total => total.visit == "well_child").length)*100/data.length)+" %";
}

//% control menores sanos / turnos pediatria totales
function PercentWellChildRespectPed(data) {
  const element = document.getElementById('%_well_child_respect_ped');
  turnos_pediatria = data.filter(total => total.speciality == "Pediatría").length;
  element.innerHTML = Math.round((data.filter(total => total.visit == "well_child").length)*100/turnos_pediatria)+" %";
}

//total de turnos ausentes
function AbsentAppointments(data) { 
  const element = document.getElementById('app_absent');
  const appointment_absent = data.filter(total => total.state == "no_show").length;
  element.innerHTML = appointment_absent;
}

//%ausentismo
function AppointmentsAbsenteeism(data) {
  const element = document.getElementById('app_absenteeism');
  element.innerHTML = Math.round((data.filter(total => total.state == "no_show").length)*100/data.length)+" %"; //no se si es este
} 

//total turnos otorgados a pacientes con enfermedades cronicas no transmisibles
function AppointmentsECNT(data) {
  const element = document.getElementById('app_ecnt');
  element.innerHTML = data.filter(total => total.cronico == "Si").length; 
}

//turnos registrados como captaciones activas
function ActiveUptake(data) {
  const element = document.getElementById('active_uptake');
  element.innerHTML = data.filter(total => total.category == "CA").length;
}

//total de turnos programados
function ProgramedAppointments(data) {
  const element = document.getElementById('app_programmed');
  element.innerHTML = data.filter(total => total.category == "TPg").length;
}

//porcentaje de turnos programados (programados/total)
function PercentProgrammedAppointments(data) {
  const element = document.getElementById('%_app_programmed');
  const total_appointments = data.length;
  const programmed_appointments = data.filter(total => total.category == "TPg").length
  element.innerHTML = Math.round(programmed_appointments*100/total_appointments)+" %" ;
}


//total de turnos pediatricos (< 15 años)
function PediatricsAppointments(data) {
  const element = document.getElementById('app_pediatrics');
  
  const total_ped = data.filter(total => total.age < 15).length;
  const total_ped_done = data.filter(total => total.age < 15 && total.state == "done").length;
  const total_ped_check = data.filter(total => total.age < 15 && total.state == "checked_in").length;
  const total_present = total_ped_done + total_ped_check;
  const print = total_present + " asistidos de " + total_ped;
  element.innerHTML = print;
  
  
}

//total de turnos adultos (>=15 años)
function AdultsAppointments(data) {
  const element = document.getElementById('app_adults');
  const total_adult = data.filter(total => total.age >= 15).length;
  const total_adult_done = data.filter(total => total.age >= 15 && total.state == "done").length;
  const total_adult_check = data.filter(total => total.age >= 15 && total.state == "checked_in").length;
  const total_present = total_adult_done + total_adult_check;
  const print = total_present + " asistidos de " + total_adult;
  element.innerHTML = print;
}


//Genero el selection de Especialidades
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
 
 
//Función para reescribir el período de datos que toman las gráficas e indicadores
function RewritePeriodBySelection() {
  const element = document.getElementsByClassName('selected_period'); //son muchos elementos
  const Start = document.getElementById("fecha1").value;
  const End = document.getElementById("fecha2").value;
  const parts_start = Start.split('-');
  const StartDate = parts_start[2] + '-' + parts_start[1] + '-' + parts_start[0];
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
    
    fetch('/dashboard_appointments', {
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
        updateGraph9(datos1);
        TotalAppointments(datos1);
        AbsentAppointments(datos1);
        AppointmentsAbsenteeism(datos1);
        AppointmentsECNT(datos1);
        WellChild(datos1);
        PercentWellChildRespectTotal(datos1);
        PercentWellChildRespectPed(datos1);
        ActiveUptake(datos1);
        ProgramedAppointments(datos1);
        PediatricsAppointments(datos1);
        AdultsAppointments(datos1);
        PercentProgrammedAppointments(datos1);
        RewritePeriodBySelection();
        loadingMessage.classList.remove('active');
        })
  }

}

