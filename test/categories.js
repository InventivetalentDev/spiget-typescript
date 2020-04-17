const assert = require("assert");
const expect = require("chai").expect;

const {Spiget, Pagination} = require("../index");
const spiget = new Spiget();

describe("CATEGORIES", function () {
    describe("#getCategories()",function () {
        it("should return an array of Category objects",async()=>{
            let categories = await spiget.getCategories()
            expect(categories).to.be.an("Array")
            expect(categories).to.not.be.empty;

            let category = categories[0];
            expect(category).to.be.an("object")
            expect(category).to.include.all.keys("id", "name");
            expect(category.name).to.not.be.empty;
        })
    });
    describe("#getCategories(size=1)",function () {
        it("should return an array with a single Category object",async()=>{
            let categories = await spiget.getCategories(new Pagination(1))
            expect(categories).to.be.an("Array")
            expect(categories).to.have.lengthOf(1);

            let category = categories[0];
            expect(category).to.be.an("object")
            expect(category).to.include.all.keys("id", "name");
            expect(category.name).to.not.be.empty;
        })
    });

    describe("#getCategory(4)",function () {
        it("should return Spigot category", async()=>{
            let category = await spiget.getCategory(4);
            expect(category).to.be.an("object");
            expect(category).to.include.all.keys("id", "name");
            expect(category.name).to.not.be.empty;
            expect(category.id).to.equal(4);
            expect(category.name).to.equal("Spigot");
        })
    })
});
