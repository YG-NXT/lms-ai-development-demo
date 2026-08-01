import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdManagementController::track
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
export const track = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: track.url(options),
    method: 'post',
})

track.definition = {
    methods: ["post"],
    url: '/admin/api/ads/track',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::track
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
track.url = (options?: RouteQueryOptions) => {
    return track.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::track
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
track.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: track.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::track
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
    const trackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: track.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::track
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
        trackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: track.url(options),
            method: 'post',
        })
    
    track.form = trackForm
const ads = {
    track: Object.assign(track, track),
}

export default ads