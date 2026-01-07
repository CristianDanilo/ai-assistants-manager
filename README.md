# AI Assistants Manager

Aplicación web para la gestión, configuración y entrenamiento de asistentes de Inteligencia Artificial.  
Permite crear agentes personalizados, definir su comportamiento y simular interacciones en un entorno controlado.

---

## Stack Tecnológico

- **Framework:** Next.js 15 (App Router) para renderizado eficiente y rutas dinámicas.
- **Lenguaje:** TypeScript con tipado estricto.
- **Gestión de Estado:** Zustand con middleware de persistencia para mantener los datos entre recargas.
- **Validación de Formularios:** React Hook Form + Zod para validaciones robustas y feedback en tiempo real.
- **Estilos:** Tailwind CSS + Lucide React para una interfaz moderna, limpia y responsive.
- **Animaciones:** Tailwind Animate para transiciones fluidas en modales y flujos de interacción.

---

## Características Principales

### 1. Gestión de Asistentes (CRUD Completo)

- **Creación en Pasos:** Modal multi-step que separa información básica y configuración avanzada.
- **Validación Inteligente:** - Campos obligatorios controlados en cada paso.  
  - La distribución de respuestas debe sumar exactamente el 100%.
- **Persistencia Local:** Los asistentes se almacenan en `localStorage`, permitiendo una experiencia continua sin backend en esta fase.

---

### 2. Entrenamiento e Interacción

- **Configuración de Reglas:** Panel dedicado para definir el comportamiento y conocimiento base del asistente.
- **Simulador de Chat:** Entorno interactivo para probar respuestas según tono, idioma y reglas configuradas.
- **Reset de Conversación:** Posibilidad de reiniciar el historial para pruebas desde cero.

---

### 3. Interfaz de Usuario (UI/UX)

- **Layout 80/20:** Dashboard optimizado con panel lateral de acciones rápidas y listado principal detallado.
- **Feedback Visual:** - Toasts para acciones exitosas.  
  - Diálogos de confirmación para acciones críticas como eliminación de agentes.
- **Diseño Responsive:** Adaptado a escritorio y dispositivos móviles.

---

## Arquitectura y Decisiones Técnicas

- **Generación de IDs:** Se utiliza `crypto.randomUUID()` al momento de guardar un asistente, garantizando identificadores únicos y evitando colisiones en listas renderizadas por React.

- **Estrategia de Estado:** Zustand fue elegido sobre Redux por su ligereza, menor boilerplate y facilidad de implementar persistencia, mejorando la mantenibilidad y el rendimiento.

- **Validación por Pasos:** Uso de `trigger()` de React Hook Form para validar campos específicos antes de permitir avanzar al siguiente paso del modal.

---

##  Instalación y Uso

### Clonar el repositorio
```bash
git clone [https://github.com/CristianDanilo/c.git](https://github.com/CristianDanilo/c.git)
cd ai-assistants-manager

### Instalar dependencias
npm install

### Ejecutar en modo desarrollo
npm run dev

