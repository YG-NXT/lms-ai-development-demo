import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TutorialController::index
 * @see app/Http/Controllers/Admin/TutorialController.php:12
 * @route '/admin/tutorials'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tutorials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TutorialController::index
 * @see app/Http/Controllers/Admin/TutorialController.php:12
 * @route '/admin/tutorials'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TutorialController::index
 * @see app/Http/Controllers/Admin/TutorialController.php:12
 * @route '/admin/tutorials'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TutorialController::index
 * @see app/Http/Controllers/Admin/TutorialController.php:12
 * @route '/admin/tutorials'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TutorialController::index
 * @see app/Http/Controllers/Admin/TutorialController.php:12
 * @route '/admin/tutorials'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TutorialController::index
 * @see app/Http/Controllers/Admin/TutorialController.php:12
 * @route '/admin/tutorials'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TutorialController::index
 * @see app/Http/Controllers/Admin/TutorialController.php:12
 * @route '/admin/tutorials'
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
* @see \App\Http\Controllers\Admin\TutorialController::create
 * @see app/Http/Controllers/Admin/TutorialController.php:26
 * @route '/admin/tutorials/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/tutorials/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TutorialController::create
 * @see app/Http/Controllers/Admin/TutorialController.php:26
 * @route '/admin/tutorials/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TutorialController::create
 * @see app/Http/Controllers/Admin/TutorialController.php:26
 * @route '/admin/tutorials/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TutorialController::create
 * @see app/Http/Controllers/Admin/TutorialController.php:26
 * @route '/admin/tutorials/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TutorialController::create
 * @see app/Http/Controllers/Admin/TutorialController.php:26
 * @route '/admin/tutorials/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TutorialController::create
 * @see app/Http/Controllers/Admin/TutorialController.php:26
 * @route '/admin/tutorials/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TutorialController::create
 * @see app/Http/Controllers/Admin/TutorialController.php:26
 * @route '/admin/tutorials/create'
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
* @see \App\Http\Controllers\Admin\TutorialController::store
 * @see app/Http/Controllers/Admin/TutorialController.php:31
 * @route '/admin/tutorials'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tutorials',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TutorialController::store
 * @see app/Http/Controllers/Admin/TutorialController.php:31
 * @route '/admin/tutorials'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TutorialController::store
 * @see app/Http/Controllers/Admin/TutorialController.php:31
 * @route '/admin/tutorials'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TutorialController::store
 * @see app/Http/Controllers/Admin/TutorialController.php:31
 * @route '/admin/tutorials'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TutorialController::store
 * @see app/Http/Controllers/Admin/TutorialController.php:31
 * @route '/admin/tutorials'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TutorialController::show
 * @see app/Http/Controllers/Admin/TutorialController.php:52
 * @route '/admin/tutorials/{tutorial}'
 */
export const show = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/tutorials/{tutorial}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TutorialController::show
 * @see app/Http/Controllers/Admin/TutorialController.php:52
 * @route '/admin/tutorials/{tutorial}'
 */
show.url = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tutorial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tutorial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tutorial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tutorial: typeof args.tutorial === 'object'
                ? args.tutorial.id
                : args.tutorial,
                }

    return show.definition.url
            .replace('{tutorial}', parsedArgs.tutorial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TutorialController::show
 * @see app/Http/Controllers/Admin/TutorialController.php:52
 * @route '/admin/tutorials/{tutorial}'
 */
show.get = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TutorialController::show
 * @see app/Http/Controllers/Admin/TutorialController.php:52
 * @route '/admin/tutorials/{tutorial}'
 */
show.head = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TutorialController::show
 * @see app/Http/Controllers/Admin/TutorialController.php:52
 * @route '/admin/tutorials/{tutorial}'
 */
    const showForm = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TutorialController::show
 * @see app/Http/Controllers/Admin/TutorialController.php:52
 * @route '/admin/tutorials/{tutorial}'
 */
        showForm.get = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TutorialController::show
 * @see app/Http/Controllers/Admin/TutorialController.php:52
 * @route '/admin/tutorials/{tutorial}'
 */
        showForm.head = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TutorialController::edit
 * @see app/Http/Controllers/Admin/TutorialController.php:61
 * @route '/admin/tutorials/{tutorial}/edit'
 */
export const edit = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/tutorials/{tutorial}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TutorialController::edit
 * @see app/Http/Controllers/Admin/TutorialController.php:61
 * @route '/admin/tutorials/{tutorial}/edit'
 */
edit.url = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tutorial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tutorial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tutorial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tutorial: typeof args.tutorial === 'object'
                ? args.tutorial.id
                : args.tutorial,
                }

    return edit.definition.url
            .replace('{tutorial}', parsedArgs.tutorial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TutorialController::edit
 * @see app/Http/Controllers/Admin/TutorialController.php:61
 * @route '/admin/tutorials/{tutorial}/edit'
 */
edit.get = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TutorialController::edit
 * @see app/Http/Controllers/Admin/TutorialController.php:61
 * @route '/admin/tutorials/{tutorial}/edit'
 */
edit.head = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TutorialController::edit
 * @see app/Http/Controllers/Admin/TutorialController.php:61
 * @route '/admin/tutorials/{tutorial}/edit'
 */
    const editForm = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TutorialController::edit
 * @see app/Http/Controllers/Admin/TutorialController.php:61
 * @route '/admin/tutorials/{tutorial}/edit'
 */
        editForm.get = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TutorialController::edit
 * @see app/Http/Controllers/Admin/TutorialController.php:61
 * @route '/admin/tutorials/{tutorial}/edit'
 */
        editForm.head = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TutorialController::update
 * @see app/Http/Controllers/Admin/TutorialController.php:70
 * @route '/admin/tutorials/{tutorial}'
 */
export const update = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/tutorials/{tutorial}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TutorialController::update
 * @see app/Http/Controllers/Admin/TutorialController.php:70
 * @route '/admin/tutorials/{tutorial}'
 */
update.url = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tutorial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tutorial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tutorial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tutorial: typeof args.tutorial === 'object'
                ? args.tutorial.id
                : args.tutorial,
                }

    return update.definition.url
            .replace('{tutorial}', parsedArgs.tutorial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TutorialController::update
 * @see app/Http/Controllers/Admin/TutorialController.php:70
 * @route '/admin/tutorials/{tutorial}'
 */
update.put = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\TutorialController::update
 * @see app/Http/Controllers/Admin/TutorialController.php:70
 * @route '/admin/tutorials/{tutorial}'
 */
update.patch = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\TutorialController::update
 * @see app/Http/Controllers/Admin/TutorialController.php:70
 * @route '/admin/tutorials/{tutorial}'
 */
    const updateForm = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TutorialController::update
 * @see app/Http/Controllers/Admin/TutorialController.php:70
 * @route '/admin/tutorials/{tutorial}'
 */
        updateForm.put = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\TutorialController::update
 * @see app/Http/Controllers/Admin/TutorialController.php:70
 * @route '/admin/tutorials/{tutorial}'
 */
        updateForm.patch = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TutorialController::destroy
 * @see app/Http/Controllers/Admin/TutorialController.php:91
 * @route '/admin/tutorials/{tutorial}'
 */
export const destroy = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/tutorials/{tutorial}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TutorialController::destroy
 * @see app/Http/Controllers/Admin/TutorialController.php:91
 * @route '/admin/tutorials/{tutorial}'
 */
destroy.url = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tutorial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tutorial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tutorial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tutorial: typeof args.tutorial === 'object'
                ? args.tutorial.id
                : args.tutorial,
                }

    return destroy.definition.url
            .replace('{tutorial}', parsedArgs.tutorial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TutorialController::destroy
 * @see app/Http/Controllers/Admin/TutorialController.php:91
 * @route '/admin/tutorials/{tutorial}'
 */
destroy.delete = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TutorialController::destroy
 * @see app/Http/Controllers/Admin/TutorialController.php:91
 * @route '/admin/tutorials/{tutorial}'
 */
    const destroyForm = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TutorialController::destroy
 * @see app/Http/Controllers/Admin/TutorialController.php:91
 * @route '/admin/tutorials/{tutorial}'
 */
        destroyForm.delete = (args: { tutorial: string | number | { id: string | number } } | [tutorial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TutorialController::importKhanAcademy
 * @see app/Http/Controllers/Admin/TutorialController.php:98
 * @route '/admin/tutorials/import-khan-academy'
 */
export const importKhanAcademy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importKhanAcademy.url(options),
    method: 'post',
})

importKhanAcademy.definition = {
    methods: ["post"],
    url: '/admin/tutorials/import-khan-academy',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TutorialController::importKhanAcademy
 * @see app/Http/Controllers/Admin/TutorialController.php:98
 * @route '/admin/tutorials/import-khan-academy'
 */
importKhanAcademy.url = (options?: RouteQueryOptions) => {
    return importKhanAcademy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TutorialController::importKhanAcademy
 * @see app/Http/Controllers/Admin/TutorialController.php:98
 * @route '/admin/tutorials/import-khan-academy'
 */
importKhanAcademy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importKhanAcademy.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TutorialController::importKhanAcademy
 * @see app/Http/Controllers/Admin/TutorialController.php:98
 * @route '/admin/tutorials/import-khan-academy'
 */
    const importKhanAcademyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importKhanAcademy.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TutorialController::importKhanAcademy
 * @see app/Http/Controllers/Admin/TutorialController.php:98
 * @route '/admin/tutorials/import-khan-academy'
 */
        importKhanAcademyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importKhanAcademy.url(options),
            method: 'post',
        })
    
    importKhanAcademy.form = importKhanAcademyForm
const tutorials = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
importKhanAcademy: Object.assign(importKhanAcademy, importKhanAcademy),
}

export default tutorials