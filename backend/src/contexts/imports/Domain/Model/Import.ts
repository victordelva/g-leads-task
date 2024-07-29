export default class Import {
  id: string
  data: { [key: string]: string | number | boolean | Date }[]
  constructor({ id, data }: { id: string; data: { [key: string]: string | number | boolean | Date }[] }) {
    this.id = id
    this.data = data
  }
}
