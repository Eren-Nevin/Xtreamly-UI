export class AppData {
    constructor(
        public authDatas: AuthData[],
        public proxyAccounts: ProxyAccount[],
        public dapps: DApp[],
        public appStoreApps: AppStoreApp[],
        public dynamicAccess: DynamicAccess
    ) { }
}

export class DynamicAccess {
    constructor(
        public code: string
    ) { }
}

export class DApp {
    constructor(
        public name: string,
        public url: string,
        public address: string,
    ) { }
}

export class AppStoreApp {
    constructor(
        public uid: string,
        public name: string,
        public owner: string,
        public developer: string,
        public url: string,
        public logoUrl: string,
        public description: string,
        public shortDescription: string,
        public rating: string,
        public code: string,
        public updates: string,
        public installNotes: string,
        public uninstallNotes: string
    ) { }
}

export class AuthData {
    constructor(
        public did: string,
        public content: string,
        public accessedBy: string[],
        public contractAddress: string,
    ) { }
}
export class ProxyAccount {

    constructor(
        public uid: string,
        public name: string,
        public status: string,
        public mnemonica: string,
        public createdData: string,
        public appId: string,
    ) { }
}

export class Delegation {

    constructor(
        public token: string,
        public amount: string) { }
}
