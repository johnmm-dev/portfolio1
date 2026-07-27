import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8iczsrc5',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    studioHost: 'adnansabbir-blog',
    appId: 'b7h8rdde7n00a27wighi68vs',
  },
})
