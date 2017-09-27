export class Note{
    id:number;
    date: string;
    notes: string;
    constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}