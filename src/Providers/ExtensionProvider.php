<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Bazaar\Extensions\ExtensionManager;
use Flarum\Foundation\AbstractServiceProvider;

class ExtensionProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->app->singleton(ExtensionManager::class, ExtensionManager::class);
    }
}
