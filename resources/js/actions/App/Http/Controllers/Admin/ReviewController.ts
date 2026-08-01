import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ReviewController::index
 * @see app/Http/Controllers/Admin/ReviewController.php:14
 * @route '/admin/reviews'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/reviews',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReviewController::index
 * @see app/Http/Controllers/Admin/ReviewController.php:14
 * @route '/admin/reviews'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReviewController::index
 * @see app/Http/Controllers/Admin/ReviewController.php:14
 * @route '/admin/reviews'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReviewController::index
 * @see app/Http/Controllers/Admin/ReviewController.php:14
 * @route '/admin/reviews'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ReviewController::index
 * @see app/Http/Controllers/Admin/ReviewController.php:14
 * @route '/admin/reviews'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ReviewController::index
 * @see app/Http/Controllers/Admin/ReviewController.php:14
 * @route '/admin/reviews'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ReviewController::index
 * @see app/Http/Controllers/Admin/ReviewController.php:14
 * @route '/admin/reviews'
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
* @see \App\Http\Controllers\Admin\ReviewController::updateStatus
 * @see app/Http/Controllers/Admin/ReviewController.php:46
 * @route '/admin/reviews/{review}/status'
 */
export const updateStatus = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/reviews/{review}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\ReviewController::updateStatus
 * @see app/Http/Controllers/Admin/ReviewController.php:46
 * @route '/admin/reviews/{review}/status'
 */
updateStatus.url = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { review: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        review: typeof args.review === 'object'
                ? args.review.id
                : args.review,
                }

    return updateStatus.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReviewController::updateStatus
 * @see app/Http/Controllers/Admin/ReviewController.php:46
 * @route '/admin/reviews/{review}/status'
 */
updateStatus.patch = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ReviewController::updateStatus
 * @see app/Http/Controllers/Admin/ReviewController.php:46
 * @route '/admin/reviews/{review}/status'
 */
    const updateStatusForm = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ReviewController::updateStatus
 * @see app/Http/Controllers/Admin/ReviewController.php:46
 * @route '/admin/reviews/{review}/status'
 */
        updateStatusForm.patch = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \App\Http\Controllers\Admin\ReviewController::destroy
 * @see app/Http/Controllers/Admin/ReviewController.php:59
 * @route '/admin/reviews/{review}'
 */
export const destroy = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/reviews/{review}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ReviewController::destroy
 * @see app/Http/Controllers/Admin/ReviewController.php:59
 * @route '/admin/reviews/{review}'
 */
destroy.url = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { review: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        review: typeof args.review === 'object'
                ? args.review.id
                : args.review,
                }

    return destroy.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReviewController::destroy
 * @see app/Http/Controllers/Admin/ReviewController.php:59
 * @route '/admin/reviews/{review}'
 */
destroy.delete = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ReviewController::destroy
 * @see app/Http/Controllers/Admin/ReviewController.php:59
 * @route '/admin/reviews/{review}'
 */
    const destroyForm = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ReviewController::destroy
 * @see app/Http/Controllers/Admin/ReviewController.php:59
 * @route '/admin/reviews/{review}'
 */
        destroyForm.delete = (args: { review: string | number | { id: string | number } } | [review: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ReviewController = { index, updateStatus, destroy }

export default ReviewController