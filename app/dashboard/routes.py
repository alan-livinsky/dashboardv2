from app import app, tryton
from app.dashboard import blueprint

from flask import render_template, request

from datetime import datetime, date
from dateutil.relativedelta import relativedelta

from functools import wraps

import json
import numpy as np
import time


institution=['']


#Panel de indicadores
@blueprint.route('/dashboard', methods=['GET','POST'])
@tryton.transaction()
def dashboard_indicators():
    Appointment = tryton.pool.get('gnuhealth.appointment')
    Prescription = tryton.pool.get('gnuhealth.prescription.order')
    NursingAtention =  tryton.pool.get('gnuhealth.patient.ambulatory_care')
    Evaluation = tryton.pool.get('gnuhealth.patient.evaluation')
    Institution = tryton.pool.get('gnuhealth.institution')
    OdontologyTreatment = tryton.pool.get('gnuhealth.dentistry.treatment')
    Patient = tryton.pool.get('gnuhealth.patient')
    ImagingResult = tryton.pool.get('gnuhealth.imaging.test.result')
    PrenatalEvaluation = tryton.pool.get('gnuhealth.patient.prenatal.evaluation')

    start = datetime.today().replace(hour=0,minute=0,second=0)
    final = datetime.today().replace(hour=23,minute=59,second=59)
    start_d = start.date()

    appointments_count = 0
    prescriptions_count = 0
    evaluations_count = 0
    nursing_ambulatory_care_count = 0
    odontology_treatments_count = 0
    prenatal_evaluations_count = 0
    imaging_results_count = 0
    new_population =  0

    #Obtenemos la institución
    institutions = Institution.search([])
    organization = institutions[0].rec_name

    # Calculamos los turnos presentes del día cuando el estado es "checked_in" o "done"
    today = datetime.today().date().strftime('%d %m %Y')
    appointments = Appointment.search([
            ('appointment_date','>=',start),
            ('appointment_date','<',final),
            ])

    for x in appointments:
        if x.state == 'done' or x.state == 'checked_in':
            appointments_count = appointments_count + 1

    # Calculamos las evaluaciones realizadas en el día -> estado  "done"
    evaluations = Evaluation.search([
            ('evaluation_start','>=',start),
            ('evaluation_start','<',final),
            ])

    for x in evaluations:
        if x.state == 'signed' :
            evaluations_count = evaluations_count + 1

    # Calculamos las prescripciones realizadas en el día -> estado  "done"
    prescriptions = Prescription.search([
            ('prescription_date','>=',start),
            ('prescription_date','<',final),
            ])

    for x in prescriptions:
        if x.state == 'done' or x.state == 'validated':
            prescriptions_count = prescriptions_count + 1

    # Calculamos las atenciones ambulatorias de enfermería realizadas en el día -> estado  "done"
    ambulatory_cares = NursingAtention.search([
            ('session_start','>=',start),
            ('session_start','<',final),
            ])

    for x in ambulatory_cares:
        if x.state == 'done' :
            nursing_ambulatory_care_count = nursing_ambulatory_care_count + 1

    # Calculamos las atenciones odontológicas realizadas en el día -> estado  "done"
    odontology_treatments = OdontologyTreatment.search([
            ('treatment_date','=',start_d),
            ])

    for x in odontology_treatments:
        if x.state == 'done' :
            odontology_treatments_count = odontology_treatments_count + 1

    # Calculamos las evaluaciones prenatales realizadas en el día -> estado  "done"
    prenatal_evaluations = PrenatalEvaluation.search([
            ('evaluation_date','>=',start),
            ('evaluation_date','<',final)
            ])

    for x in prenatal_evaluations:
        prenatal_evaluations_count = prenatal_evaluations_count + 1

# Calculamos los pacientes nuevos registrados en el día
    imaging_results = ImagingResult.search([
            ('date','>=',start),
            ('date','<',final)
            ])

    for x in imaging_results:
        imaging_results_count = imaging_results_count + 1

# Calculamos nuevos pacientes creados en el día
    population = Patient.search([
            ('create_date','>=',start),
            ('create_date','<',final)
            ])

    for x in population:
        new_population = new_population + 1

    return render_template('dashboard.html',
                           today=today,
                           appointments_count = appointments_count,
                           prescriptions_count = prescriptions_count,
                           evaluations_count = evaluations_count,
                           nursing_ambulatory_care_count = nursing_ambulatory_care_count,
                           organization = organization,
                           odontology_treatments_count = odontology_treatments_count,
                           prenatal_evaluations_count = prenatal_evaluations_count,
                           imaging_results_count = imaging_results_count,
                           new_population = new_population,
                           )

# Panel de Turnos
@blueprint.route('/dashboard_appointments', methods=['GET','POST'])
@tryton.transaction()
def dashboard_appointments():
    Appointment = tryton.pool.get('gnuhealth.appointment')
    Institution = tryton.pool.get('gnuhealth.institution')
    start = datetime.today().replace(hour=0,minute=0,second=0)
    final = datetime.today().replace(hour=23,minute=59,second=59)

    institutions = Institution.search([])
    organization = institutions[0].rec_name

    if request.method == 'GET':
        appointments = Appointment.search([
                ('appointment_date','>=',start-relativedelta(days=15)),
                ('appointment_date','<=',final),
                ('state','!=','free')
                ])

        data = []

        for appointment in appointments:
            if appointment.speciality and appointment.state != "free":
                if appointment.patient.current_insurance:
                    insurance = str(appointment.patient.current_insurance.company.name)
                else:
                    insurance = "False"
                x = {
                    'gender': appointment.patient.gender,
                    'atention_date': str(appointment.appointment_date.day)+"/"+ str(appointment.appointment_date.month)+"/"+str(appointment.appointment_date.year),
                    'age':relativedelta(appointment.appointment_date,appointment.patient.name.dob).years,
                    'speciality':str(appointment.speciality.name),
                    'professional': str(appointment.healthprof.name.lastname)+", "+str(appointment.healthprof.name.name),
                    'prof_license': appointment.healthprof.code,
                    'visit': str(appointment.visit_type),
                    'day': str(appointment.appointment_date.strftime('%A')),
                    'state': str(appointment.state),
                    'insurance': str(insurance),
                    'cronico': str(appointment.patient.cronico),
                }
            if getattr(appointment, 'category', None):
                x['category']: str(appointment.category)
            data.append(x)
        return render_template('dashboard_appointments.html',
                            data=data)

    if request.method == 'POST':
        new_data = request.get_json()
        start_date= new_data['start_date']
        end_date = new_data['end_date']
        spec = new_data['specialty']

        date_start = datetime.strptime(start_date, '%Y-%m-%d')#paso de string a datetime
        date_end = datetime.strptime(end_date, '%Y-%m-%d')

        if not spec:
            appointments = Appointment.search([
                    ('appointment_date','>=',date_start),
                    ('appointment_date','<=',date_end),
                    ('state','!=','free')
                    ])

        else:
            appointments = Appointment.search([
                    ('appointment_date','>=',date_start),
                    ('appointment_date','<=',date_end),
                    ('speciality.name','=', spec),
                    ('state','!=','free')
                    ])
        filtered_data = []

        for appointment in appointments:
            if appointment.speciality and appointment.state != "free":
                if appointment.patient.current_insurance:
                    insurance = str(appointment.patient.current_insurance.company.name)
                else:
                    insurance = "False"
                x = {
                    'gender': appointment.patient.gender,
                    'atention_date': str(appointment.appointment_date.day)+"/"+ str(appointment.appointment_date.month)+"/"+str(appointment.appointment_date.year),
                    'age':relativedelta(appointment.appointment_date,appointment.patient.name.dob).years,
                    'speciality':str(appointment.speciality.name),
                    'professional': str(appointment.healthprof.name.lastname)+", "+str(appointment.healthprof.name.name),
                    'prof_license': appointment.healthprof.code,
                    'visit': str(appointment.visit_type),
                    'category': str(appointment.category),
                    'day': str(appointment.appointment_date.strftime('%A')),
                    'state': str(appointment.state),
                    'insurance': str(insurance),
                    'cronico': str(appointment.patient.cronico),
                }
            filtered_data.append(x)
        j_filtered_data = json.dumps(filtered_data)
        return j_filtered_data


# Panel de Enfermería
@blueprint.route('/dashboard_nursing', methods=['GET','POST'])
@tryton.transaction()
def dashboard_nursing():
    NursingAtention =  tryton.pool.get('gnuhealth.patient.ambulatory_care')
    Institution = tryton.pool.get('gnuhealth.institution')
    start = datetime.today().replace(hour=0,minute=0,second=0)
    final = datetime.today().replace(hour=23,minute=59,second=59)

    institutions = Institution.search([])
    organization = institutions[0].name.name

    if request.method == 'GET':
        ambulatory_nursing = NursingAtention.search([
                ('session_start','>=',start-relativedelta(days=15)),
                ('session_start','<=',final)
                ])

        data = []
        procedures = []
        for ambulatory in ambulatory_nursing:
            if ambulatory.nursing_procedures:
                for procedure in ambulatory.nursing_procedures:
                    proced = {
                        "procedure": str(procedure.proc)
                        }
                    procedures.append(proced)
            if ambulatory.patient.current_insurance:
                insurance = str(ambulatory.patient.current_insurance.company.name)
            else:
                insurance = "False"
            atention = {
                'gender': ambulatory.patient.gender,
                'atention_date': str(ambulatory.session_start.day)+"/"+str(ambulatory.session_start.month)+"/"+str(ambulatory.session_start.year),
                'day' : str(ambulatory.session_start.strftime('%A')),
                'patient_age': relativedelta(ambulatory.session_start,ambulatory.patient.name.dob).years,
                'health_prof': str(ambulatory.health_professional.name.lastname)+", "+str(ambulatory.health_professional.name.name),
                'license': ambulatory.health_professional.code,
                'procedures' : procedures,
                'insurance' : str(insurance),
                'cronico': str(ambulatory.patient.cronico)
            }
            data.append(atention)
            procedures = []
        return render_template('dashboard_nursing.html',
                                data=data)
    if request.method == 'POST':
        new_data = request.get_json()
        start_date= new_data['start_date']
        end_date = new_data['end_date']
        prof = new_data['professional']

        date_start = datetime.strptime(start_date, '%Y-%m-%d')#paso de string a datetime
        date_end = datetime.strptime(end_date, '%Y-%m-%d')

        license = None

        if not prof:
            ambulatory_nursing = NursingAtention.search([
                    ('session_start','>=',date_start),
                    ('session_start','<=',date_end+relativedelta(days=1))
                    ])
        else:
            auxiliar = NursingAtention.search([
                    ('session_start','>=',date_start),
                    ('session_start','<=',date_end+relativedelta(days=1))
                    ])
            for aux in auxiliar:
                h_p = str(aux.health_professional.name.lastname)+", "+str(aux.health_professional.name.name)
                if h_p == prof:
                    license = aux.health_professional.code
                    break
            ambulatory_nursing = NursingAtention.search([
                    ('session_start','>=',date_start),
                    ('session_start','<=',date_end+relativedelta(days=1)),
                    ('health_professional.code','=', license)
                    ])
        filtered_data = []
        filtered_procedures = []
        for ambulatory in ambulatory_nursing:
            if ambulatory.nursing_procedures:
                for procedure in ambulatory.nursing_procedures:
                    proced = {
                        "procedure": str(procedure.proc)
                        }
                    filtered_procedures.append(proced)
            if ambulatory.patient.current_insurance:
                insurance = str(ambulatory.patient.current_insurance.company.name)
            else:
                insurance = "False"
            atention = {
                'gender': ambulatory.patient.gender,
                'atention_date': str(ambulatory.session_start.day)+"/"+str(ambulatory.session_start.month)+"/"+str(ambulatory.session_start.year),
                'day' : str(ambulatory.session_start.strftime('%A')),
                'patient_age': relativedelta(ambulatory.session_start,ambulatory.patient.name.dob).years,
                'health_prof': str(ambulatory.health_professional.name.lastname)+", "+str(ambulatory.health_professional.name.name),
                'license': ambulatory.health_professional.code,
                'procedures' : filtered_procedures,
                'insurance' : str(insurance),
                'cronico': str(ambulatory.patient.cronico)
            }
            filtered_data.append(atention)
            filtered_procedures = []

        j_filtered_data = json.dumps(filtered_data)
        return j_filtered_data

# Panel de Farmacia
@blueprint.route('/dashboard_pharmacy', methods=['GET','POST'])
@tryton.transaction()
def dashboard_pharmacy():
    Institution = tryton.pool.get('gnuhealth.institution')
    Move = tryton.pool.get('stock.move')

    start = date.today()
    institutions = Institution.search([])
    organization = institutions[0].name.name

    if request.method == 'GET':
        moves = Move.search([
                ('effective_date','>=',start-relativedelta(days=15)),
                ('effective_date','<=',start)
                ])

        data = []

        for move in moves:
            if move.origin.patient.current_insurance:
                insurance = move.origin.patient.current_insurance.company.name
            else:
                insurance = "False"
            if move.to_location.name == "Cliente":
                movement = {
                    'product': str(move.product.name),
                    'code': str(move.product.code),
                    'quantity': move.quantity,
                    'date': str(move.effective_date),
                    'time':str(move.create_date.time()),
                    'day' : str(move.effective_date.strftime('%A')),
                    'patient_age': relativedelta(move.effective_date,move.origin.patient.name.dob).years,
                    'patient_sex' : str(move.origin.patient.gender),
                    'patient_insurance': str(insurance),
                    'patient_chronic': str(move.origin.patient.cronico),
                    'prescription_date': str((move.origin.prescription_date).date()),
                    'origin' : str(move.origin)
                }
                data.append(movement)
        return render_template('dashboard_pharmacy.html',
                                data=data)
    if request.method == 'POST':
        new_data = request.get_json()
        start_date= new_data['start_date']
        end_date = new_data['end_date']
        prod = new_data['product']

        date_start = datetime.strptime(start_date, '%Y-%m-%d')#paso de string a datetime
        date_end = datetime.strptime(end_date, '%Y-%m-%d')

        if not prod:
            moves = Move.search([
                    ('effective_date','>=',date_start),
                    ('effective_date','<=',date_end)
                    ])
        else:
            moves = Move.search([
                    ('effective_date','>=',date_start),
                    ('effective_date','<=',date_end),
                    ('product.name','=',prod)
                    ])

        filtered_data = []

        for move in moves:
            if move.origin.patient.current_insurance:
                insurance = move.origin.patient.current_insurance.company.name
            else:
                insurance = "False"
            if move.to_location.name == "Cliente":
                movement = {
                    'product': str(move.product.name),
                    'code': str(move.product.code),
                    'quantity': move.quantity,
                    'date': str(move.effective_date),
                    'time':str(move.create_date.time()),
                    'day' : str(move.effective_date.strftime('%A')),
                    'patient_age': relativedelta(move.effective_date,move.origin.patient.name.dob).years,
                    'patient_sex' : str(move.origin.patient.gender),
                    'patient_insurance': str(insurance),
                    'patient_chronic': str(move.origin.patient.cronico),
                    'prescription_date': str((move.origin.prescription_date).date()),
                    'origin' : str(move.origin)
                }
            filtered_data.append(movement)

        j_filtered_data = json.dumps(filtered_data)
        return j_filtered_data


# Panel de Atenciones Ambulatorias
@blueprint.route('/dashboard_ambulatory', methods=['GET','POST'])
@tryton.transaction()
def dashboard_ambulatory():
    Evaluation = tryton.pool.get('gnuhealth.patient.evaluation')
    start = datetime.today().replace(hour=0,minute=0,second=0)
    final = datetime.today().replace(hour=23,minute=59,second=59)

    if request.method == 'GET':
        evaluations = Evaluation.search([
                ('evaluation_start','>=',start-relativedelta(days=15)),
                ('evaluation_start','<=',final),
                ])
        data = []
        snomed_diagnostics = []
        for record in evaluations:
            if record.snomed_diagnosis:
                    for snomed_diag in record.snomed_diagnosis:
                        snomed_diags = {
                            "snomed_diagnostic": str(snomed_diag.description)
                            }
                    snomed_diagnostics.append(snomed_diags)
            if record.patient.current_insurance:
                insurance = record.patient.current_insurance.company.name
            else:
                insurance = "False"
            if record.diagnosis:
                icd10_code = record.diagnosis.name
            else:
                icd10_code = "None"
            if record.evaluation_endtime and record.evaluation_start:
                diff = record.evaluation_endtime - record.evaluation_start
                eval_duration = diff.total_seconds()
            else:
                eval_duration = 0
            if record.healthprof.main_specialty and record.patient.gender:
                evaluation = {
                    'date': str((record.evaluation_start).date()),
                    'day' : str(record.evaluation_start.strftime('%A')),
                    'eval_duration': eval_duration,
                    'health_professional' : str(record.healthprof.name.lastname)+', '+str(record.healthprof.name.name),
                    'speciality' : str(record.healthprof.main_specialty.specialty.name),
                    'patient_age': relativedelta(record.evaluation_start,record.patient.name.dob).years,
                    'patient_sex' : str(record.patient.gender),
                    'patient_insurance': str(insurance),
                    'patient_chronic': str(record.patient.cronico),
                    'snomed_diagnosis':snomed_diagnostics,
                    'icd10_procedure': str(icd10_code)
                }
                data.append(evaluation)
                snomed_diagnostics = []
        with open("evaluations.json", "w") as archivo:
                json.dump(data, archivo)
        return render_template('dashboard_ambulatory.html',
                                data=data)
    if request.method == 'POST':
        new_data = request.get_json()
        start_date= new_data['start_date']
        end_date = new_data['end_date']
        spec = new_data['specialty']

        date_start = datetime.strptime(start_date, '%Y-%m-%d')#paso de string a datetime
        date_end = datetime.strptime(end_date, '%Y-%m-%d')
        if not spec:
            evaluations = Evaluation.search([
                ('evaluation_start','>=',date_start),
                ('evaluation_start','<=',date_end),
                ])
        else:
            evaluations = Evaluation.search([
                    ('evaluation_start','>=',date_start),
                    ('evaluation_start','<=',date_end),
                    ('healthprof.main_specialty.specialty.name','=', spec),
                    ])
        filtered_data = []
        snomed_diagnostics = []
        for record in evaluations:
            if record.snomed_diagnosis:
                    for snomed_diag in record.snomed_diagnosis:
                        snomed_diags = {
                            "snomed_diagnostic": str(snomed_diag.description)
                            }
                    snomed_diagnostics.append(snomed_diags)
            if record.patient.current_insurance:
                insurance = record.patient.current_insurance.company.name
            else:
                insurance = "False"
            if record.diagnosis:
                icd10_code = record.diagnosis.name
            else:
                icd10_code = "None"
            if record.evaluation_endtime and record.evaluation_start:
                diff = record.evaluation_endtime - record.evaluation_start
                eval_duration = diff.total_seconds()
            else:
                eval_duration = 0
            if record.healthprof.main_specialty and record.patient.gender:
                evaluation = {
                    'date': str((record.evaluation_start).date()),
                    'day' : str(record.evaluation_start.strftime('%A')),
                    'eval_duration': eval_duration,
                    'health_professional' : str(record.healthprof.name.lastname)+', '+str(record.healthprof.name.name),
                    'speciality' : str(record.healthprof.main_specialty.specialty.name),
                    'patient_age': relativedelta(record.evaluation_start,record.patient.name.dob).years,
                    'patient_sex' : str(record.patient.gender),
                    'patient_insurance': str(insurance),
                    'patient_chronic': str(record.patient.cronico),
                    'snomed_diagnosis':snomed_diagnostics,
                    'icd10_procedure': str(icd10_code)
                }
                filtered_data.append(evaluation)
                snomed_diagnostics = []
        j_filtered_data = json.dumps(filtered_data)
        return j_filtered_data

#Panel de Población atendida
@blueprint.route('/dashboard_population', methods=['GET','POST'])
@tryton.transaction()
def dashboard_population():
    Appointment = tryton.pool.get('gnuhealth.appointment')
    Patient = tryton.pool.get('gnuhealth.patient')

    start = datetime.today().replace(hour=0,minute=0,second=0)
    final = datetime.today().replace(hour=23,minute=59,second=59)

    data = []
    all_population = []
    population = []

    if request.method == 'GET':
        appointment = Appointment.search([
                ('appointment_date','>=',start-relativedelta(days=30)),
                ('state','!=','free')
                ])
        for x in appointment:
            all_population.append(x.patient.name.ref)
        population = list(set(all_population))
        array = np.array(all_population)
        for x in population:
            patient = Patient.search([
                ('name.ref','=',x),
                ('active','=', 'True')
                ])
            if patient[0].current_insurance:
                insurance = patient[0].current_insurance.company.name
            else:
                insurance = "False"
            people = {
                        'patient_age': relativedelta(patient[0].last_appointment,patient[0].name.dob).years,
                        'patient_sex': patient[0].name.gender,
                        'chronic':patient[0].cronico,
                        'insurance': insurance,
                        'total_appointments': np.count_nonzero(array == x),
                    }

            data.append(people)

        with open("population.json", "w") as archivo:
                json.dump(data, archivo)

        return render_template('dashboard_population.html',
                                data=data)

    if request.method == 'POST':
        new_data = request.get_json()
        start_date= new_data['start_date']
        end_date = new_data['end_date']

        date_start = datetime.strptime(start_date, '%Y-%m-%d')#paso de string a datetime
        date_end = datetime.strptime(end_date, '%Y-%m-%d')
        appointment = Appointment.search([
                ('appointment_date','>=',date_start),
                ('appointment_date','<=',date_end),
                ('patient.active','=',True),
                ('state','!=','free')
                ])
        filtered_data = []
        for x in appointment:
            all_population.append(x.patient.name.ref)
        population = list(set(all_population))
        array = np.array(all_population)

        for x in population:
            patient = Patient.search([
                ('name.ref','=',x),
                ('active','=', 'True')
                ])
            if patient and patient[0].current_insurance:
                insurance = patient[0].current_insurance.company.name
            else:
                insurance = "False"
            people = {
                        'patient_age': relativedelta(patient[0].last_appointment,patient[0].name.dob).years,
                        'patient_sex': patient[0].name.gender,
                        'chronic':patient[0].cronico,
                        'insurance': insurance,
                        'total_appointments': np.count_nonzero(array == x),
                    }
            filtered_data.append(people)
        j_filtered_data = json.dumps(filtered_data)
        return j_filtered_data

#Panel de Ginecobstetricia
@blueprint.route('/dashboard_ginecology', methods=['GET','POST'])
@tryton.transaction()
def dashboard_ginecology():
    PrenatalEvaluation = tryton.pool.get('gnuhealth.patient.prenatal.evaluation')

    start = datetime.today().replace(hour=0,minute=0,second=0)
    data = []

    if request.method == 'GET':
        prenatal_evaluations = PrenatalEvaluation.search([
            ('evaluation_date','>=',start-relativedelta(days=15))
            ])
        for x in prenatal_evaluations:
            if x.patient.current_insurance:
                insurance = x.patient.current_insurance.company.name
            else:
                insurance = "False"
            if x.patient.gender:
                evaluation = {
                    'date': str((x.evaluation_date)),
                    'day' : str(x.evaluation_date.strftime('%A')),
                    'health_professional' : str(x.healthprof.name.lastname)+', '+str(x.healthprof.name.name),
                    'age_at_evaluation': relativedelta(x.evaluation_date,x.patient.name.dob).years,
                    'patient_insurance': str(insurance),
                    'patient_chronic': str(x.patient.cronico),
                    'weeks': x.gestational_weeks,
                    'hta':x.hypertension,
                    'diabetes':x.diabetes,
                    'preeclampsia':x.preeclampsia,
                    'sobrepeso':x.overweight,
                    'bmi':x.imc,
                    'diastolic':x.presion_diastolica,
                    'systolic':x.presion_sistolica,
                }
                data.append(evaluation)
        return render_template('dashboard_ginecology.html',
                            data=data)

    if request.method == 'POST':
        new_data = request.get_json()
        start_date= new_data['start_date']
        end_date = new_data['end_date']

        date_start = datetime.strptime(start_date, '%Y-%m-%d')#paso de string a datetime
        date_end = datetime.strptime(end_date, '%Y-%m-%d')

        prenatal_evaluations = PrenatalEvaluation.search([
                ('evaluation_date','>=',date_start),
                ('evaluation_date','<=',date_end),
                ])

        filtered_data = []

        for x in prenatal_evaluations:
            if x.patient.current_insurance:
                insurance = x.patient.current_insurance.company.name
            else:
                insurance = "False"
            if x.patient.gender:
                evaluation = {
                    'date': str((x.evaluation_date)),
                    'day' : str(x.evaluation_date.strftime('%A')),
                    'health_professional' : str(x.healthprof.name.lastname)+', '+str(x.healthprof.name.name),
                    'age_at_evaluation': relativedelta(x.evaluation_date,x.patient.name.dob).years,
                    'patient_insurance': str(insurance),
                    'patient_chronic': str(x.patient.cronico),
                    'weeks': x.gestational_weeks,
                    'hta':x.hypertension,
                    'diabetes':x.diabetes,
                    'preeclampsia':x.preeclampsia,
                    'sobrepeso':x.overweight,
                    'bmi':x.imc,
                    'diastolic':x.presion_diastolica,
                    'systolic':x.presion_sistolica,
                }

                filtered_data.append(evaluation)
            j_filtered_data = json.dumps(filtered_data)

        return j_filtered_data

#Panel de Odontología
@blueprint.route('/dashboard_odontology', methods=['GET','POST'])
@tryton.transaction()
def dashboard_odontology():
    OdontologyTreatment = tryton.pool.get('gnuhealth.dentistry.treatment')
    start_date = datetime.today()
    start = start_date.date()

    data = []
    odonto_procedures = []

    if request.method == 'GET':
        odonto_treatments = OdontologyTreatment.search([
                ('treatment_date','>=',start-relativedelta(days=15))
                ])
        for record in odonto_treatments:
            if record.procedures:
                    for proc in record.procedures:
                        procedure = {
                            "procedure": str(proc.procedure.name)
                            }
                    odonto_procedures.append(procedure)
            if record.patient.current_insurance:
                insurance = record.patient.current_insurance.company.name
            else:
                insurance = "False"

            if record.patient.gender:
                odontologics = {
                    'date': str((record.treatment_date)),
                    'day' : str(record.treatment_date.strftime('%A')),
                    'health_professional' : str(record.healthprof.name.lastname)+', '+str(record.healthprof.name.name),
                    'patient_age': relativedelta(record.treatment_date,record.patient.name.dob).years,
                    'patient_sex' : str(record.patient.gender),
                    'patient_insurance': str(insurance),
                    'patient_chronic': str(record.patient.cronico),
                    'first_time': record.first_time,
                    'urgency': record.urgency,
                    'attendance': record.attendance,
                    'discharge': record.discharge,
                    'procedures':odonto_procedures,
                }
                data.append(odontologics)
                odonto_procedures = []

        with open("odontology.json", "w") as archivo:
            json.dump(data, archivo)

        return render_template('dashboard_odontology.html',
                            data=data)

    if request.method == 'POST':
        new_data = request.get_json()
        start_date= new_data['start_date']
        end_date = new_data['end_date']
        prof = new_data['professional']

        date_start = datetime.strptime(start_date, '%Y-%m-%d')#paso de string a datetime
        date_end = datetime.strptime(end_date, '%Y-%m-%d')

        license = None

        if not prof:
            odonto_treatments = OdontologyTreatment.search([
                ('treatment_date','>=',start-relativedelta(days=15))
                ])
        else:
            auxiliar = OdontologyTreatment.search([
                    ('treatment_date','>=',date_start),
                    ('treatment_date','<=',date_end+relativedelta(days=1))
                    ])
            for aux in auxiliar:
                h_p = str(aux.healthprof.name.lastname)+", "+str(aux.healthprof.name.name)
                if h_p == prof:
                    license = aux.healthprof.code
                    break

            odonto_treatments = OdontologyTreatment.search([
                    ('treatment_date','>=',date_start),
                    ('treatment_date','<=',date_end+relativedelta(days=1)),
                    ('healthprof.code','=', license)
                    ])

        filtered_data = []

        for record in odonto_treatments:
            if record.procedures:
                    for proc in record.procedures:
                        procedure = {
                            "procedure": str(proc.procedure.name)
                            }
                    odonto_procedures.append(procedure)

            if record.patient.current_insurance:
                insurance = record.patient.current_insurance.company.name
            else:
                insurance = "False"

            if record.patient.gender:
                odontologics = {
                    'date': str((record.treatment_date)),
                    'day' : str(record.treatment_date.strftime('%A')),
                    'health_professional' : str(record.healthprof.name.lastname)+', '+str(record.healthprof.name.name),
                    'patient_age': relativedelta(record.treatment_date,record.patient.name.dob).years,
                    'patient_sex' : str(record.patient.gender),
                    'patient_insurance': str(insurance),
                    'patient_chronic': str(record.patient.cronico),
                    'first_time': record.first_time,
                    'urgency': record.urgency,
                    'attendance': record.attendance,
                    'discharge': record.discharge,
                    'procedures':odonto_procedures,
                }
                filtered_data.append(odontologics)
                odonto_procedures = []
            j_filtered_data = json.dumps(filtered_data)
        return j_filtered_data


#Panel de Pacientes Crónicos
@blueprint.route('/dashboard_chronicles', methods=['GET','POST'])
@tryton.transaction()
def dashboard_chronicles():
    Patient = tryton.pool.get('gnuhealth.patient')

    start_date = datetime.today()
    start = start_date.date()

    data = []
    chronic_conditions = []

    tod = datetime.today()
    today = tod.date()
    m_s_l_v = -1

    if request.method == 'GET':
        patients_chronic = Patient.search([
                ('cronico','=',"Si"),
                ('active','=','True'),
                ])

        for pat in patients_chronic:
            if pat.diseases:
                    for disease in pat.diseases:
                        ecnt_diseases = {
                            "condition": str(disease.pathology.name),
                            "code": str(disease.pathology.code)
                            }
                    chronic_conditions.append(ecnt_diseases)

            if pat.current_insurance:
                insurance = pat.current_insurance.company.name
            else:
                insurance = "False"

            #Calculamos los meses desde la última visita (si no tiene es -1)
            if pat.last_appointment:
                m_s_l_v = (relativedelta(today,pat.last_appointment).years)*12  \
                    + relativedelta(today,pat.last_appointment).months,

            if pat.gender:
                patient_chronic = {
                    'patient_age': relativedelta(today,pat.name.dob).years,
                    'patient_sex' : str(pat.gender),
                    'patient_insurance': str(insurance),
                    'last_appointment': str(pat.last_appointment),
                    'month_since_last_visit': m_s_l_v,
                    'conditions':chronic_conditions,
                }
                data.append(patient_chronic)
                chronic_conditions = []

        with open("patient_chronic.json", "w") as archivo:
            json.dump(data, archivo)

        return render_template('dashboard_chronicles.html',
                            data=data)
