import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
const show546d1d979582dcab4cda77f98be026ca = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show546d1d979582dcab4cda77f98be026ca.url(options),
    method: 'get',
})

show546d1d979582dcab4cda77f98be026ca.definition = {
    methods: ["get","head"],
    url: '/privacy-policy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
show546d1d979582dcab4cda77f98be026ca.url = (options?: RouteQueryOptions) => {
    return show546d1d979582dcab4cda77f98be026ca.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
show546d1d979582dcab4cda77f98be026ca.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show546d1d979582dcab4cda77f98be026ca.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
show546d1d979582dcab4cda77f98be026ca.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show546d1d979582dcab4cda77f98be026ca.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
    const show546d1d979582dcab4cda77f98be026caForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show546d1d979582dcab4cda77f98be026ca.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
        show546d1d979582dcab4cda77f98be026caForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show546d1d979582dcab4cda77f98be026ca.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/privacy-policy'
 */
        show546d1d979582dcab4cda77f98be026caForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show546d1d979582dcab4cda77f98be026ca.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show546d1d979582dcab4cda77f98be026ca.form = show546d1d979582dcab4cda77f98be026caForm
    /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
const show1e68cefabb38f5fd8767625e1e3eeb68 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1e68cefabb38f5fd8767625e1e3eeb68.url(options),
    method: 'get',
})

show1e68cefabb38f5fd8767625e1e3eeb68.definition = {
    methods: ["get","head"],
    url: '/terms-and-conditions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
show1e68cefabb38f5fd8767625e1e3eeb68.url = (options?: RouteQueryOptions) => {
    return show1e68cefabb38f5fd8767625e1e3eeb68.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
show1e68cefabb38f5fd8767625e1e3eeb68.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1e68cefabb38f5fd8767625e1e3eeb68.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
show1e68cefabb38f5fd8767625e1e3eeb68.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show1e68cefabb38f5fd8767625e1e3eeb68.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
    const show1e68cefabb38f5fd8767625e1e3eeb68Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show1e68cefabb38f5fd8767625e1e3eeb68.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
        show1e68cefabb38f5fd8767625e1e3eeb68Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show1e68cefabb38f5fd8767625e1e3eeb68.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/terms-and-conditions'
 */
        show1e68cefabb38f5fd8767625e1e3eeb68Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show1e68cefabb38f5fd8767625e1e3eeb68.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show1e68cefabb38f5fd8767625e1e3eeb68.form = show1e68cefabb38f5fd8767625e1e3eeb68Form
    /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
const showa95bbcd50157b4354b5f10a04f8364e7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showa95bbcd50157b4354b5f10a04f8364e7.url(options),
    method: 'get',
})

showa95bbcd50157b4354b5f10a04f8364e7.definition = {
    methods: ["get","head"],
    url: '/about-us',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
showa95bbcd50157b4354b5f10a04f8364e7.url = (options?: RouteQueryOptions) => {
    return showa95bbcd50157b4354b5f10a04f8364e7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
showa95bbcd50157b4354b5f10a04f8364e7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showa95bbcd50157b4354b5f10a04f8364e7.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
showa95bbcd50157b4354b5f10a04f8364e7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showa95bbcd50157b4354b5f10a04f8364e7.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
    const showa95bbcd50157b4354b5f10a04f8364e7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showa95bbcd50157b4354b5f10a04f8364e7.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
        showa95bbcd50157b4354b5f10a04f8364e7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showa95bbcd50157b4354b5f10a04f8364e7.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\LegalPageController::show
 * @see app/Http/Controllers/Guest/LegalPageController.php:11
 * @route '/about-us'
 */
        showa95bbcd50157b4354b5f10a04f8364e7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showa95bbcd50157b4354b5f10a04f8364e7.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showa95bbcd50157b4354b5f10a04f8364e7.form = showa95bbcd50157b4354b5f10a04f8364e7Form

export const show = {
    '/privacy-policy': show546d1d979582dcab4cda77f98be026ca,
    '/terms-and-conditions': show1e68cefabb38f5fd8767625e1e3eeb68,
    '/about-us': showa95bbcd50157b4354b5f10a04f8364e7,
}

const LegalPageController = { show }

export default LegalPageController