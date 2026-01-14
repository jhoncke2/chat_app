import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

export class FileStorageService {
  async save(file) {
    const ext = path.extname(file.originalname)
    const filename = crypto.randomUUID() + ext
    const filepath = path.join('uploads', filename)

    await fs.writeFile(filepath, file.buffer)

    return `/uploads/${filename}`
  }
}
