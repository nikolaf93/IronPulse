/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(views)'}/exercises` | `/exercises`; params?: Router.UnknownInputParams; } | { pathname: `${'/(views)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(views)'}/tracking` | `/tracking`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(views)'}/exercises` | `/exercises`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(views)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(views)'}/tracking` | `/tracking`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(views)'}/exercises${`?${string}` | `#${string}` | ''}` | `/exercises${`?${string}` | `#${string}` | ''}` | `${'/(views)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(views)'}/tracking${`?${string}` | `#${string}` | ''}` | `/tracking${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(views)'}/exercises` | `/exercises`; params?: Router.UnknownInputParams; } | { pathname: `${'/(views)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(views)'}/tracking` | `/tracking`; params?: Router.UnknownInputParams; } | `/+not-found${`?${string}` | `#${string}` | ''}` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
