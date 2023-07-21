import { Applet, ExecutionPerscription, ExecutionStatus, ProxyAccount, SupportedChains } from "./models"

// TOOD: Add https
export class BackendHandler {
    readonly adapter: DataAdapter

    authToken: string

    // TODO: add https
    readonly serverAddress: string = 'http://test.xtreamly.io:5001'

    readonly baseApiEndPoint = '/api/v1'

    readonly proxyAccountEndpoints = {
        getProxyAccounts: `${this.baseApiEndPoint}/proxy-account/get-my-proxy-accounts`,
        createProxyAccount: `${this.baseApiEndPoint}/proxy-account/create-new-proxy-account`,
        getProxyAccountAddress: `${this.baseApiEndPoint}/proxy-account/get-address-for-proxy-account`,
        changeProxyAccountExecutionStatus: `${this.baseApiEndPoint}/proxy-account/change-proxy-account-execution-status`,
    }

    readonly appletEndpoints = {
        getAllApplets: `${this.baseApiEndPoint}/applets/get-all-applets`,
        getAllMyApplets: `${this.baseApiEndPoint}/applets/get-all-my-applets`,
        publishNewApplet: `${this.baseApiEndPoint}/applets/publish-new-applet`,
    }

    // TODO: Tell backend to create a new execution perscription endpoint
    readonly executionPerscriptionEndpoints = {
        // getAllExecutions: `${this.baseApiEndPoint}/executions/get-all-executions`,
        createExectuionPerscription: `${this.baseApiEndPoint}/applets/create-execution-perscription`,
    }

    constructor(authToken: string) {
        this.authToken = authToken
        this.adapter = new DataAdapter()
    }

    // loadTokenFromStorage() {
    //     const savedToken = localStorage.getItem('token');
    //     if (savedToken) {
    //         this.token = savedToken
    //     } else {
    //         throw new Error('No token found in local storage')
    //     }
    // }
    //

    // TODO: Add Error Handling
    async createProxyAccount(name: string) {
        const res = await fetch(this.serverAddress + this.proxyAccountEndpoints.createProxyAccount, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authToken,
            },
            body: JSON.stringify({ name: name }),
        });

        if (res.status === 200) {
            console.log('Proxy Account Created')
            console.log(res);
        }
    }


    // TODO: Add Error Handling
    async getProxyAccounts(count: number, offset?: number) {
        const url = this.serverAddress + this.proxyAccountEndpoints.getProxyAccounts + `?count=${count}`;
        if (offset) {
            url + `&offset=${offset}`
        }
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.authToken,
                },
            });

            if (res.status === 200) {
                const rawRes = await res.json()
                console.log(rawRes)
                return this.adapter.convertReceivedProxyAccounts(rawRes['data']);
            } else {
                console.error('Error fetching proxy accounts')
                return [];
            }
        } catch (e) {
            console.error(e)
            return [];
        }

    }

    async getProxyAccountAddress(uid: string, chain: SupportedChains) {
        const res = await fetch(this.serverAddress + this.proxyAccountEndpoints.getProxyAccountAddress + `?chain=${chain}&ProxyAccountId=${uid}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.authToken,
            }
        });

        if (res.status === 200) {
            const rawRes = await res.json()
            console.log(rawRes)
            return rawRes['data'];
        }
    }

    // TODO: Doesn't work. Says user is not the owner of the proxy account
    async changeProxyAccountExecutionStatus(uid: string, status: ExecutionStatus) {
        try {
            const res = await fetch(this.serverAddress + this.proxyAccountEndpoints.changeProxyAccountExecutionStatus + `?proxyId=${uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.authToken,
                },
                body: JSON.stringify(status),
            });
            if (res.status === 200) {
                const rawRes = await res.json()
                console.log(rawRes)
                return rawRes['data'];
            }
            else {
                console.error('Error changing proxy account execution status')
                console.error(await res.text())
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    // Applets
    //

    async getAllApplets(count: number, offset?: number) {
        const url = this.serverAddress + this.appletEndpoints.getAllApplets + `?count=${count}`;

        if (offset) {
            url + `&offset=${offset}`
        }
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authToken,
            },
        });

        if (res.status === 200) {
            const rawRes = await res.json()
            console.log(rawRes)
            const applets = this.adapter.convertReceivedApplets(rawRes['data']);
            return applets;
        }
        else {
            console.error('Error fetching applets')
            return [];
        }

    }

    // TODO: Add get my applets
    async getMyApplets(count: number, offset?: number) {
        const url = this.serverAddress + this.appletEndpoints.getAllMyApplets + `?count=${count}`;
        if (offset) {
            url + `&offset=${offset}`
        }
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.authToken,
                },
            });

            if (res.status === 200) {
                const rawRes = await res.json()
                console.log(rawRes)
                return this.adapter.convertReceivedApplets(rawRes['data']);
            }
        } catch (e) {
            console.error(e)
            return [];
        }
    }

    async publishNewApplet(applet: Applet) {
        try {
            const serializedApplet = JSON.stringify(this.adapter.convertAppletForSending(applet));

            console.log(serializedApplet);
            const res = await fetch(this.serverAddress + this.appletEndpoints.publishNewApplet, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.authToken,
                },
                body: serializedApplet,
            });

            if (res.status === 200) {
                const rawRes = await res.json()
                console.log(rawRes)
                // This is the uid of generated applet
                return rawRes['data'];
            } else {
                console.error('Error publishing new applet')
                console.error(await res.text())
            }
        } catch (e) {
            console.error(e)
        }
    }

    // TODO: Implement
    async getAllExecutionPerscriptions(count: number, offset?: number) {
    }

    async createExecutionPerscription(perscription: ExecutionPerscription) {
        try {
            const serializedPerscription = JSON.stringify(perscription);

            const res = await fetch(this.serverAddress + this.executionPerscriptionEndpoints.createExectuionPerscription, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.authToken,
                },
                body: serializedPerscription,
            });

            if (res.status === 200) {
                const rawRes = await res.json()
                console.log(rawRes)
                // This is the uid of generated perscription
                return rawRes['data'];
            }
        } catch (e) {
            console.error(e)
        }


    }


}

export class DataAdapter {
    constructor() { }

    convertReceivedProxyAccounts(rawData: any[]) {
        const proxyAccounts = rawData.map((rawProxyAccount: any) => {
            return new ProxyAccount(
                rawProxyAccount.id,
                rawProxyAccount.name,
                rawProxyAccount.executionStatus,
                rawProxyAccount.mnemonica,
                rawProxyAccount.creationDate,
                rawProxyAccount.active,
            )
        })

        return proxyAccounts
    }

    // applet uid should be zero, although it is not used
    convertAppletForSending(applet: Applet) {
        const rawApplet = {
            script: applet.script,
            appletVisibility: applet.visibility,
            metadata: JSON.stringify({
                name: applet.name,
                developer: applet.developer,
                url: applet.url,
                logoUrl: applet.logoUrl,
                description: applet.description,
                shortDescription: applet.shortDescription,
                rating: applet.rating,
                updates: applet.updates,
                installNotes: applet.installNotes,
                uninstallNotes: applet.uninstallNotes,
            }),
        }
        return rawApplet
    }

    convertReceivedApplets(rawData: any[]) {
        const applets = rawData.map((rawApplet: any) => {
            let metaData = {
                name: '',
                developer: '',
                url: '',
                logoUrl: '',
                description: '',
                shortDescription: '',
                rating: '',
                updates: '',
                installNotes: '',
                uninstallNotes: '',
            };
            try {
                metaData = JSON.parse(rawApplet.metadata);
            } catch (e) {
                console.warn(e);

            }

            return new Applet(
                rawApplet.id,
                rawApplet.script,
                rawApplet.owner,
                rawApplet.visibility,
                rawApplet.appletType,
                metaData.name,
                metaData.developer,
                metaData.url,
                metaData.logoUrl,
                metaData.description,
                metaData.shortDescription,
                metaData.rating,
                metaData.updates,
                metaData.installNotes,
                metaData.uninstallNotes,
            )
        });

        return applets;
    }



}
