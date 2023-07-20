// TOOD: Add https
export class BackendHandler {
    token: string

    // TODO: add https
    readonly serverAddress: string = 'http://test.xtreamly.io:5001'

    readonly baseApiEndPoint = '/api/v1'

    readonly apiEndpoints = {
        getProxyAccounts: `${this.baseApiEndPoint}/proxy-account/get-my-proxy-accounts`,
        createProxyAccount: `${this.baseApiEndPoint}/proxy-account/create-new-proxy-account`,
    }

    constructor(token: string) {
        this.token = token
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
        const res = await fetch(this.serverAddress + this.apiEndpoints.createProxyAccount, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token,
            },
            body: JSON.stringify({ name: name }),
        });

        if (res.status === 200) {
            console.log('Proxy Account Created')
        }
    }


    // TODO: Add Error Handling
    async getProxyAccounts(count: number, offset?: number) {
        const url = this.serverAddress + this.apiEndpoints.getProxyAccounts + `?count=${count}`;
        if (offset) {
            url + `&offset=${offset}`
        }
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token,
            },
        });

        if (res.status === 200) {
            return await res.json()
        }

    }










}
