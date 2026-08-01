import WebhookController from './WebhookController'
import Guest from './Guest'
import Public from './Public'
import Student from './Student'
import Admin from './Admin'
const Controllers = {
    WebhookController: Object.assign(WebhookController, WebhookController),
Guest: Object.assign(Guest, Guest),
Public: Object.assign(Public, Public),
Student: Object.assign(Student, Student),
Admin: Object.assign(Admin, Admin),
}

export default Controllers