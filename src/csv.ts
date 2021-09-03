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

  write(path: string, data: any) {
    const stream = csv.format({
      delimiter: ",",
      escape: '"',
      headers: Object.keys(data[0]),
      quoteColumns: true,
      quoteHeaders: true,
      writeHeaders: true,
    });
    stream.pipe(fs.createWriteStream(path));

    for (const entity of data) {
      stream.write(entity);
    }

    stream.end();
  }
}

export default CSV;
