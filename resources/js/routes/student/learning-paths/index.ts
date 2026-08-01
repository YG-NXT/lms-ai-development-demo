import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\LearningPathController::index
 * @see app/Http/Controllers/Student/LearningPathController.php:15
 * @route '/student/learning-paths'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/learning-paths',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\LearningPathController::index
 * @see app/Http/Controllers/Student/LearningPathController.php:15
 * @route '/student/learning-paths'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\LearningPathController::index
 * @see app/Http/Controllers/Student/LearningPathController.php:15
 * @route '/student/learning-paths'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\LearningPathController::index
 * @see app/Http/Controllers/Student/LearningPathController.php:15
 * @route '/student/learning-paths'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\LearningPathController::index
 * @see app/Http/Controllers/Student/LearningPathController.php:15
 * @route '/student/learning-paths'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\LearningPathController::index
 * @see app/Http/Controllers/Student/LearningPathController.php:15
 * @route '/student/learning-paths'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\LearningPathController::index
 * @see app/Http/Controllers/Student/LearningPathController.php:15
 * @route '/student/learning-paths'
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
* @see \App\Http\Controllers\Student\LearningPathController::show
 * @see app/Http/Controllers/Student/LearningPathController.php:27
 * @route '/student/learning-paths/{learningPath}'
 */
export const show = (args: { learningPath: string | number | { slug: string | number } } | [learningPath: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/learning-paths/{learningPath}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\LearningPathController::show
 * @see app/Http/Controllers/Student/LearningPathController.php:27
 * @route '/student/learning-paths/{learningPath}'
 */
show.url = (args: { learningPath: string | number | { slug: string | number } } | [learningPath: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { learningPath: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { learningPath: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    learningPath: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        learningPath: typeof args.learningPath === 'object'
                ? args.learningPath.slug
                : args.learningPath,
                }

    return show.definition.url
            .replace('{learningPath}', parsedArgs.learningPath.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\LearningPathController::show
 * @see app/Http/Controllers/Student/LearningPathController.php:27
 * @route '/student/learning-paths/{learningPath}'
 */
show.get = (args: { learningPath: string | number | { slug: string | number } } | [learningPath: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\LearningPathController::show
 * @see app/Http/Controllers/Student/LearningPathController.php:27
 * @route '/student/learning-paths/{learningPath}'
 */
show.head = (args: { learningPath: string | number | { slug: string | number } } | [learningPath: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\LearningPathController::show
 * @see app/Http/Controllers/Student/LearningPathController.php:27
 * @route '/student/learning-paths/{learningPath}'
 */
    const showForm = (args: { learningPath: string | number | { slug: string | number } } | [learningPath: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\LearningPathController::show
 * @see app/Http/Controllers/Student/LearningPathController.php:27
 * @route '/student/learning-paths/{learningPath}'
 */
        showForm.get = (args: { learningPath: string | number | { slug: string | number } } | [learningPath: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\LearningPathController::show
 * @see app/Http/Controllers/Student/LearningPathController.php:27
 * @route '/student/learning-paths/{learningPath}'
 */
        showForm.head = (args: { learningPath: string | number | { slug: string | number } } | [learningPath: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Student\LearningPathController::enroll
 * @see app/Http/Controllers/Student/LearningPathController.php:51
 * @route '/student/learning-paths/{learningPath}/enroll'
 */
export const enroll = (args: { learningPath: string | number } | [learningPath: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enroll.url(args, options),
    method: 'post',
})

enroll.definition = {
    methods: ["post"],
    url: '/student/learning-paths/{learningPath}/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\LearningPathController::enroll
 * @see app/Http/Controllers/Student/LearningPathController.php:51
 * @route '/student/learning-paths/{learningPath}/enroll'
 */
enroll.url = (args: { learningPath: string | number } | [learningPath: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { learningPath: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    learningPath: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        learningPath: args.learningPath,
                }

    return enroll.definition.url
            .replace('{learningPath}', parsedArgs.learningPath.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\LearningPathController::enroll
 * @see app/Http/Controllers/Student/LearningPathController.php:51
 * @route '/student/learning-paths/{learningPath}/enroll'
 */
enroll.post = (args: { learningPath: string | number } | [learningPath: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enroll.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\LearningPathController::enroll
 * @see app/Http/Controllers/Student/LearningPathController.php:51
 * @route '/student/learning-paths/{learningPath}/enroll'
 */
    const enrollForm = (args: { learningPath: string | number } | [learningPath: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: enroll.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\LearningPathController::enroll
 * @see app/Http/Controllers/Student/LearningPathController.php:51
 * @route '/student/learning-paths/{learningPath}/enroll'
 */
        enrollForm.post = (args: { learningPath: string | number } | [learningPath: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: enroll.url(args, options),
            method: 'post',
        })
    
    enroll.form = enrollForm
const learningPaths = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
enroll: Object.assign(enroll, enroll),
}

export default learningPaths