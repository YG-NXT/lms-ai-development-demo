import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
export const showLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})

showLogin.definition = {
    methods: ["get","head"],
    url: '/admin/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
showLogin.url = (options?: RouteQueryOptions) => {
    return showLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
showLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
showLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLogin.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
    const showLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showLogin.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
 */
        showLoginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLogin.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:16
 * @route '/admin/login'
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
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:21
 * @route '/admin/login'
 */
export const storeLogin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLogin.url(options),
    method: 'post',
})

storeLogin.definition = {
    methods: ["post"],
    url: '/admin/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:21
 * @route '/admin/login'
 */
storeLogin.url = (options?: RouteQueryOptions) => {
    return storeLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:21
 * @route '/admin/login'
 */
storeLogin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLogin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:21
 * @route '/admin/login'
 */
    const storeLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeLogin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeLogin
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:21
 * @route '/admin/login'
 */
        storeLoginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeLogin.url(options),
            method: 'post',
        })
    
    storeLogin.form = storeLoginForm
/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
export const showRegister = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRegister.url(options),
    method: 'get',
})

showRegister.definition = {
    methods: ["get","head"],
    url: '/admin/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
showRegister.url = (options?: RouteQueryOptions) => {
    return showRegister.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
showRegister.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRegister.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
showRegister.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRegister.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
    const showRegisterForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showRegister.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
 */
        showRegisterForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showRegister.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::showRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:47
 * @route '/admin/register'
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
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:52
 * @route '/admin/register'
 */
export const storeRegister = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRegister.url(options),
    method: 'post',
})

storeRegister.definition = {
    methods: ["post"],
    url: '/admin/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:52
 * @route '/admin/register'
 */
storeRegister.url = (options?: RouteQueryOptions) => {
    return storeRegister.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:52
 * @route '/admin/register'
 */
storeRegister.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRegister.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:52
 * @route '/admin/register'
 */
    const storeRegisterForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeRegister.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\Auth\AuthController::storeRegister
 * @see app/Http/Controllers/Admin/Auth/AuthController.php:52
 * @route '/admin/register'
 */
        storeRegisterForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeRegister.url(options),
            method: 'post',
        })
    
    storeRegister.form = storeRegisterForm
const AuthController = { showLogin, storeLogin, showRegister, storeRegister }

export default AuthController