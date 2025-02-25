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
  constructor({ serverURL = null, body = null, headers = null, message = "", messageVar = "{message}", method = "POST" } = {}) {
    this.serverURL = serverURL;
    this.lastLog = "";
    this.body = body;
    this.method = method;
    this.headers = headers;
    this.message = message;
    this.messageVar = messageVar;
    console.log(blueBright(`Logger initialized. ${serverURL ? `Server URL: ${serverURL}` : ""}`));
  }

  info(mensaje) {
    const formattedLog = formatLog(mensaje, "info");
    this.lastLog = formattedLog;
    console.log(blueBright(formattedLog));

    return this;
  }

  warn(mensaje) {
    const formattedLog = formatLog(mensaje, "warning");
    this.lastLog = formattedLog;
    console.warn(yellowBright(formattedLog));

    return this;
  }

  error(mensaje) {
    const formattedLog = formatLog(mensaje, "error");
    this.lastLog = formattedLog;
    console.error(redBright(formattedLog));

    return this;
  }

  async sendToServer() {
    if (!this.serverURL) {
      throw new Error("No se ha definido la URL del servidor");
    }

    const formattedLog = formatLog(`Sending log to server: ${this.lastLog}`, "info");
    console.log(blueBright(formattedLog));

    try {
      await axios({
        url: this.serverURL,
        method: this.method,
        headers: this.headers,
        data: {
          body: JSON.stringify(JSON.parse(this.body.replace(this.messageVar, this.lastLog))),
        },
      });
    } catch (error) {
      console.error(JSON.stringify(JSON.parse(this.body.replace(this.messageVar, this.lastLog))))
      console.error(redBright(`Error sending log to server: ${error.message}`));
    }
    return this;
  }
}

module.exports = { Logger, formatLog };
