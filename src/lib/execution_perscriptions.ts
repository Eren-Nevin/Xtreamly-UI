import type { BackendHandler } from "./backend";
import { ExecutionPerscription } from "./models";

export async function createExecutionPermission(
    backendHandler: BackendHandler,
    appletId: string,
    proxyId: string,
    cron: string,
    metadata: string,
    active: boolean = true,
) {

    const newExecutionPerscription = new ExecutionPerscription(
        '0',
        proxyId,
        appletId,
        cron,
        metadata,
        active,
    );


    const res = await backendHandler.createExecutionPerscription(newExecutionPerscription);

    newExecutionPerscription.uid = res;
    return newExecutionPerscription;
}

export async function installApplet(
backendHandler: BackendHandler,
appletId: string,
proxyId: string,
cron: string,
) {
    const eP = await createExecutionPermission(backendHandler, appletId, proxyId, cron, '');
    return eP;
}

