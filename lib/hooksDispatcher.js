"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_event_dispatcher_1 = require("appolo-event-dispatcher");
const util_1 = require("./util");
class HooksDispatcher extends appolo_event_dispatcher_1.EventDispatcher {
    once(event, fn, scope, options = {}) {
        super.once(event, fn, scope, options);
    }
    on(event, fn, scope, options) {
        super.on(event, fn, scope, options);
    }
    async fireEvent(event, ...args) {
        if (!this[appolo_event_dispatcher_1.CallbacksSymbol]) {
            return;
        }
        let callbacks = this[appolo_event_dispatcher_1.CallbacksSymbol][event];
        if (!callbacks) {
            return;
        }
        let promises = [];
        for (let i = callbacks.length - 1; i >= 0; i--) {
            let callback = callbacks[i];
            if (!callback || !callback.fn) {
                continue;
            }
            let result = callback.fn.apply((callback.scope || null), args);
            if (util_1.Util.isPromise(result)) {
                if (callback.options.parallel) {
                    promises.push(result);
                }
                else {
                    await result;
                }
            }
            if (callback.options.once) {
                callbacks.splice(i, 1);
            }
        }
        if (promises.length) {
            await Promise.all(promises);
        }
    }
}
exports.HooksDispatcher = HooksDispatcher;
//# sourceMappingURL=hooksDispatcher.js.map