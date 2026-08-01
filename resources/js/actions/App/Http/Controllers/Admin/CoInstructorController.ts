import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CoInstructorController::index
 * @see app/Http/Controllers/Admin/CoInstructorController.php:16
 * @route '/admin/co-instructors'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/co-instructors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoInstructorController::index
 * @see app/Http/Controllers/Admin/CoInstructorController.php:16
 * @route '/admin/co-instructors'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoInstructorController::index
 * @see app/Http/Controllers/Admin/CoInstructorController.php:16
 * @route '/admin/co-instructors'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CoInstructorController::index
 * @see app/Http/Controllers/Admin/CoInstructorController.php:16
 * @route '/admin/co-instructors'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CoInstructorController::index
 * @see app/Http/Controllers/Admin/CoInstructorController.php:16
 * @route '/admin/co-instructors'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CoInstructorController::index
 * @see app/Http/Controllers/Admin/CoInstructorController.php:16
 * @route '/admin/co-instructors'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CoInstructorController::index
 * @see app/Http/Controllers/Admin/CoInstructorController.php:16
 * @route '/admin/co-instructors'
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
* @see \App\Http\Controllers\Admin\CoInstructorController::show
 * @see app/Http/Controllers/Admin/CoInstructorController.php:40
 * @route '/admin/co-instructors/{course}'
 */
export const show = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/co-instructors/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoInstructorController::show
 * @see app/Http/Controllers/Admin/CoInstructorController.php:40
 * @route '/admin/co-instructors/{course}'
 */
show.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoInstructorController::show
 * @see app/Http/Controllers/Admin/CoInstructorController.php:40
 * @route '/admin/co-instructors/{course}'
 */
show.get = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CoInstructorController::show
 * @see app/Http/Controllers/Admin/CoInstructorController.php:40
 * @route '/admin/co-instructors/{course}'
 */
show.head = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CoInstructorController::show
 * @see app/Http/Controllers/Admin/CoInstructorController.php:40
 * @route '/admin/co-instructors/{course}'
 */
    const showForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CoInstructorController::show
 * @see app/Http/Controllers/Admin/CoInstructorController.php:40
 * @route '/admin/co-instructors/{course}'
 */
        showForm.get = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CoInstructorController::show
 * @see app/Http/Controllers/Admin/CoInstructorController.php:40
 * @route '/admin/co-instructors/{course}'
 */
        showForm.head = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\CoInstructorController::attach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:54
 * @route '/admin/co-instructors/{course}/attach'
 */
export const attach = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

attach.definition = {
    methods: ["post"],
    url: '/admin/co-instructors/{course}/attach',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CoInstructorController::attach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:54
 * @route '/admin/co-instructors/{course}/attach'
 */
attach.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return attach.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoInstructorController::attach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:54
 * @route '/admin/co-instructors/{course}/attach'
 */
attach.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attach.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CoInstructorController::attach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:54
 * @route '/admin/co-instructors/{course}/attach'
 */
    const attachForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: attach.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CoInstructorController::attach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:54
 * @route '/admin/co-instructors/{course}/attach'
 */
        attachForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: attach.url(args, options),
            method: 'post',
        })
    
    attach.form = attachForm
/**
* @see \App\Http\Controllers\Admin\CoInstructorController::detach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:71
 * @route '/admin/co-instructors/{course}/{instructor}'
 */
export const detach = (args: { course: string | number | { id: string | number }, instructor: string | number | { id: string | number } } | [course: string | number | { id: string | number }, instructor: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

detach.definition = {
    methods: ["delete"],
    url: '/admin/co-instructors/{course}/{instructor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CoInstructorController::detach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:71
 * @route '/admin/co-instructors/{course}/{instructor}'
 */
detach.url = (args: { course: string | number | { id: string | number }, instructor: string | number | { id: string | number } } | [course: string | number | { id: string | number }, instructor: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                    instructor: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                                instructor: typeof args.instructor === 'object'
                ? args.instructor.id
                : args.instructor,
                }

    return detach.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{instructor}', parsedArgs.instructor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoInstructorController::detach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:71
 * @route '/admin/co-instructors/{course}/{instructor}'
 */
detach.delete = (args: { course: string | number | { id: string | number }, instructor: string | number | { id: string | number } } | [course: string | number | { id: string | number }, instructor: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detach.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CoInstructorController::detach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:71
 * @route '/admin/co-instructors/{course}/{instructor}'
 */
    const detachForm = (args: { course: string | number | { id: string | number }, instructor: string | number | { id: string | number } } | [course: string | number | { id: string | number }, instructor: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: detach.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CoInstructorController::detach
 * @see app/Http/Controllers/Admin/CoInstructorController.php:71
 * @route '/admin/co-instructors/{course}/{instructor}'
 */
        detachForm.delete = (args: { course: string | number | { id: string | number }, instructor: string | number | { id: string | number } } | [course: string | number | { id: string | number }, instructor: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: detach.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    detach.form = detachForm
const CoInstructorController = { index, show, attach, detach }

export default CoInstructorController