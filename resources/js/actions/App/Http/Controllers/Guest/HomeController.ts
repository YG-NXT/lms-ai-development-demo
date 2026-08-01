import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Guest\HomeController::index
 * @see app/Http/Controllers/Guest/HomeController.php:14
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\HomeController::index
 * @see app/Http/Controllers/Guest/HomeController.php:14
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\HomeController::index
 * @see app/Http/Controllers/Guest/HomeController.php:14
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\HomeController::index
 * @see app/Http/Controllers/Guest/HomeController.php:14
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\HomeController::index
 * @see app/Http/Controllers/Guest/HomeController.php:14
 * @route '/'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\HomeController::index
 * @see app/Http/Controllers/Guest/HomeController.php:14
 * @route '/'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\HomeController::index
 * @see app/Http/Controllers/Guest/HomeController.php:14
 * @route '/'
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
* @see \App\Http\Controllers\Guest\HomeController::courseIndex
 * @see app/Http/Controllers/Guest/HomeController.php:104
 * @route '/courses'
 */
export const courseIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courseIndex.url(options),
    method: 'get',
})

courseIndex.definition = {
    methods: ["get","head"],
    url: '/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\HomeController::courseIndex
 * @see app/Http/Controllers/Guest/HomeController.php:104
 * @route '/courses'
 */
courseIndex.url = (options?: RouteQueryOptions) => {
    return courseIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\HomeController::courseIndex
 * @see app/Http/Controllers/Guest/HomeController.php:104
 * @route '/courses'
 */
courseIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courseIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\HomeController::courseIndex
 * @see app/Http/Controllers/Guest/HomeController.php:104
 * @route '/courses'
 */
courseIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: courseIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\HomeController::courseIndex
 * @see app/Http/Controllers/Guest/HomeController.php:104
 * @route '/courses'
 */
    const courseIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: courseIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\HomeController::courseIndex
 * @see app/Http/Controllers/Guest/HomeController.php:104
 * @route '/courses'
 */
        courseIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courseIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\HomeController::courseIndex
 * @see app/Http/Controllers/Guest/HomeController.php:104
 * @route '/courses'
 */
        courseIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courseIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    courseIndex.form = courseIndexForm
/**
* @see \App\Http\Controllers\Guest\HomeController::show
 * @see app/Http/Controllers/Guest/HomeController.php:169
 * @route '/courses/{course}'
 */
export const show = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/courses/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\HomeController::show
 * @see app/Http/Controllers/Guest/HomeController.php:169
 * @route '/courses/{course}'
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
* @see \App\Http\Controllers\Guest\HomeController::show
 * @see app/Http/Controllers/Guest/HomeController.php:169
 * @route '/courses/{course}'
 */
show.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\HomeController::show
 * @see app/Http/Controllers/Guest/HomeController.php:169
 * @route '/courses/{course}'
 */
show.head = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\HomeController::show
 * @see app/Http/Controllers/Guest/HomeController.php:169
 * @route '/courses/{course}'
 */
    const showForm = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\HomeController::show
 * @see app/Http/Controllers/Guest/HomeController.php:169
 * @route '/courses/{course}'
 */
        showForm.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\HomeController::show
 * @see app/Http/Controllers/Guest/HomeController.php:169
 * @route '/courses/{course}'
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
const HomeController = { index, courseIndex, show }

export default HomeController