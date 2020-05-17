export class Attributes<T extends { id?: number }> {
    constructor(private data: T) {
    }

    get = <K extends keyof T>(key: K): T[K] => this.data[key];

    set = (update: T): void => {
        this.data = {...this.data, ...update}
    }
    getAll = (): T => this.data
}

type TempTypes = {
    name?: string
    id?: number
    isIt?: boolean
    age?: number
}
const attr = new Attributes<TempTypes>({});
attr.get('name');
attr.get('id');
attr.get('isIt');
// attr.get('wrongProp')

