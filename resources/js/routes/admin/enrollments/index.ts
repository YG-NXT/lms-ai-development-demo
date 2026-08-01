import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EnrollmentController::index
 * @see app/Http/Controllers/Admin/EnrollmentController.php:20
 * @route '/admin/enrollments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/enrollments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnrollmentController::index
 * @see app/Http/Controllers/Admin/EnrollmentController.php:20
 * @route '/admin/enrollments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrollmentController::index
 * @see app/Http/Controllers/Admin/EnrollmentController.php:20
 * @route '/admin/enrollments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnrollmentController::index
 * @see app/Http/Controllers/Admin/EnrollmentController.php:20
 * @route '/admin/enrollments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnrollmentController::index
 * @see app/Http/Controllers/Admin/EnrollmentController.php:20
 * @route '/admin/enrollments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrollmentController::index
 * @see app/Http/Controllers/Admin/EnrollmentController.php:20
 * @route '/admin/enrollments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnrollmentController::index
 * @see app/Http/Controllers/Admin/EnrollmentController.php:20
 * @route '/admin/enrollments'
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
* @see \App\Http\Controllers\Admin\EnrollmentController::status
 * @see app/Http/Controllers/Admin/EnrollmentController.php:51
 * @route '/admin/enrollments/{enrollment}/status'
 */
export const status = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/admin/enrollments/{enrollment}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\EnrollmentController::status
 * @see app/Http/Controllers/Admin/EnrollmentController.php:51
 * @route '/admin/enrollments/{enrollment}/status'
 */
status.url = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return status.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrollmentController::status
 * @see app/Http/Controllers/Admin/EnrollmentController.php:51
 * @route '/admin/enrollments/{enrollment}/status'
 */
status.patch = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\EnrollmentController::status
 * @see app/Http/Controllers/Admin/EnrollmentController.php:51
 * @route '/admin/enrollments/{enrollment}/status'
 */
    const statusForm = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrollmentController::status
 * @see app/Http/Controllers/Admin/EnrollmentController.php:51
 * @route '/admin/enrollments/{enrollment}/status'
 */
        statusForm.patch = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\Admin\EnrollmentController::destroy
 * @see app/Http/Controllers/Admin/EnrollmentController.php:81
 * @route '/admin/enrollments/{enrollment}'
 */
export const destroy = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/enrollments/{enrollment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EnrollmentController::destroy
 * @see app/Http/Controllers/Admin/EnrollmentController.php:81
 * @route '/admin/enrollments/{enrollment}'
 */
destroy.url = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return destroy.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnrollmentController::destroy
 * @see app/Http/Controllers/Admin/EnrollmentController.php:81
 * @route '/admin/enrollments/{enrollment}'
 */
destroy.delete = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\EnrollmentController::destroy
 * @see app/Http/Controllers/Admin/EnrollmentController.php:81
 * @route '/admin/enrollments/{enrollment}'
 */
    const destroyForm = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EnrollmentController::destroy
 * @see app/Http/Controllers/Admin/EnrollmentController.php:81
 * @route '/admin/enrollments/{enrollment}'
 */
        destroyForm.delete = (args: { enrollment: string | number | { id: string | number } } | [enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const enrollments = {
    index: Object.assign(index, index),
status: Object.assign(status, status),
destroy: Object.assign(destroy, destroy),
}

export default enrollments