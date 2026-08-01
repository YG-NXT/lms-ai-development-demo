import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\LiveClassController::index
 * @see app/Http/Controllers/Admin/LiveClassController.php:22
 * @route '/admin/live-classes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/live-classes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LiveClassController::index
 * @see app/Http/Controllers/Admin/LiveClassController.php:22
 * @route '/admin/live-classes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LiveClassController::index
 * @see app/Http/Controllers/Admin/LiveClassController.php:22
 * @route '/admin/live-classes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LiveClassController::index
 * @see app/Http/Controllers/Admin/LiveClassController.php:22
 * @route '/admin/live-classes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LiveClassController::index
 * @see app/Http/Controllers/Admin/LiveClassController.php:22
 * @route '/admin/live-classes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LiveClassController::index
 * @see app/Http/Controllers/Admin/LiveClassController.php:22
 * @route '/admin/live-classes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LiveClassController::index
 * @see app/Http/Controllers/Admin/LiveClassController.php:22
 * @route '/admin/live-classes'
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
* @see \App\Http\Controllers\Admin\LiveClassController::create
 * @see app/Http/Controllers/Admin/LiveClassController.php:36
 * @route '/admin/live-classes/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/live-classes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LiveClassController::create
 * @see app/Http/Controllers/Admin/LiveClassController.php:36
 * @route '/admin/live-classes/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LiveClassController::create
 * @see app/Http/Controllers/Admin/LiveClassController.php:36
 * @route '/admin/live-classes/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LiveClassController::create
 * @see app/Http/Controllers/Admin/LiveClassController.php:36
 * @route '/admin/live-classes/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LiveClassController::create
 * @see app/Http/Controllers/Admin/LiveClassController.php:36
 * @route '/admin/live-classes/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LiveClassController::create
 * @see app/Http/Controllers/Admin/LiveClassController.php:36
 * @route '/admin/live-classes/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LiveClassController::create
 * @see app/Http/Controllers/Admin/LiveClassController.php:36
 * @route '/admin/live-classes/create'
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
* @see \App\Http\Controllers\Admin\LiveClassController::store
 * @see app/Http/Controllers/Admin/LiveClassController.php:45
 * @route '/admin/live-classes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/live-classes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LiveClassController::store
 * @see app/Http/Controllers/Admin/LiveClassController.php:45
 * @route '/admin/live-classes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LiveClassController::store
 * @see app/Http/Controllers/Admin/LiveClassController.php:45
 * @route '/admin/live-classes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LiveClassController::store
 * @see app/Http/Controllers/Admin/LiveClassController.php:45
 * @route '/admin/live-classes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LiveClassController::store
 * @see app/Http/Controllers/Admin/LiveClassController.php:45
 * @route '/admin/live-classes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\LiveClassController::show
 * @see app/Http/Controllers/Admin/LiveClassController.php:0
 * @route '/admin/live-classes/{live_class}'
 */
export const show = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/live-classes/{live_class}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LiveClassController::show
 * @see app/Http/Controllers/Admin/LiveClassController.php:0
 * @route '/admin/live-classes/{live_class}'
 */
show.url = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { live_class: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    live_class: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        live_class: args.live_class,
                }

    return show.definition.url
            .replace('{live_class}', parsedArgs.live_class.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LiveClassController::show
 * @see app/Http/Controllers/Admin/LiveClassController.php:0
 * @route '/admin/live-classes/{live_class}'
 */
show.get = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LiveClassController::show
 * @see app/Http/Controllers/Admin/LiveClassController.php:0
 * @route '/admin/live-classes/{live_class}'
 */
show.head = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LiveClassController::show
 * @see app/Http/Controllers/Admin/LiveClassController.php:0
 * @route '/admin/live-classes/{live_class}'
 */
    const showForm = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LiveClassController::show
 * @see app/Http/Controllers/Admin/LiveClassController.php:0
 * @route '/admin/live-classes/{live_class}'
 */
        showForm.get = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LiveClassController::show
 * @see app/Http/Controllers/Admin/LiveClassController.php:0
 * @route '/admin/live-classes/{live_class}'
 */
        showForm.head = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\LiveClassController::edit
 * @see app/Http/Controllers/Admin/LiveClassController.php:55
 * @route '/admin/live-classes/{live_class}/edit'
 */
export const edit = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/live-classes/{live_class}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LiveClassController::edit
 * @see app/Http/Controllers/Admin/LiveClassController.php:55
 * @route '/admin/live-classes/{live_class}/edit'
 */
edit.url = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { live_class: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    live_class: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        live_class: args.live_class,
                }

    return edit.definition.url
            .replace('{live_class}', parsedArgs.live_class.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LiveClassController::edit
 * @see app/Http/Controllers/Admin/LiveClassController.php:55
 * @route '/admin/live-classes/{live_class}/edit'
 */
edit.get = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LiveClassController::edit
 * @see app/Http/Controllers/Admin/LiveClassController.php:55
 * @route '/admin/live-classes/{live_class}/edit'
 */
edit.head = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LiveClassController::edit
 * @see app/Http/Controllers/Admin/LiveClassController.php:55
 * @route '/admin/live-classes/{live_class}/edit'
 */
    const editForm = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LiveClassController::edit
 * @see app/Http/Controllers/Admin/LiveClassController.php:55
 * @route '/admin/live-classes/{live_class}/edit'
 */
        editForm.get = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LiveClassController::edit
 * @see app/Http/Controllers/Admin/LiveClassController.php:55
 * @route '/admin/live-classes/{live_class}/edit'
 */
        editForm.head = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\LiveClassController::update
 * @see app/Http/Controllers/Admin/LiveClassController.php:65
 * @route '/admin/live-classes/{live_class}'
 */
export const update = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/live-classes/{live_class}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\LiveClassController::update
 * @see app/Http/Controllers/Admin/LiveClassController.php:65
 * @route '/admin/live-classes/{live_class}'
 */
update.url = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { live_class: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    live_class: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        live_class: args.live_class,
                }

    return update.definition.url
            .replace('{live_class}', parsedArgs.live_class.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LiveClassController::update
 * @see app/Http/Controllers/Admin/LiveClassController.php:65
 * @route '/admin/live-classes/{live_class}'
 */
update.put = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\LiveClassController::update
 * @see app/Http/Controllers/Admin/LiveClassController.php:65
 * @route '/admin/live-classes/{live_class}'
 */
update.patch = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\LiveClassController::update
 * @see app/Http/Controllers/Admin/LiveClassController.php:65
 * @route '/admin/live-classes/{live_class}'
 */
    const updateForm = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LiveClassController::update
 * @see app/Http/Controllers/Admin/LiveClassController.php:65
 * @route '/admin/live-classes/{live_class}'
 */
        updateForm.put = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\LiveClassController::update
 * @see app/Http/Controllers/Admin/LiveClassController.php:65
 * @route '/admin/live-classes/{live_class}'
 */
        updateForm.patch = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\LiveClassController::destroy
 * @see app/Http/Controllers/Admin/LiveClassController.php:75
 * @route '/admin/live-classes/{live_class}'
 */
export const destroy = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/live-classes/{live_class}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\LiveClassController::destroy
 * @see app/Http/Controllers/Admin/LiveClassController.php:75
 * @route '/admin/live-classes/{live_class}'
 */
destroy.url = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { live_class: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    live_class: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        live_class: args.live_class,
                }

    return destroy.definition.url
            .replace('{live_class}', parsedArgs.live_class.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LiveClassController::destroy
 * @see app/Http/Controllers/Admin/LiveClassController.php:75
 * @route '/admin/live-classes/{live_class}'
 */
destroy.delete = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\LiveClassController::destroy
 * @see app/Http/Controllers/Admin/LiveClassController.php:75
 * @route '/admin/live-classes/{live_class}'
 */
    const destroyForm = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LiveClassController::destroy
 * @see app/Http/Controllers/Admin/LiveClassController.php:75
 * @route '/admin/live-classes/{live_class}'
 */
        destroyForm.delete = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const LiveClassController = { index, create, store, show, edit, update, destroy }

export default LiveClassController