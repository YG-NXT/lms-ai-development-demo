import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
export const store = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/courses/{course}/sections',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
store.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
store.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
    const storeForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
        storeForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const sections = {
    store: Object.assign(store, store),
}

export default sections