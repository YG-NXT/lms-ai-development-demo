import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import lessons from './lessons'
import bookmark from './bookmark'
import aiTutor0e1251 from './ai-tutor'
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
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
export const complete = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
complete.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return complete.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
complete.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
    const completeForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CourseController::complete
 * @see app/Http/Controllers/Student/CourseController.php:340
 * @route '/student/courses/{course}/complete'
 */
        completeForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Http\Controllers\Student\AiTutorController::aiTutor
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
export const aiTutor = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aiTutor.url(args, options),
    method: 'get',
})

aiTutor.definition = {
    methods: ["get","head"],
    url: '/student/courses/{course}/ai-tutor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\AiTutorController::aiTutor
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
aiTutor.url = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return aiTutor.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\AiTutorController::aiTutor
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
aiTutor.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aiTutor.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\AiTutorController::aiTutor
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
aiTutor.head = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: aiTutor.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\AiTutorController::aiTutor
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
    const aiTutorForm = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: aiTutor.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\AiTutorController::aiTutor
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
        aiTutorForm.get = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: aiTutor.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\AiTutorController::aiTutor
 * @see app/Http/Controllers/Student/AiTutorController.php:14
 * @route '/student/courses/{course}/ai-tutor'
 */
        aiTutorForm.head = (args: { course: string | number | { slug: string | number } } | [course: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: aiTutor.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    aiTutor.form = aiTutorForm
const courses = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
lessons: Object.assign(lessons, lessons),
complete: Object.assign(complete, complete),
bookmark: Object.assign(bookmark, bookmark),
aiTutor: Object.assign(aiTutor, aiTutor0e1251),
}

export default courses