import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TaxSettingController::index
 * @see app/Http/Controllers/Admin/TaxSettingController.php:12
 * @route '/admin/tax-settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tax-settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TaxSettingController::index
 * @see app/Http/Controllers/Admin/TaxSettingController.php:12
 * @route '/admin/tax-settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxSettingController::index
 * @see app/Http/Controllers/Admin/TaxSettingController.php:12
 * @route '/admin/tax-settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TaxSettingController::index
 * @see app/Http/Controllers/Admin/TaxSettingController.php:12
 * @route '/admin/tax-settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TaxSettingController::index
 * @see app/Http/Controllers/Admin/TaxSettingController.php:12
 * @route '/admin/tax-settings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxSettingController::index
 * @see app/Http/Controllers/Admin/TaxSettingController.php:12
 * @route '/admin/tax-settings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TaxSettingController::index
 * @see app/Http/Controllers/Admin/TaxSettingController.php:12
 * @route '/admin/tax-settings'
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
* @see \App\Http\Controllers\Admin\TaxSettingController::store
 * @see app/Http/Controllers/Admin/TaxSettingController.php:19
 * @route '/admin/tax-settings'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tax-settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TaxSettingController::store
 * @see app/Http/Controllers/Admin/TaxSettingController.php:19
 * @route '/admin/tax-settings'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxSettingController::store
 * @see app/Http/Controllers/Admin/TaxSettingController.php:19
 * @route '/admin/tax-settings'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TaxSettingController::store
 * @see app/Http/Controllers/Admin/TaxSettingController.php:19
 * @route '/admin/tax-settings'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxSettingController::store
 * @see app/Http/Controllers/Admin/TaxSettingController.php:19
 * @route '/admin/tax-settings'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TaxSettingController::update
 * @see app/Http/Controllers/Admin/TaxSettingController.php:35
 * @route '/admin/tax-settings/{taxSetting}'
 */
export const update = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/tax-settings/{taxSetting}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TaxSettingController::update
 * @see app/Http/Controllers/Admin/TaxSettingController.php:35
 * @route '/admin/tax-settings/{taxSetting}'
 */
update.url = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { taxSetting: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { taxSetting: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    taxSetting: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        taxSetting: typeof args.taxSetting === 'object'
                ? args.taxSetting.id
                : args.taxSetting,
                }

    return update.definition.url
            .replace('{taxSetting}', parsedArgs.taxSetting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxSettingController::update
 * @see app/Http/Controllers/Admin/TaxSettingController.php:35
 * @route '/admin/tax-settings/{taxSetting}'
 */
update.put = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TaxSettingController::update
 * @see app/Http/Controllers/Admin/TaxSettingController.php:35
 * @route '/admin/tax-settings/{taxSetting}'
 */
    const updateForm = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxSettingController::update
 * @see app/Http/Controllers/Admin/TaxSettingController.php:35
 * @route '/admin/tax-settings/{taxSetting}'
 */
        updateForm.put = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\TaxSettingController::destroy
 * @see app/Http/Controllers/Admin/TaxSettingController.php:42
 * @route '/admin/tax-settings/{taxSetting}'
 */
export const destroy = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/tax-settings/{taxSetting}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TaxSettingController::destroy
 * @see app/Http/Controllers/Admin/TaxSettingController.php:42
 * @route '/admin/tax-settings/{taxSetting}'
 */
destroy.url = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { taxSetting: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { taxSetting: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    taxSetting: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        taxSetting: typeof args.taxSetting === 'object'
                ? args.taxSetting.id
                : args.taxSetting,
                }

    return destroy.definition.url
            .replace('{taxSetting}', parsedArgs.taxSetting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxSettingController::destroy
 * @see app/Http/Controllers/Admin/TaxSettingController.php:42
 * @route '/admin/tax-settings/{taxSetting}'
 */
destroy.delete = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TaxSettingController::destroy
 * @see app/Http/Controllers/Admin/TaxSettingController.php:42
 * @route '/admin/tax-settings/{taxSetting}'
 */
    const destroyForm = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxSettingController::destroy
 * @see app/Http/Controllers/Admin/TaxSettingController.php:42
 * @route '/admin/tax-settings/{taxSetting}'
 */
        destroyForm.delete = (args: { taxSetting: string | number | { id: string | number } } | [taxSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const TaxSettingController = { index, store, update, destroy }

export default TaxSettingController