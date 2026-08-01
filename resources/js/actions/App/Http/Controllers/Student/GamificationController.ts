import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\GamificationController::index
 * @see app/Http/Controllers/Student/GamificationController.php:14
 * @route '/student/gamification'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/gamification',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\GamificationController::index
 * @see app/Http/Controllers/Student/GamificationController.php:14
 * @route '/student/gamification'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\GamificationController::index
 * @see app/Http/Controllers/Student/GamificationController.php:14
 * @route '/student/gamification'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\GamificationController::index
 * @see app/Http/Controllers/Student/GamificationController.php:14
 * @route '/student/gamification'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\GamificationController::index
 * @see app/Http/Controllers/Student/GamificationController.php:14
 * @route '/student/gamification'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\GamificationController::index
 * @see app/Http/Controllers/Student/GamificationController.php:14
 * @route '/student/gamification'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\GamificationController::index
 * @see app/Http/Controllers/Student/GamificationController.php:14
 * @route '/student/gamification'
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
const GamificationController = { index }

export default GamificationController