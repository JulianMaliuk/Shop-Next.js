const userRoles = ({ role }) => {
  switch (role) {
    case 'USER': return 'Користувач'
    case 'ADMIN': return 'Адміністратор'
    default: return 'Не визначено'
  }
}

export default userRoles