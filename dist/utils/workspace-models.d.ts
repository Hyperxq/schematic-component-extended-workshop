declare enum ProjectType {
    Application = "application",
    Library = "library"
}
declare enum Builders {
    AppShell = "@angular-devkit/build-angular:app-shell",
    Server = "@angular-devkit/build-angular:server",
    Browser = "@angular-devkit/build-angular:browser",
    Karma = "@angular-devkit/build-angular:karma",
    TsLint = "@angular-devkit/build-angular:tslint",
    DeprecatedNgPackagr = "@angular-devkit/build-ng-packagr:build",
    NgPackagr = "@angular-devkit/build-angular:ng-packagr",
    DevServer = "@angular-devkit/build-angular:dev-server",
    ExtractI18n = "@angular-devkit/build-angular:extract-i18n",
    Protractor = "@angular-devkit/build-angular:protractor"
}
interface FileReplacements {
    replace: string;
    with: string;
}
interface BrowserBuilderBaseOptions {
    main: string;
    tsConfig: string;
    fileReplacements?: FileReplacements[];
    outputPath?: string;
    index?: string;
    polyfills: string;
    assets?: (object | string)[];
    styles?: (object | string)[];
    scripts?: (object | string)[];
    sourceMap?: boolean;
}
type OutputHashing = 'all' | 'media' | 'none' | 'bundles';
interface BrowserBuilderOptions extends BrowserBuilderBaseOptions {
    serviceWorker?: boolean;
    optimization?: boolean;
    outputHashing?: OutputHashing;
    resourcesOutputPath?: string;
    namedChunks?: boolean;
    aot?: boolean;
    extractLicenses?: boolean;
    vendorChunk?: boolean;
    buildOptimizer?: boolean;
    ngswConfigPath?: string;
    budgets?: {
        type: string;
        maximumWarning?: string;
        maximumError?: string;
    }[];
    webWorkerTsConfig?: string;
}
interface ServeBuilderOptions {
    browserTarget: string;
}
interface LibraryBuilderOptions {
    tsConfig: string;
    project: string;
}
interface ServerBuilderOptions {
    outputPath: string;
    tsConfig: string;
    main: string;
    fileReplacements?: FileReplacements[];
    optimization?: boolean | {
        scripts?: boolean;
        styles?: boolean;
    };
    sourceMap?: boolean | {
        scripts?: boolean;
        styles?: boolean;
        hidden?: boolean;
        vendor?: boolean;
    };
}
interface AppShellBuilderOptions {
    browserTarget: string;
    serverTarget: string;
    route: string;
}
interface TestBuilderOptions extends Partial<BrowserBuilderBaseOptions> {
    karmaConfig: string;
}
interface ExtractI18nOptions {
    browserTarget: string;
}
interface E2EOptions {
    protractorConfig: string;
    devServerTarget: string;
}
interface BuilderTarget<TBuilder extends Builders, TOptions> {
    builder: TBuilder;
    options: TOptions;
    configurations?: {
        production: Partial<TOptions>;
        [key: string]: Partial<TOptions>;
    };
}
type LibraryBuilderTarget = BuilderTarget<Builders.NgPackagr, LibraryBuilderOptions>;
type BrowserBuilderTarget = BuilderTarget<Builders.Browser, BrowserBuilderOptions>;
type ServerBuilderTarget = BuilderTarget<Builders.Server, ServerBuilderOptions>;
type AppShellBuilderTarget = BuilderTarget<Builders.AppShell, AppShellBuilderOptions>;
type TestBuilderTarget = BuilderTarget<Builders.Karma, TestBuilderOptions>;
type ServeBuilderTarget = BuilderTarget<Builders.DevServer, ServeBuilderOptions>;
type ExtractI18nBuilderTarget = BuilderTarget<Builders.ExtractI18n, ExtractI18nOptions>;
type E2EBuilderTarget = BuilderTarget<Builders.Protractor, E2EOptions>;
interface WorkspaceCLISchema {
    warnings?: Record<string, boolean>;
    schematicCollections?: string[];
    defaultCollection?: string;
}
interface WorkspaceSchema {
    version: 1;
    defaultProject?: string;
    cli?: WorkspaceCLISchema;
    projects: {
        [key: string]: WorkspaceProject<ProjectType.Application | ProjectType.Library>;
    };
}
interface WorkspaceProject<TProjectType extends ProjectType = ProjectType.Application> {
    projectType: ProjectType;
    root: string;
    sourceRoot: string;
    prefix: string;
    cli?: WorkspaceCLISchema;
    architect?: WorkspaceTargets<TProjectType>;
    targets?: WorkspaceTargets<TProjectType>;
}
interface WorkspaceTargets<TProjectType extends ProjectType = ProjectType.Application> {
    build?: TProjectType extends ProjectType.Library ? LibraryBuilderTarget : BrowserBuilderTarget;
    server?: ServerBuilderTarget;
    test?: TestBuilderTarget;
    serve?: ServeBuilderTarget;
    e2e?: E2EBuilderTarget;
    'app-shell'?: AppShellBuilderTarget;
    'extract-i18n'?: ExtractI18nBuilderTarget;
    [key: string]: any;
}

export { type AppShellBuilderOptions, type AppShellBuilderTarget, type BrowserBuilderBaseOptions, type BrowserBuilderOptions, type BrowserBuilderTarget, type BuilderTarget, Builders, type E2EBuilderTarget, type E2EOptions, type ExtractI18nBuilderTarget, type ExtractI18nOptions, type FileReplacements, type LibraryBuilderOptions, type LibraryBuilderTarget, type OutputHashing, ProjectType, type ServeBuilderOptions, type ServeBuilderTarget, type ServerBuilderOptions, type ServerBuilderTarget, type TestBuilderOptions, type TestBuilderTarget, type WorkspaceProject, type WorkspaceSchema, type WorkspaceTargets };
