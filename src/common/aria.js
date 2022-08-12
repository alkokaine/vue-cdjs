const itemroles = []
const listroles = []

const validateItemRole = (value) => (itemroles.indexOf(value) >= 0)
const validateListRole = (value) => (listroles.indexOf(value) >= 0)

export default { 
    validateItemRole, validateListRole
}