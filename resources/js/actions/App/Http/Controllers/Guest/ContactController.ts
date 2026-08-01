import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Guest\ContactController::show
 * @see app/Http/Controllers/Guest/ContactController.php:10
 * @route '/contact-us'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/contact-us',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\ContactController::show
 * @see app/Http/Controllers/Guest/ContactController.php:10
 * @route '/contact-us'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\ContactController::show
 * @see app/Http/Controllers/Guest/ContactController.php:10
 * @route '/contact-us'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\ContactController::show
 * @see app/Http/Controllers/Guest/ContactController.php:10
 * @route '/contact-us'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\ContactController::show
 * @see app/Http/Controllers/Guest/ContactController.php:10
 * @route '/contact-us'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\ContactController::show
 * @see app/Http/Controllers/Guest/ContactController.php:10
 * @route '/contact-us'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\ContactController::show
 * @see app/Http/Controllers/Guest/ContactController.php:10
 * @route '/contact-us'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const ContactController = { show }

export default ContactController