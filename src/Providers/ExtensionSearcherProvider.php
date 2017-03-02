<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Bazaar\Search\AbstractExtensionSearcher;
use Flagrow\Bazaar\Search\FlagrowIOSearcher;
use Flarum\Foundation\AbstractServiceProvider;

class ExtensionSearcherProvider extends AbstractServiceProvider
{
    public function boot()
    {
        $this->app->bind(AbstractExtensionSearcher::class, FlagrowIOSearcher::class);
    }
}
