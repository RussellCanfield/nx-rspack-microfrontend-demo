
    export type RemoteKeys = 'hero/ProductHero' | 'hero/Widget';
    type PackageType<T> = T extends 'hero/Widget' ? typeof import('hero/Widget') :T extends 'hero/ProductHero' ? typeof import('hero/ProductHero') :any;