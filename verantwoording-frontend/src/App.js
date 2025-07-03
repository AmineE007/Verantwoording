import Router from './router/router.js';

export default class App {
    constructor() {
        this.router = new Router();
    }

    init() {
        this.router.init();
    }
}
