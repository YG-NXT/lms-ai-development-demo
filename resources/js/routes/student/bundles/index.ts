import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\BundleController::index
 * @see app/Http/Controllers/Student/BundleController.php:14
 * @route '/student/bundles'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/bundles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\BundleController::index
 * @see app/Http/Controllers/Student/BundleController.php:14
 * @route '/student/bundles'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\BundleController::index
 * @see app/Http/Controllers/Student/BundleController.php:14
 * @route '/student/bundles'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\BundleController::index
 * @see app/Http/Controllers/Student/BundleController.php:14
 * @route '/student/bundles'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\BundleController::index
 * @see app/Http/Controllers/Student/BundleController.php:14
 * @route '/student/bundles'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\BundleController::index
 * @see app/Http/Controllers/Student/BundleController.php:14
 * @route '/student/bundles'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\BundleController::index
 * @see app/Http/Controllers/Student/BundleController.php:14
 * @route '/student/bundles'
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
* @see \App\Http\Controllers\Student\BundleController::show
 * @see app/Http/Controllers/Student/BundleController.php:26
 * @route '/student/bundles/{bundle}'
 */
export const show = (args: { bundle: string | number | { slug: string | number } } | [bundle: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/bundles/{bundle}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\BundleController::show
 * @see app/Http/Controllers/Student/BundleController.php:26
 * @route '/student/bundles/{bundle}'
 */
show.url = (args: { bundle: string | number | { slug: string | number } } | [bundle: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bundle: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { bundle: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    bundle: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bundle: typeof args.bundle === 'object'
                ? args.bundle.slug
                : args.bundle,
                }

    return show.definition.url
            .replace('{bundle}', parsedArgs.bundle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\BundleController::show
 * @see app/Http/Controllers/Student/BundleController.php:26
 * @route '/student/bundles/{bundle}'
 */
show.get = (args: { bundle: string | number | { slug: string | number } } | [bundle: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\BundleController::show
 * @see app/Http/Controllers/Student/BundleController.php:26
 * @route '/student/bundles/{bundle}'
 */
show.head = (args: { bundle: string | number | { slug: string | number } } | [bundle: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\BundleController::show
 * @see app/Http/Controllers/Student/BundleController.php:26
 * @route '/student/bundles/{bundle}'
 */
    const showForm = (args: { bundle: string | number | { slug: string | number } } | [bundle: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\BundleController::show
 * @see app/Http/Controllers/Student/BundleController.php:26
 * @route '/student/bundles/{bundle}'
 */
        showForm.get = (args: { bundle: string | number | { slug: string | number } } | [bundle: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\BundleController::show
 * @see app/Http/Controllers/Student/BundleController.php:26
 * @route '/student/bundles/{bundle}'
 */
        showForm.head = (args: { bundle: string | number | { slug: string | number } } | [bundle: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Student\BundleController::enroll
 * @see app/Http/Controllers/Student/BundleController.php:42
 * @route '/student/bundles/{bundle}/enroll'
 */
export const enroll = (args: { bundle: string | number | { id: string | number } } | [bundle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enroll.url(args, options),
    method: 'post',
})

enroll.definition = {
    methods: ["post"],
    url: '/student/bundles/{bundle}/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\BundleController::enroll
 * @see app/Http/Controllers/Student/BundleController.php:42
 * @route '/student/bundles/{bundle}/enroll'
 */
enroll.url = (args: { bundle: string | number | { id: string | number } } | [bundle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bundle: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { bundle: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    bundle: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bundle: typeof args.bundle === 'object'
                ? args.bundle.id
                : args.bundle,
                }

    return enroll.definition.url
            .replace('{bundle}', parsedArgs.bundle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\BundleController::enroll
 * @see app/Http/Controllers/Student/BundleController.php:42
 * @route '/student/bundles/{bundle}/enroll'
 */
enroll.post = (args: { bundle: string | number | { id: string | number } } | [bundle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enroll.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\BundleController::enroll
 * @see app/Http/Controllers/Student/BundleController.php:42
 * @route '/student/bundles/{bundle}/enroll'
 */
    const enrollForm = (args: { bundle: string | number | { id: string | number } } | [bundle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: enroll.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\BundleController::enroll
 * @see app/Http/Controllers/Student/BundleController.php:42
 * @route '/student/bundles/{bundle}/enroll'
 */
        enrollForm.post = (args: { bundle: string | number | { id: string | number } } | [bundle: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: enroll.url(args, options),
            method: 'post',
        })
    
    enroll.form = enrollForm
const bundles = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
enroll: Object.assign(enroll, enroll),
}

export default bundles