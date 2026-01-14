# 💬 ChatApp – Mobile Application

ChatApp es una aplicación móvil de mensajería desarrollada como proyecto en evolución, enfocada en una arquitectura escalable y extensible. Actualmente se encuentra en una versión estable inicial, con funcionalidades básicas de chat y una base sólida para futuras mejoras.

La aplicación consume una API desarrollada en **Node.js**.

> ⚠️ **Nota:** Esta no es una versión de producción. Es la versión estable actual mientras se continúan implementando nuevas funcionalidades.

---

## 🚀 Funcionalidades actuales

Por el momento, la aplicación cuenta con funcionalidades limitadas orientadas a validar la arquitectura y el flujo básico de mensajería:

- Obtención de usuarios por nombre  
  *(solución temporal mientras se implementa autenticación)*
- Listado de chats asociados a un usuario
- Obtención de mensajes por chat
- Envío de mensajes de texto

> El sistema **aún no implementa comunicación en tiempo real**. La mensajería funciona mediante peticiones HTTP tradicionales.

---

## 🧩 Funcionalidades pendientes / en desarrollo

Las siguientes características están planificadas para futuras versiones:

1. Autenticación de usuarios
2. Mensajería en tiempo real mediante **sockets**
3. Conversión de voz a texto
4. Envío de mensajes de audio
5. Envío de dibujos dentro del chat
6. Animaciones específicas de la aplicación
7. Chats grupales

---

## 🏗️ Arquitectura

ChatApp utiliza la **misma arquitectura base que RouteCrafter**, lo que permite:

- Separación clara de responsabilidades
- Escalabilidad del proyecto
- Facilidad para añadir nuevas funcionalidades
- Mantenimiento y evolución progresiva del código

---

## 🔗 Backend

La aplicación consume un backend desarrollado en **Node.js**, el cual expone las rutas necesarias para:

- Gestión de usuarios
- Gestión de chats
- Gestión de mensajes

El backend también se encuentra en una fase de desarrollo activo.

---

## 📌 Estado del proyecto

- ✅ Versión estable inicial
- 🚧 En desarrollo activo
- ❌ No lista para producción

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia correspondiente definida por el autor.
