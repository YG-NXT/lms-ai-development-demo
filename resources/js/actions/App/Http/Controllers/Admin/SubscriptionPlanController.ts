import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::index
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:16
 * @route '/admin/subscriptions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/subscriptions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::index
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:16
 * @route '/admin/subscriptions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::index
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:16
 * @route '/admin/subscriptions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::index
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:16
 * @route '/admin/subscriptions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::index
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:16
 * @route '/admin/subscriptions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::index
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:16
 * @route '/admin/subscriptions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::index
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:16
 * @route '/admin/subscriptions'
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
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::create
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:28
 * @route '/admin/subscriptions/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/subscriptions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::create
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:28
 * @route '/admin/subscriptions/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::create
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:28
 * @route '/admin/subscriptions/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::create
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:28
 * @route '/admin/subscriptions/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::create
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:28
 * @route '/admin/subscriptions/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::create
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:28
 * @route '/admin/subscriptions/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::create
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:28
 * @route '/admin/subscriptions/create'
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
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::store
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:36
 * @route '/admin/subscriptions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/subscriptions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::store
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:36
 * @route '/admin/subscriptions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::store
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:36
 * @route '/admin/subscriptions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::store
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:36
 * @route '/admin/subscriptions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::store
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:36
 * @route '/admin/subscriptions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::edit
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:68
 * @route '/admin/subscriptions/{subscription}/edit'
 */
export const edit = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/subscriptions/{subscription}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::edit
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:68
 * @route '/admin/subscriptions/{subscription}/edit'
 */
edit.url = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subscription: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    subscription: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subscription: args.subscription,
                }

    return edit.definition.url
            .replace('{subscription}', parsedArgs.subscription.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::edit
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:68
 * @route '/admin/subscriptions/{subscription}/edit'
 */
edit.get = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::edit
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:68
 * @route '/admin/subscriptions/{subscription}/edit'
 */
edit.head = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::edit
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:68
 * @route '/admin/subscriptions/{subscription}/edit'
 */
    const editForm = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::edit
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:68
 * @route '/admin/subscriptions/{subscription}/edit'
 */
        editForm.get = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::edit
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:68
 * @route '/admin/subscriptions/{subscription}/edit'
 */
        editForm.head = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::update
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:78
 * @route '/admin/subscriptions/{subscription}'
 */
export const update = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/subscriptions/{subscription}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::update
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:78
 * @route '/admin/subscriptions/{subscription}'
 */
update.url = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subscription: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    subscription: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subscription: args.subscription,
                }

    return update.definition.url
            .replace('{subscription}', parsedArgs.subscription.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::update
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:78
 * @route '/admin/subscriptions/{subscription}'
 */
update.put = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::update
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:78
 * @route '/admin/subscriptions/{subscription}'
 */
update.patch = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::update
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:78
 * @route '/admin/subscriptions/{subscription}'
 */
    const updateForm = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::update
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:78
 * @route '/admin/subscriptions/{subscription}'
 */
        updateForm.put = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::update
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:78
 * @route '/admin/subscriptions/{subscription}'
 */
        updateForm.patch = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::destroy
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:99
 * @route '/admin/subscriptions/{subscription}'
 */
export const destroy = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/subscriptions/{subscription}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::destroy
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:99
 * @route '/admin/subscriptions/{subscription}'
 */
destroy.url = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subscription: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    subscription: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subscription: args.subscription,
                }

    return destroy.definition.url
            .replace('{subscription}', parsedArgs.subscription.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::destroy
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:99
 * @route '/admin/subscriptions/{subscription}'
 */
destroy.delete = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::destroy
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:99
 * @route '/admin/subscriptions/{subscription}'
 */
    const destroyForm = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::destroy
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:99
 * @route '/admin/subscriptions/{subscription}'
 */
        destroyForm.delete = (args: { subscription: string | number } | [subscription: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::toggle
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:117
 * @route '/admin/subscriptions/{subscriptionPlan}/toggle'
 */
export const toggle = (args: { subscriptionPlan: string | number | { id: string | number } } | [subscriptionPlan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/admin/subscriptions/{subscriptionPlan}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::toggle
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:117
 * @route '/admin/subscriptions/{subscriptionPlan}/toggle'
 */
toggle.url = (args: { subscriptionPlan: string | number | { id: string | number } } | [subscriptionPlan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subscriptionPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subscriptionPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subscriptionPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subscriptionPlan: typeof args.subscriptionPlan === 'object'
                ? args.subscriptionPlan.id
                : args.subscriptionPlan,
                }

    return toggle.definition.url
            .replace('{subscriptionPlan}', parsedArgs.subscriptionPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::toggle
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:117
 * @route '/admin/subscriptions/{subscriptionPlan}/toggle'
 */
toggle.post = (args: { subscriptionPlan: string | number | { id: string | number } } | [subscriptionPlan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::toggle
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:117
 * @route '/admin/subscriptions/{subscriptionPlan}/toggle'
 */
    const toggleForm = (args: { subscriptionPlan: string | number | { id: string | number } } | [subscriptionPlan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::toggle
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:117
 * @route '/admin/subscriptions/{subscriptionPlan}/toggle'
 */
        toggleForm.post = (args: { subscriptionPlan: string | number | { id: string | number } } | [subscriptionPlan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::updateSort
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:129
 * @route '/admin/subscriptions/sort'
 */
export const updateSort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSort.url(options),
    method: 'post',
})

updateSort.definition = {
    methods: ["post"],
    url: '/admin/subscriptions/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::updateSort
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:129
 * @route '/admin/subscriptions/sort'
 */
updateSort.url = (options?: RouteQueryOptions) => {
    return updateSort.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::updateSort
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:129
 * @route '/admin/subscriptions/sort'
 */
updateSort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSort.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::updateSort
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:129
 * @route '/admin/subscriptions/sort'
 */
    const updateSortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSort.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriptionPlanController::updateSort
 * @see app/Http/Controllers/Admin/SubscriptionPlanController.php:129
 * @route '/admin/subscriptions/sort'
 */
        updateSortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSort.url(options),
            method: 'post',
        })
    
    updateSort.form = updateSortForm
const SubscriptionPlanController = { index, create, store, edit, update, destroy, toggle, updateSort }

export default SubscriptionPlanController