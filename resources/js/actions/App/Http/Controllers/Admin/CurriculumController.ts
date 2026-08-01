import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CurriculumController::edit
 * @see app/Http/Controllers/Admin/CurriculumController.php:20
 * @route '/admin/courses/{course}/curriculum'
 */
export const edit = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/courses/{course}/curriculum',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::edit
 * @see app/Http/Controllers/Admin/CurriculumController.php:20
 * @route '/admin/courses/{course}/curriculum'
 */
edit.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::edit
 * @see app/Http/Controllers/Admin/CurriculumController.php:20
 * @route '/admin/courses/{course}/curriculum'
 */
edit.get = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CurriculumController::edit
 * @see app/Http/Controllers/Admin/CurriculumController.php:20
 * @route '/admin/courses/{course}/curriculum'
 */
edit.head = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::edit
 * @see app/Http/Controllers/Admin/CurriculumController.php:20
 * @route '/admin/courses/{course}/curriculum'
 */
    const editForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::edit
 * @see app/Http/Controllers/Admin/CurriculumController.php:20
 * @route '/admin/courses/{course}/curriculum'
 */
        editForm.get = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CurriculumController::edit
 * @see app/Http/Controllers/Admin/CurriculumController.php:20
 * @route '/admin/courses/{course}/curriculum'
 */
        editForm.head = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\CurriculumController::storeSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
export const storeSection = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSection.url(args, options),
    method: 'post',
})

storeSection.definition = {
    methods: ["post"],
    url: '/admin/courses/{course}/sections',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::storeSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
storeSection.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return storeSection.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::storeSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
storeSection.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSection.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::storeSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
    const storeSectionForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeSection.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::storeSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/admin/courses/{course}/sections'
 */
        storeSectionForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeSection.url(args, options),
            method: 'post',
        })
    
    storeSection.form = storeSectionForm
/**
* @see \App\Http\Controllers\Admin\CurriculumController::updateSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:42
 * @route '/admin/sections/{section}'
 */
export const updateSection = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSection.url(args, options),
    method: 'put',
})

updateSection.definition = {
    methods: ["put"],
    url: '/admin/sections/{section}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::updateSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:42
 * @route '/admin/sections/{section}'
 */
updateSection.url = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return updateSection.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::updateSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:42
 * @route '/admin/sections/{section}'
 */
updateSection.put = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSection.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::updateSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:42
 * @route '/admin/sections/{section}'
 */
    const updateSectionForm = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSection.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::updateSection
 * @see app/Http/Controllers/Admin/CurriculumController.php:42
 * @route '/admin/sections/{section}'
 */
        updateSectionForm.put = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSection.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateSection.form = updateSectionForm
/**
* @see \App\Http\Controllers\Admin\CurriculumController::destroySection
 * @see app/Http/Controllers/Admin/CurriculumController.php:52
 * @route '/admin/sections/{section}'
 */
export const destroySection = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySection.url(args, options),
    method: 'delete',
})

destroySection.definition = {
    methods: ["delete"],
    url: '/admin/sections/{section}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::destroySection
 * @see app/Http/Controllers/Admin/CurriculumController.php:52
 * @route '/admin/sections/{section}'
 */
destroySection.url = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return destroySection.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::destroySection
 * @see app/Http/Controllers/Admin/CurriculumController.php:52
 * @route '/admin/sections/{section}'
 */
destroySection.delete = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySection.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::destroySection
 * @see app/Http/Controllers/Admin/CurriculumController.php:52
 * @route '/admin/sections/{section}'
 */
    const destroySectionForm = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroySection.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::destroySection
 * @see app/Http/Controllers/Admin/CurriculumController.php:52
 * @route '/admin/sections/{section}'
 */
        destroySectionForm.delete = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroySection.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroySection.form = destroySectionForm
/**
* @see \App\Http\Controllers\Admin\CurriculumController::storeLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
export const storeLesson = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLesson.url(args, options),
    method: 'post',
})

storeLesson.definition = {
    methods: ["post"],
    url: '/admin/sections/{section}/lessons',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::storeLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
storeLesson.url = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return storeLesson.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::storeLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
storeLesson.post = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLesson.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::storeLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
    const storeLessonForm = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeLesson.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::storeLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:62
 * @route '/admin/sections/{section}/lessons'
 */
        storeLessonForm.post = (args: { section: string | number | { id: string | number } } | [section: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeLesson.url(args, options),
            method: 'post',
        })
    
    storeLesson.form = storeLessonForm
/**
* @see \App\Http\Controllers\Admin\CurriculumController::updateLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:78
 * @route '/admin/lessons/{lesson}'
 */
export const updateLesson = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLesson.url(args, options),
    method: 'put',
})

updateLesson.definition = {
    methods: ["put"],
    url: '/admin/lessons/{lesson}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::updateLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:78
 * @route '/admin/lessons/{lesson}'
 */
updateLesson.url = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lesson: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return updateLesson.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::updateLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:78
 * @route '/admin/lessons/{lesson}'
 */
updateLesson.put = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLesson.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::updateLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:78
 * @route '/admin/lessons/{lesson}'
 */
    const updateLessonForm = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateLesson.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::updateLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:78
 * @route '/admin/lessons/{lesson}'
 */
        updateLessonForm.put = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateLesson.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateLesson.form = updateLessonForm
/**
* @see \App\Http\Controllers\Admin\CurriculumController::destroyLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:98
 * @route '/admin/lessons/{lesson}'
 */
export const destroyLesson = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLesson.url(args, options),
    method: 'delete',
})

destroyLesson.definition = {
    methods: ["delete"],
    url: '/admin/lessons/{lesson}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::destroyLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:98
 * @route '/admin/lessons/{lesson}'
 */
destroyLesson.url = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lesson: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return destroyLesson.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::destroyLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:98
 * @route '/admin/lessons/{lesson}'
 */
destroyLesson.delete = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLesson.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::destroyLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:98
 * @route '/admin/lessons/{lesson}'
 */
    const destroyLessonForm = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyLesson.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::destroyLesson
 * @see app/Http/Controllers/Admin/CurriculumController.php:98
 * @route '/admin/lessons/{lesson}'
 */
        destroyLessonForm.delete = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyLesson.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyLesson.form = destroyLessonForm
const CurriculumController = { edit, storeSection, updateSection, destroySection, storeLesson, updateLesson, destroyLesson }

export default CurriculumController