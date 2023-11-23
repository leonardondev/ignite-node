import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('setup')
    // custom setup
    return {
      async teardown() {
        // called after all tests with this env have been run
        console.log('teardown')
      },
    }
  },
}
