import HomeController from './HomeController'
import AuthController from './AuthController'
import LocaleController from './LocaleController'
import LegalPageController from './LegalPageController'
import ContactController from './ContactController'
import TutorialController from './TutorialController'
const Guest = {
    HomeController: Object.assign(HomeController, HomeController),
AuthController: Object.assign(AuthController, AuthController),
LocaleController: Object.assign(LocaleController, LocaleController),
LegalPageController: Object.assign(LegalPageController, LegalPageController),
ContactController: Object.assign(ContactController, ContactController),
TutorialController: Object.assign(TutorialController, TutorialController),
}

export default Guest