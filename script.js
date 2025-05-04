const puppeteer = require("puppeteer"); // importe puppeteer pour scraper la page
const fs = require("fs"); // importe fs pour ecrire le Json

async function scrapeData() {
    const browser = await puppeteer.launch(); // lancement du navigateur virtuel
    const page = await browser.newPage(); // lancement de la nouvelle page

    await page.goto("https://www.abcbourse.com/cotation/ABCPOu"); // page pointe vers http:// *********.***.**/***/***

    const data = await page.evaluate(() => { //evaluate execute des fonctions dans le contexte de la page comme si on executait directement depuis la con,sole du naviuagetru
        const element = document.querySelector("#lastcx");
        return element ? element.innerText : null;
    });

    const date = new Date();
    const day = date.getFullYear() + "_"+ (date.getMonth() + 1) + "_" + date.getDate(); //creation d'une date pour le nom de fichier json

    // Ecriture de la donnee dans le json
    const donnee = { palmOil: data || "Erreur : Élément non trouvé" };
    fs.writeFileSync(`${day}.json`, JSON.stringify(donnee, null, 2));

    await browser.close();
}

scrapeData();