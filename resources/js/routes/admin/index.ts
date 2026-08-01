import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import ads from './ads'
import api from './api'
import subscriptions from './subscriptions'
import users from './users'
import students from './students'
import branding from './branding'
import roles from './roles'
import activity_logs from './activity_logs'
import profile from './profile'
import business from './business'
import legal from './legal'
import notifications from './notifications'
import categories from './categories'
import courses from './courses'
import coupons from './coupons'
import webhooks from './webhooks'
import coursePerformance from './course-performance'
import enrollments from './enrollments'
import reviews from './reviews'
import liveClasses from './live-classes'
import sections from './sections'
import lessons from './lessons'
import certificates from './certificates'
import certificateTemplate from './certificate-template'
import assignments from './assignments'
import orders from './orders'
import paymentSettings from './payment-settings'
import announcements from './announcements'
import taxSettings from './tax-settings'
import tutorials from './tutorials'
import coInstructors from './co-instructors'
/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::login
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/admin/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::login
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::login
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::login
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::login
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::login
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::login
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::register
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/admin/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::register
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::register
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::register
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::register
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::register
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::register
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:10
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:10
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:10
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:10
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:10
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:10
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:10
 * @route '/admin/dashboard'
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
const admin = {
    ads: Object.assign(ads, ads),
api: Object.assign(api, api),
subscriptions: Object.assign(subscriptions, subscriptions),
login: Object.assign(login, login),
register: Object.assign(register, register),
dashboard: Object.assign(dashboard, dashboard),
users: Object.assign(users, users),
students: Object.assign(students, students),
branding: Object.assign(branding, branding),
roles: Object.assign(roles, roles),
activity_logs: Object.assign(activity_logs, activity_logs),
profile: Object.assign(profile, profile),
business: Object.assign(business, business),
legal: Object.assign(legal, legal),
notifications: Object.assign(notifications, notifications),
categories: Object.assign(categories, categories),
courses: Object.assign(courses, courses),
coupons: Object.assign(coupons, coupons),
webhooks: Object.assign(webhooks, webhooks),
coursePerformance: Object.assign(coursePerformance, coursePerformance),
enrollments: Object.assign(enrollments, enrollments),
reviews: Object.assign(reviews, reviews),
liveClasses: Object.assign(liveClasses, liveClasses),
sections: Object.assign(sections, sections),
lessons: Object.assign(lessons, lessons),
certificates: Object.assign(certificates, certificates),
certificateTemplate: Object.assign(certificateTemplate, certificateTemplate),
assignments: Object.assign(assignments, assignments),
orders: Object.assign(orders, orders),
paymentSettings: Object.assign(paymentSettings, paymentSettings),
announcements: Object.assign(announcements, announcements),
taxSettings: Object.assign(taxSettings, taxSettings),
tutorials: Object.assign(tutorials, tutorials),
coInstructors: Object.assign(coInstructors, coInstructors),
}

export default admin