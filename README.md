Stack Tecnológico
Framework: Next.js 15 (App Router) para un renderizado eficiente y rutas dinámicas.

Gestión de Estado: Zustand con middleware de Persistencia, garantizando que los datos sobrevivan a recargas del navegador.

Validación de Formularios: React Hook Form + Zod para esquemas de validación estrictos y manejo de errores en tiempo real.

Estilos: Tailwind CSS + Lucide React para una interfaz moderna, limpia y responsive.

Animaciones: Tailwind Animate para transiciones fluidas en modales y flujos.

Características Principales
1. Gestión de Asistentes (CRUD completo)
Creación en Pasos: Modal multi-step que separa la información básica de la configuración lógica.

Validación Inteligente: El sistema impide avanzar si los datos obligatorios faltan o si la distribución de respuestas no suma exactamente el 100%.

Persistencia Local: Los asistentes se almacenan en el localStorage, permitiendo una experiencia de usuario continua sin necesidad de base de datos externa en esta fase.

Entrenamiento e Interacción
Configuración de Reglas: Panel dedicado para definir el comportamiento y "conocimiento" de cada asistente.

Simulador de Chat: Entorno de pruebas interactivo con respuestas simuladas, permitiendo validar el tono y las instrucciones configuradas.

Reset de Conversación: Capacidad de reiniciar el hilo de mensajes para realizar pruebas desde cero.

Interfaz de Usuario (UI/UX)
Layout 80/20: Diseño de dashboard optimizado con barra lateral de acciones rápidas y listado principal detallado.

Feedback Visual: Notificaciones (Toasts) tras acciones exitosas y diálogos de confirmación para acciones críticas como la eliminación de agentes.

Arquitectura y Decisiones Técnicas
Generación de IDs: Se implementó crypto.randomUUID() en el momento del guardado para garantizar identificadores únicos globales, evitando colisiones de llaves en el renderizado de listas de React.

Estrategia de Estado: Se eligió Zustand sobre Redux por su ligereza y facilidad para implementar persistencia, reduciendo el "boilerplate" y mejorando el rendimiento.

Validación de Paso 1: Uso de trigger() de React Hook Form para validar campos específicos antes de permitir que el usuario avance al siguiente paso del modal.

Instalación y Uso
Clonar el repositorio:

Bash

git clone https://github.com/CristianDanilo/c.git
cd ai-assistants-manager
Instalar dependencias:

Bash

npm install
Ejecutar en modo desarrollo:

Bash

npm run dev
Abrir el navegador: Visita http://localhost:3000

Requisitos del Proyecto Cumplidos
[x] Listar asistentes.

[x] Crear asistente (Nombre, Idioma, Tono).

[x] Configurar distribución de respuestas (Suma 100%).

[x] Habilitar/Deshabilitar audio.

[x] Editar y Eliminar (con confirmación).

[x] Pantalla de entrenamiento con información del asistente.

[x] Chat simulado con lógica de respuesta y reset.

Desarrollado por Cristian Danilo Tobón Marulanda.