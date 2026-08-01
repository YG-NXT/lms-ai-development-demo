import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\CertificateController::index
 * @see app/Http/Controllers/Student/CertificateController.php:19
 * @route '/student/certificates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/certificates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CertificateController::index
 * @see app/Http/Controllers/Student/CertificateController.php:19
 * @route '/student/certificates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CertificateController::index
 * @see app/Http/Controllers/Student/CertificateController.php:19
 * @route '/student/certificates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\CertificateController::index
 * @see app/Http/Controllers/Student/CertificateController.php:19
 * @route '/student/certificates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\CertificateController::index
 * @see app/Http/Controllers/Student/CertificateController.php:19
 * @route '/student/certificates'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\CertificateController::index
 * @see app/Http/Controllers/Student/CertificateController.php:19
 * @route '/student/certificates'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\CertificateController::index
 * @see app/Http/Controllers/Student/CertificateController.php:19
 * @route '/student/certificates'
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
* @see \App\Http\Controllers\Student\CertificateController::download
 * @see app/Http/Controllers/Student/CertificateController.php:31
 * @route '/student/certificates/{certificate}/download'
 */
export const download = (args: { certificate: string | number | { id: string | number } } | [certificate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/student/certificates/{certificate}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CertificateController::download
 * @see app/Http/Controllers/Student/CertificateController.php:31
 * @route '/student/certificates/{certificate}/download'
 */
download.url = (args: { certificate: string | number | { id: string | number } } | [certificate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return download.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CertificateController::download
 * @see app/Http/Controllers/Student/CertificateController.php:31
 * @route '/student/certificates/{certificate}/download'
 */
download.get = (args: { certificate: string | number | { id: string | number } } | [certificate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\CertificateController::download
 * @see app/Http/Controllers/Student/CertificateController.php:31
 * @route '/student/certificates/{certificate}/download'
 */
download.head = (args: { certificate: string | number | { id: string | number } } | [certificate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\CertificateController::download
 * @see app/Http/Controllers/Student/CertificateController.php:31
 * @route '/student/certificates/{certificate}/download'
 */
    const downloadForm = (args: { certificate: string | number | { id: string | number } } | [certificate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\CertificateController::download
 * @see app/Http/Controllers/Student/CertificateController.php:31
 * @route '/student/certificates/{certificate}/download'
 */
        downloadForm.get = (args: { certificate: string | number | { id: string | number } } | [certificate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\CertificateController::download
 * @see app/Http/Controllers/Student/CertificateController.php:31
 * @route '/student/certificates/{certificate}/download'
 */
        downloadForm.head = (args: { certificate: string | number | { id: string | number } } | [certificate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const CertificateController = { index, download }

export default CertificateController