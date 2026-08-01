import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ActivityLogController::index
 * @see app/Http/Controllers/Admin/ActivityLogController.php:19
 * @route '/admin/activity-logs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/activity-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ActivityLogController::index
 * @see app/Http/Controllers/Admin/ActivityLogController.php:19
 * @route '/admin/activity-logs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActivityLogController::index
 * @see app/Http/Controllers/Admin/ActivityLogController.php:19
 * @route '/admin/activity-logs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ActivityLogController::index
 * @see app/Http/Controllers/Admin/ActivityLogController.php:19
 * @route '/admin/activity-logs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ActivityLogController::index
 * @see app/Http/Controllers/Admin/ActivityLogController.php:19
 * @route '/admin/activity-logs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ActivityLogController::index
 * @see app/Http/Controllers/Admin/ActivityLogController.php:19
 * @route '/admin/activity-logs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ActivityLogController::index
 * @see app/Http/Controllers/Admin/ActivityLogController.php:19
 * @route '/admin/activity-logs'
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
* @see \App\Http\Controllers\Admin\ActivityLogController::show
 * @see app/Http/Controllers/Admin/ActivityLogController.php:70
 * @route '/admin/activity-logs/{activityLog}'
 */
export const show = (args: { activityLog: string | number | { id: string | number } } | [activityLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/activity-logs/{activityLog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ActivityLogController::show
 * @see app/Http/Controllers/Admin/ActivityLogController.php:70
 * @route '/admin/activity-logs/{activityLog}'
 */
show.url = (args: { activityLog: string | number | { id: string | number } } | [activityLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activityLog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activityLog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activityLog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activityLog: typeof args.activityLog === 'object'
                ? args.activityLog.id
                : args.activityLog,
                }

    return show.definition.url
            .replace('{activityLog}', parsedArgs.activityLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActivityLogController::show
 * @see app/Http/Controllers/Admin/ActivityLogController.php:70
 * @route '/admin/activity-logs/{activityLog}'
 */
show.get = (args: { activityLog: string | number | { id: string | number } } | [activityLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ActivityLogController::show
 * @see app/Http/Controllers/Admin/ActivityLogController.php:70
 * @route '/admin/activity-logs/{activityLog}'
 */
show.head = (args: { activityLog: string | number | { id: string | number } } | [activityLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ActivityLogController::show
 * @see app/Http/Controllers/Admin/ActivityLogController.php:70
 * @route '/admin/activity-logs/{activityLog}'
 */
    const showForm = (args: { activityLog: string | number | { id: string | number } } | [activityLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ActivityLogController::show
 * @see app/Http/Controllers/Admin/ActivityLogController.php:70
 * @route '/admin/activity-logs/{activityLog}'
 */
        showForm.get = (args: { activityLog: string | number | { id: string | number } } | [activityLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ActivityLogController::show
 * @see app/Http/Controllers/Admin/ActivityLogController.php:70
 * @route '/admin/activity-logs/{activityLog}'
 */
        showForm.head = (args: { activityLog: string | number | { id: string | number } } | [activityLog: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const ActivityLogController = { index, show }

export default ActivityLogController