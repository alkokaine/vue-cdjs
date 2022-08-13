const listroles = ['directory', 'group', 'listbox', 'menu', 'menubar', 'none', 'presentation', 'radiogroup', 'tablist', 'toolbar', 'tree']
const itemroles = ['menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'none', 'presentation', 'radio', 'separator', 'tab', 'treeitem']

function validateItemRole (value) {
    return itemroles.indexOf(value) >= 0
}
function validateListRole (value) {
    return listroles.indexOf(value) >= 0
}

export default { 
    validateItemRole, validateListRole
}