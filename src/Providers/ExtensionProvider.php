<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Bazaar\Extensions\ExtensionManager;
use Flarum\Foundation\AbstractServiceProvider;

class ExtensionProvider extends AbstractServiceProvider
{
    public function boot()
    {
        ini_set('memory_limit', '1G');
        $this->app->singleton(ExtensionManager::class, ExtensionManager::class);
    }
}
