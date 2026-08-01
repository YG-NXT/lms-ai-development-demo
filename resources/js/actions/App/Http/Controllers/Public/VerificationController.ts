import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\VerificationController::index
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/verify-certificate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\VerificationController::index
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\VerificationController::index
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\VerificationController::index
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\VerificationController::index
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\VerificationController::index
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\VerificationController::index
 * @see app/Http/Controllers/Public/VerificationController.php:19
 * @route '/verify-certificate'
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
const VerificationController = { index }

export default VerificationController