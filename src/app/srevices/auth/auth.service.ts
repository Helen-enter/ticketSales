import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersStorage: IUser[] = []

  constructor() {
  }

  checkUserPassword(psw: string | number) {
    return this.usersStorage.find(el => el.psw === psw)
      // ?
      // console.log('пароль найден')
      // : console.log('пароль не найден')
  }

  changePassword(newPsw: any) {
    this.usersStorage.map((el) => {
      {
        el.login,
          el?.cardNumber,
          el.email,
          el.psw = newPsw
      }
      console.log('пароль изменен на ', this.usersStorage.find(el => (`${el.psw}`)))

    })
  }


  checkUser(user: IUser): boolean {
    const isUserExists = this.usersStorage.find(el => el.login === user.login)

    const isUserSavedInStore = window.localStorage.getItem("user_" + user?.login)

    if (isUserSavedInStore) {
      return true
    }

    if (isUserExists) {
      return isUserExists.psw === user.psw
    }
    return false
  }

  isUserExists(user: IUser): boolean {
    const isUserExists = this.usersStorage.find(el => el.login === user.login)
    return !!isUserExists
  }

  isUserExistsInLocalStorage(user: IUser): boolean {
    const isUserSavedInStore = window.localStorage.getItem("user_" + user?.login)
    return !!isUserSavedInStore

  }

  setUser(user: IUser): void {
    const isUserExists = this.usersStorage.find(el => el.login === user.login)

    if (!isUserExists && user?.login) {
      this.usersStorage.push(user)
    }

  }

  setUserInLocalStorage(user: IUser): void {
    const isUserSavedInStore = window.localStorage.getItem("user_" + user?.login)
    if (user.psw !== null && user.login != null) {

      if (!isUserSavedInStore) {
        window.localStorage.setItem('user_' + user?.login, JSON.stringify(user))
      }
    }
  }
}
