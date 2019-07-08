<?php

namespace Extiverse\Bazaar\Providers;

use Extiverse\Bazaar\Search\FlagrowApi;
use Flarum\Foundation\AbstractServiceProvider;

class ExtensionProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->app->singleton(FlagrowApi::class);
    }
}
