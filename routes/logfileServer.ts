/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

export function serveLogFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    const logDir = path.resolve('logs/')
    const filePath = path.resolve(logDir, file)
    const relativePath = path.relative(logDir, filePath)

    if (!file.includes('/') && !file.includes('\\') && relativePath !== '' && !relativePath.startsWith('..') && !path.isAbsolute(relativePath)) {
      res.sendFile(filePath)
    } else {
      res.status(403)
      next(new Error('File names cannot contain forward slashes!'))
    }
  }
}
