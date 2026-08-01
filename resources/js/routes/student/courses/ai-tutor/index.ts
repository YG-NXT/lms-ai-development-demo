import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
export const ask = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ask.url(args, options),
    method: 'post',
})

ask.definition = {
    methods: ["post"],
    url: '/student/courses/{course}/ai-tutor/ask',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
ask.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return ask.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
ask.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ask.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
    const askForm = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ask.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\AiTutorController::ask
 * @see app/Http/Controllers/Student/AiTutorController.php:28
 * @route '/student/courses/{course}/ai-tutor/ask'
 */
        askForm.post = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ask.url(args, options),
            method: 'post',
        })
    
    ask.form = askForm
const aiTutor = {
    ask: Object.assign(ask, ask),
}

export default aiTutor