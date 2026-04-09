========================================================================

GNU Health Web Dashboard
========================================================================

GNU Health Web Dashboard is a tool developed by the Group of Studies in Public Health and Applied Technologies of the Faculty of Engineering of the National University of Entre Ríos (UNER) and the Primary Health Care Center "Humberto D'Angelo" of the city of Paraná, Entre Ríos (Argentina). Martina Berns also participated as part of her internship in the Bioengineering program at UNER.

GNU Health Web Dashboard allows you to visualize information from the GNU Health system. It has information panels where the main processes contemplated in the system are represented.

In this version it is contemplated:
* Appointments
* Ambulatory Care
* Nursing
* Pharmacy
* Gynecology and Obstetrics
* Dentistry
* Population
* Patients with chronic non-communicable diseases

It is based on:
GNU Health (https://www.gnuhealth.org/)
Tryton (https://www.tryton.org/)
Flask (https://flask.palletsprojects.com/en/2.3.x/)
Gunicorn (https://gunicorn.org/)

It is developed with the following languages:
Python
Javascript
HTML
CSS

For the charts it uses the free Chart.js library (see documentation: https://www.chartjs.org/)


****-------------------------------------------Implementation------------------------------------------****

In order to implement the Dashboard you must first have Flask, flask_tryton and Gunicorn installed. To do this you can use your system's apt or pip as appropriate.

Then in the app.py file you must configure the database to connect to and the Tryton configuration file in the corresponding lines. example:

app.config['TRYTON_DATABASE'] = 'DB_NAME'
app.config['TRYTON_CONFIG'] = '/path/..../tryton/server/config/trytond.conf'.

Finally you must launch gunicorn by referencing the "app.py" file. By default gunicorn works on port 5000 and with workers that restart every 30 seconds. This can be modified.

Finally, it is recommended to make gunicorn part of the systemd so that it is configured to start together with the server.

For more information on everything contained in the GNU Healt Dashboard, please consult the documentation available (in Spanish) "Sala de Situación WEB con GNU Health.pdf" available in this development.

========================================================================

GNU Health Patient Caller
========================================================================

GNU Health Patient Caller is a tool developed by the Group of Studies in Public Health and Applied Technologies of the Faculty of Engineering of the National University of Entre Ríos (Argentina) and the Primary Health Care Center "Humberto D'Angelo" of the city of Paraná, Entre Ríos (Argentina).

This development allows professionals using GNU Health to call patients and indicate that they are attending through screens that connect to the proposed web server. In the same can be indicated:

* Patients that the professional is calling
* Patients being attended by the professional

For this development it is also necessary to have the module developed for GNU Health "health_appointment_screen_fiuner".

This tool also makes it possible to display images on the screen with information that is being updated.

This tool also allows information to be displayed on the screen in the form of images. To do this you must save them in the folder "static/images/slideshow" with a recommended resolution of 800w*175h px.

The bell for the call is located in the /multimedia folder.



Homepage
--------

http://ingenieria.uner.edu.ar/grupos/salud_publica/


Download
-------------

https://gitlab.com/gnuhealth_fiuner

Documentation
-------------

See the documentation on the GitLab repository


Support GNU Health Web Dashboard and Patients Caller
---------------------------------------------------
Please contact:

saludpublica@ingenieria.uner.edu.ar
carlos.scotta@uner.edu.ar


Need help to implement GNU Health Web Dashboard or the Patients Caller? 
----------------------------------------------------------------------

We will do our best to help you out with the implementation and training
for the local team, to build local capacity and make your project sustainable.

Please contact us and we'll back to you as soon as possible.


 Thank you !
 Bioing. Scotta Carlos José
 Author
 carlos.scotta@uner.edu.ar


Email
-----
saludpublica@ingenieria.uner.edu.ar
carlos.scotta@uner.edu.ar


License
--------

GNU Health Web Dashboard and Patients Caller is licensed under GPL v3+::


 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
