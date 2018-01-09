import { expect } from "chai";
import { windowResized } from "../actions";
import background from "./background";

describe("background reducer", function() {
    it("updates the size to the height and width in the RESIZE action", function() {
        const stateBefore = { width: 1688, height: 950 };
        const action = windowResized(1000, 800);

        expect(background(stateBefore, action)).to.eql({
            width: 1000,
            height: 800
        });
    });

    it("updates the size to the minimum height and width", function() {
        const stateBefore = { width: 1688, height: 950 };
        const action = windowResized(300, 350);
        
        expect(background(stateBefore, action)).to.eql({
            width: 800,
            height: 650
        });
    });
});