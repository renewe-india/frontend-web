import { createContext, useContext } from 'react'

// Create a context for the organization data
const OrganizationContext = createContext(null)

// Export the context so it can be used in other files
export { OrganizationContext }

// Export a custom hook for easy access to the context
export const useOrganization = () => useContext(OrganizationContext)
