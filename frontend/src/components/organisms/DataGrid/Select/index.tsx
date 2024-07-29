import React, { useLayoutEffect, useRef } from 'react'
import { CellProps } from 'react-datasheet-grid'
import Select, { GroupBase, SelectInstance } from 'react-select'

export type Choice = {
  label: string
  value: string
}

export type SelectOptions = {
  choices: Choice[]
  disabled?: boolean
  className?: string
}

export const DatasheetSelect = React.memo(
  ({
    active,
    rowData,
    setRowData,
    focus,
    stopEditing,
    columnData,
  }: CellProps<string | null, SelectOptions>) => {
    const ref = useRef<SelectInstance<Choice, false, GroupBase<Choice>>>(null)

    useLayoutEffect(() => {
      if (focus) {
        ref.current?.focus()
      } else {
        ref.current?.blur()
      }
    }, [focus])

    return (
      <Select
        ref={ref}
        isDisabled={columnData.disabled}
        value={columnData.choices.find(({ value }) => value === rowData) ?? null}
        styles={{
          container: (provided) => ({
            ...provided,
            flex: 1,
            alignSelf: 'stretch',
            pointerEvents: focus ? undefined : 'none',
          }),
          control: (provided) => ({
            ...provided,
            height: '100%',
            border: 'none',
            boxShadow: 'none',
            background: 'none',
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            opacity: 0,
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
          placeholder: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
        }}
        menuPortalTarget={document.body}
        menuIsOpen={focus}
        onChange={(choice) => {
          if (choice === null) return
          setRowData(choice.value)
          setTimeout(stopEditing, 0)
        }}
        onMenuClose={() => stopEditing({ nextRow: false })}
        options={columnData.choices}
        className={columnData.className}
      />
    )
  }
)
