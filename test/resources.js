const assert = require("assert");
const should = require("chai").should;
const expect = require("chai").expect;

const {Spiget, Pagination} = require("../index");
const spiget = new Spiget();

describe("RESOURCES", function () {
    describe("#getResources()",function () {
        it("should return an array of Resource objects",async()=>{
            let resources = await spiget.getResources()
            expect(resources).to.be.an("Array")
            expect(resources).to.not.be.empty;

            let resource = resources[0];
            expect(resource).to.be.an("object")
            expect(resource).to.include.all.keys("id", "name", "tag");
            expect(resource.name).to.not.be.empty;
            expect(resource.tag).to.not.be.empty;
        })
    });
    describe("#getResources(size=1)",function () {
        it("should return an array with a single Resource object",async()=>{
            let resources = await spiget.getResources(new Pagination(1))
            expect(resources).to.be.an("Array")
            expect(resources).to.have.lengthOf(1);

            let resource = resources[0];
            expect(resource).to.be.an("object")
            expect(resource).to.include.all.keys("id", "name", "tag");
            expect(resource.name).to.not.be.empty;
        })
    });
});
