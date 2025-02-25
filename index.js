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
  constructor({ serverURL = null, body = null, headers = null, method = "POST" } = {}) {
    this.serverURL = serverURL;
    this.lastLog = "";
    this.body = body;
    this.method = method;
    this.headers = headers;
    console.log(blueBright(`Logger initialized. ${serverURL ? `Server URL: ${serverURL}` : ""}`));
  }

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
    if (!this.serverURL) {
      throw new Error("No se ha definido la URL del servidor");
    }

    const formattedLog = formatLog(this.lastLog, "info");
    console.log(blueBright(`Sending log to server: ${formattedLog}`));

    try {
      await axios({
        url: this.serverURL,
        method: this.method,
        headers: this.headers,
        data: {
          body: {
            log: formattedLog,
            ...this.body,
          },
        },
      });
    } catch (error) {
      console.error(redBright(`Error sending log to server: ${error.message}`));
    }
    return this;
  }
}

module.exports = { Logger, formatLog };
