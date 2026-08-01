import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\ReviewController::store
 * @see app/Http/Controllers/Student/ReviewController.php:15
 * @route '/courses/{course}/reviews'
 */
export const store = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/courses/{course}/reviews',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\ReviewController::store
 * @see app/Http/Controllers/Student/ReviewController.php:15
 * @route '/courses/{course}/reviews'
 */
store.url = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\ReviewController::store
 * @see app/Http/Controllers/Student/ReviewController.php:15
 * @route '/courses/{course}/reviews'
 */
store.post = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\ReviewController::store
 * @see app/Http/Controllers/Student/ReviewController.php:15
 * @route '/courses/{course}/reviews'
 */
    const storeForm = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\ReviewController::store
 * @see app/Http/Controllers/Student/ReviewController.php:15
 * @route '/courses/{course}/reviews'
 */
        storeForm.post = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const reviews = {
    store: Object.assign(store, store),
}

export default reviews