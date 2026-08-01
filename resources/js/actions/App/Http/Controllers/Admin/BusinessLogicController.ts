import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BusinessLogicController::index
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:15
 * @route '/admin/business/settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/business/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BusinessLogicController::index
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:15
 * @route '/admin/business/settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessLogicController::index
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:15
 * @route '/admin/business/settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BusinessLogicController::index
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:15
 * @route '/admin/business/settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessLogicController::index
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:15
 * @route '/admin/business/settings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessLogicController::index
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:15
 * @route '/admin/business/settings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BusinessLogicController::index
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:15
 * @route '/admin/business/settings'
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
* @see \App\Http\Controllers\Admin\BusinessLogicController::update
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:31
 * @route '/admin/business/settings'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/business/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BusinessLogicController::update
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:31
 * @route '/admin/business/settings'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessLogicController::update
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:31
 * @route '/admin/business/settings'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessLogicController::update
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:31
 * @route '/admin/business/settings'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessLogicController::update
 * @see app/Http/Controllers/Admin/BusinessLogicController.php:31
 * @route '/admin/business/settings'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
const BusinessLogicController = { index, update }

export default BusinessLogicController