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
        public id: string,
        public name: string,
        public url: string,
        public logoUrl: string,
        // This means publisher address
        public address: string,
        public description: string,
        public code: string,
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
        public status: string,
        public code: string,
        public program: string,
        public delegations: Delegation[]) { }
}

export class Delegation {

    constructor(
        public token: string,
        public amount: string) { }
}
