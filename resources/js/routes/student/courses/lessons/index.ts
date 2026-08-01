import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
export const complete = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/lessons/{lesson}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
complete.url = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                    lesson: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                                lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return complete.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
complete.post = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
    const completeForm = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
        completeForm.post = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Http\Controllers\Student\CourseController::recheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
export const recheck = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recheck.url(args, options),
    method: 'post',
})

recheck.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/lessons/{lesson}/recheck',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CourseController::recheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
recheck.url = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                    lesson: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                                lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return recheck.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::recheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
recheck.post = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recheck.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::recheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
    const recheckForm = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recheck.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::recheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
        recheckForm.post = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recheck.url(args, options),
            method: 'post',
        })
    
    recheck.form = recheckForm
/**
* @see \App\Http\Controllers\Student\CourseController::execute
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
export const execute = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(args, options),
    method: 'post',
})

execute.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/lessons/{lesson}/execute',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CourseController::execute
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
execute.url = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                    lesson: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                                lesson: args.lesson,
                }

    return execute.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::execute
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
execute.post = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::execute
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
    const executeForm = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: execute.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::execute
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
        executeForm.post = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: execute.url(args, options),
            method: 'post',
        })
    
    execute.form = executeForm
const lessons = {
    complete: Object.assign(complete, complete),
recheck: Object.assign(recheck, recheck),
execute: Object.assign(execute, execute),
}

export default lessons