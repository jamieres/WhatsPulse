A continuación, se detalla el significado de cada mensaje que aparece en consola durante la ejecución del script, organizado según las fases del proceso:

## 1. Inicio del Proceso
	** Sesión previa detectada.
		* Indica que se detectó una sesión previamente almacenada en el directorio ./user_data. Esto significa que hay datos persistentes del navegador listos para restaurar la sesión.

	** LocalStorage restaurado.
		* Los valores de localStorage fueron restaurados en la página de WhatsApp Web.


## 2. Restauración de Sesión
	** Sesión restaurada con éxito.
		* El script detectó que la sesión fue restaurada correctamente. Esto se valida al encontrar el panel lateral de WhatsApp Web (#pane-side).

	** La sesión no se restauró correctamente. Escanea el código QR para iniciar sesión.
		* La restauración de la sesión falló, posiblemente porque las cookies o el almacenamiento local no fueron suficientes. Es necesario escanear el código QR para iniciar una nueva sesión.

	** Escanea el código QR para iniciar sesión...
		* WhatsApp Web está listo para que escanees el código QR y te autentiques en la sesión.
		
	** Sesión iniciada. Todos los datos de sesión se guardarán automáticamente en "user_data".
		* La sesión se inició correctamente y los datos del navegador se guardaron automáticamente en el directorio ./user_data.
		
		
## 3. Proceso de Envío de Mensajes
	** Enviando mensaje a {número}...
		* Indica que el script está preparando el envío del mensaje al número especificado en formato internacional.
		
	** Mensaje enviado a {número}
		* Confirma que el mensaje fue enviado correctamente al destinatario especificado.

	** El mensaje no se confirmó en el chat de {número}.
		* El mensaje fue enviado, pero el script no pudo verificar visualmente en el chat de WhatsApp si fue recibido (esto puede suceder por tiempos de procesamiento en WhatsApp Web).

	** No se encontró el botón de envío para {número}.
		* El script no pudo localizar el botón de envío en la página. Esto puede ocurrir si la página no cargó correctamente o si hubo un problema en el flujo.

	** Preparando el siguiente mensaje
		* Indica una pausa de 15 segundos antes de procesar el siguiente mensaje para simular un uso natural de WhatsApp Web.


## 4. Finalización del Proceso
	** Todos los mensajes han sido procesados.
		* Confirma que el script intentó enviar mensajes a todos los números de la lista.

	** El navegador permanecerá abierto por 1 minuto y luego se cerrará automáticamente.
		* El navegador se mantendrá abierto durante un minuto para inspección o ajustes manuales.

	** Navegador cerrado automáticamente.
		* El navegador se cerró automáticamente después del temporizador de 1 minuto.

## 5. Mensajes de Error
	** El chat no está listo para {número}.
		* El script detectó que el chat del destinatario no estaba disponible, posiblemente por problemas de conexión o porque WhatsApp Web no pudo procesar el número.

	** La sesión no se restauró correctamente.
		* Indica que los datos persistentes no pudieron restablecer la sesión de WhatsApp Web. Es necesario escanear el código QR nuevamente.
