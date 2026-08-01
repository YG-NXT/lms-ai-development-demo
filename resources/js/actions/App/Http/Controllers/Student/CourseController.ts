import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\CourseController::index
 * @see app/Http/Controllers/Student/CourseController.php:0
 * @route '/student/courses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CourseController::index
 * @see app/Http/Controllers/Student/CourseController.php:0
 * @route '/student/courses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::index
 * @see app/Http/Controllers/Student/CourseController.php:0
 * @route '/student/courses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\CourseController::index
 * @see app/Http/Controllers/Student/CourseController.php:0
 * @route '/student/courses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::index
 * @see app/Http/Controllers/Student/CourseController.php:0
 * @route '/student/courses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::index
 * @see app/Http/Controllers/Student/CourseController.php:0
 * @route '/student/courses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\CourseController::index
 * @see app/Http/Controllers/Student/CourseController.php:0
 * @route '/student/courses'
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
* @see \App\Http\Controllers\Student\CourseController::show
 * @see app/Http/Controllers/Student/CourseController.php:20
 * @route '/student/courses/{course}'
 */
export const show = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/courses/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CourseController::show
 * @see app/Http/Controllers/Student/CourseController.php:20
 * @route '/student/courses/{course}'
 */
show.url = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { course: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.slug
                : args.course,
                }

    return show.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::show
 * @see app/Http/Controllers/Student/CourseController.php:20
 * @route '/student/courses/{course}'
 */
show.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\CourseController::show
 * @see app/Http/Controllers/Student/CourseController.php:20
 * @route '/student/courses/{course}'
 */
show.head = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::show
 * @see app/Http/Controllers/Student/CourseController.php:20
 * @route '/student/courses/{course}'
 */
    const showForm = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::show
 * @see app/Http/Controllers/Student/CourseController.php:20
 * @route '/student/courses/{course}'
 */
        showForm.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\CourseController::show
 * @see app/Http/Controllers/Student/CourseController.php:20
 * @route '/student/courses/{course}'
 */
        showForm.head = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Student\CourseController::markLessonAsComplete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
export const markLessonAsComplete = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markLessonAsComplete.url(args, options),
    method: 'post',
})

markLessonAsComplete.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/lessons/{lesson}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CourseController::markLessonAsComplete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
markLessonAsComplete.url = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return markLessonAsComplete.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::markLessonAsComplete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
markLessonAsComplete.post = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markLessonAsComplete.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::markLessonAsComplete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
    const markLessonAsCompleteForm = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markLessonAsComplete.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::markLessonAsComplete
 * @see app/Http/Controllers/Student/CourseController.php:154
 * @route '/student/courses/{course}/lessons/{lesson}/complete'
 */
        markLessonAsCompleteForm.post = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markLessonAsComplete.url(args, options),
            method: 'post',
        })
    
    markLessonAsComplete.form = markLessonAsCompleteForm
/**
* @see \App\Http\Controllers\Student\CourseController::requestRecheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
export const requestRecheck = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestRecheck.url(args, options),
    method: 'post',
})

requestRecheck.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/lessons/{lesson}/recheck',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CourseController::requestRecheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
requestRecheck.url = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return requestRecheck.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::requestRecheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
requestRecheck.post = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestRecheck.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::requestRecheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
    const requestRecheckForm = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: requestRecheck.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::requestRecheck
 * @see app/Http/Controllers/Student/CourseController.php:369
 * @route '/student/courses/{course}/lessons/{lesson}/recheck'
 */
        requestRecheckForm.post = (args: { course: string | number | { id: string | number }, lesson: string | number | { id: string | number } } | [course: string | number | { id: string | number }, lesson: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: requestRecheck.url(args, options),
            method: 'post',
        })
    
    requestRecheck.form = requestRecheckForm
/**
* @see \App\Http\Controllers\Student\CourseController::executeCode
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
export const executeCode = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: executeCode.url(args, options),
    method: 'post',
})

executeCode.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/lessons/{lesson}/execute',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CourseController::executeCode
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
executeCode.url = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions) => {
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

    return executeCode.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::executeCode
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
executeCode.post = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: executeCode.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::executeCode
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
    const executeCodeForm = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: executeCode.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::executeCode
 * @see app/Http/Controllers/Student/CourseController.php:393
 * @route '/student/courses/{course}/lessons/{lesson}/execute'
 */
        executeCodeForm.post = (args: { course: string | number | { id: string | number }, lesson: string | number } | [course: string | number | { id: string | number }, lesson: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: executeCode.url(args, options),
            method: 'post',
        })
    
    executeCode.form = executeCodeForm
/**
* @see \App\Http\Controllers\Student\CourseController::markCourseAsCompleted
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
export const markCourseAsCompleted = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markCourseAsCompleted.url(args, options),
    method: 'post',
})

markCourseAsCompleted.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CourseController::markCourseAsCompleted
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
markCourseAsCompleted.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return markCourseAsCompleted.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::markCourseAsCompleted
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
markCourseAsCompleted.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markCourseAsCompleted.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::markCourseAsCompleted
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
    const markCourseAsCompletedForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markCourseAsCompleted.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::markCourseAsCompleted
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
        markCourseAsCompletedForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markCourseAsCompleted.url(args, options),
            method: 'post',
        })
    
    markCourseAsCompleted.form = markCourseAsCompletedForm
const CourseController = { index, show, markLessonAsComplete, requestRecheck, executeCode, markCourseAsCompleted }

export default CourseController