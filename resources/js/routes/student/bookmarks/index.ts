import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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
const bookmarks = {
    index: Object.assign(index, index),
}

export default bookmarks