import { CellComponent, Column } from 'react-datasheet-grid'
import { DatasheetSelect, SelectOptions } from './index'

export const selectColumn = (options: SelectOptions): Column<string | null, SelectOptions> => ({
  component: DatasheetSelect as CellComponent,
  columnData: options,
  disableKeys: true,
  keepFocus: true,
  disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) => options.choices.find((choice) => choice.value === rowData)?.label ?? null,
  pasteValue: ({ value }) => options.choices.find((choice) => choice.label === value)?.value ?? null,
})
