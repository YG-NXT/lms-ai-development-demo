import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::index
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:9
 * @route '/admin/course-performance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/course-performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::index
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:9
 * @route '/admin/course-performance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::index
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:9
 * @route '/admin/course-performance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::index
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:9
 * @route '/admin/course-performance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::index
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:9
 * @route '/admin/course-performance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::index
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:9
 * @route '/admin/course-performance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::index
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:9
 * @route '/admin/course-performance'
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
* @see \App\Http\Controllers\Admin\CoursePerformanceController::show
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:0
 * @route '/admin/course-performance/{course_performance}'
 */
export const show = (args: { course_performance: string | number } | [course_performance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/course-performance/{course_performance}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::show
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:0
 * @route '/admin/course-performance/{course_performance}'
 */
show.url = (args: { course_performance: string | number } | [course_performance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_performance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_performance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_performance: args.course_performance,
                }

    return show.definition.url
            .replace('{course_performance}', parsedArgs.course_performance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::show
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:0
 * @route '/admin/course-performance/{course_performance}'
 */
show.get = (args: { course_performance: string | number } | [course_performance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::show
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:0
 * @route '/admin/course-performance/{course_performance}'
 */
show.head = (args: { course_performance: string | number } | [course_performance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::show
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:0
 * @route '/admin/course-performance/{course_performance}'
 */
    const showForm = (args: { course_performance: string | number } | [course_performance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::show
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:0
 * @route '/admin/course-performance/{course_performance}'
 */
        showForm.get = (args: { course_performance: string | number } | [course_performance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CoursePerformanceController::show
 * @see app/Http/Controllers/Admin/CoursePerformanceController.php:0
 * @route '/admin/course-performance/{course_performance}'
 */
        showForm.head = (args: { course_performance: string | number } | [course_performance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const coursePerformance = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default coursePerformance