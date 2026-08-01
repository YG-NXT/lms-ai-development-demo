import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\NotificationController::index
 * @see app/Http/Controllers/Student/NotificationController.php:17
 * @route '/student/notifications'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\NotificationController::index
 * @see app/Http/Controllers/Student/NotificationController.php:17
 * @route '/student/notifications'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\NotificationController::index
 * @see app/Http/Controllers/Student/NotificationController.php:17
 * @route '/student/notifications'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\NotificationController::index
 * @see app/Http/Controllers/Student/NotificationController.php:17
 * @route '/student/notifications'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\NotificationController::index
 * @see app/Http/Controllers/Student/NotificationController.php:17
 * @route '/student/notifications'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\NotificationController::index
 * @see app/Http/Controllers/Student/NotificationController.php:17
 * @route '/student/notifications'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\NotificationController::index
 * @see app/Http/Controllers/Student/NotificationController.php:17
 * @route '/student/notifications'
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
* @see \App\Http\Controllers\Student\NotificationController::recent
 * @see app/Http/Controllers/Student/NotificationController.php:29
 * @route '/student/notifications/recent'
 */
export const recent = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recent.url(options),
    method: 'get',
})

recent.definition = {
    methods: ["get","head"],
    url: '/student/notifications/recent',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\NotificationController::recent
 * @see app/Http/Controllers/Student/NotificationController.php:29
 * @route '/student/notifications/recent'
 */
recent.url = (options?: RouteQueryOptions) => {
    return recent.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\NotificationController::recent
 * @see app/Http/Controllers/Student/NotificationController.php:29
 * @route '/student/notifications/recent'
 */
recent.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recent.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\NotificationController::recent
 * @see app/Http/Controllers/Student/NotificationController.php:29
 * @route '/student/notifications/recent'
 */
recent.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recent.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\NotificationController::recent
 * @see app/Http/Controllers/Student/NotificationController.php:29
 * @route '/student/notifications/recent'
 */
    const recentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: recent.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\NotificationController::recent
 * @see app/Http/Controllers/Student/NotificationController.php:29
 * @route '/student/notifications/recent'
 */
        recentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: recent.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\NotificationController::recent
 * @see app/Http/Controllers/Student/NotificationController.php:29
 * @route '/student/notifications/recent'
 */
        recentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: recent.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    recent.form = recentForm
/**
* @see \App\Http\Controllers\Student\NotificationController::read
 * @see app/Http/Controllers/Student/NotificationController.php:47
 * @route '/student/notifications/{id}/read'
 */
export const read = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: read.url(args, options),
    method: 'post',
})

read.definition = {
    methods: ["post"],
    url: '/student/notifications/{id}/read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\NotificationController::read
 * @see app/Http/Controllers/Student/NotificationController.php:47
 * @route '/student/notifications/{id}/read'
 */
read.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return read.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\NotificationController::read
 * @see app/Http/Controllers/Student/NotificationController.php:47
 * @route '/student/notifications/{id}/read'
 */
read.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: read.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\NotificationController::read
 * @see app/Http/Controllers/Student/NotificationController.php:47
 * @route '/student/notifications/{id}/read'
 */
    const readForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: read.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\NotificationController::read
 * @see app/Http/Controllers/Student/NotificationController.php:47
 * @route '/student/notifications/{id}/read'
 */
        readForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: read.url(args, options),
            method: 'post',
        })
    
    read.form = readForm
/**
* @see \App\Http\Controllers\Student\NotificationController::read_all
 * @see app/Http/Controllers/Student/NotificationController.php:61
 * @route '/student/notifications/read-all'
 */
export const read_all = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: read_all.url(options),
    method: 'post',
})

read_all.definition = {
    methods: ["post"],
    url: '/student/notifications/read-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\NotificationController::read_all
 * @see app/Http/Controllers/Student/NotificationController.php:61
 * @route '/student/notifications/read-all'
 */
read_all.url = (options?: RouteQueryOptions) => {
    return read_all.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\NotificationController::read_all
 * @see app/Http/Controllers/Student/NotificationController.php:61
 * @route '/student/notifications/read-all'
 */
read_all.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: read_all.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\NotificationController::read_all
 * @see app/Http/Controllers/Student/NotificationController.php:61
 * @route '/student/notifications/read-all'
 */
    const read_allForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: read_all.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\NotificationController::read_all
 * @see app/Http/Controllers/Student/NotificationController.php:61
 * @route '/student/notifications/read-all'
 */
        read_allForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: read_all.url(options),
            method: 'post',
        })
    
    read_all.form = read_allForm
/**
* @see \App\Http\Controllers\Student\NotificationController::destroy
 * @see app/Http/Controllers/Student/NotificationController.php:74
 * @route '/student/notifications/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/student/notifications/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Student\NotificationController::destroy
 * @see app/Http/Controllers/Student/NotificationController.php:74
 * @route '/student/notifications/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\NotificationController::destroy
 * @see app/Http/Controllers/Student/NotificationController.php:74
 * @route '/student/notifications/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Student\NotificationController::destroy
 * @see app/Http/Controllers/Student/NotificationController.php:74
 * @route '/student/notifications/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\NotificationController::destroy
 * @see app/Http/Controllers/Student/NotificationController.php:74
 * @route '/student/notifications/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const notifications = {
    index: Object.assign(index, index),
recent: Object.assign(recent, recent),
read: Object.assign(read, read),
read_all: Object.assign(read_all, read_all),
destroy: Object.assign(destroy, destroy),
}

export default notifications