export type QueryParams = {
    [key: string]:
        | string
        | number
        | boolean
        | (string | number)[]
        | null
        | undefined
        | QueryParams;
};

type Method = "get" | "post" | "put" | "delete" | "patch" | "head" | "options";
type UrlDefaults = Record<string, unknown>;

let urlDefaults: () => UrlDefaults = () => ({});

let adminPath: string | null = null;

export type RouteDefinition<TMethod extends Method | Method[]> = {
    url: string;
} & (TMethod extends Method[] ? { methods: TMethod } : { method: TMethod });

export type RouteFormDefinition<TMethod extends Method> = {
    action: string;
    method: TMethod;
};

export type RouteQueryOptions = {
    query?: QueryParams;
    mergeQuery?: QueryParams;
};

export const setAdminPath = (path: string): void => {
    adminPath = path;
};

const applyAdminPath = (url: string): string => {
    if (! adminPath || adminPath === 'admin') {
        return url;
    }

    if (url.startsWith('/admin/')) {
        return '/' + adminPath + url.substring('/admin/'.length);
    }
    if (url === '/admin') {
        return '/' + adminPath;
    }

    return url;
};

const getValue = (value: string | number | boolean) => {
    if (value === true) {
        return "1";
    }

    if (value === false) {
        return "0";
    }

    return value.toString();
};

const addNestedParams = (
    obj: QueryParams,
    prefix: string,
    params: URLSearchParams,
) => {
    Object.entries(obj).forEach(([subKey, value]) => {
        if (value === undefined) return;

        const paramKey = `${prefix}[${subKey}]`;

        if (Array.isArray(value)) {
            value.forEach((v) => params.append(`${paramKey}[]`, getValue(v)));
        } else if (value !== null && typeof value === "object") {
            addNestedParams(value, paramKey, params);
        } else if (["string", "number", "boolean"].includes(typeof value)) {
            params.set(paramKey, getValue(value as string | number | boolean));
        }
    });
};

export const queryParams = (options?: RouteQueryOptions) => {
    if (!options || (!options.query && !options.mergeQuery)) {
        return "";
    }

    const query = options.query ?? options.mergeQuery;
    const includeExisting = options.mergeQuery !== undefined;

    const params = new URLSearchParams(
        includeExisting && typeof window !== "undefined"
            ? window.location.search
            : "",
    );

    for (const key in query) {
        const queryValue = query[key];

        if (queryValue === undefined || queryValue === null) {
            params.delete(key);
            continue;
        }

        if (Array.isArray(queryValue)) {
            if (params.has(`${key}[]`)) {
                params.delete(`${key}[]`);
            }

            queryValue.forEach((value) => {
                params.append(`${key}[]`, value.toString());
            });
        } else if (typeof queryValue === "object") {
            params.forEach((_, paramKey) => {
                if (paramKey.startsWith(`${key}[`)) {
                    params.delete(paramKey);
                }
            });

            addNestedParams(queryValue, key, params);
        } else {
            params.set(key, getValue(queryValue));
        }
    }

    const str = params.toString();

    return str.length > 0 ? `?${str}` : "";
};

export const setUrlDefaults = (params: UrlDefaults | (() => UrlDefaults)) => {
    urlDefaults = typeof params === "function" ? params : () => params;
};

export const addUrlDefault = (
    key: string,
    value: string | number | boolean,
) => {
    const params = urlDefaults();
    params[key] = value;

    urlDefaults = () => params;
};

export const applyUrlDefaults = <T extends UrlDefaults | undefined>(
    existing: T,
): T => {
    const existingParams = { ...(existing ?? ({} as UrlDefaults)) };
    const defaultParams = urlDefaults();

    for (const key in defaultParams) {
        if (
            existingParams[key] === undefined &&
            defaultParams[key] !== undefined
        ) {
            (existingParams as Record<string, unknown>)[key] =
                defaultParams[key];
        }
    }

    return existingParams as T;
};

export const patchAdminRoutes = (routesModule: Record<string, any>): void => {
    if (! adminPath) return;

    const patchRoute = (route: any) => {
        if (! route || typeof route !== 'object') return;

        if (route.definition && typeof route.definition === 'object') {
            route.definition.url = applyAdminPath(route.definition.url);
        }

        if (route.url && typeof route.url === 'function') {
            const originalUrlFn = route.url;
            route.url = (options?: RouteQueryOptions) => {
                return applyAdminPath(originalUrlFn(options));
            };
        }

        if (route.definition && Array.isArray(route.definition.methods)) {
            const methods = ['get', 'head', 'post', 'put', 'patch', 'delete'];
            methods.forEach((method) => {
                if (typeof route[method] === 'function') {
                    const original = route[method];
                    route[method] = (options?: RouteQueryOptions) => {
                        const result = original(options);
                        if (result && typeof result === 'object' && 'url' in result) {
                            result.url = applyAdminPath(result.url as string);
                        }
                        return result;
                    };
                }
            });
        }

        const formMethods = ['form'];
        formMethods.forEach((prop) => {
            if (route[prop] && typeof route[prop] === 'object') {
                patchRoute(route[prop]);
            }
        });

        Object.keys(route).forEach((key) => {
            if (key !== 'definition' && key !== 'url' && typeof route[key] === 'object' && route[key] !== null) {
                patchRoute(route[key]);
            }
        });
    };

    Object.keys(routesModule).forEach((key) => {
        if (key !== 'default') {
            patchRoute(routesModule[key]);
        }
    });
};

export const validateParameters = (
    args: Record<string, unknown> | undefined,
    optional: string[],
) => {
    const missing = optional.filter((key) => !args?.[key]);
    const expectedMissing = optional.slice(missing.length * -1);

    for (let i = 0; i < missing.length; i++) {
        if (missing[i] !== expectedMissing[i]) {
            throw Error(
                "Unexpected optional parameters missing. Unable to generate a URL.",
            );
        }
    }
};
