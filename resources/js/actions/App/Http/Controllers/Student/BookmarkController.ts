import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\BookmarkController::index
 * @see app/Http/Controllers/Student/BookmarkController.php:14
 * @route '/student/bookmarks'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/bookmarks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\BookmarkController::index
 * @see app/Http/Controllers/Student/BookmarkController.php:14
 * @route '/student/bookmarks'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\BookmarkController::index
 * @see app/Http/Controllers/Student/BookmarkController.php:14
 * @route '/student/bookmarks'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\BookmarkController::index
 * @see app/Http/Controllers/Student/BookmarkController.php:14
 * @route '/student/bookmarks'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\BookmarkController::index
 * @see app/Http/Controllers/Student/BookmarkController.php:14
 * @route '/student/bookmarks'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\BookmarkController::index
 * @see app/Http/Controllers/Student/BookmarkController.php:14
 * @route '/student/bookmarks'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\BookmarkController::index
 * @see app/Http/Controllers/Student/BookmarkController.php:14
 * @route '/student/bookmarks'
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
* @see \App\Http\Controllers\Student\BookmarkController::toggle
 * @see app/Http/Controllers/Student/BookmarkController.php:32
 * @route '/student/courses/{course}/bookmark'
 */
export const toggle = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/bookmark',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\BookmarkController::toggle
 * @see app/Http/Controllers/Student/BookmarkController.php:32
 * @route '/student/courses/{course}/bookmark'
 */
toggle.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return toggle.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\BookmarkController::toggle
 * @see app/Http/Controllers/Student/BookmarkController.php:32
 * @route '/student/courses/{course}/bookmark'
 */
toggle.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\BookmarkController::toggle
 * @see app/Http/Controllers/Student/BookmarkController.php:32
 * @route '/student/courses/{course}/bookmark'
 */
    const toggleForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\BookmarkController::toggle
 * @see app/Http/Controllers/Student/BookmarkController.php:32
 * @route '/student/courses/{course}/bookmark'
 */
        toggleForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
const BookmarkController = { index, toggle }

export default BookmarkController