import Select, { components } from 'react-select'
import React from 'react'
import darkTheme from '../../theme'
import './countrySelect.css'

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
  const uniqueId = `select_${Math.random().toFixed(5).slice(2)}`

  return (
    <Select
      id={uniqueId}
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
      components={{
        Menu: (props) => <components.Menu {...props} className="menu" />,
      }}
      onMenuClose={() => {
        // Slowly close the menu, as the default behavior is an instant render stop
        const menuEl = document.querySelector(`#${uniqueId} .menu`)
        const containerEl = menuEl?.parentElement
        const clonedMenuEl = menuEl?.cloneNode(true)

        if (!clonedMenuEl) return

        clonedMenuEl.classList.add('menu--close')
        clonedMenuEl.addEventListener('animationend', () => {
          containerEl.removeChild(clonedMenuEl)
        })

        containerEl.appendChild(clonedMenuEl)
      }}
    />

  )
}
