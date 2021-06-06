import { createLoader, values } from 'configuru'

const loader = createLoader({defaultConfigPath: '.configuru.jsonc'})

export default values({
  services: {
    firebaseServiceAccount: loader.json('FIREBASE_SA'),
  },
})