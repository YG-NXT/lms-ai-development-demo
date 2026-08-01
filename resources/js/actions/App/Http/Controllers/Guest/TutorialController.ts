import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Guest\TutorialController::index
 * @see app/Http/Controllers/Guest/TutorialController.php:13
 * @route '/tutorials'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tutorials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\TutorialController::index
 * @see app/Http/Controllers/Guest/TutorialController.php:13
 * @route '/tutorials'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\TutorialController::index
 * @see app/Http/Controllers/Guest/TutorialController.php:13
 * @route '/tutorials'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\TutorialController::index
 * @see app/Http/Controllers/Guest/TutorialController.php:13
 * @route '/tutorials'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\TutorialController::index
 * @see app/Http/Controllers/Guest/TutorialController.php:13
 * @route '/tutorials'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\TutorialController::index
 * @see app/Http/Controllers/Guest/TutorialController.php:13
 * @route '/tutorials'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\TutorialController::index
 * @see app/Http/Controllers/Guest/TutorialController.php:13
 * @route '/tutorials'
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
* @see \App\Http\Controllers\Guest\TutorialController::show
 * @see app/Http/Controllers/Guest/TutorialController.php:64
 * @route '/tutorials/{tutorial}'
 */
export const show = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tutorials/{tutorial}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\TutorialController::show
 * @see app/Http/Controllers/Guest/TutorialController.php:64
 * @route '/tutorials/{tutorial}'
 */
show.url = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tutorial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { tutorial: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tutorial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tutorial: typeof args.tutorial === 'object'
                ? args.tutorial.slug
                : args.tutorial,
                }

    return show.definition.url
            .replace('{tutorial}', parsedArgs.tutorial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\TutorialController::show
 * @see app/Http/Controllers/Guest/TutorialController.php:64
 * @route '/tutorials/{tutorial}'
 */
show.get = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\TutorialController::show
 * @see app/Http/Controllers/Guest/TutorialController.php:64
 * @route '/tutorials/{tutorial}'
 */
show.head = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\TutorialController::show
 * @see app/Http/Controllers/Guest/TutorialController.php:64
 * @route '/tutorials/{tutorial}'
 */
    const showForm = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\TutorialController::show
 * @see app/Http/Controllers/Guest/TutorialController.php:64
 * @route '/tutorials/{tutorial}'
 */
        showForm.get = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\TutorialController::show
 * @see app/Http/Controllers/Guest/TutorialController.php:64
 * @route '/tutorials/{tutorial}'
 */
        showForm.head = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const TutorialController = { index, show }

export default TutorialController