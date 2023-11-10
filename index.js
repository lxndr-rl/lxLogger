const axios = require("axios");
const { blueBright, yellowBright, redBright } = require("colorette");

const formatLog = (mensaje, tipo) => {
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Guayaquil", // GMT-5
    hour12: false,
  });

  return `(${tipo.toUpperCase()}) - [${currentTime}]: ${mensaje}`;
};

class Logger {
  constructor() {
    this.tipo = "";
    this.mensaje = "";
  }

  log({ tipo, mensaje }) {
    this.tipo = tipo;
    this.mensaje = mensaje;

    const formattedLog = formatLog(mensaje, tipo);

    switch (tipo.toLowerCase()) {
      case "info":
        console.log(blueBright(formattedLog));
        break;
      case "warning":
        console.warn(yellowBright(formattedLog));
        break;
      case "error":
        console.error(redBright(formattedLog));
        break;
      default:
        console.log(formattedLog);
    }

    return this;
  }

  async sendToServer() {
    // TODO ENVIAR NOTIFICACIÓN WHATSAPP

    this.tipo = "";
    this.mensaje = "";

    return this;
  }
}

module.exports = { Logger };
