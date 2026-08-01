import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AssignmentController::index
 * @see app/Http/Controllers/Admin/AssignmentController.php:19
 * @route '/admin/assignments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/assignments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AssignmentController::index
 * @see app/Http/Controllers/Admin/AssignmentController.php:19
 * @route '/admin/assignments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AssignmentController::index
 * @see app/Http/Controllers/Admin/AssignmentController.php:19
 * @route '/admin/assignments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AssignmentController::index
 * @see app/Http/Controllers/Admin/AssignmentController.php:19
 * @route '/admin/assignments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AssignmentController::index
 * @see app/Http/Controllers/Admin/AssignmentController.php:19
 * @route '/admin/assignments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AssignmentController::index
 * @see app/Http/Controllers/Admin/AssignmentController.php:19
 * @route '/admin/assignments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AssignmentController::index
 * @see app/Http/Controllers/Admin/AssignmentController.php:19
 * @route '/admin/assignments'
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
* @see \App\Http\Controllers\Admin\AssignmentController::show
 * @see app/Http/Controllers/Admin/AssignmentController.php:68
 * @route '/admin/assignments/course/{course}'
 */
export const show = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/assignments/course/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AssignmentController::show
 * @see app/Http/Controllers/Admin/AssignmentController.php:68
 * @route '/admin/assignments/course/{course}'
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
* @see \App\Http\Controllers\Admin\AssignmentController::show
 * @see app/Http/Controllers/Admin/AssignmentController.php:68
 * @route '/admin/assignments/course/{course}'
 */
show.get = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AssignmentController::show
 * @see app/Http/Controllers/Admin/AssignmentController.php:68
 * @route '/admin/assignments/course/{course}'
 */
show.head = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AssignmentController::show
 * @see app/Http/Controllers/Admin/AssignmentController.php:68
 * @route '/admin/assignments/course/{course}'
 */
    const showForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AssignmentController::show
 * @see app/Http/Controllers/Admin/AssignmentController.php:68
 * @route '/admin/assignments/course/{course}'
 */
        showForm.get = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AssignmentController::show
 * @see app/Http/Controllers/Admin/AssignmentController.php:68
 * @route '/admin/assignments/course/{course}'
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
* @see \App\Http\Controllers\Admin\AssignmentController::review
 * @see app/Http/Controllers/Admin/AssignmentController.php:93
 * @route '/admin/assignments/review/{assignment}'
 */
export const review = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: review.url(args, options),
    method: 'get',
})

review.definition = {
    methods: ["get","head"],
    url: '/admin/assignments/review/{assignment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AssignmentController::review
 * @see app/Http/Controllers/Admin/AssignmentController.php:93
 * @route '/admin/assignments/review/{assignment}'
 */
review.url = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return review.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AssignmentController::review
 * @see app/Http/Controllers/Admin/AssignmentController.php:93
 * @route '/admin/assignments/review/{assignment}'
 */
review.get = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: review.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AssignmentController::review
 * @see app/Http/Controllers/Admin/AssignmentController.php:93
 * @route '/admin/assignments/review/{assignment}'
 */
review.head = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: review.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AssignmentController::review
 * @see app/Http/Controllers/Admin/AssignmentController.php:93
 * @route '/admin/assignments/review/{assignment}'
 */
    const reviewForm = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: review.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AssignmentController::review
 * @see app/Http/Controllers/Admin/AssignmentController.php:93
 * @route '/admin/assignments/review/{assignment}'
 */
        reviewForm.get = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: review.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AssignmentController::review
 * @see app/Http/Controllers/Admin/AssignmentController.php:93
 * @route '/admin/assignments/review/{assignment}'
 */
        reviewForm.head = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: review.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    review.form = reviewForm
/**
* @see \App\Http\Controllers\Admin\AssignmentController::update
 * @see app/Http/Controllers/Admin/AssignmentController.php:110
 * @route '/admin/assignments/{assignment}'
 */
export const update = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/assignments/{assignment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AssignmentController::update
 * @see app/Http/Controllers/Admin/AssignmentController.php:110
 * @route '/admin/assignments/{assignment}'
 */
update.url = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AssignmentController::update
 * @see app/Http/Controllers/Admin/AssignmentController.php:110
 * @route '/admin/assignments/{assignment}'
 */
update.put = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AssignmentController::update
 * @see app/Http/Controllers/Admin/AssignmentController.php:110
 * @route '/admin/assignments/{assignment}'
 */
    const updateForm = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AssignmentController::update
 * @see app/Http/Controllers/Admin/AssignmentController.php:110
 * @route '/admin/assignments/{assignment}'
 */
        updateForm.put = (args: { assignment: string | number | { id: string | number } } | [assignment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const AssignmentController = { index, show, review, update }

export default AssignmentController