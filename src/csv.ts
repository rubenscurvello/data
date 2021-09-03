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

  async write(path: string, data: any) {
    return new Promise(async (resolve): Promise<void> => {
      const buffer = fs.createWriteStream(path);

      const stream = csv.format({
        delimiter: ",",
        escape: '"',
        headers: Object.keys(data[0]),
        quoteColumns: true,
        quoteHeaders: true,
        writeHeaders: true,
      });

      stream.pipe(buffer);

      for (const entity of data) {
        stream.write(entity);
      }

      stream.end();

      resolve(true);
    });
  }
}

export default CSV;
