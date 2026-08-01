import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\InlineCodeController::execute
 * @see app/Http/Controllers/Student/InlineCodeController.php:12
 * @route '/student/execute'
 */
export const execute = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(options),
    method: 'post',
})

execute.definition = {
    methods: ["post"],
    url: '/student/execute',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\InlineCodeController::execute
 * @see app/Http/Controllers/Student/InlineCodeController.php:12
 * @route '/student/execute'
 */
execute.url = (options?: RouteQueryOptions) => {
    return execute.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\InlineCodeController::execute
 * @see app/Http/Controllers/Student/InlineCodeController.php:12
 * @route '/student/execute'
 */
execute.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\InlineCodeController::execute
 * @see app/Http/Controllers/Student/InlineCodeController.php:12
 * @route '/student/execute'
 */
    const executeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: execute.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\InlineCodeController::execute
 * @see app/Http/Controllers/Student/InlineCodeController.php:12
 * @route '/student/execute'
 */
        executeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: execute.url(options),
            method: 'post',
        })
    
    execute.form = executeForm
/**
* @see \App\Http\Controllers\Student\InlineCodeController::terminal
 * @see app/Http/Controllers/Student/InlineCodeController.php:33
 * @route '/student/terminal'
 */
export const terminal = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: terminal.url(options),
    method: 'post',
})

terminal.definition = {
    methods: ["post"],
    url: '/student/terminal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\InlineCodeController::terminal
 * @see app/Http/Controllers/Student/InlineCodeController.php:33
 * @route '/student/terminal'
 */
terminal.url = (options?: RouteQueryOptions) => {
    return terminal.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\InlineCodeController::terminal
 * @see app/Http/Controllers/Student/InlineCodeController.php:33
 * @route '/student/terminal'
 */
terminal.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: terminal.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\InlineCodeController::terminal
 * @see app/Http/Controllers/Student/InlineCodeController.php:33
 * @route '/student/terminal'
 */
    const terminalForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: terminal.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\InlineCodeController::terminal
 * @see app/Http/Controllers/Student/InlineCodeController.php:33
 * @route '/student/terminal'
 */
        terminalForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: terminal.url(options),
            method: 'post',
        })
    
    terminal.form = terminalForm
const InlineCodeController = { execute, terminal }

export default InlineCodeController