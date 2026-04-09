const styles = {
    color: {
        solids: ['rgba(57, 110, 176, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        alphas: ['rgba(57, 110, 176, .2))', 'rgba(33, 192, 215, .2)', 'rgba(217, 158, 43, .2)', 'rgba(205, 58, 129, .2)', 'rgba(156, 153, 204, .2)', 'rgba(225, 78, 202, .2)']
    }
}




//FUNCIONES PARA GRAFICAR

//mostrar pacientes con ECNT por grupos etarios y sexo
function PatientECNTByAgeGroupsBySex(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const ages_group = ["+ de 65","45-64", "30-44", "15-29", "0-14" ];
    
    const chronic_f = [
      data.filter(total => total.patient_age >=65 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=45 && total.patient_age <65 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=30 && total.patient_age <45 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=15 && total.patient_age <30 && total.patient_sex == "f").length,
      data.filter(total => total.patient_age >=0 && total.patient_age <15 && total.patient_sex == "f").length,
    ]
    
    const chronic_m = [
      data.filter(total => total.patient_age >=65 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=45 && total.patient_age <65 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=30 && total.patient_age <45 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=15 && total.patient_age <30 && total.patient_sex == "m").length,
      data.filter(total => total.patient_age >=0 && total.patient_age <15 && total.patient_sex == "m").length,
    ]

    var myChart5 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: ages_group,
          datasets: [
              {
               label:"F",
               data: chronic_f,
               borderWidth: 1,
               borderColor: 'rgba(245,94,244,1)',
               backgroundColor: 'rgba(245,94,244,0.3)' 
           },
                       {
               label:"M",
               data: chronic_m,
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
          indexAxis: 'y',
      }
  });


  myChart5.update()
    
};


//Pacientes con ECNT segun obra social
function PatientECNTByInsurance(data, id)//, title
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


//Patologías de los pacientes con ECNT
function PatientECNTPathologies(data, id) {

  //guardo en un objeto todos los tipos de patologías que existen
  var data_conditions = data.map(total => total.conditions)


  
  var condiciones_totales = [];

  //al dato que me interesa lo tengo guardado en un objeto, que esta dentro
  //de un array, que esta dentro de otro otro obj, dentro de un array

  //tengo q hacer un for para recorrer esos dos arrays y guardar los datos en el array
  for (var i=0; i<data_conditions.length; i++) {
    for (var j=0; j<data_conditions[i].length; j++) {
      condiciones_totales.push(data_conditions[i][j].condition);
    }
  }

  console.log(condiciones_totales)
  //un vector con todos las patologías repetidas

 
  //elimino lss repetidss y los guardo en otro array
  const conditions = condiciones_totales.reduce((acc,item)=>{
  if(!acc.includes(item)){
    acc.push(item);
  }
    return acc;
  },[])

  console.log(conditions);

  let values = []


  for(var i = 0; i < conditions.length; i++){
    values.push(data.filter(eachChron => (eachChron.conditions.some (cond => cond.condition.includes(conditions[i])))).length)
  }


  let mycanvas = document.getElementById(id).getContext("2d");
  mycanvas.width = 250;
  mycanvas.height = 250;
  var myChart6 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: conditions,
          datasets: [
            {
                label:"Condiciones",
                data: values,
                borderWidth: 1,
                borderColor: 'rgba(245,94,244,1)',
                backgroundColor: 'rgba(245,94,244,0.3)' 
            }
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

//Pacientes con ECNT segun sexo del paciente
function PatientECNTBySex(data, id) {
  const sex = ["F", "M"];

  const total_attentions = [
    data.filter(total => total.patient_sex == "f").length,
    data.filter(total => total.patient_sex == "m").length,]

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

//Pacientes con ECNT y su última visita al CAPS según último turno
function PatientECNTByLastAppointmentBySex(data, id) //, title
  {
    let mycanvas = document.getElementById(id).getContext("2d")
    const ages_group = ["0-3 meses", "3-6 meses", "6-9 meses", "9-12 meses", "+ de 1 año"];
    
    const chron_f = [
      data.filter(total => total.month_since_last_visit >=0 && total.month_since_last_visit <3 && total.patient_sex == "f").length,
      data.filter(total => total.month_since_last_visit >=3 && total.month_since_last_visit <6 && total.patient_sex == "f").length,
      data.filter(total => total.month_since_last_visit >=6 && total.month_since_last_visit <9 && total.patient_sex == "f").length,
      data.filter(total => total.month_since_last_visit >=9 && total.month_since_last_visit <12 && total.patient_sex == "f").length,
      data.filter(total => total.month_since_last_visit >=12 && total.patient_sex == "f").length,
    ]
    
    const chron_m = [
      data.filter(total => total.month_since_last_visit >=0 && total.month_since_last_visit <3 && total.patient_sex == "m").length,
      data.filter(total => total.month_since_last_visit >=3 && total.month_since_last_visit <6 && total.patient_sex == "m").length,
      data.filter(total => total.month_since_last_visit >=6 && total.month_since_last_visit <9 && total.patient_sex == "m").length,
      data.filter(total => total.month_since_last_visit >=9 && total.month_since_last_visit <12 && total.patient_sex == "m").length,
      data.filter(total => total.month_since_last_visit >=12 && total.patient_sex == "m").length,
    ]

    var myChart5 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: ages_group,
          datasets: [
              {
               label:"F",
               data: chron_f,
               borderWidth: 1,
               borderColor: 'rgba(245,94,244,1)',
               backgroundColor: 'rgba(245,94,244,0.3)' 
           },
                       {
               label:"M",
               data: chron_m,
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
          indexAxis: 'y',
      }
  });


  myChart5.update()
    
};




//FUNCIONES PARA MOSTRAR DATOS

//total de pacientes con ECNT
function TotalECNT(data) {
  const element = document.getElementById('ecnt_total');
  element.innerHTML = data.length;
}

//total de pacientes con ECNT Masculinos
function MTotalECNT(data) {
  const element = document.getElementById('ecnt_m_total');
  element.innerHTML = data.filter(every => every.patient_sex == "m").length; 
}

//total de pacientes con ECNT femeninas
function FTotalECNT(data) {
  const element = document.getElementById('ecnt_f_total');
  element.innerHTML = data.filter(every => every.patient_sex == "f").length; 
}

//pacientes con ECNT con última visita menor a 6 meses
function LastVisit6Months(data) {
  const element = document.getElementById('last_visit_6_months');
  element.innerHTML = data.filter(every => every.month_since_last_visit < 6).length;
}

//pacientes con ECNT con última visita menor a 12 meses
function LastVisit1Year(data) {
  const element = document.getElementById('last_visit_1_year');
  element.innerHTML = data.filter(every => every.month_since_last_visit < 12).length;
}

//porcentaje de pacientes con ECNT con última visita menor a 6 meses
function PercentLastVisit6Months(data) {
  const element = document.getElementById('%_last_visit_6_months');
  
  const total = data.length;
  const total_chronic_6 = data.filter(every => every.month_since_last_visit < 6).length;
  
  element.innerHTML = Math.round(total_chronic_6*100/total)+" %"
}

//porcentaje de pacientes con ECNT con última visita menor a 12 meses
function PercentLastVisit1Year(data) {
  const element = document.getElementById('%_last_visit_1_year');
  
  const total = data.length;
  const total_chronic_12 = data.filter(every => every.month_since_last_visit < 12).length;
  
  element.innerHTML = Math.round(total_chronic_12*100/total)+" %"
}




