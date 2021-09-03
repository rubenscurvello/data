import * as csv from 'fast-csv'
import * as fs from 'fs'
import { CsvOptionsInterface } from 'types'

class CSV {
  read(path: string, options: CsvOptionsInterface) {
    return new Promise((resolve): any => {
      let result: Array<string> = []
      fs.createReadStream(path)
        .on('error', (error) => {
          console.error(error)
        })
        .pipe(
          csv.parse({
            headers: true,
            skipRows: options.skipRows,
            maxRows: options.maxRows,
            delimiter: options.delimiter
          })
        )
        .on('data', (row) => result.push(row))
        .on('end', () => resolve(result))
    })
  }

  write(path: string, data: any) {
    const pathCsv = fs.createWriteStream(path)
    const createCsv = csv.write(data, { headers: true }).pipe(pathCsv)
  }
}
const options = {
  skipRows: 0,
  maxRows: 100,
  delimiter: ';'
}

const file = fs.readFileSync(`./dto/estoque.json`).toString()
const json = JSON.parse(file)

const test = new CSV()
test.read('files/ESTOQUE.csv', options).then((resolve: any) => {
  const keysValues = Object.entries(json)
  const result = resolve.map((result: any) => {
    let dto: any = {}
    keysValues.map(([key, value]: any) => {
      dto[key] = result[value]
    })
    return dto
  })

  console.log(result)
})
export default CSV
