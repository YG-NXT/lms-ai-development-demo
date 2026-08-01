import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
export const store = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/sections/{section}/lessons',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
store.url = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return store.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
store.post = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
    const storeForm = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::store
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
        storeForm.post = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const lessons = {
    store: Object.assign(store, store),
}

export default lessons