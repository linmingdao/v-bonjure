export default class Event {
    constructor(navtabId = '', eventName = '', payload = {}) {
        this.tag = 'V_BASE_CORE';
        this.navtabId = navtabId;
        this.message = { eventName, payload };
    }
}
