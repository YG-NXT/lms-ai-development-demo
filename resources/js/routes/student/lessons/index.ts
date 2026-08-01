import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import transcripts4b9ca0 from './transcripts'
/**
* @see \App\Http\Controllers\Student\CourseTranscriptController::transcripts
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:12
 * @route '/student/lessons/{lesson}/transcripts'
 */
export const transcripts = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transcripts.url(args, options),
    method: 'get',
})

transcripts.definition = {
    methods: ["get","head"],
    url: '/student/lessons/{lesson}/transcripts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CourseTranscriptController::transcripts
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:12
 * @route '/student/lessons/{lesson}/transcripts'
 */
transcripts.url = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return transcripts.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CourseTranscriptController::transcripts
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:12
 * @route '/student/lessons/{lesson}/transcripts'
 */
transcripts.get = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transcripts.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\CourseTranscriptController::transcripts
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:12
 * @route '/student/lessons/{lesson}/transcripts'
 */
transcripts.head = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transcripts.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\CourseTranscriptController::transcripts
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:12
 * @route '/student/lessons/{lesson}/transcripts'
 */
    const transcriptsForm = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: transcripts.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\CourseTranscriptController::transcripts
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:12
 * @route '/student/lessons/{lesson}/transcripts'
 */
        transcriptsForm.get = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transcripts.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\CourseTranscriptController::transcripts
 * @see app/Http/Controllers/Student/CourseTranscriptController.php:12
 * @route '/student/lessons/{lesson}/transcripts'
 */
        transcriptsForm.head = (args: { lesson: string | number } | [lesson: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transcripts.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    transcripts.form = transcriptsForm
/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::download
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
export const download = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: download.url(args, options),
    method: 'post',
})

download.definition = {
    methods: ["post"],
    url: '/student/lessons/{lesson}/download',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::download
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
download.url = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\OfflineDownloadController::download
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
download.post = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: download.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\OfflineDownloadController::download
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
    const downloadForm = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: download.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\OfflineDownloadController::download
 * @see app/Http/Controllers/Student/OfflineDownloadController.php:24
 * @route '/student/lessons/{lesson}/download'
 */
        downloadForm.post = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: download.url(args, options),
            method: 'post',
        })
    
    download.form = downloadForm
const lessons = {
    transcripts: Object.assign(transcripts, transcripts4b9ca0),
download: Object.assign(download, download),
}

export default lessons