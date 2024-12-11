WhatsPulse es una herramienta automatizada diseñada para enviar mensajes personalizados a múltiples destinatarios a través de WhatsApp Web. Permite enviar mensajes a números registrados y no registrados en la agenda, manejar sesiones persistentes para evitar el escaneo recurrente del código QR, registrar el flujo del procesamiento en un archivo de logs para un seguimiento detallado y verificar la entrega de los mensajes y manejar posibles errores durante el envío.


## Funcionalidades
** 1. Envío de Mensajes a WhatsApp Web
	* Capacidad para enviar mensajes a contactos de WhatsApp Web.
	* El mensaje se envía al número especificado en formato internacional (+54XXXXXXXXXX).
	* Confirmación visual en la consola de que el mensaje fue enviado.
	* Persistencia de sesión a través del almacenamiento de datos persistentes del navegador, incluyendo cookies, almacenamiento local y caché (userDataDir). Evita el escaneo del QR en cada sesión.

** 2. Manejo de Múltiples Destinatarios
	* Se puede enviar un mensaje a una lista de números.
	* Los números son procesados secuencialmente, con un retardo configurable entre cada envío para simular un uso natural.
	* Cierre automático del navegador a través de un temporizador que mantiene el navegador abierto durante 1 minuto después de procesar todos los mensajes. Luego se cierra automáticamente. 

** 3. Validación del Mensaje Enviado
	* Verifica que el mensaje aparece en el chat después de enviarlo.
	* Usa selectores confiables para buscar el contenido del mensaje en el chat.
	* Realiza un reintento si la verificación inicial falla.

** 4. Reintentos Inteligentes
	* Si el mensaje no se confirma en el primer intento, realiza un reintento condicionado.
	* Comprueba si el botón de envío aún está disponible antes de intentar el reenvío.
	* Registra un mensaje de error claro si el reintento también falla.

** 5. Registro Informativo en la Consola
	* Mensajes claros que indican el estado del flujo en cada paso:
	* Inicio de sesión (escaneo del código QR).
	* Envío del mensaje.
	* Verificación del mensaje enviado.
	* Reintento en caso de falla.
	
** 6. Implementación de Logging
	* Centraliza el registro de eventos en log.txt. Esto puede incluir mensajes sobre la restauración de la sesión, el envío de mensajes y cualquier error.
	* Agrega marcas de tiempo (timestamp) a cada mensaje.

** 7. Manejo de Errores
	* Si un chat no está listo o el botón de envío no se encuentra, registra el problema y pasa al siguiente número.
	* Maneja errores como:
		Nodos desconectados.
		Elementos no disponibles.
		Tiempo de espera agotado.

** 8. Uso Seguro
	* Maneja correctamente el ciclo de vida del navegador:
	* Apertura de WhatsApp Web en modo no headless (visible para el usuario).
	* Cierre automático del navegador al finalizar el flujo.

** 9. Personalización del Mensaje
	* Permite definir un mensaje estándar para todos los destinatarios.
	* Es posible modificar el mensaje para adaptarlo a las necesidades futuras (como personalización por destinatario).

** 10. Flujo Robusto y Escalable
	* Diseño modular que facilita agregar nuevas funcionalidades.
	* Escalabilidad para manejar listas más largas de destinatarios o integrar funcionalidades adicionales.

** 11. Prueba de stress
	* Las pruebas se realizaron enviando secuencialmente mensajes a ocho (8) números sin problemas. De todos modos, trata de no abusar de los envíos para evitar baneo. 
	

## Requerimientos
** 1. Sistema Operativo
	* Windows: La implementación actual está diseñada para ser ejecutada en este sistema.

** 2. Herramientas y Dependencias
	* Node.js:
		Necesario para ejecutar el script basado en Puppeteer.
		Versión recomendada: v18.20.5.

	* Puppeteer:
		Librería utilizada para interactuar con WhatsApp Web.
		Instalación: npm install puppeteer

** 3. Archivos del Proyecto
	* send_messages.js: Archivo principal del script que envía mensajes, ubicado en la carpeta raíz del proyecto.

** 4. Configuración del Script
	* Lista de destinatarios:
		El script permite incluir una lista de números telefónicos en formato internacional (ejemplo: 5491131491168).
		Ejemplo dentro del script:
			const numbers = ['549XXXXXXXXXX', '549XXXXXXXXXX'];

	* Mensaje personalizado:
		Define un mensaje a enviar a todos los destinatarios.
		Ejemplo dentro del script:
			const message = 'Hola, este es un mensaje enviado a múltiples destinatarios.';

** 5. Ejecutar el Script
	* Ejecutar el script principal:
		node send_messages.js


## Consideraciones de Uso
** 1. Formato de Números:
	* Asegúrate de que los números estén en formato internacional, incluyendo el prefijo del país.

** 2. Estado de WhatsApp Web:
	* Si WhatsApp Web se desconecta o cierra sesión, será necesario volver a escanear el código QR.

** 3. Límites de WhatsApp:
	WhatsApp puede limitar o bloquear la actividad si detecta un uso inusual (envío masivo en intervalos cortos).

jamieres-at-gmail-dot-com
