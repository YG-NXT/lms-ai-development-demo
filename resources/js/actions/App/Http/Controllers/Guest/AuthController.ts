import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Guest\AuthController::showLogin
 * @see app/Http/Controllers/Guest/AuthController.php:15
 * @route '/login'
 */
export const showLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})

showLogin.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\AuthController::showLogin
 * @see app/Http/Controllers/Guest/AuthController.php:15
 * @route '/login'
 */
showLogin.url = (options?: RouteQueryOptions) => {
    return showLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\AuthController::showLogin
 * @see app/Http/Controllers/Guest/AuthController.php:15
 * @route '/login'
 */
showLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\AuthController::showLogin
 * @see app/Http/Controllers/Guest/AuthController.php:15
 * @route '/login'
 */
showLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLogin.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\AuthController::showLogin
 * @see app/Http/Controllers/Guest/AuthController.php:15
 * @route '/login'
 */
    const showLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showLogin.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\AuthController::showLogin
 * @see app/Http/Controllers/Guest/AuthController.php:15
 * @route '/login'
 */
        showLoginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLogin.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\AuthController::showLogin
 * @see app/Http/Controllers/Guest/AuthController.php:15
 * @route '/login'
 */
        showLoginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLogin.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showLogin.form = showLoginForm
/**
* @see \App\Http\Controllers\Guest\AuthController::storeLogin
 * @see app/Http/Controllers/Guest/AuthController.php:20
 * @route '/login'
 */
export const storeLogin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLogin.url(options),
    method: 'post',
})

storeLogin.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Guest\AuthController::storeLogin
 * @see app/Http/Controllers/Guest/AuthController.php:20
 * @route '/login'
 */
storeLogin.url = (options?: RouteQueryOptions) => {
    return storeLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\AuthController::storeLogin
 * @see app/Http/Controllers/Guest/AuthController.php:20
 * @route '/login'
 */
storeLogin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLogin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Guest\AuthController::storeLogin
 * @see app/Http/Controllers/Guest/AuthController.php:20
 * @route '/login'
 */
    const storeLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeLogin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Guest\AuthController::storeLogin
 * @see app/Http/Controllers/Guest/AuthController.php:20
 * @route '/login'
 */
        storeLoginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeLogin.url(options),
            method: 'post',
        })
    
    storeLogin.form = storeLoginForm
/**
* @see \App\Http\Controllers\Guest\AuthController::showRegister
 * @see app/Http/Controllers/Guest/AuthController.php:41
 * @route '/register'
 */
export const showRegister = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRegister.url(options),
    method: 'get',
})

showRegister.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Guest\AuthController::showRegister
 * @see app/Http/Controllers/Guest/AuthController.php:41
 * @route '/register'
 */
showRegister.url = (options?: RouteQueryOptions) => {
    return showRegister.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\AuthController::showRegister
 * @see app/Http/Controllers/Guest/AuthController.php:41
 * @route '/register'
 */
showRegister.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRegister.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Guest\AuthController::showRegister
 * @see app/Http/Controllers/Guest/AuthController.php:41
 * @route '/register'
 */
showRegister.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRegister.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Guest\AuthController::showRegister
 * @see app/Http/Controllers/Guest/AuthController.php:41
 * @route '/register'
 */
    const showRegisterForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showRegister.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Guest\AuthController::showRegister
 * @see app/Http/Controllers/Guest/AuthController.php:41
 * @route '/register'
 */
        showRegisterForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showRegister.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Guest\AuthController::showRegister
 * @see app/Http/Controllers/Guest/AuthController.php:41
 * @route '/register'
 */
        showRegisterForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showRegister.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showRegister.form = showRegisterForm
/**
* @see \App\Http\Controllers\Guest\AuthController::storeRegister
 * @see app/Http/Controllers/Guest/AuthController.php:46
 * @route '/register'
 */
export const storeRegister = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRegister.url(options),
    method: 'post',
})

storeRegister.definition = {
    methods: ["post"],
    url: '/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Guest\AuthController::storeRegister
 * @see app/Http/Controllers/Guest/AuthController.php:46
 * @route '/register'
 */
storeRegister.url = (options?: RouteQueryOptions) => {
    return storeRegister.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\AuthController::storeRegister
 * @see app/Http/Controllers/Guest/AuthController.php:46
 * @route '/register'
 */
storeRegister.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRegister.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Guest\AuthController::storeRegister
 * @see app/Http/Controllers/Guest/AuthController.php:46
 * @route '/register'
 */
    const storeRegisterForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeRegister.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Guest\AuthController::storeRegister
 * @see app/Http/Controllers/Guest/AuthController.php:46
 * @route '/register'
 */
        storeRegisterForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeRegister.url(options),
            method: 'post',
        })
    
    storeRegister.form = storeRegisterForm
/**
* @see \App\Http\Controllers\Guest\AuthController::destroy
 * @see app/Http/Controllers/Guest/AuthController.php:59
 * @route '/logout'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

destroy.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Guest\AuthController::destroy
 * @see app/Http/Controllers/Guest/AuthController.php:59
 * @route '/logout'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Guest\AuthController::destroy
 * @see app/Http/Controllers/Guest/AuthController.php:59
 * @route '/logout'
 */
destroy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Guest\AuthController::destroy
 * @see app/Http/Controllers/Guest/AuthController.php:59
 * @route '/logout'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Guest\AuthController::destroy
 * @see app/Http/Controllers/Guest/AuthController.php:59
 * @route '/logout'
 */
        destroyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(options),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AuthController = { showLogin, storeLogin, showRegister, storeRegister, destroy }

export default AuthController