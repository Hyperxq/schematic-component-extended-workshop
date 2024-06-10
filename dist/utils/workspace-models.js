'use strict';

/**
 /**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ exports.ProjectType = void 0;
(function(ProjectType) {
    ProjectType["Application"] = "application";
    ProjectType["Library"] = "library";
})(exports.ProjectType || (exports.ProjectType = {}));
exports.Builders = void 0;
(function(Builders) {
    Builders["AppShell"] = "@angular-devkit/build-angular:app-shell";
    Builders["Server"] = "@angular-devkit/build-angular:server";
    Builders["Browser"] = "@angular-devkit/build-angular:browser";
    Builders["Karma"] = "@angular-devkit/build-angular:karma";
    Builders["TsLint"] = "@angular-devkit/build-angular:tslint";
    Builders["DeprecatedNgPackagr"] = "@angular-devkit/build-ng-packagr:build";
    Builders["NgPackagr"] = "@angular-devkit/build-angular:ng-packagr";
    Builders["DevServer"] = "@angular-devkit/build-angular:dev-server";
    Builders["ExtractI18n"] = "@angular-devkit/build-angular:extract-i18n";
    Builders["Protractor"] = "@angular-devkit/build-angular:protractor";
})(exports.Builders || (exports.Builders = {}));
