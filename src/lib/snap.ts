//
// export const promptMetaMask = async () => {
//     const res = await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
//     return res[0];
// };
//
// export const getCurrentSnaps = async () => {
//     return await window.ethereum.request({
//         method: 'wallet_getSnaps'
//     });
// };
//
//
// /* 
// Used for connecting to a snap. You need to provide the snap address which is the url of the snap with "local:" or "npm:" prepended to it. 
// For example local:http://localhost:8090
// */
// export const connectToSnap = async (snapAddress: string) => {
//     const res = await window.ethereum.request({
//         method: 'wallet_requestSnaps',
//         params: { [snapAddress]: {} }
//     });
//     return res;
// };
//
// export const callSnap = async () => {
//     const res = await window.ethereum.request({
//         method: 'wallet_snap',
//         params: { snapId: 'local:http://localhost:8090', request: { method: 'open' } }
//     });
//     return res;
// };
