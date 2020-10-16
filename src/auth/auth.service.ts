import { Injectable } from '@nestjs/common'
import { FirebaseService } from '../firebase/firebase.service'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService
  ) {}

  async validateUser(idToken: string) {
    const { uid } = await this.firebaseService.getAuth().verifyIdToken(idToken, true)
    // fetch user details from firebase user db
    const fbUser = await this.firebaseService.getUserById(uid)
    // convert firebaseUser -> User (renaming of fields)
    const convertedUserData = this.firebaseService.convertUser(fbUser)
    // update existing user, or create a new one if not existing
    const newOrUpdatedUser = await this.userService.upsert(convertedUserData)
    return newOrUpdatedUser
  }
}
