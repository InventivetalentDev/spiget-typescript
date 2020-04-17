const {Spiget} = require("./index");
const spiget = new Spiget("MyExampleSpigetApp");

spiget.getAuthor(6643).then(author => {
    console.log(author);

    author.getResources().then(resources => {
        console.log(resources);
    })
});
