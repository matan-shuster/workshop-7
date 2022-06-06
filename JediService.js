const fs = require('fs').promises;
const jediFile = 'jedi_list.json';

async function replaceJedi(jediId, jedi) {
    //TODO write logic replacing jedi by it's id with newly passed jedi
    const jediList = await getAll();
    jediList[jediId] = jedi;
    await writeJediFile(jediList);
}

async function deleteJedi(id) {
    //TODO Delete jedi by given id in our file
    let data = await readJediFile()
    const index = data.findIndex(jedi => jedi.id === id)
    if(index === -1) {
        return false;
    }
    else{
        data.splice(index, 1)
        await writeJediFile(data);
        return ("Jedi deleted");
    }

}

async function getAll() {
    //TODO obtain all saved jedis and return it to callee
    let data = await readJediFile();
    return data;
}

async function addJedi(jedi) {
    let data = await readJediFile();
    if (!data) {
        data = [];
    }
    data.push(jedi);
    await writeJediFile(data);
}

async function getJedi(id) {
    const data = await readJediFile();
    return data.find((value) => value.id === id);
}

async function readJediFile() {
    try {
        const data = await fs.readFile(jediFile);
        return JSON.parse(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

async function writeJediFile(content) {
    try {
        await fs.writeFile(jediFile, JSON.stringify(content));
    } catch (error) {
        console.error(`Failed to write to file ${error.message}`);
    }
}

async function darkSide(){
    const data = await readJediFile();
    const darkSide = data.indexOf(jedi => jedi.name.includes("Anakin Skywalker"));
    console.log(data[darkSide]);
    data[darkSide].name = "Darth Vader";
    await writeJediFile(data);
}

module.exports = {
    addJedi,
    getJedi,
    getAll,
    replaceJedi,
    deleteJedi,
    darkSide
};