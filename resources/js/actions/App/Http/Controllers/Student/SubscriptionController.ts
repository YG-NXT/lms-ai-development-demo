import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\SubscriptionController::index
 * @see app/Http/Controllers/Student/SubscriptionController.php:21
 * @route '/student/subscriptions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/subscriptions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\SubscriptionController::index
 * @see app/Http/Controllers/Student/SubscriptionController.php:21
 * @route '/student/subscriptions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\SubscriptionController::index
 * @see app/Http/Controllers/Student/SubscriptionController.php:21
 * @route '/student/subscriptions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\SubscriptionController::index
 * @see app/Http/Controllers/Student/SubscriptionController.php:21
 * @route '/student/subscriptions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\SubscriptionController::index
 * @see app/Http/Controllers/Student/SubscriptionController.php:21
 * @route '/student/subscriptions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\SubscriptionController::index
 * @see app/Http/Controllers/Student/SubscriptionController.php:21
 * @route '/student/subscriptions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\SubscriptionController::index
 * @see app/Http/Controllers/Student/SubscriptionController.php:21
 * @route '/student/subscriptions'
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
* @see \App\Http\Controllers\Student\SubscriptionController::checkout
 * @see app/Http/Controllers/Student/SubscriptionController.php:36
 * @route '/student/subscriptions/{plan}/checkout'
 */
export const checkout = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(args, options),
    method: 'get',
})

checkout.definition = {
    methods: ["get","head"],
    url: '/student/subscriptions/{plan}/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\SubscriptionController::checkout
 * @see app/Http/Controllers/Student/SubscriptionController.php:36
 * @route '/student/subscriptions/{plan}/checkout'
 */
checkout.url = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { plan: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    plan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        plan: typeof args.plan === 'object'
                ? args.plan.slug
                : args.plan,
                }

    return checkout.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\SubscriptionController::checkout
 * @see app/Http/Controllers/Student/SubscriptionController.php:36
 * @route '/student/subscriptions/{plan}/checkout'
 */
checkout.get = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\SubscriptionController::checkout
 * @see app/Http/Controllers/Student/SubscriptionController.php:36
 * @route '/student/subscriptions/{plan}/checkout'
 */
checkout.head = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkout.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\SubscriptionController::checkout
 * @see app/Http/Controllers/Student/SubscriptionController.php:36
 * @route '/student/subscriptions/{plan}/checkout'
 */
    const checkoutForm = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: checkout.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\SubscriptionController::checkout
 * @see app/Http/Controllers/Student/SubscriptionController.php:36
 * @route '/student/subscriptions/{plan}/checkout'
 */
        checkoutForm.get = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkout.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\SubscriptionController::checkout
 * @see app/Http/Controllers/Student/SubscriptionController.php:36
 * @route '/student/subscriptions/{plan}/checkout'
 */
        checkoutForm.head = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkout.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    checkout.form = checkoutForm
/**
* @see \App\Http\Controllers\Student\SubscriptionController::purchase
 * @see app/Http/Controllers/Student/SubscriptionController.php:50
 * @route '/student/subscriptions/{plan}/purchase'
 */
export const purchase = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: purchase.url(args, options),
    method: 'post',
})

purchase.definition = {
    methods: ["post"],
    url: '/student/subscriptions/{plan}/purchase',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\SubscriptionController::purchase
 * @see app/Http/Controllers/Student/SubscriptionController.php:50
 * @route '/student/subscriptions/{plan}/purchase'
 */
purchase.url = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { plan: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    plan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        plan: typeof args.plan === 'object'
                ? args.plan.slug
                : args.plan,
                }

    return purchase.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\SubscriptionController::purchase
 * @see app/Http/Controllers/Student/SubscriptionController.php:50
 * @route '/student/subscriptions/{plan}/purchase'
 */
purchase.post = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: purchase.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\SubscriptionController::purchase
 * @see app/Http/Controllers/Student/SubscriptionController.php:50
 * @route '/student/subscriptions/{plan}/purchase'
 */
    const purchaseForm = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: purchase.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\SubscriptionController::purchase
 * @see app/Http/Controllers/Student/SubscriptionController.php:50
 * @route '/student/subscriptions/{plan}/purchase'
 */
        purchaseForm.post = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: purchase.url(args, options),
            method: 'post',
        })
    
    purchase.form = purchaseForm
/**
* @see \App\Http\Controllers\Student\SubscriptionController::callback
 * @see app/Http/Controllers/Student/SubscriptionController.php:105
 * @route '/student/subscriptions/callback'
 */
export const callback = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callback.url(options),
    method: 'post',
})

callback.definition = {
    methods: ["post"],
    url: '/student/subscriptions/callback',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\SubscriptionController::callback
 * @see app/Http/Controllers/Student/SubscriptionController.php:105
 * @route '/student/subscriptions/callback'
 */
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\SubscriptionController::callback
 * @see app/Http/Controllers/Student/SubscriptionController.php:105
 * @route '/student/subscriptions/callback'
 */
callback.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callback.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\SubscriptionController::callback
 * @see app/Http/Controllers/Student/SubscriptionController.php:105
 * @route '/student/subscriptions/callback'
 */
    const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: callback.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\SubscriptionController::callback
 * @see app/Http/Controllers/Student/SubscriptionController.php:105
 * @route '/student/subscriptions/callback'
 */
        callbackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: callback.url(options),
            method: 'post',
        })
    
    callback.form = callbackForm
/**
* @see \App\Http\Controllers\Student\SubscriptionController::cancel
 * @see app/Http/Controllers/Student/SubscriptionController.php:144
 * @route '/student/subscriptions/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/student/subscriptions/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\SubscriptionController::cancel
 * @see app/Http/Controllers/Student/SubscriptionController.php:144
 * @route '/student/subscriptions/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\SubscriptionController::cancel
 * @see app/Http/Controllers/Student/SubscriptionController.php:144
 * @route '/student/subscriptions/cancel'
 */
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\SubscriptionController::cancel
 * @see app/Http/Controllers/Student/SubscriptionController.php:144
 * @route '/student/subscriptions/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\SubscriptionController::cancel
 * @see app/Http/Controllers/Student/SubscriptionController.php:144
 * @route '/student/subscriptions/cancel'
 */
        cancelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(options),
            method: 'post',
        })
    
    cancel.form = cancelForm
/**
* @see \App\Http\Controllers\Student\SubscriptionController::update
 * @see app/Http/Controllers/Student/SubscriptionController.php:164
 * @route '/student/subscriptions/update/{plan}'
 */
export const update = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/student/subscriptions/update/{plan}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\SubscriptionController::update
 * @see app/Http/Controllers/Student/SubscriptionController.php:164
 * @route '/student/subscriptions/update/{plan}'
 */
update.url = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { plan: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    plan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        plan: typeof args.plan === 'object'
                ? args.plan.slug
                : args.plan,
                }

    return update.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\SubscriptionController::update
 * @see app/Http/Controllers/Student/SubscriptionController.php:164
 * @route '/student/subscriptions/update/{plan}'
 */
update.post = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\SubscriptionController::update
 * @see app/Http/Controllers/Student/SubscriptionController.php:164
 * @route '/student/subscriptions/update/{plan}'
 */
    const updateForm = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\SubscriptionController::update
 * @see app/Http/Controllers/Student/SubscriptionController.php:164
 * @route '/student/subscriptions/update/{plan}'
 */
        updateForm.post = (args: { plan: string | number | { slug: string | number } } | [plan: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Student\SubscriptionController::subscribe
 * @see app/Http/Controllers/Student/SubscriptionController.php:0
 * @route '/student/subscriptions/{plan}/subscribe'
 */
export const subscribe = (args: { plan: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: subscribe.url(args, options),
    method: 'post',
})

subscribe.definition = {
    methods: ["post"],
    url: '/student/subscriptions/{plan}/subscribe',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\SubscriptionController::subscribe
 * @see app/Http/Controllers/Student/SubscriptionController.php:0
 * @route '/student/subscriptions/{plan}/subscribe'
 */
subscribe.url = (args: { plan: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plan: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    plan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        plan: args.plan,
                }

    return subscribe.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\SubscriptionController::subscribe
 * @see app/Http/Controllers/Student/SubscriptionController.php:0
 * @route '/student/subscriptions/{plan}/subscribe'
 */
subscribe.post = (args: { plan: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: subscribe.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\SubscriptionController::subscribe
 * @see app/Http/Controllers/Student/SubscriptionController.php:0
 * @route '/student/subscriptions/{plan}/subscribe'
 */
    const subscribeForm = (args: { plan: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: subscribe.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\SubscriptionController::subscribe
 * @see app/Http/Controllers/Student/SubscriptionController.php:0
 * @route '/student/subscriptions/{plan}/subscribe'
 */
        subscribeForm.post = (args: { plan: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: subscribe.url(args, options),
            method: 'post',
        })
    
    subscribe.form = subscribeForm
const SubscriptionController = { index, checkout, purchase, callback, cancel, update, subscribe }

export default SubscriptionController