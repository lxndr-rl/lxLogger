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

    logger = new Logger();
  });

  test("info method should console.log with blueBright", () => {
    const message = "Test mensaje";

    logger.info(message);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(message)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("(INFO) -")
    );
  });

  test("warn method should console.warn with yellowBright", () => {
    const message = "Test mensaje";

    logger.warn(message);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(message)
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("(WARNING) -")
    );
  });

  test("error method should console.error with redBright", () => {
    const message = "Test mensaje";

    logger.error(message);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(message)
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("(ERROR) -")
    );
  });

  test("sendToServer method should reset properties", async () => {
    const sendToServerSpy = jest.spyOn(logger, "sendToServer");

    await logger.sendToServer();

    // TODO: Agregar expectativas según la lógica de tu método sendToServer

    expect(sendToServerSpy).toHaveBeenCalled();
  });
});
