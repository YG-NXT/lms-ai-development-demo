import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::index
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/business/branding',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::index
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::index
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::index
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessSettingController::index
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessSettingController::index
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BusinessSettingController::index
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
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
* @see \App\Http\Controllers\Admin\BusinessSettingController::update
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:22
 * @route '/admin/business/branding'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/business/branding',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::update
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:22
 * @route '/admin/business/branding'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::update
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:22
 * @route '/admin/business/branding'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessSettingController::update
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:22
 * @route '/admin/business/branding'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessSettingController::update
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:22
 * @route '/admin/business/branding'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
const BusinessSettingController = { index, update }

export default BusinessSettingController