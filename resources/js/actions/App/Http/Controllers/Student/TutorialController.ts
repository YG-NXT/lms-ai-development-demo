import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\TutorialController::index
 * @see app/Http/Controllers/Student/TutorialController.php:12
 * @route '/student/tutorials'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/tutorials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\TutorialController::index
 * @see app/Http/Controllers/Student/TutorialController.php:12
 * @route '/student/tutorials'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\TutorialController::index
 * @see app/Http/Controllers/Student/TutorialController.php:12
 * @route '/student/tutorials'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\TutorialController::index
 * @see app/Http/Controllers/Student/TutorialController.php:12
 * @route '/student/tutorials'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\TutorialController::index
 * @see app/Http/Controllers/Student/TutorialController.php:12
 * @route '/student/tutorials'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\TutorialController::index
 * @see app/Http/Controllers/Student/TutorialController.php:12
 * @route '/student/tutorials'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\TutorialController::index
 * @see app/Http/Controllers/Student/TutorialController.php:12
 * @route '/student/tutorials'
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
* @see \App\Http\Controllers\Student\TutorialController::show
 * @see app/Http/Controllers/Student/TutorialController.php:23
 * @route '/student/tutorials/{tutorial}'
 */
export const show = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/tutorials/{tutorial}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\TutorialController::show
 * @see app/Http/Controllers/Student/TutorialController.php:23
 * @route '/student/tutorials/{tutorial}'
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
* @see \App\Http\Controllers\Student\TutorialController::show
 * @see app/Http/Controllers/Student/TutorialController.php:23
 * @route '/student/tutorials/{tutorial}'
 */
show.get = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\TutorialController::show
 * @see app/Http/Controllers/Student/TutorialController.php:23
 * @route '/student/tutorials/{tutorial}'
 */
show.head = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\TutorialController::show
 * @see app/Http/Controllers/Student/TutorialController.php:23
 * @route '/student/tutorials/{tutorial}'
 */
    const showForm = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\TutorialController::show
 * @see app/Http/Controllers/Student/TutorialController.php:23
 * @route '/student/tutorials/{tutorial}'
 */
        showForm.get = (args: { tutorial: string | number | { slug: string | number } } | [tutorial: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\TutorialController::show
 * @see app/Http/Controllers/Student/TutorialController.php:23
 * @route '/student/tutorials/{tutorial}'
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
/**
* @see \App\Http\Controllers\Student\TutorialController::enroll
 * @see app/Http/Controllers/Student/TutorialController.php:44
 * @route '/student/tutorials/{tutorial}/enroll'
 */
export const enroll = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enroll.url(args, options),
    method: 'post',
})

enroll.definition = {
    methods: ["post"],
    url: '/student/tutorials/{tutorial}/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\TutorialController::enroll
 * @see app/Http/Controllers/Student/TutorialController.php:44
 * @route '/student/tutorials/{tutorial}/enroll'
 */
enroll.url = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tutorial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tutorial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tutorial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tutorial: typeof args.tutorial === 'object'
                ? args.tutorial.id
                : args.tutorial,
                }

    return enroll.definition.url
            .replace('{tutorial}', parsedArgs.tutorial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\TutorialController::enroll
 * @see app/Http/Controllers/Student/TutorialController.php:44
 * @route '/student/tutorials/{tutorial}/enroll'
 */
enroll.post = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enroll.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\TutorialController::enroll
 * @see app/Http/Controllers/Student/TutorialController.php:44
 * @route '/student/tutorials/{tutorial}/enroll'
 */
    const enrollForm = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: enroll.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\TutorialController::enroll
 * @see app/Http/Controllers/Student/TutorialController.php:44
 * @route '/student/tutorials/{tutorial}/enroll'
 */
        enrollForm.post = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: enroll.url(args, options),
            method: 'post',
        })
    
    enroll.form = enrollForm
const TutorialController = { index, show, enroll }

export default TutorialController