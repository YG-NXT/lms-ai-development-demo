import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import settings from './settings'
import brandingSettings from './branding-settings'
/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::branding
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
export const branding = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: branding.url(options),
    method: 'get',
})

branding.definition = {
    methods: ["get","head"],
    url: '/admin/business/branding',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::branding
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
branding.url = (options?: RouteQueryOptions) => {
    return branding.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::branding
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
branding.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: branding.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BusinessSettingController::branding
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
branding.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: branding.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BusinessSettingController::branding
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
    const brandingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: branding.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BusinessSettingController::branding
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
        brandingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: branding.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BusinessSettingController::branding
 * @see app/Http/Controllers/Admin/BusinessSettingController.php:12
 * @route '/admin/business/branding'
 */
        brandingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: branding.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    branding.form = brandingForm
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
const business = {
    branding: Object.assign(branding, branding),
update: Object.assign(update, update),
settings: Object.assign(settings, settings),
brandingSettings: Object.assign(brandingSettings, brandingSettings),
}

export default business