<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Bazaar\Composer\ComposerCommand;
use Flarum\Foundation\AbstractServiceProvider;

class ComposerProvider extends AbstractServiceProvider
{
    public function boot()
    {
        $this->app->singleton(ComposerCommand::class, ComposerCommand::class);
    }
}
