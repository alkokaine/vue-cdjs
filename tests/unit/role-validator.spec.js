import aria from '@/common/aria'
const validateItemRole = aria.validateItemRole
const validateListRole = aria.validateListRole
describe ('validate item role', () => {
  test('foobar is not valid item role', () => {
    expect(validateItemRole('foobar')).toBeFalsy()
  })
  test('menuitemcheckbox is valid item role', () => {
    expect(validateItemRole('menuitemcheckbox')).toBeTruthy()
  })
  test('undefined is not valid item role', () => {
    expect(validateItemRole(undefined)).toBeFalsy()
  })
  test('null is not valid item role', () => {
    expect(validateItemRole(null)).toBeFalsy()
  })
  test('array is not valid item role', () => {
    expect(validateItemRole([])).toBeFalsy()
  })
  test('function is not valid item role', () => {
    expect(validateItemRole(Function)).toBeFalsy()
  })
  test('every item from valid <li> roles is valid <li> role', () => {
    const validates = ['menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'none', 'presentation', 'radio', 'separator', 'tab', 'treeitem'].map(r => validateItemRole(r))
    expect(validates.every(e => e === true)).toBeTruthy()
  })
})
describe ('validate list role', () => {
  test('foobar is not valid list role', () => {
    expect(validateListRole('foobar')).toBeFalsy()
  })
  test('menuitemcheckbox is not valid list role', () => {
    expect(validateListRole('menuitemcheckbox')).toBeFalsy()
  })
  test('undefined is not valid list role', () => {
    expect(validateListRole(undefined)).toBeFalsy()
  })
  test('null is not valid list role', () => {
    expect(validateListRole(null)).toBeFalsy()
  })
  test('array is not valid list role', () => {
    expect(validateListRole([])).toBeFalsy()
  })
  test('function is not valid list role', () => {
    expect(validateListRole(Function)).toBeFalsy()
  })
  test('tablist is valid list role', () => {
    expect(validateListRole('tablist')).toBeTruthy()
  })
  test('any items from valid <ul> roles are valid roles', () => {
    const validates = ['directory', 'group', 'listbox', 'menu', 'menubar', 'none', 'presentation', 'radiogroup', 'tablist', 'toolbar', 'tree'].map(r => validateListRole(r))
    expect(validates.every(e => e === true)).toBeTruthy()
  })
})
