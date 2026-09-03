import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Collections } from './collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


export default buildConfig({
  onInit: async (payload) => {
    const users = await payload.count({
      collection: 'users',
    })

    if (users.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@site.lvh.me',
          password: 'changeme',
        },
      })

      payload.logger.info('Database empty. Default Admin created!')
    }
  },
  routes: {
    admin: '/acp'
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      }, {
        label: 'Bahasa Indonesia',
        code: 'id',
      },
    ], // required
    defaultLocale: 'en', // required
  },
  admin: {
    autoLogin: process.env.NODE_ENV === 'development'
      ? {
        email: 'admin@site.lvh.me',
        password: 'changeme',
        prefillOnly: false,
      }
      : false, // Otomatis mati saat dideploy ke production,
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: Collections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    idType: 'uuid',
    allowIDOnCreate: true,
  }),
  sharp,
  plugins: [],
})
