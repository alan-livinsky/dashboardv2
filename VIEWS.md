# Dashboard App Views

## Base Module (`app/base`)

| Route | Template | Description |
|-------|----------|-------------|
| `/` | `layouts/index.html` | Index page |
| `/index` | `layouts/index.html` | Index page |
| `/<template>` | `{template}.html` | Dynamic template rendering |

### Error Pages
| Route | Template | Description |
|-------|----------|-------------|
| `/400` | `page-400.html` | Bad request error |
| `/413` | `page-413.html` | Request entity too large |
| `/404` | `page-404.html` | Not found error |
| `/500` | `page-500.html` | Internal server error |

## Dashboard Module (`app/dashboard`)

| Route | Template | Description |
|-------|----------|-------------|
| `/dashboard` | `dashboard.html` | Main indicators panel |
| `/dashboard_appointments` | `dashboard_appointments.html` | Appointments panel |
| `/dashboard_nursing` | `dashboard_nursing.html` | Nursing care panel |
| `/dashboard_pharmacy` | `dashboard_pharmacy.html` | Pharmacy panel |
| `/dashboard_ambulatory` | `dashboard_ambulatory.html` | Ambulatory care panel |
| `/dashboard_population` | `dashboard_population.html` | Population served panel |
| `/dashboard_ginecology` | `dashboard_ginecology.html` | Gynecology/obstetrics panel |
| `/dashboard_odontology` | `dashboard_odontology.html` | Odontology panel |
| `/dashboard_chronicles` | `dashboard_chronicles.html` | Chronic patients panel |

## Appointments Module (`app/appointments`)

| Route | Template | Description |
|-------|----------|-------------|
| `/turnos` | `layouts/appointments.html` | Main appointments view |
| `/sala_espera` | `layouts/appointments_sala_espera.html` | Waiting room view |
| `/tabla_turnos` | `layouts/partials/appointments_table.html` | Appointments table partial |
| `/seleccionar_consultorio` | `layouts/select_consulting_rooms.html` | Consulting room selector |
| `/carousel_images` | `layouts/partials/carousel.html` | Carousel partial |
| `/get_image/<image_id>` | - | Serve image attachment |

## Total Views: 22
