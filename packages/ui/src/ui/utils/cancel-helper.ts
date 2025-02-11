import axios, {CancelTokenSource} from 'axios';

export default class CancelHelper {
    private tokens: Array<CancelTokenSource> = [];

    removeAllAndSave = (token: CancelTokenSource) => {
        this.removeAllRequests();
        this.saveCancelToken(token);
    };

    saveCancelToken = (token: CancelTokenSource) => {
        this.tokens.push(token);
    };

    removeAllRequests = () => {
        while (this.tokens.length) {
            this.tokens.pop()?.cancel();
        }
    };

    removeAllRequestsAndCreateCancelToken() {
        const source = axios.CancelToken.source();
        this.removeAllAndSave(source);
        return source.token;
    }

    generateNextToken() {
        const source = axios.CancelToken.source();
        this.saveCancelToken(source);
        return source.token;
    }
}

export function isCancelled(e: any) {
    return axios.isCancel(e) || e.code === 'cancelled';
}
