import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\OrderController::index
 * @see app/Http/Controllers/Student/OrderController.php:16
 * @route '/student/orders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\OrderController::index
 * @see app/Http/Controllers/Student/OrderController.php:16
 * @route '/student/orders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\OrderController::index
 * @see app/Http/Controllers/Student/OrderController.php:16
 * @route '/student/orders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\OrderController::index
 * @see app/Http/Controllers/Student/OrderController.php:16
 * @route '/student/orders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\OrderController::index
 * @see app/Http/Controllers/Student/OrderController.php:16
 * @route '/student/orders'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\OrderController::index
 * @see app/Http/Controllers/Student/OrderController.php:16
 * @route '/student/orders'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\OrderController::index
 * @see app/Http/Controllers/Student/OrderController.php:16
 * @route '/student/orders'
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
* @see \App\Http\Controllers\Student\OrderController::show
 * @see app/Http/Controllers/Student/OrderController.php:33
 * @route '/student/orders/{order}'
 */
export const show = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/orders/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\OrderController::show
 * @see app/Http/Controllers/Student/OrderController.php:33
 * @route '/student/orders/{order}'
 */
show.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return show.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\OrderController::show
 * @see app/Http/Controllers/Student/OrderController.php:33
 * @route '/student/orders/{order}'
 */
show.get = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\OrderController::show
 * @see app/Http/Controllers/Student/OrderController.php:33
 * @route '/student/orders/{order}'
 */
show.head = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\OrderController::show
 * @see app/Http/Controllers/Student/OrderController.php:33
 * @route '/student/orders/{order}'
 */
    const showForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\OrderController::show
 * @see app/Http/Controllers/Student/OrderController.php:33
 * @route '/student/orders/{order}'
 */
        showForm.get = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\OrderController::show
 * @see app/Http/Controllers/Student/OrderController.php:33
 * @route '/student/orders/{order}'
 */
        showForm.head = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Student\OrderController::downloadInvoice
 * @see app/Http/Controllers/Student/OrderController.php:48
 * @route '/student/orders/{order}/invoice'
 */
export const downloadInvoice = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadInvoice.url(args, options),
    method: 'get',
})

downloadInvoice.definition = {
    methods: ["get","head"],
    url: '/student/orders/{order}/invoice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\OrderController::downloadInvoice
 * @see app/Http/Controllers/Student/OrderController.php:48
 * @route '/student/orders/{order}/invoice'
 */
downloadInvoice.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return downloadInvoice.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\OrderController::downloadInvoice
 * @see app/Http/Controllers/Student/OrderController.php:48
 * @route '/student/orders/{order}/invoice'
 */
downloadInvoice.get = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadInvoice.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\OrderController::downloadInvoice
 * @see app/Http/Controllers/Student/OrderController.php:48
 * @route '/student/orders/{order}/invoice'
 */
downloadInvoice.head = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadInvoice.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\OrderController::downloadInvoice
 * @see app/Http/Controllers/Student/OrderController.php:48
 * @route '/student/orders/{order}/invoice'
 */
    const downloadInvoiceForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadInvoice.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\OrderController::downloadInvoice
 * @see app/Http/Controllers/Student/OrderController.php:48
 * @route '/student/orders/{order}/invoice'
 */
        downloadInvoiceForm.get = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadInvoice.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\OrderController::downloadInvoice
 * @see app/Http/Controllers/Student/OrderController.php:48
 * @route '/student/orders/{order}/invoice'
 */
        downloadInvoiceForm.head = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadInvoice.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadInvoice.form = downloadInvoiceForm
const OrderController = { index, show, downloadInvoice }

export default OrderController