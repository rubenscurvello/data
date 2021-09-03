import { CsvOptionsInterface } from "types";
declare class CSV {
    read(path: string, options: CsvOptionsInterface): Promise<unknown>;
    write(path: string, data: any): void;
}
export default CSV;
