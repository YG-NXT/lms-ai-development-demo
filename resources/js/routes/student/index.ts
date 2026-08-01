import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import reviews from './reviews'
import courses from './courses'
import subscriptions from './subscriptions'
import dashboard074181 from './dashboard'
import profile from './profile'
import bookmarks from './bookmarks'
import gamification from './gamification'
import learningPaths from './learning-paths'
import bundles from './bundles'
import checkout from './checkout'
import liveClasses from './live-classes'
import notifications from './notifications'
import certificates from './certificates'
import orders from './orders'
import announcements from './announcements'
import reminders from './reminders'
import lessons from './lessons'
import downloads from './downloads'
import waitlist from './waitlist'
import referral from './referral'
import tutorials from './tutorials'
import code from './code'
/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/student/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const student = {
    reviews: Object.assign(reviews, reviews),
courses: Object.assign(courses, courses),
subscriptions: Object.assign(subscriptions, subscriptions),
dashboard: Object.assign(dashboard, dashboard074181),
profile: Object.assign(profile, profile),
bookmarks: Object.assign(bookmarks, bookmarks),
gamification: Object.assign(gamification, gamification),
learningPaths: Object.assign(learningPaths, learningPaths),
bundles: Object.assign(bundles, bundles),
checkout: Object.assign(checkout, checkout),
liveClasses: Object.assign(liveClasses, liveClasses),
notifications: Object.assign(notifications, notifications),
certificates: Object.assign(certificates, certificates),
orders: Object.assign(orders, orders),
announcements: Object.assign(announcements, announcements),
reminders: Object.assign(reminders, reminders),
lessons: Object.assign(lessons, lessons),
downloads: Object.assign(downloads, downloads),
waitlist: Object.assign(waitlist, waitlist),
referral: Object.assign(referral, referral),
tutorials: Object.assign(tutorials, tutorials),
code: Object.assign(code, code),
}

export default student