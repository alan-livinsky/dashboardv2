###########################################################
#Turnos en Pantalla: Mostramos los turnos que están siendo llamado,
# en atención y los siguientes
###########################################################
from io import BytesIO

from app import tryton
from app.appointments import blueprint

from flask import render_template, request, send_file

from datetime import datetime, date, time

import pytz
import json
import hashlib


def obtener_imagenes():
    Configuration = tryton.pool.get('gnuhealth.appointment.screen.configuration')
    # Obtener configuración de imágenes
    configs = Configuration.search([], limit=1)
    config = configs[0] if configs else None
    images = []
    if config and config.images:
        images = [c for c in config.images if c.activate == True]
        images = sorted(images, key=lambda x: x.sequence)
    return images

def obtener_turnos(consulting_rooms=[]):
    Appointment = tryton.pool.get('gnuhealth.appointment')
    Institution = tryton.pool.get('gnuhealth.institution')
    Company = tryton.pool.get('company.company')

    print(datetime.today())
    institution = Institution(1).rec_name
    # Inicio y finalización de hoy
    company = Company(1)
    local_tz = pytz.timezone(company.timezone)  # 'America/Argentina/Buenos_Aires'

    # Fecha local actual
    local_today = datetime.now(local_tz).date()

    # Inicio y fin del día en horario local
    local_min = local_tz.localize(datetime.combine(local_today, time.min))  # 00:00:00 local
    local_max = local_tz.localize(datetime.combine(local_today, time.max))  # 23:59:59.999999 local
    today = local_tz.localize(datetime.combine(local_today, time.max))
    # Convertir a UTC para hacer la búsqueda correcta
    min_date = local_min.astimezone(pytz.UTC)
    max_date = local_max.astimezone(pytz.UTC)
    today = local_today

    # Buscar turnos del día (en horario local, convertido a UTC)

    appointments = []
    clause1 = [
        ('appointment_date', '>=', min_date),
        ('appointment_date', '<', max_date),
        ('state', 'in', ['confirmed']),
        ]
    clause2 = [
        ('appointment_date', '>=', min_date),
        ('appointment_date', '<', max_date),
        ('calling', '=', True),
        ]
    clause3 = [
        ('appointment_date', '>=', min_date),
        ('appointment_date', '<', max_date),
        ('attending', '=', True),
        ]

    for clause in [clause1, clause2, clause3]:
        if consulting_rooms:
            clause.append(('consulting_room', 'in', consulting_rooms))
        appointments += Appointment.search(clause)

    appointments  = list(set(appointments))
    total = len(appointments)
    print(min_date, max_date)

    return today, appointments, institution, total


@blueprint.route('/select_consulting_rooms')
@tryton.transaction()
def select_consulting_rooms():
    consulting_rooms = []
    today, appointments, institution, _ = obtener_turnos()
    print(today, appointments, institution)

    if appointments:
        consulting_rooms = [
                {
                    'id': app.consulting_room.id,
                    'name': app.consulting_room.name
                } for app in appointments if app.consulting_room]

        consulting_rooms = [json.dumps(cr)  for cr in consulting_rooms]
        consulting_rooms = list(set(consulting_rooms))
        consulting_rooms = [json.loads(cr)  for cr in consulting_rooms]

    return render_template('layouts/select_consulting_rooms.html',
                           consulting_rooms=consulting_rooms,
                           institution=institution,
                           today=today)

@blueprint.route('/tabla_turnos')
@tryton.transaction()
def tabla_turnos():
    consulting_rooms = request.args.getlist('cr')
    print(consulting_rooms)
    if consulting_rooms:
        consulting_rooms = [int(cr) for cr in consulting_rooms]
    else:
        consulting_rooms = []
    _, appointments, _, _ = obtener_turnos(consulting_rooms)
    return render_template('layouts/partials/appointments_table.html',
                           appointments=appointments)

@blueprint.route('/turnos', methods=['GET','POST'])
@tryton.transaction()
def appointments():
    consulting_rooms = request.args.getlist('consulting_rooms')
    print(consulting_rooms)
    if consulting_rooms:
        consulting_rooms = [int(cr) for cr in consulting_rooms]
    else:
        consulting_rooms = []
    images = obtener_imagenes()
    today, appointments, institution, total = obtener_turnos(consulting_rooms)

    return render_template('layouts/appointments.html',
                           today=today,
                           appointments=appointments,
                           institution=institution,
                           total=total,
                           images=images)

@blueprint.route('/sala_espera')
@tryton.transaction()
def sala_espera():
    consulting_rooms = request.args.getlist('consulting_rooms')
    if consulting_rooms:
        consulting_rooms = [int(cr) for cr in consulting_rooms]
    else:
        consulting_rooms = []
    today, appointments, institution, total = obtener_turnos(consulting_rooms)
    return render_template('layouts/appointments_sala_espera.html',
                           today=today,
                           appointments=appointments,
                           institution=institution,
                           total=total)

@blueprint.route('/get_image/<int:image_id>')
@tryton.transaction()
def get_image(image_id):
    Attachment = tryton.pool.get('ir.attachment')
    try:
        attachment = Attachment.browse([image_id])[0]
    except:
        return "Imagen no encontrada", 404

    # Obtener los datos binarios del archivo
    file_data = BytesIO(attachment.data)

    # Determinar el tipo MIME
    mimetype = 'application/octet-stream'  # Valor por defecto
        # Intentar adivinar el tipo por la extensión si no hay type
    if '.' in attachment.name:
        extension = attachment.name.split('.')[-1].lower()
        if extension in ['jpg', 'jpeg']:
            mimetype = 'image/jpeg'
        elif extension == 'png':
            mimetype = 'image/png'
        elif extension == 'gif':
            mimetype = 'image/gif'

    return send_file(
        file_data,
        mimetype=mimetype,
        as_attachment=False,
        download_name=attachment.name)


@blueprint.route('/carousel_images')
@tryton.transaction()
def carousel_images():
    images = obtener_imagenes()

    # ✅ Hash estable: incluye ID + fecha de modificación si existe
    ids = []
    for img in images:
        write_date = getattr(img.image, 'write_date', None)
        duration = getattr(img, 'duration', None)
        ids.append(f"{img.image.id}-{write_date or ''}-{duration or ''}")
        print(duration)

    joined = '|'.join(ids)
    hash_value = hashlib.md5(joined.encode()).hexdigest()
    print(hash_value)
    return render_template('layouts/partials/carousel.html',
                           images=images,
                           hash_value=hash_value)
