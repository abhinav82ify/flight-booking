export interface City {
  name: string;
  code: string;
}

export class City implements City {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  contains(searchText): boolean {
    return (
      this.name.toLowerCase().includes(searchText) ||
      this.code.toLowerCase().includes(searchText)
    );
  }
}
