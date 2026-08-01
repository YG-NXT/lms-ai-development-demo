import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdManagementController::index
 * @see app/Http/Controllers/Admin/AdManagementController.php:17
 * @route '/admin/ads'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/ads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::index
 * @see app/Http/Controllers/Admin/AdManagementController.php:17
 * @route '/admin/ads'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::index
 * @see app/Http/Controllers/Admin/AdManagementController.php:17
 * @route '/admin/ads'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdManagementController::index
 * @see app/Http/Controllers/Admin/AdManagementController.php:17
 * @route '/admin/ads'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::index
 * @see app/Http/Controllers/Admin/AdManagementController.php:17
 * @route '/admin/ads'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::index
 * @see app/Http/Controllers/Admin/AdManagementController.php:17
 * @route '/admin/ads'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdManagementController::index
 * @see app/Http/Controllers/Admin/AdManagementController.php:17
 * @route '/admin/ads'
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
* @see \App\Http\Controllers\Admin\AdManagementController::create
 * @see app/Http/Controllers/Admin/AdManagementController.php:39
 * @route '/admin/ads/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/ads/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::create
 * @see app/Http/Controllers/Admin/AdManagementController.php:39
 * @route '/admin/ads/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::create
 * @see app/Http/Controllers/Admin/AdManagementController.php:39
 * @route '/admin/ads/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdManagementController::create
 * @see app/Http/Controllers/Admin/AdManagementController.php:39
 * @route '/admin/ads/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::create
 * @see app/Http/Controllers/Admin/AdManagementController.php:39
 * @route '/admin/ads/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::create
 * @see app/Http/Controllers/Admin/AdManagementController.php:39
 * @route '/admin/ads/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdManagementController::create
 * @see app/Http/Controllers/Admin/AdManagementController.php:39
 * @route '/admin/ads/create'
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
* @see \App\Http\Controllers\Admin\AdManagementController::store
 * @see app/Http/Controllers/Admin/AdManagementController.php:47
 * @route '/admin/ads'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/ads',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::store
 * @see app/Http/Controllers/Admin/AdManagementController.php:47
 * @route '/admin/ads'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::store
 * @see app/Http/Controllers/Admin/AdManagementController.php:47
 * @route '/admin/ads'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::store
 * @see app/Http/Controllers/Admin/AdManagementController.php:47
 * @route '/admin/ads'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::store
 * @see app/Http/Controllers/Admin/AdManagementController.php:47
 * @route '/admin/ads'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\AdManagementController::show
 * @see app/Http/Controllers/Admin/AdManagementController.php:0
 * @route '/admin/ads/{ad}'
 */
export const show = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/ads/{ad}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::show
 * @see app/Http/Controllers/Admin/AdManagementController.php:0
 * @route '/admin/ads/{ad}'
 */
show.url = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ad: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ad: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ad: args.ad,
                }

    return show.definition.url
            .replace('{ad}', parsedArgs.ad.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::show
 * @see app/Http/Controllers/Admin/AdManagementController.php:0
 * @route '/admin/ads/{ad}'
 */
show.get = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdManagementController::show
 * @see app/Http/Controllers/Admin/AdManagementController.php:0
 * @route '/admin/ads/{ad}'
 */
show.head = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::show
 * @see app/Http/Controllers/Admin/AdManagementController.php:0
 * @route '/admin/ads/{ad}'
 */
    const showForm = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::show
 * @see app/Http/Controllers/Admin/AdManagementController.php:0
 * @route '/admin/ads/{ad}'
 */
        showForm.get = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdManagementController::show
 * @see app/Http/Controllers/Admin/AdManagementController.php:0
 * @route '/admin/ads/{ad}'
 */
        showForm.head = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\AdManagementController::edit
 * @see app/Http/Controllers/Admin/AdManagementController.php:72
 * @route '/admin/ads/{ad}/edit'
 */
export const edit = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/ads/{ad}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::edit
 * @see app/Http/Controllers/Admin/AdManagementController.php:72
 * @route '/admin/ads/{ad}/edit'
 */
edit.url = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ad: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ad: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ad: args.ad,
                }

    return edit.definition.url
            .replace('{ad}', parsedArgs.ad.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::edit
 * @see app/Http/Controllers/Admin/AdManagementController.php:72
 * @route '/admin/ads/{ad}/edit'
 */
edit.get = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdManagementController::edit
 * @see app/Http/Controllers/Admin/AdManagementController.php:72
 * @route '/admin/ads/{ad}/edit'
 */
edit.head = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::edit
 * @see app/Http/Controllers/Admin/AdManagementController.php:72
 * @route '/admin/ads/{ad}/edit'
 */
    const editForm = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::edit
 * @see app/Http/Controllers/Admin/AdManagementController.php:72
 * @route '/admin/ads/{ad}/edit'
 */
        editForm.get = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdManagementController::edit
 * @see app/Http/Controllers/Admin/AdManagementController.php:72
 * @route '/admin/ads/{ad}/edit'
 */
        editForm.head = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\AdManagementController::update
 * @see app/Http/Controllers/Admin/AdManagementController.php:82
 * @route '/admin/ads/{ad}'
 */
export const update = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/ads/{ad}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::update
 * @see app/Http/Controllers/Admin/AdManagementController.php:82
 * @route '/admin/ads/{ad}'
 */
update.url = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ad: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ad: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ad: args.ad,
                }

    return update.definition.url
            .replace('{ad}', parsedArgs.ad.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::update
 * @see app/Http/Controllers/Admin/AdManagementController.php:82
 * @route '/admin/ads/{ad}'
 */
update.put = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\AdManagementController::update
 * @see app/Http/Controllers/Admin/AdManagementController.php:82
 * @route '/admin/ads/{ad}'
 */
update.patch = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::update
 * @see app/Http/Controllers/Admin/AdManagementController.php:82
 * @route '/admin/ads/{ad}'
 */
    const updateForm = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::update
 * @see app/Http/Controllers/Admin/AdManagementController.php:82
 * @route '/admin/ads/{ad}'
 */
        updateForm.put = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\AdManagementController::update
 * @see app/Http/Controllers/Admin/AdManagementController.php:82
 * @route '/admin/ads/{ad}'
 */
        updateForm.patch = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\AdManagementController::destroy
 * @see app/Http/Controllers/Admin/AdManagementController.php:107
 * @route '/admin/ads/{ad}'
 */
export const destroy = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/ads/{ad}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::destroy
 * @see app/Http/Controllers/Admin/AdManagementController.php:107
 * @route '/admin/ads/{ad}'
 */
destroy.url = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ad: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ad: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ad: args.ad,
                }

    return destroy.definition.url
            .replace('{ad}', parsedArgs.ad.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::destroy
 * @see app/Http/Controllers/Admin/AdManagementController.php:107
 * @route '/admin/ads/{ad}'
 */
destroy.delete = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::destroy
 * @see app/Http/Controllers/Admin/AdManagementController.php:107
 * @route '/admin/ads/{ad}'
 */
    const destroyForm = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::destroy
 * @see app/Http/Controllers/Admin/AdManagementController.php:107
 * @route '/admin/ads/{ad}'
 */
        destroyForm.delete = (args: { ad: string | number } | [ad: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\AdManagementController::toggle
 * @see app/Http/Controllers/Admin/AdManagementController.php:118
 * @route '/admin/ads/{adZone}/toggle'
 */
export const toggle = (args: { adZone: string | number | { id: string | number } } | [adZone: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/admin/ads/{adZone}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::toggle
 * @see app/Http/Controllers/Admin/AdManagementController.php:118
 * @route '/admin/ads/{adZone}/toggle'
 */
toggle.url = (args: { adZone: string | number | { id: string | number } } | [adZone: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { adZone: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { adZone: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    adZone: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        adZone: typeof args.adZone === 'object'
                ? args.adZone.id
                : args.adZone,
                }

    return toggle.definition.url
            .replace('{adZone}', parsedArgs.adZone.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::toggle
 * @see app/Http/Controllers/Admin/AdManagementController.php:118
 * @route '/admin/ads/{adZone}/toggle'
 */
toggle.post = (args: { adZone: string | number | { id: string | number } } | [adZone: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::toggle
 * @see app/Http/Controllers/Admin/AdManagementController.php:118
 * @route '/admin/ads/{adZone}/toggle'
 */
    const toggleForm = (args: { adZone: string | number | { id: string | number } } | [adZone: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::toggle
 * @see app/Http/Controllers/Admin/AdManagementController.php:118
 * @route '/admin/ads/{adZone}/toggle'
 */
        toggleForm.post = (args: { adZone: string | number | { id: string | number } } | [adZone: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
/**
* @see \App\Http\Controllers\Admin\AdManagementController::updateSettings
 * @see app/Http/Controllers/Admin/AdManagementController.php:128
 * @route '/admin/ads/settings'
 */
export const updateSettings = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSettings.url(options),
    method: 'post',
})

updateSettings.definition = {
    methods: ["post"],
    url: '/admin/ads/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::updateSettings
 * @see app/Http/Controllers/Admin/AdManagementController.php:128
 * @route '/admin/ads/settings'
 */
updateSettings.url = (options?: RouteQueryOptions) => {
    return updateSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::updateSettings
 * @see app/Http/Controllers/Admin/AdManagementController.php:128
 * @route '/admin/ads/settings'
 */
updateSettings.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSettings.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::updateSettings
 * @see app/Http/Controllers/Admin/AdManagementController.php:128
 * @route '/admin/ads/settings'
 */
    const updateSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSettings.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::updateSettings
 * @see app/Http/Controllers/Admin/AdManagementController.php:128
 * @route '/admin/ads/settings'
 */
        updateSettingsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSettings.url(options),
            method: 'post',
        })
    
    updateSettings.form = updateSettingsForm
/**
* @see \App\Http\Controllers\Admin\AdManagementController::analytics
 * @see app/Http/Controllers/Admin/AdManagementController.php:147
 * @route '/admin/ads/analytics'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/admin/ads/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::analytics
 * @see app/Http/Controllers/Admin/AdManagementController.php:147
 * @route '/admin/ads/analytics'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::analytics
 * @see app/Http/Controllers/Admin/AdManagementController.php:147
 * @route '/admin/ads/analytics'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdManagementController::analytics
 * @see app/Http/Controllers/Admin/AdManagementController.php:147
 * @route '/admin/ads/analytics'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::analytics
 * @see app/Http/Controllers/Admin/AdManagementController.php:147
 * @route '/admin/ads/analytics'
 */
    const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::analytics
 * @see app/Http/Controllers/Admin/AdManagementController.php:147
 * @route '/admin/ads/analytics'
 */
        analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdManagementController::analytics
 * @see app/Http/Controllers/Admin/AdManagementController.php:147
 * @route '/admin/ads/analytics'
 */
        analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    analytics.form = analyticsForm
/**
* @see \App\Http\Controllers\Admin\AdManagementController::trackImpression
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
export const trackImpression = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: trackImpression.url(options),
    method: 'post',
})

trackImpression.definition = {
    methods: ["post"],
    url: '/admin/api/ads/track',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdManagementController::trackImpression
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
trackImpression.url = (options?: RouteQueryOptions) => {
    return trackImpression.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdManagementController::trackImpression
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
trackImpression.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: trackImpression.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdManagementController::trackImpression
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
    const trackImpressionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: trackImpression.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdManagementController::trackImpression
 * @see app/Http/Controllers/Admin/AdManagementController.php:183
 * @route '/admin/api/ads/track'
 */
        trackImpressionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: trackImpression.url(options),
            method: 'post',
        })
    
    trackImpression.form = trackImpressionForm
const AdManagementController = { index, create, store, show, edit, update, destroy, toggle, updateSettings, analytics, trackImpression }

export default AdManagementController