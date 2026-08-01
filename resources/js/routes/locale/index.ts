import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Guest\LocaleController::switchMethod
 * @see app/Http/Controllers/Guest/LocaleController.php:13
 * @route '/locale/{locale}'
 */
export const switchMethod = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: switchMethod.url(args, options),
    method: 'get',
})

switchMethod.definition = {
    methods: ["get","head"],
    url: '/locale/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\LocaleController::switchMethod
 * @see app/Http/Controllers/Guest/LocaleController.php:13
 * @route '/locale/{locale}'
 */
switchMethod.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return switchMethod.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\LocaleController::switchMethod
 * @see app/Http/Controllers/Guest/LocaleController.php:13
 * @route '/locale/{locale}'
 */
switchMethod.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: switchMethod.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\LocaleController::switchMethod
 * @see app/Http/Controllers/Guest/LocaleController.php:13
 * @route '/locale/{locale}'
 */
switchMethod.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: switchMethod.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\LocaleController::switchMethod
 * @see app/Http/Controllers/Guest/LocaleController.php:13
 * @route '/locale/{locale}'
 */
    const switchMethodForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: switchMethod.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\LocaleController::switchMethod
 * @see app/Http/Controllers/Guest/LocaleController.php:13
 * @route '/locale/{locale}'
 */
        switchMethodForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: switchMethod.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\LocaleController::switchMethod
 * @see app/Http/Controllers/Guest/LocaleController.php:13
 * @route '/locale/{locale}'
 */
        switchMethodForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: switchMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    switchMethod.form = switchMethodForm
const locale = {
    switch: Object.assign(switchMethod, switchMethod),
}

export default locale