import { CommandInterface } from '../../../../../shared/Application/Commands/CommandInterface'

export default class CreateImportCommand implements CommandInterface {
  constructor(public readonly id: string) {}
}
