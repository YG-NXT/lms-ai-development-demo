import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\WaitlistController::index
 * @see app/Http/Controllers/Student/WaitlistController.php:13
 * @route '/student/waitlist'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/waitlist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\WaitlistController::index
 * @see app/Http/Controllers/Student/WaitlistController.php:13
 * @route '/student/waitlist'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\WaitlistController::index
 * @see app/Http/Controllers/Student/WaitlistController.php:13
 * @route '/student/waitlist'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\WaitlistController::index
 * @see app/Http/Controllers/Student/WaitlistController.php:13
 * @route '/student/waitlist'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\WaitlistController::index
 * @see app/Http/Controllers/Student/WaitlistController.php:13
 * @route '/student/waitlist'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\WaitlistController::index
 * @see app/Http/Controllers/Student/WaitlistController.php:13
 * @route '/student/waitlist'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\WaitlistController::index
 * @see app/Http/Controllers/Student/WaitlistController.php:13
 * @route '/student/waitlist'
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
* @see \App\Http\Controllers\Student\WaitlistController::store
 * @see app/Http/Controllers/Student/WaitlistController.php:20
 * @route '/student/waitlist/{course}'
 */
export const store = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/waitlist/{course}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\WaitlistController::store
 * @see app/Http/Controllers/Student/WaitlistController.php:20
 * @route '/student/waitlist/{course}'
 */
store.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return store.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\WaitlistController::store
 * @see app/Http/Controllers/Student/WaitlistController.php:20
 * @route '/student/waitlist/{course}'
 */
store.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\WaitlistController::store
 * @see app/Http/Controllers/Student/WaitlistController.php:20
 * @route '/student/waitlist/{course}'
 */
    const storeForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\WaitlistController::store
 * @see app/Http/Controllers/Student/WaitlistController.php:20
 * @route '/student/waitlist/{course}'
 */
        storeForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Student\WaitlistController::destroy
 * @see app/Http/Controllers/Student/WaitlistController.php:42
 * @route '/student/waitlist/{waitlist}'
 */
export const destroy = (args: { waitlist: string | number | { id: string | number } } | [waitlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/student/waitlist/{waitlist}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Student\WaitlistController::destroy
 * @see app/Http/Controllers/Student/WaitlistController.php:42
 * @route '/student/waitlist/{waitlist}'
 */
destroy.url = (args: { waitlist: string | number | { id: string | number } } | [waitlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { waitlist: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { waitlist: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    waitlist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        waitlist: typeof args.waitlist === 'object'
                ? args.waitlist.id
                : args.waitlist,
                }

    return destroy.definition.url
            .replace('{waitlist}', parsedArgs.waitlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\WaitlistController::destroy
 * @see app/Http/Controllers/Student/WaitlistController.php:42
 * @route '/student/waitlist/{waitlist}'
 */
destroy.delete = (args: { waitlist: string | number | { id: string | number } } | [waitlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Student\WaitlistController::destroy
 * @see app/Http/Controllers/Student/WaitlistController.php:42
 * @route '/student/waitlist/{waitlist}'
 */
    const destroyForm = (args: { waitlist: string | number | { id: string | number } } | [waitlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\WaitlistController::destroy
 * @see app/Http/Controllers/Student/WaitlistController.php:42
 * @route '/student/waitlist/{waitlist}'
 */
        destroyForm.delete = (args: { waitlist: string | number | { id: string | number } } | [waitlist: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const waitlist = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default waitlist