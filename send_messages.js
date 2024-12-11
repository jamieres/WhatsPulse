const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const userDataDir = './user_data';
const logFilePath = path.resolve(__dirname, 'log.txt');
const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${message}\n`;
    console.log(message);
    fs.appendFileSync(logFilePath, log, { encoding: 'utf8' });
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir,
    });
    const page = await browser.newPage();
    logMessage('Iniciando proceso de envío de mensajes.');

    await page.goto('https://web.whatsapp.com', { waitUntil: 'networkidle2' });
    logMessage('Navegando a WhatsApp Web.');

    const sessionRestored = await page.waitForSelector('#pane-side', { timeout: 20000 }).catch(() => false);
    if (!sessionRestored) {
        logMessage('La sesión no se restauró correctamente. Escanea el código QR para iniciar sesión.');
        console.log('Escanea el código QR para iniciar sesión...');
        await page.waitForSelector('#pane-side', { timeout: 60000 });
        logMessage('Sesión iniciada manualmente.');
    } else {
        logMessage('Sesión restaurada con éxito.');
    }

    const numbers = ['549XXXXXXXXXX', '549XXXXXXXXXX'];
    const message = 'Hola, este es un mensaje enviado a múltiples destinatarios.';

    for (const number of numbers) {
        logMessage(`Iniciando envío de mensaje a ${number}.`);

        const url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
        await page.goto(url, { waitUntil: 'networkidle2' });

        const errorSelector = 'div[role="alert"]';
        const errorDetected = await page.waitForSelector(errorSelector, { timeout: 5000 }).catch(() => false);
        if (errorDetected) {
            logMessage(`Error: El número ${number} no está registrado en WhatsApp.`);
            continue;
        }

        const inputSelector = 'div[contenteditable="true"]';
        const inputField = await page.waitForSelector(inputSelector, { timeout: 20000 }).catch(() => null);
        if (!inputField) {
            logMessage(`Error: No se encontró el campo de entrada del mensaje para ${number}.`);
            continue;
        }
        await page.focus(inputSelector);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const chatReadySelector = '#main';
        const chatReady = await page.waitForSelector(chatReadySelector, { timeout: 5000 }).catch(() => false);
        if (!chatReady) {
            logMessage(`Error: El chat no está listo para ${number}.`);
            continue;
        }

        const sendButtonSelector = 'button[aria-label="Enviar"]';
        const sendButton = await page.waitForSelector(sendButtonSelector, { timeout: 5000 }).catch(() => null);
        if (sendButton) {
            await sendButton.click();
            await new Promise((resolve) => setTimeout(resolve, 500));
            await page.keyboard.press('Enter');
            logMessage(`Mensaje enviado a ${number}.`);
        } else {
            logMessage(`Error: No se encontró el botón de envío para ${number}.`);
        }

        logMessage(`Esperando antes de enviar el siguiente mensaje.`);
        await new Promise((resolve) => setTimeout(resolve, 15000));
    }

    logMessage('Todos los mensajes han sido procesados.');
    logMessage('El navegador permanecerá abierto por 1 minuto y luego se cerrará automáticamente.');

    await new Promise((resolve) => setTimeout(resolve, 60000));
    await browser.close();
    logMessage('Navegador cerrado automáticamente.');
})();
