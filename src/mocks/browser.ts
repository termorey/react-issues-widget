import { setupWorker } from "msw";
import { handlers } from "./handlers.ts";

const worker = setupWorker(...handlers);

export const startMockServer = () => {
	worker.start().catch((e) => console.error(e));
};
