import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\DashboardController::learning
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
export const learning = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: learning.url(options),
    method: 'get',
})

learning.definition = {
    methods: ["get","head"],
    url: '/student/learning-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DashboardController::learning
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
learning.url = (options?: RouteQueryOptions) => {
    return learning.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DashboardController::learning
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
learning.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: learning.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\DashboardController::learning
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
learning.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: learning.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\DashboardController::learning
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
    const learningForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: learning.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\DashboardController::learning
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
        learningForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: learning.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\DashboardController::learning
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
        learningForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: learning.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    learning.form = learningForm
const dashboard = {
    learning: Object.assign(learning, learning),
}

export default dashboard