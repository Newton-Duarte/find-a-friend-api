export class PetWithoutOrganizationError extends Error {
  constructor() {
    super('A pet should have an organization (Org not found).')
  }
}
