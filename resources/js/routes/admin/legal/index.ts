import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\LegalController::index
 * @see app/Http/Controllers/Admin/LegalController.php:12
 * @route '/admin/business/legal'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/business/legal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LegalController::index
 * @see app/Http/Controllers/Admin/LegalController.php:12
 * @route '/admin/business/legal'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LegalController::index
 * @see app/Http/Controllers/Admin/LegalController.php:12
 * @route '/admin/business/legal'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LegalController::index
 * @see app/Http/Controllers/Admin/LegalController.php:12
 * @route '/admin/business/legal'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LegalController::index
 * @see app/Http/Controllers/Admin/LegalController.php:12
 * @route '/admin/business/legal'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LegalController::index
 * @see app/Http/Controllers/Admin/LegalController.php:12
 * @route '/admin/business/legal'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LegalController::index
 * @see app/Http/Controllers/Admin/LegalController.php:12
 * @route '/admin/business/legal'
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
* @see \App\Http\Controllers\Admin\LegalController::update
 * @see app/Http/Controllers/Admin/LegalController.php:23
 * @route '/admin/business/legal'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/business/legal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LegalController::update
 * @see app/Http/Controllers/Admin/LegalController.php:23
 * @route '/admin/business/legal'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LegalController::update
 * @see app/Http/Controllers/Admin/LegalController.php:23
 * @route '/admin/business/legal'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LegalController::update
 * @see app/Http/Controllers/Admin/LegalController.php:23
 * @route '/admin/business/legal'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LegalController::update
 * @see app/Http/Controllers/Admin/LegalController.php:23
 * @route '/admin/business/legal'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
const legal = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
}

export default legal