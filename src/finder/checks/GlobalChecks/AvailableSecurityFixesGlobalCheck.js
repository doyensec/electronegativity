import fs from 'fs';
import { satisfies, major, minor } from 'semver';
import got from 'got';
import chalk from 'chalk';

export default class AvailableSecurityFixesGlobalCheck {

  constructor() {
    this.id = "AVAILABLE_SECURITY_FIXES_GLOBAL_CHECK";
    this.description = { SECURITY_ISSUES : "Check if there are security patches applied in between the Electron version used and the latest",
      OUTDATED_VERSION : "A new version of Electron is available" };
    this.depends = ["ElectronVersionJSONCheck"];
    this.releaseNoteSecurityFixRegex = [ /# Security/i, /\[security\]/i ];
  }

  async perform(issues) {

    await this.updateReleasesList();

    var versionCheckIssues = issues.filter(e => e.id === 'ELECTRON_VERSION_JSON_CHECK');
    var otherIssues = issues.filter(e => e.id !== 'ELECTRON_VERSION_JSON_CHECK');

    var releases;
    var latestRelease;
    var releasesFileName = fs.readdirSync('.').filter(fn => fn.startsWith('releases.'));

    if (versionCheckIssues.length > 0 && releasesFileName.length > 0) {
      var rawReleasesFile = fs.readFileSync(releasesFileName[0]);
      releases = JSON.parse(rawReleasesFile);
      latestRelease = releases.filter(a => a.npm_dist_tags[0] === "latest")[0].version;

      for (const issue of versionCheckIssues) {
        if (issue.properties.versionNumber !== latestRelease) {
          var hasSecurityFixAvailable = await this.checkSecurityFixes(issue.properties.versionNumber, releases);
          if (hasSecurityFixAvailable)
            otherIssues.push({ file: versionCheckIssues[0].file, location: {line: 0, column: 0}, id: this.id, description: this.description.SECURITY_ISSUES, manualReview: false });
        }
      }
    }
    return otherIssues;
  }

  async checkSecurityFixes(version, releases) {
    const majorVersion = major(version);
    const minorVersion = minor(version);
    const family = `${majorVersion}.${minorVersion}.x`;

    var latestRelease = releases.filter(release => satisfies(release.version, family))[0];

    const semverTarget = `>${version} <=${latestRelease.version}`;
    var followingReleases = releases.filter(release => satisfies(release.version, semverTarget));
    var securityFixes = false;
    for (let release of followingReleases) {
      for (let regex of this.releaseNoteSecurityFixRegex)
        if (regex.test(release.body))
          securityFixes = true;
    }
    return securityFixes;
  }


  async updateReleasesList() {

    var shouldUpdate = false;
    var ElectronReleaseData;
    var remoteEtag;
    var localEtag;


    if (!shouldUpdate) {
      var releaseFile = fs.readdirSync('.').filter(fn => fn.startsWith('releases.'));
      if (releaseFile.length > 0) { // file exists, we should check the etag
        try {
          ElectronReleaseData = await got.head('https://raw.githubusercontent.com/electron/releases/master/index.json');
        } catch (e) {
          console.log(chalk.yellow(`Something went wrong while fetching Electron's releases. No connectivity?`));
          return false;
        }
        var rawRemoteEtag = ElectronReleaseData.headers.etag;
        remoteEtag = rawRemoteEtag.substring(1, rawRemoteEtag.length-1);
        localEtag = releaseFile[0].split('.')[1];

        //check if it corresponds to our local version
        if (localEtag === remoteEtag)
          shouldUpdate = false;
        else {
          shouldUpdate = true;    
          //remove the old releases.json file
          fs.unlinkSync(releaseFile[0]);
        }
        
      } else {
        shouldUpdate = true;
      }
    }

    if (shouldUpdate) {
      console.log(chalk.green(`Fetching Electron's new releases, this may take a while...`));
      try {
        ElectronReleaseData = await got('https://raw.githubusercontent.com/electron/releases/master/index.json', { json: true });
      } catch (e) {
        console.log(chalk.yellow(`Something went wrong while fetching Electron's releases. No connectivity?`));
        return false;
      }
      var latest = ElectronReleaseData.body.filter(a => a.npm_dist_tags[0] === "latest")[0].tag_name;
      var rawRemoteEtag = ElectronReleaseData.headers.etag;
      remoteEtag = rawRemoteEtag.substring(1, rawRemoteEtag.length-1);
      var outputFileContent = [];
      for (let release of ElectronReleaseData.body) {
        let essentialInfo = {};
        essentialInfo.tag_name = release.tag_name;
        essentialInfo.version = release.version;
        essentialInfo.body = release.body;
        essentialInfo.npm_dist_tags = release.npm_dist_tags;
        outputFileContent.push(essentialInfo);
      }
      fs.writeFileSync('releases.'+remoteEtag+'.json', JSON.stringify(outputFileContent, null, 1));
      console.log(chalk.green(`Updated releases list to ${latest}!`));
      return true;
    } else {
      console.log(chalk.green(`Releases list is up to date.`));
    }
  }


}
