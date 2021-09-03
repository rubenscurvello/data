"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv = __importStar(require("fast-csv"));
const fs = __importStar(require("fs"));
class CSV {
    read(path, options) {
        return new Promise((resolve) => {
            let result = [];
            fs.createReadStream(path)
                .on('error', (error) => {
                console.error(error);
            })
                .pipe(csv.parse({
                headers: true,
                skipRows: options.skipRows,
                maxRows: options.maxRows,
                delimiter: options.delimiter
            }))
                .on('data', (row) => result.push(row))
                .on('end', () => resolve(result));
        });
    }
    write(path, data) {
        const pathCsv = fs.createWriteStream(path);
        const createCsv = csv.write(data, { headers: true }).pipe(pathCsv);
    }
}
const options = {
    skipRows: 0,
    maxRows: 100,
    delimiter: ';'
};
const file = fs.readFileSync(`./dto/estoque.json`).toString();
const json = JSON.parse(file);
const test = new CSV();
test.read('files/ESTOQUE.csv', options).then((resolve) => {
    const keysValues = Object.entries(json);
    const result = resolve.map((result) => {
        let dto = {};
        keysValues.map(([key, value]) => {
            dto[key] = result[value];
        });
        return dto;
    });
    console.log(result);
});
exports.default = CSV;
