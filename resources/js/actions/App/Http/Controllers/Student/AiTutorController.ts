import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\AiTutorController::show
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
export const show = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/courses/{course}/ai-tutor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\AiTutorController::show
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
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
* @see \App\Http\Controllers\Student\AiTutorController::show
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
show.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\AiTutorController::show
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
show.head = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\AiTutorController::show
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
    const showForm = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\AiTutorController::show
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
        showForm.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\AiTutorController::show
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
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
/**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
export const ask = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ask.url(args, options),
    method: 'post',
})

ask.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/ai-tutor/ask',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
ask.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return ask.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
ask.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ask.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
    const askForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ask.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
        askForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ask.url(args, options),
            method: 'post',
        })
    
    ask.form = askForm
const AiTutorController = { show, ask }

export default AiTutorController