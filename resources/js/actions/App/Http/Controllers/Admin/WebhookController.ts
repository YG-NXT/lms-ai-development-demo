import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\WebhookController::index
 * @see app/Http/Controllers/Admin/WebhookController.php:14
 * @route '/admin/webhooks'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/webhooks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WebhookController::index
 * @see app/Http/Controllers/Admin/WebhookController.php:14
 * @route '/admin/webhooks'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WebhookController::index
 * @see app/Http/Controllers/Admin/WebhookController.php:14
 * @route '/admin/webhooks'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WebhookController::index
 * @see app/Http/Controllers/Admin/WebhookController.php:14
 * @route '/admin/webhooks'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WebhookController::index
 * @see app/Http/Controllers/Admin/WebhookController.php:14
 * @route '/admin/webhooks'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WebhookController::index
 * @see app/Http/Controllers/Admin/WebhookController.php:14
 * @route '/admin/webhooks'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WebhookController::index
 * @see app/Http/Controllers/Admin/WebhookController.php:14
 * @route '/admin/webhooks'
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
* @see \App\Http\Controllers\Admin\WebhookController::create
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/webhooks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WebhookController::create
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WebhookController::create
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WebhookController::create
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WebhookController::create
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WebhookController::create
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WebhookController::create
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\WebhookController::store
 * @see app/Http/Controllers/Admin/WebhookController.php:23
 * @route '/admin/webhooks'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/webhooks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\WebhookController::store
 * @see app/Http/Controllers/Admin/WebhookController.php:23
 * @route '/admin/webhooks'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WebhookController::store
 * @see app/Http/Controllers/Admin/WebhookController.php:23
 * @route '/admin/webhooks'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\WebhookController::store
 * @see app/Http/Controllers/Admin/WebhookController.php:23
 * @route '/admin/webhooks'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WebhookController::store
 * @see app/Http/Controllers/Admin/WebhookController.php:23
 * @route '/admin/webhooks'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\WebhookController::show
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}'
 */
export const show = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/webhooks/{webhook}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WebhookController::show
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}'
 */
show.url = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhook: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    webhook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        webhook: args.webhook,
                }

    return show.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WebhookController::show
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}'
 */
show.get = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WebhookController::show
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}'
 */
show.head = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WebhookController::show
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}'
 */
    const showForm = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WebhookController::show
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}'
 */
        showForm.get = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WebhookController::show
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}'
 */
        showForm.head = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\WebhookController::edit
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}/edit'
 */
export const edit = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/webhooks/{webhook}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WebhookController::edit
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}/edit'
 */
edit.url = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhook: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    webhook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        webhook: args.webhook,
                }

    return edit.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WebhookController::edit
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}/edit'
 */
edit.get = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WebhookController::edit
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}/edit'
 */
edit.head = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WebhookController::edit
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}/edit'
 */
    const editForm = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WebhookController::edit
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}/edit'
 */
        editForm.get = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WebhookController::edit
 * @see app/Http/Controllers/Admin/WebhookController.php:0
 * @route '/admin/webhooks/{webhook}/edit'
 */
        editForm.head = (args: { webhook: string | number } | [webhook: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\WebhookController::update
 * @see app/Http/Controllers/Admin/WebhookController.php:47
 * @route '/admin/webhooks/{webhook}'
 */
export const update = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/webhooks/{webhook}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\WebhookController::update
 * @see app/Http/Controllers/Admin/WebhookController.php:47
 * @route '/admin/webhooks/{webhook}'
 */
update.url = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhook: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { webhook: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    webhook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        webhook: typeof args.webhook === 'object'
                ? args.webhook.id
                : args.webhook,
                }

    return update.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WebhookController::update
 * @see app/Http/Controllers/Admin/WebhookController.php:47
 * @route '/admin/webhooks/{webhook}'
 */
update.put = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\WebhookController::update
 * @see app/Http/Controllers/Admin/WebhookController.php:47
 * @route '/admin/webhooks/{webhook}'
 */
update.patch = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\WebhookController::update
 * @see app/Http/Controllers/Admin/WebhookController.php:47
 * @route '/admin/webhooks/{webhook}'
 */
    const updateForm = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WebhookController::update
 * @see app/Http/Controllers/Admin/WebhookController.php:47
 * @route '/admin/webhooks/{webhook}'
 */
        updateForm.put = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\WebhookController::update
 * @see app/Http/Controllers/Admin/WebhookController.php:47
 * @route '/admin/webhooks/{webhook}'
 */
        updateForm.patch = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\WebhookController::destroy
 * @see app/Http/Controllers/Admin/WebhookController.php:71
 * @route '/admin/webhooks/{webhook}'
 */
export const destroy = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/webhooks/{webhook}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\WebhookController::destroy
 * @see app/Http/Controllers/Admin/WebhookController.php:71
 * @route '/admin/webhooks/{webhook}'
 */
destroy.url = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhook: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { webhook: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    webhook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        webhook: typeof args.webhook === 'object'
                ? args.webhook.id
                : args.webhook,
                }

    return destroy.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WebhookController::destroy
 * @see app/Http/Controllers/Admin/WebhookController.php:71
 * @route '/admin/webhooks/{webhook}'
 */
destroy.delete = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\WebhookController::destroy
 * @see app/Http/Controllers/Admin/WebhookController.php:71
 * @route '/admin/webhooks/{webhook}'
 */
    const destroyForm = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WebhookController::destroy
 * @see app/Http/Controllers/Admin/WebhookController.php:71
 * @route '/admin/webhooks/{webhook}'
 */
        destroyForm.delete = (args: { webhook: string | number | { id: string | number } } | [webhook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const WebhookController = { index, create, store, show, edit, update, destroy }

export default WebhookController