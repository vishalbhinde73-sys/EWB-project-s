(() => {
  const output = document.querySelector("#console-output");
  const originalLog = console.log.bind(console);
  const originalError = console.error.bind(console);

  function formatValue(value) {
    if (typeof value === "string") {
      return value;
    }
    if (value instanceof Error) {
      return `${value.name}: ${value.message}`;
    }

    try {
      const formatted = JSON.stringify(value, null, 2);
      return formatted === undefined ? String(value) : formatted;
    } catch {
      return String(value);
    }
  }

  function appendOutput(args, isError) {
    const line = args.map(formatValue).join(" ");
    output.textContent += `${isError ? "Error: " : ""}${line}\n`;
  }

  console.log = (...args) => {
    originalLog(...args);
    appendOutput(args, false);
  };

  console.error = (...args) => {
    originalError(...args);
    appendOutput(args, true);
  };
})();
