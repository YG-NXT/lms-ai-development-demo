import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\CheckoutController::validateCoupon
 * @see app/Http/Controllers/Student/CheckoutController.php:200
 * @route '/student/checkout/{course}/validate-coupon'
 */
export const validateCoupon = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateCoupon.url(args, options),
    method: 'post',
})

validateCoupon.definition = {
    methods: ["post"],
    url: '/student/checkout/{course}/validate-coupon',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CheckoutController::validateCoupon
 * @see app/Http/Controllers/Student/CheckoutController.php:200
 * @route '/student/checkout/{course}/validate-coupon'
 */
validateCoupon.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return validateCoupon.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CheckoutController::validateCoupon
 * @see app/Http/Controllers/Student/CheckoutController.php:200
 * @route '/student/checkout/{course}/validate-coupon'
 */
validateCoupon.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateCoupon.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CheckoutController::validateCoupon
 * @see app/Http/Controllers/Student/CheckoutController.php:200
 * @route '/student/checkout/{course}/validate-coupon'
 */
    const validateCouponForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: validateCoupon.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CheckoutController::validateCoupon
 * @see app/Http/Controllers/Student/CheckoutController.php:200
 * @route '/student/checkout/{course}/validate-coupon'
 */
        validateCouponForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: validateCoupon.url(args, options),
            method: 'post',
        })
    
    validateCoupon.form = validateCouponForm
/**
* @see \App\Http\Controllers\Student\CheckoutController::callback
 * @see app/Http/Controllers/Student/CheckoutController.php:114
 * @route '/student/checkout/callback'
 */
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/student/checkout/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CheckoutController::callback
 * @see app/Http/Controllers/Student/CheckoutController.php:114
 * @route '/student/checkout/callback'
 */
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CheckoutController::callback
 * @see app/Http/Controllers/Student/CheckoutController.php:114
 * @route '/student/checkout/callback'
 */
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\CheckoutController::callback
 * @see app/Http/Controllers/Student/CheckoutController.php:114
 * @route '/student/checkout/callback'
 */
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\CheckoutController::callback
 * @see app/Http/Controllers/Student/CheckoutController.php:114
 * @route '/student/checkout/callback'
 */
    const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: callback.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\CheckoutController::callback
 * @see app/Http/Controllers/Student/CheckoutController.php:114
 * @route '/student/checkout/callback'
 */
        callbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\CheckoutController::callback
 * @see app/Http/Controllers/Student/CheckoutController.php:114
 * @route '/student/checkout/callback'
 */
        callbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    callback.form = callbackForm
/**
* @see \App\Http\Controllers\Student\CheckoutController::show
 * @see app/Http/Controllers/Student/CheckoutController.php:36
 * @route '/student/checkout/{course}'
 */
export const show = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/checkout/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CheckoutController::show
 * @see app/Http/Controllers/Student/CheckoutController.php:36
 * @route '/student/checkout/{course}'
 */
show.url = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { course: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.slug
                : args.course,
                }

    return show.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CheckoutController::show
 * @see app/Http/Controllers/Student/CheckoutController.php:36
 * @route '/student/checkout/{course}'
 */
show.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\CheckoutController::show
 * @see app/Http/Controllers/Student/CheckoutController.php:36
 * @route '/student/checkout/{course}'
 */
show.head = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\CheckoutController::show
 * @see app/Http/Controllers/Student/CheckoutController.php:36
 * @route '/student/checkout/{course}'
 */
    const showForm = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\CheckoutController::show
 * @see app/Http/Controllers/Student/CheckoutController.php:36
 * @route '/student/checkout/{course}'
 */
        showForm.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\CheckoutController::show
 * @see app/Http/Controllers/Student/CheckoutController.php:36
 * @route '/student/checkout/{course}'
 */
        showForm.head = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Student\CheckoutController::store
 * @see app/Http/Controllers/Student/CheckoutController.php:66
 * @route '/student/checkout/{course}'
 */
export const store = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/checkout/{course}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CheckoutController::store
 * @see app/Http/Controllers/Student/CheckoutController.php:66
 * @route '/student/checkout/{course}'
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
* @see \App\Http\Controllers\Student\CheckoutController::store
 * @see app/Http/Controllers/Student/CheckoutController.php:66
 * @route '/student/checkout/{course}'
 */
store.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CheckoutController::store
 * @see app/Http/Controllers/Student/CheckoutController.php:66
 * @route '/student/checkout/{course}'
 */
    const storeForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CheckoutController::store
 * @see app/Http/Controllers/Student/CheckoutController.php:66
 * @route '/student/checkout/{course}'
 */
        storeForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const CheckoutController = { validateCoupon, callback, show, store }

export default CheckoutController