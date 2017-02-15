<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Bazaar\Extension\ExtensionManager;
use Flarum\Foundation\AbstractServiceProvider;

class ExtensionProvider extends AbstractServiceProvider
{
    public function boot()
    {
        $this->app->singleton(ExtensionManager::class, ExtensionManager::class);
    }
}
