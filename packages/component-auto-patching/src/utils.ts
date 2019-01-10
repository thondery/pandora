import * as url from 'url';
import { UrlWithStringQuery } from 'url';
import * as semver from 'semver';

/**
 * 提取 path 信息，去掉尾部反斜杠
 * @param requestUrl {string|UrlWithStringQuery}
 * @returns {string}
 */
export function extractPath(requestUrl: string | UrlWithStringQuery): string {
  if (typeof requestUrl === 'string') {
    requestUrl = url.parse(requestUrl);
  }

  let path = requestUrl.pathname;

  if (path) {
    if (path !== '/' && path.charAt(path.length - 1) === '/') {
      path = path.substring(0, path.length - 1);
    }
  } else {
    path = '/';
  }

  return path;
}

export function nodeVersion(rule: string) {
  return semver.satisfies((<NodeJS.Process>process).version, rule);
}