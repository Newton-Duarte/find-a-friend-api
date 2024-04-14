import { randomUUID } from 'node:crypto'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: any[] = []
  async create(data: any) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }
}
