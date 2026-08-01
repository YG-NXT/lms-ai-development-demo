import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\AnnouncementController::index
 * @see app/Http/Controllers/Student/AnnouncementController.php:14
 * @route '/student/announcements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\AnnouncementController::index
 * @see app/Http/Controllers/Student/AnnouncementController.php:14
 * @route '/student/announcements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\AnnouncementController::index
 * @see app/Http/Controllers/Student/AnnouncementController.php:14
 * @route '/student/announcements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\AnnouncementController::index
 * @see app/Http/Controllers/Student/AnnouncementController.php:14
 * @route '/student/announcements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\AnnouncementController::index
 * @see app/Http/Controllers/Student/AnnouncementController.php:14
 * @route '/student/announcements'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\AnnouncementController::index
 * @see app/Http/Controllers/Student/AnnouncementController.php:14
 * @route '/student/announcements'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\AnnouncementController::index
 * @see app/Http/Controllers/Student/AnnouncementController.php:14
 * @route '/student/announcements'
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
* @see \App\Http\Controllers\Student\AnnouncementController::show
 * @see app/Http/Controllers/Student/AnnouncementController.php:44
 * @route '/student/announcements/{announcement}'
 */
export const show = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/announcements/{announcement}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\AnnouncementController::show
 * @see app/Http/Controllers/Student/AnnouncementController.php:44
 * @route '/student/announcements/{announcement}'
 */
show.url = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return show.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\AnnouncementController::show
 * @see app/Http/Controllers/Student/AnnouncementController.php:44
 * @route '/student/announcements/{announcement}'
 */
show.get = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\AnnouncementController::show
 * @see app/Http/Controllers/Student/AnnouncementController.php:44
 * @route '/student/announcements/{announcement}'
 */
show.head = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\AnnouncementController::show
 * @see app/Http/Controllers/Student/AnnouncementController.php:44
 * @route '/student/announcements/{announcement}'
 */
    const showForm = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\AnnouncementController::show
 * @see app/Http/Controllers/Student/AnnouncementController.php:44
 * @route '/student/announcements/{announcement}'
 */
        showForm.get = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\AnnouncementController::show
 * @see app/Http/Controllers/Student/AnnouncementController.php:44
 * @route '/student/announcements/{announcement}'
 */
        showForm.head = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Student\AnnouncementController::read
 * @see app/Http/Controllers/Student/AnnouncementController.php:64
 * @route '/student/announcements/{announcement}/read'
 */
export const read = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: read.url(args, options),
    method: 'post',
})

read.definition = {
    methods: ["post"],
    url: '/student/announcements/{announcement}/read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\AnnouncementController::read
 * @see app/Http/Controllers/Student/AnnouncementController.php:64
 * @route '/student/announcements/{announcement}/read'
 */
read.url = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return read.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\AnnouncementController::read
 * @see app/Http/Controllers/Student/AnnouncementController.php:64
 * @route '/student/announcements/{announcement}/read'
 */
read.post = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: read.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\AnnouncementController::read
 * @see app/Http/Controllers/Student/AnnouncementController.php:64
 * @route '/student/announcements/{announcement}/read'
 */
    const readForm = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: read.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\AnnouncementController::read
 * @see app/Http/Controllers/Student/AnnouncementController.php:64
 * @route '/student/announcements/{announcement}/read'
 */
        readForm.post = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: read.url(args, options),
            method: 'post',
        })
    
    read.form = readForm
const announcements = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
read: Object.assign(read, read),
}

export default announcements