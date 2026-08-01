import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::index
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:14
 * @route '/student/downloads'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/downloads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::index
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:14
 * @route '/student/downloads'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::index
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:14
 * @route '/student/downloads'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::index
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:14
 * @route '/student/downloads'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\OfflineDownloadController::index
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:14
 * @route '/student/downloads'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\OfflineDownloadController::index
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:14
 * @route '/student/downloads'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\OfflineDownloadController::index
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:14
 * @route '/student/downloads'
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
* @see \App\Http\Controllers\Student\OfflineDownloadController::store
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
export const store = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/lessons/{lesson}/download',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::store
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
store.url = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lesson: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return store.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::store
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
store.post = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\OfflineDownloadController::store
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
    const storeForm = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\OfflineDownloadController::store
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
        storeForm.post = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::destroy
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:59
 * @route '/student/downloads/{download}'
 */
export const destroy = (args: { download: string | number | { id: string | number } } | [download: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/student/downloads/{download}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::destroy
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:59
 * @route '/student/downloads/{download}'
 */
destroy.url = (args: { download: string | number | { id: string | number } } | [download: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { download: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { download: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    download: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        download: typeof args.download === 'object'
                ? args.download.id
                : args.download,
                }

    return destroy.definition.url
            .replace('{download}', parsedArgs.download.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::destroy
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:59
 * @route '/student/downloads/{download}'
 */
destroy.delete = (args: { download: string | number | { id: string | number } } | [download: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Student\OfflineDownloadController::destroy
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:59
 * @route '/student/downloads/{download}'
 */
    const destroyForm = (args: { download: string | number | { id: string | number } } | [download: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\OfflineDownloadController::destroy
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:59
 * @route '/student/downloads/{download}'
 */
        destroyForm.delete = (args: { download: string | number | { id: string | number } } | [download: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const OfflineDownloadController = { index, store, destroy }

export default OfflineDownloadController