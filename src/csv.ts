import * as csv from "fast-csv";
import * as fs from "fs";
import { CsvOptionsInterface } from "types";

class CSV {
  read(path: string, options: CsvOptionsInterface) {
    return new Promise((resolve): any => {
      let result: Array<string> = [];
      fs.createReadStream(path)
        .on("error", (error) => {
          console.error(error);
        })
        .pipe(
          csv.parse({
            headers: true,
            skipRows: options.skipRows,
            maxRows: options.maxRows,
            delimiter: options.delimiter,
          })
        )
        .on("data", (row) => result.push(row))
        .on("end", () => resolve(result));
    });
  }

  save(path: string, data: any) {
    // const pathCsv = fs.createWriteStream(path);
    const createCsv = csv.write(data);
  }
}
// const options = {
//   skipRows: 0,
//   maxRows: 100,
//   delimiter: ';'
// }

// const file = fs.readFileSync(`./dto/estoque.json`).toString()
// const json = JSON.parse(file)

// const test = new CSV()
// test.read('files/ESTOQUE.csv', options).then((resolve: any) => {
//   const keysValues = Object.entries(json)
//   const result = resolve.map((result: any) => {
//     let dto: any = {}
//     keysValues.map(([key, value]: any) => {
//       dto[key] = result[value]
//     })
//     return dto
//   })

//   console.log(result)
// })
const json = [
  {
    title: "example glossary",
    GlossDiv: {
      title: "S",
      GlossList: {
        GlossEntry: {
          ID: "SGML",
          SortAs: "SGML",
          GlossTerm: "Standard Generalized Markup Language",
          Acronym: "SGML",
          Abbrev: "ISO 8879:1986",
          GlossDef: {
            para: "A meta-markup language, used to create markup languages such as DocBook.",
            GlossSeeAlso: ["GML", "XML"],
          },
          GlossSee: "markup",
        },
      },
    },
  },
];
const data = new CSV();
const file = data.save("novo.csv", "novo.csv");
export default CSV;
