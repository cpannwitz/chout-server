import { InternalServerErrorException, Module } from '@nestjs/common'
import { FirebaseService } from './firebase.service'
import firebase from 'firebase-admin'

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {
  constructor() {
    const config = JSON.parse(process.env.FIREBASE_CONFIG || 'null')
    if (!config) {
      // if theres no firebase configuration, we can't validate users
      throw new InternalServerErrorException('Firebase configuration not found. See env variables.')
    }
    firebase.initializeApp({ credential: firebase.credential.cert(config) })
  }
}
