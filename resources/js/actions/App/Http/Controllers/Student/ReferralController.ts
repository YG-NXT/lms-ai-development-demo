import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\ReferralController::index
 * @see app/Http/Controllers/Student/ReferralController.php:13
 * @route '/student/referral'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/referral',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\ReferralController::index
 * @see app/Http/Controllers/Student/ReferralController.php:13
 * @route '/student/referral'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\ReferralController::index
 * @see app/Http/Controllers/Student/ReferralController.php:13
 * @route '/student/referral'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\ReferralController::index
 * @see app/Http/Controllers/Student/ReferralController.php:13
 * @route '/student/referral'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\ReferralController::index
 * @see app/Http/Controllers/Student/ReferralController.php:13
 * @route '/student/referral'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\ReferralController::index
 * @see app/Http/Controllers/Student/ReferralController.php:13
 * @route '/student/referral'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\ReferralController::index
 * @see app/Http/Controllers/Student/ReferralController.php:13
 * @route '/student/referral'
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
* @see \App\Http\Controllers\Student\ReferralController::store
 * @see app/Http/Controllers/Student/ReferralController.php:24
 * @route '/student/referral'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/referral',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\ReferralController::store
 * @see app/Http/Controllers/Student/ReferralController.php:24
 * @route '/student/referral'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\ReferralController::store
 * @see app/Http/Controllers/Student/ReferralController.php:24
 * @route '/student/referral'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\ReferralController::store
 * @see app/Http/Controllers/Student/ReferralController.php:24
 * @route '/student/referral'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\ReferralController::store
 * @see app/Http/Controllers/Student/ReferralController.php:24
 * @route '/student/referral'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Student\ReferralController::complete
 * @see app/Http/Controllers/Student/ReferralController.php:37
 * @route '/student/referral/complete'
 */
export const complete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/student/referral/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\ReferralController::complete
 * @see app/Http/Controllers/Student/ReferralController.php:37
 * @route '/student/referral/complete'
 */
complete.url = (options?: RouteQueryOptions) => {
    return complete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\ReferralController::complete
 * @see app/Http/Controllers/Student/ReferralController.php:37
 * @route '/student/referral/complete'
 */
complete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\ReferralController::complete
 * @see app/Http/Controllers/Student/ReferralController.php:37
 * @route '/student/referral/complete'
 */
    const completeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\ReferralController::complete
 * @see app/Http/Controllers/Student/ReferralController.php:37
 * @route '/student/referral/complete'
 */
        completeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(options),
            method: 'post',
        })
    
    complete.form = completeForm
const ReferralController = { index, store, complete }

export default ReferralController