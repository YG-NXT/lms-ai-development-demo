import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\CourseTranscriptController::store
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:21
 * @route '/student/lessons/{lesson}/transcripts'
 */
export const store = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/lessons/{lesson}/transcripts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CourseTranscriptController::store
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:21
 * @route '/student/lessons/{lesson}/transcripts'
 */
store.url = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: args.lesson,
                }

    return store.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseTranscriptController::store
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:21
 * @route '/student/lessons/{lesson}/transcripts'
 */
store.post = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\CourseTranscriptController::store
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:21
 * @route '/student/lessons/{lesson}/transcripts'
 */
    const storeForm = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\CourseTranscriptController::store
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:21
 * @route '/student/lessons/{lesson}/transcripts'
 */
        storeForm.post = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const transcripts = {
    store: Object.assign(store, store),
}

export default transcripts