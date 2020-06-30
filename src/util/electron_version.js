import rpt from "read-package-tree";
import { compare, minVersion } from 'semver';
import * as lockfile from '@yarnpkg/lockfile';

export function minMatchingVersion(versionString) {
  try {
    const v = minVersion(versionString);
    return v.raw;
  } catch (_) {
    return undefined;
  }
}

// As we cannot know which of potentially multiple Electron versions is actually in use, we always assume the oldest one just in case.
export function oldestVersion(versions) {
  const sortedVersions = (versions || []).sort((a, b) => compare(a, b));
  return sortedVersions.length > 0 ? minMatchingVersion(sortedVersions[0]) : undefined;
}

export function findElectronVersionFromPackageJson(pjsonData) {
  const dependencies = Object.assign({}, pjsonData.devDependencies, pjsonData.dependencies);
  return minMatchingVersion(dependencies.electron);
}

export async function findElectronVersionsFromInstalledPackages(rootPath) {
  const packages = await rpt(rootPath);
  return packages.children.filter((c) => c.name === 'electron').map((e) => minMatchingVersion(e.package.version));
}

export function findElectronVersionsFromPackageLock(plockData) {
  if (!plockData.dependencies) return undefined;
  // TODO: This currently only consideres the top-level dependencies.
  return Object.entries(plockData.dependencies).filter(d => d[0] === 'electron').map(d => minMatchingVersion(d[1].version));
}

export function findElectronVersionsFromYarnLock(yarnLockData) {
  // Converts the yarn.lock into the same format as package-lock.json.
  const plockData = lockfile.parse(yarnLockData);
  return findElectronVersionsFromPackageLock(plockData);
}

/**
 * Returns the oldest Electron version found in the given places.
 *
 * @param {Object} places The places to scan for Electron versions, may contain the following options:
 * @param {Object} [places.pjsonData] The data from the package.json file.
 * @param {string} [places.rootPath] The path to the module (will then scan the installed packages).
 * @param {Object} [places.plockData] The data from the package-lock.json file.
 * @param {string} [places.yarnLockData] The data from the yarn.lock file.
 *
 * @returns {string} The oldest version found.
 */
export async function findOldestElectronVersion(places) {
  let versions = [];

  if (places.pjsonData) {
    const pjsonVersion = findElectronVersionFromPackageJson(places.pjsonData);
    if (pjsonVersion) versions.push(pjsonVersion);
  }

  if (places.rootPath) {
    const installedVersions = await findElectronVersionsFromInstalledPackages(places.rootPath);
    if (installedVersions) versions.push(...installedVersions);
  }

  if (places.plockData) {
    const plockVersions = findElectronVersionsFromPackageLock(places.plockData);
    if (plockVersions) versions.push(...plockVersions);
  }

  if (places.yarnLockData) {
    const yarnLockVersions = findElectronVersionsFromYarnLock(places.yarnLockData);
    if (yarnLockVersions) versions.push(...yarnLockVersions);
  }

  return oldestVersion(versions);
}
