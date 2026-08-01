import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:16
 * @route '/admin/students'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:16
 * @route '/admin/students'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:16
 * @route '/admin/students'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:16
 * @route '/admin/students'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:16
 * @route '/admin/students'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:16
 * @route '/admin/students'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentController::index
 * @see app/Http/Controllers/Admin/StudentController.php:16
 * @route '/admin/students'
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
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:0
 * @route '/admin/students/{student}'
 */
export const update = (args: { student: string | number } | [student: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/students/{student}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:0
 * @route '/admin/students/{student}'
 */
update.url = (args: { student: string | number } | [student: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: args.student,
                }

    return update.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:0
 * @route '/admin/students/{student}'
 */
update.put = (args: { student: string | number } | [student: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:0
 * @route '/admin/students/{student}'
 */
update.patch = (args: { student: string | number } | [student: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:0
 * @route '/admin/students/{student}'
 */
    const updateForm = (args: { student: string | number } | [student: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:0
 * @route '/admin/students/{student}'
 */
        updateForm.put = (args: { student: string | number } | [student: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentController::update
 * @see app/Http/Controllers/Admin/StudentController.php:0
 * @route '/admin/students/{student}'
 */
        updateForm.patch = (args: { student: string | number } | [student: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:43
 * @route '/admin/students/{student}'
 */
export const destroy = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/students/{student}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:43
 * @route '/admin/students/{student}'
 */
destroy.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return destroy.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:43
 * @route '/admin/students/{student}'
 */
destroy.delete = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:43
 * @route '/admin/students/{student}'
 */
    const destroyForm = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::destroy
 * @see app/Http/Controllers/Admin/StudentController.php:43
 * @route '/admin/students/{student}'
 */
        destroyForm.delete = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\StudentController::status
 * @see app/Http/Controllers/Admin/StudentController.php:32
 * @route '/admin/students/{student}/status'
 */
export const status = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/admin/students/{student}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::status
 * @see app/Http/Controllers/Admin/StudentController.php:32
 * @route '/admin/students/{student}/status'
 */
status.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return status.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::status
 * @see app/Http/Controllers/Admin/StudentController.php:32
 * @route '/admin/students/{student}/status'
 */
status.patch = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::status
 * @see app/Http/Controllers/Admin/StudentController.php:32
 * @route '/admin/students/{student}/status'
 */
    const statusForm = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::status
 * @see app/Http/Controllers/Admin/StudentController.php:32
 * @route '/admin/students/{student}/status'
 */
        statusForm.patch = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\Admin\StudentController::assignCourse
 * @see app/Http/Controllers/Admin/StudentController.php:55
 * @route '/admin/students/{student}/assign-course'
 */
export const assignCourse = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignCourse.url(args, options),
    method: 'post',
})

assignCourse.definition = {
    methods: ["post"],
    url: '/admin/students/{student}/assign-course',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::assignCourse
 * @see app/Http/Controllers/Admin/StudentController.php:55
 * @route '/admin/students/{student}/assign-course'
 */
assignCourse.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return assignCourse.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::assignCourse
 * @see app/Http/Controllers/Admin/StudentController.php:55
 * @route '/admin/students/{student}/assign-course'
 */
assignCourse.post = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignCourse.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::assignCourse
 * @see app/Http/Controllers/Admin/StudentController.php:55
 * @route '/admin/students/{student}/assign-course'
 */
    const assignCourseForm = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignCourse.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::assignCourse
 * @see app/Http/Controllers/Admin/StudentController.php:55
 * @route '/admin/students/{student}/assign-course'
 */
        assignCourseForm.post = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignCourse.url(args, options),
            method: 'post',
        })
    
    assignCourse.form = assignCourseForm
/**
* @see \App\Http\Controllers\Admin\StudentController::availableCourses
 * @see app/Http/Controllers/Admin/StudentController.php:99
 * @route '/admin/students/{student}/available-courses'
 */
export const availableCourses = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableCourses.url(args, options),
    method: 'get',
})

availableCourses.definition = {
    methods: ["get","head"],
    url: '/admin/students/{student}/available-courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::availableCourses
 * @see app/Http/Controllers/Admin/StudentController.php:99
 * @route '/admin/students/{student}/available-courses'
 */
availableCourses.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return availableCourses.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::availableCourses
 * @see app/Http/Controllers/Admin/StudentController.php:99
 * @route '/admin/students/{student}/available-courses'
 */
availableCourses.get = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableCourses.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentController::availableCourses
 * @see app/Http/Controllers/Admin/StudentController.php:99
 * @route '/admin/students/{student}/available-courses'
 */
availableCourses.head = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availableCourses.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::availableCourses
 * @see app/Http/Controllers/Admin/StudentController.php:99
 * @route '/admin/students/{student}/available-courses'
 */
    const availableCoursesForm = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: availableCourses.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::availableCourses
 * @see app/Http/Controllers/Admin/StudentController.php:99
 * @route '/admin/students/{student}/available-courses'
 */
        availableCoursesForm.get = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: availableCourses.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentController::availableCourses
 * @see app/Http/Controllers/Admin/StudentController.php:99
 * @route '/admin/students/{student}/available-courses'
 */
        availableCoursesForm.head = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: availableCourses.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    availableCourses.form = availableCoursesForm
/**
* @see \App\Http\Controllers\Admin\StudentController::enrollments
 * @see app/Http/Controllers/Admin/StudentController.php:77
 * @route '/admin/students/{student}/enrollments'
 */
export const enrollments = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: enrollments.url(args, options),
    method: 'get',
})

enrollments.definition = {
    methods: ["get","head"],
    url: '/admin/students/{student}/enrollments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::enrollments
 * @see app/Http/Controllers/Admin/StudentController.php:77
 * @route '/admin/students/{student}/enrollments'
 */
enrollments.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return enrollments.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::enrollments
 * @see app/Http/Controllers/Admin/StudentController.php:77
 * @route '/admin/students/{student}/enrollments'
 */
enrollments.get = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: enrollments.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentController::enrollments
 * @see app/Http/Controllers/Admin/StudentController.php:77
 * @route '/admin/students/{student}/enrollments'
 */
enrollments.head = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: enrollments.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::enrollments
 * @see app/Http/Controllers/Admin/StudentController.php:77
 * @route '/admin/students/{student}/enrollments'
 */
    const enrollmentsForm = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: enrollments.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::enrollments
 * @see app/Http/Controllers/Admin/StudentController.php:77
 * @route '/admin/students/{student}/enrollments'
 */
        enrollmentsForm.get = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: enrollments.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentController::enrollments
 * @see app/Http/Controllers/Admin/StudentController.php:77
 * @route '/admin/students/{student}/enrollments'
 */
        enrollmentsForm.head = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: enrollments.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    enrollments.form = enrollmentsForm
const students = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
status: Object.assign(status, status),
assignCourse: Object.assign(assignCourse, assignCourse),
availableCourses: Object.assign(availableCourses, availableCourses),
enrollments: Object.assign(enrollments, enrollments),
}

export default students