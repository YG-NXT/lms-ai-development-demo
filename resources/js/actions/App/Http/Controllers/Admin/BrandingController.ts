import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BrandingController::index
 * @see app/Http/Controllers/Admin/BrandingController.php:15
 * @route '/admin/branding'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/branding',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BrandingController::index
 * @see app/Http/Controllers/Admin/BrandingController.php:15
 * @route '/admin/branding'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BrandingController::index
 * @see app/Http/Controllers/Admin/BrandingController.php:15
 * @route '/admin/branding'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BrandingController::index
 * @see app/Http/Controllers/Admin/BrandingController.php:15
 * @route '/admin/branding'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BrandingController::index
 * @see app/Http/Controllers/Admin/BrandingController.php:15
 * @route '/admin/branding'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BrandingController::index
 * @see app/Http/Controllers/Admin/BrandingController.php:15
 * @route '/admin/branding'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BrandingController::index
 * @see app/Http/Controllers/Admin/BrandingController.php:15
 * @route '/admin/branding'
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
* @see \App\Http\Controllers\Admin\BrandingController::update
 * @see app/Http/Controllers/Admin/BrandingController.php:22
 * @route '/admin/branding/{brand}'
 */
export const update = (args: { brand: string | number | { id: string | number } } | [brand: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/branding/{brand}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\BrandingController::update
 * @see app/Http/Controllers/Admin/BrandingController.php:22
 * @route '/admin/branding/{brand}'
 */
update.url = (args: { brand: string | number | { id: string | number } } | [brand: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { brand: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { brand: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    brand: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        brand: typeof args.brand === 'object'
                ? args.brand.id
                : args.brand,
                }

    return update.definition.url
            .replace('{brand}', parsedArgs.brand.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BrandingController::update
 * @see app/Http/Controllers/Admin/BrandingController.php:22
 * @route '/admin/branding/{brand}'
 */
update.put = (args: { brand: string | number | { id: string | number } } | [brand: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\BrandingController::update
 * @see app/Http/Controllers/Admin/BrandingController.php:22
 * @route '/admin/branding/{brand}'
 */
    const updateForm = (args: { brand: string | number | { id: string | number } } | [brand: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BrandingController::update
 * @see app/Http/Controllers/Admin/BrandingController.php:22
 * @route '/admin/branding/{brand}'
 */
        updateForm.put = (args: { brand: string | number | { id: string | number } } | [brand: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const BrandingController = { index, update }

export default BrandingController