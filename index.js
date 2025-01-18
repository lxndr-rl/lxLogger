const { blueBright, yellowBright, redBright } = require("colorette");
const axios = require("axios");

const formatLog = (mensaje, tipo) => {
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Guayaquil",
    hour12: false,
  });

  return `(${tipo.toUpperCase()}) - [${currentTime}]: ${mensaje}`;
};

class Logger {
  constructor() {}

  info(mensaje) {
    const formattedLog = formatLog(mensaje, "info");
    console.log(blueBright(formattedLog));

    return this;
  }

  warn(mensaje) {
    const formattedLog = formatLog(mensaje, "warning");
    console.warn(yellowBright(formattedLog));

    return this;
  }

  error(mensaje) {
    const formattedLog = formatLog(mensaje, "error");
    console.error(redBright(formattedLog));

    return this;
  }

  async sendToServer() {
    // TODO: Agregar lógica para enviar logs al servidor
    return this;
  }
}

module.exports = { Logger, formatLog };
