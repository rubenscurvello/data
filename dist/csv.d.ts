import { CsvOptionsInterface } from "types";
declare class CSV {
    read(path: string, options: CsvOptionsInterface): Promise<unknown>;
    write(path: string, data: any): Promise<unknown>;
}
export default CSV;
