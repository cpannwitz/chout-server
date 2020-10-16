import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { AuthProvider } from '@prisma/client'
import { auth, messaging, instanceId } from 'firebase-admin'
import { CreateUserDto } from '../user/dto/create-user.dto'

function getAuthProviderValue(userInfos: auth.UserInfo[]) {
  if (userInfos.length <= 0) {
    return undefined
  }
  const provider = userInfos[0].providerId
  switch (provider) {
    case 'twitter.com':
      return AuthProvider.TWITTER
    case 'facebook.com':
      return AuthProvider.FACEBOOK
    case 'github.com':
      return AuthProvider.GITHUB
    case 'google.com':
      return AuthProvider.GOOGLE
    default:
      return undefined
  }
}

@Injectable()
export class FirebaseService {
  // constructor() {}

  getStatus() {
    return instanceId()
  }

  getAuth() {
    return auth()
  }

  getMessaging() {
    return messaging()
  }

  // * Authentication

  getUserById(userUid: string) {
    console.log(`LOG | : FirebaseService -> getUserById -> userUid`, userUid)
    return this.getAuth().getUser(userUid)
  }

  convertUser(firebaseUser: auth.UserRecord): CreateUserDto {
    const {
      email,
      emailVerified,
      displayName,
      photoURL,
      phoneNumber,
      providerData,
      uid
    } = firebaseUser
    console.log(`LOG | : FirebaseService -> convertUser -> firebaseUser`, firebaseUser)
    if (!email) {
      throw new InternalServerErrorException('No email present on firebase user.')
    }
    return {
      email: email,
      verified: emailVerified,
      username: displayName || email,
      image: photoURL,
      provider: getAuthProviderValue(providerData),
      providerId: uid,
      phoneNumber: phoneNumber
    }
  }
}
