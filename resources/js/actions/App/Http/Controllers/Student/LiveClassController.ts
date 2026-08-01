import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\LiveClassController::join
 * @see app/Http/Controllers/Student/LiveClassController.php:12
 * @route '/student/live-classes/{liveClass}/join'
 */
export const join = (args: { liveClass: string | number | { id: string | number } } | [liveClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: join.url(args, options),
    method: 'get',
})

join.definition = {
    methods: ["get","head"],
    url: '/student/live-classes/{liveClass}/join',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\LiveClassController::join
 * @see app/Http/Controllers/Student/LiveClassController.php:12
 * @route '/student/live-classes/{liveClass}/join'
 */
join.url = (args: { liveClass: string | number | { id: string | number } } | [liveClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { liveClass: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { liveClass: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    liveClass: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        liveClass: typeof args.liveClass === 'object'
                ? args.liveClass.id
                : args.liveClass,
                }

    return join.definition.url
            .replace('{liveClass}', parsedArgs.liveClass.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\LiveClassController::join
 * @see app/Http/Controllers/Student/LiveClassController.php:12
 * @route '/student/live-classes/{liveClass}/join'
 */
join.get = (args: { liveClass: string | number | { id: string | number } } | [liveClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: join.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\LiveClassController::join
 * @see app/Http/Controllers/Student/LiveClassController.php:12
 * @route '/student/live-classes/{liveClass}/join'
 */
join.head = (args: { liveClass: string | number | { id: string | number } } | [liveClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: join.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\LiveClassController::join
 * @see app/Http/Controllers/Student/LiveClassController.php:12
 * @route '/student/live-classes/{liveClass}/join'
 */
    const joinForm = (args: { liveClass: string | number | { id: string | number } } | [liveClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: join.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\LiveClassController::join
 * @see app/Http/Controllers/Student/LiveClassController.php:12
 * @route '/student/live-classes/{liveClass}/join'
 */
        joinForm.get = (args: { liveClass: string | number | { id: string | number } } | [liveClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: join.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\LiveClassController::join
 * @see app/Http/Controllers/Student/LiveClassController.php:12
 * @route '/student/live-classes/{liveClass}/join'
 */
        joinForm.head = (args: { liveClass: string | number | { id: string | number } } | [liveClass: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: join.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    join.form = joinForm
const LiveClassController = { join }

export default LiveClassController