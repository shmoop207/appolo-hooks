"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const hooksDispatcher_1 = require("../lib/hooksDispatcher");
let should = chai.should();
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
describe("hooks dispatcher", function () {
    it("should wait for hook", async () => {
        let value = 0;
        class EventHandler extends hooksDispatcher_1.HooksDispatcher {
        }
        let a = new EventHandler();
        a.on("test", async (v) => {
            await delay(1);
            value = v;
        });
        await a.fireEvent("test", 5);
        value.should.be.eq(5);
    });
    it("should wait for hook serial", async () => {
        let value = 0;
        class EventHandler extends hooksDispatcher_1.HooksDispatcher {
        }
        let a = new EventHandler();
        a.on("test", async (v) => {
            await delay(3);
            value = 1;
        });
        a.on("test", async (v) => {
            await delay(1);
            value = 2;
        });
        await a.fireEvent("test", 5);
        value += 10;
        value.should.be.eq(12);
    });
    it("should wait for hook parallel", async () => {
        let value = 0;
        class EventHandler extends hooksDispatcher_1.HooksDispatcher {
        }
        let a = new EventHandler();
        a.on("test", async (v) => {
            await delay(3);
            value = 1;
        }, null, { parallel: true });
        a.on("test", async (v) => {
            await delay(1);
            value = 2;
        }, null, { parallel: true });
        await a.fireEvent("test", 5);
        value.should.be.eq(1);
    });
});
//# sourceMappingURL=unit.js.map