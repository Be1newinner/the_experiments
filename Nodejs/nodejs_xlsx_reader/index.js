const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const XlsxPopulate = require("xlsx-populate");

async function readPasswordProtectedFile(
  passwordStart,
  passwordEnd,
  passwordStep
) {
  let isRead = false;

  for (let i = passwordStart; i <= passwordEnd; i += passwordStep) {
    try {
      const workbook = await XlsxPopulate.fromFileAsync("myFile.xlsx", {
        password: i.toString(),
      });

      workbook.sheets().forEach((sheet) => {
        if (sheet.name()) {
          isRead = true;
          console.log("Password found:", i);
          return;
        }
      });

      if (isRead) break;
    } catch (error) {
      //   console.error("Error:", error.message);
    }
    console.log(i);
  }

  if (!isRead) {
    console.log(
      "Password not found in range:",
      passwordStart,
      "-",
      passwordEnd
    );
  }
}

if (isMainThread) {
  const TOTAL_PASSWORDS = 100000; // Total number of passwords
  const NUM_WORKERS = 4; // Number of worker threads/processes
  const passwordsPerWorker = Math.ceil(TOTAL_PASSWORDS / NUM_WORKERS);

  // Create worker threads
  for (let i = 0; i < NUM_WORKERS; i++) {
    const start = i * passwordsPerWorker + 1;
    const end = Math.min((i + 1) * passwordsPerWorker, TOTAL_PASSWORDS);
    const step = NUM_WORKERS * 2; // Increase step to distribute load more evenly
    const worker = new Worker(__filename, {
      workerData: { start, end, step },
    });
    worker.on("error", (err) => console.error(err));
    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  }
} else {
  const { start, end, step } = workerData;
  readPasswordProtectedFile(start, end, step);
}
