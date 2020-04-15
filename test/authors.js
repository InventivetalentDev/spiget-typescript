const {Spiget} = require("../index");
const spiget = new Spiget();

spiget.getAuthors().then(a=>{
    console.log(a);
})
