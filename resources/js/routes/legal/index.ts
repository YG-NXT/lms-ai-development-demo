import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Guest\LegalPageController::privacy
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
export const privacy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})

privacy.definition = {
    methods: ["get","head"],
    url: '/privacy-policy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\LegalPageController::privacy
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
privacy.url = (options?: RouteQueryOptions) => {
    return privacy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\LegalPageController::privacy
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
privacy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\LegalPageController::privacy
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
privacy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacy.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\LegalPageController::privacy
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
    const privacyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: privacy.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\LegalPageController::privacy
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
        privacyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\LegalPageController::privacy
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
        privacyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    privacy.form = privacyForm
/**
* @see \App\Http\Controllers\Guest\LegalPageController::terms
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
export const terms = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})

terms.definition = {
    methods: ["get","head"],
    url: '/terms-and-conditions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\LegalPageController::terms
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
terms.url = (options?: RouteQueryOptions) => {
    return terms.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\LegalPageController::terms
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
terms.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\LegalPageController::terms
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
terms.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: terms.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\LegalPageController::terms
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
    const termsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: terms.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\LegalPageController::terms
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
        termsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\LegalPageController::terms
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
        termsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    terms.form = termsForm
/**
* @see \App\Http\Controllers\Guest\LegalPageController::about
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/about-us',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\LegalPageController::about
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\LegalPageController::about
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\LegalPageController::about
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\LegalPageController::about
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
    const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: about.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\LegalPageController::about
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
        aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\LegalPageController::about
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
        aboutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    about.form = aboutForm
const legal = {
    privacy: Object.assign(privacy, privacy),
terms: Object.assign(terms, terms),
about: Object.assign(about, about),
}

export default legal