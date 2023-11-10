const { Logger } = require("./index");

describe("Logger", () => {
  let logger;
  let consoleLogSpy;
  let consoleWarnSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    // Crea funciones espía para las funciones de consola
    consoleLogSpy = jest.spyOn(console, "log");
    consoleWarnSpy = jest.spyOn(console, "warn");
    consoleErrorSpy = jest.spyOn(console, "error");

    logger = new Logger({
      consoleLog: consoleLogSpy,
      consoleWarn: consoleWarnSpy,
      consoleError: consoleErrorSpy,
    });
  });

  test("log method should console.log with blueBright for info", () => {
    const logObject = {
      tipo: "info",
      mensaje: "Test mensaje",
    };

    logger.log(logObject);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test mensaje")
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("(INFO) -")
    );
  });

  test("log method should console.warn with yellowBright for warning", () => {
    const logObject = {
      tipo: "warning",
      mensaje: "Test mensaje",
    };

    logger.log(logObject);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test mensaje")
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("(WARNING) -")
    );
  });

  test("log method should console.error with redBright for error", () => {
    const logObject = {
      tipo: "error",
      mensaje: "Test mensaje",
    };

    logger.log(logObject);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test mensaje")
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("(ERROR) -")
    );
  });

  test("sendToServer method should reset properties", async () => {
    const sendToServerSpy = jest.spyOn(logger, "sendToServer");

    await logger.sendToServer();

    expect(logger.tipo).toBe("");
    expect(logger.mensaje).toBe("");
    expect(sendToServerSpy).toHaveBeenCalled();
  });
});
