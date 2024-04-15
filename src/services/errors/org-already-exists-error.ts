export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Organization with the same email already exist')
  }
}
