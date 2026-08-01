import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\LearningReminderController::index
 * @see app/Http/Controllers/Student/LearningReminderController.php:13
 * @route '/student/reminders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/reminders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\LearningReminderController::index
 * @see app/Http/Controllers/Student/LearningReminderController.php:13
 * @route '/student/reminders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\LearningReminderController::index
 * @see app/Http/Controllers/Student/LearningReminderController.php:13
 * @route '/student/reminders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\LearningReminderController::index
 * @see app/Http/Controllers/Student/LearningReminderController.php:13
 * @route '/student/reminders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\LearningReminderController::index
 * @see app/Http/Controllers/Student/LearningReminderController.php:13
 * @route '/student/reminders'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\LearningReminderController::index
 * @see app/Http/Controllers/Student/LearningReminderController.php:13
 * @route '/student/reminders'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\LearningReminderController::index
 * @see app/Http/Controllers/Student/LearningReminderController.php:13
 * @route '/student/reminders'
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
* @see \App\Http\Controllers\Student\LearningReminderController::store
 * @see app/Http/Controllers/Student/LearningReminderController.php:25
 * @route '/student/reminders/{course}'
 */
export const store = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/reminders/{course}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\LearningReminderController::store
 * @see app/Http/Controllers/Student/LearningReminderController.php:25
 * @route '/student/reminders/{course}'
 */
store.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return store.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\LearningReminderController::store
 * @see app/Http/Controllers/Student/LearningReminderController.php:25
 * @route '/student/reminders/{course}'
 */
store.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\LearningReminderController::store
 * @see app/Http/Controllers/Student/LearningReminderController.php:25
 * @route '/student/reminders/{course}'
 */
    const storeForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\LearningReminderController::store
 * @see app/Http/Controllers/Student/LearningReminderController.php:25
 * @route '/student/reminders/{course}'
 */
        storeForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Student\LearningReminderController::destroy
 * @see app/Http/Controllers/Student/LearningReminderController.php:42
 * @route '/student/reminders/{reminder}'
 */
export const destroy = (args: { reminder: string | number | { id: string | number } } | [reminder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/student/reminders/{reminder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Student\LearningReminderController::destroy
 * @see app/Http/Controllers/Student/LearningReminderController.php:42
 * @route '/student/reminders/{reminder}'
 */
destroy.url = (args: { reminder: string | number | { id: string | number } } | [reminder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reminder: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reminder: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reminder: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reminder: typeof args.reminder === 'object'
                ? args.reminder.id
                : args.reminder,
                }

    return destroy.definition.url
            .replace('{reminder}', parsedArgs.reminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\LearningReminderController::destroy
 * @see app/Http/Controllers/Student/LearningReminderController.php:42
 * @route '/student/reminders/{reminder}'
 */
destroy.delete = (args: { reminder: string | number | { id: string | number } } | [reminder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Student\LearningReminderController::destroy
 * @see app/Http/Controllers/Student/LearningReminderController.php:42
 * @route '/student/reminders/{reminder}'
 */
    const destroyForm = (args: { reminder: string | number | { id: string | number } } | [reminder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\LearningReminderController::destroy
 * @see app/Http/Controllers/Student/LearningReminderController.php:42
 * @route '/student/reminders/{reminder}'
 */
        destroyForm.delete = (args: { reminder: string | number | { id: string | number } } | [reminder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const LearningReminderController = { index, store, destroy }

export default LearningReminderController