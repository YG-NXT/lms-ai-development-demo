import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\EnrollmentController::store
 * @see app/Http/Controllers/Student/EnrollmentController.php:22
 * @route '/courses/{course}/enroll'
 */
export const store = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/courses/{course}/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\EnrollmentController::store
 * @see app/Http/Controllers/Student/EnrollmentController.php:22
 * @route '/courses/{course}/enroll'
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
* @see \App\Http\Controllers\Student\EnrollmentController::store
 * @see app/Http/Controllers/Student/EnrollmentController.php:22
 * @route '/courses/{course}/enroll'
 */
store.post = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\EnrollmentController::store
 * @see app/Http/Controllers/Student/EnrollmentController.php:22
 * @route '/courses/{course}/enroll'
 */
    const storeForm = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\EnrollmentController::store
 * @see app/Http/Controllers/Student/EnrollmentController.php:22
 * @route '/courses/{course}/enroll'
 */
        storeForm.post = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const EnrollmentController = { store }

export default EnrollmentController