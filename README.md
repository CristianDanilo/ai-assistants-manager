# AI Assistants Manager

Aplicación web profesional para la gestión, configuración y entrenamiento de asistentes de Inteligencia Artificial.  
Permite crear agentes personalizados, definir su comportamiento lógico y simular interacciones en un entorno controlado de pruebas.

---

## Stack Tecnológico

- **Framework:** Next.js 15 (App Router) para un renderizado eficiente y rutas dinámicas.
- **Lenguaje:** TypeScript con tipado estricto para mayor robustez.
- **Gestión de Estado:** Zustand + Persist Middleware para mantener la sesión activa entre recargas.
- **Validación de Formularios:** React Hook Form + Zod para esquemas de validación estrictos.
- **Estilos:** Tailwind CSS + Lucide React para una interfaz moderna y responsive.
- **Animaciones:** Tailwind Animate para transiciones fluidas en modales y flujos.

---

## 🛠️ Instalación y Uso

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/CristianDanilo/c.git](https://github.com/CristianDanilo/c.git)
cd ai-assistants-manager
npm install
npm run dev
```
## Decisiones Técnicas y Arquitectura
- **Zustand & Persistence: Se eligió Zustand por su ligereza y mínima configuración en comparación con Redux. Se implementó persistencia automática en localStorage para simular una base de datos, permitiendo que el usuario no pierda sus asistentes al cerrar el navegador.
- **Validación Multi-paso: Implementación de un flujo de creación dividido en dos pasos. Se utiliza la función trigger() de React Hook Form para validar campos específicos de forma asíncrona antes de permitir al usuario avanzar, mejorando significativamente la UX.
- **Identificadores Únicos: Generación dinámica de IDs mediante crypto.randomUUID() en el momento de la creación, asegurando que cada asistente sea único y evitando conflictos en el renderizado de listas de React.
  
## Características Implementadas
- **Gestión de Asistentes: CRUD completo (Crear, Leer, Actualizar, Eliminar).
- **Validación Lógica: El sistema bloquea la creación si la suma de porcentajes de respuesta (Corto, Medio, Largo) no es exactamente 100%.
- **Simulador de Entrenamiento: Chat interactivo que responde según las reglas configuradas, con simulación de escritura ("typing") y lógica de respuestas aleatorias.
- **UI/UX Avanzada: Dashboard con layout 80/20, Toasts de notificación para acciones exitosas y diálogos de confirmación para eliminar agentes.

## tiempo de Dedicación

- **Arquitectura y Setup:** 30 min.
- **Lógica de Estado y Validaciones:** 1.5 horas.
- **UI y Diseño Responsive:** 1.5 hora.
- **Documentación Final:** 30 min.  
**Total aproximado:** 4 horas de desarrollo activo.

---

