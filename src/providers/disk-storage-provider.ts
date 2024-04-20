import fs from 'node:fs'
import path from 'node:path'

import { StorageProvider } from './storage-provider'
import upload from '@/config/upload'

export class DiskStorageProvider implements StorageProvider {
  async save(file: string, folder: string) {
    await fs.promises.rename(
      path.resolve(upload.directory, file),
      path.resolve(`${upload.directory}/${folder}`, file),
    )
    return file
  }

  async delete(file: string, folder: string) {
    const filename = path.resolve(`${upload.directory}/${folder}`, file)

    try {
      await fs.promises.stat(filename)
      await fs.promises.unlink(filename)
    } catch {}
  }
}
