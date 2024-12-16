import { createContext, useContext } from 'react'

const OrganizationContext = createContext(null)

export { OrganizationContext }

export const useOrganization = () => useContext(OrganizationContext)
