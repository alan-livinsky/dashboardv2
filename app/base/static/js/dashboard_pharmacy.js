const styles = {
    color: {
        solids: ['rgba(57, 110, 176, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
        alphas: ['rgba(57, 110, 176, .2))', 'rgba(33, 192, 215, .2)', 'rgba(217, 158, 43, .2)', 'rgba(205, 58, 129, .2)', 'rgba(156, 153, 204, .2)', 'rgba(225, 78, 202, .2)']
    }
}


//GRAFICAS

//Entregas de medicamento segun sexo
function MovementsBySex(data, id) {

  const sex = ["F", "M"];

  const total_deliveries = [
  data.filter(total => total.patient_sex == "f").length,
  data.filter(total => total.patient_sex == "m").length,]

  let mycanvas = document.getElementById(id).getContext("2d");

  var myChart1 = new Chart(mycanvas, {
      type: 'doughnut',
      data: {
          labels: sex,
          datasets: [{
              label: 'Cantidad de Entregas',
              data: total_deliveries,
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
  myChart1.update();
}

//Entregas de medicamento segun obra social
function MovementsByInsurance(data, id) {

const insurance = ["NO", "SI"];
const without_insurance = data.filter(total => total.patient_insurance == "False").length; //cant sin obra social
const with_insurance = data.length - without_insurance //cantidad con obra social

const total_deliveries = [ without_insurance, with_insurance]

let mycanvas = document.getElementById(id).getContext("2d");

var myChart2 = new Chart(mycanvas, {
    type: 'doughnut',
    data: {
        labels: insurance,
        datasets: [{
            label: 'Cantidad de Entregas',
            data: total_deliveries,
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

//Medicamentos entregados (cantidad de cada medicamento en el periodo)
function DeliveredQuantity(data, id) {

    //guardo en un array todos los productos que existen
    data_products = data.map(total => total.product)
    //elimino los repetidos y los guardo en otro array
    const product_type = data_products.reduce((acc,item)=>{
    if(!acc.includes(item)){
      acc.push(item);
    }
    return acc;
    },[])

    const total_quantities = []
    
    //cuento la cantidad por cada producto y lo guardo en el vector total_quantities
    for (var i=0; i<product_type.length; i++) {
      const filteredData = data.filter(obj => obj.product === product_type[i]);

      //objeto q tiene clave (1 medicamento) y valor (su cantidad) sin repetir
      const countByProduct = filteredData.reduce((acc, obj) => {
        if (acc[obj.product]) {
          acc[obj.product] += obj.quantity;
        } else {
          acc[obj.product] = obj.quantity;
        }
        return acc;
      }, {});

      total_quantities.push(countByProduct); //array q tiene todos los medicamentos con sus cantidades
    }

    //para graficar tengo que recorrer el array y guardar las claves en
    // un vector y los valores en otro

    const product_names = []
    const product_quantities = []
    for (let i = 0; i < total_quantities.length; i++) {
      product_names.push(Object.keys(total_quantities[i]))
      product_quantities.push(Object.values(total_quantities[i]))

    }

    
    let mycanvas = document.getElementById(id).getContext("2d");
    var myChart1 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: product_names,
          datasets: [{
              label: 'Cantidad de medicamentos', 
              data: product_quantities,
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
          barPercentage: 0.7,
          
      }
  });


  myChart1.update()

}

//Entregas de medicamentos segun grupos etarios y sexo
function MovementByAgeGroupsBySex(data, id) {

    let mycanvas = document.getElementById(id).getContext("2d")
    const ages_group = ["0-4", "5-9", "10-14", "15-19", "20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-84","85-89", "90 y +"];

    let values_f = []
    let values_m = []

 
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=0 && eachAppointment.patient_age <5 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=0 && eachAppointment.patient_age <5 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=5 && eachAppointment.patient_age <10 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=5 && eachAppointment.patient_age <10 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=10 && eachAppointment.patient_age <15 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=10 && eachAppointment.patient_age <15 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=15 && eachAppointment.patient_age <20 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=15 && eachAppointment.patient_age <20 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=20 && eachAppointment.patient_age <25 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=20 && eachAppointment.patient_age <25 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=25 && eachAppointment.patient_age <30 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=25 && eachAppointment.patient_age <30 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=30 && eachAppointment.patient_age <35 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=30 && eachAppointment.patient_age <35 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=35 && eachAppointment.patient_age <40 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=35 && eachAppointment.patient_age <40 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=40 && eachAppointment.patient_age <45 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=40 && eachAppointment.patient_age <45 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=45 && eachAppointment.patient_age <50 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=45 && eachAppointment.patient_age <50 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=50 && eachAppointment.patient_age <55 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=50 && eachAppointment.patient_age <55 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=55 && eachAppointment.patient_age <60 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=55 && eachAppointment.patient_age <60 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=60 && eachAppointment.patient_age <65 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=60 && eachAppointment.patient_age <65 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=65 && eachAppointment.patient_age <70 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=65 && eachAppointment.patient_age <70 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=70 && eachAppointment.patient_age <75 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=70 && eachAppointment.patient_age <75 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=75 && eachAppointment.patient_age <80 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=75 && eachAppointment.patient_age <80 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=80 && eachAppointment.patient_age <85 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=80 && eachAppointment.patient_age <85 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=85 && eachAppointment.patient_age <90 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=85 && eachAppointment.patient_age <90 &&  eachAppointment.patient_sex == 'm').length)
    values_f.push(data.filter(eachAppointment => eachAppointment.patient_age >=90 &&  eachAppointment.patient_sex == 'f').length)
    values_m.push(data.filter(eachAppointment => eachAppointment.patient_age >=90 &&  eachAppointment.patient_sex == 'm').length)

    var myChart4 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: ages_group,
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


  myChart4.update()
}

//Recetas atendidas segun grupos etarios y sexo
function PrescriptionsByAgeGroupsBySex(data, id) {

  let mycanvas = document.getElementById(id).getContext("2d");

  const ages_group = ["0-4", "5-9", "10-14", "15-19", "20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80-84","85-89", "90 y +"];
  //guardo todos los origin distintos que existen
  data_total = data.map(total => total.origin)
  //elimino los repetidos y los guardo en otro array
  const deliveries = data_total.reduce((acc,item)=>{
  if(!acc.includes(item)){
    acc.push(item);
  }
  return acc;
  },[])

  let values_f = []
  let values_m = []

  var total = [];

  for (var i=0; i<deliveries.length; i++) {
    //es un arreglo con todas las recetas, 
    //en cada posicion estan los datos de la misma receta:

    const filteredData = data.filter(obj => obj.origin == deliveries[i]);

      //objeto q tiene clave (origin) y valor (genero y edad) sin repetir
      const countByOrigin = filteredData.reduce((acc, obj) => {
        if (acc[obj.origin]) {
          acc[obj.origin] = [obj.patient_age, obj.patient_sex];
        } 
        else {
          acc[obj.origin] = [obj.patient_age, obj.patient_sex];
        }
        return acc;
      }, {});

      total.push(countByOrigin);
  }

  //(Object.keys(total[i])) -> es el nombre de la receta
  //(Object.values(total[i]))[0][1] -> es el genero del paciente
  //(Object.values(total[i]))[0][0] -> es la edad del paciente

  //al vector q tiene las recetas sin repetir lo filtro por edad y por sexo
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=0 && (Object.values(eachAppointment))[0][0] <5 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=0 && (Object.values(eachAppointment))[0][0] <5 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=5 && (Object.values(eachAppointment))[0][0] <10 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=5 && (Object.values(eachAppointment))[0][0] <10 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=10 && (Object.values(eachAppointment))[0][0] <15 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=10 && (Object.values(eachAppointment))[0][0] <15 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=15 && (Object.values(eachAppointment))[0][0] <20 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=15 && (Object.values(eachAppointment))[0][0] <20 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=20 && (Object.values(eachAppointment))[0][0] <25 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=20 && (Object.values(eachAppointment))[0][0] <25 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=25 && (Object.values(eachAppointment))[0][0] <30 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=25 && (Object.values(eachAppointment))[0][0] <30 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=30 && (Object.values(eachAppointment))[0][0] <35 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=30 && (Object.values(eachAppointment))[0][0] <35 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=35 && (Object.values(eachAppointment))[0][0] <40 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=35 && (Object.values(eachAppointment))[0][0] <40 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=40 && (Object.values(eachAppointment))[0][0] <45 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=40 && (Object.values(eachAppointment))[0][0] <45 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=45 && (Object.values(eachAppointment))[0][0] <50 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=45 && (Object.values(eachAppointment))[0][0] <50 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=50 && (Object.values(eachAppointment))[0][0] <55 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=50 && (Object.values(eachAppointment))[0][0] <55 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=55 && (Object.values(eachAppointment))[0][0] <60 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=55 && (Object.values(eachAppointment))[0][0] <60 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=60 && (Object.values(eachAppointment))[0][0] <65 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=60 && (Object.values(eachAppointment))[0][0] <65 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=65 && (Object.values(eachAppointment))[0][0] <70 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=65 && (Object.values(eachAppointment))[0][0] <70 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=70 && (Object.values(eachAppointment))[0][0] <75 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=70 && (Object.values(eachAppointment))[0][0] <75 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=75 && (Object.values(eachAppointment))[0][0] <80 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=75 && (Object.values(eachAppointment))[0][0] <80 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=80 && (Object.values(eachAppointment))[0][0] <85 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=80 && (Object.values(eachAppointment))[0][0] <85 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=85 && (Object.values(eachAppointment))[0][0] <90 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=85 && (Object.values(eachAppointment))[0][0] <90 && (Object.values(eachAppointment))[0][1] == 'm').length);
    values_f.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=90 && (Object.values(eachAppointment))[0][1] == 'f').length);
    values_m.push(total.filter(eachAppointment => (Object.values(eachAppointment))[0][0] >=90 && (Object.values(eachAppointment))[0][1] == 'm').length);

  
  var myChart5 = new Chart(mycanvas, {
    type: 'bar',
    data: {
        labels: ages_group,
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

//Entregas de medicamento segun dias
function MovementsByDays(data, id) {

    let mycanvas = document.getElementById(id).getContext("2d");
    const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    const total_deliveries = [
      data.filter(total => total.day == "lunes").length,
      data.filter(total => total.day == "martes").length,
      data.filter(total => total.day == "miércoles").length,
      data.filter(total => total.day == "jueves").length,
      data.filter(total => total.day == "viernes").length];

    var myChart6 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: days,
          datasets: [{
              label: 'Cantidad de Entregas', 
              data: total_deliveries,
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
          barThickness: 30,
      }
  });


  myChart6.update()
}

//Entregas de medicamento realizadas segun horario
function MovementsByHours(data, id) {

    let mycanvas = document.getElementById(id).getContext("2d")
    const hours_group = ["7-8", "8-9", "9-10", "10-11", "11-12","12-13","13-14","14-15",
    "15-16","16-17","17-18","18-19"];

    const total_deliveries = [
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=7 && (parseInt(total.time.slice(0,2))-3) <8).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=8 && (parseInt(total.time.slice(0,2))-3) <9).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=9 && (parseInt(total.time.slice(0,2))-3) <10).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=10 && (parseInt(total.time.slice(0,2))-3) <11).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=11 && (parseInt(total.time.slice(0,2))-3) <12).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=12 && (parseInt(total.time.slice(0,2))-3) <13).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=13 && (parseInt(total.time.slice(0,2))-3) <14).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=14 && (parseInt(total.time.slice(0,2))-3) <15).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=15 && (parseInt(total.time.slice(0,2))-3) <16).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=16 && (parseInt(total.time.slice(0,2))-3) <17).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=17 && (parseInt(total.time.slice(0,2))-3) <18).length,
      data.filter(total => (parseInt(total.time.slice(0,2))-3) >=18 && (parseInt(total.time.slice(0,2))-3) <19).length

    ]

    var myChart7 = new Chart(mycanvas, {
      type: 'bar',
      data: {
          labels: hours_group,
          datasets: [{
              label: 'Cantidad de Entregas', 
              data: total_deliveries,
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
          barThickness: 30,
      }
  });


  myChart7.update()
}

//Entregas de medicamento a pacientes con ECNT
function MovementsByChronic(data, id) {
const chronic = ["NO", "SI"];
const SI = data.filter(total => total.patient_chronic == "Si").length;
const NO = data.length - SI;

const total_deliveries = [NO , SI]

let mycanvas = document.getElementById(id).getContext("2d");

var myChart8 = new Chart(mycanvas, {
    type: 'doughnut',
    data: {
        labels: chronic,
        datasets: [{
            label: 'Cantidad de Entregas',
            data: total_deliveries,
            backgroundColor: [
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
              ],
              borderColor: [
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
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
myChart8.update();
  
}

//----------------------
//ACTUALIZAR GRAFICAS

//entregas segun grupos etarios y sexo
function updateGraph1(newdata) {
  document.getElementById("MovementByAgeGroupsBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "MovementByAgeGroupsBySex"; 
  document.getElementById("canva1").appendChild(canvas);
  MovementByAgeGroupsBySex(newdata, "MovementByAgeGroupsBySex");
};

//recetas segun grupos etarios y sexo
function updateGraph2(newdata) {
  document.getElementById("PrescriptionsByAgeGroupsBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "PrescriptionsByAgeGroupsBySex"; 
  document.getElementById("canva2").appendChild(canvas);
  PrescriptionsByAgeGroupsBySex(newdata, "PrescriptionsByAgeGroupsBySex");
};

//Entregas segun sexo
function updateGraph3(newdata) {
  document.getElementById("MovementsBySex").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "MovementsBySex"; 
  document.getElementById("canva3").appendChild(canvas);
  MovementsBySex(newdata, "MovementsBySex");
};

//Entregas segun obra social SI-NO
function updateGraph4(newdata) {
  document.getElementById("MovementsByInsurance").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "MovementsByInsurance"; 
  document.getElementById("canva4").appendChild(canvas);
  MovementsByInsurance(newdata, "MovementsByInsurance");
};

//Recetas segun ECNT
function updateGraph5(newdata) {
  document.getElementById("MovementsByChronic").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "MovementsByChronic"; 
  document.getElementById("canva5").appendChild(canvas);
  MovementsByChronic(newdata, "MovementsByChronic");

};


//Entregas segun dias
function updateGraph6(newdata) {
  document.getElementById("DeliveredQuantity").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "DeliveredQuantity"; 
  document.getElementById("canva6").appendChild(canvas);
  DeliveredQuantity(newdata, "DeliveredQuantity");
};

//Entregas según horarios
function updateGraph7(newdata) {
  document.getElementById("MovementsByDays").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "MovementsByDays"; 
  document.getElementById("canva7").appendChild(canvas);
  MovementsByDays(newdata, "MovementsByDays");
};

//Entregas segun ECNT
function updateGraph8(newdata) {
  document.getElementById("MovementsByHours").remove();
  var canvas = document.createElement("canvas");
  canvas.id = "MovementsByHours"; 
  document.getElementById("canva8").appendChild(canvas);
  MovementsByHours(newdata, "MovementsByHours");
};



//-----------------

//DATOS

//Recetas totales atendidas para el periodo
function PrescriptionsAttended(data) {
  const element = document.getElementById('prescriptions_attended');
  
  //guardo todos los origin distintos que existen
  data_total = data.map(total => total.origin)
  //elimino los repetidos y los guardo en otro array
  const deliveries = data_total.reduce((acc,item)=>{
  if(!acc.includes(item)){
    acc.push(item);
  }
  return acc;
  },[])

  element.innerHTML = deliveries.length; //guardo el total de origin distintos q hay
}

//Recetas atendidas y creadas en el periodo
function PeriodPrescriptionsAttended(data) {
 //origin distintos dentro del periodo
 const element = document.getElementById('period_prescriptions_attended');
 var fechaInicio = document.getElementById("fecha1").value;
 var fechaFin = document.getElementById("fecha2").value; 
 var f_inicio = Date.parse(fechaInicio);
 var fi = new Date (f_inicio);
 var f_fin = Date.parse(fechaFin);
 var ff = new Date (f_fin);

 var recetas_periodo = [];

 //primero filtro por fecha
 for (var i=0; i<data.length; i++){
   f_receta = Date.parse(data[i].prescription_date);
   fecha_receta = new Date(f_receta);
   if (fecha_receta >= fi && fecha_receta <= ff ){
      recetas_periodo.push(data[i]);
   }
   
 }
  
  //guardo todos los origin distintos que existen en ese periodo
  data_total = recetas_periodo.map(total => total.origin)
  //elimino los repetidos y los guardo en otro array
  const deliveries = data_total.reduce((acc,item)=>{
  if(!acc.includes(item)){
    acc.push(item);
  }
  return acc;
  },[])

  element.innerHTML = deliveries.length;

}

//Entregas totales realizadas en el periodo
function TotalMoves(data) {
  const element = document.getElementById('total_moves');
  element.innerHTML = data.length;

}

//Promedio de entregas diario
function AverageDailyDeliveries(data) {

  const element = document.getElementById('average_deliveries');

  var fechaInicio = document.getElementById("fecha1").value;
  var fechaFin = document.getElementById("fecha2").value; 
  var f_inicio = Date.parse(fechaInicio);
  var fi = new Date(f_inicio)
  var f_fin = Date.parse(fechaFin);
  var ff = new Date(f_fin)

  //necesito contar los dias habiles entre las dos fechas
  let diasHabiles = 0;
  const unDia = 24 * 60 * 60 * 1000; // milisegundos en un día
  for (let dia = fi.getTime(); dia <= ff.getTime(); dia += unDia) {
    const fecha = new Date(dia);
    const diaSemana = fecha.getDay();
    if (diaSemana >= 1 && diaSemana <= 5) { // lunes a viernes
      diasHabiles++;
    }
  }
  const average_deliveries = Math.round(data.length/diasHabiles);
  
  element.innerHTML = average_deliveries;

}

//-------------------------------
//OTRAS FUNCIONES

//Función para reescribir el período de datos que toman las gráficas e indicadores
function RewritePeriodBySelection() {
    const element = document.getElementsByClassName('selected_period'); //son muchos elementos
    var fechaInicio = document.getElementById("fecha1").value;
    var fechaFin = document.getElementById("fecha2").value; 
    const imprimir = "Desde " + fechaInicio + " hasta " + fechaFin;
    //como tengo muchos elementos, tengo q recorrer el array para pasar los datos al html
    for(var i=0; i<element.length; i++) {
      element[i].innerHTML = imprimir;
    }
    
  }
  
//Genero el selection de los Productos
function ProductSelect(data)//, title
 {
   //guardo en un array todos los tipos de productos que existen
   data_product = data.map(total => total.product)
   //elimino los repetidos y los guardo en otro array
   const products = data_product.reduce((acc,item)=>{
   if(!acc.includes(item)){
     acc.push(item);
   }
   return acc;
 },[])
   
   products.sort()
   
   let selectBox = document.getElementById('ProductSelect');

  for(let i = 0; i < products.length; i++){
    var opt = products[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectBox.appendChild(el);
    }
 }
 
 
//función que actualiza el panel con los datos ingresados por el ususario al hacel click en el botón "Aplicar filtro"
function Update(){
    // Remove loading message, show chart panels 
    document.body.classList.add('running')
    var fechaInicio = document.getElementById("fecha1").value;
    var fechaFin = document.getElementById("fecha2").value;
    var Product = document.getElementById("ProductSelect").value;
    
    if (fechaInicio == ""   || fechaFin == ""){
      alert('Los campos de fecha deben tener un valor')
    }
  
    else {
        
        let data = {
            'start_date': fechaInicio,
            'end_date': fechaFin,
            'product': Product
        };
        
        const loadingMessage = document.querySelector('.loading-message');

        loadingMessage.classList.add('active');
        
        fetch('dashboard_pharmacy', {
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
            updateGraph7(datos1);
            updateGraph8(datos1);
            PrescriptionsAttended(datos1);
            PeriodPrescriptionsAttended(datos1);
            TotalMoves(datos1);
            AverageDailyDeliveries(datos1);
            RewritePeriodBySelection();
            loadingMessage.classList.remove('active');
        })
    }
  }
