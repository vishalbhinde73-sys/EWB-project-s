(() => {
  const form = document.querySelector("#prompt-inputs");
  const output = document.querySelector("#console-output");
  const status = document.querySelector("#run-status");
  const scriptFile = form.dataset.script;
  const inputNames = Array.from(form.querySelectorAll("[name]"), (input) => input.name);
  const params = new URLSearchParams(window.location.search);
  const hasSubmittedInputs = inputNames.every((name) => params.has(name));

  for (const input of form.querySelectorAll("[name]")) {
    if (params.has(input.name)) {
      input.value = params.get(input.name);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextUrl = new URL(window.location.href);
    nextUrl.search = "";
    for (const input of form.querySelectorAll("[name]")) {
      nextUrl.searchParams.set(input.name, input.value);
    }
    window.location.href = nextUrl.href;
  });

  if (!hasSubmittedInputs) {
    return;
  }

  const promptValues = inputNames.map((name) => params.get(name));
  window.prompt = () => promptValues.shift() ?? null;

  window.onerror = (message) => {
    status.textContent = `The script stopped: ${message}`;
    output.textContent += `Error: ${message}\n`;
  };

  const script = document.createElement("script");
  script.src = scriptFile;
  script.onload = () => {
    status.textContent = "Done. Output is shown below and in the browser console.";
  };
  script.onerror = () => {
    status.textContent = `Could not load ${scriptFile}. Check that it is in the same folder.`;
  };
  status.textContent = "Running...";
  document.body.append(script);
})();
