import { AppData, AuthData, ProxyAccount, Delegation, DApp, AppStoreApp, DynamicAccess } from '$lib/ProxyAccount';

export async function saveState(authDatas: AuthData[], proxys: ProxyAccount[], dapps: DApp[], appStoreApps: AppStoreApp[], dynamicAccess: DynamicAccess) {
    return await saveData(new AppData(authDatas, proxys, dapps, appStoreApps, dynamicAccess));
}

export async function loadState() {
    let rawRes = await loadData();
    let res = JSON.parse(rawRes);
    let appData = new AppData(res.authDatas, res.proxyAccounts, res.dapps, res.appStoreApps, res.dynamicAccess);
    return appData;
}

export async function saveData(dataToSave) {
    let res: Response = await fetch('http://localhost:3001?save=1', {
        method: 'POST',
        body: JSON.stringify(dataToSave),
        headers: { 'Content-Type': 'application/json' }
    });
    return true;
}

export async function loadData() {
    let rawRes: Response = await fetch('http://localhost:3001', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    let res = await rawRes.json()
    return res;
}
