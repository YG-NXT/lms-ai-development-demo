import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\DashboardController::index
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DashboardController::index
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DashboardController::index
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\DashboardController::index
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\DashboardController::index
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\DashboardController::index
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\DashboardController::index
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/student/dashboard'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Student\DashboardController::learningDashboard
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
export const learningDashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: learningDashboard.url(options),
    method: 'get',
})

learningDashboard.definition = {
    methods: ["get","head"],
    url: '/student/learning-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DashboardController::learningDashboard
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
learningDashboard.url = (options?: RouteQueryOptions) => {
    return learningDashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DashboardController::learningDashboard
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
learningDashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: learningDashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\DashboardController::learningDashboard
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
learningDashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: learningDashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\DashboardController::learningDashboard
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
    const learningDashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: learningDashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\DashboardController::learningDashboard
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
        learningDashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: learningDashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\DashboardController::learningDashboard
 * @see app/Http/Controllers/Student/DashboardController.php:43
 * @route '/student/learning-dashboard'
 */
        learningDashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: learningDashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    learningDashboard.form = learningDashboardForm
const DashboardController = { index, learningDashboard }

export default DashboardController