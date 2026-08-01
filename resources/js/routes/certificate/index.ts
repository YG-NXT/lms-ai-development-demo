import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\VerificationController::verify
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
export const verify = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/verify-certificate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\VerificationController::verify
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\VerificationController::verify
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
verify.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\VerificationController::verify
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
verify.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\VerificationController::verify
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
    const verifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verify.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\VerificationController::verify
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
        verifyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\VerificationController::verify
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
        verifyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verify.form = verifyForm
const certificate = {
    verify: Object.assign(verify, verify),
}

export default certificate