const assert = require("assert");
const should = require("chai").should;
const expect = require("chai").expect;

const {Spiget, Pagination} = require("../index");
console.log(Spiget)
console.log(Pagination)
const spiget = new Spiget();
console.log(spiget);

describe("AUTHORS", function () {
    describe("#getAuthors()",function () {
        it("should return an array of Author objects",async()=>{
            let authors = await spiget.getAuthors()
            expect(authors).to.be.an("Array")
            expect(authors).to.not.be.empty;

            let author = authors[0];
            expect(author).to.be.an("object")
            expect(author).to.include.all.keys("id", "name", "icon");
            // Note: there's currently an author with id -1 called "..." which makes testing for the id a bit awkward
            expect(author.name).to.not.be.empty;
        })
    });
    describe("#getAuthors(size=1)",function () {
        it("should return an array with a single Author object",async()=>{
            let authors = await spiget.getAuthors(new Pagination(1))
            expect(authors).to.be.an("Array")
            expect(authors).to.have.lengthOf(1);

            let author = authors[0];
            expect(author).to.be.an("object")
            expect(author).to.include.all.keys("id", "name", "icon");
            // Note: there's currently an author with id -1 called "..." which makes testing for the id a bit awkward
            expect(author.name).to.not.be.empty;
        })
    });

    describe("#getAuthor(6643)",function () {
        it("should return inventivetalent",async()=>{
            let author = await spiget.getAuthor(6643);
            expect(author).to.be.an("object");
            expect(author).to.include.all.keys("id", "name", "icon");
            expect(author.id).to.equal(6643);
            expect(author.name).to.equal("inventivetalent")
        })
    })
});

// spiget.getAuthors().then(a=>{
//     console.log(a);
// });

// spiget.getAuthor(6643).then(a=>{
//     console.log(a);
// })
