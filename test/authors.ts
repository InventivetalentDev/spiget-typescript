import { expect } from "chai";
import { Spiget, Pagination } from "../index";

describe("AUTHORS", () => {
    const spiget = new Spiget();

    describe("#getAuthors()", () => {
        it("should return an array of Author objects", async () => {
            let authors = await spiget.getAuthors()
            expect(authors).to.be.an("Array")
            expect(authors).to.not.be.empty;

            let author = authors[0];
            expect(author).to.be.an("object")
            expect(author).to.include.all.keys("id", "name", "icon");
            // Note: there's currently an author with id -1 called "..." which makes testing for the id a bit awkward
            expect(author.name).to.not.be.empty;
        });
    });

    describe("#getAuthors(size=1)", () => {
        it("should return an array with a single Author object", async () => {
            let authors = await spiget.getAuthors(new Pagination(1))
            expect(authors).to.be.an("Array")
            expect(authors).to.have.lengthOf(1);

            let author = authors[0];
            expect(author).to.be.an("object")
            expect(author).to.include.all.keys("id", "name", "icon");
            // Note: there's currently an author with id -1 called "..." which makes testing for the id a bit awkward
            expect(author.name).to.not.be.empty;
        });
    });

    const authorsToTest: { id: number, name: string }[] = [
        { id: 6643, name: "inventivetalent" },
        { id: 342233, name: "iHDeveloper" }
    ];

    for (const authorToTest of authorsToTest) {
        describe(`#getAuthor(${authorToTest.id})`, () => {
            it(`should return ${authorToTest.name}`, async () => {
                let author = await spiget.getAuthor(authorToTest.id);
                expect(author).to.be.an("object");
                expect(author).to.include.all.keys("id", "name", "icon");
                expect(author.id).to.equal(authorToTest.id);
                expect(author.name).to.equal(authorToTest.name);
            });
        });
    }

});
