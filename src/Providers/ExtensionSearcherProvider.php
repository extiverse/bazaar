<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Bazaar\Search\AbstractExtensionSearcher;
use Flagrow\Bazaar\Search\FlagrowApi;
use Flagrow\Bazaar\Search\FlagrowIOSearcher;
use Flarum\Foundation\AbstractServiceProvider;

class ExtensionSearcherProvider extends AbstractServiceProvider
{
    public function boot()
    {
        $this->app->singleton(FlagrowApi::class);
        $this->app->bind(AbstractExtensionSearcher::class, FlagrowIOSearcher::class);
    }
}
