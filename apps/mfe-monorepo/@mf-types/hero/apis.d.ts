
    export type RemoteKeys = 'hero/ProductHero';
    type PackageType<T> = T extends 'hero/ProductHero' ? typeof import('hero/ProductHero') :any;