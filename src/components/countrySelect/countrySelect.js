import Select from 'react-select'
import React from 'react'
import darkTheme from '../../theme'

const styles = {
  container: (base) => ({
    ...base,
    marginRight: '1%',
    display: 'inline',
    minWidth: '200px',
    // flex: 1,
    alignSelf: 'center',
    // borderRadius: '9000px',
    // overflow: 'hidden',
  }),
  control: (base) => ({
    ...base,
    borderRadius: '9000px',
    borderWidth: 0,
    backgroundColor: darkTheme.palette.primary.main,
  }),
  valueContainer: (base) => ({
    ...base,
    marginLeft: '3%',
  }),
  input: (base) => ({
    ...base,
    color: 'white',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    color: isSelected ? 'black' : 'white',
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: isFocused ? darkTheme.palette.secondary.main : isSelected ? 'white' : base.backgroundColor,

  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: darkTheme.palette.primary.main,
  }),

}

export default function CountrySelect({ countryOptions, selectedCountry, handleChange }) {
  return (
    <Select
      value={{
        label: selectedCountry,
        value: selectedCountry,
      }}
      onChange={handleChange}
      options={countryOptions}
      styles={styles}
      style={{
        minWidth: '200px',
      }}
    />

  )
}
